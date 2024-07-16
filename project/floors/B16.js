main.floors.B16=
{
    "floorId": "B16",
    "title": "魔塔 16F",
    "name": "B16",
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
        "3,6": [
            {
                "type": "if",
                "condition": "(!switch:A)",
                "true": [
                    "系统提示：\n此处商店不能远程使用，需开启魔塔11F的战斗之神",
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "true"
                    }
                ]
            },
            {
                "type": "insert",
                "name": "魔塔经验商店",
                "args": [
                    false
                ]
            }
        ],
        "8,7": [
            "\t[沧桑老人,man]传说很久很久以前，一位勇者杀掉一条黄金色\n的恶龙后得到一件威力强大无比的神器。",
            "\t[沧桑老人,man]自此他就天下无敌了！...完",
            "\t[沧桑老人,man]怎么可能...恶龙怎会杀得掉啊！骗小孩子的故事！"
        ],
        "5,11": [
            "\t[商人,woman]这么大一座塔想必有很多宝物吧！\n我要全部找出来！！哈哈哈哈"
        ]
    },
    "changeFloor": {
        "11,11": {
            "floorId": ":next",
            "time": 500
        },
        "10,10": {
            "floorId": ":before",
            "time": 500
        },
        "6,4": {
            "floorId": ":before",
            "time": 500
        },
        "7,5": {
            "floorId": ":next",
            "time": 500
        },
        "3,9": {
            "floorId": ":next",
            "time": 500
        },
        "3,3": {
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
    [343,  0,256,  0,  0,  0, 11,  0,  3,  0,  0,  0,343],
    [343,256,  3,  3,  3, 27,  3,337,384,337,  3,  0,343],
    [343,  0,  3, 87,  3,337, 81,  3,  3,  3,  3,  0,343],
    [343,  0, 11,  0,  0,  3, 88,  3,  3,384,324,  0,343],
    [343,231,  3,  3,333,333,  3, 87, 28,234,  0,  0,343],
    [343,  0,  9,130, 10,  0,  0,  3,  3,  3,  3, 11,343],
    [343,  0,  0,255,  0, 11,  0,  3,121,  0,  3,  0,343],
    [343,  0,  3,  3,  3,  3, 82,  3,337,384, 81,  0,343],
    [343,  0,  3, 87,  3,337,219,  3,  0,  3,  3,  3,343],
    [343,  0,  3,  0,  3,323,323,  3, 58,  3, 88, 82,343],
    [343, 33,234, 31,  3,122, 32,  3, 55,  3,384, 87,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "downFloor": [
        10,
        10
    ],
    "upFloor": [
        11,
        11
    ],
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}