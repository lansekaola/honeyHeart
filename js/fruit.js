/**
 * Created by DELL on 2016/8/25.
 */
var fruitObj=function(){
    this.alive=[];
    this.x=[];
    this.y=[];
    this.fruitType=[];
    this.l=[];//果实的图片大小
    this.spd=[];//上浮的速度
    this.aneNo=[];
    this.orange=new Image();
    this.blue=new Image();
};
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=true;
        //初始化
        this.x[i]=0;
        this.y[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;//0.1-0.02之间的随机数
        this.aneNo[i]=0;
        this.born(i);
        this.fruitType[i]='';
    }
    this.orange.src="src/fruit.png";
    this.blue.src="src/blue.png";
};
fruitObj.prototype.draw=function(){
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            if(this.l[i]<=14){//让图片停止放大
                this.x[i]=ane.headx[this.aneNo[i]];//绘制果实的时候，让果实跟随着海葵摆动
                this.y[i]=ane.heady[this.aneNo[i]];
                this.l[i]+=this.spd[i]*deltaTime;
            }else{
                this.y[i]-=this.spd[i]*7*deltaTime;//改变y的值，水果上浮

            }
            //随时间变化的，图片变大
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            if(this.y[i]<10){
                this.alive[i]=false;
            }
        }
    }
};
fruitObj.prototype.born=function(i){
    //果实成长过程，在每个海葵上面，所以要获取每个海葵的位置
    this.aneNo[i]=Math.floor(Math.random()*ane.num);
    this.l[i]=0;//出生的时候做个初始化
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.2){
        this.fruitType[i]="blue";
    }else{
        this.fruitType[i]="orange";
    }
};
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
};
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruitObj.num;i++){
        if(fruitObj.alive[i]){
            num++;
        }
        if(num<15){
            sendFruit();
            return;
        }
    }
};
function sendFruit(){
    for(var i=0;i<fruitObj.num;i++){
        if(!fruitObj.alive[i]){
            fruitObj.born(i);
            return;
        }
    }
}
fruitObj.prototype.update=function(){
    var num=0;
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            num++;
        }
    }
}