main.floors.HG10=
{
    "floorId": "HG10",
    "title": "皇宫 #7",
    "name": "皇宫",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm4.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "11,1": [
            {
                "type": "setValue",
                "name": "temp:A",
                "value": "status:hp"
            },
            {
                "type": "setCurtain",
                "color": [
                    0,
                    0,
                    0,
                    1
                ],
                "time": 500,
                "keep": true,
                "async": true
            },
            {
                "type": "changeFloor",
                "floorId": ":now"
            },
            {
                "type": "waitAsync"
            },
            {
                "type": "for",
                "name": "temp:B",
                "from": "0",
                "to": "12",
                "step": "1",
                "data": [
                    {
                        "type": "battle",
                        "id": "swordEmperor"
                    }
                ]
            },
            {
                "type": "for",
                "name": "temp:B",
                "from": "0",
                "to": "9",
                "step": "1",
                "data": [
                    {
                        "type": "battle",
                        "id": "goldHornSlime"
                    }
                ]
            },
            {
                "type": "for",
                "name": "temp:B",
                "from": "0",
                "to": "14",
                "step": "1",
                "data": [
                    {
                        "type": "battle",
                        "id": "whiteHornSlime"
                    }
                ]
            },
            {
                "type": "for",
                "name": "temp:B",
                "from": "0",
                "to": "9",
                "step": "1",
                "data": [
                    {
                        "type": "battle",
                        "id": "silverSlime"
                    }
                ]
            },
            {
                "type": "setValue",
                "name": "item:I398",
                "operator": "+=",
                "value": "13"
            },
            {
                "type": "setValue",
                "name": "item:I400",
                "operator": "+=",
                "value": "10"
            },
            {
                "type": "setValue",
                "name": "item:I403",
                "operator": "+=",
                "value": "15"
            },
            {
                "type": "setValue",
                "name": "item:I407",
                "operator": "+=",
                "value": "10"
            },
            {
                "type": "setValue",
                "name": "item:I328",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "value": "temp:A"
            },
            {
                "type": "hide",
                "remove": true
            },
            {
                "type": "setCurtain",
                "time": 500
            },
            "从白银之间凯旋归来，共战胜白银史莱姆×13，黄金史莱姆×10，白银史莱姆王×15，黄金史莱姆王×10"
        ],
        "11,2": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    "\t[白银史莱姆,oldMan]恭喜你已完成白银之穴了！魔王之战要加油呀，嘻嘻"
                ],
                "false": [
                    "\t[白银史莱姆,oldMan]这位勇士啊，我能看得出你心中那份对战斗无限的欲望，怎样有兴趣挑战这个最高难度的洞穴吗？",
                    "\b[hero]洞穴？这下面是什么？",
                    "\t[白银史莱姆,oldMan]在我身后的是白银之穴，一个只会出现白银系怪物的洞穴，也是我们的乐园！",
                    "\t[白银史莱姆,oldMan]如果你有兴趣我再多说一点与你听，嘻嘻",
                    {
                        "type": "choices",
                        "text": "\t[白银史莱姆,oldMan]是否要挑战白银之穴",
                        "choices": [
                            {
                                "text": "是",
                                "action": [
                                    {
                                        "type": "setValue",
                                        "name": "switch:A",
                                        "value": "true"
                                    },
                                    {
                                        "type": "setValue",
                                        "name": "temp:B",
                                        "value": "status:hp"
                                    },
                                    {
                                        "type": "setCurtain",
                                        "color": [
                                            0,
                                            0,
                                            0,
                                            1
                                        ],
                                        "time": 500,
                                        "keep": true,
                                        "async": true
                                    },
                                    {
                                        "type": "waitAsync"
                                    },
                                    {
                                        "type": "for",
                                        "name": "temp:B",
                                        "from": "0",
                                        "to": "12",
                                        "step": "1",
                                        "data": [
                                            {
                                                "type": "battle",
                                                "id": "swordEmperor"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "for",
                                        "name": "temp:B",
                                        "from": "0",
                                        "to": "9",
                                        "step": "1",
                                        "data": [
                                            {
                                                "type": "battle",
                                                "id": "goldHornSlime"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "for",
                                        "name": "temp:B",
                                        "from": "0",
                                        "to": "14",
                                        "step": "1",
                                        "data": [
                                            {
                                                "type": "battle",
                                                "id": "whiteHornSlime"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "for",
                                        "name": "temp:B",
                                        "from": "0",
                                        "to": "9",
                                        "step": "1",
                                        "data": [
                                            {
                                                "type": "battle",
                                                "id": "silverSlime"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "setValue",
                                        "name": "item:I398",
                                        "operator": "+=",
                                        "value": "13"
                                    },
                                    {
                                        "type": "setValue",
                                        "name": "item:I400",
                                        "operator": "+=",
                                        "value": "10"
                                    },
                                    {
                                        "type": "setValue",
                                        "name": "item:I403",
                                        "operator": "+=",
                                        "value": "15"
                                    },
                                    {
                                        "type": "setValue",
                                        "name": "item:I407",
                                        "operator": "+=",
                                        "value": "10"
                                    },
                                    {
                                        "type": "setValue",
                                        "name": "item:I328",
                                        "operator": "+=",
                                        "value": "1"
                                    },
                                    {
                                        "type": "setValue",
                                        "name": "status:hp",
                                        "value": "temp:B"
                                    },
                                    {
                                        "type": "setCurtain",
                                        "time": 500
                                    },
                                    "从白银之间凯旋归来，共战胜白银史莱姆×13，黄金史莱姆×10，白银史莱姆王×15，黄金史莱姆王×10"
                                ]
                            },
                            {
                                "text": "否",
                                "action": []
                            }
                        ]
                    },
                    {
                        "type": "function",
                        "function": "function(){\ncore.addFlag('talkedCount', 1);\nif (core.getFlag('talkedCount', 0) >= 17) core.plugin.getAchievement(17);\n}"
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "8,1": {
            "floorId": "HG17",
            "loc": [
                8,
                11
            ],
            "time": 500
        },
        "1,4": {
            "floorId": "HG9",
            "loc": [
                11,
                4
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
    [343,349,349,349,347,347,347,347,10033,347,347,362,343],
    [343,349, 33,373,351, 22, 22,348,  0,  0,  0,127,343],
    [343,349,237,304,351, 33,304,348,  0,  0,  0,349,343],
    [343,10026,  0,437,  0,351,439,437,348,348,361,349,343],
    [343,349,  0,439,  0, 31,  0,  0,414,414,351,349,343],
    [343,347,347,347, 82,347,347,347,347,  0,304,350,343],
    [343,347, 28,437,  0,439,237,  0,347,  0,436,349,343],
    [343,347, 28,446,373,436,446,  0,347,347, 82,347,343],
    [343,347, 21,436,  0,446,373,437,347,324,373,347,343],
    [343,347,  0,373,304,443, 32, 32,347,323,324,347,343],
    [343,347,347,347,347,347,347,347,347,347,347,347,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}