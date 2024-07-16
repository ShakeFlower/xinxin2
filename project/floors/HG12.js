main.floors.HG12=
{
    "floorId": "HG12",
    "title": "皇宫 #9",
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
    "events": {
        "9,8": [
            {
                "type": "openShop",
                "id": "sellKeyShop"
            },
            {
                "type": "insert",
                "name": "回收钥匙商店",
                "args": [
                    false
                ]
            }
        ]
    },
    "changeFloor": {
        "6,1": {
            "floorId": "HG13",
            "loc": [
                6,
                11
            ],
            "time": 500
        },
        "3,10": {
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
    [343,  2,  2,  2,  2,  2,10033,  2,  2,  2,  2,  2,343],
    [343,  2,323,323,443,348,443,348, 15, 15,361,  2,343],
    [343,  2,323,443,446,  0,  0,  0, 15, 15,  0,  2,343],
    [343,  2, 15, 15, 15, 15,304,  0, 15, 15,  0,  2,343],
    [343,  2, 15, 15, 15, 15, 15,446, 15, 15, 31,  2,343],
    [343,  2, 33, 50, 27,438, 86,237, 15, 15, 31,  2,343],
    [343,  2, 15, 15, 15, 15, 15,446, 15, 15, 21,  2,343],
    [343,  2, 15, 15, 15, 15, 28,  0, 15,123,  0,  2,343],
    [343,  2, 59,  0,304,436,414,414, 15,304,  0,  2,343],
    [343,  2, 58, 87,  0,436,  0,  0, 82,  0,  0,  2,343],
    [343,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "beforeBattle": {}
}