main.floors.B09=
{
    "floorId": "B09",
    "title": "魔塔 9F",
    "name": "B09",
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
        "8,10": [
            "\t[小妖精,fairy]不要在这儿迷路啊~"
        ]
    },
    "changeFloor": {
        "1,1": {
            "floorId": ":before",
            "time": 500
        },
        "5,1": {
            "floorId": ":before",
            "time": 500
        },
        "3,1": {
            "floorId": ":before",
            "time": 500
        },
        "7,1": {
            "floorId": ":before",
            "time": 500
        },
        "11,1": {
            "floorId": ":before",
            "time": 500
        },
        "11,5": {
            "floorId": ":before",
            "time": 500
        },
        "7,7": {
            "floorId": ":before",
            "time": 500
        },
        "11,7": {
            "floorId": ":before",
            "time": 500
        },
        "4,11": {
            "floorId": ":before",
            "time": 500
        },
        "6,11": {
            "floorId": ":before",
            "time": 500
        },
        "1,11": {
            "floorId": ":next",
            "stair": "downFloor"
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "4,9": {
            "1": null
        },
        "2,8": {
            "1": null
        },
        "3,7": {
            "1": null
        },
        "4,6": {
            "1": null
        },
        "5,5": {
            "1": null
        },
        "6,4": {
            "1": null
        },
        "7,3": {
            "1": null
        },
        "8,2": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343, 88,343, 88,343, 88,343, 88, 27,343,343, 88,343],
    [343,  0,343,  0,343,  0,343,343, 85,245,343,  0,343],
    [343, 31,343,  0,343,381, 84, 85,343,  0,  0,  0,343],
    [343,227,343,378,343,  31, 85,343, 32,343,343,343,343],
    [343,396,343,396,343, 85,343, 55,220,382,  0, 88,343],
    [343,227,343, 27, 85,343,324,343,343,343,343,343,343],
    [343, 28,198, 85,343,381,  0, 88,343,  0,  0, 88,343],
    [343, 21, 85,343,381,343,343,343,343,396,343,343,343],
    [343,378,343,382, 85,227,  0,  0,323, 28, 27,  0,343],
    [343,  0,343,  0,343, 32,343,343,124,343,343,381,343],
    [343, 87,343,  0, 88,343, 88,  0,  0,  0,227,  0,343],
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
    "downFloor": [
        1,
        1
    ],
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}
