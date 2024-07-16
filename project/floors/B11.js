main.floors.B11=
{
    "floorId": "B11",
    "title": "魔塔 11F",
    "name": "B11",
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
        "2,6": [
            {
                "type": "changeFloor",
                "floorId": "FT13",
                "loc": [
                    5,
                    4
                ],
                "time": 500
            }
        ],
        "4,1": [
            {
                "type": "openShop",
                "id": "expShop2"
            },
            {
                "type": "insert",
                "name": "魔塔经验商店",
                "args": [
                    false
                ]
            }
        ],
        "11,8": [
            "\t[小妖精,fairy]我看你好像很久没使用过随意门了~",
            "\t[勇者,hero]的确是没什么机会用得上...",
            "\t[小妖精,fairy]呵呵呵...不过提一提你啊~以后需要用到很多随意门的呀！",
            "\t[小妖精,fairy]记得随时准备一定数量的呢~回头路可不好走啊！哈哈"
        ],
        "1,10": [
            "\t[盗贼,thief]这只大八爪鱼似乎是在守护什么的...是经验之神吗? "
        ]
    },
    "changeFloor": {
        "7,1": {
            "floorId": "B10",
            "stair": "upFloor"
        },
        "2,8": {
            "floorId": ":next",
            "time": 500
        }
    },
    "afterBattle": {
        "5,9": [
            {
                "type": "function",
                "function": "function(){\nvar x=core.status.event.data.x,y=core.status.event.data.y;if(core.isset(x)&&core.isset(y)){core.insertAction([{type:'hide',loc:[[x-1,y-2],[x,y-2],[x+1,y-2],[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y]]}]);}\n}"
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {},
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  3,  3,  9,130, 10,  3, 88,236, 32,  0,  0,343],
    [343,  3, 55, 31,  0,255,  3,  3,  3,  3,  3,  0,343],
    [343,  3, 31,  5,  5,  0, 83,378,  0,  0, 27,236,343],
    [343,  3,  0,  5,  5, 32,  3,396,  5,  5,  0,  3,343],
    [343,  3,255,  0,  0, 82,  3,223,  5,  5,227,  3,343],
    [343,  3,450,  3,  3, 28,  3,  0,  0,  0,378,  3,343],
    [343,  3,  3,  3,181,182,183,  5,255,  3,  3,  3,343],
    [343,  3, 87,  5,184,185,186,  5,324, 58,  3,124,343],
    [343,  3,  0,  5,187,258,188,  5, 28,  0, 81,227,343],
    [343,123,255,  5,  5, 34,  5,  5,223,  5,  5, 59,343],
    [343,  3,  0,  0,323,324, 31, 82,  0,  5,  5, 50,343],
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