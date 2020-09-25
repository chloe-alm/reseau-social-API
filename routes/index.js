const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const registerRouter = require('../routes/registerRouter');
const loginRouter = require('../routes/loginRouter');

router.use(bodyParser.json())

//route page d accueil
router.get('/api',(req,res)=>{
    res.json({message: 'Page d\'accueil'});
})

router.use('/api',registerRouter)
router.use('/api',loginRouter)

module.exports = router



