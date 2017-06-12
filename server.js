/**
 * Created by Citrus on 2017/6/10.
 */
const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(3000);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

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
