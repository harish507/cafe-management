var express=require('express');
var app=express();
//app.get('/reg.html',function(req,res){
 //res.sendFile(Documents + "/" + "/reg.html");
app.use(express.static('F:\node',{ index: 'reg.html'
}));
app.listen(1277);