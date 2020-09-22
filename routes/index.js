const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const registerRouter = require('../routes/registerRouter');
const { request, response } = require("express");

router.use(bodyParser.json())

//route page d accueil
router.get('/api',(request,response)=>{
    response.json({message: 'Page d\'accueil'});
})

router.use('/api',registerRouter)

module.exports = router



