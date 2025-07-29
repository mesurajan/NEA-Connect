const mongoose = require('mongoose');

const loadSheddingSchema = new mongoose.Schema({
  area: String,
  timeFrom: String,
  timeTo: String,
}, { timestamps: true });

module.exports = mongoose.model('LoadShedding', loadSheddingSchema);
