var express = require("express");
var router = express.Router();
var db = require("../sql.js");
var multiparty = require("multiparty");

router.post("/", function (req, res, next) {
  console.log(111);
  let form = new multiparty.Form();
  //   上传的图片必须有一个保存的目录
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    let imgName = fields.imgName[0];
    let pic = files.pic[0].path;
    db.query(
      "insert into banner value (?,?,?)",
      [0, imgName, pic],
      (err, data) => {
        if (err) {
          throw err;
        } else {
          db.query("select * from banner", (err, data) => {
            if (err) {
              throw err;
            } else {
              res.render("bannerList", { bannerList: data });
            }
          });
          // res.end("添加成功 ");
        }
      }
    );
  });
});
module.exports = router;
