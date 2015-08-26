/**
 * Created by one on 2015/4/25.
 */
enum BlockEnu
{
    init=0,
    stone=1,//子弹无法穿透,坦克无法通过
    tree=2,//子弹可以清除
    river=3,//子弹可以穿过,坦克无法通过
    desert=4,//沙漠,速度减慢
    base=9,//我方基地

    max,
    turret=5,//炮塔,自动攻击
}

enum Direction
{
    init=0,
    up=0,
    right,
    down,
    left,

    max,
}

class Global
{
    public static stageWidth:number = 1024;
    public static stageHeight:number = 768;

    public static horPadding:number=60;
    public static verPadding:number=80;

    public static horBlockNum:number=30;
    public static verBlockNum:number=20;

    public static blockWidth:number=30;
    public static blockHeight:number=30;

    public static clientWidth:number=Global.blockWidth*Global.horBlockNum;
    public static clientHeight:number=Global.blockHeight*Global.verBlockNum;

    public static baseTankWidth:number = 36;
    public static baseTankHeight:number = 36;


    public static enemyNestPos:Array<egret.Point> = [new egret.Point(1,1),new egret.Point(15,1),new egret.Point(29,1)]

    public static createBitmap(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static gokeyHero:string = "Hero";
    public static gokeyEnemy:string = "Enemy";
    public static gokeyBlock:string = "Block";
    //public static gokeyBullet:string = "Bullet";
    public static gokeyHeroBullet:string = "HeroBullet";
    public static gokeyEnemyBullet:string = "EnemyBullet";
    public static gokeyNest:string = "EnemyNest";

    /**
     * 前闭后开
     * */
    public static randomInt(min:number,max:number)
    {
        return Math.floor(Math.random()*100000)%max + min;
    }

    public static randomBool():boolean
    {
        return Math.random() > 0.50 ? true:false;
    }

    public static getTextureByName(name:string):egret.Texture {
        return RES.getRes(name);
    }

}