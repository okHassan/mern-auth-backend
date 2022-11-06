const router = require('express').Router()
const authenticate = require('../middleware/authenticate')

router.get('/private', authenticate, (req, res) => {
    res.send(req.user)
})

module.exports = router