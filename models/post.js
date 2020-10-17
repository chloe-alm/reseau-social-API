'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User,{
        foreignKey:"userId",
      });
    }
  };
  Post.init({
    content: {type:DataTypes.TEXT},
    userId: {type:DataTypes.INTEGER},
    like: {type:DataTypes.INTEGER, defaultValue:0},
    picture: {type: DataTypes.TEXT, allowNull: true},
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};