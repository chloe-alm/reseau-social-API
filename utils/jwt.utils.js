const jwt = require("jsonwebtoken");
const { UnAuthorizedError, BadRequestError } = require("../helpers/errors");

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
        expiresIn: "10h",
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
          throw new UnAuthorizedError(
            'access denied',
            "You must be logged in to access this page"
          );
        }

        req.user = user
        ;

        next();
      });
    } else {
      throw new BadRequestError(
        'bad request',
        'token is not found'
      );
    }
  },
  getUserId: (authorization, res) => {
    let userId = -1;
    const token = parseAuth(authorization);
    try {
      const jwtToken = jwt.verify(token, JWT_SECRET);
      userId = jwtToken.userId;
    } catch (err) {
      throw new UnauthorizedError(
        "Unauthorized access",
        "Problem: invalid token "
      );
    }
    return userId;
  },
  };



