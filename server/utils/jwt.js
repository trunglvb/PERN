const jwt = require('jsonwebtoken');

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
  return new Promise((resolve, _reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) {
        throw error;
      }
      resolve(decoded);
    });
  });
};

module.exports = { signToken, verifyToken };
