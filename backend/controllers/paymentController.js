const Payment = require('../models/Payment');
const Bill = require('../models/Bill');

const makePayment = async (req, res) => {
  try {
    console.log("📥 Payment data received:", req.body);

    // Destructure values from request body
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
      paymentMethod
    } = req.body;

    // Check if a bill exists for this userId
    let bill = await Bill.findOne({ userId });

    if (!bill) {
      // Find the highest shortBillId and increment
      const lastBill = await Bill.findOne({}, {}, { sort: { shortBillId: -1 } });
      const nextShortBillId = lastBill && lastBill.shortBillId ? lastBill.shortBillId + 1 : 1;

      // Create a new bill using full details from request
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

    // Create and save the payment entry linked to the bill
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

    // Respond with saved payment and shortBillId for receipt
    res.status(201).json({ ...payment.toObject(), shortBillId: bill.shortBillId });
  } catch (err) {
    console.error('❌ Payment creation failed:', err);
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
