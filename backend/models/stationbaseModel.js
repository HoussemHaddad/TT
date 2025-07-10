const mongoose = require('mongoose');

const stationBaseSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  localisation: String,
  typetech: String,
  statut: String,
  type: String,
  fournisseur: String,
  puissance: Number,
  hauteursupport: String,
  action: String
}, { timestamps: true });


module.exports = mongoose.model('StationBase', stationBaseSchema);
