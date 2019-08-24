var express = require('express');
var Hashtags = require('../models/hashtags');

var router = express.Router();

router.get('/', function (req, res) {
    Hashtags.retrieveAll(function (err, hashtags) {
        if (err) {
            return res.json(err);
        }
        return res.json(hashtags);
    });
});

router.post('/', function (req, res) {
    var hashtag = req.body.hashtag;
    Hashtags.insert(hashtag, function (err, result) {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});

module.exports = router;