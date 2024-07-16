main.floors.B15=
{
    "floorId": "B15",
    "title": "魔塔 15F",
    "name": "B15",
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
        "10,10": {
            "floorId": ":next",
            "time": 500
        },
        "11,1": {
            "floorId": ":before",
            "time": 500
        },
        "1,1": {
            "floorId": ":before",
            "time": 500
        },
        "6,7": {
            "floorId": ":before",
            "time": 500
        },
        "6,4": {
            "floorId": ":next",
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
    [343, 88,  3,  0,  0,  0,255,  0,  0,  0,  3, 88,343],
    [343,323,  3,  0, 33,  3, 86,  3, 33,  0,  3,256,343],
    [343,  0,  3,  0,  3,  3, 34,  3,  3,  0,  3,  0,343],
    [343,236,  3, 11,  3, 11, 87, 11,  3,337,  3, 50,343],
    [343,234,  3, 11,  3, 32,231, 32,  3,337,  3,235,343],
    [343,231,  3,  0,  3,  3,  3,  3,  3,  0,  3,246,343],
    [343,384,  3,  0, 33,  3, 88,  3, 33,  0,  3,235,343],
    [343,  0,  3, 31,  0,337,231,378,  0, 27,  3,  0,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  0,343],
    [343,  0,  3,  3,  3,333,384,333,  0,  0, 87,  0,343],
    [343,337,  0,324,323,  0,  3,  3,  3, 28,  0,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "downFloor": [
        11,
        1
    ],
    "upFloor": [
        10,
        10
    ],
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}