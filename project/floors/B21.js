main.floors.B21=
{
    "floorId": "B21",
    "title": "魔塔 21F",
    "name": "B21",
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
        "6,3": [
            {
                "type": "if",
                "condition": "core.canMoveDirectly(10, 10)>0",
                "true": [
                    {
                        "type": "openShop",
                        "id": "moneyShop2"
                    }
                ],
                "false": [
                    {
                        "type": "if",
                        "condition": "(!switch:A)",
                        "true": [
                            "系统提示：\n此商店尚未解锁远程使用，解锁条件：能瞬移至右下楼梯口",
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
                "type": "insert",
                "name": "魔塔金币商店",
                "args": [
                    false
                ]
            }
        ],
        "3,4": [
            "\t[小妖精,fairy]你看到吗？在我旁边的是邪眼史莱姆。\n这是魔界特有的凶恶种史莱姆。",
            "\t[小妖精,fairy]它们的邪眼能力会使你在这层不能使用黄金之羽根飞行。\n所以最好把它们处理掉。"
        ]
    },
    "changeFloor": {
        "9,10": {
            "floorId": ":next",
            "time": 500
        },
        "10,2": {
            "floorId": ":before",
            "time": 500
        },
        "2,2": {
            "floorId": ":before",
            "time": 500
        },
        "6,6": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "7,9": [
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
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {
        "8,8": {
            "1": null
        },
        "9,7": {
            "1": null
        },
        "8,6": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 55,  3,  0,  0,246, 33,218,  0, 22,337, 31,343],
    [343,337, 88,218,  3,  3,  3,  3,  3,  0, 88,  0,343],
    [343, 58,246,  0,  3,  7,131,  8,  3,235,  3,  0,343],
    [343,  3,  3,124,  3, 32,218, 32,  3,219,  3,214,343],
    [343,  0,219,  0,  3, 31,  0, 31,  3,  0,  3,214,343],
    [343,235,  3,  3,  3, 32, 87, 32, 85, 50,  3,214,343],
    [343,  0,  3, 27,  3,198, 29,246,  3, 85,  3,  0,343],
    [343,  0,  3, 27,  3,  3,  3, 83, 85,  3, 86,  0,343],
    [343,  0,  3,337,256,  0,  3,375,  3,377,  0,  3,343],
    [343,219,  3,  3,  3, 81,  3,  3,  3, 87,  0,  3,343],
    [343, 58,235,  0,  0,214,  0,  0,  0,  0,323,  3,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        9,
        10
    ],
    "downFloor": [
        2,
        2
    ],
    "underGround": true,
    "beforeBattle": {}
}