const express = require('express');
const router = express.Router();

const teacherRequestsController = require('../controllers/teacherRequestsController');

router.get('/my_students', teacherRequestsController.getMyStudents);

router.get('/student', teacherRequestsController.getStudent);

router.get('/student_marks_sheets', teacherRequestsController.getStudentMarksSheet);

router.get('/marks_sheet', teacherRequestsController.getMarksSheet);

router.post('/marks_sheet', teacherRequestsController.addMarksSheet);

router.patch('/marks_sheet/:id', teacherRequestsController.updateMarksSheet);

router.delete('/marks_sheet/:id', teacherRequestsController.deleteMarksSheet);

module.exports = router;