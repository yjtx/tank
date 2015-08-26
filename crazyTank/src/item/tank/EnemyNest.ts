/**
 * Created by one on 2015/4/25.
 */
class EnemyNest extends GameObject implements IHit {
    public static key:string = Global.gokeyNest;
    public static spawnTime:number = 1000;
    private static maxBornOffset:number = 10;

    private _speedRatio:number = 1;
    private _running:boolean = true;


    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("enemyNest"));
        this.view.anchorX = this.view.anchorY = 0.5;
        this.view.width = this.view.height = 100;
        this.view.alpha = 0.6;
    }

    public onCreate():void {
        GameAction.instance.registNest(this);
        this._running = true;

        var duration = 500;
        var tw1 = egret.Tween.get(this.view, {loop: true});
        tw1.to({"scaleX": 0.6, "scaleY": 0.6}, duration).
            to({"scaleX": 1.0, "scaleY": 1.0}, duration).
            to({"scaleX": 1.4, "scaleY": 1.4}, duration).
            to({"scaleX": 1.0, "scaleY": 1.0}, duration);

        var tw2 = egret.Tween.get(this.view, {loop: true});
        tw2.to({"rotation": this.view.rotation + 90}, duration * 2)
            .to({"rotation": this.view.rotation + 180}, duration * 2)
            .to({"rotation": this.view.rotation + 270}, duration * 2)
            .to({"rotation": this.view.rotation + 360}, duration * 2);
    }

    public initialize(bornX:number, bornY:number, speedRatio:number) {
        this._speedRatio = speedRatio;
        this.view.x = bornX;
        this.view.y = bornY;
    }

    public pause() {
        this._running = false;
    }

    public resume() {
        this._running = true;
    }

    public onDestroy():void {
        GameAction.instance.unregistNest(this);
        super.onDestroy();
    }

    public onHit():void {

    }

    private _duration:number = 0;

    public onEnterFrame(advancedTime:number):void {
        if (this._running == false)
            return;

        this._duration += advancedTime;
        if (this._duration > EnemyNest.spawnTime * this._speedRatio) {
            this._duration = 0;
            this.createEnemy();
        }
    }

    private createEnemy() {
        var enemy:Enemy = <Enemy>ObjectPool.getInstance().createObject(Enemy);
        enemy.initialize(this.view.x - Global.randomInt(0, EnemyNest.maxBornOffset),
            this.view.y + Global.randomInt(0, EnemyNest.maxBornOffset));

        GameMap.instance.addChild(enemy.view);
    }
}