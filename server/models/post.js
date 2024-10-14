'use strict';
const { Model } = require('sequelize');
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
      avgStar: DataTypes.INTEGER,
      price: DataTypes.BIGINT,
      size: DataTypes.STRING,
      description: DataTypes.STRING,
      floor: DataTypes.INTEGER,
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      isFurniture: DataTypes.BOOLEAN
      // listingType: DataTypes,
      // propertyType: DataTypes,
      // direction: DataTypes,
      // balconyDirection: DataTypes,
      // verified: DataTypes,
      // expiredDate: DataTypes,
      // expiredBoost: DataTypes,
      // status: DataTypes,
      // idUser: DataTypes
    },
    {
      sequelize,
      modelName: 'Post'
    }
  );
  return Post;
};
