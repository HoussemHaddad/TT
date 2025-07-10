const express = require('express');
const router = express.Router();
const Derangement = require('../models/derangementModel');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

router.get('/', authenticate, async (req, res) => {
  try {
    const data = await Derangement.find().populate('station');
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des dérangements:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des dérangements',
      error: error.message 
    });
  }
});

router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const derangement = new Derangement(req.body);
    const savedDerangement = await derangement.save();
    res.status(201).json(savedDerangement);
  } catch (error) {
    console.error('Erreur lors de la création du dérangement:', error);
    
    // Gestion spécifique des erreurs de validation
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Données invalides',
        errors: error.errors
      });
    }
    
    res.status(500).json({ 
      message: 'Erreur lors de la création du dérangement',
      error: error.message 
    });
  }
});

router.put('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
 try {
    const { id } = req.params;
    
    // Vérifier si l'ID est valide
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID invalide' });
    }
    
    const updated = await Derangement.findByIdAndUpdate(
      id, 
      req.body, 
      { 
        new: true,
        runValidators: true // Active la validation lors de la mise à jour
      }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Dérangement non trouvé' });
    }
    
    res.json(updated);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du dérangement:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Données invalides',
        errors: error.errors
      });
    }
    
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du dérangement',
      error: error.message 
    });
  }
});

router.delete('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
 try {
    const { id } = req.params;
    
    // Vérifier si l'ID est valide
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID invalide' });
    }
    
    const deleted = await Derangement.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Dérangement non trouvé' });
    }
    
    res.json({ 
      message: 'Dérangement supprimé avec succès',
      deletedId: id 
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du dérangement:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du dérangement',
      error: error.message 
    });
  }
});
module.exports = router;
