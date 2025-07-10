const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: String,
  address: String,
  citizenshipNo: String,
  status: { type: String, default: 'Under Review' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
