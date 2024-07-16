main.floors.MT8=
{
    "floorId": "MT8",
    "title": "主塔 8F",
    "name": "8",
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
        "4,6": [
            {
                "type": "openShop",
                "id": "expShop1"
            },
            {
                "type": "insert",
                "name": "主塔经验商店",
                "args": [
                    false
                ]
            }
        ]
    },
    "changeFloor": {
        "2,4": {
            "floorId": "MT7",
            "time": 500
        },
        "9,11": {
            "floorId": "MT9",
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
    [343,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1, 88,  1,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1,209, 32,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1,203,  9,130, 10,  1,  1,  1,  1,  1,  1,343],
    [343,  1,209,  0,206, 22,  1,  1,  1,  1,  1,  1,343],
    [343,  1,  1, 81,  1,  1,  1,  1,  1,  1,  1,  1,343],
    [343,  1, 50,213,  1,206,221,206,  1,  1,  1,  1,343],
    [343,  1,  1,  0,  0,  0,  1,  0, 28,  1,  1,  1,343],
    [343, 27,253,  0,  1,226, 32,  1,213, 87,  1,  1,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": null,
    "downFloor": null,
    "bgm": "bgm1.mp3",
    "beforeBattle": {},
    "cannotMoveIn": {}
}