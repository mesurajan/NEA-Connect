const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerUser, loginUser } = require('../controllers/userController'); // Make sure loginUser is exported

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Register route with photo upload middleware
router.post('/register', upload.single('photo'), registerUser);

// Login route (no file upload needed)
router.post('/login', loginUser);

module.exports = router;
