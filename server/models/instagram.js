const request = require('request-promise');

const CLIENT_ID = '7df4ca60652b46839f848e3f36e04d98';
const CLIENT_SECRET = 'ba31473769274879b6a5509a65d914df';

class Instagram {
    static retrieveByHashtag(hashtag, callback) {
        request({
            uri: `https://api.instagram.com/v1/self/media/recent?access_token=${API_KEY}`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not reach Instagram API.' });
        });
    }

    //this is a post function
    static retrieveByCode(codeReceived, callback) {
        request({
            uri: `https://api.instagram.com/oauth/access_token`,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: authorization_code,
            redirect_uri: 'http://localhost:3000',
            code: codeReceived,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not do anything with the code.' });
        });
    }
}

module.exports = Instagram;