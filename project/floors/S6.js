main.floors.S6=
{
    "floorId": "S6",
    "title": "侧塔 6F",
    "name": "6",
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
        "8,1": [
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
                "floorId": "S5"
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
                                "floorId": "S6",
                                "loc": [
                                    6,
                                    5
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
            "floorId": ":next",
            "time": 500
        },
        "1,11": {
            "floorId": ":before",
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
    [343, 87,  3,324,324,324,361,  3,362,337,  3, 87,343],
    [343,  0,  3,324,324,324,361,  3,  3,  0,  3,  0,343],
    [343, 31,  3,361,361,361,  0,  0,  3,  0,  3,  0,343],
    [343,  0,  3, 82,378,  0,  0,  0,  3,378,  3,  0,343],
    [343,234,  3,  0,249,  3,361,  3,  3,396,  3, 31,343],
    [343,  0,  3, 21,  3, 31,244, 31,  3,378,  3, 31,343],
    [343,234,  3, 21,  3, 28, 55, 27,  3,  0,  3,  0,343],
    [343,  0,  3,  0,  3,  3,  3, 83,  3,  0,  3,  0,343],
    [343, 31,  3,  0,  0,333,231,  0,  0,323,  3, 88,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 88,  3, 88,  0,  0, 31, 31,  0,  0,  0, 87,343],
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