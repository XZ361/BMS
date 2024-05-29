var express = require("express");
var router = express.Router();
var db = require("../sql.js");

router.get("/", function (req, res, next) {
  let inputVal = req.query.searchVal;
  //   console.log(inputVal);
  let pageNum = req.query.page;
  db.query(
    `select * from banner where name like "%${inputVal}%"`,
    (err, data) => {
      if (err) {
        throw err;
      } else {
        let pager = {};
        let parent = [];

        pager.pageSize = 5;
        pager.pageCurrent = pageNum || 1;
        // prev.length = pager.pageCurrent - 1;
        // total.length = 10 - pager.pageCurrent;

        let dataList = data.slice(
          (pager.pageCurrent - 1) * 5,
          pager.pageCurrent * pager.pageSize
        );
        pager.maxNum = data.length;
        pager.pages = Math.ceil(pager.maxNum / pager.pageSize);

        let prevP = pager.pageCurrent > 1 ? pager.pageCurrent : 1;
        let nextP = pager.pages < 10 ? pager.pages : 10;

        parent.total = {};
        parent.prev = {};

        for (let i = 1; i < prevP; i++) {
          parent.prev[i] = i;
        }
        for (let i = parseInt(pager.pageCurrent) + 1; i <= nextP; i++) {
          parent.total[i] = i;
        }
        res.render("bannerList", {
          bannerList: dataList,
          pager,
          parent,
        });
      }
    }
  );
});
module.exports = router;
