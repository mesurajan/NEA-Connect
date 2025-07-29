const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/userController');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files saved in 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Unique filename with timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
router.post('/register', upload.single('photo'), registerUser);
router.post('/login', loginUser);
router.get('/', getUsers); // Optional: List all users (no password)

module.exports = router;
