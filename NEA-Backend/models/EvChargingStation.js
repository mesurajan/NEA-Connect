const mongoose = require('mongoose');

const EvChargingStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  coordinates: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Busy'], default: 'Available' },
  totalPorts: { type: Number, required: true },
  availablePorts: { type: Number, required: true },
  chargingSpeed: { type: String },
  pricing: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  amenities: { type: [String] },
  phone: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('EvChargingStation', EvChargingStationSchema);
