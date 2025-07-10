const Transmission = require('../models/transmissionModel');

exports.getAllTransmissions = async (req, res) => {
  try {
    const transmissions = await Transmission.find().populate('station');
    res.json(transmissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransmission = async (req, res) => {
  try {
    const transmission = new Transmission(req.body);
    await transmission.save();
    res.status(201).json(transmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTransmission = async (req, res) => {
  try {
    const updated = await Transmission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Transmission not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTransmission = async (req, res) => {
  try {
    const deleted = await Transmission.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Transmission not found' });
    }
    res.json({ message: 'Transmission supprimée' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};