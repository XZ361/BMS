const http = require("http");
const querystring = require("querystring");
const mysql = require("mysql");

const app = http.createServer((req, res) => {
  let postVal = "";

  req.on("data", (chunk) => {
    postVal += chunk;
  });
  req.on("end", () => {
    let { userName, userPwd } = querystring.parse(postVal);
    // console.log(userName, userPwd);

    const connection = mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "123456xzX",
      database: "demo3",
    });

    connection.connect();
    connection.query(
      "select * from user where userName=? and userPwd=?",
      [userName, userPwd],
      (err, results, fields) => {
        if (err) throw err;
        if (results.length > 0) {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
          res.write("登陆成功");
          res.end();
        }
      }
    );
    connection.end();
  });
});
app.listen(8080, () => {
  console.log("服务启动成功");
});
