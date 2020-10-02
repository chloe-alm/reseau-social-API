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

  getUserId: (authorization, res) => {
    let userId = -1;
    const token = parseAuth(authorization);
    try {
      const jwtToken = jwt.verify(token, JWT_SECRET);
      userId = jwtToken.userId;
    } catch (err) {
      throw new UnAuthorizedError(
        "Unauthorized access",
        "Prolem invalid token"
      );
    }
    return userId;
  },
};
