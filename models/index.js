const User = require('./User');
const Comments = require('./Comments');
const Reactions = require('./Reactions');
const Music = require('./Music');

User.hasMany(Music, Comments, Reactions, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

Music.hasMany(Comments, Reactions, {
    foreignKey: 'music_id',
    onDelete: 'CASCADE'
  });

Comments.belongsTo(User, {
    foreignKey: 'user_id'
  });

Comments.belongsTo(Music, {
    foreignKey: 'music_id'
  });

Reactions.belongsTo(User, {
    foreignKey: 'user_id'
  });

Reactions.belongsTo(Music, {
    foreignKey: 'music_id'
  });

Music.belongsTo(User, {
    foreignKey: 'user_id'
  });






  module.exports = { User, Comments, Reactions, Music };
