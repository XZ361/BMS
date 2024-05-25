const http = require("http");
const Url = require("url");
const querystring = require("querystring");
const server = http.createServer((req, res) => {
  let postVal = "";
  req.on("data", (chunk) => {
    postVal += chunk;
  });

  //   res.body = "hello";
  req.on("end", () => {
    console.log(querystring.parse(postVal));
    res.end();
  });
});
server.listen(8080, () => {
  console.log("服务启动成功");
});
