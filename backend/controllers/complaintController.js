const Complaint = require('../models/Complaint');

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Public
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};

// @desc    Add a new complaint
// @route   POST /api/complaints
// @access  Public
exports.addComplaint = async (req, res) => {
  try {
    const { name, phone, email, customerId, category, description, priority } = req.body;
    const file = req.files ? req.files.attachment[0].path : null;  // Handle file upload

    const newComplaint = new Complaint({
      userId: req.body.userId, // Assuming userId comes from the frontend
      name,
      phone,
      email,
      customerId,
      category,
      description,
      priority,
      attachment: file, // Save the file path in the database
      status: 'Pending',
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create complaint' });
  }
};
