main.floors.S7=
{
    "floorId": "S7",
    "title": "侧塔 7F",
    "name": "7",
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
        "6,5": [
            {
                "type": "changeFloor",
                "floorId": ":before",
                "time": 500
            },
            {
                "type": "setBlock",
                "number": "A376",
                "loc": [
                    [
                        0,
                        6
                    ]
                ],
                "floorId": "S6"
            }
        ]
    },
    "changeFloor": {
        "1,1": {
            "floorId": ":before",
            "time": 500
        },
        "1,11": {
            "floorId": ":next",
            "time": 500
        },
        "3,11": {
            "floorId": ":next",
            "time": 500
        },
        "11,11": {
            "floorId": ":before",
            "time": 500
        },
        "11,9": {
            "floorId": ":next",
            "time": 500
        },
        "11,1": {
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
    [343, 88,  3,361,  0,  0,  3,  0,  0,361,  3, 88,343],
    [343,  0,  3,  0,  0,333,  3,234,  0, 21,  3,  0,343],
    [343,324,  3,  0,333,333,  3,234,234, 22,  3,  0,343],
    [343,324,  3, 27,  3, 81, 31, 81,  3, 28,  3,246,343],
    [343,256,  3,  3,  3, 31,362, 31,  3,  3,  3,255,343],
    [343,234,  3,337,  3, 81, 31, 81,  3, 29,  3,246,343],
    [343,256,  3,  0, 11, 11,  3,384,384,  0,  3,  0,343],
    [343,  0,  3,  0, 58, 59,  3,384,  0,  0,  3,  0,343],
    [343,323,  3,361, 59, 58,  3, 33, 33,361,  3, 87,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 87,  3, 87,  0,  0,234,384,234,  0,  0, 88,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        1,
        11
    ],
    "downFloor": [
        1,
        1
    ],
    "beforeBattle": {},
    "cannotMoveIn": {}
}