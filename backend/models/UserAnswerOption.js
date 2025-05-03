module.exports = (sequelize, DataTypes) => {
  const UserAnswerOption = sequelize.define('UserAnswerOption', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userAnswerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    optionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  UserAnswerOption.associate = (models) => {
    UserAnswerOption.belongsTo(models.UserAnswer, { foreignKey: 'userAnswerId' });
    UserAnswerOption.belongsTo(models.AnswerOption, { foreignKey: 'optionId' });
  };

  return UserAnswerOption;
};
