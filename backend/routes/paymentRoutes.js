const express = require('express');
const router = express.Router();
const { makePayment, getPaymentsByUser } = require('../controllers/paymentController');

// POST /api/payments
router.post('/', makePayment);

// GET /api/payments/user/:userId
router.get('/user/:userId', getPaymentsByUser);

module.exports = router;
