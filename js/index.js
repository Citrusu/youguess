var canvasBox = document.getElementById("canvasBox"),
    $canvasBox = $(canvasBox);
var config = {
    w: $(".canvas-container").width(),
    h: $(".canvas-container").height(),
    rect: canvasBox.getBoundingClientRect()
};
var socket = io('http://192.168.9.174:3000');
var ctx = canvasBox.getContext("2d");
function init(){
    canvasBox.width = config.w;
    canvasBox.height = config.h;
    ctx.fillStyle = "#fff";//背景颜色
    ctx.fillRect(0, 0, config.w, config.h);//绘制背景
    ctx.lineWidth = 1;//线条粗细，单位“px”
    ctx.strokeStyle = 'green';//线条颜色
}
init();

$canvasBox.on("touchstart", function (event) {
    var p = getTouch(event);
    ctx.moveTo(p.x, p.y);

    socket.emit('movePosition', p);
});

$canvasBox.on("touchmove", function (event) {
    var p = getTouch(event);
    drawPath(p.x, p.y);

    socket.emit('draw', p);
});

//获取手按压的坐标
function getTouch(event) {
    var touch = event.originalEvent.targetTouches[0];//获取第一个手指头信息
    return {
        x: touch.clientX - config.rect.left,
        y: touch.clientY - config.rect.top
    }
}

//绘制路径
function drawPath(x,y) {
    ctx.lineTo(x, y);
    ctx.stroke();
}

/*
* socket
* */

socket.on('connect', function(){
    console.log('connected!');
    document.title = 'connected';
});

socket.on('draw', function(data){
    drawPath(data.x, data.y);
});

socket.on('movePosition', function(data){
    ctx.moveTo(data.x, data.y);
});

// 禁止 ios 上页面弹动
$(document).ready(function () {
    function stopScrolling(touchEvent) {
        touchEvent.preventDefault();
    }

    document.addEventListener('touchstart', stopScrolling, false);
    document.addEventListener('touchmove', stopScrolling, false);
});


