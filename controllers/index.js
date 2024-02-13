// define the necessary pieces
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// create the routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// export the routes
module.exports = router;
