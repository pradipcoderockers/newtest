// config/database.js
var config = require('./config.json');
module.exports = {
    'connection': {
        'host': config.mysql.host,
        'user': config.mysql.username,
        'password': config.mysql.password
    },
	'database': config.mysql.database,
    'users_table': 'user'
};


