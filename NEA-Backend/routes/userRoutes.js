
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/userController');


// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/register', upload.single('photo'), registerUser);
router.post('/login', loginUser);
router.get('/', getUsers); // optional, just for listing users

module.exports = router;
