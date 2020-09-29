'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post, {
        foreignKey:"userId",
      });

    }
  };
  User.init({
    firstName:{type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    email:{type: DataTypes.STRING, allowNull: false},
    password:{type: DataTypes.STRING, allowNull: false},
    birthday: {type: DataTypes.DATEONLY, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    picture: {type: DataTypes.STRING, allowNull: true},
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};