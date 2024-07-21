main.floors.B23=
{
    "floorId": "B23",
    "title": "魔塔 23F",
    "name": "B23",
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
        "3,5": [
            {
                "type": "if",
                "condition": "(switch:A==true)",
                "true": [
                    "\t[妖精,fairy]按 B 就能查看袋中的道具了。\nH5快捷键 T，找到永久道具中的冒险袋并使用。",
                    "\t[妖精,fairy]自己不要喝，家人也要喝！公主没体力时就要给她喝啊。"
                ],
                "false": [
                    "\t[妖精,fairy]噢！你居然把这东西一口喝掉这么浪费！",
                    "\t[勇者,hero]啊...这个不要用来喝还可以做什么？",
                    "\t[妖精,fairy]喝是一定了。但是你有道具袋的话就可以把它们储存起来，在往后的时间才能喝呀！",
                    "\t[妖精,fairy]而且还可以给公主使用哩。",
                    "\t[勇者,hero]但我没有什么冒险袋呢...",
                    "\t[妖精,fairy]看在我们这么有缘，给你这个冒险袋把~",
                    "\t[妖精,fairy]按 B 就能查看袋中的道具了。\nH5快捷键 T，找到永久道具中的冒险袋并使用。",
                    {
                        "type": "setValue",
                        "name": "item:moneyPocket",
                        "operator": "+=",
                        "value": "1"
                    },
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
        "1,11": {
            "floorId": ":next",
            "time": 500
        },
        "1,1": {
            "floorId": ":next",
            "time": 500
        },
        "4,11": {
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
    [343, 87,  0,  0,  0,214,218,214,  0, 11,  0, 31,343],
    [343,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  0,343],
    [343,  0,334, 81,218, 81,377, 81,  0,  0,  3,  0,343],
    [343,  0,  3,  3,  3,  3,  3,  3,  3,  0,  3,  0,343],
    [343,  0,  3,124,324,  0,377,  0,  3,  0, 11,377,343],
    [343,  0,  3,324,  0, 81,  3,  0,211,  0,  3,  0,343],
    [343,  0,  3, 11,  3,  0, 82,218,  3,  0,  3,  0,343],
    [343,  0,  3,214,  0,  0,  3,  0,211,  0,  3,334,343],
    [343,  0,  3,  0,  3,334,  0,334,  3,  0,  3, 31,343],
    [343,  0,  3,  0,  0, 82,  3,  0, 82,  0,  3,211,343],
    [343, 87,  3,  0, 88,  0,  3,  0,  3,  0,  3, 21,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        1,
        11
    ],
    "downFloor": null,
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}