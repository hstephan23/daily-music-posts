const User = require('./User');
const Comments = require('./Comments');
const Reactions = require('./Reactions');
const Music = require('./Music');

User.hasMany(Music, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

User.hasMany(Comments, {
  foreignKey: 'username',
    onDelete: 'CASCADE'
})

User.hasMany(Reactions, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Music.hasMany(Comments, {
    foreignKey: 'music_id',
    onDelete: 'CASCADE'
  });

Music.hasMany(Reactions, {
    foreignKey: 'music_id',
    onDelete: 'CASCADE'
  });

Comments.belongsTo(User, {
    foreignKey: 'username'
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
