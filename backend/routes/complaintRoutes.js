const express = require('express');
const router = express.Router();
const { getComplaints, addComplaint } = require('../controllers/complaintController');

router.get('/', getComplaints);
router.post('/', addComplaint);

module.exports = router;
