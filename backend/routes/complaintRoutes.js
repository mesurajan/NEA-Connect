const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Import the Multer middleware
const { addComplaint, getComplaints } = require('../controllers/complaintController');

// For handling file uploads (single file upload in this case)
router.post('/', upload.single('attachment'), addComplaint);  // Use 'attachment' as field name
router.get('/', getComplaints);

module.exports = router;
