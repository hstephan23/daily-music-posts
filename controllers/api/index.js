const router = require('express').Router();
const userRoutes = require('./userRoutes');
const musicRoutes = require('./musicRoutes');
const commentsRoutes = require('./commentsRoutes')

router.use('/users', userRoutes);
router.use('/music', musicRoutes);
router.use('/comments', commentsRoutes)

module.exports = router;