'use strict';
module.exports = function(sequelize, DataTypes) {
  var appointment = sequelize.define('appointment', {
    appointment_time: DataTypes.TIME,
    appointment_date: DataTypes.DATEONLY,
    service: DataTypes.STRING,
    dog_name: DataTypes.STRING,
    email_confirm: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        //appointment.belongsTo(models.dog, {
          //onDelete: "CASCADE",
          //foreignKey: {
            //allowNull: false
          //}
        //})
        // associations can be defined here
      }
    }
  });
  return appointment;
};