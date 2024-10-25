const jwt = require('jsonwebtoken');
const { ErrorWithStatus } = require('./errors');
const { HttpStatusCode } = require('./httpStatusCode');

const signToken = (payload, privateKey, options = { algorithm: 'HS256', expiresIn: '7d' }) => {
  return new Promise((resolve, _reject) => {
    jwt.sign({ id: payload.toString() }, privateKey, options, (error, token) => {
      if (error) {
        throw error;
      }
      resolve(token);
    });
  });
};

const verifyToken = (token, privateKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          reject(
            new ErrorWithStatus({
              status: HttpStatusCode.Unauthorized,
              message: 'Token hết hạn'
            })
          );
        } else {
          reject(
            new ErrorWithStatus({
              status: HttpStatusCode.Unauthorized,
              message: 'Token không đúng định dạng'
            })
          );
        }
      }
      resolve(decoded);
    });
  });
};

module.exports = { signToken, verifyToken };
