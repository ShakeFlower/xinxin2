main.floors.S2=
{
    "floorId": "S2",
    "title": "侧塔 2F",
    "name": "2",
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
        "10,7": [
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
                "floorId": "S1"
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
                                "floorId": "S2",
                                "loc": [
                                    4,
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
            "floorId": "S3",
            "time": 500
        },
        "1,11": {
            "floorId": ":before",
            "time": 500
        },
        "11,11": {
            "floorId": "S3",
            "time": 500
        },
        "3,11": {
            "floorId": "S9",
            "loc": [
                4,
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
    [343, 87,  3, 31,361,  0,  0,  0,  0,  3, 53, 55,343],
    [343,  0,  3,  0,  0,  3,  3,361,  0,  3,254,254,343],
    [343,  0,  3,  0,  0, 31,  3,361,  0,220,230,361,343],
    [343,256,  3,  0, 11,  0,  3, 27, 28,  3,  0,381,343],
    [343,  0,  3,230,  3,245,382,  3,  3,  3,244,220,343],
    [343,377,  3,381,  3,382,  0,  0,249,  0,  0,  0,343],
    [343,  0,  3,230,  3,  3,324,  0,  3,  0,362,  0,343],
    [343,377,  3, 22, 11,  0,  3, 81,  3,361, 33, 33,343],
    [343,  0,  3, 21,  0,249,361,  0,337,  3,  3, 33,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 88,  3,376,  0,  0,333,333,333,  0,  0, 87,343],
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
    "beforeBattle": {},
    "cannotMoveIn": {}
}