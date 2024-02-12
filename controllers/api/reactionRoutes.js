const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Reactions, Music, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const reactionData = await Reactions.create({
            reaction_type: req.body.reaction_type,
            music_id: req.body.music_id,
            user_id: req.session.user_id
        })
        res.status(200).json(reactionData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/liked', withAuth, async (req, res) => {
    try {
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

        res.render('liked', {
            likedData: cleanedData,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/disliked', withAuth, async (req, res) => {
    try {
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
        
        res.render('disliked', {
            dislikedData: cleanedData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/hearted', withAuth, async (req, res) => {
    try {
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
        
        res.render('hearted', {
            heartedData: cleanedData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/happy', withAuth, async (req, res) => {
    try {
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
        
        res.render('happy', {
            happyData: cleanedData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
})
module.exports = router;