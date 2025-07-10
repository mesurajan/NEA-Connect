const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  dueDate: Date,
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
