const db = require('../database');

class Hashtags {
    static retrieveAll(callback) {
        db.query('SELECT hashtag_name from hashtags', function (err, res) {
            if (err.error) {
                return callback(err);
            }
            callback(res);
        });
    }

    static insert(hashtag, callback) {
        db.query('INSERT INTO hashtags (hashtag_name) VALUES ($1)', [hashtag], function (err, res) {
            if (err.error) {
                return callback(err);
            }
            callback(res);
        });
    }
}

module.exports = Hashtags;