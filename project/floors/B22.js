main.floors.B22=
{
    "floorId": "B22",
    "title": "魔塔 22F",
    "name": "B22",
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
        "6,8": [
            {
                "type": "changeFloor",
                "floorId": "FT2",
                "loc": [
                    6,
                    11
                ],
                "time": 500
            }
        ],
        "10,10": [
            {
                "type": "while",
                "condition": "1",
                "data": [
                    {
                        "type": "choices",
                        "text": "\t[医者,N409]你的气色好像不是太好啊？\n只要给我$100我就可以替你\n回复异常状态。",
                        "choices": [
                            {
                                "text": "回复中毒",
                                "need": "status:money>=100 && core.hasFlag('poison')",
                                "action": [
                                    {
                                        "type": "setValue",
                                        "name": "status:money",
                                        "operator": "-=",
                                        "value": "100"
                                    },
                                    {
                                        "type": "function",
                                        "function": "function(){\ncore.triggerDebuff('remove', 'poison');\n}"
                                    }
                                ]
                            },
                            {
                                "text": "回复衰弱",
                                "need": "status:money>=100 && core.hasFlag('weak')",
                                "action": [
                                    {
                                        "type": "setValue",
                                        "name": "status:money",
                                        "operator": "-=",
                                        "value": "100"
                                    },
                                    {
                                        "type": "function",
                                        "function": "function(){\ncore.triggerDebuff('remove', 'weak');\n}"
                                    }
                                ]
                            },
                            {
                                "text": "离开",
                                "action": [
                                    {
                                        "type": "break",
                                        "n": 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "4,11": {
            "floorId": ":next",
            "time": 500
        },
        "9,10": {
            "floorId": ":before",
            "time": 500
        },
        "6,6": {
            "floorId": ":before",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "0,12": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 32, 55,  0,  0,218,218,218,  0,  0,  0, 28,343],
    [343,  0,  0,219,  3,  3,  3,  3,  3,219,  0,324,343],
    [343,  0,  3, 11, 11, 11, 11, 11, 11, 11,  3,  0,343],
    [343,  0,  3, 11, 11, 11, 11, 11, 11, 11,  3,  0,343],
    [343,214,  3, 11, 11, 11, 11, 11, 11, 11,  3,  0,343],
    [343,214,  3, 11, 11, 11, 88, 11, 11, 11,  3,377,343],
    [343,214,  3, 11, 11, 11, 11, 11, 11, 11,  3,377,343],
    [343,  0,  3, 11, 11, 11,450, 11, 11, 11,  3,  0,343],
    [343,  0,  3, 11, 11, 11, 11, 11, 11, 11,  3,  0,343],
    [343,  0,  0,246,246,  3, 82,  3,  3, 88,409,  0,343],
    [343, 58,  0,  0, 87,  3,337,  0,  0,  0, 21, 22,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": null,
    "downFloor": [
        9,
        10
    ],
    "underGround": true,
    "beforeBattle": {}
}