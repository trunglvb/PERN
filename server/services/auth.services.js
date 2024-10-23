const db = require('@models');
const { signToken } = require('@utils/jwt');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const loginWithGoogle = async (body) => {
  const { email, fullname, avatar, password } = body;
  let user = await db.User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'idPricing'] } });
  let userId = '';

  if (!user) {
    const newUser = await db.User.create({ email, fullname, avatar, password: hashPassword(password) });
    if (!newUser) throw new Error('Lỗi tạo mới User');
    user = newUser;
    userId = newUser.id;
  } else {
    userId = user.id;
  }

  const [access_token, refresh_token] = await Promise.all([
    signToken(userId.toString(), process.env.JWT_SECRET),
    signToken(userId.toString(), process.env.JWT_REFRESH_TOKEN)
  ]);

  return { access_token: access_token, refresh_token: refresh_token, user: user };
};

const checkAlreadyUser = async (email) => {
  const user = await db.User.findOne({ where: { email: email } });
  return { hasUser: !!user };
};

const authService = { loginWithGoogle, checkAlreadyUser };

module.exports = authService;
