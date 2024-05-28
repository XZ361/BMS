var express = require("express");
var router = express.Router();
var db = require("../sql.js");

router.get("/", function (req, res, next) {
  let { name, imgurl } = req.body;
  db.query("select * from banner", [name, imgurl], (err, data) => {
    if (err) {
      throw err;
    } else {
      let pager = {},
        pageSize = 5,
        pageCurrent = 1;
      let dataList = data.slice((pageCurrent - 1) * 5, pageCurrent * pageSize);
      pager.maxNum = data.length;
      pager.pages = Math.ceil(pager.maxNum / pageSize);
      res.render("bannerList", {
        bannerList: dataList,
        pager,
      });
    }
  });
});
module.exports = router;
