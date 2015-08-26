/**
 * Created by one on 2015/4/25.
 */
class GameMap extends egret.Sprite
{
    public static instance:GameMap;
    private _gameView:GameView;
    private _blocks={};
    constructor(gameView:GameView){
        super();

        this._gameView = gameView;
        GameMap.instance = this;
    }

    public get blocks():Object
    {
        return this._blocks;
    }

    private onAddToStage()
    {

    }

    public initAllBlock():void
    {
        this.graphics.lineStyle(1, 0xFFFFFF, 0.5, false);
        for(var h:number=0;h<Global.horBlockNum+1;++h)
        {
            this.graphics.moveTo(h*Global.blockWidth + Global.horPadding, Global.verPadding);
            this.graphics.lineTo(h*Global.blockWidth + Global.horPadding, Global.clientHeight+Global.verPadding);
        }

        for(var v:number=0;v<Global.verBlockNum+1;++v)
        {
            this.graphics.moveTo(Global.horPadding, v*Global.blockHeight + Global.verPadding);
            this.graphics.lineTo(Global.clientWidth+Global.horPadding, v*Global.blockHeight + Global.verPadding);
        }

        this._blocks = {};
        var gameMap = GameLogic.instance()._gameMap;
        for(var v:number=0;v<Global.verBlockNum;++v)
        {
            for(var h:number=0;h<Global.horBlockNum;++h)
            {
                var block = null;
                switch(gameMap[v][h])
                {
                    case BlockEnu.init:
                        continue;
                    case BlockEnu.base:
                        block = <Block>ObjectPool.getInstance().createObject(BlockBase);
                        GameAction.instance.registBasePos(h,v);
                        break;
                    case BlockEnu.stone:
                        block = <Block>ObjectPool.getInstance().createObject(BlockStone);
                        break;
                    case BlockEnu.tree:
                        block = <Block>ObjectPool.getInstance().createObject(BlockTree);
                        break;
                    case BlockEnu.river:
                        block = <Block>ObjectPool.getInstance().createObject(BlockRiver);
                        break;
                    case BlockEnu.desert:
                        block = <Block>ObjectPool.getInstance().createObject(BlockDesert);
                        break;
                    default :
                        alert("error gameMap");
                        return;
                }

                block.view.anchorX = block.view.anchorY = 0.5;
                block.view.x = h*Global.blockWidth + Global.blockWidth/2 + Global.horPadding;
                block.view.y = v*Global.blockHeight + Global.blockHeight/2 + Global.verPadding;
                block.index = v*Global.horBlockNum+h;
                this.addChild(block.view);
                this._blocks[v*Global.horBlockNum+h] = block;
            }
        }

        if(false)
        {
            for(var v:number=0;v<Global.verBlockNum;++v)
            {
                for(var h:number=0;h<Global.horBlockNum;++h)
                {
                    var index:egret.TextField = new egret.TextField;
                    index.text = (v*Global.horBlockNum+h).toString();
                    index.x = h*Global.blockWidth + Global.horPadding;
                    index.y = v*Global.blockHeight + Global.verPadding;
                    index.size = 8;
                    index.textColor = 0XFF0000;
                    index.width = Global.blockWidth;
                    index.height = Global.blockHeight;
                    index.textAlign = egret.HorizontalAlign.CENTER;
                    index.verticalAlign = egret.VerticalAlign.MIDDLE;
                    this.addChild(index);
                }
            }
        }
    }

    public delBlock(index:number)
    {
        console.log("[GameMap] - delBlock index:"+index);
        delete this._blocks[index];
        this._blocks[index] = null;
    }

    public initialize():boolean{

        var bg:egret.Bitmap = Global.createBitmap("bgImage");
        bg.width = Global.stageWidth;
        bg.height = Global.stageHeight;
        //this.addChild(bg);

        //bg
        //this.graphics.beginFill(0xFFFFFF, 0.1);
        //this.graphics.drawRect(0, 0, Global.stageWidth, Global.stageHeight);
        //this.graphics.endFill();
        //this.addChild(this.graphics);

        this.initAllBlock();
        return true;
    }


    public isBlocked(dir:number,ox:number,oy:number,ow:number):boolean
    {
        //Boundary
        if(ox - ow/2 <= Global.horPadding || ox + ow/2 >= Global.horPadding+Global.clientWidth)//
            return false;
        if(oy - ow/2 <= Global.verPadding || oy + ow/2 >= Global.verPadding+Global.clientHeight)
            return false;

        var targetPt = new egret.Point(ox,oy);
        var h = Math.floor((ox - Global.horPadding)/Global.blockWidth);
        var v = Math.floor((oy - Global.verPadding)/Global.blockHeight);
        if(h < 0 || h >= Global.horBlockNum || v <0 || v >= Global.verBlockNum)
            return false;

        var block1:Block=null;
        var block2:Block=null;
        var block3:Block=null;
        switch(dir)
        {
            case Direction.up:
                block1 = this._blocks[(v-1)*Global.horBlockNum+h];
                block2 = this._blocks[(v-1)*Global.horBlockNum+h+1];
                block3 = this._blocks[(v-1)*Global.horBlockNum+h-1];
                break;
            case Direction.down:
                block1 = this._blocks[(v+1)*Global.horBlockNum+h];
                block2 = this._blocks[(v+1)*Global.horBlockNum+h+1];
                block3 = this._blocks[(v+1)*Global.horBlockNum+h-1];
                break;
            case Direction.right:
                block1 = this._blocks[v*Global.horBlockNum+h+1];
                block2 = this._blocks[(v+1)*Global.horBlockNum+h+1];
                block3 = this._blocks[(v-1)*Global.horBlockNum+h+1];
                break;
            case Direction.left:
                block1 = this._blocks[v*Global.horBlockNum+h-1];
                block2 = this._blocks[(v+1)*Global.horBlockNum+h-1];
                block3 = this._blocks[(v-1)*Global.horBlockNum+h-1];
                break;
            default :
                alert("error dir");
                return false;
        }

        if(block1 &&
            egret.Point.distance(new egret.Point(block1.view.x,block1.view.y),targetPt) <=
            (ow+block1.view.width)/2)
        {
            return false;
        }

        if(block2 &&
            egret.Point.distance(new egret.Point(block2.view.x,block2.view.y),targetPt) <=
            (ow+block2.view.width)/2)
        {
            return false;
        }

        if(block3 &&
            egret.Point.distance(new egret.Point(block3.view.x,block3.view.y),targetPt) <=
            (ow+block3.view.width)/2)
        {
            return false;
        }

        return true;
    }

}