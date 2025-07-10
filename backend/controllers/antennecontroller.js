const Antenne = require('../models/antenneModel');

exports.getAllAntennes = async (req, res) => {
  const antennes = await Antenne.find().populate('station');
  res.json(antennes);
};

exports.createAntenne = async (req, res) => {
  const antenne = new Antenne(req.body);
  await antenne.save();
  res.status(201).json(antenne);
};

exports.updateAntenne = async (req, res) => {
  const updated = await Antenne.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteAntenne = async (req, res) => {
  await Antenne.findByIdAndDelete(req.params.id);
  res.json({ message: 'Antenne supprimée' });
};
