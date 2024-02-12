const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth,async (req, res) => {
    try {
        const commentsData = await Comments.create({
            description: req.body.description,
            username: req.body.username,
            music_id: req.body.music_id
        });
        
    res.status(200).json(commentsData);
    } catch (err) {
        res.status(400).json(err);
    }

})

module.exports = router;