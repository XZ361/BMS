var express = require("express");
var router = express.Router();
var db = require("../sql.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.post("/main", function (req, res, next) {
  let { userName, userPwd } = req.body;

  db.query(
    "select * from user where userName=? and userPwd=?",
    [userName, userPwd],
    (err, data, fields) => {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        res.render("main");
      } else {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        res.end("用户名或密码有误！");
      }
    }
  );
});
module.exports = router;
