main.floors.B17=
{
    "floorId": "B17",
    "title": "魔塔 17F",
    "name": "B17",
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
        "6,6": [
            {
                "type": "changeFloor",
                "floorId": "FT6",
                "loc": [
                    10,
                    10
                ],
                "time": 500
            }
        ],
        "11,5": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    "\t[商人,woman]在这边的经验之神能更大的提升你的能力啊！"
                ],
                "false": [
                    {
                        "type": "choices",
                        "text": "\t[商人,woman]190元转换做190经验值，\n很便宜吧！",
                        "choices": [
                            {
                                "text": "要",
                                "action": [
                                    {
                                        "type": "if",
                                        "condition": "(core.status.hero.money>=190)",
                                        "true": [
                                            {
                                                "type": "addValue",
                                                "name": "status:exp",
                                                "value": "190"
                                            },
                                            {
                                                "type": "setValue",
                                                "name": "switch:A",
                                                "value": "true"
                                            },
                                            {
                                                "type": "addValue",
                                                "name": "status:money",
                                                "value": "-190"
                                            },
                                            "经验值+190"
                                        ],
                                        "false": []
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
        "11,7": [
            "\t[小妖精,fairy]这塔有很多密室的...不知道你有没有找到没有？嘻嘻",
            "\t[小妖精,fairy]还有有时候不要被事物的外表骗了呢~",
            "\t[勇者,hero]？？？有点听不懂..."
        ],
        "9,5": [
            {
                "type": "if",
                "condition": "core.hasItem('iceCube')",
                "true": [
                    "\t[受伤的盗贼,thief]烫烫烫烫！很痛...",
                    "\t[受伤的盗贼,thief]咦咦咦咦？？小兄弟你身上的冰块很特别，是那里得到的？！",
                    "\t[勇者,hero]这块啊？这块冰不会熔的，的确很特别...我打算离开这里后拿回家收藏呢！",
                    "\t[受伤的盗贼,thief]其实我之所以会烧伤是因为我在熔岩上待得太久...但一切也是为了一件秘宝啊！！",
                    "\t[受伤的盗贼,thief]但现在我走不动了...你去找找看吧... \n我不会恨你的...(痛恨",
                    "\t[勇者,hero]哈哈..."
                ],
                "false": [
                    "\t[受伤的盗贼,thief]烫烫烫烫！很痛...",
                    "\t[受伤的盗贼,thief]我之所以会被抓是因为我的腿被烫伤了...要不然谁能把我抓着啊！！？",
                    "\t[受伤的盗贼,thief]你也要当心地上的熔岩呢小兄弟！"
                ]
            }
        ]
    },
    "changeFloor": {
        "7,11": {
            "floorId": ":next",
            "time": 500
        },
        "11,11": {
            "floorId": ":before",
            "time": 500
        },
        "3,9": {
            "floorId": ":before",
            "time": 500
        },
        "3,3": {
            "floorId": ":before",
            "time": 500
        },
        "5,1": {
            "floorId": ":next",
            "time": 500
        },
        "7,5": {
            "floorId": ":before",
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
    [343,  0,  0, 32,  3, 87,  3,  0,384,  0,  0,  0,343],
    [343,234,  3, 55,  3,  0,  3,  0,  0,384,  3, 86,343],
    [343,  0,  3, 88,  3,234,  3,377,  3,  3, 23,337,343],
    [343,  0,  3,  3,  3,  0,  3,  0,  3,  0, 82,  0,343],
    [343,  0,333,384,333,  0,  3, 88,  3,123,  3,122,343],
    [343,  3,  3,  3,  3,  3,450,  3,  3,  3,  3,  3,343],
    [343, 53,337,231,337,  3, 84, 27, 81, 28,  3,124,343],
    [343,  3,  3,  3,  0,  0,  3,235,  3,235,  3,  0,343],
    [343,377,  0, 88,  3,234,  3,  0,  3,  0,  3,  0,343],
    [343,  0,  3,  3,  0,  0,  3,  0,  3,246,256,246,343],
    [343,  0,256,256,  0,  3,  3, 87,  3,  0,  3, 88,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "downFloor": [
        11,
        11
    ],
    "upFloor": [
        7,
        11
    ],
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}