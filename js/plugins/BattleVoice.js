//=============================================================================
// Plugin for RPG Maker MV
// BattleVoice.js
//=============================================================================
// [Update History]
// - BattleVoice.js
// 2015.Nov    Ver1.0.0 First Release
// 2016.Aug    Ver1.1.0 Strict Option Input
// 2019.Feb.27 Ver1.2.0 Random Play
// - BattkeVoiceMZ
// 2020.Jan    Ver1.0.0 First release: Add plugin commands
// 2020.Oct.06 Ver1.1.0 Add situations: on counter attack and on reflect magic
// 2020.Nov.09 Ver1.2.0 Add situations: on evade attack and on battle starts
// 2021.Feb.21 Ver1.3.0 Add situations: on receive recover magic from ally
// - BattleVoice.js again
// 2021.Feb.21 Ver1.4.0 forcedly adapt MV version(closed version)
// 2021.Feb.24 Ver2.0.0 Ver.up based on MZ Ver1.3.0
// 2021.Mar.25 Ver2.1.0 enables to set delay when recovery received

/*:ja
 * @target MV
 * @plugindesc [Ver2.1.0]Play voice SE at battle when actor does spcified action
 * @author Sasuke KANNAZUKI
 * 
 * @param ON switch ID
 * @desc play se only when the switch is ON.
 * This setting interlocks with option Battle Voice.
 * @type switch
 * @default 1
 * 
 * @param volume
 * @desc volume of SEs. this setting is common among all voice SEs.
 * (Default:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param pitch
 * @desc pitch of SEs. this setting is common among all voice SEs.
 * (Default:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @desc pan of SEs. this setting is common among all voice SEs.
 * 0:center, <0:left, >0:right (Default:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param Battle Voice Name at Option
 * @desc display name at option
 * @type text
 * @default Battle Voice
 *
 * @param waitForReceive
 * @text Delay Frames Of Receiver
 * @desc Set the frames from recover invoke to receive
 * @type number
 * @default 30
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam fromAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @help
 * This plugin runs under RPG Maker MV.
 *
 * This plugin enables to play SE (assumed battle voice) at
 *  various situations.
 *
 * [Summary]
 * Player can change voice ON/OFF by Option Scene (except Title).
 * This setting interlocks switch ID set at plugin parameter.
 *
 * [note specification]
 * write down each actor's note at following format to set SE filename.
 * [[Voices when an actor perform something]]
 * <attackVoice:filename>  plays when actor does normal attack.
 * <recoverVoice:filename>   plays when actor uses HP recovering magic.
 * <friendMagicVoice:filename> plays when actor spells magic for friend
 *  except HP recovering. if this is not set but <magicVoice:filename> is set,
 *  it plays <magicVoice:filename> setting file.
 * <magicVoice:filename>   plays when actor spells magic(except for friend).
 * <skillVoice:filename>   plays when actor uses special skill except magic.
 * [[Voices when an actor affected from any battler]]
 * <damageVoice:filename>    plays when actor takes damage.
 * <evadeVoice:filename>    plays when actor evades enemy attack.
 * <defeatedVoice:filename>   plays when actor is died.
 * <counterVoice:filename>   plays when counter attack invokes.
 * <reflectVoice:filename>   plays when actor reflects magic.
 * <fromAllyVoice:filename> plays when actor received HP recover magic.
 *   It doesn't play when magic user is the same as receiver.
 *   It assumes the phrase 'Thank you' and so on.
 * [[Voices when battle exceeds]]
 * if plural actors attend the battle, randomly selected actor's SE is adopted.  * <firstVoice:filename>   plays when battle starts except surprised.
 * <victoryVoice:filename>   plays when battle finishes.
 *
 * *NOTE* Here 'magic' skill means its 'Skill Type' is included in 
 *  '[SV]Magic Skills' on 'System '.
 *
 * [Advanced option 1]
 * If you want to play one of several voices randomly,
 * write filenames with colon as follows:
 * <attackVoice:atk1,atk2,atk3>
 * in this case, at attack, plays atk1 atk2, or atk3 randomly.
 *
 * If set no SE one of filenames, 
 * <attackVoice:atk1,atk2,$>
 * in this case, at attack, plays atk1 atk2, or doesn't play SE.
 *
 * You can set the same filename twice or more than.
 * <attackVoice:atk1,atk2,atk2,$>
 * in this case, 25% atk1, 50% atk2, 25% don't play.
 *
 * *NOTE* When set SEs at this notation, these files might be excluded at
 *  deployment with option 'Exclude unused files'.
 *  To prevent this, I recommend to make dummy event and set each SE to
 *  'Play SE' on the Contents.
 *
 * [Plugin Commands]
 * 
 * **Set voice on each situation**
 * BattleVoice set arg1 arg2 arg3
 *  - arg1 must be actor id.
 *  - arg2 must be a situation.
 *   attack , recover, friendMagic, magic, skill, damage, evaded,
 *   dead, counter, reflect, fromAlly, first or victory
 *  -arg3 must be voice file name. the same as note, by split comma,
 *   plural setting enables.
 * ex.
 * BattleVoice 1 attack attackVoice
 *  set actor whose id is 1 voice for attack.
 *
 * **Reset voice on each situation**
 * BattleVoice reset arg1 arg2
 *  - arg1 must be actor id.
 *  - arg2 must be a situation.
 * ex.
 * BattleVoice reset 2 attack
 *  reset actor whose id is 2 voice for attack.
 *
 * **Reset all situations' voice to default**
 * BattleVoice allReset arg1
 *  - arg1 must be actor id to reset all situation
 *   (note: voice for actor's each skill is not reset)
 *
 * **Assign actor voice to each skill**
 * BattleVoice skillSet arg1 arg2 arg3
 *  - arg1 must be actor id
 *  - arg2 must be skill id to set original voice
 *  - arg3 must be voice file name. the same as note, by split comma,
 *   plural setting enables.
 * ex.
 * BattleVoice skillSet 3 8 fire1
 *  sets fire1 when an actor whose id is 3 uses skill whose id is 8
 *
 * **Reset actor voice to each skill**
 * BattleVoice skillReset arg1 arg2
 *  - arg1 must be actor id
 *  - arg2 must be skill id to reset original voice
 * ex.
 * BattleVoice skillReset 2 15
 *  reset voice for an actor whose id is 2's skill whose id is 15.
 *
 * **Reset all voices assigned to skills**
 * BattleVoice skillAllReset arg1
 *  - arg1 must be actor id to reset all skill's voice.
 *  (note: voice for situations are not reset)
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:
 * @target MV
 * @plugindesc [Ver2.1.0]战斗语音。
 * @author 神無月サスケ
 * 
 * @param ON switch ID
 * @text 语音播放开关ID
 * @desc 只有这个开关打开的时候，播放语音SE。
 * 与选项「战斗语音」联动。
 * @type switch
 * @default 1
 *
 * @param volume
 * @text 通用音量
 * @desc 这是战斗语音的音量。
 * 这个设置是所有语音SE的共同设置。(默认值: 90 )
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 *
 * @param pitch
 * @text 通用音调
 * @desc 这是战斗语音的音调
 * 这个设置是所有语音SE的共同设置。(默认值:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @text 通用声像
 * @desc 这是战斗语音的声像。这个设置也是通用的。
 * 0:平衡, 负数:左声道, 正数:右声道(默认值:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param Battle Voice Name at Option
 * @text 战斗语音显示名称
 * @desc 选项画面中的显示名称。
 * @type string
 * @default 战斗语音
 *
 * @param waitForReceive
 * @text 被恢复时等待
 * @desc 角色受恢复魔法时播放语音的等待帧数
 * @type number
 * @default 30
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam fromAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 @help
 * 此插件只支持MV。
 * 
 * 根据战斗中的情况可以播放战斗语音。
 *
 * ■概要
 * 可以在游戏中的选项画面(标题画面以外)中ON/OFF。
 * 此设置与此插件参数中指定的开关相关联。
 * 默认为OFF。
 *
 * ■备注设置方法
 * 请用以下标签写在每个角色的备注中。
 * 将filename替换为语音SE的文件名。
 * ◆角色行动时
 * <attackVoice:filename>  这是普通攻击时播放的语音。
 * <recoverVoice:filename>   使用HP恢复魔法时播放的语音。
 * <friendMagicVoice:filename>   使用HP恢复以外的定向魔法时播放的语音。
 *  如果省略，并且设置了<magicVoice:filename>，则会播放该音效。
 * <magicVoice:filename> 这是使用面向我方以外的魔法时播放的语音。
 * <skillVoice:filename>   使用必杀技时播放的语音。
 * ◆角色成为目标时
 * <damageVoice:filename>    这是受到伤害时播放的语音。
 * <evadeVoice:filename>    这是回避攻击时播放的语音。
 * <defeatedVoice:filename>   这是无法战斗时播放的语音。
 * <counterVoice:filename>   这是发动反击时播放的语音。
 * <reflectVoice:filename>   这是魔法反射时播放的语音。
 * <fromAllyVoice:filename>  这是受到HP恢复魔法时播放的语音。
 *  如果用在自己身上的话就不会播放。
 *  设想的是「谢谢」等感谢的话语。
 * ◆根据战斗的进展
 * 如果有多个使用者，则会从活着的使用者中随机播放。
 * <firstVoice:filename>    是战斗开始时播放的语音。
 *  但是，突然出现的时候不会播放。
 * <victoryVoice:filename>   是战斗胜利时播放的语音。
 *
 * 注意：此处的「魔法」的定义是，该技能的技能类型包含在
 * 「系统」选项的「[SV]魔法技能」中。
 *
 * ■扩展功能1
 * 如果用冒号设置多个以上标签的filename，
 * 则会从中随机播放。 例如，在指定如下情况下，
 * <attackVoice:atk1,atk2,atk3>
 * atk1 atk2 atk3 中的任意一个语音随机播放。
 *
 * 想设置静音时，请加$。
 * <attackVoice:atk1,atk2,$>
 * 在这种情况下，从atk1, atk2, 静音中选择。
 * 
 * 可以多次设置同一文件名。
 * <attackVoice:atk1,atk2,atk2,$>
 * 这种情况下，25%播放atk1、50%播放atk2、25%静音。
 *
 * 注意：以此格式进行设置可能会在部署的「排除未使用的文件」中被删除。 
 *  例如制作虚拟事件，播放这些SE等，进行适当处理。
 * 
 * ■插件命令
 * ◆在各种情况下更改语音
 * BattleVoice set arg1 arg2 arg3
 *  - arg1 是目标使用者ID
 *  - arg2 是情形文字。 请从以下选项中选择
 *   attack (普通攻击时), recover (使用恢复魔法时),
 *   friendMagic (使用我方目标魔法时) magic (使用普通魔法时)
 *   skill (使用非魔法技能时), damage (受伤时), evaded (回避攻击时),
 *   dead (不能战斗时), counter (发动反击时), reflect (魔法反射发动时),
 *   fromAlly (受到恢复魔法的时候),
 *   first (战斗开始时) or victory (战斗胜利时).
 *  -arg3 是语音SE名称。可以用分号指定多个
 * 例.
 * BattleVoice 1 attack attackVoice
 *  在角色ID1攻击时(attack)播放名为attackVoice的SE。
 *
 * ◆各种情况下的语音重置
 * BattleVoice reset arg1 arg2
 *  - arg1 是目标使用者ID
 *  - arg2 是情形文字。参考上述内容。
 * 例.
 * BattleVoice reset 2 attack
 *  重置角色ID2攻击时的语音，恢复备注标签设置。
 *
 * ◆所有情况下的语音批量重置
  * BattleVoice allReset arg1
 *   - arg1 是目标使用者ID
 *   (注: 为每个技能设置的语音不会重置)
 *
 * ◆根据技能id分配语音
 * BattleVoice skillSet arg1 arg2 arg3
 *  - arg1 是目标使用者ID
 *  - arg2 是技能ID
 *  - arg3 是要播放的SE名称
 * 例.
 * BattleVoice skillSet 3 8 fire1
 *   角色ID3使用技能ID8时播放fire1
 *
 * ◆解除分配给技能id的语音
 * BattleVoice skillReset arg1 arg2
 *  - arg1 是目标使用者ID
 *  - arg2 是技能ID
 * 例.
 * BattleVoice skillReset 2 15
 *  解除角色ID2使用技能ID15时的语音。
 *
 * ◆批量重置分配给技能id的所有语音
 * BattleVoice skillAllReset arg1
 *  - arg1 是目标使用者ID
 *  (注意: 分配给情况的语音不会重置。)
 *
 * ■使用条款
 * 此插件通过MIT许可证分发。
 * 请自由使用。
 * http://opensource.org/licenses/mit-license.php
 */
