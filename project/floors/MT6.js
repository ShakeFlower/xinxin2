main.floors.MT6=
{
    "floorId": "MT6",
    "title": "主塔 6F",
    "name": "6",
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
        "8,7": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    "\t[商人,woman]如果那个贪婪之神不是直接提升能力，\n而是用这些提升能力的宝石代替。",
                    "\t[商人,woman]大概我已经发达了！"
                ],
                "false": [
                    {
                        "type": "choices",
                        "text": "\t[商人,woman]50元两颗蓝宝石，\n买不买？",
                        "choices": [
                            {
                                "text": "买",
                                "action": [
                                    {
                                        "type": "if",
                                        "condition": "(core.status.hero.money>=50)",
                                        "true": [
                                            {
                                                "type": "addValue",
                                                "name": "status:def",
                                                "value": "4"
                                            },
                                            {
                                                "type": "setValue",
                                                "name": "switch:A",
                                                "value": "true"
                                            },
                                            {
                                                "type": "addValue",
                                                "name": "status:money",
                                                "value": "-50"
                                            },
                                            "取得两颗蓝宝石，防御+4"
                                        ],
                                        "false": []
                                    }
                                ]
                            },
                            {
                                "text": "不买",
                                "action": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "4,11": {
            "floorId": ":before",
            "time": 500
        },
        "4,7": {
            "floorId": "MT7",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1,  0,203, 31,  1,  0,  0,205,203,205,  1,343],
    [343,  1,  0,203,  0, 81,  0, 28,  1,  1,  0,  1,343],
    [343,  1,  0,  1,  1,  1,  1,  1,  1,  0,  0,  1,343],
    [343,  1, 81,  1, 87,  0,  0,  1,410,206,  0,  1,343],
    [343,  1,209,  1,  1,  1,  0,  1,  1,  0, 21,  1,343],
    [343,  1,  0,  0,221,  1,217,209,217,  0, 22,  1,343],
    [343,  1, 31,  0,  0,  1,  0,  1,  1,  1,  1,  1,343],
    [343,  1,  1,  1, 88,  1,  0, 81,213,253, 32,  1,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": null,
    "downFloor": null,
    "autoEvent": {},
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}