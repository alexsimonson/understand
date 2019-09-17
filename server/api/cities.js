var express = require('express');
var Cities = require('../models/cities');

var router = express.Router();

router.get('/', function (req, res) {
    Cities.retrieveAll(function (err, cities) {
        if (err) {
            return res.json(err);
        }
        return res.json(cities);
    });
});

router.post('/', function (req, res) {
    var city = req.body.city;
    Cities.insert(city, function (err, result) {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});

router.get('/login', function (req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});



module.exports = router;