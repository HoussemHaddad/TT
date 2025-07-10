const Station = require('../models/stationbaseModel');
const Transmission = require('../models/transmissionModel');
const Antenne = require('../models/antenneModel');
const Derangement = require('../models/derangementModel');

const getDashboardStats = async (req, res) => {
  try {
    const totalStations = await Station.countDocuments();
    const totalAntennes = await Antenne.countDocuments();
    const totalTransmissions = await Transmission.countDocuments();
    const totalDerangements = await Derangement.countDocuments();
    const actifsDerangements = await Derangement.countDocuments({ statut: 'en cours' });

    res.json({
      totalStations,
      totalAntennes,
      totalTransmissions,
      totalDerangements,
      actifsDerangements,
    });
  } catch (err) {
    console.error('Erreur dashboard :', err);
    res.status(500).json({ message: 'Erreur serveur dashboard' });
  }
};

module.exports = { getDashboardStats };
