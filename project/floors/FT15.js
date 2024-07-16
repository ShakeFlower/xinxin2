main.floors.FT15=
{
    "floorId": "FT15",
    "title": "密室 7-3",
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
    "events": {},
    "changeFloor": {
        "6,1": {
            "floorId": "FT16",
            "loc": [
                6,
                11
            ],
            "time": 500
        },
        "6,11": {
            "floorId": "FT14",
            "loc": [
                4,
                10
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "6,2": [
            {
                "type": "addValue",
                "name": "status:def",
                "value": "5"
            },
            {
                "type": "addValue",
                "name": "flag:defm",
                "value": "-6"
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 27,  0,335,361,  5,10033,  5, 28,  5,  5,  5,343],
    [343,  0,361,  0,  0,335,320,361,228,228,  5,  5,343],
    [343,413,  5,397,  1,  5, 83,  5,  1,411,  5,  5,343],
    [343,397,  5,397,  1,  5, 82,  5, 31, 31,  5,  5,343],
    [343, 55,  5,324, 34,  5, 82,  5,411,  1,  5, 59,343],
    [343,  5,  5, 22, 32,  5, 81,  5, 21, 22,  5, 58,343],
    [343,  5,  5,  1,413,  5, 81,  5,  1,335,  5,323,343],
    [343,  5,  5,  0,361,  5, 81,  5,335,  0,  5,335,343],
    [343,  5,  5,413,  1,  5, 81,  5,  0,  1,  5,413,343],
    [343,  5,  5,324,  0,  0,  0,361,335,  0,  5,  0,343],
    [343,  5,  5,  5, 33,244,376,  5, 31, 31,411,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}