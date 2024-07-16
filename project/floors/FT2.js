main.floors.FT2=
{
    "floorId": "FT2",
    "title": "密室 #2",
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
        "6,5": [
            {
                "type": "if",
                "condition": "core.hasItem('iceCube')",
                "true": [
                    "\t[勇者,hero]什么回事？！我身上的魔法冰块好像被什么吸了出来！",
                    "\t[公主,princess]啊！你看看妖精之泉！",
                    {
                        "type": "setValue",
                        "name": "item:iceCube",
                        "value": "0"
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                3,
                                1
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                4,
                                1
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                5,
                                1
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                7,
                                1
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                8,
                                1
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                9,
                                1
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                4,
                                2
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                5,
                                2
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                6,
                                2
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                7,
                                2
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                8,
                                2
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                5,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                6,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                7,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                6,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                5,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                7,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "A374",
                        "loc": [
                            [
                                6,
                                1
                            ]
                        ]
                    },
                    {
                        "type": "hide",
                        "time": 0
                    }
                ]
            }
        ],
        "5,6": [
            "\t[妖精,N408]欢迎来到【妖精之泉】。"
        ]
    },
    "changeFloor": {
        "6,11": {
            "floorId": "B22",
            "loc": [
                6,
                8
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {
        "6,2": [
            {
                "type": "setBlock",
                "number": "snow"
            }
        ]
    },
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  0,  1, 15, 15, 15, 15, 15, 15, 15,  1, 23,343],
    [343,361,  1,  1, 15, 15, 15, 15, 15,  1,  1,  0,343],
    [343,  0,  0,  1,  1, 15, 15, 15,  1,  1,  0,250,343],
    [343,361,  0,  0,  1, 15, 15, 15,  1,250,  0,361,343],
    [343,  0,361,  0,  1,361,  0,361,  0,  0,361,  0,343],
    [343,  0,  0,361,  1,408,  0,  0,  0,  0,  0,  0,343],
    [343,  0,  0,  0,  1,  1, 86,  1,  0,361,244,  0,343],
    [343,  0,361,  0,361,  1,335,  1,249,  0,  0,361,343],
    [343,  0,  0,  0,  0,  1,  0,  1,  0,361,228,  0,343],
    [343,361,  0,361,  0,  1,  0,  1,198,  0,361,  0,343],
    [343,  0,  0,  0,  0,  1,376,  1, 55, 27, 28, 31,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {}
}