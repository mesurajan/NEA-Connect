const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  status: { type: String, default: 'Pending' }, // Pending, Resolved, Rejected
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
