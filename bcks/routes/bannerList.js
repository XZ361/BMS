var express = require("express");
var router = express.Router();
var db = require("../sql.js");

router.get("/", function (req, res, next) {
  let { name, imgurl } = req.body;
  db.query("select * from banner", [name, imgurl], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.render("bannerList", { bannerList: data });
    }
  });
});
module.exports = router;
