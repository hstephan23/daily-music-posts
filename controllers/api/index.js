const router = require('express').Router();
const userRoutes = require('./userRoutes');
const musicRoutes = require('./musicRoutes');
const commentsRoutes = require('./commentsRoutes');
const reactionRoutes = require('./reactionRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/users', userRoutes);
router.use('/music', musicRoutes);
router.use('/comments', commentsRoutes);
router.use('/reactions', reactionRoutes);
router.use('/profile', profileRoutes);

module.exports = router;