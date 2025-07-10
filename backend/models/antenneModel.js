const mongoose = require('mongoose');

const antenneSchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'StationBase' },
  type: String,
  fréquence: String,
  azimut: String,
  inclinaison: String
});

module.exports = mongoose.model('Antenne', antenneSchema);
