const notFoundError = require("../helpers/errors/notFoundError");

module.exports = () => {
  throw new notFoundError(
    "Ressource non trouvée",
    "Ressource demandée introuvable. Vérifiez le chemin de l'URL et réessayez."
  );
};