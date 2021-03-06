/**
 * Created by one on 2015/4/25.
 */
class GameLogic
{
    private static _instance:GameLogic;
    public static instance()
    {
        if(GameLogic._instance==null)
        {
            GameLogic._instance = new GameLogic();
        }

        return GameLogic._instance;
    }

    public _gameMap =
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//0
            [0,0,0,0,1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//1
            [0,0,0,0,1,0,0,3,3,3,3,3,3,3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0],//2
            [0,0,0,0,1,0,0,0,0,0,0,0,0,4,0,0,0,2,3,0,0,1,1,1,1,1,3,0,0,0],//3
            [0,0,0,0,1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,1,3,0,0,0],//4
            [0,0,0,0,0,0,0,0,0,0,1,1,1,4,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],//5
            [0,0,0,0,0,0,2,0,1,1,1,0,0,4,0,0,0,4,4,4,4,4,4,0,0,0,3,0,0,0],//6
            [0,0,0,1,0,0,0,0,1,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//7
            [0,0,0,1,0,0,0,0,1,0,1,1,0,4,0,0,2,2,2,2,2,3,3,0,0,0,0,0,0,0],//8
            [0,0,0,1,1,1,1,1,1,0,2,2,0,4,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0],//9
            [0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,2,2,2,2,0,0,1,1,1,1,1,0,0,0],//10
            [0,0,0,0,0,2,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],//11
            [0,0,0,2,2,2,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//12
            [0,0,0,0,2,0,0,0,0,4,4,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],//13
            [0,0,0,0,2,0,0,0,0,4,4,1,1,1,1,1,1,1,0,0,3,3,3,3,0,0,1,0,0,0],//14
            [0,0,0,0,2,0,0,0,0,0,4,4,4,4,4,4,4,1,0,0,2,2,2,2,0,0,4,0,0,0],//15
            [0,0,0,0,2,0,2,2,0,0,4,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,4,0,0,0],//16
            [0,0,0,2,2,2,2,2,0,0,4,0,0,0,0,0,0,0,0,0,4,4,4,4,0,4,4,0,0,0],//17
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0],//18
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,9,4,0,0,0,0,0,0,0,0,0,4,0,0,0]//19
        ];

    /*public _gameMap =
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//0
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//1
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//2
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//3
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//4
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//5
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//6
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//7
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//8
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//9
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//10
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//11
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//12
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//13
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//14
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//15
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//16
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//17
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//18
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]//19
        ];*/
}