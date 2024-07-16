main.floors.B02=
{
    "floorId": "B02",
    "title": "魔塔 2F",
    "name": "B02",
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
        "6,9": {
            "floorId": ":before",
            "stair": "upFloor",
            "time": 500
        },
        "5,6": {
            "floorId": ":next",
            "stair": "downFloor"
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 50,  5,  0,  0,  0,  0,  0, 28,  0,  0,  0,343],
    [343, 55,  5,  0,  5,  5,  5,  5,  5,  5,  5,  0,343],
    [343,  0,  5,  0,  5,  0,  0,  0,  0,  0,  5,  0,343],
    [343,  0,  5,  0,  5,  0,  5,  5,  5,  0,  5,  0,343],
    [343,249,  5,  0,  5,  0,  5, 31,  5,  0,  5,  0,343],
    [343, 82,  5,  0,  5, 87,  5, 32,  5,  0,  5,  0,343],
    [343,  0,  5,  0,  5,  5,  5, 33, 81,  0,  5,  0,343],
    [343,  0,198,  0,  0, 83,  0,  5,  5,  0, 81,  0,343],
    [343,  0,  0,  0,  0,244, 88,  5,  5, 27,  5,  0,343],
    [343,249,  5,  5,  4,  4,  4,  5,  5,  5,  5,  0,343],
    [343,  0,  0,249,324,324, 31, 31,244,  0,  0,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "underGround": true
}