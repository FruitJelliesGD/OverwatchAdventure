//=============================================================================
// Yanfly Engine Plugins - Job Points
// YEP_JobPoints.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_JobPoints = true;

var Yanfly = Yanfly || {};
Yanfly.JP = Yanfly.JP || {};
Yanfly.JP.version = 1.09;

//=============================================================================
 /*:
 * @plugindesc v1.09 YEP职业点
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text ---全局---
 * @default
 *
 * @param JP Text
 * @text 技能点文本
 * @parent ---General---
 * @desc 这会改变技能点（JP）在游戏中的显示方式
 * @default JP
 *
 * @param JP Icon
 * @text 技能点图标
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 如果不希望使用图标，请设置为 0
 * @default 188
 *
 * @param Max JP
 * @text 最大技能点
 * @parent ---General---
 * @type number
 * @min 0
 * @desc T每个角色在每个职业下可拥有的最大技能点（JP）。
如果希望没有上限，请设置为 0。
 * @default 0
 *
 * @param JP Per Action
 * @text 获得JP的动作
 * @parent ---General---
 * @desc 角色执行动作时，其当前职业所获得的技能点（JP）数量。
默认值：10 + Math.randomInt (10)
 *
 * @param JP Per Level
 * @text 升级获得的JP
 * @parent ---General---
 * @desc 角色每升一级所获得的技能点（JP）数量。
默认值：100 + Math.randomInt (100)
 *
 * @param JP Per Enemy
 * @text 击败敌人获得的JP
 * @parent ---General---
 * @desc 每击败一个敌人所获得的技能点（JP）数量。
默认值：50 + Math.randomInt (10)
 *
 * @param Show Results
 * @text 显示结果
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 获胜时，是否默认显示获得的技能点（JP）？
 * NO - false     YES - true
 * @default true
 *
 * @param JP Gained in Battle
 * @text JP胜利文本显示
 * @parent ---General---
 * @desc 调整战斗结束后获得技能点（JP）的文本显示方式。
%1 - 角色 %2 - 数值 %3 - JP
 * @default %1 获得了 %2%3!
 *
 * @param Alive Actors
 * @text 生存的角色获得JP
 * @parent ---General---
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc 从敌人那里获得技能点（JP）时，角色必须处于存活状态。
 * NO - false     YES - true
 * @default true
 *
 * @param ---Menu---
 * @text ---菜单---
 * @default
 *
 * @param Show In Menu
 * @text 显示菜单
 * @parent ---Menu---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在主菜单中显示技能点（JP）吗？
 * NO - false     YES - true
 * @default true
 *
 * @param Menu Format
 * @text 菜单格式
 * @parent ---Menu---
 * @desc 菜单中技能点（JP）文本的显示格式。
%1 - 数值 %2 - 数量 %3 - 图标
 * @default %1\c[4]%2\c[0]%3
 *
 * @param ---Victory Aftermath---
 * @text ---胜利之后---
 * @default
 *
 * @param Enable Aftermath
 * @text 启用胜利
 * @parent ---Victory Aftermath---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 启用胜利结算窗口
 * NO - false     YES - true
 * @default true
 *
 * @param Aftermath Text
 * @text 胜利文本
 * @parent ---Victory Aftermath---
 * @desc 用于描述获得的技能点（JP）数量的文本
 * @default 获得的 JP
 *
 * @param Aftermath Format
 * @text 胜利格式
 * @parent ---Victory Aftermath---
 * @desc 胜利结算中技能点（JP）文本的显示格式。
 * %1 - 数值 %2 - 数量 %3 - 图标
 * @default +%1\c[4]%2\c[0]%3
 *
 * @param Aftermath JP Earned
 * @text 胜利JP启用
 * @parent ---Victory Aftermath---
 * @desc 描述每个角色获得的技能点（JP）数量
 * @default 战斗中获得的 JP
 *
 * @help
 * ============================================================================
 * 导言
 * ============================================================================
 * 
   职业点（JP）是与角色当前职业绑定的点数，
   可用于学习职业技能、解锁职业特性等（需配合其他依赖此插件的插件使用）。
   角色切换职业后，JP 会对应切换到新职业的点数，换回原职业时恢复之前的积累。
 * 
    ============================================================================
 *  注释标签
 *  ============================================================================
 * 
 * 以下是一些与职业相关的注释标签
 * 
 *   角色备注
 *   <Starting JP: x>
 *   设置职业初始职业点
 *
 *   <Class x Starting JP: y>
 *   设置职业x的初始职业点y
 *
 *   <JP Rate: x%>
 *   设置职业点增加率。默认是100%。
 *   如果设置200%则会获得2倍职业点，50%则获得一半。
 *
 * 技能 / 物品（Skills/Items）
 *   <JP Gain: x>
 *   使用技能或者物品可以获得x个职业点
 *   
 *   <Target JP Gain: x>
 *   目标角色可以获得x个职业点。
 *
 * 职业 / 武器 / 装备 / 状态（Classes/Weapons/Armors/States）
 *   <JP Rate: x%>
 *   设置职业点增加率。默认是100%。
 *   如果设置200%则会获得2倍职业点，50%则获得一半。
 *   
 * 敌人（Enemies）
 *   <JP: x>
 *  敌方被击败时，每个队伍成员获得x职业点
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 在事件中通过插件命令手动修改 JP：
 *
 * 插件命令:
 *
   gainJp actorId jp：给 ID 为 actorId 的角色当前职业增加 jp 点。
   gainJp actorId jp classId：给 ID 为 actorId 的角色的 classId 职业增加 jp 点。
   loseJp actorId jp / loseJp actorId jp classId：减少 JP（用法同上）。
   setJp actorId jp / setJp actorId jp classId：直接设置 JP 为指定值（用法同上）。
   
   
 * ============================================================================
   兼容性
 * ============================================================================
 
  与 YEP_VictoryAftermath 插件配合时，需将本插件放在其下方
  ，可在胜利界面显示 JP 获得窗口。
  
  与 YEP_X_Subclass（副职业）插件兼容，
  副职业可按比例获得 JP（需在副职业插件中设置）。
  
  
 * ============================================================================
   注意事项
 * ============================================================================
  JP 与职业绑定，角色切换职业后，JP 会自动切换到对应职业的积累值。
  若设置了 “最大 JP”，超过上限的部分会被截断。
  战斗中获得的 JP 会临时存储，战斗结束后结算（死亡角色可能无法获得敌人 JP，取决于参数设置）。
  通过以上配置和标签，可灵活设计职业点系统，实现职业成长与技能解锁等玩法。
 
 
 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.08:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.07:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.06:
 * - Added 'Alive Actors' plugin parameter to prevent dead actors from gaining
 * JP from enemies. Any JP that currently dead actors earned in battle from
 * actions will still be 'earned' at the end of battle.
 *
 * Version 1.05:
 * - Updated compatibility for Subclasses gaining JP.
 *
 * Version 1.04a:
 * - Added failsafes to prevent JP from turning into NaN midbattle.
 * - Added failsafes to prevent no-target scopes from crashing the game.
 *
 * Version 1.03:
 * - Added 'Show Results' parameter to show/hide JP earned after battle for
 * those who aren't using the Victory Aftermath plugin.
 *
 * Version 1.02:
 * - Fixed a bug that would gain JP for changing classes of a higher level.
 *
 * Version 1.01:
 * - Added failsafes to prevent JP from turning into NaN.
 * 
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_JobPoints');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.Jp = String(Yanfly.Parameters['JP Text']);
Yanfly.Icon.Jp = Number(Yanfly.Parameters['JP Icon']);
Yanfly.Param.JpMax = Number(Yanfly.Parameters['Max JP']);
Yanfly.Param.JpPerAction = String(Yanfly.Parameters['JP Per Action']);
Yanfly.Param.JpPerEnemy = String(Yanfly.Parameters['JP Per Enemy']);
Yanfly.Param.JpShowResults = eval(String(Yanfly.Parameters['Show Results']));
Yanfly.Param.JpTextFormat = String(Yanfly.Parameters['JP Gained in Battle']);
Yanfly.Param.JpAliveActors = eval(String(Yanfly.Parameters['Alive Actors']));

Yanfly.Param.JpShowMenu = String(Yanfly.Parameters['Show In Menu']);
Yanfly.Param.JpShowMenu = eval(Yanfly.Param.JpShowMenu);
Yanfly.Param.JpMenuFormat = String(Yanfly.Parameters['Menu Format']);

Yanfly.Param.JpPerLevel = String(Yanfly.Parameters['JP Per Level']);
Yanfly.Param.JpEnableAftermath = String(Yanfly.Parameters['Enable Aftermath']);
Yanfly.Param.JpAftermathText = String(Yanfly.Parameters['Aftermath Text']);
Yanfly.Param.JpAftermathFmt = String(Yanfly.Parameters['Aftermath Format']);
Yanfly.Param.JpAftermathEarn = String(Yanfly.Parameters['Aftermath JP Earned']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.JP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.JP.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_JobPoints) {
  	this.processJPNotetags1($dataActors);
    this.processJPNotetags2($dataSkills);
    this.processJPNotetags2($dataItems);
  	this.processJPNotetags3($dataEnemies);
  	this.processJPNotetags4($dataClasses);
  	this.processJPNotetags4($dataWeapons);
  	this.processJPNotetags4($dataArmors);
  	this.processJPNotetags4($dataStates);
    Yanfly._loaded_YEP_JobPoints = true;
  }
	return true;
};

DataManager.processJPNotetags1 = function(group) {
  var note1 = /<(?:STARTING JP):[ ](\d+)>/i;
  var note2 = /<(?:CLASS)[ ](\d+)[ ](?:STARTING JP):[ ](\d+)>/i;
	var note3 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.startingJp = {};
		obj.jpRate = 1.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.startingJp[obj.classId] = parseInt(RegExp.$1);
			} else if (line.match(note2)) {
        obj.startingJp[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note3)) {
				obj.jpRate = parseFloat(RegExp.$1 * 0.01);
			}
		}
	}
};

DataManager.processJPNotetags2 = function(group) {
  var note1 = /<(?:GAIN JP|JP GAIN):[ ](\d+)>/i;
  var note2 = /<(?:TARGET GAIN JP|TARGET JP GAIN):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.gainJp = Yanfly.Param.JpPerAction;
    obj.targetGainJp = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.gainJp = parseInt(RegExp.$1);
			} else if (line.match(note2)) {
				obj.targetGainJp = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processJPNotetags3 = function(group) {
  var note1 = /<(?:JP):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.jp = Yanfly.Param.JpPerEnemy;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.jp = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processJPNotetags4 = function(group) {
  var note1 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.jpRate = 1.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.jpRate = parseFloat(RegExp.$1 * 0.01);
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.JP.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    Yanfly.JP.BattleManager_makeRewards.call(this);
    this._rewards.jp = $gameTroop.jpTotal();
    this.gainJp();
};

BattleManager.gainJp = function() {
		var jp = $gameTroop.jpTotal();
		$gameMessage.newPage();
    if (Yanfly.Param.JpAliveActors) {
      var members = $gameParty.aliveMembers();
    } else {
      var members = $gameParty.members();
    }
		members.forEach(function(actor) {
			actor.gainJp(jp);
		});
};

Yanfly.JP.BattleManager_displayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    Yanfly.JP.BattleManager_displayRewards.call(this);
		this.displayJpGain();
};

BattleManager.displayJpGain = function() {
    if (!Yanfly.Param.JpShowResults) return;
    var jp = $gameTroop.jpTotal();
    $gameMessage.newPage();
    $gameParty.members().forEach(function(actor) {
			var fmt = Yanfly.Param.JpTextFormat;
			var text = fmt.format(actor.name(), Yanfly.Util.toGroup(actor.battleJp()),
				Yanfly.Param.Jp);
			$gameMessage.add('\\.' + text);
		});
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.JP.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Yanfly.JP.Game_Battler_useItem.call(this, item);
    if (!$gameParty.inBattle()) return;
    if (this.isActor()) this.gainJp(eval(item.gainJp), this.currentClass().id);
};

Yanfly.JP.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.JP.Game_Battler_onBattleStart.call(this);
		this._battleJp = 0;
};

Yanfly.JP.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.JP.Game_Battler_onBattleEnd.call(this);
    this._battleJp = 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.JP.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.JP.Game_Actor_setup.call(this, actorId);
    this.initJp();
};

Game_Actor.prototype.jp = function(classId) {
    if (!this._jp) this.initJp();
		if (!this._jp) return 0;
    if (classId === undefined) classId = this.currentClass().id;
    if (!this._jp[classId]) this._jp[classId] = 0;
    return this._jp[classId];
};

Game_Actor.prototype.initJp = function() {
    var actor = this.actor();
    for (var i = 0; i < $dataClasses.length; i++) {
			if (actor.startingJp) {
				var jp = actor.startingJp[i] || 0;
				this.setJp(jp, i);
			}
    }
};

Game_Actor.prototype.setJp = function(value, classId) {
    value = parseInt(value);
    if (value === NaN) value = 0;
    classId = classId || this.currentClass().id;
		if (!this._jp) this._jp = {};
    if (!this._jp[classId]) this._jp[classId] = 0;
    this._jp[classId] = Math.max(0, value);
    if (Yanfly.Param.JpMax > 0) {
      this._jp[classId] = Math.min(Yanfly.Param.JpMax, value);
    }
};

Game_Actor.prototype.jpRate = function() {
		var rate = 1.0;
		rate *= this.actor().jpRate;
		rate *= this.currentClass().jpRate;
		var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) rate *= item.jpRate;
    }
		var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (state) rate *= state.jpRate;
    }
		return rate;
};

Game_Actor.prototype.gainJp = function(value, classId) {
    value = parseInt(value);
    if (value === NaN) value = 0;
		classId = classId || this.currentClass().id;
		value = Math.floor(value * this.jpRate());
		if ($gameParty.inBattle()) {
      this._battleJp = this._battleJp || 0;
			this._battleJp += value;
		}
		this.setJp(this.jp(classId) + value, classId);
    if (classId === this.currentClass().id && this.isSublcassEarnJp()) {
      this.gainJpSubclass(value);
    }
};

Game_Actor.prototype.isSublcassEarnJp = function() {
    if (!Imported.YEP_X_Subclass) return false;
    if (!this.subclass()) return false;
    return Yanfly.Param.SubclassJp;
};

Game_Actor.prototype.gainJpSubclass = function(value) {
    var classId = this.subclass().id;
    value = Math.round(value * Yanfly.Param.SubclassJp);
    this.setJp(this.jp(classId) + value, classId);
};

Game_Actor.prototype.loseJp = function(value, classId) {
		classId = classId || this.currentClass().id;
		this.setJp(this.jp(classId) - value, classId);
};

Game_Actor.prototype.battleJp = function() {
    this._battleJp = this._battleJp || 0;
		return this._battleJp;
};

Yanfly.JP.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    this._preventJpLevelUpGain = true;
    Yanfly.JP.Game_Actor_changeClass.call(this, classId, keepExp);
    this._preventJpLevelUpGain = false;
};

Yanfly.JP.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Yanfly.JP.Game_Actor_levelUp.call(this);
    if (this._preventJpLevelUpGain) return;
    var user = this;
    var target = this;
    var a = this;
    var b = this;
    var level = this.level;
    var code = Yanfly.Param.JpPerLevel;
    try {
      var value = eval(code)
    } catch (e) {
      var value = 0;
      Yanfly.Util.displayError(e, code, 'LEVEL UP JP FORMULA ERROR');
    }
		this.gainJp(value, this.currentClass().id);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.jp = function() {
    var user = this;
    var target = this;
    var a = this;
    var b = this;
    var code = this.enemy().jp;
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ENEMY JP FORMULA ERROR');
      return 0;
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.JP.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.JP.Game_Action_applyItemUserEffect.call(this, target);
    if (target) this.applyItemJpEffect(target);
};

Game_Action.prototype.applyItemJpEffect = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isActor()) target.gainJp(item.targetGainJp);
};

Yanfly.JP.Game_Action_hasItemAnyValidEffects =
    Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isActor() && item.targetGainJp !== 0) return true;
    return Yanfly.JP.Game_Action_hasItemAnyValidEffects.call(this, target);
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.jpTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.jp();
    }, 0);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.JP.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.JP.Game_Interpreter_pluginCommand.call(this, command, args)
  	if (command === 'gainJp') this.modifyJp('gain', args);
    if (command === 'loseJp') this.modifyJp('lose', args);
    if (command === 'setJp') this.modifyJp('set', args);
};

Game_Interpreter.prototype.modifyJp = function(type, args) {
    if (!args) return;
    var actorId = parseInt(args[0]);
    var actor = $gameActors.actor(actorId);
    var jpValue = args[1] || 0;
    jpValue = parseInt(jpValue);
    var classId = args[2] || 0;
    classId = parseInt(classId);
    if (jpValue <= 0) return;
    if (classId <= 0) classId = actor.currentClass().id;
    if (type === 'gain') {
      actor.gainJp(jpValue, classId);
    } else if (type === 'lose') {
      actor.loseJp(jpValue, classId);
    } else if (type === 'set') {
      actor.setJp(jpValue, classId);
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.JP.Window_Base_dASS = Window_Base.prototype.drawActorSimpleStatus;
Window_Base.prototype.drawActorSimpleStatus = function(actor, wx, wy, ww) {
    this._drawMenuJP = Yanfly.Param.JpShowMenu;
    Yanfly.JP.Window_Base_dASS.call(this, actor, wx, wy, ww);
    this._drawMenuJP = undefined;
};

Yanfly.JP.Window_Base_drawActorClass = Window_Base.prototype.drawActorClass;
Window_Base.prototype.drawActorClass = function(actor, wx, wy, ww) {
    ww = ww || 168;
    Yanfly.JP.Window_Base_drawActorClass.call(this, actor, wx, wy, ww);
    if (!this._drawMenuJP) return;
    var classId = actor.currentClass().id;
    this.drawActorJp(actor, classId, wx, wy, ww, 'right');
};

Window_Base.prototype.drawActorJp = function(actor, id, wx, wy, ww, align) {
    var jp = actor.jp(id);
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(Yanfly.Util.toGroup(jp), Yanfly.Param.Jp, icon);
    if (align === 'left') {
      wx = 0;
    } else if (align === 'center') {
      wx += (ww - this.textWidthEx(text)) / 2;
    } else {
      wx += ww - this.textWidthEx(text);
    }
    this.drawTextEx(text, wx, wy);
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_VictoryJp
//=============================================================================

if (Imported.YEP_VictoryAftermath && Yanfly.Param.JpEnableAftermath) {

function Window_VictoryJp() {
    this.initialize.apply(this, arguments);
}

Window_VictoryJp.prototype = Object.create(Window_VictoryExp.prototype);
Window_VictoryJp.prototype.constructor = Window_VictoryJp;

Window_VictoryJp.prototype.drawActorGauge = function(actor, index) {
    this.clearGaugeRect(index);
    var rect = this.gaugeRect(index);
    this.changeTextColor(this.normalColor());
    this.drawActorName(actor, rect.x + 2, rect.y);
    this.drawLevel(actor, rect);
    this.drawJpGained(actor, rect);
};

Window_VictoryJp.prototype.drawJpGained = function(actor, rect) {
    var wy = rect.y + this.lineHeight() * 1;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.JpAftermathEarn, rect.x + 2, wy, rect.width - 4,
      'left');
    var bonusJp = 1.0 * actor.battleJp() * this._tick /
      Yanfly.Param.VAGaugeTicks;
    var value = Yanfly.Util.toGroup(parseInt(bonusJp));
    var fmt = Yanfly.Param.JpAftermathFmt;
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var JpText = fmt.format(value, Yanfly.Param.Jp, icon);
    this.changeTextColor(this.normalColor());
    wx = rect.x + rect.width - this.textWidthEx(JpText);
    this.drawTextEx(JpText, wx, wy);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.JP.Scene_Battle_addCustomVictorySteps =
    Scene_Battle.prototype.addCustomVictorySteps;
Scene_Battle.prototype.addCustomVictorySteps = function(array) {
    array = Yanfly.JP.Scene_Battle_addCustomVictorySteps.call(this, array);
    if (!array.contains('JP')) array.push('JP');
    return array;
};

Yanfly.JP.Scene_Battle_updateVictorySteps =
    Scene_Battle.prototype.updateVictorySteps;
Scene_Battle.prototype.updateVictorySteps = function() {
    Yanfly.JP.Scene_Battle_updateVictorySteps.call(this);
    if (this.isVictoryStep('JP')) this.updateVictoryJp();
};

Scene_Battle.prototype.updateVictoryJp = function() {
    if (!this._victoryJpWindow) {
      this.createVictoryJp();
    } else if (this._victoryJpWindow.isReady()) {
      if (this.victoryTriggerContinue()) this.finishVictoryJp();
    }
};

Scene_Battle.prototype.createVictoryJp = function() {
    this._victoryTitleWindow.refresh(Yanfly.Param.JpAftermathText);
    this._victoryJpWindow = new Window_VictoryJp();
    this.addWindow(this._victoryJpWindow);
    this._victoryJpWindow.open();
};

Scene_Battle.prototype.finishVictoryJp = function() {
    SoundManager.playOk();
    this._victoryJpWindow.close();
    this.processNextVictoryStep();
};

}; // Imported.YEP_VictoryAftermath

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
		Yanfly.Util.toGroup = function(inVal) {
				return inVal;
		}
};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
