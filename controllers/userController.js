const models = require("../models");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
require("express-async-errors");

const {
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
  ServerError,
  NotFoundError,
} = require("../helpers/errors");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

module.exports = {
  getUserMe: async (req, res) => {
    console.log(req.user.userId);
    let user = await models.User.findByPk(req.user.userId);
    res.status(200).json(user);
  },
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
    console.log(req.body);
    if (firstName === "" ) {
      throw new BadRequestError(
        "Bad request",
        "the firstName field is not filled in"
      );
    }
    if (!FIRSTNAME_REGEX.test(firstName)) {
      throw new BadRequestError(
        "Bad request",
        "the firstName field must be a string"
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestError("Bad request", "Email invalid");
    }
    if (!PASSWORD_REGEX.test(password)) {
      throw new BadRequestError(
        "Bad request",
        "the invalid password: it must be 6 to 15 characters long and include at least 1 number, lowercase, uppercase"
      );
    }
    const userFound = await models.User.findOne({
      attributes: ["email"],
      where: { email },
    });
    if (!userFound) {
      console.log("je cree l user");
      const bcryptedPassword = await bcrypt.hash(password, 5);
      const newUser = await models.User.create({
        firstName,
        lastName,
        email,
        password: bcryptedPassword,
        country,
        birthday,
        picture,
      });
      console.log("user create");
      res.status(201).json(newUser);
    } else {
      console.log("conflit");
      throw new ConflictError("conflict error", "user already exists");
    }
  },

  login: async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    
    if (user.email === "" || user.password === "") {
      throw new BadRequestError("Bad request", "please complete all fields");
    }

    const match = await models.User.findOne({
      where: {
        email: user.email,
      },
    });
    if (!match) {
      throw new UnAuthorizedError(
        "UnAuthorized access",
        "this mail does not exist"
      );
    }

    const resBcrypt = await bcrypt.compare(user.password, match.password);
    if (!resBcrypt) {
      throw new UnAuthorizedError("UnAuthorized access", "password invalide");
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
        throw new NotFoundError("Resource not found", "404: User not found");
    } else {
      throw new NotFoundError("Resource not found", "404 page indisponible");
    }
  },
  getAllUser: async (req, res) => {
    const userAll = await models.User.findAll({ limit: 10 });
    if (userAll) {
      res.status(200).json({ user: userAll });
    } else {
      throw new ServerError("servor error", "500 : there is not user");
    }
  },
  editUser: async (req, res) => {
    const getUserId = req.params.id;
    const initialUser = await models.User.findOne({
      attributes: [
        "firstName",
        "lastName",
        "email",
        "password",
        "birthday",
        "country",
        "picture",
      ],
      where: { id: getUserId },
    });

    if (!initialUser) {
      throw new NotFoundError(
        "Resource not found",
        "There is nothing to find at that url, the ID does not exist"
      );
    }

    let inputStateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
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
      throw new BadRequestError(
        "Bad Request",
        "No need to update, you didn't modified anything"
      );
    }

    const updateUser = await models.User.update(req.body, {
      where: { id: getUserId },
    });
    const changedUser = await models.User.findOne({
      attributes: [
        "firstName",
        "lastName",
        "email",
        "password",
        "birthday",
        "country",
        "picture",
      ],
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
      throw new NotFoundError(
        "Resource not found",
        "the requested resource no longer exists"
      );
    }
  },
};
