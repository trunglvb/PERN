const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const signToken = (payload, privateKey = process.env.JWT_SECRET, options = { algorithm: 'HS256', expiresIn: '7d' }) => {
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
