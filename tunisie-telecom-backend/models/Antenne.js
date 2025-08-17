const mongoose = require("mongoose");

const AntenneSchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: "BaseStation", required: true },
  type: { type: String, required: true },
  frequence: { type: Number, required: true },
  azimut: { type: Number, required: true },
  inclinaison: { type: Number, required: true },
});

module.exports = mongoose.model("Antenne", AntenneSchema);