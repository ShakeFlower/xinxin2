main.floors.S3=
{
    "floorId": "S3",
    "title": "侧塔 3F",
    "name": "3",
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
        "7,4": [
            "\t[妖精,N408]只告诉你啊~传说的剑技与防御术隐藏在某处啊~你找到了没有？嘻嘻"
        ],
        "4,1": [
            {
                "type": "changeFloor",
                "floorId": "S2",
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
                "floorId": "S2"
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
                                "floorId": "S3",
                                "loc": [
                                    6,
                                    7
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
            "floorId": ":next",
            "time": 500
        },
        "1,1": {
            "floorId": "S2",
            "time": 500
        },
        "3,11": {
            "floorId": ":next",
            "time": 500
        },
        "11,11": {
            "floorId": "S2",
            "time": 500
        },
        "6,1": {
            "floorId": "FT7",
            "loc": [
                6,
                11
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
    [343, 88,  3,  3,362,  3,10033,  3,  0,  0, 33, 58,343],
    [343,256,  3,337, 11,  3,411, 82,324,  3, 33, 11,343],
    [343,  0,  3,  3, 82,  3, 31,  3,324,381,  0,  0,343],
    [343,235,  3,324,381,323,  3,408,  3,220,  3, 82,343],
    [343,256,  3,  3,230,382, 11,  0,  0,382,  0,  0,343],
    [343,235,  3,  0,  0,  3,378,  3,  0,  3,  0,361,343],
    [343,  0,  3,361,  0, 11,361,381,  0, 31,  3,230,343],
    [343,  0,  3,382,  3,  3,244,  3,249,  3, 32,  0,343],
    [343,  0,  3, 81,  0, 28,  3, 27,  0,378,361,  0,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 87,  3, 87,  0,234, 21,333, 22,234,  0, 88,343],
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