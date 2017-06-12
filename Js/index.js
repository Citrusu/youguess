

    var canvasBox = document.getElementById("canvasBox"),
        $canvasBox = $(canvasBox),
        w = $(".canvas-container").width(),
        h = $(".canvas-container").height(),
        x = 0, //手指头坐标x的值
        y = 0, //手指头坐标y的值
        path = [];
    canvasBox.width = w;
    canvasBox.height = h;
    var ctx = canvasBox.getContext("2d");
    ctx.fillStyle="#fff";//背景颜色
    ctx.fillRect(0,0,w,h);//绘制背景
    ctx.lineWidth = 2;//线条粗细，单位“px”
    ctx.strokeStyle = 'green';//线条颜色

    $canvasBox.on("touchstart",function(event){
        ctx.moveTo(getTouch(event).x,getTouch(event).y);
    });
    $canvasBox.on("touchmove",function(event){
        x = getTouch(event).x;
        y = getTouch(event).y;
        path.push([x,y]);
        drawPath();
    });

    //获取手按压的坐标
    function getTouch(event){
        var touch = event.originalEvent.targetTouches[0];//获取第一个手指头信息
        var rect = canvasBox.getBoundingClientRect();//获取
        return {
            x : touch.clientX - rect.left,
            y : touch.clientY - rect.top
        }
    }

    //绘制路径
    function drawPath(){
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    function draw(){
        ctx.clearRect(0,0,w,h)
        for(var i=0;i<path.length;i++){
            ctx.lineTo(path[i][0],path[i][1]);
            ctx.stroke();
        }
    }

$(document).ready(function(){    
    function stopScrolling( touchEvent ) {     
        touchEvent.preventDefault();     
    }    
    document.addEventListener( 'touchstart' , stopScrolling , false );    
    document.addEventListener( 'touchmove' , stopScrolling , false );    
}); 






