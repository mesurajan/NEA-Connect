const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { addConnection, getConnections } = require('../controllers/connectionController');

// For file uploads, use multiple field inputs
const fileUpload = upload.fields([
  { name: 'citizenship', maxCount: 1 },
  { name: 'landCertificate', maxCount: 1 },
  { name: 'constructionPermit', maxCount: 1 },
  { name: 'sitePlan', maxCount: 1 }
]);

router.get('/', getConnections);
router.post('/', fileUpload, addConnection); // <-- ✅ Multer middleware here

module.exports = router;
