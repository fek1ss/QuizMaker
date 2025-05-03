// models/UserAnswer.js
module.exports = (sequelize, DataTypes) => {
  const UserAnswer = sequelize.define('UserAnswer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resultId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answerText: {
      type: DataTypes.TEXT,
      allowNull: true, // для открытых вопросов
    },
  });

  UserAnswer.associate = (models) => {
    UserAnswer.belongsTo(models.Question, { foreignKey: 'questionId' });
    UserAnswer.belongsTo(models.UserResult, { foreignKey: 'resultId' });
    UserAnswer.hasMany(models.UserAnswerOption, { foreignKey: 'userAnswerId' });
  };

  return UserAnswer;
};
