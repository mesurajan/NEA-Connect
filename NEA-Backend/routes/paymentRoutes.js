// 📁 routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Bill = require('../models/Bill');
const Payment = require('../models/Payment');
const { makePayment, getPaymentsByUser } = require('../controllers/paymentController');

// Shared function for saving verified payments
const saveVerifiedPayment = async ({
  name,
  phone,
  userId,
  address,
  billMonth,
  dueDate,
  previousReading,
  currentReading,
  unitsConsumed,
  amount,
  paymentMethod,
}) => {
  let bill = await Bill.findOne({ userId });

  if (!bill) {
    const last = await Bill.findOne({}, {}, { sort: { shortBillId: -1 } });
    const nextShortBillId = last?.shortBillId ? last.shortBillId + 1 : 1;

    bill = new Bill({
      userId,
      customerName: name,
      phone,
      address,
      billMonth,
      dueDate,
      previousReading,
      currentReading,
      unitsConsumed,
      billAmount: amount,
      energyCharge: amount,
      serviceCharge: 0,
      paymentMethod,
      status: 'Paid',
      shortBillId: nextShortBillId,
    });

    await bill.save();
  }

  const payment = new Payment({
    name,
    phone,
    userId,
    address,
    billMonth,
    dueDate,
    previousReading,
    currentReading,
    unitsConsumed,
    amount,
    paymentMethod,
    billId: bill._id,
  });

  await payment.save();

  return { payment, shortBillId: bill.shortBillId };
};

// --- Payment Routes ---

// POST /api/payments - manual payment creation
router.post('/', makePayment);

// GET /api/payments/user/:userId - get payments by user
router.get('/user/:userId', getPaymentsByUser);

// --- Gateway Verification Routes ---

// eSewa verification
router.post('/verify/esewa', async (req, res) => {
  const {
    amt, pid, rid,
    name, phone, userId, address,
    billMonth, dueDate, previousReading, currentReading, unitsConsumed
  } = req.body;

  try {
    const verificationPayload = `
      <xml>
        <detail>
          <merchantcode>${process.env.ESEWA_MERCHANT_ID || 'EPAYTEST'}</merchantcode>
          <pid>${pid}</pid>
          <prn>${rid}</prn>
          <amt>${amt}</amt>
          <crn>NP</crn>
        </detail>
      </xml>`;

    const { data } = await axios.post(
      'https://esewa.com.np/epay/transrec',
      verificationPayload,
      { headers: { 'Content-Type': 'text/xml' } }
    );

    if (data.includes('<response_code>Success</response_code>')) {
      const { payment, shortBillId } = await saveVerifiedPayment({
        name, phone, userId, address,
        billMonth, dueDate,
        previousReading, currentReading,
        unitsConsumed, amount: parseFloat(amt),
        paymentMethod: 'esewa'
      });

      return res.status(200).json({ success: true, shortBillId, payment });
    } else {
      return res.status(400).json({ success: false, error: 'Verification failed from eSewa' });
    }
  } catch (err) {
    console.error('❌ eSewa verify error:', err.message);
    res.status(500).json({ success: false, error: 'Server error verifying eSewa payment' });
  }
});

// Khalti verification
router.post('/gateway/khalti/initiate', async (req, res) => { 

  try {
    const { amount, return_url, purchase_order_id, purchase_order_name } = req.body;

    if (!amount || !return_url || !purchase_order_id || !purchase_order_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const khaltiResponse = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      {
        amount,
        return_url,
        website_url: process.env.CLIENT_ORIGIN || 'https://nea-frontend-eosin.vercel.app',
        purchase_order_id,
        purchase_order_name,
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_PUBLIC_KEY}`, // Use your real public key in .env
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json(khaltiResponse.data);
  } catch (error) {
    console.error('❌ Khalti initiate error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to initiate Khalti payment' });
  }
});


module.exports = router;
