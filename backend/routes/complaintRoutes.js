const express = require('express');
const router = express.Router();
const { addComplaint, getComplaints } = require('../controllers/complaintController');

router.post('/', addComplaint);
router.get('/', getComplaints);

module.exports = router;
