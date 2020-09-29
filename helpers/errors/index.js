const NotFoundError = require('./notFoundError');
const BadRequestError = require('./badRequesteError');
const ConflictError = require('./conflictError');
const UnAuthorizedError = require('./unauthorizedError');
const ServerError = require('./serverError');

module.exports = {
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
  ServerError,
};