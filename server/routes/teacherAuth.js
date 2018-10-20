const express = require('express');
const router = express.Router();

const checkAuthentication = require('../middlewares/checkAuthentication');

const teacherAuthController = require('../controllers/teacherAuthController');


router.post('/register', teacherAuthController.register);

router.post('/login', teacherAuthController.login);

router.get('/', checkAuthentication('teacher'), teacherAuthController.getTeacher);

module.exports = router;