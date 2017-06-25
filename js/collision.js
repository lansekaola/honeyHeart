/**
 * Created by DELL on 2016/8/25.
 */
/**************碰撞的功能*****************/
//判断大鱼和果实的距离，如果小于某一个值，就认为大鱼把果实吃掉了
function mumFruitCollision(){
    if(!data.gameOver){
        for(var i=0;i<fruitObj.num;i++){
            if(fruitObj.alive[i]){
                var l=calLength2(fruitObj.x[i],fruitObj.y[i],mum.x,mum.y);//封装好的函数，两个距离的平方
                if(l<900){
                    fruitObj.dead(i);
                    data.fruitNum++;
                    mum.mumBodyCount++;
                    if(mum.mumBodyCount>7){
                        mum.mumBodyCount=7;
                    }
                    if(fruitObj.fruitType[i]=="blue"){
                        data.double=2;
                    }
                    wave.born(fruitObj.x[i],fruitObj.y[i]);
                }
            }
        }
    }
}
//大鱼和小鱼之间的碰撞
function mumBabyCollision(){
    if(data.fruitNum>0&&!data.gameOver){
        var l=calLength2(mum.x,mum.y,baby.x,baby.y);
        if(l<900){
            baby.babyBodyCount=0;
            mum.mumBodyCount=0;
            data.addScore();
            halo.born(baby.x,baby.y);
        }
    }
}
