const { HttpStatusCode } = require('@utils/httpStatusCode');

const defaultError = (err, req, res, next) => {
  const statusCode = req.statusCode || HttpStatusCode.InternalServerError;
  const message = err?.message;
  return res.status(statusCode).json({
    success: false,
    message
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.originalUrl} not found`);
  res.status(HttpStatusCode.NotFound);
  next(error);
};

module.exports = { defaultError, notFound };
