const router = require('express').Router();
const { Comments, Music, Reactions, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const musicData = await Music.findAll({
            include: [
            {
                model: User,
                attributes: ['username'],                
            },
            {
                model: Comments,
                attributes: ['description'],    
            },
            {
                model: Reactions,
                attributes: ['reaction_type'],
            }
          ],
        });
        const musicPosts = musicData.map((music) => music.get ({ plain: true }));
        console.log(JSON.stringify(musicPosts));
        res.json(musicPosts)
    }
    catch (err) {
        res.status(500).json(err);
    }   

});

module.exports = router;