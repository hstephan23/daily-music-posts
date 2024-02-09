const router = require('express').Router();
const { Music } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth,async (req, res) => {
    try {
        const musicData = await Music.create({
            artist_name: req.body.artist_name,
            song_title: req.body.song_title,
            genre: req.body.genre,
            user_id: req.session.user_id,
        });
        console.log('no issue with musicData');
        console.log(musicData);
    res.status(200).json(musicData);
    } catch (err) {
        res.status(400).json(err);
    }

})

module.exports = router;