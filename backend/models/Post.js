module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  });
  return Post;
};
