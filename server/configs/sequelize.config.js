const dotenv = require('dotenv');
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;
const development = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
  timezone: '+07:00'
};

const production = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
  timezone: '+07:00',
  dialectOption: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

module.exports = {
  development: development,
  production: production
};
