const express = require("express");
const router = express.Router();
const Antenne = require("../models/Antenne");
const auth = require("../middleware/auth");

// GET all antennes
router.get("/", auth, async (req, res) => {
  try {
    const antennes = await Antenne.find().populate("station");
    res.json(antennes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new antenne
router.post("/", auth, async (req, res) => {
  const antenne = new Antenne({
    station: req.body.stationId,
    type: req.body.type,
    frequence: req.body.frequence,
    azimut: req.body.azimut,
    inclinaison: req.body.inclinaison,
  });

  try {
    const newAntenne = await antenne.save();
    res.status(201).json(newAntenne);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an antenne
router.patch("/:id", auth, async (req, res) => {
  try {
    const updatedAntenne = await Antenne.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAntenne);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an antenne
router.delete("/:id", auth, async (req, res) => {
  try {
    await Antenne.findByIdAndDelete(req.params.id);
    res.json({ message: "Antenne deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;