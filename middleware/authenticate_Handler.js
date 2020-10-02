const jwtUtils = require("../utils/jwt.utils");
const UnauthorizedError = require("../helpers/errors");

module.exports = async (req, res, next) => {
  const postAuth = req.headers["authorization"];
  console.log("1", req.headers["authorization"]);

  const userId = jwtUtils.getUserId(postAuth, res);
  console.log(userId);

  if (userId < 0) {
    throw new UnauthorizedError(
      "Non autorisé",
      "Vous devez être connecté pour accéder à cette ressource."
    );
  }
  req.body.userId = userId;
  next();
};
