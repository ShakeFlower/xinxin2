main.floors.MT25=
{
    "floorId": "MT25",
    "title": "主塔 25F",
    "name": "25",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": false,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "firstArrive": [
        {
            "type": "hide",
            "loc": [
                [
                    6,
                    4
                ]
            ]
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,10": [
            "\t[勇者,hero]祭典还未开始呢！幸好来得及！",
            "\t[公主,princess]咦...？ \n是上次的战士，果然还是你来救我呢。",
            "\t[勇者,hero]闲话少说了，\n这里很危险，我先和你一起离开吧。",
            "\t[公主,princess]好的，拜托你了。",
            "公主加入队伍！",
            {
                "type": "show",
                "loc": [
                    [
                        6,
                        4
                    ]
                ],
                "time": 0
            },
            {
                "type": "setBlock",
                "number": "downFloor",
                "loc": [
                    [
                        6,
                        4
                    ]
                ]
            },
            {
                "type": "hide",
                "time": 0
            },
            {
                "type": "setFloor",
                "name": "canFlyFrom",
                "value": true
            },
            {
                "type": "setFloor",
                "name": "canFlyFrom",
                "floorId": "MT1",
                "value": false
            },
            {
                "type": "addValue",
                "name": "status:mdef",
                "value": "100"
            },
            {
                "type": "follow",
                "name": "NPC01-GongZhu.png"
            },
            {
                "type": "function",
                "function": "function(){\ncore.plugin.getAchievement(20);\n}"
            },
            {
                "type": "hide",
                "loc": [
                    [
                        5,
                        2
                    ]
                ],
                "floorId": "MT1",
                "remove": true
            },
            {
                "type": "setBlock",
                "number": "ground2",
                "loc": [
                    [
                        8,
                        1
                    ],
                    [
                        3,
                        2
                    ],
                    [
                        4,
                        2
                    ],
                    [
                        5,
                        2
                    ],
                    [
                        7,
                        2
                    ],
                    [
                        9,
                        2
                    ],
                    [
                        3,
                        3
                    ],
                    [
                        4,
                        3
                    ],
                    [
                        8,
                        3
                    ],
                    [
                        9,
                        3
                    ],
                    [
                        10,
                        3
                    ],
                    [
                        8,
                        4
                    ],
                    [
                        10,
                        4
                    ],
                    [
                        1,
                        5
                    ],
                    [
                        11,
                        5
                    ],
                    [
                        4,
                        6
                    ],
                    [
                        3,
                        7
                    ],
                    [
                        4,
                        7
                    ],
                    [
                        4,
                        8
                    ],
                    [
                        4,
                        9
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "setBlock",
                "number": "star",
                "loc": [
                    [
                        5,
                        1
                    ],
                    [
                        8,
                        2
                    ],
                    [
                        3,
                        5
                    ],
                    [
                        11,
                        6
                    ],
                    [
                        7,
                        7
                    ],
                    [
                        9,
                        7
                    ],
                    [
                        2,
                        8
                    ],
                    [
                        3,
                        11
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "setBlock",
                "number": "redPotion",
                "loc": [
                    [
                        5,
                        3
                    ],
                    [
                        5,
                        4
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "setBlock",
                "number": "redGem",
                "loc": [
                    [
                        5,
                        9
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "setBlock",
                "number": "blueGem",
                "loc": [
                    [
                        7,
                        4
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "setBlock",
                "number": "vampire",
                "loc": [
                    [
                        6,
                        11
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "show",
                "loc": [
                    [
                        6,
                        10
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "show",
                "loc": [
                    [
                        6,
                        11
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "hide",
                "loc": [
                    [
                        6,
                        1
                    ]
                ],
                "floorId": "MT1"
            },
            {
                "type": "hide",
                "loc": [
                    [
                        6,
                        2
                    ]
                ],
                "floorId": "MT1",
                "remove": true
            }
        ],
        "5,3": {
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
            "data": [
                "\t[识别老人,man]怎么气喘喘的? \n发生了什么事吗? ",
                "\t[勇者,hero]原来你来了这里。\n刚刚魔王把第一层毁了！现在这里没有出口了！ ",
                "\t[识别老人,man]哈哈哈！幸好我赶得及离开呢！",
                "\t[识别老人,man]不过出口没了真的很糟糕...但在我后面有个魔法阵...\n看起来应该是个传送点，你就去看看吧！",
                "\t[勇者,hero]好的！那么我们有机会再见！",
                "\t[识别老人,man]慢着慢着，你身后的就是公主吗? ",
                "\t[公主,princess]对，我就是。",
                "\t[识别老人,man]你头上的饰物...我不会看错的。\n一定是能量转换器！ ",
                "\t[勇者,hero]这个... ?有甚么特别用途的吗? ",
                "\t[识别老人,man]当然了！这个东西能够将这位勇者的体力\n转化成你的体力。\n在往后的冒险应该用得着的。",
                "\t[勇者,hero]谢谢你!你又一次帮了我们一个大忙。",
                "\t[识别老人,man]别说这么多了，你们先走吧，我之后就会赶上来了。",
                {
                    "type": "setValue",
                    "name": "item:I451",
                    "operator": "+=",
                    "value": "1"
                },
                {
                    "type": "if",
                    "condition": "(blockId:5,2==='redGem')",
                    "true": [
                        {
                            "type": "setBlock",
                            "number": "redGem",
                            "loc": [
                                [
                                    6,
                                    5
                                ]
                            ]
                        }
                    ]
                },
                {
                    "type": "move",
                    "time": 500,
                    "keep": true,
                    "steps": [
                        "up:1"
                    ]
                },
                {
                    "type": "hide"
                }
            ]
        },
        "5,2": [
            {
                "type": "if",
                "condition": "core.hasItem('I312')",
                "true": [
                    "\t[识别老人,man]怎么又气喘喘的？\n这次又发生了事吗？",
                    "\t[勇者,hero]嗄嗄嗄...这边的魔神被我解决了！可是魔界的大军早已朝我们的地方入侵！我们要赶回去了！",
                    "\t[识别老人,man]这可不得了啊！但是你们之前不是说这边的出口不是被毁掉了吗？怎样回来这里？",
                    "\t[勇者,hero]我们被迷惑了...真正的出口真的是我进来的地方...",
                    "\t[识别老人,man]那就奇怪了，我看在一楼那里还是空空如也的...应该没有甚么出口才对...",
                    "\t[识别老人,man]咦？慢着！这不是传说中的「风之翼」吗？！",
                    "\t[勇者,hero]这东西是在魔神身上捡回来的，难道它有用吗？",
                    "\t[识别老人,man]说不定呢！听说古代的人是用这个东西来飞行的！说不定你们从一楼那里往下飞就可以找到出口！！",
                    "\t[勇者,hero]很好！那我现在就去一楼了！",
                    "\t[识别老人,man]好！我也去那里视察一下，我先到一楼等你们过来！",
                    {
                        "type": "setBlock",
                        "number": "man",
                        "loc": [
                            [
                                7,
                                10
                            ]
                        ],
                        "floorId": "MT1"
                    },
                    {
                        "type": "hide",
                        "remove": true,
                        "time": 0
                    }
                ],
                "false": [
                    "\t[识别老人,man]路上要小心。\n有任何关于识别的事情可以找我！",
                    {
                        "type": "if",
                        "condition": "core.hasItem('shield5')",
                        "true": [
                            "\t[识别老人,man]咦！你这个不是「海王之水晶球」吗? ",
                            "\t[勇者,hero]呀...好像是叫这个的，这东西有什么能力吗? ",
                            "\t[识别老人,man]当然！以我鉴定这个水晶球能与公主的头饰产生共鸣而获得新的能力！",
                            "\t[识别老人,man]而「海王之水晶球」是掌管大海，拥有防守力量之神的水晶球，当公主被攻击时怪物会感到疲劳啊！",
                            "\t[识别老人,man]另外主角更会得到「防御术大师」的力量！不需再用体力转换防御术了，而且在战斗中更可使用所有防御术！",
                            "\t[勇者,hero]太好了！这对我们的冒险有极大帮助！谢谢你！",
                            "\t[识别老人,man]不用客气！",
                            "获得「海王」之能力！",
                            {
                                "type": "addValue",
                                "name": "item:shield5",
                                "value": "-1"
                            },
                            {
                                "type": "addValue",
                                "name": "item:I327",
                                "value": "1"
                            },
                            {
                                "type": "function",
                                "function": "function(){\ncore.drawFg(core.status.floorId);\n}"
                            }
                        ]
                    },
                    {
                        "type": "if",
                        "condition": "core.hasItem('shield4')",
                        "true": [
                            "\t[识别老人,man]等等！这个是「树精之水晶球」！你弄到好东西了！",
                            "\t[勇者,hero]难道这东西有什么特别的能力吗? ",
                            "\t[识别老人,man]当然！以我鉴定这个水晶球会与公主的头饰产生共鸣而获得能力！);",
                            "\t[识别老人,man]而「树精之水晶球」是掌管大地，拥有精气力量之神的水晶球，当公主被攻击时会增加主角的气息！",
                            "\t[识别老人,man]另外主角更会得到「再生之力」的力量！转换剑技或防御术时不需要再用体力了！",
                            "\t[勇者,hero]太好了！这对我们的冒险有极大帮助！谢谢你！",
                            "\t[识别老人,man]不用客气！",
                            "获得「树精」之能力！",
                            {
                                "type": "addValue",
                                "name": "item:shield4",
                                "value": "-1"
                            },
                            {
                                "type": "addValue",
                                "name": "item:I326",
                                "value": "1"
                            },
                            {
                                "type": "function",
                                "function": "function(){\ncore.drawFg(core.status.floorId);\n}"
                            }
                        ]
                    },
                    {
                        "type": "if",
                        "condition": "core.hasItem('shield3')",
                        "true": [
                            "\t[识别老人,man]等等！你这个不是「火神之水晶球」吗? ",
                            "\t[勇者,hero]呀...好像是，这东西有什么能力吗? ",
                            "\t[识别老人,man]当然!以我鉴定这个水晶球会与公主的头饰产生共鸣而获得能力！);",
                            "\t[识别老人,man]而「火神之水晶球」是掌管火炎，被称为拥有破坏力量之神的水晶球，当公主被攻击时会将少量伤害反射到怪物身上! ",
                            "\t[识别老人,man]另外主角更会得到「剑技大师」的力量！不需再用体力转换剑技，而且在战斗中更可使用所有剑技! ",
                            "\t[勇者,hero]太好了！这对我们的冒险有极大帮助！谢谢你！",
                            "\t[识别老人,man]不用客气！",
                            "获得「火神」之能力！",
                            {
                                "type": "addValue",
                                "name": "item:shield3",
                                "value": "-1"
                            },
                            {
                                "type": "addValue",
                                "name": "item:I325",
                                "value": "1"
                            },
                            {
                                "type": "function",
                                "function": "function(){\ncore.drawFg(core.status.floorId);\n}"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "6,1": {
            "floorId": "B25",
            "loc": [
                6,
                11
            ],
            "time": 500
        },
        "6,4": {
            "floorId": ":before",
            "stair": "upFloor"
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "1,1": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,  2,  2,  2,  2, 27,  2, 28,  2,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  0,  2,  0,  2,  2,  2,  2,343],
    [343,  2,  2,  2, 32,  0,  0,  0, 32,  2,  2,  2,343],
    [343,  2,  2,  2, 31,  0,  0,  0, 31,  2,  2,  2,343],
    [343,  2,  2,  2, 33,  0,  0,  0, 33,  2,  2,  2,343],
    [343,  2,  2,  2,  5,  5,247,  5,  5,  2,  2,  2,343],
    [343,  2,  2,  2,  5,  5,361,  5,  5,  2,  2,  2,343],
    [343,  2,  2,  2,  2,361, 11,361,  2,  2,  2,  2,343],
    [343,  0,  0,  0,361, 11,132, 11,361,  0,  0,  0,343],
    [343,  2,  2,  2,  2,361, 11,361,  2,  2,  2,  2,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "upFloor": [
        6,
        4
    ],
    "downFloor": [
        6,
        4
    ],
    "cannotMoveIn": {}
}