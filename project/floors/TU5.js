main.floors.TU5=
{
    "floorId": "TU5",
    "title": "教程 5F",
    "name": "5",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "defaultGround": "ground",
    "bgm": "bgm3.mp3",
    "firstArrive": [],
    "eachArrive": [],
    "parallelDo": "",
    "events": {},
    "changeFloor": {
        "5,5": {
            "floorId": "TU4",
            "stair": "upFloor"
        }
    },
    "beforeBattle": {},
    "afterBattle": {
        "6,1": [
            {
                "type": "setValue",
                "name": "status:hp",
                "value": "(3-flag:skipTutorial)"
            },
            {
                "type": "win",
                "reason": "教程通关",
                "norank": 1
            }
        ]
    },
    "afterGetItem": {
        "6,5": [
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
    [343,  4,  4,  4,  4,  4,256,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,304,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,304,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,304,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4, 88,319,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "cannotMoveIn": {}
}