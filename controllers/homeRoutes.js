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
        
        res.render('homepage', {
            musicPosts
        })
    }
    catch (err) {
        res.status(500).json(err);
    }   

});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

module.exports = router;