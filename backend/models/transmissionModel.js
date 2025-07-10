const mongoose = require('mongoose');

const transmissionSchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'StationBase' },
  type: String,
  débit: String,
  statut: String,
  operateur: String
});

module.exports = mongoose.model('Transmission', transmissionSchema);
