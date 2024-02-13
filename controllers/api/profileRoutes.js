const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Music, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// get router to display the page /api/profile/
router.get('/', withAuth, async (req, res) => {
    try {
        // get the username from the search bar 
        const { username } = req.query;
        // find the profile that matches the username
        const user = await User.findOne({
            where: { username }, 
            // exclude password to keep it more secure
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Music,
                    attributes: [
                        'song_title',
                        'artist_name',
                        'genre',
                        'id'
                    ],
                    include: {
                        model: Comments,
                        attributes: [
                            'music_id',
                            'username',
                            'description',
                            'date_created'
                        ]
                    }
                }
            ]
        });
        // clean the data using for loops through map to make it cleaner code
        const cleanedData = {
            username: user.dataValues.username,
            music: user.music.map(m => ({
                song_title: m.dataValues.song_title,
                artist_name: m.dataValues.artist_name,
                genre: m.dataValues.genre,
                music_id: m.dataValues.id,
                comments: user.dataValues.music.map(music => (
                    music.dataValues.comments.map(comment => ({
                        description: comment.dataValues.description,
                        username: comment.dataValues.username,
                        music_id: comment.dataValues.music_id,
                        date_created: comment.dataValues.date_created
                    })
                )))
            }))
        }
        // render the page in the handelbars if all is successful
        res.render('profile', {
            user: cleanedData,
            logged_in: req.session.logged_in
        });
    // kick an error if anything goes wrong
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;