const { HttpStatusCode } = require('@utils/httpStatusCode');
const { pick, omit } = require('lodash');
const { ErrorWithStatus } = require('@utils/errors');

const defaultError = (err, req, res, next) => {
  const statusCode = req.statusCode || HttpStatusCode.InternalServerError;

  if (err instanceof ErrorWithStatus) {
    return res.status(err?.status).json({
      message: 'Lỗi',
      data: omit(err, ['status'])
    });
  }

  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true });
  });
  return res.status(statusCode).json({
    message: 'Lỗi',
    data: pick(err, ['message', 'name'])
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.originalUrl} not found`);
  res.status(HttpStatusCode.NotFound);
  next(error);
};

module.exports = { defaultError, notFound };
