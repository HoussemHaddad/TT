const express = require("express");
const router = express.Router();
const Derangement = require("../models/Derangement");
const auth = require("../middleware/auth");

// GET all derangements
router.get("/", auth, async (req, res) => {
  try {
    const derangements = await Derangement.find().populate("station");
    res.json(derangements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new derangement
router.post("/", auth, async (req, res) => {
  const derangement = new Derangement({
    station: req.body.stationId,
    type: req.body.type,
    severite: req.body.severite,
    description: req.body.description,
    date: req.body.date,
    statut: req.body.statut,
  });

  try {
    const newDerangement = await derangement.save();
    res.status(201).json(newDerangement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a derangement
router.patch("/:id", auth, async (req, res) => {
  try {
    const updatedDerangement = await Derangement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDerangement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a derangement
router.delete("/:id", auth, async (req, res) => {
  try {
    await Derangement.findByIdAndDelete(req.params.id);
    res.json({ message: "Derangement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;