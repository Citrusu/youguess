/**
 * Created by Citrus on 2017/6/16.
 */
const socketio = require('socket.io');

const socket = function(server){
    let io = socketio((server));
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

        socket.on('draw', function(data){
            socket.broadcast.emit('draw', data);
        });

        socket.on('movePosition', function(data){
            socket.broadcast.emit('movePosition', data);
        })
    });

};

module.exports = socket;