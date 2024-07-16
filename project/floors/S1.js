main.floors.S1=
{
    "floorId": "S1",
    "title": "侧塔 1F",
    "name": "1",
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
                                "floorId": ":now",
                                "loc": [
                                    10,
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
        "1,1": {
            "floorId": "B12",
            "loc": [
                11,
                1
            ],
            "time": 500
        },
        "1,11": {
            "floorId": ":next",
            "time": 500
        },
        "3,1": {
            "floorId": "S10",
            "loc": [
                6,
                6
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "2,2": {
            "1": null
        },
        "4,2": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,10026,  3,376,361,  3,198,337,  3,323, 21,323,343],
    [343,  0,  3,  3, 85,  3,  0,361,  3, 27,361, 28,343],
    [343,  0,  3,254,  0,254,  0,244,  3,244, 55,220,343],
    [343,235,  3,  0,  0,  3, 81,  3,  3,  3,  3, 81,343],
    [343,  0,  3,382,361,  3,249, 31,  3, 31,  0,249,343],
    [343,  0,  3,382,254,  3, 22, 32, 83,  0,  0,  0,343],
    [343,  0,  3,  0,361,  3,  3,  3,  3,220,361,  0,343],
    [343,  0,  3,  0,230,230,  0,  0,249,  0,382,  0,343],
    [343,  0,  3,  3,  3, 81,  3, 81,  3,  3,  3,  3,343],
    [343,256,  3,324,361,245,  3,381, 81,361,254, 21,343],
    [343, 87,  3, 30, 33, 33,  3,  0,  3,254,361,324,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "downFloor": [
        1,
        1
    ],
    "beforeBattle": {},
    "cannotMoveIn": {}
}