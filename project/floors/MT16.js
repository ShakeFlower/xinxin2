main.floors.MT16=
{
    "floorId": "MT16",
    "title": "主塔 16F",
    "name": "16",
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
        "3,4": [
            {
                "type": "if",
                "condition": "switch:B",
                "true": [],
                "false": [
                    {
                        "type": "function",
                        "function": "function(){\ncore.addFlag('talkedCount', 1);\nif (core.getFlag('talkedCount', 0) >= 17) core.plugin.getAchievement(17);\n}"
                    },
                    {
                        "type": "setValue",
                        "name": "switch:B",
                        "value": "true"
                    }
                ]
            },
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    "\t[商人,N410]最近有很多人进来这里寻宝，应该\n还有很多像我这样的商人。"
                ],
                "false": [
                    {
                        "type": "choices",
                        "text": "\t[商人,woman]50元回复800体力，需要吗？",
                        "choices": [
                            {
                                "text": "要",
                                "action": [
                                    {
                                        "type": "if",
                                        "condition": "(status:money>=50)",
                                        "true": [
                                            {
                                                "type": "addValue",
                                                "name": "status:hp",
                                                "value": "800"
                                            },
                                            {
                                                "type": "addValue",
                                                "name": "status:money",
                                                "value": "-50"
                                            },
                                            "体力+800",
                                            {
                                                "type": "setValue",
                                                "name": "switch:A",
                                                "value": "true"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "text": "不要",
                                "action": []
                            }
                        ]
                    }
                ]
            }
        ],
        "11,11": [
            "\t[武装商人,woman]你知道吗？人类的身体有自我保护机制。",
            "\t[武装商人,woman]它不会让你在疲劳状态下再使用高消耗\n的行动，比方说是使用剑技或防御术。",
            "\t[武装商人,woman]而一般人的限制是疲劳大于20后\n就不能再使用它们了。\n这是你就需要使用深呼吸了。",
            "\t[武装商人,woman]我看，你的疲劳限制大概是${core.getFlag('tiredMax',20)}吧。\n在战斗时要注意啊！"
        ]
    },
    "changeFloor": {
        "1,3": {
            "floorId": ":before",
            "time": 500
        },
        "2,9": {
            "floorId": ":next",
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
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,  2,  0, 31, 31,224,329,  2,  0,204,  0, 23,343],
    [343, 88,  0,  2,  2,  2,222,  2,  0,232,  0, 22,343],
    [343,  2,  2,410,  0,  2,  0,  2,  0,  2,  2,  2,343],
    [343,  0,  0,  0,  0,  2,  0,  2, 28, 28, 81, 32,343],
    [343,  0,  2,  0,204, 81,222,  2,  0,232,  2,  2,343],
    [343,204,  2,  0,222,  2,207,  2,  0,332,  0,  0,343],
    [343,  0,  0,  2,332,  2,  0,  2,  2,  2,  0,  0,343],
    [343,  0, 87,  2,  0,  2,  0, 82,  0,204,  0,  0,343],
    [343,  0,  0,  2, 21,  2,  0,  2,  0,  2,  2,  2,343],
    [343, 27, 28,  2, 21,  2, 27,  2,  0,204, 27,122,343],
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