'use strict';
module.exports = function(sequelize, DataTypes) {
  var service = sequelize.define('service', {
    type: DataTypes.STRING,
    service_date: DataTypes.DATEONLY,
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