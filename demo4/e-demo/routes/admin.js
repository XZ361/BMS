var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond with a resource');
  res.render("admin", { title: "admin" });
});
router.get("/login", function (req, res, next) {
  // res.send('respond with a resource');
  res.render("login", { title: "login" });
});

module.exports = router;
