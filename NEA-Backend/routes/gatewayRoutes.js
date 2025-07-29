const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
const Bill = require('../models/Bill');
const Payment = require('../models/Payment');

// 🧠 Shared helper to save verified payment
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

// ✅ Utility to verify eSewa signature
const verifyEsewaSignature = ({ responseBody, receivedSignature, secretKey }) => {
  const signedFieldNames = responseBody.signed_field_names.split(',');
  const signatureString = signedFieldNames
    .map((field) => `${field}=${responseBody[field]}`)
    .join(',');

  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(signatureString);
  const generatedSignature = hmac.digest('base64');

  return generatedSignature === receivedSignature;
};

// === NEW: eSewa Payment Initiation Route ===
router.post('/verify/esewa/initiate', async (req, res) => {
  try {
    console.log('📩 Received Initiate Payload:', req.body);

    const {
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
    } = req.body;

    if (
      !name || !phone || !userId || !address ||
      !billMonth || !dueDate || !previousReading ||
      !currentReading || !unitsConsumed || !amount
    ) {
      return res.status(400).json({ success: false, error: 'Missing required payment details' });
    }

    const transaction_uuid = `TXN-${Date.now()}`;
    const product_code = 'EPAYTEST';  // sandbox product code
    const total_amount = parseFloat(amount).toFixed(2);
    const success_url = `${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}/esewa-payment-success`;
    const failure_url = `${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}/payment-failed`;

    const responseBody = {
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names: 'total_amount,transaction_uuid,product_code',
    };

    const signatureString = Object.entries(responseBody)
      .map(([key, value]) => `${key}=${value}`)
      .join(',');

    const hmac = crypto.createHmac('sha256', process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q(');
    hmac.update(signatureString);
    const signature = hmac.digest('base64');

    const payload = {
      ...responseBody,
      signature,
      name,
      phone,
      userId,
      address,
      billMonth,
      dueDate,
      previousReading,
      currentReading,
      unitsConsumed,
      su: success_url,
      fu: failure_url,
    };

    return res.status(200).json(payload);
  } catch (err) {
    console.error('❌ eSewa initiation error:', err.message || err);
    return res.status(500).json({ success: false, error: 'Failed to initiate eSewa payment' });
  }
});

// ✅ eSewa HMAC Verification Route
router.post('/verify/esewa', async (req, res) => {
  try {
    console.log('📦 Received eSewa verification payload:', req.body);

    const {
      name, phone, userId, address,
      billMonth, dueDate, previousReading, currentReading, unitsConsumed,
      total_amount, transaction_uuid, product_code,
      signed_field_names, signature,
    } = req.body;

    // ⚠️ Required fields check
    if (!total_amount || !transaction_uuid || !product_code || !signed_field_names || !signature || !userId) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // ✅ Verify HMAC signature
    const isValid = verifyEsewaSignature({
      responseBody: {
        total_amount,
        transaction_uuid,
        product_code,
        signed_field_names,
      },
      receivedSignature: signature,
      secretKey: process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q(', // official sandbox key
    });

    if (!isValid) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    // ✅ Verify status from eSewa
    const { data } = await axios.get(
      'https://rc.esewa.com.np/api/epay/transaction/status/',
      {
        params: {
          product_code,
          transaction_uuid,
          total_amount,
        },
      }
    );

    console.log('📨 eSewa Status Response:', data);

    if (data.status === 'COMPLETE') {
      const { payment, shortBillId } = await saveVerifiedPayment({
        name,
        phone,
        userId,
        address,
        billMonth,
        dueDate,
        previousReading,
        currentReading,
        unitsConsumed,
        amount: parseFloat(total_amount),
        paymentMethod: 'esewa',
      });

      return res.status(200).json({ success: true, shortBillId, payment });
    } else {
      return res.status(400).json({ success: false, error: 'eSewa status not complete' });
    }
  } catch (err) {
    console.error('❌ eSewa Verification Error:', err.message || err);
    return res.status(500).json({ success: false, error: 'eSewa verification failed' });
  }
});

// ✅ Khalti Payment Initiate Route
router.post('/gateway/khalti/initiate', async (req, res) => {
  try {
    console.log('🔔 Khalti initiate request body:', req.body);

    const { amount, return_url, purchase_order_id, purchase_order_name } = req.body;

    if (!amount || !return_url || !purchase_order_id || !purchase_order_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const khaltiResponse = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      {
        amount,
        return_url,
        website_url: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
        purchase_order_id,
        purchase_order_name,
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_PUBLIC_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Khalti Response:', khaltiResponse.data);
    return res.status(200).json(khaltiResponse.data);
  } catch (error) {
    console.error('❌ Khalti Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to initiate Khalti payment' });
  }
});

module.exports = router;
