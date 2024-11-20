///<reference path="../types/core.d.ts" />
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
			//core.fillText('ui', '减伤', col2, position, null, f13);
			//core.fillText('ui', core.formatBigNumber(enemy.criticalDamage||0), col2 + 30, position, null, b13);
			//core.fillText('ui', '加防', col3, position, null, f13);
			//core.fillText('ui', core.formatBigNumber(enemy.defDamage||0), col3 + 30, position, null, b13);
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
	"drawLight": function () {

		// 绘制灯光/漆黑层效果。调用方式 core.plugin.drawLight(...)
		// 【参数说明】
		// name：必填，要绘制到的画布名；可以是一个系统画布，或者是个自定义画布；如果不存在则创建
		// color：可选，只能是一个0~1之间的数，为不透明度的值。不填则默认为0.9。
		// lights：可选，一个数组，定义了每个独立的灯光。
		//        其中每一项是三元组 [x,y,r] x和y分别为该灯光的横纵坐标，r为该灯光的半径。
		// lightDec：可选，0到1之间，光从多少百分比才开始衰减（在此范围内保持全亮），不设置默认为0。
		//        比如lightDec为0.5代表，每个灯光部分内圈50%的范围全亮，50%以后才开始快速衰减。
		// 【调用样例】
		// core.plugin.drawLight('curtain'); // 在curtain层绘制全图不透明度0.9，等价于更改画面色调为[0,0,0,0.9]。
		// core.plugin.drawLight('ui', 0.95, [[25,11,46]]); // 在ui层绘制全图不透明度0.95，其中在(25,11)点存在一个半径为46的灯光效果。
		// core.plugin.drawLight('test', 0.2, [[25,11,46,0.1]]); // 创建一个test图层，不透明度0.2，其中在(25,11)点存在一个半径为46的灯光效果，灯光中心不透明度0.1。
		// core.plugin.drawLight('test2', 0.9, [[25,11,46],[105,121,88],[301,221,106]]); // 创建test2图层，且存在三个灯光效果，分别是中心(25,11)半径46，中心(105,121)半径88，中心(301,221)半径106。
		// core.plugin.drawLight('xxx', 0.3, [[25,11,46],[105,121,88,0.2]], 0.4); // 存在两个灯光效果，它们在内圈40%范围内保持全亮，40%后才开始衰减。
		this.drawLight = function (name, color, lights, lightDec) {

			// 清空色调层；也可以修改成其它层比如animate/weather层，或者用自己创建的canvas
			var ctx = core.getContextByName(name);
			if (ctx == null) {
				if (typeof name == 'string')
					ctx = core.createCanvas(name, 0, 0, core.__PIXELS__, core.__PIXELS__, 98);
				else return;
			}

			ctx.mozImageSmoothingEnabled = false;
			ctx.webkitImageSmoothingEnabled = false;
			ctx.msImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;

			core.clearMap(name);
			// 绘制色调层，默认不透明度
			if (color == null) color = 0.9;
			ctx.fillStyle = "rgba(0,0,0," + color + ")";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			lightDec = core.clamp(lightDec, 0, 1);

			// 绘制每个灯光效果
			ctx.globalCompositeOperation = 'destination-out';
			lights.forEach(function (light) {
				// 坐标，半径，中心不透明度
				var x = light[0],
					y = light[1],
					r = light[2];
				// 计算衰减距离
				var decDistance = parseInt(r * lightDec);
				// 正方形区域的直径和左上角坐标
				var grd = ctx.createRadialGradient(x, y, decDistance, x, y, r);
				grd.addColorStop(0, "rgba(0,0,0,1)");
				grd.addColorStop(1, "rgba(0,0,0,0)");
				ctx.beginPath();
				ctx.fillStyle = grd;
				ctx.arc(x, y, r, 0, 2 * Math.PI);
				ctx.fill();
			});
			ctx.globalCompositeOperation = 'source-over';
			// 可以在任何地方（如afterXXX或自定义脚本事件）调用函数，方法为  core.plugin.xxx();
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
	"enemyLevel": function () {
		// 此插件将提供怪物手册中的怪物境界显示
		// 使用此插件需要先给每个怪物定义境界，方法如下：
		// 点击怪物的【配置表格】，找到“【怪物】相关的表格配置”，然后在【名称】仿照增加境界定义：
		/*
		 "level": {
			  "_leaf": true,
			  "_type": "textarea",
			  "_string": true,
			  "_data": "境界"
		 },
		 */
		// 然后保存刷新，可以看到怪物的属性定义中出现了【境界】。再开启本插件即可。

		// 是否开启本插件，默认禁用；将此改成 true 将启用本插件。
		var __enable = false;
		if (!__enable) return;

		// 这里定义每个境界的显示颜色；可以写'red', '#RRGGBB' 或者[r,g,b,a]四元数组
		var levelToColors = {
			"萌新一阶": "red",
			"萌新二阶": "#FF0000",
			"萌新三阶": [255, 0, 0, 1],
		};

		// 复写 _drawBook_drawName
		var originDrawBook = core.ui._drawBook_drawName;
		core.ui._drawBook_drawName = function (index, enemy, top, left, width) {
			// 如果没有境界，则直接调用原始代码绘制
			if (!enemy.level) return originDrawBook.call(core.ui, index, enemy, top, left, width);
			// 存在境界，则额外进行绘制
			core.setTextAlign('ui', 'center');
			if (enemy.specialText.length == 0) {
				core.fillText('ui', enemy.name, left + width / 2,
					top + 27, '#DDDDDD', this._buildFont(17, true));
				core.fillText('ui', enemy.level, left + width / 2,
					top + 51, core.arrayToRGBA(levelToColors[enemy.level] || '#DDDDDD'), this._buildFont(14, true));
			} else {
				core.fillText('ui', enemy.name, left + width / 2,
					top + 20, '#DDDDDD', this._buildFont(17, true), width);
				switch (enemy.specialText.length) {
					case 1:
						core.fillText('ui', enemy.specialText[0], left + width / 2,
							top + 38, core.arrayToRGBA((enemy.specialColor || [])[0] || '#FF6A6A'),
							this._buildFont(14, true), width);
						break;
					case 2:
						// Step 1: 计算字体
						var text = enemy.specialText[0] + "  " + enemy.specialText[1];
						core.setFontForMaxWidth('ui', text, width, this._buildFont(14, true));
						// Step 2: 计算总宽度
						var totalWidth = core.calWidth('ui', text);
						var leftWidth = core.calWidth('ui', enemy.specialText[0]);
						var rightWidth = core.calWidth('ui', enemy.specialText[1]);
						// Step 3: 绘制
						core.fillText('ui', enemy.specialText[0], left + (width + leftWidth - totalWidth) / 2,
							top + 38, core.arrayToRGBA((enemy.specialColor || [])[0] || '#FF6A6A'));
						core.fillText('ui', enemy.specialText[1], left + (width + totalWidth - rightWidth) / 2,
							top + 38, core.arrayToRGBA((enemy.specialColor || [])[1] || '#FF6A6A'));
						break;
					default:
						core.fillText('ui', '多属性...', left + width / 2,
							top + 38, '#FF6A6A', this._buildFont(14, true), width);
				}
				core.fillText('ui', enemy.level, left + width / 2,
					top + 56, core.arrayToRGBA(levelToColors[enemy.level] || '#DDDDDD'), this._buildFont(14, true));
			}
		}

		// 也可以复写其他的属性颜色如怪物攻防等，具体参见下面的例子的注释部分
		core.ui._drawBook_drawRow1 = function (index, enemy, top, left, width, position) {
			// 绘制第一行
			core.setTextAlign('ui', 'left');
			var b13 = this._buildFont(13, true),
				f13 = this._buildFont(13, false);
			var col1 = left,
				col2 = left + width * 9 / 25,
				col3 = left + width * 17 / 25;
			core.fillText('ui', '生命', col1, position, '#DDDDDD', f13);
			core.fillText('ui', core.formatBigNumber(enemy.hp || 0), col1 + 30, position, /*'red' */ null, b13);
			core.fillText('ui', '攻击', col2, position, null, f13);
			core.fillText('ui', core.formatBigNumber(enemy.atk || 0), col2 + 30, position, /* '#FF0000' */ null, b13);
			core.fillText('ui', '防御', col3, position, null, f13);
			core.fillText('ui', core.formatBigNumber(enemy.def || 0), col3 + 30, position, /* [255, 0, 0, 1] */ null, b13);
		}


	},
	"dynamicHp": function () {
		// 此插件允许人物血量动态进行变化
		// 原作：Fux2（老黄鸡）

		// 是否开启本插件，默认禁用；将此改成 true 将启用本插件。
		var __enable = false;
		if (!__enable) return;

		var speed = 0.05; // 动态血量变化速度，越大越快。

		var _currentHp = null;
		var _lastStatus = null;
		var _check = function () {
			if (_lastStatus != core.status.hero) {
				_lastStatus = core.status.hero;
				_currentHp = core.status.hero.hp;
			}
		}

		core.registerAnimationFrame('dynamicHp', true, function () {
			_check();
			if (core.status.hero.hp != _currentHp) {
				var dis = (_currentHp - core.status.hero.hp) * speed;
				if (Math.abs(dis) < 2) {
					_currentHp = core.status.hero.hp;
				} else {
					_currentHp -= dis;
				}
				core.setStatusBarInnerHTML('hp', _currentHp);
			}
		});
	},
	"multiHeros": function () {
		// 多角色插件
		// Step 1: 启用本插件
		// Step 2: 定义每个新的角色各项初始数据（参见下方注释）
		// Step 3: 在游戏中的任何地方都可以调用 `core.changeHero()` 进行切换；也可以 `core.changeHero(1)` 来切换到某个具体的角色上

		// 是否开启本插件，默认禁用；将此改成 true 将启用本插件。
		var __enable = false;
		if (!__enable) return;

		// 在这里定义全部的新角色属性
		// 请注意，在这里定义的内容不会多角色共用，在切换时会进行恢复。
		// 你也可以自行新增或删除，比如不共用金币则可以加上"money"的初始化，不共用道具则可以加上"items"的初始化，
		// 多角色共用hp的话则删除hp，等等。总之，不共用的属性都在这里进行定义就好。
		var hero1 = {
			"floorId": "MT0", // 该角色初始楼层ID；如果共用楼层可以注释此项
			"image": "brave.png", // 角色的行走图名称；此项必填不然会报错
			"name": "1号角色",
			"lv": 1,
			"hp": 10000, // 如果HP共用可注释此项
			"atk": 1000,
			"def": 1000,
			"mdef": 0,
			// "money": 0, // 如果要不共用金币则取消此项注释
			// "exp": 0, // 如果要不共用经验则取消此项注释
			"loc": { "x": 0, "y": 0, "direction": "up" }, // 该角色初始位置；如果共用位置可注释此项
			"items": {
				"tools": {}, // 如果共用消耗道具（含钥匙）则可注释此项
				// "constants": {}, // 如果不共用永久道具（如手册）可取消注释此项
				"equips": {}, // 如果共用在背包的装备可注释此项
			},
			"equipment": [], // 如果共用装备可注释此项；此项和上面的「共用在背包的装备」需要拥有相同状态，不然可能出现问题
		};
		// 也可以类似新增其他角色
		// 新增的角色，各项属性共用与不共用的选择必须和上面完全相同，否则可能出现问题。
		// var hero2 = { ...

		var heroCount = 2; // 包含默认角色在内总共多少个角色，该值需手动修改。

		this.initHeros = function () {
			core.setFlag("hero1", core.clone(hero1)); // 将属性值存到变量中
			// core.setFlag("hero2", core.clone(hero2)); // 更多的角色也存入变量中；每个定义的角色都需要新增一行

			// 检测是否存在装备
			if (hero1.equipment) {
				if (!hero1.items || !hero1.items.equips) {
					alert('多角色插件的equipment和道具中的equips必须拥有相同状态！');
				}
				// 存99号套装为全空
				var saveEquips = core.getFlag("saveEquips", []);
				saveEquips[99] = [];
				core.setFlag("saveEquips", saveEquips);
			} else {
				if (hero1.items && hero1.items.equips) {
					alert('多角色插件的equipment和道具中的equips必须拥有相同状态！');
				}
			}
		}

		// 在游戏开始注入initHeros
		var _startGame_setHard = core.events._startGame_setHard;
		core.events._startGame_setHard = function () {
			_startGame_setHard.call(core.events);
			core.initHeros();
		}

		// 切换角色
		// 可以使用 core.changeHero() 来切换到下一个角色
		// 也可以 core.changeHero(1) 来切换到某个角色（默认角色为0）
		this.changeHero = function (toHeroId) {
			var currHeroId = core.getFlag("heroId", 0); // 获得当前角色ID
			if (toHeroId == null) {
				toHeroId = (currHeroId + 1) % heroCount;
			}
			if (currHeroId == toHeroId) return;

			var saveList = Object.keys(hero1);

			// 保存当前内容
			var toSave = {};
			// 暂时干掉 drawTip 和 音效，避免切装时的提示
			var _drawTip = core.ui.drawTip;
			core.ui.drawTip = function () { };
			var _playSound = core.control.playSound;
			core.control.playSound = function () { }
			// 记录当前录像，因为可能存在换装问题
			core.clearRouteFolding();
			var routeLength = core.status.route.length;
			// 优先判定装备
			if (hero1.equipment) {
				core.items.quickSaveEquip(100 + currHeroId);
				core.items.quickLoadEquip(99);
			}

			saveList.forEach(function (name) {
				if (name == 'floorId') toSave[name] = core.status.floorId; // 楼层单独设置
				else if (name == 'items') {
					toSave.items = core.clone(core.status.hero.items);
					Object.keys(toSave.items).forEach(function (one) {
						if (!hero1.items[one]) delete toSave.items[one];
					});
				} else toSave[name] = core.clone(core.status.hero[name]); // 使用core.clone()来创建新对象
			});

			core.setFlag("hero" + currHeroId, toSave); // 将当前角色信息进行保存
			var data = core.getFlag("hero" + toHeroId); // 获得要切换的角色保存内容

			// 设置角色的属性值
			saveList.forEach(function (name) {
				if (name == "floorId");
				else if (name == "items") {
					Object.keys(core.status.hero.items).forEach(function (one) {
						if (data.items[one]) core.status.hero.items[one] = core.clone(data.items[one]);
					});
				} else {
					core.status.hero[name] = core.clone(data[name]);
				}
			});
			// 最后装上装备
			if (hero1.equipment) {
				core.items.quickLoadEquip(100 + toHeroId);
			}

			core.ui.drawTip = _drawTip;
			core.control.playSound = _playSound;
			core.status.route = core.status.route.slice(0, routeLength);

			// 插入事件：改变角色行走图并进行楼层切换
			var toFloorId = data.floorId || core.status.floorId;
			var toLoc = data.loc || core.status.hero.loc;
			core.insertAction([
				{ "type": "setHeroIcon", "name": data.image || "hero.png" }, // 改变行走图
				// 同层则用changePos，不同层则用changeFloor；这是为了避免共用楼层造成触发eachArrive
				toFloorId != core.status.floorId ? {
					"type": "changeFloor",
					"floorId": toFloorId,
					"loc": [toLoc.x, toLoc.y],
					"direction": toLoc.direction,
					"time": 0 // 可以在这里设置切换时间
				} : { "type": "changePos", "loc": [toLoc.x, toLoc.y], "direction": toLoc.direction }
				// 你还可以在这里执行其他事件，比如增加或取消跟随效果
			]);
			core.setFlag("heroId", toHeroId); // 保存切换到的角色ID
		}
	},
	"itemCategory": function () {
		// 物品分类插件。此插件允许你对消耗道具和永久道具进行分类，比如标记「宝物类」「剧情道具」「药品」等等。
		// 使用方法：
		// 1. 启用本插件
		// 2. 在下方数组中定义全部的物品分类类型
		// 3. 点击道具的【配置表格】，找到“【道具】相关的表格配置”，然后在【道具描述】之后仿照增加道具的分类：
		/*
		 "category": {
			  "_leaf": true,
			  "_type": "textarea",
			  "_string": true,
			  "_data": "道具分类"
		 },
		 */
		// （你也可以选择使用下拉框的方式定义每个道具的分类，写法参见上面的cls）
		// 然后刷新编辑器，就可以对每个物品进行分类了

		// 是否开启本插件，默认禁用；将此改成 true 将启用本插件。
		var __enable = false;
		if (!__enable) return;

		// 在这里定义所有的道具分类类型，一行一个
		var categories = [
			"宝物类",
			"辅助类",
			"技能类",
			"剧情道具",
			"增益道具",
		];
		// 当前选中的道具类别
		var currentCategory = null;

		// 重写 core.ui._drawToolbox 以绘制分类类别
		var _drawToolbox = core.ui._drawToolbox;
		core.ui._drawToolbox = function (index) {
			_drawToolbox.call(this, index);
			core.setTextAlign('ui', 'left');
			core.fillText('ui', '类别[E]：' + (currentCategory || "全部"), 15, this.PIXEL - 13);
		}

		// 获得所有应该在道具栏显示的某个类型道具
		core.ui.getToolboxItems = function (cls) {
			// 检查类别
			return Object.keys(core.status.hero.items[cls])
				.filter(function (id) {
					return !core.material.items[id].hideInToolbox &&
						(currentCategory == null || core.material.items[id].category == currentCategory);
				}).sort();
		}

		// 注入道具栏的点击事件（点击类别）
		var _clickToolbox = core.actions._clickToolbox;
		core.actions._clickToolbox = function (x, y) {
			if (x >= 0 && x <= this.HSIZE - 4 && y == this.LAST) {
				drawToolboxCategory();
				return;
			}
			return _clickToolbox.call(core.actions, x, y);
		}

		// 注入道具栏的按键事件（E键）
		var _keyUpToolbox = core.actions._keyUpToolbox;
		core.actions._keyUpToolbox = function (keyCode) {
			if (keyCode == 69) {
				// 按E键则打开分类类别选择
				drawToolboxCategory();
				return;
			}
			return _keyUpToolbox.call(core.actions, keyCode);
		}

		// ------ 以下为选择道具分类的相关代码 ------ //

		// 关闭窗口时清除分类选择项
		var _closePanel = core.ui.closePanel;
		core.ui.closePanel = function () {
			currentCategory = null;
			_closePanel.call(core.ui);
		}

		// 弹出菜单以选择具体哪个分类
		// 直接使用 core.drawChoices 进行绘制
		var drawToolboxCategory = function () {
			if (core.status.event.id != 'toolbox') return;
			var selection = categories.indexOf(currentCategory) + 1;
			core.ui.closePanel();
			core.status.event.id = 'toolbox-category';
			core.status.event.selection = selection;
			core.lockControl();
			// 给第一项插入「全部」
			core.drawChoices('请选择道具类别', ["全部"].concat(categories));
		}

		// 选择某一项
		var _selectCategory = function (index) {
			core.ui.closePanel();
			if (index <= 0 || index > categories.length) currentCategory = null;
			else currentCategory = categories[index - 1];
			core.openToolbox();
		}

		var _clickToolBoxCategory = function (x, y) {
			if (!core.status.lockControl || core.status.event.id != 'toolbox-category') return false;

			if (x < core.actions.CHOICES_LEFT || x > core.actions.CHOICES_RIGHT) return false;
			var choices = core.status.event.ui.choices;
			var topIndex = core.actions._getChoicesTopIndex(choices.length);
			if (y >= topIndex && y < topIndex + choices.length) {
				_selectCategory(y - topIndex);
			}
			return true;
		}

		// 注入点击事件
		core.registerAction('onclick', 'toolbox-category', _clickToolBoxCategory, 100);

		// 注入光标跟随事件
		core.registerAction('onmove', 'toolbox-category', function (x, y) {
			if (!core.status.lockControl || core.status.event.id != 'toolbox-category') return false;
			core.actions._onMoveChoices(x, y);
			return true;
		}, 100);

		// 注入键盘光标事件
		core.registerAction('keyDown', 'toolbox-category', function (keyCode) {
			if (!core.status.lockControl || core.status.event.id != 'toolbox-category') return false;
			core.actions._keyDownChoices(keyCode);
			return true;
		}, 100);

		// 注入键盘按键事件
		core.registerAction('keyUp', 'toolbox-category', function (keyCode) {
			if (!core.status.lockControl || core.status.event.id != 'toolbox-category') return false;
			core.actions._selectChoices(core.status.event.ui.choices.length, keyCode, _clickToolBoxCategory);
			return true;
		}, 100);

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

		// 
		// var noUpdate = false;
		////// 更新状态栏 ////// 不建议状态栏刷新后触发 容易导致录像不一致的问题
		//control.prototype.updateStatusBar = function (doNotCheckAutoEvents) {
		//	if (!core.isPlaying()) return;
		//	if (noUpdate) return;
		//	noUpdate = true;
		//	core.autoGetItem();
		//	noUpdate = false;
		//	this.controldata.updateStatusBar();
		//	if (!doNotCheckAutoEvents) core.checkAutoEvents();
		//	this._updateStatusBar_setToolboxIcon();
		//	core.clearRouteFolding();
		//}

		////// 每移动一格后执行的事件 //////
		/*
		control.prototype.moveOneStep = function (callback) {
			if (core.getBgNumber() != 6 || core.hasEquip('I932')) core.autoGetItem();
			return this.controldata.moveOneStep(callback);
		}
		*/

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
	"修复装备Bug": function () {
		return;
		// 修复以下两个关联Bug
		// 修复反复切换同孔装备会进录像的Bug（放录像时多次执行穿脱事件，导致录像不同步）
		// 修复回放时装备的穿脱事件延迟执行的Bug
		core.actions._clickEquipboxIndex = function (index) {
			if (index < this.LAST) {
				if (index >= core.status.globalAttribute.equipName.length) return;
				if (index == core.status.event.selection && core.status.hero.equipment[index]) {
					if (core.isReplaying()) return;
					core.unloadEquip(index);
					// core.status.route.push("unEquip:" + index);
				} else core.playSound('光标移动');
			} else {
				var equips = core.getToolboxItems('equips');
				if (index == core.status.event.selection) {
					if (core.isReplaying()) return;
					var equipId = equips[index - this.LAST + (core.status.event.data.page - 1) * this.LAST];
					core.loadEquip(equipId);
					// core.status.route.push("equip:" + equipId);
				} else core.playSound('光标移动');
			}
			core.ui._drawEquipbox(index);
		}
		this._afterLoadResources = function () {
			// 本函数将在所有资源加载完毕后，游戏开启前被执行
			// 可以在这个函数里面对资源进行一些操作，比如切分图片等。

			// 这是一个将assets.png拆分成若干个32x32像素的小图片并保存的样例。
			// var arr = core.splitImage("assets.png", 32, 32);
			// for (var i = 0; i < arr.length; i++) {
			//     core.material.images.images["asset"+i+".png"] = arr[i];
			// }

			// 道具的穿上/脱下，视为自动事件
			for (var i = 0; i < core.initStatus.autoEvents.length; i++) {
				if (core.initStatus.autoEvents[i].symbol.indexOf('equipEvent_') >= 0) {
					core.initStatus.autoEvents.splice(i, 1);
					i--;
				}
			}
			for (var equipId in core.material.items) {
				var equip = core.material.items[equipId];
				if (equip.cls != 'equips' || !equip.equip) continue;
				if (!equip.equip.equipEvent && !equip.equip.unequipEvent) continue;
				var equipFlag = '_equipEvent_' + equipId;
				var autoEvent1 = {
					symbol: "_equipEvent_" + equipId,
					currentFloor: false,
					multiExecute: true,
					condition: "core.hasEquip('" + equipId + "') && !core.hasFlag('" + equipFlag + "')",
					// ******************************************************************************************************************************************************** //
					data: core.precompile([{ "type": "setValue", "name": "flag:" + equipFlag, "value": "true" }, { "type": "function", "function": "function(){core.status.route.push('equip:" + equipId + "');}" }].concat(equip.equip.equipEvent || [])),
					// ******************************************************************************************************************************************************** //
				};
				var autoEvent2 = {
					symbol: "_unequipEvent_" + equipId,
					currentFloor: false,
					multiExecute: true,
					condition: "!core.hasEquip('" + equipId + "') && core.hasFlag('" + equipFlag + "')",
					// ******************************************************************************************************************************************************** //
					data: core.precompile([{ "type": "setValue", "name": "flag:" + equipFlag, "value": "null" }, { "type": "function", "function": "function(){if (!core.getEquip(" + (equip.equip.type || 0) + ")) core.status.route.push('unEquip:" + (equip.equip.type || 0) + "');}" }].concat(equip.equip.unequipEvent || [])),
					// ******************************************************************************************************************************************************** //
				};
				core.initStatus.autoEvents.push(autoEvent1);
				core.initStatus.autoEvents.push(autoEvent2);
			}
		}
		core.control._replayAction_equip = function (action) {
			if (action.indexOf("equip:") != 0) return false;
			var equipId = action.substring(6);
			var ownEquipment = core.getToolboxItems('equips');
			var index = ownEquipment.indexOf(equipId),
				per = core.__SIZE__ - 1;
			if (index < 0) return false;
			// core.status.route.push(action);
			if (core.material.items[equipId].hideInReplay || core.status.replay.speed == 24) {
				core.loadEquip(equipId, core.replay);
				return true;
			}
			core.status.event.data = { "page": Math.floor(index / per) + 1, "selectId": null };
			index = index % per + per;
			core.ui._drawEquipbox(index);
			setTimeout(function () {
				core.ui.closePanel();
				core.loadEquip(equipId, core.replay);
			}, core.control.__replay_getTimeout());
			return true;
		}
		core.control._replayAction_unEquip = function (action) {
			if (action.indexOf("unEquip:") != 0) return false;
			var equipType = parseInt(action.substring(8));
			if (!core.isset(equipType)) return false;
			core.ui._drawEquipbox(equipType);
			// core.status.route.push(action);
			if (core.status.replay.speed == 24) {
				core.unloadEquip(equipType, core.replay);
				return true;
			}
			setTimeout(function () {
				core.ui.closePanel();
				core.unloadEquip(equipType, core.replay);
			}, core.control.__replay_getTimeout());
			return true;
		}

		core.items._realLoadEquip = function (type, loadId, unloadId, callback) {
			var loadEquip = core.material.items[loadId] || {},
				unloadEquip = core.material.items[unloadId] || {};

			// --- 音效
			this._realLoadEquip_playSound();

			// --- 实际换装
			this._loadEquipEffect(loadId, unloadId);

			// --- 加减
			if (loadId) core.removeItem(loadId);
			if (unloadId) core.addItem(unloadId);
			core.status.hero.equipment[type] = loadId || null;

			// --- 提示
			if (loadId) core.drawTip("已装备上" + loadEquip.name, loadId);
			else if (unloadId) core.drawTip("已卸下" + unloadEquip.name, unloadId);

			if (core.isReplaying()) core.updateStatusBar();

			if (callback) callback();
		}

		core.control.registerReplayAction("equip", core.control._replayAction_equip);
		core.control.registerReplayAction("unEquip", core.control._replayAction_unEquip);
	},
	"战斗画面": function () {
		// 在此增加新插件

		const fontSize = 18; // 战斗角色名字的字体大小
		const bx = 36,
			by = 30 + fontSize * 3 / 4,
			size = 32;

		const strokeStyle = "#CC0099";

		//// 绘制战斗界面
		this.drawBattleUI = function (battleInfo) {
			if (!battleInfo) battleInfo = {};
			if (core.isReplaying()) return;

			const hero = battleInfo.hero,
				enemy = battleInfo.enemy;
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
			core.fillText(ctx, enemy.name, bx + size / 2, by - fontSize * 3 / 4, "white", font);
			core.fillText(ctx, "VS", width / 2, by - fontSize * 3 / 4, "white", "Bold Italic 24px Verdana");
			core.setTextAlign(ctx, "left");

			// 绘制属性
			core.fillText(ctx, '体力：', tx, ty, "white", textFont);
			core.fillText(ctx, '攻击力：', tx, ty + textFontSize + lineHeight, "white", textFont);
			core.fillText(ctx, '防御力：', tx, ty + 2 * (textFontSize + lineHeight), "white", textFont);
			core.fillText(ctx, '疲劳：', tx, ty + 3 * (textFontSize + lineHeight), "white", textFont);
			core.fillText(ctx, '气息：', tx - 50, ty + 4 * (textFontSize + lineHeight), "white", textFont);

			core.setTextAlign(ctx, "left");
			core.fillText(ctx, enemy.totalFatigue, tx - 30, ty + 3 * (textFontSize + lineHeight),
				"orange", 'Bold 12px Arial');
			core.setTextAlign(ctx, "right");
			if (enemy.hasMisfortune) {
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
			else if (defBuff < 0) core.fillText(ctx, '-' + -defBuff.toString(), 260, 100, "red", '8px Verdana');

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

			drawMana();

			// 绘制气息条
			function drawMana() {
				const enemyManaRatio = (enemy.manamax === 0) ? 0 : enemy.mana / enemy.manamax,
					heroManaRemainder = (hero.mana) % (hero.permana);
				let heroManaRatio = heroManaRemainder / hero.permana;
				if (hero.mana >= hero.manamax) heroManaRatio = 1;
				core.strokeRoundRect(ctx, tx, ty + 4 * (textFontSize + lineHeight) - 8, 60, 8, 2, 'yellow', 1);
				core.fillRoundRect(ctx, tx + 1, ty + 4 * (textFontSize + lineHeight) - 7,
					enemyManaRatio * 58, 6, 2, 'LightGreen ')
				core.strokeRoundRect(ctx, width - tx, ty + 4 * (textFontSize + lineHeight), 60, 8, 2, 'yellow', 1);
				core.fillRoundRect(ctx, width - tx + 1, ty + 4 * (textFontSize + lineHeight) + 1,
					heroManaRatio * 58, 6, 2, 'LightGreen ')
			}
		}

		//// 绘制敌人动态图像和动态的火焰图标
		this.drawBattleIcon = function (battleInfo, count) {
			if (!battleInfo) return;
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

			const hero = battleInfo.hero,
				enemy = battleInfo.enemy;
			const textFontSize = 14,
				tx = bx + size + 8,
				ty = by + 10 + textFontSize * 3 / 4,
				lineHeight = 10;
			const block = core.getBlockInfo(enemy.id || "greenSlime");
			const b_width = 32,
				b_height = block.height;
			let animate = block.animate;
			let enemyType = "enemys";
			const b_pos = block.posY;
			const enemyImage = core.material.images[enemyType];

			// 绘制敌人
			core.drawImage(ctx, enemyImage, (count % 2) * b_width, b_pos * b_height, b_width, b_height, bx, by, size, size);
			core.strokeRect(ctx, bx, by, size, size, strokeStyle, 2);

			const fireCount = (hero.mana - (hero.mana) % (hero.permana)) / hero.permana,
				image = 'tinyFire' + (count % 3 + 1).toString() + '.png'
			if (fireCount >= 1)
				core.drawImage(ctx, image, width - tx, ty + 3 * (textFontSize + lineHeight) + 5);
			if (fireCount >= 2)
				core.drawImage(ctx, image, width - tx + 12, ty + 3 * (textFontSize + lineHeight) + 5);
			if (fireCount >= 3)
				core.drawImage(ctx, image, width - tx + 24, ty + 3 * (textFontSize + lineHeight) + 5);
			if (fireCount >= 4)
				core.drawImage(ctx, image, width - tx + 36, ty + 3 * (textFontSize + lineHeight) + 5);
			if (fireCount >= 5)
				core.drawImage(ctx, image, width - tx + 48, ty + 3 * (textFontSize + lineHeight) + 5);

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

		//// 绘制技能图标
		this.drawSkillIcon = function (battleInfo) {
			if (!battleInfo) return;
			const swordSkill = battleInfo.swordSkill,
				shieldSkill = battleInfo.shieldSkill,
				crit = (swordSkill === 'c');
			const ctx = core.createCanvas("skillIcon", 40, 320, 330, 32, 68);
			ctx.canvas.style.backgroundColor = "gray";
			ctx.canvas.style.backgroundImage = "url(project/images/ground.png)";
			core.setTextAlign(ctx, "center");
			core.strokeRect(ctx, 1, 1, 328, 30, strokeStyle, 2);
			const start = 20,
				interval = 32;
			core.drawImage(ctx, 'yellowBall.png', start, 0);
			core.drawImage(ctx, 'yellowBall.png', start + interval, 0);
			core.drawImage(ctx, 'yellowBall.png', start + 2 * interval, 0);
			core.drawImage(ctx, 'yellowBall.png', start + 3 * interval, 0);
			core.drawImage(ctx, 'yellowBall.png', start + 4 * interval, 0);
			core.drawImage(ctx, 'yellowBall.png', start + 5 * interval, 0);
			core.drawImage(ctx, 'yellowBall.png', start + 6 * interval, 0);
			core.drawImage(ctx, 'yellowBall.png', start + 7 * interval, 0);
			core.drawImage(ctx, 'yellowBall.png', start + 8 * interval, 0);
			if (core.hasItem('I325')) {
				core.drawIcon(ctx, 'I315', start + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I319', start + interval + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I318', start + 2 * interval + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I317', start + 3 * interval + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I316', start + 4 * interval + 5, 6, 20, 20);
			} else if (core.hasItem('I327')) {
				core.drawIcon(ctx, 'I339', start + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I321', start + interval + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I375', start + 2 * interval + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I322', start + 3 * interval + 5, 6, 20, 20);
				core.drawIcon(ctx, 'I320', start + 4 * interval + 5, 6, 20, 20);
			}
			core.drawImage(ctx, 'pong.png', start + 7 * interval + 3, 2, 28, 28);
			core.drawImage(ctx, 'iconBreathe.png', start + 8 * interval + 4, 4, 24, 24);
			if (swordSkill && swordSkill !== 'c')
				core.fillText(ctx, 'OK', start + 5 * interval + 16, 21, 'green', 'Bold 14px Arial');
			else core.drawImage(ctx, 'iconSword.png', start + 5 * interval + 6, 6, 20, 20);
			if (shieldSkill)
				core.fillText(ctx, 'OK', start + 6 * interval + 16, 21, 'green', 'Bold 14px Arial');
			else core.drawImage(ctx, 'iconShield.png', start + 6 * interval + 6, 6, 20, 20);
			if (crit) core.fillText(ctx, 'OK', start + 7 * interval + 14, 21, 'green', 'Bold 14px Arial');
			else core.fillText(ctx, 'C', start + 7 * interval + 16, 21, 'red', 'Bold 14px Arial');
			core.fillText(ctx, core.getFlag('deepBreath', 5).toString(), start + 8 * interval + 16, 19, 'blue', 'Bold 10px Arial');
		}

		//// 绘制底边栏
		this.drawBattleBottomBar = function (battleInfo, h) {
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
				core.fillText(ctx, battleInfo.enemy.money.toString(), 150, 26, "gold", "20px Verdana");
				core.fillText(ctx, battleInfo.enemy.exp.toString(), 270, 26, "cyan", "20px Verdana");
			}
		}

		this.drawBattleHint = function () {
			if (core.isReplaying()) return;
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

		this.drawBattleAnimate = function (battle, currDelay) {
			const atkStatusH = battle.hero.atkStatus,
				atkStatusE = battle.enemy.atkStatus,
				combo = battle.enemy.combo;

			if (battle.turn % (combo + 1) === 1) {
				let damageH = atkStatusH.damage.toString();
				if (atkStatusH.freeze) { } else {
					if (atkStatusH.skill === 'c') damageH += 'crit';
					if (atkStatusH.miss) damageH = 'miss';
					core.plugin.drawBattleUI(battle);
					if (currDelay > 100) {
						core.plugin.drawAnimateByPixel(atkStatusH.animate, 60, 166);
						core.plugin.addScrollingText(damageH, {
							'x': 54,
							'y': 180,
							'vy': 1,
							'style': 'Tomato',
							'font': 'Bold 18px Arial',
							'tmax': 50,
							'type': 'down'
						})
					}
				}

			} else {
				if (atkStatusE.freeze) { } else {
					let damageE = atkStatusE.damage.toString(),
						princessDamageE = atkStatusE.princessDamage.toString();
					if (atkStatusE.crit) {
						damageE += 'crit';
						princessDamageE += 'crit';
					}
					if (atkStatusE.miss) {
						damageE = 'miss';
						princessDamageE = 'miss';
					}
					core.plugin.drawBattleUI(battle);
					if (currDelay > 100) {
						if (atkStatusE.aim === 'hero' || atkStatusE.aim === 'all') {
							core.plugin.drawAnimateByPixel(atkStatusE.animate, 355, 152);
							core.plugin.drawAnimateByPixel(atkStatusE.heroAnimate, 355, 152);
							core.plugin.addScrollingText(damageE, {
								'x': 350,
								'y': 180,
								'vy': 1,
								'style': 'Tomato ',
								'font': 'Bold 18px Arial',
								'tmax': 50,
								'type': 'down'
							})
						}
						if (atkStatusE.aim === 'princess' || atkStatusE.aim === 'all') {
							core.plugin.drawAnimateByPixel(atkStatusE.animate, 245, 225);
							core.plugin.addScrollingText(princessDamageE, {
								'x': 220,
								'y': 250,
								'vy': 1,
								'style': 'Tomato ',
								'font': 'Bold 18px Arial',
								'tmax': 50,
								'type': 'down'
							})
						}
						if (atkStatusE.aim === 'lastBoss') { // 古顿的伤害动画单独处理
							let bounceDamage = atkStatusE.bounceDamage,
								currstr = '',
								count = 0;
							let bounce = setInterval(function () {
								currstr = bounceDamage[count].toString();
								if (atkStatusE.crit) {
									currstr += 'crit';
								}
								if (atkStatusE.miss) {
									currstr = 'miss';
								}
								core.plugin.addScrollingText(currstr, {
									'x': (count % 2 === 0) ? 350 : 220,
									'y': (count % 2 === 0) ? 180 : 250,
									'vy': 1,
									'style': 'Tomato ',
									'font': 'Bold 18px Arial',
									'tmax': 100,
									'type': 'down'
								});
								count++;
								if (count >= 4) clearInterval(bounce);
							}, 50)
						}
					}
				}
			}
		}

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
			// console.log(px + "," + py);
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
	"跳字插件": function () {
		// 在此增加新插件

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

		this.f2 = function () { console.log(sTextList) };

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

		this.f1 = function () {
			core.plugin.addScrollingText('100', {
				'x': 48,
				'y': 180,
				'vy': 1,
				'style': 'red',
				'font': 'Bold 18px Arial',
				'tmax': 50,
				'type': 'down'
			})
		}

		function updateScrollingText() {
			sTextList.forEach(function (currText) {
				switch (currText.type) {
					case 'line':
						currText.x += currText.vx;
						currText.y += currText.vy;
						break;
					case 'projectile':
						currText.x += currText.vx;
						currText.y += currText.vy;
						currText.vy += gravity;
						break;
					case 'down':
						if (currText.t < currText.tmax / 2) {
							currText.x += currText.vx;
							currText.y += currText.vy;
						} else {
							if (currText.alpha > 0.05)
								currText.alpha -= 0.05;
						}
				}
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
			sTextList = new Set([]);
		}

		let currTime = 0;

		core.registerAnimationFrame('scrollText', true, function (timestamp) {
			if (core.isReplaying()) return;
			if (!core.getFlag('popDamage')) return;
			if (timestamp - currTime < 10) return;
			currTime = timestamp;
			if (!core.dymCanvas[canvas]) {
				core.ui.createCanvas(canvas, 0, 0, core.__PIXELS__, core.__PIXELS__, 150);
			}
			updateScrollingText();
			drawScrollingText();
		})

	},
	"切装事件": function () {
		// 在此增加新插件
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

			//this._realLoadEquip(equipType, null, unloadEquipId, callback);
		}

	},
	"自定义设置": function () {
		// 在此增加新插件

		let settingIndex = 0;
		let settings = [{
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
		]

		function drawSetting_drawOne(index, ctx) {
			core.ui.fillText(ctx, settings[index].name + '：' + settings[index].status(),
				settings[index].x, settings[index].y, 'white', '14px Verdana');
		}

		function drawSetting(ctx) {
			core.createCanvas(ctx, 0, 0, core.__PIXELS__, core.__PIXELS__, 180);
			core.clearMap(ctx);
			core.setAlpha(ctx, 0.85);
			core.strokeRoundRect(ctx, 32, 32, core.__PIXELS__ - 64, core.__PIXELS__ - 64, 5, "#fff", 2);
			core.fillRoundRect(ctx, 32, 32, core.__PIXELS__ - 61.5, core.__PIXELS__ - 61.5, 5, "gray");
			core.setAlpha(ctx, 1);
			core.strokeRoundRect(ctx, 35, 55, core.__PIXELS__ - 70, 55, 3, "white");
			core.fillRoundRect(ctx, 35.5, 56, core.__PIXELS__ - 71, 53, 3, "#555555");
			core.ui.fillText(ctx, "设置", 180, 50, 'white', '20px hkbdt');
			core.ui.drawTextContent(ctx, settings[settingIndex].text, {
				left: 40,
				top: 60,
				bold: false,
				color: "white",
				align: "left",
				fontSize: 12,
				maxWidth: 340
			});
			for (let i = 0, l = settings.length; i < l; i++) { drawSetting_drawOne(i, ctx); }
			core.ui.fillText(ctx, "--常用设置--", 40, 130, '#FFE4B5', '16px Verdana');
			core.ui.fillText(ctx, '[退出]', 340, 375, '#FFE4B5', '14px Verdana');
			drawSettingSelector();
		}

		function drawSettingSelector() {
			core.drawUIEventSelector(0, "winskin.png", settings[settingIndex].x, settings[settingIndex].y - 14, 150, 20, 181);
		}

		// 判断当前该选项是否可使用
		function isSettingAvailable(i) {
			if (i <= 10) return true;
			switch (core.getFlag('specialEnd', 0)) {
				case 2:
					if (i === 11) return true;
					break;
				case 3:
					if (i === 12) return true;
					break;
			}
			return false;
		}

		function showSetting(goDirction) {

			settingIndex = 0;
			const ctx = 'setting',
				name = 'settingChange';
			drawSetting(ctx);
			return new Promise(function (res) {

				function keyup(keycode) {
					// 处理按键事件
					switch (keycode) {
						case 13:
						case 32:
						case 67: //回车，空格，C键
							core.status.route.push('cSet:' + settingIndex);
							settings[settingIndex].func();
							drawSetting(ctx);
							break;
						case 27: //Esc
							cancel();
							break;
						case 37: // 左
							if (settingIndex >= 9) settingIndex = 0;
							drawSetting(ctx);
							break;
						case 38: // 上
							if (settingIndex >= 1) {
								if (settingIndex <= 11) settingIndex -= 1;
								else settingIndex = 10;
							}
							drawSetting(ctx);
							break;
						case 39: // 右
							if (settingIndex <= 8) settingIndex = 9;
							drawSetting(ctx);
							break;
						case 40: // 下
							if (settingIndex < 10) settingIndex += 1;
							else {
								switch (core.getFlag('specialEnd', 0)) {
									case 2:
										if (settingIndex === 10) settingIndex = 11;
										break;
									case 3:
										if (settingIndex === 10) settingIndex = 12;
										break;
									default:
										break;
								}
							}
							drawSetting(ctx);
							break;
					}
				}

				function click(x, y, px, py) {
					// 处理点击事件
					if (px >= 345 && px <= 380 && py >= 365 && py <= 375) { cancel(); }
					for (let i = 0, l = settings.length; i < l; i++) {
						if (px >= settings[i].x && px <= settings[i].x + 150 && py >= settings[i].y - 14 && py <= settings[i].y + 6) {
							if (i === settingIndex) {
								core.status.route.push('cSet:' + settingIndex);
								settings[settingIndex].func();
							} else {
								settingIndex = i;
							}
							drawSetting(ctx);
							break;
						}
					}

				}

				function finish(confirm) {
					// 清除画面，销毁事件监听器
					core.unregisterAction('onclick', name);
					core.unregisterAction('keyUp', name);
					// 等待本次事件处理完全结束
					res(confirm);
				}

				function cancel() {
					core.clearMap(ctx);
					core.clearUIEventSelector(0);
					finish(false);
				}

				core.registerAction('ondown', name, click, 100);
				core.registerAction('keyUp', name, keyup, 100);
			});
		}

		this.changeSetting = function () {
			if (core.isReplaying()) return;
			core.setFlag('noOpenMenu', true);
			//禁止Esc打开菜单栏
			core.lockControl();

			showSetting().then(() => {
				core.unlockControl();
				core.setFlag('noOpenMenu', false);
			});
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
	"成就": function () {
		// 在此增加新插件

		const PX = core.__PIXELS__,
			PY = core.__PIXELS__;

		//， 成就界面
		let // 成就列表 0索引 1名称 2完成前描述 3完成后的描述 4完成情况 （0为未完成 1-完成）
			type = 1, // 当前类型
			first = 0, // 成就栏中显示的第一个成就的数组索引
			point = 0; //完成的成就数
		// 定义成就
		const list = [
			[0, "幻之虹币", "传说白银一族至高之宝，获得者将会得到白银怪物的无限祝福..."],
			[1, "白银狙击手", "白银怪物？在我面前不值一提！"],
			[2, "大难不死", "哇...不怕不怕..."],
			[3, "肉盾", "一打十根本不成问题的呢"],
			[4, "起死回生", "我感觉死去活来！！"],
			[5, "炼金术师", "什么？我刚刚有撞到什么吗？硬硬的"],
			[6, "冰冷的人", "不要离我这么远嘛...虽然我的身体很冰..."],
			[7, "命运窥视者", "我从水晶球中看到我的命运了...什么？！这水晶球不是这样使用的吗？"],
			[8, "攻击姿态", "再硬的东西我都打得破！来试试看吧！"],
			[9, "防守姿态", "有人能打破我的防守吗？"],
			[10, "熔炉", "有了这东西打白银怪物就很有效率了"],
			[11, "冰冷的手", "呼...手很冰..."],
			[12, "三相之力", "白银怪物？杀个稀巴烂！"],
			[13, "剑大师", "我的剑技很华丽吧"],
			[14, "盾大师", "你有什么方法攻击我都有方法防守！"],
			[15, "捐血站", "卖血！卖血！有人买吗？"],
			[16, "持匙人", "这些锁匙是开哪些门的？"],
			[17, "健谈的人", "我真的很喜欢跟别人说个不停，不好了！忘了要先做正经事..."],
			[18, "一代宗师", "我要开班授徒的话有人会来加入吗？"],
			[19, "宝石矿工", "干了这么久矿工，终于发现好东西了～～"],
			[20, "国家大事", "什么事都不比国家大事重要吧！"],
			[21, "职业冒险家", "去冒险就是要做足准备！"],
			[22, "开采矿工", "嗄嗄...采矿其实颇辛苦的"],
			[23, "心灵相通", "我知道你在想什么！"],
			[24, "天上之住民", "传说以前的人都是能在空中飞翔的"],
			[25, "透视", "嘻嘻...什么都看到了..."],
			[26, "小叮当", "你其实是小叮当吧？！"],
			[27, "异常状态", "初尝异常状态...感觉不错(嗯)"],
			[28, "攻略本", "你一定是看着攻略玩的！"],
			[29, "神之防护", "我的防御像神一般！直到我中了一箭..."],
			[30, "出门靠朋友", "在家靠父母，出门靠朋友！"],
			[31, "投入战斗", "热身差不多完毕了！！"],
			[32, "见习剑士", "真想快点试试学到的剑术！"],
			[33, "防守入门", "防守？是这样这样的吗？"],
			[34, "圣水加护", "感谢圣水的帮助！"],
			[35, "圣神的加护", "我简直像受到圣神般的帮助"],
			[36, "弑神者", "遇神杀神！！谁也阻不到我！"],
			[37, "勇者斗恶龙", "这是传说中的恶龙吗？太强大了"],
			[38, "智能施法", "用技也要用得有技巧有智慧！你说对不？"],
			[39, "我不打了！", "很麻烦！我不打了！！！！！！！！！！！"],
			[40, "病入膏肓", "谁可来救救我.....啊！原来我袋中有药..."],
			[41, "凝神储息", "......暂先时不要影响我......"],
			[42, "大屠杀", "杀啊杀啊，所有怪物都逃不出我的手掌心！哈哈"],
			[43, "学有所成", "只学不实践的话还是不太足够吧？"],
			[44, "守财奴", "钱要用才是钱！钱！"],
		];
		const defaultList = Array(list.length).fill(0);

		// 统计已完成成就数量
		function getAchPoint(finish) {
			let point = 0;
			for (let i = 0; i < list.length; i++) {
				// 获得完成情况
				if (finish[i] > 0) { point++; }
			}
			return point;
		}

		// 重置成就获得情况
		this.resetFinish = function () {
			if (core.isReplaying()) return;
			core.setLocalStorage("finish", defaultList);
			core.playSound('achievement.mp3');
			core.drawTip('成就已清空！');

		}

		this.hasAchievement = function (index) {
			if (core.isReplaying()) return false;
			let finish = core.getLocalStorage("finish", defaultList); // 完成情况
			return finish[index] > 0;
		}

		// 获得成就
		this.getAchievement = function (index, test) {
			if (core.hasFlag("debug") || core.isReplaying()) return;
			let finish = core.getLocalStorage("finish", defaultList); // 完成情况
			if (finish[index] > 0 && !test) return; // 成就已完成
			finish[index] = 1;
			core.setLocalStorage("finish", finish);

			function effect() {
				const canvas = "achievementEffect";
				core.playSound('achievement.mp3');
				core.createCanvas(canvas, 0, 0, PX, PY, 200);
				core.setTextAlign(canvas, "center");
				core.drawWindowSkin("winskin.png", canvas,
					140 * 13 / 15, 80 * 13 / 15, 200 * 13 / 15, 100 * 13 / 15);
				core.drawIcon(canvas, 'N454', 126, 80)
				core.fillText(canvas, "获得成就", 250 * 13 / 15, 120 * 13 / 15,
					"cyan", "24px " + core.status.globalAttribute.font);
				core.fillText(canvas, list[index][1], 240 * 13 / 15, 160 * 13 / 15,
					"#FFFFFF", "20px " + core.status.globalAttribute.font);
				let fade = setTimeout(function () {
					delete core.animateFrame.asyncId[fade];
					clearInterval(fade);
					core.deleteCanvas(canvas);
				}, 1000);
				core.animateFrame.asyncId[fade] = true;

			}
			effect();
		};

		// 绘制成就页面
		this.drawAchievement = function () {
			let finish = core.getLocalStorage("finish", defaultList); // 完成情况
			// 创建和清空画布
			core.createCanvas("achievement", 0, 0, PX, PY, 130);
			core.clearMap("achievement");
			core.drawWindowSkin("winskin.png", "achievement", 0, 0, PX, PY)
			// 背景
			core.fillRect("achievement", 0, 0, PX, PY, [0, 0, 0, 0.9]);
			core.drawLine("achievement", 0, 70, PX, 70, "#BBBBBB", 3);
			core.drawLine("achievement", 0, 121, PX, 121, "#BBBBBB", 1);
			core.drawLine("achievement", 0, 173, PX, 173, "#BBBBBB", 1);
			core.drawLine("achievement", 0, 225, PX, 225, "#BBBBBB", 1);
			core.drawLine("achievement", 0, 277, PX, 277, "#BBBBBB", 1);
			core.drawLine("achievement", 0, 329, PX, 329, "#BBBBBB", 1);
			core.drawLine("achievement", 0, 381, PX, 381, "#BBBBBB", 3);
			core.setTextAlign("achievement", "center");
			core.fillText("achievement", "名称", 28, 65, "#FFFFFF", "15px " + core.status.globalAttribute.font);
			core.fillText("achievement", "描述", 217, 65, "#FFFFFF", "15px " + core.status.globalAttribute.font);
			core.fillText("achievement", "完成情况", 377, 65, "#FFFFFF", "15px " + core.status.globalAttribute.font);
			core.setTextAlign("achievement", "left");
			core.fillText("achievement", "当前成就完成：" + getAchPoint(finish) + '/20', 234, 401, "#FFFFFF", "18px " + core.status.globalAttribute.font);
			core.fillText("achievement", "↓", 165, 401, "#FFFFFF", "20px " + core.status.globalAttribute.font);
			core.fillText("achievement", "↑", 199, 401, "#FFFFFF", "20px " + core.status.globalAttribute.font);
			// 绘制成就类型

			core.fillText("achievement", "成就一览", 180, 43, [255, 255, 255, 1], "22px " + core.status.globalAttribute.font);
			core.fillText("achievement", "[退出]", 350, 43, [255, 255, 255, 1], "18px " + core.status.globalAttribute.font);

			// 绘制成就信息
			function drawDetail(achType) {
				for (let i = first; i < 6 + first; i++) {
					if (achType[i] == null) break;
					// 名称
					core.setTextAlign("achievement", "left");
					if (finish[i] === 0) {
						core.fillText("achievement", achType[i][1], 9, 52 * (i - first) + 104, [200, 200, 200, 0.6], "20px " + core.status.globalAttribute.font, 120);
					} else {
						core.fillText("achievement", achType[i][1], 9, 52 * (i - first) + 104, "#FFFFFF", "20px " + core.status.globalAttribute.font, 120);
					}
					// 说明
					if (finish[i] === 0) {
						let config = {
							left: 129,
							top: 52 * (i - first) + 89,
							maxWidth: 227,
							color: [200, 200, 200, 0.5],
							fontSize: 15,
						},
							height = core.getTextContentHeight(achType[i][2], config);
						if (height > 25) {
							config.top -= 10;
						}
						core.drawTextContent("achievement", achType[i][2], config);
					} else { // 自动放缩
						let config = {
							left: 129,
							top: 52 * (i - first) + 89,
							maxWidth: 227,
							color: "#FFFFFF",
							fontSize: 15,
						},
							height = core.getTextContentHeight(achType[i][2], config);
						if (height > 25) {
							config.top -= 10;
						}
						core.drawTextContent("achievement", achType[i][2], config);
					}
					// 成就点
					core.setTextAlign("achievement", "center");
					if (finish[i] === 0) {
						core.fillText("achievement", '-', 377, 52 * (i - first) + 104, [200, 200, 200, 0.6], "18px " + core.status.globalAttribute.font);
					} else {
						const str = 'clear';
						const color = 'cyan';
						core.fillText("achievement", str, 377, 52 * (i - first) + 100, color, "18px " + core.status.globalAttribute.font);
					}
				}
			}
			drawDetail(list);
		};
		// 键盘操作
		this.achKeyboardAction = function (keycode) {
			switch (keycode) {
				case 38: // Up
					if (first !== 0) {
						first--;
					} else { }
					break;
				case 40: // Down
					if (first <= list.length - 7) first++;
					break;
				case 27: // Esc
					core.insertAction({ "type": "break" });
					break;
				case 88: // X
					core.insertAction({ "type": "break" });
					break;
				case 13: // Enter
					core.insertAction({ "type": "break" });
					break;
			}
		};
		// 点击操作
		this.achClickAction = function (px, py) {
			if (px >= 147 && px <= 182 && py >= 377 && py <= 402) { // 下翻
				if (first <= list.length - 7) first++;
			} else if (px >= 191 && px <= 225 && py >= 377 && py <= 402) { // 上翻
				if (first != 0) {
					first--;
				}
			} else {
				if (px >= 350 && px <= 400 && py >= 25 && py <= 45) { // 退出
					core.insertAction({ "type": "break" });
				}
			}
		};
		// 玩家操作
		this.achievementAction = function () {
			if (flags.type == 0) return this.achKeyboardAction(flags.keycode);
			else return this.achClickAction(flags.px, flags.py);
		};
		// 打开成就页面
		this.achievement = function () {
			core.insertAction([{
				"type": "while",
				"condition": "true",
				"data": [
					{ "type": "function", "function": "function () { core.plugin.drawAchievement(); }" },
					{ "type": "wait" },
					{ "type": "function", "function": "function() { core.plugin.achievementAction(); }" }
				]
			},
			{
				"type": "function",
				"function": "function () { core.deleteCanvas('achievement'); core.ui.clearUIEventSelector(); }"
			}
			]);
		}

	},
	"战后事件": function () {

		// 执行战后事件
		this.afterBattleInTurn = function (battle) {
			const hero = battle.hero,
				enemy = battle.enemy,
				money = enemy.money,
				exp = enemy.exp,
				damage = enemy.totalDamage,
				x = enemy.x,
				y = enemy.y,
				special = enemy.special;
			core.status.hero.money += money;
			core.status.hero.statistics.money += money;
			core.status.hero.exp += exp;
			core.status.hero.statistics.exp += exp;
			core.status.hero.statistics.battleDamage += damage;
			core.status.hero.statistics.battle++;

			let todo = [];
			// 战后事件
			if (core.status.floorId != null) {
				core.push(todo, core.floors[core.status.floorId].afterBattle[x + "," + y]);
			}
			core.push(todo, enemy.afterBattle);

			// 如果事件不为空，将其插入
			if (todo.length > 0) core.insertAction(todo, x, y);

			if (hero.hp < 200 || hero.hpmax < 50) core.plugin.getAchievement(2);
			if (hero.smartCast) core.plugin.getAchievement(17);

			if (core.hasSpecial(enemy.special, 20)) { //白银怪，掉落钱币
				if (enemy.id == 'swordEmperor') core.setBlock(398, x, y);
				if (enemy.id == 'goldHornSlime') core.setBlock(400, x, y);
				if (enemy.id == 'whiteHornSlime') core.setBlock(403, x, y);
				if (enemy.id == 'silverSlime') core.setBlock(407, x, y);
			} else if (core.hasSpecial(enemy.special, 23)) { // 重生怪
				if (enemy.id == 'E384') core.setBlock(385, x, y);
				if (enemy.id == 'darkKnight') core.setBlock(225, x, y);
				if (enemy.id == 'soldier') core.setBlock(212, x, y);
			} else if (core.hasSpecial(enemy.special, 70)) { //炎之身体，变熔岩
				core.setBlock(11, x, y);
			} else if (core.hasSpecial(enemy.special, 71)) { //极寒身体，变冰块
				core.setBlock(374, x, y);
			} else if (enemy.magicIce) {
				core.setBlock(25, x, y); //掉落魔法冰块
			} else {
				core.removeBlock(x, y, core.status.floorId);
			}
			if (core.hasFlag('poison') || core.hasFlag('weak')) core.plugin.getAchievement(27);
			if (core.hasSpecial(enemy.special, 72) || core.hasSpecial(enemy.special, 73)) { //烈焰身体，极寒身体
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
	},
	"战斗过程": function () {
		// 在此增加新插件

		const abbreviateList = { 'b': 'I315', 's': 'I319', 'd': 'I318', 'h': 'I317', 'k': 'I316', 'M': 'I339', 'C': 'I321', 'R': 'I375', 'F': 'I322', 'E': 'I320', };

		class GameCore {
			constructor(enemy) {
				this.isBattleEnd = false;
				this.turn = 0; //当前回合数
				this.hero = {
					'hp': core.status.hero.hp,
					'atk': core.status.hero.atk,
					'def': core.status.hero.def,
					'mdef': core.status.hero.mdef, //公主的魔法防御
					'mana': core.status.hero.mana,
					'manamax': core.status.hero.manamax,
					'permana': core.status.hero.manamax / 6, //每一管气息的长度
					'hpmax': core.status.hero.hpmax, // 公主体力
					'fatigue': 0, //疲劳
					'misfortune': 0, //负面事件计数
					'totalFatigue': 0, //总疲劳计数
					'atkm': core.getFlag('atkm', 10),
					'defm': core.getFlag('defm', 40), //攻防临界值
					'lv': core.status.hero.lv,
					'freeze': false, //本回合是否不能行动 结晶盾特效
					'fairy': 0, // 精灵罩剩余使用次数
					'fairyBuff': 0, // 精灵罩防御增加量	
					'orihp': core.status.hero.hp, // 初始血量，影响精灵罩加防数值
					'atkStatus': {}, // 本回合每次攻击的状态，影响攻击动画
					'bone': 0, // 开启凡骨转化的攻防计数，攻防的绘制改变
					'sword': core.items.getEquip(0), //当前装备的剑技
					'shield': core.items.getEquip(1), //当前装备的盾技
					'smartCast': false, //是否完成智能施法成就
				}
				this.enemy = {
					'id': enemy.id,
					'name': enemy.name, // 敌人中文名
					'hp': enemy.hp,
					'atk': enemy.atk,
					'def': enemy.def,
					'fatigue': 0,
					'totalFatigue': 0, //总疲劳计数
					'hasMisfortune': core.hasSpecial(enemy.special, 12) || core.hasSpecial(enemy.special, 13) ||
						core.hasSpecial(enemy.special, 61) || core.hasSpecial(enemy.special, 82) ||
						core.hasSpecial(enemy.special, 87) || core.hasSpecial(enemy.special, 81) ||
						core.hasSpecial(enemy.special, 89), //该敌人是否带有负面事件
					'poisonPoss': enemy.atkValue || 0,
					'weakPoss': enemy.defValue || 0,
					'weakPoint': enemy.damage || 0,
					'mana': enemy.id === 'E437' ? 10 : 0,
					'manamax': enemy.manamax, // 敌人最大气息值
					'special': enemy.special, // 敌人特殊属性
					'type': enemy.type, // 敌人为enemys还是enemy48 绘制用
					'x': enemy.x,
					'y': enemy.y,
					'money': enemy.money,
					'exp': enemy.exp,
					'totalDamage': 0, // 对角色累计造成的伤害
					'turn': 0, //敌人累计行动轮次
					'atkStatus': {}, // 本回合每次攻击的状态，影响攻击动画
					'combo': enemy.combo, //敌人连击数
					'freeze': 0, //被冰冻的回合数,结晶盾特效
					'magicIce': false, // 产出魔法冰块
					'sword': 0, //剑大师计数
					'shield': 0, //盾大师计数
				}
				this.actor = 'hero'; // 本回合行动角色
				this.swordSkill = ''; // 当前剑技
				this.shieldSkill = ''; // 当前盾技
				this.isQuit = false; // 玩家是否从战斗中撤退。
				this.route = 'bs'; //角色的操作序列(bs即battleSkill)
			}

			static getSkill(skill, type) {
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
				if (list.hasOwnProperty(skill)) return list[skill][type];
			}

			canExecAction(action) {
				if (this.isQuit || this.isBattleEnd) return { success: false, reason: '战斗已结束' };
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
				if (action === 'q')
					return { success: true, reason: '' };
				else if (action === 'v') {
					if (this.hero.mana <= this.hero.permana) return { success: false, reason: '气息不足' };
					if (this.hero.fatigue <= 0) return { success: false, reason: '当前未处于疲劳状态' };
					return { success: true, reason: '' };
				} else if (['b', 's', 'd', 'h', 'k', 'c', 'M', 'C', 'R', 'F', 'E'].includes(action)) { //剑技
					if (action !== 'c' && this.hero.fatigue >= core.getFlag('tiredMax', 20))
						return { success: false, reason: '当前疲劳过高' }; // 会心的释放不受疲劳限制
					if (this.hero.lv < this.constructor.getSkill(action, 'lv'))
						return { success: false, reason: '等级不足' };
					if (this.hero.mana < this.constructor.getSkill(action, 'cost') * this.hero.permana)
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

			execInstantAction(action) {
				const outcome = this.canExecAction(action);
				if (!outcome.success) {
					if (!core.isReplaying()) {
						core.playSound('error.mp3');
						core.drawTip(outcome.reason);
					}
					return;
				}
				switch (action) {
					case 'q':
						this.isQuit = true;
						if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'q'; //撤退
						this.battleEnd();
						break;
					case 'v':
						if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'v'; //深呼吸
						this.hero.mana -= this.hero.permana;
						this.hero.fatigue -= core.getFlag('deepBreath', 5);
						if (this.hero.fatigue < 0) this.hero.fatigue = 0;
						break;
				}
			}

			// 录像格式 bs:3f:3v:5q => 第3回合凡骨+深呼吸，第5回合逃跑
			// 只记录有效技能，b-凡骨(bone)，s-流石(stone)，d-深红(darkRed)，h-天灵(heaven)，k-皇者(king)，c-会心一击
			// M-镜膜盾(mirror)，C-结晶盾(crystal)，R-反射盾(reflection),F-精灵罩(fairy),E-贤者结界(enchantment)
			execUserAction(action) {
				const outcome = this.canExecAction(action);
				if (!outcome.success) {
					if (!core.isReplaying()) {
						core.playSound('error.mp3');
						core.drawTip(outcome.reason);
					}
					return;
				}
				if (action === 'c') {
					this.swordSkill = 'c';
				}
				if (['b', 's', 'd', 'h', 'k'].includes(action)) {
					const aimSword = abbreviateList[action];
					this.hero.sword = aimSword;
					this.swordSkill = action;
				} else if (['M', 'C', 'R', 'F', 'E'].includes(action)) {
					const aimShield = abbreviateList[action];
					this.hero.shield = aimShield;
					this.shieldSkill = action;
				}
				if (!core.isReplaying()) this.route += ':' + this.turn.toString() + action;
			}

			isMagician() { // 是否为法师,成就判断用.条件为特技含有字段“魔法”或“秘术”
				const especial = this.enemy.special;
				return core.hasSpecial(especial, 2) || core.hasSpecial(especial, 60) ||
					core.hasSpecial(especial, 61) || core.hasSpecial(especial, 62) ||
					core.hasSpecial(especial, 63) || core.hasSpecial(especial, 64) ||
					core.hasSpecial(especial, 65) || core.hasSpecial(especial, 66) ||
					core.hasSpecial(especial, 67);
			}

			nextTurn() {
				if (this.isQuit || this.isBattleEnd) return;
				switch (this.actor) {
					case 'hero':
						this.heroAct();
						break;
					case 'enemy':
						this.enemyAct();
						break;
				}
			}

			battleEnd() {
				if (!core.isReplaying() && this.route.length > 3) { core.status.route.push(this.route); }
				if (this.isQuit) {
					core.status.hero.hp = Math.min(this.hero.hp, core.status.hero.hp);
					core.status.hero.hpmax = Math.min(this.hero.hpmax, core.status.hero.hpmax);
				} else {
					core.status.hero.hp = this.hero.hp;
					core.status.hero.mana = this.hero.mana;
					core.status.hero.hpmax = this.hero.hpmax;
				}
				this.isBattleEnd = true;
			}

			// 攻防后增加气息
			addMana(actor, damage, enemyCrit) {
				switch (actor) {
					case 'hero':
						if (this.swordSkill.length > 0 || core.hasSpecial(this.enemy.special, 64) ||
							this.enemy.def >= this.hero.atk) {
							//使用剑技或C的回合中勇士将没有攻增气，魔神些多的死寂光环角色不加气，角色不破怪物防不加气
						} else {
							this.hero.mana += Math.round((10 * this.enemy.def) / (this.hero.atk)); // 角色攻增气
						}
						if (this.hero.mana > this.hero.manamax) this.hero.mana = this.hero.manamax;
						if ((this.hero.sword === 'I319' && this.swordSkill === 'c') || this.swordSkill === 's') {
							// 装备流石用C,怪物不加防增气
						} else {
							this.enemy.mana += Math.round(damage / 3); // 怪物防增气
						}
						if (this.enemy.mana > this.enemy.manamax) this.enemy.mana = this.enemy.manamax;
						break;
					case 'enemy':
						if (core.hasSpecial(this.special, 60) || core.hasSpecial(this.enemy.special, 64)) {
							//暗魔法无防增气，魔神些多的死寂光环角色不加气
						} else {
							this.hero.mana += Math.round(0.1 * damage); // 角色防增气
						}
						if (this.hero.mana > this.hero.manamax) this.hero.mana = this.hero.manamax;
						if (!enemyCrit && !core.hasSpecial(this.special, 80)) { //怪物会心一击时无攻增气，魔眼不加气
							if (core.hasSpecial(this.special, 55)) {
								this.enemy.mana += Math.round((10 * this.hero.mdef) / (this.enemy.atk))
							} else if (core.hasSpecial(this.special, 61) || core.hasSpecial(this.special, 62) ||
								core.hasSpecial(this.special, 63) || core.hasSpecial(this.special, 64) ||
								core.hasSpecial(this.special, 65)) { // 怪物攻增气
								this.enemy.mana += Math.round((10 * (this.hero.mdef + this.hero.def)) / (this.enemy.atk));
							} else this.enemy.mana += Math.round((10 * this.hero.def) / (this.enemy.atk));
						}
						if (this.enemy.mana > this.enemy.manamax) this.enemy.mana = this.enemy.manamax;
						break;
				}
			}


			//角色行动
			heroAct() {
				let atkStatus = { 'damage': 0, 'animate': 'g3' };
				let hdamage = 0;
				if (this.hero.freeze) { // 冻结，结晶盾特效
					hdamage = 0;
					atkStatus.freeze = true;
					this.hero.freeze = false;
				} else {
					// 增加疲劳计数，决定是否miss
					this.hero.totalFatigue += this.hero.fatigue;
					if (this.hero.totalFatigue >= 100) {
						hdamage = 0;
						atkStatus.miss = true;
						this.hero.totalFatigue -= 100;
					}

					// 检测是否发动技能
					if (this.swordSkill.length > 0) {
						atkStatus.skill = this.swordSkill;
						this.hero.mana -= this.constructor.getSkill(this.swordSkill, 'cost') * this.hero.permana;
						this.hero.fatigue += this.constructor.getSkill(this.swordSkill, 'fatigue');
					}
					if (!atkStatus.miss) {
						if (core.hasSpecial(this.enemy.special, 86)) this.hero.fatigue += 10;
						switch (this.swordSkill) {
							case 'c':
								hdamage = 2 * Math.max(this.hero.atk - this.enemy.def, 1);
								atkStatus.animate = "g3-cri";
								break;
							case 'b': // 凡骨
								hdamage = Math.round(1.5 * Math.max(this.hero.atk - this.enemy.def, 1));
								if (this.isMagician()) this.hero.smartCast = true;
								atkStatus.animate = "gsw1";
								break;
							case 's': //流石
								hdamage = Math.round(1.3 * Math.max(this.hero.atk - this.enemy.def, 1));
								if (!core.hasSpecial(this.enemy.special, 64)) //魔神些多的死寂光环下角色不加气
									this.hero.mana += Math.round(this.enemy.mana / 2);
								this.enemy.mana -= Math.round(this.enemy.mana / 2);
								atkStatus.animate = "gsw2";
								break;
							case 'd': //深红
								hdamage = Math.round(0.8 * Math.max(this.hero.atk - this.enemy.def, 1));
								if (hdamage >= this.enemy.hp) hdamage = this.enemy.hp - 1;
								this.hero.hp += Math.round(0.3 * hdamage);
								atkStatus.animate = "gsw3";
								break;
							case 'h': //天灵
								hdamage = Math.round(1.8 * Math.max(this.hero.atk - this.enemy.def, 1));
								this.enemy.fatigue += 15;
								atkStatus.animate = "gsw4";
								break;
							case 'k': // 皇者
								hdamage = Math.round(5 * Math.max(this.hero.atk - this.enemy.def, 1));
								if (hdamage >= this.enemy.hp) {
									hdamage = this.enemy.hp - 1;
									this.hero.smartCast = true;
								}
								this.hero.atk = this.enemy.def;
								atkStatus.animate = "gsw5";
								break;
							default:
								hdamage = Math.max(this.hero.atk - this.enemy.def, 1);
								break;
						}
						if (this.enemy.def - this.hero.atk > this.hero.atkm) hdamage = 0; //攻临界
						this.addMana(this.actor, hdamage);
					}
					if (this.swordSkill === 'b' && Math.round(1.5 * (this.hero.atk - this.enemy.def)) < this.hero.lv) {
						// 伤害太低时，发动凡骨只有伤害1.5倍的效果，属性不增加
						this.hero.atk += Math.round(1.5 * this.hero.lv);
						this.hero.def -= this.hero.lv;
						this.hero.bone += this.hero.lv;
					}
					this.swordSkill = ''; // 需要根据本回合剑技判断气息增减

					if (core.hasSpecial(this.enemy.special, 92)) { // 盾大师
						switch (this.enemy.shield) {
							case 0:
								hdamage = Math.round(hdamage / 2);
								this.enemy.shield = 1;
								break;
							case 1:
								this.hero.freeze = true;
								this.enemy.shield = 2;
								break;
							case 2:
								this.hero.hp -= Math.round(hdamage / 4);
								this.enemy.shield = 0;
								break;
						}
					}

					atkStatus.damage = hdamage;
					this.enemy.hp -= hdamage;
					if (this.enemy.hp <= 0) {
						this.enemy.hp = 0;
						this.battleEnd();
					}
					if (this.hero.hp <= 0) {
						this.battleEnd();
					}
				}
				this.hero.atkStatus = atkStatus;
				this.actor = 'enemy';
				this.turn++;
			}

			//敌人行动
			enemyAct() {
				this.enemy.turn++;
				let damage = 0,
					oriDamage = 0,
					princessDamage = 0, //公主受到的伤害
					heal = 0, //敌人吸血回复
					isPoisoned = false; // 是否被反射盾反弹中毒
				let atkStatus = { 'damage': 0 };
				const combo = this.enemy.combo,
					especial = this.enemy.special;
				this.enemy.totalFatigue += this.enemy.fatigue;
				if (this.enemy.freeze > 0) {
					atkStatus.freeze = true;
					this.enemy.freeze--;
				} else {
					if (core.hasSpecial(especial, 80)) { // 魔眼
						if (this.hero.def - this.hero.atk > this.hero.atkm) damage = 0;
						else damage = Math.max(this.hero.atk - this.hero.def, 1);
					} else if (core.hasSpecial(especial, 2) || core.hasSpecial(especial, 61) ||
						core.hasSpecial(especial, 62) || core.hasSpecial(especial, 63) ||
						core.hasSpecial(especial, 64) || core.hasSpecial(especial, 65) ||
						core.hasSpecial(especial, 66)) { //魔攻
						damage = this.enemy.atk;
					} else {
						if (this.hero.def - this.enemy.atk >= this.hero.defm) damage = 0; // 防临界
						else damage = Math.max(this.enemy.atk - this.hero.def, 1);
					}
					if (core.hasSpecial(especial, 80) && this.hero.totalFatigue >= 100) { // 魔眼miss取决于勇士的疲劳
						damage = 0;
						atkStatus.miss = true;
						this.hero.totalFatigue -= 100;
					} else if (this.enemy.totalFatigue >= 100) {
						damage = 0;
						atkStatus.miss = true;
						this.enemy.totalFatigue -= 100;
					}
					if (this.shieldSkill.length > 0) {
						this.hero.mana -= this.constructor.getSkill(this.shieldSkill, 'cost') * this.hero.permana;
						this.hero.fatigue += this.constructor.getSkill(this.shieldSkill, 'fatigue');
					}
					if (core.hasSpecial(especial, 61) || core.hasSpecial(especial, 62) ||
						core.hasSpecial(especial, 63) || core.hasSpecial(especial, 64) ||
						core.hasSpecial(especial, 65)) {
						atkStatus.aim = 'all';
						princessDamage = Math.max(this.enemy.atk - this.hero.mdef, 0);
					} else if (core.hasSpecial(especial, 55)) {
						atkStatus.aim = 'princess';
						princessDamage = this.enemy.atk;
					} else { atkStatus.aim = 'hero'; }
					if (atkStatus.miss) princessDamage = 0;

					if (this.enemy.mana >= this.enemy.manamax &&
						this.hero.def - this.enemy.atk < this.hero.defm) { //满气息时怪物释放必杀，但若不能破防主角则永远不会释放
						if (core.hasSpecial(especial, 91)) { } else {
							let critRatio = 2;
							if (core.hasSpecial(especial, 51)) critRatio = 2.5;
							if (core.hasSpecial(especial, 59)) critRatio = 4;
							if (core.hasSpecial(especial, 67)) critRatio = 3;
							damage = Math.round(critRatio * damage);
							princessDamage = Math.round(critRatio * princessDamage);
							this.enemy.fatigue += (atkStatus.aim === 'all') ? 2 : 1;
							atkStatus.crit = true; //暴击
						}
						this.enemy.mana = 0;
					}
				}
				let reflect = false;
				switch (this.shieldSkill) { //盾技
					case 'M': //镜膜盾
						damage = Math.ceil(damage / 2.5); //盾技伤害计算方式是ceil
						if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'M';
						atkStatus.heroAnimate = "gsh1";
						break;
					case 'C': //结晶盾
						damage = Math.ceil(damage / 1.5);
						atkStatus.freeze = true;
						if (this.enemy.id === 'bluePriest') this.enemy.magicIce = true; //制取魔法冰块
						this.enemy.freeze = 2 * combo - this.turn % (combo + 1);
						if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'C';
						atkStatus.heroAnimate = "gsh2";
						break;
					case 'R': //反射
						oriDamage = damage;
						damage = Math.ceil(damage / 1.3);
						reflect = true;
						if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'R';
						atkStatus.heroAnimate = "gsh3";
						break;
					case 'F': //精灵罩
						this.hero.fairy = 3;
						this.hero.fairyBuff = (this.hero.orihp + this.hero.def) % this.hero.lv;
						this.hero.def += this.hero.fairyBuff;
						if (this.isMagician()) this.hero.smartCast = true;
						if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'F';
						atkStatus.heroAnimate = "gsh4";
						break;
					case 'E': //贤者结界
						this.hero.hpmax += Math.round(1.5 * damage);
						if (!core.isReplaying()) this.route += ':' + this.turn.toString() + 'E';
						atkStatus.heroAnimate = "gsh5";
						break;
					default:
						break;
				}
				if (!atkStatus.freeze && !atkStatus.miss) {
					if (core.hasSpecial(especial, 91)) { // 剑大师
						switch (this.enemy.sword) {
							case 0:
								this.hero.fatigue += 8;
								this.enemy.sword = 1;
								break;
							case 1:
								this.hero.mana -= this.hero.permana;
								if (this.hero.mana < 0) this.hero.mana = 0;
								this.enemy.sword = 2;
								break;
							case 2:
								heal = Math.round(damage / 5);
								this.enemy.sword = 0;
								break;
						}
					}
					if (core.hasSpecial(especial, 93)) // 魔界之王古顿
					{
						atkStatus.bounceDamage = [damage, Math.round(0.8 * damage),
							Math.round(0.64 * damage), Math.round(0.512 * damage)
						];
						atkStatus.aim = 'lastBoss';
					}

					if (core.hasSpecial(especial, 52) || core.hasSpecial(especial, 53)) {
						if (reflect) this.enemy.fatigue++;
						else this.hero.fatigue++;
					}
					if (core.hasSpecial(especial, 54)) {
						if (reflect) this.enemy.fatigue += 3;
						else this.hero.fatigue += 3;
					}
					if (core.hasSpecial(especial, 56)) {
						if (reflect) this.enemy.fatigue += 4;
						else this.hero.fatigue += 4;
					}
					if (core.hasSpecial(especial, 62)) {
						this.enemy.fatigue -= 1;
						if (this.enemy.fatigue <= 0) this.enemy.fatigue = 0;
					}
					if (core.hasSpecial(especial, 58) && atkStatus.crit) {
						this.hero.mana -= this.hero.permana;
						if (this.hero.mana < 0) this.hero.mana = 0;
					}
					if (core.hasSpecial(especial, 65)) { //血秘术
						heal = Math.round(0.5 * (damage + princessDamage));
					}
					if (core.hasSpecial(especial, 57) || core.hasSpecial(especial, 66) ||
						core.hasSpecial(especial, 67)) { //血魔法
						heal = Math.round(0.5 * damage);
					}
					if (core.hasSpecial(especial, 88)) {
						if (reflect) {
							this.hero.mana = core.clamp(this.hero.mana + 40, 0, this.hero.manamax);
							this.enemy.mana = core.clamp(this.enemy.mana - 40, 0, this.enemy.manamax);

						} else {
							this.hero.mana = core.clamp(this.hero.mana - 40, 0, this.hero.manamax);
							this.enemy.mana = core.clamp(this.enemy.mana + 40, 0, this.enemy.manamax);
						}
					}
					if (core.hasSpecial(especial, 84)) { damage += 100; }
					// 执行敌人带有的debuff技能
					if (this.enemy.hasMisfortune) {
						if (core.hasSpecial(especial, 81)) { // 81-破甲刃:攻击会减低主角防御力，40%几率降低12点
							this.hero.misfortune += 40;
							if (this.hero.misfortune >= 100) {
								this.hero.misfortune -= 100;
								if (reflect) this.enemy.def -= 12;
								else this.hero.def -= 12;
							}
						} else if (core.hasSpecial(especial, 89)) { // 89-压制:攻击60%几率降低20攻击，5防御
							this.hero.misfortune += 60;
							if (this.hero.misfortune >= 100) {
								this.hero.misfortune -= 100;
								if (reflect) {
									this.enemy.atk -= 20;
									this.enemy.def -= 5;
								} else {
									this.hero.atk -= 20;
									this.hero.def -= 5;
								}
							}
						} else if (core.hasSpecial(especial, 12) || core.hasSpecial(especial, 61) ||
							core.hasSpecial(especial, 82)) { // 12-中毒
							this.hero.misfortune += this.enemy.poisonPoss;
							if (this.hero.misfortune >= 100) {
								this.hero.misfortune -= 100;
								if (reflect) isPoisoned = true;
								else if (!core.getFlag('weak')) {
									core.triggerDebuff('get', 'poison');
								}
							}
						} else if (core.hasSpecial(especial, 13) || core.hasSpecial(especial, 87)) { // 13-衰弱
							this.hero.misfortune += this.enemy.weakPoss;
							if (this.hero.misfortune >= 100) {
								this.hero.misfortune -= 100;
								if (reflect) {
									this.enemy.atk -= this.enemy.weakPoint;
									this.enemy.def -= this.enemy.weakPoint;
								} else if (!core.getFlag('poison')) {
									// weakV为本次衰弱扣除的属性值,weakValue为衰弱总计扣除的属性值
									core.setFlag('weakV', this.enemy.weakPoint);
									core.triggerDebuff('get', 'weak');
								}
							}
						}

					}
					this.addMana('enemy', damage, atkStatus.crit); //本回合敌人未暴击，则它会回复气息
					if (this.hero.fairy > 0) {
						atkStatus.fairy = true;
						this.hero.fairy--;
						if (this.hero.fairy === 0) {
							this.hero.def -= Math.round(this.hero.def / 50) + (this.hero.orihp % this.hero.lv);
							this.hero.fairyBuff = 0;
						}
					}
				}
				this.shieldSkill = '';
				atkStatus.damage = damage;
				atkStatus.princessDamage = princessDamage;
				atkStatus.animate = enemyAni(this.enemy.id, atkStatus.crit);
				this.enemy.atkStatus = atkStatus;
				this.enemy.totalDamage += damage;
				this.hero.hp -= damage;
				this.hero.hpmax -= princessDamage;
				if (core.hasSpecial(especial, 93)) { // 古顿
					this.hero.hp -= atkStatus.bounceDamage[2];
					this.hero.hpmax -= atkStatus.bounceDamage[1] + atkStatus.bounceDamage[3];
				}
				if (this.hero.hp <= 0 || this.hero.hpmax <= 0) this.battleEnd();
				if (reflect) { //反射盾
					let reflectDamage = Math.round(oriDamage / 2.6 + this.hero.atk / 10);
					if (isPoisoned) reflectDamage += 25; // 反弹中毒会多弹25血
					atkStatus.reflectDamage = reflectDamage;
					this.enemy.hp -= reflectDamage;
					if (core.hasSpecial(especial, 3) && reflectDamage > 0) this.hero.smartCast = true;
					if (this.enemy.hp <= 0) this.enemy.hp = 0;
				}
				this.enemy.hp += heal; //吸血效果
				if (this.enemy.hp <= 0) this.battleEnd();
				if (this.turn % (this.enemy.combo + 1) === this.enemy.combo) { this.actor = 'hero'; }
				this.turn++;

				// 获取敌人攻击动画名称
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
						case 'ghostSkeleton':
							return critical ? 'g38-cri' : 'g38'; //卫兵、冥骷髅攻击
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
			}
		}

		//// 每回合的战斗过程
		function battleByTurn(id, x, y) {
			if (!core.isReplaying()) core.lockControl();
			let delay = 400,
				combodelay = 50;
			if (core.getFlag('battleSpeed', 0) === 2) {
				delay = 800;
				combodelay = 100;
			} else if (core.getFlag('battleSpeed', 0) === 0) {
				delay = 20;
				combodelay = 2;
			}
			const enemyInfo = core.enemys.getEnemyInfo(id, null, x, y, core.status.floorId),
				ehp = enemyInfo.hp,
				eatk = enemyInfo.atk,
				edef = enemyInfo.def,
				especial = enemyInfo.special;
			let combo = 1;
			if (core.hasSpecial(especial, 4) || core.hasSpecial(especial, 53)) combo = 2;
			if (core.hasSpecial(especial, 5) || core.hasSpecial(especial, 83)) combo = 3;
			if (core.hasSpecial(especial, 6)) combo = core.material.enemys[id].n || 1;
			if (core.hasSpecial(especial, 87)) combo = 6;
			let battle = new GameCore({
				'id': id,
				'name': core.material.enemys[id].name,
				'hp': ehp,
				'atk': core.hasSpecial(especial, 60) ? 3 * eatk : eatk,
				'def': edef,
				'type': 'enemys',
				'x': x,
				'y': y,
				'money': enemyInfo.money,
				'exp': enemyInfo.exp,
				'manamax': core.material.enemys[id].value,
				'special': especial,
				'combo': combo,
				'atkValue': core.material.enemys[id].atkValue,
				'defValue': core.material.enemys[id].defValue,
				'damage': core.material.enemys[id].damage,
			});

			function finish() {
				core.unregisterAction('keyDown', 'battleSkill');
				core.unregisterAction('keyDown', 'battleClick')
				let currTime = 0,
					h = 0;
				if (!battle.isQuit) {
					core.registerAnimationFrame('showBottomBar', true, function (timestamp) {
						if (timestamp - currTime < 10) return;
						currTime = timestamp;
						if (h < 40) h += 4;
						core.plugin.drawBattleBottomBar(battle, h);
					})
				}
				new Promise(res => setTimeout(res, 500)).then(() => {
					core.unregisterAnimationFrame('drawDamage');
					core.unregisterAnimationFrame('showBottomBar');
					core.unregisterAnimationFrame('battleIcon');
					core.deleteCanvas('battleUI');
					core.deleteCanvas('battleIcon');
					core.deleteCanvas('battleBottomBar');
					core.deleteCanvas("skillIcon");
					core.updateStatusBar();
					if (core.status.hero.hp <= 0 || core.status.hero.hpmax <= 0) core.lose();
					core.unlockControl();
					if (!battle.isQuit) core.plugin.afterBattleInTurn(battle);
					return;
				})
			}

			function takeTurn() {
				let currDelay = delay;
				if (combo >= 2 && this.turn % (combo + 1) <= combo - 1) currDelay = combodelay;
				if (battle.isBattleEnd) return;
				battle.nextTurn();
				core.plugin.drawBattleUI(battle);
				core.plugin.drawSkillIcon(battle);
				core.plugin.drawBattleAnimate(battle, currDelay);

				if (battle.isBattleEnd) finish();
				else setTimeout(takeTurn, currDelay);
			}

			if (core.isReplaying()) {
				let actionList = {};
				if (core.status.replay.toReplay.length > 0) {
					const next = core.status.replay.toReplay[0];
					if (next.startsWith('bs:')) {
						const nextList = next.split(':');
						for (let i = 1, l = nextList.length; i < l; i++) {
							const currTurn = parseInt(nextList[i]);
							if (!actionList.hasOwnProperty(currTurn)) actionList[currTurn] = [];
							actionList[currTurn].push(nextList[i].replace(currTurn.toString(), ''));
						}
					}
				}
				while (!battle.isBattleEnd) {
					const currTurn = battle.turn;
					if (actionList.hasOwnProperty(currTurn)) {
						if (actionList[currTurn].includes('q')) {
							battle.execInstantAction('q');
							core.updateStatusBar();
							if (core.status.hero.hp <= 0 || core.status.hero.hpmax <= 0) core.lose();
							break;
						}
						if (actionList[currTurn].includes('v'))
							battle.execInstantAction('v');
						for (let i = 0, l = actionList[currTurn].length; i < l; i++) {
							battle.execUserAction(actionList[currTurn][i]);
						}
					}
					battle.nextTurn();
				}
				core.updateStatusBar();
				if (!battle.isQuit) core.plugin.afterBattleInTurn(battle);
				if (core.status.hero.hp <= 0 || core.status.hero.hpmax <= 0) core.lose();
			} else {
				const equipList = { 'I315': 'b', 'I319': 's', 'I318': 'd', 'I317': 'h', 'I316': 'k', 'I339': 'M', 'I321': 'C', 'I375': 'R', 'I322': 'F', 'I320': 'E', };
				core.registerAction('keyDown', 'battleSkill', function (keyCode) {
					if (battle.isQuit || battle.isBattleEnd) return;
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
						case 8: //backSpace
						case 81: //Q
							battle.execInstantAction('q');
							finish();
							break;
						case 86: //V
							battle.execInstantAction('v');
							break;
						case 67: //C
							battle.execUserAction('c');
							break;
						case 90: //Z
							if (!battle.hero.sword) {
								core.playSound('error.mp3');
								core.drawTip('当前未装备剑技');
							} else { battle.execUserAction(equipList[battle.hero.sword]); }
							break;
						case 88: //X
							if (!battle.hero.shield) {
								core.playSound('error.mp3');
								core.drawTip('当前未装备盾技');
							} else { battle.execUserAction(equipList[battle.hero.shield]); }
							break;
					}
					core.plugin.drawSkillIcon(battle);
				}, 100);

				core.registerAction('ondown', 'battleClick', function (x, y, px, py) {
					if (battle.isQuit || battle.isBattleEnd) return;
					const sword = equipList[core.items.getEquip(0)],
						shield = equipList[core.items.getEquip(1)];
					if (60 < px && px <= 92 && 320 <= py && py <= 352) {
						if (core.hasItem('I325')) battle.execUserAction('b');
						else if (core.hasItem('I327')) battle.execUserAction('M');
					}
					if (92 < px && px <= 124 && 320 <= py && py <= 352) {
						if (core.hasItem('I325')) battle.execUserAction('s');
						else if (core.hasItem('I327')) battle.execUserAction('C');
					}
					if (124 < px && px <= 156 && 320 <= py && py <= 352) {
						if (core.hasItem('I325')) battle.execUserAction('d');
						else if (core.hasItem('I327')) battle.execUserAction('R');
					}
					if (156 < px && px <= 188 && 320 <= py && py <= 352) {
						if (core.hasItem('I325')) battle.execUserAction('h');
						else if (core.hasItem('I327')) battle.execUserAction('F');
					}
					if (188 < px && px <= 220 && 320 <= py && py <= 352) {
						if (core.hasItem('I325')) battle.execUserAction('k');
						else if (core.hasItem('I327')) battle.execUserAction('E');
					}
					if (220 < px && px <= 252 && 320 <= py && py <= 352) {
						if (!battle.hero.sword) {
							core.playSound('error.mp3');
							core.drawTip('当前未装备剑技');
						} else { battle.execUserAction(equipList[battle.hero.sword]); }
					}

					if (252 < px && px <= 284 && 320 <= py && py <= 352) {
						if (!battle.hero.shield) {
							core.playSound('error.mp3');
							core.drawTip('当前未装备盾技');
						} else { battle.execUserAction(equipList[battle.hero.shield]); }
					}
					if (284 < px && px <= 316 && 320 <= py && py <= 352) {
						battle.execUserAction('c');
					}
					if (316 < px && px <= 348 && 320 <= py && py <= 352) {
						battle.execInstantAction('v');
					}
					if (35 <= px && px <= 105 && 260 <= py && py <= 270) {
						battle.execInstantAction('q');
						finish();
					}
				}, 100);

				let drawIconCount = 0,
					timeCount = 0;
				core.registerAnimationFrame('battleIcon', true, function (timestamp) {
					if (timestamp - timeCount < 200) return;
					drawIconCount++;
					timeCount = timestamp;
					core.plugin.drawBattleIcon(battle, drawIconCount);
				});
				core.plugin.drawBattleUI(battle);
				core.plugin.drawSkillIcon(battle);
				setTimeout(takeTurn, delay); //第一回合留时间输入技能
			}
		}

		// bs开头录像用于读取下一场战斗的操作
		function _replayAction_bs(action) {
			if (!action.startsWith('bs')) return false;
			core.status.route.push(action);
			core.replay();
			return true;
		}
		core.registerReplayAction('bs', _replayAction_bs);

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
				battleByTurn(id, x, y);
			} else {
				this.afterBattle(id, x, y);
			}
			if (callback) callback();
		}

	},
	"回合制战斗": function () {

		// #region 回合制战斗的执行

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
				else battleByTurn_Replaying(id, x, y);
			} else {
				this.afterBattle(id, x, y);
			}
			if (callback) callback();
		}

		/**
		 * 执行回合制战斗
		 * @param {string} enemyId 
		 * @param {number} x 
		 * @param {number} y 
		 */
		async function battleByTurn(enemyId,x,y) {
			let battle = new Battle(enemyId,x,y);

			if (!core.isReplaying()) core.lockControl();
			while (true) {
				battle.nextTurn();
				battle.checkEnd();
				if (battle.status !== 'pending') break;
				await Promise.race([
					new Promise((res) => { setTimeout(res, 1000); }),
					new Promise((res) => {
						core.unregisterAction('keyDown', 'quit');
						core.registerAction('keyDown', 'quit', (keyCode) => {
							if (keyCode === 81) {
								battle.status = 'quit';
								res();
							}
						})
					})
				]);
				if (battle.status === 'quit') break;
			}
			// 获胜时，绘制底边栏
			let h = 0;
			if (battle.status === 'win') registerAnimationInterval('showBottomBar', 10, () => {
				if (h < 40) h += 4;
				drawBattleBottomBar(battle, h);
			});
			//等待500ms后擦除画布
			await new Promise((res) => { setTimeout(res, 500) });
			clearCanvasAndEvent();
			updateHeroStatus(battle);
			afterBattleEvent(battle,x,y);
			core.unlockControl();
		}

		/**
		 * 录像模式下执行回合制战斗
		 * @param {string} enemyId 
		 * @param {number} x 
		 * @param {number} y 
		 */
		function battleByTurn_Replaying(enemyId,x,y){
			let battle = new Battle(enemyId,x,y);
		}

		/** 注销所有监听事件和画布 */
		function clearCanvasAndEvent() {
			core.unregisterAnimationFrame('drawDamage');
			core.unregisterAnimationFrame('showBottomBar');
			core.unregisterAnimationFrame('battleIcon');
			core.deleteCanvas('battleUI');
			core.deleteCanvas('battleIcon');
			core.deleteCanvas('battleBottomBar');
			core.deleteCanvas("skillIcon");
		}

		/**
		 * 同步勇士的生命值，毒衰等状态
		 * @param {Battle} battle 
		 */
		function updateHeroStatus(battle) {
			const hero = battle.hero;
			if (!core.isReplaying()) {
				const route = hero.route;
				if (route.length > 3) core.status.route.push(route);
			}
			core.status.hero.statistics.battleDamage += battle.enemy.totalDamage;
			switch (hero.status) {
				case 'poisoned':
					if (!core.hasFlag('poison')) core.triggerDebuff('get', 'poison');
					break;
				case 'weak':
					if (!core.hasFlag('weak')) core.triggerDebuff('get', 'weak');
					core.setFlag('weakV', hero.weakPoint);
					break;
			}
			switch (battle.status) {
				case 'win':
					const info = battle.enemyInfo,
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

					break;
				case 'lose':
					core.lose();
					break;
				case 'quit':
					core.status.hero.hp = Math.min(hero.hp, core.status.hero.hp);
					core.status.hero.hpmax = Math.min(hero.hpmax, core.status.hero.hpmax);

					break;
			}
		}

		/**
		 * 获得成就，执行战后事件
		 * @param {Battle} battle
		 * @param {number} x
		 * @param {number} y 
		 */
		function afterBattleEvent(battle, x, y) {
			const hero = battle.hero,
				enemy = battle.enemy,
				id = enemy.id;

			if (hero.hp < 200 || hero.hpmax < 50) core.plugin.getAchievement(2);
			if (hero.smartCast) core.plugin.getAchievement(17);
			if (hero.state === 'poisoned' || hero.state === 'weak') core.plugin.getAchievement(27);

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

			if (blockList.includes(id)) core.setBlock(blockList[id], x, y);
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
			core.push(todo, battle.enemyData.afterBattle);

			// 如果事件不为空，将其插入
			if (todo.length > 0) core.insertAction(todo, x, y);
		}

		// #endregion

		// #region 回合制战斗的具体过程
		class ActorBase {
			_mana;
			/** 将要被冻结的回合数*/
			freeze = 0;
			/** 状态，分为'normal''poisoned','weak'*/
			status = 'normal';
			get mana() {
				return this._mana;
			};
			set mana(value) {
				if (value < 0) this._mana = 0;
				else if (value > this.manamax) this._mana = this.manamax;
				else this._mana = value;
			};
			constructor(hp, atk, def, manamax, mana, weakPoint) {
				this.hp = hp;
				this.atk = atk;
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
					this.totalFatigue -= -100;
					return true;
				}
				return false;
			}

		}

		class Hero extends ActorBase {
			/** 攻击临界值 */
			atkm = core.getFlag('atkm', 10);
			/** 防御临界值 */
			defm = core.getFlag('defm', 10);
			lv = core.status.hero.lv;
			/** 公主的体力值 */
			hpmax = core.status.hero.hpmax;

			/** 玩家在各回合的出招信息(BattleSkill)，将被写入录像 */
			route = 'bs';

			/** 即将发动的剑技*/
			swordSkill = '';
			/** 即将发动的盾技*/
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
					core.status.hero.manamax, core.status.hero.mana, core.getFlag('weakV', 0));
				this.permana = this.mana / 6;

				if (core.hasFlag('weak')) this.status = 'weak';
			}
		}

		class Enemy extends ActorBase() {
			/** 敌人本场战斗的累计伤害 */
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
					data.manamax, data.id === 'E437' ? 0 : 10, data.damage || 0);
				/** 敌人的英文id */
				this.id = id;

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

			}
		}

		class Battle {
			/** 本场战斗的状态 'pending'进行中 'win'勇士胜利 'lose'勇士失败 'quit'临阵脱逃*/
			status = 'pending';
			/** 玩家是否按下撤退键 */
			/**
			 * Battle构造函数
			 * @param {string} enemyId 敌人ID
			 * @param {number} x 敌人所在x坐标
			 * @param {number} y 敌人所在y坐标
			 */
			constructor(enemyId, x, y) {

				/** getEnemyInfo获得的敌人info */
				this.enemyInfo = core.enemys.getEnemyInfo(enemyId, null, x, y, core.status.floorId);
				/** core.material.enemys中的敌人数据 */
				this.enemyData = core.material.enemys[enemyId];

				this.hero = new Hero();
				this.enemy = new Enemy(this.enemyInfo, this.enemyData);

				this.turn = 0;
				this.order = ((combo) => {
					let order = ['hero'];
					for (let i = 0; i < combo; i++) order.push('enemy');
					return order;
				})(this.enemy.combo);
				this.actIndex = 0;
				this.actor = this.order[this.actIndex];
			}

			nextTurn() {
				switch (this.actor) {
					case 'hero':
						this.hero.Act();
						break;
					case 'enemy':
						this.enemy.Act();
						break;
				}
				if (this.actIndex++ >= this.order.length) this.actIndex = 0;
				this.actor = this.order[this.actIndex];
				this.turn++;
			}

			checkEnd() {
				if (this.hero.hp <= 0 || this.hero.hpmax <= 0) {
					this.status = 'lose';
				}
				else if (this.enemy.hp <= 0) {
					this.status = 'win';
				}
			}

			updateHeroStatus() {

			}
		}
		// #endregion

		// #region 动画

		// #endregion

		// #region 工具函数

		/** 判断敌人是否具有列表中的某项特殊属性
		 * @param {Array} enemySpecial 
		 * @param {Array | number} specialList 
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
		 * 注册一个每interval帧执行一次的动画
		 * @param {string} name 
		 * @param {number} interval 
		 * @param {Function} event 
		 */
		function registerAnimationInterval(name, interval, event) {
			let currTime = 0;
			core.registerAnimationFrame(name, true, (timestamp) => {
				if (timestamp - currTime < interval) return;
				currTime = timestamp;
				event();
			});
		}

		// #endregion
	}
}