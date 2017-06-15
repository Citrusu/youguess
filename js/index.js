var canvasBox = document.getElementById("canvasBox"),//canvas
    $canvasWrap = $(".canvas-container"),//canvas容器 
    $canvasBox = $(canvasBox),//canvas
    $tips = $(".J-tips-text"),//提示
    $times = $(".J-times-wrap");//倒计时
var config = {
    userstatus: true,//画笔开放，允许绘画
    username: " ",//用户名称
    w: $canvasWrap.width(),//画布宽度
    h: $canvasWrap.height(),//画布高度
    gamestatus: true,//游戏状态
    color: "green",//画笔颜色
    size: 1,//画笔大小
    time: 60,//一局游戏时间
    name: null,//绘画的物体名字
    timer: null,//计时器
    rect: canvasBox.getBoundingClientRect()
};
var socket = io('localhost:3000');
var ctx = canvasBox.getContext("2d");
function init(){
    canvasBox.width = config.w;
    canvasBox.height = config.h;
    ctx.fillStyle = "#fff";//背景颜色
    ctx.fillRect(0, 0, config.w, config.h);//绘制背景
    ctx.lineWidth = config.size;//线条粗细，单位“px”
    ctx.strokeStyle = config.color;//线条颜色
}
init();

if(config.userstatus && config.gamestatus){
    // 手指按下屏幕
    $canvasBox.on("touchstart", function (event) {
        if(config.gamestatus){
            var p = getTouch(event);
            ctx.beginPath()
            ctx.moveTo(p.x, p.y);
            socket.emit('movePosition', p);
        }
    });

    // 手指按住屏幕移动
    $canvasBox.on("touchmove", function (event) {
        if(config.gamestatus){
            var p = getTouch(event);
            drawPath(p.x, p.y);
            socket.emit('draw', p);
        }
    });


}

//获取手按压的坐标
function getTouch(event){
    var touch = event.originalEvent.targetTouches[0];//获取第一个手指头信息
    return {
        x: touch.clientX - config.rect.left,
        y: touch.clientY - config.rect.top
    }
}

//绘制路径
function drawPath(x,y) {
    if(config.gamestatus){
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// 提示信息
function tipsText(val){
    $tips.text(val);
}

// 新一轮游戏开始
function gameStart(){
    config.gamestatus = true;
    tipsText(config.username+"正在绘画...");
    $(".J-end-drawing").show();
    var s = config.time;
    config.timer = setInterval(function(){
        if( s <= 0 ){
            s = config.time;
            endDrawing();
            return false;
        }
        $times.text(s);
        s--;
    },1000);
}
// gameStart();

// 结束绘画
function endDrawing(){
    clearInterval(config.timer);
    $times.text(" ");
    $("#name-popup").show();
    tipsText(config.username+"正在提交名称中，请稍后...");
    $(".J-end-drawing").hide();
}

//结束绘画按钮
$(".J-end-drawing").on("click",function(){
    endDrawing();
});

// 绘画完成后提交正确答案
$(".J-submit-answer").on("click",function(){
    var name = $(".J-submit-name").val();
    if( name.length <= 0 ){
        alert("名称不能为空！");
        return false;
    }
    config.name = name;
    alert("提交成功");
    guessStart();
    $("#name-popup").hide();
});

// 竞猜开启
function guessStart(){
    config.gamestatus = false;
    tipsText("正在参与竞猜名字中...");
    var s = 10;
    var timer = setInterval(function(){
        if( s <= 0 ){
            $times.text(" ");
            alert("本轮游戏已结束");
            clearInterval(timer);
            return false;
        }
        $times.text(s);
        s--;
    },1000);
}

//显示答案提交弹窗
function showGuessNameSubmitPop(){
    $("#submit-guessname").show();
}

//判断答案是否猜中
function isGuess(){
    var guessName = $(".J-submit-guessname").val();
    if(guessName.length <= 0){
        alert("不能够为空哦！");
        return false;
    }
    //此处提交至判断答案是否正确

    setTimeout(function(){//倒计时新的一轮游戏开始
        gameStart();
    },10000);
}

//提交昵称
$(".J-submit-nickname").on("click",function(){
    var nickname = $(".J-nickname-val").val();
    if(nickname.length <= 0){
        alert("昵称不能够为空哦！");
        return false;
    }
    config.username = nickname;
    $(".J-user-name").text(config.username);
    $("#nickname-popup").hide();
    gameStart();
});

//修改画笔粗细
$(".J-brush-size").on("click",function(){
    var size = $(this).attr("data-size");
    if(size == " "){
        alert("点击错误！");
        return false;
    }
    config.size = size;
    $(this).addClass("tool-active")
           .siblings().removeClass("tool-active");
    ctx.lineWidth = config.size;
    hideTool();
});

// 
$(".tool-mask,.set-wrap").on("click",function(){
    hideTool();
});

// 隐藏工具栏
function hideTool(){
    $(".tool-wrap").toggle();
    $(".set-wrap").toggle();
}

//清除画板
$(".J-clear-rect").on("click",function(){
    ctx.clearRect(0,0,config.w,config.h);
    hideTool();
});

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



