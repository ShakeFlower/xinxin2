/// <reference path = "../runtime.d.ts" />
var plugins_bb40132b_638b_4a9f_b028_d3fe47acc8d1 =
{
	"init": function () {

		console.log("插件编写测试");

		// 可以写一些直接执行的代码
		// 在这里写的代码将会在【资源加载前】被执行，此时图片等资源尚未被加载。
		// 请勿在这里对包括bgm，图片等资源进行操作。

		this._afterLoadResources = function () {
			// 本函数将在所有资源加载完毕后，游戏开启前被执行
			// 可以在这个函数里面对资源进行一些操作，比如切分图片等。

			// 这是一个将assets.png拆分成若干个32x32像素的小图片并保存的样例。
			// var arr = core.splitImage("assets.png", 32, 32);
			// for (var i = 0; i < arr.length; i++) {
			//     core.material.images.images["asset"+i+".png"] = arr[i];
			// }

		}

		// 可以在任何地方（如afterXXX或自定义脚本事件）调用函数，方法为 core.plugin.xxx();
		// 从V2.6开始，插件中用this.XXX方式定义的函数也会被转发到core中，详见文档-脚本-函数的转发。

		core.actions._keyDownAction = function (keycode) {
			if (core.status.event.data.type == 'choices') {
				this._keyDownChoices(keycode);
				if (flags.keyDown) {
					var data = core.status.event.data.current;
					var choices = data.choices;
					if (choices.length > 0) {
						this._selectChoices(choices.length, keycode, this._clickAction);
					}
				}
				return;
			}
			if (core.status.event.data.type == 'confirm' && (keycode == 37 || keycode == 39)) {
				core.status.event.selection = 1 - core.status.event.selection;
				core.playSound('光标移动');
				core.drawConfirmBox(core.status.event.ui.text);
				return;
			}
		}

		////// 自定义事件时，放开某个键的操作 //////
		core.actions._keyUpAction = function (keycode) {
			if (core.status.event.data.type == 'text' && (keycode == 13 || keycode == 32 || keycode == 67)) {
				return this._clickAction_text();
			}
			if (core.status.event.data.type == 'wait') {
				var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
				core.setFlag('type', 0);
				core.setFlag('keycode', keycode);
				core.setFlag('timeout', timeout);
				var executed = core.events.__action_wait_afterGet(core.status.event.data.current);
				if (executed || !core.status.event.data.current.forceChild) {
					core.status.route.push("input:" + (1e8 * timeout + keycode));
					clearTimeout(core.status.event.interval);
					delete core.status.event.timeout;
					core.doAction();
				}
				return;
			}
			if (core.status.event.data.type == 'choices') {
				if (!flags.keyDown) {
					var data = core.status.event.data.current;
					var choices = data.choices;
					if (choices.length > 0) {
						this._selectChoices(choices.length, keycode, this._clickAction);
					}
				}
				return;
			}
			if (core.status.event.data.type == 'confirm' && (keycode == 13 || keycode == 32 || keycode == 67)) {
				var timeout = Math.max(0, core.status.event.timeout - new Date().getTime()) || 0;
				delete core.status.event.timeout;
				core.setFlag('timeout', timeout);
				core.status.route.push("choices:" + (100 * timeout + core.status.event.selection));
				if (core.status.event.selection == 0)
					core.insertAction(core.status.event.ui.yes);
				else core.insertAction(core.status.event.ui.no);
				core.doAction();
				return;
			}
		}

		core.actions._clickEquipboxIndex = function (index) {
			if (index < this.LAST) {
				if (index >= core.status.globalAttribute.equipName.length) return;
				if (index == core.status.event.selection && core.status.hero.equipment[index]) {
					if (core.isReplaying()) return;
					return; // 新新2不允许卸下剑技/盾技
					core.unloadEquip(index);
					core.status.route.push("unEquip:" + index);
				} else core.playSound('光标移动');
			} else {
				var equips = core.getToolboxItems('equips');
				if (index == core.status.event.selection) {
					if (core.isReplaying()) return;
					var equipId = equips[index - this.LAST + (core.status.event.data.page - 1) * this.LAST];
					core.loadEquip(equipId);
					core.status.route.push("equip:" + equipId);
				} else core.playSound('光标移动');
			}
			core.ui._drawEquipbox(index);
		}

		core.maps._drawFg_draw = function (floorId, toDrawCtx, cacheCtx, config) {
			config.ctx = cacheCtx;
			// ------ 调整这两行的顺序来控制是先绘制贴图还是先绘制前景图块；后绘制的覆盖先绘制的。
			core.maps._drawFloorImages(floorId, config.ctx, 'fg', null, null, config.onMap);
			core.maps._drawBgFgMap(floorId, 'fg', config);
			if (config.onMap) core.drawImage(toDrawCtx, cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
			config.ctx = toDrawCtx;

			var ctx = config.ctx;
			core.drawIcon(ctx, 340, 160, 0);
			core.drawIcon(ctx, 340, 192, 0);
			core.drawIcon(ctx, 340, 224, 0);
			if (core.hasItem('I325')) core.drawIcon(ctx, 325, 150, 389, 24, 24);
			if (core.hasItem('I326')) core.drawIcon(ctx, 326, 150, 389, 24, 24);
			if (core.hasItem('I327')) core.drawIcon(ctx, 327, 150, 389, 24, 24);
			if (core.hasItem('skill1')) core.drawIcon(ctx, 72, 220, 389, 24, 24);
			if (core.hasItem('I307')) core.drawIcon(ctx, 307, 244, 389, 24, 24);
			if (core.hasItem('I309')) core.drawIcon(ctx, 309, 268, 389, 24, 24);
			core.strokeRect(ctx, 30.5, 30.5, 355, 355, "rgb(205,0,154)", 3);
			var t = ctx.textAlign;
			ctx.textAlign = "left";
			var s = core.floors[floorId].title;
			core.fillText(ctx, s.substr(0, 2), 168, 20, "white", "bold 15px Arial");
			core.fillText(ctx, s.substr(3), 244 - 4 * s.length, 20, "white", "bold 15px Arial");
			core.drawImage(ctx, "circle.png", 268, 384, 180, 40);
			// core.fillEllipse(ctx, 360, 408, 45, 5, 0, "#5bdb62");
			core.fillText(ctx, !core.flags.leftHandPrefer ? "-Press L-" : "-Press Y-", 316, 410, "white", "bold 20px Arial");
			ctx.textAlign = t;
		}

		this.triggerAchieve = function (id) {
			if (!flags.bugFix) return;
			var a = flags.achieves;
			if (typeof a != 'object') return;
			id--;
			a = a[id];
			if (typeof a != 'object') return;
			if (a[4]) {
				return;
			} else {
				a[4] = 1;
				core.addFlag('achieveScore', a[3]);
				core.playSound('achievement.mp3');
				core.insertAction("\t[恭喜获得「" + a[0] + "」,N" + (454 + id) + "]" + a[2] + "\n\n\r[yellow]成就点数+" + a[3]);
				return;
			}
		}

		// 开启技能
		this.useSkill = function (skillid) {
			var preskill = core.getFlag('skill', 0);
			if (skillid == preskill) skillid = 0;
			core.setFlag('skill', skillid);
			var name = "";
			if (/[0-5]/.test(skillid)) name = core.getFlag('skill_' + skillid, '');
			else name = skillid;
			name = this.myFormatSkill(name);
			core.setFlag('skillName', name);
			core.setFlag('battleTipsFlow', 0);
		};

		this.myReplaceAll = function (str, s1, s2) { // Android不能用replaceAll
			str = str.replace(s1, s2);
			if (str.indexOf(s1) >= 0) str = this.myReplaceAll(str, s1, s2);
			return str;
		}

		this.myFormatSkill = function (str, intoHouse, noReduce) {
			str = str.toUpperCase();
			var check = str;
			var sword = ['I315', 'I319', 'I318', 'I317', 'I316'],
				shield = ['I339', 'I321', 'I375', 'I322', 'I320'];
			while (check.indexOf('*') >= 0) {
				var i = check.indexOf('*'),
					j = i - 1;
				if (check.charAt(j) != ')') {
					if (/[1-5]/.test(check.charAt(j))) j--;
					if (check.charAt(j - 1) == '-') j--;
					check = check.substr(0, j) + '(' + check.substr(j, i - j) + ')' + check.substr(i);
				}
				i = check.indexOf('*');
				j = check.substr(0, i - 1).lastIndexOf('(');
				var t = (check.substr(i + 1).match(/\d+/g) || [])[0];
				if (check.substr(i + 1).indexOf(t) != 0) t = '';
				var x = check.substr(0, j);
				for (var k = 1; k <= (t || 1); k++) x += check.substr(j + 1, i - j - 2);
				check = x + check.substr(i + 1 + t.length);
			}
			if (!intoHouse) str = check;
			check = this.removeStopper(str, 1e8);
			var Zi, Xi, n;
			n = str.indexOf('Z');
			if (n >= 0) {
				n = str.charAt(n + 1);
				if (/[1-5]/.test(n)) Zi = n;
			}
			n = str.indexOf('X');
			if (n >= 0) {
				n = str.charAt(n + 1);
				if (/[1-5]/.test(n)) Xi = n;
			}
			for (var i = 1; i <= 5; i++) {
				if (intoHouse) {
					check = core.myReplaceAll(check, 'Z' + i, '');
					check = core.myReplaceAll(check, 'X' + i, '');
				} else {
					if (core.getEquip(0) == sword[i - 1]) {
						check = this.myReplaceAll(check, 'Z' + i, 'Z');
						str = this.myReplaceAll(str, 'Z' + i, 'Z');
					} else if (core.hasItem('I325') && core.canEquip(sword[i - 1], false)) {
						check = this.myReplaceAll(check, 'Z' + i, 'Z');
					} else if (core.hasItem('I326') && i == Zi && core.canEquip(sword[i - 1], false)) {
						check = this.myReplaceAll(check, 'Z' + i, 'Z');
						str = this.myReplaceAll(str, 'Z' + i, 'Z');
						str = str.replace('Z', 'Z' + i);
					} else {
						check = this.myReplaceAll(check, 'Z' + i, 'Q');
					}
					if (core.getEquip(1) == shield[i - 1]) {
						check = this.myReplaceAll(check, 'X' + i, 'X');
						str = this.myReplaceAll(str, 'X' + i, 'X');
					} else if (core.hasItem('I327') && core.canEquip(shield[i - 1], false)) {
						check = this.myReplaceAll(check, 'X' + i, 'X');
					} else if (core.hasItem('I326') && i == Xi && core.canEquip(shield[i - 1], false)) {
						check = this.myReplaceAll(check, 'X' + i, 'X');
						str = this.myReplaceAll(str, 'X' + i, 'X');
						str = str.replace('X', 'X' + i);
					} else {
						check = this.myReplaceAll(check, 'X' + i, 'Q');
					}
				}
			}
			if (!intoHouse && !(core.getEquip(0) || core.hasItem('I325') || core.hasItem('I326'))) str = this.myReplaceAll(str, 'Z', '');
			if (!intoHouse && !(core.getEquip(1) || core.hasItem('I327') || core.hasItem('I326'))) str = this.myReplaceAll(str, 'X', '');
			['-C', '-V', 'A', 'D', 'Z', 'X', 'C', 'V'].forEach(function (e) {
				check = core.myReplaceAll(check, e, '');
			})
			if (check == '') {
				if (!noReduce) str = this.myReduceSkill(str);
				return str;
			} else return '';
		}

		this.myReduceSkill = function (str) {
			var x = ['-C', '-V'];
			for (var i = 1; i <= 5; i++) x.push('Z' + i, 'X' + i);
			for (var i = 1; i <= str.length / 2; i++) {
				for (var j = 0; j + i - 1 <= str.length - 1; j++) {
					var k = 1;
					if (x.indexOf(str.substr(j - 1, i + 1)) > -1) continue;
					while (str.substr(j, i) == str.substr(j + k * i, i) && x.indexOf(str.substr(j + k * i, i + 1)) == -1) k++;
					if (k >= 3 || (k == 2 && i > 3)) {
						if (i == 1 || x.indexOf(str.substr(j, i)) > -1) str = str.substr(0, j) + str.substr(j, i) + '*' + k + str.substr(j + i * k);
						else str = str.substr(0, j) + '(' + str.substr(j, i) + ')*' + k + str.substr(j + i * k);
					}
				}
			}
			return str;
		}

		this.getSkillPerform = function (enemy, setMana, x, y, floorId, fullList) {
			if (typeof enemy == 'string') enemy = core.material.enemys[enemy];
			var res = [],
				nowSkill = core.getFlag('skillName', ''),
				mana = core.status.hero.mana,
				skillHouse = core.getFlag('skillHouse', []),
				info = core.getDamageInfo(enemy, null, x, y, floorId),
				mon_def = core.enemys.getEnemyInfo(enemy, hero, x, y, floorId).def;
			if (core.hasSpecial(enemy.special, 20) || (info && info.damage <= 0)) return res;
			if (info && info.turn > core.getFlag('recomTurnMax', 10) && (core.hasSpecial(enemy.special, 57) || core.hasSpecial(enemy.special, 65) || core.hasSpecial(enemy.special, 66))) {
				skillHouse = ['C', 'CC', 'CX', 'XC', 'CXC'];
			} else if (!info && hero.atk > mon_def && (core.hasSpecial(enemy.special, 53) || core.hasSpecial(enemy.special, 54) || core.hasSpecial(enemy.special, 56) || core.hasSpecial(enemy.special, 83) || core.hasSpecial(enemy.special, 86))) {
				skillHouse = ['-V*999'];
			} else if (!info || info.turn > core.getFlag('recomTurnMax', 10)) {
				if (core.getEquip(1) == 'I375' || (core.hasItem('I327') && core.canEquip('I375', false))) {
					skillHouse = ['X3*9'];
				} else skillHouse = [];
			}
			if (skillHouse.length == 0) return res;
			skillHouse = [''].concat(skillHouse);
			if (setMana > 1 + core.status.hero.manamax) mana = core.status.hero.manamax;
			else if (setMana > 0) mana = setMana - 1;
			skillHouse.forEach(function (s) {
				if (s != '') {
					s = core.myFormatSkill(s);
					if (s == '') return;
				}
				core.setFlag('skillName', s);
				var info = core.getDamageInfo(enemy, { "mana": mana }, x, y, floorId);
				if (info) res.push([info.skill, info.damage, info.mana, 0]);
			});
			core.setFlag('skillName', nowSkill);
			for (var i = 0; i < res.length - 1; i++) {
				for (var j = 0; j < res.length - 1 - i; j++) {
					if (res[j][2] < res[j + 1][2] || (res[j][2] == res[j + 1][2] && res[j][1] > res[j + 1][1])) {
						var temp = res[j + 1];
						res[j + 1] = res[j];
						res[j] = temp;
					}
				}
			}
			for (var i = 1; i < res.length; i++) {
				if (res[i][2] == res[i - 1][2] && res[i][1] >= res[i - 1][1]) {
					res.splice(i, 1);
					i--;
				} else {
					res[i][3] = (res[i][1] - res[i - 1][1]) / (res[i][2] - res[i - 1][2]);
					if (res[i][3] <= 0) {
						res.splice(i, 1);
						i--;
					} else if (!fullList) {
						while (i > 1) {
							if (res[i][3] <= res[i - 1][3]) break;
							else {
								res.splice(i - 1, 1);
								i--;
								res[i][3] = (res[i][1] - res[i - 1][1]) / (res[i][2] - res[i - 1][2]);
							}
						}
					}
				}
			}
			for (var i = res.length - 1; i > 0; i--) {
				res[i][1] = res[i - 1][1] - res[i][1];
				res[i][2] = res[i - 1][2] - res[i][2];
				if (res[i][3] < 100) res[i][3] = res[i][3].toFixed(2);
				else res[i][3] = core.formatBigNumber(res[i][3], true);
			}
			if (res.length) {
				res[0][1] = null;
				res[0][2] = null;
				res[0][3] = null;
			}
			return res;
		}

		this.getRecomSkill = function (enemy, x, y, floorId) {
			// return { "skill": 'C', "ratio": "max" };
			var res = this.getSkillPerform(enemy, 0, x, y, floorId),
				ratio,
				i = 0;
			if (!res || res.length == 0) return null;
			try { ratio = core.calValue(flags.hpManaRatio) } catch (e) { }
			if (typeof ratio != 'number') ratio = 0;
			res.forEach(function (r) {
				if (r[3] >= ratio) i++;
			})
			//if (i > 0) return { "skill": res[i][0], "ratio": res[i][3] };
			if (i > 0) return { "skill": ((res[i]) || [])[0], "ratio": ((res[i]) || [])[3] };
			else return { "skill": res[0][0], "ratio": "max" };
		}

		// 战斗计算
		this.atkMana = function (atk, def, isMon) {
			var now = Math.round(def / atk * 10),
				cri = 0;
			if (!isMon && atk <= def) now = 0;
			if (!isMon && now > 1) cri = Math.floor(def * 10 / (now - 0.5) + 1) - atk;
			if (isMon) cri = Math.ceil((now + 0.5) * atk / 10) - def;
			return {
				"now": now,
				"cri": cri
			};
		}

		this.setKiMana = function (h) {
			if (h.ki == null) {
				h.ki = Math.min(5, Math.ceil((h.mana - core.getFlag('overCharge', 0)) / h.mmm) - 1);
				h.charge = Math.floor(h.mana - h.ki * h.mmm);
				if (h.ki == 5) h.charge = Math.min(h.charge, h.mmm + core.getFlag('overCharge', 0));
			} else {
				h.mana = h.ki * h.mmm + h.charge;
				if (h.charge == 0) h.mana += 0.1;
			}
			return;
		}

		this.useKi = function (h, n, isBug) {
			if (h.ki >= n || isBug) {
				h.ki -= n;
				return true;
			} else return false;
		}

		this.chargeKi = function (h, n) {
			h.charge += n;
			if (n < 0) h.overCharge = Math.max(0, n + h.overCharge);
			while (h.charge > h.mmm && h.ki < 5 && n >= 0) {
				h.charge -= h.mmm;
				h.ki++;
				h.overCharge = 0;
			}
			while (h.charge < 0 && h.ki > 0) {
				h.charge += h.mmm;
				h.ki--;
			}
			if (h.charge < 0) h.charge = 0;
			if (h.ki == 5 && h.charge > h.mmm) {
				h.fmana += h.charge - h.mmm;
				h.charge = h.mmm;
			}
		}

		this.heroAtk = function (s, skill) {
			skill = skill || '';
			var h = s.h,
				p = s.p,
				m = s.m,
				sp = m.sp;
			var dmg = h.atk - m.def,
				tmax = core.getFlag('tiredMax', 20),
				bugFix = flags.bugFix;

			var lsbug, lv = core.status.hero.lv;

			if (h.tired >= 100) dmg = 0;
			else {
				if (dmg < -core.getFlag("atkm", 10)) dmg = 0;
				else if (dmg < 1) dmg = 1;
				if (h.atk > m.def) {
					if ((skill == 'C' || h.tempZi == 6) && this.useKi(h, 1, s.bug)) { // 使用C无疲劳限制
						dmg *= 2;
						h.tired += 2;
						if (core.getEquip(0) == 'I319') lsbug = true;
					} else if ((skill == 'Z1' || h.tempZi == 1) && h.tired < tmax && this.useKi(h, 1)) {
						dmg *= 1.5;
						dmg = Math.round(dmg);
						h.tired += 10;
						if (dmg > lv && (h.def > Math.round(lv * 1.5)) || (bugFix && h.def >= lv)) {
							h.def -= lv;
							h.atk += Math.round(lv * 1.5);
						}
						if (core.hasSpecial(sp, 2)) s.znsf = true;
					} else if ((skill == 'Z2' || h.tempZi == 2) && h.tired < tmax && h.ki > 0) {
						if (bugFix) this.useKi(h, 1);
						if (!bugFix || !core.hasSpecial(sp, 64)) this.chargeKi(h, Math.round(m.mana / 2));
						m.mana = 0;
						if (!bugFix) this.useKi(h, 1);
						dmg *= 1.3;
						h.tired += 4;
						lsbug = true;
					} else if ((skill == 'Z3' || h.tempZi == 3) && h.tired < tmax && this.useKi(h, 1)) {
						dmg *= 0.8;
						dmg = Math.round(dmg);
						h.tired += 4;
						if (dmg >= m.hp) {
							dmg = m.hp - 1;
						}
						h.hp += Math.floor((bugFix ? 0 : 0.5) + dmg * 0.3);
					} else if ((skill == 'Z4' || h.tempZi == 4) && h.tired < tmax && this.useKi(h, 2)) {
						dmg *= 1.8;
						h.tired += 8;
						m.tired += 15;
					} else if ((skill == 'Z5' || h.tempZi == 5) && h.tired < tmax && this.useKi(h, 2)) {
						dmg *= 5;
						h.tired += 30;
						if (dmg >= m.hp) {
							dmg = m.hp - 1;
							s.znsf = true;
						}
						if (h.atk > m.def) h.atk = m.def;
					} else {
						if (!bugFix || !core.hasSpecial(sp, 64)) this.chargeKi(h, this.atkMana(h.atk, m.def).now);
						if (skill == "C" || skill.substr(0, 1) == "Z") skill = "A";
					}
					dmg = Math.round(dmg);
				} else if (skill == "C" || skill.substr(0, 1) == "Z") skill = "A";
				if (core.hasSpecial(sp, 92)) {
					if (!m.sp2) {
						dmg = Math.round(dmg / 2);
						m.sp2 = 1;
					} else if (m.sp2 == 1) {
						h.freeze = 1;
						m.sp2 = 2;
					} else if (m.sp2 == 2) {
						h.hp -= Math.round(dmg / 4);
						m.sp2 = 0;
					}
				}
				h.res += (',hero:' + h.ki + '+' + h.charge);
				m.hp -= dmg;
				if (core.hasSpecial(sp, 86)) h.tired += 10;
				if (m.hp < 0) m.hp = 0;
				if (!lsbug || bugFix) m.mana += Math.round(dmg / 3); // 流石Bug
				if (m.mana > m.mmax) m.mana = m.mmax;
			}
			s.mdmg = dmg;
			s.skillBar += skill;
			if (!flags.swordUsed && h.ki > 0) s.bug = true;
			else s.bug = false;
			h.tempZi = 0;
			return s;
		}
		this.monAtk = function (s, skill) {
			skill = skill || '';
			var h = s.h,
				p = s.p,
				m = s.m,
				sp = m.sp,
				tmax = core.getFlag('tiredMax', 20),
				moyan = core.hasSpecial(sp, 80),
				bugFix = flags.bugFix,
				lv = core.status.hero.lv,
				jlz, selfNormalHit;
			if (core.hasSpecial(sp, 93) && m.sp2 && m.sp2 < 4) {
				if (m.sp2 == 1 && !bugFix) { // 原作Bug，未考虑使用盾技减伤的情况
					s.hdmg = m.atk - h.def;
					if (s.hdmg < -core.getFlag("defm", 40)) s.hdmg = 0;
					else if (s.hdmg < 1) s.hdmg = 1;
				}
				if (m.sp2 == 2) { // 弹射给勇士
					s.hdmg = Math.round(s.pdmg * 0.8);
					s.pdmg = 0;
					h.hp -= s.hdmg;
				} else { // 弹射给公主
					s.pdmg = Math.round(s.hdmg * 0.8);
					s.hdmg = 0;
					if (core.hasItem('I325')) m.hp = Math.max(0, m.hp - Math.round(s.pdmg / 2));
					if (core.hasItem('I326') && (!bugFix || !core.hasSpecial(sp, 64))) this.chargeKi(h, Math.round(s.pdmg / 3));
					if (core.hasItem('I327')) m.tired += 5;
					p.hp -= s.pdmg;
					if (m.hp <= 0) m.sp2 = 9;
				}
				m.sp2++;
				return s;
			}
			if (skill == 'X4' && h.tired < tmax && (bugFix || h.defBuff.length < 1) && this.useKi(h, bugFix ? 1 : 2)) {
				h.tired += 9;
				var addDef = Math.round(core.status.hero.def / 50) + core.status.hero.hp % lv;
				h.defBuff.push([addDef, 3]);
				if (!bugFix) addDef = (core.status.hero.def + core.status.hero.hp) % lv;
				h.def += addDef;
				jlz = true;
			}
			var dmg = m.atk - h.def,
				pdmg = 0;
			if (m.tired >= 100 && !moyan) {
				dmg = 0;
				if (m.mana >= m.mmax) m.mana = 0;
			} else {
				if (dmg < -core.getFlag("defm", 40)) dmg = 0;
				else if (dmg < 1) dmg = 1;
				if (moyan) {
					if (h.tired >= 100) dmg = 0;
					else {
						dmg = h.atk - h.def;
						if (dmg < -core.getFlag("atkm", 10)) dmg = 0;
						else if (dmg < 1) dmg = 1;
						var selfSkill, selfSkillKi = [1, 1, 1, 1, 2, 2][h.Zi || 0];
						if (!m.sp2) {
							if (h.tired < tmax && h.ki >= selfSkillKi) selfSkill = true;
							m.sp2 = 2;
						} else m.sp2--;
						if (selfSkill && h.atk > h.def) {
							this.useKi(h, selfSkillKi);
							switch (h.Zi) {
								case 1:
									if (bugFix) dmg *= 1.5;
									else dmg *= 1.8;
									dmg = Math.round(dmg);
									h.tired += 10;
									if (dmg > lv && (h.def > Math.round(lv * 1.5)) || (bugFix && h.def >= lv)) {
										h.def -= lv;
										h.atk += Math.round(lv * 1.5);
									}
									break;
								case 2:
									if (bugFix) {
										h.charge = Math.round(h.charge / 2);
										dmg *= 1.3;
									} else h.charge = 0;
									h.tired += 4;
									break;
								case 3:
									if (bugFix) {
										dmg *= 0.8;
										dmg = Math.round(dmg);
										h.tired += 4;
										if (dmg >= m.hp) {
											dmg = m.hp - 1;
										}
										h.hp += Math.floor(dmg * 0.3);
									} else dmg = 100;
									break;
								case 4:
									if (bugFix) dmg *= 1.8;
									else dmg *= 1.5;
									h.tired += 8;
									h.tired += 15;
									break;
								case 5:
									dmg *= 5;
									h.tired += 30;
									if (dmg >= h.hp) {
										dmg = h.hp - 1;
									}
									if (h.atk > h.def) h.atk = h.def;
									break;
								default:
									dmg *= 2;
									h.tired += 2;
							}
							dmg = Math.round(dmg);
						} else {
							selfNormalHit = true;
							if (selfSkill && !bugFix) h.tempZi = h.Zi || 6;
						}
					}
				}
				if (core.hasSpecial(sp, 55)) {
					dmg = 0;
					pdmg = m.atk;
				}
				if (core.hasSpecial(sp, 2)) dmg = m.atk;
				if (core.hasSpecial(sp, 63)) pdmg = Math.max(1, m.atk - p.def);
				if (core.hasSpecial(sp, 84)) dmg += 100;
				if (dmg >= 1) {
					// if (core.hasSpecial(sp, 60) && m.atk >= h.def) dmg *= 3;
					if (m.mana >= m.mmax && !moyan && m.mmax > 0) {
						if (core.hasSpecial(sp, 51)) dmg = Math.round(dmg * 2.5);
						else if (core.hasSpecial(sp, 59)) dmg *= 4;
						else dmg *= 2;
					}
					if (core.hasSpecial(sp, 93) && (bugFix || m.mana < m.mmax)) {
						m.sp2 = 1; //开启弹射
					}
				}
				if (!core.hasSpecial(sp, 55)) { // 0伤也能用盾技
					if (h.tired < tmax && (bugFix || h.defBuff.length < 1)) { // 精灵罩效果持续时不能使用其它盾技
						if (skill == 'X1' && this.useKi(h, 1)) {
							dmg /= 2.5;
							h.tired += 3;
						} else if (skill == 'X2' && this.useKi(h, 2)) {
							dmg /= 1.5;
							h.tired += 12;
							if (moyan) {
								if (bugFix) h.freeze = 1;
							} else {
								m.freeze = 1;
								s.ic = true;
							}
						} else if (skill == 'X3' && this.useKi(h, bugFix ? 2 : 1)) {
							if (moyan) {
								if (dmg > 0) {
									if (bugFix) h.hp -= (Math.round(dmg / 2.6) + Math.round(h.atk / 10));
									else h.hp -= Math.round(dmg / 2.6);
								}
							} else {
								if (dmg > 0) m.hp -= (Math.round(dmg / 2.6) + Math.round(h.atk / 10)); // 有伤害时才能弹伤害，分开取四舍五入
								// 特殊效果亦能反弹
								if (m.poi) m.hp -= 25;
								if (m.weakPt) {
									m.atk = Math.max(0, m.atk - m.weakPt);
									m.def = Math.max(0, m.def - m.weakPt);
								}
								if (core.hasSpecial(sp, 81)) m.def = Math.max(0, m.def - 12);
								if (core.hasSpecial(sp, 89)) {
									m.atk = Math.max(0, m.atk - 20);
									if (bugFix) m.def = Math.max(0, m.def - 5);
								}
								if (bugFix) {
									if (core.hasSpecial(sp, 52)) m.tired += 1;
									if (core.hasSpecial(sp, 53)) m.tired += 1;
									if (core.hasSpecial(sp, 54)) m.tired += 3;
									if (core.hasSpecial(sp, 56)) m.tired += 4;
									if (core.hasSpecial(sp, 83)) m.tired += 4;
								}
								if (m.hp < 0) m.hp = 0;
								if (m.rock) s.znsf = true;
							}
							dmg /= 1.3;
							h.tired += 3;
						} else if (skill == 'X5' && this.useKi(h, 2)) {
							h.tired += 2;
							p.hp += Math.floor((bugFix ? 0 : 0.5) + dmg * 1.5);
							if (core.hasSpecial(sp, 2)) s.znsf = true;
						} else if (skill.substr(0, 1) == "X" && !jlz) skill = "D";
						dmg = Math.ceil(dmg); // 盾技减伤效果向上取整
					}
					for (var i = 0; i < h.defBuff.length; i++) {
						h.defBuff[i][1]--;
						if (h.defBuff[i][1] <= 0) {
							if (bugFix || !moyan) h.def -= h.defBuff[i][0];
							else h.def -= (core.status.hero.def + core.status.hero.exp) % core.status.hero.lv;
							h.defBuff.splice(i, 1);
							i--;
						}
					}
				}
				if (pdmg >= 1) {
					if (m.mana >= m.mmax) {
						if (bugFix && core.hasSpecial(sp, 67)) pdmg *= 3;
						else pdmg *= 2;
					}
					if (core.hasItem('I325')) m.hp = Math.max(0, m.hp - Math.round(pdmg / 2));
					if (core.hasItem('I326') && (!bugFix || !core.hasSpecial(sp, 64))) this.chargeKi(h, Math.round(pdmg / 3));
					if (core.hasItem('I327')) m.tired += 5;
				}
				if (!core.hasSpecial(sp, 60) && (!bugFix || !core.hasSpecial(sp, 64)) && (!moyan || bugFix)) this.chargeKi(h, Math.round(dmg / 10));
				if (core.hasSpecial(sp, 58) && ((bugFix && m.mana >= m.mmax && dmg > 0) || (!bugFix && dmg > m.atk - h.def)) && !this.useKi(h, 1)) h.charge = 0; // 神气合一bug
				if (m.mana >= m.mmax && dmg + pdmg > 0 && !moyan && m.mmax > 0) {
					m.mana = 0;
					m.tired += 1;
				} else if (!moyan && m.mmax > 0) {
					if (!core.hasSpecial(sp, 55)) m.mana += this.atkMana(m.atk, h.def, 1).now;
					if (pdmg >= 1) m.mana += this.atkMana(m.atk, p.def, 1).now;
					if (m.mana > m.mmax) m.mana = m.mmax;
				} else if (moyan && selfNormalHit) this.chargeKi(h, this.atkMana(h.atk, h.def).now);
				h.hp -= dmg;
				p.hp -= pdmg;
				if (core.hasSpecial(sp, 52)) h.tired += 1;
				if (core.hasSpecial(sp, 53)) h.tired += 1;
				if (core.hasSpecial(sp, 54)) h.tired += 3;
				if (core.hasSpecial(sp, 56) && dmg > 0) h.tired += 4;
				if (core.hasSpecial(sp, 83)) h.tired += 4;
				if (core.hasSpecial(sp, 57)) m.hp += Math.round((dmg + pdmg) / m.vampireRate);
				if (core.hasSpecial(sp, 62)) m.tired = Math.max(0, m.tired - 1);
				if (core.hasSpecial(sp, 81)) {
					if (!m.sp2) {
						h.def = Math.max(0, h.def - 12);
						m.sp2 = 2;
					} else m.sp2--;
				}
				if (core.hasSpecial(sp, 89)) {
					if (!m.sp2) {
						h.atk = Math.max(0, h.atk - 20);
						h.def = Math.max(0, h.def - 5);
						m.sp2 = 1;
					} else m.sp2--;
				}
				if (core.hasSpecial(sp, 82) && (core.hasFlag("poison") || s.turn > 4)) {
					if (!m.sp2) {
						m.atk += 10;
						m.def += 10;
						m.sp2 = 1;
					} else m.sp2--;
				}
				if (core.hasSpecial(sp, 88)) {
					this.chargeKi(h, -40);
					m.mana = Math.min(m.mmax, m.mana + 40);
				}
				if (core.hasSpecial(sp, 91) && dmg > 0) {
					if (!m.sp2) {
						h.tired += 8;
						m.sp2 = 1;
					} else if (m.sp2 == 1) {
						this.chargeKi(h, -30);
						m.sp2 = 2;
					} else if (m.sp2 == 2) {
						m.hp += Math.round(dmg / 5);
						m.sp2 = 0;
					}
				}
				h.res += (',mon:' + h.ki + '+' + h.charge);
			}
			s.hdmg = dmg;
			s.pdmg = pdmg;
			s.skillBar += skill;
			if (!flags.swordUsed && h.ki > 0) s.bug = true;
			return s;
		}
		this.deepBreath = function (s, str) {
			var h = s.h;
			if (str.substr(0, 2) == '-V' && h.tired >= core.getFlag('deepBreath', 5) && h.ki > 0) {
				str = str.substr(1);
				s.skillBar += '-';
			}
			if (str.substr(0, 1) == 'V') {
				str = str.substr(1);
				if (h.tired > 0 && this.useKi(h, 1)) {
					h.tired = Math.max(0, h.tired - core.getFlag('deepBreath', 5));
				}
				s.skillBar += 'V';
				this.deepBreath(s, str);
			}
			return str;
		}
		this.removeStopper = function (str, turn, stat) {
			var s = str.indexOf('@');
			stat = stat || [];
			if (s >= 0 && /[1-5]/.test(str.substr(s + 1))) {
				var t = (str.substr(s + 1).match(/\d+/g) || [])[0];
				if (str.substr(s + 1).indexOf(t) != 0) return str;
				if (turn >= t) {
					if (s == 0) stat.skillBar += str.substr(0, t.length + 1);
					str = this.removeStopper(str.substr(0, s) + str.substr(s + t.length + 1), turn, stat);
				}
			}
			return str;
		}


		// 机关门开门条件：左下右下无物品
		core.events._openDoor_check = function (block, x, y, needKey) {
			var clearAndReturn = function () {
				core.clearContinueAutomaticRoute();
				return false;
			}

			if (block == null || block.event == null) return clearAndReturn();
			var id = block.event.id;

			// 是否存在门或暗墙
			if (core.material.icons.animates[id] == null && core.material.icons.npc48[id] == null) {
				return clearAndReturn();
			}

			if (id == 'steelDoor')
				needKey = false;
			if (id == 'specialDoor' && !core.getBlock(x - 1, y + 1) && !core.getBlock(x + 1, y + 1))
				needKey = false;
			var doorInfo = core.getBlockById(id).event;
			if (doorInfo == null || doorInfo.doorInfo == null)
				return clearAndReturn();
			doorInfo = doorInfo.doorInfo;
			// Check all keys
			var keyInfo = doorInfo.keys || {};
			if (needKey) {
				for (var keyName in keyInfo) {
					var keyValue = keyInfo[keyName];
					if (keyName.endsWith(':o')) keyName = keyName.substring(0, keyName.length - 2);

					// --- 如果是一个不存在的道具，则直接认为无法开启
					if (!core.material.items[keyName]) {
						core.stopSound();
						core.playSound('操作失败');
						if (id == 'specialDoor') core.drawTip("机关门开启条件为：门的左下以及右下必须为空地");
						else core.drawTip("无法开启此门");
						return clearAndReturn();
					}
					if (core.itemCount(keyName) < keyValue) {
						core.stopSound();
						core.playSound('操作失败');
						core.drawTip("你的" + ((core.material.items[keyName] || {}).name || "钥匙") + "不足！", null, true);
						return false;
					}
				}
				if (!core.status.event.id) core.autosave(true);
				for (var keyName in keyInfo) {
					if (!keyName.endsWith(':o')) core.removeItem(keyName, keyInfo[keyName]);
				}
			}
			core.playSound(doorInfo.openSound);
			return true;
		}

		core.enemys.nextCriticals = function (enemy, number, x, y, floorId) {
			if (typeof enemy == 'string') enemy = core.material.enemys[enemy];
			number = number || 1;

			if (this.hasSpecial(enemy.special, 10)) return []; // 模仿怪物临界
			var info = this.getDamageInfo(enemy, null, x, y, floorId);
			if (info == null || this.hasSpecial(enemy.special, 3)) { // 未破防，或是坚固怪
				info = this.getEnemyInfo(enemy, null, x, y, floorId);
				if (core.status.hero.atk + core.getFlag('atkm', 10) < info.def) {
					return [
						[info.def - core.status.hero.atk - core.getFlag('atkm', 10), '?']
					];
				}
				return [];
			}

			// getDamageInfo直接返回数字；0伤且无负伤(此塔0伤不算临界)
			if (typeof info == 'number' || (info.damage <= 0 && (1 || !core.flags.enableNegativeDamage))) {
				return [
					[0, 0]
				];
			}

			if (core.flags.useLoop) {
				var LOOP_MAX_VALUE = 5000;
				if (core.status.hero.atk < LOOP_MAX_VALUE) {
					return this._nextCriticals_useLoop(enemy, info, number, x, y, floorId);
				} else {
					return this._nextCriticals_useBinarySearch(enemy, info, number, x, y, floorId);
				}
			} else {
				return this._nextCriticals_useTurn(enemy, info, number, x, y, floorId);
			}
		}

		core.enemys._nextCriticals_useLoop = function (enemy, info, number, x, y, floorId) {
			var mon_hp = info.mon_hp,
				hero_atk = core.status.hero.atk,
				mon_def = info.mon_def,
				pre = info.damage;
			var list = [];
			for (var atk = hero_atk + 1; atk <= hero_atk + core.getFlag('criMax', 99); atk++) {
				var nextInfo = this.getDamageInfo(enemy, { "atk": atk }, x, y, floorId);
				if (nextInfo == null || (typeof nextInfo == 'number')) break;
				if (pre != nextInfo.damage) {
					pre = nextInfo.damage;
					list.push([atk - hero_atk, info.damage - nextInfo.damage]);
					if (nextInfo.damage <= 0 && !core.flags.enableNegativeDamage) break;
					if (list.length >= number) break;
				}
			}
			if (list.length == 0) list.push([1 + core.getFlag('criMax', 99), '?']);
			return list;
		}

		core.ui._drawBook_drawRow3 = function (index, enemy, top, left, width, position) {
			// 绘制第三行
			core.setTextAlign('ui', 'left');
			var b13 = this._buildFont(13, true),
				f13 = this._buildFont(13, false);
			var col1 = left,
				col2 = left + width * 9 / 25,
				col3 = left + width * 17 / 25;
			var s = core.getRecomSkill(enemy.id);
			core.fillText('ui', '气息容量', col1, position, '#DDDDDD', f13);
			core.fillText('ui', core.formatBigNumber(enemy.value || 0), col1 + 56, position, null, b13);
			if (s) {
				core.fillText('ui', '推荐技能', col2, position, '#DDDDDD', f13);
				core.fillText('ui', (!s) ? '无法战胜此怪物' : (s.skill == '' ? '无' : s.skill) + '/' + s.ratio, col2 + 56, position, null, b13);
			} else {
				if ((core.getDamageInfo(enemy) || []).damage <= 0) {
					var info = core.atkMana(core.status.hero.atk, core.enemys.getEnemyInfo(enemy).def);
					if (info && info.cri) {
						core.fillText('ui', '勇者攻增气临界', col2, position, '#DDDDDD', f13);
						core.fillText('ui', info.cri, col2 + 95, position, null, b13);
					}
				}

			}
		}

		core.ui._drawBook_drawDamage = function (index, enemy, offset, position) {
			core.setTextAlign('ui', 'center');
			var damageString = core.getDamageString(enemy);
			if (enemy.notBomb) damage += "[b]";
			if (damageString.damage == '???') damageString.damage = '无法战斗';
			core.fillText('ui', damageString.damage, offset, position, damageString.color, this._buildFont(13, true));
		}

		core.enemys.canBattle = function (enemy, x, y, floorId) {
			if (typeof enemy == 'string') enemy = core.material.enemys[enemy];
			// 		var damage = core.enemys.getDamage(enemy, x, y, floorId);
			// 		if (enemy == null) return null;
			// 		if (typeof enemy == 'string') enemy = core.material.enemys[enemy];
			if (flags.autoRecomBattle && !core.isReplaying()) {
				var skill = (core.getRecomSkill(enemy, x, y, floorId) || []).skill || "";
				if (skill != flags.skillName) {
					core.setFlag("skillName", skill);
					core.status.route.splice(core.status.route.length - 1, 0, "key:57", "input2:" + core.encodeBase64(skill));
				}
			}
			var info = this.getDamageInfo(enemy, hero, x, y, floorId);
			if (info == null) return false;
			var pdmg = info.pdmg || 0,
				hdmg = info.damage - pdmg;
			return hdmg < core.status.hero.hp && pdmg < core.status.hero.hpmax;
		}

		core.enemys.getDamageString = function (enemy, x, y, floorId) {
			if (typeof enemy == 'string') enemy = core.material.enemys[enemy];
			var damage;
			if (flags.autoRecomBattle) {
				var nowSkill = flags.skillName;
				core.setFlag("skillName", (core.getRecomSkill(enemy, x, y, floorId) || []).skill || "");
				damage = this.getDamage(enemy, x, y, floorId);
				core.setFlag("skillName", nowSkill);
			} else damage = this.getDamage(enemy, x, y, floorId);
			if (enemy == null) return null;
			if (typeof enemy == 'string') enemy = core.material.enemys[enemy];
			var info = this.getDamageInfo(enemy, hero, x, y, floorId);
			var pdmg = (info || {}).pdmg || 0,
				hdmg = damage - pdmg;
			var color = '#000000';

			if (damage == null) {
				damage = "???";
				color = '#FF2222';
			} else {
				var ratio = Math.max(hdmg / core.status.hero.hp, pdmg / core.status.hero.hpmax);
				if (ratio <= 0) color = '#1F1';
				else if (ratio < 0.05) color = '#9F9';
				else if (ratio < 0.1) color = '#CFC';
				else if (ratio < 0.15) color = '#FFF';
				else if (ratio < 0.2) color = '#FFC';
				else if (ratio < 0.3) color = '#FF9';
				else if (ratio < 0.4) color = '#FF0';
				else if (ratio < 0.5) color = '#FC1';
				else if (ratio < 1) color = '#F93';
				else color = '#F22';

				damage = core.formatBigNumber(damage, true);
				if (core.enemys.hasSpecial(enemy, 19))
					damage += "+";
				if (core.enemys.hasSpecial(enemy, 21))
					damage += "-";
				if (core.enemys.hasSpecial(enemy, 11))
					damage += "^";
			}

			return {
				"damage": damage,
				"color": color
			};
		}

		core.ui._drawSLPanel_drawRecord = function (title, data, x, y, size, cho, highLight) {
			var globalAttribute = core.status.globalAttribute || core.initStatus.globalAttribute;
			var strokeColor = globalAttribute.selectColor;
			if (core.status.event.selection) strokeColor = '#FF6A6A';
			if (!data || !data.floorId) highLight = false;
			if (data && data.__toReplay__) title = '[R]' + title;

			core.fillText('ui', title, x, y, highLight ? globalAttribute.selectColor : '#FFFFFF', this._buildFont(17, true));
			core.strokeRect('ui', x - size / 2, y + 15, size, size, cho ? strokeColor : '#FFFFFF', cho ? 6 : 2);
			if (data && data.floorId) {
				core.setTextAlign('ui', "center");
				var map = core.maps.loadMap(data.maps, data.floorId);
				core.extractBlocksForUI(map, data.hero.flags);
				core.drawThumbnail(data.floorId, map.blocks, {
					heroLoc: data.hero.loc,
					heroIcon: data.hero.image,
					flags: data.hero.flags,
					ctx: 'ui',
					x: x - size / 2,
					y: y + 15,
					size: size,
					centerX: data.hero.loc.x,
					centerY: data.hero.loc.y
				});
				if (core.isPlaying() && core.getFlag("hard") != data.hero.flags.hard) {
					core.fillRect('ui', x - size / 2, y + 15, size, size, [0, 0, 0, 0.4]);
					core.fillText('ui', data.hard, x, parseInt(y + 22 + size / 2), data.hero.flags.__hardColor__ || 'red', this._buildFont(30, true));
				}
				// 绘制存档笔记
				if (data.hero.notes && data.hero.notes.length > 0) {
					core.setTextAlign('ui', 'left');
					if (data.hero.notes.length >= 2) {
						core.fillRect('ui', x - size / 2, y + 15, size, 28, [0, 0, 0, 0.3]);
						core.fillBoldText('ui', data.hero.notes.length - 1 + ". " + data.hero.notes[data.hero.notes.length - 2].substring(0, 10),
							x - size / 2 + 2, y + 15 + 12, '#FFFFFF', null, this._buildFont(10, false));
						core.fillBoldText('ui', data.hero.notes.length + ". " + data.hero.notes[data.hero.notes.length - 1].substring(0, 10),
							x - size / 2 + 2, y + 15 + 24);
					} else {
						core.fillRect('ui', x - size / 2, y + 15, size, 16, [0, 0, 0, 0.3]);
						core.fillBoldText('ui', data.hero.notes.length + ". " + data.hero.notes[data.hero.notes.length - 1].substring(0, 10),
							x - size / 2 + 2, y + 15 + 12, '#FFFFFF', null, this._buildFont(10, false));
					}
				}
				core.setTextAlign('ui', "center");
				var v = core.formatBigNumber(data.hero.hp, true) + "/" + core.formatBigNumber(data.hero.atk, true) + "/" + core.formatBigNumber(data.hero.def, true);
				var v2 = "/" + (data.hero.mana / data.hero.manamax * 6).toFixed(2);
				if (core.calWidth('ui', v + v2, this._buildFont(10, false)) <= size) v += v2;
				core.fillText('ui', v, x, y + 30 + size, globalAttribute.selectColor);
				core.fillText('ui', core.formatDate(new Date(data.time)), x, y + 43 + size, data.hero.flags.debug ? '#FF6A6A' : '#FFFFFF');
			} else {
				core.fillRect('ui', x - size / 2, y + 15, size, size, '#333333');
				core.fillText('ui', '空', x, parseInt(y + 22 + size / 2), '#FFFFFF', this._buildFont(30, true));
			}
		}
		core.control._updateDamage_damage = function (floorId, onMap) {
			core.status.damage.data = [];
			if (!core.flags.displayEnemyDamage && !core.flags.displayExtraDamage) return;

			core.extractBlocks(floorId);
			core.status.maps[floorId].blocks.forEach(function (block) {
				var x = block.x,
					y = block.y;

				// v2优化，只绘制范围内的部分
				if (onMap && core.bigmap.v2) {
					if (x < core.bigmap.posX - core.bigmap.extend || x > core.bigmap.posX + core.__SIZE__ + core.bigmap.extend || y < core.bigmap.posY - core.bigmap.extend || y > core.bigmap.posY + core.__SIZE__ + core.bigmap.extend) {
						return;
					}
				}

				if (!block.disable && block.event.cls.indexOf('enemy') == 0 && block.event.displayDamage !== false) {
					var enemy = core.material.enemys[block.event.id];
					var condition = hero.atk + '@' + hero.def + '@' + hero.mdef + '@' + flags.deepBreath + '@' + flags.tiredMax + '@' + flags.sxzl;
					var battleInfo = enemy.id + '@' + core.getFlag('skillName', '') + '@' + core.getEquip(0) + '@' + core.getEquip(1) + '@' + core.hasItem('I325') + '@' + core.hasItem('I326') + '@' + core.hasItem('I327') + '@' + flags.swordUsed;
					if (core.flags.displayCritical && !(core.isReplaying() && !flags.replayCriRecom)) {
						var cache = core.getFlag('@@_critical__@' + battleInfo, [null, null]);
						var critical;
						if (cache[1] == condition && typeof critical == 'object') critical = cache[0];
						else {
							critical = core.enemys.nextCriticals(block.event.id, 1, x, y, floorId);
							var color = '#FFFFFF';
							if ((critical[0] || [])[1] < 0) color = '#F93';
							if ((critical[0] || [])[0] > core.getFlag('criMax', 99)) critical = core.getFlag('criMax', 99) + '+';
							else {
								critical = core.formatBigNumber((critical[0] || [])[0], true);
								if (critical == '???') critical = '?';
							}
							var info = core.getDamageInfo(block.event.id, null, x, y, floorId);
							if (info && info.damage <= 0) {
								info = core.atkMana(core.status.hero.atk, core.enemys.getEnemyInfo(block.event.id, null, x, y, floorId).def);
								if (info && info.cri) {
									critical = info.cri;
									color = '#F93';
								} else critical = '';
							}
							critical = { "cri": critical, "color": color };
							core.setFlag('@@_critical__@' + battleInfo, [critical, condition]);
						}
						core.status.damage.data.push({ text: critical.cri, px: 32 * x + 1, py: 32 * (y + 1) - 11, color: critical.color });
					}
					condition += '@' + hero.mana + '@' + hero.manamax;
					if (!flags.noRecomSkill && !(core.isReplaying() && !flags.replayCriRecom)) {
						var cache = core.getFlag('@@_recomSkill__@' + battleInfo, [null, null]);
						var skill;
						if (cache[1] == condition) skill = cache[0];
						else {
							skill = (core.getRecomSkill(block.event.id, x, y, floorId) || []).skill || "";
							core.setFlag('@@_recomSkill__@' + battleInfo, [skill, condition]);
						}
						core.status.damage.data.push({ text: skill.length > 4 ? skill.substr(0, 3) + ".." : skill, px: 32 * x + 1, py: 32 * (y + 1) - 21, color: '#FFFFFF' });
					}
					condition += '@' + hero.hp + '@' + hero.hpmax;
					if (core.flags.displayEnemyDamage) {
						var cache = core.getFlag('@@_damage__@' + battleInfo, [{}, null]);
						var damageString;
						if (cache[1] == condition) damageString = cache[0];
						else {
							damageString = core.enemys.getDamageString(block.event.id, x, y, floorId);
							core.setFlag('@@_damage__@' + battleInfo, [damageString, condition]);
						}
						core.status.damage.data.push({ text: damageString.damage, px: 32 * x + 1, py: 32 * (y + 1) - 1, color: damageString.color });
					}
				}
			});
		}

		this.clearMyCache = function (type) {
			Object.keys(core.status.hero.flags).forEach(function (name) {
				if ((type == 'all' && name.startsWith("@@_")) || name.startsWith("@@_" + type + "__@")) {
					delete core.status.hero.flags[name];
				}
			});
		}

		core.ui._drawBookDetail_turnAndCriticals = function (enemy, floorId, texts) {
			var damageInfo = core.getDamageInfo(enemy.id, null, enemy.x, enemy.y, floorId);
			var hdmg = (damageInfo || {}).hdmg || 0,
				pdmg = (damageInfo || {}).pdmg || 0;
			if (hdmg > 0 && pdmg > 0) texts.push("\r[#FF6A6A]\\d伤害分布：\\d\r[]勇者" + hdmg + "，公主" + pdmg);
			texts.push("\r[#FF6A6A]\\d战斗回合数：\\d\r[]" + ((damageInfo || {}).turn || 0));
			// 临界表
			var criticals = core.enemys.nextCriticals(enemy.id, 8, enemy.x, enemy.y, floorId).map(function (v) {
				if (v[0] > core.getFlag('criMax', 99)) return core.getFlag('criMax', 99) + "+:???";
				else return core.formatBigNumber(v[0]) + ":" + core.formatBigNumber(v[1]);
			});
			while (criticals[0] == '0:0') criticals.shift();
			texts.push("\r[#FF6A6A]\\d临界表：\\d\r[]" + JSON.stringify(criticals));
			var prevInfo = core.getDamageInfo(enemy.id, { atk: core.status.hero.atk - 1 }, null, null, floorId);
			if (prevInfo != null && damageInfo != null) {
				if (damageInfo.damage != null) damageInfo = damageInfo.damage;
				if (prevInfo.damage != null) prevInfo = prevInfo.damage;
				if (prevInfo > damageInfo) {
					texts.push("（当前攻击力正位于临界点上）")
				}
			}
			var skill = core.getSkillPerform(enemy.id, 0, enemy.x, enemy.y, floorId),
				list = [];
			if (skill && skill.length > 0) {
				list.push((skill[0][0] == "" ? "无" : skill[0][0]) + ":气息max");
				skill.splice(0, 1);
				skill.forEach(function (s) {
					list.push(s[0] + ":" + s[3] + "(" + s[2] + "气换" + s[1] + "血)");
				})
				texts.push("\r[#FF6A6A]\\d技能价值表：\\d\r[]" + JSON.stringify(list));
			}
			var enemyInfo = core.enemys.getEnemyInfo(enemy.id, null, enemy.x, enemy.y, floorId),
				damageInfo = core.getDamageInfo(enemy.id, null, enemy.x, enemy.y, floorId);
			var atkMana = core.atkMana(hero.atk, enemyInfo.def);
			if (damageInfo) texts.push("\r[#FF6A6A]\\d勇者攻增气：\\d\r[]" + atkMana.now + (atkMana.cri ? "  \r[#FF6A6A]\\d临界：\\d\r[]攻击+" + atkMana.cri : ""));
			atkMana = 0;
			if (!core.hasSpecial(enemy.id, 55)) atkMana += core.atkMana(enemyInfo.atk, hero.def, 1).now;
			if (core.hasSpecial(enemy.id, 55) || core.hasSpecial(enemy.id, 61) || core.hasSpecial(enemy.id, 62) || core.hasSpecial(enemy.id, 63) || core.hasSpecial(enemy.id, 64) || core.hasSpecial(enemy.id, 65)) atkMana += core.atkMana(enemyInfo.atk, hero.mdef, 1).now;
			if (damageInfo && damageInfo.damage > 0) texts.push("\r[#FF6A6A]\\d怪物攻增气：\\d\r[]" + atkMana + "  \r[#FF6A6A]\\d防增气：\\d\r[]" + Math.max(0, Math.round((hero.atk - enemyInfo.def) / 3)));
		}

		core.enemys.getCurrentEnemys = function (floorId) {
			floorId = floorId || core.status.floorId;
			var enemys = [],
				used = {};
			core.extractBlocks(floorId);
			core.status.maps[floorId].blocks.forEach(function (block) {
				if (!block.disable && block.event.cls.indexOf('enemy') == 0) {
					this._getCurrentEnemys_addEnemy(block.event.id, enemys, used, block.x, block.y, floorId);
					if (block.event.id == 'darkKnight') this._getCurrentEnemys_addEnemy('soldier', enemys, used, block.x, block.y, floorId);
					if (block.event.id == 'soldier' || block.event.id == 'darkKnight') this._getCurrentEnemys_addEnemy('ghostSkeleton', enemys, used, block.x, block.y, floorId);
					if (block.event.id == 'E384') this._getCurrentEnemys_addEnemy('E385', enemys, used, block.x, block.y, floorId);
				}
			}, this);
			return this._getCurrentEnemys_sort(enemys);
		}

		core.maps._canMoveDirectly_checkStartPoint = function (sx, sy) {
			if (core.status.checkBlock.damage[sx + "," + sy]) return false;
			var block = core.getBlock(sx, sy);
			if (block != null) {
				// 只有起点是传送点才是能无视
				return !block.event.trigger || block.event.trigger == 'changeFloor' || ['A376'].indexOf(block.event.id) >= 0;
			}
			return true;
		}

		core.ui._drawSwitchs = function () {
			core.status.event.id = 'switchs';
			var choices = [
				"音效设置",
				"显示设置",
				"操作设置",
				"高级设置[U]",
				"返回主菜单"
			];
			this.drawChoices(null, choices);
		}

		core.actions._clickSwitchs = function (x, y) {
			var choices = core.status.event.ui.choices;
			var topIndex = this._getChoicesTopIndex(choices.length);
			var selection = y - topIndex;
			if (x < this.CHOICES_LEFT || x > this.CHOICES_RIGHT) return;
			if (selection >= 0 && selection < choices.length) {
				core.status.event.selection = selection;
				switch (selection) {
					case 0:
						core.status.event.selection = 0;
						core.playSound('确定');
						return core.ui._drawSwitchs_sounds();
					case 1:
						core.status.event.selection = 0;
						core.playSound('确定');
						return core.ui._drawSwitchs_display();
					case 2:
						core.status.event.selection = 0;
						core.playSound('确定');
						return core.ui._drawSwitchs_action();
					case 3:
						core.status.event.selection = 0;
						core.playSound('确定');
						core.status.route.push("key:85");
						core.insertCommonEvent('高级设置');
						return;
					case 4:
						core.status.event.selection = 0;
						core.playSound('取消');
						return core.ui._drawSettings();
				}
			}
		}

		core.actions._keyUpSL = function (keycode) {
			var page = core.status.event.data.page,
				offset = core.status.event.data.offset;
			var index = page * 10 + offset;

			if (keycode == 27 || keycode == 88 || (core.status.event.id == 'save' && (keycode == 83 || keycode == 219)) || (core.status.event.id == 'load' && (keycode == 68 || keycode == 221))) {
				this._clickSL(this.LAST, this.LAST);
				return;
			}
			if (keycode >= 48 && keycode <= 57) {
				if (keycode == 48) keycode = 58;
				core.ui._drawSLPanel((keycode - 49) * 1000 + 1);
				return;
			}
			if (keycode == 13 || keycode == 32 || keycode == 67) {
				if (offset == 0)
					core.doSL("autoSave", core.status.event.id);
				else {
					var id = 5 * page + offset;
					if (core.status.event.data.mode == 'fav') id = core.saves.favorite[id - 1];
					core.doSL(id, core.status.event.id);
				}
				return;
			}
			if (keycode == 69 && core.status.event.id != 'save') { // E 收藏切换
				this._clickSL(0, this.LAST);
				return;
			}
			if (keycode == 46) {
				if (offset == 0) {
					core.playSound('操作失败');
					core.drawTip("无法删除自动存档！");
				} else {
					var id = 5 * page + offset;
					if (core.status.event.data.mode == 'fav') id = core.saves.favorite[id - 1];
					core.removeSave(id, function () {
						core.ui._drawSLPanel(index, true);
					});
				}
			}
			if (keycode == 70 && core.status.event.data.mode == 'all') { // F
				this._clickSL_favorite(page, offset);
			}
		}
	},
	"shop": function () {
		// 【全局商店】相关的功能
		// 
		// 打开一个全局商店
		// shopId：要打开的商店id；noRoute：是否不计入录像
		this.openShop = function (shopId, noRoute) {
			var shop = core.status.shops[shopId];
			// Step 1: 检查能否打开此商店
			if (!this.canOpenShop(shopId)) {
				core.drawTip("该商店尚未开启");
				return false;
			}

			// Step 2: （如有必要）记录打开商店的脚本事件
			if (!noRoute) {
				core.status.route.push("shop:" + shopId);
			}

			// Step 3: 检查道具商店 or 公共事件
			if (shop.item) {
				if (core.openItemShop) {
					core.openItemShop(shopId);
				} else {
					core.playSound('操作失败');
					core.insertAction("道具商店插件不存在！请检查是否存在该插件！");
				}
				return;
			}
			if (shop.commonEvent) {
				core.insertCommonEvent(shop.commonEvent, shop.args);
				return;
			}

			// Step 4: 执行标准公共商店    
			core.insertAction(this._convertShop(shop));
			return true;
		}

		////// 将一个全局商店转变成可预览的公共事件 //////
		this._convertShop = function (shop) {
			return [
				{ "type": "function", "function": "function() {core.setFlag('@temp@shop', true);}" },
				{
					"type": "while",
					"condition": "true",
					"data": [
						// 检测能否访问该商店
						{
							"type": "if",
							"condition": "core.isShopVisited('" + shop.id + "')",
							"true": [
								// 可以访问，直接插入执行效果
								{ "type": "function", "function": "function() { core.plugin._convertShop_replaceChoices('" + shop.id + "', false) }" },
							],
							"false": [
								// 不能访问的情况下：检测能否预览
								{
									"type": "if",
									"condition": shop.disablePreview,
									"true": [
										// 不可预览，提示并退出
										{ "type": "playSound", "name": "操作失败" },
										"当前无法访问该商店！",
										{ "type": "break" },
									],
									"false": [
										// 可以预览：将商店全部内容进行替换
										{ "type": "tip", "text": "当前处于预览模式，不可购买" },
										{ "type": "function", "function": "function() { core.plugin._convertShop_replaceChoices('" + shop.id + "', true) }" },
									]
								}
							]
						}
					]
				},
				{ "type": "function", "function": "function() {core.removeFlag('@temp@shop');}" }
			];
		}

		this._convertShop_replaceChoices = function (shopId, previewMode) {
			var shop = core.status.shops[shopId];
			var choices = (shop.choices || []).filter(function (choice) {
				if (choice.condition == null || choice.condition == '') return true;
				try { return core.calValue(choice.condition); } catch (e) { return true; }
			}).map(function (choice) {
				var ableToBuy = core.calValue(choice.need);
				return {
					"text": choice.text,
					"icon": choice.icon,
					"color": ableToBuy && !previewMode ? choice.color : [153, 153, 153, 1],
					"action": ableToBuy && !previewMode ? [{ "type": "playSound", "name": "确定" }].concat(choice.action) : [
						{ "type": "playSound", "name": "操作失败" },
						{ "type": "tip", "text": previewMode ? "预览模式下不可购买" : "购买条件不足" }
					]
				};
			}).concat({ "text": "离开", "action": [{ "type": "playSound", "name": "取消" }, { "type": "break" }] });
			core.insertAction({ "type": "choices", "text": shop.text, "choices": choices });
		}

		/// 是否访问过某个快捷商店
		this.isShopVisited = function (id) {
			if (!core.hasFlag("__shops__")) core.setFlag("__shops__", {});
			var shops = core.getFlag("__shops__");
			if (!shops[id]) shops[id] = {};
			return shops[id].visited;
		}

		/// 当前应当显示的快捷商店列表
		this.listShopIds = function () {
			return Object.keys(core.status.shops).filter(function (id) {
				return core.isShopVisited(id) || !core.status.shops[id].mustEnable;
			});
		}

		/// 是否能够打开某个商店
		this.canOpenShop = function (id) {
			if (this.isShopVisited(id)) return true;
			var shop = core.status.shops[id];
			if (shop.item || shop.commonEvent || shop.mustEnable) return false;
			return true;
		}

		/// 启用或禁用某个快捷商店
		this.setShopVisited = function (id, visited) {
			if (!core.hasFlag("__shops__")) core.setFlag("__shops__", {});
			var shops = core.getFlag("__shops__");
			if (!shops[id]) shops[id] = {};
			if (visited) shops[id].visited = true;
			else delete shops[id].visited;
		}

		/// 能否使用快捷商店
		this.canUseQuickShop = function (id) {
			// 如果返回一个字符串，表示不能，字符串为不能使用的提示
			// 返回null代表可以使用

			// 检查当前楼层的canUseQuickShop选项是否为false
			if (core.status.thisMap.canUseQuickShop === false)
				return '当前楼层不能使用快捷商店。';
			return null;
		}

		/// 允许商店X键退出
		core.registerAction('keyUp', 'shops', function (keycode) {
			if (!core.status.lockControl || !core.hasFlag("@temp@shop") || core.status.event.id != 'action') return false;
			if (core.status.event.data.type != 'choices') return false;
			var data = core.status.event.data.current;
			var choices = data.choices;
			var topIndex = core.actions._getChoicesTopIndex(choices.length);
			if (keycode == 88 || keycode == 27) { // X, ESC
				core.actions._clickAction(core.actions.HSIZE, topIndex + choices.length - 1);
				return true;
			}
			if (keycode == 13 || keycode == 32) return true;
			return false;
		}, 60);

		/// 允许长按空格或回车连续执行操作
		core.registerAction('keyDown', 'shops', function (keycode) {
			if (!core.status.lockControl || !core.hasFlag("@temp@shop") || core.status.event.id != 'action') return false;
			if (core.status.event.data.type != 'choices') return false;
			var data = core.status.event.data.current;
			var choices = data.choices;
			var topIndex = core.actions._getChoicesTopIndex(choices.length);
			if (keycode == 13 || keycode == 32) { // Space, Enter
				core.actions._clickAction(core.actions.HSIZE, topIndex + core.status.event.selection);
				return true;
			}
			return false;
		}, 60);

		// 允许长按屏幕连续执行操作
		core.registerAction('longClick', 'shops', function (x, y, px, py) {
			if (!core.status.lockControl || !core.hasFlag("@temp@shop") || core.status.event.id != 'action') return false;
			if (core.status.event.data.type != 'choices') return false;
			var data = core.status.event.data.current;
			var choices = data.choices;
			var topIndex = core.actions._getChoicesTopIndex(choices.length);
			if (x >= core.actions.CHOICES_LEFT && x <= core.actions.CHOICES_RIGHT && y >= topIndex && y < topIndex + choices.length) {
				core.actions._clickAction(x, y);
				return true;
			}
			return false;
		}, 60);
	},
	"removeMap": function () {
		// 高层塔砍层插件，删除后不会存入存档，不可浏览地图也不可飞到。
		// 推荐用法：
		// 对于超高层或分区域塔，当在1区时将2区以后的地图删除；1区结束时恢复2区，进二区时删除1区地图，以此类推
		// 这样可以大幅减少存档空间，以及加快存读档速度

		// 删除楼层
		// core.removeMaps("MT1", "MT300") 删除MT1~MT300之间的全部层
		// core.removeMaps("MT10") 只删除MT10层
		this.removeMaps = function (fromId, toId) {
			toId = toId || fromId;
			var fromIndex = core.floorIds.indexOf(fromId),
				toIndex = core.floorIds.indexOf(toId);
			if (toIndex < 0) toIndex = core.floorIds.length - 1;
			flags.__visited__ = flags.__visited__ || {};
			flags.__removed__ = flags.__removed__ || [];
			flags.__disabled__ = flags.__disabled__ || {};
			flags.__leaveLoc__ = flags.__leaveLoc__ || {};
			for (var i = fromIndex; i <= toIndex; ++i) {
				var floorId = core.floorIds[i];
				if (core.status.maps[floorId].deleted) continue;
				delete flags.__visited__[floorId];
				flags.__removed__.push(floorId);
				delete flags.__disabled__[floorId];
				delete flags.__leaveLoc__[floorId];
				(core.status.autoEvents || []).forEach(function (event) {
					if (event.floorId == floorId && event.currentFloor) {
						core.autoEventExecuting(event.symbol, false);
						core.autoEventExecuted(event.symbol, false);
					}
				});
				core.status.maps[floorId].deleted = true;
				core.status.maps[floorId].canFlyTo = false;
				core.status.maps[floorId].canFlyFrom = false;
				core.status.maps[floorId].cannotViewMap = true;
			}
		}

		// 恢复楼层
		// core.resumeMaps("MT1", "MT300") 恢复MT1~MT300之间的全部层
		// core.resumeMaps("MT10") 只恢复MT10层
		this.resumeMaps = function (fromId, toId) {
			toId = toId || fromId;
			var fromIndex = core.floorIds.indexOf(fromId),
				toIndex = core.floorIds.indexOf(toId);
			if (toIndex < 0) toIndex = core.floorIds.length - 1;
			flags.__removed__ = flags.__removed__ || [];
			for (var i = fromIndex; i <= toIndex; ++i) {
				var floorId = core.floorIds[i];
				if (!core.status.maps[floorId].deleted) continue;
				flags.__removed__ = flags.__removed__.filter(function (f) { return f != floorId; });
				core.status.maps[floorId] = core.loadFloor(floorId);
			}
		}

		// 分区砍层相关
		var inAnyPartition = function (floorId) {
			var inPartition = false;
			(core.floorPartitions || []).forEach(function (floor) {
				var fromIndex = core.floorIds.indexOf(floor[0]);
				var toIndex = core.floorIds.indexOf(floor[1]);
				var index = core.floorIds.indexOf(floorId);
				if (fromIndex < 0 || index < 0) return;
				if (toIndex < 0) toIndex = core.floorIds.length - 1;
				if (index >= fromIndex && index <= toIndex) inPartition = true;
			});
			return inPartition;
		}

		// 分区砍层
		this.autoRemoveMaps = function (floorId) {
			if (main.mode != 'play' || !inAnyPartition(floorId)) return;
			// 根据分区信息自动砍层与恢复
			(core.floorPartitions || []).forEach(function (floor) {
				var fromIndex = core.floorIds.indexOf(floor[0]);
				var toIndex = core.floorIds.indexOf(floor[1]);
				var index = core.floorIds.indexOf(floorId);
				if (fromIndex < 0 || index < 0) return;
				if (toIndex < 0) toIndex = core.floorIds.length - 1;
				if (index >= fromIndex && index <= toIndex) {
					core.resumeMaps(core.floorIds[fromIndex], core.floorIds[toIndex]);
				} else {
					core.removeMaps(core.floorIds[fromIndex], core.floorIds[toIndex]);
				}
			});
		}
	},
	"fiveLayers": function () {
		// 是否启用五图层（增加背景2层和前景2层） 将__enable置为true即会启用；启用后请保存后刷新编辑器
		// 背景层2将会覆盖背景层 被事件层覆盖 前景层2将会覆盖前景层
		// 另外 请注意加入两个新图层 会让大地图的性能降低一些
		// 插件作者：ad
		var __enable = false;
		if (!__enable) return;

		// 创建新图层
		function createCanvas(name, zIndex) {
			if (!name) return;
			var canvas = document.createElement('canvas');
			canvas.id = name;
			canvas.className = 'gameCanvas';
			// 编辑器模式下设置zIndex会导致加入的图层覆盖优先级过高
			if (main.mode != "editor") canvas.style.zIndex = zIndex || 0;
			// 将图层插入进游戏内容
			document.getElementById('gameDraw').appendChild(canvas);
			var ctx = canvas.getContext('2d');
			core.canvas[name] = ctx;
			if (core.domStyle.hdCanvas.indexOf('name') >= 0)
				core.maps._setHDCanvasSize(ctx, core.__PIXELS__, core.__PIXELS__);
			else {
				canvas.width = core.__PIXELS__;
				canvas.height = core.__PIXELS__;
			}
			return canvas;
		}

		var bg2Canvas = createCanvas('bg2', 20);
		var fg2Canvas = createCanvas('fg2', 63);
		// 大地图适配
		core.bigmap.canvas = ["bg2", "fg2", "bg", "event", "event2", "fg", "damage"];
		core.initStatus.bg2maps = {};
		core.initStatus.fg2maps = {};

		if (main.mode == 'editor') {
			/*插入编辑器的图层 不做此步新增图层无法在编辑器显示*/
			// 编辑器图层覆盖优先级 eui > efg > fg(前景层) > event2(48*32图块的事件层) > event(事件层) > bg(背景层)
			// 背景层2(bg2) 插入事件层(event)之前(即bg与event之间)
			document.getElementById('mapEdit').insertBefore(bg2Canvas, document.getElementById('event'));
			// 前景层2(fg2) 插入编辑器前景(efg)之前(即fg之后)
			document.getElementById('mapEdit').insertBefore(fg2Canvas, document.getElementById('ebm'));
			// 原本有三个图层 从4开始添加
			var num = 4;
			// 新增图层存入editor.dom中
			editor.dom.bg2c = core.canvas.bg2.canvas;
			editor.dom.bg2Ctx = core.canvas.bg2;
			editor.dom.fg2c = core.canvas.fg2.canvas;
			editor.dom.fg2Ctx = core.canvas.fg2;
			editor.dom.maps.push('bg2map', 'fg2map');
			editor.dom.canvas.push('bg2', 'fg2');

			// 创建编辑器上的按钮
			var createCanvasBtn = function (name) {
				// 电脑端创建按钮
				var input = document.createElement('input');
				// layerMod4/layerMod5
				var id = 'layerMod' + num++;
				// bg2map/fg2map
				var value = name + 'map';
				input.type = 'radio';
				input.name = 'layerMod';
				input.id = id;
				input.value = value;
				editor.dom[id] = input;
				input.onchange = function () {
					editor.uifunctions.setLayerMod(value);
				}
				return input;
			};

			var createCanvasBtn_mobile = function (name) {
				// 手机端往选择列表中添加子选项
				var input = document.createElement('option');
				var id = 'layerMod' + num++;
				var value = name + 'map';
				input.name = 'layerMod';
				input.value = value;
				editor.dom[id] = input;
				return input;
			};
			if (!editor.isMobile) {
				var input = createCanvasBtn('bg2');
				var input2 = createCanvasBtn('fg2');
				// 获取事件层及其父节点
				var child = document.getElementById('layerMod'),
					parent = child.parentNode;
				// 背景层2插入事件层前
				parent.insertBefore(input, child);
				// 不能直接更改背景层2的innerText 所以创建文本节点
				var txt = document.createTextNode('背景层2');
				// 插入事件层前(即新插入的背景层2前)
				parent.insertBefore(txt, child);
				// 向最后插入前景层2(即插入前景层后)
				parent.appendChild(input2);
				var txt2 = document.createTextNode('前景层2');
				parent.appendChild(txt2);
			} else {
				var input = createCanvasBtn_mobile('bg2');
				var input2 = createCanvasBtn_mobile('fg2');
				// 手机端因为是选项 所以可以直接改innerText
				input.innerText = '背景层2';
				input2.innerText = '前景层2';
				var parent = document.getElementById('layerMod');
				parent.insertBefore(input, parent.children[1]);
				parent.appendChild(input2);
			}
		}

		var _loadFloor_doNotCopy = core.maps._loadFloor_doNotCopy;
		core.maps._loadFloor_doNotCopy = function () {
			return ["bg2map", "fg2map"].concat(_loadFloor_doNotCopy());
		}
		////// 绘制背景和前景层 //////
		core.maps._drawBg_draw = function (floorId, toDrawCtx, cacheCtx, config) {
			config.ctx = cacheCtx;
			core.maps._drawBg_drawBackground(floorId, config);
			// ------ 调整这两行的顺序来控制是先绘制贴图还是先绘制背景图块；后绘制的覆盖先绘制的。
			core.maps._drawFloorImages(floorId, config.ctx, 'bg', null, null, config.onMap);
			core.maps._drawBgFgMap(floorId, 'bg', config);
			if (config.onMap) {
				core.drawImage(toDrawCtx, cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
				core.clearMap('bg2');
				core.clearMap(cacheCtx);
			}
			core.maps._drawBgFgMap(floorId, 'bg2', config);
			if (config.onMap) core.drawImage('bg2', cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
			config.ctx = toDrawCtx;
		}
		core.maps._drawFg_draw = function (floorId, toDrawCtx, cacheCtx, config) {
			config.ctx = cacheCtx;
			// ------ 调整这两行的顺序来控制是先绘制贴图还是先绘制前景图块；后绘制的覆盖先绘制的。
			core.maps._drawFloorImages(floorId, config.ctx, 'fg', null, null, config.onMap);
			core.maps._drawBgFgMap(floorId, 'fg', config);
			if (config.onMap) {
				core.drawImage(toDrawCtx, cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
				core.clearMap('fg2');
				core.clearMap(cacheCtx);
			}
			core.maps._drawBgFgMap(floorId, 'fg2', config);
			if (config.onMap) core.drawImage('fg2', cacheCtx.canvas, core.bigmap.v2 ? -32 : 0, core.bigmap.v2 ? -32 : 0);
			config.ctx = toDrawCtx;
		}
		////// 移动判定 //////
		core.maps._generateMovableArray_arrays = function (floorId) {
			return {
				bgArray: this.getBgMapArray(floorId),
				fgArray: this.getFgMapArray(floorId),
				eventArray: this.getMapArray(floorId),
				bg2Array: this._getBgFgMapArray('bg2', floorId),
				fg2Array: this._getBgFgMapArray('fg2', floorId)
			};
		}
	},
	"itemShop": function () {
		// 道具商店相关的插件
		// 可在全塔属性-全局商店中使用「道具商店」事件块进行编辑（如果找不到可以在入口方块中找）

		var shopId = null; // 当前商店ID
		var type = 0; // 当前正在选中的类型，0买入1卖出
		var selectItem = 0; // 当前正在选中的道具
		var selectCount = 0; // 当前已经选中的数量
		var page = 0;
		var totalPage = 0;
		var totalMoney = 0;
		var list = [];
		var shopInfo = null; // 商店信息
		var choices = []; // 商店选项
		var use = 'money';
		var useText = '金币';

		var bigFont = core.ui._buildFont(20, false),
			middleFont = core.ui._buildFont(18, false);

		this._drawItemShop = function () {
			// 绘制道具商店

			// Step 1: 背景和固定的几个文字
			core.ui._createUIEvent();
			core.clearMap('uievent');
			core.ui.clearUIEventSelector();
			core.setTextAlign('uievent', 'left');
			core.setTextBaseline('uievent', 'top');
			core.fillRect('uievent', 0, 0, 416, 416, 'black');
			core.drawWindowSkin('winskin.png', 'uievent', 0, 0, 416, 56);
			core.drawWindowSkin('winskin.png', 'uievent', 0, 56, 312, 56);
			core.drawWindowSkin('winskin.png', 'uievent', 0, 112, 312, 304);
			core.drawWindowSkin('winskin.png', 'uievent', 312, 56, 104, 56);
			core.drawWindowSkin('winskin.png', 'uievent', 312, 112, 104, 304);
			core.setFillStyle('uievent', 'white');
			core.setStrokeStyle('uievent', 'white');
			core.fillText("uievent", "购买", 32, 74, 'white', bigFont);
			core.fillText("uievent", "卖出", 132, 74);
			core.fillText("uievent", "离开", 232, 74);
			core.fillText("uievent", "当前" + useText, 324, 66, null, middleFont);
			core.setTextAlign("uievent", "right");
			core.fillText("uievent", core.formatBigNumber(core.status.hero[use]), 405, 89);
			core.setTextAlign("uievent", "left");
			core.ui.drawUIEventSelector(1, "winskin.png", 22 + 100 * type, 66, 60, 33);
			if (selectItem != null) {
				core.setTextAlign('uievent', 'center');
				core.fillText("uievent", type == 0 ? "买入个数" : "卖出个数", 364, 320, null, bigFont);
				core.fillText("uievent", "<   " + selectCount + "   >", 364, 350);
				core.fillText("uievent", "确定", 364, 380);
			}

			// Step 2：获得列表并展示
			list = choices.filter(function (one) {
				if (one.condition != null && one.condition != '') {
					try { if (!core.calValue(one.condition)) return false; } catch (e) { }
				}
				return (type == 0 && one.money != null) || (type == 1 && one.sell != null);
			});
			var per_page = 6;
			totalPage = Math.ceil(list.length / per_page);
			page = Math.floor((selectItem || 0) / per_page) + 1;

			// 绘制分页
			if (totalPage > 1) {
				var half = 156;
				core.setTextAlign('uievent', 'center');
				core.fillText('uievent', page + " / " + totalPage, half, 388, null, middleFont);
				if (page > 1) core.fillText('uievent', '上一页', half - 80, 388);
				if (page < totalPage) core.fillText('uievent', '下一页', half + 80, 388);
			}
			core.setTextAlign('uievent', 'left');

			// 绘制每一项
			var start = (page - 1) * per_page;
			for (var i = 0; i < per_page; ++i) {
				var curr = start + i;
				if (curr >= list.length) break;
				var item = list[curr];
				core.drawIcon('uievent', item.id, 10, 125 + i * 40);
				core.setTextAlign('uievent', 'left');
				core.fillText('uievent', core.material.items[item.id].name, 50, 132 + i * 40, null, bigFont);
				core.setTextAlign('uievent', 'right');
				core.fillText('uievent', (type == 0 ? core.calValue(item.money) : core.calValue(item.sell)) + useText + "/个", 300, 133 + i * 40, null, middleFont);
				core.setTextAlign("uievent", "left");
				if (curr == selectItem) {
					// 绘制描述，文字自动放缩
					var text = core.material.items[item.id].text || "该道具暂无描述";
					try { text = core.replaceText(text); } catch (e) { }
					for (var fontSize = 20; fontSize >= 8; fontSize -= 2) {
						var config = { left: 10, fontSize: fontSize, maxWidth: 403 };
						var height = core.getTextContentHeight(text, config);
						if (height <= 50) {
							config.top = (56 - height) / 2;
							core.drawTextContent("uievent", text, config);
							break;
						}
					}
					core.ui.drawUIEventSelector(2, "winskin.png", 8, 120 + i * 40, 295, 40);
					if (type == 0 && item.number != null) {
						core.fillText("uievent", "存货", 324, 132, null, bigFont);
						core.setTextAlign("uievent", "right");
						core.fillText("uievent", item.number, 406, 132, null, null, 40);
					} else if (type == 1) {
						core.fillText("uievent", "数量", 324, 132, null, bigFont);
						core.setTextAlign("uievent", "right");
						core.fillText("uievent", core.itemCount(item.id), 406, 132, null, null, 40);
					}
					core.setTextAlign("uievent", "left");
					core.fillText("uievent", "预计" + useText, 324, 250);
					core.setTextAlign("uievent", "right");
					totalMoney = selectCount * (type == 0 ? core.calValue(item.money) : core.calValue(item.sell));
					core.fillText("uievent", core.formatBigNumber(totalMoney), 405, 280);

					core.setTextAlign("uievent", "left");
					core.fillText("uievent", type == 0 ? "已购次数" : "已卖次数", 324, 170);
					core.setTextAlign("uievent", "right");
					core.fillText("uievent", (type == 0 ? item.money_count : item.sell_count) || 0, 405, 200);
				}
			}

			core.setTextAlign('uievent', 'left');
			core.setTextBaseline('uievent', 'alphabetic');
		}

		var _add = function (item, delta) {
			if (item == null) return;
			selectCount = core.clamp(
				selectCount + delta, 0,
				Math.min(type == 0 ? Math.floor(core.status.hero[use] / core.calValue(item.money)) : core.itemCount(item.id),
					type == 0 && item.number != null ? item.number : Number.MAX_SAFE_INTEGER)
			);
		}

		var _confirm = function (item) {
			if (item == null || selectCount == 0) return;
			if (type == 0) {
				core.status.hero[use] -= totalMoney;
				core.getItem(item.id, selectCount);
				core.stopSound();
				core.playSound('确定');
				if (item.number != null) item.number -= selectCount;
				item.money_count = (item.money_count || 0) + selectCount;
			} else {
				core.status.hero[use] += totalMoney;
				core.removeItem(item.id, selectCount);
				core.playSound('确定');
				core.drawTip("成功卖出" + selectCount + "个" + core.material.items[item.id].name, item.id);
				if (item.number != null) item.number += selectCount;
				item.sell_count = (item.sell_count || 0) + selectCount;
			}
			selectCount = 0;
		}

		this._performItemShopKeyBoard = function (keycode) {
			var item = list[selectItem] || null;
			// 键盘操作
			switch (keycode) {
				case 38: // up
					if (selectItem == null) break;
					if (selectItem == 0) selectItem = null;
					else selectItem--;
					selectCount = 0;
					break;
				case 37: // left
					if (selectItem == null) {
						if (type > 0) type--;
						break;
					}
					_add(item, -1);
					break;
				case 39: // right
					if (selectItem == null) {
						if (type < 2) type++;
						break;
					}
					_add(item, 1);
					break;
				case 40: // down
					if (selectItem == null) {
						if (list.length > 0) selectItem = 0;
						break;
					}
					if (list.length == 0) break;
					selectItem = Math.min(selectItem + 1, list.length - 1);
					selectCount = 0;
					break;
				case 13:
				case 32: // Enter/Space
					if (selectItem == null) {
						if (type == 2)
							core.insertAction({ "type": "break" });
						else if (list.length > 0)
							selectItem = 0;
						break;
					}
					_confirm(item);
					break;
				case 27: // ESC
					if (selectItem == null) {
						core.insertAction({ "type": "break" });
						break;
					}
					selectItem = null;
					break;
			}
		}

		this._performItemShopClick = function (px, py) {
			var item = list[selectItem] || null;
			// 鼠标操作
			if (px >= 22 && px <= 82 && py >= 71 && py <= 102) {
				// 买
				if (type != 0) {
					type = 0;
					selectItem = null;
					selectCount = 0;
				}
				return;
			}
			if (px >= 122 && px <= 182 && py >= 71 && py <= 102) {
				// 卖
				if (type != 1) {
					type = 1;
					selectItem = null;
					selectCount = 0;
				}
				return;
			}
			if (px >= 222 && px <= 282 && py >= 71 && py <= 102) // 离开
				return core.insertAction({ "type": "break" });
			// < >
			if (px >= 318 && px <= 341 && py >= 348 && py <= 376)
				return _add(item, -1);
			if (px >= 388 && px <= 416 && py >= 348 && py <= 376)
				return _add(item, 1);
			// 确定
			if (px >= 341 && px <= 387 && py >= 380 && py <= 407)
				return _confirm(item);

			// 上一页/下一页
			if (px >= 45 && px <= 105 && py >= 388) {
				if (page > 1) {
					selectItem -= 6;
					selectCount = 0;
				}
				return;
			}
			if (px >= 208 && px <= 268 && py >= 388) {
				if (page < totalPage) {
					selectItem = Math.min(selectItem + 6, list.length - 1);
					selectCount = 0;
				}
				return;
			}

			// 实际区域
			if (px >= 9 && px <= 300 && py >= 120 && py < 360) {
				if (list.length == 0) return;
				var index = parseInt((py - 120) / 40);
				var newItem = 6 * (page - 1) + index;
				if (newItem >= list.length) newItem = list.length - 1;
				if (newItem != selectItem) {
					selectItem = newItem;
					selectCount = 0;
				}
				return;
			}
		}

		this._performItemShopAction = function () {
			if (flags.type == 0) return this._performItemShopKeyBoard(flags.keycode);
			else return this._performItemShopClick(flags.px, flags.py);
		}

		this.openItemShop = function (itemShopId) {
			shopId = itemShopId;
			type = 0;
			page = 0;
			selectItem = null;
			selectCount = 0;
			core.isShopVisited(itemShopId);
			shopInfo = flags.__shops__[shopId];
			if (shopInfo.choices == null) shopInfo.choices = core.clone(core.status.shops[shopId].choices);
			choices = shopInfo.choices;
			use = core.status.shops[shopId].use;
			if (use != 'exp') use = 'money';
			useText = use == 'money' ? '金币' : '经验';

			core.insertAction([{
				"type": "while",
				"condition": "true",
				"data": [
					{ "type": "function", "function": "function () { core.plugin._drawItemShop(); }" },
					{ "type": "wait" },
					{ "type": "function", "function": "function() { core.plugin._performItemShopAction(); }" }
				]
			},
			{
				"type": "function",
				"function": "function () { core.deleteCanvas('uievent'); core.ui.clearUIEventSelector(); }"
			}
			]);
		}

	},
	"heroFourFrames": function () {
		// 样板的勇士/跟随者移动时只使用2、4两帧，观感较差。本插件可以将四帧全用上。

		// 是否启用本插件
		var __enable = true;
		if (!__enable) return;

		["up", "down", "left", "right"].forEach(function (one) {
			// 指定中间帧动画
			core.material.icons.hero[one].midFoot = 2;
		});

		var heroMoving = function (timestamp) {
			if (core.status.heroMoving <= 0) return;
			if (timestamp - core.animateFrame.moveTime > core.values.moveSpeed) {
				core.animateFrame.leftLeg++;
				core.animateFrame.moveTime = timestamp;
			}
			core.drawHero(['stop', 'leftFoot', 'midFoot', 'rightFoot'][core.animateFrame.leftLeg % 4], 4 * core.status.heroMoving);
		}
		core.registerAnimationFrame('heroMoving', true, heroMoving);

		core.events._eventMoveHero_moving = function (step, moveSteps) {
			var curr = moveSteps[0];
			var direction = curr[0],
				x = core.getHeroLoc('x'),
				y = core.getHeroLoc('y');
			// ------ 前进/后退
			var o = direction == 'backward' ? -1 : 1;
			if (direction == 'forward' || direction == 'backward') direction = core.getHeroLoc('direction');
			var faceDirection = direction;
			if (direction == 'leftup' || direction == 'leftdown') faceDirection = 'left';
			if (direction == 'rightup' || direction == 'rightdown') faceDirection = 'right';
			core.setHeroLoc('direction', direction);
			if (curr[1] <= 0) {
				core.setHeroLoc('direction', faceDirection);
				moveSteps.shift();
				return true;
			}
			if (step <= 4) core.drawHero('stop', 4 * o * step);
			else if (step <= 8) core.drawHero('leftFoot', 4 * o * step);
			else if (step <= 12) core.drawHero('midFoot', 4 * o * (step - 8));
			else if (step <= 16) core.drawHero('rightFoot', 4 * o * (step - 8)); // if (step == 8) {
			if (step == 8 || step == 16) {
				core.setHeroLoc('x', x + o * core.utils.scan2[direction].x, true);
				core.setHeroLoc('y', y + o * core.utils.scan2[direction].y, true);
				core.updateFollowers();
				curr[1]--;
				if (curr[1] <= 0) moveSteps.shift();
				core.setHeroLoc('direction', faceDirection);
				return step == 16;
			}
			return false;
		}
	},
	"startCanvas": function () {
		// 使用本插件可以将自绘的标题界面居中。仅在【标题开启事件化】后才有效。
		// 由于一些技术性的原因，标题界面事件化无法应用到覆盖状态栏的整个界面。
		// 这是一个较为妥协的插件，会在自绘标题界面时隐藏状态栏、工具栏和边框，并将画布进行居中。
		// 本插件仅在全塔属性的 "startCanvas" 生效；进入 "startText" 时将会离开居中状态，回归正常界面。

		// 是否开启本插件，默认禁用；将此改成 true 将启用本插件。
		var __enable = false;
		if (!__enable) return;

		// 检查【标题开启事件化】是否开启
		if (!core.flags.startUsingCanvas || main.mode != 'play') return;

		var _isTitleCanvasEnabled = false;
		var _getClickLoc = core.actions._getClickLoc;
		this._setTitleCanvas = function () {
			if (_isTitleCanvasEnabled) return;
			_isTitleCanvasEnabled = true;

			// 禁用窗口resize
			window.onresize = function () { };
			core.resize = function () { }

			// 隐藏状态栏
			core.dom.statusBar.style.display = 'none';
			core.dom.statusCanvas.style.display = 'none';
			core.dom.toolBar.style.display = 'none';
			// 居中画布
			if (core.domStyle.isVertical) {
				core.dom.gameDraw.style.top =
					(parseInt(core.dom.gameGroup.style.height) - parseInt(core.dom.gameDraw.style.height)) / 2 + "px";
			} else {
				core.dom.gameDraw.style.right =
					(parseInt(core.dom.gameGroup.style.width) - parseInt(core.dom.gameDraw.style.width)) / 2 + "px";
			}
			core.dom.gameDraw.style.border = '3px transparent solid';
			core.actions._getClickLoc = function (x, y) {
				var left = core.dom.gameGroup.offsetLeft + core.dom.gameDraw.offsetLeft + 3;
				var top = core.dom.gameGroup.offsetTop + core.dom.gameDraw.offsetTop + 3;
				var loc = { 'x': Math.max(x - left, 0), 'y': Math.max(y - top, 0), 'size': 32 * core.domStyle.scale };
				return loc;
			}
		}

		this._resetTitleCanvas = function () {
			if (!_isTitleCanvasEnabled) return;
			_isTitleCanvasEnabled = false;
			window.onresize = function () { try { main.core.resize(); } catch (e) { main.log(e); } }
			core.resize = function () { return core.control.resize(); }
			core.resize();
			core.actions._getClickLoc = _getClickLoc;
		}

		// 复写“开始游戏”
		core.events._startGame_start = function (hard, seed, route, callback) {
			console.log('开始游戏');
			core.resetGame(core.firstData.hero, hard, null, core.cloneArray(core.initStatus.maps));
			core.setHeroLoc('x', -1);
			core.setHeroLoc('y', -1);

			if (seed != null) {
				core.setFlag('__seed__', seed);
				core.setFlag('__rand__', seed);
			} else core.utils.__init_seed();

			core.clearStatusBar();
			core.plugin._setTitleCanvas();

			var todo = [];
			core.hideStatusBar();
			core.push(todo, core.firstData.startCanvas);
			core.push(todo, { "type": "function", "function": "function() { core.plugin._resetTitleCanvas(); core.events._startGame_setHard(); }" })
			core.push(todo, core.firstData.startText);
			this.insertAction(todo, null, null, function () {
				core.events._startGame_afterStart(callback);
			});

			if (route != null) core.startReplay(route);
		}

		var _loadData = core.control.loadData;
		core.control.loadData = function (data, callback) {
			core.plugin._resetTitleCanvas();
			_loadData.call(core.control, data, callback);
		}
	},
	"自动拾取": function () {
		// 自動拾取
		var enable = true;
		if (!enable) return;

		////// 每移动一格后执行的事件 //////

		function bfsFlood(sx, sy, blockfn) {
			var canMoveArray = core.generateMovableArray();
			var blocksObj = core.getMapBlocksObj();
			var bgMap = core.getBgMapArray();

			var visited = [],
				queue = [];
			visited[sx + "," + sy] = 0;
			queue.push(sx + "," + sy);

			while (queue.length > 0) {
				var now = queue.shift().split(","),
					x = ~~now[0],
					y = ~~now[1];
				for (var direction in core.utils.scan) {
					if (!core.inArray(canMoveArray[x][y], direction)) continue;
					var nx = x + core.utils.scan[direction].x,
						ny = y + core.utils.scan[direction].y,
						nindex = nx + "," + ny;
					if (visited[nindex]) continue;
					if (core.onSki(bgMap[ny][nx])) continue;
					if (blockfn && !blockfn(blocksObj, nx, ny)) continue;
					visited[nindex] = visited[now] + 1;
					queue.push(nindex);
				}
			}
		}

		function attractAnimate() {
			var name = 'attractAnimate';
			var isPlaying = false;
			this.nodes = [];

			this.add = function (id, x, y, callback) {
				this.nodes.push({ id: id, x: x, y: y, callback: callback });
			}
			this.start = function () {
				if (isPlaying) return;
				isPlaying = true;
				core.registerAnimationFrame(name, true, this.update);
				this.ctx = core.createCanvas(name, 0, 0, core.__PIXELS__, core.__PIXELS__, 120);
			}
			this.remove = function () {
				core.unregisterAnimationFrame(name);
				core.deleteCanvas(name);
				isPlaying = false;
			}
			this.clear = function () {
				this.nodes = [];
				this.remove();
			}
			var lastTime = -1;
			var self = this;
			this.update = function (timeStamp) {
				if (lastTime < 0) lastTime = timeStamp;
				if (timeStamp - lastTime < 20) return;
				lastTime = timeStamp;
				core.clearMap(name);
				var cx = core.status.heroCenter.px - 16,
					cy = core.status.heroCenter.py - 16;
				var thr = 5; //缓动比例倒数 越大移动越慢
				self.nodes.forEach(function (n) {
					var dx = cx - n.x,
						dy = cy - n.y;
					if (Math.abs(dx) <= thr && Math.abs(dy) <= thr) {
						n.dead = true;
					} else {
						n.x += ~~(dx / thr);
						n.y += ~~(dy / thr);
					}
					core.drawIcon(name, n.id, n.x, n.y, 32, 32);
				});
				self.nodes = self.nodes.filter(function (n) {
					if (n.dead && n.callback) {
						n.callback();
					}
					return !n.dead;
				});
				if (self.nodes.length == 0)
					self.remove();
			}
		}


		let animateHwnd = new attractAnimate();

		this.stopAttractAnimate = function () {
			animateHwnd.clear();
		}

		this.autoGetItem = function () {
			if (!core.getFlag("autoGet", false)) return;
			if (core.hasFlag('poison')) return;
			let b = core.getBlock(hero.loc.x, hero.loc.y);
			if (b && b.id == 11) return;
			let autoGetList = ['yellowKey', 'blueKey', 'redKey', 'bigKey', 'coin', 'greenGem', 'yellowGem', 'greenPotion', 'yellowPotion', 'I398', 'I400', 'I403', 'I407', 'iceCube', 'snow', 'knife', 'icePickaxe', 'pickaxe', 'shield3', 'shield4', 'shield5', 'skill1', 'I307', 'I309'];
			if (core.hasItem('moneyPocket')) autoGetList.push('I323', 'I324');
			if (flags.autoGetHp) autoGetList.push('redPotion', 'bluePotion');
			if (flags.autoGetAd) autoGetList.push('redGem', 'blueGem', 'cross', 'I315', 'I316', 'I317', 'I318', 'I319', 'I320', 'I321', 'I322', 'I339', 'I375');
			if (flags.autoGetHp && flags.autoGetAd) autoGetList.push('centerFly');

			const blockfn = function (blockMap, x, y) {
				const idx = x + ',' + y;
				if (idx in canGetItems) return false;
				let blk = blockMap[idx];
				if (blk && !blk.disable && blk.event.cls == 'items' && autoGetList.indexOf(blk.event.id) >= 0 && !core.isMapBlockDisabled(core.status.floorId, blk.x, blk.y) && blk.event.trigger == 'getItem') {
					canGetItems[idx] = { x: x, y: y, id: blk.event.id };
					return !core.status.checkBlock.damage[idx] && !core.status.checkBlock.ambush[idx];
				}
				return core.maps._canMoveDirectly_checkNextPoint(blockMap, x, y);
			};
			let canGetItems = {};
			if (!core.status.floorId || !core.status.checkBlock.damage) return;

			bfsFlood(core.getHeroLoc('x'), core.getHeroLoc('y'), blockfn);
			for (let k in canGetItems) {
				const x = canGetItems[k].x,
					y = canGetItems[k].y,
					id = canGetItems[k].id;
				core.trigger(x, y);
				if (!core.isReplaying()) animateHwnd.add(id, x * 32, y * 32);
			}

			if (!core.isReplaying()) animateHwnd.start();
		}
	},
	"高级动画": function () {
		// -------------------- 插件说明 -------------------- //

		// github仓库：https://github.com/unanmed/animate
		// npm包名：mutate-animate
		// npm地址：https://www.npmjs.com/package/mutate-animate

		// 不要去尝试读这个插件，这个插件是经过了打包的，不是人类可读的(
		// 想读的话可以去github读

		// 该插件是一个轻量型多功能动画插件，可以允许你使用内置或自定义的速率曲线或轨迹等
		// 除此之外，你还可以自定义绘制函数，来让你的动画可视化

		// -------------------- 安装说明 -------------------- //

		// 直接复制到插件中即可，注意所有插件中不能出现插件名为animate的插件
		// 该插件分为动画和渐变两部分，教程分开，动画在前，渐变在后

		// -------------------- 动画使用教程 -------------------- //

		// 1. 首先创建一个异步函数
		//   async function ani() { }

		// 2. 引入插件中的类和函数，引入内容要看个人需求，所有可用的函数在本插件末尾可以看到
		//   const { Animation, linear, bezier, circle, hyper, trigo, power, inverseTrigo, shake, sleep } = core.plugin.animate

		// 3. 在函数内部创建一个动画
		//   const animate = new Animation();

		// 4. 为动画创建一个绘制函数，这里以绘制一个矩形为例，当然也可以使用core.fillRect替代ctx.fillRect来绘制矩形
		//   const ctx = core.createCanvas('animate', 0, 0, 416, 416, 100);
		//   ctx.save();
		//   const fn = () => {
		//      ctx.restore();
		//      ctx.save();
		//      ctx.clearRect(0, 0, 800, 800);
		//      ctx.translate(animate.x, animate.y);
		//      ctx.rotate(animate.angle * Math.PI / 180);
		//      const size = animate.size;
		//      ctx.fillRect(-30 * size, -30 * size, 60 * size, 60 * size);
		//   }
		//   animate.ticker.add(fn);

		// 5. 执行动画

		//   下面先对一些概念进行解释

		//   动画分为很多种，内置的有move(移动至某一点)  rotate(旋转)  scale(放缩)  moveAs(以指定路径移动)  shake(震动)
		//   对于不同的动画种类，其所对应的属性也不同，move moveAs shake均对应x和y这两个属性
		//   rotate对应angle，scale对应size。你也可以自定义属性，这个之后会提到

		//   除了执行动画之外，这里还提供了三个等待函数，可以等待某个动画执行完毕，以及一个等待指定时长的函数
		//   分别是animate.n(等待指定数量的动画执行完毕)
		//   animate.w(等待指定类型的动画执行完毕，也可以是自定义类型)
		//   animate.all(等待所有动画执行完毕)
		//   sleep(等待指定时长)

		//   执行动画时，要求一个渐变函数，当然这个插件内置了非常丰富的渐变函数，也就是速率曲线。

		//   线性渐变函数  linear()，该函数返回一个线性变化函数

		//   三角渐变函数  trigo('sin' | 'sec', EaseMode)，该函数返回一个指定属性的三角函数变化函数
		//       其中EaseMode可以填'in' 'out' 'in-out' 'center'
		//       分别表示 慢-快  快-慢  慢-快-慢  快-慢-快

		//   幂函数渐变  power(n, EaseMode)，该函数返回一个以x^n变化的函数，n是指数

		//   双曲渐变函数  hyper('sin' | 'tan' | 'sec', EaseMode)，该函数返回一个双曲函数，分别是双曲正弦、双曲正切、双曲正割

		//   反三角渐变函数  inverseTrigo('sin' | 'tan', EaseMode)，该函数返回一个反三角函数

		//   贝塞尔曲线渐变函数  bezier(...cps)，参数为贝塞尔曲线的控制点纵坐标（横坐标不能自定义，毕竟一个时刻不能对应多个速率）
		//       示例：bezier(0.4, 0.2, 0.7); // 三个控制点的四次贝塞尔曲线渐变函数

		//   了解完渐变函数以后，这里还有一个特殊的渐变函数-shake
		//   shake(power, timing)，这个函数是一个震荡函数，会让一个值来回变化，实现震动的效果
		//       其中power是震动的最大值，timing是渐变函数，描述了power在震动时大小的变化

		//   下面，我们就可以进行动画的执行了，我们以 运动 + 旋转 + 放缩为例

		//   animate.mode(hyper('sin', 'out'))  // 设置渐变函数为 双曲正弦 快 -> 慢，注意不能加分号
		//       .time(1000)  // 设置动画的执行时间为1000毫秒
		//       .move(300, 300)  // 移动至[300, 300]的位置
		//       .relative()  // 设置相对模式为相对之前，与之前为相加的关系
		//       .mode(power(3, 'center'))  // 设置为 x^3 快-慢-快 的渐变函数
		//       .time(3000)
		//       .rotate(720)  // 旋转720度
		//       .absolute()  // 设置相对模式为绝对
		//       .mode(trigo('sin', 'in'))  // 设置渐变函数为 正弦 慢 -> 快
		//       .time(1500)
		//       .scale(3);  // 放缩大小至3倍

		//   这样，我们就把三种基础动画都执行了一遍，同时，这种写法非常直观，出现问题时也可以很快地找到问题所在
		//   下面，我们需要等待动画执行完毕，因为同一种动画不可能同时执行两个

		//   await animate.n(1); // 等待任意一个动画执行完毕，别把await忘了
		//   await animate.w('scale'); // 等待放缩动画执行完毕
		//   await animate.all(); // 等待所有动画执行完毕
		//   await sleep(1000); // 等待1000毫秒

		//   下面，还有一个特殊的动画函数-moveAs
		//   这是一个非常强大的函数，它允许你让你的物体按照指定路线运动
		//   说到这，我们需要先了解一下运动函数。
		//   该插件内置了两个运动函数，分别是圆形运动和贝塞尔曲线运动

		//   圆形运动 circle(r, n, timing, inverse)，r是圆的半径，n是圈数，timing描述半径大小的变化，inverse说明了是否翻转timing函数，后面三个可以不填

		//   贝塞尔曲线 bezierPath(start, end, ...cps)
		//       其中start和end是起点和结束点，应当填入[x, y]数组，cps是控制点，也是[x, y]数组
		//       示例：bezierPath([0, 0], [200, 200], [100, 50], [300, 150], [200, 180]);
		//       这是一个起点为 [0, 0]，终点为[200, 200]，有三个控制点的四次贝塞尔曲线

		//   下面，我们就可以使用路径函数了

		//   animate.mode(hyper('sin', 'in-out'))  // 设置渐变曲线
		//       .time(5000)
		//       .relative()  // 设置为相对模式，这个比较必要，不然的话很可能出现瞬移
		//       .moveAs(circle(100, 5, linear()))  // 创建一个5圈的半径从0至100逐渐变大的圆轨迹（是个螺旋线）并让物体沿着它运动
		//       
		//   最后，还有一个震动函数 shake(x, y)，x和y表示了在横向上和纵向上的震动幅度，1表示为震动幅度的100%
		//   示例：
		//   animate.mode(shake(5, hyper('sin', 'in')), true) // 这里第二个参数说明是震动函数
		//       .time(2000)
		//       .shake(1, 0.5)

		//   这样，所有内置动画就已经介绍完毕

		// 6. 自定义动画属性

		//   本插件允许你自定义一个动画属性，但功能可能不会像自带的属性那么强大
		//   你可以在创建动画之后使用animate.register(key, init)来注册一个自定义属性
		//   其中key是自定义属性的名称，init是自定义属性的初始值，这个值应当在0-1之间变化

		//   你可以通过animate.value[key]来获取你注册的自定义属性

		//   对于自定义属性的动画，你应当使用animate.apply(key, n, first)
		//   其中，key是你的自定义属性的名称，n是其目标值，first是一个布尔值，说明了是否将该动画插入到目前所有的动画之前，即每帧会优先执行该动画

		//   下面是一个不透明度的示例

		//   animate.register('opacity', 1); // 这句话应该放到刚创建动画之后

		//   ctx.globalAlpha = animate.value.opacity; // 这句话应当放到每帧绘制的函数里面，放在绘制之前

		//   animate.mode(bezier(0.9, 0.1, 0.05))  // 设置渐变函数
		//       .time(2000)
		//       .absolute()
		//       .apply('opacity', 0.3);  // 将不透明度按照渐变曲线更改为0.3

		// 7. 运行动画

		//   还记得刚开始定义的async function 吗，直接调用它就能执行动画了！
		//   示例：ani(); // 执行刚刚写的所有动画

		// 8. 自定义速率曲线和路径

		//   该插件中，速率曲线和路径均可自定义

		//   对于速率曲线，其类型为  (input: number) => number
		//   它接受一个范围在 0-1 的值，输出一个 0-1 的值，表示了动画的完成度，1表示动画已完成，0表示动画刚开始（当前大于1小于0也不会报错，也会执行相应的动画）

		//   对于路径，其类型为  (input: number) => [number, number]
		//   它与速率曲线类似，接收一个 0-1 的值，输出一个坐标数组

		// 9. 多个属性绑定

		//   该插件中，你可以绑定多个动画属性，你可以使用ani.bind(...attr)来绑定。
		//   绑定之后，这三个动画属性可以被一个返回了长度为3的数组的渐变函数执行。
		//   绑定使用ani.bind，设置渐变函数仍然使用ani.mode，注意它与单个动画属性是分开的，也就是它不会影响正常的渐变函数。
		//   然后使用ani.applyMulti即可执行动画

		//   例如：
		//   // 自定义的一个三属性渐变函数
		//   function b(input) {
		//       return [input * 100, input ** 2 * 100, input ** 3 * 100];
		//   }
		//   ani.bind('a', 'b', 'c') // 这样会绑定abc这三个动画属性
		//       .mode(b) // 自定义的一个返回了长度为3的数组的函数
		//       .time(5000)
		//       .absolute()
		//       .applyMulti(); // 执行这个动画

		// 9. 监听  动画的生命周期钩子

		//   这个插件还允许你去监听动画的状态，可以监听动画的开始、结束、运行
		//   你可以使用 animate.listen(type, fn)来监听，fn的类型是 (a: Animation, type: string) => void
		//   当然，一般情况下你不会用到这个功能，插件中已经帮你包装了三个等待函数，他们就是以这些监听为基础的

		// 10. 自定义时间获取函数

		//   你可以修改ani.getTime来修改动画的时间获取函数，例如想让动画速度变成一半可以写ani.getTime = () => Date.now() / 2
		//   这样可以允许你随意控制动画的运行速度，暂停，甚至是倒退。该值默认为`Date.now`

		// -------------------- 渐变使用教程 -------------------- //

		// 相比于动画，渐变属于一种较为简便的动画，它可以让你在设置一个属性后使属性缓慢变化值目标值而不是突变至目标值
		// 现在假设你已经了解了动画的使用，下面我们来了解渐变。

		// 1. 创建一个渐变实例
		//   与动画类似，你需要使用new来实例化一个渐变，当然别忘了引入
		//   const { Transition } = core.plugin.animate;
		//   const tran = new Transition();

		// 2. 绘制
		//   const ctx = core.createCanvas('transition', 0, 0, 416, 416, 100);
		//   ctx.save();
		//   const fn = () => {
		//      ctx.restore();
		//      ctx.save();
		//      ctx.clearRect(0, 0, 800, 800);
		//      ctx.beginPath();
		//      ctx.arc(tran.value.x, tran.value.y, 50, 0, Math.PI * 2); // 使用tran.value.xxx获取当前的属性
		//      ctx.fill();
		//      // 当然也可以用样板的api，例如core.fillCircle();等
		//   }
		//   animate.ticker.add(fn);

		// 3. 设置渐变
		//   同样，与动画类似，你可以使用tran.time()设置渐变时间，使用tran.mode()设置渐变函数，使用tran.absolute()和tran.relative()设置相对模式
		//   例如：
		//   tran.time(1000)
		//       .mode(hyper('sin', 'out'))
		//       .absolute();

		// 4. 初始化渐变属性
		//   与动画不同的是，动画在执行一个自定义属性前都需要register，而渐变不需要。
		//   你可以通过tran.value.xxx = yyy来设置动画属性或使用tran.transition('xxx', yyy)来设置
		//   你的首次赋值即是初始化了渐变属性，这时是不会执行渐变的，例如：
		//   tran.value.x = 200;
		//   tran.transition('y', 200);
		//   上述例子便是将 x 和 y 初始化成了200

		// 5. 执行渐变
		//   初始化完成后，便可以直接执行渐变了，有两种方法
		//   tran.value.x = 400; // 将 x 缓慢移动至400
		//   tran.transition('y', 400); // 将 y 缓慢移动至400

		// 6. 自定义时间获取函数
		//   与动画类似，你依然可以通过修改tran.getTime来修改时间获取函数

		if (main.replayChecking) return core.plugin.animate = {};

		var M = Object.defineProperty;
		var E = (n, s, t) => s in n ? M(n, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[s] = t;
		var o = (n, s, t) => (E(n, typeof s != "symbol" ? s + "" : s, t), t);
		let b = [];
		const k = (n) => {
			for (const s of b)
				if (s.status === "running")
					try {
						for (const t of s.funcs)
							t(n - s.startTime);
					} catch (t) {
						s.destroy(), console.error(t);
					}
			requestAnimationFrame(k);
		};
		requestAnimationFrame(k);
		class I {
			constructor() {
				o(this, "funcs", []);
				o(this, "status", "stop");
				o(this, "startTime", 0);
				this.status = "running", b.push(this), requestAnimationFrame((s) => this.startTime = s);
			}
			add(s, t = !1) {
				return t ? this.funcs.unshift(s) : this.funcs.push(s), this;
			}
			remove(s) {
				const t = this.funcs.findIndex((e) => e === s);
				if (t === -1)
					throw new ReferenceError(
						"You are going to remove nonexistent ticker function."
					);
				return this.funcs.splice(t, 1), this;
			}
			clear() {
				this.funcs = [];
			}
			destroy() {
				this.clear(), this.stop();
			}
			stop() {
				this.status = "stop", b = b.filter((s) => s !== this);
			}
		}
		class F {
			constructor() {
				o(this, "timing");
				o(this, "relation", "absolute");
				o(this, "easeTime", 0);
				o(this, "applying", {});
				o(this, "getTime", Date.now);
				o(this, "ticker", new I());
				o(this, "value", {});
				o(this, "listener", {});
				this.timing = (s) => s;
			}
			async all() {
				if (Object.values(this.applying).every((s) => s === !0))
					throw new ReferenceError("There is no animates to be waited.");
				await new Promise((s) => {
					const t = () => {
						Object.values(this.applying).every((e) => e === !1) && (this.unlisten("end", t), s("all animated."));
					};
					this.listen("end", t);
				});
			}
			async n(s) {
				const t = Object.values(this.applying).filter((i) => i === !0).length;
				if (t < s)
					throw new ReferenceError(
						`You are trying to wait ${s} animate, but there are only ${t} animate animating.`
					);
				let e = 0;
				await new Promise((i) => {
					const r = () => {
						e++, e === s && (this.unlisten("end", r), i(`${s} animated.`));
					};
					this.listen("end", r);
				});
			}
			async w(s) {
				if (this.applying[s] === !1)
					throw new ReferenceError(`The ${s} animate is not animating.`);
				await new Promise((t) => {
					const e = () => {
						this.applying[s] === !1 && (this.unlisten("end", e), t(`${s} animated.`));
					};
					this.listen("end", e);
				});
			}
			listen(s, t) {
				var e, i;
				(i = (e = this.listener)[s]) != null || (e[s] = []), this.listener[s].push(t);
			}
			unlisten(s, t) {
				const e = this.listener[s].findIndex((i) => i === t);
				if (e === -1)
					throw new ReferenceError(
						"You are trying to remove a nonexistent listener."
					);
				this.listener[s].splice(e, 1);
			}
			hook(...s) {
				const t = Object.entries(this.listener).filter(
					(e) => s.includes(e[0])
				);
				for (const [e, i] of t)
					for (const r of i)
						r(this, e);
			}
		}
		function T(n) {
			return n != null;
		}
		async function R(n) {
			return new Promise((s) => setTimeout(s, n));
		}
		class Y extends F {
			constructor() {
				super();
				o(this, "shakeTiming");
				o(this, "path");
				o(this, "multiTiming");
				o(this, "value", {});
				o(this, "size", 1);
				o(this, "angle", 0);
				o(this, "targetValue", {
					system: {
						move: [0, 0],
						moveAs: [0, 0],
						resize: 0,
						rotate: 0,
						shake: 0,
						"@@bind": []
					},
					custom: {}
				});
				o(this, "animateFn", {
					system: {
						move: [() => 0, () => 0],
						moveAs: () => 0,
						resize: () => 0,
						rotate: () => 0,
						shake: () => 0,
						"@@bind": () => 0
					},
					custom: {}
				});
				o(this, "ox", 0);
				o(this, "oy", 0);
				o(this, "sx", 0);
				o(this, "sy", 0);
				o(this, "bindInfo", []);
				this.timing = (t) => t, this.shakeTiming = (t) => t, this.multiTiming = (t) => [t, t], this.path = (t) => [t, t], this.applying = {
					move: !1,
					scale: !1,
					rotate: !1,
					shake: !1
				}, this.ticker.add(() => {
					const { running: t } = this.listener;
					if (T(t))
						for (const e of t)
							e(this, "running");
				});
			}
			get x() {
				return this.ox + this.sx;
			}
			get y() {
				return this.oy + this.sy;
			}
			mode(t, e = !1) {
				return typeof t(0) == "number" ? e ? this.shakeTiming = t : this.timing = t : this.multiTiming = t, this;
			}
			time(t) {
				return this.easeTime = t, this;
			}
			relative() {
				return this.relation = "relative", this;
			}
			absolute() {
				return this.relation = "absolute", this;
			}
			bind(...t) {
				return this.applying["@@bind"] === !0 && this.end(!1, "@@bind"), this.bindInfo = t, this;
			}
			unbind() {
				return this.applying["@@bind"] === !0 && this.end(!1, "@@bind"), this.bindInfo = [], this;
			}
			move(t, e) {
				return this.applying.move && this.end(!0, "move"), this.applySys("ox", t, "move"), this.applySys("oy", e, "move"), this;
			}
			rotate(t) {
				return this.applySys("angle", t, "rotate"), this;
			}
			scale(t) {
				return this.applySys("size", t, "resize"), this;
			}
			shake(t, e) {
				this.applying.shake === !0 && this.end(!0, "shake"), this.applying.shake = !0;
				const { easeTime: i, shakeTiming: r } = this, h = this.getTime();
				if (this.hook("start", "shakestart"), i <= 0)
					return this.end(!1, "shake"), this;
				const l = () => {
					const c = this.getTime() - h;
					if (c > i) {
						this.ticker.remove(l), this.applying.shake = !1, this.sx = 0, this.sy = 0, this.hook("end", "shakeend");
						return;
					}
					const a = c / i, m = r(a);
					this.sx = m * t, this.sy = m * e;
				};
				return this.ticker.add(l), this.animateFn.system.shake = l, this;
			}
			moveAs(t) {
				this.applying.moveAs && this.end(!0, "moveAs"), this.applying.moveAs = !0, this.path = t;
				const { easeTime: e, relation: i, timing: r } = this, h = this.getTime(), [l, u] = [this.x, this.y], [c, a] = (() => {
					if (i === "absolute")
						return t(1);
					{
						const [d, f] = t(1);
						return [l + d, u + f];
					}
				})();
				if (this.hook("start", "movestart"), e <= 0)
					return this.end(!1, "moveAs"), this;
				const m = () => {
					const f = this.getTime() - h;
					if (f > e) {
						this.end(!0, "moveAs");
						return;
					}
					const v = f / e, [g, w] = t(r(v));
					i === "absolute" ? (this.ox = g, this.oy = w) : (this.ox = l + g, this.oy = u + w);
				};
				return this.ticker.add(m, !0), this.animateFn.system.moveAs = m, this.targetValue.system.moveAs = [c, a], this;
			}
			register(t, e) {
				if (typeof this.value[t] == "number")
					return this.error(
						`Property ${t} has been regietered twice.`,
						"reregister"
					);
				this.value[t] = e, this.applying[t] = !1;
			}
			apply(t, e, i = !1) {
				this.applying[t] === !0 && this.end(!1, t), t in this.value || this.error(
					`You are trying to execute nonexistent property ${t}.`
				), this.applying[t] = !0;
				const r = this.value[t], h = this.getTime(), { timing: l, relation: u, easeTime: c } = this, a = u === "absolute" ? e - r : e;
				if (this.hook("start"), c <= 0)
					return this.end(!1, t), this;
				const m = () => {
					const f = this.getTime() - h;
					if (f > c) {
						this.end(!1, t);
						return;
					}
					const v = f / c, g = l(v);
					this.value[t] = r + g * a;
				};
				return this.ticker.add(m, i), this.animateFn.custom[t] = m, this.targetValue.custom[t] = a + r, this;
			}
			applyMulti(t = !1) {
				this.applying["@@bind"] === !0 && this.end(!1, "@@bind"), this.applying["@@bind"] = !0;
				const e = this.bindInfo, i = e.map((m) => this.value[m]), r = this.getTime(), { multiTiming: h, relation: l, easeTime: u } = this, c = h(1);
				if (c.length !== i.length)
					throw new TypeError(
						`The number of binded animate attributes and timing function returns's length does not match. binded: ${e.length}, timing: ${c.length}`
					);
				if (this.hook("start"), u <= 0)
					return this.end(!1, "@@bind"), this;
				const a = () => {
					const d = this.getTime() - r;
					if (d > u) {
						this.end(!1, "@@bind");
						return;
					}
					const f = d / u, v = h(f);
					e.forEach((g, w) => {
						l === "absolute" ? this.value[g] = v[w] : this.value[g] = i[w] + v[w];
					});
				};
				return this.ticker.add(a, t), this.animateFn.custom["@@bind"] = a, this.targetValue.system["@@bind"] = c, this;
			}
			applySys(t, e, i) {
				i !== "move" && this.applying[i] === !0 && this.end(!0, i), this.applying[i] = !0;
				const r = this[t], h = this.getTime(), l = this.timing, u = this.relation, c = this.easeTime, a = u === "absolute" ? e - r : e;
				if (this.hook("start", `${i}start`), c <= 0)
					return this.end(!1, i);
				const m = () => {
					const f = this.getTime() - h;
					if (f > c) {
						this.end(!0, i);
						return;
					}
					const v = f / c, g = l(v);
					this[t] = r + a * g, t !== "oy" && this.hook(i);
				};
				this.ticker.add(m, !0), t === "ox" ? this.animateFn.system.move[0] = m : t === "oy" ? this.animateFn.system.move[1] = m : this.animateFn.system[i] = m, i === "move" ? (t === "ox" && (this.targetValue.system.move[0] = a + r), t === "oy" && (this.targetValue.system.move[1] = a + r)) : i !== "shake" && (this.targetValue.system[i] = a + r);
			}
			error(t, e) {
				throw e === "repeat" ? new Error(
					`Cannot execute the same animation twice. Info: ${t}`
				) : e === "reregister" ? new Error(
					`Cannot register an animated property twice. Info: ${t}`
				) : new Error(t);
			}
			end(t, e) {
				if (t === !0)
					if (this.applying[e] = !1, e === "move" ? (this.ticker.remove(this.animateFn.system.move[0]), this.ticker.remove(this.animateFn.system.move[1])) : e === "moveAs" ? this.ticker.remove(this.animateFn.system.moveAs) : e === "@@bind" ? this.ticker.remove(this.animateFn.system["@@bind"]) : this.ticker.remove(
						this.animateFn.system[e]
					), e === "move") {
						const [i, r] = this.targetValue.system.move;
						this.ox = i, this.oy = r, this.hook("moveend", "end");
					} else if (e === "moveAs") {
						const [i, r] = this.targetValue.system.moveAs;
						this.ox = i, this.oy = r, this.hook("moveend", "end");
					} else
						e === "rotate" ? (this.angle = this.targetValue.system.rotate, this.hook("rotateend", "end")) : e === "resize" ? (this.size = this.targetValue.system.resize, this.hook("resizeend", "end")) : e === "@@bind" ? this.bindInfo.forEach((r, h) => {
							this.value[r] = this.targetValue.system["@@bind"][h];
						}) : (this.sx = 0, this.sy = 0, this.hook("shakeend", "end"));
				else
					this.applying[e] = !1, this.ticker.remove(this.animateFn.custom[e]), this.value[e] = this.targetValue.custom[e], this.hook("end");
			}
		}
		class j extends F {
			constructor() {
				super();
				o(this, "now", {});
				o(this, "target", {});
				o(this, "transitionFn", {});
				o(this, "value");
				o(this, "handleSet", (t, e, i) => (this.transition(e, i), !0));
				o(this, "handleGet", (t, e) => this.now[e]);
				this.timing = (t) => t, this.value = new Proxy(this.target, {
					set: this.handleSet,
					get: this.handleGet
				});
			}
			mode(t) {
				return this.timing = t, this;
			}
			time(t) {
				return this.easeTime = t, this;
			}
			relative() {
				return this.relation = "relative", this;
			}
			absolute() {
				return this.relation = "absolute", this;
			}
			transition(t, e) {
				if (e === this.target[t])
					return this;
				if (!T(this.now[t]))
					return this.now[t] = e, this;
				this.applying[t] && this.end(t, !0), this.applying[t] = !0, this.hook("start");
				const i = this.getTime(), r = this.easeTime, h = this.timing, l = this.now[t], u = e + (this.relation === "absolute" ? 0 : l), c = u - l;
				this.target[t] = u;
				const a = () => {
					const d = this.getTime() - i;
					if (d >= r) {
						this.end(t);
						return;
					}
					const f = d / r;
					this.now[t] = h(f) * c + l, this.hook("running");
				};
				return this.transitionFn[t] = a, r <= 0 ? (this.end(t), this) : (this.ticker.add(a), this);
			}
			end(t, e = !1) {
				const i = this.transitionFn[t];
				if (!T(i))
					throw new ReferenceError(
						`You are trying to end an ended transition: ${t}`
					);
				this.ticker.remove(this.transitionFn[t]), delete this.transitionFn[t], this.applying[t] = !1, this.hook("end"), e || (this.now[t] = this.target[t]);
			}
		}
		const x = (...n) => n.reduce((s, t) => s + t, 0), y = (n) => {
			if (n === 0)
				return 1;
			let s = n;
			for (; n > 1;)
				n--, s *= n;
			return s;
		}, A = (n, s) => Math.round(y(s) / (y(n) * y(s - n))), p = (n, s, t = (e) => 1 - s(1 - e)) => n === "in" ? s : n === "out" ? t : n === "in-out" ? (e) => e < 0.5 ? s(e * 2) / 2 : 0.5 + t((e - 0.5) * 2) / 2 : (e) => e < 0.5 ? t(e * 2) / 2 : 0.5 + s((e - 0.5) * 2) / 2, $ = Math.cosh(2), z = Math.acosh(2), V = Math.tanh(3), P = Math.atan(5);
		function O() {
			return (n) => n;
		}
		function q(...n) {
			const s = [0].concat(n);
			s.push(1);
			const t = s.length, e = Array(t).fill(0).map((i, r) => A(r, t - 1));
			return (i) => {
				const r = e.map((h, l) => h * s[l] * (1 - i) ** (t - l - 1) * i ** l);
				return x(...r);
			};
		}
		function U(n, s) {
			if (n === "sin") {
				const t = (i) => Math.sin(i * Math.PI / 2);
				return p(s, (i) => 1 - t(1 - i), t);
			}
			if (n === "sec") {
				const t = (i) => 1 / Math.cos(i);
				return p(s, (i) => t(i * Math.PI / 3) - 1);
			}
			throw new TypeError(
				"Unexpected parameters are delivered in trigo timing function."
			);
		}
		function C(n, s) {
			if (!Number.isInteger(n))
				throw new TypeError(
					"The first parameter of power timing function only allow integer."
				);
			return p(s, (e) => e ** n);
		}
		function G(n, s) {
			if (n === "sin")
				return p(s, (e) => (Math.cosh(e * 2) - 1) / ($ - 1));
			if (n === "tan") {
				const t = (i) => Math.tanh(i * 3) * 1 / V;
				return p(s, (i) => 1 - t(1 - i), t);
			}
			if (n === "sec") {
				const t = (i) => 1 / Math.cosh(i);
				return p(s, (i) => 1 - (t(i * z) - 0.5) * 2);
			}
			throw new TypeError(
				"Unexpected parameters are delivered in hyper timing function."
			);
		}
		function N(n, s) {
			if (n === "sin") {
				const t = (i) => Math.asin(i) / Math.PI * 2;
				return p(s, (i) => 1 - t(1 - i), t);
			}
			if (n === "tan") {
				const t = (i) => Math.atan(i * 5) / P;
				return p(s, (i) => 1 - t(1 - i), t);
			}
			throw new TypeError(
				"Unexpected parameters are delivered in inverse trigo timing function."
			);
		}
		function B(n, s = () => 1) {
			let t = -1;
			return (e) => (t *= -1, e < 0.5 ? n * s(e * 2) * t : n * s((1 - e) * 2) * t);
		}
		function D(n, s = 1, t = [0, 0], e = 0, i = (h) => 1, r = !1) {
			return (h) => {
				const l = s * h * Math.PI * 2 + e * Math.PI / 180, u = Math.cos(l), c = Math.sin(l), a = n * i(i(r ? 1 - h : h));
				return [a * u + t[0], a * c + t[1]];
			};
		}
		function H(n, s, ...t) {
			const e = [n].concat(t);
			e.push(s);
			const i = e.length, r = Array(i).fill(0).map((h, l) => A(l, i - 1));
			return (h) => {
				const l = r.map((c, a) => c * e[a][0] * (1 - h) ** (i - a - 1) * h ** a), u = r.map((c, a) => c * e[a][1] * (1 - h) ** (i - a - 1) * h ** a);
				return [x(...l), x(...u)];
			};
		}

		if ('animate' in core.plugin) throw new ReferenceError(`插件中已存在名为animate的属性！`);

		core.plugin.animate = {
			Animation: Y,
			AnimationBase: F,
			Ticker: I,
			Transition: j,
			sleep: R,
			circle: D,
			bezierPath: H,
			linear: O,
			bezier: q,
			trigo: U,
			power: C,
			hyper: G,
			inverseTrigo: N,
			shake: B
		}

	},
	"新版道具栏": function () {
		// 在此增加新插件
		// 注：///// *** 裹起来的区域： 该区域内参数可以随意更改调整ui绘制 不会影响总体布局
		// 请尽量修改该区域而不是其他区域 修改的时候最好可以对照现有ui修改

		///// *** 道具类型
		// cls对应name
		var itemClsName = {
			"constants": "永久道具",
			"tools": "消耗道具",
		}
		// 一页最大放的道具数量 将把整个道具左栏分成num份 每份是一个道具项
		var itemNum = 12;
		///// ***

		// 背景设置
		this.drawBoxBackground = function (ctx) {
			core.setTextAlign(ctx, "left");
			core.clearMap(ctx);
			core.deleteCanvas("_selector");
			var info = core.status.thisUIEventInfo || {};

			///// *** 背景设置
			var max = core.__PIXELS__;
			var x = 2,
				y = x,
				w = max - x * 2,
				h = w;
			var borderWidth = 2,
				borderRadius = 5, // radius:圆角矩形的圆角半径
				borderStyle = "#fff";
			var backgroundColor = "gray";
			// 设置背景不透明度(0.85)
			var backgroundAlpha = 0.85;
			///// ***

			var start_x = x + borderWidth / 2,
				start_y = y + borderWidth / 2,
				width = max - start_x * 2,
				height = max - start_y * 2;

			// 渐变色背景的一个例子(黑色渐变白色)：
			// 有关渐变色的具体知识请网上搜索canvas createGradient了解
			/*
			   var grd = ctx.createLinearGradient(x, y, x + w, y);
			   grd.addColorStop(0, "black");
			   grd.addColorStop(1, "white");
			   backgroundColor = grd;
			*/
			// 使用图片背景要注释掉下面的strokeRect和fillRoundRect
			// 图片背景的一个例子：
			/*
			   core.drawImage(ctx, "xxx.png", x, y, w, h);
			   core.strokeRect(ctx, x, y, w, h, borderStyle, borderWidth);
			*/
			core.setAlpha(ctx, backgroundAlpha);
			core.strokeRoundRect(ctx, x, y, w, h, borderRadius, borderStyle, borderWidth);
			core.fillRoundRect(ctx, start_x, start_y, width, height, borderRadius, backgroundColor);
			core.setAlpha(ctx, 1);

			///// *** 左栏配置
			var leftbar_height = height;
			// 左边栏宽度(width*0.6) 本身仅为坐标使用 需要与底下的rightbar_width(width*0.4)同时更改
			var leftbar_width = width * 0.6;
			///// ***

			// xxx_right参数 代表最右侧坐标
			var leftbar_right = start_x + leftbar_width - borderWidth / 2;
			var leftbar_bottom = start_y + leftbar_height;
			var leftbar_x = start_x;
			var leftbar_y = start_y;

			///// *** 道具栏配置
			var boxName_color = "#fff";
			var boxName_fontSize = 15;
			var boxName_font = core.ui._buildFont(boxName_fontSize, true);
			var arrow_x = 10 + start_x;
			var arrow_y = 10 + start_y;
			var arrow_width = 20;
			var arrow_style = "white";
			// 暂时只能是1 否则不太行 等待新样板(2.7.3)之后对drawArrow做优化
			var arrow_lineWidth = 1;
			// 右箭头
			var rightArrow_right = leftbar_right - 10;
			// 道具内栏顶部坐标 本质是通过该项 控制(道具栏顶部文字和箭头)与道具内栏顶部的间隔
			var itembar_top = arrow_y + 15;
			///// ***

			var itembar_right = rightArrow_right;
			var boxName = core.status.event.id == "toolbox" ? "\r[yellow]道具栏\r | 装备栏" : "道具栏 | \r[yellow]装备栏\r";
			core.drawArrow(ctx, arrow_x + arrow_width, arrow_y, arrow_x, arrow_y, arrow_style, arrow_lineWidth);
			core.drawArrow(ctx, rightArrow_right - arrow_width, arrow_y, rightArrow_right, arrow_y, arrow_style, arrow_lineWidth);
			core.setTextAlign(ctx, "center");
			core.setTextBaseline(ctx, "middle");
			var changeBox = function () {
				var id = core.status.event.id;
				core.closePanel();
				if (id == "toolbox") core.openEquipbox();
				else core.openToolbox();
			}
			core.fillText(ctx, boxName, (leftbar_right + leftbar_x) / 2, arrow_y + 2, boxName_color, boxName_font);

			///// *** 底栏按钮
			var pageBtn_radius = 8;
			// xxx_left 最左侧坐标
			var pageBtn_left = leftbar_x + 3;
			var pageBtn_right = leftbar_right - 3;
			// xxx_bottom 最底部坐标
			var pageBtn_bottom = leftbar_bottom - 2;
			var pageBtn_borderStyle = "#fff";
			var pageBtn_borderWidth = 2;
			var pageText_color = "#fff";
			// 底部按钮与上面的道具内栏的间隔大小
			var bottomSpace = 8;
			///// ***

			core.drawItemListbox_setPageBtn(ctx, pageBtn_left, pageBtn_right, pageBtn_bottom, pageBtn_radius, pageBtn_borderStyle, pageBtn_borderWidth);
			var page = info.page || 1;
			var pageFontSize = pageBtn_radius * 2 - 4;
			var pageFont = core.ui._buildFont(pageFontSize);
			core.setPageItems(page);
			var num = itemNum;
			if (core.status.event.id == "equipbox") num -= 5;
			var maxPage = info.maxPage;
			var pageText = page + " / " + maxPage;
			core.setTextAlign(ctx, "center");
			core.setTextBaseline(ctx, "bottom");
			core.fillText(ctx, pageText, (leftbar_x + leftbar_right) / 2, pageBtn_bottom, pageText_color, pageFont);
			core.addUIEventListener(start_x, start_y, leftbar_right - start_x, arrow_y - start_y + 13, changeBox);
			var itembar_height = Math.ceil(pageBtn_bottom - pageBtn_radius * 2 - pageBtn_borderWidth / 2 - bottomSpace - itembar_top);
			var oneItemHeight = (itembar_height - 4) / itemNum;
			return {
				x: start_x,
				y: start_y,
				width: width,
				height: height,
				leftbar_right: leftbar_right,
				obj: {
					x: arrow_x,
					y: itembar_top,
					width: itembar_right - arrow_x,
					height: itembar_height,
					oneItemHeight: oneItemHeight
				}
			}
		}

		this.drawItemListbox = function (ctx, obj) {
			ctx = ctx || core.canvas.ui;
			var itembar_x = obj.x,
				itembar_y = obj.y,
				itembar_width = obj.width,
				itembar_height = obj.height,
				itemNum = obj.itemNum,
				oneItemHeight = obj.oneItemHeight;
			var itembar_right = itembar_x + itembar_width;
			var info = core.status.thisUIEventInfo || {};
			var obj = {};
			var page = info.page || 1,
				index = info.index,
				select = info.select || {};

			///// *** 道具栏内栏配置
			var itembar_style = "black";
			var itembar_alpha = 0.7;
			// 一个竖屏下减少道具显示的例子:
			// if (core.domStyle.isVertical) itemNum = 10;
			// 每个道具项的上下空隙占总高度的比例
			var itembar_marginHeightRatio = 0.2;
			// 左右间隔空隙
			var item_marginLeft = 2;
			var item_x = itembar_x + 2,
				item_y = itembar_y + 2,
				item_right = itembar_right - 2,
				itemName_color = "#fff";
			// 修改此项以更换闪烁光标
			var item_selector = "winskin.png";
			///// ***

			core.setAlpha(ctx, itembar_alpha);
			core.fillRect(ctx, itembar_x, itembar_y, itembar_width, itembar_height, itembar_style);
			core.setAlpha(ctx, 1);
			var pageItems = core.setPageItems(page);
			var marginHeight = itembar_marginHeightRatio * oneItemHeight;
			core.setTextBaseline(ctx, "middle");
			var originColor = itemName_color;
			for (var i = 0; i < pageItems.length; i++) {
				itemName_color = originColor;
				var item = pageItems[i];
				// 设置某个的字体颜色的一个例子
				// if (item.id == "xxx") itemName_color = "green";
				core.drawItemListbox_drawItem(ctx, item_x, item_right, item_y, oneItemHeight, item_marginLeft, marginHeight, itemName_color, pageItems[i]);
				if (index == i + 1) core.ui._drawWindowSelector(item_selector, item_x + 1, item_y - 1, item_right - item_x - 2, oneItemHeight - 2);
				item_y += oneItemHeight;
			}
		}

		this.drawToolboxRightbar = function (ctx, obj) {
			ctx = ctx || core.canvas.ui;
			var info = core.status.thisUIEventInfo || {};
			var page = info.page || 1,
				index = info.index || 1,
				select = info.select || {};
			var start_x = obj.x,
				start_y = obj.y,
				width = obj.width,
				height = obj.height;
			var toolboxRight = start_x + width,
				toolboxBottom = start_y + height;


			///// *** 侧边栏(rightbar)背景设置(物品介绍)
			var rightbar_width = width * 0.4;
			var rightbar_height = height;
			var rightbar_lineWidth = 2;
			var rightbar_lineStyle = "#fff";
			///// ***

			var rightbar_x = toolboxRight - rightbar_width - rightbar_lineWidth / 2;
			var rightbar_y = start_y;
			core.drawLine(ctx, rightbar_x, rightbar_y, rightbar_x, rightbar_y + rightbar_height, rightbar_lineStyle, rightbar_lineWidth);

			// 获取道具id(有可能为null)
			var itemId = select.id;
			var item = core.material.items[itemId];

			///// *** 侧边栏物品Icon信息
			var iconRect_y = rightbar_y + 10;
			// space：间距
			// 这里布局设定iconRect与侧边栏左边框 itemName与工具栏右边框 itemRect与itemName的间距均为space
			var space = 15;
			var iconRect_x = rightbar_x + space;
			var iconRect_radius = 2,
				iconRect_width = 32,
				iconRect_height = 32,
				iconRect_style = "#fff",
				iconRect_lineWidth = 2;
			///// ***

			var iconRect_bottom = iconRect_y + iconRect_height,
				iconRect_right = iconRect_x + iconRect_width;

			///// *** 侧边栏各项信息
			var itemTextFontSize = 15,
				itemText_x = iconRect_x - 4,
				itemText_y = Math.floor(start_y + rightbar_height * 0.25), // 坐标取整防止模糊
				itemClsFontSize = 15,
				itemClsFont = core.ui._buildFont(itemClsFontSize),
				itemClsColor = "#fff",
				itemCls_x = itemText_x - itemClsFontSize / 2,
				itemCls_middle = (iconRect_bottom + itemText_y) / 2, //_middle代表文字的中心y坐标
				itemNameFontSize = 18,
				itemNameColor = "#fff",
				itemNameFont = core.ui._buildFont(itemNameFontSize, true);
			var itemName_x = iconRect_right + space;
			var itemName_middle = iconRect_y + iconRect_height / 2 + iconRect_lineWidth;
			// 修改这里可以编辑未选中道具时的默认值
			var defaultItem = {
				cls: "constants",
				name: "未知道具",
				text: "没有道具最永久"
			}
			var defaultEquip = {
				cls: "equips",
				name: "未知装备",
				text: "一无所有，又何尝不是一种装备",
				equip: {
					type: "装备"
				}
			}
			///// ***

			var originItem = item;
			if (core.status.event.id == "equipbox") item = item || defaultEquip;
			item = item || defaultItem;
			var itemCls = item.cls,
				itemName = item.name,
				itemText = item.text;
			itemText = core.replaceText(itemText);
			/* 一个根据道具id修改道具名字(右栏)的例子
			 * if (item.id == "xxx") itemNameColor = "red";
			 */
			var itemClsName = core.getItemClsName(item);
			var itemNameMaxWidth = rightbar_width - iconRect_width - iconRect_lineWidth * 2 - space * 2;
			core.strokeRoundRect(ctx, iconRect_x, iconRect_y, iconRect_width, iconRect_height, iconRect_radius, iconRect_style, iconRect_lineWidth);
			if (item.id)
				core.drawIcon(ctx, item.id, iconRect_x + iconRect_lineWidth / 2, iconRect_y + iconRect_lineWidth / 2, iconRect_width - iconRect_lineWidth, iconRect_height - iconRect_lineWidth);
			core.setTextAlign(ctx, "left");
			core.setTextBaseline(ctx, "middle");
			core.fillText(ctx, itemName, itemName_x, itemName_middle, itemNameColor, itemNameFont, itemNameMaxWidth);
			core.fillText(ctx, "【" + itemClsName + "】", itemCls_x, itemCls_middle, itemClsColor, itemClsFont);
			var statusText = "";
			if (core.status.event.id == "equipbox") {
				var type = item.equip.type;
				if (typeof type == "string") type = core.getEquipTypeByName(type);
				var compare = core.compareEquipment(item.id, core.getEquip(type));
				if (info.select.action == "unload") compare = core.compareEquipment(null, item.id);
				// --- 变化值...
				for (var name in core.status.hero) {
					if (typeof core.status.hero[name] != 'number') continue;
					var nowValue = core.getRealStatus(name);
					// 查询新值
					var newValue = Math.floor((core.getStatus(name) + (compare.value[name] || 0)) *
						(core.getBuff(name) * 100 + (compare.percentage[name] || 0)) / 100);
					if (nowValue == newValue) continue;
					var color = newValue > nowValue ? '#00FF00' : '#FF0000';
					nowValue = core.formatBigNumber(nowValue);
					newValue = core.formatBigNumber(newValue);
					statusText += core.getStatusLabel(name) + " " + nowValue + "->\r[" + color + "]" + newValue + "\r\n";
				}
			}
			itemText = statusText + itemText;
			core.drawTextContent(ctx, itemText, {
				left: itemText_x,
				top: itemText_y,
				bold: false,
				color: "white",
				align: "left",
				fontSize: itemTextFontSize,
				maxWidth: rightbar_width - (itemText_x - rightbar_x) * 2 + itemTextFontSize / 2
			});

			///// *** 退出按钮设置
			var btnRadius = 10;
			var btnBorderWidth = 2;
			var btnRight = toolboxRight - 2;
			var btnBottom = toolboxBottom - 2;
			var btnBorderStyle = "#fff";
			///// ***

			// 获取圆心位置
			var btn_x = btnRight - btnRadius - btnBorderWidth / 2;
			btn_y = btnBottom - btnRadius - btnBorderWidth / 2;
			core.drawToolbox_setExitBtn(ctx, btn_x, btn_y, btnRadius, btnBorderStyle, btnBorderWidth);

			///// *** 使用按钮设置
			var useBtnHeight = btnRadius * 2;
			// 这里不设置useBtnWidth而是根据各项数据自动得出width
			var useBtnRadius = useBtnHeight / 2;
			var useBtn_x = rightbar_x + 4,
				useBtn_y = btnBottom - useBtnHeight;
			var useBtnBorderStyle = "#fff";
			var useBtnBorderWidth = btnBorderWidth;
			///// ***

			core.drawToolbox_setUseBtn(ctx, useBtn_x, useBtn_y, useBtnRadius, useBtnHeight, useBtnBorderStyle, useBtnBorderWidth);
		}

		this.drawEquipbox_drawOthers = function (ctx, obj) {
			var info = core.status.thisUIEventInfo;

			///// *** 装备格设置
			var equipList_lineWidth = 2;
			var equipList_boxSize = 32;
			var equipList_borderWidth = 2;
			var equipList_borderStyle = "#fff";
			var equipList_nameColor = "#fff";
			///// ***

			var equipList_x = obj.x + 4,
				equipList_bottom = obj.obj.y - equipList_lineWidth,
				equipList_y = equipList_bottom - obj.obj.oneItemHeight * reduceItem - 2,
				equipList_height = equipList_bottom - equipList_y;
			var equipList_right = obj.leftbar_right,
				equipList_width = equipList_right - equipList_x;
			core.drawLine(ctx, obj.x, equipList_bottom + equipList_lineWidth / 2, equipList_right, equipList_bottom + equipList_lineWidth / 2, equipList_borderStyle, equipList_lineWidth);
			var toDrawList = core.status.globalAttribute.equipName,
				len = toDrawList.length;

			///// *** 装备格设置
			var maxItem = 4;
			var box_width = 32,
				box_height = 32,
				box_borderStyle = "#fff",
				box_selectBorderStyle = "gold", // 选中的装备格的颜色
				box_borderWidth = 2;
			var boxName_fontSize = 14,
				boxName_space = 2,
				boxName_color = "#fff"; // 装备格名称与上面的装备格框的距离
			var maxLine = Math.ceil(len / maxItem);
			///// ***
			var l = Math.sqrt(len)
			if (Math.pow(l) == len && len != 4) {
				if (l <= maxItem) maxItem = l;
			}
			maxItem = Math.min(toDrawList.length, maxItem);
			info.equips = maxItem;

			var boxName_font = core.ui._buildFont(boxName_fontSize);
			// 总宽高减去所有装备格宽高得到空隙大小
			var oneBoxWidth = box_width + box_borderWidth * 2;
			var oneBoxHeight = box_height + boxName_fontSize + boxName_space + 2 * box_borderWidth;
			var space_y = (equipList_height - maxLine * oneBoxHeight) / (1 + maxLine),
				space_x = (equipList_width - maxItem * oneBoxWidth) / (1 + maxItem);
			var box_x = equipList_x + space_x,
				box_y = equipList_y + space_y;
			for (var i = 0; i < len; i++) {
				var id = core.getEquip(i),
					name = toDrawList[i];
				var selectBorder = false;
				if (core.status.thisUIEventInfo.select.type == i) selectBorder = true;
				var borderStyle = selectBorder ? box_selectBorderStyle : box_borderStyle;
				core.drawEquipbox_drawOne(ctx, name, id, box_x, box_y, box_width, box_height, boxName_space, boxName_font, boxName_color, borderStyle, box_borderWidth);
				var todo = new Function("core.clickOneEquipbox('" + id + "'," + i + ")");
				core.addUIEventListener(box_x - box_borderWidth / 2, box_y - box_borderWidth / 2, oneBoxWidth, oneBoxHeight, todo);
				box_x += space_x + oneBoxWidth;
				if ((i + 1) % maxItem == 0) {
					box_x = equipList_x + space_x;
					box_y += space_y + oneBoxHeight;
				}
			}
		}

		this.drawToolbox = function (ctx) {
			ctx = ctx || core.canvas.ui;
			core.status.thisEventClickArea = [];

			var info = core.drawBoxBackground(ctx);
			info.itemNum = itemNum;
			core.drawItemListbox(ctx, info.obj);
			core.drawToolboxRightbar(ctx, info);
			core.setTextBaseline(ctx, "alphabetic");
			core.setTextAlign("left");
		}

		var reduceItem = 4;
		this.drawEquipbox = function (ctx) {
			ctx = ctx || core.canvas.ui;
			core.status.thisEventClickArea = [];
			var info = core.drawBoxBackground(ctx);
			info.itemNum = itemNum - reduceItem;
			info.obj.y += info.obj.oneItemHeight * reduceItem;
			info.obj.height -= info.obj.oneItemHeight * reduceItem;
			core.drawItemListbox(ctx, info.obj);
			core.drawEquipbox_drawOthers(ctx, info);
			core.drawToolboxRightbar(ctx, info);
			core.setTextBaseline(ctx, "alphabetic");
			core.setTextAlign("left");
		}


		this.drawEquipbox_drawOne = function (ctx, name, id, x, y, width, height, space, font, color, style, lineWidth) {
			if (id) core.drawIcon(ctx, id, x + lineWidth / 2, y + lineWidth / 2, width, height);
			core.strokeRect(ctx, x, y, width + lineWidth, height + lineWidth, style, lineWidth);
			core.setTextAlign(ctx, "center");
			core.setTextBaseline(ctx, "top");
			var tx = (x + x + lineWidth / 2 + width) / 2,
				ty = y + height + lineWidth / 2 * 3 + space;
			core.fillText(ctx, name, tx, ty, color, font);
			core.setTextBaseline(ctx, "alphabetic");
			core.setTextAlign("left");
		}

		this.drawItemListbox_drawItem = function (ctx, left, right, top, height, marginLeft, marginHeight, style, id) {
			var info = core.status.thisUIEventInfo;
			var nowClick = info.index;
			var item = core.material.items[id] || {};
			var name = item.name || "???";
			var num = core.itemCount(id) || 0;
			var fontSize = Math.floor(height - marginHeight * 2);
			core.setTextAlign(ctx, "right");
			var numText = "x" + num;
			core.fillText(ctx, numText, right - marginLeft, top + height / 2, style, core.ui._buildFont(fontSize));
			if (name != "???") core.drawIcon(ctx, id, left + marginLeft, top + marginHeight, fontSize, fontSize);
			var text_x = left + marginLeft + fontSize + 2;
			var maxWidth = right - core.calWidth(ctx, numText) - text_x;
			core.setTextAlign(ctx, "left");
			core.fillText(ctx, name, text_x, top + height / 2, style, core.ui._buildFont(fontSize), maxWidth);
			var todo = new Function("core.clickItemFunc('" + id + "');");
			core.addUIEventListener(left, top, right - left, height, todo);
		}

		this.setPageItems = function (page) {
			var num = itemNum;
			if (core.status.event.id == "equipbox") num -= reduceItem;
			var info = core.status.thisUIEventInfo;
			if (!info) return;
			page = page || info.page;
			var items = core.getToolboxItems(core.status.event.id == "toolbox" ? "all" : "equips");
			info.allItems = items;
			var maxPage = Math.ceil(items.length / num);
			info.maxPage = maxPage;
			var pageItems = items.slice((page - 1) * num, page * num);
			info.pageItems = pageItems;
			info.maxItem = pageItems.length;
			if (items.length == 0 && pageItems.length == 0) info.index = null;
			if (pageItems.length == 0 && info.page > 1) {
				info.page = Math.max(1, info.page - 1);
				return core.setPageItems(info.page);
			}
			return pageItems;
		}

		this.drawToolbox_setExitBtn = function (ctx, x, y, r, style, lineWidth) {
			core.strokeCircle(ctx, x, y, r, style, lineWidth);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			var textSize = Math.sqrt(2) * r;
			core.fillText(ctx, "x", x, y, style, core.ui._buildFont(textSize), textSize);
			core.setTextAlign(ctx, "start");
			core.setTextBaseline(ctx, "top");

			var todo = function () {
				core.closePanel();
			}
			core.addUIEventListener(x - r, y - r, r * 2, r * 2, todo);
		}

		this.drawToolbox_setUseBtn = function (ctx, x, y, r, h, style, lineWidth) {
			core.setTextAlign(ctx, "left");
			core.setTextBaseline(ctx, "top");
			var fontSize = h - 4;
			var font = core.ui._buildFont(fontSize);
			var text = core.status.event.id == "toolbox" ? "使用" : "装备";
			if (core.status.thisUIEventInfo.select.action == "unload") text = "卸下";
			var w = core.calWidth(ctx, text, font) + 2 * r + lineWidth / 2;

			core.strokeRoundRect(ctx, x, y, w, h, r, style, lineWidth);
			core.fillText(ctx, text, x + r, y + lineWidth / 2 + 2, style, font);

			var todo = function () {
				core.useSelectItemInBox();
			}
			core.addUIEventListener(x, y, w, h, todo);
		}

		this.drawItemListbox_setPageBtn = function (ctx, left, right, bottom, r, style, lineWidth) {
			var offset = lineWidth / 2 + r;

			var x = left + offset;
			var y = bottom - offset;
			var pos = Math.sqrt(2) / 2 * (r - lineWidth / 2);
			core.fillPolygon(ctx, [
				[x - pos, y],
				[x + pos - 2, y - pos],
				[x + pos - 2, y + pos]
			], style);
			core.strokeCircle(ctx, x, y, r, style, lineWidth);
			var todo = function () {
				core.addItemListboxPage(-1);
			}
			core.addUIEventListener(x - r - 2, y - r - 2, r * 2 + 4, r * 2 + 4, todo);

			x = right - offset;
			core.fillPolygon(ctx, [
				[x + pos, y],
				[x - pos + 2, y - pos],
				[x - pos + 2, y + pos]
			], style);
			core.strokeCircle(ctx, x, y, r, style, lineWidth);
			var todo = function () {
				core.addItemListboxPage(1);
			}
			core.addUIEventListener(x - r - 2, y - r - 2, r * 2 + 4, r * 2 + 4, todo);
		}

		this.clickItemFunc = function (id) {
			var info = core.status.thisUIEventInfo;
			if (!info) return;
			if (info.select.id == id) return core.useSelectItemInBox();
			info.select = {};
			info.select.id = id;
			core.setIndexAndSelect('index');
			core.refreshBox();
		}

		this.clickOneEquipbox = function (id, type) {
			var info = core.status.thisUIEventInfo;
			if (!info) return;
			if (info.select.id == id && info.select.type == type) core.useSelectItemInBox();
			else core.status.thisUIEventInfo.select = {
				id: id,
				type: type,
				action: "unload"
			}
			return core.refreshBox();
		}

		core.ui.getToolboxItems = function (cls) {
			var list = Object.keys(core.status.hero.items[cls] || {});
			if (cls == "all") {
				for (var name in core.status.hero.items) {
					if (name == "equips") continue;
					list = list.concat(Object.keys(core.status.hero.items[name]));
				}
				return list.filter(function (id) {
					return !core.material.items[id].hideInToolbox;
				}).sort();
			}

			if (this.uidata.getToolboxItems) {
				return this.uidata.getToolboxItems(cls);
			}
			return list.filter(function (id) {
				return !core.material.items[id].hideInToolbox;
			}).sort();
		}

		this.useSelectItemInBox = function () {
			var info = core.status.thisUIEventInfo;
			if (!info) return;
			if (!info.select.id) return;
			var id = info.select.id;
			if (core.status.event.id == "toolbox") {
				core.events.tryUseItem(id);
				// core.closePanel();
			} else if (core.status.event.id == "equipbox") {
				var action = info.select.action || "load";
				info.index = 1;
				if (action == "load") {
					var type = core.getEquipTypeById(id);
					core.loadEquip(id, function () {
						core.status.route.push("equip:" + id);
						info.select.type = type;
						core.setIndexAndSelect("select");
						core.drawEquipbox();
					});
				} else {
					var type = info.select.type;
					core.unloadEquip(type, function () {
						core.status.route.push("unEquip:" + type);
						info.select.type = type;
						//info.select.action = 'load'
						core.setIndexAndSelect("select");
						core.drawEquipbox();
					});
				}
			}
		}

		this.setIndexAndSelect = function (toChange) {
			var info = core.status.thisUIEventInfo;
			if (!info) return;
			core.setPageItems(info.page);
			var index = info.index || 1;
			var items = info.pageItems;
			if (info.select.type != null) {
				var type = info.select.type;
				id = core.getEquip(type);
				info.index = null;
				info.select = {
					id: id,
					action: "unload",
					type: type
				};
				return;
			} else {
				info.select.action = null;
				info.select.type = null;
				if (toChange == "index") info.index = items.indexOf(info.select.id) + 1;
				info.select.id = items[info.index - 1];
			}

		}

		this.addItemListboxPage = function (num) {
			var info = core.status.thisUIEventInfo;
			if (!info) return;
			var maxPage = info.maxPage || 1;
			info.page = info.page || 1;
			info.page += num;
			if (info.page <= 0) info.page = maxPage;
			if (info.page > maxPage) info.page = 1;
			info.index = 1;
			core.setPageItems(info.page);
			core.setIndexAndSelect("select");
			core.refreshBox();
		}

		this.addItemListboxIndex = function (num) {
			var info = core.status.thisUIEventInfo;
			if (!info) return;
			var maxItem = info.maxItem || 0;
			info.index = info.index || 0;
			info.index += num;
			if (info.index <= 0) info.index = 1;
			if (info.index > maxItem) info.index = maxItem;
			core.setIndexAndSelect("select");
			core.refreshBox();
		}

		this.addEquipboxType = function (num) {
			var info = core.status.thisUIEventInfo;
			var type = info.select.type;
			if (type == null && num > 0) info.select.type = 0;
			else info.select.type = type + num;
			var max = core.status.globalAttribute.equipName.length;
			if (info.select.type >= max) {
				info.select = {};
				core.setIndexAndSelect("select")
				return core.addItemListboxPage(0);
			} else {
				var m = Math.abs(info.select.type);
				if (info.select.type < 0) info.select.type = max - m;
				core.setIndexAndSelect("select")
				core.refreshBox();
				return;
			}
		}

		core.actions._keyDownToolbox = function (keycode) {
			if (!core.status.thisEventClickArea) return;
			if (keycode == 37) { // left
				core.addItemListboxPage(-1);
				return;
			}
			if (keycode == 38) { // up
				core.addItemListboxIndex(-1);
				return;
			}
			if (keycode == 39) { // right
				core.addItemListboxPage(1);
				return;
			}
			if (keycode == 40) { // down
				core.addItemListboxIndex(1);
				return;
			}
		}

		////// 工具栏界面时，放开某个键的操作 //////
		core.actions._keyUpToolbox = function (keycode) {
			if (keycode == 81) {
				core.ui.closePanel();
				if (core.isReplaying())
					core.control._replay_equipbox();
				else
					core.openEquipbox();
				return;
			}
			if (keycode == 84 || keycode == 27 || keycode == 88) {
				core.closePanel();
				return;
			}
			if (keycode == 13 || keycode == 32 || keycode == 67) {
				var info = core.status.thisUIEventInfo;
				if (info.select) {
					core.useSelectItemInBox();
				}
				return;
			}
		}

		core.actions._keyDownEquipbox = function (keycode) {
			if (!core.status.thisEventClickArea) return;
			if (keycode == 37) { // left
				var info = core.status.thisUIEventInfo;
				if (info.index != null) return core.addItemListboxPage(-1);
				return core.addEquipboxType(-1);
			}
			if (keycode == 38) { // up
				var info = core.status.thisUIEventInfo;
				if (info.index == 1) {
					info.select.type = core.status.globalAttribute.equipName.length - 1;
					core.setIndexAndSelect();
					return core.refreshBox();
				}
				if (info.index) return core.addItemListboxIndex(-1);
				return core.addEquipboxType(-1 * info.equips);
			}
			if (keycode == 39) { // right
				var info = core.status.thisUIEventInfo;
				if (info.index != null) return core.addItemListboxPage(1);
				return core.addEquipboxType(1);
			}
			if (keycode == 40) { // down
				var info = core.status.thisUIEventInfo;
				if (info.index) return core.addItemListboxIndex(1);
				return core.addEquipboxType(info.equips);
			}
		}

		core.actions._keyUpEquipbox = function (keycode, altKey) {
			if (altKey && keycode >= 48 && keycode <= 57) {
				core.items.quickSaveEquip(keycode - 48);
				return;
			}
			if (keycode == 84) {
				core.ui.closePanel();
				if (core.isReplaying())
					core.control._replay_toolbox();
				else
					core.openToolbox();
				return;
			}
			if (keycode == 81 || keycode == 27 || keycode == 88) {
				core.closePanel();
				return;
			}
			if (keycode == 13 || keycode == 32 || keycode == 67) {
				var info = core.status.thisUIEventInfo;
				if (info.select) core.useSelectItemInBox();
				return;
			}
		}

		core.registerAction("ondown", "inEventClickAction", function (x, y, px, py) {
			if (!core.status.thisEventClickArea) return false;
			var info = core.status.thisEventClickArea;
			for (var i = 0; i < info.length; i++) {
				var obj = info[i];
				if (px >= obj.x && px <= obj.x + obj.width && py > obj.y && py < obj.y + obj.height) {
					if (obj.todo) obj.todo();
					break;
				}
			}
			return true;
		}, 51);
		core.registerAction("onclick", "stopClick", function () {
			if (core.status.thisEventClickArea) return true;
		}, 51);

		this.addUIEventListener = function (x, y, width, height, todo) {
			if (!core.status.thisEventClickArea) return;
			var obj = {
				x: x,
				y: y,
				width: width,
				height: height,
				todo: todo
			}
			core.status.thisEventClickArea.push(obj);
		}

		this.initThisEventInfo = function () {
			core.status.thisUIEventInfo = {
				page: 1,
				select: {}
			};
			core.status.thisEventClickArea = [];
		}

		this.refreshBox = function () {
			if (!core.status.event.id) return;
			if (core.status.event.id == "toolbox") core.drawToolbox();
			else core.drawEquipbox();
		}

		core.ui.closePanel = function () {
			if (core.status.hero && core.status.hero.flags) {
				// 清除全部临时变量
				Object.keys(core.status.hero.flags).forEach(function (name) {
					if (name.startsWith("@temp@") || /^arg\d+$/.test(name)) {
						delete core.status.hero.flags[name];
					}
				});
			}
			this.clearUI();
			core.maps.generateGroundPattern();
			core.updateStatusBar(true);
			core.unlockControl();
			core.status.event.data = null;
			core.status.event.id = null;
			core.status.event.selection = null;
			core.status.event.ui = null;
			core.status.event.interval = null;
			core.status.thisUIEventInfo = null;
			core.status.thisEventClickArea = null
		}

		this.getItemClsName = function (item) {
			if (item == null) return itemClsName;
			if (item.cls == "equips") {
				if (typeof item.equip.type == "string") return item.equip.type;
				var type = core.getEquipTypeById(item.id);
				return core.status.globalAttribute.equipName[type];
			} else return itemClsName[item.cls] || item.cls;
		}

		core.events.openToolbox = function (fromUserAction) {
			if (core.isReplaying()) return;
			if (!this._checkStatus('toolbox', fromUserAction)) return;
			core.initThisEventInfo();
			let info = core.status.thisUIEventInfo
			info.index = 1
			core.setIndexAndSelect('select')
			core.drawToolbox();
		}

		core.events.openEquipbox = function (fromUserAction) {
			if (core.isReplaying()) return;
			if (!this._checkStatus('equipbox', fromUserAction)) return;
			core.initThisEventInfo();
			let info = core.status.thisUIEventInfo
			info.select.type = 0
			core.setIndexAndSelect('select')
			core.drawEquipbox();
		}

		core.control._replay_toolbox = function () {
			if (!core.isPlaying() || !core.isReplaying()) return;
			if (!core.status.replay.pausing) return core.drawTip("请先暂停录像");
			if (core.isMoving() || core.status.replay.animate || core.status.event.id)
				return core.drawTip("请等待当前事件的处理结束");

			core.lockControl();
			core.status.event.id = 'toolbox';
			core.drawToolbox();
		}

		core.control._replay_equipbox = function () {
			if (!core.isPlaying() || !core.isReplaying()) return;
			if (!core.status.replay.pausing) return core.drawTip("请先暂停录像");
			if (core.isMoving() || core.status.replay.animate || core.status.event.id)
				return core.drawTip("请等待当前事件的处理结束");

			core.lockControl();
			core.status.event.id = 'equipbox';
			core.drawEquipbox();
		}

		core.control._replayAction_item = function (action) {
			if (action.indexOf("item:") != 0) return false;
			var itemId = action.substring(5);
			if (!core.canUseItem(itemId)) return false;
			if (core.material.items[itemId].hideInReplay || core.status.replay.speed == 24) {
				core.useItem(itemId, false, core.replay);
				return true;
			}
			core.status.event.id = "toolbox";
			core.initThisEventInfo();
			var info = core.status.thisUIEventInfo;
			var items = core.getToolboxItems("all");
			core.setPageItems(1);
			var index = items.indexOf(itemId) + 1;
			info.page = Math.ceil(index / info.maxItem);
			info.index = index % info.maxItem || info.maxItem;
			core.setIndexAndSelect("select");
			core.setPageItems(info.page);
			core.drawToolbox();
			setTimeout(function () {
				core.ui.closePanel();
				core.useItem(itemId, false, core.replay);
			}, core.control.__replay_getTimeout());
			return true;
		}

		core.control._replayAction_equip = function (action) {
			if (action.indexOf("equip:") != 0) return false;
			var itemId = action.substring(6);
			var items = core.getToolboxItems('equips');
			var index = items.indexOf(itemId) + 1;
			if (index < 1) return false;
			core.status.route.push(action);
			if (core.material.items[itemId].hideInReplay || core.status.replay.speed == 24) {
				core.loadEquip(itemId, core.replay);
				return true;
			}
			core.status.event.id = "equipbox";
			core.initThisEventInfo();
			var info = core.status.thisUIEventInfo;
			core.setPageItems(1);
			info.page = Math.ceil(index / info.maxItem);
			info.index = index % info.maxItem || info.maxItem;
			core.setIndexAndSelect("select");
			core.setPageItems(info.page);
			core.drawEquipbox();
			setTimeout(function () {
				core.ui.closePanel();
				core.loadEquip(itemId, core.replay);
			}, core.control.__replay_getTimeout());
			return true;
		}

		core.control._replayAction_unEquip = function (action) {
			if (action.indexOf("unEquip:") != 0) return false;
			var equipType = parseInt(action.substring(8));
			if (!core.isset(equipType)) return false;
			core.status.route.push(action);
			if (core.status.replay.speed == 24) {
				core.unloadEquip(equipType, core.replay);
				return true;
			}
			core.status.event.id = "equipbox";
			core.initThisEventInfo();
			var info = core.status.thisUIEventInfo;
			core.setPageItems(1);
			info.select.type = equipType;
			core.setIndexAndSelect();
			core.drawEquipbox();
			setTimeout(function () {
				core.ui.closePanel();
				core.unloadEquip(equipType, core.replay);
			}, core.control.__replay_getTimeout());
			return true;
		}
		core.registerReplayAction("item", core.control._replayAction_item);
		core.registerReplayAction("equip", core.control._replayAction_equip);
		core.registerReplayAction("unEquip", core.control._replayAction_unEquip);
	},
	"血瓶宝石显示数据": function () {
		// 在此增加新插件
		/* 宝石血瓶左下角显示数值
		 * 需要将 变量：itemDetail改为true才可正常运行
		 * 请尽量减少勇士的属性数量，否则可能会出现严重卡顿（划掉，现在你放一万个属性也不会卡）
		 * 注意：这里的属性必须是core.status.hero里面的，flag无法显示
		 * 如果不想显示，可以core.setFlag("itemDetail", false);
		 * 然后再core.getItemDetail();
		 * 如有bug在大群或造塔群@古祠
		 */

		// 忽略的道具
		const ignore = ['superPotion'];

		// 取消注释下面这句可以减少超大地图的判定。
		// 如果地图宝石过多，可能会略有卡顿，可以尝试取消注释下面这句话来解决。
		// core.bigmap.threshold = 256;
		const origin = core.control.updateStatusBar;
		core.updateStatusBar = core.control.updateStatusBar = function () {
			if (core.getFlag('__statistics__')) return;
			else return origin.apply(core.control, arguments);
		}

		core.control.updateDamage = function (floorId, ctx) {
			floorId = floorId || core.status.floorId;
			if (!floorId || core.status.gameOver || main.mode != 'play') return;
			const onMap = ctx == null;

			// 没有怪物手册
			if (!core.hasItem('book')) return;
			core.status.damage.posX = core.bigmap.posX;
			core.status.damage.posY = core.bigmap.posY;
			if (!onMap) {
				const width = core.floors[floorId].width,
					height = core.floors[floorId].height;
				// 地图过大的缩略图不绘制显伤
				if (width * height > core.bigmap.threshold) return;
			}
			this._updateDamage_damage(floorId, onMap);
			this._updateDamage_extraDamage(floorId, onMap);
			if (core.status.thisMap) core.getItemDetail(floorId); // 宝石血瓶详细信息
			this.drawDamage(ctx);
		};
		// 获取宝石信息 并绘制
		this.getItemDetail = function (floorId) {
			if (!core.getFlag('itemDetail')) return;
			floorId = floorId ?? core.status.thisMap.floorId;
			let diff = {};
			const before = core.status.hero;
			const hero = core.clone(core.status.hero);
			const handler = {
				set(target, key, v) {
					diff[key] = v - (target[key] || 0);
					if (!diff[key]) diff[key] = void 0;
					return true;
				}
			};
			core.status.hero = new Proxy(hero, handler);
			core.status.maps[floorId].blocks.forEach(function (block) {
				if (
					block.event.cls !== 'items' ||
					ignore.includes(block.event.id) ||
					block.disable
				)
					return;
				const x = block.x,
					y = block.y;
				// v2优化，只绘制范围内的部分
				if (core.bigmap.v2) {
					if (
						x < core.bigmap.posX - core.bigmap.extend ||
						x > core.bigmap.posX + core._SIZE_ + core.bigmap.extend ||
						y < core.bigmap.posY - core.bigmap.extend ||
						y > core.bigmap.posY + core._SIZE_ + core.bigmap.extend
					) {
						return;
					}
				}
				diff = {};
				const id = block.event.id;
				const item = core.material.items[id];
				if (item.cls === 'equips') {
					// 装备也显示
					const diff = item.equip.value ?? {};
					const per = item.equip.percentage ?? {};
					for (const name in per) {
						diff[name + 'per'] = per[name].toString() + '%';
					}
					drawItemDetail(diff, x, y);
					return;
				}
				// 跟数据统计原理一样 执行效果 前后比较
				core.setFlag('__statistics__', true);
				const list = {
					'yellowPotion': { 'fatigue': 2 },
					'yellowGem': { 'fatigue': 2 },
					'coin': { "money": 200 },
				}
				if (list.hasOwnProperty(id)) {
					diff = { 'fatigue': 2 };
				} else {
					try {
						eval(item.itemEffect);
					} catch (error) { }
				}
				drawItemDetail(diff, x, y);
			});
			core.status.hero = before;
			window.hero = before;
			window.flags = before.flags;
		};

		// 绘制
		function drawItemDetail(diff, x, y) {
			const px = 32 * x + 2,
				py = 32 * y + 30;
			let content = '';
			// 获得数据和颜色
			let i = 0;
			for (const name in diff) {
				if (!diff[name]) continue;
				let color = '#fff';

				if (typeof diff[name] === 'number')
					content = core.formatBigNumber(diff[name], true);
				else content = diff[name];
				switch (name) {
					case 'atk':
					case 'atkper':
						color = '#FF7A7A';
						break;
					case 'def':
					case 'defper':
						color = '#00E6F1';
						break;
					case 'mdef':
					case 'mdefper':
						color = '#6EFF83';
						break;
					case 'hp':
						color = '#A4FF00';
						break;
					case 'hpmax':
					case 'hpmaxper':
						color = '#F9FF00';
						break;
					case 'mana':
						color = '#c66';
						break;
					case 'fatigue':
						color = 'gray';
						break;
					case 'money':
						color = 'gold';
						break;
				}
				// 绘制
				core.status.damage.data.push({
					text: content,
					px: px,
					py: py - 10 * i,
					color: color
				});
				i++;
			}
		}
	},
	"切装事件": function () {
		////// 换上 //////
		items.prototype.loadEquip = function (equipId, callback) {
			if (!this.canEquip(equipId, true)) {
				if (callback) callback();
				return;
			}

			var loadEquip = core.material.items[equipId] || {};
			var type = this.getEquipTypeById(equipId);
			if (type < 0) {
				core.playSound('操作失败');
				core.drawTip("当前没有" + loadEquip.equip.type + "的空位！");
				if (callback) callback();
				return;
			}

			if (!core.hasItem('I325') && !core.hasItem('I326')) {
				if (['I315', 'I316', 'I317', 'I318', 'I319'].includes(equipId)) {
					if (core.status.hero.hp <= 50) {
						core.drawTip('血量不足，无法切换剑技！');
						core.playSound('error.mp3');
						return;
					} else {
						core.status.hero.hp -= 50;
					}
				}
			}
			if (!core.hasItem('I327') && !core.hasItem('I326')) {
				if (['I320', 'I321', 'I322', 'I339', 'I375'].includes(equipId)) {
					if (core.status.hero.hp <= 50) {
						core.drawTip('血量不足，无法切换盾技！');
						core.playSound('error.mp3');
						return;
					} else {
						core.status.hero.hp -= 50;
					}
				}
			}
			this._realLoadEquip(type, equipId, core.status.hero.equipment[type], callback);
		}

		////// 卸下 //////
		items.prototype.unloadEquip = function (equipType, callback) {
			var unloadEquipId = core.status.hero.equipment[equipType];
			if (!unloadEquipId) {
				if (callback) callback();
				return;
			}
			core.drawTip('无法卸下已装备的技能，请装上其他技能来替换之。');
			core.playSound('error.mp3');
			return;
		}

		items.prototype.quickLoadEquip = function (index) {
			if (index === 1) {
				core.drawTip("已取消预设技能");
			}
			else {
				core.drawTip("已切换" + index + "号预设技能方案");
			}
			core.setFlag('preSetIndex', index);
			core.playSound('equip.mp3');
		}

		items.prototype.quickSaveEquip = items.prototype.quickLoadEquip;
	},
	"工具": function () {
		// 工具函数和类
		/**
		 * @type {ButtonBase}
		 */
		this.Button = class {
			constructor(name, x, y, w, h) {
				this.name = name;
				this.x = x;
				this.y = y;
				this.w = w;
				this.h = h;
				this.disable = false;

				this._draw = () => { };
				this.event = (x, y, px, py) => { };
				this.status = () => { };
			}

			draw() {
				if (this.disable) return;
				this._draw();
			}

			register() {
				core.registerAction('onclick', this.name, (x, y, px, py) => {
					if (this.disable) return;
					if (px >= this.x && px <= this.x + this.w && py > this.y && py <= this.y + this.h)
						this.event(x, y, px, py);
				}, 100);
			}

			unregister() {
				core.unregisterAction('onclick', this.name);
			}
		}

		this.Menu = class {
			constructor(name) {
				this.name = name;
				this.btnList = new Map();
				this.keyEvent = () => { };
				this.end = () => { core.clearMap(this.name); };
			}

			drawContent() {
				this.btnList.forEach((button) => { button.draw(); })
			}

			beginListen() {
				core.registerAction('keyDown', this.name, this.keyEvent, 100);
				this.btnList.forEach((button) => { button.register(); })
			}

			endListen() {
				core.unregisterAction('keyDown', this.name);
				this.btnList.forEach((button) => { button.unregister(); })
			}

			clear() {
				this.endListen();
				core.deleteCanvas(this.name);
			}

			init() {
				this.beginListen();
				this.drawContent();
			}
		}

		/** 生成一个0到x的随机数 */
		this.dice = function (x) {
			if (!Number.isInteger(x) || x < 0) return 0;
			return Math.floor(Math.random() * (x + 1));
		}

		/**
		 * 注册一个每interval帧执行一次的动画
		 * @param {string} name 
		 * @param {number} interval 
		 * @param {Function} event 
		 */
		this.registerAnimationInterval = function (name, interval, event) {
			let currTime = 0;
			core.registerAnimationFrame(name, true, (timestamp) => {
				if (timestamp - currTime < interval) return;
				currTime = timestamp;
				event();
			});
		}

		/**
		 * 按照像素坐标绘制动画
			 * @param {string} name 动画名称
			 * @param {number} x 像素x坐标
			 * @param {number} y 像素y坐标
			 * @param {boolean} alignWindow 
			 * @param {Function} callback 
		 */
		this.drawAnimateByPixel = function (name, x, y, alignWindow, callback) {
			name = core.getMappedName(name);

			// 正在播放录像：不显示动画
			if (core.isReplaying() || !core.material.animates[name] || x == null || y == null) {
				if (callback) callback();
				return -1;
			}

			// 开始绘制
			let animate = core.material.animates[name];
			if (alignWindow) {
				centerX += core.bigmap.offsetX;
				centerY += core.bigmap.offsetY;
			}
			animate.se = animate.se || {};
			if (typeof animate.se == 'string') animate.se = { 1: animate.se };

			let id = setTimeout(null);
			core.status.animateObjs.push({
				"name": name,
				"id": id,
				"animate": animate,
				"centerX": x,
				"centerY": y,
				"index": 0,
				"callback": callback
			});
			return id;
		}

		////// 深拷贝一个对象，含Set和Map //////
		utils.prototype.clone = function (data, filter, recursion) {
			if (!core.isset(data)) return null;
			// date
			if (data instanceof Date) {
				var copy = new Date();
				copy.setTime(data.getTime());
				return copy;
			}
			// array
			if (data instanceof Array) {
				var copy = [];
				for (var i in data) {
					if (!filter || filter(i, data[i]))
						copy[i] = core.clone(data[i], recursion ? filter : null, recursion);
				}
				return copy;
			}
			// 函数
			if (data instanceof Function) {
				return data;
			}

			// Set
			// 对Set而言，过滤器填入value即可
			if (data instanceof Set) {
				var copy = new Set();
				data.forEach(value => {
					if (!filter || filter(value))
						copy.add(core.clone(value, recursion ? filter : null, recursion));
				});
				return copy;
			}

			// Map
			if (data instanceof Map) {
				var copy = new Map();
				data.forEach((value, key) => {
					if (!filter || filter(key, value))
						copy.set(core.clone(key, recursion ? filter : null, recursion),
							core.clone(value, recursion ? filter : null, recursion));
				});
				return copy;
			}

			// object
			if (data instanceof Object) {
				var copy = {};
				for (var i in data) {
					if (data.hasOwnProperty(i) && (!filter || filter(i, data[i])))
						copy[i] = core.clone(data[i], recursion ? filter : null, recursion);
				}
				return copy;
			}
			return data;
		}

		////// 检查并执行领域、夹击、阻击事件 //////
		control.prototype.checkBlock = function () {
			let x = core.getHeroLoc('x'), y = core.getHeroLoc('y'), loc = x + "," + y;
			let damage = core.status.checkBlock.damage[loc];
			if (damage) {
				core.status.hero.hp -= damage;
				let text = (Object.keys(core.status.checkBlock.type[loc] || {}).join("，")) || "伤害";
				core.drawTip("受到" + text + damage + "点");
				if (core.hasItem('snow')) core.drawHeroAnimate("gice");
				else core.drawHeroAnimate("gfire"); //岩浆动画效果
				this._checkBlock_disableQuickShop();
				core.status.hero.statistics.extraDamage += damage;
				if (core.status.hero.hp <= 0) {
					core.status.hero.hp = 0;
					core.updateStatusBar();
					core.events.lose();
					return;
				} else {
					core.updateStatusBar();
				}
			}
			this._checkBlock_ambush(core.status.checkBlock.ambush[loc]);
			this._checkBlock_repulse(core.status.checkBlock.repulse[loc]);
		}
	},
	"自定义设置": function () {

		const Button = this.Button;

		const ctx = 'setting';

		function drawSetting(ctx) {
			core.createCanvas(ctx, 0, 0, core.__PIXELS__, core.__PIXELS__, 180);
			core.clearMap(ctx);
			core.setAlpha(ctx, 0.85);
			core.strokeRoundRect(ctx, 32, 32, core.__PIXELS__ - 64, core.__PIXELS__ - 64, 5, "#fff", 2);
			core.fillRoundRect(ctx, 32, 32, core.__PIXELS__ - 61.5, core.__PIXELS__ - 61.5, 5, "gray");
			core.setAlpha(ctx, 1);
			core.strokeRoundRect(ctx, 35, 70, core.__PIXELS__ - 70, 55, 3, "white");
			core.fillRoundRect(ctx, 35.5, 71, core.__PIXELS__ - 71, 53, 3, "#555555");
			core.ui.fillText(ctx, "设置", 185, 55, 'white', '20px Verdana');
			core.ui.fillText(ctx, "--常用设置--", 40, 145, '#FFE4B5', '16px Verdana');
		}

		const settings = [{
			"name": "血瓶宝石显示数据",
			"x": 40,
			"y": 155,
			"status": function () { return core.getFlag('itemDetail') ? '开' : '关' },
			"func": function () {
				core.setFlag('itemDetail', !core.getFlag('itemDetail'));
				core.control.updateStatusBar();
			},
			"text": "在地图上显示即捡即用道具和装备增加的属性值。"
		},
		{
			"name": "自动拾取",
			"x": 40,
			"y": 180,
			"status": function () { return core.getFlag('autoGet') ? '开' : '关' },
			"func": function () { core.setFlag('autoGet', !core.getFlag('autoGet')); },
			"text": "每步后，自动拾取当前层可获得的道具。"
		},
		{
			"name": "自动拾取(血瓶)",
			"x": 40,
			"y": 205,
			"status": function () { return core.getFlag('autoGetHp') ? '开' : '关' },
			"func": function () { core.setFlag('autoGetHp', !core.getFlag('autoGetHp')); },
			"text": "开启时，可自动拾取血瓶。（需要打开自动拾取本身）"
		},
		{
			"name": "自动拾取(攻防)",
			"x": 40,
			"y": 230,
			"status": function () { return core.getFlag('autoGetAd') ? '开' : '关' },
			"func": function () { core.setFlag('autoGetAd', !core.getFlag('autoGetAd')); },
			"text": "开启时，可自动拾取攻防。（需要打开自动拾取本身）"
		},
		{
			"name": "战斗速度",
			"x": 40,
			"y": 255,
			"status": function () {
				switch (core.getFlag('battleSpeed', 0)) {
					case 0:
						return '快';
					case 1:
						return '中';
					default:
						return '慢';
				}
			},
			"func": function () {
				switch (core.getFlag('battleSpeed', 0)) {
					case 0:
						core.setFlag('battleSpeed', 1);
						break;
					case 1:
						core.setFlag('battleSpeed', 2);
						break;
					default:
						core.setFlag('battleSpeed', 0);
				}
			},
			"text": "调节战斗过程的速度"
		},
		{
			"name": "快捷键",
			"x": 40,
			"y": 280,
			"status": function () { return core.getFlag('xinHotkey') ? '新新' : 'h5' },
			"func": function () { core.setFlag('xinHotkey', !core.getFlag('xinHotkey')); },
			"text": "是否使用新新2原版的快捷键（具体可按L查看）。"
		},
		{
			"name": "在线留言",
			"x": 40,
			"y": 305,
			"status": function () { return core.getFlag('comment') ? '开' : '关' },
			"func": function () { core.setFlag('comment', !core.getFlag('comment')); },
			"text": "是否接收并显示在线留言。"
		},
		]

		/**
		 * @extends {MenuBase}
		 */
		class SettingMenu extends this.Menu {
			constructor() {
				super(ctx);
				/** 当前选中的选项的名字
				 * @type {string}
				 */
				this.pickedBtn = '';
				/** 选项名称的顺序数组 */
				this.choiceNameList = [];
				/** 上方显示的提示信息 */
				this.hint = '';
			}

			drawContent() {
				drawSetting(ctx);
				this.btnList.forEach((button) => { button.draw(); })
				core.ui.drawTextContent(ctx, this.hint || '', {
					left: 40, top: 75, bold: false, color: "white",
					align: "left", fontSize: 12, maxWidth: 340
				});
				const pickedBtn = this.btnList.get(this.pickedBtn);
				if (pickedBtn) {
					core.drawUIEventSelector(0, "winskin.png",
						pickedBtn.x, pickedBtn.y, pickedBtn.w, pickedBtn.h, 181);
				}
			}

			// 清空画布
			clear() {
				core.deleteCanvas(this.name);
				core.clearUIEventSelector(0);
				this.endListen();
			}
		}

		function initSettingMenu() {
			const settingMenu = new SettingMenu();
			const btnList = new Map();

			for (let i = 0, l = settings.length; i < l; i++) {
				const info = settings[i];
				const button = new Button(info.name, info.x, info.y, 150, 20);
				button.status = info.status;
				button._draw = function () {
					core.ui.fillText(settingMenu.name, this.name + '：' + this.status(),
						this.x, this.y + 15, 'white', '14px Verdana');
				}
				button.event = function () {
					if (settingMenu.pickedBtn === this.name) {
						core.status.route.push('cSet:' + i);
						settings[i].func();
					} else {
						settingMenu.pickedBtn = this.name;
						settingMenu.hint = settings[i].text;
					}
					settingMenu.drawContent();
				}
				btnList.set(info.name, button);
				settingMenu.choiceNameList.push(info.name);
			}
			const quitButton = new Button('quit', 335, 40, 40, 16);
			quitButton._draw = function () {
				core.ui.fillText(ctx, '[退出]', this.x, this.y + 15, '#FFE4B5', '14px Verdana');
			}
			quitButton.event = function () { settingMenu.end(); }
			btnList.set('quit', quitButton);
			const openPreSetButton = new Button('openPreSet', 300, 140, 70, 25);
			openPreSetButton._draw = function () {
				const [x, y, w, h] = [this.x, this.y, this.w, this.h];
				core.fillRect(ctx, x, y, w, h, '#D3D3D3');
				core.strokeRect(ctx, x, y, w, h, '#888888');;
				core.fillText(ctx, '预设技能', x + 6, y + 16, '#555555', '14px Verdana');
			};
			btnList.set('openPreSet', openPreSetButton);
			const openAchieveButton = new Button('openAchieve', 300, 180, 70, 25);
			openAchieveButton._draw = function () {
				const [x, y, w, h] = [this.x, this.y, this.w, this.h];
				core.fillRect(ctx, x, y, w, h, '#D3D3D3');
				core.strokeRect(ctx, x, y, w, h, '#888888');;
				core.fillText(ctx, '成就一览', x + 6, y + 16, '#555555', '14px Verdana');
			};
			btnList.set('openAchieve', openAchieveButton);
			settingMenu.btnList = btnList;
			settingMenu.keyEvent = function (keyCode) {
				const button = this.btnList.get(this.pickedBtn);
				let settingIndex = this.choiceNameList.indexOf(this.pickedBtn);
				// 处理按键事件
				switch (keyCode) {
					case 13:
					case 32:
					case 67: //回车，空格，C键
						button.event();
						break;
					case 27: //Esc
						this.end();
						break;
					case 37: // 左
						break;
					case 39: // 右
						break;
					case 38: // 上
						if (settingIndex >= 1) {
							this.pickedBtn = this.choiceNameList[settingIndex - 1];
						}
						this.drawContent();
						break;
					case 40: // 下
						if (settingIndex < this.choiceNameList.length - 1) {
							this.pickedBtn = this.choiceNameList[settingIndex + 1];
						}
						this.drawContent();
						break;
				}
			}.bind(settingMenu);
			return settingMenu;
		}

		function drawMenus() {
			return new Promise((res) => {
				const settingMenu = initSettingMenu();
				const preSetMenu = core.plugin.initPreSetMenu();
				const achieveMenu = core.plugin.initAchieveMenu();
				settingMenu.end = function () {
					settingMenu.clear();
					res();
				}
				preSetMenu.end = function () {
					preSetMenu.clear();
					res();
				}
				achieveMenu.end = function () {
					achieveMenu.clear();
					res();
				}
				const openPreSetBtn = settingMenu.btnList.get('openPreSet');
				openPreSetBtn.event = function () {
					settingMenu.clear();
					preSetMenu.init();
				}
				const openAchieveBtn = settingMenu.btnList.get('openAchieve');
				openAchieveBtn.event = function () {
					settingMenu.clear();
					achieveMenu.init();
				}
				settingMenu.init();
			});
		}

		this.changeSetting = async function () {
			if (core.isReplaying()) return;
			//禁止Esc打开菜单栏
			core.setFlag('noOpenMenu', true);
			core.lockControl();

			await drawMenus();
			core.unlockControl();
			core.setFlag('noOpenMenu', false);
		}

		core.registerReplayAction('cSet', function (action) {
			if (action.indexOf('cSet:') !== 0) return false;
			const num = action.substring(5);
			if (!settings || num >= settings.length) return false;
			settings[num].func();
			core.status.route.push(action);
			core.replay();
			return true;
		});

	},
	"预设技能": function () {
		/**
		 * 变量解释： recordAction 下场战斗是否录制信息
		 * presetSkill 当前保存的预设方案信息。每次战斗后 若recordAction为真，将会写入presetSkill
		 * preSetIndex 当前切换到了哪个预设方案 每次战斗前 将会读取该信息
		 * hotkeyData {'2':'敌人名字' '3':'敌人名字'} 快捷键信息 每次按键时，将查找该信息
		 * @example 
				let myData = {
				'greenSlime':'bs:0s:1h:2M:3b:4F:5k:6R:10F',
				'redSlime': 'bs:0s:1h:2M:3b:4F:5k:6R:10F',
				'bat': 'bs:0s:1h:2M:3b:4F:5k:6R:10F',
				'vampire': 'bs:0s:1h:2M:3b:4F:5k:6R:10F',
				'redBat': 'bs:0s:1h:2M:3b:4F:5k:6R:10F',
				'zombie':'bs:0s:1h:2M:3b:4F:5k:6R:10F', 
			};
			let hotkeyData = {'2':'greenSlime','4':'bat'}
			core.setFlag('presetSkill', myData);
			core.setFlag('hotkeyData', hotkeyData);
		 */

		const ctx = 'skillPreset';

		const Button = this.Button;

		/**
			 * 绘制选框背景
		 * @param {string} ctx 画布名称
			 */
		function drawSetting(ctx) {
			core.createCanvas(ctx, 0, 0, core.__PIXELS__, core.__PIXELS__, 180);
			core.clearMap(ctx);
			core.setAlpha(ctx, 0.85);
			core.strokeRoundRect(ctx, 32, 32, core.__PIXELS__ - 64, core.__PIXELS__ - 64, 5, "#fff", 2);
			core.fillRoundRect(ctx, 32, 32, core.__PIXELS__ - 61.5, core.__PIXELS__ - 61.5, 5, "gray");
			core.fillRoundRect(ctx, 35.5, 125, core.__PIXELS__ - 71, 170, 3, "#555555");
			core.strokeRoundRect(ctx, 35.5, 125, core.__PIXELS__ - 71, 170, 3, "white");
			core.setAlpha(ctx, 1);
			core.fillText(ctx, '设定快捷键后，按下Alt2~7切换到对应方案。', 40, 60, '#00DDFF', '14px Verdana');
			core.fillText(ctx, '手机段点击画面底部工具栏的空白处即可。', 40, 80, '#00DDFF', '14px Verdana');
			core.fillText(ctx, '1', 108, 110, 'white', '18px Verdana');
			core.fillText(ctx, '2', 140, 110, 'white', '18px Verdana');
			core.fillText(ctx, '3', 172, 110, 'white', '18px Verdana');
			core.fillText(ctx, '4', 204, 110, 'white', '18px Verdana');
			core.fillText(ctx, '5', 236, 110, 'white', '18px Verdana');
			core.fillText(ctx, '6', 268, 110, 'white', '18px Verdana');
			core.fillText(ctx, '快捷键', 320, 110, 'white', '18px Verdana');
			core.fillText(ctx, '分配快捷键', 70, 365, 'white', '18px Verdana');
		}

		const abbreviateList = {
			'b': 'I315', 's': 'I319', 'd': 'I318', 'h': 'I317', 'k': 'I316',
			'M': 'I339', 'C': 'I321', 'R': 'I375', 'F': 'I322', 'E': 'I320',
			'c': 'critical'
		};

		/**
		 * 绘制单个敌人的预设技能信息
		 * @param {string} ctx 画布名称
		 * @param {string} name 敌人名称
		 * @param {string} data 对该敌人的预存技能信息，形如'bs:1c'
		 * @param {number} x 绘制的x坐标
		 * @param {number} y 绘制的y坐标
		 */
		function drawOneData(ctx, name, data, x, y) {
			core.drawIcon(ctx, name, x - 10, y);
			const actionObj = core.plugin.getActionObj(data);
			const [turnArr, skillArr] = [Object.keys(actionObj), Object.values(actionObj)];

			for (let i = 0; i <= 5; i++) {
				const xi = x + 32 * (i + 1);
				if (xi > core.__PIXELS__) break;
				const index = turnArr.indexOf(i.toString());
				if (index !== -1) {
					core.drawIcon(ctx, abbreviateList[skillArr[index][0]], xi, y);
				}
				if (Math.max(...turnArr) > 5) {
					core.fillText(ctx, '...', 293, y + 16, 'white', '16px Verdana');// 绘制一个省略号
				}
			}
			const hotkeyData = core.getFlag('hotkeyData', {});
			const [hotkeys, hotKeyenemies] = [Object.keys(hotkeyData), Object.values(hotkeyData)];
			const currEnemyIndex = hotKeyenemies.indexOf(name);
			if (currEnemyIndex !== -1) core.drawIcon(ctx, 'btn' + hotkeys[currEnemyIndex], x + 268, y);
		}

		/**
		 * @extends {MenuBase}
		 */
		class PresetMenu extends this.Menu {
			constructor() {
				super(ctx);
				/** 当前在绘制第几页*/
				this.page = 0;
				/** 敌人对应的预设操作数据
				 * @type {Object<string,string>}
				 */
				this.presetSkill = core.getFlag('presetSkill', {});
				/** 敌人名字数组*/
				this.targetList = Object.keys(this.presetSkill);
				/** 敌人预设操作数组*/
				this.actionList = Object.values(this.presetSkill);
				/** 单页面显示的怪物数据行数 */
				this.rowCount = 5;
				/** 当前在哪一行*/
				this.row = 0;

			}

			drawContent() {
				drawSetting(ctx);
				const [x, y] = [64, 128];
				const l = this.actionList.length;
				const maxIndex = Math.min((this.page + 1) * this.rowCount, l);
				let j = 0;
				for (let i = this.page * this.rowCount; i < maxIndex; i++) {
					drawOneData(ctx, this.targetList[i], this.actionList[i], x, y + 32 * (j++));
				}
				if (l === 0) {
					core.fillText(ctx, `还没有设置预设技能数据`,
						60, 150, 'white', '14px Verdana');
					core.fillText(ctx, `点击"记录"后和敌人战斗来添加数据！`,
						60, 180, 'white', '14px Verdana');
				}
				if (l > this.rowCount) {
					core.fillText(ctx, this.page + 1, 320, 328, 'white', '18px Verdana');
				}
				this.btnList.get('pageUp').disable = this.rowCount * (this.page + 1) >= l;
				this.btnList.get('pageDown').disable = this.page === 0;
				this.btnList.forEach((button) => { button.draw(); });
			}

			// 清空画布
			clear() {
				core.deleteCanvas(this.name);
				core.clearUIEventSelector(0);
				this.endListen();
			}

			/**
			 * 开始录制下场战斗，并退出页面
			 */
			beginRecord() {
				core.setFlag('recordAction', true);
				this.end();
			}

			pageUp() {
				const l = this.actionList.length;
				if (this.rowCount * (this.page + 1) < l) {
					this.page++;
					this.drawContent();
				}
			}

			pageDown() {
				if (this.page > 0) {
					this.page--;
					this.drawContent();
				}
			}

			/**
			 * 根据name从presetSkill中移除一项数据
			 */
			deleteData() {
				const currDataIndex = this.rowCount * this.page + this.row;
				if (currDataIndex < this.targetList.length) {
					const name = this.targetList[currDataIndex];
					if (this.presetSkill.hasOwnProperty(name)) {
						delete this.presetSkill[name];
						this.targetList = Object.keys(this.presetSkill);
						/** 敌人预设操作数组*/
						this.actionList = Object.values(this.presetSkill);
						core.setFlag('presetSkill', this.presetSkill);
						this.drawContent();
					}
				}
				else {
					core.playSound('error.mp3');
					core.drawTip('当前位置没有要删除的数据');
				}
			}

			/**
			 * 对当前选中的敌人数据设置其hotkey的值
			 * @param {number} hotkey
			 */
			setHotKey(hotkey) {
				const currDataIndex = this.rowCount * this.page + this.row;
				const hotkeyData = core.getFlag('hotkeyData', {});
				if (currDataIndex >= 0 && currDataIndex < this.targetList.length) {
					const enemyId = this.targetList[currDataIndex];
					if (hotkeyData[hotkey] === enemyId) { // 重复选中即删除该快捷键
						hotkeyData[hotkey] = '';
					}
					else hotkeyData[hotkey] = enemyId;
				}
				core.setFlag('hotkeyData', hotkeyData);
				this.drawContent();
			}
		}

		class IconButton extends Button {
			constructor(name, x, y) {
				super(name, x, y, 32, 32);
				super._draw = function () {
					const [x, y] = [this.x, this.y];
					core.drawIcon(ctx, this.name, x, y);
				}
			}
		}

		this.initPreSetMenu = function () {

			let presetMenu = new PresetMenu();

			const recordBtn = new Button('record', 64, 308, 145, 24),
				deleteBtn = new Button('delete', 240, 308, 46, 24),
				pageDownBtn = new Button('pageDown', 300, 310, 15, 15), // to be tested
				pageUpBtn = new Button('pageUp', 340, 310, 15, 15),
				selectBtn = new Button('select', 54, 128, 315, 160),
				quitButton = new Button('quit', 335, 40, 40, 16),
				hotkey2Btn = new IconButton('btn2', 170, 345, 32, 32),
				hotkey3Btn = new IconButton('btn3', 200, 345, 32, 32),
				hotkey4Btn = new IconButton('btn4', 230, 345, 32, 32),
				hotkey5Btn = new IconButton('btn5', 260, 345, 32, 32),
				hotkey6Btn = new IconButton('btn6', 290, 345, 32, 32),
				hotkey7Btn = new IconButton('btn7', 320, 345, 32, 32);

			recordBtn._draw = function () {
				const [x, y, w, h] = [this.x, this.y, this.w, this.h];
				core.fillRect(ctx, x, y, w, h, '#D3D3D3');
				core.strokeRect(ctx, x, y, w, h, '#888888');;
				core.fillText(ctx, '记录下场战斗操作', x + 6, y + 16, 'Tomato', '16px Verdana');
			};
			deleteBtn._draw = function () {
				const [x, y, w, h] = [this.x, this.y, this.w, this.h];
				core.fillRect(ctx, x, y, w, h, '#D3D3D3');
				core.strokeRect(ctx, x, y, w, h, '#888888');;
				core.fillText(ctx, '删除', x + 6, y + 16, '#555555', '16px Verdana');
			};
			pageDownBtn._draw = function () {
				const [x, y, w, h] = [this.x, this.y, this.w, this.h];
				core.fillText(ctx, '<', x, y + 18, 'white', '18px Verdana');
			};
			pageUpBtn._draw = function () {
				const [x, y, w, h] = [this.x, this.y, this.w, this.h];
				core.fillText(ctx, '>', x, y + 18, 'white', '18px Verdana');
			};
			selectBtn._draw = function () {
				const [x, y, w, h] = [this.x, this.y, this.w, this.h];
				core.drawUIEventSelector(0, "winskin.png", x, y + 32 * presetMenu.row, w, 32, 181);
			}
			quitButton._draw = function () {
				core.ui.fillText(ctx, '[退出]', this.x, this.y + 15, '#FFE4B5', '14px Verdana');
			}
			quitButton.event = function () { presetMenu.end(); }

			recordBtn.event = presetMenu.beginRecord.bind(presetMenu);
			deleteBtn.event = presetMenu.deleteData.bind(presetMenu);
			pageDownBtn.event = presetMenu.pageDown.bind(presetMenu);
			pageUpBtn.event = presetMenu.pageUp.bind(presetMenu);
			hotkey2Btn.event = () => { presetMenu.setHotKey(2); }
			hotkey3Btn.event = () => { presetMenu.setHotKey(3); }
			hotkey4Btn.event = () => { presetMenu.setHotKey(4); }
			hotkey5Btn.event = () => { presetMenu.setHotKey(5); }
			hotkey6Btn.event = () => { presetMenu.setHotKey(6); }
			hotkey7Btn.event = () => { presetMenu.setHotKey(7); }
			selectBtn.event = function (x, y, px, py) {
				for (let i = 0; i <= 4; i++)
					if (py >= this.y + 32 * i && py <= this.y + 32 * (i + 1)) {
						presetMenu.row = i;
						presetMenu.drawContent();
						break;
					}
			}

			presetMenu.btnList = new Map([['record', recordBtn], ['delete', deleteBtn],
			['pageDown', pageDownBtn], ['pageUp', pageUpBtn], ['select', selectBtn],
			['quit', quitButton], ['hotkey2', hotkey2Btn], ['hotkey2', hotkey2Btn],
			['hotkey3', hotkey3Btn], ['hotkey4', hotkey4Btn], ['hotkey5', hotkey5Btn],
			['hotkey6', hotkey6Btn], ['hotkey7', hotkey7Btn]]);

			presetMenu.keyEvent = function (keyCode) {
				switch (keyCode) {
					case 27://Esc
						presetMenu.end();
						break;
					case 37://Left
						presetMenu.pageDown();
						break;
					case 39://Right
						presetMenu.pageUp();
						break;
					case 38://Up
						if (presetMenu.row > 0) {
							presetMenu.row--;
							presetMenu.drawContent();
						}
						break;
					case 40://Down
						if (presetMenu.row < presetMenu.rowCount - 1) {
							presetMenu.row++;
							presetMenu.drawContent();
						}
						break;
					case 13://Enter
					case 32://SpaceBar
					case 67://C
						presetMenu.beginRecord();
						break;
					case 46://Delete
						presetMenu.deleteData();
						break;
					case 50:
					case 51:
					case 52:
					case 53:
					case 54: // num 2~6
						presetMenu.setHotKey(keyCode - 48);
						break;
				}
			}
			return presetMenu;
		}
	},
	"成就": function () {

		const PX = core.__PIXELS__,
			PY = core.__PIXELS__;

		// 定义成就
		const list = [
			["幻之虹币", "传说白银一族至高之宝，获得者将会得到白银怪物的无限祝福...", '2865'],
			["白银狙击手", "白银怪物？在我面前不值一提！", '2867'],
			["大难不死", "哇...不怕不怕...", '2869'],
			["肉盾", "一打十根本不成问题的呢", '2871'],
			["起死回生", "我感觉死去活来！！", '2873'],
			["炼金术师", "什么？我刚刚有撞到什么吗？硬硬的", '2875'],
			["冰冷的人", "不要离我这么远嘛...虽然我的身体很冰...", '2877'],
			["命运窥视者", "我从水晶球中看到我的命运了...什么？！这水晶球不是这样使用的吗？", '2879'],
			["攻击姿态", "再硬的东西我都打得破！来试试看吧！", '2881'],
			["防守姿态", "有人能打破我的防守吗？", '2883'],
			["熔炉", "有了这东西打白银怪物就很有效率了", '2885'],
			["冰冷的手", "呼...手很冰...", '2887'],
			["三相之力", "白银怪物？杀个稀巴烂！", '2889'],
			["剑大师", "我的剑技很华丽吧", '2891'],
			["盾大师", "你有什么方法攻击我都有方法防守！", '2893'],
			["捐血站", "卖血！卖血！有人买吗？", '2895'],
			["持匙人", "这些锁匙是开哪些门的？", '2897'],
			["健谈的人", "我真的很喜欢跟别人说个不停，不好了！忘了要先做正经事...", '2899'],
			["一代宗师", "我要开班授徒的话有人会来加入吗？", '2901'],
			["宝石矿工", "干了这么久矿工，终于发现好东西了～～", '2903'],
			["国家大事", "什么事都不比国家大事重要吧！", '2905'],
			["职业冒险家", "去冒险就是要做足准备！", '2907'],
			["开采矿工", "嗄嗄...采矿其实颇辛苦的", '2909'],
			["心灵相通", "我知道你在想什么！", '2911'],
			["天上之住民", "传说以前的人都是能在空中飞翔的", '2913'],
			["透视", "嘻嘻...什么都看到了...", '2915'],
			["小叮当", "你其实是小叮当吧？！", '2917'],
			["异常状态", "初尝异常状态...感觉不错(嗯)", '2919'],
			["攻略本", "你一定是看着攻略玩的！", '2921'],
			["神之防护", "我的防御像神一般！直到我中了一箭...", '2923'],
			["出门靠朋友", "在家靠父母，出门靠朋友！", '2925'],
			["投入战斗", "热身差不多完毕了！！", '2927'],
			["见习剑士", "真想快点试试学到的剑术！", '2929'],
			["防守入门", "防守？是这样这样的吗？", '2931'],
			["圣水加护", "感谢圣水的帮助！", '2933'],
			["圣神的加护", "我简直像受到圣神般的帮助", '2935'],
			["弑神者", "遇神杀神！！谁也阻不到我！", '2937'],
			["勇者斗恶龙", "这是传说中的恶龙吗？太强大了", '2939'],
			["智能施法", "用技也要用得有技巧有智慧！你说对不？", '2941'],
			["我不打了！", "很麻烦！我不打了！！！！！！！！！！！", '2943'],
			["病入膏肓", "谁可来救救我.....啊！原来我袋中有药...", '2945'],
			["凝神储息", "......暂时先不要影响我......", '2947'],
			["大屠杀", "杀啊杀啊，所有怪物都逃不出我的手掌心！哈哈", '2949'],
			["学有所成", "只学不实践的话还是不太足够吧？", '2951'],
			["守财奴", "钱要用才是钱！钱！", '2953'],
		];
		function getdefaultList() { return Array(list.length).fill(0); }

		const ctx = 'achievement';

		function drawSetting(ctx) {
			let finish = core.getLocalStorage("finish", getdefaultList()); // 完成情况
			core.createCanvas(ctx, 0, 0, core.__PIXELS__, core.__PIXELS__, 180);
			core.clearMap(ctx);
			core.strokeRoundRect(ctx, 32, 32, core.__PIXELS__ - 64, core.__PIXELS__ - 64, 5, "#fff", 2);
			core.fillRoundRect(ctx, 32, 32, core.__PIXELS__ - 61.5, core.__PIXELS__ - 61.5, 5, "gray");
			core.ui.fillText(ctx, "成就", 185, 55, 'white', '20px Verdana');

			let row = 0, column = 0;
			for (let i = 0, l = list.length; i < l; i++) {
				core.setAlpha(ctx, finish[i] ? 1 : 0.2);
				core.drawImage(ctx, list[i][2] + '.png', 50 + 40 * column, 70 + 40 * row, 36, 36);
				if (++column > 7) {
					column = 0;
					row++;
				}
			}
			core.setAlpha(ctx, 1);
		}

		const Button = this.Button;

		/**
		 * @extends {MenuBase}
		 */
		class AchieveMenu extends this.Menu {
			constructor() {
				super();
				/** 画布名称 */
				this.name = 'achievement'
				// 当前选中了第几个徽章，-1表示未选中
				this.pickedBtn = -1;
			}

			drawContent() {
				drawSetting(this.name);
				const finish = core.getLocalStorage("finish", getdefaultList());
				if (this.pickedBtn >= 0 && this.pickedBtn < list.length) {
					core.setTextAlign(ctx, 'center');
					core.strokeRoundRect(ctx, 35, 335, core.__PIXELS__ - 70, 45, 3, "white");
					core.fillRoundRect(ctx, 35.5, 336, core.__PIXELS__ - 71, 43, 3, "#555555");
					core.ui.fillText(ctx, list[this.pickedBtn][0], 208, 324, 'white', '20px Verdana');
					const finishTime = core.getLocalStorage("finishTime", getdefaultList());
					let finishInfo = '已完成';
					const currTime = finishTime[this.pickedBtn];
					if (typeof currTime === 'object') {
						finishInfo = '已于' + currTime.year + '/' + currTime.month + '/' + currTime.day
							+ ' ' + currTime.hours + '时' + currTime.minutes + '分' + currTime.seconds + '秒' + '完成';
					}
					let str = '\\c[12]' + (finish[this.pickedBtn] ? ('\r[lime]' + finishInfo) : '\r[tomato]未完成')
						+ '\r\\c\n' + list[this.pickedBtn][1];
					core.ui.drawTextContent(ctx, str,
						{
							'left': 0, 'top': 337, 'align': 'center',
							'fontSize': ([0, 7, 17].includes(this.pickedBtn)) ? 10 : 14,
						});
					core.setTextAlign(ctx, 'start');
				}
				this.btnList.forEach((button) => { button.draw(); });
			}
		}

		this.initAchieveMenu = function () {
			const achieveMenu = new AchieveMenu();
			const chooseBtn = new Button('choose', 50, 70, 320, 240),
				quitButton = new Button('quit', 335, 40, 40, 16);

			quitButton._draw = function () {
				core.ui.fillText(ctx, '[退出]', this.x, this.y + 15, '#FFE4B5', '14px Verdana');
			}
			chooseBtn.event = function (x, y, px, py) {
				const row = Math.floor((px - 50) / 40),
					column = Math.floor((py - 70) / 40),
					index = 8 * column + row;
				if (index >= 0 && index < list.length) {
					if (achieveMenu.pickedBtn === index) {
						achieveMenu.pickedBtn = -1;
					}
					else achieveMenu.pickedBtn = index;
				}
				achieveMenu.drawContent();
			}
			quitButton.event = function () { achieveMenu.end(); }

			achieveMenu.btnList = new Map([['choose', chooseBtn], ['quit', quitButton]]);
			achieveMenu.keyEvent = function (keyCode) {
				// 处理按键事件
				if (keyCode === 27) this.end();
			}.bind(achieveMenu);
			return achieveMenu;
		}

		// 重置成就获得情况
		this.resetFinish = function () {
			if (core.isReplaying()) return;
			core.setLocalStorage("finish", getdefaultList());
			core.setLocalStorage("finishTime", getdefaultList());
			core.playSound('achievement.mp3');
			core.drawTip('成就已清空！');
		}

		// 获得成就
		this.getAchievement = function (index, test) {
			if (core.hasFlag("debug") || core.isReplaying()) return;
			let finish = core.getLocalStorage("finish", getdefaultList()); // 完成情况
			if (finish[index] > 0 && !test) return; // 成就已完成
			finish[index] = 1;
			core.setLocalStorage("finish", finish);

			let finishTime = core.getLocalStorage("finishTime", getdefaultList());
			const now = new Date();
			const currTime = {
				year: now.getFullYear(),
				month: ('0' + (now.getMonth() + 1)).slice(-2),
				day: ('0' + now.getDate()).slice(-2),
				hours: ('0' + now.getHours()).slice(-2),
				minutes: ('0' + now.getMinutes()).slice(-2),
				seconds: ('0' + now.getSeconds()).slice(-2),
			}
			finishTime[index] = currTime;
			core.setLocalStorage("finishTime", finishTime);

			const canvas = "achievementEffect";
			core.playSound('achievement.mp3');
			core.createCanvas(canvas, 0, 0, PX, PY, 200);
			core.setTextAlign(canvas, "center");
			core.drawWindowSkin("winskin.png", canvas,
				140 * 13 / 15, 80 * 13 / 15, 200 * 13 / 15, 100 * 13 / 15);
			core.drawImage(canvas, list[index][2].toString() + '.png', 126, 80); // 换成各自的图标
			core.fillText(canvas, "获得成就", 230, 120 * 13 / 15,
				"cyan", "24px " + core.status.globalAttribute.font);
			core.fillText(canvas, list[index][0], 220, 160 * 13 / 15,
				"#FFFFFF", "20px " + core.status.globalAttribute.font);
			let fade = setTimeout(function () { //干什么的？为什么不直接等待1000ms，这个core.animateFrame.asyncId是啥？
				delete core.animateFrame.asyncId[fade];
				clearInterval(fade);
				core.deleteCanvas(canvas);
			}, 1000);
			core.animateFrame.asyncId[fade] = true;
		};
	},
	"引导界面": function () {
		const ctx = 'tutorial';
		const Button = this.Button;
		/**
		 * @extends MenuBase
		 */
		class TutorialMenu extends this.Menu {
			constructor() {
				super(ctx);
				/** 当前绘制的图片列表 */
				this.pageList = [];
				/** 当前绘制的是第几页 */
				this.page = 0;
			}

			drawContent() {
				// 绘制一张图片 
				// 绘制一个按钮
				if (this.page >= 0 && this.page < this.pageList.length) {
					core.ui.drawBackground(100, 100, 100, 100);
					core.drawImage(ctx, this.pageList[this.page], 10, 10, 100, 100);
				}
				this.btnList.forEach((btn) => { btn.draw(); })
			}

			nextPage() {
				if (this.page < this.pageList.length - 1) {
					this.page++;
				}
				if (this.page === this.pageList.length - 1) {
					this.btnList.get('next').disable = true;
				}
				this.drawContent();
			}
		}

		function initTutorialMenu() {
			return new Promise((res) => {
				const tutorialMenu = new TutorialMenu();
				function quit() {
					tutorialMenu.clear();
					res();
				}

				const nextButton = new Button('next');
				nextButton.draw = () => {
					const [x, y, w, h] = [this.x, this.y, this.w, this.h];
					core.fillRect(ctx, x, y, w, h, '#D3D3D3');
					core.strokeRect(ctx, x, y, w, h, '#888888');;
					core.fillText(ctx, '记录下场战斗操作', x + 6, y + 16, 'Tomato', '16px Verdana');
				};
				nextButton.event = tutorialMenu.nextPage.bind(tutorialMenu);
				const quitButton = new Button('quit');
				quitButton.draw = () => {
					const [x, y, w, h] = [this.x, this.y, this.w, this.h];
					core.fillRect(ctx, x, y, w, h, '#D3D3D3');
					core.strokeRect(ctx, x, y, w, h, '#888888');;
					core.fillText(ctx, '记录下场战斗操作', x + 6, y + 16, 'Tomato', '16px Verdana');
				};
				quitButton.event = quit;
				tutorialMenu.btnList = new Map([['next', nextButton], ['quit', quitButton]]);
				tutorialMenu.keyEvent = function (keyCode) {
					switch (keyCode) {
						case 13:
						case 32:
						case 67: //回车，空格，C键
						case 39: // 右
							if (this.page === this.pageList.length - 1) {
								this.clear();
								res();
							}
							else this.nextPage();
						case 2:
						case 27: //Esc
							quit();
							break;

					}
				};
			});
		}

		this.drawTutorialMenu = async function () {
			if (core.isReplaying()) return;
			// if (!core.getFlag('tutorial',false)) return;
			//禁止Esc打开菜单栏
			core.setFlag('noOpenMenu', true);
			core.lockControl();

			await initTutorialMenu();
			core.unlockControl();
			core.setFlag('noOpenMenu', false);
		}
	},
	"动态火焰": function () {

		////// canvas创建 //////
		this.createCanvasWithWidth = function (name, x, y, width, height, z) {
			// 如果画布已存在则直接调用
			if (core.dymCanvas[name]) {
				core.ui.relocateCanvas(name, x, y);
				core.ui.resizeCanvas(name, width, height);
				core.dymCanvas[name].canvas.style.zIndex = z;
				return core.dymCanvas[name];
			}
			let newCanvas = document.createElement("canvas");
			newCanvas.id = name;
			newCanvas.style.display = 'block';
			newCanvas.setAttribute("_left", x);
			newCanvas.setAttribute("_top", y);
			newCanvas.width = width;
			newCanvas.height = height;
			newCanvas.style.width = width * core.domStyle.scale + 'px';
			newCanvas.style.height = height * core.domStyle.scale + 'px';
			newCanvas.style.left = x * core.domStyle.scale + 'px';
			newCanvas.style.top = y * core.domStyle.scale + 'px';
			newCanvas.style.zIndex = z;
			newCanvas.style.position = 'absolute';
			newCanvas.style.pointerEvents = 'none';
			core.dymCanvas[name] = newCanvas.getContext('2d');
			core.dom.gameDraw.appendChild(newCanvas);
			return core.dymCanvas[name];
		}

		const ctx = core.dom.statusCanvasCtx;

		/**
		 * 绘制了黑色火焰的画布的列表
		 * @type {Array<CanvasRenderingContext2D>}
		 */
		let darkFireCanvasList = [undefined, undefined, undefined];

		function darkFireInit(i) {
			let w = 0,
				h = 0;
			switch (i) {
				case 0:
					w = 15;
					h = 18;
					break;
				case 1:
					w = 13;
					h = 17;
					break;
				case 2:
					w = 14;
					h = 18;
					break;
			}
			const tempName1 = 'temp_' + i,
				tempName2 = 'temp2_' + i;
			core.plugin.createCanvasWithWidth(tempName1, 0, 0, w, h, 0);
			const tempCanvas = core.dymCanvas[tempName1];
			core.drawImage(tempName1, 'tinyFire' + (i + 1).toString() + '.png', 0, 0);
			const fire = tempCanvas.getImageData(0, 0, w, h);
			core.deleteCanvas(tempName1);
			const darkFire = darkFireFilter(fire);
			core.plugin.createCanvasWithWidth(tempName2, 0, 0, w, h, 0);
			const tempCanvas2 = core.dymCanvas[tempName2];
			tempCanvas2.putImageData(darkFire, 0, 0);
			darkFireCanvasList[i] = tempCanvas2;
		}

		/** 
		 * @param {ImageData} imageData
		 */
		function darkFireFilter(imageData) {
			const data = imageData.data,
				w = imageData.width,
				h = imageData.height;
			const darkImageData = new ImageData(w, h),
				darkData = darkImageData.data,
				l = data.length;
			for (let i = 0; i < l; i += 4) {
				darkData[i] = data[i] - 130;
			}
			for (let i = 1; i < l; i += 4) {
				darkData[i] = data[i] - 177;
			}
			for (let i = 2; i < l; i += 4) {
				darkData[i] = data[i] - 255;
			}
			for (let i = 3; i < l; i += 4) {
				darkData[i] = Math.ceil(0.5 * data[i]);
			}
			return darkImageData;
		}

		/**
		 * 
		 * @param {CanvasRenderingContext2D} ctx 
		 * @param {number} index 绘制第几张火焰的图
		 * @param {number} x 
		 * @param {number} y
		 * @param {boolean} light 是否绘制亮色火焰
		 */
		function drawFire(ctx, index, x, y, light) {
			if (!light) {
				const darkFire = darkFireCanvasList[index];
				if (!darkFire) darkFireInit(index);
				core.drawImage(ctx, darkFireCanvasList[index].canvas, x, y);
			} else
				core.drawImage(ctx, 'tinyFire' + (index + 1).toString() + '.png', x, y);
		}

		let frame = 0;
		this.drawOneFire = function () {
			const hero = core.status.hero;
			let mana = hero.mana;
			permana = hero.manamax / 6;
			let fireCount = (mana - mana % permana) / permana;

			if (!core.domStyle.isVertical) {
				ctx.clearRect(55, 178, 60, 15);
				drawFire(ctx, frame, 53, 177, fireCount >= 1);
				drawFire(ctx, frame, 65, 177, fireCount >= 2);
				drawFire(ctx, frame, 77, 177, fireCount >= 3);
				drawFire(ctx, frame, 89, 177, fireCount >= 4);
				drawFire(ctx, frame, 101, 177, fireCount >= 5);
			} else {
				ctx.clearRect(333, 15, 65, 13);
				drawFire(ctx, frame, 333, 13, fireCount >= 1);
				drawFire(ctx, frame, 345, 13, fireCount >= 2);
				drawFire(ctx, frame, 357, 13, fireCount >= 3);
				drawFire(ctx, frame, 369, 13, fireCount >= 4);
				drawFire(ctx, frame, 381, 13, fireCount >= 5);
			}
		}
		core.plugin.registerAnimationInterval('statusBarManaFire', 200, () => {
			core.plugin.drawOneFire();
			if (++frame > 2) frame = 0;
		})

		/**
		 * 
		 * @param {Hero} hero 
		 * @param {string|CanvasRenderingContext2D} ctx 
		 * @param {Array<number>} posList 
		 * @param {number} frame 
		 */
		this.drawFireInBattle = function (hero, ctx, posList, frame) {

			if (typeof ctx === 'string') ctx = core.dymCanvas[ctx];
			const mana = hero.mana,
				permana = hero.manamax / 6;

			const fireCount = (mana - mana % permana) / permana;

			drawFire(ctx, frame, posList[0], posList[1], fireCount >= 1);
			drawFire(ctx, frame, posList[2], posList[3], fireCount >= 2);
			drawFire(ctx, frame, posList[4], posList[5], fireCount >= 3);
			drawFire(ctx, frame, posList[6], posList[7], fireCount >= 4);
			drawFire(ctx, frame, posList[8], posList[9], fireCount >= 5);
		}
	},
	"跳字插件": function () {
		// 在此增加新插件

		/**
		 * @type {Set<ScrollingText>}
		 */
		let sTextList = new Set([]);
		const canvas = 'scroll';
		const gravity = 0.2;

		function drawScrollingText() {
			core.ui.clearMap(canvas);
			sTextList.forEach(
				function (currText) {
					core.setAlpha(canvas, currText.alpha);
					core.fillText(canvas, currText.text, currText.x, currText.y,
						currText.style, currText.font, currText.maxWidth)
				}
			)
		}

		function getFontSize(fontString) {
			let parts = fontString.split(' ');
			for (let i = 0; i < parts.length; i++) {
				if (parts[i].includes('px')) {
					return Number(parts[i].replace('px', ''));
				}
			}
			return NaN;
		}

		function setFontSize(fontString, newSize) {
			let parts = fontString.split(' ');

			for (let i = 0; i < parts.length; i++) {
				if (parts[i].includes('px')) {
					parts[i] = newSize + 'px';
				}
			}
			return parts.join(' ');
		}

		class ScrollingText {
			constructor(text, args) {
				this.text = text;
				this.x = args.x || 0;
				this.y = args.y || 0;
				this.x0 = args.x || 0;
				this.y0 = args.y || 0;
				this.style = args.style;
				this.font = args.font;

				this.maxWidth = args.maxWidth;
				this.type = args.type || 'line';
				this.vx = args.vx || 0;
				this.vy = args.vy || 0;
				this.t = 0;
				this.tmax = args.tmax || 1000;
				this.alpha = args.alpha || 1;
			}
		}

		this.addScrollingText = function (text, args) {
			if (core.isReplaying()) return;
			if (!core.getFlag('popDamage')) return;
			let sText = new ScrollingText(text, args);
			sTextList.add(sText);
		}

		function updateScrollingText() {
			sTextList.forEach(function (currText) {
				switch (currText.type) {
					case 'line':
						break;
					case 'projectile':
						currText.vy += gravity;
						break;
					case 'down':
						if (currText.t >= currText.tmax / 2) {
							[currText.vx, currText.vy] = [0, 0];
							if (currText.alpha > 0.05) currText.alpha -= 0.05;
						}
				}
				currText.x += currText.vx;
				currText.y += currText.vy;
				currText.t++;
				if (currText.x < -100 || currText.x > core.__PIXELS__ + 100 ||
					currText.y < -100 || currText.y > core.__PIXELS__ + 100 ||
					currText.t > currText.tmax) {
					sTextList.delete(currText);
				}
			})
		}

		// 每次切换楼层后执行
		this.clearScrollingText = function () {
			sTextList.clear();
		}

		core.plugin.registerAnimationInterval('scrollText', 10, () => {
			if (core.isReplaying()) return;
			if (!core.getFlag('popDamage')) return;
			if (!core.dymCanvas[canvas]) {
				core.ui.createCanvas(canvas, 0, 0, core.__PIXELS__, core.__PIXELS__, 150);
			}
			updateScrollingText();
			drawScrollingText();
		});

		const { Animation, power, linear} = core.plugin.animate;
		const ctx = 'test';
		function showSingleCharacter(char, delayTime, destoryTime, x, y) {
			const ani = new Animation();
			ani.register('alpha', 0.3);
			ani.register('fontSize', 10);
			ani.register('t', 0);
			ani.ticker.add(() => {
				core.setAlpha(ctx, ani.value.alpha);
				core.fillText(ctx, char, ani.x + x, ani.y + y, 'Red', 'Bold ' + ani.value.fontSize + 'px Verdana');
				core.setAlpha(ctx, 1);
				if (ani.value.t >= 100) {
					ani.ticker.destroy();
				}
			})
			console.log(destoryTime);
			ani.mode(power(2, 'center'))
				.time(delayTime)
				.relative()
				.move(10, 10)
				.mode(power(2, 'center'))
				.time(delayTime)
				.absolute()
				.apply('alpha', 1)
				.mode(power(2, 'center'))
				.time(delayTime)
				.absolute()
				.apply('fontSize', 16)
				.mode(linear())
				.time(destoryTime)
				.relative()
				.apply('t', 100);
		}

		this.test = function (damage) {
			core.createCanvas(ctx, 0, 0, 416, 416, 200);
 
			const updateScrollingText = new Animation();
			updateScrollingText.ticker.add(() => {
				// 如果还有scrollingText存在
				core.createCanvas(ctx, 0, 0, 416, 416, 200);
			})
			// 用于每帧更新用于绘制的画布，永不摧毁

			const damageStrArray = damage.toString().split('');
			let delayInterval = 20,
				posInterval = 20,
				totalDelay = 200 + damageStrArray.length * delayInterval;
			damageStrArray.forEach((char) => {
				showSingleCharacter(char, totalDelay, 400 - totalDelay,
					200 + posInterval, 200);
				totalDelay -= delayInterval;
				posInterval += 10;
			})
		}
	},
	"回合制战斗": function () {

		// #region 回合制战斗的具体过程 **************************************************
		const abbreviateList = {
			'b': 'I315', 's': 'I319', 'd': 'I318', 'h': 'I317', 'k': 'I316',
			'M': 'I339', 'C': 'I321', 'R': 'I375', 'F': 'I322', 'E': 'I320',
		};
		class ActorBase {
			_mana;
			_fatigue;
			/** 将要被冻结的回合数*/
			freeze = 0;
			/** 状态，分为'normal''poison','weak'
			 * @type {('normal'|'poison'|'weak')} 
			 */
			status = 'normal';
			get mana() {
				return this._mana;
			};
			set mana(value) {
				if (Number.isNaN(value)) debugger;
				if (value < 0) this._mana = 0;
				else if (value > this.manamax) this._mana = this.manamax;
				else this._mana = value;
			};
			get fatigue() {
				return this._fatigue;
			}
			set fatigue(value) {
				this._fatigue = value;
				if (this instanceof Hero && value > 80) core.plugin.getAchievement(39);
			}
			constructor(hp, atk, def, manamax, mana, weakPoint) {
				/** 生命值*/
				this.hp = hp;
				/** 攻击*/
				this.atk = atk;
				/** 防御*/
				this.def = def;
				/** 气息上限*/
				this.manamax = manamax;
				/** 气息值*/
				this.mana = mana;
				/** 疲劳值。每回合，疲劳计数会增加该值*/
				this.fatigue = 0;
				/** 疲劳计数，超过100时将会MISS并减少100该计数*/
				this.totalFatigue = 0;
				/** 对于勇士，为其本次战斗中受到衰弱累计减少的属性。对于敌人，为其造成一次衰弱效果降低属性的值。*/
				this.weakPoint = weakPoint;
			};

			checkFrozen() {
				if (this.freeze > 0) {
					this.freeze--;
					return true;
				}
				return false;
			}

			checkMiss() {
				this.totalFatigue += this.fatigue;
				if (this.totalFatigue > 100) {
					this.totalFatigue -= 100;
					return true;
				}
				return false;
			}

			/**
			 * 执行debuff效果
			 * @param {string} action
			 */
			execDebuff(action) {
				switch (action) {
					case 'destroyArmor': //81-破甲刃
						this.def -= 12;
						break;
					case 'suppress': //89-压制
						this.atk -= 20;
						this.def -= 5;
						break;
					case 'poison':
						this.status = 'poison';
						break;
					case 'weak':
						this.status = 'weak';
						break;
				}
			}

		}

		class HeroAtkStatus {
			/**本次攻击造成的伤害 */
			damage = 0;
			/**本次攻击的动画 */
			animate = 'g3';
			/**勇士是否被冻结 */
			frozen = false;
			/**勇士是否miss */
			miss = false;
			/**本次攻击发动的技能 */
			skill = '';
			/** 本次生命回复 */
			heal = 0;
		}

		/**
		 * @extends {ActorBase}
		 */
		class Hero extends ActorBase {
			/** 公主的体力值 */
			hpmax = core.status.hero.hpmax;
			/** 公主的魔防 */
			mdef = core.status.hero.mdef;
			/** 攻击临界值 */
			atkm = core.getFlag('atkm', 10);
			/** 防御临界值 */
			defm = core.getFlag('defm', 10);
			/** 等级 */
			lv = core.status.hero.lv;
			/** 一次深呼吸减少的疲劳值*/
			deepBreath = core.getFlag('deepBreath', 5);

			/** 即将发动的剑技
			 * @type {string}
			 */
			swordSkill = '';
			/** 即将发动的盾技
			 * @type {string}
			*/
			shieldSkill = '';
			/** 当前装备的剑技*/
			swordEquiped = core.items.getEquip(0);
			/** 当前装备的盾技*/
			shieldEquiped = core.items.getEquip(1);

			/** 负面事件计数 */
			misfortune = 0;

			/** 本次战斗凡骨剑转化的攻防计数 */
			bone = 0;
			/** 精灵罩剩余使用次数*/
			fairy = 0;
			/** 精灵罩防御增加量*/
			fairyBuff = 0;
			/** 初始血量，影响精灵罩加防数值*/
			orihp = core.status.hero.hp;
			/** 本场战斗是否达成智能施法成就的完成条件 */
			smartCast = false;

			constructor() {
				super(core.status.hero.hp, core.status.hero.atk, core.status.hero.def,
					core.status.hero.manamax, core.status.hero.mana, core.getFlag('weakValue', 0));

				/** 一管气息的容量 */
				this.permana = this.manamax / 6;
				/** 本次攻击的状态 
				 * @type {HeroAtkStatus}
				 */
				this.atkStatus;
				if (core.hasFlag('poison')) this.status = 'poison';
				if (core.hasFlag('weak')) this.status = 'weak';
			}

			/**
			 * 勇士行动
			 * @param {Enemy} enemy 
			 */
			act(enemy) {
				this.atkStatus = new HeroAtkStatus();
				/** 本次攻击的状态 */
				let atkStatus = this.atkStatus;

				// 检查勇士是否被冰冻
				if (this.checkFrozen()) {
					atkStatus.frozen = true;
					if (hasSpecial(enemy.special, 92)) { //盾大师
						if (enemy.phase++ > 2) enemy.phase = 0;
					}
					return;
				}

				// 检查勇士是否miss
				if (this.checkMiss()) atkStatus.miss = true;
				else {
					atkStatus.damage = this.checkSword(enemy);
					if (hasSpecial(enemy.special, 92)) { // 盾大师
						switch (enemy.phase) {
							case 0:
								atkStatus.damage = Math.round(atkStatus.damage / 2);
								break;
							case 1:
								this.freeze++;
								break;
							case 2:
								this.hp -= Math.round(atkStatus.damage / 4);
								break;
						}
						if (enemy.phase++ > 2) enemy.phase = 0;
					}
					if (hasSpecial(enemy.special, 86)) this.fatigue += 10; // 死气
					this.hp += atkStatus.heal; //深红
					this.addMana(enemy);
					enemy.hp -= atkStatus.damage;
				}

				this.swordSkill = '';
				this.animateInfo = atkStatus;
			}


			/**
			 * 根据勇士发动的剑技返回伤害值
			 * @param {Enemy} enemy 
			 * @returns {number}
			 */
			checkSword(enemy) {
				let hdamage = 0;
				const atkStatus = this.atkStatus;
				if (this.swordSkill.length > 0) {
					atkStatus.skill = this.swordSkill;
					this.mana -= getSkill(this.swordSkill, 'cost') * this.permana;
					this.fatigue += getSkill(this.swordSkill, 'fatigue');
				}
				switch (this.swordSkill) {
					case 'c':
						hdamage = 2 * Math.max(this.atk - enemy.def, 1);
						atkStatus.animate = "g3-cri";
						break;
					case 'b': // 凡骨
						hdamage = Math.round(1.5 * Math.max(this.atk - enemy.def, 1));
						if (isMagician(enemy.special)) this.smartCast = true;
						if (Math.round(1.5 * (this.atk - enemy.def)) >= this.lv) {
							// 伤害太低时，发动凡骨只有伤害1.5倍的效果，属性不增加
							this.atk += Math.round(1.5 * this.lv);
							this.def -= this.lv;
							this.bone += this.lv;
						}
						atkStatus.animate = "gsw1";
						break;
					case 's': //流石
						hdamage = Math.round(1.3 * Math.max(this.atk - enemy.def, 1));
						if (!hasSpecial(enemy.special, 64)) //魔神些多的死寂光环下角色不加气
							this.mana += Math.round(enemy.mana / 2);
						enemy.mana = 0;
						atkStatus.animate = "gsw2";
						break;
					case 'd': //深红
						hdamage = Math.round(0.8 * Math.max(this.atk - enemy.def, 1));
						if (hdamage >= enemy.hp) hdamage = enemy.hp - 1;
						atkStatus.heal = Math.round(0.3 * hdamage);
						atkStatus.animate = "gsw3";
						break;
					case 'h': //天灵
						hdamage = Math.round(1.8 * Math.max(this.atk - enemy.def, 1));
						enemy.fatigue += 15;
						atkStatus.animate = "gsw4";
						break;
					case 'k': // 皇者
						hdamage = Math.round(5 * Math.max(this.atk - enemy.def, 1));
						if (hdamage >= enemy.hp) {
							hdamage = enemy.hp - 1;
							this.smartCast = true;
						}
						this.atk = enemy.def;
						atkStatus.animate = "gsw5";
						break;
					default:
						hdamage = Math.max(this.atk - enemy.def, 1);
						break;
				}
				if (enemy.def - this.atk > this.atkm) {
					hdamage = 0;
					atkStatus.animate = 'gcanthit';
				}
				return hdamage;
			}

			/** 双方回复气息 
			 * @param {Enemy} enemy 
			 */
			addMana(enemy) {
				if (this.swordSkill.length > 0 || hasSpecial(enemy.special, 64) ||
					enemy.def >= this.atk) {
					//使用剑技或C的回合中勇士将没有攻增气，魔神些多的死寂光环角色不加气，角色不破怪物防不加气
				} else this.mana += Math.round((10 * enemy.def) / (this.atk)); // 角色攻增气

				if ((this.swordEquiped === 'I319' && this.swordSkill === 'c') || this.swordSkill === 's') {
					// 装备流石用C,怪物不加防增气
				} else enemy.mana += Math.round(this.atkStatus.damage / 3); // 怪物防增气			
			}

			/** 添加精灵罩buff效果 */
			addFairy() {
				this.fairy = 3;
				this.fairyBuff = (this.orihp + this.def) % this.lv;
				this.def += this.fairyBuff;
			}

			/** 移除精灵罩buff效果 */
			removeFairy() {
				this.def -= Math.round(this.def / 50) + (this.orihp % this.lv);
				this.fairyBuff = 0;
			}
		};

		class EnemyAtkStatus {
			constructor() {
				/** 敌人本次攻击对勇士造成的伤害 */
				this.damage = 0;
				/** 敌人本次攻击对公主造成的伤害 */
				this.princessDamage = 0;
				/** 最终BOSS造成的弹跳伤害 */
				this.bounceDamage = [0, 0, 0];
				/** 勇士反射盾反弹的伤害*/
				this.reflectDamage = 0;
				/** 敌人本次攻击的范围，有'hero''princess''all''bounce'四种 */
				this.aim = 'hero';
				/** 敌人生命回复 */
				this.heal = 0;
				/** 敌人是否被冰冻 */
				this.frozen = false;
				/** 敌人本次攻击是否miss */
				this.miss = false;
				/** 敌人本次攻击是否暴击 */
				this.crit = false;
				/** 敌人是否是魔眼 */
				this.evilEye = false;
				/** 敌人本次攻击的动画*/
				this.animate = '';
				/** 勇士盾牌的动画*/
				this.heroAnimate = '';
				/** 敌人本次是否释放异常状态*/
				this.debuff = '';
			}
		}

		/**
		 * @extends {ActorBase}
		 */
		class Enemy extends ActorBase {
			/** 敌人本场战斗累计造成的伤害 */
			totalDamage = 0;
			/** 剑大师，盾大师当前的行动阶段 */
			phase = 0;
			/** 敌人本场战斗是否掉落魔法冰块 */
			magicIce = false;
			/**
			 * Enemy构造函数
			 * @param {object} info enemyInfo
			 * @param {object} data core.material.enemys中的敌人数据
			 */
			constructor(info, data) {
				super(info.hp, info.atk, info.def,
					data.value, (data.id === 'E437') ? 10 : 0, data.damage || 0);
				/** getEnemyInfo获得的敌人info */
				this.info = info;
				/** core.material.enemys中的敌人数据 */
				this.data = data;
				/** 敌人的英文id */
				this.id = data.id;

				/** 敌人的特殊属性数组
				 * @type {Array}
				 */
				this.special = ((special) => {
					if (typeof special === 'number') return [special];
					else if (special instanceof Array) return special;
					else return [];
				})(info.special);
				/** 敌人的连击数 */
				this.combo = ((special) => {
					if (hasSpecial(special, [4, 53])) return 2;
					else if (hasSpecial(special, [5, 83])) return 3;
					else if (hasSpecial(special, 6)) return data.n || 1;
					else if (hasSpecial(special, 87)) return 6;
					else return 1;
				})(this.special);
				/** 敌人已经连续行动了几次 */
				this.actIndex = 0;

				/** 敌人释放中毒的几率 */
				this.poisonPoss = data.atkValue || 0;
				/** 敌人释放衰弱的几率 */
				this.weakPoss = data.defValue || 0;
				/** 敌人本次攻击的状态
				 * @type {EnemyAtkStatus}
				 */
				this.atkStatus;
			}

			/** 敌人行动
			 * @param {Hero} hero 
			 */
			act(hero) {
				/** 敌人的特殊属性数组 */
				const especial = this.special;

				this.atkStatus = new EnemyAtkStatus();
				const atkStatus = this.atkStatus;

				if (this.actIndex++ > this.combo) this.actIndex = 1;

				if (hasSpecial(especial, 91)) { //剑大师切换行动列表
					this.phase++;
					if (this.phase > 2) this.phase = 0;
				}
				if (this.checkFrozen()) { //敌人是否被冰冻
					atkStatus.frozen = true;
					return;
				}
				if (hasSpecial(especial, 80)) { // 魔眼
					atkStatus.evilEye = true;
					if (hero.def - hero.atk > hero.atkm) atkStatus.damage = 0;
					else atkStatus.damage = Math.max(hero.atk - hero.def, 1);
					if (hero.checkMiss()) { // 魔眼miss取决于勇士的疲劳
						atkStatus.miss = true;
					}
					atkStatus.animate = 'g3';
					return;
				}

				this.setDamage(hero); // 获取敌人的伤害
				this.setAtkAim(hero); // 获取敌人的攻击范围和对公主造成的伤害
				this.checkCrit(hero); // 获取敌人是否暴击

				if (this.checkMiss()) atkStatus.miss = true;
				else {
					const { oriDamage, reflect } = this.checkHeroShield(hero, atkStatus);
					this.execAtkEffect(hero, reflect); // 获取敌人攻击的附加效果（毒衰等）

					this.addMana(hero); //本回合敌人未暴击，则它会回复气息

					hero.hp -= atkStatus.damage;
					hero.hpmax -= atkStatus.princessDamage;
					this.totalDamage += atkStatus.damage;
					if (hasSpecial(especial, 93)) { // 古顿的弹跳攻击效果
						hero.hp -= atkStatus.bounceDamage[2];
						hero.hpmax -= atkStatus.bounceDamage[1] + atkStatus.bounceDamage[3];
						this.totalDamage += atkStatus.bounceDamage[2];
					}
					//// 结算反射盾效果
					if (reflect) { //反射盾
						let reflectDamage = Math.round(oriDamage / 2.6 + hero.atk / 10);
						if (this.status === 'poison') reflectDamage += 25; // 反弹中毒会多弹25血
						atkStatus.reflectDamage = reflectDamage;
						this.hp -= reflectDamage;
						if (hasSpecial(especial, 3) && reflectDamage > 0) hero.smartCast = true;
					}
				}

				if (this.hp <= 0) this.hp = 0;
				this.hp += atkStatus.heal; //吸血效果
				atkStatus.animate = enemyAni(this.id, atkStatus.crit);
			}

			/** 判断敌人的基础伤害atkStatus.damage 
			 * @param {Hero} hero 
			 */
			setDamage(hero) {
				const atkStatus = this.atkStatus;
				if (hasSpecial(this.special, [2, 60, 61, 62, 63, 64, 65, 66])) atkStatus.damage = this.atk; // 魔攻
				else {
					if (hero.def - this.atk >= hero.defm) {
						atkStatus.damage = 0; // 防临界
						atkStatus.animate = 'gcanthit';
					}
					else atkStatus.damage = Math.max(this.atk - hero.def, 1);
				}
			}

			/**
			 * 判断敌人攻击范围atkStatus.aim和对公主的伤害atkStatus.princessDamage
			 * @param {Hero} hero			 
			 */
			setAtkAim(hero) {
				const atkStatus = this.atkStatus;
				const especial = this.special;
				if (hasSpecial(especial, [61, 62, 63, 64, 65])) {
					atkStatus.aim = 'all';
					atkStatus.princessDamage = Math.max(this.atk - hero.mdef, 0);
				} else if (hasSpecial(especial, 55)) {
					atkStatus.aim = 'princess';
					atkStatus.princessDamage = this.atk;
				} else { atkStatus.aim = 'hero'; }
				if (hasSpecial(especial, 93)) // 魔界之王古顿
				{
					const damage = atkStatus.damage;
					atkStatus.bounceDamage = [damage, Math.round(0.8 * damage),
						Math.round(0.64 * damage), Math.round(0.512 * damage)
					];
					atkStatus.aim = 'bounce';
				}
			}

			/**
			 * 判断敌人是否暴击atkStatus.crit
			 * @param {Hero} hero 
			 */
			checkCrit(hero) {
				const atkStatus = this.atkStatus;
				const especial = this.special;
				// 判断敌人是否暴击atkStatus.crit
				if (this.mana >= this.manamax) {
					//满气息时怪物释放必杀，
					if (core.hasSpecial(especial, 91)) {
						// 剑大师不会释放必杀
						return;
					}
					if (hero.def - this.atk < hero.defm && !hasSpecial(this.special, [2, 55, 60, 61, 62, 63, 64, 65, 66])) {
						// 不能破防主角则永远不会释放必杀，魔攻和弓手除外
						return;
					}
					let critRatio = 2;
					if (hasSpecial(especial, 51)) critRatio = 2.5;
					if (hasSpecial(especial, 59)) critRatio = 4;
					if (hasSpecial(especial, 67)) critRatio = 3;
					atkStatus.damage = Math.round(critRatio * atkStatus.damage);
					atkStatus.princessDamage = Math.round(critRatio * atkStatus.princessDamage);
					this.fatigue += (atkStatus.aim === 'all') ? 2 : 1;
					atkStatus.crit = true; //暴击
					this.mana = 0;
				}
			}

			/**
			 * 勇士的盾技效果
			 * @param {Hero} hero 
			 * @returns {{oriDamage:number,reflect:boolean}}
			 */
			checkHeroShield(hero) {
				const atkStatus = this.atkStatus;
				const reflectInfo = {
					oriDamage: 0,
					reflect: false,
				}
				let damage = this.atkStatus.damage;
				if (hero.shieldSkill.length > 0) {
					hero.mana -= getSkill(hero.shieldSkill, 'cost') * hero.permana;
					hero.fatigue += getSkill(hero.shieldSkill, 'fatigue');
				} else return reflectInfo;
				switch (hero.shieldSkill) { //盾技
					case 'M': //镜膜盾
						damage = Math.ceil(damage / 2.5); //盾技伤害计算方式是ceil
						atkStatus.heroAnimate = "gsh1";
						break;
					case 'C': //结晶盾
						damage = Math.ceil(damage / 1.5);
						if (this.id === 'bluePriest') this.magicIce = true; //制取魔法冰块
						this.freeze += 2 * this.combo - this.actIndex; // 敌人被跳过的回合数
						atkStatus.heroAnimate = "gsh2";
						break;
					case 'R': //反射
						reflectInfo.oriDamage = damage;
						damage = Math.ceil(damage / 1.3);
						reflectInfo.reflect = true;
						atkStatus.heroAnimate = "gsh3";
						break;
					case 'F': //精灵罩
						if (hero.fairy-- <= 0) hero.removeFairy();
						if (isMagician()) hero.smartCast = true;
						atkStatus.heroAnimate = "gsh4";
						break;
					case 'E': //贤者结界
						hero.hpmax += Math.round(1.5 * damage);
						atkStatus.heroAnimate = "gsh5";
						break;
					default:
						break;
				}
				this.atkStatus.damage = damage;
				hero.shieldSkill = '';
				return reflectInfo;
			}

			/**
			 * 执行敌人的各种攻击特效
			 * @param {Hero} hero 
			 * @param {boolean} reflect 反射盾是否生效
			 */
			execAtkEffect(hero, reflect) {
				const atkStatus = this.atkStatus;
				const especial = this.special;
				if (hasSpecial(especial, 91)) { // 剑大师
					switch (this.phase) {
						case 1:
							hero.fatigue += 8;
							break;
						case 2:
							hero.mana -= hero.permana;
							break;
						case 0:
							atkStatus.heal = Math.round(atkStatus.damage / 5);
							break;
					}
				}

				if (hasSpecial(especial, [52, 53])) hero.fatigue++;
				if (hasSpecial(especial, 54)) hero.fatigue += 3;
				if (hasSpecial(especial, 56)) hero.fatigue += 4;
				if (hasSpecial(especial, 62)) {
					this.fatigue -= 1;
					if (this.fatigue < 0) this.fatigue = 0;
				}
				if (hasSpecial(especial, 58) && atkStatus.crit) hero.mana -= hero.permana;
				if (hasSpecial(especial, 65)) { //血秘术
					atkStatus.heal = Math.round(0.5 * (atkStatus.damage + atkStatus.princessDamage));
				}
				if (hasSpecial(especial, [57, 66, 67])) { //血魔法
					atkStatus.heal = Math.round(0.5 * atkStatus.damage);
				}
				if (hasSpecial(especial, 88)) {
					hero.mana -= 40;
					this.mana += 40;
				}
				if (hasSpecial(especial, 84)) atkStatus.damage += 100;

				if (hasSpecial(especial, 81)) { // 81-破甲刃:攻击会减低主角防御力，40%几率降低12点
					this.checkDebuff(hero, 'destroyArmor', reflect, 40);
				} else if (hasSpecial(especial, 89)) { // 89-压制:攻击60%几率降低20攻击，5防御
					this.checkDebuff(hero, 'suppress', reflect, 60);
				} else if (hasSpecial(especial, [12, 61, 82])) { // 12-中毒
					this.checkDebuff(hero, 'poison', reflect, this.poisonPoss);
				} else if (hasSpecial(especial, [13, 87])) { // 13-衰弱
					this.checkDebuff(hero, 'weak', reflect, this.weakPoss);
				}
			}

			/**
			 * 触发敌人施加的debuff效果
			 * @param {Hero} hero 
			 * @param {string} action debuff效果的名称
			 * @param {boolean} reflect 反射盾是否生效
			 * @param {number} possibility 该debuff的触发几率
			 */
			checkDebuff(hero, action, reflect, possibility) {
				hero.misfortune += possibility;
				if (hero.misfortune >= 100) {
					hero.misfortune -= 100;
					if (reflect) {
						if (action === 'weak') {
							this.atk -= this.weakPoint;
							this.def -= this.weakPoint;
						}
						super.execDebuff(action);
					} else {
						if (action === 'weak') {
							hero.weakPoint += this.weakPoint;
							this.atkStatus.debuff = 'weak';
						}
						else if (action === 'poison') {
							this.atkStatus.debuff = 'poison';
						}
						hero.execDebuff(action);
					}
				}
			}

			/** 
			 * 双方回复气息
			 * @param {Hero} hero 
			 */
			addMana(hero) {
				const atkStatus = this.atkStatus;
				if (hasSpecial(this.special, [60, 64])) {
					//暗魔法无防增气，魔神些多的死寂光环角色不加气
				} else hero.mana += Math.round(0.1 * atkStatus.damage); // 角色防增气
				if (!atkStatus.crit && !hasSpecial(this.special, 80)) { //怪物会心一击时无攻增气，魔眼不加气
					switch (atkStatus.aim) {
						case 'princess':
							this.mana += Math.round((10 * hero.mdef) / (this.atk));
							break;
						case 'all':
							this.mana += Math.round((10 * (hero.mdef + hero.def)) / (this.atk));
							break;
						case 'hero':
						case 'bounce':
							this.mana += Math.round((10 * hero.def) / (this.atk));
							break;
					}
				}
			}
		}

		class Battle {
			/** 本场战斗的状态 'pending'进行中 'win'勇士胜利 'lose'勇士失败 'quit'临阵脱逃
			 * @type {('pending'|'win'|'lose'|'quit')}
			 */
			status = 'pending';
			/** 战斗的默认行进速度 quick - 快 normal -中 slow - 慢
			 *  @type {('quick'|'normal'|'slow')}
			 */
			speed = (() => {
				switch (core.getFlag('battleSpeed', 1)) {
					case 0: return 'quick';
					case 1: return 'normal';
					case 2: return 'slow';
				}
			})();
			/** 执行下一回合前等待的时间*/
			waitTime = 500;
			/** 玩家在各回合的出招信息(BattleSkill)，将被写入录像 
			 * @type {string}
			 */
			route = 'bs';

			/** 按钮列表 
			 * @type {Array<ButtonBase>}
			 */
			btnList = generateBtnList(this);
			/**
			 * Battle构造函数
			 * @param {string} enemyId 敌人ID
			 * @param {number} x 敌人所在x坐标
			 * @param {number} y 敌人所在y坐标
			 */
			constructor(enemyId, x, y) {

				const enemyInfo = core.enemys.getEnemyInfo(enemyId, null, x, y, core.status.floorId),
					enemyData = core.material.enemys[enemyId];

				/** 本场战斗的勇士 */
				this.hero = new Hero();
				/** 本场战斗的敌人 */
				this.enemy = new Enemy(enemyInfo, enemyData);

				/** 当前总计进行了多少回合 */
				this.turn = 0;
				/** 当前每一轮次的行动次序 */
				this.order = ((combo) => {
					let order = ['hero'];
					for (let i = 0; i < combo; i++) order.push('enemy');
					return order;
				})(this.enemy.combo);
				/** 当前轮次进行到了哪一步 */
				this.actIndex = 0;
				/** 当前的行动者 */
				this.actor = this.order[this.actIndex];

				/** 加载预设技能列表 */
				this.preSetSkillObj = getPresetSkill(enemyId);
			}

			/** 本回合的行动者行动*/
			nextTurn() {
				switch (this.actor) {
					case 'hero':
						this.hero.act(this.enemy);
						break;
					case 'enemy':
						this.enemy.act(this.hero);
						break;
				}
			}

			/** 更新下回合的行动者，更新等待时间*/
			updateActor() {
				/** 是否是敌人在连击中的回合 */
				const isEnemyCombo = this.actIndex > 0 && this.actIndex < this.order.length - 1;
				switch (this.speed) {
					case 'quick':
						this.waitTime = isEnemyCombo ? 5 : 50;
						break;
					case 'normal':
						this.waitTime = isEnemyCombo ? 200 : 400;
						break;
					case 'slow':
						this.waitTime = isEnemyCombo ? 400 : 800;
						break;
				}
				if (++this.actIndex >= this.order.length) this.actIndex = 0;
				this.actor = this.order[this.actIndex];
				this.turn++;
			}

			/** 检查战斗是否满足结束条件*/
			checkEnd() {
				if (this.hero.hp <= 0 || this.hero.hpmax <= 0) {
					if (this.hero.hp < 0) this.hero.hp = 0;
					if (this.hero.hpmax < 0) this.hero.hpmax = 0;
					this.status = 'lose';
				}
				else if (this.enemy.hp <= 0) {
					this.enemy.hp = 0;
					this.status = 'win';
				}
			}

			/**
			 * 执行用户输入的行为并写入录像
			 * @param {string} action 用户输入的行为
			 */
			execUserAction(action) {
				const outcome = this.canExecAction(action);
				if (!outcome.success) {
					if (!core.isReplaying()) {
						core.playSound('error.mp3');
						core.drawTip(outcome.reason);
					}
					return;
				}
				if (action === 'n') return; //n代表什么都不做
				if (action === 'q') {
					if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'q';
					this.status = 'quit';
				}
				else if (action === 'v') {
					this.hero.mana -= this.hero.permana;
					this.hero.fatigue -= this.hero.deepBreath;
					if (this.hero.fatigue < 0) this.hero.fatigue = 0;
					if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'v';
				}
				else if (action === 'c') this.hero.swordSkill = 'c';

				else if (['b', 's', 'd', 'h', 'k'].includes(action)) {
					const aimSword = abbreviateList[action];
					this.hero.swordEquiped = aimSword;
					this.hero.swordSkill = action;
				} else if (['M', 'C', 'R', 'F', 'E'].includes(action)) {
					const aimShield = abbreviateList[action];
					this.hero.shieldEquiped = aimShield;
					this.hero.shieldSkill = action;
					if (action === 'F') this.hero.addFairy();
				}
			}

			/**
			 * 将延时执行的行为的最终结果写入录像
			 */
			recordDelayedAction() {
				if (core.isReplaying()) return;
				switch (this.actor) {
					case 'hero':
						const sword = this.hero.swordSkill;
						if (sword.length > 0) this.route += ':' + this.turn.toString() + sword;
						break;
					case 'enemy':
						const shield = this.hero.shieldSkill;
						if (shield.length > 0) this.route += ':' + this.turn.toString() + shield;
						break;
				}
			}

			/** 检查用户输入的行为能否执行
			 * @param {string} action
			 * @returns {{success: boolean, reason: string}} 执行结果
			 */
			canExecAction(action) {
				if (this.status !== 'pending') return { success: false, reason: '战斗已结束' };
				if (['b', 's', 'd', 'h', 'k'].includes(action)) {
					const aimSword = abbreviateList[action];
					if (!core.hasEquip(aimSword) && (!core.hasItem('I325') || !core.hasItem(aimSword)))
						return { success: false, reason: '当前未持有该剑技' };
				}
				if (['M', 'C', 'R', 'F', 'E'].includes(action)) {
					const aimShield = abbreviateList[action];
					if (!core.hasEquip(aimShield) && (!core.hasItem('I327') || !core.hasItem(aimShield)))
						return { success: false, reason: '当前未持有该盾技' };
				}
				if (action === 'q' || action === 'n')
					return { success: true, reason: '' };
				else if (action === 'v') {
					if (this.hero.mana <= this.hero.permana) return { success: false, reason: '气息不足' };
					if (this.hero.fatigue <= 0) return { success: false, reason: '当前未处于疲劳状态' };
					return { success: true, reason: '' };
				} else if (['b', 's', 'd', 'h', 'k', 'c', 'M', 'C', 'R', 'F', 'E'].includes(action)) { //剑技
					if (action !== 'c' && this.hero.fatigue >= core.getFlag('tiredMax', 20))
						return { success: false, reason: '当前疲劳过高' }; // 会心的释放不受疲劳限制
					if (this.hero.lv < getSkill(action, 'lv'))
						return { success: false, reason: '等级不足' };
					if (this.hero.mana < getSkill(action, 'cost') * this.hero.permana)
						return { success: false, reason: '气息不足' };
					if (['b', 's', 'd', 'h', 'k', 'c'].includes(action) && this.hero.atk <= this.enemy.def)
						return { success: false, reason: '发动本技能需要攻击需要高于敌人防御' };
					// 攻小于等于敌人防御，剑技和会心不能使用
					if (action === 'F' && this.hero.fairy > 0)
						return { success: false, reason: '精灵罩效果持续期间，不能再发动精灵罩' };
					return { success: true, reason: '' };
				}
				return { success: false, reason: '未定义的行为' };
			}

			/**
			 * 读取actionList，检查本回合是否有值（即需要发动技能）
			 */
			execPreSetSkill() {
				const combo = this.enemy.combo;
				let currTurn = this.turn;
				if (combo > 1) {
					switch ((currTurn) % (combo + 1)) {
						case 0:
							currTurn = 2 * currTurn / (combo + 1);
							break;
						case 1:
							currTurn = (currTurn - 1) / (2 * (combo + 1)) + 1;
							break;
						default:
							break;
					}
				}
				if (this.preSetSkillObj.hasOwnProperty(currTurn)) {
					this.preSetSkillObj[currTurn].forEach((ele) => {
						this.execUserAction(ele);
					})
				}
			}
		}

		// #endregion

		// #region 回合制战斗的执行 **************************************************

		const equipList = {
			'I315': 'b', 'I319': 's', 'I318': 'd', 'I317': 'h', 'I316': 'k',
			'I339': 'M', 'I321': 'C', 'I375': 'R', 'I322': 'F', 'I320': 'E',
		};

		async function battleByTurn(enemyId, x, y) {
			let battle = new Battle(enemyId, x, y);

			core.lockControl();

			beginListen(battle);
			drawBattleUI(battle);
			drawSkillButton(battle);
			drawSpeedButton(battle);
			let count = 0;
			core.plugin.registerAnimationInterval('battleIcon', 200, () => {
				drawBattleIcon(battle, count++);
			});

			while (true) {
				if (battle.status !== 'pending') break;
				battle.execPreSetSkill(); // 每回合的this.turn更新后，读取该回合的预设技能列表，执行其中的内容
				await Promise.race([
					new Promise((res) => { setTimeout(res, battle.waitTime); }),
					new Promise((res) => {
						core.unregisterAction('keyDown', 'quit');
						core.unregisterAction('ondown', 'quit');
						core.registerAction('keyDown', 'quit', (keyCode) => {
							if (keyCode === 8 || keyCode === 81) {	//backSpace & Q
								battle.execUserAction('q');
								res();
							}
						}, 100);
						core.registerAction('ondown', 'quit', (x, y, px, py) => {
							if (35 <= px && px <= 105 && 260 <= py && py <= 270) {
								battle.execUserAction('q');
								res();
							} //撤退键的坐标
						}, 100);
					})
				]);
				battle.recordDelayedAction();
				battle.nextTurn();
				battle.checkEnd();
				// 此处更新动画
				drawBattleUI(battle);
				if (battle.speed !== 'quick') drawBattleAnimate(battle);
				drawSkillButton(battle); // 每回合过后技能已释放，需要更新按钮的状态
				battle.updateActor();
				if (battle.status === 'quit') break;
			}
			if (battle.speed !== 'quick') {
				// 获胜时，绘制底边栏
				let h = 0;
				if (battle.status === 'win') core.plugin.registerAnimationInterval('showBottomBar', 10, () => {
					if (h < 40) h += 4;
					drawBattleBottomBar(battle, h);
				});
				//等待500ms后擦除画布
				await new Promise((res) => { setTimeout(res, 500) });
			}

			clearCanvasAndEvent();
			updateHeroStatus(battle);
			afterBattleEvent(battle, x, y);
			core.unlockControl();
		}

		/**
		 * 录像模式下执行回合制战斗
		 * @param {string} enemyId 
		 * @param {number} x 
		 * @param {number} y 
		 */
		function battleByTurn_replaying(enemyId, x, y) {
			let battle = new Battle(enemyId, x, y);
			const nextReplay = core.status.replay.toReplay.length > 0 ? core.status.replay.toReplay[0] : '';
			let actionList = core.plugin.getActionObj(nextReplay);
			while (battle.status === 'pending') {
				const currTurn = battle.turn;
				if (actionList.hasOwnProperty(currTurn)) {
					for (let i = 0, l = actionList[currTurn].length; i < l; i++) {
						battle.execUserAction(actionList[currTurn][i]);
					}
				}
				if (battle.status === 'quit') break;
				battle.nextTurn();
				battle.checkEnd();
				battle.updateActor();
			}
			updateHeroStatus(battle);
			afterBattleEvent(battle, x, y);
		}

		/**
		 * 同步勇士的生命值，毒衰等状态
		 * @param {Battle} battle 
		 */
		function updateHeroStatus(battle) {
			const hero = battle.hero;
			if (!core.isReplaying()) {
				const route = battle.route;
				if (route.length > 3) core.status.route.push(route);
			}
			core.status.hero.statistics.battleDamage += battle.enemy.totalDamage;

			// 获取毒衰状态
			core.setFlag('weakValue', hero.weakPoint); // 先获得衰弱点数再执行衰弱效果
			switch (hero.status) {
				case 'poison':
					if (!core.hasFlag('poison') && !core.hasFlag('weak')) core.triggerDebuff('get', 'poison');
					break;
				case 'weak':
					if (!core.hasFlag('poison') && !core.hasFlag('weak')) core.triggerDebuff('get', 'weak');
					break;
			}

			core.setFlag('battleSpeed', (() => {
				if (battle.speed === 'quick') return 0;
				else if (battle.speed === 'normal') return 1;
				else return 2;
			})());
			if (hero.swordEquiped !== core.getEquip(0)) core.loadEquip(hero.swordEquiped);
			if (hero.shieldEquiped !== core.getEquip(1)) core.loadEquip(hero.shieldEquiped);


			switch (battle.status) {
				case 'win':
					const info = battle.enemy.info,
						money = info.money,
						exp = info.exp;

					core.status.hero.hp = hero.hp;
					core.status.hero.mana = hero.mana;
					core.status.hero.hpmax = hero.hpmax;
					core.status.hero.money += money;
					core.status.hero.statistics.money += money;
					core.status.hero.exp += exp;
					core.status.hero.statistics.exp += exp;
					core.status.hero.statistics.battle++;
					if (!core.isReplaying() && core.getFlag('recordAction', false)) {
						setPresetSkill(battle);
						core.setFlag('recordAction', false);
					}
					break;
				case 'lose':
					core.lose();
					break;
				case 'quit':
					core.status.hero.hp = Math.min(hero.hp, core.status.hero.hp);
					core.status.hero.hpmax = Math.min(hero.hpmax, core.status.hero.hpmax);
					break;
			}
			core.updateStatusBar();
		}

		/**
		 * 获得成就，执行战后事件
		 * @param {Battle} battle
		 * @param {number} x
		 * @param {number} y 
		 */
		function afterBattleEvent(battle, x, y) {
			if (battle.status !== 'win') return;
			const hero = battle.hero,
				enemy = battle.enemy,
				id = enemy.id;

			if (hero.hp < 200 || hero.hpmax < 50) core.plugin.getAchievement(2);
			if (hero.smartCast) core.plugin.getAchievement(38);
			if (hero.status === 'poison' || hero.status === 'weak') core.plugin.getAchievement(27);

			const blockList = {
				swordEmperor: 398,
				goldHornSlime: 400,
				whiteHornSlime: 403,
				silverSlime: 407, //白银怪，掉落钱币
				E384: 385,
				darkKnight: 225,
				soldier: 212, // 重生怪
				redWizard: 11, //炎之身体，变熔岩
				E382: 374, //寒冰身体，变冰块
			};

			if (blockList.hasOwnProperty(id)) core.setBlock(blockList[id], x, y);
			else if (enemy.magicIce) core.setBlock(25, x, y); //掉落魔法冰块
			else core.removeBlock(x, y, core.status.floorId);

			if (id === 'E335' || id === 'E413') { //烈焰身体，极寒身体
				for (let x0 = Math.max(1, x - 1); x0 <= Math.min(11, x + 1); x0++) {
					for (let y0 = Math.max(1, y - 1); y0 <= Math.min(11, y + 1); y0++) {
						if (!core.getBlock(x0, y0) || !core.getBlock(x0, y0).id || core.getBlock(x0, y0).id == 340) {
							if (id === 'E335') core.setBlock(11, x0, y0);
							if (id === 'E413' && (hero.loc.x != x0 || hero.loc.y != y0)
								&& (!core.status.hero.followers[0] || core.status.hero.followers[0].x != x0
									|| core.status.hero.followers[0].y != y0)) core.setBlock(374, x0, y0);
						}
					}
				}
			}
			let todo = [];
			// 战后事件
			if (core.status.floorId != null) {
				core.push(todo, core.floors[core.status.floorId].afterBattle[x + "," + y]);
			}
			core.push(todo, enemy.data.afterBattle);

			// 如果事件不为空，将其插入
			if (todo.length > 0) core.insertAction(todo, x, y);
		}

		// #endregion

		// #region **************************************************
		/** 复写events.prototype.battle */
		events.prototype.battle = function (id, x, y, force, callback) {
			core.saveAndStopAutomaticRoute();
			id = id || core.getBlockId(x, y);
			if (!id) return core.clearContinueAutomaticRoute(callback);

			// 是否采用战斗动画
			let useBattleAnimate = true;
			if (core.hasSpecial(id, 20)) useBattleAnimate = false; // 白银怪不进行特殊战斗
			// 非强制战斗
			if (!useBattleAnimate) {
				if (!core.enemys.canBattle(id, x, y) && !force && !core.status.event.id) {
					core.stopSound();
					core.playSound('操作失败');
					core.drawTip("你打不过此怪物！", id);
					return core.clearContinueAutomaticRoute(callback);
				}
			}
			// 自动存档
			if (!core.status.event.id) core.autosave(true);
			// 战前事件
			if (!this.beforeBattle(id, x, y))
				return core.clearContinueAutomaticRoute(callback);
			// 战后事件
			if (useBattleAnimate) {
				if (!core.isReplaying()) battleByTurn(id, x, y);
				else battleByTurn_replaying(id, x, y);
			} else {
				this.afterBattle(id, x, y);
			}
			if (callback) callback();
		}

		/** 注册录像行为*/
		function _replayAction_bs(action) {
			if (!action.startsWith('bs')) return false;
			core.status.route.push(action);
			core.replay();
			return true;
		}
		core.registerReplayAction('bs', _replayAction_bs);

		// #endregion

		// #region 动画 **************************************************

		const fontSize = 18; // 战斗角色名字的字体大小
		const bx = 36,
			by = 30 + fontSize * 3 / 4,
			size = 32;

		const strokeStyle = "#CC0099";

		/**
		 * 绘制战斗界面
		 * @param {Battle} battle 
		 */
		function drawBattleUI(battle) {

			const hero = battle.hero,
				enemy = battle.enemy;
			const width = core.__PIXELS__ - 16,
				height = 192,
				x = 8,
				y = 96,
				lineWidth = 4, // 背景框的线宽
				strokeStyle = "#CC0099"; // 背景框的颜色-紫色
			const ctx = core.createCanvas("battleUI", x, y, width, height, 66);
			core.setAlpha(ctx, 1);
			ctx.canvas.style.backgroundColor = "gray";
			ctx.canvas.style.backgroundImage = "url(project/images/ground.png)";

			// 绘制背景框
			core.strokeRect(ctx, lineWidth / 2, lineWidth / 2, width - lineWidth, height - lineWidth, strokeStyle, lineWidth);

			const font = fontSize.toString() + "px hkbdt";
			const textFontSize = 14, // 属性名称小字的字体大小
				tx = bx + size + 8,
				ty = by + 10 + textFontSize * 3 / 4,
				textFont = textFontSize.toString() + "px hkbdt",
				numFont = '14px Verdana',
				lineHeight = 10;
			const bx2 = width - bx - size;

			core.setTextAlign(ctx, "center");
			// 绘制敌人名字，勇者名字，VS标志
			core.fillText(ctx, "勇者", bx2 + size / 2, by - fontSize * 3 / 4, "white", font);
			core.fillText(ctx, enemy.data.name, bx + size / 2, by - fontSize * 3 / 4, "white", font);
			core.fillText(ctx, "VS", width / 2, by - fontSize * 3 / 4, "white", "Bold Italic 24px Verdana");
			core.setTextAlign(ctx, "left");

			// 绘制属性
			core.fillText(ctx, '体力', tx, ty, "white", textFont);
			core.fillText(ctx, '攻击力', tx, ty + textFontSize + lineHeight, "white", textFont);
			core.fillText(ctx, '防御力', tx, ty + 2 * (textFontSize + lineHeight), "white", textFont);
			core.fillText(ctx, '疲劳', tx, ty + 3 * (textFontSize + lineHeight), "white", textFont);
			core.fillText(ctx, '气息', tx - 50, ty + 4 * (textFontSize + lineHeight), "white", textFont);

			core.setTextAlign(ctx, "left");
			core.fillText(ctx, enemy.totalFatigue, tx - 30, ty + 3 * (textFontSize + lineHeight),
				"orange", 'Bold 12px Arial');
			core.setTextAlign(ctx, "right");
			if (enemy.poisonPoss > 0 || enemy.weakPoss > 0) {
				core.fillText(ctx, hero.misfortune, width - tx + 20, ty + 2 * (textFontSize + lineHeight),
					"cyan", 'Bold12px Arial');
			}
			core.fillText(ctx, hero.totalFatigue, width - tx + 20, ty + 3 * (textFontSize + lineHeight),
				"orange", 'Bold12px Arial');

			let atkColor = 'white',
				defColor = 'white',
				atkBuff = 0,
				defBuff = 0;

			if (hero.bone > 0) {
				atkColor = 'cyan';
				defColor = 'red';
				atkBuff += Math.round(1.5 * hero.bone);
				defBuff -= Math.round(hero.bone);
			}
			if (hero.fairy > 0) {
				defColor = 'red';
				defBuff += Math.round(hero.fairyBuff);
			}

			core.setTextAlign(ctx, "left");
			core.fillText(ctx, ':体力', width - tx - 50, ty, "white", textFont);
			core.fillText(ctx, ':攻击力', width - tx - 50, ty + textFontSize + lineHeight, atkColor, textFont);
			core.fillText(ctx, ':防御力', width - tx - 50, ty + 2 * (textFontSize + lineHeight), defColor, textFont);
			core.fillText(ctx, ':疲劳', width - tx - 50, ty + 3 * (textFontSize + lineHeight), "white", textFont);
			core.fillText(ctx, '气息:', width - tx - 40, ty + 4 * (textFontSize + lineHeight), "white", textFont);
			if (atkBuff > 0) core.fillText(ctx, '+' + atkBuff.toString(), 260, 78, "cyan", '8px Verdana');
			if (defBuff > 0) core.fillText(ctx, '+' + defBuff.toString(), 260, 100, "red", '8px Verdana');
			else if (defBuff < 0) core.fillText(ctx, '-' + (-defBuff).toString(), 260, 100, "red", '8px Verdana');

			core.setTextAlign(ctx, "left");
			core.fillText(ctx, enemy.hp, tx + 50, ty + 2, "white", numFont);
			core.fillText(ctx, enemy.atk, tx + 50, ty + textFontSize + lineHeight + 2, "white", numFont);
			core.fillText(ctx, enemy.def, tx + 50, ty + 2 * (textFontSize + lineHeight) + 2, "white", numFont);
			core.fillText(ctx, enemy.fatigue, tx + 50, ty + 3 * (textFontSize + lineHeight) + 2, "white", numFont);

			core.setTextAlign(ctx, "right");
			core.fillText(ctx, hero.hp, width - tx - 54, ty + 2,
				hero.hp <= 600 ? hero.hp <= 200 ? "OrangeRed" : "Yellow " : "white", numFont);
			core.fillText(ctx, hero.atk, width - tx - 54, ty + textFontSize + lineHeight + 2, atkColor, numFont);
			core.fillText(ctx, hero.def, width - tx - 54, ty + 2 * (textFontSize + lineHeight) + 2, defColor, numFont);
			core.fillText(ctx, hero.fatigue, width - tx - 54, ty + 3 * (textFontSize + lineHeight) + 2, "white", numFont);

			core.fillText(ctx, '-撤退(Q)-', 100, 180, "yellow", '16px hkbdt');

			// 绘制气息条
			const enemyManaRatio = (enemy.manamax === 0) ? 0 : enemy.mana / enemy.manamax,
				heroManaRemainder = (hero.mana) % (hero.permana);
			let heroManaRatio = heroManaRemainder / hero.permana;
			if (hero.mana >= hero.manamax) heroManaRatio = 1;
			core.strokeRoundRect(ctx, tx, ty + 4 * (textFontSize + lineHeight) - 8, 60, 8, 2, 'yellow', 1);
			core.fillRoundRect(ctx, tx + 1, ty + 4 * (textFontSize + lineHeight) - 7,
				enemyManaRatio * 58, 6, 2, 'LightGreen ');
			core.strokeRoundRect(ctx, width - tx, ty + 4 * (textFontSize + lineHeight), 60, 8, 2, 'yellow', 1);
			core.fillRoundRect(ctx, width - tx + 1, ty + 4 * (textFontSize + lineHeight) + 1,
				heroManaRatio * 58, 6, 2, 'LightGreen ');
		}

		/** 
		 * 绘制敌人动态图像和动态的火焰图标
		 * @param {Battle} battle 
		 * @param {number} count // 敌人图像一共2帧，火焰一共3帧
		 */
		function drawBattleIcon(battle, count) {
			if (!battle) return;
			const width = core.__PIXELS__ - 16,
				height = 192,
				x = 8,
				y = 96,
				lineWidth = 4, // 背景框的线宽
				strokeStyle = "#CC0099"; // 背景框的颜色-紫色

			const ctx = core.createCanvas("battleIcon", x, y, width, height, 68);
			const bx2 = width - bx - size;
			const heroImage = core.material.images.hero;
			const h_width = core.material.icons.hero.width || 32,
				h_height = core.material.icons.hero.height;

			core.drawImage(ctx, heroImage, 0, 0, h_width, h_height, bx2, by, size, size); // 绘制勇者图像
			core.strokeRect(ctx, bx2, by, size, size, strokeStyle, 2); // 绘制右侧勇者图像的边框

			const hero = battle.hero,
				enemy = battle.enemy;
			const textFontSize = 14,
				tx = bx + size + 8,
				ty = by + 10 + textFontSize * 3 / 4,
				lineHeight = 10;
			const block = core.getBlockInfo(enemy.id || "greenSlime");
			const b_width = 32,
				b_height = block.height;
			let enemyType = "enemys";
			const b_pos = block.posY;
			const enemyImage = core.material.images[enemyType];

			// 绘制敌人
			core.drawImage(ctx, enemyImage, (count % 2) * b_width, b_pos * b_height, b_width, b_height, bx, by, size, size);
			core.strokeRect(ctx, bx, by, size, size, strokeStyle, 2);

			core.plugin.drawFireInBattle(hero, "battleIcon",
				[width - tx, ty + 3 * (textFontSize + lineHeight) + 5,
				width - tx + 12, ty + 3 * (textFontSize + lineHeight) + 5,
				width - tx + 24, ty + 3 * (textFontSize + lineHeight) + 5,
				width - tx + 36, ty + 3 * (textFontSize + lineHeight) + 5,
				width - tx + 48, ty + 3 * (textFontSize + lineHeight) + 5,
				], count % 3);

			// 绘制公主
			if (core.status.hero.mdef > 0) {
				core.drawIcon(ctx, 'princess', 220, 125, 32, 32);
				core.strokeRect(ctx, 220, 125, size, size, strokeStyle, 2);
				core.fillText(ctx, '公主', 220, 175, 'gold', '18px hkbdt')
				core.fillText(ctx, ':体力', 185, 150, 'pink', '12px hkbdt')
				core.fillText(ctx, ':魔防', 185, 170, 'pink', '12px hkbdt')
				core.setTextAlign(ctx, 'right');
				core.fillText(ctx, hero.hpmax, 185, 150, 'pink', '14px Arial');
				core.fillText(ctx, hero.mdef, 185, 170, 'pink', '14px Arial')
			}
		}

		const Button = this.Button;
		/**
		 * 拥有status属性的按钮类
		 * @extends {ButtonBase}
		 */
		class StatusButton extends this.Button {
			constructor(name, x, y, w, h, event) {
				super(name, x, y, w, h);
				/** 按钮状态,分为'unavailable','available','pending' 
				 * @type {('unavailable'|'available'|'pending')}
				*/
				this.event = event;
				this.skillStatus = 'available';
			}
		}

		/** 生成按钮对象 
		 * @param {Battle} battle
		 * @returns {Array<ButtonBase>}
		 */
		function generateBtnList(battle) {
			return [
				new StatusButton('btn1', 52, 320, 32, 32, () => {
					if (core.hasItem('I325')) battle.execUserAction('b');
					else if (core.hasItem('I327')) battle.execUserAction('M');
				}),
				new StatusButton('btn2', 52, 320, 32, 32, () => {
					if (core.hasItem('I325')) battle.execUserAction('b');
					else if (core.hasItem('I327')) battle.execUserAction('M');
				}),
				new StatusButton('btn3', 116, 320, 32, 32, () => {
					if (core.hasItem('I325')) battle.execUserAction('d');
					else if (core.hasItem('I327')) battle.execUserAction('R');
				}),
				new StatusButton('btn4', 148, 320, 32, 32, () => {
					if (core.hasItem('I325')) battle.execUserAction('h');
					else if (core.hasItem('I327')) battle.execUserAction('F');
				}),
				new StatusButton('btn5', 180, 320, 32, 32, () => {
					if (core.hasItem('I325')) battle.execUserAction('k');
					else if (core.hasItem('I327')) battle.execUserAction('E');
				}),
				new StatusButton('sword', 212, 320, 32, 32, () => {
					if (!battle.hero.swordEquiped) {
						core.playSound('error.mp3');
						core.drawTip('当前未装备剑技');
					} else { battle.execUserAction(equipList[battle.hero.swordEquiped]); }
				}),
				new StatusButton('shield', 244, 320, 32, 32, () => {
					if (!battle.hero.shieldEquiped) {
						core.playSound('error.mp3');
						core.drawTip('当前未装备盾技');
					} else { battle.execUserAction(equipList[battle.hero.shieldEquiped]); }
				}),
				new StatusButton('crit', 276, 320, 32, 32, () => battle.execUserAction('c')),
				new StatusButton('breathe', 308, 320, 32, 32, () => battle.execUserAction('v')),
				new StatusButton('quick', 0, 0, 32, 32, () => {
					battle.speed = 'quick'
					console.log(battle.speed)
				}),
				new StatusButton('normal', 32, 0, 32, 32, () => battle.speed = 'normal'),
				new StatusButton('slow', 64, 0, 32, 32, () => battle.speed = 'slow'),
			];
		}

		/**
		 * 更新按钮状态
		 * @param {StatusButton} btn 
		 * @param {Battle} battle 
		 */
		function updateButtonStatus(btn, battle) {
			const hero = battle.hero,
				swordSkill = hero.swordSkill,
				shieldSkill = hero.shieldSkill;
			switch (btn.name) {
				case 'btn1':
					if (core.hasItem('I325')) {
						if (swordSkill === 'b') btn.skillStatus = 'pending';
						else if (battle.canExecAction('b').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					else if (core.hasItem('I327')) {
						if (shieldSkill === 'M') btn.skillStatus = 'pending';
						else if (battle.canExecAction('M').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					break;
				case 'btn2':
					if (core.hasItem('I325')) {
						if (swordSkill === 's') btn.skillStatus = 'pending';
						else if (battle.canExecAction('s').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					else if (core.hasItem('I327')) {
						if (shieldSkill === 'C') btn.skillStatus = 'pending';
						else if (battle.canExecAction('C').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					break;
				case 'btn3':
					if (core.hasItem('I325')) {
						if (swordSkill === 'd') btn.skillStatus = 'pending';
						else if (battle.canExecAction('d').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					else if (core.hasItem('I327')) {
						if (shieldSkill === 'R') btn.skillStatus = 'pending';
						else if (battle.canExecAction('R').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					break;
				case 'btn4':
					if (core.hasItem('I325')) {
						if (swordSkill === 'h') btn.skillStatus = 'pending';
						else if (battle.canExecAction('h').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					else if (core.hasItem('I327')) {
						if (shieldSkill === 'F') btn.skillStatus = 'pending';
						else if (battle.canExecAction('F').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					break;
				case 'btn5':
					if (core.hasItem('I325')) {
						if (swordSkill === 'k') btn.skillStatus = 'pending';
						else if (battle.canExecAction('k').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					else if (core.hasItem('I327')) {
						if (shieldSkill === 'E') btn.skillStatus = 'pending';
						else if (battle.canExecAction('E').success) btn.skillStatus = 'available';
						else btn.skillStatus = 'unavailable';
					}
					break;
				case 'sword':
					if (swordSkill !== '' && swordSkill !== 'c') btn.skillStatus = 'pending';
					else if (battle.canExecAction(equipList[hero.swordEquiped]).success)
						btn.skillStatus = 'available';
					else btn.skillStatus = 'unavailable';
					break;
				case 'shield':
					if (shieldSkill !== '') btn.skillStatus = 'pending';
					else if (battle.canExecAction(equipList[hero.shieldEquiped]).success)
						btn.skillStatus = 'available';
					else btn.skillStatus = 'unavailable';
					break;
				case 'crit':
					if (swordSkill === 'c') btn.skillStatus = 'pending';
					else if (battle.canExecAction('c').success) btn.skillStatus = 'available';
					else btn.skillStatus = 'unavailable';
					break;
				case 'breathe':
					if (battle.canExecAction('v').success) btn.skillStatus = 'available';
					else btn.skillStatus = 'unavailable';
					break;
			}
		}

		/**
		 * @param {Battle} battle 
		 * 绘制技能图标
		 */
		function drawSkillButton(battle) {
			const hero = battle.hero;

			const ctx = core.createCanvas("skillIcon", 40, 320, 330, 32, 68);
			const hasOrb = core.hasItem('I325') || core.hasItem('I327');
			const offsetX = hasOrb ? 0 : 160;
			core.fillRect(ctx, offsetX, 0, 330 - offsetX, 32, 'lightGray');
			core.strokeRect(ctx, offsetX + 1, 1, 328 - offsetX, 30, strokeStyle, 2);

			const btnList = battle.btnList;

			const [start, interval] = [20, 32];

			for (let i = 0; i <= 8; i++) {
				if (!hasOrb && 0 <= i && i <= 4) continue;

				const btn = btnList[i],
					x = start + i * interval;

				updateButtonStatus(btn, battle); // 更新按钮状态

				let backGround = 'yellowBall.png';
				if (btn.skillStatus === 'unavailable') {
					backGround = 'grayBall.png';
					core.setAlpha(ctx, 0.4);
				}
				else if (btn.skillStatus === 'pending') backGround = 'redBall.png';
				core.drawImage(ctx, backGround, x, 0);

				switch (btn.name) {
					case 'btn1':
						if (core.hasItem('I325')) core.drawImage(ctx, 'I315.png', x + 5, 0, 20, 20);
						else if (core.hasItem('I327')) core.drawImage(ctx, 'I339.png', x + 5, 0, 20, 20);
						break;
					case 'btn2':
						if (core.hasItem('I325')) core.drawImage(ctx, 'I319.png', x + 5, 0, 20, 20);
						else if (core.hasItem('I327')) core.drawImage(ctx, 'I321.png', x + 5, 0, 20, 20);
						break;
					case 'btn3':
						if (core.hasItem('I325')) core.drawImage(ctx, 'I318.png', x + 5, 0, 20, 20);
						else if (core.hasItem('I327')) core.drawImage(ctx, 'I375.png', x + 5, 0, 20, 20);
						break;
					case 'btn4':
						if (core.hasItem('I325')) core.drawImage(ctx, 'I317.png', x + 5, 0, 20, 20);
						else if (core.hasItem('I327')) core.drawImage(ctx, 'I322.png', x + 5, 0, 20, 20);
						break;
					case 'btn5':
						if (core.hasItem('I325')) core.drawImage(ctx, 'I316.png', x + 5, 0, 20, 20);
						else if (core.hasItem('I327')) core.drawImage(ctx, 'I320.png', x + 5, 0, 20, 20);
						break;
					case 'sword':
						core.drawImage(ctx, 'iconSword.png', x + 6, 6, 20, 20);
						core.fillText(ctx, 'Z', x + 20, 28, 'red', 'Bold 12px Arial');
						break;
					case 'shield':
						core.drawImage(ctx, 'iconShield.png', x + 6, 6, 20, 20);
						core.fillText(ctx, 'X', x + 20, 28, 'red', 'Bold 12px Arial');
						break;
					case 'crit':
						core.drawImage(ctx, 'pong.png', x + 3, 2, 28, 28);
						core.fillText(ctx, 'C', x + 20, 28, 'red', 'Bold 12px Arial');
						break;
					case 'breathe':
						core.drawImage(ctx, 'iconBreathe.png', x + 4, 4, 24, 24);
						core.fillText(ctx, hero.deepBreath.toString(),
							x + 13, 19, 'red', 'Bold 10px Arial');
						core.fillText(ctx, 'V', x + 20, 28, 'red', 'Bold 12px Arial');
						break;
				}
				if (btn.skillStatus === 'unavailable') core.setAlpha(ctx, 1);
			}
		}

		/**
		 * 绘制速度选择按钮
		 * @param {Battle} battle 
		 */
		function drawSpeedButton(battle) {
			core.createCanvas('speedButton', 0, 0, 96, 30, 100);
			core.fillRect('speedButton', 0, 0, 96, 30, 'gray');
			core.strokeRect('speedButton', 1, 1, 94, 28, 'blue');
			core.fillText('speedButton', '快  中  慢', 8, 20, 'white', '16px Verdana');
			let rectPos = 4;
			if (battle.speed === 'normal') rectPos = 32;
			else if (battle.speed === 'slow') rectPos = 60;
			core.strokeRect('speedButton', rectPos, 4, 24, 22, 'yellow');
		}

		/**
		 * 绘制底边栏
		 * @param {Battle} battle
		 * @param {number} h 底边栏的宽度
		 */
		function drawBattleBottomBar(battle, h) {
			const width = core.__PIXELS__ - 16,
				height = h || 40,
				x = 8,
				y = 284,
				lineWidth = 4, // 背景框的线宽
				strokeStyle = "#CC0099", // 背景框的颜色-紫色
				ctx = core.createCanvas("battleBottomBar", x, y, width, height, 66);
			ctx.canvas.style.backgroundColor = "gray";
			ctx.canvas.style.backgroundImage = "url(project/images/ground.png)";

			core.strokeRect(ctx, lineWidth / 2, lineWidth / 2, width - lineWidth, height - lineWidth, strokeStyle, lineWidth);
			if (h >= 40) {
				core.fillText(ctx, "胜利!!", 10, 26, "white", " 20px hkbdt");
				core.fillText(ctx, "金币：", 100, 26, "white", "20px hkbdt");
				core.fillText(ctx, "经验值：", 200, 26, "white", "20px hkbdt");
				core.setTextAlign(ctx, "left");
				core.fillText(ctx, battle.enemy.data.money.toString(), 150, 26, "gold", "20px Verdana");
				core.fillText(ctx, battle.enemy.data.exp.toString(), 270, 26, "cyan", "20px Verdana");
			}
		}

		function drawBattleHint() {
			const ctx = "battleHint";
			core.createCanvas(ctx, 0, 0, core.__PIXELS__, 100, 66);
			let hintList = ['向脸书求援可以回复血量', '设置里可以调整战斗速度', '复刻版中，疲劳值每回合都会增加你的疲劳计数（显示为橙色数字），每达到100就miss一次', '复刻版中，敌人施加的毒衰debuff会根据释放概率增加你的负面计数（显示为浅蓝数字），每达到100就触发一次'],
				l = hintList.length,
				k = Math.floor(l * Math.random());
			core.setAlpha(ctx, 0.7);
			core.fillRect(ctx, 64, 58, core.__PIXELS__ - 128, 32, 'gray');
			core.setAlpha(ctx, 1);
			core.setTextAlign(ctx, 'center');
			core.fillText(ctx, hintList[k], core.__PIXELS__ / 2, 80, "white", " 14px Arial", core.__PIXELS__ - 160);
		}

		/** 在勇士图标上播放的动画的偏移量 */
		const heroOffsetList = {
			'brownWizard': { 'y': -20 },
			'grayPriest': { 'y': -20 },
			'redPriest': { 'y': -20 },
			'greenKing': { 'y': -10 },
			'yellowKing': { 'y': -100 },
			'redKing': { 'y': -50 },
			'E380': { 'x': -20 },
			'goldSlime': { 'x': -80, 'y': -10 },
			'skeletonPriest': { 'x': 10 },
			'E436': { 'x': -40 },
			'E447': { 'x': -50, 'y': -50 },
			'gsh3': { 'x': -30 },
		},
			/** 在公主图标上播放的动画的偏移量 */
			princessOffsetList = {
				'E377': { 'x': -60, 'y': 15 },
				'E378': { 'x': -60, 'y': 15 },
				'redKing': { 'y': -20 },
			},
			/** 在敌人图标上播放的动画的偏移量 */
			enemyOffsetList = {
				'gcanthit': { 'y': -10 },
				'gsw1': { 'y': -40 },
				'gsw2': { 'y': -10 },
			};

		/**
		 * 解析当前atkStatus信息，播放动画
		 * @param {Battle} battle 
		 */
		function drawBattleAnimate(battle) {
			const atkStatusH = battle.hero.atkStatus,
				atkStatusE = battle.enemy.atkStatus;
			const [hx, hy, ex, ey, px, py] = [355, 152, 60, 166, 245, 225];
			let currOffset = 0;
			switch (battle.actor) {
				case 'hero':
					if (atkStatusH.frozen) break;
					if (atkStatusH.miss) {
						core.plugin.drawAnimateByPixel('miss', ex, ey); // 这里播放miss的动画
						break;
					}
					let [oex, oey] = [0, 0, 0];
					const hAnimate = atkStatusH.animate;
					if (enemyOffsetList.hasOwnProperty(hAnimate)) {
						currOffset = enemyOffsetList[hAnimate];
						[oex, oey] = [currOffset.x || 0, currOffset.y || 0];
					}
					core.plugin.drawAnimateByPixel(atkStatusH.animate, ex + oex, ey + oey);
					let damageH = atkStatusH.damage;
					if (atkStatusH.crit) damageH += 'crit';
					core.plugin.addScrollingText(damageH, {
						'x': ex - 6, 'y': ey + 14, 'vy': 1, 'style': 'Tomato',
						'font': 'Bold 18px Arial', 'tmax': 50, 'type': 'down',
					});
					if (atkStatusH.heal > 0) { //治疗效果
						core.plugin.addScrollingText('+' + atkStatusH.heal, {
							'x': hx - 6, 'y': hy + 14, 'vy': 1, 'style': 'Lime',
							'font': 'Bold 18px Arial', 'tmax': 50, 'type': 'down',
						});
					}
					break;
				case 'enemy':
					if (atkStatusE.frozen) break;
					const eid = battle.enemy.id,
						sid = atkStatusE.heroAnimate || '';
					let [ohx, ohy, opx, opy, osx, osy] = [0, 0, 0, 0, 0, 0];
					if (heroOffsetList.hasOwnProperty(eid)) {
						currOffset = heroOffsetList[eid];
						[ohx, ohy] = [currOffset.x || 0, currOffset.y || 0];
					}
					if (princessOffsetList.hasOwnProperty(eid)) {
						currOffset = princessOffsetList[eid];
						[opx, opy] = [currOffset.x || 0, currOffset.y || 0];
					}
					if (heroOffsetList.hasOwnProperty(sid)) {
						currOffset = heroOffsetList[sid];
						[osx, osy] = [currOffset.x || 0, currOffset.y || 0];
					}
					if (atkStatusE.miss) {  // 这里播放miss的动画
						if (['hero', 'all', 'bounce'].includes(atkStatusE.aim)) {
							core.plugin.drawAnimateByPixel('miss', hx + ohx, hy + ohy);
						}
						if (atkStatusE.aim === 'princess' || atkStatusE.aim === 'all') {
							core.plugin.drawAnimateByPixel('miss', px + opx, py + opy);
						}
						break;
					}
					let damageE = atkStatusE.damage.toString(),
						princessDamageE = atkStatusE.princessDamage.toString();
					if (atkStatusE.crit) {
						damageE += 'crit';
						princessDamageE += 'crit';
					}
					if (atkStatusE.debuff === 'poison') {
						core.plugin.drawAnimateByPixel('gpoison', hx, hy);
					}
					else if (atkStatusE.debuff === 'weak') {
						core.plugin.drawAnimateByPixel('gweak', hx, hy);
					}
					if (atkStatusE.aim === 'hero' || atkStatusE.aim === 'all') {
						core.plugin.drawAnimateByPixel(atkStatusE.animate, hx + ohx, hy + ohy);
						core.plugin.drawAnimateByPixel(atkStatusE.heroAnimate, hx + osx, hy + osy);
						core.plugin.addScrollingText(damageE, {
							'x': hx - 6, 'y': hy + 28, 'vy': 1, 'style': 'Tomato ',
							'font': 'Bold 18px Arial', 'tmax': 50, 'type': 'down',
						});
					}
					if (atkStatusE.aim === 'princess' || atkStatusE.aim === 'all') {
						core.plugin.drawAnimateByPixel(atkStatusE.animate, px + opx, py + opy);
						let shieldAnimate = (() => {
							if (core.hasItem('I325')) return 'gprin1';
							else if (core.hasItem('I326')) return 'gprin2';
							else if (core.hasItem('I327')) return 'gprin3';
							return undefined;
						})();

						if (shieldAnimate) core.plugin.drawAnimateByPixel(shieldAnimate, px, py);

						core.plugin.addScrollingText(princessDamageE, {
							'x': px - 15, 'y': py + 25, 'vy': 1, 'style': 'Tomato ',
							'font': 'Bold 18px Arial', 'tmax': 50, 'type': 'down'
						});
					}
					if (atkStatusE.aim === 'bounce') { // 古顿的伤害动画单独处理
						let bounceDamage = atkStatusE.bounceDamage,
							currstr = '',
							count = 0;
						core.plugin.drawAnimateByPixel(atkStatusE.animate, hx + ohx, hy + ohy);
						let bounce = setInterval(function () {
							currstr = bounceDamage[count].toString();
							if (atkStatusE.crit) currstr += 'crit';
							core.plugin.addScrollingText(currstr, {
								'x': (count % 2 === 0) ? hx - 6 + 20 * Math.random() : px - 15 + 20 * Math.random(),
								'y': (count % 2 === 0) ? hy + 28 + 20 * Math.random() : py + 25 + 20 * Math.random(),
								'vy': 1, 'style': 'Tomato ', 'font': 'Bold 18px Arial',
								'tmax': 100, 'type': 'down'
							});
							count++;
							if (count >= 4) clearInterval(bounce);
						}, 50);
					}
					if (atkStatusE.heal > 0) { //治疗效果
						core.plugin.addScrollingText('+' + atkStatusE.heal, {
							'x': ex - 6, 'y': ey + 14, 'vy': 1, 'style': 'Lime',
							'font': 'Bold 18px Arial', 'tmax': 50, 'type': 'down',
						});
					}
					break;
			}
		}

		// #endregion

		// #region 监听事件及注销 **************************************************

		/**
		 * 监听按键，执行相应的用户行为
		 * @param {number} keyCode 
		 * @param {Battle} battle 
		 * @returns 
		 */
		function listenKey(keyCode, battle) {
			if (battle.status !== 'pending') return;
			switch (keyCode) {
				case 49: //1
					if (core.hasItem('I325')) battle.execUserAction('b');
					else if (core.hasItem('I327')) battle.execUserAction('M');
					break;
				case 50: //2
					if (core.hasItem('I325')) battle.execUserAction('s');
					else if (core.hasItem('I327')) battle.execUserAction('C');
					break;
				case 51: //3
					if (core.hasItem('I325')) battle.execUserAction('d');
					else if (core.hasItem('I327')) battle.execUserAction('R');
					break;
				case 52: //4
					if (core.hasItem('I325')) battle.execUserAction('h');
					else if (core.hasItem('I327')) battle.execUserAction('F');
					break;
				case 53: //5
					if (core.hasItem('I325')) battle.execUserAction('k');
					else if (core.hasItem('I327')) battle.execUserAction('E');
					break;
				case 67: //C
					battle.execUserAction('c');
					break;
				case 86: //V
					battle.execUserAction('v');
					break;
				case 90: //Z
					if (!battle.hero.swordEquiped) {
						core.playSound('error.mp3');
						core.drawTip('当前未装备剑技');
					} else { battle.execUserAction(equipList[battle.hero.swordEquiped]); }
					break;
				case 88: //X
					if (!battle.hero.shieldEquiped) {
						core.playSound('error.mp3');
						core.drawTip('当前未装备盾技');
					} else { battle.execUserAction(equipList[battle.hero.shieldEquiped]); }
					break;
			}
		}

		/**
		 * 监听用户点击事件
		 * @param {number} x 
		 * @param {number} y 
		 * @param {number} px 
		 * @param {number} py 
		 * @param {Battle} battle 
		 */
		function listenClick(x, y, px, py, battle) {
			battle.btnList.forEach((button) => {
				if (px >= button.x && px <= button.x + button.w &&
					py >= button.y && py <= button.y + button.h
				) {
					button.event(x, y, px, py);
				}
			}
			);
			drawSkillButton(battle); //每次点击重绘所有按钮
			drawSpeedButton(battle);
		}

		/**
		 * 注册按键和点击的监听事件
		 * @param {Battle} battle 
		 */
		function beginListen(battle) {
			core.registerAction('keyDown', 'battleSkill', keyCode => listenKey(keyCode, battle), 100);
			core.registerAction('ondown', 'battleClick', (x, y, px, py) => {
				listenClick(x, y, px, py, battle);
			}, 100);
		}

		/** 注销所有事件和画布 */
		function clearCanvasAndEvent() {
			core.unregisterAction('keyDown', 'battleSkill');
			core.unregisterAction('ondown', 'battleClick');

			core.unregisterAction('keyDown', 'quit');
			core.unregisterAction('ondown', 'quit');

			['drawDamage', 'showBottomBar', 'battleIcon'].forEach(x => core.unregisterAnimationFrame(x));
			['battleUI', 'battleIcon', 'battleBottomBar',
				'skillIcon', 'quit', 'speedButton'].forEach(x => core.deleteCanvas(x));
		}
		// #endregion

		// #region 工具函数 **************************************************

		/** 判断敌人是否具有列表中的某项特殊属性
		 * @param {Array} enemySpecial 
		 * @param {Array<number> | number} specialList 
		 * @returns {boolean}
		 */
		function hasSpecial(enemySpecial, specialList) {
			const setA = new Set(enemySpecial);
			if (typeof specialList === 'number') return enemySpecial.includes(specialList);
			for (let element of specialList) {
				if (setA.has(element)) {
					return true;
				}
			}
			return false;
		}

		/**
		 * 读取string格式的技能序列，解析为actionObj
		 * @param {string} next
		 * @returns {object}
		 */
		this.getActionObj = function (next) {
			let actionObj = {};

			if (next.startsWith('bs:')) {
				const nextList = next.split(':');
				for (let i = 1, l = nextList.length; i < l; i++) {
					const currTurn = parseInt(nextList[i]);
					if (!actionObj.hasOwnProperty(currTurn)) actionObj[currTurn] = [];
					actionObj[currTurn].push(nextList[i].replace(currTurn.toString(), ''));
				}
			}

			return actionObj;
		}

		/**
		 * todolist:
		 * 实现多重楼传，杀掉已有的回城楼传 ?
		 * 实现tips界面
		 * 重要的是文案
		 * 3F 警告标志
		 * 标题：气息
		 * 每回合您攻击敌人和被攻击时都会回复气息。（展示： 角色挨打的动画 气息条，圈起来火焰）
		 * 气息满一格时，暴击按钮C会亮起，此时可以发动一次暴击，伤害×2
		 * 下一页 跳过 -> 明白了 退出
		 * 您可以在背包图标里的设置\i[xxx]中调整是否显示此提示信息。（）
		 * 如果您是这个游戏的老手，您可以选择“跳过提示”
		 * 
		 * 技能与疲劳
		 * 剑技 装备某个剑技后，条件满足时Z会亮起，此时可以发动对应技能
		 * 使用技能和暴击都会增长疲劳，橙色数字显示了疲劳的累计值，达到100时将会MISS一次
		 * 
		 * 岩浆
		 * 走到岩浆上时，你会受到伤害
		 * 当地图上存在岩浆阻碍时，使用快捷商店会立即触发传送！
		 * 
		 * 异常状态
		 * 一些特殊敌人有概率对你释放异常状态，这会增加你的异常计数
		 * 每当异常计数达到100时，异常状态将被立即触发
		 * 
		 * 中毒会使你每走一步都掉血（并禁用楼传和快捷商店），衰弱会扣减你的攻防。
		 * 你可以使用一些手段来解除异常状态!（瓶子）
		 * 
		 * 实现新的伤害跳出
		 * too hard 尝试一下高级动画插件 好的话弹幕绘制和成就界面跳出也可以改成这个 
		 * 要自己实现故事板那也太恶心，太恶劣了？
		 * 还原失败动画，开局的动画
		 * 待确认：疲劳和毒衰计数要不要叠
		 * 待确认：淡薄的绘制优化
		 * 待确认：老复刻版的bug
		 * 待确认：毒衰的UI
		 */

		/**
		 * 返回一个Obj，格式如下 {'1':['c','B'],'3':['c','n']}
		 * @param {string} id 敌人id
		 * @return {object}
		 */
		function getPresetSkill(id) {
			let currPreset = {};
			if (core.isReplaying()) return currPreset;
			const presetSkill = core.getFlag('presetSkill', {}); // {'redSlime':'xxx','bat':'xxx'}
			const hotkeyData = core.getFlag('hotkeyData', 0); //{'2':'redSlime'}
			const preSetIndex = core.getFlag('preSetIndex', 0);
			if ([2, 3, 4, 5, 6, 7].includes(preSetIndex) && hotkeyData.hasOwnProperty(preSetIndex)) {
				currPreset = core.plugin.getActionObj(presetSkill[hotkeyData[preSetIndex]])
			}
			else if (presetSkill.hasOwnProperty(id)) {
				currPreset = core.plugin.getActionObj(presetSkill[id]);
			}
			return currPreset;
		}

		/**
		 * 将当前route信息写入presetSkill，连击怪信息需做一定处理
		 * @param {Battle} battle
		 */
		function setPresetSkill(battle) {
			let presetSkill = core.getFlag('presetSkill', {});
			const enemy = battle.enemy;
			const [id, combo, maxTurn] = [enemy.id, enemy.combo, battle.turn];

			let currPreset = '';
			if (combo > 1) {
				let enemyActionObj = core.plugin.getActionObj(battle.route);
				let currTurn = 0;
				for (let i = 0; ; i++) {
					if (i % 2 === 0) { // 勇士出手回合的操作
						currTurn = (combo + 1) * (i / 2);
						if (currTurn > maxTurn) break;
						let action = enemyActionObj[currTurn.toString()];
						action = action.filter(ele => ['b', 's', 'd', 'h', 'k', 'c'].includes(ele));
						if (action.length > 0) {
							currPreset += i.toString() + ':' + action[0];
						}
					}
					else {
						for (j = 1; j <= combo; j++) {
							currTurn = (combo + 1) * (i - 1) / 2 + j; // 连击怪的当前回合
							if (currTurn > maxTurn) break;
							let action = enemyActionObj[currTurn.toString()];
							action = action.filter(ele => ['M', 'C', 'R', 'F', 'E'].includes(ele));
							if (action.length > 0) {
								currPreset += i.toString() + ':' + action[0];
								break;
							}
						}
						if (currTurn > maxTurn) break;
					}
				}
			}
			else {
				currPreset = battle.route;
			}
			if (currPreset.length > 2) {
				presetSkill[id] = currPreset;
				core.setFlag('presetSkill', presetSkill);
				core.playSound('achievement.mp3');
				core.drawTip('已成功记录技能释放信息！');
			}
			else {
				core.playSound('error.mp3');
				core.drawTip('当前未录制到技能释放信息！');
			}
		}

		/** 查找技能的对应数据
		 * @param {string} skill 
		 * @param {string} type 
		 * @returns {number}
		 */
		function getSkill(skill, type) {
			const list = {
				'c': { 'lv': 1, 'cost': 1, 'fatigue': 2 },
				'b': { 'lv': 1, 'cost': 1, 'fatigue': 10 },
				's': { 'lv': 20, 'cost': 1, 'fatigue': 4 },
				'd': { 'lv': 26, 'cost': 1, 'fatigue': 4 },
				'h': { 'lv': 79, 'cost': 2, 'fatigue': 8 },
				'k': { 'lv': 100, 'cost': 2, 'fatigue': 30 },
				'M': { 'lv': 1, 'cost': 1, 'fatigue': 3 },
				'C': { 'lv': 18, 'cost': 2, 'fatigue': 12 },
				'R': { 'lv': 28, 'cost': 1, 'fatigue': 3 },
				'F': { 'lv': 57, 'cost': 2, 'fatigue': 9 },
				'E': { 'lv': 100, 'cost': 2, 'fatigue': 2 },
			}
			if (list.hasOwnProperty(skill) && list[skill].hasOwnProperty(type)) return list[skill][type];
			else return NaN;
		}

		/**  是否为法师,成就判断用.条件为特技含有字段“魔法”或“秘术”
		 * @param {Array} special 
		*/
		function isMagician(special) {
			return hasSpecial(special, [2, 60, 61, 62, 63, 64, 65, 66, 67]);
		}

		/**  
		 * 获取敌人攻击动画名称
		 * @param {string} id
		 * @param {boolean} critical 
		 * @returns {string}
		 */
		function enemyAni(id, critical) {
			switch (id) {
				case 'bat':
				case 'bigBat':
				case 'redBat':
				case 'poisonBat':
					return critical ? 'g1-cri' : 'g1';
				case 'bluePriest':
					return critical ? 'g4-cri' : 'g4'; //初级法师攻击
				case 'skeletonSoilder':
				case 'yellowKnight':
				case 'swordsman':
					return critical ? 'g5-cri' : 'g5'; //骷髅兵，骑士，双手剑士攻击
				case 'zombie':
					return critical ? 'g6-cri' : 'g6'; //兽人攻击
				case 'grayPriest':
					return critical ? 'g7-cri' : 'g7'; //中级法师攻击
				case 'E330':
				case 'E334':
					return critical ? 'g8-cri' : 'g8'; //八爪鱼，四手史莱姆人攻击
				case 'skeletonCaptain':
				case 'blueKnight':
				case 'zombieKnight': //骷髅队长，高级骑士（蓝色），兽人武士攻击
					return critical ? 'g9-cri' : 'g9';
				case 'redKnight':
				case 'poisonSkeleton': //近卫骑士（红色），骷髅兵（紫色）
					return critical ? 'g10-cri' : 'g10';
				case 'redWizard':
					return critical ? 'g11-cri' : 'g11'; //红衣巫师攻击
				case 'blackMagician':
				case 'E396':
				case 'E397':
					return critical ? 'g12-cri' : 'g12'; //暗魔法攻击
				case 'vampire':
					return critical ? 'g13-cri' : 'g13'; //魔王格勒第攻击
				case 'E377':
				case 'E378':
					return critical ? 'g14-cri' : 'g14'; //弓兵，精锐弓兵攻击
				case 'magicDragon':
					return critical ? 'g19-cri' : 'g19'; //恶龙攻击
				case 'E432':
					return critical ? 'g20-cri' : 'g20'; //毒龙攻击
				case 'brownWizard':
				case 'greenKing':
					return critical ? 'g22-cri' : 'g22'; //初级巫师，绿衣魔王攻击
				case 'redWizard':
					return critical ? 'g23-cri' : 'g23'; //高级法师攻击
				case 'redSwordsman':
					return critical ? 'g24-cri' : 'g24'; //剑王攻击
				case 'whiteGhost':
					return critical ? 'g25-cri' : 'g25'; //水银人攻击
				case 'whiteKing':
				case 'E413':
					return critical ? 'g26-cri' : 'g26'; //蓝衣魔王，极地法师攻击
				case 'skeletonPriest':
				case 'E444':
				case 'E442':
					return critical ? 'g28-cri' : 'g28'; //混沌术士，血使者，血剑士攻击
				case 'E446':
					return critical ? 'g29-cri' : 'g29'; //史莱姆阿修罗攻击
				case 'yellowKing':
					return critical ? 'g30-cri' : 'g30'; //黄衣魔王攻击
				case 'redKing':
					return critical ? 'g31-cri' : 'g31'; //红衣魔王攻击
				case 'E337':
					return critical ? 'g33-cri' : 'g33'; //邪眼史莱姆攻击
				case 'skeletonKing':
					return critical ? 'g34-cri' : 'g34'; //魔神·些多攻击
				case 'goldSlime':
					return critical ? 'g35-cri' : 'g35'; //剑神沙士攻击
				case 'E380':
					return critical ? 'g36-cri' : 'g36'; //斗神高巴攻击
				case 'E379':
					return critical ? 'g37-cri' : 'g37'; //箭神法比攻击
				case 'yellowGuard':
				case 'blueGuard':
				case 'redGuard':
				case 'ghostSkeleton':
				case 'E329':
					return critical ? 'g38-cri' : 'g38'; //卫兵、冥骷髅攻击
				case 'redPriest':
					return critical ? 'g40-cri' : 'g40'; //卫兵、冥骷髅攻击
				case 'E382':
					return critical ? 'g41-cri' : 'g41'; //冻死骨攻击
				case 'E436':
					return critical ? 'g43-cri' : 'g43'; //冥界矮人战士攻击
				case 'E435':
					return critical ? 'g44-cri' : 'g44'; //生气灵攻击
				case 'E447':
					return critical ? 'g48-cri' : 'g48'; //最终BOSS
				default:
					return critical ? 'g2-cri' : 'g2';
			}
		}
		// #endregion
	},
	"弹幕插件": function () {

		const towerName = "xinxin2";
		let W, H, WIDTH, HEIGHT;
		if (core._WIDTH_ && core._HEIGHT_) {
			[W, H] = [core._WIDTH_, core._HEIGHT_];
		} else if (core.__SIZE__) {
			[W, H] = [core.__SIZE__, core.__SIZE__];
		} else {
			[W, H] = [13, 13];
		}
		if (core._PX_ && core._PY_) {
			[WIDTH, HEIGHT] = [core._PX_, core._PY_];
		} else if (core.__SIZE__) {
			[WIDTH, HEIGHT] = [core.__PIXELS__, core.__PIXELS__];
		} else {
			[WIDTH, HEIGHT] = [416, 416];
		}


		utils.prototype.http = function (type, url, formData, success, error, mimeType, responseType, onprogress, timeout) {
			let xhr = new XMLHttpRequest();
			xhr.open(type, url, true);

			xhr.timeout = timeout;
			if (mimeType) xhr.overrideMimeType(mimeType);
			if (responseType) xhr.responseType = responseType;
			xhr.onload = function (e) {
				if (xhr.status == 200) {
					if (success) success(xhr.response);
				} else {
					if (error) error("HTTP " + xhr.status);
				}
			};
			xhr.onprogress = function (e) {
				if (e.lengthComputable) {
					if (onprogress) onprogress(e.loaded, e.total);
				}
			}
			xhr.onabort = function () {
				if (error) error("Abort");
			}
			xhr.ontimeout = function () {
				if (error) error("Timeout");
			}
			xhr.onerror = function () {
				if (error) error("Error on Connection");
			}
			if (formData)
				xhr.send(formData);
			else xhr.send();
		}

		this.getComment = function () {
			let form = new FormData();
			form.append('type', 1);
			form.append('towername', towerName);
			utils.prototype.http(
				'POST',
				'https://h5mota.com/backend/tower/barrage.php',
				form,
				function (res) {
					res = JSON.parse(res);
					console.log(res);
					core.drawTip('接收成功！')
					core.playSound('item.mp3');
					let commentCollection = {};
					const commentList = res?.list;
					for (let i = 0, l = commentList.length; i <= l - 1; i++) {
						if (commentList[i]?.comment?.length == 0 || commentList[i]?.comment.match(/^[ ]*$/)) continue;
						const commentTags = commentList[i].tags;
						const cFloorId = commentTags.split(',')[0],
							cX = parseInt(commentTags.split(',')[1]),
							cY = parseInt(commentTags.split(',')[2]);
						if (0 <= cX && cX <= W - 1 && 0 <= cY &&
							cY <= H - 1 && core.floorIds.includes(cFloorId)) {
							if (!commentCollection.hasOwnProperty(cFloorId)) { commentCollection[cFloorId] = {}; }
							const str = cX + ',' + cY;
							if (!commentCollection[cFloorId].hasOwnProperty(str)) { commentCollection[cFloorId][str] = []; }
							commentCollection[cFloorId][str].push(commentList[i]?.comment);
						}
					}
					core.setFlag('commentCollection', commentCollection);
				},
				function (err) {
					err = JSON.parse(err);
					console.error(err);
					core.drawTip('接收失败' + err?.message);
					core.playSound('error.mp3');
				},
				null, null, null, 1000
			);
		}

		this.postComment = function (comment, tags) {
			let form = new FormData();
			form.append('type', 2);
			form.append('towername', towerName);
			form.append('comment', comment);
			form.append('tags', tags);
			utils.prototype.http(
				'POST',
				'https://h5mota.com/backend/tower/barrage.php',
				form,
				function (res) {
					res = JSON.parse(res);
					console.log(res);
					if (res?.code === 0) {
						core.drawTip('提交成功！')
						core.playSound('item.mp3');
					} else {
						core.drawTip('提交失败！' + res?.message);
						core.playSound('error.mp3');
					}
				},
				function (err) {
					err = JSON.parse(err);
					console.error(err);
					core.drawTip('接收失败' + err?.message);
					core.playSound('error.mp3');
				},
				null, null, null, 1000
			);
		}

		this.drawCommentSign = function () {
			if (!core.getFlag('comment') || core.isReplaying()) return;
			let commentCollection = core.getFlag('commentCollection', {}),
				floorId = core.status.floorId;
			core.createCanvas('sign', 0, 0, WIDTH, HEIGHT, 120);
			core.setOpacity('sign', 0.6);
			if (commentCollection.hasOwnProperty(floorId)) {
				for (let pos in commentCollection[floorId]) {
					if (commentCollection[floorId][pos].length > 0) {
						for (let i = 0, l = commentCollection[floorId][pos].length; i <= l - 1; i++) {
							if (!(commentCollection[floorId][pos][i].match(/^[ ]*$/))) {
								const x = pos.split(',')[0],
									y = pos.split(',')[1];
								core.drawImage('sign', 'sign.png', 32 * x, 32 * y);
								break;
							}
						}
					}
				}
			}
		}

		this.clearCommentSign = function () {
			core.deleteCanvas('sign');
		}

		function pickComment(commentArr, showNum = 5) {
			let showList = [];
			if (commentArr.length <= showNum) { showList = commentArr; } else {
				for (let i = 0; i <= showNum - 1; i++) {
					const l = commentArr.length,
						n = core.plugin.dice(l - 1);
					showList.push(commentArr[n]);
					commentArr.splice(n, 1);
				}
			}
			return showList;
		}

		function drawComment(commentArr) {
			for (let i = 0, l = commentArr.length; i <= l - 1; i++) {
				core.plugin.addScrollingText(commentArr[i], {
					'x': WIDTH + 20 * Math.random(),
					'y': core.plugin.dice(i + 1) * HEIGHT / (l + 1) + 40 * Math.random(),
					'vx': -2 + Math.random(),
					'style': 'white',
					'font': '18px Verdana'
				});
			}
		}

		this.showComment = function (x, y) {
			if (!core.getFlag('comment') || core.isReplaying()) return;
			const commentCollection = core.getFlag('commentCollection', {});
			const floorId = core.status.floorId,
				str = x + ',' + y;
			if (commentCollection.hasOwnProperty(floorId) &&
				commentCollection[floorId].hasOwnProperty(str)) {
				let commentArr = commentCollection[floorId][str].concat();
				const showNum = 5;
				const commentArrPicked = pickComment(commentArr, showNum);
				drawComment(commentArrPicked);
			}
		}
	},
	"楼传判定": function () {

		function canMove(sx, sy, destX, destY) {
			let ans = -1;
			const canMoveArray = core.maps.generateMovableArray(),
				blocksObj = core.maps.getMapBlocksObj(),
				bgMap = core.maps.getBgMapArray();

			let visited = [], queue = [];
			visited[sx + "," + sy] = 0;
			queue.push(sx + "," + sy);

			while (queue.length > 0) {
				const now = queue.shift().split(","), x = parseInt(now[0]), y = parseInt(now[1]);
				for (let direction in core.utils.scan) {
					if (!core.inArray(canMoveArray[x][y], direction)) continue;
					const nx = x + core.utils.scan[direction].x,
						ny = y + core.utils.scan[direction].y,
						nindex = nx + "," + ny;
					if (visited[nindex]) continue;
					if (core.onSki(bgMap[ny][nx])) continue;
					if (!core.maps._canMoveDirectly_checkNextPoint(blocksObj, nx, ny)) continue;
					visited[nindex] = visited[now] + 1;
					if (destX === nx && destY === ny) {
						// 不可以绿点为终点
						const block = blocksObj[nx + "," + ny];
						if (['downFloor', 'upFloor'].includes(block.event.id)) {
							ans = visited[nindex];
						}
						else if (block && !block.disable && block.event.trigger) {
							ans = -1;
						} else {
							ans = visited[nindex];
						}
						return ans;
					}
					queue.push(nindex);
				}
			}
			if (ans === null || ans == undefined) ans[i] = -1;

			return ans;
		}

		/**
		 * 当前位置是否是楼层传送点
		 */  
		function isFlyPoint(x, y, blockId) {
			if (!['downFloor', 'upFloor'].includes(blockId)) return false;
			const floorId = core.status.floorId;
			let upFloorPoint = [-1, -1], downFloorPoint = [-1, -1];
			// 判断是否存在别的楼传落点
			if (blockId === 'upFloor') {
				if (core.floors[floorId].upFloor) {
					upFloorPoint = core.floors[floorId].upFloor;
					return (x === upFloorPoint[0] && y === upFloorPoint[1]);
				}
				else return true;
			}
			else if (blockId === 'downFloor') {
				if (core.floors[floorId].downFloor) {
					downFloorPoint = core.floors[floorId].downFloor;
					return (x === downFloorPoint[0] && y === downFloorPoint[1]);
				}
				else return true;
			}
		}

		/**
		 * 快捷商店不用楼传一次的条件：当前直接可达某个楼梯口
		 */
		this.canGoQuickShop = function () {
			const floorId = core.status.floorId;
			core.extractBlocks(floorId);
			const blocks = core.status.maps[floorId].blocks;
			return blocks.some((block) =>
				!block.disable && isFlyPoint(block.x, block.y, block.event.id)
				&& canMove(core.getHeroLoc('x'), core.getHeroLoc('y'),
					block.x, block.y) !== -1
			)
		}
	}
}