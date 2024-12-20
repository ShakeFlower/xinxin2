main.floors.B12=
{
    "floorId": "B12",
    "title": "魔塔 12F",
    "name": "B12",
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
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "11,5": [
            "\t[小妖精,fairy]防御术中【精灵罩】的防御提升效果是会变动的，建议在战斗前先按 H（H5快捷键 Q）查看一下目前的效果。"
        ],
        "10,2": [
            "\t[商人,N410]这里附近的怪物很多都会令你陷入异常状态。",
            "\t[勇者,hero]对...解毒都使我走得累了...",
            "\t[商人,N410]我听说在这之前有妖精的楼层那里有秘道通往「脱毒」的房间啊！\n建议你先调查一下再继续会较好！哈哈"
        ],
        "1,9": [
            "\t[神秘老人,N409]说个秘密你听，我知道跟白银史莱姆王的战斗方法！",
            {
                "type": "if",
                "condition": "(flag:sxzl>=3)",
                "true": [
                    "\t[勇者,hero]好像我一剑就能砍死白银史莱姆王啊...",
                    "\t[神秘老人,N409]..."
                ],
                "false": [
                    "\t[神秘老人,N409]但你必先要有「三相之力」的力量。"
                ]
            }
        ]
    },
    "changeFloor": {
        "9,3": {
            "floorId": "B13",
            "time": 500
        },
        "7,8": {
            "floorId": "B13",
            "time": 500
        },
        "2,8": {
            "floorId": ":before",
            "time": 500
        },
        "11,1": {
            "floorId": "S1",
            "loc": [
                1,
                1
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
    [343, 31,  0,255,  0,  0,  3,  3,  3,  3,  3,10024,343],
    [343,  0,  3,  3,  3,231,  0,  0,  3,  3,410,  0,343],
    [343,  0,  3,  0,396, 81,  3,  0,  3, 87,333,  0,343],
    [343,  0,  3,324,  3,255,  3,  0,  3,  3,  3,  3,343],
    [343,231,  3, 55,  3,  0,  3,378, 82,223,  0,124,343],
    [343,223,  3,323,223, 31,  3,  0,  3,  0,  0,  0,343],
    [343,  0,  3,  3,  3,  3,  3, 32,  3,255,378,227,343],
    [343,  0, 88,  3,  3,  0, 27, 87,  3, 22, 50, 21,343],
    [343,409,  0,227,231,  0,  3, 31,  3, 28, 27, 28,343],
    [343,  3,  3,  3,  3,  3,  3,324,  3,  0,236,  0,343],
    [343, 30, 53,236,  0,223, 81,231,  3,231, 23,396,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        9,
        3
    ],
    "downFloor": null,
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}