/**
 * Created by Citrus on 2017/6/13.
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/js/index.js', function (req, res) {
    res.sendFile(__dirname + '/js/index.js');
});

app.get('/css/index.css', function (req, res) {
    res.sendFile(__dirname + '/css/index.css');
});

app.get('/css/actui.css', function (req, res) {
    res.sendFile(__dirname + '/css/actui.css');
});

io.on('connection', function (socket) {
    console.log('conected');
    socket.emit('news', 'conected');
    socket.on('news', function(data){
        console.log(data);
    });
    socket.on('msg', function (data) {
        console.log(data);
        socket.broadcast.emit('msg', data);
    });
});