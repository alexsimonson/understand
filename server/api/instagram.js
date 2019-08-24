var express = require('express');
var Instagram = require('../models/instagram');

var router = express.Router();

router.get('/:hashtag', function (req, res) {
    var hashtag = req.params.hashtag;

    Instagram.retrieveByHashtag(hashtag, function (err, instagram) {
        if (err) {
            return res.json(err);
        }
        return res.json(instagram);
    });
});

router.post('/:code', function (req, res) {
    var code = req.params.code;

    Instagram.retrieveByCode(code, function (err, instagram) {
        if (err) {
            return res.json(err);
        }
        return res.json(instagram);
    });
});

module.exports = router;