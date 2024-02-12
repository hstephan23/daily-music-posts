const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Music, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({
            where: { username }, 
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
                            'description'
                        ]
                    }
                }
            ]
        });

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
                        music_id: comment.dataValues.music_id
                    })
                )))
            }))
        }
        console.log(cleanedData);
        console.log(cleanedData.music[0].comments);
        res.render('profile', {
            user: cleanedData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;