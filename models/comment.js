const { Model, DataTypes } = require("sequelize");
const sequelize = require("..config/connection");
class Comment extends Blog {}
Comment.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "user",
      key: "id",
    },
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "blog",
      key: "id",
    },
  },
  commentDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  comment: {
    type: DataTypes.TEXT,
    require: false,
  },
});
