const express = require("express");
const router = express.Router();
const BaseStation = require("../models/BaseStation");
const auth = require("../middleware/auth");

// GET all base stations (protected route)
router.get("/", auth, async (req, res) => {
  try {
    const stations = await BaseStation.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single base station
router.get("/:id", auth, async (req, res) => {
  try {
    const station = await BaseStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new base station
router.post("/", auth, async (req, res) => {
  const station = new BaseStation({
    nom: req.body.nom,
    localisation: req.body.localisation,
    statut: req.body.statut,
    type: req.body.type,
    puissance: req.body.puissance,
  });

  try {
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a base station
router.patch("/:id", auth, async (req, res) => {
  try {
    const updatedStation = await BaseStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a base station
router.delete("/:id", auth, async (req, res) => {
  try {
    await BaseStation.findByIdAndDelete(req.params.id);
    res.json({ message: "Station deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;