var maps_90f36752_8815_4be8_b32b_d7fad1d0542e = 
{
	"1": {"cls":"terrains","id":"yellowWall","canBreak":true,"animate":1},
	"2": {"cls":"terrains","id":"whiteWall","canBreak":true,"animate":1},
	"3": {"cls":"terrains","id":"blueWall","canBreak":true,"animate":1},
	"4": {"cls":"animates","id":"star"},
	"5": {"cls":"animates","id":"lava"},
	"6": {"cls":"terrains","id":"ice"},
	"7": {"cls":"terrains","id":"blueShop-left"},
	"8": {"cls":"terrains","id":"blueShop-right"},
	"9": {"cls":"terrains","id":"pinkShop-left"},
	"10": {"cls":"terrains","id":"pinkShop-right"},
	"11": {"cls":"animates","id":"lavaNet","trigger":null,"canPass":true,"script":"(function () {\n\t// 血网的伤害效果移动到 checkBlock 中处理\n\n\t// 如果要做一次性血网，可直接注释掉下面这句话：\n\tif (core.hasItem('snow')) {\n\t\tcore.removeBlock(core.getHeroLoc('x'), core.getHeroLoc('y'));\n\t\tcore.autoGetItem();\n\t}\n})();"},
	"12": {"cls":"animates","id":"poisonNet","trigger":"passNet"},
	"13": {"cls":"animates","id":"weakNet","trigger":"passNet"},
	"14": {"cls":"animates","id":"curseNet","trigger":"passNet"},
	"15": {"cls":"animates","id":"blueWater"},
	"16": {"cls":"animates","id":"water"},
	"20": {"cls":"autotile","id":"autotile"},
	"21": {"cls":"items","id":"yellowKey"},
	"22": {"cls":"items","id":"blueKey"},
	"23": {"cls":"items","id":"redKey"},
	"24": {"cls":"items","id":"greenKey"},
	"25": {"cls":"items","id":"iceCube"},
	"26": {"cls":"items","id":"bigKey"},
	"27": {"cls":"items","id":"redGem"},
	"28": {"cls":"items","id":"blueGem"},
	"29": {"cls":"items","id":"greenGem"},
	"30": {"cls":"items","id":"yellowGem"},
	"31": {"cls":"items","id":"redPotion"},
	"32": {"cls":"items","id":"bluePotion"},
	"33": {"cls":"items","id":"greenPotion"},
	"34": {"cls":"items","id":"yellowPotion"},
	"35": {"cls":"items","id":"sword1"},
	"36": {"cls":"items","id":"shield1"},
	"37": {"cls":"items","id":"sword2"},
	"38": {"cls":"items","id":"shield2"},
	"39": {"cls":"items","id":"sword3"},
	"40": {"cls":"items","id":"shield3"},
	"41": {"cls":"items","id":"sword4"},
	"42": {"cls":"items","id":"shield4"},
	"43": {"cls":"items","id":"sword5"},
	"44": {"cls":"items","id":"shield5"},
	"45": {"cls":"items","id":"book"},
	"46": {"cls":"items","id":"fly"},
	"47": {"cls":"items","id":"pickaxe"},
	"48": {"cls":"items","id":"icePickaxe"},
	"49": {"cls":"items","id":"bomb"},
	"50": {"cls":"items","id":"centerFly"},
	"51": {"cls":"items","id":"upFly"},
	"52": {"cls":"items","id":"downFly"},
	"53": {"cls":"items","id":"coin"},
	"54": {"cls":"items","id":"snow"},
	"55": {"cls":"items","id":"cross"},
	"56": {"cls":"items","id":"superPotion"},
	"57": {"cls":"items","id":"earthquake"},
	"58": {"cls":"items","id":"poisonWine"},
	"59": {"cls":"items","id":"weakWine"},
	"60": {"cls":"items","id":"curseWine"},
	"61": {"cls":"items","id":"superWine"},
	"62": {"cls":"items","id":"knife"},
	"63": {"cls":"items","id":"moneyPocket"},
	"64": {"cls":"items","id":"shoes"},
	"65": {"cls":"items","id":"hammer"},
	"68": {"cls":"items","id":"lifeWand"},
	"69": {"cls":"items","id":"jumpShoes"},
	"70": {"cls":"items","id":"sword0"},
	"71": {"cls":"items","id":"shield0"},
	"72": {"cls":"items","id":"skill1"},
	"73": {"cls":"items","id":"wand"},
	"81": {"cls":"animates","id":"yellowDoor","trigger":"openDoor","doorInfo":{"time":160,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"yellowKey":1}},"animate":1,"name":"黄门"},
	"82": {"cls":"animates","id":"blueDoor","trigger":"openDoor","doorInfo":{"time":160,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"blueKey":1}},"animate":1,"name":"蓝门"},
	"83": {"cls":"animates","id":"redDoor","trigger":"openDoor","doorInfo":{"time":160,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"redKey":1}},"animate":1,"name":"红门"},
	"84": {"cls":"animates","id":"greenDoor","trigger":"openDoor","doorInfo":{"time":1,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"greenKey":1},"afterOpenDoor":[{"type":"setBlock","number":"yellowDoor"},{"type":"function","function":"function(){\ncore.drawTip('随意门使用成功');\n}"}]},"animate":1,"name":"可被使用随意门的墙"},
	"85": {"cls":"animates","id":"specialDoor","trigger":"openDoor","animate":1,"doorInfo":{"time":160,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"specialKey":1}},"name":"机关门"},
	"86": {"cls":"animates","id":"steelDoor","trigger":"openDoor","doorInfo":{"time":160,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"yellowKey":1}},"animate":1,"name":"铁门"},
	"87": {"cls":"terrains","id":"upFloor","canPass":true},
	"88": {"cls":"terrains","id":"downFloor","script":null,"canPass":true},
	"89": {"cls":"animates","id":"portal"},
	"90": {"cls":"animates","id":"starPortal"},
	"91": {"cls":"animates","id":"upPortal"},
	"92": {"cls":"animates","id":"leftPortal"},
	"93": {"cls":"animates","id":"downPortal"},
	"94": {"cls":"animates","id":"rightPortal"},
	"101": {"cls":"animates","id":"crystalUp"},
	"102": {"cls":"animates","id":"crystalBottom"},
	"103": {"cls":"animates","id":"fire"},
	"104": {"cls":"animates","id":"switch"},
	"121": {"cls":"npcs","id":"man"},
	"122": {"cls":"npcs","id":"woman"},
	"123": {"cls":"npcs","id":"thief"},
	"124": {"cls":"npcs","id":"fairy"},
	"125": {"cls":"npcs","id":"magician"},
	"126": {"cls":"npcs","id":"womanMagician"},
	"127": {"cls":"npcs","id":"oldMan"},
	"128": {"cls":"npcs","id":"child"},
	"129": {"cls":"npcs","id":"wood"},
	"130": {"cls":"npcs","id":"pinkShop"},
	"131": {"cls":"npcs","id":"blueShop"},
	"132": {"cls":"npcs","id":"princess"},
	"133": {"cls":"npc48","id":"npc0"},
	"134": {"cls":"npc48","id":"npc1"},
	"135": {"cls":"npc48","id":"npc2"},
	"136": {"cls":"npc48","id":"npc3"},
	"137": {"cls":"npc48","id":"npc4"},
	"151": {"cls":"autotile","id":"autotile1"},
	"152": {"cls":"autotile","id":"autotile2"},
	"153": {"cls":"autotile","id":"autotile3"},
	"161": {"cls":"terrains","id":"arrowUp","cannotOut":["left","right","down"],"cannotIn":["down"]},
	"162": {"cls":"terrains","id":"arrowDown","cannotOut":["left","right","up"],"cannotIn":["up"]},
	"163": {"cls":"terrains","id":"arrowLeft","cannotOut":["up","down","right"],"cannotIn":["right"]},
	"164": {"cls":"terrains","id":"arrowRight","cannotOut":["up","down","left"],"cannotIn":["left"]},
	"165": {"cls":"terrains","id":"light","trigger":"changeLight","canPass":true},
	"166": {"cls":"terrains","id":"darkLight"},
	"167": {"cls":"terrains","id":"ski","trigger":"ski","canPass":true},
	"168": {"cls":"terrains","id":"flower","canPass":true},
	"169": {"cls":"terrains","id":"box","trigger":null,"canPass":true},
	"170": {"cls":"terrains","id":"boxed","trigger":null,"canPass":true},
	"181": {"cls":"npcs","id":"wlt"},
	"182": {"cls":"npcs","id":"wt"},
	"183": {"cls":"npcs","id":"wrt"},
	"184": {"cls":"npcs","id":"wl"},
	"185": {"cls":"npcs","id":"wc"},
	"186": {"cls":"npcs","id":"wr"},
	"187": {"cls":"npcs","id":"wlb"},
	"188": {"cls":"npcs","id":"wrb"},
	"189": {"cls":"npcs","id":"dlt"},
	"190": {"cls":"npcs","id":"dt"},
	"191": {"cls":"npcs","id":"drt"},
	"192": {"cls":"npcs","id":"dl"},
	"193": {"cls":"npcs","id":"dc"},
	"194": {"cls":"npcs","id":"dr"},
	"195": {"cls":"npcs","id":"dlb"},
	"196": {"cls":"npcs","id":"drb"},
	"198": {"cls":"npcs","id":"ook","event":[{"type":"if","condition":"(!item:A9)","true":["\t[勇者,hero]哇！怎么会有本奇怪的书本在这儿…","\t[脸书,ook]奇什么怪啊！你这个人真没礼貌！","\t[勇者,hero]怎么…！还会说话的！真够奇怪！","\t[脸书,ook]什么第一次见面就奇怪来奇怪去的！首先，我是有名字的，不是什么奇怪的书！","\t[脸书,ook]只要看到我一张帅脸在书上，就知道我叫“脸书”了吧！哈哈","\t[勇者,hero]哈哈…（真的超奇怪啊…）","\t[脸书,ook]不说这么多开场话了…我本来能够将你目前游戏状况分享至Facebook，但你正在玩h5复刻版。\n你可以在地图上发送在线留言，或者求援来给你回血（结算分数会变成1分）","\t[脸书,ook]很厉害吧！往后冒险中还有很多我的同伴，我们每一个分享的讯息都不一样啊！\n要积极找我们对话！明白没？","\t[勇者,hero]明白了…","\t[脸书,ook]你可以对外求援然后恢复1000体力，但是结算分数会变成1分",{"type":"setValue","name":"item:A9","value":"1"}],"false":[{"type":"choices","text":"\t[脸书,ook]要怎么做","choices":[{"text":"求援（体力+1000，结算分数变1分）","action":[{"type":"setValue","name":"status:hp","operator":"+=","value":"1000"},{"type":"setValue","name":"flag:hasCheated","value":"true"}]},{"text":"发送在线评论","action":[]},{"text":"没什么","action":[]}]}]}]},
	"201": {"cls":"enemys","id":"greenSlime"},
	"202": {"cls":"enemys","id":"redSlime"},
	"203": {"cls":"enemys","id":"blackSlime"},
	"204": {"cls":"enemys","id":"slimelord"},
	"205": {"cls":"enemys","id":"bat"},
	"206": {"cls":"enemys","id":"bigBat"},
	"207": {"cls":"enemys","id":"redBat"},
	"208": {"cls":"enemys","id":"vampire"},
	"209": {"cls":"enemys","id":"skeleton"},
	"210": {"cls":"enemys","id":"skeletonSoilder"},
	"211": {"cls":"enemys","id":"skeletonCaptain"},
	"212": {"cls":"enemys","id":"ghostSkeleton"},
	"213": {"cls":"enemys","id":"zombie"},
	"214": {"cls":"enemys","id":"zombieKnight"},
	"215": {"cls":"enemys","id":"rock"},
	"216": {"cls":"enemys","id":"slimeMan"},
	"217": {"cls":"enemys","id":"bluePriest"},
	"218": {"cls":"enemys","id":"redPriest"},
	"219": {"cls":"enemys","id":"brownWizard"},
	"220": {"cls":"enemys","id":"redWizard"},
	"221": {"cls":"enemys","id":"yellowGuard"},
	"222": {"cls":"enemys","id":"blueGuard"},
	"223": {"cls":"enemys","id":"redGuard"},
	"224": {"cls":"enemys","id":"swordsman"},
	"225": {"cls":"enemys","id":"soldier"},
	"226": {"cls":"enemys","id":"yellowKnight"},
	"227": {"cls":"enemys","id":"redKnight"},
	"228": {"cls":"enemys","id":"darkKnight"},
	"229": {"cls":"enemys","id":"blackKing"},
	"230": {"cls":"enemys","id":"yellowKing"},
	"231": {"cls":"enemys","id":"greenKing"},
	"232": {"cls":"enemys","id":"blueKnight"},
	"233": {"cls":"enemys","id":"goldSlime"},
	"234": {"cls":"enemys","id":"poisonSkeleton"},
	"235": {"cls":"enemys","id":"poisonBat"},
	"236": {"cls":"enemys","id":"steelRock"},
	"237": {"cls":"enemys","id":"skeletonPriest"},
	"238": {"cls":"enemys","id":"skeletonKing"},
	"239": {"cls":"enemys","id":"skeletonWizard"},
	"240": {"cls":"enemys","id":"redSkeletonCaption"},
	"241": {"cls":"enemys","id":"badHero"},
	"242": {"cls":"enemys","id":"demon"},
	"243": {"cls":"enemys","id":"demonPriest"},
	"244": {"cls":"enemys","id":"goldHornSlime"},
	"245": {"cls":"enemys","id":"redKing"},
	"246": {"cls":"enemys","id":"whiteKing"},
	"247": {"cls":"enemys","id":"blackMagician"},
	"248": {"cls":"enemys","id":"silverSlime"},
	"249": {"cls":"enemys","id":"swordEmperor"},
	"250": {"cls":"enemys","id":"whiteHornSlime"},
	"251": {"cls":"enemys","id":"badPrincess"},
	"252": {"cls":"enemys","id":"badFairy"},
	"253": {"cls":"enemys","id":"grayPriest"},
	"254": {"cls":"enemys","id":"redSwordsman"},
	"255": {"cls":"enemys","id":"whiteGhost"},
	"256": {"cls":"enemys","id":"poisonZombie"},
	"257": {"cls":"enemys","id":"magicDragon"},
	"258": {"cls":"enemys","id":"octopus"},
	"259": {"cls":"enemys","id":"darkFairy"},
	"260": {"cls":"enemys","id":"greenKnight"},
	"261": {"cls":"enemy48","id":"angel"},
	"262": {"cls":"enemy48","id":"elemental"},
	"263": {"cls":"enemy48","id":"steelGuard"},
	"264": {"cls":"enemy48","id":"evilBat"},
	"300": {"cls":"npcs","id":"N300"},
	"301": {"cls":"npcs","id":"N301"},
	"302": {"cls":"npcs","id":"N302"},
	"303": {"cls":"npcs","id":"N303"},
	"304": {"cls":"animates","id":"A304","animate":4,"canPass":true,"script":"(function () {\n\thero.mana += (hero.manamax / 6);\n\tcore.removeBlock(core.getHeroLoc('x'), core.getHeroLoc('y'));\n\tcore.drawTip('获得 亡灵之火，回复一整格气息');\n\tcore.autoGetItem();\n})();"},
	"305": {"cls":"items","id":"I305"},
	"306": {"cls":"items","id":"I306"},
	"307": {"cls":"items","id":"I307"},
	"308": {"cls":"items","id":"I308"},
	"309": {"cls":"items","id":"I309"},
	"310": {"cls":"items","id":"I310"},
	"311": {"cls":"items","id":"I311"},
	"312": {"cls":"items","id":"I312"},
	"313": {"cls":"items","id":"I313"},
	"314": {"cls":"items","id":"I314"},
	"315": {"cls":"items","id":"I315"},
	"316": {"cls":"items","id":"I316"},
	"317": {"cls":"items","id":"I317"},
	"318": {"cls":"items","id":"I318"},
	"319": {"cls":"items","id":"I319"},
	"320": {"cls":"items","id":"I320"},
	"321": {"cls":"items","id":"I321"},
	"322": {"cls":"items","id":"I322"},
	"323": {"cls":"items","id":"I323"},
	"324": {"cls":"items","id":"I324"},
	"325": {"cls":"items","id":"I325"},
	"326": {"cls":"items","id":"I326"},
	"327": {"cls":"items","id":"I327"},
	"328": {"cls":"items","id":"I328"},
	"329": {"cls":"enemys","id":"E329"},
	"330": {"cls":"enemys","id":"E330"},
	"331": {"cls":"enemys","id":"E331"},
	"332": {"cls":"enemys","id":"E332"},
	"333": {"cls":"enemys","id":"E333"},
	"334": {"cls":"enemys","id":"E334"},
	"335": {"cls":"enemys","id":"E335"},
	"336": {"cls":"enemys","id":"E336"},
	"337": {"cls":"enemys","id":"E337"},
	"338": {"cls":"items","id":"I338"},
	"339": {"cls":"items","id":"I339"},
	"340": {"cls":"terrains","id":"ground","canPass":true},
	"341": {"cls":"terrains","id":"grass"},
	"342": {"cls":"terrains","id":"grass2"},
	"343": {"cls":"terrains","id":"snowGround"},
	"344": {"cls":"terrains","id":"ground2"},
	"345": {"cls":"terrains","id":"ground3","canPass":true},
	"346": {"cls":"terrains","id":"ground4","canPass":true},
	"347": {"cls":"terrains","id":"sand"},
	"348": {"cls":"terrains","id":"ground5"},
	"349": {"cls":"terrains","id":"yellowWall2"},
	"350": {"cls":"terrains","id":"whiteWall2"},
	"351": {"cls":"terrains","id":"blueWall2"},
	"352": {"cls":"terrains","id":"blockWall"},
	"353": {"cls":"terrains","id":"grayWall","canPass":true},
	"354": {"cls":"terrains","id":"white","canPass":true},
	"355": {"cls":"terrains","id":"ground6","canPass":true},
	"356": {"cls":"terrains","id":"soil","canPass":true},
	"357": {"cls":"terrains","id":"ground7","canPass":true},
	"358": {"cls":"terrains","id":"ground8","canPass":true},
	"359": {"cls":"terrains","id":"T359","canPass":true},
	"360": {"cls":"terrains","id":"T360","canPass":true},
	"361": {"cls":"terrains","id":"T361","canPass":true},
	"362": {"cls":"terrains","id":"T362","canPass":true},
	"363": {"cls":"terrains","id":"T363"},
	"364": {"cls":"terrains","id":"T364","canPass":true},
	"365": {"cls":"terrains","id":"T365","canPass":true},
	"366": {"cls":"terrains","id":"T366","canPass":true},
	"367": {"cls":"terrains","id":"T367","canPass":true},
	"368": {"cls":"terrains","id":"T368","canPass":true},
	"369": {"cls":"terrains","id":"T369","canPass":true},
	"370": {"cls":"terrains","id":"T370","canPass":true},
	"371": {"cls":"terrains","id":"T371","canPass":true},
	"372": {"cls":"terrains","id":"T372","canPass":true},
	"373": {"cls":"terrains","id":"T373","canPass":true},
	"374": {"cls":"animates","id":"A374","trigger":"openDoor","doorInfo":{"time":1,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"greenKey":1},"afterOpenDoor":[{"type":"function","function":"function(){\ncore.drawTip('随意门使用成功');\n}"}]}},
	"375": {"cls":"items","id":"I375"},
	"376": {"cls":"animates","id":"A376","canPass":true},
	"377": {"cls":"enemys","id":"E377"},
	"378": {"cls":"enemys","id":"E378"},
	"379": {"cls":"enemys","id":"E379"},
	"380": {"cls":"enemys","id":"E380"},
	"381": {"cls":"enemys","id":"E381"},
	"382": {"cls":"enemys","id":"E382"},
	"383": {"cls":"enemys","id":"E383"},
	"384": {"cls":"enemys","id":"E384"},
	"385": {"cls":"enemys","id":"E385"},
	"386": {"cls":"npcs","id":"N386"},
	"387": {"cls":"npcs","id":"N387"},
	"388": {"cls":"npcs","id":"N388"},
	"389": {"cls":"npcs","id":"N389"},
	"390": {"cls":"terrains","id":"T390","canPass":true},
	"391": {"cls":"terrains","id":"T391","canPass":true},
	"392": {"cls":"terrains","id":"T392"},
	"393": {"cls":"terrains","id":"T393"},
	"394": {"cls":"terrains","id":"T394"},
	"395": {"cls":"items","id":"I395"},
	"396": {"cls":"enemys","id":"E396"},
	"397": {"cls":"enemys","id":"E397"},
	"398": {"cls":"items","id":"I398"},
	"399": {"cls":"items","id":"I399"},
	"400": {"cls":"items","id":"I400"},
	"401": {"cls":"items","id":"I401"},
	"402": {"cls":"items","id":"I402"},
	"403": {"cls":"items","id":"I403"},
	"404": {"cls":"items","id":"I404"},
	"405": {"cls":"items","id":"I405"},
	"406": {"cls":"items","id":"I406"},
	"407": {"cls":"items","id":"I407"},
	"408": {"cls":"npcs","id":"N408"},
	"409": {"cls":"npcs","id":"N409"},
	"410": {"cls":"npcs","id":"N410"},
	"411": {"cls":"enemys","id":"E411"},
	"412": {"cls":"terrains","id":"T412"},
	"413": {"cls":"enemys","id":"E413"},
	"414": {"cls":"enemys","id":"E414"},
	"415": {"cls":"npcs","id":"N415"},
	"416": {"cls":"npcs","id":"N416"},
	"417": {"cls":"npcs","id":"N417"},
	"418": {"cls":"npcs","id":"N418"},
	"419": {"cls":"npcs","id":"N419"},
	"420": {"cls":"npcs","id":"N420"},
	"421": {"cls":"npcs","id":"N421"},
	"422": {"cls":"npcs","id":"N422"},
	"423": {"cls":"npcs","id":"N423"},
	"424": {"cls":"npcs","id":"N424"},
	"425": {"cls":"npcs","id":"N425"},
	"426": {"cls":"npcs","id":"N426"},
	"427": {"cls":"npcs","id":"N427"},
	"428": {"cls":"npcs","id":"N428"},
	"429": {"cls":"npcs","id":"N429"},
	"430": {"cls":"npcs","id":"N430"},
	"431": {"cls":"enemys","id":"E431"},
	"432": {"cls":"enemys","id":"E432"},
	"433": {"cls":"enemys","id":"E433"},
	"434": {"cls":"enemys","id":"E434"},
	"435": {"cls":"enemys","id":"E435"},
	"436": {"cls":"enemys","id":"E436"},
	"437": {"cls":"enemys","id":"E437"},
	"438": {"cls":"enemys","id":"E438"},
	"439": {"cls":"enemys","id":"E439"},
	"440": {"cls":"enemys","id":"E440"},
	"441": {"cls":"enemys","id":"E441"},
	"442": {"cls":"enemys","id":"E442"},
	"443": {"cls":"enemys","id":"E443"},
	"444": {"cls":"enemys","id":"E444"},
	"445": {"cls":"items","id":"I445"},
	"446": {"cls":"enemys","id":"E446"},
	"447": {"cls":"enemys","id":"E447"},
	"448": {"cls":"terrains","id":"T448"},
	"449": {"cls":"npcs","id":"N449"},
	"450": {"cls":"animates","id":"A450","trigger":"openDoor","animate":1,"doorInfo":{"time":1,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"greenKey":1},"afterOpenDoor":[{"type":"setBlock","number":"A376"},{"type":"function","function":"function(){\ncore.drawTip('随意门使用成功');\n}"}]}},
	"451": {"cls":"items","id":"I451"},
	"452": {"cls":"animates","id":"A452","trigger":"openDoor","animate":1,"doorInfo":{"time":1,"openSound":"door.mp3","closeSound":"door.mp3","keys":{"greenKey":1},"afterOpenDoor":[{"type":"function","function":"function(){\ncore.drawTip('随意门使用成功');\n}"}]}},
	"453": {"cls":"items","id":"I453"},
	"454": {"cls":"npcs","id":"N454"},
	"455": {"cls":"npcs","id":"N455"},
	"456": {"cls":"npcs","id":"N456"},
	"457": {"cls":"npcs","id":"N457"},
	"458": {"cls":"npcs","id":"N458"},
	"459": {"cls":"npcs","id":"N459"},
	"460": {"cls":"npcs","id":"N460"},
	"461": {"cls":"npcs","id":"N461"},
	"462": {"cls":"npcs","id":"N462"},
	"463": {"cls":"npcs","id":"N463"},
	"464": {"cls":"npcs","id":"N464"},
	"465": {"cls":"npcs","id":"N465"},
	"466": {"cls":"npcs","id":"N466"},
	"467": {"cls":"npcs","id":"N467"},
	"468": {"cls":"npcs","id":"N468"},
	"469": {"cls":"npcs","id":"N469"},
	"470": {"cls":"npcs","id":"N470"},
	"471": {"cls":"npcs","id":"N471"},
	"472": {"cls":"npcs","id":"N472"},
	"473": {"cls":"npcs","id":"N473"},
	"474": {"cls":"npcs","id":"N474"},
	"475": {"cls":"npcs","id":"N475"},
	"476": {"cls":"npcs","id":"N476"},
	"477": {"cls":"npcs","id":"N477"},
	"478": {"cls":"npcs","id":"N478"},
	"479": {"cls":"npcs","id":"N479"},
	"480": {"cls":"npcs","id":"N480"},
	"481": {"cls":"npcs","id":"N481"},
	"482": {"cls":"npcs","id":"N482"},
	"483": {"cls":"npcs","id":"N483"},
	"484": {"cls":"npcs","id":"N484"},
	"485": {"cls":"npcs","id":"N485"},
	"486": {"cls":"npcs","id":"N486"},
	"487": {"cls":"npcs","id":"N487"},
	"488": {"cls":"npcs","id":"N488"},
	"489": {"cls":"npcs","id":"N489"},
	"490": {"cls":"items","id":"I490"},
	"491": {"cls":"items","id":"critical"},
	"991": {"cls":"terrains","id":"T991"},
	"992": {"cls":"terrains","id":"T992"},
	"993": {"cls":"terrains","id":"T993"},
	"994": {"cls":"terrains","id":"T994"},
	"995": {"cls":"terrains","id":"T995"},
	"996": {"cls":"terrains","id":"T996"},
	"5001": {"cls":"items","id":"A1"},
	"5002": {"cls":"items","id":"A2"},
	"5003": {"cls":"items","id":"A3"},
	"5004": {"cls":"items","id":"A4"},
	"5005": {"cls":"items","id":"A5"},
	"5006": {"cls":"items","id":"A6"},
	"5007": {"cls":"items","id":"A7"},
	"5008": {"cls":"items","id":"A8"},
	"5009": {"cls":"items","id":"A9"},
	"10017": {"cls":"tileset","id":"X10017","canPass":true},
	"10024": {"cls":"tileset","id":"X10024","canPass":true},
	"10026": {"cls":"tileset","id":"X10026","canPass":true},
	"10033": {"cls":"tileset","id":"X10033","canPass":true}
}