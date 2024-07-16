main.floors.S4=
{
    "floorId": "S4",
    "title": "侧塔 4F",
    "name": "4",
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
        "6,7": [
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
                "floorId": "S3"
            }
        ],
        "0,6": [
            {
                "type": "if",
                "condition": "(blockId:0,6==='A376')",
                "true": [
                    {
                        "type": "if",
                        "condition": "(flag:poison===true)",
                        "true": [
                            "中毒时无法使用此传送阵"
                        ],
                        "false": [
                            {
                                "type": "changeFloor",
                                "floorId": "S4",
                                "loc": [
                                    9,
                                    9
                                ],
                                "time": 500
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "1,11": {
            "floorId": ":before",
            "time": 500
        },
        "1,1": {
            "floorId": ":next",
            "time": 500
        },
        "3,11": {
            "floorId": ":before",
            "time": 500
        },
        "11,11": {
            "floorId": ":next",
            "time": 500
        },
        "11,1": {
            "floorId": ":next",
            "time": 500
        },
        "11,9": {
            "floorId": "S9",
            "loc": [
                8,
                1
            ],
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
    [343, 87,  3,  0,  0,  0, 31, 22,  0,378,  3, 87,343],
    [343,234,  3,230,  3,  3,  3,  3,244,  0,  3,  0,343],
    [343,  0,  3, 81,  3, 32,382,  0,  3,  0,  3, 58,343],
    [343,  0,  3, 81,  3, 82,  3,  0,  3,  0,  3, 33,343],
    [343,377,  3, 81,  3,337,  3,361,  3,255,  3, 33,343],
    [343,256,  3, 81,  3, 27,  3, 27,  3,249,  3, 33,343],
    [343,377,  3, 81,  3, 28,362,378,  3,255,  3, 33,343],
    [343,  0,  3,230,  3,  3,  3, 28,  3,  0,  3,337,343],
    [343,  0,  3,  0,361, 31,  0,249,  3,361,  3,376,343],
    [343,234,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 88,  3, 88,  0,234, 31, 31,384,  0,  0, 87,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        1,
        1
    ],
    "downFloor": [
        1,
        11
    ],
    "beforeBattle": {},
    "cannotMoveIn": {}
}