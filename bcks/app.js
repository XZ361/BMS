var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var leftRouter = require("./routes/left");
var rightRouter = require("./routes/right");
var bannerListRouter = require("./routes/bannerList");
var addBanner = require("./routes/addBanner");
var like = require("./routes/like");
var del = require("./routes/del");
var update = require("./routes/update");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", indexRouter);
app.use("/left", leftRouter);
app.use("/right", rightRouter);
app.use("/bannerList", bannerListRouter);
app.use("/addBanner", addBanner);
app.use("/like", like);
app.use("/del", del);
app.use("/update", update);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
