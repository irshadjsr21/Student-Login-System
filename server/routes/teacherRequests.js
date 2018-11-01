const express = require('express');
const router = express.Router();

const teacherRequestsController = require('../controllers/teacherRequestsController');

router.get('/my_students', teacherRequestsController.getMyStudents);

router.get('/student', teacherRequestsController.getStudent);

router.get('/marks_sheet', teacherRequestsController.getStudentMarksSheet);

router.post('/add_marks_sheet', teacherRequestsController.addMarksSheet);

module.exports = router;