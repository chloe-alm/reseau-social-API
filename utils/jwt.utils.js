const { response } = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

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
        expiresIn: "2h",
      }
    );
  },
  parseAuth: (authorization) => {
    return authorization != null ? authorization.replace("Bearer", "") : null;
  },
  getUserId: (authorization) => {
    let userId = -1;
    const token = module.exports.parseAuth(authorization);

    if (token) {
      const jwtToken = jwt.verify(token, JWT_SECRET);
      if (!jwtToken) {
        return response.status(500).json({
            error:"token non recupéré"
        });
      }else {
          userId = jwtToken.userId
      }
    }else {
        response.status(401).json({
            error:"le token n'est plus valide"
        })
    }
    return userId
  },
};
