const http = require("http");
const Url = require("url");
const server = http.createServer((req, res) => {
  const data = Url.parse(req.url, true).query;
  console.log(data);
  res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
  res.body = "hello";
  res.end("用户名：" + data.user + "密码:" + data.password);
});
server.listen(8080, () => {
  console.log("服务启动成功");
});
