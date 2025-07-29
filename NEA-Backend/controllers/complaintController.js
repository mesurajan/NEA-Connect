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
    console.log('📥 Incoming Complaint Request');

    // 🔍 Log form fields
    console.log('📝 req.body:', req.body);

    // 🔍 Log file
    console.log('📎 req.file:', req.file);

  const {
      name,
      phone,
      email,
      customerId,
      category,
      description,
      priority,
    
    } = req.body;
    let { userId } = req.body;

    // ✅ Handle userId safely (optional)
    if (!userId || userId === 'null' || userId.trim() === '') {
      userId = undefined; // This avoids ObjectId cast errors
    }

    // ✅ Required field check
    if (!name || !phone || !category || !description) {
      console.log('❌ Missing required fields!');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ✅ Handle file path
    const filePath = req.file ? req.file.path : null;

    const newComplaint = new Complaint({
      userId,
      name,
      phone,
      email,
      customerId,
      category,
      description,
      priority,
      attachment: filePath,
      status: 'Pending',
      trackingId: customerId // Optionally replace with a generated UUID
    });

    await newComplaint.save();

    console.log('✅ Complaint saved successfully');
    res.status(201).json(newComplaint);
  } catch (err) {
    console.error('❌ Error in addComplaint:', err);
    res.status(400).json({ error: 'Failed to create complaint' });
  }
};

// @desc    Track a complaint using trackingId
// @route   GET /api/complaints/:trackingId
// @access  Public
exports.trackComplaint = async (req, res) => {
  const { trackingId } = req.params;

  try {
    const complaint = await Complaint.findOne({ trackingId: trackingId });

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to track complaint' });
  }
};
