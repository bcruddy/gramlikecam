var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.json({ message: 'Hello Cam' });
});

// webhook for instagram api
router.get('/ig-comment', function (req, res, next) {
    // get comment text

    // translate

    // post comment @cameron1newton
});

module.exports = router;
