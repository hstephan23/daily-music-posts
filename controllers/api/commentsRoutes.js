const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth,async (req, res) => {
    try {
        const commentsData = await Comments.create({
            description: req.body.newComments,
            user_id: req.session.user_id,
            music_id: req.body.music_id
        });
        console.log('no issue with commentsData');
        console.log(commentsData);
    res.status(200).json(commentsData);
    } catch (err) {
        res.status(400).json(err);
    }

})

module.exports = router;