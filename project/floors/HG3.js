main.floors.HG3=
{
    "floorId": "HG3",
    "title": "城外 #3",
    "name": "城外",
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
        "3,2": [
            {
                "type": "openShop",
                "id": "moneyShop3"
            },
            {
                "type": "insert",
                "name": "异国商人",
                "args": [
                    false
                ]
            }
        ],
        "5,2": [
            {
                "type": "openShop",
                "id": "expShop3"
            },
            {
                "type": "insert",
                "name": "退役战士",
                "args": [
                    false
                ]
            }
        ],
        "4,2": [
            {
                "type": "openShop",
                "id": "keyshop2"
            },
            {
                "type": "insert",
                "name": "奸商盗贼",
                "args": [
                    false
                ]
            }
        ]
    },
    "changeFloor": {
        "11,3": {
            "floorId": "HG2",
            "loc": [
                1,
                3
            ],
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
    [343,352,352,352,352,352,352,352,367,352,352,352,343],
    [343,352,198,122,123,121,352,352,352,352,352,352,343],
    [343,365,  0,  0,  0,  0,352,367,352,  0,  0,359,343],
    [343,352, 27,  0,  0, 28,367,352,  0,  0,352,352,343],
    [343,352,367, 33, 31,368,367,352,  0,  0,352,352,343],
    [343,352,352,368,368,367,368,368,  0,  0,352,352,343],
    [343,352,352,352,352,368,365,  0,  0,352,352,368,343],
    [343,352,365,352,352,367,368,368,352,352,367,367,343],
    [343,365,352,368,352,352,352,352,352,368,352,368,343],
    [343,352,368,352,352,352,368,352,352,352,352,352,343],
    [343,352,352,352,352,352,352,368,352,352,352,352,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "beforeBattle": {},
    "bgmap": [

],
    "fgmap": [

],
    "cannotMoveIn": {}
}