const asyncHandler = require('express-async-handler');
const authService = require('@services/auth.services');
const { HttpStatusCode } = require('@utils/httpStatusCode');

module.exports = {
  loginWithGoogle: asyncHandler(async (req, res, _next) => {
    const { body } = req;
    const result = await authService.loginWithGoogle(body);

    return res.status(HttpStatusCode.Ok).json({
      message: 'Login successful',
      data: result
    });
  }),
  checkAlreadyUser: asyncHandler(async (req, res, _next) => {
    const { email } = req.query;
    const result = await authService.checkAlreadyUser(email);

    return res.status(HttpStatusCode.Ok).json({
      message: 'Checked already user',
      data: result
    });
  })
};