(function() {
  var pluginName = 'BattleVoice';

  //
  // process parameters
  //
  var parameters = PluginManager.parameters(pluginName);
  var pitch = Number(parameters['pitch'] || 100);
  var volume = Number(parameters['volume'] || 90);
  var pan = Number(parameters['pan'] || 0);
  var playSwitchId = Number(parameters['ON switch ID'] || 1);
  var strBattleVoice = parameters['Battle Voice Name at Option'] ||
    'Battle Voice';
  var waitForReceive = Number(parameters['waitForReceive'] || 30);

  //
  // process plugin commands
  //
  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === pluginName) {
      var actor = $gameActors.actor(+args[1]);
      if (!actor) {
        return;
      }
      actor.battleVoices = actor.battleVoices || {};
      actor.skillVoices = actor.skillVoices || {};
      switch (args[0]) {
      case 'set':
        actor.battleVoices[args[2]] = args[3];
        break;
      case 'reset':
        actor.battleVoices[args[2]] = null;
        break;
      case 'allReset':
        actor.battleVoices = {};
        break;
      case 'skillSet':
        actor.skillVoices[+args[2]] = args[3];
        break;
      case 'skillReset':
        actor.skillVoices[+args[2]] = null;
        break;
      case 'skillAllReset':
        actor.skillVoices = {};
        break;
      }
    }
  };

  //
  // set play options (interlock with switch)
  //
  var doesDisplaySpecialOptions = function() {
    return !SceneManager.isPreviousScene(Scene_Title);
  };

  var _Window_Options_makeCommandList =
   Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    if (doesDisplaySpecialOptions()) {
      this.addCommand(strBattleVoice, 'battleVoice');
    }
    _Window_Options_makeCommandList.call(this);
  };

  var _Window_Options_getConfigValue =
   Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function(symbol) { 
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.value(playSwitchId);
    default:
      return _Window_Options_getConfigValue.call(this, symbol);
    }
  };

  var _Window_Options_setConfigValue =
   Window_Options.prototype.setConfigValue;
  Window_Options.prototype.setConfigValue = function(symbol, volume) {
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.setValue(playSwitchId, volume);
    default:
      return _Window_Options_setConfigValue.call(this, symbol, volume);
    }
  };

  var _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
  Scene_Options.prototype.maxCommands = function() {
    var rowNum = _Scene_Options_maxCommands.call(this);
    return doesDisplaySpecialOptions() ? rowNum + 1 : rowNum;
  };

  //
  // play actor voice
  //
  var canPlayActorVoice = function() {
    return $gameSwitches.value(playSwitchId);
  };

  var split = function(name) {
    if (!name) {
      return name;
    }
    var names = name.split(',');
    return names[Math.randomInt(names.length)];
  };

  var createAudioByFileName = function(name) {
    var audio = {};
    audio.name = name;
    audio.pitch = pitch;
    audio.volume = volume;
    audio.pan = pan
    return audio;
  };

  var playActorVoice = function(actor, type) {
    if (!canPlayActorVoice()) {
      return;
    }
    var name = '';
    var a = actor.battleVoices || {};
    var m = actor.actor().meta;
    switch(type){
      case 'attack':
        name = split(a.attack || m.attackVoice);
        break;
      case 'recover':
        name = split(a.recover || m.recoverVoice);
        break;
      case 'friendmagic':
        name = split(a.friendMagic || m.friendMagicVoice || m.magicVoice);
        break;
      case 'magic':
        name = split(a.magic || m.magicVoice);
        break;
      case 'skill':
        name = split(a.skill || m.skillVoice);
        break;
      case 'damage':
        name = split(a.damage || m.damageVoice);
        break;
      case 'evade':
        name = split(a.evade || m.evadeVoice);
        break;
      case 'dead':
        name = split(a.dead || m.defeatedVoice);
        break;
      case 'counter':
        name = split(a.counter || m.counterVoice);
        break;
      case 'reflect':
        name = split(a.reflect || m.reflectVoice);
        break;
      case 'fromAlly':
        name = split(a.fromAlly || m.fromAllyVoice);
        break;
      case 'first':
        name = split(a.first || m.firstVoice);
        break;
      case 'victory':
        name = split(a.victory || m.victoryVoice);
        break;
    }
    if (name && name !=="$") {
      var audio = createAudioByFileName(name);
      AudioManager.playSe(audio);
    }
  };

  var isSkillVoice = function(actor, action) {
    if (!actor.skillVoices || !action.isSkill()) {
      return false;
    }
    return !!actor.skillVoices[action._item.itemId()];
  };

  var playSkillVoice = function(actor, action) {
    if (!canPlayActorVoice()) {
      return;
    }
    var name = split(actor.skillVoices[action._item.itemId()]);
    if (name && name !=="$") {
      var audio = createAudioByFileName(name);
      AudioManager.playSe(audio);
    }
  };

  //
  // functions for call actor voice.
  //
  var _Game_Actor_performAction = Game_Actor.prototype.performAction;
  Game_Actor.prototype.performAction = function(action) {
    _Game_Actor_performAction.call(this, action);
    if (isSkillVoice(this, action)) {
      playSkillVoice(this, action);
    } else if (action.isAttack()) {
      playActorVoice(this, 'attack');
    } else if (action.isMagicSkill() && action.isHpRecover()) {
      playActorVoice(this, 'recover');
    } else if (action.isMagicSkill() && action.isForFriend()) {
      playActorVoice(this, 'friendmagic');
    } else if (action.isMagicSkill()) {
      playActorVoice(this, 'magic');
    } else if (action.isSkill() && !action.isGuard()) {
      playActorVoice(this, 'skill');
    }
  };

  var _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
  Game_Actor.prototype.performDamage = function() {
    _Game_Actor_performDamage.call(this);
    playActorVoice(this, 'damage');
  };

  var _Game_Actor_performEvasion = Game_Actor.prototype.performEvasion;
  Game_Actor.prototype.performEvasion = function() {
    _Game_Actor_performEvasion.call(this);
    playActorVoice(this, 'evade');
  };

  var _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
  Game_Actor.prototype.performCollapse = function() {
    _Game_Actor_performCollapse.call(this);
    if ($gameParty.inBattle()) {
      playActorVoice(this, 'dead');
    }
  };

  var _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
  BattleManager.invokeCounterAttack = function(subject, target) {1
    if (target.isActor()) {
      playActorVoice(target, 'counter');
    }
    _BattleManager_invokeCounterAttack.call(this, subject, target);
  };

  var _BattleManager_invokeMagicReflection =
    BattleManager.invokeMagicReflection;
  BattleManager.invokeMagicReflection = function(subject, target) {
    if (target.isActor()) {
      playActorVoice(target, 'reflect');
    }
    _BattleManager_invokeMagicReflection.call(this, subject, target);
  };

  var _Game_System_onBattleStart = Game_System.prototype.onBattleStart;
  Game_System.prototype.onBattleStart = function() {
    _Game_System_onBattleStart.call(this);
    var candidates = $gameParty.aliveMembers().filter(function(actor) {
       return actor.actor().meta.firstVoice || 
         (actor.battleVoices && actor.battleVoices.first);
    });
    if (candidates.length > 0) {
      var index = Math.randomInt(candidates.length);
      var actor = candidates[index];
      if (!BattleManager._surprise) {
        playActorVoice(actor, 'first');
      }
    }
  };

  var _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    var candidates = $gameParty.aliveMembers().filter(function(actor) {
      return actor.actor().meta.victoryVoice ||
        (actor.battleVoices && actor.battleVoices.victory);
    });
    if (candidates.length > 0) {
      var index = Math.randomInt(candidates.length);
      var actor = candidates[index];
      playActorVoice(actor, 'victory');
    }
    _BattleManager_processVictory.call(this);
  };

  //
  // When recover received, wait some frames until play.
  //
  Game_Battler.prototype.doesPlayFromAlly = function() {
    return false;
  };

  Game_Actor.prototype.doesPlayFromAlly = function() {
    // not play voice if target is the same as magic user
    return this !== BattleManager._subject;
  };

  Window_BattleLog.prototype.waitAlly = function() {
    this._waitCount = waitForReceive;
  };

  Window_BattleLog.prototype.playReceiveVoice = function(target) {
    playActorVoice(target, 'fromAlly');
  };

  var _Window_BattleLog_performRecovery =
    Window_BattleLog.prototype.performRecovery;
  Window_BattleLog.prototype.performRecovery = function(target) {
    if (target.doesPlayFromAlly()) {
      this.push('waitAlly');
      this.push('playReceiveVoice', target);
    }
    _Window_BattleLog_performRecovery.call(this, target);
  };
})();
