const mongoose = require("mongoose");

const TransmissionSchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: "BaseStation", required: true },
  type: { type: String, required: true },
  debit: { type: Number, required: true },
  statut: { type: String, enum: ["actif", "inactif", "panne"], default: "actif" },
  operateur: { type: String, required: true },
});

module.exports = mongoose.model("Transmission", TransmissionSchema);