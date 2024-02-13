const sequelize = require("../config/connection");
const { Comments, Music, Reactions, User } = require("../models");
const commentsData = require("./commentsData.json");
const musicData = require("./musicData.json");
const reactionsData = require("./reactionsData.json");
const userData = require("./userData.json");

// seeding the data base
const seedDatabase = async () => {
    await sequelize.sync({force : true})
    const users = await User.bulkCreate(userData, {
        individualHooks : true,
        returning : true
    })
    const music = await Music.bulkCreate(musicData, {
        returning: true
    })
    const comments = await Comments.bulkCreate(commentsData, {
        returning: true
    })
    const reactions = await Reactions.bulkCreate(reactionsData, {
        returning: true
    })
    process.exit(0);
};

// call function
seedDatabase();