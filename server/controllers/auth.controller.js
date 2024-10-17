const asyncHandler = require('express-async-handler');

module.exports = {
  loginWithGoogle: asyncHandler(async (req, res, _next) => {
    const { email, fullname, avatar, password } = req.body;
    console.log(req.body);
  })
};
