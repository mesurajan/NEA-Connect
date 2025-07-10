const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Import the Multer middleware
const { addComplaint, getComplaints, trackComplaint } = require('../controllers/complaintController');

// For handling file uploads (single file upload in this case)
router.post('/', upload.single('attachment'), addComplaint);  // Use 'attachment' as field name
router.get('/', getComplaints);
router.get('/:trackingId', trackComplaint);  

module.exports = router;