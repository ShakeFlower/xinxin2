main.floors.FT3=
{
    "floorId": "FT3",
    "title": "密室 3-1",
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
        "5,8": [
            {
                "type": "changeFloor",
                "floorId": "MT17",
                "loc": [
                    3,
                    8
                ],
                "time": 500
            }
        ]
    },
    "changeFloor": {
        "11,6": {
            "floorId": "FT4",
            "loc": [
                1,
                6
            ],
            "time": 500
        },
        "7,4": {
            "floorId": "S10",
            "loc": [
                7,
                4
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "6,1": [
            {
                "type": "addValue",
                "name": "status:atk",
                "value": "5"
            },
            {
                "type": "addValue",
                "name": "flag:atkm",
                "value": "6"
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 33, 33, 55,244,248,316,  4,  0,  0,244,324,343],
    [343,  0,250,  0,413,244,248,  4,  0,249,  0,324,343],
    [343,228,  0,244,  0,  0,  4,  4,  0,414,  0, 21,343],
    [343,  0,  0,  0,  0,249,  4,376,  0,  0,384,  0,343],
    [343,  4,  4,  4,  4, 86,  4,  4,  4,  4, 86,  4,343],
    [343,  0,254,337,  0,  0,  0,  0,230,  0,255,10024,343],
    [343,  4, 81,  4,  4,  4,  4,  4, 82,  4,  4,  4,343],
    [343,  0,337,  0,  0,450,  4,  0,244,  0,  0,  4,343],
    [343,  0,249,413,250,  4,  4,397,  0,  0,249,  4,343],
    [343,  0,  0,250, 27,  4, 31,250,250,  0,  0,  4,343],
    [343,  0,244, 28, 33,  4, 31,249,244, 22, 22,  4,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}