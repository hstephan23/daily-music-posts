const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// extend the class
class Reactions extends Model {}

// used ERD to determine necessary pieces 
Reactions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
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
      }
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
    modelName: 'reactions',
  }
);

// export the model
module.exports = Reactions;
