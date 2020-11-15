const notFoundError = require("../helpers/errors/notFoundError");

module.exports = () => {
  throw new notFoundError(
    "Ressource not found",
    "Requested resource not found. Check the URL path and try again."
  );
};