const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  customerName: String,
  complaint: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
