/**
 * Created by DELL on 2016/8/25.
 */
var babyObj=function(){
    this.x;
    this.y;
    this.angle;
    this.babyTail=new Image();
    this.babyEyeTimer=0;
    this.babyEyeCount=0;//记录执行到哪一帧
    this.babyEyeInterval=1000;//时间间隔
    this.babyBodyTimer=0;
    this.babyBodyCount=0;
};
babyObj.prototype.init=function(){
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle=0;
    this.babyTail.src="src/babyTail0.png";
};
babyObj.prototype.draw=function(){
    this.x=lerpDistance(mum.x,this.x,0.98);
    this.y=lerpDistance(mum.y,this.y,0.98);//小鱼追随鱼妈妈走

    var deltaX=mum.x-this.x;//追随大鱼旋转角度
    var deltaY=mum.y-this.y;
    var deta=Math.atan2(deltaY,deltaX)+Math.PI;//计算角度差，反正弦
    this.angle=lerpAngle(deta,this.angle,0.6);

    //小鱼眼睛的动画
    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount=(this.babyEyeCount+1)%2;//不超过二
        this.babyEyeTimer%=this.babyEyeInterval;//清除时间间隔
        if(this.babyEyeCount==0){
            this.babyEyeInterval=Math.random()*1500+2000;
        }else{
            this.babyEyeInterval=200;
        }
    }
    //小鱼身体的变化动作
    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>300){
        this.babyBodyTimer%=300;
        this.babyBodyCount=this.babyBodyCount+1;
        if(this.babyBodyCount>19){
            this.babyBodyCount=19;
            data.gameOver=true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.babyTail,-this.babyTail.width*0.5+23,-this.babyTail.height*0.5);
    ctx1.drawImage(babyBody[this.babyBodyCount],-babyBody[this.babyBodyCount].width*0.5,-babyBody[this.babyBodyCount].height*0.5);
    ctx1.drawImage(babyEye[this.babyEyeCount],-babyEye[this.babyEyeCount].width*0.5,-babyEye[this.babyEyeCount].height*0.5);
    ctx1.restore();
}