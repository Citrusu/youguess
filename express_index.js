/**
 * Created by Citrus on 2017/6/13.
 */
const app = require('express')();
const server = require('http').Server(app);
require('./server/socket')(server); //使用 socket.io
const router = require('./server/router');

//配置
const config = require('./server/config');

//使用路由
router(__dirname ,app);


server.listen(config.port, () => {
    console.log(`server listening prot ${config.port}`);
});