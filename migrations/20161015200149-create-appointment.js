'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appointment_time: {
        type: Sequelize.TIME
      },
      appointment_date:{
        type: Sequelize.DATEONLY
      },
      service:{
        type: Sequelize.STRING
      },
      email_confirm:{
        type: Sequelize.BOOLEAN
        default: false
      },
      dog_id: {
        type: Sequelize.INTEGER
        references: {
            model: 'dogs',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('appointments');
  }
};