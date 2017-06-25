/**
 * Created by DELL on 2016/8/25.
 */
var dataObj=function(){
    this.fruitNum=0;
    this.double=1;
    this.score=0;
    this.gameOver=true;
    this.alpha=0;
};
dataObj.prototype.draw=function(){
    var w=can1.width;
    var h=can1.height;

    ctx1.save();//样式区间
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    ctx1.fillStyle="white";
    ctx1.fillText("Score:"+this.score,w*0.5,h-20);
    if(this.gameOver){
        this.alpha+=deltaTime*0.0005;
        if(this.alpha>1){
            this.alpha=1;
        }
        ctx1.fillStyle="rgba(255,255,255,"+ this.alpha+")";
        ctx1.fillText("GAME OVER", w*0.5,h*0.5)
        var box=document.getElementById("game-state");
        box.style.display="block";
    }
    ctx1.restore();
};
dataObj.prototype.addScore=function(){
    this.score+=this.fruitNum*10*this.double;
    this.fruitNum=0;
    this.double=1;
}