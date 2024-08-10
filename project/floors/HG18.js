main.floors.HG18=
{
    "floorId": "HG18",
    "title": "皇宫 #15",
    "name": "皇宫",
    "width": 13,
    "height": 13,
    "canFlyTo": false,
    "canFlyFrom": false,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm4.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,10": [
            "\t[勇者,hero]终于到了最终决战了...你放心，我必定会把国王安然地救出来！",
            "\t[公主,princess]我相信你...谢谢",
            "\t[勇者,hero]在战斗中要小心了！",
            "\t[公主,princess]好",
            {
                "type": "hide",
                "time": 0
            }
        ],
        "6,5": [
            "\t[勇者,hero]魔王！你的死期到了！",
            "\t[魔界之王 · 古顿,E447]勇士...我等了你很久！我就知道你一定能打到来这里！",
            "\t[魔界之王 · 古顿,E447]不过一切都太迟了，我储存的能量已经到达顶点，这里很快就会变成一片寂静的荒野！",
            "\t[勇者,hero]我不会让你这样做的！你先问过我的剑吧！",
            "\t[魔界之王 · 古顿,E447]哈哈！不堪一击的人类，我看你们只有嘴上功夫强！来吧！快点打败我！如果你能够的话！哈哈哈",
            "\t[勇者,hero]我来了！公主你要小心了！",
            "\t[公主,princess]好的，我不会扯你后腿！",
            {
                "type": "hide",
                "remove": true
            }
        ]
    },
    "changeFloor": {},
    "afterBattle": {
        "6,2": [
            {
                "type": "setBlock",
                "number": "E447"
            },
            "\t[魔界之王 · 古顿,E447]不可能！这不可能发生！我堂堂魔界之王竟然会...咳...",
            "\t[勇者,hero]到..此为止了！你不能再在人间作恶了...",
            {
                "type": "setBlock",
                "number": "womanMagician",
                "loc": [
                    [
                        7,
                        2
                    ]
                ]
            },
            "\t[国王,womanMagician]我能动了！谢谢你，这位勇士，又是你再一次救了这个国家！",
            "\t[公主,princess]太好了！父王，你终于回复正常了！\n我很担心你呢...幸好...",
            "\t[魔界之王 · 古顿,E447]呀呀呀呀呀呀呀！还没完呢！！！！\n我得不到的东西也不能够留下来！！！",
            "\t[魔界之王 · 古顿,E447](全身发出紫光)",
            "\t[国王,womanMagician]不好了！他想与这里同归于尽！",
            "\t[勇者,hero]我不会让你这么做的...咳咳...",
            "\t[魔界之王 · 古顿,E447]看你现在的样子，你还能阻止我吗？\n你还能阻止我吗？！！",
            "\t[勇者,hero]不试..试怎知道！...即使是拼上我的性命！\n我也得阻止你！！！",
            "\t[魔界之王 · 古顿,E447]好！就看你能怎样！",
            "\t[勇者,hero]呀呀呀呀呀！",
            "\t[公主,princess]勇士！不要啊！！！！！！！！",
            {
                "type": "pauseBgm"
            },
            {
                "type": "drawImage",
                "image": "win.jpg",
                "x": 170,
                "y": 180,
                "w": 240,
                "h": 230
            },
            {
                "type": "hideStatusBar"
            },
            {
                "type": "setCurtain",
                "color": [
                    0,
                    0,
                    0,
                    1
                ],
                "time": 0,
                "keep": true
            },
            {
                "type": "playBgm",
                "name": "bgm0.mp3"
            },
            {
                "type": "scrollText",
                "text": "大战过后，\n人间的一切都原好无缺地留下来了，\n魔王的计划被成功阻止...\n只是勇士付出了宝贵的性命去换取这一切...\n\n这位勇士是谁？为何它会出现？\n没有人知道...而且这个秘密也不能再被考究\n这段事迹大概会成为一个美丽的传说一直传诵下去...\n十年，一百年，一千年...\n\n这个国度又再恢复和平了。\n可是，魔塔会再次像这样出现吗？\n...\n大概不会吧？\n或许，到时候便会有另一位勇士出现来再解决一切危险...\n像这次一样。\n但是这一天不会再出现了吧？\n或许，还是会有人希望这一天再出现。\n\n...\n..\n.",
                "time": 15000,
                "lineHeight": 1.4
            },
            {
                "type": "pauseBgm"
            },
            {
                "type": "if",
                "condition": "(core.status.hard==='Standard')",
                "true": [
                    {
                        "type": "choices",
                        "text": "选择计分方式",
                        "choices": [
                            {
                                "text": "攻防和（极限能力玩法）",
                                "action": [
                                    {
                                        "type": "setValue",
                                        "name": "status:hp",
                                        "value": "(status:atk+status:def)",
                                        "norefresh": true
                                    },
                                    {
                                        "type": "win",
                                        "reason": "能力计分(勇士的攻防和)"
                                    }
                                ]
                            },
                            {
                                "text": "杀敌数（速通玩法）",
                                "action": [
                                    {
                                        "type": "setValue",
                                        "name": "status:hp",
                                        "value": "(5000-core.status.hero.statistics.battle)",
                                        "norefresh": true
                                    },
                                    {
                                        "type": "win",
                                        "reason": "速攻计分(5000-杀敌数)"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "false": [
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "value": "Math.round((Math.sqrt(((status:hp/2)+status:hpmax))))",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "status:lv",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "status:atk",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "status:def",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "status:mdef",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(flag:atkm-10)/0.6",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(40-flag:defm)/0.6",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(240-status:manamax)/3",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "flag:deepBreath-5",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "flag:tiredMax-20",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "flag:red_herb",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(flag:blue_herb*3)",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(item:redKey*4)",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(item:I398*5)",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(item:I400*10)",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(item:I403*20)",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "(item:I407*30)",
                        "norefresh": true
                    },
                    {
                        "type": "setValue",
                        "name": "status:hp",
                        "operator": "+=",
                        "value": "flag:achieveScore",
                        "norefresh": true
                    },
                    {
                        "type": "if",
                        "condition": "flag:hasCheated",
                        "true": [
                            {
                                "type": "setValue",
                                "name": "status:hp",
                                "value": "1",
                                "norefresh": true
                            }
                        ]
                    },
                    {
                        "type": "win",
                        "reason": "综合能力计分"
                    }
                ]
            }
        ],
        "5,7": [
            {
                "type": "hide",
                "loc": [
                    [
                        10,
                        6
                    ]
                ],
                "remove": true
            },
            {
                "type": "setBlock",
                "number": "centerFly",
                "loc": [
                    [
                        10,
                        2
                    ]
                ]
            },
            {
                "type": "setBlock",
                "number": "centerFly",
                "loc": [
                    [
                        10,
                        3
                    ]
                ]
            },
            {
                "type": "setBlock",
                "number": "centerFly",
                "loc": [
                    [
                        10,
                        4
                    ]
                ]
            }
        ],
        "7,7": [
            {
                "type": "hide",
                "loc": [
                    [
                        2,
                        6
                    ]
                ],
                "remove": true
            },
            {
                "type": "setBlock",
                "number": "centerFly",
                "loc": [
                    [
                        2,
                        2
                    ]
                ]
            },
            {
                "type": "setBlock",
                "number": "centerFly",
                "loc": [
                    [
                        2,
                        3
                    ]
                ]
            },
            {
                "type": "setBlock",
                "number": "centerFly",
                "loc": [
                    [
                        2,
                        4
                    ]
                ]
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "6,6": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,347,347,347,390,390,390,390,390,347,347,347,343],
    [343,347,  0,347,390,390,447,125,390,347,  0,347,343],
    [343,347,  0,347,390,390,390,390,390,347,  0,347,343],
    [343,347,  0,347,366,366,366,366,366,347,  0,347,343],
    [343,347,  0,347,390,347,  0,347,390,347,  0,347,343],
    [343,347,347,347,347,347, 85,347,347,347,347,347,343],
    [343,347, 28, 27,351,440,  0,441,348, 32, 31,347,343],
    [343,347, 28, 28, 27,351,  0,351, 32,304, 31,347,343],
    [343,347, 27,304,304,348,  0,351,304, 32, 31,347,343],
    [343,347,  0,  0,  0,  0,  0,  0,  0,  0,  0,347,343],
    [343,347,347,347,347,347,  0,347,347,347,347,347,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}