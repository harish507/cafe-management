var http=require('http');
http.createServer(
function(res,req)
{ req.write("welcome node functions");
  req.end();
}).listen(1277);
console.log("hii succesfull");