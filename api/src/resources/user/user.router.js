const express = require('express')
const controller = require('./user.controller')

const router = express.Router();

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

module.exports = router;
