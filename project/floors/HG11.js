main.floors.HG11=
{
    "floorId": "HG11",
    "title": "皇宫 #8",
    "name": "皇宫",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "cannotViewMap": false,
    "images": [],
    "item_ratio": 1,
    "defaultGround": "ground",
    "bgm": "bgm4.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {
        "10,2": {
            "floorId": ":next",
            "time": 500
        },
        "3,10": {
            "floorId": ":next",
            "time": 500
        },
        "3,1": {
            "floorId": "HG8",
            "loc": [
                3,
                11
            ],
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {
        "5,9": {
            "1": null
        }
    },
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,347,347,10033,347,347,347,347,347,347,349,349,343],
    [343,347,351,  0,351, 59, 58,347, 31,347,362,349,343],
    [343,347, 27,373,436,304,304,347, 31,347, 86,349,343],
    [343,347,351,443,348,  0,  0,347,324,347,  0,349,343],
    [343,347,  0,  0,  0,446,  0,446,  0,347,  0,349,343],
    [343,347,437,  0,373,  0,351,347,347,347,  0,349,343],
    [343,347, 28,439,304,436,414,436,  0,  0,  0,349,343],
    [343,347,347,347,347,347,347,347,  0,351,304,349,343],
    [343,350, 27,  0,  0, 85,304,  0,  0,446,348,349,343],
    [343,349, 28, 88,443,348,443,  0,  0,446,323,350,343],
    [343,349,349,350,349,349,349,349,349,349,349,349,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "cannotMoveIn": {}
}