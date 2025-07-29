const LoadShedding = require('../models/LoadShedding');

const createSchedule = async (req, res) => {
  try {
    const schedule = new LoadShedding(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllSchedules = async (req, res) => {
  const schedules = await LoadShedding.find();
  res.json(schedules);
};

module.exports = { createSchedule, getAllSchedules };
