main.floors.B05=
{
    "floorId": "B05",
    "title": "魔塔 5F",
    "name": "B05",
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
        "1,1": [
            {
                "type": "openShop",
                "id": "coinShop"
            },
            {
                "type": "insert",
                "name": "回收钱币商店",
                "args": [
                    false
                ]
            }
        ]
    },
    "changeFloor": {
        "2,10": {
            "floorId": ":next",
            "stair": "downFloor"
        },
        "10,2": {
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
    [343,409, 55,340,343,  0, 58, 59,343,  0, 11,  0,343],
    [343, 33,  0,  0,  0,  0,  0,  0,343, 11, 88, 11,343],
    [343,  0,  0,  0,343,343,343,249,343,  0, 11,  0,343],
    [343,  0,  0,  0,343, 50,  0,  0,343,  0,  0,  0,343],
    [343,  0,  0,  0, 83,  0,  0,  0,343,  4, 11,  4,343],
    [343,  0,  0,  0,343,343, 81,343,343,  4,380,  4,343],
    [343,  0,  0,  0,343,  0, 34,  0,343,  4,  0,  4,343],
    [343,  0,  0,  0,343,  0,  0, 27, 83,  0,  0,  0,343],
    [343,  0,  0,  0,343,244,343,343,343,324, 33,324,343],
    [343,  0, 87,  0,343,  0,  0,  0,  0,  0,  0,  0,343],
    [343, 32,  0, 32,343, 27,  0,  0,343,  0,  0,  0,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "underGround": true,
    "beforeBattle": {},
    "cannotMoveIn": {}
}