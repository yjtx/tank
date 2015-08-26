/**
 * Created by one on 2015/4/25.
 */
class GameView extends egret.DisplayObjectContainer
{
    public static instance:GameView;
    private _map:GameMap;
    private _hero:Hero;
    private _bullets:BulletHouse;
    private _action:GameAction;

    constructor(){
        super();
    }

    public addBullet(bullet:Bullet)
    {
        this._bullets.addBullet(bullet);
    }
    public delBullet(bullet:Bullet)
    {
        this._bullets.delBullet(bullet);
    }

    public initialize():boolean
    {
        this._action = new GameAction;
        ////////////////////////////////////////////////////
        this._map = new GameMap(this);
        this._map.initialize();
        this.addChild(this._map);
        ////////////////////////////////////////////////////
        this._hero = <Hero>ObjectPool.getInstance().createObject(Hero);
        this.addChild(this._hero.view);
        ////////////////////////////////////////////////////
        this._bullets = new BulletHouse;
        ////////////////////////////////////////////////////
        for(var i:number=0;i<Global.enemyNestPos.length;++i)
        {
            var h:number = Global.enemyNestPos[i].x;
            var v:number = Global.enemyNestPos[i].y;

            var nest:EnemyNest = <EnemyNest>ObjectPool.getInstance().createObject(EnemyNest);
            nest.initialize(h*Global.blockWidth + Global.horPadding,v*Global.blockHeight + Global.verPadding,1.5);
            this.addChild(nest.view);
        }
        ////////////////////////////////////////////////////

        GameView.instance = this;
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
        return true;
    }

    public onEnterFrame(advancedTime:number):void {

        this.process();
    }

    private process()
    {
        //子弹检测
        this._bullets.process();
        //this._bullets.process2();

        //EnemyAI
        this._action.process();
    }
}