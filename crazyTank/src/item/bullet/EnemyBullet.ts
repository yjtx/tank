/**
 * Created by one on 2015/4/25.
 */
class EnemyBullet extends Bullet
{
    public static key:string = Global.gokeyEnemyBullet;
    constructor()
    {
        super();
    }

    public onCreate():void {
        super.onCreate();
        console.log("[EnemyBullet] onCreate");
    }

    public onDestroy():void {
        super.onDestroy();
        console.log("[EnemyBullet] onDestroy");
    }

    /*public hitTest(tx:number,ty:number,radius:number):boolean
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
            case Global.gokeyHero:
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