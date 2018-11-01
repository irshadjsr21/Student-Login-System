const express = require('express');
const router = express.Router();

const studentRequestsController = require('../controllers/studentRequestsController');

router.get('/marks_sheets', studentRequestsController.getMarksSheets);

module.exports = router;