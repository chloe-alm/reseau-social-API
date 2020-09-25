const express = require('express');

const registerRouter = express.Router();
const userController = require('../controllers/userController');

registerRouter.get('/register',(req,res)=>{
    res.json({message:'register'})
})

registerRouter.post('/register',userController.register);
module.exports = registerRouter