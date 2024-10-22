const db = require('@models');
const { signToken } = require('@utils/jwt');
const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const loginWithGoogle = async (body) => {
  const { email, fullname = '', avatar, password } = body;
  let user = await db.User.findOne({ where: { email: email } });
  let userId = '';

  if (!user) {
    const newUser = await db.User.create({ email, fullname, avatar, password: hashPassword(password) });
    if (!newUser) throw new Error('Lỗi tạo mới User');
    user = newUser;
    userId = newUser.id;
  } else {
    userId = user.id;
  }

  const token = await signToken(userId.toString());
  return { access_token: token, refresh_token: token, user: user };
};

const checkAlreadyUser = async (email) => {
  const user = await db.User.findOne({ where: { email: email } });
  return { hasUser: !!user };
};

const authService = { loginWithGoogle, checkAlreadyUser };

module.exports = authService;
