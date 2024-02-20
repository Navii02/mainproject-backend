// models/CertificateRequest.js

const mongoose = require('mongoose');

const certificateRequestSchema = new mongoose.Schema({
  registerNumber: { type: String, required: true },
  userEmail: { type: String, required: true,},
  reason: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  studentName: { type: String },
  fileUrl: { type: String },
  declineReason: { type: String },
}, { timestamps: true });

const CertificateRequest = mongoose.model('CertificateRequest', certificateRequestSchema);

module.exports = CertificateRequest;
