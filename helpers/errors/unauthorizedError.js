const { UNAUTHORIZED } = require('../status_codes');

module.exports = class UnAuthorizedError extends Error {
  constructor(title, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnAuthorizedError);
    }

    this.name = `UnAuthorized: ${title}`;
    this.status = UNAUTHORIZED;
    this.title = title;
    this.description = description;
  }
};