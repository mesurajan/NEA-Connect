const mongoose = require('mongoose');
const { string } = require('zod');

const billSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  customerName: String,
  address: String,
  billMonth: String,
  dueDate: String,
  previousReading: Number,
  currentReading: Number,
  unitsConsumed: Number,
  billAmount: Number,
  status: String,
  serviceCharge: Number,
  energyCharge: Number,
  phone: String,
  paymentMethod: String,
  shortBillId: { type: Number, unique: true, sparse: true },
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
