var mysql = require('mysql');
var db_config = {
    host: 'localhost',
    port: '3000',
    user: 'root',
    password: 'unist2020!',
    database: 'reviews'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_config);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}