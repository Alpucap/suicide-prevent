module.exports = (sequelize, DataTypes) => {
  const Counseling = sequelize.define("Counseling", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  });
  return Counseling;
};
