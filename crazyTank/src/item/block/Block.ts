/**
 * Created by one on 2015/4/25.
 */
class Block extends GameObject implements IHit {
    public static key:string = Global.gokeyBlock;

    public _index:number = -1;
    public set index(val:number) {
        this._index = val;
    }

    constructor() {
        super();
    }

    public onCreate():void {
    }

    public onDestroy():void {
        GameMap.instance.delBlock(this._index);
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    }

    public onHit():void {
        ObjectPool.getInstance().destroyObject(this);
    }

    public onEnterFrame(advancedTime:number):void {

    }
}