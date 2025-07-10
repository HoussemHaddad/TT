const StationBase = require('../models/stationbaseModel');

exports.getAllStations = async (req, res) => {
  const stations = await StationBase.find();
  res.json(stations);
};

exports.createStation = async (req, res) => {
  const station = new StationBase(req.body);
  await station.save();
  res.status(201).json(station);
};

exports.updateStation = async (req, res) => {
  const station = await StationBase.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(station);
};

exports.deleteStation = async (req, res) => {
  await StationBase.findByIdAndDelete(req.params.id);
  res.json({ message: 'Station supprimée' });
};
