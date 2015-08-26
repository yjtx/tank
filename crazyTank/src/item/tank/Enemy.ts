/**
 * Created by one on 2015/4/25.
 */
class Enemy extends GameObject implements IHit {
    public static key:string = Global.gokeyEnemy;

    private _locateNo:number = -1;
    private _locateH:number = -1;
    private _locateV:number = -1;

    private _bulletInterval:number = 1500;
    private _deltaBulletTime:number = 0;

    private _deltaThinkTime:number = 0;
    private _thinkInterval:number = 3000;

    private _rotateTime:number = 500;
    private _radius:number = 0;
    private _direction:number = 0;
    private _deltaMove:number = 1;
    private _rotating:boolean = false;
    private _fireOn:boolean = false;
    private _firePoint:egret.Point;

    private _lastActionTime:number = 0;

    /*public get direction():number
     {
     return this._direction;
     }*/
    constructor() {
        super();
        this.view = new egret.Bitmap();
        this.view.anchorX = this.view.anchorY = 0.5;
        this.view.width = Global.baseTankWidth;
        this.view.height = Global.baseTankHeight;
        this._radius = this.view.width / 2;
        this._firePoint = new egret.Point;
    }

    public onCreate():void {
        GameAction.instance.registEnemy(this);
    }

    public initialize(bornX:number, bornY:number) {
        (<egret.Bitmap>this.view).texture = RES.getRes("enemy");
        this.view.x = bornX;
        this.view.y = bornY;
        this.view.rotation = 0;
        this._direction = Direction.init;

        //alert("#################Enemy initialize. direction:"+this._direction);
        //console.log("#################Enemy initialize. direction:"+this._direction);
        this.updateDirect();
    }

    public onDestroy():void {
        console.log("Enemy onDestroy.");
        GameAction.instance.unregistEnemy(this);

        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    }

    public onHit():void {
        //(<egret.Bitmap>this.view).texture = RES.getRes("enemy2");

        //this.onDestroy();
        ObjectPool.getInstance().destroyObject(this);
        /*egret.setTimeout(
         function():void{
         this.onDestroy();
         },this, 500);*/
    }

    public onEnterFrame(advancedTime:number):void {

        if (this._rotating)
            return;

        this._deltaBulletTime += advancedTime;
        if (this._deltaBulletTime > this._bulletInterval) {
            this._deltaBulletTime = 0;
            this.createBullet();
        }

        this._deltaThinkTime += advancedTime;
        if (this._deltaThinkTime > this._thinkInterval) {
            this._deltaThinkTime = 0;
            this.changeDirect();
            return;
        }


        if (this.move()) {
            this.updateDirect(this._direction);
        }
        else {
            this.changeDirect();
        }
    }

    private updateLocateNo() {
        this._locateH = Math.floor(Global.horBlockNum * (this.view.x - Global.horPadding) / Global.clientWidth);
        this._locateV = Math.floor(Global.verBlockNum * (this.view.y - Global.verPadding) / Global.clientHeight);
        this._locateNo = this._locateV * Global.horBlockNum + this._locateH;
    }

    private createBullet():void {
        var bullet:EnemyBullet = <EnemyBullet>ObjectPool.getInstance().createObject(EnemyBullet);
        bullet.initialize(this._firePoint.x, this._firePoint.y, this._direction, 0.1, 20 * Global.blockWidth, 10);
        GameView.instance.addChild(bullet.view);
    }

    private updateDirect(dir:number = 0) {
        this._direction = dir;
        switch (this._direction) {
            case Direction.up:
                this._firePoint.x = this.view.x;
                this._firePoint.y = this.view.y - this.view.height / 2;
                break;
            case Direction.right:
                this._firePoint.x = this.view.x + this.view.width / 2;
                this._firePoint.y = this.view.y;
                break;
            case Direction.down:
                this._firePoint.x = this.view.x;
                this._firePoint.y = this.view.y + this.view.height / 2;
                break;
            case Direction.left:
                this._firePoint.x = this.view.x - this.view.width / 2;
                this._firePoint.y = this.view.y;
                break;
            default :
                alert("error dir");
                return;
        }
    }

    private firstDirectV():number {
        if (this._locateV < GameAction.instance.baseLocateV) {
            return Direction.down;
        }
        else if (this._locateV < GameAction.instance.baseLocateV) {
            return Direction.up;
        }
        else {
            if (this._locateH == GameAction.instance.baseLocateH) {
                return Global.randomInt(Direction.up, Direction.max);
            }
            else {
                return this.firstDirectH();
            }
        }
    }

