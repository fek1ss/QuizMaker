const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Question = sequelize.define("Question", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    testId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Tests", key: "id" }
    },
    text: DataTypes.TEXT,
    type: DataTypes.ENUM("single", "multiple", "text"),
    points: DataTypes.INTEGER,
  }, {
    tableName: 'questions',
    timestamps: true,
  });

  Question.associate = (models) => {
    Question.hasMany(models.AnswerOption, {
      foreignKey: "questionId",
      as: "options"
    });
  };

  return Question;
};
