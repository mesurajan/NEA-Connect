const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
  area: String,
  timeFrom: String,
  timeTo: String,
});

module.exports = mongoose.model('LoadSchedule', loadSchema);
