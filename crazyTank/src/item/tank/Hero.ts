/**
 * Created by one on 2015/4/25.
 */
class Hero extends GameObject implements IHit {
    public static key:string = Global.gokeyHero;
    public static instance:Hero;
    private static initPosX:number = 12;
    private static initPosY:number = 18;

    private _locateNo:number = -1;
    private _locateH:number = -1;
    private _locateV:number = -1;
    private _bulletTime:number = 500;
    private _rotateTime:number = 100;
    private _radius:number = 0;
    private _time:number = 0;
    private _direction:number = 0;
    private _deltaMove:number = 10;
    private _rotating:boolean = false;
    private _fireOn:boolean = false;
    private _firePoint:egret.Point;

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("hero"));
        this.view.anchorX = this.view.anchorY = 0.5;
        this.view.width = Global.baseTankWidth;
        this.view.height = Global.baseTankHeight;
        this.view.x = Hero.initPosX * Global.blockWidth + Global.horPadding + Global.blockWidth / 2;
        this.view.y = Hero.initPosY * Global.blockHeight + Global.verPadding + Global.blockHeight / 2;
        this._radius = this.view.width / 2;
        this._firePoint = new egret.Point;

        this.initKeyEvent();
        Hero.instance = this;
    }

    public onCreate():void {
        this.updateDirect();
    }

    private initKeyEvent() {
        var self = this;
        document.addEventListener("keydown", function (evt:KeyboardEvent) {
            //alert("evt.keyCode:"+evt.keyCode);
            switch (evt.keyCode) {
                case 17:
                    //case 13:
                    self.handleFireOn();
                    break;
                case 38:
                    self.handleMove(Direction.up);
                    break;
                case 39:
                    self.handleMove(Direction.right);
                    break;
                case 40:
                    self.handleMove(Direction.down);
                    break;
                case 37:
                    self.handleMove(Direction.left);
                    break;
                default :
                    break;
            }
        });

        document.addEventListener("keyup", function (evt:KeyboardEvent) {
            switch (evt.keyCode) {
                case 17:
                    self.handleFireOff();
                    break;
                default :
                    break;
            }
        });
    }

    private handleFireOn() {
        this._fireOn = true;
    }

    private handleFireOff() {
        this._fireOn = false;
    }

    private handleMove(dir:number) {
        //console.log("turnDir:"+this._turnDir+" lastDir:"+this._direction);
        if (this._rotating) {
            return;
        }

        if (this._direction != dir) {
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
        else {
            //this._direction = dir;
            this.updateDirect(dir);
            this.move();
        }
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

    private rotateEnd() {
        this._rotating = false;
    }

    public onEnterFrame(advancedTime:number):void {
        this._time += advancedTime;

        if (this._fireOn && !this._rotating) {
            this._time += advancedTime;
            if (this._time > this._bulletTime) {
                this._time = 0;
                this.createBullet();
            }
        }
    }

    public onHit():void {
        //alert("game over");
    }

    private move() {
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
                return;
        }

        if (GameMap.instance.isBlocked(this._direction, this.view.x + dx, this.view.y + dy, this._radius * 2) == false) {
            console.log("hero move blocked...");
            return;
        }

        this.view.x += dx;
        this.view.y += dy;
        this.updateLocateNo();
    }

    private createBullet():void {
        var bullet:HeroBullet = <Bullet>ObjectPool.getInstance().createObject(HeroBullet);
        bullet.initialize(this._firePoint.x, this._firePoint.y, this._direction, 0.1, 20 * Global.blockWidth, 10);
        GameView.instance.addChild(bullet.view);
    }

    private updateLocateNo() {
        this._locateH = Math.floor(Global.horBlockNum * (this.view.x - Global.horPadding) / Global.clientWidth);
        this._locateV = Math.floor(Global.verBlockNum * (this.view.y - Global.verPadding) / Global.clientHeight);
        this._locateNo = this._locateV * Global.horBlockNum + this._locateH;
    }
}