const Application = require('../models/Application');

const createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllApplications = async (req, res) => {
  const applications = await Application.find().populate('userId');
  res.json(applications);
};

module.exports = { createApplication, getAllApplications };
