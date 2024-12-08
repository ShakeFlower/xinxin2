main.floors.MT2=
{
    "floorId": "MT2",
    "title": "主塔 2F",
    "name": "2",
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
        "7,6": [
            "\t[商人,woman]你知道吗？按L就可以查看你目前能使用的指令按键列表。",
            "\t[商人,woman]作为一个商人，一个指令列表真的很重要呢！对吧！",
            "\t[勇者,hero]好像没什么关系..."
        ],
        "2,7": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    {
                        "type": "openShop",
                        "id": "doorShop"
                    },
                    {
                        "type": "insert",
                        "name": "随意门商店",
                        "args": [
                            false
                        ]
                    }
                ],
                "false": [
                    "\t[老人,man]我就知道你会再来！没见三个月，没有忘记我是谁吧？",
                    "\t[勇者,hero]你是..是卖随意门的老伯。",
                    "\t[老人,man]哈哈哈，还记得我呢，真高兴！",
                    "\t[老人,man]闲话短说，你面前的墙要用随意门来毁，面向它按 T 键用随意门就可以了，没有忘记用法吧？",
                    "\t[勇者,hero]当然没有。",
                    "\t[老人,man]好，免费送你一些随意门吧！以后要小心呢。",
                    "\t[老人,man]随意门不足时可回来找我。",
                    {
                        "type": "addValue",
                        "name": "item:greenKey",
                        "value": "3"
                    },
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "true"
                    },
                    {
                        "type": "openShop",
                        "id": "doorShop"
                    },
                    "系统提示：\n复刻版已为你显示出所有能使用随意门的位置（用紫色门标识），直接撞上去便自动使用随意门，无须按T键。",
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
            "floorId": ":next",
            "time": 500
        },
        "6,1": {
            "floorId": ":before",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 21, 28,  0,202,  1, 88,  1,  1,344,  4,361,343],
    [343, 32,  0,  1,205,  1,  0,  1,  1,  1,344,344,343],
    [343, 21,  0,  1,202,  1,  0,361,  0,201, 28,  4,343],
    [343, 27,201,  1,361,  1,  0,  0,  0,202,201, 27,343],
    [343,  1, 22,  1,  0,  1,  0,  0,  1,  4,344,  4,343],
    [343,  1,  1,  1,  0,  0,  0,410,344,344,344,  1,343],
    [343,  1,121,  1,  1,  1, 82,344,344,  1, 32, 21,343],
    [343,  1,  0,  0, 31,  1,361,  4,344,  0,  0,  1,343],
    [343,  1,205,  1,  0,  1,  0,202,253,216, 86, 29,343],
    [343,  1, 84,  1,  0,  1,  0,344,344,  4, 23,344,343],
    [343,  1, 87,  1,  0,  0,  0,  4,344,344,344,  4,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "autoEvent": {},
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}