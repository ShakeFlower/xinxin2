main.floors.B18=
{
    "floorId": "B18",
    "title": "魔塔 18F",
    "name": "B18",
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
    "events": {
        "1,10": [
            "\t[老人,N409]静静说给你听，异常状态只会同时有一种。\n就是说当你中毒时不会衰弱，反之亦然。\n多多注意啊！"
        ]
    },
    "changeFloor": {
        "11,3": {
            "floorId": ":next",
            "time": 500
        },
        "7,11": {
            "floorId": ":before",
            "time": 500
        },
        "5,1": {
            "floorId": ":before",
            "time": 500
        },
        "1,1": {
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
    [343, 87,  0,  3,  0, 88,  3,219,235,219, 58, 50,343],
    [343,  3,235,  3,234,  3,  3,  0,  3,  0,  3,  3,343],
    [343,324,  0,  3,377,  3,  3,377,  3, 81,  3, 87,343],
    [343,  0,324,  3,  0,  0,  3,  0,  3, 31,  3,  0,343],
    [343, 81,  9, 55, 10, 28,  3,  0,  3,377,  3,  0,343],
    [343,333,  0,  0,  3, 27,  3, 81,  3,  0,  3,377,343],
    [343,  3,  0,  3,  3,  0,  3,235,  3,218,  3,  0,343],
    [343,  3,  0,  3,256,  0,  3,246,  3,219,  3,  0,343],
    [343,  3,256,  3, 81,  3,  3,235,  3,218,  3, 81,343],
    [343,409,333,  3,384,234,  3,  0,  3,  0,  3,  0,343],
    [343,  3,256,  0,  0, 21,  3, 88,  3,  0,  0,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        11,
        3
    ],
    "downFloor": [
        7,
        11
    ],
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}