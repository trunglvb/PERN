const jwt = require('jsonwebtoken');

const signToken = (payload, privateKey, options = { algorithm: 'HS256', expiresIn: '7d' }) => {
  return new Promise((resolve, _reject) => {
    jwt.sign({ name: payload }, privateKey, options, (error, token) => {
      if (error) {
        throw error;
      }
      resolve(token);
    });
  });
};

module.exports = { signToken };
