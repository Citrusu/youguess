const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const app = new Koa();
const router = new Router();

const io = require('socket.io')(app);
app.listen(3000);

app.use(router.routes());
app.use(router.allowedMethods());


app.use(async (ctx) => {
    console.log(ctx.request.url);
    let html = await render(ctx.request.url);
    ctx.body = html;
});

// router.get('/', async (ctx) => {
//     console.log(1);
//     console.log(ctx.request.url);
    //let html = await render(ctx.request.url);
    //ctx.body = html;
// });

/*
 * 根据 page 返回 html
 * @param page
 * */
function render(page){
    return new Promise((resolve, reject) => {
        let loadPage = `./${page}`;
        fs.readFile(loadPage, 'binary', (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}


io.on('connection', function (socket) {
    console.log('conected');
    socket.emit('news', 'conected');
    socket.on('news', function(data){
        console.log(data);
    });
    // socket.on('msg', function (data) {
    //     console.log(data);
    //     socket.broadcast.emit('msg', data);
    // });
});

