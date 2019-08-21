const request = require('request-promise');

const API_KEY = '347a894eb9d34593bd88db8a1e5cc1ee';

class Spotify {
    static retrieveByCity(city, callback) {
        request({
            uri: `https://api.spotify.com/v1`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not reach Spotify API.' });
        });
    }
}

module.exports = Spotify;