const models = require("../models");
const {UnAuthorizedError} = require("../helpers/errors");

module.exports = async (req, res, next)=> {
    const userAdmin = await models.User.findOne({
        attributes: ["isAdmin"],
        where: { id: req.user.userId, },
    })
    if (!userAdmin.dataValues.isAdmin){
        throw new UnAuthorizedError(
            "acces denied",
            "only admin are allowed"
        );
    }
    next();
}
