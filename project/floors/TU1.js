main.floors.TU1=
{
    "floorId": "TU1",
    "title": "教程 1F",
    "name": "1",
    "width": 13,
    "height": 13,
    "canFlyTo": false,
    "canFlyFrom": false,
    "canUseQuickShop": false,
    "cannotViewMap": false,
    "images": [],
    "defaultGround": "ground",
    "bgm": "bgm3.mp3",
    "firstArrive": [
        {
            "type": "setValue",
            "name": "status:hp",
            "value": "251"
        },
        {
            "type": "setValue",
            "name": "status:atk",
            "value": "12"
        },
        {
            "type": "setValue",
            "name": "status:def",
            "value": "10"
        },
        {
            "type": "setValue",
            "name": "status:mana",
            "value": "7"
        },
        {
            "type": "setValue",
            "name": "status:money",
            "value": "18"
        },
        {
            "type": "setEnemy",
            "id": "bluePriest",
            "name": "hp",
            "value": "45"
        },
        {
            "type": "setEnemy",
            "id": "bluePriest",
            "name": "value",
            "value": "30"
        },
        "欢迎来到教程！\n第一节：气息与技能\n与仙子对话以启用提示",
        {
            "type": "setValue",
            "name": "item:greenKey",
            "value": "3"
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "5,10": [
            {
                "type": "choices",
                "choices": [
                    {
                        "text": "${flags.tutorialHint?'关闭':'开启'}提示",
                        "action": [
                            {
                                "type": "setValue",
                                "name": "flag:tutorialHint",
                                "value": "(!flag:tutorialHint)"
                            }
                        ]
                    },
                    {
                        "text": "演示通关路线",
                        "action": [
                            {
                                "type": "moveHero",
                                "time": 200,
                                "steps": [
                                    "up:2",
                                    "right:1",
                                    "left:1",
                                    "up:2",
                                    "left:1",
                                    "right:1",
                                    "down:2",
                                    "left:1",
                                    "right:1",
                                    "up:4",
                                    "right:1",
                                    "up:1",
                                    "left:2"
                                ]
                            },
                            {
                                "type": "jumpHero",
                                "dxy": [
                                    1,
                                    7
                                ],
                                "time": 500
                            }
                        ]
                    },
                    {
                        "text": "跳过本章节",
                        "action": [
                            {
                                "type": "setValue",
                                "name": "flag:skipTutorial",
                                "operator": "+=",
                                "value": "1"
                            },
                            {
                                "type": "changeFloor",
                                "floorId": ":next",
                                "loc": [
                                    6,
                                    11
                                ]
                            }
                        ]
                    },
                    {
                        "text": "关闭",
                        "action": []
                    }
                ]
            }
        ],
        "7,10": [
            {
                "type": "insert",
                "name": "随意门商店",
                "args": [
                    false
                ]
            }
        ]
    },
    "changeFloor": {},
    "beforeBattle": {},
    "afterBattle": {
        "6,8": [
            {
                "type": "if",
                "condition": "flag:tutorialHint",
                "true": [
                    " · 与怪物不同，勇者在战斗中获取的气息可以储存下来，留到后面的战斗中使用。发动会心一击需要消耗一整格气息。\n · 勇者目前的气息为0+27/40（在状态栏显示），表示目前气息格数为0（无法发动会心一击），气息条中储存了27点气息，气息条上限为40。\n · 若勇者再获取13点气息，气息会变为0+40/40（而不是1+0/40，必须超过气息条上限才能储存1整格气息）。",
                    " · 勇者（或怪物）普通攻击对方时增长的气息称为攻增气，计算公式为：10×防守方防御力/进攻方攻击力，四舍五入。\n · 勇者只有在完全破防（攻击大于怪物防御）时才能获得攻增气，怪物则不然。",
                    " · 此处不拿红宝石（只拿蓝宝石）打小蝙蝠，否则会损失攻增气（而伤害不变，你可以自行验算）导致无法过关。"
                ]
            }
        ],
        "6,6": [
            {
                "type": "if",
                "condition": "flag:tutorialHint",
                "true": [
                    " · 此处不拿蓝宝石（只拿红宝石）打红色史莱姆，伤害为3×9=27。\n · 拿蓝宝石会增加红色史莱姆的攻增气，导致其最后一回合正好储满气息发动会心一击，伤害为4×7=28。"
                ]
            }
        ],
        "6,4": [
            {
                "type": "if",
                "condition": "flag:tutorialHint",
                "true": [
                    " · 新新魔塔2中，所有机关门的开启条件均为：门的左下以及右下必须为空地。先打魔术师获得更多气息以对付骷髅。",
                    " · 怪物防守时增长的气息称为防增气，计算公式为：受到的伤害/3，四舍五入。\n · 此处不拿任何宝石打魔术师，否则会吃到魔术师的会心一击。\n（此时拿红宝石不能减少回合数，反而会使魔术师的防增气从4增加到5；魔术师的魔法攻击无视勇者防御，拿蓝宝石不能减少任何伤害，反而会使魔术师的攻增气从8增加到9）"
                ]
            }
        ],
        "7,3": [
            {
                "type": "if",
                "condition": "flag:tutorialHint",
                "true": [
                    " · 现在使用两个会心一击（CC）打骷髅。\n · 勇者防守时也有防增气，但计算公式为：受到的伤害/10，四舍五入。\n · 不拿蓝宝石（只拿红宝石）来多获得1点防增气，在第二回合才有足够的气息（1+1/40）能施放出C。",
                    "使用技能「CC」的方法（任选其一）：\n1.快捷键3（快捷键3绑定的技能为「CXC」，此时未装备盾技，自动替换为「CC」），通过技能选择（快捷键8）查看快捷键1-5所绑定的技能；\n2.呼出技能面板（快捷键6）后，点击C、C、退出（或键盘C+C+6/回车），此方法建议大量使用；\n3.系统会为你推荐对骷髅使用「CC」（在怪物图标的第一行），走到其面前使用快捷键7；\n4.技能选择（快捷键8）->自定义输入->键盘输入CC，此方法支持高级输入，但较繁琐；\n5.在道具栏（左下角布袋按钮，快捷键T）打开帮助->高级设置->自动使用推荐技能进行战斗。"
                ]
            }
        ]
    },
    "afterGetItem": {},
    "afterOpenDoor": {
        "6,9": [
            {
                "type": "if",
                "condition": "switch:A",
                "true": [
                    {
                        "type": "if",
                        "condition": "flag:tutorialHint",
                        "true": [
                            " · 气息系统是新新魔塔2中非常重要的一个系统，战斗中双方的气息都将得到增长。\n · 当怪物的气息储满时（即气息达到气息容量时，怪物的气息容量通过怪物手册查看），下一次攻击将释放所有气息进行会心一击（伤害翻倍）。\n · 勇者此时会被红色史莱姆攻击4次，第4回合时怪物气息储满进行会心一击，因此总伤害为5×11=55。",
                            {
                                "type": "hide",
                                "remove": true
                            }
                        ]
                    }
                ],
                "false": [
                    {
                        "type": "setValue",
                        "name": "switch:A",
                        "value": "1"
                    }
                ]
            }
        ],
        "6,1": [
            {
                "type": "function",
                "function": "function(){\ncore.setBlock(376,6,1);core.getBlock(6,1).event.trigger='changeFloor';core.getBlock(6,1).event.data={\"floorId\": \":next\", \"stair\": \":symmetry\" }\n}"
            }
        ]
    },
    "autoEvent": {},
    "cannotMove": {},
    "map": [
    [343,343,343,343,343,343,343,343,343,343,343,343,343],
    [343,  4,  4,  4,  4,  4,452,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4, 85,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,209, 27,217,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  0,202,  0,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4, 84,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4, 27,205, 28,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4, 84,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4, 27,202, 28,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4, 84,  4,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,124, 28,121,  4,  4,  4,  4,343],
    [343,  4,  4,  4,  4,  4,340,  4,  4,  4,  4,  4,343],
    [343,343,343,343,343,343,343,343,343,343,343,343,343]
],
    "bgmap": [

],
    "fgmap": [

],
    "cannotMoveIn": {}
}