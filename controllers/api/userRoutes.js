const router = require('express').Router();
const { User } = require('../../models');

// post route to create a new user
router.post('/', async (req, res) => {
  try {
    // creates the user data from the body information
    const userData = await User.create(req.body);
    // saves the user data 
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
    }
    );
  // kick an error if anything goes wrong
  } catch (err) {
      res.status(400).json(err);
  }
})

// post route to login in
router.post('/login', async (req, res) => {
  try {
    // checks if the username exists
    const userData = await User.findOne({ where: { username: req.body.username } });
    // kick an error if the userData doesn't exist 
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    // check if the password works
    const validPassword = await userData.checkPassword(req.body.password);
    // kicks an error if the password is incorrect
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    // keep the user saved in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  // kick an error if anything goes wrong
  } catch (err) {
    res.status(400).json(err);
  }
});

// post route for logout
router.post('/logout', async (req, res) => {
  try {
    // deletes the session, ending it if logged in
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    };
  // kick an error if anything goes wrong
  } catch (err) {
    res.status(400).json(err);
  }
})

// export the routes
module.exports = router;