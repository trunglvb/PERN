const validate = require('@utils/validations');
const { verifyToken } = require('@utils/jwt');
const dotenv = require('dotenv');
const { checkSchema } = require('express-validator');
const { ErrorWithStatus } = require('@utils/errors');
const { HttpStatusCode } = require('@utils/httpStatusCode');
dotenv.config();

const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HttpStatusCode.Unauthorized,
                message: 'Token chưa được gửi'
              });
            }
            const accessToken = value?.split(' ')[1];
            if (!accessToken) {
              throw new ErrorWithStatus({ status: HttpStatusCode.Unauthorized, message: 'Token không đúng định dạng' });
            }
            const decode_access_token = await verifyToken(accessToken, process.env.JWT_SECRET);
            req.decode_access_token = decode_access_token;
            return true;
          }
        }
      }
    },
    ['headers']
  )
);

module.exports = { accessTokenValidator };
