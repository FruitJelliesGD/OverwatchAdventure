//=============================================================================
// Yanfly Engine Plugins - Equip Core
// YEP_EquipCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EquipCore = true;

var Yanfly = Yanfly || {};
Yanfly.Equip = Yanfly.Equip || {};
Yanfly.Equip.version = 1.18;

//=============================================================================
 /*:
 * @plugindesc YEP装备核心[v1.18]
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text --- 通用设置 ---
 * @default
 *
 * @param Text Align
 * @text 文本对齐
 * @parent ---General---
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中对齐
 * @value center
 * @option 右对齐
 * @value right
 * @desc 命令窗口中文本的对齐方式
 * @default left
 *
 * @param Finish Command
 * @text 完成命令
 * @parent ---General---
 * @desc 退出装备界面的命令文本
 留空则不显示该命令
 * @default 返回
 *
 * @param Remove Text
 * @text 移除文本
 * @parent ---General---
 * @desc 装备物品列表中 “移除” 命令的显示文本
 * @default 卸下
 *
 * @param Remove Icon
 * @text 移除图标
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 装备物品列表中 “移除” 命令旁显示的图标 ID
 * @default 74
 *
 * @param Empty Text
 * @text 空槽文本
 * @parent ---General---
 * @desc 显示 “空装备槽” 时的文本
 * @default <空>
 *
 * @param Empty Icon
 * @text 空槽图标
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 空装备槽旁显示的图标 ID
 * @default 16
 *
 * @param ---Rules---
 * @text --- 规则设置 ---
 * @default
 *
 * @param Non-Removable Types
 * @text 不可移除类型
 * @parent ---Rules---
 * @type number
 * @min 1
 * @max 100
 * @desc 必须始终装备物品、不能为空的装备类型 ID
 * @default 0
 *
 * @param Non-Optimized Types
 * @text 不可优化类型
 * @parent ---Rules---
 * @type number
 * @min 1
 * @max 100
 * @desc 角色 “优化装备” 时会忽略的装备类型 ID，用空格分隔
 * @default 0
 *
 * @help
 * ============================================================================
 * 插件说明
 * ============================================================================
 *
 * 主要功能
 *
 * 1. 装备界面（Scene_Equip）优化
   调整了装备界面的样式，使主菜单场景更统一
   便于后续扩展插件添加命令
 *
 * 2. 装备类型管理
 * 角色不再使用统一的装备槽设置，不同职业可通
 过备注标签自定义装备槽；名称相同的装备类型会被视为同一类型
 *
 * 3. 装备规则控制
 * 可设置某些装备类型必须始终装备（不可移除）
 或在 “优化装备” 时忽略特定类型
 *
 * 4. 参数自定义
 * 通过备注标签调整装备的参数（突破编辑器限制）
 甚至通过代码实现动态参数变化
 *
 *
 * ============================================================================
 * 备注标签使用
 * ============================================================================
 *
自定义职业装备槽
默认情况下，所有职业使用相同的装备槽（数据库 “类型” 中定义的所有装备类型）
通过职业备注标签可自定义每个职业的装备槽（如战士双持武器、法师多戴饰品）
 
 
在职业的 “备注” 栏中添加：
<Equip Slot: x, x, x>

x 为装备类型 ID
[可在数据库 “类型”→“装备类型” 中查看
武器通常为 1，防具从 2 开始]
重复 ID 表示允许装备多个同类型物品

示例：
<Equip Slot: 1, 1, 3, 5, 5>

<Equip Slot>
武器
护甲
饰品
饰品
</Equip Slot>

 
武器 / 防具备注标签（用于调整参数）

直接修改基础参数

示例：
<atk: +50> 
<def: -10>
hp（生命值）、mp（魔法值）、atk（攻击力）、def（防御力）
mat（魔法攻击）、mdf（魔法防御）、agi（敏捷）、luk（幸运）

 * ============================================================================
 * 自定义参数（Lunatic 模式）
 * ============================================================================
<Custom Parameters>  Example: <Custom Parameters>
code                          atk = $gameVariables.value(1);
code                          mat = atk / 2;
code                          all = $gameParty.members().length;
code                         </Custom Parameters>
</Code Parameters>
若未设置，将使用默认装备槽（数据库中所有装备类型）
 *
 * ============================================================================
 * 更新 
 * ============================================================================
 *
 * Version 1.18:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.17:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.16:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.15:
 * - Optimization update.
 *
 * Version 1.14:
 * - Added an actor refresh upon listing the various equip slots to ensure that
 * all slots are updated in case any cache'd instances may have been missed.
 *
 * Version 1.13:
 * - Fixed a bug that caused a crash for those who weren't using the Item Core
 * in addition to this plugin.
 *
 * Version 1.12:
 * - Added optional functionality. Leaving 'Finish Command' empty will remove
 * it from being added to the command list.
 *
 * Version 1.11:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.10:
 * - Fixed a bug that did not clear changes made to an actor's stats after
 * having unequipped them and then switching actors.
 *
 * Version 1.09:
 * - For users using the Item Core plugin and the new Item Scene layout option,
 * the Item Info Window is now added to the Equip Scene. Pressing Left/Right
 * will toggle the stat comparison window with the info window. Pressing Tab on
 * the keyboard will also switch them as well as clicking on those windows.
 *
 * Version 1.08:
 * - Fixed a bug where changing an actor's equips would revive them if dead.
 *
 * Version 1.07:
 * - Fixed a bug with 'Optimize' and 'Remove All' not refreshing windows.
 *
 * Version 1.06:
 * - Fixed a bug with 'Change Equipment' event where it would only change the
 * slot of the marked equipment rather than the slot type.
 *
 * Version 1.05:
 * - Fixed an issue where unequipping items can kill actors.
 *
 * Version 1.04a:
 * - Fixed a bug and rewrote the initializing equipment process.
 *
 * Version 1.03:
 * - Fixed an bug that resulted in null object errors.
 *
 * Version 1.02:
 * - Fixed an issue that did not keep HP and MP rates the same when using the
 * optimize and clear commands.
 *
 * Version 1.01:
 * - Fixed a bug that did not update the stats properly when compared.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EquipCore');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.EquipTextAlign = String(Yanfly.Parameters['Text Align']);
Yanfly.Param.EquipFinishCmd = String(Yanfly.Parameters['Finish Command']);
Yanfly.Param.EquipRemoveText = String(Yanfly.Parameters['Remove Text']);
Yanfly.Icon.RemoveEquip = Number(Yanfly.Parameters['Remove Icon']);
Yanfly.Param.EquipEmptyText = String(Yanfly.Parameters['Empty Text']);
Yanfly.Icon.EmptyEquip = Number(Yanfly.Parameters['Empty Icon']);
Yanfly.Data = String(Yanfly.Parameters['Non-Removable Types']);
Yanfly.Data = Yanfly.Data.split(' ');
Yanfly.Param.EquipNonRemove = [];
for (Yanfly.i = 0; Yanfly.i < Yanfly.Data.length; ++Yanfly.i) {
  Yanfly.Param.EquipNonRemove.push(parseInt(Yanfly.Data[Yanfly.i]));
};
Yanfly.Data = String(Yanfly.Parameters['Non-Optimized Types']);
Yanfly.Data = Yanfly.Data.split(' ');
Yanfly.Param.EquipNonOptimized = [];
for (Yanfly.i = 0; Yanfly.i < Yanfly.Data.length; ++Yanfly.i) {
  Yanfly.Param.EquipNonOptimized.push(parseInt(Yanfly.Data[Yanfly.i]));
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Equip.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Equip.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_EquipCore) {
    DataManager.processEquipNotetags1($dataClasses);
    DataManager.processEquipNotetags2($dataWeapons);
    DataManager.processEquipNotetags2($dataArmors);
    Yanfly._loaded_YEP_EquipCore = true;
  }
  return true;
};

DataManager.processEquipNotetags1 = function(group) {
  var note1 = /<(?:EQUIP SLOT|equip slots):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:EQUIP SLOT|equip slots)>/i;
  var note3 = /<\/(?:EQUIP SLOT|equip slots)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.equipSlots = [];
    var equipSlots = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.equipSlots = obj.equipSlots.concat(array);
      } else if (line.match(note2)) {
        equipSlots = true;
      } else if (line.match(note3)) {
        equipSlots = false;
      } else if (equipSlots && line.match(/[ ]*(.*)/i)) {
        var name = String(RegExp.$1);
        var slotId = $dataSystem.equipTypes.indexOf(name);
        if (slotId >= 0) obj.equipSlots.push(slotId);
      }
    }
    if (obj.equipSlots.length <= 0) this.setDefaultEquipSlots(obj);
  }
};

DataManager.setDefaultEquipSlots = function(obj) {
    for (var i = 1; i < $dataSystem.equipTypes.length; ++i) {
      var name = $dataSystem.equipTypes[i];
      var slotId = $dataSystem.equipTypes.indexOf(name);
      if (slotId >= 0) obj.equipSlots.push(slotId);
    }
};

DataManager.processEquipNotetags2 = function(group) {
  var note1 = /<(?:PARAMETER EVAL|custom parameter|custom parameters)>/i;
  var note2 = /<\/(?:PARAMETER EVAL|custom parameter|custom parameters)>/i;
  var note3 = /<(.*):[ ]([\+\-]\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.parameterEval = '';
    var parameterEval = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        parameterEval = true;
      } else if (line.match(note2)) {
        parameterEval = false;
      } else if (parameterEval) {
        obj.parameterEval = obj.parameterEval + line + '\n';
      } else if (line.match(note3)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT' || 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          }
      }
    }
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.initEquips = function(equips) {
    var equips = this.convertInitEquips(equips);
    this.equipInitEquips(equips);
    this.releaseUnequippableItems(true);
    this.recoverAll();
    this.refresh();
};

Game_Actor.prototype.convertInitEquips = function(equips) {
    var items = [];
    for (var i = 0; i < equips.length; ++i) {
      var equipId = equips[i];
      if (equipId <= 0) continue;
      var equipType = $dataSystem.equipTypes[i + 1];
      if (equipType === $dataSystem.equipTypes[1] ||
      (i === 1 && this.isDualWield())) {
        var equip = $dataWeapons[equipId];
      } else {
        var equip = $dataArmors[equipId];
      }
      items.push(equip);
    }
    return items;
};

Game_Actor.prototype.equipInitEquips = function(equips) {
    var slots = this.equipSlots();
    var maxSlots = slots.length;
    this._equips = [];
    for (var i = 0; i < maxSlots; ++i) {
      this._equips[i] = new Game_Item();
    }
    for (var i = 0; i < maxSlots; ++i) {
      var slotType = slots[i];
      var equip = this.grabInitEquips(equips, slotType);
      if (this.canEquip(equip)) this._equips[i].setObject(equip);
    }
};

Game_Actor.prototype.grabInitEquips = function(equips, slotType) {
    var item = null;
    for (var i = 0; i < equips.length; ++i) {
      var equip = equips[i];
      if (!equip) continue;
      if (slotType === 1 && DataManager.isWeapon(equip)) {
        item = equip;
        break;
      } else if (equip.etypeId === slotType) {
        item = equip;
        break;
      }
    }
    if (item) equips[i] = null;
    return item;
};

Game_Actor.prototype.equipSlots = function() {
    var slots = this.currentClass().equipSlots.slice();
    if (slots.length >= 2 && this.isDualWield()) slots[1] = 1;
    return slots;
};

Yanfly.Equip.Game_Actor_equips = Game_Actor.prototype.equips;
Game_Actor.prototype.equips = function() {
    for (var i = 0; i < this.currentClass().equipSlots.length; ++i) {
      if (this._equips[i] === undefined || this._equips[i] === null) {
        this._equips[i] = new Game_Item();
      }
    }
    return Yanfly.Equip.Game_Actor_equips.call(this);
};

Yanfly.Equip.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    if (!this._equips[slotId]) this._equips[slotId] = new Game_Item();
    Yanfly.Equip.Game_Actor_changeEquip.call(this, slotId, item);
};

Yanfly.Equip.Game_Actor_forceChangeEquip =
    Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    if (!this._equips[slotId]) {
      this._equips[slotId] = new Game_Item();
      this._equips[slotId].setEquip(this.equipSlots()[slotId] === 1, 0);
    }
    Yanfly.Equip.Game_Actor_forceChangeEquip.call(this, slotId, item);
};

Yanfly.Equip.Game_Actor_isEquipChangeOk = Game_Actor.prototype.isEquipChangeOk;
Game_Actor.prototype.isEquipChangeOk = function(slotId) {
    if ($gameTemp._clearEquipments) {
      var typeId = this.equipSlots()[slotId];
      if (Yanfly.Param.EquipNonRemove.contains(typeId)) return false;
    }
    if ($gameTemp._optimizeEquipments) {
      var typeId = this.equipSlots()[slotId];
      if (Yanfly.Param.EquipNonOptimized.contains(typeId)) return false;
    }
    return Yanfly.Equip.Game_Actor_isEquipChangeOk.call(this, slotId);
};

Yanfly.Equip.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    value = Yanfly.Equip.Game_Actor_paramPlus.call(this, paramId);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
      var item = equips[i];
      if (!item) continue;
      value += this.customParamPlus(item, paramId);
      value += this.evalParamPlus(item, paramId);
    }
    return value;
};

Game_Actor.prototype.customParamPlus = function(item, paramId) {
    return 0;
};

Game_Actor.prototype.evalParamPlus = function(item, paramId) {
    if (!item) return 0;
    if (!item.parameterEval || item.parameterEval === '') return 0;
    var value = 0;
    var hp = 0;
    var maxhp = 0;
    var mhp = 0;
    var mp = 0;
    var maxmp = 0;
    var mmp = 0;
    var sp = 0;
    var maxsp = 0;
    var msp = 0;
    var atk = 0;
    var str = 0;
    var def = 0;
    var mat = 0;
    var int = 0;
    var spi = 0;
    var mdf = 0;
    var res = 0;
    var agi = 0;
    var spd = 0;
    var luk = 0;
    var all = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.parameterEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM PARAMETER FORMULA ERROR');
    }
    switch (paramId) {
      case 0:
        value += hp + maxhp + mhp;
        break;
      case 1:
        value += mp + maxmp + mmp + sp + maxsp + msp;
        break;
      case 2:
        value += atk + str;
        break;
      case 3:
        value += def;
        break;
      case 4:
        value += mat + int + spi;
        break;
      case 5:
        value += mdf + res;
        break;
      case 6:
        value += agi + spd;
        break;
      case 7:
        value += luk;
        break;
    }
    return value + all;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Change Equipment
Game_Interpreter.prototype.command319 = function() {
    var actor = $gameActors.actor(this._params[0]);
    if (!actor) return true;
    var index = actor.equipSlots().indexOf(this._params[1]) + 1;
    actor.changeEquipById(index, this._params[2]);
    return true;
};

//=============================================================================
// Window_EquipCommand
//=============================================================================

Window_EquipCommand.prototype.windowWidth = function() {
    return 240;
};

Window_EquipCommand.prototype.maxCols = function() {
    return 1;
};

Window_EquipCommand.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_EquipCommand.prototype.numVisibleRows = function() {
    return 4;
};

Window_EquipCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.EquipTextAlign;
};

Yanfly.Equip.Window_EquipCommand_makeCommandList =
    Window_EquipCommand.prototype.makeCommandList;
Window_EquipCommand.prototype.makeCommandList = function() {
    Yanfly.Equip.Window_EquipCommand_makeCommandList.call(this);
    this.addCustomCommand();
    this.addFinishCommand();
};

Window_EquipCommand.prototype.addCustomCommand = function() {
};

Window_EquipCommand.prototype.addFinishCommand = function() {
    if (Yanfly.Param.EquipFinishCmd === '') return;
    this.addCommand(Yanfly.Param.EquipFinishCmd, 'cancel');
};

//=============================================================================
// Window_EquipSlot
//=============================================================================

Yanfly.Equip.Window_EquipSlot_setActor = Window_EquipSlot.prototype.setActor;
Window_EquipSlot.prototype.setActor = function(actor) {
    this.setSlotNameWidth(actor);
    Yanfly.Equip.Window_EquipSlot_setActor.call(this, actor);
};

Window_EquipSlot.prototype.refresh = function() {
    if (this._actor) this._actor.refresh();
    Window_Selectable.prototype.refresh.call(this);
};

Window_EquipSlot.prototype.isEnabled = function(index) {
    if (this._actor) {
      return Yanfly.Equip.Game_Actor_isEquipChangeOk.call(this._actor, index);
    } else {
      return false;
    }
};

Window_EquipSlot.prototype.drawItem = function(index) {
    if (!this._actor) return;
    var rect = this.itemRectForText(index);
    this.changeTextColor(this.systemColor());
    this.changePaintOpacity(this.isEnabled(index));
    var ww1 = this._nameWidth;
    this.drawText(this.slotName(index), rect.x, rect.y, ww1);
    var ww2 = rect.width - ww1;
    var item = this._actor.equips()[index];
    if (item) {
      this.drawItemName(item, rect.x + ww1, rect.y, ww2);
    } else {
      this.drawEmptySlot(rect.x + ww1, rect.y, ww2);
    }
    this.changePaintOpacity(true);
};

Window_EquipSlot.prototype.setSlotNameWidth = function(actor) {
    if (!actor) return;
    this._nameWidth = 0;
    for (var i = 0; i < actor.equipSlots().length; ++i) {
      var text = $dataSystem.equipTypes[actor.equipSlots()[i]] + ' ';
      this._nameWidth = Math.max(this._nameWidth, this.textWidth(text));
    }
};

Window_EquipSlot.prototype.drawEmptySlot = function(wx, wy, ww) {
    this.changePaintOpacity(false);
    var ibw = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(Yanfly.Icon.EmptyEquip, wx + 2, wy + 2);
    var text = Yanfly.Param.EquipEmptyText;
    this.drawText(text, wx + ibw, wy, ww - ibw);
};

Window_EquipSlot.prototype.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow;
    this.update();
};

Yanfly.Equip.Window_ItemList_updateHelp = Window_EquipSlot.prototype.updateHelp;
Window_EquipSlot.prototype.updateHelp = function() {
    Yanfly.Equip.Window_ItemList_updateHelp.call(this);
    if (SceneManager._scene instanceof Scene_Equip && this._infoWindow) {
      this._infoWindow.setItem(this.item());
    }
};

//=============================================================================
// Window_EquipItem
//=============================================================================

Window_EquipItem.prototype.maxCols = function() {
    return 1;
};

Yanfly.Equip.Window_EquipItem_setSlotId = Window_EquipItem.prototype.setSlotId;
Window_EquipItem.prototype.setSlotId = function(slotId) {
    // do nothing
};

Yanfly.Equip.Window_EquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
    if (item === null && this._actor && this._data.length > 0) {
      var typeId = this._actor.equipSlots()[this._slotId];
      if (Yanfly.Param.EquipNonRemove.contains(typeId)) return false;
    }
    return Yanfly.Equip.Window_EquipItem_includes.call(this, item);
};

Yanfly.Equip.Window_EquipItem_isEnabled =
    Window_EquipItem.prototype.isEnabled;
Window_EquipItem.prototype.isEnabled = function(item) {
    if (item === null && this._actor) {
      var typeId = this._actor.equipSlots()[this._slotId];
      if (Yanfly.Param.EquipNonRemove.contains(typeId)) return false;
    }
    return Yanfly.Equip.Window_EquipItem_isEnabled.call(this, item);
};

Yanfly.Equip.Window_EquipItem_drawItem = Window_EquipItem.prototype.drawItem;
Window_EquipItem.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item === null) {
      this.drawRemoveEquip(index);
    } else {
      Yanfly.Equip.Window_EquipItem_drawItem.call(this, index);
    }
};

Window_EquipItem.prototype.drawRemoveEquip = function(index) {
    if (!this.isEnabled(null)) return;
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(true);
    var ibw = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(Yanfly.Icon.RemoveEquip, rect.x + 2, rect.y + 2);
    var text = Yanfly.Param.EquipRemoveText;
    this.drawText(text, rect.x + ibw, rect.y, rect.width - ibw);
};

Window_EquipItem.prototype.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow;
    this.update();
};

Yanfly.Equip.Window_ItemList_updateHelp = Window_EquipItem.prototype.updateHelp;
Window_EquipItem.prototype.updateHelp = function() {
    Yanfly.Equip.Window_ItemList_updateHelp.call(this);
    if (SceneManager._scene instanceof Scene_Equip && this._infoWindow) {
      this._infoWindow.setItem(this.item());
    }
};

//=============================================================================
// Window_StatCompare
//=============================================================================

function Window_StatCompare() {
    this.initialize.apply(this, arguments);
}

Window_StatCompare.prototype = Object.create(Window_Base.prototype);
Window_StatCompare.prototype.constructor = Window_StatCompare;

Window_StatCompare.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this._actor = null;
    this._tempActor = null;
    this.refresh();
};

Window_StatCompare.prototype.createWidths = function() {
    this._paramNameWidth = 0;
    this._paramValueWidth = 0;
    this._arrowWidth = this.textWidth('\u2192' + ' ');
    var buffer = this.textWidth(' ');
    for (var i = 0; i < 8; ++i) {
      var value1 = this.textWidth(TextManager.param(i));
      var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i)));
      this._paramNameWidth = Math.max(value1, this._paramNameWidth);
      this._paramValueWidth = Math.max(value2, this._paramValueWidth);
    }
    this._bonusValueWidth = this._paramValueWidth;
    this._bonusValueWidth += this.textWidth('(+)') + buffer;
    this._paramNameWidth += buffer;
    this._paramValueWidth;
    if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
      this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
};

Window_StatCompare.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.createWidths();
    this.refresh();
};

Window_StatCompare.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;
    for (var i = 0; i < 8; ++i) {
        this.drawItem(0, this.lineHeight() * i, i);
    }
};

Window_StatCompare.prototype.setTempActor = function(tempActor) {
    if (this._tempActor === tempActor) return;
    this._tempActor = tempActor;
    this.refresh();
};

Window_StatCompare.prototype.drawItem = function(x, y, paramId) {
    this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
    this.drawParamName(y, paramId);
    this.drawCurrentParam(y, paramId);
    this.drawRightArrow(y);
    if (!this._tempActor) return;
    this.drawNewParam(y, paramId);
    this.drawParamDifference(y, paramId);
};

Window_StatCompare.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_StatCompare.prototype.drawParamName = function(y, paramId) {
    var x = this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
};

Window_StatCompare.prototype.drawCurrentParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawRightArrow = function(y) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
};

Window_StatCompare.prototype.drawNewParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawParamDifference = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    if (diffvalue === 0) return;
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = Yanfly.Util.toGroup(diffvalue);
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

//=============================================================================
// Scene_Equip
//=============================================================================

Scene_Equip.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createSlotWindow();
    this.createItemWindow();
    this.createCompareWindow();
    this._lowerRightVisibility = true;
    this.updateLowerRightWindows();
    this.refreshActor();
};

Scene_Equip.prototype.createCommandWindow = function() {
    var wy = this._helpWindow.height;
    this._commandWindow = new Window_EquipCommand(0, wy, 240);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('equip', this.commandEquip.bind(this));
    this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
    this._commandWindow.setHandler('clear', this.commandClear.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Equip.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_Equip.prototype.createSlotWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._slotWindow = new Window_EquipSlot(0, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
    this.addWindow(this._slotWindow);
};

Scene_Equip.prototype.createItemWindow = function() {
    var wy = this._slotWindow.y;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_EquipItem(0, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
    this._itemWindow.hide();
};

Scene_Equip.prototype.createCompareWindow = function() {
    this._lowerRightWindows = [];
    var wx = this._itemWindow.width;
    var wy = this._itemWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._compareWindow = new Window_StatCompare(wx, wy, ww, wh);
    this._slotWindow.setStatusWindow(this._compareWindow);
    this._itemWindow.setStatusWindow(this._compareWindow);
    this.addWindow(this._compareWindow);
    this._lowerRightWindows.push(this._compareWindow);
    if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
      this.createItemInfoWindow();
    }
};

Scene_Equip.prototype.createItemInfoWindow = function() {
    var wx = this._itemWindow.width;
    var wy = this._itemWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._itemWindow.height;
    this._infoWindow = new Window_ItemInfo(wx, wy, ww, wh);
    this._slotWindow.setInfoWindow(this._infoWindow);
    this._itemWindow.setInfoWindow(this._infoWindow);
    this.addWindow(this._infoWindow);
    this._lowerRightWindows.push(this._infoWindow);
};

Yanfly.Equip.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
    Yanfly.Equip.Scene_Equip_refreshActor.call(this);
    this._compareWindow.setActor(this.actor());
};

Yanfly.Equip.Scene_Equip_commandOptimize =
    Scene_Equip.prototype.commandOptimize;
Scene_Equip.prototype.commandOptimize = function() {
    $gameTemp._optimizeEquipments = true;
    var hpRate = this.actor().hp / Math.max(1, this.actor().mhp);
    var mpRate = this.actor().mp / Math.max(1, this.actor().mmp);
    Yanfly.Equip.Scene_Equip_commandOptimize.call(this);
    $gameTemp._optimizeEquipments = false;
    var max = this.actor().isDead() ? 0 : 1;
    var hpAmount = Math.max(max, parseInt(this.actor().mhp * hpRate));
    this.actor().setHp(hpAmount);
    this.actor().setMp(parseInt(this.actor().mmp * mpRate));
    this._compareWindow.refresh();
    this._statusWindow.refresh();
    this.refreshActor();
};

Yanfly.Equip.Scene_Equip_commandClear = Scene_Equip.prototype.commandClear;
Scene_Equip.prototype.commandClear = function() {
    $gameTemp._clearEquipments = true;
    var hpRate = this.actor().hp / Math.max(1, this.actor().mhp);
    var mpRate = this.actor().mp / Math.max(1, this.actor().mmp);
    Yanfly.Equip.Scene_Equip_commandClear.call(this);
    $gameTemp._clearEquipments = false;
    var max = this.actor().isDead() ? 0 : 1;
    var hpAmount = Math.max(max, parseInt(this.actor().mhp * hpRate));
    this.actor().setHp(hpAmount);
    this.actor().setMp(parseInt(this.actor().mmp * mpRate));
    this._compareWindow.refresh();
    this._statusWindow.refresh();
    this.refreshActor();
};

Yanfly.Equip.Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
    this._itemWindow._slotId = -1;
    var slotId = this._slotWindow.index();
    Yanfly.Equip.Window_EquipItem_setSlotId.call(this._itemWindow, slotId);
    Yanfly.Equip.Scene_Equip_onSlotOk.call(this);
    this._itemWindow.show();
};

Yanfly.Equip.Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
Scene_Equip.prototype.onSlotCancel = function() {
    Yanfly.Equip.Scene_Equip_onSlotCancel.call(this);
    if (this._infoWindow) this._infoWindow.setItem(null);
    this._compareWindow.setTempActor(null);
};

Yanfly.Equip.Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
Scene_Equip.prototype.onItemOk = function() {
    var hpRate = this.actor().hp / Math.max(1, this.actor().mhp);
    var mpRate = this.actor().mp / Math.max(1, this.actor().mmp);
    Yanfly.Equip.Scene_Equip_onItemOk.call(this);
    var max = this.actor().isDead() ? 0 : 1;
    var hpAmount = Math.max(max, parseInt(this.actor().mhp * hpRate));
    this.actor().setHp(hpAmount);
    this.actor().setMp(parseInt(this.actor().mmp * mpRate));
    this._itemWindow.hide();
    this._statusWindow.refresh();
};

Yanfly.Equip.Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
Scene_Equip.prototype.onItemCancel = function() {
    Yanfly.Equip.Scene_Equip_onItemCancel.call(this);
    this._compareWindow.setTempActor(null);
    this._itemWindow.hide();
};

Scene_Equip.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (this.isActive()) this.updateLowerRightWindowTriggers();
};

Scene_Equip.prototype.updateLowerRightWindowTriggers = function() {
    if (!this._lowerRightVisibility) return;
    if (Input.isRepeated('right')) {
      this.shiftLowerRightWindows();
    } else if (Input.isRepeated('left')) {
      this.unshiftLowerRightWindows();
    } else if (Input.isRepeated('tab')) {
      this.shiftLowerRightWindows();
    } else if (this.isLowerWindowTouched()) {
      this.shiftLowerRightWindows();
    }
};

Scene_Equip.prototype.isLowerWindowTouched = function() {
    if (!TouchInput.isTriggered()) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = new Rectangle();
    rect.x = this._compareWindow.x;
    rect.y = this._compareWindow.y;
    rect.width = this._compareWindow.x + this._compareWindow.width;
    rect.height = this._compareWindow.y + this._compareWindow.height;
    return (x >= rect.x && y >= rect.y && x < rect.width && y < rect.height);
};

Scene_Equip.prototype.updateLowerRightWindows = function() {
    var length = this._lowerRightWindows.length;
    for (var i = 0; i < length; ++i) {
      var win = this._lowerRightWindows[i];
      win.visible = false;
    }
    this._lowerRightWindows[0].visible = this._lowerRightVisibility;
};

Scene_Equip.prototype.shiftLowerRightWindows = function() {
    var win = this._lowerRightWindows.shift();
    this._lowerRightWindows.push(win);
    this.updateLowerRightWindows();
    this.playLowerRightWindowSound();
};

Scene_Equip.prototype.unshiftLowerRightWindows = function() {
    var win = this._lowerRightWindows.pop();
    this._lowerRightWindows.unshift(win);
    this.updateLowerRightWindows();
    this.playLowerRightWindowSound();
};

Scene_Equip.prototype.playLowerRightWindowSound = function() {
    if (this._lowerRightWindows.length <= 1) return;
    SoundManager.playCursor();
};

Yanfly.Equip.Scene_Equip_onActorChange = Scene_Equip.prototype.onActorChange;
Scene_Equip.prototype.onActorChange = function() {
    Yanfly.Equip.Scene_Equip_onActorChange.call(this);
    this._compareWindow.setTempActor(null);
    if (this._infoWindow) this._infoWindow.setItem(null);
};

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
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
