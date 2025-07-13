const Payment = require('../models/Payment');


const makePayment = async (req, res) => {
  try {
    console.log("📥 Payment data received:", req.body);

    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId }).populate('billId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { makePayment, getPaymentsByUser };
