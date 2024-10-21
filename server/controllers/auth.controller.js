const asyncHandler = require('express-async-handler');
const db = require('@models');
const bcrypt = require('bcryptjs');
const { signToken } = require('@utils/jwt');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

module.exports = {
  loginWithGoogle: asyncHandler(async (req, res, _next) => {
    const { email, fullname, avatar, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } });
    let userId = '';

    if (!user) {
      const newUser = await db.User.create({ email, fullname, avatar, password: hashPassword(password) });
      if (!newUser) throw new Error('Lỗi tạo mới User');
      userId = newUser.dataValues.id;
    } else {
      userId = user.id;
    }

    const token = await signToken(userId.toString());

    return res.json({
      message: 'Login successful',
      data: {
        accessToken: token
      }
    });
  })
};
