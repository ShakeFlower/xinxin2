main.floors.FT16=
{
    "floorId": "FT16",
    "title": "密室 7-4",
    "name": "密室",
    "width": 13,
    "height": 13,
    "canFlyTo": false,
    "canFlyFrom": false,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm3.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,1": [
            {
                "type": "changeFloor",
                "floorId": "FT19",
                "loc": [
                    9,
                    6
                ],
                "time": 500
            }
        ]
    },
    "changeFloor": {
        "6,11": {
            "floorId": "FT15",
            "loc": [
                6,
                1
            ],
            "time": 500
        }
    },
    "afterBattle": {
        "6,6": [
            {
                "type": "function",
                "function": "function(){\nvar x=core.status.event.data.x,y=core.status.event.data.y;if(core.isset(x)&&core.isset(y)){core.insertAction([{type:'hide',loc:[[x-1,y-2],[x,y-2],[x+1,y-2],[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y]]}]);}\n}"
            },
            {
                "type": "function",
                "function": "function(){\ncore.plugin.getAchievement(37);\n}"
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 21, 31,  0,  0, 28,450, 28,  0,  0, 50,324,343],
    [343, 22, 32,  5,249, 27,  0, 27,  0,  5, 29,324,343],
    [343, 21, 31,  5,  5,  5, 86,  5,  5,  5, 55,324,343],
    [343,  5,  5,  5,  5,422,421,420,  5,  5,  5,  5,343],
    [343,  5,  5,  5,  5,419,418,417,  5,  5,  5,  5,343],
    [343,  5,  5,  5,  5,416,432,415,  5,  5,  5,  5,343],
    [343,  5,  5,  5,  5,  5, 83,  5,  5,  5,  5,  5,343],
    [343,  5,  0,228,  0,  0,  0,  0,  0,  0,  5,324,343],
    [343,  5,  0,  5,397,  5,  0,  5,413,335,  5,323,343],
    [343,  5,  0,  5,397,  5,  0,  5,335,413,198,  0,343],
    [343, 28, 27,  5,  0,  5,10017,  5,  0,  0,  0,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}