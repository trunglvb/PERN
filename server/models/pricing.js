'use strict';
//bang nay de chia goi kim cuong, vang , bac ( che do gia ca)
const { Model } = require('sequelize');
const { EnumPricing } = require('@utils/constants');
module.exports = (sequelize, DataTypes) => {
  class Pricing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pricing.hasMany(models.User, {
        foreignKey: 'idPricing',
        as: 'rUser'
      });
    }
  }
  Pricing.init(
    {
      name: {
        type: DataTypes.ENUM,
        values: EnumPricing
      }, // ten cua goi (vang , bac, kim cuong)
      isDisplayImmedialy: DataTypes.BOOLEAN, // exp: tin thuong khong the  hien thi ngay
      levelShowDescription: DataTypes.FLOAT, // exp: muc do uu tien hien thi mo ta
      priority: DataTypes.INTEGER, // muc do uu tien
      requireScore: DataTypes.INTEGER, // diem ma tai khoan can de len level do
      requireScoreNextLevel: DataTypes.INTEGER, // diem ma tai khoan can de len level tiep theo
      price: DataTypes.BIGINT, // gia de nang cap level nay
      expiredDay: DataTypes.INTEGER, // thoi gian het han cua bai dang theo goi,
      imageUrl: DataTypes.STRING // anh dai dien cho goi
    },
    {
      sequelize,
      modelName: 'Pricing'
    }
  );
  return Pricing;
};
