const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });
    }
  }

  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Gunakan UUIDV4 untuk membuat UUID otomatis
        primaryKey: true,                // Menyatakan ini adalah primary key
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID, 
        allowNull: false,
        references: {
          model: "Users",  // Menghubungkan dengan tabel Users
          key: "id",       // Menentukan kolom yang menjadi foreign key
        },
      }
    },
    {
      sequelize,
      modelName: "Post",
      timestamps: true,
    }
  );

  return Post;
};
