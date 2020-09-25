const express = require('express');

const loginRouter = express.Router();
const userController = require('../controllers/userController');

// loginRouter.get('/login',(req,res)=>{
//     res.json({message:'login'})
// })

loginRouter.post('/login',userController.login);
module.exports = loginRouter