'use strict';
const { Model } = require('sequelize');
const { EnumListingType, EnumPropertyTypes, EnumDirection, EnumPostStatus } = require('../utils/constants');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      idPost: DataTypes.STRING, // ma cua bai post, ex: #477733
      title: DataTypes.STRING,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING, // phường
      avgScore: DataTypes.FLOAT, //danh gia diem so
      price: DataTypes.BIGINT,
      priceUnit: DataTypes.BIGINT, // gia tren 1m2
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      floor: DataTypes.INTEGER, //so tang
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      isFurniture: DataTypes.BOOLEAN, // nội thất
      listingType: {
        type: DataTypes.ENUM,
        values: EnumListingType
      }, // bán hoặc cho thuê
      propertyType: {
        type: DataTypes.ENUM,
        values: EnumPropertyTypes
      },
      direction: {
        type: DataTypes.ENUM,
        values: EnumDirection
      },
      balconyDirection: {
        type: DataTypes.ENUM,
        values: EnumDirection
      }, // huong ban cong
      verified: DataTypes.BOOLEAN, // thong tin chinh xac hay chua
      expiredDate: DataTypes.DATE, // ngay het han cua tin
      expiredBoost: DataTypes.DATE, // ngày hết hạn đẩy tin
      status: {
        type: DataTypes.ENUM,
        values: EnumPostStatus
      },
      idUser: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Post'
    }
  );
  return Post;
};
