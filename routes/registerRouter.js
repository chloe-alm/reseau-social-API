const { request, response } = require('express');
const express = require('express');

const registerRouter = express.Router();
const userController = require('../controllers/users');

//route get 

registerRouter.get('/register',(request,response)=>{
    response.json({message:'register'})
})

//route post

registerRouter.post('/register',userController.register);
module.exports = registerRouter