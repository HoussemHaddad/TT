const express = require('express');
const router = express.Router();
const Antenne = require('../models/antenneModel');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

router.get('/', authenticate, async (req, res) => {
  const data = await Antenne.find().populate('station');
  res.json(data);
});

router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  const antenne = new Antenne(req.body);
  await antenne.save();
  res.status(201).json(antenne);
});

router.put('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  const updated = await Antenne.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  await Antenne.findByIdAndDelete(req.params.id);
  res.json({ message: 'Antenne supprimée' });
});

module.exports = router;
