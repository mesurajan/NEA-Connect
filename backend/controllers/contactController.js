// /controllers/contactController.js

const Contact = require('../models/ContactModel');

const sendMessage = async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    console.error('❌ Error saving contact message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { sendMessage };
