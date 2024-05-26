let mysql = require("mysql");
let db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456xzX",
  database: "cms",
});
db.connect();
module.exports = db;
