var { Pool } = require('pg'); //interface we will use to interact with postgres instance

// const CONNECTION_STRING = process.end.DATABASE_URL || 'postgresql://postgres:x8f4pt@localhost:5432/sample';
const CONNECTION_STRING = 'postgresql://postgres:x8f4pt@localhost:5432/sample';
const SSL = process.env.NODE_ENV === 'production';

class Database {
    constructor() {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: SSL
        });

        this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });
    }

    query(query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) {
                throw err;
            }
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database error.' }, null);
                }
                callback({}, res.rows);
            });
        });
    }

    //test

    end() {
        this._pool.end();
    }
}

module.exports = new Database();