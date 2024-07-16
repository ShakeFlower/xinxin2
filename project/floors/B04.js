main.floors.B04=
{
    "floorId": "B04",
    "title": "魔塔 4F",
    "name": "B04",
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
        "10,2": {
            "floorId": ":next",
            "stair": "downFloor"
        },
        "7,4": {
            "floorId": ":before",
            "time": 500
        },
        "5,4": {
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
    [343,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,343],
    [343,  5,  0,  0,  0,  0,  0,244,343,  0, 87,  5,343],
    [343,  5,  0, 33,  4,344, 83,  0,343,  0,198,  5,343],
    [343,  5,  0, 27,  4, 88,344, 88,343,249,343,  5,343],
    [343,  5,  0,344,344, 11,  4,  4,344,  0,  4,  5,343],
    [343,  5,  0,  4,344, 11,344,344,344, 32,344,  5,343],
    [343,  5,  0,  4,  4, 11,  4,344,  4,  0,344,  5,343],
    [343,  5,  0,344,344,  0,344,  4,  4, 33,  4,  5,343],
    [343,  5,  0,  4,  4, 28,  4,344,  4,  0,  4,  5,343],
    [343,  5,324,  0,  0,379,  0,  0,  0,  0,324,  5,343],
    [343,  5,  5,  5,  4,  4,  4,  5,  5,  5,  5,  5,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "underGround": true,
    "downFloor": [
        7,
        4
    ]
}