const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  citizenshipNo: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  propertyAddress: { type: String, required: true },
  district: { type: String, required: true },
  municipality: { type: String, required: true },
  wardNo: { type: Number, required: true },
  connectionType: { type: String, required: true },
  loadDemand: { type: Number, required: true },
  additionalInfo: { type: String },
  documents: {
    citizenship: { type: String },
    landCertificate: { type: String },
    constructionPermit: { type: String },
    sitePlan: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('Connection', connectionSchema);
