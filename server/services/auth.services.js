const db = require('@models');
const { signToken } = require('@utils/jwt');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const loginWithGoogle = async (body) => {
  const { email, fullname, avatar, password } = body;
  let user = await db.User.findOne({
    where: { email: email },
    attributes: { exclude: ['password', 'resetPwdToken', 'resetPwdExpire'] },
    include: [{ model: db.Pricing, as: 'rPricing', exclude: ['createdAt', 'updatedAt'] }]
  });
  let userId = '';
  const basePricing = await db.Pricing.findOne({
    where: {
      priority: 1
    }
  });
  if (!user) {
    const newUser = await db.User.create({
      email,
      fullname,
      avatar,
      password: hashPassword(password),
      idPricing: basePricing.id
    });
    if (!newUser) throw new Error('Lỗi tạo mới User');
    user = await db.User.findOne({
      where: { email: email },
      attributes: { exclude: ['password', 'resetPwdToken', 'resetPwdExpire'] },
      include: [{ model: db.Pricing, as: 'rPricing', exclude: ['createdAt', 'updatedAt'] }]
    });
    userId = newUser.id;
  } else {
    userId = user.id;
  }

  const [access_token, refresh_token] = await Promise.all([
    signToken(userId, process.env.JWT_SECRET),
    signToken(userId, process.env.JWT_REFRESH_TOKEN)
  ]);

  return { access_token: `Bearer ${access_token}`, refresh_token: refresh_token, user: user };
};

const checkAlreadyUser = async (email) => {
  const user = await db.User.findOne({ where: { email: email } });
  return { hasUser: !!user };
};

const authService = { loginWithGoogle, checkAlreadyUser };

module.exports = authService;
