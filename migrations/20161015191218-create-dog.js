'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('dogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dog_name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      breed: {
        type: Sequelize.STRING
      },
      temperment: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    return queryInterface.dropTable('dogs');
  }
};