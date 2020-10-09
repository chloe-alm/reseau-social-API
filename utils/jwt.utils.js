const jwt = require("jsonwebtoken");
const { UnAuthorizedError } = require("../helpers/errors");

const JWT_SECRET = process.env.JWT_SECRET;

const parseAuth = (authorization) => {
  const token = authorization.replace("Bearer ", "");
  if (token === null || token === "") {
    throw new UnAuthorizedError("Unauthorized access", "No token found");
  }
  return token;
};
//generer
module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
        userFirstName: userData.firstName,
        userLastName: userData.lastName,
      },
      JWT_SECRET,
      {
        expiresIn: "4h",
      }
    );
  },

  //verifier token
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          throw new ForbiddenError();
        }

        req.user = user;

        next();
      });
    } else {
      throw new UnauthorizedError(
        'Accès refusé',
        'Vous devez être connecté pour accéder à cette ressource'
      );
    }
  },
};
