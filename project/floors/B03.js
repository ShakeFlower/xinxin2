main.floors.B03=
{
    "floorId": "B03",
    "title": "魔塔 3F",
    "name": "B03",
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
        "5,3": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [],
                "false": [
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "true"
                    },
                    {
                        "type": "function",
                        "function": "function(){\ncore.addFlag('talkedCount', 1);\nif (core.getFlag('talkedCount', 0) >= 17) core.plugin.getAchievement(17);\n}"
                    }
                ]
            },
            "\t[妖精,fairy]啊！是你们！你们怎么会在这里！？",
            "\t[勇者,hero]是上次帮助过我们的妖精！",
            "\t[妖精,fairy]想不到还有机会见面呢。可是你们知道这里是哪里吗？踏入了这座魔塔啊，那证明了你们已闯入魔界了！",
            "\t[勇者,hero]这里是魔界！？其实我们是在找出口才会进来这里的！",
            "\t[妖精,fairy]那就奇怪了...这里只有走往魔界的出口。难道你们被施了幻术吗？",
            "\t[妖精,fairy]你们还是继续走吧...说不定会找到解决办法的！",
            "\t[勇者,hero]好的！我们快将找到真相了！",
            "\t[妖精,fairy]往后说不定还会有更凶恶的魔物，你们要小心点啊！",
            "\t[勇者,hero]这个当然！我们要活着离开魔塔呢！",
            "\t[公主,princess]谢谢你。"
        ]
    },
    "changeFloor": {
        "5,6": {
            "floorId": ":before",
            "stair": "upFloor"
        },
        "5,4": {
            "floorId": ":next",
            "time": 500
        },
        "7,4": {
            "floorId": ":next",
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
    [343,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,343],
    [343,  5, 27,  0,  0,198,  5,323,323, 82,  0,  5,343],
    [343,  5,249, 55, 22,124,  5,  4,  4,  4,249,  5,343],
    [343,  5, 28,  0,  0, 87,  5, 87,  0,  0,  0,  5,343],
    [343,  5,  5,  5,  5,  5,  5,  4,  4,  4,  0,  5,343],
    [343,  5, 58, 32, 32, 88,  4, 27, 31,  4,  0,  5,343],
    [343,  5,  0, 32, 32,  0,  4, 33,  0,  4,  0,  5,343],
    [343,  5,  0,  4,  4,  4,  4, 83,244,  4,  0,  5,343],
    [343,  5, 86,233,  0,  0,  0,  0,  0,  0, 28,  5,343],
    [343,  5, 59,  4,  4,  4,  4,  4,  4,  4,  4,  5,343],
    [343,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "underGround": true,
    "upFloor": [
        7,
        4
    ],
    "beforeBattle": {},
    "cannotMoveIn": {}
}