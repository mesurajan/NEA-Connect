const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerId: String,
  amount: Number,
  dueDate: Date,
  paid: Boolean,
});

module.exports = mongoose.model('Bill', billSchema);
