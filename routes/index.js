module.exports = function(io){
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var numClients = 0;
var clientId = 0;
io.on('connection',function(socket){
  numClients++;
  clientId++
  var message = "You have connected and your id is " + clientId;
  socket.emit('conn',{message:message,clientId:clientId});
  var message = 'A new client has connected';
  io.emit('stats', { numClients: numClients, message: message});
    console.log('Connected clients:', numClients);
  console.log('a user connected');
  socket.on('disconnect', function() {
        numClients--;
        io.emit('stats', { numClients: numClients, message: 'A user has disconnected.'});

        console.log('Connected clients:', numClients);
    });

  // socket.emit('announcements', {message: 'A new user has connected.'});
  socket.on('chatMessage', function(msg){
    console.log(msg);
    io.emit('chatMessage', msg);
  });
  socket.on('event', function(data) {
        console.log('Client #',data.clientId,'sent us this dumb message:', data.message);
        io.emit('Incoming', {message: data.message, clientId: data.clientId});
  });

});

return router;
}
