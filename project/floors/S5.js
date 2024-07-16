main.floors.S5=
{
    "floorId": "S5",
    "title": "侧塔 5F",
    "name": "5",
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
        "9,9": [
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
                "floorId": "S4"
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
                                "floorId": "S5",
                                "loc": [
                                    8,
                                    1
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
        "11,1": {
            "floorId": ":before",
            "time": 500
        },
        "11,9": {
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
    [343, 88,  3,231,  0, 27,  0,  0,361,  0,  3, 88,343],
    [343,  0,  3,378,231,  3, 22,  0,  3,382,  3,  0,343],
    [343, 27,  3, 81,  3,  3,378,  3,  3,323,  3,  0,343],
    [343,  0,  3,  0,  0,  0, 82,  0,381,  0,  3,337,343],
    [343, 21,  3,381,  3,  3,  3,  3,  3, 86,  3,378,343],
    [343, 21,  3,  0,  0, 50,  0,  0, 82, 32,  3,337,343],
    [343,323,  3,382,  3,  3, 81,  3,  3,378,  3,  0,343],
    [343,324,  3, 55, 21,  3,  0,337,  3,249,  3,  0,343],
    [343, 28,  3, 58, 59, 28,381,  0, 81,362,  3, 87,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 87,  3, 87,  0,384,333,333,234,256,  0, 88,343],
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