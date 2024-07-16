main.floors.MT10=
{
    "floorId": "MT10",
    "title": "主塔 10F",
    "name": "10",
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
        "4,2": [
            {
                "type": "addValue",
                "name": "item:fly",
                "value": "-1"
            },
            "系统提示：\n楼传已失效，请找5F老人重新激活"
        ]
    },
    "changeFloor": {
        "5,7": {
            "floorId": "MT9",
            "time": 500
        },
        "2,2": {
            "floorId": ":next",
            "stair": "downFloor"
        },
        "10,1": {
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
    [343,  5,  5,  5,  0,  0,  0, 21,216,  0, 88,198,343],
    [343,  5, 87, 82,  0,  0,  0,226, 32,  0,  0,  0,343],
    [343,  5,  5,  5,224,216,  1,  1,  1,  1,  1,  0,343],
    [343,  5,  5,  5, 28,  1,  1,  5,  5,  1,  0,  0,343],
    [343,  5,  5,  5,  1, 27,  1,  5,  5,  1,213,  1,343],
    [343,  5,  5,  5,  0,213,  1,  1,  1,  1,253,  1,343],
    [343, 27,  5,213,  0, 88,  0,226,  0,  1,206,  1,343],
    [343,206,213,253,  0,  0,  0,  5,  0,  1,  0,  0,343],
    [343,  0,  0,  5,  1,  1, 31,  5,  0, 81,  0,  0,343],
    [343,  0,  0,  5,  5,  5,  0,253,253,  1,  0,204,343],
    [343, 28,  0,206,253,206,  0,  1,  1,  1,204, 23,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "downFloor": [
        5,
        7
    ],
    "bgm": "bgm1.mp3",
    "upFloor": null,
    "beforeBattle": {},
    "bgmap": [

],
    "fgmap": [

]
}