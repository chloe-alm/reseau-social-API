const express = require('express');

const loginRouter = express.Router();
const userController = require('../controllers/userController');

loginRouter.post('/login',userController.login);
module.exports = loginRouter