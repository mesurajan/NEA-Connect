const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  status: { type: String, default: 'Pending' }, // Pending, Resolved, Rejected
  attachment: { type: String }, // Field to store the image path
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);