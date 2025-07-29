const express = require('express');
const router = express.Router();
const { createSchedule, getAllSchedules } = require('../controllers/loadController');

router.post('/', createSchedule);
router.get('/', getAllSchedules);

module.exports = router;
