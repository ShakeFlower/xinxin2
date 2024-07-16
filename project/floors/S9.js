main.floors.S9=
{
    "floorId": "S9",
    "title": "侧塔 9F",
    "name": "9",
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
                                "floorId": "S9",
                                "loc": [
                                    6,
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
        "1,1": {
            "floorId": ":before",
            "stair": "upFloor"
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
        "11,1": {
            "floorId": ":before",
            "time": 500
        },
        "6,1": {
            "floorId": ":before",
            "time": 500
        },
        "11,9": {
            "floorId": ":next",
            "time": 500
        },
        "6,9": {
            "floorId": "S10",
            "loc": [
                5,
                2
            ],
            "time": 500
        },
        "4,1": {
            "floorId": "S2",
            "loc": [
                3,
                11
            ],
            "time": 500
        },
        "8,1": {
            "floorId": "S4",
            "loc": [
                11,
                9
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "6,4": [
            {
                "type": "setBlock",
                "number": "A376",
                "loc": [
                    [
                        0,
                        6
                    ]
                ],
                "floorId": "S8"
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 88,  3,  3,376,  3, 88,  3,376,  3,  3, 88,343],
    [343,  0,  3,  3,  0,  3, 23,  3,  0,  3,  3,  0,343],
    [343,246,  3,  3,384,  3, 21,  3,231,  3,  3,  0,343],
    [343,256,  3, 31,  0,  3, 55,  3,  0,244,  3,255,343],
    [343,  0,  3, 31,361,  3,249,  3,361,  0,  3,378,343],
    [343,256,  3,  0,  0,  3,  0,  3, 11,  0,  3,255,343],
    [343,234,  3,323,  0,  0,  0,  0,  0, 11,  3,231,343],
    [343,  0,  3,324, 11,  0,333,361,  0, 32,  3, 32,343],
    [343,324,  3,  0,  0,333,376,333,  0, 32,  3, 87,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 87,  3, 87,  0,234,231,234, 21, 31,  0, 88,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {},
    "upFloor": [
        1,
        11
    ],
    "downFloor": [
        1,
        1
    ]
}