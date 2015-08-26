/**
 * Created by one on 2015/4/25.
 */
class HeroBullet extends Bullet
{
    public static key:string = Global.gokeyHeroBullet;
    constructor()
    {
        super();
    }

    public onCreate():void {
        super.onCreate();
        //Hero.instance.addBullet(this);
        console.log("[HeroBullet] onCreate");
    }

    public onDestroy():void {
        //Hero.instance.delBullet(this);
        super.onDestroy();
        console.log("[HeroBullet] onDestroy");
    }

    /*
    public hitTest(tx:number,ty:number,radius:number):boolean
    {
        var cen:egret.Point = new egret.Point(this.view.x,this.view.y);

        if(egret.Point.distance(new egret.Point(tx,ty),cen)
            >= radius+this._radius)
        {
            return false;
        }


        return true;
    }*/

    public hitTestGo(go:GameObject)
    {
        switch(go.key) {
            case Global.gokeyBlock:
                break;
            case Global.gokeyEnemy:
                break;
            default:
                return false;
        }

        var cen:egret.Point = new egret.Point(this.view.x,this.view.y);
        if(egret.Point.distance(new egret.Point(go.view.x,go.view.y),cen)
            >= go.view.width/2+this._radius)
        {
            return false;
        }

        return true;
    }
}