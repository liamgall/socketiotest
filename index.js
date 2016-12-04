var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userPool = new Array();
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});
io.on('connection', function(socket){
    socket.emit('to_client', {msg:"hello"});
    socket.broadcast.emit('to_client', {msg:"user login."});
    socket.on('disconnect', function(){
        socket.broadcast.emit('to_client',{msg:"user logout."});
    })
    socket.on('from_client', function(data){
        console.log(data.msg);
        io.sockets.emit('to_client',{ msg:data.msg });
    });
});
http.listen(3000, function(){
    console.log('listening on *:3000');
});
