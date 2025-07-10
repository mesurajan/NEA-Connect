const Complaint = require('../models/Complaint');

exports.getComplaints = async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
};

exports.addComplaint = async (req, res) => {
  const newComplaint = new Complaint(req.body);
  await newComplaint.save();
  res.status(201).json(newComplaint);
};
