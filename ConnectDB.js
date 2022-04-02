const mysql = require('mysql');
const connection = mysql.createConnection({
  connectionLimit : 100,
  host: "localhost",
  user: "admin",
  password: "fyIHM@FaEXo1",
  database: "task_test",
  multipleStatements: true
});
connection.connect();
module.exports = connection;