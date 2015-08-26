/**
 * Created by one on 2015/4/25.
 */
class BlockBase extends Block {
    constructor() {
        super();

        this.view = new egret.Bitmap(RES.getRes("base"));
        this.view.width = Global.blockWidth;
        this.view.height = Global.blockHeight;
    }

    public onCreate():void {
        var duration = 500;
        var tw = egret.Tween.get(this.view,{loop:true});
        tw.to({"scaleX":0.8,"scaleY":0.8}, duration).
            to({"scaleX":1.0,"scaleY":1.0}, duration).
            to({"scaleX":1.2,"scaleY":1.2}, duration).
            to({"scaleX":1.0,"scaleY":1.0}, duration);
    }

    public onDestroy():void {
        super.onDestroy();
    }

    public onEnterFrame(advancedTime:number):void {

    }
}