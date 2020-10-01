const UnauthorizedError = require("../utils/errors/unauthorizedError");

module.exports = (request, response, next) => {
  throw new UnauthorizedError(
    "Accès non autorisé",
    "Vous n'avez pas les droits pour accéder à cette ressource. Essayez de vous authentifier et recommencez."
  );
};