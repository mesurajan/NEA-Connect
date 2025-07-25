// /models/contactModel.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  category: String,
  message: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
