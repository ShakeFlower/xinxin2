main.floors.MT17=
{
    "floorId": "MT17",
    "title": "主塔 17F",
    "name": "17",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "3,6": [
            {
                "type": "if",
                "condition": "core.hasItem('icePickaxe')",
                "true": [
                    "\t[公主,princess]呀！宝石锄头被吃掉了！",
                    "\t[勇者,hero]怎么会！它是自动走出来被龙吃的！",
                    "\t[勇者,hero]等等...这条恶龙有点异样啊！",
                    "\t[恶龙,magicDragon]吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼！！！！！！",
                    {
                        "type": "setBlock",
                        "number": "E431",
                        "loc": [
                            [
                                3,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N423",
                        "loc": [
                            [
                                2,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N424",
                        "loc": [
                            [
                                3,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N425",
                        "loc": [
                            [
                                4,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N426",
                        "loc": [
                            [
                                2,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N427",
                        "loc": [
                            [
                                3,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N428",
                        "loc": [
                            [
                                4,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N429",
                        "loc": [
                            [
                                2,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "N430",
                        "loc": [
                            [
                                4,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "setValue",
                        "name": "flag:gD",
                        "value": "1"
                    },
                    {
                        "type": "setValue",
                        "name": "item:icePickaxe",
                        "value": "0"
                    },
                    {
                        "type": "hide",
                        "remove": true
                    }
                ]
            }
        ],
        "6,1": [
            {
                "type": "if",
                "condition": "(blockCls:3,5!=='enemys')",
                "true": [
                    {
                        "type": "if",
                        "condition": "(switch:B!==true)",
                        "true": [
                            "\t[老人,N409]你把那条龙干掉了吗?",
                            "\t[老人,N409]我没看错人，你果然很强!这个国家的将来全靠你了!",
                            {
                                "type": "setValue",
                                "name": "switch:B",
                                "value": "true"
                            }
                        ],
                        "false": [
                            "\t[老人,N409]勇士加油！这个国家就靠你了！"
                        ]
                    }
                ],
                "false": [
                    {
                        "type": "if",
                        "condition": "(core.status.hero.lv>25)",
                        "true": [
                            "\t[老人,N409]没见一阵子，看来确是变强了很多!",
                            "\t[老人,N409]告诉你一个秘密吧，我身后这里有秘道能通往墙壁的对面。\n那你就可以不挑战恶龙就能取得里面的剑技书了。",
                            "\t[勇者,hero]真的？！谢谢你！",
                            {
                                "type": "move",
                                "time": 500,
                                "keep": true,
                                "steps": [
                                    "right:1"
                                ]
                            }
                        ],
                        "false": [
                            "\t[老人,N409]这座塔有很多以前没有出现过的凶恶怪物，\n实力不足的话一下子就会被干掉呢。",
                            "\t[老人,N409]这位战士，看你的潜质你的实力应该不只这样的。",
                            "\t[老人,N409]不过以你现在的能力还不够给我帮你提升呢，到你等级再高一点时再来找我吧!",
                            "系统提示：\n升至26级后，老人会挪开位置。"
                        ]
                    }
                ]
            }
        ],
        "7,1": [
            {
                "type": "if",
                "condition": "((blockCls:3,5!=='enemys')&&(switch:B!==true))",
                "true": [
                    "\t[老人,N409]你把那条龙干掉了吗?",
                    "\t[老人,N409]我没看错人，你果然很强!这个国家的将来全靠你了!",
                    {
                        "type": "setValue",
                        "name": "switch:B",
                        "value": "true"
                    }
                ],
                "false": [
                    "\t[老人,N409]勇士加油！这个国家就靠你了！"
                ]
            }
        ]
    },
    "changeFloor": {
        "2,9": {
            "floorId": ":before",
            "time": 500
        },
        "8,3": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {
        "3,5": [
            {
                "type": "function",
                "function": "function(){\nvar x=core.status.event.data.x,y=core.status.event.data.y;if(core.isset(x)&&core.isset(y)){core.insertAction([{type:'hide', remove: true,loc:[[x-1,y-2],[x,y-2],[x+1,y-2],[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y]]}]);}\n}"
            },
            {
                "type": "if",
                "condition": "(flag:gD===1)",
                "true": [
                    {
                        "type": "setBlock",
                        "number": "knife",
                        "loc": [
                            [
                                3,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                2,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                3,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                4,
                                3
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                2,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                4,
                                4
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                2,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                3,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "setBlock",
                        "number": "coin",
                        "loc": [
                            [
                                4,
                                5
                            ]
                        ]
                    },
                    {
                        "type": "function",
                        "function": "function(){\ncore.plugin.getAchievement(37);\n}"
                    }
                ]
            },
            {
                "type": "hide",
                "loc": [
                    [
                        3,
                        6
                    ]
                ],
                "remove": true
            }
        ]
    },
    "afterGetItem": {
        "3,1": [
            {
                "type": "addValue",
                "name": "status:atk",
                "value": "5"
            },
            {
                "type": "addValue",
                "name": "flag:atkm",
                "value": "6"
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  2,  2,318, 84, 84,409,  0,  2,  2, 32, 31,343],
    [343,  2, 29, 28, 27,  2,  0,  2,  2,  2,  2,332,343],
    [343,  2,189,190,191,  2,  0,  2, 87, 53, 81,  0,343],
    [343,  2,192,193,194,  2,  0,  2,  2,  2,  2,  0,343],
    [343,  2,195,257,196,  2,  0,  0,204,207,204,  0,343],
    [343,  2,  2,  0,  2,  2,  0,  0,  2,  2,  2,  2,343],
    [343, 27,  2, 83,  2,222,  0,  0,  2,  0, 21,  2,343],
    [343,  0,  0,  0,204,222,  0,204, 82,207, 34,  2,343],
    [343,  0, 88,  2,  2,  2,  2,332,  2,  0, 21,  2,343],
    [343,  0,232, 81, 21, 22,  2,332,  2,  2,  2,  2,343],
    [343,204, 32,  2,  2,  2,  2,  0,  0,218, 28, 28,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}