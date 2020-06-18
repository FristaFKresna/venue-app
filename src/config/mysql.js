var mysql      = require('mysql2');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DBNAME,
  port: process.env.DB_PORT
});

export default connection;