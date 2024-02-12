const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Music } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        console.log('okay');
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
                        'genre'
                    ]
                }
            ]
        });
        
        const cleanedData = {
            username: user.dataValues.username,
            music: user.music.map(m => ({
                song_title: m.dataValues.song_title,
                artist_name: m.dataValues.artist_name,
                genre: m.dataValues.genre

            }))
        }
        console.log(cleanedData);
        res.render('profile', {
            user: cleanedData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;