main.floors.B25=
{
    "floorId": "B25",
    "title": "魔塔 25F",
    "name": "B25",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm1.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "1,4": [
            "\t[红色史莱姆,redSlime]噜噜噜噜噜！噜！",
            "\t[勇者,hero]？？？",
            "\t[红色史莱姆,redSlime]噜噜噜呀！",
            "\t[公主,princess]啊！是条密道呢。",
            "\t[公主,princess]这只史莱姆好像很感激你似的。",
            "\t[勇者,hero]噢？难道我有做过什么好事吗？\n想不起...",
            {
                "type": "hide",
                "loc": [
                    [
                        1,
                        2
                    ]
                ],
                "time": 0
            },
            {
                "type": "hide",
                "loc": [
                    [
                        1,
                        3
                    ]
                ],
                "time": 0
            },
            {
                "type": "setBlock",
                "number": "X10033",
                "loc": [
                    [
                        1,
                        1
                    ]
                ]
            },
            {
                "type": "hide",
                "time": 0
            }
        ],
        "4,10": [
            "\t[行商人,woman]我在找一种东西...它是一些不会溶掉的冰块。",
            "\t[行商人,woman]据闻只有使用结晶盾才能制造这种冰块出来...虽然知道这个我也没办法做...我根本不懂什么结晶盾...",
            "\t[行商人,woman]要是给我找到其他制作方法的话，我卖这些冰块就能发达了!\n哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
            "\t[勇者,hero]（疯了...）"
        ],
        "11,4": [
            "\t[行商人,woman]我在这里也听得到出面那家伙的笑声...大概他还在研究制作那种不溶冰的方法吧。",
            "\t[勇者,hero]好像是这样了...",
            "\t[行商人,woman]哈哈，如果小兄弟你懂结晶盾的话也可以找点水来试试看！",
            "\t[行商人,woman]不过不要像那家伙那样疯了啊！哈哈"
        ],
        "8,10": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [],
                "false": [
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
    },
    "changeFloor": {
        "6,11": {
            "floorId": "MT25",
            "loc": [
                6,
                2
            ],
            "time": 500
        },
        "4,6": {
            "floorId": ":before",
            "time": 500
        },
        "1,1": {
            "floorId": "FT1",
            "loc": [
                1,
                11
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "0,0": {
            "0": null,
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  1,  1,  0,  0,211,  0,211,  0,  0,334, 58,343],
    [343,  1,  1,  0,  0,  1, 81,  1,  0,  0,218, 59,343],
    [343,202,  1,  0,  0,  1,  0,  1,  1,  1,  1,  1,343],
    [343,  0,  0,  0,  0,  1,  0,  1,  0,  0,232,122,343],
    [343,218,  0,  0, 21,  1,  0,  1,  0,  0,  0,232,343],
    [343, 22,218,211, 88,  1,  0, 82,334,  0,  0,  0,343],
    [343,  1,  1,  1,  1,  1,232,  1,  1,  1,  1,  1,343],
    [343,  1, 28, 21,  0,  0,  0,  0,  0, 31, 32,  1,343],
    [343,  1,  1, 27,  0,  0,  0,  0,  0, 31,  1,  1,343],
    [343,  1,  1,  1,122,  0,  0,  0,198,  1,  1,  1,343],
    [343,  1,  1,  1,  1,  1,376,  1,  1,  1,  1,  1,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        6,
        11
    ],
    "downFloor": null,
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}