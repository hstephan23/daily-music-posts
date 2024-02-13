const router = require('express').Router();
const { Comments, Music, Reactions, User} = require('../models');
const withAuth = require('../utils/auth');

// route to get the / home page rendered
router.get('/', async (req, res) => {
    try {
        // find/collect the data
        const musicData = await Music.findAll({
            include: [
            {
                model: User,
                attributes: ['username'],                
            },
            {
                model: Comments,
                attributes: ['description', 'username', 'date_created'],    
            },
            {
                model: Reactions,
                attributes: ['reaction_type'],
            }
          ],
        });
        // clean the data 
        const musicPosts = musicData.map((music) => music.get ({ plain: true }));
        // render homepage.handlebars
        res.render('homepage', {
            musicPosts,
            logged_in: req.session.logged_in
        })
    }
    // kick an error if anything is wrong
    catch (err) {
        res.status(500).json(err);
    }   

});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    // render the login.handlebars if not logged in 
    res.render('login');
  });
// export the routes 
module.exports = router;