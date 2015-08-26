/**
 * Created by one on 2015/4/25.
 */
class GameAction {
    public static instance:GameAction;

    private _baseLocateH:number=0;
    private _baseLocateV:number=0;
    public registBasePos(h:number,v:number)
    {
        this._baseLocateH = h;
        this._baseLocateV = v;
    }

    public get baseLocateH():number
    {
        return this._baseLocateH;
    }
    public get baseLocateV():number
    {
        return this._baseLocateV;
    }

    constructor()
    {
        GameAction.instance = this;
    }

    public clear()
    {
        this._enemies = [];
        this._enemyNests = [];
    }

    private _enemies:Array<Enemy> = [];
    public get enemies():Array<Enemy>
    {
        return this._enemies;
    }

    public registEnemy(enemy:Enemy)
    {
        this._enemies.push(enemy);
    }
    public unregistEnemy(enemy:Enemy)
    {
        var index:number = this._enemies.indexOf(enemy);
        if(index != -1)
            this._enemies.splice(index, 1);
    }

    private _enemyNests:Array<EnemyNest>=[];
    public registNest(nest:EnemyNest)
    {
        this._enemyNests.push(nest);
    }
    public unregistNest(nest:EnemyNest)
    {
        var index:number = this._enemyNests.indexOf(nest);
        if(index != -1)
            this._enemyNests.splice(index, 1);
    }

    private _maxTankCount:number = 3;
    private _minTankCount:number = 10;
    private _lastProcessTime:number;
    public process()
    {
        if(Date.now() - this._lastProcessTime <= 1000)
        {
            return;
        }

        this.processEnemy();
        this.processNest();

        this._lastProcessTime = Date.now();
    }

    private processEnemy()
    {

    }

    private pauseEnemyNest()
    {
        for(var i:number=0;i<this._enemyNests.length;++i)
        {
            this._enemyNests[i].pause();
        }
    }
    private resumeEnemyNest()
    {
        for(var i:number=0;i<this._enemyNests.length;++i)
        {
            this._enemyNests[i].resume();
        }
    }

    private processNest()
    {
        console.log("GameAction processNest enemyCount:"+this._enemies.length);
        var enemyCount:number = this._enemies.length;
        //控制场上Enemy个数上限
        if(enemyCount > this._maxTankCount)
        {
            this.pauseEnemyNest();
        }
        else
        {
            this.resumeEnemyNest();
        }

        //控制场上Enemy个数下限
    }


}
