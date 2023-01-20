var express = require('express');
var router = express.Router();

router.get('/submit', function (req, res, next) {
    res.render('submit', {
        title: 'submit page',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.username,
    });
});

module.exports = router;