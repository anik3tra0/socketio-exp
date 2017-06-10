var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/new_index.html');
});

io.on('connection', function(socket){
  socket.on('new chat message', function(msg){
    io.emit('new chat message', msg)
    console.log('message: ' + msg);
  });
});

// io.on('connection', function (socket) {
//   socket.broadcast.emit('user connected');
// });

http.listen(4000, function(){
  console.log('listening on *:4000');
});
