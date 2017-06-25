/**
 * Created by DELL on 2016/8/25.
 */
var aneObj=function(){
    this.rootx=[];
    this.headx=[];
    this.heady=[];
    this.alpha=0;//正弦角度
    this.amp=[];//振幅
};
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.rootx[i]=i*16+Math.random()*20;//每个海葵之间的间隔
        this.headx[i]=this.rootx[i];
        this.heady[i]=canHeight-200+Math.random()*50;
        this.amp[i]=Math.random()*50+50;
    }
};
aneObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);
    ctx2.save();//样式区间
    ctx2.globalAlpha=0.6;//透明度
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i]=this.rootx[i]+l*this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);//二次贝塞尔曲线，起始点，控制点，结束点
        ctx2.stroke();
    }
    ctx2.restore();//样式区间
}