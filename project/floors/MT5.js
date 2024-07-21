main.floors.MT5=
{
    "floorId": "MT5",
    "title": "主塔 5F",
    "name": "5",
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
    "events": {
        "1,1": [
            {
                "type": "if",
                "condition": "(switch:A==true)",
                "true": [
                    "\t[神秘老人,man]飞翔吧，小兄弟！哈哈哈。"
                ],
                "false": [
                    "\t[神秘老人,man]是黄金色羽根！你居然拥有这么贵重的东西。",
                    "\t[勇者,hero]这是以前某人给我的。",
                    "\t[神秘老人,man]不过它现在已没有了光泽哩。",
                    "\t[勇者,hero]对，我一进来就变成这个样了。\n而且也不能用了。",
                    "\t[神秘老人,man]呵呵，原来你还知道它的用法。\n好吧，我这条首饰有着令它重新活跃起来的力量。",
                    "\t[神秘老人,man]既然我们这么有缘分，我就替你修理好它吧！\n经由这首饰的特殊物料修理后，这羽根会得到千里眼的能力！",
                    "\t[勇者,hero]那太好了，谢谢你！",
                    "修理好黄金之羽根，按 F 就可启动能力。\nH5快捷键为 G 。",
                    {
                        "type": "addValue",
                        "name": "item:fly",
                        "value": "1"
                    },
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "true"
                    },
                    {
                        "type": "hide",
                        "loc": [
                            [
                                4,
                                2
                            ]
                        ],
                        "floorId": "MT10",
                        "remove": true
                    },
                    "系统提示：\n复刻版开局送楼传，但上11楼前仍未与此老人对话会将其移除。",
                    {
                        "type": "function",
                        "function": "function(){\ncore.plugin.getAchievement(24);\ncore.addFlag('talkedCount', 1);\nif (core.getFlag('talkedCount', 0) >= 17) core.plugin.getAchievement(17);\n}"
                    }
                ]
            }
        ],
        "6,1": [
            "\t[商人,woman]怪物与人一样拥有气息，当攻击或是被攻击时，气息就会提升。\n怪物会在气息储满后，下个攻击回合就会使出会心一击。",
            "\t[商人,woman]可是人跟它们不同的地方是气息可储存下来，\n而且使不使用气来发动技能也是随你喜欢。",
            "\t[商人,woman]当有足够的气时，\n按C就会发动会心一击，\n按X就会发动防御术，\n按Z就会发动剑技。",
            "\t[商人,woman]在战斗里面也有相应图案提醒，请切记！",
            "系统提示：\n复刻版需要在与怪物战斗前输入要发动的技能。\n使用技能面板（快捷键6）进行输入。"
        ]
    },
    "changeFloor": {
        "4,11": {
            "floorId": ":next",
            "time": 500
        },
        "11,11": {
            "floorId": ":before",
            "time": 500
        },
        "11,1": {
            "floorId": "MT6b",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,121,203, 28, 31,  1,122,  1,  0,  0,361, 87,343],
    [343,203,  0,217, 27,  1,  0,  1, 21,  0,  1,  0,343],
    [343,  0,  0,217,361,  1,206,  1, 21,226,  1, 31,343],
    [343,  1,  1, 81,  1,  1,  0,  1,  1, 82,  1,  1,343],
    [343,  0,  1,  0,  0,  0,217,  0,  1,361,  0,  0,343],
    [343,205,  1,  0,  1,209,  1,205,  1,  0,  1,  0,343],
    [343,209,205,  0,  1,  0,203,  0,  0,  0,  1, 32,343],
    [343, 82,  1,  1,  1,  1,  0,  1,  1,  1,  1,  0,343],
    [343,  0,361,217,  0,  1, 81,  1,205,  0,  0,  0,343],
    [343,  0,  1,  1,  0,  1, 22,  1,209,  1,  1,  1,343],
    [343,  0,221,221, 87,  1, 31,  1,202,  0,  0, 88,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        4,
        11
    ],
    "downFloor": null,
    "autoEvent": {},
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}