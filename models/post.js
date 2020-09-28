'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User);
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