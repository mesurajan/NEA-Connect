const express = require('express');
const router = express.Router();
const { createBill, getBillsByUser, getAllBills } = require('../controllers/billController');

router.post('/', createBill);
router.get('/user/:userId', getBillsByUser);
router.get('/', getAllBills);

module.exports = router;
