import * as http from "http";
const server = http.createServer();
//如果有人请求了，执行这个函数打印，并监听8888端口
server.on("request", (request, response) => {
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);
  const array = []; //声明一个空数组
  request.on("data", (chunk) => {
    array.push(chunk); //把请求体放到数组里
  });
  request.on("end", () => {
    const body = Buffer.concat(array).toString(); //请求体的拼接
    console.log(body);
    response.statusCode = 400; //更改状态码
    response.setHeader("x-lucy", `I am lucy`); //设置响应头
    response.write("1\n"); //设置响应体
    response.write("2\n");
    response.write("3\n");
    response.end(); //响应结束
  });
});
server.listen(8888);
