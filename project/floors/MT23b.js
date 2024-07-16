main.floors.MT23b=
{
    "floorId": "MT23b",
    "title": "主塔 23F",
    "name": "23",
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
        "8,8": {
            "floorId": "MT22b",
            "time": 500
        }
    },
    "afterBattle": {},
    "afterGetItem": {
        "8,4": [
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
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,321,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,214,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,334,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  0,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2, 88,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "upFloor": null,
    "downFloor": null,
    "bgm": "bgm1.mp3",
    "beforeBattle": {}
}