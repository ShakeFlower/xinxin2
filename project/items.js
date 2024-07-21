var items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a = 
{
	"yellowKey": {
		"cls": "tools",
		"name": "黄钥匙",
		"text": "可以打开一扇黄门",
		"hideInToolbox": true
	},
	"blueKey": {
		"cls": "tools",
		"name": "蓝钥匙",
		"text": "可以打开一扇蓝门",
		"hideInToolbox": true
	},
	"redKey": {
		"cls": "tools",
		"name": "红钥匙",
		"text": "可以打开一扇红门",
		"hideInToolbox": true
	},
	"redGem": {
		"cls": "items",
		"name": "红宝石",
		"text": "攻击+${core.values.redGem}",
		"itemEffect": "core.status.hero.atk += core.values.redGem",
		"itemEffectTip": "，攻击力+${core.values.redGem}",
		"useItemEffect": "core.status.hero.atk += core.values.redGem",
		"canUseItemEffect": "true"
	},
	"blueGem": {
		"cls": "items",
		"name": "蓝宝石",
		"text": "，防御+${core.values.blueGem}",
		"itemEffect": "core.status.hero.def += core.values.blueGem",
		"itemEffectTip": "，防御力+${core.values.blueGem}",
		"useItemEffect": "core.status.hero.def += core.values.blueGem",
		"canUseItemEffect": "true"
	},
	"greenGem": {
		"cls": "items",
		"name": "绿宝石",
		"text": "，气息条上限-1",
		"itemEffect": "var h = { \"mana\": core.status.hero.mana, \"mmm\": core.status.hero.manamax / 6 };\ncore.setKiMana(h);\nif (h.charge == h.mmm) {\n\tif (flags.bugFix) h.charge--;\n\telse core.addFlag('overCharge', 1);\n}\ncore.status.hero.manamax -= 6;\nh.mmm--;\ncore.setKiMana(h);\ncore.status.hero.mana = h.mana;",
		"itemEffectTip": "，气息条上限-1",
		"useItemEffect": "core.status.hero.mana -= Math.floor(core.status.hero.mana / core.status.hero.manamax);\ncore.status.hero.manamax -= 6;",
		"canUseItemEffect": "true"
	},
	"yellowGem": {
		"cls": "items",
		"name": "黄宝石",
		"text": "，疲劳上限增加",
		"itemEffect": "core.addFlag('deepBreath', 2)",
		"itemEffectTip": "，深呼吸回复的疲劳+2",
		"useItemEvent": null,
		"canUseItemEffect": "true"
	},
	"redPotion": {
		"cls": "items",
		"name": "伤药",
		"text": "，生命+${core.values.redPotion}",
		"itemEffect": "core.status.hero.hp += core.values.redPotion",
		"itemEffectTip": "，体力+${core.values.redPotion}",
		"useItemEffect": "core.status.hero.hp += core.values.redPotion",
		"canUseItemEffect": "true"
	},
	"bluePotion": {
		"cls": "items",
		"name": "高级伤药",
		"text": "，生命+${core.values.bluePotion}",
		"itemEffect": "core.status.hero.hp += core.values.bluePotion",
		"itemEffectTip": "，体力+${core.values.bluePotion}",
		"useItemEffect": "core.status.hero.hp += core.values.bluePotion",
		"canUseItemEffect": "true"
	},
	"yellowPotion": {
		"cls": "items",
		"name": "能量水",
		"text": null,
		"itemEffect": "core.addFlag('tiredMax', 2)",
		"itemEffectTip": "，能使用技能的疲劳阈值+2",
		"useItemEffect": null,
		"canUseItemEffect": "true"
	},
	"greenPotion": {
		"cls": "items",
		"name": "经验药水",
		"text": null,
		"itemEffect": "core.status.hero.exp += 5",
		"itemEffectTip": "，EXP+5",
		"useItemEffect": "core.status.hero.exp += 5",
		"canUseItemEffect": "true"
	},
	"sword0": {
		"cls": "items",
		"name": "破旧的剑",
		"text": "一把已经生锈的剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 0
			}
		},
		"itemEffect": "core.status.hero.atk += 0",
		"itemEffectTip": "，攻击+0"
	},
	"sword1": {
		"cls": "items",
		"name": "铁剑",
		"text": "一把很普通的铁剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 10
			}
		},
		"itemEffect": "core.status.hero.atk += 10",
		"itemEffectTip": "，攻击+10"
	},
	"sword2": {
		"cls": "items",
		"name": "银剑",
		"text": "一把很普通的银剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 20
			}
		},
		"itemEffect": "core.status.hero.atk += 20",
		"itemEffectTip": "，攻击+20"
	},
	"sword3": {
		"cls": "items",
		"name": "骑士剑",
		"text": "一把很普通的骑士剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 40
			}
		},
		"itemEffect": "core.status.hero.atk += 40",
		"itemEffectTip": "，攻击+40"
	},
	"sword4": {
		"cls": "items",
		"name": "圣剑",
		"text": "一把很普通的圣剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 80
			}
		},
		"itemEffect": "core.status.hero.atk += 80",
		"itemEffectTip": "，攻击+80"
	},
	"sword5": {
		"cls": "items",
		"name": "神圣剑",
		"text": "一把很普通的神圣剑",
		"equip": {
			"type": 0,
			"animate": "sword",
			"value": {
				"atk": 160
			}
		},
		"itemEffect": "core.status.hero.atk += 100",
		"itemEffectTip": "，攻击+100"
	},
	"shield0": {
		"cls": "items",
		"name": "破旧的盾",
		"text": "一个很破旧的铁盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 0
			}
		},
		"itemEffect": "core.status.hero.def += 0",
		"itemEffectTip": "，防御+0"
	},
	"shield1": {
		"cls": "items",
		"name": "铁盾",
		"text": "一个很普通的铁盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 10
			}
		},
		"itemEffect": "core.status.hero.def += 10",
		"itemEffectTip": "，防御+10"
	},
	"shield2": {
		"cls": "items",
		"name": "银盾",
		"text": "一个很普通的银盾",
		"equip": {
			"type": 1,
			"value": {
				"def": 20
			}
		},
		"itemEffect": "core.status.hero.def += 20",
		"itemEffectTip": "，防御+20"
	},
	"shield3": {
		"cls": "constants",
		"name": "火神之水晶球(未鉴定)",
		"text": "需要交给主塔25F老人进行鉴定",
		"equip": null,
		"itemEffect": null,
		"itemEffectTip": null
	},
	"shield4": {
		"cls": "constants",
		"name": "树精之水晶球(未鉴定)",
		"text": "需要交给主塔25F老人进行鉴定",
		"equip": null,
		"itemEffect": null,
		"itemEffectTip": null
	},
	"shield5": {
		"cls": "constants",
		"name": "海王之水晶球(未鉴定)",
		"text": "需要交给主塔25F老人进行鉴定",
		"equip": null,
		"itemEffect": null,
		"itemEffectTip": null
	},
	"superPotion": {
		"cls": "items",
		"name": "圣水",
		"itemEffect": "core.status.hero.hp = Math.floor(0.5 + 1.5 * core.status.hero.hp)",
		"itemEffectTip": "，体力1.5倍",
		"useItemEffect": "core.status.hero.hp *= 2; core.playSound('回血');",
		"canUseItemEffect": "true",
		"text": "生命值x1.5"
	},
	"moneyPocket": {
		"cls": "constants",
		"name": "冒险袋",
		"itemEffect": null,
		"itemEffectTip": null,
		"text": "存储草药精华和高级草药精华，可选择给勇士或公主使用",
		"useItemEffect": null,
		"canUseItemEffect": "true",
		"useItemEvent": [
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "choices",
				"text": "给谁使用草药精华？",
				"choices": [
					{
						"text": "勇者",
						"icon": "N449",
						"action": [
							{
								"type": "while",
								"condition": "true",
								"data": [
									{
										"type": "choices",
										"text": "\t[给勇者使用,N449]\\i[I324]：体力+80,回复中毒\n\\i[I323]：体力+180,回复衰弱",
										"choices": [
											{
												"text": "×${core.getFlag('red_herb',0)}",
												"icon": "I324",
												"need": "core.getFlag('red_herb',0)>0",
												"action": [
													{
														"type": "setValue",
														"name": "flag:red_herb",
														"operator": "-=",
														"value": "1"
													},
													{
														"type": "setValue",
														"name": "status:hp",
														"operator": "+=",
														"value": "80"
													},
													{
														"type": "function",
														"function": "function(){\ncore.triggerDebuff('remove', 'poison')\n}"
													},
													{
														"type": "playSound",
														"name": "recovery.mp3"
													}
												]
											},
											{
												"text": "×${core.getFlag('blue_herb',0)}",
												"icon": "I323",
												"need": "core.getFlag('blue_herb',0)>0",
												"action": [
													{
														"type": "setValue",
														"name": "flag:blue_herb",
														"operator": "-=",
														"value": "1"
													},
													{
														"type": "setValue",
														"name": "status:hp",
														"operator": "+=",
														"value": "180"
													},
													{
														"type": "function",
														"function": "function(){\ncore.triggerDebuff('remove', 'weak')\n}"
													},
													{
														"type": "playSound",
														"name": "recovery.mp3"
													}
												]
											},
											{
												"text": "退出",
												"action": [
													{
														"type": "setValue",
														"name": "flag:keyDown",
														"value": "false"
													},
													{
														"type": "exit"
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						"text": "公主",
						"icon": "princess",
						"action": [
							{
								"type": "while",
								"condition": "true",
								"data": [
									{
										"type": "choices",
										"text": "\t[给公主使用,princess]\\i[I324]：体力+80\n\\i[I323]：体力+180",
										"choices": [
											{
												"text": "×${core.getFlag('red_herb',0)}",
												"icon": "I324",
												"need": "core.getFlag('red_herb',0)>0",
												"action": [
													{
														"type": "setValue",
														"name": "flag:red_herb",
														"operator": "-=",
														"value": "1"
													},
													{
														"type": "setValue",
														"name": "status:hpmax",
														"operator": "+=",
														"value": "80"
													},
													{
														"type": "playSound",
														"name": "recovery.mp3"
													}
												]
											},
											{
												"text": "×${core.getFlag('blue_herb',0)}",
												"icon": "I323",
												"need": "core.getFlag('blue_herb',0)>0",
												"action": [
													{
														"type": "setValue",
														"name": "flag:blue_herb",
														"operator": "-=",
														"value": "1"
													},
													{
														"type": "setValue",
														"name": "status:hpmax",
														"operator": "+=",
														"value": "180"
													},
													{
														"type": "playSound",
														"name": "recovery.mp3"
													}
												]
											},
											{
												"text": "退出",
												"action": [
													{
														"type": "setValue",
														"name": "flag:keyDown",
														"value": "false"
													},
													{
														"type": "exit"
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						"text": "退出",
						"action": []
					}
				]
			}
		]
	},
	"book": {
		"cls": "constants",
		"name": "心镜",
		"text": "可以查看当前楼层各怪物属性，包括衍生怪物",
		"hideInToolbox": true,
		"useItemEffect": "core.ui.drawBook(0);",
		"canUseItemEffect": "true"
	},
	"fly": {
		"cls": "constants",
		"name": "黄金色羽根",
		"text": "可以自由往来去过的楼层",
		"hideInReplay": true,
		"hideInToolbox": false,
		"useItemEffect": "core.ui.drawFly(core.floorIds.indexOf(core.status.floorId));",
		"canUseItemEffect": "(function () {\n\tif (core.flags.flyNearStair && !core.nearStair()) return false;\n\tvar xieyan = false;\n\tcore.status.thisMap.blocks.forEach(function (b) {\n\t\tif (b.event.cls == 'enemys' && core.hasSpecial(b.event.id, 50)) xieyan = true;\n\t});\n\tif (xieyan) {\n\t\treturn false;\n\t}\n\treturn core.status.maps[core.status.floorId].canFlyFrom;\n})();"
	},
	"coin": {
		"cls": "items",
		"name": "大金币",
		"text": null,
		"itemEffect": "hero.money += 200;",
		"itemEffectTip": "，金钱+200"
	},
	"snow": {
		"cls": "constants",
		"name": "永恒冰结晶",
		"text": "减少受熔岩伤害，并能移除熔岩",
		"useItemEffect": "(function () {\n\tvar success = false;\n\n\tvar snowFourDirections = false; // 是否四方向雪花；如果是将其改成true\n\tif (snowFourDirections) {\n\t\t// 四方向雪花\n\t\tfor (var direction in core.utils.scan) {\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (core.getBlockId(nx, ny) == 'lava') {\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t\tsuccess = true;\n\t\t\t}\n\t\t}\n\t} else {\n\t\tif (core.getBlockId(core.nextX(), core.nextY()) == 'lava') {\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t\tsuccess = true;\n\t\t}\n\t}\n\n\tif (success) {\n\t\tcore.playSound('打开界面');\n\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t} else {\n\t\tcore.playSound('操作失败');\n\t\tcore.drawTip(\"当前无法使用\" + core.material.items[itemId].name);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n})();",
		"canUseItemEffect": "false",
		"hideInToolbox": false
	},
	"cross": {
		"cls": "items",
		"name": "神之护符",
		"text": null,
		"itemEffect": "core.status.hero.mdef += 5",
		"itemEffectTip": "，公主的魔法防御+5"
	},
	"knife": {
		"cls": "constants",
		"name": "强剑之首饰",
		"text": "一击秒杀白银系怪物"
	},
	"shoes": {
		"cls": "constants",
		"name": "护符",
		"text": "持有时无视负面地形"
	},
	"bigKey": {
		"cls": "items",
		"name": "魔法匙",
		"text": "可以开启当前层所有黄门",
		"itemEffect": "core.addItem('yellowKey', 1);\ncore.addItem('blueKey', 1);\ncore.addItem('redKey', 1);",
		"itemEffectTip": "，钥匙数各+1",
		"useItemEffect": "(function () {\n\tvar actions = core.searchBlock(\"yellowDoor\").map(function (block) {\n\t\treturn { \"type\": \"openDoor\", \"loc\": [block.x, block.y], \"async\": true };\n\t});\n\tactions.push({ \"type\": \"waitAsync\" });\n\tactions.push({ \"type\": \"tip\", \"text\": core.material.items[itemId].name + \"使用成功\" });\n\tcore.insertAction(actions);\n})();",
		"canUseItemEffect": "(function () {\n\treturn core.searchBlock('yellowDoor').length > 0;\n})();"
	},
	"greenKey": {
		"cls": "tools",
		"name": "随意门",
		"text": "可以将特定墙体（以紫门标识）变为黄门或传送阵，或移除冰块。直接撞击对应的墙体或冰块即可。"
	},
	"pickaxe": {
		"cls": "constants",
		"name": "锄头",
		"text": "可变为宝石锄头",
		"useItemEffect": "(function () {\n\tvar canBreak = function (x, y) {\n\t\tvar block = core.getBlock(x, y);\n\t\tif (block == null || block.disable) return false;\n\t\treturn block.event.canBreak;\n\t};\n\n\tvar success = false;\n\tvar pickaxeFourDirections = false; // 是否四方向破；如果是将其改成true\n\tif (pickaxeFourDirections) {\n\t\t// 四方向破\n\t\tfor (var direction in core.utils.scan) {\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (canBreak(nx, ny)) {\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t\tsuccess = true;\n\t\t\t}\n\t\t}\n\t} else {\n\t\t// 仅破当前\n\t\tif (canBreak(core.nextX(), core.nextY())) {\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t\tsuccess = true;\n\t\t}\n\t}\n\n\tif (success) {\n\t\tcore.playSound('破墙镐');\n\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t} else {\n\t\t// 无法使用\n\t\tcore.playSound('操作失败');\n\t\tcore.drawTip(\"当前无法使用\" + core.material.items[itemId].name);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n})();",
		"canUseItemEffect": "false"
	},
	"icePickaxe": {
		"cls": "constants",
		"name": "宝石锄头",
		"text": "恶龙最爱",
		"useItemEffect": "(function () {\n\tcore.removeBlock(core.nextX(), core.nextY());\n\tcore.playSound('打开界面');\n\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n})();",
		"canUseItemEffect": "false"
	},
	"bomb": {
		"cls": "tools",
		"name": "炸弹",
		"text": "可以炸掉勇士面前的怪物",
		"useItemEffect": "(function () {\n\tvar canBomb = function (x, y) {\n\t\tvar block = core.getBlock(x, y);\n\t\tif (block == null || block.disable || block.event.cls.indexOf('enemy') != 0) return false;\n\t\tvar enemy = core.material.enemys[block.event.id];\n\t\treturn enemy && !enemy.notBomb;\n\t};\n\n\tvar bombList = []; // 炸掉的怪物坐标列表\n\tvar bombFourDirections = false; // 是否四方向可炸；如果是将其改成true。\n\tif (bombFourDirections) {\n\t\t// 四方向炸\n\t\tfor (var direction in core.utils.scan) {\n\t\t\tvar delta = core.utils.scan[direction];\n\t\t\tvar nx = core.getHeroLoc('x') + delta.x,\n\t\t\t\tny = core.getHeroLoc('y') + delta.y;\n\t\t\tif (canBomb(nx, ny)) {\n\t\t\t\tbombList.push([nx, ny]);\n\t\t\t\tcore.removeBlock(nx, ny);\n\t\t\t}\n\t\t}\n\t} else {\n\t\t// 仅炸当前\n\t\tif (canBomb(core.nextX(), core.nextY())) {\n\t\t\tbombList.push([core.nextX(), core.nextY()]);\n\t\t\tcore.removeBlock(core.nextX(), core.nextY());\n\t\t}\n\t}\n\n\tif (bombList.length > 0) {\n\t\tcore.playSound('炸弹');\n\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t} else {\n\t\tcore.playSound('操作失败');\n\t\tcore.drawTip('当前无法使用' + core.material.items[itemId].name);\n\t\tcore.addItem(itemId, 1);\n\t\treturn;\n\t}\n\n\t// 炸弹后事件\n\t// 这是一个使用炸弹也能开门的例子\n\t/*\n\tif (core.status.floorId=='xxx' && core.terrainExists(x0,y0,'specialDoor') // 某个楼层，该机关门存在\n\t\t&& !core.enemyExists(x1,y1) && !core.enemyExists(x2,y2)) // 且守门的怪物都不存在\n\t{\n\t\tcore.insertAction([ // 插入事件\n\t\t\t{\"type\": \"openDoor\", \"loc\": [x0,y0]} // 开门\n\t\t])\n\t}\n\t*/\n})();",
		"canUseItemEffect": "true"
	},
	"centerFly": {
		"cls": "items",
		"name": "跃进之翼",
		"text": "提升一个等级",
		"useItemEffect": null,
		"canUseItemEffect": null,
		"itemEffect": "hero.lv += 1;\nhero.hp += 400;\nhero.atk += 5;\nhero.def += 5;",
		"itemEffectTip": "，提升一个等级"
	},
	"upFly": {
		"cls": "tools",
		"name": "上楼器",
		"text": "可以飞往楼上的相同位置",
		"useItemEffect": "(function () {\n\tvar floorId = core.floorIds[core.floorIds.indexOf(core.status.floorId) + 1];\n\tif (core.status.event.id == 'action') {\n\t\tcore.insertAction([\n\t\t\t{ \"type\": \"changeFloor\", \"loc\": [core.getHeroLoc('x'), core.getHeroLoc('y')], \"floorId\": floorId },\n\t\t\t{ \"type\": \"tip\", \"text\": core.material.items[itemId].name + '使用成功' }\n\t\t]);\n\t} else {\n\t\tcore.changeFloor(floorId, null, core.status.hero.loc, null, function () {\n\t\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t\t\tcore.replay();\n\t\t});\n\t}\n})();",
		"canUseItemEffect": "(function () {\n\tvar floorId = core.status.floorId,\n\t\tindex = core.floorIds.indexOf(floorId);\n\tif (index < core.floorIds.length - 1) {\n\t\tvar toId = core.floorIds[index + 1],\n\t\t\ttoX = core.getHeroLoc('x'),\n\t\t\ttoY = core.getHeroLoc('y');\n\t\tvar mw = core.floors[toId].width,\n\t\t\tmh = core.floors[toId].height;\n\t\tif (toX >= 0 && toX < mw && toY >= 0 && toY < mh && core.getBlock(toX, toY, toId) == null) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n})();"
	},
	"downFly": {
		"cls": "tools",
		"name": "下楼器",
		"text": "可以飞往楼下的相同位置",
		"useItemEffect": "(function () {\n\tvar floorId = core.floorIds[core.floorIds.indexOf(core.status.floorId) - 1];\n\tif (core.status.event.id == 'action') {\n\t\tcore.insertAction([\n\t\t\t{ \"type\": \"changeFloor\", \"loc\": [core.getHeroLoc('x'), core.getHeroLoc('y')], \"floorId\": floorId },\n\t\t\t{ \"type\": \"tip\", \"text\": core.material.items[itemId].name + '使用成功' }\n\t\t]);\n\t} else {\n\t\tcore.changeFloor(floorId, null, core.status.hero.loc, null, function () {\n\t\t\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n\t\t\tcore.replay();\n\t\t});\n\t}\n})();",
		"canUseItemEffect": "(function () {\n\tvar floorId = core.status.floorId,\n\t\tindex = core.floorIds.indexOf(floorId);\n\tif (index > 0) {\n\t\tvar toId = core.floorIds[index - 1],\n\t\t\ttoX = core.getHeroLoc('x'),\n\t\t\ttoY = core.getHeroLoc('y');\n\t\tvar mw = core.floors[toId].width,\n\t\t\tmh = core.floors[toId].height;\n\t\tif (toX >= 0 && toX < mw && toY >= 0 && toY < mh && core.getBlock(toX, toY, toId) == null) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n})();"
	},
	"earthquake": {
		"cls": "tools",
		"name": "地震卷轴",
		"text": "可以破坏当前层的所有墙",
		"useItemEffect": "(function () {\n\tvar indexes = [];\n\tfor (var index in core.status.thisMap.blocks) {\n\t\tvar block = core.status.thisMap.blocks[index];\n\t\tif (!block.disable && block.event.canBreak) {\n\t\t\tindexes.push(index);\n\t\t}\n\t}\n\tcore.removeBlockByIndexes(indexes);\n\tcore.drawMap();\n\tcore.playSound('打开界面');\n\tcore.drawTip(core.material.items[itemId].name + '使用成功');\n})();",
		"canUseItemEffect": "(function () {\n\treturn core.status.thisMap.blocks.filter(function (block) {\n\t\treturn !block.disable && block.event.canBreak;\n\t}).length > 0;\n})();"
	},
	"poisonWine": {
		"cls": "items",
		"name": "解毒剂",
		"text": "可以解除中毒状态",
		"useItemEffect": "core.triggerDebuff('remove', 'poison');",
		"canUseItemEffect": "core.hasFlag('poison');",
		"itemEffectTip": "，回复中毒状态",
		"itemEffect": "core.triggerDebuff('remove', 'poison');\ncore.autoGetItem();"
	},
	"weakWine": {
		"cls": "items",
		"name": "火酒",
		"text": "可以解除衰弱状态",
		"useItemEffect": "core.triggerDebuff('remove', 'weak');",
		"canUseItemEffect": "core.hasFlag('weak');",
		"itemEffectTip": "，回复衰弱状态",
		"itemEffect": "core.triggerDebuff('remove', 'weak');"
	},
	"curseWine": {
		"cls": "tools",
		"name": "解咒药水",
		"text": "可以解除诅咒状态",
		"useItemEffect": "core.triggerDebuff('remove', 'curse');",
		"canUseItemEffect": "core.hasFlag('curse');"
	},
	"superWine": {
		"cls": "tools",
		"name": "万能药水",
		"text": "可以解除所有不良状态",
		"useItemEffect": "core.triggerDebuff('remove', ['poison', 'weak', 'curse']);",
		"canUseItemEffect": "(function() {\n\treturn core.hasFlag('poison') || core.hasFlag('weak') || core.hasFlag('curse');\n})();"
	},
	"hammer": {
		"cls": "tools",
		"name": "圣锤",
		"text": "该道具尚未被定义"
	},
	"lifeWand": {
		"cls": "tools",
		"name": "生命魔杖",
		"text": "可以恢复100点生命值",
		"useItemEvent": [
			{
				"type": "comment",
				"text": "先恢复一个魔杖（因为使用道具必须消耗一个）"
			},
			{
				"type": "function",
				"function": "function(){\ncore.addItem('lifeWand', 1);\n}"
			},
			{
				"type": "playSound",
				"name": "打开界面"
			},
			{
				"type": "input",
				"text": "请输入生命魔杖使用次数：(0-${item:lifeWand})"
			},
			{
				"type": "if",
				"condition": "flag:input<=item:lifeWand",
				"true": [
					{
						"type": "setValue",
						"name": "item:lifeWand",
						"operator": "-=",
						"value": "flag:input"
					},
					{
						"type": "setValue",
						"name": "status:hp",
						"operator": "+=",
						"value": "flag:input*100"
					},
					{
						"type": "playSound",
						"name": "回血"
					},
					"成功使用${flag:input}次生命魔杖，恢复${flag:input*100}点生命。"
				],
				"false": [
					{
						"type": "playSound",
						"name": "操作失败"
					},
					"输入不合法！"
				]
			}
		],
		"canUseItemEffect": "true"
	},
	"jumpShoes": {
		"cls": "tools",
		"name": "跳跃靴",
		"text": "能跳跃到前方两格处",
		"useItemEffect": "core.playSound(\"跳跃\");\ncore.insertAction({ \"type\": \"jumpHero\", \"loc\": [core.nextX(2), core.nextY(2)] });",
		"canUseItemEffect": "(function () {\n\tvar nx = core.nextX(2),\n\t\tny = core.nextY(2);\n\treturn nx >= 0 && nx < core.bigmap.width && ny >= 0 && ny < core.bigmap.height && core.getBlockId(nx, ny) == null;\n})();"
	},
	"skill1": {
		"cls": "constants",
		"name": "妖精之歌颂",
		"text": "三相之力一号",
		"hideInReplay": true,
		"useItemEffect": null,
		"canUseItemEffect": null,
		"hideInToolbox": true
	},
	"wand": {
		"cls": "items",
		"name": "新物品"
	},
	"I305": {
		"cls": "constants",
		"name": "说明书",
		"text": "关于本复刻版的一些说明",
		"useItemEvent": [
			{
				"type": "choices",
				"choices": [
					{
						"text": "复刻说明",
						"action": [
							{
								"type": "while",
								"condition": "1",
								"data": [
									{
										"type": "choices",
										"choices": [
											{
												"text": "复刻版(原版)说明",
												"action": [
													"\t[欢迎来到新新魔塔续的H5复刻版]本复刻版忠实复刻了「新新魔塔续」的所有内容（包括所有Bug），除了：\n1.战斗UI：你需要在战前输入战斗中需要发动的技能，详见说明书的「技能输入帮助」部分。\n2.随机因素，列举如下：疲劳小于100时必定不会miss；中毒、衰弱为战斗进入第5回合时必定触发；其它带有随机因素的怪物见各自说明。\n3.白银系怪物的小游戏：集齐三相之力后可零伤解决。\n\n最后更新：2023/2/26",
													{
														"type": "drawImage",
														"image": "baiyin.png",
														"x": 3,
														"y": 192
													},
													{
														"type": "text",
														"text": "\t[白银系怪物伤害表]白银系怪物的伤害如下，建议集齐三相之力后再与它们战斗：",
														"pos": [
															96,
															32
														]
													},
													{
														"type": "clearMap"
													},
													"\t[计分方式]原作目前的“主流”玩法为高攻防和玩法以及速通玩法，复刻版提供这两种玩法的计分方式，你需要在游戏结束时进行选择。\n高攻防和：最终得分=勇者的攻击+防御。\n速通：最终得分=5000-杀敌数（杀敌数可在数据统计[B]中查看）。"
												]
											},
											{
												"text": "原作Bug列举",
												"action": [
													"\t[原作Bug列举] · 流石C不会给怪物带来防增气。\n · 未装备过剑技时，XC可以透支气息。\n（以上两条详解见教程3）\n · 流石结算时，先吸气再扣除需要消耗的1格气息。\n · 满槽获得绿宝石时爆槽（如5+40/40吃绿宝石会变为5+40/39）。\n · 防御≤1.5*等级时凡骨的转换攻防无效（应为防御<等级时无效）。\n · 反射盾不能反弹增加疲劳的效果（将mtmptir错写为mtmptired导致的Bug）。\n · 反射盾不能反弹皇室枪兵的降低防御效果。\n · 使用精灵罩时按(血+防)%等级计算增加的防御，而承受三次攻击后按(防/50+血%等级)计算扣减的防御。",
													"\t[原作Bug列举] · 不死骷髅兵的吸血效果仅为1/3（应与其它怪物同为1/2）。\n · 斗神·高巴技能的描述判定条件为：被它的会心一击击中时。实际判定条件为：伤害大于怪物攻击减勇者防御。这会导致：临界防杀斗神·高巴时，其普通攻击也会触发技能；斗神·高巴会心一击时（且未临界防杀），勇者使用镜膜盾能躲过他的技能。\n · 魔神·些多的“死寂光环”能力实际上没有起作用，这会影响到：攻防增气、流石吸气、拥有绿水晶时公主被攻击。\n · 血剑士会心一击的伤害应该是基本伤害的3倍，但实际上是2倍。\n · 魔界之王·古顿在暴击时弹射伤害计算为NaN导致弹射伤害为0。\n · 魔界之王·古顿计算弹射伤害时使用的基础伤害未考虑盾技减伤的效果。",
													"\t[魔眼相关Bug] · 魔眼操纵勇者放剑技时，若勇者攻击不大于防御，则操纵的技能会保存下来，由勇者攻击魔眼时施放。\n · 魔眼操纵勇者放剑技的效果与描述不符：\n    凡骨：伤害为1.8倍\n    流石：没有吸取一半气息的效果\n    深红：将伤害改为100，没有回血效果\n    天灵：伤害为1.5倍\n · 勇者使用盾技抵挡自己攻击的效果与描述不符：\n    结晶盾：无冻结一回合的效果\n    反射盾：反弹伤害仅为伤害值/2.6\n    精灵罩：承受三次攻击失效时，降低的防御值按(经验+防御)%等级来计算\n · 勇者攻击自己没有防增气（只有攻增气）\n"
												]
											},
											{
												"text": "修复版说明",
												"action": [
													"\t[修复版说明]修复版修复了原版游戏中存在的所有Bug（详见说明书的「原作Bug列举」部分）。\n\n修复版计分：能力分+道具分+成就分。\n能力分=(勇者体力/2+公主体力)开方+等级+攻防和+公主魔防+剑/盾技数×10+绿/黄宝石及能量水×2\n道具分=剩余的\\i[I324]×1+\\i[I323]×3+\\i[redKey]×4+\\i[I398]×5+\\i[I400]×10+\\i[I403]×20+\\i[I407]×30\n成就分=成就点数",
													"\t[修复版说明]修复版进行了以下平衡调整，使游戏内容及难度更合理：\n · 深红、贤者结界的回血效果改为向下取整（防止卡攻防刷更多血）。\n · 反射盾的气息消耗改为2。\n · 精灵罩的气息消耗改为1，且可多次叠加（每次被攻击前可使用一次）。\n · 中毒、衰弱状态可共存。\n · 金币商店价格统一为20，每购买一次+1，价格到达150后每购买一次+2。"
												]
											},
											{
												"text": "技能输入帮助",
												"action": [
													"\t[技能输入帮助]快捷键1-9的用法见教程1\n基础输入见技能面板（快捷键6）\n高级输入：\n-C：最后一回合(≤10)用C\n-V：有一格气息且疲劳≥深呼吸回复量时使用V\n@+数字：进行到对应回合后继续结算后续技能（如@4C@8CC表示在第4、8、9回合分别使用会心一击）\n内容*数字：内容重复数字次（如(A*3C)*2C=(AAAC)*2C=AAACAAACC，表示在第4、8、9回合分别使用会心一击）",
													"\t[示例]@4C=AAAC=A*3C：第4回合用会心一击。\n-V*21：在适当的时机用21次深呼吸（如防杀水银人时，回合数为81，深呼吸回复量为7，则需要(80*3-99)/7向上取整=21次深呼吸）。\nCX1C：有蓝水晶或绿水晶时：第一回合用会心一击和镜膜盾(X1)，第二回合用会心一击；否则若当前装备着镜膜盾，则自动替换为CXC，若未装备镜膜盾，则为非法输入。\nX2AZX3（装备流石）：有蓝水晶时：第一回合用结晶盾(X2)，第三回合用流石(Z，写作Z2也可)+反射盾(X3)；否则为非法输入。"
												]
											},
											{
												"text": "退出",
												"action": [
													{
														"type": "exit"
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						"text": "高级设置[U]",
						"action": [
							{
								"type": "insert",
								"name": "高级设置"
							}
						]
					},
					{
						"text": "查看技能库",
						"action": [
							{
								"type": "insert",
								"name": "技能库管理"
							}
						]
					},
					{
						"text": "退出",
						"action": []
					}
				]
			}
		],
		"canUseItemEffect": true
	},
	"I306": {
		"cls": "items",
		"name": "新物品"
	},
	"I307": {
		"cls": "constants",
		"name": "圣神之加护",
		"text": "三相之力二号",
		"hideInToolbox": true,
		"hideInReplay": true
	},
	"I308": {
		"cls": "constants",
		"name": "会心一击",
		"text": "气息消耗40\n首回合造成的伤害×2。\n快捷键1"
	},
	"I309": {
		"cls": "constants",
		"name": "魔力之源",
		"text": "三相之力三号",
		"hideInToolbox": true,
		"hideInReplay": true
	},
	"I310": {
		"cls": "items",
		"name": "新物品"
	},
	"I311": {
		"cls": "items",
		"name": "新物品"
	},
	"I312": {
		"cls": "constants",
		"name": "风之翼",
		"text": "魔神身上遗落的，似乎可以用来飞行。\n",
		"hideInToolbox": true
	},
	"I313": {
		"cls": "items",
		"name": "新物品"
	},
	"I314": {
		"cls": "items",
		"name": "新物品"
	},
	"I316": {
		"cls": "equips",
		"name": "皇者(Z5)",
		"text": "伤害*5，不致死，随后攻击退化。\n最低使用等级=100 气息消费=2 疲劳+30",
		"equip": {
			"type": 0,
			"value": {},
			"percentage": {},
			"equipEvent": [
				{
					"type": "setValue",
					"name": "flag:swordUsed",
					"value": "true"
				},
				{
					"type": "if",
					"condition": "(flag:swordUsed!==true)",
					"true": [
						{
							"type": "setValue",
							"name": "flag:swordUsed",
							"value": "true"
						},
						{
							"type": "function",
							"function": "function(){\ncore.clearMyCache('all');\n}"
						},
						{
							"type": "function",
							"function": "function(){\ncore.drawFg(core.status.floorId);\n}"
						}
					]
				}
			]
		},
		"canUseItemEffect": "hero.lv >= 100"
	},
	"I317": {
		"cls": "equips",
		"name": "天灵(Z4)",
		"text": "伤害*1.8，怪物疲劳+15。\n最低使用等级=76 气息消费=2 疲劳+8",
		"equip": {
			"type": 0,
			"value": {},
			"percentage": {},
			"equipEvent": [
				{
					"type": "setValue",
					"name": "flag:swordUsed",
					"value": "true"
				},
				{
					"type": "if",
					"condition": "(flag:swordUsed!==true)",
					"true": [
						{
							"type": "setValue",
							"name": "flag:swordUsed",
							"value": "true"
						},
						{
							"type": "function",
							"function": "function(){\ncore.clearMyCache('all');\n}"
						},
						{
							"type": "function",
							"function": "function(){\ncore.drawFg(core.status.floorId);\n}"
						}
					]
				}
			]
		},
		"canUseItemEffect": "hero.lv >= 76"
	},
	"I318": {
		"cls": "equips",
		"name": "深红(Z3)",
		"text": "伤害*0.8，不致死，将实际伤害*0.3回复至自身。\n最低使用等级=26 气息消费=1 疲劳+4",
		"equip": {
			"type": 0,
			"value": {},
			"percentage": {},
			"equipEvent": [
				{
					"type": "setValue",
					"name": "flag:swordUsed",
					"value": "true"
				},
				{
					"type": "if",
					"condition": "(flag:swordUsed!==true)",
					"true": [
						{
							"type": "setValue",
							"name": "flag:swordUsed",
							"value": "true"
						},
						{
							"type": "function",
							"function": "function(){\ncore.clearMyCache('all');\n}"
						},
						{
							"type": "function",
							"function": "function(){\ncore.drawFg(core.status.floorId);\n}"
						}
					]
				}
			]
		},
		"canUseItemEffect": "hero.lv >= 26"
	},
	"I319": {
		"cls": "equips",
		"name": "流石(Z2)",
		"text": "伤害*1.3，吸取怪物的全部气息至自身。\n最低使用等级=20 气息消费=1 疲劳+4",
		"equip": {
			"type": 0,
			"value": {},
			"percentage": {},
			"equipEvent": [
				{
					"type": "setValue",
					"name": "flag:swordUsed",
					"value": "true"
				},
				{
					"type": "if",
					"condition": "((flag:skill_1==='-C')&&(!flag:bugFix))",
					"true": [
						{
							"type": "setValue",
							"name": "flag:skill_1",
							"value": "'C'"
						}
					]
				},
				{
					"type": "if",
					"condition": "((flag:skill_2==='XC')&&(!flag:bugFix))",
					"true": [
						{
							"type": "setValue",
							"name": "flag:skill_2",
							"value": "'CX'"
						}
					]
				}
			],
			"unequipEvent": [
				{
					"type": "if",
					"condition": "((flag:skill_1==='C')&&(!flag:bugFix))",
					"true": [
						{
							"type": "setValue",
							"name": "flag:skill_1",
							"value": "'-C'"
						}
					]
				},
				{
					"type": "if",
					"condition": "((flag:skill_2==='CX')&&(!flag:bugFix))",
					"true": [
						{
							"type": "setValue",
							"name": "flag:skill_2",
							"value": "'XC'"
						}
					]
				}
			]
		},
		"canUseItemEffect": "hero.lv >= 20"
	},
	"I320": {
		"cls": "equips",
		"name": "贤者结界(X5)",
		"text": "将所受伤害的1.5倍回复至公主身上\n最低使用等级=100 气息消费=2 疲劳+2",
		"equip": {
			"type": 1,
			"value": {},
			"percentage": {}
		},
		"canUseItemEffect": "hero.lv >= 100"
	},
	"I321": {
		"cls": "equips",
		"name": "结晶盾(X2)",
		"text": "所受的伤害除以1.5，敌人本回合以及下回合不能行动\n最低使用等级=18 气息消费=2 疲劳+12",
		"equip": {
			"type": 1,
			"value": {},
			"percentage": {}
		},
		"canUseItemEffect": "hero.lv >= 18"
	},
	"I322": {
		"cls": "equips",
		"name": "精灵罩(X4)",
		"text": "防御暂时增加(防御+生命值)%等级，效果抵挡三次攻击\n最低使用等级=57 气息消费=${flags.bugFix? 1 : 2} 疲劳+9",
		"equip": {
			"type": 1,
			"value": {},
			"percentage": {}
		},
		"canUseItemEffect": "hero.lv >=57"
	},
	"I323": {
		"cls": "items",
		"name": "高级草药精华",
		"text": null,
		"itemEffectTip": "，${core.hasItem('moneyPocket') ? '放在冒险袋中' : '体力+180，回复衰弱'}",
		"itemEffect": "if (core.hasItem('moneyPocket')) core.addFlag('blue_herb', 1);\nelse {\n\thero.hp += 180;\n\tcore.triggerDebuff('remove', 'weak');\n}"
	},
	"I324": {
		"cls": "items",
		"name": "草药精华",
		"text": null,
		"itemEffect": "if (core.hasItem('moneyPocket')) core.addFlag('red_herb', 1);\nelse {\n\thero.hp += 80;\n\tcore.triggerDebuff('remove', 'poison');\n}",
		"itemEffectTip": "，${core.hasItem('moneyPocket') ? '放在冒险袋中' : '体力+80，回复中毒'}"
	},
	"I325": {
		"cls": "constants",
		"name": "火神之水晶球",
		"text": "切换剑技不需要消耗体力，战斗中也可切换剑技。\n公主受到伤害时反弹一半的伤害（公主受到的伤害不变）。"
	},
	"I326": {
		"cls": "constants",
		"name": "树精之水晶球",
		"text": "切换剑技和盾技均不需要消耗生命。\n公主受伤会回复主角气息（回复量为所受伤害的1/3）。"
	},
	"I327": {
		"cls": "constants",
		"name": "海王之水晶球",
		"text": "切换盾技不需要消耗体力，战斗中也可切换盾技。\n公主被攻击时，怪物疲劳+5。"
	},
	"I328": {
		"cls": "constants",
		"name": "幻之史莱姆虹币",
		"text": "大大增加游戏分数"
	},
	"I338": {
		"cls": "items",
		"name": "新物品"
	},
	"I339": {
		"cls": "equips",
		"name": "镜膜盾(X1)",
		"text": "所受的伤害除以2.5\n最低使用等级=1 气息消费=1 疲劳+3",
		"hideInReplay": false,
		"canUseItemEffect": "hero.lv >= 1",
		"equip": {
			"type": 1,
			"value": {},
			"percentage": {}
		}
	},
	"I315": {
		"cls": "equips",
		"name": "凡骨(Z1)",
		"text": "伤害*1.5，暂时将(等级)防御转换为(等级*1.5)攻击，但给予伤害不超过(等级)就没有效果。最低使用等级=1 气息消费=1 疲劳+10",
		"equip": {
			"type": 0,
			"value": {},
			"percentage": {},
			"equipEvent": [
				{
					"type": "setValue",
					"name": "flag:swordUsed",
					"value": "true"
				},
				{
					"type": "if",
					"condition": "(flag:swordUsed!==true)",
					"true": [
						{
							"type": "setValue",
							"name": "flag:swordUsed",
							"value": "true"
						},
						{
							"type": "function",
							"function": "function(){\ncore.clearMyCache('all');\n}"
						},
						{
							"type": "function",
							"function": "function(){\ncore.drawFg(core.status.floorId);\n}"
						}
					]
				}
			]
		},
		"hideInReplay": false,
		"canUseItemEffect": "hero.lv >= 1"
	},
	"I375": {
		"cls": "equips",
		"name": "反射盾(X3)",
		"text": "所受的伤害除以1.3，将（初始伤害除以2.6+勇者攻击除以10）和负面效果反弹给敌人。 最低使用等级=28 气息消费=${flags.bugFix? 2 : 1} 疲劳+3",
		"canUseItemEffect": "hero.lv >= 28",
		"equip": {
			"type": 1,
			"value": {},
			"percentage": {}
		}
	},
	"I395": {
		"cls": "tools",
		"name": "随意门（废弃）",
		"text": "可以将部分墙面变成黄门或传送门，或者移除地上的冰块。若随意门将暗墙变成了传送门或物品，则在开门后返还一把黄钥匙。"
	},
	"I398": {
		"cls": "tools",
		"name": "史莱姆银币",
		"text": "增加游戏分数"
	},
	"I399": {
		"cls": "items",
		"name": "新物品"
	},
	"I400": {
		"cls": "tools",
		"name": "史莱姆金币",
		"text": "增加游戏分数"
	},
	"I401": {
		"cls": "items",
		"name": "新物品"
	},
	"I402": {
		"cls": "items",
		"name": "新物品"
	},
	"I403": {
		"cls": "tools",
		"name": "史莱姆纯银块",
		"text": "大大增加游戏分数"
	},
	"I404": {
		"cls": "items",
		"name": "新物品"
	},
	"I405": {
		"cls": "items",
		"name": "新物品"
	},
	"I406": {
		"cls": "items",
		"name": "新物品"
	},
	"I407": {
		"cls": "tools",
		"name": "史莱姆纯金块",
		"text": "大大增加游戏分数"
	},
	"I445": {
		"cls": "tools",
		"name": "随意门（冰）",
		"text": "消除地面上的冰块"
	},
	"A1": {
		"cls": "constants",
		"name": "新物品",
		"canUseItemEffect": "true",
		"hideInToolbox": true,
		"useItemEffect": "(function () {\n\tcore.useSkill(itemId.substr(1, 1))\n})();",
		"text": "技能组合1",
		"hideInReplay": true
	},
	"A2": {
		"cls": "constants",
		"name": "新物品",
		"canUseItemEffect": "true",
		"hideInToolbox": true,
		"text": "技能组合2",
		"useItemEffect": "(function () {\n\tcore.useSkill(itemId.substr(1, 1))\n})();",
		"hideInReplay": true
	},
	"A3": {
		"cls": "constants",
		"name": "新物品",
		"canUseItemEffect": "true",
		"hideInToolbox": true,
		"text": "技能3",
		"useItemEffect": "(function () {\n\tcore.useSkill(itemId.substr(1, 1))\n})();",
		"hideInReplay": true
	},
	"A4": {
		"cls": "constants",
		"name": "新物品",
		"canUseItemEffect": "true",
		"hideInToolbox": true,
		"text": "技能4",
		"useItemEffect": "(function () {\n\tcore.useSkill(itemId.substr(1, 1))\n})();",
		"hideInReplay": true
	},
	"A5": {
		"cls": "constants",
		"name": "新物品",
		"canUseItemEffect": "true",
		"hideInToolbox": true,
		"useItemEffect": "(function () {\n\tcore.useSkill(itemId.substr(1, 1))\n})();",
		"hideInReplay": true
	},
	"A6": {
		"cls": "constants",
		"name": "技能面板（快捷键6）",
		"canUseItemEffect": "true",
		"hideInToolbox": false,
		"useItemEffect": null,
		"hideInReplay": true,
		"text": "呼出技能面板进行技能输入，能满足大部分需求，手机端强烈推荐",
		"useItemEvent": [
			{
				"type": "setValue",
				"name": "flag:skillName",
				"value": "''"
			},
			{
				"type": "setAttribute",
				"alpha": 0.75
			},
			{
				"type": "if",
				"condition": "true",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 288,
						"h": 160,
						"x1": 64,
						"y1": 32,
						"w1": 288,
						"h1": 160
					},
					{
						"type": "strokeRect",
						"x": 64,
						"y": 32,
						"width": 288,
						"height": 160,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "drawTextContent",
						"text": "输入技能：（点击按钮或用键盘输入）\nA：平砍；Z：使用剑技；C：使用会心一击。\nD：不使用盾技；X：使用盾技。V：深呼吸。\n示例：（A和D在无歧义时可省略）\n第4回合使用会心一击：AAAC；\n平砍+盾技+会心一击：AXC（或XC）；\n剑,不用盾,平A,盾,深呼吸,平A,盾,暴击：\nZDAXVAXC 或 ZAXVXC 或 ZDXVXC。",
						"left": 72,
						"top": 40,
						"fontSize": 14,
						"bold": true
					}
				]
			},
			{
				"type": "if",
				"condition": "core.getEquip(0)",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 64,
						"h": 64,
						"x1": 32,
						"y1": 320,
						"w1": 64,
						"h1": 64
					},
					{
						"type": "strokeRect",
						"x": 32,
						"y": 320,
						"width": 64,
						"height": 64,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "fillBoldText",
						"x": 48,
						"y": 371,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 52px Arial",
						"text": "Z"
					}
				]
			},
			{
				"type": "if",
				"condition": "core.getEquip(1)",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 64,
						"h": 64,
						"x1": 128,
						"y1": 320,
						"w1": 64,
						"h1": 64
					},
					{
						"type": "strokeRect",
						"x": 128,
						"y": 320,
						"width": 64,
						"height": 64,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "fillBoldText",
						"x": 143,
						"y": 371,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 52px Arial",
						"text": "X"
					}
				]
			},
			{
				"type": "if",
				"condition": "true",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 64,
						"h": 64,
						"x1": 224,
						"y1": 320,
						"w1": 64,
						"h1": 64
					},
					{
						"type": "strokeRect",
						"x": 224,
						"y": 320,
						"width": 64,
						"height": 64,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "fillBoldText",
						"x": 236,
						"y": 371,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 52px Arial",
						"text": "C"
					}
				]
			},
			{
				"type": "if",
				"condition": "true",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 64,
						"h": 64,
						"x1": 320,
						"y1": 320,
						"w1": 64,
						"h1": 64
					},
					{
						"type": "strokeRect",
						"x": 320,
						"y": 320,
						"width": 64,
						"height": 64,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "fillBoldText",
						"x": 335,
						"y": 371,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 52px Arial",
						"text": "V"
					}
				]
			},
			{
				"type": "if",
				"condition": "true",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 64,
						"h": 64,
						"x1": 64,
						"y1": 224,
						"w1": 64,
						"h1": 64
					},
					{
						"type": "strokeRect",
						"x": 64,
						"y": 224,
						"width": 64,
						"height": 64,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "fillBoldText",
						"x": 77,
						"y": 274,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 52px Arial",
						"text": "A"
					}
				]
			},
			{
				"type": "if",
				"condition": "core.getEquip(1)",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 64,
						"h": 64,
						"x1": 160,
						"y1": 224,
						"w1": 64,
						"h1": 64
					},
					{
						"type": "strokeRect",
						"x": 160,
						"y": 224,
						"width": 64,
						"height": 64,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "fillBoldText",
						"x": 174,
						"y": 274,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 52px Arial",
						"text": "D"
					}
				]
			},
			{
				"type": "if",
				"condition": "true",
				"true": [
					{
						"type": "drawImage",
						"image": "ground2.png",
						"x": 0,
						"y": 0,
						"w": 96,
						"h": 64,
						"x1": 256,
						"y1": 224,
						"w1": 96,
						"h1": 64
					},
					{
						"type": "strokeRect",
						"x": 256,
						"y": 224,
						"width": 96,
						"height": 64,
						"radius": 5,
						"style": [
							205,
							0,
							154
						],
						"lineWidth": 3
					},
					{
						"type": "fillBoldText",
						"x": 267,
						"y": 269,
						"style": [
							255,
							255,
							255,
							1
						],
						"strokeStyle": [
							0,
							0,
							0,
							1
						],
						"font": "bold 36px Arial",
						"text": "退出"
					}
				]
			},
			{
				"type": "dowhile",
				"condition": "(!temp:A)",
				"data": [
					{
						"type": "wait",
						"forceChild": true,
						"data": [
							{
								"case": "mouse",
								"px": [
									32,
									96
								],
								"py": [
									320,
									384
								],
								"action": [
									{
										"type": "if",
										"condition": "core.getEquip(0)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:skillName",
												"operator": "+=",
												"value": "'Z'"
											},
											{
												"type": "if",
												"condition": "(core.hasItem('I325')||(core.hasItem('I326')&&(!temp:B)))",
												"true": [
													{
														"type": "setValue",
														"name": "temp:B",
														"value": "true"
													},
													{
														"type": "choices",
														"text": "选择发动哪个剑技",
														"choices": [
															{
																"text": "凡骨",
																"need": "core.canEquip('I315',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "1"
																	}
																]
															},
															{
																"text": "流石",
																"need": "core.canEquip('I319',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "2"
																	}
																]
															},
															{
																"text": "深红",
																"need": "core.canEquip('I318',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "3"
																	}
																]
															},
															{
																"text": "天灵",
																"need": "core.canEquip('I317',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "4"
																	}
																]
															},
															{
																"text": "皇者",
																"need": "core.canEquip('I316',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "5"
																	}
																]
															},
															{
																"text": "不切换",
																"action": []
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									128,
									192
								],
								"py": [
									320,
									384
								],
								"action": [
									{
										"type": "if",
										"condition": "core.getEquip(1)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:skillName",
												"operator": "+=",
												"value": "'X'"
											},
											{
												"type": "if",
												"condition": "(core.hasItem('I327')||(core.hasItem('I326')&&(!temp:C)))",
												"true": [
													{
														"type": "setValue",
														"name": "temp:C",
														"value": "true"
													},
													{
														"type": "choices",
														"text": "选择发动哪个盾技",
														"choices": [
															{
																"text": "镜膜盾",
																"need": "core.canEquip('I339',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "1"
																	}
																]
															},
															{
																"text": "结晶盾",
																"need": "core.canEquip('I321',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "2"
																	}
																]
															},
															{
																"text": "反射盾",
																"need": "core.canEquip('I375',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "3"
																	}
																]
															},
															{
																"text": "精灵罩",
																"need": "core.canEquip('I322',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "4"
																	}
																]
															},
															{
																"text": "贤者结界",
																"need": "core.canEquip('I320',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "5"
																	}
																]
															},
															{
																"text": "不切换",
																"action": []
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									224,
									288
								],
								"py": [
									320,
									384
								],
								"action": [
									{
										"type": "setValue",
										"name": "flag:skillName",
										"operator": "+=",
										"value": "'C'"
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									320,
									384
								],
								"py": [
									320,
									384
								],
								"action": [
									{
										"type": "setValue",
										"name": "flag:skillName",
										"operator": "+=",
										"value": "'V'"
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									64,
									128
								],
								"py": [
									224,
									288
								],
								"action": [
									{
										"type": "setValue",
										"name": "flag:skillName",
										"operator": "+=",
										"value": "'A'"
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									160,
									224
								],
								"py": [
									224,
									288
								],
								"action": [
									{
										"type": "if",
										"condition": "core.getEquip(1)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:skillName",
												"operator": "+=",
												"value": "'D'"
											}
										]
									}
								]
							},
							{
								"case": "mouse",
								"px": [
									260,
									356
								],
								"py": [
									224,
									288
								],
								"action": [
									{
										"type": "setValue",
										"name": "temp:A",
										"value": "true"
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "90",
								"action": [
									{
										"type": "if",
										"condition": "core.getEquip(0)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:skillName",
												"operator": "+=",
												"value": "'Z'"
											},
											{
												"type": "if",
												"condition": "(core.hasItem('I325')||(core.hasItem('I326')&&(!temp:B)))",
												"true": [
													{
														"type": "setValue",
														"name": "temp:B",
														"value": "true"
													},
													{
														"type": "choices",
														"text": "选择发动哪个剑技",
														"choices": [
															{
																"text": "凡骨",
																"need": "core.canEquip('I315',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "1"
																	}
																]
															},
															{
																"text": "流石",
																"need": "core.canEquip('I319',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "2"
																	}
																]
															},
															{
																"text": "深红",
																"need": "core.canEquip('I318',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "3"
																	}
																]
															},
															{
																"text": "天灵",
																"need": "core.canEquip('I317',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "4"
																	}
																]
															},
															{
																"text": "皇者",
																"need": "core.canEquip('I316',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "5"
																	}
																]
															},
															{
																"text": "不切换",
																"action": []
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "88",
								"action": [
									{
										"type": "if",
										"condition": "core.getEquip(1)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:skillName",
												"operator": "+=",
												"value": "'X'"
											},
											{
												"type": "if",
												"condition": "(core.hasItem('I327')||(core.hasItem('I326')&&(!temp:C)))",
												"true": [
													{
														"type": "setValue",
														"name": "temp:C",
														"value": "true"
													},
													{
														"type": "choices",
														"text": "选择发动哪个盾技",
														"choices": [
															{
																"text": "镜膜盾",
																"need": "core.canEquip('I339',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "1"
																	}
																]
															},
															{
																"text": "结晶盾",
																"need": "core.canEquip('I321',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "2"
																	}
																]
															},
															{
																"text": "反射盾",
																"need": "core.canEquip('I375',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "3"
																	}
																]
															},
															{
																"text": "精灵罩",
																"need": "core.canEquip('I322',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "4"
																	}
																]
															},
															{
																"text": "贤者结界",
																"need": "core.canEquip('I320',false)",
																"action": [
																	{
																		"type": "setValue",
																		"name": "flag:skillName",
																		"operator": "+=",
																		"value": "5"
																	}
																]
															},
															{
																"text": "不切换",
																"action": []
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "67",
								"action": [
									{
										"type": "setValue",
										"name": "flag:skillName",
										"operator": "+=",
										"value": "'C'"
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "86",
								"action": [
									{
										"type": "setValue",
										"name": "flag:skillName",
										"operator": "+=",
										"value": "'V'"
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "65",
								"action": [
									{
										"type": "setValue",
										"name": "flag:skillName",
										"operator": "+=",
										"value": "'A'"
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "68",
								"action": [
									{
										"type": "if",
										"condition": "core.getEquip(1)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:skillName",
												"operator": "+=",
												"value": "'D'"
											}
										]
									}
								]
							},
							{
								"case": "keyboard",
								"keycode": "13,32,27,8,54,102",
								"action": [
									{
										"type": "setValue",
										"name": "temp:A",
										"value": "true"
									}
								]
							},
							{
								"case": "timeout",
								"action": [
									{
										"type": "setValue",
										"name": "temp:A",
										"value": "true"
									}
								]
							}
						]
					},
					{
						"type": "function",
						"function": "function(){\ncore.setFlag('skillName',core.myFormatSkill(core.getFlag('skillName', '')))\n}"
					}
				]
			},
			{
				"type": "clearMap"
			}
		]
	},
	"A7": {
		"cls": "constants",
		"name": "使用推荐的技能（快捷键7）",
		"canUseItemEffect": "(function () {\n\tvar b = core.getBlock(core.nextX(), core.nextY());\n\tif (b && b.event.cls == \"enemys\") return true;\n\tvar list = [];\n\t[\n\t\t[1, 0],\n\t\t[0, 1],\n\t\t[-1, 0],\n\t\t[0, -1]\n\t].forEach(function (e) {\n\t\tb = core.getBlock(hero.loc.x + e[0], hero.loc.y + e[1]);\n\t\tif (b && b.event.cls == \"enemys\") list.push(b);\n\t})\n\tif (list.length == 1) return true;\n\treturn false;\n})();",
		"hideInToolbox": false,
		"useItemEffect": "(function () {\n\tif (!core.isReplaying()) {\n\t\tvar b = core.getBlock(core.nextX(), core.nextY());\n\t\tif (!b || b.event.cls != \"enemys\") {\n\t\t\t[\n\t\t\t\t[1, 0],\n\t\t\t\t[0, 1],\n\t\t\t\t[-1, 0],\n\t\t\t\t[0, -1]\n\t\t\t].forEach(function (e) {\n\t\t\t\tvar b0 = core.getBlock(hero.loc.x + e[0], hero.loc.y + e[1]);\n\t\t\t\tif (b0 && b0.event.cls == \"enemys\") b = b0;\n\t\t\t})\n\t\t}\n\t\tvar skill = (core.getRecomSkill(b.event.id, 0, b.x, b.y, core.status.floorId) || []).skill || \"\";\n\t\tif (core.getFlag(\"skillName\", \"\") == skill) skill = '';\n\t\tcore.setFlag(\"skillName\", skill);\n\t\tcore.status.route.push(\"key:57\");\n\t\tcore.status.route.push(\"input2:\" + core.encodeBase64(skill));\n\t}\n})();",
		"text": "自动使用面前怪物的推荐技能，需在怪物面前使用",
		"hideInReplay": true
	},
	"A8": {
		"cls": "constants",
		"name": "技能选择（快捷键8）",
		"canUseItemEffect": "true",
		"useItemEffect": null,
		"useItemEvent": [
			{
				"type": "choices",
				"text": "选择哪个技能？",
				"choices": [
					{
						"text": "快捷键1：${core.getFlag('skill_1','无')}",
						"action": [
							{
								"type": "choices",
								"choices": [
									{
										"text": "使用${core.getFlag('skill_1','无')}",
										"action": [
											"系统提示：\n你可以直接使用快捷键1（电脑端使用键盘，字母区、数字区的数字均可；手机端竖屏点击右下角的难度，下方状态栏变为数字，点击相应的数字即可）"
										]
									},
									{
										"text": "修改并使用",
										"action": [
											{
												"type": "input2",
												"text": "将快捷键1绑定的技能修改为"
											},
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "core.myFormatSkill(core.getFlag('input',''))"
											},
											{
												"type": "if",
												"condition": "(flag:input!=='')",
												"true": [
													{
														"type": "setValue",
														"name": "flag:skill_1",
														"value": "flag:input"
													}
												],
												"false": [
													"输入有误！请尝试使用技能面板（快捷键6）"
												]
											}
										]
									}
								]
							},
							{
								"type": "useItem",
								"id": "A1"
							}
						]
					},
					{
						"text": "快捷键2：${core.getFlag('skill_2','无')}",
						"action": [
							{
								"type": "choices",
								"choices": [
									{
										"text": "使用${core.getFlag('skill_2','无')}",
										"action": [
											"系统提示：\n你可以直接使用快捷键2（电脑端使用键盘，字母区、数字区的数字均可；手机端竖屏点击右下角的难度，下方状态栏变为数字，点击相应的数字即可）"
										]
									},
									{
										"text": "修改并使用",
										"action": [
											{
												"type": "input2",
												"text": "将快捷键2绑定的技能修改为"
											},
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "core.myFormatSkill(core.getFlag('input',''))"
											},
											{
												"type": "if",
												"condition": "(flag:input!=='')",
												"true": [
													{
														"type": "setValue",
														"name": "flag:skill_2",
														"value": "flag:input"
													}
												],
												"false": [
													"输入有误！请尝试使用技能面板（快捷键6）"
												]
											}
										]
									}
								]
							},
							{
								"type": "useItem",
								"id": "A2"
							}
						]
					},
					{
						"text": "快捷键3：${core.getFlag('skill_3','无')}",
						"action": [
							{
								"type": "choices",
								"choices": [
									{
										"text": "使用${core.getFlag('skill_3','无')}",
										"action": [
											"系统提示：\n你可以直接使用快捷键3（电脑端使用键盘，字母区、数字区的数字均可；手机端竖屏点击右下角的难度，下方状态栏变为数字，点击相应的数字即可）"
										]
									},
									{
										"text": "修改并使用",
										"action": [
											{
												"type": "input2",
												"text": "将快捷键3绑定的技能修改为"
											},
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "core.myFormatSkill(core.getFlag('input',''))"
											},
											{
												"type": "if",
												"condition": "(flag:input!=='')",
												"true": [
													{
														"type": "setValue",
														"name": "flag:skill_3",
														"value": "flag:input"
													}
												],
												"false": [
													"输入有误！请尝试使用技能面板（快捷键6）"
												]
											}
										]
									}
								]
							},
							{
								"type": "useItem",
								"id": "A3"
							}
						]
					},
					{
						"text": "快捷键4：${core.getFlag('skill_4','无')}",
						"action": [
							{
								"type": "choices",
								"choices": [
									{
										"text": "使用${core.getFlag('skill_4','无')}",
										"action": [
											"系统提示：\n你可以直接使用快捷键4（电脑端使用键盘，字母区、数字区的数字均可；手机端竖屏点击右下角的难度，下方状态栏变为数字，点击相应的数字即可）"
										]
									},
									{
										"text": "修改并使用",
										"action": [
											{
												"type": "input2",
												"text": "将快捷键4绑定的技能修改为"
											},
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "core.myFormatSkill(core.getFlag('input',''))"
											},
											{
												"type": "if",
												"condition": "(flag:input!=='')",
												"true": [
													{
														"type": "setValue",
														"name": "flag:skill_4",
														"value": "flag:input"
													}
												],
												"false": [
													"输入有误！请尝试使用技能面板（快捷键6）"
												]
											}
										]
									}
								]
							},
							{
								"type": "useItem",
								"id": "A4"
							}
						]
					},
					{
						"text": "快捷键5：${core.getFlag('skill_5','无')}",
						"action": [
							{
								"type": "choices",
								"choices": [
									{
										"text": "使用${core.getFlag('skill_5','无')}",
										"action": [
											"系统提示：\n你可以直接使用快捷键5（电脑端使用键盘，字母区、数字区的数字均可；手机端竖屏点击右下角的难度，下方状态栏变为数字，点击相应的数字即可）"
										]
									},
									{
										"text": "修改并使用",
										"action": [
											{
												"type": "input2",
												"text": "将快捷键5绑定的技能修改为"
											},
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "core.myFormatSkill(core.getFlag('input',''))"
											},
											{
												"type": "if",
												"condition": "(flag:input!=='')",
												"true": [
													{
														"type": "setValue",
														"name": "flag:skill_5",
														"value": "flag:input"
													}
												],
												"false": [
													"输入有误！请尝试使用技能面板（快捷键6）"
												]
											}
										]
									}
								]
							},
							{
								"type": "useItem",
								"id": "A5"
							}
						]
					},
					{
						"text": "自定义输入[9]",
						"action": [
							{
								"type": "insert",
								"name": "设置技能"
							}
						]
					},
					{
						"text": "查看技能库",
						"action": [
							{
								"type": "insert",
								"name": "技能库管理"
							}
						]
					},
					{
						"text": "退出",
						"action": []
					}
				]
			}
		],
		"hideInReplay": true,
		"text": "使用或修改预设的技能，或自定义输入技能"
	},
	"A9": {
		"cls": "constants",
		"name": "脸书",
		"canUseItemEffect": "true",
		"useItemEffect": null,
		"hideInToolbox": false,
		"hideInReplay": false,
		"text": "可以接受和发布在线留言。可以求援获得1000体力（结算分数变为1）。",
		"useItemEvent": [
			{
				"type": "choices",
				"text": "\t[脸书,ook]要怎么做",
				"choices": [
					{
						"text": "求援（体力+1000，结算分数变1分）",
						"action": [
							{
								"type": "setValue",
								"name": "status:hp",
								"operator": "+=",
								"value": "1000"
							},
							{
								"type": "setValue",
								"name": "flag:hasCheated",
								"value": "true"
							},
							{
								"type": "function",
								"function": "function(){\ncore.plugin.getAchievement(30);\n}"
							}
						]
					},
					{
						"text": "发送在线评论",
						"action": [
							{
								"type": "function",
								"function": "function(){\ncore.plugin.getAchievement(30);\n}"
							}
						]
					},
					{
						"text": "没什么",
						"action": []
					}
				]
			}
		]
	},
	"I451": {
		"cls": "constants",
		"name": "能量转换器",
		"canUseItemEffect": "true",
		"text": "将勇士的体力2:1转换给公主",
		"useItemEvent": [
			{
				"type": "input",
				"text": "转换多少勇者体力值？（必须为100的倍数）"
			},
			{
				"type": "setValue",
				"name": "flag:input",
				"operator": "//=",
				"value": "100"
			},
			{
				"type": "setValue",
				"name": "flag:input",
				"operator": "*=",
				"value": "100"
			},
			{
				"type": "if",
				"condition": "(flag:input<status:hp)",
				"true": [
					{
						"type": "setValue",
						"name": "status:hp",
						"operator": "-=",
						"value": "flag:input"
					},
					{
						"type": "setValue",
						"name": "status:hpmax",
						"operator": "+=",
						"value": "(flag:input/2)"
					},
					"勇者体力-${flag:input}，公主体力+${flag:input/2}"
				],
				"false": [
					"勇者体力不足！"
				]
			}
		]
	},
	"iceCube": {
		"cls": "constants",
		"name": "魔法冰块",
		"text": "用于在妖精之泉（魔塔22F的密室）制取永恒冰结晶"
	},
	"I453": {
		"cls": "constants",
		"name": "查看成就",
		"canUseItemEffect": "true",
		"text": "你的当前成就点数为 ${flags.achieveScore}",
		"useItemEffect": "// var score = flags.achieveScore,\n// \ta = flags.achieves,\n// \ttitle = '\\t[当前成就点数：' + score + ']',\n// \ts = [title, title, title],\n// \tj = 0;\n// for (var i = 1; i <= a.length; i++) {\n// \tvar x = a[i - 1];\n// \ts[j] += (x[4] ? '\\r[white]' : '\\r[grey]') + '\\\\i[N' + (453 + i) + ']' + x[0] + '(' + x[3] + ')：' + x[1];\n// \tif (i % 12 == 0) j++;\n// \telse s[j] += '\\n';\n// }\n// if (!a[16][4]) s.push('完成智能施法成就所需的4种特定情况：\\n1. 战斗中对魔法师系怪物使用凡骨；\\n2. 战斗中当使用皇者的给予伤害大于或等于怪物当前血量时使用皇者；\\n3. 战斗中当怪物给予伤害大于0时对石头怪、铁怪或鬼邪石使用反射盾；\\n4. 战斗中对魔法师系怪物使用贤者结界。');\n// core.insertAction(s);\ncore.plugin.achievement();"
	},
	"I490": {
		"cls": "constants",
		"name": "设置",
		"canUseItemEffect": "true",
		"text": "调节游戏设置",
		"useItemEffect": "core.plugin.changeSetting();"
	}
}