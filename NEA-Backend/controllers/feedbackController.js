const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { submitFeedback };
