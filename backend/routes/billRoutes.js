const express = require('express');
const router = express.Router();
const { createBill, getBillsByUser, getAllBills, searchBills } = require('../controllers/billController');


router.post('/', createBill);
router.get('/user/:userId', getBillsByUser);
router.get('/search', searchBills); // New route for searching bills by userId or billId
router.get('/short/:shortBillId', require('../controllers/billController').getBillByShortId); // Get bill by shortBillId
router.get('/', getAllBills);

module.exports = router;
