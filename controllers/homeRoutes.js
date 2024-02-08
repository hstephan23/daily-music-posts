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
        })
        console.log(musicData);
    }
    catch (err) {
        res.status(500).json(err);
    }   

});