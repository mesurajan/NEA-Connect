const EvChargingStation = require('../models/EvChargingStation');
const geoip = require('geoip-lite');

// GET all charging stations or filter by city
exports.getAllStations = async (req, res) => {
  try {
    const { city } = req.query;
    let stations;

    if (!city) {
      // Auto-detect user's IP location
      const ip =
        req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
      const geo = geoip.lookup(ip);
      const userCity = geo?.city;

      if (!userCity) {
        return res.status(400).json({ message: 'Could not determine location from IP.' });
      }

      stations = await EvChargingStation.find({
        city: { $regex: new RegExp(`^${userCity.trim()}$`, 'i') },
      });
    } else {
      stations = await EvChargingStation.find({
        city: { $regex: new RegExp(`^${city.trim()}$`, 'i') },
      });
    }

    if (!stations || stations.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json(stations);
  } catch (error) {
    console.error('Error fetching EV stations:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
