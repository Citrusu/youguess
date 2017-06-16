/**
 * Created by Citrus on 2017/6/13.
 */
const app = require('express')();
const server = require('http').Server(app);
const io = require('./server/socket')(server);
const fs = require('fs');

const config = require('./server/config');

server.listen(config.port, () => {
    console.log(`server listening prot ${config.port}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


//处理其它资源
app.use((req, res) => {
    let url = req.url;
    fs.stat(__dirname + url, function(err){
        if(err){
            console.log(`404 not found ${url}`);
            res.sendStatus(404);
        }else{
            //console.log('ok');
            res.sendFile(__dirname + url);
        }
    })
});


