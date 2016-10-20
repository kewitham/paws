'use strict';
module.exports = function(sequelize, DataTypes) {
  var service = sequelize.define('service', {
    type: DataTypes.STRING,
    time_available: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return service;
};