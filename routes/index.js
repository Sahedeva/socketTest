module.exports = function(io){
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

io.on('connection',function(socket){
  console.log('a user connected');
  socket.emit('announcements', {message: 'A new user has connected.'});
  // socket.on('chatMessage', function(msg){
  //   console.log(msg);
  //   io.emit('chatMessage', msg);
  // });
  socket.on('event', function(data) {
        console.log('A client sent us this dumb message:', data.message);
        socket.emit('Incoming', {message: data.message});
  });

});

return router;
}
