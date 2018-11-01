const express = require('express');
const router = express.Router();

const teacherRequestsController = require('../controllers/teacherRequestsController');

router.get('/my_students', teacherRequestsController.getMyStudents);

module.exports = router;