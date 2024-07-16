main.floors.FT4=
{
    "floorId": "FT4",
    "title": "密室 3-2",
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
                "type": "if",
                "condition": "core.hasItem('pickaxe')",
                "true": [
                    "\t[公主,princess]看看你身上的锄头在发光啊！",
                    "\t[勇者,hero]对呢！怎么会这样？",
                    "\t[公主,princess]必定是这只锄头对这个魔法阵有反应！\n试试将它放在魔法阵上看看！",
                    "\t[勇者,hero]好！！",
                    {
                        "type": "addValue",
                        "name": "item:pickaxe",
                        "value": "-1"
                    },
                    {
                        "type": "setBlock",
                        "number": "icePickaxe",
                        "loc": [
                            [
                                2,
                                6
                            ]
                        ]
                    },
                    {
                        "type": "hide",
                        "time": 0
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "1,6": {
            "floorId": "FT3",
            "loc": [
                11,
                6
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  0,  0,  0,  0,  4,345,  4,  0,  0,  0,  0,343],
    [343,  0,  1,  0,  1,  4, 83,  4,  0,  0,  0,  0,343],
    [343,  0,  0,  1,  0,  4, 55,  4,  0,361,  1,  0,343],
    [343,  0,  1,  0,  0,  4,248,  4,  0,361,  0,361,343],
    [343,  4,  4,  4,  4,  4,250,  4,  1,  0,  0,  0,343],
    [343,10026,  0,249,249,244,244,  4,  0,  0,  0,361,343],
    [343,  4,  4,  4,  4,  4, 11,  4,  0,  1, 11,  0,343],
    [343,  0,  0,361,  0,  4, 32,  4,  0,  0,  0,  0,343],
    [343,  0,  1,  0,361,  4, 31,  4,  0, 11,  0,  1,343],
    [343,  0,  1,  1,  0,  4, 33,  4,  0,  0,361,  0,343],
    [343,  0,  0, 11,  0,  4,198,  4,  0,  1,  0,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}