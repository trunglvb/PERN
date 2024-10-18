const asyncHandler = require('express-async-handler');
const db = require('@models');
const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

module.exports = {
  loginWithGoogle: asyncHandler(async (req, res, _next) => {
    const { email, fullname, avatar, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      await db.User.create({ email, fullname, avatar, password: hashPassword(password) });
    }

    return res.json({
      success: true,
      user: user
    });
  })
};
