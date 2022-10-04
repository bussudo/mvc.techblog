const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      require: true,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    commenter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    commentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      require: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);
module.exports = Blog;
