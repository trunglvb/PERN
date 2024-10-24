const { HttpStatusCode } = require('./httpStatusCode');

class ErrorWithStatus {
  constructor({ message, status }) {
    this.message = message;
    this.status = status;
  }
}

// Dùng cho lỗi 422
class EntityError extends ErrorWithStatus {
  constructor({ message = 'Validation error', errors }) {
    super({ message, status: HttpStatusCode.UnprocessableEntity }); // Extend thì cần super
    this.errors = errors;
  }
}

module.exports = { ErrorWithStatus, EntityError };
