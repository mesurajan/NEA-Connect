const Bill = require('../models/Bill');

exports.getBills = async (req, res) => {
  const bills = await Bill.find();
  res.json(bills);
};

exports.addBill = async (req, res) => {
  const bill = new Bill(req.body);
  await bill.save();
  res.status(201).json(bill);
};
