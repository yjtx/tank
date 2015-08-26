/**
 * Created by one on 15/4/25.
 */
class WarScene extends GameScene {

    constructor() {
        super();
    }

    private _gameView:GameView;
    public onCreate():void {
        //游戏场景层，游戏场景相关内容可以放在这里面。
        this._gameView = new GameView();
        this._gameView.initialize();
    }

    public onDestroy():void {

    }

    public onEnterFrame(advancedTime:number):void {

    }

    private initGamaView():void
    {

    }

}