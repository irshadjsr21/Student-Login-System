const express = require('express');
const router = express.Router();

const teacherRequestsController = require('../controllers/teacherRequestsController');

router.post('/my_students', teacherRequestsController.getMyStudents);

module.exports = router;