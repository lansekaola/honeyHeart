/**
 * Created by DELL on 2016/8/25.
 */
var can1;
var can2;
var canHeight;
var canWidth;
var ctx1;
var ctx2;
var lastTime;
var deltaTime;
var bgpic=new Image();
var ane;
var fruitObj;
var mum;
var mx;
var my;
var baby;
var babyEye=[];
var babyBody=[];
var mumTail=[];
var mumEye=[];
var mumBodyOra=[];
var mumBodyBlue=[];
var data;
var wave;
var halo;
document.body.onload=game;
function game(){
    init();
    lastTime= Date.now();//获取当前时间
    deltaTime=0;
    gameLoop();
    var start_btn=document.getElementById("start-btn");
    var continue_btn=document.getElementById("continue-btn");
   start_btn.addEventListener("click",function(){
       var box=document.getElementById("game-state");
       box.style.display="none";
       data.gameOver=false;
   });
    //初始的时候加载图片
    bgpic.src="src/background.jpg";
}
function init(){
    //获得canvas的画笔
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext("2d");
    can1.addEventListener('mousemove',onMouseMove,false);

    can2=document.getElementById("canvas2");
    ctx2=can2.getContext("2d");
    canWidth=can1.width;
    canHeight=can1.height;

    ane=new aneObj();//初始化海葵
    ane.init();

    fruitObj=new fruitObj();
    fruitObj.init();

    mum=new mumObj();
    mum.init();

    baby=new babyObj();
    baby.init();

    mx=canWidth*0.5;
    my=canHeight*0.5;

    //初始化小鱼眼睛的图片数组
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="src/babyEye"+i+".png";
    }
    //小鱼身体的变化帧
    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="src/babyFade"+i+".png";
    }
    //大鱼身体变化帧
    for(var i=0;i<8;i++){
        mumTail[i]=new Image();
        mumTail[i].src="src/bigTail"+i+".png";
    }
    //大鱼的眼睛
    for(var i=0;i<2;i++){
        mumEye[i]=new Image();
        mumEye[i].src="src/bigEye"+i+".png";
    }
    //大鱼的身体
    data=new dataObj();
    for(var i=0;i<8;i++){
        mumBodyOra[i]=new Image();
        mumBodyBlue[i]=new Image();
        mumBodyOra[i].src="src/bigSwim"+i+".png";
        mumBodyBlue[i].src="src/bigSwimBlue"+i+".png";
    }
    ctx1.font="30px Verdana";
    ctx1.textAlign="center";
    wave=new waveObj();
    wave.init();

    halo=new haloObj();
    halo.init();
}
function gameLoop(){
    window.requestAnimationFrame(gameLoop);//setInterval setTimeout 循环这个动作，这个Api是用做动画的
    var now=Date.now();
    deltaTime=now-lastTime;//两帧的时间间隔
    lastTime=now;//重新赋值现在时间
    if(deltaTime>40){
        deltaTime=40;//防止浏览器在停止的时候图片变大
    }
    drawBackground();
    ane.draw();//每一帧都要绘制海葵
    fruitObj.draw();
    fruitMonitor();
    ctx1.clearRect(0,0,canWidth,canHeight)//清楚变粗阴影，两个画布重叠会出现阴影
    mum.draw();
    baby.draw();
    mumFruitCollision();
    mumBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
}
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX|| e.layerX){//获取鼠标的位置
            mx= e.offsetX==undefined? e.layerX: e.offsetX;
            my= e.offsetY==undefined? e.layerY: e.offsetY;
        }
    }
}