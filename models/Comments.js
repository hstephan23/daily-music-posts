const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// extend the class
class Comments extends Model {}
// used ERD to determine necessary pieces 
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
        },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    music_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'music',
        key: 'id',
      },
      },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'username',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

// export the model
module.exports = Comments;
