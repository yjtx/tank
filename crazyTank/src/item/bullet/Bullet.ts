
class Bullet extends GameObject implements IHit {
    //public static key:string = Global.gokeyBullet;

    public _radius:number = 0;
    private _direction:number = 0;
    private _range:number = 0;
    private _speedRatio:number = 1;

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("bullet"));
        this.view.anchorX = this.view.anchorY = 0.5;
    }

    public initialize(x:number, y:number, dir:number, speed:number, range:number, radius:number):void {
        this._radius = radius;
        this.view.height = this.view.width = radius * 2;
        this.view.x = x;
        this.view.y = y;
        this._direction = dir;
        this._speedRatio = speed;
        this._range = range;
    }

    public onCreate():void {
        GameView.instance.addBullet(this);
    }

    public onDestroy():void {
        GameView.instance.delBullet(this);
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    }

    public onHit():void {

        ObjectPool.getInstance().destroyObject(this);
    }

    public onEnterFrame(advancedTime:number):void {

        var distance:number = advancedTime * this._speedRatio;
        switch (this._direction) {
            case Direction.up:
                this.view.y -= distance;
                break;
            case Direction.right:
                this.view.x += distance;
                break;
            case Direction.down:
                this.view.y += distance;
                break;
            case Direction.left:
                this.view.x -= distance;
                break;
            default :
                alert("error dir");
                return;
        }
        this._range -= distance;


        this.checkReclaim();
    }

    private checkReclaim():void {
        if (this._range <= 0
            || this.view.y < Global.verPadding
            || this.view.y > Global.verPadding + Global.clientHeight
            || this.view.x < Global.horPadding
            || this.view.x > Global.horPadding + Global.clientWidth) {
            ObjectPool.getInstance().destroyObject(this);
        }
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

    public hitTestGo(go:GameObject) {
        alert("super hitTestGo");
        var cen:egret.Point = new egret.Point(this.view.x, this.view.y);
        if (egret.Point.distance(new egret.Point(go.view.x, go.view.y), cen)
            >= go.view.width / 2 + this._radius) {
            return false;
        }

        return true;
    }
}