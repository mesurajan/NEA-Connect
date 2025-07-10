const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  name: String,
  address: String,
  citizenshipNumber: String,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Connection', connectionSchema);
