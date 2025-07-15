const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: String, ref: 'User', required: true },
  billId: { type: String, ref: 'Bill' },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paidAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
