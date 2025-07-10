const mongoose = require('mongoose');

const derangementSchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'StationBase' },
  type: String,
  sévérité: String,
  description: String,
  date: Date,
  statut: String
});

module.exports = mongoose.model('Derangement', derangementSchema);
