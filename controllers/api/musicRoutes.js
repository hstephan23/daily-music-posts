const router = require('express').Router();
const { Music } = require('../../models');
const withAuth = require('../../utils/auth');

// post route for /api/music/ allowing for information to be stored in order to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        // the data is found through the session and body
        const musicData = await Music.create({
            artist_name: req.body.artist_name,
            song_title: req.body.song_title,
            genre: req.body.genre,
            user_id: req.session.user_id,
        });
    // save the data if everythign passes
    res.status(200).json(musicData);
    // catch error if any
    } catch (err) {
        res.status(400).json(err);
    }

})

// export the route
module.exports = router;