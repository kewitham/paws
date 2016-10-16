'use strict';
module.exports = function(sequelize, DataTypes) {
  var dog = sequelize.define('dog', {
    dog_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    temperment: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        //dog.belongsTo(models.user, {
          //onDelete: "CASCADE",
          //foreignKey: {
            //allowNull: false
          //}
        //})
        dog.hasMany(models.appointment{foreignKey: 'dog_id'});
        // associations can be defined here
      }
    }
  });
  return dog;
};