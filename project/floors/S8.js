main.floors.S8=
{
    "floorId": "S8",
    "title": "侧塔 8F",
    "name": "8",
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
        "8,2": [
            "\t[小妖精,fairy]小心落穴~~一去不复返哦~"
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
                                "floorId": "S8",
                                "loc": [
                                    6,
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
        "1,11": {
            "floorId": ":before",
            "time": 500
        },
        "1,1": {
            "floorId": ":next",
            "time": 500
        },
        "6,1": {
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
        },
        "11,11": {
            "floorId": ":next",
            "time": 500
        },
        "3,11": {
            "floorId": ":before",
            "time": 500
        },
        "3,9": {
            "floorId": ":before",
            "time": 500
        },
        "9,9": {
            "floorId": ":before",
            "time": 500
        },
        "9,1": {
            "floorId": ":before",
            "time": 500
        },
        "3,1": {
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
    [343, 87,  3,362,231,  0, 87,  0,255,362,  3, 87,343],
    [343,  0,  3,198,249,324,  0,378,124,  3,  3,  0,343],
    [343, 22,  3,  3,  3,  3, 81,  3,  3, 32,  3,  0,343],
    [343,  0,  3, 28,249,  0,  0, 55,  0,  0,  3,255,343],
    [343,  0,  3, 81,  3,  3, 82,  3,  3, 81,  3,378,343],
    [343,323,  3,  0,  0,  0,  0,249, 27,  0,  3,255,343],
    [343, 31,  3,378, 33,  3, 81,  3,  3,  3,  3,  0,343],
    [343, 33,  3,  0,  3,  3,  0, 21, 22,378,  3,  0,343],
    [343, 33,  3,362,  3,337,  0,  0,378,362,  3, 88,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,343],
    [343, 88,  3, 88,  0,  0,337,337,337,  0,  0, 87,343],
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