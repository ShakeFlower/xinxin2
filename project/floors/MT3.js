main.floors.MT3=
{
    "floorId": "MT3",
    "title": "主塔 3F",
    "name": "3",
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
        "7,8": [
            {
                "type": "openShop",
                "id": "moneyShop1"
            },
            {
                "type": "insert",
                "name": "主塔金币商店",
                "args": [
                    false
                ]
            }
        ],
        "10,10": null,
        "6,4": [
            "\t[健壮老人,N409]这塔里有一些剑技和防御术秘籍，\n如果你能找到并学会，必定对你的冒险有莫大帮助。",
            "\t[健壮老人,N409]但要熟练这些秘籍恐怕要花上数年时间啊。",
            "\t[勇者,hero]可我没这么多时间了！",
            "\t[健壮老人,N409]暂时学懂也不是没办法，只要损耗一点点生命就可暂时使用其中一种了。",
            "\t[健壮老人,N409]当然这应急方案有它的弊端，就是要转用其他秘籍就必需再花上生命才可。",
            "\t[勇者,hero]这样也好!谢谢提醒",
            "\t[健壮老人,N409]而且使用它们的前提是要你有足够的等级。\n实战经验不足就驾驭不了，是个很简单的道理呢。"
        ],
        "11,11": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [],
                "false": [
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
        "2,11": {
            "floorId": ":before",
            "time": 500
        },
        "1,1": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {
        "7,9": null,
        "10,10": null
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 87,205, 82,  0,  1, 32, 28, 32, 28, 28,361,343],
    [343, 28, 27,  1,217,  1,202,205,202,  0,  0,  0,343],
    [343,  1,  1,  1,  0,  1,  0,361,  0,  0,  0, 23,343],
    [343,  0,  0,  0,  0,  1,409,  0,209,221,209, 31,343],
    [343,  0, 31,  1,  0,  1,  1,  1,  1, 81,  1,  1,343],
    [343,201,  1,  1,  0, 81,  0,  0,  0,  0,  0,  1,343],
    [343,202,  1,  1,  1,  1,  1,  1,  1,  1,  0, 21,343],
    [343,201,  1,  1,  1,  1,  7,131,  8,  1,  0, 22,343],
    [343,  0,  1,  1,  1,  1,  1, 85,  1,  1,361, 21,343],
    [343,  0,  0,  0,  1,  1,217,  0,209,  1,  0,  0,343],
    [343,  1, 88,  0,205,  0,  0,  0,  0,205,  0,198,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "autoEvent": {
        "7,9": {
            "1": null
        }
    },
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}