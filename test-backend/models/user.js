'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.hasMany(models['social_login'], {foreignKey: 'user_id'})
    }
  };
  
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    introduce: DataTypes.STRING,
    type: DataTypes.INTEGER,
    email_authentication: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};