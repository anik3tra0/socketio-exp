var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log(socket.id);
  socket.broadcast.emit('chat message', 'user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
    io.emit('new chat message', socket)
    console.log('message: ' + msg);
  });

  socket.on('new chat message', function(msg){
    console.log('new message: ' + msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
