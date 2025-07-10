const Derangement = require('../models/derangementModel');

exports.getAllDerangements = async (req, res) => {
  const data = await Derangement.find().populate('station');
  res.json(data);
};

exports.createDerangement = async (req, res) => {
  const d = new Derangement(req.body);
  await d.save();
  res.status(201).json(d);
};

exports.updateDerangement = async (req, res) => {
  const updated = await Derangement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteDerangement = async (req, res) => {
  await Derangement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Dérangement supprimé' });
};
