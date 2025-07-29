const express = require('express');
const router = express.Router();
const { createApplication, getAllApplications } = require('../controllers/applicationController');

router.post('/', createApplication);
router.get('/', getAllApplications);

module.exports = router;
