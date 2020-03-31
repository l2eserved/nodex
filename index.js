process.env.PWD = process.cwd()

var app = require('express')();
var express = require('express');
app.use(express.static(process.env.PWD + '/public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 9999;

const bodyParser = require("body-parser");
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post('/test',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});




//route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/view/index.html');
});
app.get('/test', function(req, res){
  res.sendFile(__dirname + '/public/view/index2.html');
});
//socket io
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
