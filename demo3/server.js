const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456xzX",
  database: "demo3",
});

connection.connect();
connection.query("select * from user", (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});
connection.end();
