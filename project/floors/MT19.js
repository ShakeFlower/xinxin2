main.floors.MT19=
{
    "floorId": "MT19",
    "title": "主塔 19F",
    "name": "19",
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
        "11,3": [
            "\t[商人,N410]来这里的人全部都只关心宝物，想找\n一个会关心公主安危的人都没有。",
            "\t[商人,N410]大概他们认为公主这次凶多吉少吧。\n哈哈哈"
        ]
    },
    "changeFloor": {
        "1,11": {
            "floorId": ":next",
            "time": 500
        },
        "1,4": {
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
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343, 27,  0,  0,  0,232,  0,  2,  2,  2,  2,  2,343],
    [343,  2,  2, 81,  2,  2,  0, 81,332,  0,  0,410,343],
    [343, 88,207,232,207,  2,  0,  2,  2,  2,  2,  2,343],
    [343,  0,  0,  0,  0,  2,  0,  2, 28,  0,211,  0,343],
    [343,  0,  0, 33, 31,  2,  0,  2,  2,  2,  2,  0,343],
    [343,  2,  2,  2,  2,  2,207,232,218,  0,  0,  0,343],
    [343,  0,  0, 11, 22,  2,  0,  2,  2,  2,  2,  2,343],
    [343,232,  2,  0,211,  2,  0,  0,  2, 28,  2, 32,343],
    [343,  0,  2,  0,  0,  2,  0,  0, 81,  0,  2,  0,343],
    [343, 87,  2,  0,332,207,332,  0,  2,  0,211,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "bgm": "bgm1.mp3",
    "beforeBattle": {}
}