main.floors.B20=
{
    "floorId": "B20",
    "title": "魔塔 20F",
    "name": "B20",
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
            "time": 500
        },
        "2,2": {
            "floorId": ":next",
            "time": 500
        },
        "4,1": {
            "floorId": ":before",
            "time": 500
        },
        "11,10": {
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
    [343,219,  0,  3, 88,  3,  3,  3,  3,  3,  3,  3,343],
    [343,  0, 87,  3, 58,  3,  0,214,  0,  0, 87,  3,343],
    [343,  0,  0,  3,219,  3,  0,  3,  3,  3,  3,  3,343],
    [343,  3,214,  3,219,  3,  0,377,  0, 81,  0,333,343],
    [343,  3, 58,  3,  0,  3,  3,  3,  3,  3,  0,  0,343],
    [343,  3, 55,  3,  0,  3, 53,246, 59, 82,377,  0,343],
    [343,  3, 31,  3,246,  3,  3,  3,  3,  3,  3,  0,343],
    [343,  0,377,  3, 33,235,  0,  0,  0,  0,  0,324,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343,  0,  0,  0,  0,377, 81,  0,235, 27,  3, 88,343],
    [343,  3,  3,  3,235,323,  3, 28,219,  0, 81,219,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        2,
        2
    ],
    "downFloor": [
        11,
        10
    ],
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}