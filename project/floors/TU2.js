main.floors.TU2=
{
    "floorId": "TU2",
    "title": "教程 2F",
    "name": "2",
    "width": 13,
    "height": 13,
    "canFlyTo": false,
    "canFlyFrom": false,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "defaultGround": "ground",
    "bgm": "bgm3.mp3",
    "firstArrive": [
        {
            "type": "setValue",
            "name": "flag:hpManaRatio",
            "value": "0.5"
        },
        {
            "type": "setValue",
            "name": "flag:recomTurnMax",
            "value": "2500"
        },
        {
            "type": "setValue",
            "name": "status:hp",
            "value": "70"
        },
        {
            "type": "setValue",
            "name": "status:atk",
            "value": "24"
        },
        {
            "type": "setValue",
            "name": "status:def",
            "value": "22"
        },
        {
            "type": "setValue",
            "name": "status:mana",
            "value": "41"
        },
        {
            "type": "setValue",
            "name": "status:money",
            "value": "0"
        },
        "第二节：技能进阶与公主",
        {
            "type": "setValue",
            "name": "item:greenKey",
            "value": "2"
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,7": [
            "公主加入队伍！",
            {
                "type": "follow",
                "name": "NPC01-GongZhu.png"
            },
            {
                "type": "addValue",
                "name": "status:mdef",
                "value": "100"
            },
            {
                "type": "setValue",
                "name": "item:I451",
                "value": "1"
            },
            {
                "type": "hide",
                "remove": true
            }
        ],
        "5,7": [
            {
                "type": "setValue",
                "name": "item:moneyPocket",
                "value": "1"
            },
            {
                "type": "hide",
                "remove": true
            }
        ],
        "5,9": [
            {
                "type": "setValue",
                "name": "status:atk",
                "operator": "+=",
                "value": "237"
            },
            {
                "type": "setValue",
                "name": "status:def",
                "operator": "+=",
                "value": "100"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "96"
            },
            {
                "type": "setValue",
                "name": "status:mana",
                "operator": "+=",
                "value": "80"
            },
            "为你提升能力以继续教程后面的内容",
            {
                "type": "hide",
                "remove": true
            }
        ],
        "9,7": [
            {
                "type": "setValue",
                "name": "status:lv",
                "operator": "+=",
                "value": "19"
            },
            {
                "type": "setValue",
                "name": "status:atk",
                "operator": "+=",
                "value": "620"
            },
            {
                "type": "setValue",
                "name": "status:def",
                "operator": "+=",
                "value": "268"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "298"
            },
            {
                "type": "setValue",
                "name": "status:mana",
                "operator": "+=",
                "value": "90"
            },
            {
                "type": "setValue",
                "name": "status:mdef",
                "operator": "+=",
                "value": "150"
            },
            "为你提升能力以继续教程后面的内容",
            {
                "type": "hide",
                "remove": true
            }
        ],
        "7,10": [
            {
                "type": "setValue",
                "name": "status:atk",
                "operator": "+=",
                "value": "88"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "126"
            },
            {
                "type": "setValue",
                "name": "status:mana",
                "operator": "+=",
                "value": "80"
            },
            "为你提升能力以继续教程后面的内容",
            {
                "type": "hide",
                "remove": true
            }
        ],
        "2,3": [
            {
                "type": "setValue",
                "name": "status:atk",
                "operator": "+=",
                "value": "132"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "3500"
            },
            {
                "type": "setValue",
                "name": "status:hpmax",
                "operator": "+=",
                "value": "591"
            },
            "为你提升能力以继续教程后面的内容",
            {
                "type": "hide",
                "remove": true
            }
        ],
        "7,11": [
            {
                "type": "choices",
                "choices": [
                    {
                        "text": "查看提示",
                        "action": [
                            " · 本节可以全程用推荐技能（面对怪物用快捷键7）。\n · 拾取凡骨，攻击+5，不要装备（会扣50血）。\n · 对大史莱姆：第4回合C来躲过其暴击，注意不要提前用C给其带来更多防增气，导致吃到其暴击。\n · 拾取镜膜盾时注意用轻按（空格或者双击勇者）。\n · 装备镜膜盾，用XC打骑士、暗黑魔法师。\n · 先与仙子对话获取冒险袋，再拾取草药精华。",
                            " · 装备流石、结晶盾，给勇者使用高级草药精华，XAZ打触手植物（用结晶盾躲过5+6=11次攻击）。\n · 打极地法师注意公主站位（需让公主站到箭神法比前，减少冰块生成），装备镜膜盾CXC或者转身（快捷键Z或者单击勇者）面对极地法师点7。\n · 用能量转换器给公主转换体力，给公主使用剩下的草药，打箭神法比：AAAAZAAAAZAAAAZ（等价写法：@5Z@10Z@15Z，或(A*4Z)*3，也可直接Z*20，反正最终气息是溢出的）。"
                        ]
                    },
                    {
                        "text": "跳过本章节",
                        "action": [
                            {
                                "type": "setValue",
                                "name": "flag:skipTutorial",
                                "operator": "+=",
                                "value": "1"
                            },
                            {
                                "type": "changeFloor",
                                "floorId": ":next",
                                "loc": [
                                    6,
                                    11
                                ]
                            }
                        ]
                    },
                    {
                        "text": "关闭",
                        "action": []
                    }
                ]
            }
        ]
    },
    "changeFloor": {},
    "beforeBattle": {},
    "afterBattle": {
        "6,1": [
            {
                "type": "function",
                "function": "function(){\ncore.setBlock(376,6,1);core.getBlock(6,1).event.trigger='changeFloor';core.getBlock(6,1).event.data={\"floorId\": \":next\", \"stair\": \":symmetry\" }\n}"
            }
        ]
    },
    "afterGetItem": {
        "5,11": [
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
        ],
        "4,7": [
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
        ],
        "3,7": [
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
        ],
        "9,10": [
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
        ],
        "7,3": [
            {
                "type": "function",
                "function": "function(){\ncore.drawFg(core.status.floorId);\n}"
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  4,  4,  4,  4,  4,379,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  0,  4,  4,  4,  4,  4,343],
    [343,  4,121,323,  0,413,  0,327,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  0,380,  0,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  0,381,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  0,  4,  4,  4,  4,  4,343],
    [343,  4,  4,319,321,124,132,324,323,121,  4,  4,343],
    [343,  4,  4,  4,  4,  4,247,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,121,226,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,203,121, 11,339,  4,  4,343],
    [343,  4,  4,  4,  4,315,  0,124,  4,  4,  4,  4,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "cannotMoveIn": {}
}