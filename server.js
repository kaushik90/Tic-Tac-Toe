var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.get('/newgame', function(req, res){
	res.sendfile('newgame.html');
});

app.get(/\/[a-zA-Z0-9]+$/, function(req, res){
	res.sendfile('joingame.html');
});

io.on('connection', function(socket){
	console.log('new Instance Started');

	socket.on('token', function(token){
		socket.join(token);
		socket.token=token;
	});

	socket.on('move', function(data){
		socket.broadcast.to(socket.token).emit('move', data);
	});

	socket.on('disconnect', function(data){
		console.log("sm1 disconnected");	 
		socket.broadcast.to(socket.token).emit('opponent_dropped');
  	 });
	
	socket.on('opponent_joined', function(data){
		socket.broadcast.to(socket.token).emit('opponent_joined');
	});

});

app.use(express.static(path.join(__dirname, 'static')));

http.listen(8000, function(){
	console.log('server started on 8000');
});
