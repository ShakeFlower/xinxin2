main.floors.FT20=
{
    "floorId": "FT20",
    "title": "密室 7-8",
    "name": "密室",
    "width": 13,
    "height": 13,
    "canFlyTo": false,
    "canFlyFrom": false,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm3.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "7,7": [
            "\t[妖精,N408]在你面前的是被称为「众神之水晶球」的秘宝，只要你拥有了它就能获得神的加护，对冒险有很大帮助。",
            "\t[妖精,N408]但是你只能选其中一颗，而它在你身上的功能，很抱歉，我也不清楚。",
            "\t[妖精,N408]不过你还是小心选择吧。"
        ]
    },
    "changeFloor": {
        "6,6": {
            "floorId": "FT18",
            "loc": [
                11,
                2
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "1,6": [
            {
                "type": "setBlock",
                "number": "blueWater",
                "loc": [
                    [
                        11,
                        6
                    ]
                ]
            },
            {
                "type": "setBlock",
                "number": "blueWater",
                "loc": [
                    [
                        6,
                        11
                    ]
                ]
            }
        ],
        "6,11": [
            {
                "type": "setBlock",
                "number": "blueWater",
                "loc": [
                    [
                        1,
                        6
                    ]
                ]
            },
            {
                "type": "setBlock",
                "number": "blueWater",
                "loc": [
                    [
                        11,
                        6
                    ]
                ]
            }
        ],
        "11,6": [
            {
                "type": "setBlock",
                "number": "blueWater",
                "loc": [
                    [
                        1,
                        6
                    ]
                ]
            },
            {
                "type": "setBlock",
                "number": "blueWater",
                "loc": [
                    [
                        6,
                        11
                    ]
                ]
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {
        "6,4": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 15, 15, 15, 15, 15, 50, 15, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15, 15, 53, 15, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15, 15,250, 15, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15, 15, 85, 15, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15,244,  0,249, 15, 15, 15, 15,343],
    [343, 44,248,  0, 82, 32,376,  0, 82,  0,248, 40,343],
    [343, 15, 15, 15, 15,198,  0,408, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15, 15, 82, 15, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15, 15,  0, 15, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15, 15,248, 15, 15, 15, 15, 15,343],
    [343, 15, 15, 15, 15, 15, 42, 15, 15, 15, 15, 15,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}