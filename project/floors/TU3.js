main.floors.TU3=
{
    "floorId": "TU3",
    "title": "教程 3F",
    "name": "3",
    "width": 13,
    "height": 13,
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "defaultGround": "ground",
    "bgm": "bgm3.mp3",
    "firstArrive": [
        {
            "type": "setValue",
            "name": "flag:swordUsed",
            "value": "false"
        },
        {
            "type": "unloadEquip",
            "pos": 0
        },
        {
            "type": "unloadEquip",
            "pos": 1
        },
        {
            "type": "unfollow"
        },
        {
            "type": "setValue",
            "name": "item:I315",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "item:I319",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "item:I321",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "item:I339",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "item:I327",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "status:hp",
            "value": "163"
        },
        {
            "type": "setValue",
            "name": "status:lv",
            "value": "8"
        },
        {
            "type": "setValue",
            "name": "status:mdef",
            "value": "0"
        },
        {
            "type": "setValue",
            "name": "status:atk",
            "value": "249"
        },
        {
            "type": "setValue",
            "name": "status:def",
            "value": "97"
        },
        {
            "type": "setValue",
            "name": "status:mana",
            "value": "36"
        },
        {
            "type": "function",
            "function": "function(){\ncore.drawFg(core.status.floorId);\n}"
        },
        "第三节：原作的特性与Bug的利用\n1. 楼传特性；\n2. XC透支气息法；\n3. 流石特性。"
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "6,10": [
            {
                "type": "while",
                "condition": "1",
                "data": [
                    {
                        "type": "choices",
                        "choices": [
                            {
                                "text": "楼传特性",
                                "action": [
                                    "下面的4F-b指4F的异层，在本教程中为通过本层右侧楼梯口上楼的楼层：\n4F-b传3F：出现在3F的主上楼梯口（通往4F）；\n5F-b传4F：出现在4F的上楼梯口；\n5F传4F-b：出现在4F-b的下楼梯口。\n（注意：异层与主层名字相同，你可以通过浏览地图功能进行区分，排在后面的为异层）"
                                ]
                            },
                            {
                                "text": "XC透支气息法",
                                "action": [
                                    "这是原作的Bug，复刻版保留了此Bug。\n当你仅有一格气进入怪物的回合时，用这一格气成功激活会心一击（C）和镜膜盾（X），成功使出X后进入勇者的回合，即使此时气息不够一格，系统也不做二次检查，直接视为气息足够，成功发动C，气息则会变为负值（注意不会清零）。\n\n此Bug在装备过剑技后失效。"
                                ]
                            },
                            {
                                "text": "流石特性",
                                "action": [
                                    "装备流石时使用C不会给怪物带来防增气。\n利用此Bug可以有效避免气息容量小的怪物的暴击。\n\n注：\n1. 装备流石后，系统会自动将快捷键1绑定的-C替换为C，快捷键2绑定的XC替换为CX，以便利用此Bug，卸下流石后则作反向替换；\n2. 使用流石也不会给怪物带来防增气，修复版对此Bug的处理为：使用流石会给怪物带来防增气，且在流石吸气后结算防增气。"
                                ]
                            },
                            {
                                "text": "关闭",
                                "action": [
                                    {
                                        "type": "break",
                                        "n": 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "changeFloor": {
        "5,8": {
            "floorId": ":next",
            "stair": "downFloor"
        },
        "7,8": {
            "floorId": "TU4b",
            "stair": "downFloor"
        }
    },
    "beforeBattle": {},
    "afterBattle": {},
    "afterGetItem": {
        "5,9": [
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
        ],
        "7,9": [
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
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4, 87,  4, 87,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,315,  4,339,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4, 83,124, 82,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  0,  0,  0,  4,  4,  4,  4,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "cannotMoveIn": {},
    "upFloor": [
        5,
        8
    ],
    "downFloor": [
        6,
        11
    ]
}