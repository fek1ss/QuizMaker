module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define("Test", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    tags: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" }
    },
  }, {
    timestamps: true,
  });

  return Test;
};

