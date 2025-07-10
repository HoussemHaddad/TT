const express = require('express');
const router = express.Router();
const Station = require('../models/stationbaseModel');

// GET toutes les stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST ajouter une station
router.post('/', async (req, res) => {
  try {
        console.log("➡️ Données reçues dans POST /station :", req.body);

    const { nom, localisation, typetech, statut, type, fournisseur, puissance, hauteursupport, action } = req.body;

    if (!nom) {
      return res.status(400).json({ message: 'Le nom est requis' });
    }

    const nouvelleStation = new Station({
      nom,
      localisation,
      typetech,
      statut,
      type,
      fournisseur,
      puissance,
      hauteursupport,
      action
    });

    await nouvelleStation.save();
    res.status(201).json({ message: 'Station ajoutée', station: nouvelleStation });
  } catch (error) {
  console.error("❌ Erreur complète :", error); // <== LOG important
  res.status(500).json({ message: 'Erreur lors de l\'ajout de la station', erreur: error.message });
}

});

// PUT modifier une station
router.put('/:id', async (req, res) => {
  try {
    const updated = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Station non trouvée' });
    res.json({ message: 'Station mise à jour', station: updated });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE supprimer une station
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Station.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Station non trouvée' });
    res.json({ message: 'Station supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
