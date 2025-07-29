const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phone: String,
  email: String,
  customerId: String,
  category: String,
  description: String,
  priority: String,
  attachment: String,
  status: { type: String, default: 'Pending' },
  trackingId: { type: String, unique: true }, // Add this line
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
