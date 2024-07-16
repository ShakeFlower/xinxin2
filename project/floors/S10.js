main.floors.S10=
{
    "floorId": "S10",
    "title": "侧塔 10F",
    "name": "10",
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
    "firstArrive": null,
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "5,2": [
            {
                "type": "changeFloor",
                "floorId": "S9",
                "loc": [
                    6,
                    9
                ],
                "time": 500
            },
            {
                "type": "setBlock",
                "number": "A376",
                "loc": [
                    [
                        0,
                        6
                    ]
                ],
                "floorId": "S9"
            }
        ],
        "7,4": [
            {
                "type": "changeFloor",
                "floorId": "FT3",
                "loc": [
                    7,
                    4
                ],
                "time": 500
            }
        ],
        "5,8": [
            "\t[妖精,N408]说个秘密给你，我知道跟白银史莱姆的战斗方法！",
            {
                "type": "if",
                "condition": "(flag:sxzl>=3)",
                "true": [
                    "\t[勇者,hero]好像我一剑就能砍死白银史莱姆啊...",
                    "\t[妖精,N408]..."
                ],
                "false": [
                    "\t[妖精,N408]不过你好像还没有集齐三相之力呢...",
                    "\t[勇者,hero]三相之力？是什么来的？",
                    "\t[妖精,N408]三相之力是三种神器集合的力量，它们分别是\n「妖精之歌颂」、「圣神之加护」和「魔力之源」。",
                    "\t[妖精,N408]当你集齐三个之后就能跟白银系怪物战斗了！"
                ]
            }
        ]
    },
    "changeFloor": {
        "1,11": {
            "floorId": ":before",
            "time": 500
        },
        "3,11": {
            "floorId": ":before",
            "time": 500
        },
        "11,9": {
            "floorId": ":before",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "4,6": [
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
        "1,1": [
            {
                "type": "setValue",
                "name": "flag:sxzl",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "function",
                "function": "function(){\ncore.drawFg(core.status.floorId);\n}"
            }
        ],
        "11,11": [
            {
                "type": "setValue",
                "name": "flag:sxzl",
                "operator": "+=",
                "value": "1"
            },
            {
                "type": "function",
                "function": "function(){\ncore.drawFg(core.status.floorId);\n}"
            }
        ],
        "11,1": [
            {
                "type": "setValue",
                "name": "flag:sxzl",
                "operator": "+=",
                "value": "1"
            },
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
    [343, 72,  3, 27,  3, 28,  0,  3,  3, 34,  3,309,343],
    [343,234,  0,  0,  3,376,384,333,  0,333,  3,255,343],
    [343,361,  3,  0,  3, 27,  0,  3,  3,  0,  3,  0,343],
    [343,  0,  3,361,  3,  3,  3,450,249,  0,249,323,343],
    [343,  0,  3, 31,  3,  3,361,  3,  3, 81,  3,  0,343],
    [343, 32,  3,  3,317,361,  0,361,  3, 81,  3,378,343],
    [343, 22,  3,246,  3,  3,361,  3,  3,  0,  3,231,343],
    [343, 21,  3,256,  3,408,  3,249,  3,361,  3,378,343],
    [343,  0, 82,  0,333,361,  0,  0, 86,234,  3, 88,343],
    [343,  0,  3,  3,  3,  3,  3,249,  3,  3,  3,  3,343],
    [343, 88,  3, 88,  0,377,231,377,  0,  0,  0,307,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "downFloor": [
        1,
        11
    ],
    "beforeBattle": {},
    "cannotMoveIn": {},
    "upFloor": [
        1,
        11
    ]
}