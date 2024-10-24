const asyncHandler = require('express-async-handler');
const authService = require('@services/auth.services');
const { HttpStatusCode } = require('@utils/httpStatusCode');
const userServices = require('../services/user.services');

module.exports = {
  getUserController: asyncHandler(async (req, res, _next) => {
    const result = await userServices.getUser('32');
    return res.status(HttpStatusCode.Ok).json({
      message: 'Lấy thông tin người dùng thành công',
      data: result
    });
  })
};
