main.floors.B13=
{
    "floorId": "B13",
    "title": "魔塔 13F",
    "name": "B13",
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
        "10,6": [
            {
                "type": "if",
                "condition": "switch:B",
                "true": [],
                "false": [
                    {
                        "type": "setValue",
                        "name": "switch:B",
                        "value": "true"
                    },
                    {
                        "type": "function",
                        "function": "function(){\ncore.addFlag('talkedCount', 1);\nif (core.getFlag('talkedCount', 0) >= 17) core.plugin.getAchievement(17);\n}"
                    }
                ]
            },
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    "\t[商人,woman]在体力不足时最好看看道具袋啊！\n可能你会发现有很多回复药还未喝的，哈哈！"
                ],
                "false": [
                    {
                        "type": "choices",
                        "text": "\t[商人,woman]10支草药精华只要300元啊！",
                        "choices": [
                            {
                                "text": "买",
                                "action": [
                                    {
                                        "type": "if",
                                        "condition": "(core.status.hero.money>=300)",
                                        "true": [
                                            {
                                                "type": "addValue",
                                                "name": "item:I324",
                                                "value": "10"
                                            },
                                            {
                                                "type": "setValue",
                                                "name": "switch:A",
                                                "value": "true"
                                            },
                                            {
                                                "type": "addValue",
                                                "name": "status:money",
                                                "value": "-300"
                                            }
                                        ],
                                        "false": []
                                    }
                                ]
                            },
                            {
                                "text": "不买",
                                "action": []
                            }
                        ]
                    }
                ]
            }
        ],
        "1,8": [
            {
                "type": "if",
                "condition": "(flag:sxzl>=3)",
                "true": [
                    "\t[小妖精,fairy]噢！是三相之力呢~想你必定做好对抗白银系史莱姆吧！",
                    "\t[小妖精,fairy]告诉你黄金史莱姆的战斗方法，",
                    "\t[勇者,hero]好像我一剑就能砍死黄金史莱姆啊...",
                    "\t[小妖精,fairy]..."
                ],
                "false": [
                    "\t[小妖精,fairy]如果你有三相之力，我有个很有用的秘密说给你啊~"
                ]
            }
        ]
    },
    "changeFloor": {
        "9,3": {
            "floorId": "B12",
            "time": 500
        },
        "8,4": {
            "floorId": ":next",
            "time": 500
        },
        "6,1": {
            "floorId": ":next",
            "time": 500
        },
        "1,11": {
            "floorId": ":next",
            "time": 500
        },
        "4,4": {
            "floorId": ":next",
            "time": 500
        },
        "7,8": {
            "floorId": "B12",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "3,3": [
            {
                "type": "addValue",
                "name": "status:def",
                "value": "5"
            },
            {
                "type": "addValue",
                "name": "flag:defm",
                "value": "-6"
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 11,  0,  0,223,  0, 87, 81, 81, 81, 81,  0,343],
    [343,  0,  3,  3,  3,  3,  0,  3,  3,  3,  3,  0,343],
    [343,255,  3,322,236,  3, 83,  3, 81, 88,  3,234,343],
    [343,378,  3,236, 87,  3,  0,  3, 87,255,  3,234,343],
    [343,  0,  3, 55,  0,  3,337,  3,  3,  3,  3,  0,343],
    [343,  0,  3,  3,  3,  3,234, 11, 11, 59,122,  0,343],
    [343,231, 27, 28, 32,  0, 11,  3, 21, 22, 58,  0,343],
    [343,124,  3, 33,324,  0, 11, 88,  3, 23, 28,  0,343],
    [343,  3,  0,  0,198,  0,  0,  0,231,234, 27,  0,343],
    [343,  0,396,  3,  3,  3,  3,  3,  3,  3,  3,  0,343],
    [343, 87,  0,  0,  0, 82, 81,  0,323, 11, 11,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "underGround": true,
    "upFloor": [
        8,
        4
    ],
    "downFloor": [
        9,
        3
    ],
    "beforeBattle": {},
    "cannotMoveIn": {}
}