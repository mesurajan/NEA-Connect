const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/contactcontroller');

router.post('/contact', sendMessage);

module.exports = router;
