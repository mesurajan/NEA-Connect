const express = require('express');
const router = express.Router();
const evChargingController = require('../controllers/evChargingController');
const { getAllStations } = require('../controllers/evChargingController');

// GET stations, optional city query param
router.get('/stations', getAllStations);


router.get('/ev-charging-centres', evChargingController.getAllStations);



module.exports = router;
