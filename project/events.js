var events_c12a15a8_c380_4b28_8144_256cba95f760 = 
{
	"commonEvent": {
		"加点事件": [
			{
				"type": "comment",
				"text": "通过传参，flag:arg1 表示当前应该的加点数值"
			},
			{
				"type": "choices",
				"choices": [
					{
						"text": "攻击+${1*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:atk",
								"value": "status:atk+1*flag:arg1"
							}
						]
					},
					{
						"text": "防御+${2*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:def",
								"value": "status:def+2*flag:arg1"
							}
						]
					},
					{
						"text": "生命+${200*flag:arg1}",
						"action": [
							{
								"type": "setValue",
								"name": "status:hp",
								"value": "status:hp+200*flag:arg1"
							}
						]
					}
				]
			}
		],
		"毒衰咒处理": [
			{
				"type": "comment",
				"text": "获得毒衰咒效果，flag:arg1 为要获得的类型"
			},
			{
				"type": "switch",
				"condition": "flag:arg1",
				"caseList": [
					{
						"case": "0",
						"action": [
							{
								"type": "comment",
								"text": "获得毒效果"
							},
							{
								"type": "if",
								"condition": "!flag:poison",
								"true": [
									{
										"type": "setValue",
										"name": "flag:poison",
										"value": "true"
									}
								],
								"false": []
							}
						]
					},
					{
						"case": "1",
						"action": [
							{
								"type": "comment",
								"text": "获得衰效果"
							},
							{
								"type": "if",
								"condition": "!flag:weak",
								"true": [
									{
										"type": "setValue",
										"name": "flag:weak",
										"value": "true"
									}
								],
								"false": []
							}
						]
					},
					{
						"case": "2",
						"action": [
							{
								"type": "comment",
								"text": "获得咒效果"
							},
							{
								"type": "if",
								"condition": "!flag:curse",
								"true": [
									{
										"type": "setValue",
										"name": "flag:curse",
										"value": "true"
									}
								],
								"false": []
							}
						]
					},
					{
						"case": "3",
						"action": [
							{
								"type": "comment",
								"text": "获得咒效果"
							},
							{
								"type": "if",
								"condition": "!flag:dedef",
								"true": [
									{
										"type": "setValue",
										"name": "flag:dedef",
										"value": "true"
									}
								],
								"false": []
							}
						]
					},
					{
						"case": "4",
						"action": [
							{
								"type": "comment",
								"text": "获得咒效果"
							},
							{
								"type": "if",
								"condition": "!flag:deatk",
								"true": [
									{
										"type": "setValue",
										"name": "flag:deatk",
										"value": "true"
									}
								],
								"false": []
							}
						]
					}
				]
			}
		],
		"滑冰事件": [
			{
				"type": "comment",
				"text": "公共事件：滑冰事件"
			},
			{
				"type": "if",
				"condition": "core.canMoveHero()",
				"true": [
					{
						"type": "comment",
						"text": "检测下一个点是否可通行"
					},
					{
						"type": "setValue",
						"name": "flag:nx",
						"value": "core.nextX()"
					},
					{
						"type": "setValue",
						"name": "flag:ny",
						"value": "core.nextY()"
					},
					{
						"type": "if",
						"condition": "core.noPass(flag:nx, flag:ny)",
						"true": [
							{
								"type": "comment",
								"text": "不可通行，触发下一个点的事件"
							},
							{
								"type": "trigger",
								"loc": [
									"flag:nx",
									"flag:ny"
								]
							}
						],
						"false": [
							{
								"type": "comment",
								"text": "可通行，先移动到下个点，然后检查阻激夹域，并尝试触发该点事件"
							},
							{
								"type": "moveHero",
								"time": 80,
								"steps": [
									"forward"
								]
							},
							{
								"type": "function",
								"function": "function(){\ncore.checkBlock();\n}"
							},
							{
								"type": "comment",
								"text": "【触发事件】如果该点存在事件则会立刻结束当前事件"
							},
							{
								"type": "trigger",
								"loc": [
									"flag:nx",
									"flag:ny"
								]
							},
							{
								"type": "comment",
								"text": "如果该点不存在事件，则继续检测该点是否是滑冰点"
							},
							{
								"type": "if",
								"condition": "core.getBgNumber() == 167",
								"true": [
									{
										"type": "function",
										"function": "function(){\ncore.insertAction(\"滑冰事件\",null,null,null,true)\n}"
									}
								],
								"false": []
							}
						]
					}
				],
				"false": []
			}
		],
		"主塔金币商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[贪婪之神,blueShop]如果你能给我${20+flag:shop1}金币，\n我便能满足你一个要求。",
						"choices": [
							{
								"text": "体力+400",
								"need": "status:money>=20+flag:shop1",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "20+flag:shop1"
									},
									{
										"type": "setValue",
										"name": "flag:shop1",
										"operator": "+=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "400"
									},
									{
										"type": "if",
										"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											}
										]
									}
								]
							},
							{
								"text": "攻击+3",
								"need": "status:money>=20+flag:shop1",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "20+flag:shop1"
									},
									{
										"type": "setValue",
										"name": "flag:shop1",
										"operator": "+=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:atk",
										"operator": "+=",
										"value": "3"
									},
									{
										"type": "if",
										"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											}
										]
									}
								]
							},
							{
								"text": "防御+3",
								"need": "status:money>=20+flag:shop1",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "20+flag:shop1"
									},
									{
										"type": "setValue",
										"name": "flag:shop1",
										"operator": "+=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:def",
										"operator": "+=",
										"value": "3"
									},
									{
										"type": "if",
										"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											}
										]
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"主塔经验商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[战斗之神,pinkShop]战士，看来你还很弱。\n但我可以将你所得的经验\n值转化为你的实质力量！",
						"choices": [
							{
								"text": "升1等级（70 exp）",
								"need": "status:exp>=70",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "70"
									},
									{
										"type": "setValue",
										"name": "status:lv",
										"operator": "+=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "250"
									},
									{
										"type": "setValue",
										"name": "status:atk",
										"operator": "+=",
										"value": "3"
									},
									{
										"type": "setValue",
										"name": "status:def",
										"operator": "+=",
										"value": "3"
									}
								]
							},
							{
								"text": "攻击+1（20 exp）",
								"need": "status:exp>=20",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "20"
									},
									{
										"type": "setValue",
										"name": "status:atk",
										"operator": "+=",
										"value": "1"
									}
								]
							},
							{
								"text": "防御+2（20 exp）",
								"need": "status:exp>=20",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "20"
									},
									{
										"type": "setValue",
										"name": "status:def",
										"operator": "+=",
										"value": "2"
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"魔塔金币商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "flag:bugFix",
				"true": [
					{
						"type": "disableShop",
						"id": "moneyShop1"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "if",
						"condition": "flag:bugFix",
						"true": [
							{
								"type": "choices",
								"text": "\t[贪婪之神,blueShop]如果你能给我${20+flag:shop1}金币，\n我便能满足你一个要求。",
								"choices": [
									{
										"text": "体力+800",
										"need": "status:money>=20+flag:shop1",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "20+flag:shop1"
											},
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:hp",
												"operator": "+=",
												"value": "800"
											},
											{
												"type": "if",
												"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
												"true": [
													{
														"type": "setValue",
														"name": "flag:shop1",
														"operator": "+=",
														"value": "1"
													}
												]
											}
										]
									},
									{
										"text": "攻击+5",
										"need": "status:money>=20+flag:shop1",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "20+flag:shop1"
											},
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:atk",
												"operator": "+=",
												"value": "5"
											},
											{
												"type": "if",
												"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
												"true": [
													{
														"type": "setValue",
														"name": "flag:shop1",
														"operator": "+=",
														"value": "1"
													}
												]
											}
										]
									},
									{
										"text": "防御+5",
										"need": "status:money>=20+flag:shop1",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "20+flag:shop1"
											},
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:def",
												"operator": "+=",
												"value": "5"
											},
											{
												"type": "if",
												"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
												"true": [
													{
														"type": "setValue",
														"name": "flag:shop1",
														"operator": "+=",
														"value": "1"
													}
												]
											}
										]
									},
									{
										"text": "离开",
										"action": [
											{
												"type": "break",
												"n": 1
											}
										]
									}
								]
							}
						],
						"false": [
							{
								"type": "choices",
								"text": "\t[贪婪之神,blueShop]如果你能给我${50+2*flag:shop2}金币，\n我便能满足你一个要求。",
								"choices": [
									{
										"text": "体力+800",
										"need": "status:money>=50+2*flag:shop2",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "50+2*flag:shop2"
											},
											{
												"type": "setValue",
												"name": "flag:shop2",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:hp",
												"operator": "+=",
												"value": "800"
											}
										]
									},
									{
										"text": "攻击+6",
										"need": "status:money>=50+2*flag:shop2",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "50+2*flag:shop2"
											},
											{
												"type": "setValue",
												"name": "flag:shop2",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:atk",
												"operator": "+=",
												"value": "6"
											}
										]
									},
									{
										"text": "防御+6",
										"need": "status:money>=50+2*flag:shop2",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "50+2*flag:shop2"
											},
											{
												"type": "setValue",
												"name": "flag:shop2",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:def",
												"operator": "+=",
												"value": "6"
											}
										]
									},
									{
										"text": "离开",
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
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"魔塔经验商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[战斗之神,pinkShop]战士，看来你还很弱。\n但我可以将你的所得经验\n值转化为你的实质力量！",
						"choices": [
							{
								"text": "升3等级（190 exp）",
								"need": "status:exp>=190",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "190"
									},
									{
										"type": "setValue",
										"name": "status:lv",
										"operator": "+=",
										"value": "3"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "600"
									},
									{
										"type": "setValue",
										"name": "status:atk",
										"operator": "+=",
										"value": "10"
									},
									{
										"type": "setValue",
										"name": "status:def",
										"operator": "+=",
										"value": "10"
									}
								]
							},
							{
								"text": "攻击+3（40 exp）",
								"need": "status:exp>=40",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "40"
									},
									{
										"type": "setValue",
										"name": "status:atk",
										"operator": "+=",
										"value": "3"
									}
								]
							},
							{
								"text": "防御+5（40 exp）",
								"need": "status:exp>=40",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "40"
									},
									{
										"type": "setValue",
										"name": "status:def",
										"operator": "+=",
										"value": "5"
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"钥匙商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[盗贼,thief]又是你吗？这次我准备了\n比上次还要多的钥匙！",
						"choices": [
							{
								"text": "黄钥匙（20金币）",
								"need": "status:money>=20",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "20"
									},
									{
										"type": "setValue",
										"name": "item:yellowKey",
										"operator": "+=",
										"value": "1"
									}
								]
							},
							{
								"text": "蓝钥匙（80金币）",
								"need": "status:money>=80",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "80"
									},
									{
										"type": "setValue",
										"name": "item:blueKey",
										"operator": "+=",
										"value": "1"
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"随意门商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[老人,man]嗨！\n需要随意门吗？看你是老\n相识，一个$30好了。",
						"choices": [
							{
								"text": "买",
								"need": "status:money>=30",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "30"
									},
									{
										"type": "setValue",
										"name": "item:greenKey",
										"operator": "+=",
										"value": "1"
									}
								]
							},
							{
								"text": "不买",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"异国商人": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "if",
						"condition": "flag:bugFix",
						"true": [
							{
								"type": "choices",
								"text": "\t[异国商人,woman]战士你好，这里每件货品\n${20+flag:shop1}金币。",
								"choices": [
									{
										"text": "大回复药剂，体力+1200",
										"need": "status:money>=20+flag:shop1",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "20+flag:shop1"
											},
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:hp",
												"operator": "+=",
												"value": "1200"
											},
											{
												"type": "if",
												"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
												"true": [
													{
														"type": "setValue",
														"name": "flag:shop1",
														"operator": "+=",
														"value": "1"
													}
												]
											}
										]
									},
									{
										"text": "红水晶，攻击+6",
										"need": "status:money>=20+flag:shop1",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "20+flag:shop1"
											},
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:atk",
												"operator": "+=",
												"value": "6"
											},
											{
												"type": "if",
												"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
												"true": [
													{
														"type": "setValue",
														"name": "flag:shop1",
														"operator": "+=",
														"value": "1"
													}
												]
											}
										]
									},
									{
										"text": "蓝水晶，防御+6",
										"need": "status:money>=20+flag:shop1",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "20+flag:shop1"
											},
											{
												"type": "setValue",
												"name": "flag:shop1",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:def",
												"operator": "+=",
												"value": "6"
											},
											{
												"type": "if",
												"condition": "((flag:shop1>flag:shop1Cap)&&flag:bugFix)",
												"true": [
													{
														"type": "setValue",
														"name": "flag:shop1",
														"operator": "+=",
														"value": "1"
													}
												]
											}
										]
									},
									{
										"text": "离开",
										"action": [
											{
												"type": "break",
												"n": 1
											}
										]
									}
								]
							}
						],
						"false": [
							{
								"type": "choices",
								"text": "\t[异国商人,woman]战士你好，这里每件货品\n${50+2*flag:shop2}金币。",
								"choices": [
									{
										"text": "大回复药剂，体力+1200",
										"need": "status:money>=50+2*flag:shop2",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "50+2*flag:shop2"
											},
											{
												"type": "setValue",
												"name": "flag:shop2",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:hp",
												"operator": "+=",
												"value": "1200"
											}
										]
									},
									{
										"text": "红水晶，攻击+8",
										"need": "status:money>=50+2*flag:shop2",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "50+2*flag:shop2"
											},
											{
												"type": "setValue",
												"name": "flag:shop2",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:atk",
												"operator": "+=",
												"value": "8"
											}
										]
									},
									{
										"text": "蓝水晶，防御+8",
										"need": "status:money>=50+2*flag:shop2",
										"action": [
											{
												"type": "setValue",
												"name": "status:money",
												"operator": "-=",
												"value": "50+2*flag:shop2"
											},
											{
												"type": "setValue",
												"name": "flag:shop2",
												"operator": "+=",
												"value": "1"
											},
											{
												"type": "setValue",
												"name": "status:def",
												"operator": "+=",
												"value": "8"
											}
										]
									},
									{
										"text": "离开",
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
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"退役战士": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[退役战士,man]我老了，不能再参加战斗了。\n但我可以引导你的经验值\n转化为你的实质力量！",
						"choices": [
							{
								"text": "升3等级（190 exp）",
								"need": "status:exp>=190",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "190"
									},
									{
										"type": "setValue",
										"name": "status:lv",
										"operator": "+=",
										"value": "3"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "1000"
									},
									{
										"type": "setValue",
										"name": "status:atk",
										"operator": "+=",
										"value": "12"
									},
									{
										"type": "setValue",
										"name": "status:def",
										"operator": "+=",
										"value": "12"
									}
								]
							},
							{
								"text": "攻击+4（40 exp）",
								"need": "status:exp>=40",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "40"
									},
									{
										"type": "setValue",
										"name": "status:atk",
										"operator": "+=",
										"value": "4"
									}
								]
							},
							{
								"text": "防御+6（40 exp）",
								"need": "status:exp>=40",
								"action": [
									{
										"type": "setValue",
										"name": "status:exp",
										"operator": "-=",
										"value": "40"
									},
									{
										"type": "setValue",
										"name": "status:def",
										"operator": "+=",
										"value": "6"
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"奸商盗贼": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[盗贼,thief]黄钥匙-$50\n蓝钥匙-$200\n来买吧！",
						"choices": [
							{
								"text": "黄钥匙",
								"need": "status:money>=50",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "50"
									},
									{
										"type": "setValue",
										"name": "item:yellowKey",
										"operator": "+=",
										"value": "1"
									}
								]
							},
							{
								"text": "蓝钥匙",
								"need": "status:money>=200",
								"action": [
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "-=",
										"value": "200"
									},
									{
										"type": "setValue",
										"name": "item:blueKey",
										"operator": "+=",
										"value": "1"
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"回收钱币商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[富有老人,N409]我是来收购稀有的史莱姆\n钱币的，作为交换，我能\n回复你的体力，如何？",
						"choices": [
							{
								"text": "全部兑换",
								"action": [
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "(200*item:I398)"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "(400*item:I400)"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "(750*item:I403)"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "(1000*item:I407)"
									},
									{
										"type": "setValue",
										"name": "item:I398",
										"value": "0"
									},
									{
										"type": "setValue",
										"name": "item:I400",
										"value": "0"
									},
									{
										"type": "setValue",
										"name": "item:I403",
										"value": "0"
									},
									{
										"type": "setValue",
										"name": "item:I407",
										"value": "0"
									}
								]
							},
							{
								"text": "×${item:I398}：回复200体力",
								"icon": "I398",
								"need": "item:I398>=1",
								"action": [
									{
										"type": "setValue",
										"name": "item:I398",
										"operator": "-=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "200"
									}
								]
							},
							{
								"text": "×${item:I400}：回复400体力",
								"icon": "I400",
								"need": "item:I400>=1",
								"action": [
									{
										"type": "setValue",
										"name": "item:I400",
										"operator": "-=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "400"
									}
								]
							},
							{
								"text": "×${item:I403}：回复750体力",
								"icon": "I403",
								"need": "item:I403>=1",
								"action": [
									{
										"type": "setValue",
										"name": "item:I403",
										"operator": "-=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "750"
									}
								]
							},
							{
								"text": "×${item:I407}：回复1000体力",
								"icon": "I407",
								"need": "item:I407>=1",
								"action": [
									{
										"type": "setValue",
										"name": "item:I407",
										"operator": "-=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:hp",
										"operator": "+=",
										"value": "1000"
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"回收钥匙商店": [
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&!core.canUseItem('fly'))",
				"true": [
					"当前楼层不能使用黄金之羽根，无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.hasFlag('poison'))",
				"true": [
					"中毒时无法远距离使用商店",
					{
						"type": "exit"
					}
				]
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "true"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[盗贼,thief]附近被怪物袭击了，\n它们发现不到我吧？\n啊，对！你有钥匙卖给\n我吗？我需要大量的呢！",
						"choices": [
							{
								"text": "黄钥匙($10)",
								"need": "item:yellowKey>=1",
								"action": [
									{
										"type": "setValue",
										"name": "item:yellowKey",
										"operator": "-=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "+=",
										"value": "10"
									}
								]
							},
							{
								"text": "蓝钥匙($50)",
								"need": "item:blueKey>=1",
								"action": [
									{
										"type": "setValue",
										"name": "item:blueKey",
										"operator": "-=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "+=",
										"value": "50"
									}
								]
							},
							{
								"text": "红钥匙($200)",
								"need": "item:redKey>=1",
								"action": [
									{
										"type": "setValue",
										"name": "item:redKey",
										"operator": "-=",
										"value": "1"
									},
									{
										"type": "setValue",
										"name": "status:money",
										"operator": "+=",
										"value": "200"
									}
								]
							},
							{
								"text": "离开",
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
			},
			{
				"type": "setValue",
				"name": "flag:keyDown",
				"value": "false"
			},
			{
				"type": "if",
				"condition": "((core.status.hero.flags.arg1==true)&&core.canUseItem('fly'))",
				"true": [
					{
						"type": "if",
						"condition": "core.status.maps[core.status.floorId].underGround",
						"true": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "upFloor"
							}
						],
						"false": [
							{
								"type": "changeFloor",
								"floorId": ":now",
								"stair": "downFloor"
							}
						]
					}
				]
			}
		],
		"设置技能": [
			{
				"type": "input2",
				"text": "请输入技能：（格式见说明书）"
			},
			{
				"type": "setValue",
				"name": "flag:skillName",
				"value": "core.myFormatSkill(core.getFlag('input',''))"
			}
		],
		"技能库管理": [
			{
				"type": "setValue",
				"name": "temp:index",
				"value": "0"
			},
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "while",
						"condition": "1",
						"data": [
							{
								"type": "setValue",
								"name": "temp:index",
								"operator": "+=",
								"value": "Math.ceil((1+flags.skillHouse.length)/5)"
							},
							{
								"type": "setValue",
								"name": "temp:index",
								"value": "temp:index%Math.ceil((1+flags.skillHouse.length)/5)"
							},
							{
								"type": "choices",
								"text": "\t[技能库（${core.getFlag('@temp@index')+1}/${Math.ceil((1+flags.skillHouse.length)/5)}）]这里是系统为你推荐技能时使用的技能库。选择下方的技能以对其修改、删除或添加：",
								"choices": [
									{
										"text": "上一页",
										"action": [
											{
												"type": "setValue",
												"name": "temp:index",
												"operator": "-=",
												"value": "1"
											}
										]
									},
									{
										"text": "${flags.skillHouse[temp:index*5] || '添加新技能'}",
										"action": [
											{
												"type": "setValue",
												"name": "temp:index0",
												"value": "0"
											},
											{
												"type": "break",
												"n": 1
											}
										]
									},
									{
										"text": "${flags.skillHouse[temp:index*5+1] || '添加新技能'}",
										"action": [
											{
												"type": "setValue",
												"name": "temp:index0",
												"value": "1"
											},
											{
												"type": "break",
												"n": 1
											}
										]
									},
									{
										"text": "${flags.skillHouse[temp:index*5+2] || '添加新技能'}",
										"action": [
											{
												"type": "setValue",
												"name": "temp:index0",
												"value": "2"
											},
											{
												"type": "break",
												"n": 1
											}
										]
									},
									{
										"text": "${flags.skillHouse[temp:index*5+3] || '添加新技能'}",
										"action": [
											{
												"type": "setValue",
												"name": "temp:index0",
												"value": "3"
											},
											{
												"type": "break",
												"n": 1
											}
										]
									},
									{
										"text": "${flags.skillHouse[temp:index*5+4] || '添加新技能'}",
										"action": [
											{
												"type": "setValue",
												"name": "temp:index0",
												"value": "4"
											},
											{
												"type": "break",
												"n": 1
											}
										]
									},
									{
										"text": "下一页",
										"action": [
											{
												"type": "setValue",
												"name": "temp:index",
												"operator": "+=",
												"value": "1"
											}
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
					},
					{
						"type": "setValue",
						"name": "temp:index2",
						"value": "((temp:index*5)+temp:index0)"
					},
					{
						"type": "function",
						"function": "function(){\ncore.setFlag('@temp@name',flags.skillHouse[core.getFlag('@temp@index2')])\n}"
					},
					{
						"type": "if",
						"condition": "(temp:name!==0)",
						"true": [
							{
								"type": "choices",
								"text": "\t[${temp:name}]对此技能：",
								"choices": [
									{
										"text": "修改",
										"action": [
											{
												"type": "input2",
												"text": "将${temp:name}修改为？"
											},
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "core.myFormatSkill(core.getFlag('input',''),true)"
											},
											{
												"type": "if",
												"condition": "(flag:input!=='')",
												"true": [
													"成功将${temp:name}修改为${flags.input}",
													{
														"type": "function",
														"function": "function(){\nflags.skillHouse[core.getFlag('@temp@index2')]=flags.input\n}"
													}
												],
												"false": [
													"输入有误！请尝试使用技能面板（快捷键6）"
												]
											}
										]
									},
									{
										"text": "删除",
										"action": [
											{
												"type": "function",
												"function": "function(){\nflags.skillHouse.splice(core.getFlag('@temp@index2'),1)\n}"
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
						"false": [
							{
								"type": "input2",
								"text": "请输入要添加的新技能，支持批量输入（用,分隔），输入clearAll清空技能库"
							},
							{
								"type": "if",
								"condition": "(flag:input!=='')",
								"true": [
									{
										"type": "if",
										"condition": "(flag:input==='clearAll')",
										"true": [
											{
												"type": "setValue",
												"name": "flag:skillHouse",
												"value": "[]"
											},
											"成功清空技能库"
										],
										"false": [
											{
												"type": "setValue",
												"name": "flag:input0",
												"value": "flags.input.split(',')"
											},
											{
												"type": "setValue",
												"name": "flag:input",
												"value": "[]"
											},
											{
												"type": "function",
												"function": "function(){\nflags.input0.forEach(function (e){e=core.myFormatSkill(e,true);if (e != '') flags.input.push(e);})\n}"
											},
											{
												"type": "if",
												"condition": "(flags.input.length>0)",
												"true": [
													"成功添加${flags.input}至最前",
													{
														"type": "function",
														"function": "function(){\nflags.skillHouse=flags.input.concat(flags.skillHouse)\n}"
													},
													{
														"type": "setValue",
														"name": "temp:index",
														"value": "0"
													}
												],
												"false": [
													"输入有误！请尝试使用技能面板（快捷键6）"
												]
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
				"type": "function",
				"function": "function(){\ncore.clearMyCache('recomSkill')\n}"
			}
		],
		"高级设置": [
			{
				"type": "while",
				"condition": "1",
				"data": [
					{
						"type": "choices",
						"text": "\t[高级设置]这些设置保存在存档中，开新档需重新设置。",
						"choices": [
							{
								"text": "自动拾取功能设置",
								"action": [
									{
										"type": "while",
										"condition": "1",
										"data": [
											{
												"type": "choices",
												"text": "\t[自动拾取功能设置]推荐启用本功能，减少操作量；\n若你在修复版中需要完成「大难\n不死」、「起死回生」等成就，\n请将自动拾取血瓶关闭；\n不推荐开启自动拾取能力，因为\n攻击和防御的提升可能会有负面\n效果（进入教程1了解更多）。",
												"choices": [
													{
														"text": "关闭自动拾取功能",
														"condition": "flags.autoGetItem",
														"action": [
															{
																"type": "setValue",
																"name": "flag:autoGetItem",
																"value": "(!flag:autoGetItem)"
															},
															{
																"type": "setValue",
																"name": "flag:autoGetHp",
																"value": "false"
															},
															{
																"type": "setValue",
																"name": "flag:autoGetAd",
																"value": "false"
															}
														]
													},
													{
														"text": "打开自动拾取功能",
														"condition": "!flags.autoGetItem",
														"action": [
															{
																"type": "setValue",
																"name": "flag:autoGetItem",
																"value": "(!flag:autoGetItem)"
															}
														]
													},
													{
														"text": "自动拾取血瓶：${flags.autoGetHp?'ON':'OFF'}",
														"need": "flags.autoGetItem",
														"action": [
															{
																"type": "setValue",
																"name": "flag:autoGetHp",
																"value": "(!flag:autoGetHp)"
															}
														]
													},
													{
														"text": "自动拾取能力：${flags.autoGetAd?'ON':'OFF'}",
														"need": "flags.autoGetItem",
														"action": [
															{
																"type": "setValue",
																"name": "flag:autoGetAd",
																"value": "(!flag:autoGetAd)"
															}
														]
													},
													{
														"text": "返回",
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
							{
								"text": "冲突时优先快捷键：${flags.xinHotkey?'新新':'H5'}",
								"action": [
									{
										"type": "setValue",
										"name": "flag:xinHotkey",
										"value": "(!flag:xinHotkey)"
									},
									{
										"type": "function",
										"function": "function(){\ncore.drawFg(core.status.floorId);\n}"
									}
								]
							},
							{
								"text": "自动推荐技能战斗：${flags.autoRecomBattle?'ON':'OFF'}",
								"action": [
									{
										"type": "if",
										"condition": "(!flag:autoRecomBattle)",
										"true": [
											"此功能有较大局限性，对气息利用效果不佳。\n仅推荐对新新2战斗系统不了解的玩家使用。"
										]
									},
									{
										"type": "setValue",
										"name": "flag:autoRecomBattle",
										"value": "(!flag:autoRecomBattle)"
									},
									{
										"type": "function",
										"function": "function(){\ncore.clearMyCache('all')\n}"
									}
								]
							},
							{
								"text": "地图显示推荐技能：${flags.noRecomSkill?'OFF':'ON'}",
								"action": [
									"此功能在出现卡顿时推荐关闭。",
									{
										"type": "setValue",
										"name": "flag:noRecomSkill",
										"value": "(!flag:noRecomSkill)"
									}
								]
							},
							{
								"text": "异常战斗弹出提示：${flags.noBattleHint?'OFF':'ON'}",
								"action": [
									{
										"type": "setValue",
										"name": "flag:noBattleHint",
										"value": "(!flag:noBattleHint)"
									}
								]
							},
							{
								"text": "回放关闭临界推荐：${flags.replayCriRecom?'OFF':'ON'}",
								"action": [
									{
										"type": "setValue",
										"name": "flag:replayCriRecom",
										"value": "(!flag:replayCriRecom)"
									}
								]
							},
							{
								"text": "攻击临界计算上限：${core.getFlag('criMax',99)}",
								"action": [
									{
										"type": "input",
										"text": "请输入攻击临界的计算上限，默认值为99，值越大运行效率越低"
									},
									{
										"type": "if",
										"condition": "(flag:input>0)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:criMax",
												"value": "flag:input"
											},
											{
												"type": "function",
												"function": "function(){\ncore.clearMyCache('critical')\n}"
											}
										]
									}
								]
							},
							{
								"text": "推荐技能回合上限：${core.getFlag('recomTurnMax',10)}",
								"action": [
									{
										"type": "input",
										"text": "请输入推荐技能的回合数上限。战斗回合数大于此值时，不会使用技能库中的技能计算推荐技能，而是启用特殊技能库（反射盾系列），默认值为10，值越大运行效率越低"
									},
									{
										"type": "if",
										"condition": "(flag:input>0)",
										"true": [
											{
												"type": "setValue",
												"name": "flag:recomTurnMax",
												"value": "flag:input"
											},
											{
												"type": "function",
												"function": "function(){\ncore.clearMyCache('recomSkill')\n}"
											}
										]
									}
								]
							},
							{
								"text": "推荐技能最低气换血比例",
								"action": [
									{
										"type": "if",
										"condition": "0",
										"true": [
											{
												"type": "input2",
												"text": "输入计算表达式，当前为：${flags.hpManaRatio}\n(hero:勇者, lv:等级, atk:攻击, def:防御, mana:气息, manamax:气息条上限*6)"
											},
											"输入计算表达式，当前为：${flags.hpManaRatio}\n(hero:勇者, lv:等级, atk:攻击, def:防御, mana:气息, manamax:气息条上限*6)",
											{
												"type": "function",
												"function": "function(){\nvar ratio;try { ratio = core.calValue(flags.input) } catch (e) {} \tif (typeof ratio != 'number') core.insertAction([\"表达式有误！\"]);else flags.hpManaRatio=flags.input\n}"
											},
											{
												"type": "function",
												"function": "function(){\ncore.clearMyCache('recomSkill')\n}"
											}
										]
									},
									{
										"type": "input",
										"text": "请输入推荐技能最低气换血比例，必须为整数，暂时不支持表达式"
									},
									{
										"type": "if",
										"condition": "(flag:input>0)",
										"true": [
											{
												"type": "function",
												"function": "function(){\nflags.hpManaRatio=flags.input;core.clearMyCache('recomSkill')\n}"
											}
										]
									}
								]
							},
							{
								"text": "退出",
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
	}
}