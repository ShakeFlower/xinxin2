main.floors.HG1=
{
    "floorId": "HG1",
    "title": "城外 #1",
    "name": "城外",
    "width": 13,
    "height": 13,
    "canFlyTo": false,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm4.mp3",
    "firstArrive": [
        {
            "type": "function",
            "function": "function(){\ncore.removeMaps(\"FT1\", \"MT25\")\n}"
        },
        {
            "type": "setGlobalFlag",
            "name": "flyRecordPosition",
            "value": true
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,9": [
            "\t[勇者,hero]看！是出口！原来魔塔只是被他们传送到了半空中而已！",
            "\t[公主,princess]我们快回皇宫看看吧！",
            "\t[勇者,hero]好！",
            {
                "type": "hide",
                "time": 0
            }
        ]
    },
    "changeFloor": {
        "6,11": {
            "floorId": "HG2",
            "loc": [
                9,
                1
            ],
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
    [343,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1,  1,  0,  0,  0,  0,  0,361,  0,  1,  1,343],
    [343,  1,  0,361,361,  0,361,  0,361,  0,361,  1,343],
    [343,  1,361,  0,  0,361,  0,361,361,  0,  0,  1,343],
    [343,  1,  0,361,361,361,  0,361,  0,361,  0,  1,343],
    [343,  1,  0,361,361,  0,361,  0,361,  0,  0,  1,343],
    [343,  1,  0,361,361,361,  0,  0,  0,361,  0,  1,343],
    [343,  1,  0,  0,  0,  0,361,  0,361,361,361,  1,343],
    [343,  1,  0,361,  0,  0,  0,  0,361,361,361,  1,343],
    [343,  1,  1,  0,198,  1, 86,  1,  0,  0,  1,  1,343],
    [343,  1,  1,  1,  1,  1,10017,  1,  1,  1,  1,  1,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}