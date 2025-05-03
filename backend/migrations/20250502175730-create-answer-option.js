'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserAnswerOptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userAnswerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserAnswers',
          key: 'id',
        },
      },
      optionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AnswerOptions',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserAnswerOptions');
  },
};
