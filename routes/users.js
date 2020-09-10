const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = {
    register: (req,res) => {
        const {firstName,lastName,email,password,country,birthday} = req.body;
        if(!firstName || !lastName || !email || !password || country || birthday ){
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
      };
        
    
