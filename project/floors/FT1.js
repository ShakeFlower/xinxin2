main.floors.FT1=
{
    "floorId": "FT1",
    "title": "密室 #1",
    "name": "密室",
    "width": 13,
    "height": 13,
    "canFlyTo": false,
    "canFlyFrom": true,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm3.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {
        "1,11": {
            "floorId": "B25",
            "loc": [
                1,
                1
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {
        "11,3": [
            {
                "type": "setBlock",
                "number": "pickaxe"
            }
        ],
        "11,4": [
            {
                "type": "setBlock",
                "number": "T361"
            }
        ],
        "11,5": [
            {
                "type": "setBlock",
                "number": "T361"
            }
        ],
        "11,6": [
            {
                "type": "setBlock",
                "number": "T361"
            }
        ],
        "10,6": [
            {
                "type": "setBlock",
                "number": "T361"
            }
        ]
    },
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  0,202,  0,361,361,  0,  1,  1,  1,  1,  1,343],
    [343,  0,361,  0,204, 11,361,  1,392,392,392,392,343],
    [343,  0,204,361,  0,  0,202,  1,392,392,392,452,343],
    [343, 15, 15, 15, 15, 15, 15,  1,392,392,392,452,343],
    [343,323, 32,217,  0,198, 15,  1,392,392,392,452,343],
    [343,323, 29,217,  0, 82, 15,  1, 27, 28,452,452,343],
    [343, 15, 15, 15, 15,  0,217,  1,361,361,392,392,343],
    [343, 15, 55, 50,  0,  0,  0, 86,361,  1,392,392,343],
    [343, 15,  0,  0,  0, 15, 15, 15, 15,  1,392,392,343],
    [343,  0,  0, 15, 15,201,361,201,  0,  1,392,392,343],
    [343,10017, 15, 15,  0,203,361, 11,201,  1,  1,  1,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}