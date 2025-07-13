const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  billId: { type: String, ref: 'Bill' },
  amount: Number,
  paidAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
