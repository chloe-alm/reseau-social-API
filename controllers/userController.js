const models = require("../models");
require('express-async-errors');
const bcrypt = require("bcrypt");
//const { request } = require('express');
const jwtUtils = require("../utils/jwt.utils");
const {
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
  ServerError,
  NotFoundError,
} = require('../helpers/errors');
const { OK, CREATED } = require('../helpers/status_codes');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

module.exports = {
  register: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      country,
      birthday,
      picture,
    } = req.body;
    if (firstName === null || firstName === undefined) {
      throw new BadRequestError('Mauvaise requête', "le champs firstName n'est pas renseigne");
    }
    if (!FIRSTNAME_REGEX.test(firstName)) {
      throw new BadRequestError(
        'Mauvaise requête',
        'le champs firstName doit être une chaîne de caractère'
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestError('Mauvaise requête', "l'email n'est pas valide");
    }
    if (!PASSWORD_REGEX.test(password)) {
      throw new BadRequestError(
        'Mauvaise requête',
        'mot de passe invalide : il doit avoir une longueur de 4 à 15 caractères et inclure au moins 1 chiffre, une minuscule, une majuscule)'
      );
    } 
    const userFound = await models.User.findOne({
      attributes: ["email"],
      where: { email },
    })
        if (!userFound) {
          const bcryptedPassword = await bcrypt.hash(password, 5);
            const newUser = await models.User.create({
              firstName,
              lastName,
              email,
              password: bcryptedPassword,
              country,
              birthday,
              picture,
            })
            res.status(201).json(newUser);
        } else {
          throw new ConflictError(
            "conflict error","user already exists"
          );
        }
  },

  login: async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    if (user.email === null || user.password === null) {
      return res.status(400).json({
        error: "veuillez remplir tous les champs",
      });
    }

    const match = await models.User.findOne({
      where: {
        email: user.email,
      },
    });
    if (!match) {
      throw new UnAuthorizedError (
        "UnAuthorized access","ce compte n'existe pas");
    }

    const resBcrypt = await bcrypt.compare(user.password, match.password);
    if (!resBcrypt) {
      throw new UnAuthorizedError(
        "UnAuthorized access","password invalide");
    }
    res.status(200).json({
      token: jwtUtils.generateTokenForUser(match),
      user: {
        firstName: match.firstName,
        lastName: match.lastName,
        email: match.email,
      },
    });
  },
};
