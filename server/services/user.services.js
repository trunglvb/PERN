const db = require('@models');

const getUser = async (id) => {
  const user = await db.User.findByPk(id, {
    attributes: {
      exclude: ['password', 'resetPwdToken', 'resetPwdExpire']
    }
  });
  return user;
};

const userServices = { getUser };

module.exports = userServices;
