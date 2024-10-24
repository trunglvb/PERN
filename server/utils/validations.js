const { validationResult } = require('express-validator');
const { EntityError, ErrorWithStatus } = require('./errors');
const { HttpStatusCode } = require('./httpStatusCode');

// Can be reused by many routes
const validate = (validations) => {
  return async (req, _res, next) => {
    await validations.run(req);

    // Lấy tất cả các lỗi sau khi chạy xong validations
    const errors = validationResult(req);
    const errorObject = errors.mapped();

    // Không có lỗi thì chạy tiếp
    if (errors.isEmpty()) {
      return next();
    }

    const entityError = new EntityError({ errors: {} });
    for (const key in errorObject) {
      const msg = errorObject[key].msg;

      // Nếu lỗi khác 422, next đến lỗi đó
      if (msg instanceof ErrorWithStatus && msg.status !== HttpStatusCode.UnprocessableEntity) {
        return next(msg); // Next đến file server.js, sử dụng app.use, msg sẽ là tham số err trong callback (err, req, res, next)
      }

      // Entity error có message và status default khi tạo class là 422
      entityError.errors[key] = errorObject[key];
    }

    next(entityError);
  };
};
module.exports = validate;
