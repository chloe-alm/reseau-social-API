const models = require("../models");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
require('express-async-errors');

const {
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
  ServerError,
  NotFoundError,
} = require('../helpers/errors');

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


  getOneUser: async (req, res) => {
    const UserId = req.params.id;
    if (UserId) {
      const user = await models.User.findOne({ where: { id: UserId } });
      if (user) {
        return res.status(200).json({ user: user });
      } else
        return res.status(404).json({ error: "404: le user n'exsiste pas" });
    } else {
      return res.status(404).json({ error: "404 page indisponible" });
    }
  },
  getAllUser: async (req, res) => {
    const userAll = await models.User.findAll({ limit: 10 });
    if (userAll) {
      res.status(200).json({ user: userAll });
    } else {
      res.status(500).json({ err: "500 il n'y a pas de post" });
    }
  },
  editUser: async (req, res) => {
    const getUserId = req.params.id;
    const initialUser = await models.User.findOne({
      attributes: ["firstName", "lastName", "email", "password", "birthday", "country","picture"],
      where: { id: getUserId },
    });

    if (!initialUser) {
      return res.status(404).json({ error: "ressource non trouvé" });
    }

    let inputStateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password:req.body.password,
      birthday: req.body.birthday,
      country: req.body.country,
    };

    if (
      initialUser.firstName === inputStateUser.firstName &&
      initialUser.lastName === inputStateUser.lastName &&
      initialUser.email === inputStateUser.email &&
      initialUser.password === inputStateUser.password &&
      initialUser.birthday === inputStateUser.birthday &&
      initialUser.country === inputStateUser.country 
    ) {
      return res.status(400).json({ error: "pas besoin d'update, user non modifié" });
    }

    const updateUser = await models.User.update(req.body, {
      where: { id: getUserId },
    });
    const changedUser = await models.User.findOne({
      attributes: ["firstName", "lastName", "email", "password", "birthday", "country","picture"],
      where: { id: getUserId },
    });
    return res.status(201).json({ updateUser, changedUser });
  },
  deleteUser: async (req, res) => {
    const UserId = req.params.id;
    const deleted = await models.User.destroy({
      where: { id: UserId },
    });
    if (deleted) {
      return res.status(201).json({ succes: `User supprimé` });
    } else {
      return res.status(404).json({ err: "la ressource demandée n'existe plus" });
    }
  }, 
};
