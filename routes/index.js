const express =require("express");
const { register } = require("./users");

exports.router = (() => {
    const apiRouter = express.Router();

    apiRouter.route("/users").post(register);

    return apiRouter;
})();


