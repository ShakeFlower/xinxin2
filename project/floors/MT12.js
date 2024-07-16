main.floors.MT12=
{
    "floorId": "MT12",
    "title": "主塔 12F",
    "name": "12",
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
        "3,8": {
            "floorId": ":before",
            "time": 500
        },
        "5,5": {
            "floorId": ":next",
            "time": 500
        },
        "7,5": {
            "floorId": ":next",
            "time": 500
        },
        "8,1": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "7,1": [
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
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  1,  1,  1,  1,  1,  1,339, 87,  1,  1,  1,343],
    [343,  0,  0,215,  0,  0,  1,  1,  1,  1,  1,  1,343],
    [343,  0,226,  1,253,253,  1,  0,204,  0,  0,  1,343],
    [343,224,216,  1,  0,  0,  1,  0,  1,  0,  0,  1,343],
    [343,  0,  0,  1,  0, 87,  1, 87,  1,  0,  0,  1,343],
    [343,  0, 31,  1, 31,  0,  1,  1,  1, 33,  0,  1,343],
    [343,226,  1,  1,  1,216,  1, 21, 21,  1,  0,  1,343],
    [343,215,  1, 88,  0,  0,  1, 28, 27,  1,204,  1,343],
    [343,226,  1,  1,  1,  1,  1,224,  0,  1,222,  1,343],
    [343,  0,  0,  0,216,253,  1,224,329,  1,204,  1,343],
    [343,  0,  0,  0,329, 32,224,  0,  0, 82,  0,  1,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": [
        5,
        5
    ],
    "bgm": "bgm1.mp3",
    "beforeBattle": {}
}