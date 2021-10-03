const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    timeout: 60000
})

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log(`DB Connected: ${connection.threadId}`);
});

module.exports = connection;