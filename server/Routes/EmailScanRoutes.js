const express = require('express');
const router = express.Router();
//import controller
const EmailScanController = require('../controller/EmailScanController');

//Routes
router.post('/gmail', EmailScanController.ScanEmail);

module.exports = router;