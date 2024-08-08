var functions_d6ad677b_427a_4623_b50f_a445a3b0ef8a = 
{
    "events": {
        "resetGame": function (hero, hard, floorId, maps, values) {
	// 重置整个游戏；此函数将在游戏开始时，或者每次读档时最先被调用
	// hero：勇士信息；hard：难度；floorId：当前楼层ID；maps：地图信息；values：全局数值信息

	// 清除游戏数据
	// 这一步会清空状态栏和全部画布内容，并删除所有动态创建的画布
	core.clearStatus();
	// 初始化status
	core.status = core.clone(core.initStatus, function (name) {
		return name != 'hero' && name != 'maps';
	});
	core.control._bindRoutePush();
	core.status.played = true;
	// 初始化人物，图标，统计信息
	core.status.hero = core.clone(hero);
	window.hero = core.status.hero;
	window.flags = core.status.hero.flags;
	core.events.setHeroIcon(core.status.hero.image, true);
	core.control._initStatistics(core.animateFrame.totalTime);
	core.status.hero.statistics.totalTime = core.animateFrame.totalTime =
		Math.max(core.status.hero.statistics.totalTime, core.animateFrame.totalTime);
	core.status.hero.statistics.start = null;
	// 初始难度
	core.status.hard = hard || "";
	// 初始化地图
	core.status.floorId = floorId;
	core.status.maps = maps;
	core.maps._resetFloorImages();
	// 初始化怪物和道具
	core.material.enemys = core.enemys.getEnemys();
	core.material.items = core.items.getItems();
	// 初始化全局数值和全局开关
	core.values = core.clone(core.data.values);
	for (var key in values || {})
		core.values[key] = values[key];
	core.flags = core.clone(core.data.flags);
	var globalFlags = core.getFlag("globalFlags", {});
	for (var key in globalFlags)
		core.flags[key] = globalFlags[key];
	core._init_sys_flags();
	// 初始化界面，状态栏等
	core.resize();
	// 状态栏是否显示
	if (core.hasFlag('hideStatusBar'))
		core.hideStatusBar(core.hasFlag('showToolbox'));
	else
		core.showStatusBar();
	// 隐藏右下角的音乐按钮
	core.dom.musicBtn.style.display = 'none';
	core.dom.enlargeBtn.style.display = 'none';
	core.fillText('ui', '', 0, 0, "white", '10px hkbdt');
},
        "win": function (reason, norank, noexit) {
	// 游戏获胜事件
	// 请注意，成绩统计时是按照hp进行上传并排名
	// 可以先在这里对最终分数进行计算，比如将2倍攻击和5倍黄钥匙数量加到分数上
	// core.status.hero.hp += 2 * core.getRealStatus('atk') + 5 * core.itemCount('yellowKey');

	// 如果不退出，则临时存储数据
	if (noexit) {
		core.status.extraEvent = core.clone(core.status.event);
	}

	// 游戏获胜事件 
	core.ui.closePanel();
	var replaying = core.isReplaying();
	if (replaying) core.stopReplay();
	core.waitHeroToStop(function () {
		if (!noexit) {
			core.clearMap('all'); // 清空全地图
			core.deleteAllCanvas(); // 删除所有创建的画布
			core.dom.gif2.innerHTML = "";
		}
		reason = core.replaceText(reason);
		core.drawText([
			"\t[" + (reason || "恭喜通关") + "]你的分数是${status:hp}。"
		], function () {
			core.events.gameOver(reason || '', replaying, norank);
		})
	});
},
        "lose": function (reason) {
	// 游戏失败事件
	core.ui.closePanel();
	var replaying = core.isReplaying();
	core.stopReplay();
	core.waitHeroToStop(function () {
		core.drawText([
			"\t[" + (reason || "结局1") + "]你死了。\n如题。"
		], function () {
			core.events.gameOver(null, replaying);
		});
	})
},
        "changingFloor": function (floorId, heroLoc) {
	// 正在切换楼层过程中执行的操作；此函数的执行时间是“屏幕完全变黑“的那一刻
	// floorId为要切换到的楼层ID；heroLoc表示勇士切换到的位置

	// ---------- 此时还没有进行切换，当前floorId还是原来的 ---------- //
	var currentId = core.status.floorId || null; // 获得当前的floorId，可能为null
	var fromLoad = core.hasFlag('__fromLoad__'); // 是否是读档造成的切换
	var isFlying = core.hasFlag('__isFlying__'); // 是否是楼传造成的切换
	if (!fromLoad && !(isFlying && currentId == floorId)) {
		if (!core.hasFlag("__leaveLoc__")) core.setFlag("__leaveLoc__", {});
		if (currentId != null) core.getFlag("__leaveLoc__")[currentId] = core.clone(core.status.hero.loc);
	}

	// 可以对currentId进行判定，比如删除某些自定义图层等
	// if (currentId == 'MT0') {
	//     core.deleteAllCanvas();
	// }

	// 播放换层音效
	if (fromLoad)
		core.playSound('读档');
	else if (isFlying)
		core.playSound('飞行器');
	else if (currentId)
	    core.playSound('上下楼');

	// 根据分区信息自动砍层与恢复
	if (core.autoRemoveMaps) core.autoRemoveMaps(floorId);

	// 重置画布尺寸
	core.maps.resizeMap(floorId);
	// 设置勇士的位置
	heroLoc.direction = core.turnDirection(heroLoc.direction);
	core.status.hero.loc = heroLoc;
	// 检查重生怪并重置
	if (!fromLoad) {
		core.extractBlocks(floorId);
		core.status.maps[floorId].blocks.forEach(function (block) {
			if (block.disable && core.enemys.hasSpecial(block.event.id, 23)) {
				block.disable = false;
				core.setMapBlockDisabled(floorId, block.x, block.y, false);
				core.maps._updateMapArray(floorId, block.x, block.y);
			}
		});
		core.control.gatherFollowers();
	}

	// ---------- 重绘新地图；这一步将会设置core.status.floorId ---------- //
	core.drawMap(floorId);

	// 切换楼层BGM
	if (core.status.maps[floorId].bgm) {
		var bgm = core.status.maps[floorId].bgm;
		if (bgm instanceof Array) bgm = bgm[Math.floor(Math.random() * bgm.length)]; // 多个bgm则随机播放一个
		if (!core.hasFlag("__bgm__")) core.playBgm(bgm);
	}
	// 更改画面色调
	var color = core.getFlag('__color__', null);
	if (!color && core.status.maps[floorId].color)
		color = core.status.maps[floorId].color;
	core.clearMap('curtain');
	core.status.curtainColor = color;
	if (color) core.fillRect('curtain', 0, 0, core.__PIXELS__, core.__PIXELS__, core.arrayToRGBA(color));
	// 更改天气
	var weather = core.getFlag('__weather__', null);
	if (!weather && core.status.maps[floorId].weather)
		weather = core.status.maps[floorId].weather;
	if (weather)
		core.setWeather(weather[0], weather[1]);
	else core.setWeather();

	// ...可以新增一些其他内容，比如创建个画布在右上角显示什么内容等等

},
        "afterChangeFloor": function (floorId) {
	// 转换楼层结束的事件；此函数会在整个楼层切换完全结束后再执行
	// floorId是切换到的楼层
	core.autoGetItem();
	// 如果是读档，则进行检查（是否需要恢复事件）
	if (core.hasFlag('__fromLoad__')) {
		core.events.recoverEvents(core.getFlag("__events__"));
		core.removeFlag("__events__");
	} else {
		// 每次抵达楼层执行的事件
		core.insertAction(core.floors[floorId].eachArrive);

		// 首次抵达楼层时执行的事件（后插入，先执行）
		if (!core.hasVisitedFloor(floorId)) {
			core.insertAction(core.floors[floorId].firstArrive);
			core.visitFloor(floorId);
		}
	}
},
        "flyTo": function (toId, callback) {
	// 楼层传送器的使用，从当前楼层飞往toId
	// 如果不能飞行请返回false

	var fromId = core.status.floorId;

	// 检查能否飞行
	if (!core.status.maps[fromId].canFlyFrom || !core.status.maps[toId].canFlyTo || !core.hasVisitedFloor(toId)) {
		core.playSound('操作失败');
		core.drawTip("无法飞往" + core.status.maps[toId].title + "！", 'fly');
		return false;
	}

	var xieyan = false;
	core.status.thisMap.blocks.forEach(function (b) {
		if (b.event.cls == 'enemys' && core.hasSpecial(b.event.id, 50)) xieyan = true;
	});
	if (xieyan) {
		core.playSound('操作失败');
		core.drawTip("当前层有邪眼怪物，无法使用黄金之羽根！", 'fly');
		return false;
	}

	if (flags.poison) {
		if (fromId.indexOf("B") >= 0 && toId.indexOf("B") >= 0);
		else if (fromId.indexOf("S") >= 0 && toId.indexOf("S") >= 0);
		else if (fromId.indexOf("MT") >= 0 && toId.indexOf("MT") >= 0);
		else {
			core.playSound('操作失败');
			core.drawTip("中毒时无法跨区域使用黄金之羽根！", 'fly');
			return false;
		}
	}


	// 平面塔模式
	var stair = null,
		loc = null;
	if (core.flags.flyRecordPosition) {
		loc = core.getFlag("__leaveLoc__", {})[toId] || null;
	}
	if (core.status.maps[toId].flyPoint != null && core.status.maps[toId].flyPoint.length == 2) {
		stair = 'flyPoint';
	}
	if (stair == null && loc == null) {
		// 获得两个楼层的索引，以决定是上楼梯还是下楼梯
		var fromIndex = core.floorIds.indexOf(fromId),
			toIndex = core.floorIds.indexOf(toId);
		var stair = fromIndex <= toIndex ? "downFloor" : "upFloor";
		// 地下层：同层传送至上楼梯
		if (fromIndex == toIndex && core.status.maps[fromId].underGround) stair = "upFloor";
		// 魔塔侧塔传主塔
		if ((fromId.indexOf("B") >= 0 || fromId.indexOf("S") >= 0) && toId.indexOf("MT") >= 0) stair = "upFloor";
		// 主塔魔塔传侧塔
		if ((fromId.indexOf("B") >= 0 || fromId.indexOf("MT") >= 0) && toId.indexOf("S") >= 0) stair = "downFloor";
		// 密室传其它层
		if (fromId.indexOf("FT") >= 0) stair = "upFloor";
		// 异层传同层、任意层传异层直接传至下楼梯（主塔9Fb为传至上楼梯）
		if (core.status.maps[fromId].title == core.status.maps[toId].title || toId.indexOf('b') >= 0 || (0 && flags.bugFix && core.floorIds.indexOf(toId + "b") >= 0)) {
			if (core.status.maps[toId].underGround) stair = "upFloor";
			else stair = "downFloor";
		}
	}

	// 记录录像
	core.status.route.push("fly:" + toId);
	// 传送
	core.ui.closePanel();
	core.setFlag('__isFlying__', true);
	core.changeFloor(toId, stair, loc, null, function () {
		core.removeFlag("__isFlying__");
		if (callback) callback();
	});

	return true;
},
        "beforeBattle": function (enemyId, x, y) {
	// 战斗前触发的事件，可以加上一些战前特效（详见下面支援的例子）
	// 此函数在“检测能否战斗和自动存档”【之后】执行。如果需要更早的战前事件，请在插件中覆重写 core.events.doSystemEvent 函数。
	// 返回true则将继续战斗，返回false将不再战斗。

	// ------ 支援技能 ------ //
	if (x != null && y != null) {
		var index = x + "," + y,
			cache = core.status.checkBlock.cache[index] || {},
			guards = cache.guards || [];
		// 如果存在支援怪
		if (guards.length > 0) {
			// 记录flag，当前要参与支援的怪物
			core.setFlag("__guards__" + x + "_" + y, guards);
			var actions = [{ "type": "playSound", "name": "跳跃" }];
			// 增加支援的特效动画（图块跳跃）
			guards.forEach(function (g) {
				core.push(actions, { "type": "jump", "from": [g[0], g[1]], "to": [x, y], "time": 300, "keep": false, "async": true });
			});
			core.push(actions, [
				{ "type": "waitAsync" }, // 等待所有异步事件执行完毕
				{ "type": "battle", "loc": [x, y] } // 重要！重新触发本次战斗
			]);
			core.insertAction(actions);
			return false;
		}
	}

	return true;
},
        "afterBattle": function (enemyId, x, y) {
	// 战斗结束后触发的事件

	var enemy = core.material.enemys[enemyId];
	var special = enemy.special;

	// 播放战斗音效和动画
	// 默认播放的动画；你也可以使用
	var animate = 'hand'; // 默认动画
	// 检查当前装备是否存在攻击动画
	var equipId = core.getEquip(0);
	if (equipId && (core.material.items[equipId].equip || {}).animate)
		animate = core.material.items[equipId].equip.animate;
	// 你也可以在这里根据自己的需要，比如enemyId或special或flag来修改播放的动画效果
	// if (enemyId == '...') animate = '...';

	// 检查该动画是否存在SE，如果不存在则使用默认音效
	if (!(core.material.animates[animate] || {}).se)
		core.playSound('attack.mp3');

	// 播放动画；如果不存在坐标（强制战斗）则播放到勇士自身
	if (x != null && y != null)
		core.drawAnimate(animate, x, y);
	else
		core.drawHeroAnimate(animate);

	// 获得战斗伤害信息
	var damageInfo = core.getDamageInfo(enemyId, null, x, y) || {};
	// 战斗伤害
	var damage = damageInfo.damage,
		hdmg = damageInfo.hdmg,
		pdmg = damageInfo.pdmg;
	// 当前战斗回合数，可用于战后所需的判定
	var turn = damageInfo.turn;
	// 判定是否致死
	if (damage == null || hdmg >= core.status.hero.hp || pdmg >= core.status.hero.hpmax) {
		core.status.hero.hp = 0;
		core.updateStatusBar();
		core.events.lose('战斗失败');
		return;
	}

	// 扣减体力值并记录统计数据
	core.status.hero.hp -= hdmg;
	core.status.hero.hpmax -= pdmg;
	core.status.hero.mana = damageInfo.mana;
	core.setFlag('overCharge', damageInfo.overCharge);
	core.status.hero.statistics.battleDamage += damage;
	core.status.hero.statistics.battle++;

	// 计算当前怪物的支援怪物
	var guards = [];
	if (x != null && y != null) {
		guards = core.getFlag("__guards__" + x + "_" + y, []);
		core.removeFlag("__guards__" + x + "_" + y);
	}

	// 获得金币
	var money = guards.reduce(function (curr, g) {
		return curr + core.material.enemys[g[2]].money;
	}, core.getEnemyValue(enemy, "money", x, y));
	if (core.hasItem('coin')) money *= 2; // 幸运金币：双倍
	if (core.hasFlag('curse')) money = 0; // 诅咒效果
	core.status.hero.money += money;
	core.status.hero.statistics.money += money;

	// 获得经验
	var exp = guards.reduce(function (curr, g) {
		return curr + core.material.enemys[g[2]].exp;
	}, core.getEnemyValue(enemy, "exp", x, y));
	if (core.hasFlag('curse')) exp = 0;
	core.status.hero.exp += exp;
	core.status.hero.statistics.exp += exp;

	var hint = "打败 " + core.getEnemyValue(enemy, "name", x, y);
	if (core.flags.statusBarItems.indexOf('enableMoney') >= 0)
		hint += ',' + core.getStatusLabel('money') + '+' + money; // hint += "，金币+" + money;
	if (core.flags.statusBarItems.indexOf('enableExp') >= 0)
		hint += ',' + core.getStatusLabel('exp') + '+' + exp; // hint += "，经验+" + exp;
	if (core.isReplaying()) hint = "打败 " + core.getEnemyValue(enemy, "name", x, y) + ",技能 " + (damageInfo.skill == "" ? "无" : damageInfo.skill);
	core.drawTip(hint, enemy.id);

	// 中毒
	if ((core.enemys.hasSpecial(special, 12) || core.enemys.hasSpecial(special, 61) || core.enemys.hasSpecial(special, 82)) && turn >= 5) {
		core.triggerDebuff('get', 'poison');
	}
	// 衰弱
	if ((core.enemys.hasSpecial(special, 13) || core.enemys.hasSpecial(special, 87)) && turn >= 5) {
		core.setFlag('weakV', (enemy.damage || 1));
		core.triggerDebuff('get', 'weak');
	}
	// 诅咒
	if (core.enemys.hasSpecial(special, 14)) {
		core.triggerDebuff('get', 'curse');
	}
	// 仇恨怪物将仇恨值减半
	if (core.enemys.hasSpecial(special, 17)) {
		core.setFlag('hatred', Math.floor(core.getFlag('hatred', 0) / 2));
	}
	// 自爆
	if (core.enemys.hasSpecial(special, 19)) {
		core.status.hero.statistics.battleDamage += core.status.hero.hp - 1;
		core.status.hero.hp = 1;
	}
	// 退化
	if (core.enemys.hasSpecial(special, 21)) {
		core.status.hero.atk -= (enemy.atkValue || 0);
		core.status.hero.def -= (enemy.defValue || 0);
		if (core.status.hero.atk < 0) core.status.hero.atk = 0;
		if (core.status.hero.def < 0) core.status.hero.def = 0;
	}
	// 增加仇恨值
	core.setFlag('hatred', core.getFlag('hatred', 0) + core.values.hatred);

	// 战后的技能处理，比如扣除魔力值
	var tips = "";
	core.setFlag('battleTips', "");
	if (core.myFormatSkill(core.getFlag('skillName', '')) != damageInfo.skill) {
		core.setFlag('battleTips', "实战" + (damageInfo.skill == "" ? ":无" : damageInfo.skill) + " ");
		tips = "实战技能：" + (damageInfo.skill == "" ? "无" : damageInfo.skill) + "（预设：" + (flags.skillName == "" ? "无" : flags.skillName) + "）\n";
	}
	if (damageInfo.flowMana) {
		core.addFlag('battleTips', "溢出气息" + damageInfo.flowMana + "点");
		tips += "溢出气息" + damageInfo.flowMana + "点";
	}

	if (core.flags.statusBarItems.indexOf('enableSkill') >= 0) {
		// 检测当前开启的技能类型
		var skill = core.getFlag('skill', 0);
		// 关闭技能
		core.setFlag('skill', 0);
		core.setFlag('skillName', '');
	}

	// 事件的处理
	var todo = [];

	// 加点事件
	var point = guards.reduce(function (curr, g) {
		return curr + core.material.enemys[g[2]].point;
	}, core.getEnemyValue(enemy, "point", x, y)) || 0;
	if (core.flags.enableAddPoint && point > 0) {
		core.push(todo, [{ "type": "insert", "name": "加点事件", "args": [point] }]);
	}
	// 战后事件
	if (core.status.floorId != null) {
		core.push(todo, core.floors[core.status.floorId].afterBattle[x + "," + y]);
	}
	core.push(todo, enemy.afterBattle);

	// 在这里增加其他的自定义事件需求
	/*
	if (enemyId=='xxx') {
		core.push(todo, [
			{"type": "...", ...},
		]);
	}
	*/

	// 如果事件不为空，将其插入
	if (todo.length > 0) core.insertAction(todo, x, y);

	// 删除该点设置的怪物信息
	delete((flags.enemyOnPoint || {})[core.status.floorId] || {})[x + "," + y];

	// 因为removeBlock和hideBlock都会刷新状态栏，因此将删除部分移动到这里并保证刷新只执行一次，以提升效率
	if (core.getBlock(x, y) != null) {
		// 检查是否是重生怪物；如果是则仅隐藏不删除
		if (core.hasSpecial(enemy.special, 999)) {
			core.hideBlock(x, y);
		} else if (core.hasSpecial(enemy.special, 20)) {
			if (enemy.id == 'swordEmperor') core.setBlock(398, x, y);
			if (enemy.id == 'goldHornSlime') core.setBlock(400, x, y);
			if (enemy.id == 'whiteHornSlime') core.setBlock(403, x, y);
			if (enemy.id == 'silverSlime') core.setBlock(407, x, y);
		} else if (core.hasSpecial(enemy.special, 23)) {
			if (enemy.id == 'E384') core.setBlock(385, x, y);
			if (enemy.id == 'darkKnight') core.setBlock(225, x, y);
			if (enemy.id == 'soldier') core.setBlock(212, x, y);
		} else if (core.hasSpecial(enemy.special, 70)) {
			core.setBlock(11, x, y);
		} else if (core.hasSpecial(enemy.special, 71)) {
			core.setBlock(374, x, y);
		} else if (damageInfo.ic) {
			core.setBlock(25, x, y);
		} else {
			core.removeBlock(x, y);
			if (core.hasSpecial(enemy.special, 72) || core.hasSpecial(enemy.special, 73)) {
				for (var x0 = Math.max(1, x - 1); x0 <= Math.min(11, x + 1); x0++) {
					for (var y0 = Math.max(1, y - 1); y0 <= Math.min(11, y + 1); y0++) {
						if (!core.getBlock(x0, y0) || !core.getBlock(x0, y0).id || core.getBlock(x0, y0).id == 340) {
							if (core.hasSpecial(enemy.special, 72)) core.setBlock(11, x0, y0);
							if (core.hasSpecial(enemy.special, 73) && (hero.loc.x != x0 || hero.loc.y != y0) && (!core.status.hero.followers[0] || core.status.hero.followers[0].x != x0 || core.status.hero.followers[0].y != y0)) core.setBlock(374, x0, y0);
						}
					}
				}
			}
		}
	} else {
		core.updateStatusBar();
	}

	core.autoGetItem();

	var theLast = function () {
		var lastOne = true;
		var maps = core.status.maps;
		for (var map in maps) {
			if (maps[map].deleted) continue;
			(maps[map].blocks || []).forEach(function (b) {
				if (b && b.event && b.event.id == enemy.id) lastOne = false;
			})
			if (!lastOne) return lastOne;
		}
		return lastOne;
	}
	if (theLast()) {
		Object.keys(core.status.hero.flags).forEach(function (name) {
			if (name.indexOf("__@" + enemy.id + "@") >= 0) {
				delete core.status.hero.flags[name];
			}
		});
	}

	if (hero.hp < 200 || hero.hpmax < 50) core.plugin.getAchievement(2);
	if (damageInfo.znsf) core.plugin.getAchievement(17);
	if (!flags.noBattleHint && tips && enemyId != 'E447') {
		tips = "战斗异常提示：\n" + tips;
		tips += "\n\n你可以在帮助->高级设置里关闭战后弹出的战斗异常提示";
		core.insertAction([tips]);
	}

	// 如果已有事件正在处理中
	if (core.status.event.id == null)
		core.continueAutomaticRoute();
	else
		core.clearContinueAutomaticRoute();

},
        "afterOpenDoor": function (doorId, x, y) {
	// 开一个门后触发的事件
	if (doorId != 'greenDoor') {
		core.autoGetItem();
	}

	var todo = [];
	// 检查该点的开门后事件
	if (core.status.floorId) {
		core.push(todo, core.floors[core.status.floorId].afterOpenDoor[x + "," + y]);
	}
	// 检查批量开门事件
	var door = core.getBlockById(doorId);
	if (door && door.event.doorInfo) {
		core.push(todo, door.event.doorInfo.afterOpenDoor);
	}

	if (todo.length > 0) core.insertAction(todo, x, y);

	if (core.status.event.id == null)
		core.continueAutomaticRoute();
	else
		core.clearContinueAutomaticRoute();
},
        "afterGetItem": function (itemId, x, y, isGentleClick) {
	// 获得一个道具后触发的事件
	// itemId：获得的道具ID；x和y是该道具所在的坐标
	// isGentleClick：是否是轻按触发的
	if (itemId.endsWith('Potion') && core.material.items[itemId].cls == 'items')
		core.playSound('回血');
	else
		core.playSound('获得道具');
	core.autoGetItem();
	var todo = [];
	// 检查该点的获得道具后事件。
	if (core.status.floorId == null) return;
	var event = core.floors[core.status.floorId].afterGetItem[x + "," + y];
	if (event && (event instanceof Array || !isGentleClick || !event.disableOnGentleClick)) {
		core.unshift(todo, event);
	}

	if (todo.length > 0) core.insertAction(todo, x, y);
	switch (itemId) {
	case 'I328':
		core.plugin.getAchievement(1);
		break;
	case 'redPotion':
		if (hero.hp < 300) core.plugin.getAchievement(4);
		break;
	case 'bluePotion':
		if (hero.hp < 300) core.plugin.getAchievement(4);
		break;
	case 'I315':
	case 'I316':
	case 'I317':
	case 'I318':
	case 'I319':
		if (flags.atkm == 10) core.plugin.getAchievement(32);
		else if (flags.atkm == 34) core.plugin.getAchievement(13);
		break;
	case 'I320':
	case 'I321':
	case 'I322':
	case 'I339':
	case 'I375':
		if (flags.defm == 40) core.plugin.getAchievement(33);
		else if (flags.defm == 16) core.plugin.getAchievement(14);
		break;
	case 'I451':
		core.plugin.getAchievement(23);
		break;
	case 'moneyPocket':
		core.plugin.getAchievement(21);
		break;
	case 'skill1':
	case 'I307':
	case 'I309':
		if (flags.sxzl >= 2) core.plugin.getAchievement(12);
		break;
	case 'pickaxe':
		core.plugin.getAchievement(22);
		break;
	case 'shield3':
	case 'shield4':
	case 'shield5':
		core.plugin.getAchievement(18);
		break;
	case 'iceCube':
		core.plugin.getAchievement(11);
		break;
	case 'snow':
		core.plugin.getAchievement(6);
		break;
	case 'I398':
	case 'I400':
	case 'I403':
	case 'I407':
		if (core.itemCount('I398') + core.itemCount('I400') + core.itemCount('I403') + core.itemCount('I407') > 90) core.plugin.getAchievement(1);
		break;
	case 'knife':
		core.plugin.getAchievement(10);
		break;
	case 'redKey':
	case 'bigKey':
		if (core.itemCount('redKey') >= 16) core.plugin.getAchievement(25);
		break;
	case 'icePickaxe':
		core.plugin.getAchievement(19);
		break;
	case 'greenKey':
		if (core.itemCount('greenKey') >= 16) core.plugin.getAchievement(26);
		break;
	case 'cross':
		if (hero.mdef >= 265) core.plugin.getAchievement(29);
		break;
	case 'superPotion':
		if (core.plugin.hasAchievement(34)) core.plugin.getAchievement(35);
		else core.plugin.getAchievement(34);
		break;
	}
},
        "afterPushBox": function () {
	// 推箱子后的事件
	if (core.searchBlock('box').length == 0) {
		// 可以通过if语句来进行开门操作
		/*
		if (core.status.floorId=='xxx') { // 在某个楼层
			core.insertAction([ // 插入一条事件
				{"type": "openDoor", "loc": [x,y]} // 开门
			])
		}
		*/
	}
}
    },
    "enemys": {
        "getSpecials": function () {
	// 获得怪物的特殊属性，每一行定义一个特殊属性。
	// 分为五项，第一项为该特殊属性的数字，第二项为特殊属性的名字，第三项为特殊属性的描述
	// 第四项为该特殊属性的颜色，可以写十六进制 #RRGGBB 或者 [r,g,b,a] 四元数组
	// 第五项为该特殊属性的标记；目前 1 代表是地图类技能（需要进行遍历全图）
	// 名字和描述可以直接写字符串，也可以写个function将怪物传进去
	return [
		//[1, "先攻", "怪物首先攻击", "#ffcc33"],
		[2, function (enemy) {
			if (typeof enemy.special != "object" || enemy.special.length <= 1) return "魔法攻击";
			else if (enemy.name == '火炎大法师') return '炎魔法';
			else if (enemy.name == '极地法师') return '冰魔法';
			else return '魔法';
		}, "攻击无视主角防御力", "#bbb0ff"],
		[3, "硬化", "如主角攻击力比它基本防御力高时，它的防御力会变成主角的攻击力", "#c0b088"],
		[4, "二回攻击", "怪物每回合攻击2次", "#ffee77"],
		[5, "三回攻击", "怪物每回合攻击3次", "#ffee77"],
		[6, function (enemy) {
			if (enemy.n == 4) return "刀刀相连";
			else if (enemy.n == 6) return "触手攻击";
			else return (enemy.n || '') + "连击";
		}, function (enemy) { return "怪物每回合攻击" + (enemy.n || 4) + "次"; }, "#ffee77"],
		//[7, "破甲", function (enemy) { return "战斗前，怪物附加角色防御的" + Math.floor(100 * (enemy.defValue || core.values.breakArmor || 0)) + "%作为伤害"; }, "#b30000"],
		//[8, "反击", function (enemy) { return "战斗时，怪物每回合附加角色攻击的" + Math.floor(100 * (enemy.atkValue || core.values.counterAttack || 0)) + "%作为伤害，无视角色防御"; }, "#ffaa44"],
		//[9, "净化", function (enemy) { return "战斗前，怪物附加勇士护盾的" + (enemy.n || core.values.purify) + "倍作为伤害"; }, "#80eed6"],
		//[10, "模仿", "怪物的攻防和勇士攻防相等", "#b0c0dd"],
		//[11, "吸血", function (enemy) { return "战斗前，怪物首先吸取角色的" + Math.floor(100 * enemy.value || 0) + "%生命（约" + Math.floor((enemy.value || 0) * core.getStatus('hp')) + "点）作为伤害" + (enemy.add ? "，并把伤害数值加到自身生命上" : ""); }, "#ff00d2"],
		[12, "毒攻击", function (enemy) { return "被击中后主角有" + (enemy.atkValue || '一定') + "%几率中毒" }, "#99ee88"],
		[13, "衰弱攻击", function (enemy) { return "被击中后主角有" + (enemy.defValue || '一定') + "%几率进入衰弱状态，攻防暂时下降" + (enemy.damage || 1) + "点"; }, "#f0bbcc"],
		//[14, "诅咒", "战斗后，勇士陷入诅咒状态，战斗无法获得金币和经验", "#bbeef0"],
		//[15, "领域", function (enemy) { return "经过怪物周围" + (enemy.zoneSquare ? "九宫格" : "十字") + "范围内" + (enemy.range || 1) + "格时自动减生命" + (enemy.value || 0) + "点"; }, "#c677dd"],
		//[16, "夹击", "经过两只相同的怪物中间，勇士生命值变成一半", "#bb99ee"],
		//[17, "仇恨", "战斗前，怪物附加之前积累的仇恨值作为伤害；战斗后，释放一半的仇恨值。（每杀死一个怪物获得" + (core.values.hatred || 0) + "点仇恨值）", "#b0b666"],
		//[18, "阻击", function (enemy) { return "经过怪物周围" + (enemy.zoneSquare ? "九宫格" : "十字") + "时自动减生命" + (enemy.value || 0) + "点，同时怪物后退一格"; }, "#8888e6"],
		//[19, "自爆", "战斗后勇士的生命值变成1", "#ff6666"],
		[20, "特殊战斗", "勇士无法打败怪物，除非拥有三相之力", "#aaaaaa"],
		//[21, "退化", function (enemy) { return "战斗后勇士永久下降" + (enemy.atkValue || 0) + "点攻击和" + (enemy.defValue || 0) + "点防御"; }],
		//[22, "固伤", function (enemy) { return "战斗前，怪物对勇士造成" + (enemy.damage || 0) + "点固定伤害，未开启负伤时无视勇士护盾。"; }, "#ff9977"],
		[23, "不死", "死后由四周的邪恶能量而重生，并获得新特殊能力", "#a0e0ff"],
		//[24, "激光", function (enemy) { return "经过怪物同行或同列时自动减生命" + (enemy.value || 0) + "点"; }, "#dda0dd"],
		//[25, "光环", function (enemy) { return (enemy.range != null ? ((enemy.zoneSquare ? "该怪物九宫格" : "该怪物十字") + enemy.range + "格范围内") : "同楼层所有") + "怪物生命提升" + (enemy.value || 0) + "%，攻击提升" + (enemy.atkValue || 0) + "%，防御提升" + (enemy.defValue || 0) + "%，" + (enemy.add ? "可叠加" : "不可叠加"); }, "#e6e099", 1],
		//[26, "支援", "当周围一圈的怪物受到攻击时将上前支援，并组成小队战斗。", "#77c0b6", 1],
		//[27, "捕捉", function (enemy) { return "当走到怪物周围" + (enemy.zoneSquare ? "九宫格" : "十字") + "时会强制进行战斗。"; }, "#c0ddbb"],
		[50, "邪眼", "主角不能使用黄金之羽根", "#a349a4"],
		[51, "必杀剑", "会心一击的伤害是基本伤害的2.5倍", "#ffee77"],
		[52, "黏液拳", "主角被击中后，疲劳度会上升（每攻击一次疲劳+1）", "#bbeef0"],
		[53, "狂暴之拳", "随机攻击次数（1-3，复刻版固定为2），且主角被击中后会增加疲劳（每次攻击疲劳+1）", "#bbeef0"],
		[54, "水银拳", "被击中后会感到很疲倦（每攻击一次疲劳+3）", "#bbeef0"],
		[55, "狙击", "攻击的对象是公主而不是主角", "#80eed6"],
		[56, "雷击", "攻击会使主角因感到麻痹而疲劳（当做出有效攻击时疲劳+4）", "#bbeef0"],
		[57, "吸血攻击", function (enemy) { return "给予主角伤害的" + ((enemy.add && !flags.bugFix) ? "1/3" : "50%") + "会恢复至自身的体力" }, "#ff00d2"],
		[58, "神气合一", function () { return "被它的会心一击击中时" + (flags.bugFix ? "" : "（实际判定条件为：伤害大于怪物攻击减勇者防御）") + "，主角的气息会减去一格" }, "#bbeef0"],
		[59, "天地破坏剑", "会心一击十分厉害（会心一击伤害是基本伤害的4倍）", "#ffee77"],
		[60, "暗魔法", "攻击无视主角防御力，且主角的防御力不比它的攻击高时，攻击会三倍化；即使被攻击也不会增加气息", "#bbb0ff"],
		[61, "冰秘术", "全体魔法攻击，有7%几率使主角中毒", "#80eed6"],
		[62, "风秘术", "全体魔法攻击，攻击会恢复自身的疲倦", "#80eed6"],
		[63, "火秘术", "全体魔法攻击", "#80eed6"],
		[64, "秘术·死寂光环", "全体魔法攻击；战斗中主角不会增加气息", "#80eed6"],
		[65, "血秘术", "全体魔法攻击；攻击总伤害的一半会回复在身上", "#80eed6"],
		[66, "血魔法", "攻击无视主角防御力；给予主角伤害的50%会恢复至自身的体力", "#bbb0ff"],
		[67, "魔法剑", function () { return "会心一击很痛（会心一击伤害是基本伤害的" + (flags.bugFix ? "3" : "2") + "倍）；攻击伤害的一半会回复在身上" }, "#ff00d2"],
		[70, "炎之身体", "死后会使地上留下熔岩", "#d00000"],
		[71, "寒冰身体", "死后会使地上留下冰块", "#bbb0ff"],
		[72, "烈焰身体", "死后四周的地上会被焦成一片熔岩", "#d00000"],
		[73, "极寒身体", "死后四周的土地会冻成冰块", "#bbb0ff"],
		[74, "黄金身体", "它整个身体都是黄金，总之击败它后就是有很多钱啦！！！（掉落1600金币外加强剑之首饰）", "#e6e099"],
		[80, "催眠", "令主角攻击自己", "#c0ddbb"],
		[81, "破甲刃", "攻击会减低主角防御力，40%几率降低12点", "#b30000"],
		[82, "猛毒", "攻击有20%几率使主角中毒；如果主角已在毒状态时，它每次攻击有60%几率使攻击力与防御力提升10点（复刻版为每次必定提升6点）", "#99ee88"],
		[83, "狂战士之拳", "随机攻击次数（2-5，复刻版固定为3,...），且主角被击中后会增加疲劳（每次攻击疲劳+4）", "#bbeef0"],
		[84, "狂战士之斧", "攻击附带额外固定100伤害", "#bbb0ff"],
		[85, "硬化+", "如主角攻击力比它基本防御力高时，它的攻击力及防御力会变成主角的攻击力", "#c0b088"],
		[86, "死气", "它被攻击中时，主角会感到很疲劳（主角每击中它一次疲劳+10）", "#a349a4"],
		[87, "麻痹触手", "一回合六次攻击；被击中后主角有10%几率进入衰弱状态，攻防暂时下降4点", "#f0bbcc"],
		[88, "鬼吹灯", "攻击会扣除主角的气息40点（不足则清零），然后自身气息增加40点", "#ff6666"],
		[89, "压制", "攻击会减低主角战斗力，60%几率降低20攻击，5防御（复刻版为每次必定降低12攻3防）", "#b30000"],
		[91, "剑大师", "气息满时不暴击；顺序使用剑技：\n天灵：主角被击中后会增加疲劳8点；\n流石：主角被击中后会减少气息30点；\n深红：伤害的五分之一会回复到身上", "#ff0000"],
		[92, "盾大师", "气息满时不暴击；顺序使用防御技：\n镜膜盾：所受伤害减半；\n结晶盾：主角下一回合不能行动；\n反射盾：伤害的四分之一反射在主角身上", "#0000ff"],
		[93, "超负荷魔力", function () { return (flags.bugFix ? "" : "普通") + "攻击时发出的魔力术击会在主角和公主之间跳弹并做成伤害，每次弹跳的伤害减少20%，总共跳弹四次" }, "#00ff00"]
	];
},
        "getEnemyInfo": function (enemy, hero, x, y, floorId) {
	// 获得某个怪物变化后的数据；该函数将被伤害计算和怪物手册使用
	// 例如：坚固、模仿、仿攻等等
	// 
	// 参数说明：
	// enemy：该怪物信息
	// hero_hp,hero_atk,hero_def,hero_mdef：勇士的生命攻防护盾数据
	// x,y：该怪物的坐标（查看手册和强制战斗时为undefined）
	// floorId：该怪物所在的楼层
	// 后面三个参数主要是可以在光环等效果上可以适用（也可以按需制作部分范围光环效果）
	floorId = floorId || core.status.floorId;
	var hero_hp = core.getRealStatusOrDefault(hero, 'hp'),
		hero_atk = core.getRealStatusOrDefault(hero, 'atk'),
		hero_def = core.getRealStatusOrDefault(hero, 'def'),
		hero_mdef = core.getRealStatusOrDefault(hero, 'mdef');

	var mon_hp = core.getEnemyValue(enemy, 'hp', x, y, floorId),
		mon_atk = core.getEnemyValue(enemy, 'atk', x, y, floorId),
		mon_def = core.getEnemyValue(enemy, 'def', x, y, floorId),
		mon_special = core.getEnemyValue(enemy, 'special', x, y, floorId);
	var mon_money = core.getEnemyValue(enemy, 'money', x, y, floorId),
		mon_exp = core.getEnemyValue(enemy, 'exp', x, y, floorId),
		mon_point = core.getEnemyValue(enemy, 'point', x, y, floorId);
	// 模仿
	if (core.hasSpecial(mon_special, 10)) {
		mon_atk = hero_atk;
		mon_def = hero_def;
	}
	// 坚固
	if (core.hasSpecial(mon_special, 3) && mon_def < hero_atk) {
		mon_def = hero_atk;
	}
	if (core.hasSpecial(mon_special, 85) && mon_def < hero_atk) {
		mon_def = hero_atk;
		mon_atk = hero_atk;
	}

	if (core.hasSpecial(mon_special, 60) && mon_atk >= hero_def) mon_atk *= 3;

	var guards = [];

	// 光环和支援检查
	if (!core.status.checkBlock) core.status.checkBlock = {};

	if (core.status.checkBlock.needCache) {
		// 从V2.5.4开始，对光环效果增加缓存，以解决多次重复计算的问题，从而大幅提升运行效率。
		var hp_buff = 0,
			atk_buff = 0,
			def_buff = 0;
		// 已经计算过的光环怪ID列表，用于判定叠加
		var usedEnemyIds = {};
		// 检查光环和支援的缓存
		var index = x != null && y != null ? (x + "," + y) : "floor";
		if (!core.status.checkBlock.cache) core.status.checkBlock.cache = {};
		var cache = core.status.checkBlock.cache[index];
		if (!cache) {
			// 没有该点的缓存，则遍历每个图块
			core.extractBlocks(floorId);
			core.status.maps[floorId].blocks.forEach(function (block) {
				if (!block.disable) {
					// 获得该图块的ID
					var id = block.event.id,
						enemy = core.material.enemys[id];
					// 检查【光环】技能，数字25
					if (enemy && core.hasSpecial(enemy.special, 25)) {
						// 检查是否是范围光环
						var inRange = enemy.range == null;
						if (enemy.range != null && x != null && y != null) {
							var dx = Math.abs(block.x - x),
								dy = Math.abs(block.y - y);
							// 检查十字和九宫格光环
							if (dx + dy <= enemy.range) inRange = true;
							if (enemy.zoneSquare && dx <= enemy.range && dy <= enemy.range) inRange = true;
						}
						// 检查是否可叠加
						if (inRange && (enemy.add || !usedEnemyIds[enemy.id])) {
							hp_buff += enemy.value || 0;
							atk_buff += enemy.atkValue || 0;
							def_buff += enemy.defValue || 0;
							usedEnemyIds[enemy.id] = true;
						}
					}
					// 检查【支援】技能，数字26
					if (enemy && core.hasSpecial(enemy.special, 26) &&
						// 检查支援条件，坐标存在，距离为1，且不能是自己
						// 其他类型的支援怪，比如十字之类的话.... 看着做是一样的
						x != null && y != null && Math.abs(block.x - x) <= 1 && Math.abs(block.y - y) <= 1 && !(x == block.x && y == block.y)) {
						// 记录怪物的x,y，ID
						guards.push([block.x, block.y, id]);
					}

					// TODO：如果有其他类型光环怪物在这里仿照添加检查
					// 注：新增新的类光环属性（需要遍历全图的）需要在特殊属性定义那里的第五项写1，参见光环和支援的特殊属性定义。
				}
			});

			core.status.checkBlock.cache[index] = { "hp_buff": hp_buff, "atk_buff": atk_buff, "def_buff": def_buff, "guards": guards };
		} else {
			// 直接使用缓存数据
			hp_buff = cache.hp_buff;
			atk_buff = cache.atk_buff;
			def_buff = cache.def_buff;
			guards = cache.guards;
		}

		// 增加比例；如果要增加数值可以直接在这里修改
		mon_hp *= (1 + hp_buff / 100);
		mon_atk *= (1 + atk_buff / 100);
		mon_def *= (1 + def_buff / 100);
	}

	// TODO：可以在这里新增其他的怪物数据变化
	// 比如仿攻（怪物攻击不低于勇士攻击）：
	// if (core.hasSpecial(mon_special, 27) && mon_atk < hero_atk) {
	//     mon_atk = hero_atk;
	// }
	// 也可以按需增加各种自定义内容

	return {
		"hp": Math.floor(mon_hp),
		"atk": Math.floor(mon_atk),
		"def": Math.floor(mon_def),
		"money": Math.floor(mon_money),
		"exp": Math.floor(mon_exp),
		"point": Math.floor(mon_point),
		"special": mon_special,
		"guards": guards, // 返回支援情况
	};
},
        "getDamageInfo": function (enemy, hero, x, y, floorId) {
	// 获得战斗伤害信息（实际伤害计算函数）
	// 
	// 参数说明：
	// enemy：该怪物信息
	// hero：勇士的当前数据；如果对应项不存在则会从core.status.hero中取。
	// x,y：该怪物的坐标（查看手册和强制战斗时为undefined）
	// floorId：该怪物所在的楼层
	// 后面三个参数主要是可以在光环等效果上可以适用
	floorId = floorId || core.status.floorId;
	if (typeof enemy == 'string') enemy = core.material.enemys[enemy];

	var hero_hp = core.getRealStatusOrDefault(hero, 'hp'),
		hero_atk = core.getRealStatusOrDefault(hero, 'atk'),
		hero_def = core.getRealStatusOrDefault(hero, 'def'),
		hero_mdef = core.getRealStatusOrDefault(hero, 'mdef'),
		hero_mana = core.status.hero.mana;
	if (hero && 'mana' in hero) hero_mana = hero.mana;

	// 勇士的负属性都按0计算
	hero_hp = Math.max(0, hero_hp);
	hero_atk = Math.max(0, hero_atk);
	hero_def = Math.max(0, hero_def);
	hero_mdef = Math.max(0, hero_mdef);
	// 怪物的各项数据
	// 对坚固模仿等处理扔到了脚本编辑-getEnemyInfo之中
	var enemyInfo = core.enemys.getEnemyInfo(enemy, hero, x, y, floorId);
	var mon_hp = enemyInfo.hp,
		mon_atk = enemyInfo.atk,
		mon_def = enemyInfo.def,
		sp = core.clone(enemyInfo.special),
		poi = false,
		weakPt = 0;
	if (core.enemys.hasSpecial(sp, 12) || core.enemys.hasSpecial(sp, 61) || core.enemys.hasSpecial(sp, 82)) poi = true;
	if (core.enemys.hasSpecial(sp, 13) || core.enemys.hasSpecial(sp, 87)) weakPt = (enemy.damage || 1);

	// 技能预处理
	[61, 62, 64, 65].forEach(function (x) { if (core.hasSpecial(sp, x)) sp.push(63) });
	[60, 63, 66].forEach(function (x) { if (core.hasSpecial(sp, x)) sp.push(2) });
	[65, 66, 67].forEach(function (x) { if (core.hasSpecial(sp, x)) sp.push(57) });

	var s = {
		"h": {
			"hp": hero_hp,
			"atk": hero_atk,
			"def": hero_def,
			"tired": 0,
			"mana": hero_mana,
			"mmax": core.status.hero.manamax,
			"mmm": core.status.hero.manamax / 6,
			"defBuff": [],
			"fmana": 0,
			"res": '',
			"overCharge": core.getFlag('overCharge', 0)
		},
		"p": {
			"hp": core.status.hero.hpmax,
			"def": hero_mdef
		},
		"m": {
			"hp": mon_hp,
			"atk": mon_atk,
			"def": mon_def,
			"tired": 0,
			"mana": 0,
			"mmax": enemy.value || 0,
			"sp": sp,
			"poi": poi,
			"weakPt": weakPt,
			"vampireRate": ((enemy.add && !flags.bugFix) ? 3 : 2),
			"rock": ["石头怪", "铁怪", "鬼邪石"].indexOf(enemy.name || '') >= 0
		},
		"turn": 0,
		"skillBar": ""
	}

	var h = s.h,
		m = s.m,
		p = s.p;

	core.setKiMana(h);
	h.res = ('start:' + h.ki + '+' + h.charge);

	var maxturn = mon_hp * 10;

	var skillstr = core.myFormatSkill(core.getFlag('skillName', ''), false, true),
		skill = '',
		Zi = '',
		Xi = '';

	switch (core.getEquip(0)) {
	case 'I315':
		Zi = 1;
		break;
	case 'I319':
		Zi = 2;
		break;
	case 'I318':
		Zi = 3;
		break;
	case 'I317':
		Zi = 4;
		break;
	case 'I316':
		Zi = 5;
		break;
	}
	h.Zi = Zi;

	switch (core.getEquip(1)) {
	case 'I339':
		Xi = 1;
		break;
	case 'I321':
		Xi = 2;
		break;
	case 'I375':
		Xi = 3;
		break;
	case 'I322':
		Xi = 4;
		break;
	case 'I320':
		Xi = 5;
		break;
	}

	var mon_freq = 1;
	if (core.hasSpecial(sp, 4)) mon_freq = 2;
	if (core.hasSpecial(sp, 5)) mon_freq = 3;
	if (core.hasSpecial(sp, 6)) mon_freq = (enemy.n || 4);
	if (core.hasSpecial(sp, 87)) mon_freq = 6;

	if (core.hasSpecial(sp, 20)) {
		s.turn++;
		skillstr = core.removeStopper(skillstr, s.turn, s);
		skillstr = core.deepBreath(s, skillstr);
		if (skillstr.substr(0, 2) == '-C') {
			var s1 = core.clone(s),
				s2 = core.clone(s);
			if (core.heroAtk(s1, 'C').m.hp <= 0 && core.heroAtk(s2, '').m.hp > 0) {
				skillstr = skillstr.substr(1);
				s.skillBar += '-';
			}
		}
		skill = skillstr.substr(0, 1);
		if ('CZA'.indexOf(skill) >= 0) skillstr = skillstr.substr(1);
		else skill = '';
		if (skill == 'Z') {
			var skilli = skillstr.substr(0, 1);
			if (/[1-5]/.test(skilli)) {
				skill += skilli;
				skillstr = skillstr.substr(1);
				if (core.hasItem('I326')) h.Zi = skilli;
			} else skill += Zi;
		}
		core.heroAtk(s, skill);
		var sxzl = flags.sxzl;
		if (sxzl >= 3) m.hp = 0;
		else if (m.hp > 0) {
			if (sxzl <= 0) return null;
			else {
				if (core.hasItem('knife')) sxzl += 2;
				switch (enemy.id) {
				case 'swordEmperor':
					if (sxzl < 4 || core.hasItem('skill1')) return null;
					break;
				case 'silverSlime':
					if (sxzl < 4) return null;
					break;
				case 'goldHornSlime':
					if (sxzl <= 1) h.hp -= Math.ceil(m.hp / 3 * 5) * m.atk;
					else if (sxzl <= 2) h.hp -= Math.ceil(m.hp / 3) * m.atk;
					break;
				case 'whiteHornSlime':
					if (sxzl <= 1) h.hp -= Math.ceil(m.hp * 1.4) * m.atk;
					else if (sxzl <= 2) h.hp -= Math.ceil(m.hp / 4) * m.atk;
					break;
				default:
					return null;
				}
				m.hp = 0;
			}
		}
	}

	var canFight = true,
		prinSkill = false;
	if (h.atk + core.getFlag('atkm', 10) < m.def) canFight = (m.hp == 0);
	if (core.getEquip(1) == 'I375' && skillstr.indexOf("X") >= 0) canFight = true;
	if (core.hasItem('I325')) {
		[55, 61, 62, 63, 64, 65].forEach(function (e) {
			if (core.hasSpecial(sp, e)) prinSkill = true;
		});
	}
	if (prinSkill) canFight = true;
	if (core.hasItem('I327') && core.canEquip('I375') && skillstr.indexOf("X3") >= 0) canFight = true;
	if (!canFight) return null;

	var s0, sx = 0,
		mon_loop = 1;
	[83, 89].forEach(function (e) {
		if (core.hasSpecial(sp, e)) mon_loop = 2;
	});
	[81, 91, 92].forEach(function (e) {
		if (core.hasSpecial(sp, e)) mon_loop = 3;
	});

	for (s.turn = 1; s.turn <= maxturn; s.turn++) {
		if (m.hp <= 0) { s.turn--; break; }
		if (s.turn == 11) skillstr = core.myReplaceAll(skillstr, '-C', '');
		// 预处理：直接进循环会降低性能
		// 对于重复出现的战斗情况直接简化计算
		// sx: 0,沉默;1,下回合采集s;2,采集完成;3,结束
		if (s0 && sx == 2 && s0.m.mana == m.mana && s0.mdmg == s.mdmg && s0.hdmg == s.hdmg && s0.pdmg == s.pdmg && (s0.turn - s.turn) % mon_loop == 0 && h.tired < 100 && m.tired < 100 && m.hp > 0 && !core.hasSpecial(sp, 81) && !core.hasSpecial(sp, 89)) {
			var h_tired = h.tired - s0.h.tired,
				m_tired = m.tired - s0.m.tired,
				m_hp = s0.m.hp - m.hp;
			var t = 10000;
			if (h_tired > 0) t = Math.min(t, Math.ceil((100 - h.tired) / h_tired) - 1);
			if (m_tired > 0) t = Math.min(t, Math.ceil((100 - m.tired) / m_tired) - 1);
			if (m_hp > 0) t = Math.min(t, Math.ceil(m.hp / m_hp) - 1);
			h.tired += t * h_tired;
			m.tired += t * m_tired;
			m.hp -= t * m_hp;
			h.hp -= t * (s0.h.hp - h.hp);
			p.hp -= t * (s0.p.hp - p.hp);
			core.setKiMana(h);
			core.setKiMana(s0.h);
			core.chargeKi(h, t * (Math.floor(h.mana) - Math.floor(s0.h.mana)));
			s.turn += t * (s.turn - s0.turn);
			sx++;
		}
		if (sx == 1) {
			s0 = core.clone(s);
			sx++;
		}
		if (!sx && skillstr.length == 0 && h.defBuff == 0 && (m.mana == 0 || m.mana == m.mmax) && s.turn > 5) sx = 1;

		// 疲劳杀，直接得出结果
		if (m.tired >= 100 && h.tired < 100 && !core.hasSpecial(sp, 86) && h.atk + core.getFlag('atkm', 10) >= m.def && skillstr.length == 0) {
			var t = m.hp;
			if (h.atk > m.def) {
				t = Math.ceil(m.hp / (h.atk - m.def));
				core.chargeKi(h, t * Math.floor(0.5 + m.def * 10 / h.atk));
			}
			s.turn += t;
			m.hp = 0;
		}
		if ((h.tired >= 100 || h.atk + core.getFlag('atkm', 10) < m.def) && skillstr.length == 0 && !prinSkill) return null;
		// 预处理结束
		if (m.hp <= 0) { s.turn--; break; }
		skillstr = core.removeStopper(skillstr, s.turn, s);
		skillstr = core.deepBreath(s, skillstr);
		if (h.freeze) h.freeze--;
		else {
			// 读取本回合的技能
			if (skillstr.substr(0, 2) == '-C') {
				var s1 = core.clone(s), // JSON.parse(JSON.stringify(s))
					s2 = core.clone(s);
				if (core.heroAtk(s1, 'C').m.hp <= 0 && core.heroAtk(s2, '').m.hp > 0) {
					skillstr = skillstr.substr(1);
					s.skillBar += '-';
				}
			}
			skill = skillstr.substr(0, 1);
			if ('CZA'.indexOf(skill) >= 0) skillstr = skillstr.substr(1);
			else skill = '';
			if (skill == 'Z') {
				var skilli = skillstr.substr(0, 1);
				if (/[1-5]/.test(skilli)) {
					skill += skilli;
					skillstr = skillstr.substr(1);
					if (core.hasItem('I326')) h.Zi = skilli;
				} else skill += Zi;
			}
			// 开始结算
			// 			if (skill == 'Z1') { // 检测凡骨是否有效
			// 				var s1 = core.clone(s);
			// 				if (core.heroAtk(s1, skill).mdmg < core.status.hero.lv) skill = '';
			// 			}
			core.heroAtk(s, skill);
			if (m.hp <= 0) break;
		}

		// 怪物的回合
		if (m.freeze) m.freeze--;
		else {
			if (core.hasSpecial(sp, 83)) {
				if (mon_freq == 2) mon_freq++;
				else mon_freq = 2;
			}
			for (var i = 1; i <= mon_freq; i++) {
				if (!m.freeze) {
					skillstr = core.deepBreath(s, skillstr);
					// 读取本回合的技能
					skill = skillstr.substr(0, 1);
					if ('XD'.indexOf(skill) >= 0) skillstr = skillstr.substr(1);
					else skill = '';
					if (skill == 'X') {
						var skilli = skillstr.substr(0, 1);
						if (/[1-5]/.test(skilli)) {
							skill += skilli;
							skillstr = skillstr.substr(1);
							if (core.hasItem('I326')) Xi = skilli;
						} else skill += Xi;
					}
					core.monAtk(s, skill);
					if (m.hp <= 0) break;
					if (core.hasSpecial(sp, 93) && m.sp2) {
						for (var j = 1; j <= 3; j++) {
							core.monAtk(s);
							if (m.hp <= 0) break;
						}
					}
				}
			}
		}
	}
	if (m.hp > 0) return null;
	h.res += (',end:' + h.ki + '+' + h.charge);
	var hdmg = Math.floor(hero_hp - h.hp),
		pdmg = Math.floor(core.status.hero.hpmax - s.p.hp);
	core.setKiMana(h);
	return {
		"mon_hp": Math.floor(mon_hp),
		"mon_atk": Math.floor(mon_atk),
		"mon_def": Math.floor(mon_def),
		"init_damage": 0,
		"per_damage": 0,
		"hero_per_damage": 0,
		"turn": Math.floor(s.turn),
		"damage": hdmg + pdmg,
		"mana": h.mana,
		"flowMana": Math.floor(h.fmana),
		"manaResult": h.res,
		"hdmg": hdmg,
		"pdmg": pdmg,
		"skill": core.myFormatSkill(s.skillBar),
		"overCharge": h.overCharge,
		"ic": s.ic && enemy.id == "bluePriest",
		"znsf": s.znsf
	};
}
    },
    "actions": {
        "onKeyUp": function (keyCode, altKey) {
	// 键盘按键处理，可以在这里自定义快捷键列表
	// keyCode：当前按键的keyCode（每个键的keyCode自行百度）
	// altKey：Alt键是否被按下，为true代表同时按下了Alt键
	// 可以在这里任意增加或编辑每个按键的行为

	// 如果处于正在行走状态，则不处理
	if (core.isMoving())
		return;

	// Alt+0~9，快捷换上套装
	if (0 && altKey && keyCode >= 48 && keyCode <= 57) {
		core.items.quickLoadEquip(keyCode - 48);
		return;
	}

	var xinxin = false;
	if (altKey) xinxin = !xinxin;
	if (flags.xinHotkey) xinxin = !xinxin;

	if ((keyCode >= 49 && keyCode <= 56) || (keyCode >= 97 && keyCode <= 104)) {
		var i = keyCode - 48;
		if (i > 10) i -= 48;
		if (!altKey || i == 8) {
			core.status.route.push("key:" + keyCode);
			core.useItem('A' + i, true);
		} else {
			switch (i) {
			case 1:
				core.openBook(true);
				break;
			case 2:
				core.useFly(true);
				break;
			case 3:
				core.openEquipbox(true);
				break;
			case 4:
				core.openQuickShop(true);
				break;
			case 5: // 5：读取自动存档（回退），方便手机版操作
				core.doSL("autoSave", "load");
				break;
			case 6: // 6：撤销回退，方便手机版操作
				core.doSL("autoSave", "reload");
				break;
			case 7:
				core.status.route.push("key:85");
				core.insertCommonEvent('高级设置');
				break;
			}
		}
		return;
	}

	var hotkeyHint1 = "新新快捷键：\n";
	if (!flags.xinHotkey) hotkeyHint1 += "(你选择H5快捷键优先，使用新新快捷键时，若与H5快捷键冲突，则需要按住Alt键；按U进入高级设置修改优先的快捷键)\n";
	hotkeyHint1 += "S=音乐开关\nR=重新开始\n[=保存进度\n]=载入进度\nA=查看成就\nD=查看怪物能力\nF=飞行\nW=剑技装备\nH=防御术装备\nG=启动体力转换器\nB=查看道具袋\n\n随意门直接撞紫门即可"
	var hotkeyHint2 = "H5重要快捷键：\n";
	if (flags.xinHotkey) hotkeyHint2 += "(你选择新新快捷键优先，使用H5快捷键时，若与新新快捷键冲突，则需要按住Alt键；按U进入高级设置修改优先的快捷键)\n";
	hotkeyHint2 += "A=单步回退\nW=取消单步回退\nS=存档\nD=读档\nG=楼层传送\nX=怪物手册\nV=快捷商店\n\nZ=转身\n空格=取面前物品\nH=查看所有H5快捷键";
	var hotkeyHint = [hotkeyHint1, hotkeyHint2];

	// 根据keyCode值来执行对应操作
	switch (keyCode) {
	case 76:
	case 89: // L,Y：打开新新快捷键列表
		core.insertAction(hotkeyHint);
		break;
	case 85: // U：打开高级设置
		core.status.route.push("key:85");
		core.insertCommonEvent('高级设置');
		break;
	case 57: // 9：打开技能输入
		core.status.route.push("key:57");
		core.insertCommonEvent('设置技能');
		break;
	case 27: // ESC：打开菜单栏
		core.openSettings(true);
		break;
	case 88: // X：使用怪物手册
		core.openBook(true);
		break;
	case 71: // G：使用楼传器
		if ((xinxin && core.canUseItem('I451')) || core.isReplaying()) {
			core.status.route.push("key:71");
			core.useItem('I451', true);
		} else core.useFly(true);
		break;
	case 65: // A：读取自动存档（回退）
		if ((xinxin && core.canUseItem('I453')) || core.isReplaying()) {
			core.status.route.push("key:65");
			core.useItem('I453', true);
		} else core.doSL("autoSave", "load");
		break;
	case 87: // W：撤销回退
		if (xinxin) core.openEquipbox(true);
		else core.doSL("autoSave", "reload");
		break;
	case 83: // S：存档
		if (xinxin) core.triggerBgm();
		else core.save(true);
		break;
	case 219:
		core.save(true);
		break;
	case 68: // D：读档
		if (xinxin) core.openBook(true);
		else core.load(true);
		break;
	case 221:
		core.load(true);
		break;
	case 69: // E：打开光标
		core.ui._drawCursor();
		break;
	case 84: // T：打开道具栏
		core.openToolbox(true);
		break;
	case 81: // Q：打开装备栏
		core.openEquipbox(true);
		break;
	case 90: // Z：转向
		core.turnHero();
		break;
	case 86: // V：打开快捷商店列表
		core.openQuickShop(true);
		break;
	case 32: // SPACE：轻按
		core.getNextItem();
		break;
	case 82: // R：回放录像
		if (xinxin) core.confirmRestart();
		else core.ui._drawReplay();
		break;
	case 33:
	case 34: // PgUp/PgDn：浏览地图
		core.ui._drawViewMaps();
		break;
	case 66: // B：打开数据统计
		if ((xinxin && core.canUseItem('moneyPocket')) || core.isReplaying()) {
			core.status.route.push("key:66");
			core.useItem('moneyPocket', true);
		} else core.ui._drawStatistics();
		break;
	case 72: // H：打开帮助页面
		if (xinxin) core.openEquipbox(true);
		else core.ui._drawHelp();
		break;
	case 77: // M：打开存档笔记
		core.actions._clickNotes_show();
		break;
	case 78: // N：重新开始
		core.confirmRestart();
		break;
	case 79: // O：查看工程
		core.actions._clickGameInfo_openProject();
		break;
	case 80: // P：游戏主页
		core.actions._clickGameInfo_openComments();
		break;
	case 49: // 快捷键1: 破
		if (core.hasItem('pickaxe')) {
			core.status.route.push("key:49"); // 将按键记在录像中
			core.useItem('pickaxe', true); // 第二个参数true代表该次使用道具是被按键触发的，使用过程不计入录像
		}
		break;
	case 50: // 快捷键2: 炸
		if (core.hasItem('bomb')) {
			core.status.route.push("key:50"); // 将按键记在录像中
			core.useItem('bomb', true); // 第二个参数true代表该次使用道具是被按键触发的，使用过程不计入录像
		}
		break;
	case 51: // 快捷键3: 飞
		if (core.hasItem('centerFly')) {
			core.ui._drawCenterFly();
		}
		break;
	case 52: // 快捷键4：破冰/冰冻/地震/上下楼器/... 其他道具依次判断
		{
			var list = ["icePickaxe", "freezeBadge", "earthquake", "upFly", "downFly", "jumpShoes", "lifeWand", "poisonWine", "weakWine", "curseWine", "superWine"];
			for (var i = 0; i < list.length; i++) {
				var itemId = list[i];
				if (core.canUseItem(itemId)) {
					core.status.route.push("key:52");
					core.useItem(itemId, true);
					break;
				}
			}
		}
		break;
	case 53: // 5：读取自动存档（回退），方便手机版操作
		core.doSL("autoSave", "load");
		break;
	case 54: // 6：撤销回退，方便手机版操作
		core.doSL("autoSave", "reload");
		break;
	case 55: // 快捷键7：绑定为轻按，方便手机版操作
		core.getNextItem();
		break;
	case 118: // F7：开启debug模式
		core.debug();
		break;
	case 70: // F：开启技能“二倍斩”
		// 检测是否拥有“二倍斩”这个技能道具
		if (xinxin) core.useFly(true);
		else {
			core.status.route.push("key:56");
			core.useItem('A8', true);
		}
		break;
		// 在这里可以任意新增或编辑已有的快捷键内容
		/*
		case 0: // 使用该按键的keyCode
			// 还可以再判定altKey是否被按下，即 if (altKey) { ...

			// ... 在这里写你要执行脚本
			// **强烈建议所有新增的自定义快捷键均能给个对应的道具可点击，以方便手机端的行为**
			if (core.hasItem('...')) {
				core.status.route.push("key:0");
				core.useItem('...', true); // 增加true代表该使用道具不计入录像
			}

			break;
		*/
	}

},
        "onStatusBarClick": function (px, py, vertical) {
	// 点击状态栏时触发的事件，仅在自绘状态栏开启时生效
	// px和py为点击的像素坐标
	// vertical为录像播放过程中的横竖屏信息
	// 
	// 横屏模式下状态栏的画布大小是 129*416
	// 竖屏模式下状态栏的画布大小是 416*(32*rows+9) 其中rows为状态栏行数，即全塔属性中statusCanvasRowsOnMobile值
	// 可以使用 _isVertical() 来判定当前是否是竖屏模式

	// 判定当前是否是竖屏模式。录像播放过程中可能会记录当时的横竖屏信息以覆盖。
	var _isVertical = function () {
		if (core.isReplaying() && vertical != null) return vertical;
		return core.domStyle.isVertical;
	}
	// 如果正在执行事件，则忽略
	if (core.status.lockControl) return;
	// 如果当前正在行走，则忽略；也可以使用 core.waitHeroToStop(callback) 来停止行走再回调执行脚本
	if (core.isMoving()) return;

	// 判定px和py来执行自己的脚本内容.... 注意横竖屏
	// 样例一：点击某个区域后使用一个道具
	/*
	if (core.hasItem("pickaxe")) {
		if (_isVertical()) {
			// 竖屏模式下
			if (px >= 200 && px <= 250 && py >= 50 && py <= 100) {
				core.useItem("pickaxe");
			}
		} else {
			// 横屏模式下
			if (px >= 50 && px <= 100 && py >= 200 && py <= 250) {
				core.useItem("pickaxe");
			}
		}
	}
	*/

	// 样例二：点击某个区域后执行一段公共事件或脚本
	/*
	if (core.hasFlag("xxx")) {
		if (_isVertical()) {
			// 竖屏模式下
			if (px >= 200 && px <= 250 && py >= 50 && py <= 100) {
				// 记录点击坐标。这里的1代表此时是竖屏！
				core.status.route.push("click:1:" + px + ":" + py);

				// 可以插入公共事件 / 普通事件 / 执行一段脚本（如打开自绘UI或增减flag）
				core.insertCommonEvent("道具商店");
				// core.insertAction(["一段事件"]);
				// core.openItemShop("shop1");
			}
		} else {
			// 横屏模式下
			if (px >= 50 && px <= 100 && py >= 200 && py <= 250) {
				// 记录点击坐标。这里的0代表此时是横屏！
				core.status.route.push("click:0:" + px + ":" + py);

				// 可以插入公共事件 / 普通事件 / 执行一段脚本（如打开自绘UI或增减flag）
				core.insertCommonEvent("道具商店");
				// core.insertAction(["一段事件"]);
				// core.openItemShop("shop1");
			}
		}
	}
	*/

}
    },
    "control": {
        "saveData": function () {
	// 存档操作，此函数应该返回“具体要存档的内容”

	// 差异化存储values
	var values = {};
	for (var key in core.values) {
		if (!core.same(core.values[key], core.data.values[key]))
			values[key] = core.clone(core.values[key]);
	}

	// 要存档的内容
	var data = {
		'floorId': core.status.floorId,
		'hero': core.clone(core.status.hero),
		'hard': core.status.hard,
		'maps': core.maps.saveMap(),
		'route': core.encodeRoute(core.status.route),
		'values': values,
		'version': core.firstData.version,
		'guid': core.getGuid(),
		"time": new Date().getTime()
	};

	return data;
},
        "loadData": function (data, callback) {
	// 读档操作；从存储中读取了内容后的行为

	// 重置游戏和路线
	core.resetGame(data.hero, data.hard, data.floorId, core.maps.loadMap(data.maps, null, data.hero.flags), data.values);
	core.status.route = core.decodeRoute(data.route);
	core.control._bindRoutePush();
	// 文字属性，全局属性
	core.status.textAttribute = core.getFlag('textAttribute', core.status.textAttribute);
	var toAttribute = core.getFlag('globalAttribute', core.status.globalAttribute);
	if (!core.same(toAttribute, core.status.globalAttribute)) {
		core.status.globalAttribute = toAttribute;
		core.resize();
	}
	// 重置音量
	core.events.setVolume(core.getFlag("__volume__", 1), 0);
	// 加载勇士图标
	var icon = core.status.hero.image;
	icon = core.getMappedName(icon);
	if (core.material.images.images[icon]) {
		core.material.images.hero = core.material.images.images[icon];
		core.material.icons.hero.width = core.material.images.images[icon].width / 4;
		core.material.icons.hero.height = core.material.images.images[icon].height / 4;
	}
	core.setFlag('__fromLoad__', true);

	// TODO：增加自己的一些读档处理

	// 切换到对应的楼层
	core.changeFloor(data.floorId, null, data.hero.loc, 0, function () {
		// TODO：可以在这里设置读档后播放BGM
		if (core.hasFlag("__bgm__")) { // 持续播放
			core.playBgm(core.getFlag("__bgm__"));
		}

		core.removeFlag('__fromLoad__');
		if (callback) callback();
	});
},
        "getStatusLabel": function (name) {
	// 返回某个状态英文名的对应中文标签，如atk -> 攻击，def -> 防御等。
	// 请注意此项仅影响 libs/ 下的内容（如绘制怪物手册、数据统计等）
	// 自行定义的（比如获得道具效果）中用到的“攻击+3”等需要自己去对应地方修改

	return {
		name: "名称",
		lv: "等级",
		hpmax: "生命上限",
		hp: "生命",
		manamax: "魔力上限",
		mana: "魔力",
		atk: "攻击",
		def: "防御",
		mdef: "护盾",
		money: "金币",
		exp: "经验",
		point: "加点",
		steps: "步数",
	} [name] || name;
},
        "triggerDebuff": function (action, type) {
	// 毒衰咒效果的获得与解除
	// action：获得还是解除；'get'表示获得，'remove'表示解除
	// type：一个数组表示获得了哪些毒衰咒效果；poison, weak，curse
	if (!(type instanceof Array)) type = [type];

	if (action == 'get') {
		if (core.inArray(type, 'poison') && !core.hasFlag("poison") && (flags.bugFix || !core.hasFlag('weak'))) {
			// 获得毒效果
			core.setFlag('poison', true);
		}
		if (core.inArray(type, 'weak') && (flags.bugFix || !core.hasFlag('poison'))) {
			// 获得衰效果
			core.setFlag('weak', true);
			if (core.values.weakValue >= 1) {
				// >=1，直接扣数值
				core.addStatus('atk', -core.getFlag('weakV', 1));
				core.addStatus('def', -core.getFlag('weakV', 1));
				core.addFlag('weakValue', core.getFlag('weakV', 1));
			} else {
				// <1，扣比例
				core.addBuff('atk', -core.values.weakValue);
				core.addBuff('def', -core.values.weakValue);
			}
		}
		if (core.inArray(type, 'curse') && !core.hasFlag('curse')) {
			// 获得咒效果
			core.setFlag('curse', true);
		}
	} else if (action == 'remove') {
		if (core.inArray(type, "poison") && core.hasFlag("poison")) {
			// 移除毒效果
			core.setFlag("poison", false);
		}
		if (core.inArray(type, "weak") && core.hasFlag("weak")) {
			// 移除衰效果
			core.setFlag("weak", false);
			if (core.values.weakValue >= 1) {
				// >=1，直接扣数值
				core.addStatus('atk', core.getFlag('weakValue', 0));
				core.addStatus('def', core.getFlag('weakValue', 0));
				core.setFlag('weakValue', 0);
			} else {
				// <1，扣比例
				core.addBuff('atk', core.values.weakValue);
				core.addBuff('def', core.values.weakValue);
			}
		}
		if (core.inArray(type, "curse") && core.hasFlag("curse")) {
			// 移除咒效果
			core.setFlag("curse", false);
		}
	}
},
        "updateStatusBar": function () {
	// 更新状态栏

	// 检查等级
	core.events.checkLvUp();

	// 检查HP上限
	if (false && core.flags.statusBarItems.indexOf('enableHPMax') >= 0) {
		core.setStatus('hp', Math.min(core.getRealStatus('hpmax'), core.getStatus('hp')));
	}

	// 设置楼层名
	if (core.status.floorId) {
		var floorHTML = '公主未入队';
		if (hero.mdef > 0) floorHTML = hero.hpmax + ';' + hero.mdef;
		core.setStatusBarInnerHTML('floor', floorHTML);
	}

	// 设置勇士名字和图标
	core.setStatusBarInnerHTML('name', core.getStatus('name'));
	// 设置等级名称
	core.setStatusBarInnerHTML('lv', core.getLvName());

	// 设置生命上限、生命值、攻防护盾金币和经验值
	var statusList = ['hpmax', 'hp', 'atk', 'def', 'mdef', 'money', 'exp'];
	statusList.forEach(function (item) {
		// 向下取整
		core.status.hero[item] = Math.floor(core.status.hero[item]);
		// 大数据格式化
		core.setStatusBarInnerHTML(item, core.status.hero[item]);
	});
	var statusList = ['atk', 'def'];
	statusList.forEach(function (item) {
		// 向下取整
		core.status.hero[item] = Math.floor(core.status.hero[item]);
		// 大数据格式化
		core.setStatusBarInnerHTML(item, core.status.hero[item] + core.getFlag('weakValue', 0));
	});

	if (core.status.hero.mdef <= 0) {
		core.setStatusBarInnerHTML('hpmax', '公主未入队');
		core.setStatusBarInnerHTML('mdef', '公主未入队');
	}


	// 设置魔力值; status:manamax 只有在非负时才生效。
	if (core.status.hero.manamax != null && core.getRealStatus('manamax') >= 0) {
		var h = { "mana": core.status.hero.mana, "mmm": core.status.hero.manamax / 6 };
		core.setKiMana(h);
		core.setStatusBarInnerHTML('mana', h.ki);
		if (!main.replayChecking && 1 > 0) {
			var index = core.statusBar.mana.innerHTML.indexOf('<font color');
			if (index >= 0) core.statusBar.mana.innerHTML = core.statusBar.mana.innerHTML.substring(0, index);
			var extra = h.charge + "/" + (core.getRealStatus('manamax') / 6);
			core.statusBar.mana.innerHTML += "<font color='#ccc' , style='font-size: 0.75em; position: absolute; top: 12%; '> +" + extra + "</font>";
		}
	} else {
		core.setStatusBarInnerHTML("mana", core.status.hero.mana);
	}
	// 设置技能栏
	// 可以用flag:skill表示当前开启的技能类型，flag:skillName显示技能名；详见文档-个性化-技能塔的支持
	var skillName = core.getFlag('skillName', '');
	core.setStatusBarInnerHTML('skill', skillName == '' ? '无' : (skillName.length > 10 ? skillName.substr(0, 9) + ".." : skillName));
	var battleTips = core.getFlag('battleTips', "");
	if (skillName == '' && battleTips != "") core.setStatusBarInnerHTML('skill', battleTips.length > 8 ? battleTips.substr(0, 7) + ".." : battleTips);

	// 可以在这里添加自己额外的状态栏信息，比如想攻击显示 +0.5 可以这么写：
	// if (core.hasFlag('halfAtk')) core.setStatusBarInnerHTML('atk', core.statusBar.atk.innerText + "+0.5");

	// 如果是自定义添加的状态栏，也需要在这里进行设置显示的数值

	['atk', 'def'].forEach(function (item) {
		if (!main.replayChecking) {
			var index = core.statusBar[item].innerHTML.indexOf('<font color');
			if (index >= 0) core.statusBar[item].innerHTML = core.statusBar[item].innerHTML.substring(0, index);
			var extra = -core.getFlag('weakValue');
			if (extra > 0) core.statusBar[item].innerHTML += "<font color='#40c340' , style='font-size: 0.75em; position: absolute; top: 12%; '> +" + extra + "</font>";
			if (extra < 0) core.statusBar[item].innerHTML += "<font color='#FF6666' , style='font-size: 0.75em; position: absolute; top: 12%; '>  " + extra + "</font>";
		}
	});

	// 进阶
	if (core.flags.statusBarItems.indexOf('enableLevelUp') >= 0) {
		core.setStatusBarInnerHTML('up', core.formatBigNumber(core.getNextLvUpNeed()) || "");
	} else core.setStatusBarInnerHTML('up', "");

	// 钥匙
	var keys = ['yellowKey', 'blueKey', 'redKey', 'greenKey'];
	keys.forEach(function (key) {
		core.setStatusBarInnerHTML(key, (key == "greenKey" ? "随" : "") + core.setTwoDigits(core.itemCount(key)));
	});
	keys.forEach(function (key) {
		core.setStatusBarInnerHTML(key, (key == "greenKey" ? "随" : "") + core.itemCount(key));
	});
	// 毒衰咒
	core.setStatusBarInnerHTML('poison', core.hasFlag('poison') ? "中毒" : "");
	core.setStatusBarInnerHTML('weak', core.hasFlag('weak') ? "衰弱-" + core.getFlag('weakValue', 0) : "");
	core.setStatusBarInnerHTML('curse', core.hasFlag('curse') ? "咒" : "");
	// 破炸飞
	core.setStatusBarInnerHTML('pickaxe', "破" + core.itemCount('pickaxe'));
	core.setStatusBarInnerHTML('bomb', "炸" + core.itemCount('bomb'));
	core.setStatusBarInnerHTML('fly', "飞" + core.itemCount('centerFly'));

	// 难度
	if (core.statusBar.hard.innerText != core.status.hard) {
		core.statusBar.hard.innerText = core.status.hard;
	}
	var hardColor = core.getFlag('__hardColor__', 'red');
	if (core.statusBar.hard.getAttribute('_style') != hardColor) {
		core.statusBar.hard.style.color = hardColor;
		core.statusBar.hard.setAttribute('_style', hardColor);
	}
	// 自定义状态栏绘制
	core.drawStatusBar();

	// 更新阻激夹域的伤害值
	core.updateCheckBlock();
	// 更新全地图显伤
	core.updateDamage();

	if (!core.isReplaying()) {
		if (core.status.hero.hp > 5000) core.plugin.getAchievement(3);
		if (core.status.hero.hp > 12000) core.plugin.getAchievement(15);
		if (core.status.hero.atk > 100 && core.status.hero.def > 100) core.plugin.getAchievement(31);
		if (core.status.hero.mana >= core.status.hero.manamax) core.plugin.getAchievement(41);
		if (core.status.hero.money > 1000) core.plugin.getAchievement(44);
		if (core.status.hero.exp > 280) core.plugin.getAchievement(43);
		if (core.status.hero.statistics.battle > 1200) core.plugin.getAchievement(42);
		if (core.status.hero.atk > 1700) core.plugin.getAchievement(8);
		if (core.status.hero.def > 1700) core.plugin.getAchievement(9);
		if (core.status.hero.lv >= 140) core.plugin.getAchievement(18);
	}
},
        "updateCheckBlock": function (floorId) {
	// 领域、夹击、阻击等的伤害值计算
	floorId = floorId || core.status.floorId;
	if (!floorId || !core.status.maps) return;

	var width = core.floors[floorId].width,
		height = core.floors[floorId].height;
	var blocks = core.getMapBlocksObj(floorId);

	var damage = {}, // 每个点的伤害值
		type = {}, // 每个点的伤害类型
		repulse = {}, // 每个点的阻击怪信息
		ambush = {}; // 每个点的捕捉信息
	var betweenAttackLocs = {}; // 所有可能的夹击点
	var needCache = false;
	var canGoDeadZone = core.flags.canGoDeadZone;
	core.flags.canGoDeadZone = true;

	// 计算血网和领域、阻击、激光的伤害，计算捕捉信息
	for (var loc in blocks) {
		var block = blocks[loc],
			x = block.x,
			y = block.y,
			id = block.event.id,
			enemy = core.material.enemys[id];
		if (block.disable) continue;

		type[loc] = type[loc] || {};

		// 血网
		// 如需调用当前楼层的ratio可使用  core.status.maps[floorId].ratio
		if (id == 'lavaNet' && !core.hasItem('amulet')) {
			if (core.hasItem('snow')) damage[loc] = (damage[loc] || 0) + core.values.lavaDamage / 5;
			else damage[loc] = (damage[loc] || 0) + core.values.lavaDamage;
			type[loc][(block.event.name || "血网") + "伤害"] = true;
		}

		// 领域
		// 如果要防止领域伤害，可以直接简单的将 flag:no_zone 设为true
		if (enemy && core.hasSpecial(enemy.special, 15) && !core.hasFlag('no_zone')) {
			// 领域范围，默认为1
			var range = enemy.range || 1;
			// 是否是九宫格领域
			var zoneSquare = false;
			if (enemy.zoneSquare != null) zoneSquare = enemy.zoneSquare;
			// 在范围内进行搜索，增加领域伤害值
			for (var dx = -range; dx <= range; dx++) {
				for (var dy = -range; dy <= range; dy++) {
					if (dx == 0 && dy == 0) continue;
					var nx = x + dx,
						ny = y + dy,
						currloc = nx + "," + ny;
					if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
					// 如果是十字领域，则还需要满足 |dx|+|dy|<=range
					if (!zoneSquare && Math.abs(dx) + Math.abs(dy) > range) continue;
					damage[currloc] = (damage[currloc] || 0) + (enemy.value || 0);
					type[currloc] = type[currloc] || {};
					type[currloc]["领域伤害"] = true;
				}
			}
		}

		// 阻击
		// 如果要防止阻击伤害，可以直接简单的将 flag:no_repulse 设为true
		if (enemy && core.hasSpecial(enemy.special, 18) && !core.hasFlag('no_repulse')) {
			var scan = enemy.zoneSquare ? core.utils.scan2 : core.utils.scan;
			for (var dir in scan) {
				var nx = x + scan[dir].x,
					ny = y + scan[dir].y,
					currloc = nx + "," + ny;
				if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
				damage[currloc] = (damage[currloc] || 0) + (enemy.value || 0);
				type[currloc] = type[currloc] || {};
				type[currloc]["阻击伤害"] = true;

				var rdir = core.turnDirection(":back", dir);
				// 检查下一个点是否存在事件（从而判定是否移动）
				var rnx = x + scan[rdir].x,
					rny = y + scan[rdir].y;
				if (rnx < 0 || rnx >= width || rny < 0 || rny >= height) continue;
				// 如需禁止阻击被推到已隐藏的事件处（如重生怪处），可将这一句的false改为true
				if (core.getBlock(rnx, rny, floorId, false) != null) continue;
				if (core.utils.scan[rdir] && !core.canMoveHero(x, y, rdir, floorId)) continue;
				repulse[currloc] = (repulse[currloc] || []).concat([
					[x, y, id, rdir]
				]);
			}
		}

		// 激光
		// 如果要防止激光伤害，可以直接简单的将 flag:no_laser 设为true
		if (enemy && core.hasSpecial(enemy.special, 24) && !core.hasFlag("no_laser")) {
			for (var nx = 0; nx < width; nx++) {
				var currloc = nx + "," + y;
				if (nx != x) {
					damage[currloc] = (damage[currloc] || 0) + (enemy.value || 0);
					type[currloc] = type[currloc] || {};
					type[currloc]["激光伤害"] = true;
				}
			}
			for (var ny = 0; ny < height; ny++) {
				var currloc = x + "," + ny;
				if (ny != y) {
					damage[currloc] = (damage[currloc] || 0) + (enemy.value || 0);
					type[currloc] = type[currloc] || {};
					type[currloc]["激光伤害"] = true;
				}
			}
		}

		// 捕捉
		// 如果要防止捕捉效果，可以直接简单的将 flag:no_ambush 设为true
		if (enemy && core.enemys.hasSpecial(enemy.special, 27) && !core.hasFlag("no_ambush")) {
			var scan = enemy.zoneSquare ? core.utils.scan2 : core.utils.scan;
			// 给周围格子加上【捕捉】记号
			for (var dir in scan) {
				var nx = x + scan[dir].x,
					ny = y + scan[dir].y,
					currloc = nx + "," + ny;
				if (nx < 0 || nx >= width || ny < 0 || ny >= height || (core.utils.scan[dir] && !core.canMoveHero(x, y, dir, floorId))) continue;
				ambush[currloc] = (ambush[currloc] || []).concat([
					[x, y, id, dir]
				]);
			}
		}

		// 夹击；在这里提前计算所有可能的夹击点，具体计算逻辑在下面
		// 如果要防止夹击伤害，可以简单的将 flag:no_betweenAttack 设为true
		if (enemy && core.enemys.hasSpecial(enemy.special, 16) && !core.hasFlag('no_betweenAttack')) {
			for (var dir in core.utils.scan) {
				var nx = x + core.utils.scan[dir].x,
					ny = y + core.utils.scan[dir].y,
					currloc = nx + "," + ny;
				if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
				betweenAttackLocs[currloc] = true;
			}
		}

		// 检查地图范围类技能
		var specialFlag = core.getSpecialFlag(enemy);
		if (specialFlag & 1) needCache = true;
		if (core.status.event.id == 'viewMaps') needCache = true;
		if ((core.status.event.id == 'book' || core.status.event.id == 'bool-detail') && core.status.event.ui) needCache = true;
	}

	// 对每个可能的夹击点计算夹击伤害
	for (var loc in betweenAttackLocs) {
		var xy = loc.split(","),
			x = parseInt(xy[0]),
			y = parseInt(xy[1]);
		// 夹击怪物的ID
		var enemyId1 = null,
			enemyId2 = null;
		// 检查左右夹击
		var leftBlock = blocks[(x - 1) + "," + y],
			rightBlock = blocks[(x + 1) + "," + y];
		var leftId = core.getFaceDownId(leftBlock),
			rightId = core.getFaceDownId(rightBlock);
		if (leftBlock && !leftBlock.disable && rightBlock && !rightBlock.disable && leftId == rightId) {
			if (core.hasSpecial(leftId, 16))
				enemyId1 = leftId;
		}
		// 检查上下夹击
		var topBlock = blocks[x + "," + (y - 1)],
			bottomBlock = blocks[x + "," + (y + 1)];
		var topId = core.getFaceDownId(topBlock),
			bottomId = core.getFaceDownId(bottomBlock);
		if (topBlock && !topBlock.disable && bottomBlock && !bottomBlock.disable && topId == bottomId) {
			if (core.hasSpecial(topId, 16))
				enemyId2 = topId;
		}

		if (enemyId1 != null || enemyId2 != null) {
			var leftHp = core.status.hero.hp - (damage[loc] || 0);
			if (leftHp > 1) {
				// 夹击伤害值
				var value = Math.floor(leftHp / 2);
				// 是否不超过怪物伤害值
				if (core.flags.betweenAttackMax) {
					var enemyDamage1 = core.getDamage(enemyId1, x, y, floorId);
					if (enemyDamage1 != null && enemyDamage1 < value)
						value = enemyDamage1;
					var enemyDamage2 = core.getDamage(enemyId2, x, y, floorId);
					if (enemyDamage2 != null && enemyDamage2 < value)
						value = enemyDamage2;
				}
				if (value > 0) {
					damage[loc] = (damage[loc] || 0) + value;
					type[loc] = type[loc] || {};
					type[loc]["夹击伤害"] = true;
				}
			}
		}
	}

	// 取消注释下面这一段可以让护盾抵御阻激夹域伤害
	/*
	for (var loc in damage) {
		damage[loc] = Math.max(0, damage[loc] - core.getRealStatus('mdef'));
	}
	*/

	core.flags.canGoDeadZone = canGoDeadZone;
	core.status.checkBlock = {
		damage: damage,
		type: type,
		repulse: repulse,
		ambush: ambush,
		needCache: needCache,
		cache: {} // clear cache
	};
},
        "moveOneStep": function (callback) {
	// 勇士每走一步后执行的操作。callback为行走完毕后的回调
	// 这个函数执行在“刚走完”的时候，即还没有检查该点的事件和领域伤害等。
	// 请注意：瞬间移动不会执行该函数。如果要控制能否瞬间移动有三种方法：
	// 1. 将全塔属性中的cannotMoveDirectly这个开关勾上，即可在全塔中全程禁止使用瞬移。
	// 2, 将楼层属性中的cannotMoveDirectly这个开关勾上，即禁止在该层楼使用瞬移。
	// 3. 将flag:cannotMoveDirectly置为true，即可使用flag控制在某段剧情范围内禁止瞬移。

	// 增加步数
	core.status.hero.steps++;
	// 更新跟随者状态，并绘制
	core.updateFollowers();
	core.drawHero();
	// 检查中毒状态的扣血和死亡
	if (core.hasFlag('poison')) {
		core.status.hero.statistics.poisonDamage += core.values.poisonDamage;
		core.status.hero.hp -= core.values.poisonDamage;
		if (core.status.hero.hp <= 0) {
			core.status.hero.hp = 0;
			core.updateStatusBar();
			core.events.lose();
			return;
		} else {
			core.updateStatusBar();
		}
	}

	// 从v2.7开始，每一步行走不会再刷新状态栏。
	// 如果有特殊要求（如每走一步都加buff之类），可手动取消注释下面这一句：
	// core.updateStatusBar(true);

	// 检查自动事件
	core.checkAutoEvents();

	// ------ 检查目标点事件 ------ //
	// 无事件的道具（如血瓶）需要优先于阻激夹域判定
	var nowx = core.getHeroLoc('x'),
		nowy = core.getHeroLoc('y');
	var block = core.getBlock(nowx, nowy);
	var hasTrigger = false;
	if (block != null && block.event.trigger == 'getItem' &&
		!core.floors[core.status.floorId].afterGetItem[nowx + "," + nowy]) {
		hasTrigger = true;
		core.trigger(nowx, nowy, callback);
	}
	// 执行目标点的阻激夹域事件
	core.checkBlock();

	// 执行目标点的script和事件
	if (!hasTrigger)
		core.trigger(nowx, nowy, callback);

	// 检查该点是否是滑冰
	if (core.onSki()) {
		// 延迟到事件最后执行，因为这之前可能有阻激夹域动画
		core.insertAction({ "type": "moveAction" }, null, null, null, true);
	}

	// ------ 检查目标点事件 END ------ //

	// 如需强行终止行走可以在这里条件判定：
	// core.stopAutomaticRoute();
},
        "moveDirectly": function (x, y, ignoreSteps) {
	// 瞬间移动；x,y为要瞬间移动的点；ignoreSteps为减少的步数，可能之前已经被计算过
	// 返回true代表成功瞬移，false代表没有成功瞬移

	// 判定能否瞬移到该点
	if (ignoreSteps == null) ignoreSteps = core.canMoveDirectly(x, y);
	if (ignoreSteps >= 0) {
		// 中毒也允许瞬移
		if (core.hasFlag('poison')) {
			var damage = ignoreSteps * core.values.poisonDamage;
			if (damage >= core.status.hero.hp) return false;
			core.status.hero.statistics.poisonDamage += damage;
			core.status.hero.hp -= damage;
		}

		core.clearMap('hero');
		// 获得勇士最后的朝向
		var lastDirection = core.status.route[core.status.route.length - 1];
		if (['left', 'right', 'up', 'down'].indexOf(lastDirection) >= 0)
			core.setHeroLoc('direction', lastDirection);
		// 设置坐标，并绘制
		core.setHeroLoc('x', x);
		core.setHeroLoc('y', y);
		core.drawHero();
		// 记录录像
		core.status.route.push("move:" + x + ":" + y);
		// 统计信息
		core.status.hero.statistics.moveDirectly++;
		core.status.hero.statistics.ignoreSteps += ignoreSteps;
		if (core.hasFlag('poison')) {
			core.updateStatusBar();
		}
		core.checkRouteFolding();
		return true;
	}
	return false;
},
        "parallelDo": function (timestamp) {
	// 并行事件处理，可以在这里写任何需要并行处理的脚本或事件
	// 该函数将被系统反复执行，每次执行间隔视浏览器或设备性能而定，一般约为16.6ms一次
	// 参数timestamp为“从游戏资源加载完毕到当前函数执行时”的时间差，以毫秒为单位

	// 检查当前是否处于游戏开始状态
	if (!core.isPlaying()) return;

	// 执行当前楼层的并行事件处理
	if (core.status.floorId) {
		try {
			eval(core.floors[core.status.floorId].parallelDo);
		} catch (e) {
			main.log(e);
		}
	}
}
    },
    "ui": {
        "getToolboxItems": function (cls) {
	// 获得道具栏中当前某类型道具的显示项和显示顺序
	// cls为道具类型，只可能是 tools, constants 和 equips
	// 返回一个数组，代表当前某类型道具的显示内容和顺序
	// 默认按id升序排列，您可以取消下面的注释改为按名称排列

	return Object.keys(core.status.hero.items[cls] || {})
		.filter(function (id) { return !core.material.items[id].hideInToolbox; })
		.sort( /*function (id1, id2) { return core.material.items[id1].name <= core.material.items[id2].name ? -1 : 1 }*/ );
},
        "drawStatusBar": function () {
	// 自定义绘制状态栏，需要开启状态栏canvas化

	// 如果是非状态栏canvas化，直接返回
	if (!core.flags.statusCanvas) return;
	var ctx = core.dom.statusCanvasCtx;
	// 清空状态栏
	core.clearMap(ctx);
	// 如果是隐藏状态栏模式，直接返回
	if (!core.domStyle.showStatusBar) return;

	// 作为样板，只绘制楼层、生命、攻击、防御、护盾、金币、钥匙这七个内容
	// 需要其他的请自行进行修改；横竖屏都需要进行适配绘制。
	// （可以使用Chrome浏览器开控制台来模拟手机上的竖屏模式的显示效果，具体方式自行百度）
	// 横屏模式下的画布大小是 129*416
	// 竖屏模式下的画布大小是 416*(32*rows+9) 其中rows为状态栏行数，即全塔属性中statusCanvasRowsOnMobile值
	// 可以使用 core.domStyle.isVertical 来判定当前是否是竖屏模式

	core.setFillStyle(ctx, core.status.globalAttribute.statusBarColor || core.initStatus.globalAttribute.statusBarColor);

	// 绘制一段文字，带斜体判定
	var _fillBoldTextWithFontCheck = function (text, x, y, style) {
		// 斜体判定：如果不是纯数字和字母，斜体会非常难看，需要取消
		if (!/^[-a-zA-Z0-9`~!@#$%^&*()_=+\[{\]}\\|;:'",<.>\/?]*$/.test(text))
			core.setFont(ctx, 'bold 18px Verdana');
		else core.setFont(ctx, 'italic bold 18px Verdana');
		core.fillBoldText(ctx, text, x, y, style);
	}

	// 横竖屏需要分别绘制...
	if (!core.domStyle.isVertical) {
		// 横屏模式

		// 绘制楼层
		core.drawImage(ctx, core.statusBar.icons.floor, 6, 9, 25, 25);
		_fillBoldTextWithFontCheck((core.status.thisMap || {}).name || "", 42, 29);

		// 绘制生命
		core.drawImage(ctx, core.statusBar.icons.hp, 6, 43, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('hp')), 42, 63);

		// 绘制攻击
		core.drawImage(ctx, core.statusBar.icons.atk, 6, 77, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('atk')), 42, 97);

		// 绘制防御
		core.drawImage(ctx, core.statusBar.icons.def, 6, 111, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('def')), 42, 131);

		// 绘制护盾
		core.drawImage(ctx, core.statusBar.icons.mdef, 6, 145, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('mdef')), 42, 165);

		// 绘制金币
		core.drawImage(ctx, core.statusBar.icons.money, 6, 179, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.status.hero.money), 42, 199);

		// 绘制经验
		core.drawImage(ctx, core.statusBar.icons.exp, 6, 213, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.status.hero.exp), 42, 233);

		// 绘制三色钥匙
		_fillBoldTextWithFontCheck(core.setTwoDigits(core.itemCount('yellowKey')), 11, 267, '#FFCCAA');
		_fillBoldTextWithFontCheck(core.setTwoDigits(core.itemCount('blueKey')), 46, 267, '#AAAADD');
		_fillBoldTextWithFontCheck(core.setTwoDigits(core.itemCount('redKey')), 81, 267, '#FF8888');

	} else {
		// 竖屏模式

		// 绘制楼层
		core.drawImage(ctx, core.statusBar.icons.floor, 6, 6, 25, 25);
		_fillBoldTextWithFontCheck((core.status.thisMap || {}).name || "", 42, 26);

		// 绘制生命
		core.drawImage(ctx, core.statusBar.icons.hp, 137, 6, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('hp')), 173, 26);

		// 绘制攻击
		core.drawImage(ctx, core.statusBar.icons.atk, 268, 6, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('atk')), 304, 26);

		// 绘制防御
		core.drawImage(ctx, core.statusBar.icons.def, 6, 38, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('def')), 42, 58);

		// 绘制护盾
		core.drawImage(ctx, core.statusBar.icons.mdef, 137, 38, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.getRealStatus('mdef')), 173, 58);

		// 绘制金币
		core.drawImage(ctx, core.statusBar.icons.money, 268, 38, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.status.hero.money), 304, 58);

		// 绘制经验
		core.drawImage(ctx, core.statusBar.icons.exp, 6, 70, 25, 25);
		_fillBoldTextWithFontCheck(core.formatBigNumber(core.status.hero.exp), 42, 90);

		// 绘制三色钥匙
		_fillBoldTextWithFontCheck(core.setTwoDigits(core.itemCount('yellowKey')), 142, 90, '#FFCCAA');
		_fillBoldTextWithFontCheck(core.setTwoDigits(core.itemCount('blueKey')), 177, 90, '#AAAADD');
		_fillBoldTextWithFontCheck(core.setTwoDigits(core.itemCount('redKey')), 212, 90, '#FF8888');
	}
},
        "drawStatistics": function () {
	// 浏览地图时参与的统计项目

	return [
		'yellowDoor', 'blueDoor', 'redDoor', 'greenDoor', 'steelDoor',
		'yellowKey', 'blueKey', 'redKey', 'greenKey', 'steelKey',
		'redGem', 'blueGem', 'greenGem', 'yellowGem',
		'redPotion', 'bluePotion', 'greenPotion', 'yellowPotion', 'superPotion',
		'pickaxe', 'bomb', 'centerFly', 'icePickaxe', 'freezeBadge',
		'earthquake', 'upFly', 'downFly', 'jumpShoes', 'lifeWand',
		'poisonWine', 'weakWine', 'curseWine', 'superWine',
		'sword1', 'sword2', 'sword3', 'sword4', 'sword5',
		'shield1', 'shield2', 'shield3', 'shield4', 'shield5',
		// 在这里可以增加新的ID来进行统计个数，只能增加道具ID
	];
},
        "drawAbout": function () {
	// 绘制“关于”界面
	core.ui.closePanel();
	core.lockControl();
	core.status.event.id = 'about';

	var left = 48,
		top = 36,
		right = core.__PIXELS__ - 2 * left,
		bottom = core.__PIXELS__ - 2 * top;

	core.setAlpha('ui', 0.85);
	core.fillRect('ui', left, top, right, bottom, '#000000');
	core.setAlpha('ui', 1);
	core.strokeRect('ui', left - 1, top - 1, right + 1, bottom + 1, '#FFFFFF', 2);

	var text_start = left + 24;

	// 名称
	core.setTextAlign('ui', 'left');
	var globalAttribute = core.status.globalAttribute || core.initStatus.globalAttribute;
	core.fillText('ui', "HTML5 魔塔样板", text_start, top + 35, globalAttribute.selectColor, "bold 22px " + globalAttribute.font);
	core.fillText('ui', "版本： " + main.__VERSION__, text_start, top + 80, "#FFFFFF", "bold 17px " + globalAttribute.font);
	core.fillText('ui', "作者： 艾之葵", text_start, top + 112);
	core.fillText('ui', 'HTML5魔塔交流群：539113091', text_start, top + 112 + 32);
	// TODO: 写自己的“关于”页面，每次增加32像素即可
	core.playSound('打开界面');
}
    }
}