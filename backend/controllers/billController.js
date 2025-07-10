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

module.exports = { createBill, getBillsByUser, getAllBills };
