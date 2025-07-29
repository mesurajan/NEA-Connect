// 📁 routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { makePayment, getPaymentsByUser } = require('../controllers/paymentController');

// POST /api/payments - manual payment creation
router.post('/', makePayment);

// GET /api/payments/user/:userId - get payments by user
router.get('/user/:userId', getPaymentsByUser);

module.exports = router;
