const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AnswerOption = sequelize.define("AnswerOption", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Questions", key: "id" }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    timestamps: true,
  });

  AnswerOption.associate = (models) => {
    AnswerOption.belongsTo(models.Question, {
      foreignKey: "questionId",
      as: "question"
    });
  };

  return AnswerOption;
};