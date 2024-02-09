const router = require('express').Router();
const { Music } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth,async (req, res) => {
    try {
        const musicData = await Music.create({
            ...req.body,
            username_id: req.session.username_id,
        });
        
    res.status(200).json(musicData);
    } catch (err) {
        res.status(400).json(err);
    }

})

module.exports = router;