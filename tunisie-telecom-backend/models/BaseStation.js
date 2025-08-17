const mongoose = require("mongoose");

const BaseStationSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  localisation: { type: String, required: true },
  statut: { type: String, enum: ["actif", "inactif", "maintenance"], default: "actif" },
  type: { type: String, required: true },
  puissance: { type: Number, required: true },
});

module.exports = mongoose.model("BaseStation", BaseStationSchema);