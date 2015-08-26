/**
 * Created by one on 2015/4/25.
 */
class BulletHouse
{
    private _bullets:Array<Bullet>=[];
    constructor()
    {

    }

    public addBullet(bullet:Bullet)
    {
        this._bullets.push(bullet);
        //console.log("BulletHouse addBullet");
    }

    public delBullet(bullet:Bullet)
    {
        var index:number = this._bullets.indexOf(bullet);
        if(index != -1)
            this._bullets.splice(index, 1);

        //console.log("BulletHouse delBullet");
    }

    public clear()
    {
        this._bullets = [];
    }

    public process2()
    {

    }

    public process()
    {
        var lstBlock:Object = GameMap.instance.blocks;
        var lstEnemy:Array<Enemy> = GameAction.instance.enemies;

        for(var i:number=0;
            i<this._bullets.length;
            ++i)
        {
            var hitRes:boolean = false;
            var bullet = this._bullets[i];

            //////////////////////////////////////////////////////
            if(bullet.hitTestGo(Hero.instance))
            {
                hitRes = true;
                Hero.instance.onHit();
                bullet.onHit();
            }
            if(hitRes == true)
                continue;


            for(var e in lstEnemy)
            {
                var enemy = lstEnemy[e];
                if(bullet.hitTestGo(enemy)==false)
                {
                    continue
                }

                hitRes = true;
                enemy.onHit();
                bullet.onHit();
                break;
            }

            if(hitRes == true)
                continue;


            //////////////////////////////////////////////////////
            for(var b in lstBlock)
            {
                var block = lstBlock[b];
                if(block==null)
                {
                    continue
                }

                if(bullet.hitTestGo(block)==false)
                {
                    continue
                }

                hitRes = true;
                block.onHit();
                bullet.onHit();
                break;
            }

            if(hitRes == true)
                continue;

        }
    }


}