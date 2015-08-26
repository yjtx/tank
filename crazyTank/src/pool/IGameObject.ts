/**
 * Created by one on 15/4/25.
 */
interface IGameObject {
    key:string;

    onCreate():void;

    onDestroy():void;

    onEnterFrame(advancedTime:number):void;
}