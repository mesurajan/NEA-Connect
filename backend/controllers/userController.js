
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const SECRET = process.env.JWT_SECRET || "yourSecretKey"; // ✅ Load from .env if available

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, phone, citizenship } = req.body;
    const photo = req.file ? req.file.filename : '';

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      citizenship,
      photo: `/uploads/${photo}`,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Attempting login with:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with this email");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("🔐 Comparing passwords...");
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("✅ Login successful for user:", user.email);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'yourSecretKey', {
      expiresIn: '1d',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};



// Get all users (optional admin feature)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

module.exports = { registerUser, loginUser, getUsers };
