const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Reactions, Music, User } = require('../../models');
const withAuth = require('../../utils/auth');

// post route to store data for the reaction that occurs
router.post('/', withAuth, async (req, res) => {
    try {
        // storing the data from session and user input
        const reactionData = await Reactions.create({
            reaction_type: req.body.reaction_type,
            music_id: req.body.music_id,
            user_id: req.session.user_id
        })
        // putting data in database
        res.status(200).json(reactionData);
    // kick an error if anything goes wrong
    } catch (err) {
        res.status(400).json(err);
    }
});

// get route for the specifc reaction liked to display posts that have been liked /api/reactions/liked
router.get('/liked', withAuth, async (req, res) => {
    try {
        // pulling data
        const likedData = await Reactions.findAll({
            include: [{
                model: Music,
                attributes: [
                    'user_id',
                    'song_title',
                    'artist_name',
                    'genre'
                ],
            }, 
            {
                model: User,
                attributes: [
                    'username'
                ],
            }
                ],
            where: {
                reaction_type: 'Like'
            }
        })
        // cleaning data 
        const cleanedData = likedData.map(item => {
            const song_title = item.music.song_title;
            const artist_name = item.music.artist_name;
            const username = item.user.username;
            const genre = item.music.genre;

            return {
                song_title, 
                artist_name, 
                username,
                genre
            }
        });
        // rendering the page in handlebars
        res.render('liked', {
            likedData: cleanedData,
            logged_in: req.session.logged_in
        });
    // kick an error if anything goes wrong
    } catch (err) {
        res.status(400).json(err);
    }
})

// get route for the disliked reaction /api/reaction/disliked
router.get('/disliked', withAuth, async (req, res) => {
    try {
        // select all the data needed
        const dislikedData = await Reactions.findAll({
            include: [{
                model: Music,
                attributes: [
                    'user_id',
                    'song_title',
                    'artist_name',
                    'genre'
                ]
            }, 
            {
                model: User,
                attributes: [
                    'username'
                ],
            }],
            where: {
                reaction_type: 'Dislike'
            }
        })
        // clean the data 
        const cleanedData = dislikedData.map(item => {
            const song_title = item.music.song_title;
            const artist_name = item.music.artist_name;
            const username = item.user.username;
            const genre = item.music.genre;

            return {
                song_title, 
                artist_name, 
                username,
                genre
            }
        });
        // render the page disliked in handlebars
        res.render('disliked', {
            dislikedData: cleanedData,
            logged_in: req.session.logged_in
        });
    // kick an error if anything goes wrong
    } catch (err) {
        res.status(400).json(err);
    }
})

// get route for the hearted reaction /api/reactions/hearted
router.get('/hearted', withAuth, async (req, res) => {
    try {
        // get the data 
        const heartedData = await Reactions.findAll({
            include: [{
                model: Music,
                attributes: [
                    'user_id',
                    'song_title',
                    'artist_name',
                    'genre'
                ]
            }, 
            {
                model: User,
                attributes: [
                    'username'
                ],
            }],
            where: {
                reaction_type: 'Heart'
            }
        })
        // clean the data 
        const cleanedData = heartedData.map(item => {
            const song_title = item.music.song_title;
            const artist_name = item.music.artist_name;
            const username = item.user.username;
            const genre = item.music.genre;

            return {
                song_title, 
                artist_name, 
                username,
                genre
            }
        });
        // render the page if successful using hearted.handlebars
        res.render('hearted', {
            heartedData: cleanedData,
            logged_in: req.session.logged_in
        });
    // kick an error if anything goes wrong
    } catch (err) {
        res.status(400).json(err);
    }
})

// get route for happy reactions, from /api/reactions/happy
router.get('/happy', withAuth, async (req, res) => {
    try {
        // get the data
        const happyData = await Reactions.findAll({
            include: [{
                model: Music,
                attributes: [
                    'user_id',
                    'song_title',
                    'artist_name',
                    'genre'
                ]
            }, 
            {
                model: User,
                attributes: [
                    'username'
                ],
            }],
            where: {
                reaction_type: 'Happy'
            }
        })
        // clean the data 
        const cleanedData = happyData.map(item => {
            const song_title = item.music.song_title;
            const artist_name = item.music.artist_name;
            const username = item.user.username;
            const genre = item.music.genre;

            return {
                song_title, 
                artist_name, 
                username,
                genre
            }
        });
        // render the data using happy.handlebars
        res.render('happy', {
            happyData: cleanedData,
            logged_in: req.session.logged_in
        });
    // kick an error if anything goes wrong
    } catch (err) {
        res.status(400).json(err);
    }
})

// export the routes
module.exports = router;