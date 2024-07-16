main.floors.MT13=
{
    "floorId": "MT13",
    "title": "主塔 13F",
    "name": "13",
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
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "4,1": [
            {
                "type": "if",
                "condition": "(switch:A==true)",
                "true": [
                    {
                        "type": "openShop",
                        "id": "keyshop"
                    },
                    {
                        "type": "insert",
                        "name": "钥匙商店",
                        "args": [
                            false
                        ]
                    }
                ],
                "false": [
                    "\t[盗贼,thief]啊啊啊啊啊啊啊!",
                    "\t[盗贼,thief]你不就是上次救我出来的勇者吗! ? \n想不到还有见面的机会哩! ",
                    "\t[勇者,hero]你还在这里干什么?",
                    "\t[盗贼,thief]嘻嘻...当然还是来找值钱的东西了! ",
                    "\t[盗贼,thief]这次我准备的钥匙比上次还多啊！\n不足的话随时来找我吧！",
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "true"
                    },
                    {
                        "type": "openShop",
                        "id": "keyshop"
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "5,5": {
            "floorId": ":before",
            "time": 500
        },
        "7,5": {
            "floorId": ":before",
            "time": 500
        },
        "8,1": {
            "floorId": ":before",
            "time": 500
        },
        "5,11": {
            "floorId": ":next",
            "time": 500
        },
        "7,11": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "6,3": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  2,  2,  2,123,  0, 34,  0, 88,  1,  1,  1,343],
    [343,  0,  0,  0,  2,  2,  0,  1,  1,  0,  0,  0,343],
    [343, 21,  2,216,  2, 27, 85, 28,  1,332,  1, 31,343],
    [343, 22,  2,226,  2,222,  2,222,  1,207,  1, 32,343],
    [343, 21,  2,253,  0, 88,  2, 88,  0,332,  1, 31,343],
    [343,215,  2,  2,  2,  2,  2,  1,  1,  1,  1,204,343],
    [343,  0,  0,204,  0, 58,  2, 59,  0,207,  0,  0,343],
    [343,  0,  0,  2,  2,  2,  2,  1,  1,  1,  0,  0,343],
    [343,  0,216,224,226,  0,  2,  0,329,210,329,  0,343],
    [343,  2,  2,  2,  0,  0,  2,  0,  0,  1,  1,  1,343],
    [343, 31,224,329,224, 87,  2, 87,226,329,216, 33,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "downFloor": [
        5,
        5
    ],
    "upFloor": [
        5,
        11
    ],
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}