const express = require("express");
const router = express.Router();
const Transmission = require("../models/Transmission");
const auth = require("../middleware/auth");

// GET all transmissions
router.get("/", auth, async (req, res) => {
  try {
    const transmissions = await Transmission.find().populate("station");
    res.json(transmissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new transmission
router.post("/", auth, async (req, res) => {
  const transmission = new Transmission({
    station: req.body.stationId,
    type: req.body.type,
    debit: req.body.debit,
    statut: req.body.statut,
    operateur: req.body.operateur,
  });

  try {
    const newTransmission = await transmission.save();
    res.status(201).json(newTransmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a transmission
router.patch("/:id", auth, async (req, res) => {
  try {
    const updatedTransmission = await Transmission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTransmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a transmission
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transmission.findByIdAndDelete(req.params.id);
    res.json({ message: "Transmission deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;