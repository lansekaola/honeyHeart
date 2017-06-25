/**
 * Created by DELL on 2016/8/25.
 */
var mumObj=function(){
    this.x=[];
    this.y=[];
    this.angle;
    this.mumTailTimer=0;
    this.mumTailCount=0;
    this.mumEyeTimer=0;
    this.mumEyeCount=0;//记录执行到哪一帧
    this.mumEyeInterval=1000;
    this.mumBodyCount=0;
};
mumObj.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;
};
mumObj.prototype.draw=function(){
    this.x=lerpDistance(mx,this.x,0.98);//封装好的追随函数,最后的小数比率值越大反应越慢
    this.y=lerpDistance(my,this.y,0.98);
    var deltaX=mx-this.x;
    var deltaY=my-this.y;
    var deta=Math.atan2(deltaY,deltaX)+Math.PI;//计算角度差，反正切
    this.angle=lerpAngle(deta,this.angle,0.6);//封装好的函数，不断的趋近与鼠标的值，三个参数，一个是目标值，当前值，百分比
    //计算大鱼尾巴的动画时间
    this.mumTailTimer+=deltaTime;
    if(this.mumTailTimer>50){
        this.mumTailCount=(this.mumTailCount+1)%8;
        this.mumTailTimer%=50;//清空定时器
    }
    //大鱼眨眼睛
    this.mumEyeTimer+=deltaTime;
    if(this.mumEyeTimer>this.mumEyeInterval){
        this.mumEyeCount=(this.mumEyeCount+1)%2;//不超过二
        this.mumEyeTimer%=this.mumEyeInterval;//清除时间间隔
        if(this.mumEyeCount==0){
            this.mumEyeInterval=Math.random()*1500+2000;
        }else{
            this.mumEyeInterval=200;
        }
    }
    ctx1.save();//样式区间
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);//旋转
    ctx1.drawImage(mumTail[this.mumTailCount],-mumTail[this.mumTailCount].width*0.5+30,-mumTail[this.mumTailCount].height*0.5);
   if(data.double==1){//判断data.double的值是什么，决定绘制什么颜色的身体
       ctx1.drawImage(mumBodyOra[this.mumBodyCount],-mumBodyOra[this.mumBodyCount].width*0.5,-mumBodyOra[this.mumBodyCount].height*0.5);
   }else{
       ctx1.drawImage(mumBodyBlue[this.mumBodyCount],-mumBodyBlue[this.mumBodyCount].width*0.5,-mumBodyBlue[this.mumBodyCount].height*0.5);
   }
    ctx1.drawImage(mumEye[this.mumEyeCount],-mumEye[this.mumEyeCount].width*0.5,-mumEye[this.mumEyeCount].height*0.5);
    ctx1.restore();
}
