'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
         //user.hasMany(models.dog, {foreignKey: 'user_id'});
        // associations can be defined here
      }
    }
  });
  return user;
};