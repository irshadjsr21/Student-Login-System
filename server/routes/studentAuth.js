const express = require('express');
const router = express.Router();

const checkAuthentication = require('../middlewares/checkAuthentication');

const studentAuthController = require('../controllers/studentAuthController');


router.post('/register', studentAuthController.register);

router.post('/login', studentAuthController.login);

router.get('/', checkAuthentication('student'), studentAuthController.getStudent);

module.exports = router;