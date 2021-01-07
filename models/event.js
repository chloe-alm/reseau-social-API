'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      models.Event.belongsTo(models.User,{
        foreignKey:"userId",
      });
    }
  };
  Event.init({
    title:{type:DataTypes.STRING},
    userId: {type:DataTypes.INTEGER},
    content:{type:DataTypes.TEXT},
    hashtag:{type:DataTypes.STRING},
   
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};