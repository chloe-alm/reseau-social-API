const models = require('../models');
const bcrypt = require('bcrypt');
//const { request } = require('express');
const jwtUtils = require('../utils/jwt.utils');


module.exports = {
    register: (req,res) => {
        const {firstName,lastName,email,password,country,birthday,picture} = req.body;
        if(firstName==null || lastName==null || email==null || password==null || country==null || birthday==null ||picture==null ){
            return res.status(400).json({"error":"missing fields"});
        }
        models.User.findOne({
            attributes: ["email"],
            where: { email },
          })
            .then((userFound) => {
              if (!userFound) {
                bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                  models.User.create({
                    firstName,
                    lastName,
                    email,
                    password: bcryptedPassword,
                    country,
                    birthday,
                    picture
                  })
                    .then((newUser) => {
                      return res.status(201).json(newUser);
                    })
                    .catch((err) => {
                      return res.status(500).json(err);
                    });
                });
              } else {
                return res.status(409).json({ error: "user already exists" });
              }
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        },
        login:(req,res)=> {
          const user = {
            email:req.body.email,
            password:req.body.password,
          }
          if(user.email == null || user.password == null){
            return res.status(400).json({
              'error':'veuillez remplir tous les champs'
            })
          }
          const match = models.User.findOne({
            attributes:[
              'email',
              'password'
            ],
            where:{
              email:user.email
            }
          })
          if(match){
            bcrypt.compare(user.password,match.password,(error,resBcrypt)=>{
              if(resBcrypt){
                if(resBcrypt){
                  return res.status(200).json({
                    token: jwtUtils.generateTokenForUser(match),
                    user: {
                      firstName: match.firstName,
                      lastName: match.lastName,
                      email: match.email
                    }
                  })
                }
              }else {
                return res.status(404).json({
                  'error':"ce compte n'existe pas"
                })
              }
            })

          }else {
            return res.status(500).json({
              'error':"impossible de verifier le compte"
            })
          }
        },
        
      };
        
    
