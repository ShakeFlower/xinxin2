main.floors.B14=
{
    "floorId": "B14",
    "title": "魔塔 14F",
    "name": "B14",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm2.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {
        "11,1": {
            "floorId": ":next",
            "time": 500
        },
        "8,4": {
            "floorId": ":before",
            "time": 500
        },
        "1,1": {
            "floorId": ":next",
            "time": 500
        },
        "4,4": {
            "floorId": ":before",
            "time": 500
        },
        "1,11": {
            "floorId": ":before",
            "time": 500
        },
        "6,7": {
            "floorId": ":next",
            "time": 500
        },
        "6,1": {
            "floorId": ":before",
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
    [343, 87,  0,  0,255,  3, 88,  3, 28, 32,256, 87,343],
    [343,  0,378,  0,  0,  3, 26,  3, 27,  0,  0,256,343],
    [343, 55,  0,  0,396,  3, 32,  3, 11, 11,  0,  0,343],
    [343, 58, 59,396, 88,  3,231,  3, 88,337,  0,384,343],
    [343,  3,  3,  3,  3,  3, 32,  3,  3,  3,  3,  3,343],
    [343,  0,255,  0, 33,  3,  0,  3, 53, 31, 53,220,343],
    [343,  0,  3,  0, 29,  3, 87,  3,236,  3,  3,255,343],
    [343,  0,  3,  0, 33,  3,  3,  3,255,  0,  3,  0,343],
    [343,  0,  3,223,  3,  0,  0,  0,  3,  0, 82,  0,343],
    [343,  0,  3,  0,231,337,  3,  0,  3,  0,  3,220,343],
    [343, 88, 81,323,  3,  0,  3,  0,378,  0,  3, 21,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        11,
        1
    ],
    "downFloor": [
        8,
        4
    ],
    "underGround": true,
    "beforeBattle": {}
}