    private firstDirectH():number {
        if (this._locateH < GameAction.instance.baseLocateH) {
            return Direction.right;
        }
        else if (this._locateH > GameAction.instance.baseLocateH) {
            return Direction.left;
        }
        else {
            if (this._locateV == GameAction.instance.baseLocateV) {
                return Global.randomInt(Direction.up, Direction.max);
            }
            else {
                return this.firstDirectV();
            }
        }
    }

    private nextDirect():number {
        return this.firstDirectV();
        /*if(Global.randomBool())
         {
         return this.firstDirectV();
         }
         else
         {
         return this.firstDirectH();
         }*/
    }

    private changeDirect() {
        var dir = Global.randomInt(Direction.up, Direction.max);
        //var dir = this.nextDirect();
        //var dir = this.firstDirectV();

        var deltaR:number = (dir - this._direction) * 90;
        if (deltaR > 180) {
            deltaR = -90;
        }
        else if (deltaR < -180) {
            deltaR = 90;
        }
        else {
        }

        this.updateDirect(dir);
        this._rotating = true;
        egret.Tween.get(this.view)
            .to({"rotation": this.view.rotation + deltaR}, this._rotateTime)
            .call(this.rotateEnd, this);
    }

    private rotateEnd() {
        this._rotating = false;
    }

    private move():boolean {
        var dx:number = 0;
        var dy:number = 0;
        switch (this._direction) {
            case Direction.up:
                dy = -this._deltaMove;
                break;
            case Direction.right:
                dx = this._deltaMove;
                break;
            case Direction.down:
                dy = this._deltaMove;
                break;
            case Direction.left:
                dx = -this._deltaMove;
                break;
            default :
                alert("error dir");
                return false;
        }

        if (GameMap.instance.isBlocked(this._direction, this.view.x + dx, this.view.y + dy, this._radius * 2) == false) {
            //console.log("enemy move blocked...");
            return false;
        }

        if (this.isEnemyBlocked() == false) {
            return false;
        }

        this.view.x += dx;
        this.view.y += dy;

        this.updateLocateNo();
        return true;
    }

    private isEnemyBlocked():boolean {
        var lstEnemy:Array<Enemy> = GameAction.instance.enemies;
        for (var e in lstEnemy) {
            var enemy = lstEnemy[e];
            if (enemy == this) {
                continue;
            }

            if (enemy._locateNo != this._locateNo - 1 &&
                enemy._locateNo != this._locateNo + 1 &&
                enemy._locateNo != this._locateNo &&
                enemy._locateNo != this._locateNo - Global.horBlockNum &&
                enemy._locateNo != this._locateNo - Global.horBlockNum - 1 &&
                enemy._locateNo != this._locateNo - Global.horBlockNum + 1 &&
                enemy._locateNo != this._locateNo + Global.horBlockNum - 1 &&
                enemy._locateNo != this._locateNo + Global.horBlockNum &&
                enemy._locateNo != this._locateNo + Global.horBlockNum + 1) {
                continue;
            }

            var checkFlag:boolean = false;
            switch (this._direction) {
                case Direction.up:
                    checkFlag = (enemy._locateNo == this._locateNo - Global.horBlockNum) ||
                    (enemy._locateNo == this._locateNo - Global.horBlockNum - 1) ||
                    (enemy._locateNo == this._locateNo - Global.horBlockNum + 1);
                    break;
                case Direction.right:
                    checkFlag = (enemy._locateNo == this._locateNo - Global.horBlockNum + 1) ||
                    (enemy._locateNo == this._locateNo + 1) ||
                    (enemy._locateNo == this._locateNo + Global.horBlockNum + 1);
                    break;
                case Direction.down:
                    checkFlag = (enemy._locateNo == this._locateNo + Global.horBlockNum - 1) ||
                    (enemy._locateNo == this._locateNo + Global.horBlockNum) ||
                    (enemy._locateNo == this._locateNo + Global.horBlockNum + 1);
                    break;
                case Direction.left:
                    checkFlag = (enemy._locateNo == this._locateNo - Global.horBlockNum - 1) ||
                    (enemy._locateNo == this._locateNo - 1) ||
                    (enemy._locateNo == this._locateNo + Global.horBlockNum - 1);
                    break;
                default :
                    alert("error direction");
                    return false;
            }

            if (checkFlag == false) {
                continue
            }

            var fromPoint = new egret.Point(this.view.x, this.view.y);
            var toPoint = new egret.Point(enemy.view.x, enemy.view.y);

            if (egret.Point.distance(fromPoint, toPoint) <= this._radius + enemy._radius) {
                return false;
            }
        }

        return true;
    }

}