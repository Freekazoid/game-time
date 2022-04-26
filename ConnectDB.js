const mysql = require('mysql');
const connection = mysql.createConnection({
  connectionLimit : 100,
  host: "localhost",
  user: "admin",
  password: "fyIHM@FaEXo1",
  database: "task_test",
  multipleStatements: true
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected DB as id ' + connection.threadId);
});
module.exports = connection;