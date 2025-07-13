const Bill = require('../models/Bill');

const createBill = async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBillsByUser = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.params.userId });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllBills = async (req, res) => {
  const bills = await Bill.find();
  res.json(bills);
};

// Search bills by userId or billId via query parameters
const searchBills = async (req, res) => {
  try {
    const { userId, billId } = req.query;
    let query = {};
    if (userId) {
      query.userId = userId;
    }
    if (billId) {
      query.billId = billId;
    }
    console.log('Bill search request:', { userId, billId });
    console.log('MongoDB query:', query);
    if (!userId && !billId) {
      return res.status(400).json({ error: 'Please provide userId or billId as query parameter.' });
    }
    const bills = await Bill.find(query);
    console.log('Bills found:', bills);
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBill, getBillsByUser, getAllBills, searchBills };
