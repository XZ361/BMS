var express = require("express");
var router = express.Router();
var db = require("../sql.js");
var multiparty = require("multiparty");

router.post("/", function (req, res, next) {
  let form = new multiparty.Form();
  //   上传的图片必须有一个保存的目录
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    let id = fields.id[0];

    let imgName = fields.imgName[0];
    let pic = files.pic[0].path;
    console.log(id, imgName, pic);
    db.query(
      `update banner set id=?,name=?,imgurl=? where id=${id}`,
      [id, imgName, pic],
      (err, data) => {
        db.query("select * from banner", (err, data) => {
          //   console.log(data.length);
          if (err) {
            throw err;
          } else {
            let pager = {};
            let parent = [];

            pager.pageSize = 5;
            pager.pageCurrent = 1;
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
        });
      }
    );
  });
  //   console.log(like);
});
module.exports = router;
