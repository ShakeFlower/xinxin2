main.floors.MT1=
{
    "floorId": "MT1",
    "title": "主塔 1F",
    "name": "1",
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "defaultGround": "ground",
    "images": [],
    "item_ratio": 1,
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  4,344,344,  4,  0, 87,  4,  1,344,  4,344,343],
    [343,  4,344, 31,201,  0,  4,  1,121,  1,344,344,343],
    [343,344,344,361,  1,  0,  0,  4,  0,  0,361,  4,343],
    [343,  4,344,  4,344,  0,  0,  0,  0,  4,  0,  4,343],
    [343,  1,344,  1,  4,344,  0,361,  4,  4,344,344,343],
    [343,  4,344,  4,361,344,  0,  0,344,344,344,  1,343],
    [343,344,344,  0,361,  4, 86,344,344,  1,344,  4,343],
    [343,344,  1,344,  0,361,  0,  4,344,344,344,344,343],
    [343,344,344,  4,  0,  0,  0,344,344,344,344,344,343],
    [343,344,344,344,  4,344,  0,344,344,344,344,344,343],
    [343,  4,344,  1,344,  4,208,  4,344,344,344,344,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "firstArrive": [
        {
            "type": "setValue",
            "name": "flag:bugFix",
            "value": "true"
        },
        {
            "type": "function",
            "function": "function(){\ncore.removeMaps(\"TU1\", \"TU5b\")\n}"
        },
        {
            "type": "setBlock",
            "number": "ground2",
            "loc": [
                [
                    7,
                    10
                ]
            ]
        }
    ],
    "events": {
        "6,10": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    "\t[勇者,hero]是你！",
                    "\t[魔王·格勒第,vampire]呵呵，想不到还有交手的机会。",
                    "\t[勇者,hero]慢着！我没有与你交手的理由！",
                    "\t[魔王·格勒第,vampire]话不说这么说哩...阻止公主被带走，消灭入侵者是我复活前的承诺，\n也是复活后的使命。",
                    "\t[魔王·格勒第,vampire]而且你也看到吧？这里并没有任何出口...\n因为你一进来已踏入了镜塔之中，就是说这里并不是真正的魔塔。",
                    "\t[魔王·格勒第,vampire]真正的出口在哪里，待你赢了我再说吧！",
                    "\t[勇者,hero]可恶...好！我要来了！",
                    {
                        "type": "hide",
                        "remove": true,
                        "time": 0
                    }
                ],
                "false": [
                    "\t[勇者,hero]？\n为何一进来了这座塔就感觉不到自己的力量！？",
                    {
                        "type": "setValue",
                        "name": "flag:judge1",
                        "value": "0"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:judge2",
                        "value": "0"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:decrease",
                        "value": "0"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:slower",
                        "value": "0"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:ddef",
                        "value": "0"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:water",
                        "value": "0"
                    },
                    {
                        "type": "setValue",
                        "name": "flag:water2",
                        "value": "0"
                    },
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "true"
                    },
                    {
                        "type": "hide",
                        "time": 0
                    }
                ]
            }
        ],
        "8,2": [
            {
                "type": "if",
                "condition": "(switch:A==true)",
                "true": [
                    "\t[识别老人,man]路上要小心。\n有任何关于识别的事可以找我！"
                ],
                "false": [
                    "\t[识别老人,man]啊！是你，你还装备着这件勇者之甲呢。",
                    "\t[勇者,hero]是上次替我识别的老伯！",
                    "\t[识别老人,man]每当国家有难时你也会出现，或许你是我国的救星！",
                    "\t[勇者,hero]不敢当！但我倒想知道这塔是什么一回事。",
                    "\t[识别老人,man]我也不清楚。不过这塔被一些神秘的力量笼罩着，\n在上一次得到的力量到现在似乎变得没有用了。",
                    "\t[勇者,hero]难怪我一进来了就再也感觉不到我的力量了。",
                    "\t[识别老人,man]那么你要小心了。有任何关于识别的事可以找我！",
                    "\t[勇者,hero]谢谢你。",
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "true"
                    },
                    {
                        "type": "function",
                        "function": "function(){\ncore.addFlag('talkedCount', 1);\nif (core.getFlag('talkedCount', 0) >= 17) core.plugin.getAchievement(17);\n}"
                    }
                ]
            }
        ],
        "5,2": [
            "\t[史莱姆,greenSlime]噜噜噜噜...依...",
            "\t[勇者,hero]这只史莱姆看起来好像很可怜呢...",
            "\t[勇者,hero]还是不干掉它比较好吧...？",
            "\t[史莱姆,greenSlime]呜...",
            {
                "type": "hide",
                "remove": true,
                "time": 0
            }
        ],
        "7,10": [
            {
                "type": "if",
                "condition": "(blockId:7,10===\"man\")",
                "true": [
                    {
                        "type": "if",
                        "condition": "(switch:A==true)",
                        "true": [
                            {
                                "type": "choices",
                                "text": "\t[识别老人,man]离开后很可能就回不来了，这里有没有什么事情需要处理？还是决定要离开了？",
                                "choices": [
                                    {
                                        "text": "再等一下！",
                                        "action": [
                                            {
                                                "type": "exit"
                                            }
                                        ]
                                    },
                                    {
                                        "text": "可以启程了！",
                                        "action": [
                                            "\t[识别老人,man]好！那我说明一次如何使用风之翼吧！\n你先将精神集中在风之翼的宝石上，为它储满能量。",
                                            "\t[识别老人,man]然后握着它的羽毛便能飞翔了！",
                                            "\t[勇者,hero]好！我明白了！我试试看...",
                                            "\t[风之翼,I312]在发出光芒...",
                                            "\t[识别老人,man]好！可以了！就是现在往下跳吧！！",
                                            "\t[勇者,hero]谢谢你！我一定会想办法回来救这里的人！",
                                            "\t[识别老人,man]我们等你带着好消息的回来！！！",
                                            {
                                                "type": "changeFloor",
                                                "floorId": "HG1",
                                                "loc": [
                                                    6,
                                                    3
                                                ],
                                                "time": 500
                                            },
                                            {
                                                "type": "disableShop",
                                                "id": "keyshop"
                                            },
                                            {
                                                "type": "disableShop",
                                                "id": "moneyShop1"
                                            },
                                            {
                                                "type": "disableShop",
                                                "id": "moneyShop2"
                                            },
                                            {
                                                "type": "disableShop",
                                                "id": "expShop1"
                                            },
                                            {
                                                "type": "disableShop",
                                                "id": "expShop2"
                                            },
                                            {
                                                "type": "disableShop",
                                                "id": "doorShop"
                                            },
                                            {
                                                "type": "disableShop",
                                                "id": "coinShop"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "false": [
                            "\t[识别老人,man]你终于来了。经我鉴定，在这里下边有出口的可能性很高，怎样？试试在这里往下飞吧？",
                            "\t[勇者,hero]我急不及待了！",
                            "\t[识别老人,man]先别急，如果你飞了下去后很可能回不来了！你想想这边还有没有什么事情未解决吧。",
                            "\t[识别老人,man]当你决定好时再来找我，到时我会教你如何使用风之翼飞下去了。",
                            "\t[勇者,hero]好的谢谢你！",
                            {
                                "type": "setValue",
                                "name": "switch:A",
                                "value": "true"
                            },
                            {
                                "type": "function",
                                "function": "function(){\ncore.addFlag('talkedCount', 1);\nif (core.getFlag('talkedCount', 0) >= 17) core.plugin.getAchievement(17);\n}"
                            }
                        ]
                    }
                ]
            }
        ],
        "6,11": {
            "trigger": null,
            "enable": false,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": []
        }
    },
    "changeFloor": {
        "6,1": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {
        "4,2": [
            {
                "type": "setBlock",
                "number": "yellowWall",
                "loc": [
                    [
                        1,
                        3
                    ]
                ],
                "floorId": "B25"
            },
            {
                "type": "hide",
                "loc": [
                    [
                        1,
                        4
                    ]
                ],
                "floorId": "B25",
                "remove": true
            }
        ],
        "6,11": [
            "\t[魔王·格勒第,vampire]呜呀...",
            "\t[勇者,hero]要结束了！",
            "\t[魔王·格勒第,vampire]哈哈...我还是胜不了你呢...",
            "\t[魔王·格勒第,vampire]好吧...我说...到真正魔塔的通道在顶楼...",
            "\t[魔王·格勒第,vampire]不过往后还有很多厉害的怪物...别以为能轻易离开！呀！............",
            "\t[魔王·格勒第,vampire]........................\n....................",
            "\t[勇者,hero]看来已经死了.....\n好吧！我们要往真正的出口进发！",
            "\t[公主,princess]嗯。",
            {
                "type": "setBlock",
                "number": "specialDoor",
                "loc": [
                    [
                        6,
                        2
                    ]
                ],
                "floorId": "MT25"
            },
            {
                "type": "setBlock",
                "number": "A376",
                "loc": [
                    [
                        6,
                        1
                    ]
                ],
                "floorId": "MT25"
            },
            {
                "type": "setBlock",
                "number": "man",
                "loc": [
                    [
                        5,
                        3
                    ]
                ],
                "floorId": "MT25"
            },
            {
                "type": "setFloor",
                "name": "canFlyFrom",
                "value": true
            },
            {
                "type": "show",
                "loc": [
                    [
                        6,
                        1
                    ]
                ],
                "time": 0
            },
            {
                "type": "show",
                "loc": [
                    [
                        5,
                        3
                    ]
                ],
                "floorId": "MT25",
                "time": 0
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "upFloor": [
        6,
        1
    ],
    "bgmap": [

],
    "fgmap": [

],
    "width": 13,
    "height": 13,
    "autoEvent": {
        "1,1": {
            "1": null
        },
        "1,2": {
            "1": null
        }
    },
    "bgm": "bgm0.mp3",
    "downFloor": [
        6,
        11
    ],
    "beforeBattle": {},
    "eachArrive": null,
    "cannotMoveIn": {}
}