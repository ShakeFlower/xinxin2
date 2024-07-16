main.floors.B06=
{
    "floorId": "B06",
    "title": "魔塔 6F",
    "name": "B06",
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
        "7,1": [
            {
                "type": "changeFloor",
                "floorId": "FT5",
                "loc": [
                    6,
                    6
                ],
                "time": 500
            }
        ]
    },
    "changeFloor": {
        "11,1": {
            "floorId": ":next",
            "stair": "downFloor"
        },
        "2,10": {
            "floorId": ":before",
            "stair": "upFloor"
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,323,245, 50,343,  0,  0,450,343, 21, 21, 87,343],
    [343,245, 33,245,  0,254,343,343,343, 21,324,  0,343],
    [343, 27,245, 23,343,343,  0,  0,230,  0,  0,  0,343],
    [343,343, 86,343,343,343, 81,343,343,343,343,  0,343],
    [343,254,245,254,343,  0,382, 53,343,  0,  0,  0,343],
    [343, 27,  0,  0,343,  0,  0,382, 81,381,  0,  0,343],
    [343, 33,  0,381, 81,382,  0,382,343, 53,220,  0,343],
    [343,343,343, 81,343,343,343, 81,343,343, 81,343,343],
    [343,  0,  0,382,343,  0,  0,220, 81,382,  0,  0,343],
    [343,220, 88,  0,343,254,  0,  0,343,254,  0,254,343],
    [343, 28,220,198,343, 27,254,  0,343, 55,220, 31,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {},
    "underGround": true,
    "cannotMoveIn": {}
}