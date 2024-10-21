const { HttpStatusCode } = require('@utils/httpStatusCode');
const { omit } = require('lodash');

const defaultError = (err, req, res, next) => {
  console.log(err);
  const statusCode = req.statusCode || HttpStatusCode.InternalServerError;

  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true });
  });
  return res.status(statusCode).json({
    message: 'Lỗi',
    data: omit(err, ['stack'])
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.originalUrl} not found`);
  res.status(HttpStatusCode.NotFound);
  next(error);
};

module.exports = { defaultError, notFound };
