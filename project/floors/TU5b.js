main.floors.TU5b=
{
    "floorId": "TU5b",
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
    "events": {
        "7,4": [
            {
                "type": "setValue",
                "name": "status:atk",
                "operator": "+=",
                "value": "348"
            },
            {
                "type": "setValue",
                "name": "status:def",
                "operator": "+=",
                "value": "100"
            },
            {
                "type": "setValue",
                "name": "status:hp",
                "operator": "+=",
                "value": "170"
            },
            {
                "type": "setValue",
                "name": "status:lv",
                "operator": "+=",
                "value": "12"
            },
            "为你提升能力以继续教程后面的内容",
            {
                "type": "hide",
                "remove": true
            }
        ]
    },
    "changeFloor": {
        "7,6": {
            "floorId": "TU4b",
            "stair": "upFloor"
        }
    },
    "beforeBattle": {},
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,121,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  0,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4, 88,  4,  4,  4,  4,343],
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