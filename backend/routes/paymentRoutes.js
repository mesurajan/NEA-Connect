const express = require('express');
const router = express.Router();
const { makePayment, getPaymentsByUser } = require('../controllers/paymentController');

router.post('/', makePayment);
router.get('/user/:userId', getPaymentsByUser);

module.exports = router;
