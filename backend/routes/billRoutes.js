const express = require('express');
const router = express.Router();
const { getBills, addBill } = require('../controllers/billController');

router.get('/', getBills);
router.post('/', addBill);

module.exports = router;
