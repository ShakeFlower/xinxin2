main.floors.MT18=
{
    "floorId": "MT18",
    "title": "主塔 18F",
    "name": "18",
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
    "events": {},
    "changeFloor": {
        "8,3": {
            "floorId": ":before",
            "time": 500
        },
        "1,4": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "7,8": [
            {
                "type": "addValue",
                "name": "status:atk",
                "value": "5"
            },
            {
                "type": "addValue",
                "name": "flag:atkm",
                "value": "6"
            }
        ]
    },
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  0,  0,332, 31, 31,207,  0,  0,  0,  0,  0,343],
    [343,  0,  2,  2,  2,  2,  2,  2,  2,  2, 22,  0,343],
    [343,  0,  0,  0,211,  0, 23,  2, 88,  2,  2,  0,343],
    [343, 87,  0,  0,211,  0, 21,  2,  0, 32,  2,204,343],
    [343,  0, 33, 28,  2,  2,  2,  2,  0,  0,  2,210,343],
    [343,  2,  2,  2,  2, 27, 28,  2,  2,210,  2,  0,343],
    [343,  0,  0,218, 82,  0,218, 83,  2,332,  2,  0,343],
    [343,  0,  2,  2,  2,  2,  2,319,  2,  0,  2,  0,343],
    [343,218,  2,  2,  2,  2,  2,  2,  2,207,204,207,343],
    [343,  0,  0,  0,232,  0,  0,  0,  2,  0,  2,  0,343],
    [343,  0,  0,  0,232,  0,  0,218, 81,  0,  2, 21,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}