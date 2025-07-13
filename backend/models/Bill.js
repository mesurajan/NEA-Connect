const mongoose = require('mongoose');
const { string } = require('zod');

const billSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  amount: Number,
  dueDate: Date,
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
