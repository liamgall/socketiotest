var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = 0;
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.sockets.emit('an event sent to all connected clients');

io.on('connection', function(socket){
    var player = ++players;
    console.log(players + "connected");
    socket.on('chat', function(msg){
        io.emit('chat message', 'user'+player +' : ' + msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
