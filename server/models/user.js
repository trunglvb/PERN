const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      emailVerified: DataTypes.BOOLEAN,
      phoneVerified: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      balance: DataTypes.BIGINT,
      score: DataTypes.INTEGER,
      resetPwdToken: DataTypes.STRING,
      resetPwdExpire: DataTypes.DATE,
      idPricing: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
