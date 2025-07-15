const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  rating: Number,
  message: String,
  suggestion: String,
  createdAt: { type: Date, default: Date.now }
});
const { string } = require('zod');
module.exports = mongoose.model('Feedback', feedbackSchema);


