main.floors.B07=
{
    "floorId": "B07",
    "title": "魔塔 7F",
    "name": "B07",
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
        "5,5": [
            "\t[小妖精,fairy]在这塔某处有着一瓶充满神圣力量的圣水，喝的时间体力越高效果越好啊！"
        ],
        "1,9": [
            "\t[神秘老人,N409]这里有种很凶恶的怪物叫作黄金史莱姆王，你必须知道跟它们战斗的方法！",
            {
                "type": "if",
                "condition": "(flag:sxzl>=3)",
                "true": [
                    "\t[勇者,hero]好像我一剑就能砍死黄金史莱姆王啊...",
                    "\t[神秘老人,N409]..."
                ],
                "false": [
                    "\t[神秘老人,N409]不过待你拥有「三相之力」再说吧。"
                ]
            }
        ]
    },
    "changeFloor": {
        "1,11": {
            "floorId": ":next",
            "time": 500
        },
        "3,3": {
            "floorId": ":next",
            "time": 500
        },
        "9,11": {
            "floorId": ":next",
            "time": 500
        },
        "5,7": {
            "floorId": ":next",
            "time": 500
        },
        "9,9": {
            "floorId": ":next",
            "time": 500
        },
        "7,5": {
            "floorId": ":next",
            "time": 500
        },
        "5,2": {
            "floorId": ":next",
            "time": 500
        },
        "11,11": {
            "floorId": ":next",
            "time": 500
        },
        "9,3": {
            "floorId": ":next",
            "time": 500
        },
        "11,3": {
            "floorId": ":next",
            "time": 500
        },
        "10,1": {
            "floorId": ":next",
            "time": 500
        },
        "11,1": {
            "floorId": ":before",
            "stair": "upFloor"
        },
        "7,9": {
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
    [343,  0,  0, 27,  0,  0,  0,343, 21,  4, 87, 88,343],
    [343,254,343,343,343, 87,381, 82, 21,  4,  4,  4,343],
    [343, 81,343, 87,343,  0,  0,381,343, 87,343, 87,343],
    [343, 81,343,  0,343,245,  0,  0,343, 31, 33,  0,343],
    [343,  0,343,382,343,124,245, 87,343,343,343,  0,343],
    [343, 32,343,396,343,343,  0,  0,220, 33,343,230,343],
    [343, 28,343, 22,343, 87,343,343,343,382,343,381,343],
    [343, 55,343,  0,343,396,220,  0,343,  0,343,220,343],
    [343,409,343, 33,343,382, 33, 87,343, 87,343,  0,343],
    [343,343,343, 31,343,343,343,343,343,343,343,  0,343],
    [343, 87,  0, 82,  0,230,396,381,  0, 87,343, 87,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "underGround": true,
    "upFloor": [
        1,
        11
    ],
    "beforeBattle": {},
    "cannotMoveIn": {}
}