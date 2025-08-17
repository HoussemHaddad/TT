const mongoose = require("mongoose");

const DerangementSchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: "BaseStation", required: true },
  type: { type: String, required: true },
  severite: { type: String, enum: ["mineur", "moyen", "critique"], default: "mineur" },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  statut: { type: String, enum: ["ouvert", "en cours", "résolu"], default: "ouvert" },
});

module.exports = mongoose.model("Derangement", DerangementSchema);