const app = require('../app');
const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', function(socket){

  socket.on('username', function(username){
    socket.username = username;
    io.emit('is_online', '<i>' + socket.username + ' join the chat room...</i>');
  });

  socket.on('disconnet', function(username){
    io.emit('is_online', '<i>' + socket.username + ' left the chat room...</i>');
  })

  socket.on('chat_message', function(message){
      io.emit('chat_message', '<strong>'+ socket.username + '</strong>: '+ message);
  });
});
