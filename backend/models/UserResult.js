module.exports = (sequelize, DataTypes) => {
  const UserResult = sequelize.define("UserResult", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    testId: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    timestamps: true,
  });

  return UserResult;
};
