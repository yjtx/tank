/**
 * Created by one on 2015/4/25.
 */
class BlockRiver extends Block {
    constructor() {
        super();

        this.view = new egret.Bitmap(RES.getRes("river"));
        this.view.width = Global.blockWidth;
        this.view.height = Global.blockHeight;
    }

    public onCreate():void {

    }

    public onDestroy():void {
        super.onDestroy();
    }

    public onEnterFrame(advancedTime:number):void {

    }
}