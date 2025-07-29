const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  citizenship: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // 👈 role added
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
