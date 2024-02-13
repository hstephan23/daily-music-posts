const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// extend the class
class Music extends Model {}

// used ERD to determine necessary pieces 
Music.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    song_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
        },
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
        },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
        },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'music',
  }
);

// export the model
module.exports = Music;
