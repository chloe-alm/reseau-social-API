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
    content: {type:DataTypes.STRING},
    like: {type:DataTypes.INTEGER, defaultValue:0},
    picture: {type: DataTypes.STRING, allowNull: true},
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};