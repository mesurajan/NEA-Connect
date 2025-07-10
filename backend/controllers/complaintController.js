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
      trackingId: customerId,
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create complaint' });
  }
};

// @desc    Track a complaint using trackingId
// @route   GET /api/complaints/:trackingId
// @access  Public
// @desc    Track a complaint using trackingId
// @route   GET /api/complaints/:trackingId
// @access  Public
exports.trackComplaint = async (req, res) => {
  const { trackingId } = req.params; // Get trackingId from URL

  try {
    // Ensure that you're querying trackingId as a string
    const complaint = await Complaint.findOne({ trackingId: trackingId });

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);  // Return the found complaint details
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to track complaint' });
  }
};