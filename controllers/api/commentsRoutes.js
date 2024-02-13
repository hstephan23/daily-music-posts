const router = require('express').Router();
const { User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// route to post to /api/comments/ so that data can store
router.post('/', withAuth,async (req, res) => {
    try {
        // get the username from the current user's id
        const usernameData = await User.findByPk(req.session.user_id, {
            attributes: {
                // exclude password to not include it in data being stored 
                exclude: ['password']
            }
        });
        // get the username from the data
        const username = usernameData.dataValues.username;
        // create the data using information from the body and from the username
        const commentsData = await Comments.create({
            description: req.body.description,
            username: username,
            music_id: req.body.music_id
        });
    // return if good
    res.status(200).json(commentsData);
    // kick error if bad
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;