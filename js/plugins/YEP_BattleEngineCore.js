//=============================================================================
// Yanfly Engine Plugins - Battle Engine Core
// YEP_BattleEngineCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleEngineCore = true;

var Yanfly = Yanfly || {};
Yanfly.BEC = Yanfly.BEC || {};
Yanfly.BEC.version = 1.51;

//=============================================================================
 /*:
 * @plugindesc YEP战斗核心(v1.51)
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text ▁▂▃▄▄ 通用设置 ▄▄▃▂▁
 * @default
 *
 * @param Action Speed
 * @text 行动速度公式
 * @parent ---General---
 * @desc 这是一个行动的基本速度公式
 * Default: agi + Math.randomInt(Math.floor(5 + agi / 4))
 * @default agi
 *
 * @param Default System
 * @text 默认战斗系统
 * @parent ---General---
 * @type select
 * @option 默认回合制战斗
 * @value dtb
 * @option 主动回合制战斗（需插件支持）
 * @value atb
 * @option 蓄力回合制战斗（需插件支持）
 * @value ctb
 * @option 标准回合制战斗（需插件支持）
 * @value stb
 * @desc This is the default battle system your game uses.
 * Default: dtb
 * @default dtb
 *
 * @param ---Escape---
 * @text ▁▂▃▄▄ 逃跑设置 ▄▄▃▂▁
 * @default
 *
 * @param Escape Ratio
 * @text 逃跑成功率
 * @parent ---Escape---
 * @desc 用于确定逃跑成功的公式
 * Default: 0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.5 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Fail Escape Boost
 * @text 逃跑失败增益
 * @parent ---Escape---
 * @type number
 * @decimals 2
 * @desc 玩家每次逃跑失败时，成功率增加的数值 默认值: 0.10
 * @default 0.10
 *
 * @param ---Animation---
 * @text ▁▂▃▄▄ 动画设置 ▄▄▃▂▁
 * @default
 *
 * @param Animation Base Delay
 * @text 动画基础延迟
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 动画之间的基础延迟时间。默认值：8
 * @default 0
 *
 * @param Animation Next Delay
 * @text 动画后续延迟
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 连续动画之间的延迟时间。默认值：12
 * @default 0
 *
 * @param Certain Hit Animation
 * @text 必中动画
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 必中技能的默认播放动画，0 表示无动画。默认值：0
 * @default 0
 *
 * @param Physical Animation
 * @text 物理动画
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 物理技能的默认播放动画，0 表示无动画。默认值：52
 * @default 52
 *
 * @param Magical Animation
 * @text 魔法动画
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 魔法技能的默认播放动画，0 表示无动画。默认值：51
 * @default 51
 *
 * @param Enemy Attack Animation
 * @text 敌人攻击动画
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 敌人默认的攻击动画。默认值：39
 * @default 39
 *
 * @param Reflect Animation
 * @text 反射动画
 * @parent ---Animation---
 * @type number
 * @min 0
 * @desc 魔法攻击被反射时使用的动画。默认值：42
 * @default 42
 *
 * @param Motion Waiting
 * @text 动作等待
 * @parent ---Animation---
 * @type boolean
 * @on After
 * @off During
 * @desc 动画在执行动作之后播放（true）还是期间播放（false）。默认值：false
 * @default false
 *
 * @param ---Frontview---
 * @text ▁▂▃▄▄ 正面视角设置 ▄▄▃▂▁
 * @default
 *
 * @param Front Position X
 * @text 正面位置 X 坐标
 * @parent ---Frontview---
 * @desc 决定角色初始 X 位置的公式。默认值：0
 * @default Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index
 *
 * @param Front Position Y
 * @text 正面位置 Y 坐标
 * @parent ---Frontview---
 * @desc 决定角色初始 Y 位置的公式。默认值：0
 * @default Graphics.boxHeight - 180
 *
 * @param Front Actor Sprite
 * @text 正面角色精灵
 * @parent ---Frontview---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在正面视角中显示角色战斗精灵（是 / 否）。默认值：false
 * @default false
 *
 * @param Front Sprite Priority
 * @text 正面精灵优先级
 * @parent ---Frontview---
 * @type select
 * @option 正常
 * @value 0
 * @option 角色在上
 * @value 1
 * @option 敌人在上
 * @value 2
 * @desc 角色精灵的显示优先级
 * 0 - Normal   1 - Actors on Top   2 - Enemies on Top
 * @default 1
 *
 * @param ---Sideview---
 * @text ▁▂▃▄▄ 侧面视角设置 ▄▄▃▂▁
 * @default
 *
 * @param Home Position X
 * @text 初始位置 X 坐标
 * @parent ---Sideview---
 * @desc 决定角色初始 X 位置的公式。默认值：600 + index * 32
 * @default screenWidth - 16 - (maxSize + 2) * 32 + index * 32
 *
 * @param Home Position Y
 * @text 初始位置 Y 坐标
 * @parent ---Sideview---
 * @desc 决定角色初始 Y 位置的公式
 * Default: 280 + index * 48
 * @default screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 32
 *
 * @param Side Sprite Priority
 * @text 侧面精灵优先级
 * @parent ---Sideview---
 * @type select
 * @option 正常
 * @value 0
 * @option 角色在上
 * @value 1
 * @option 敌人在上
 * @value 2
 * @desc 角色精灵的显示优先级
 * 0 - Normal   1 - Actors on Top   2 - Enemies on Top
 * @default 1
 *
 * @param ---Sprites---
 * @text ▁▂▃▄▄ 角色设置 ▄▄▃▂▁
 * @default
 *
 * @param Default X Anchor
 * @text 默认 X 锚点
 * @parent ---Sprites---
 * @type number
 * @decimals 2
 * @desc 角色 X 轴锚点的默认值
 * Default: 0.50
 * @default 0.50
 *
 * @param Default Y Anchor
 * @text 默认 Y 锚点
 * @parent ---Sprites---
 * @type number
 * @decimals 2
 * @desc Default value used for your sprites's Y Anchor.
 * Default: 1.00
 * @default 1.00
 *
 * @param Step Distance
 * @text 步距
 * @parent ---Sprites---
 * @type number
 * @desc 单位执行动作时向前移动的距离
 * Default: 48
 * @default 48
 *
 * @param Flinch Distance
 * @text 退缩距离
 * @parent ---Sprites---
 * @type number
 * @desc 在侧面视角中，单位受到伤害或闪避时退缩的像素距离。默认值：12
 * @default 12
 *
 * @param Show Shadows
 * @text 显示阴影
 * @parent ---Sprites---
 * @type boolean
 * @on Show Shadows
 * @off Hide Shadows
 * @desc 是否在角色下方显示阴影（显示 / 隐藏）
 * NO - false     YES - true
 * @default true
 *
 * @param ---Damage Popups---
 * @text ▁▂▃▄▄ 伤害弹窗设置 ▄▄▃▂▁
 * @default
 *
 * @param Popup Duration
 * @text 弹窗持续时间
 * @parent ---Damage Popups---
 * @type number
 * @min 1
 * @desc 弹窗保持可见的帧数。默认值：90
 * @default 128
 *
 * @param Newest Popup Bottom
 * @text 最新弹窗在底部
 * @parent ---Damage Popups---
 * @type boolean
 * @on Newest at bottom
 * @off Newest at top
 * @desc 最新的弹窗显示在一组弹窗的底部（是 / 否）。默认值：true
 * NO - false     YES - true
 * @default true
 *
 * @param Popup Overlap Rate
 * @text 弹窗重叠率
 * @parent ---Damage Popups---
 * @type number
 * @decimals 1
 * @desc 多个伤害弹窗出现时的相互覆盖程度，用于调整每个精灵的缓冲率。默认值：0.9
 * @default 0.9
 *
 * @param Critical Popup
 * @text 暴击弹窗
 * @parent ---Damage Popups---
 * @desc 暴击时弹窗的闪烁颜色。默认值：255, 0, 0, 160
 * @default 255, 0, 0, 160
 *
 * @param Critical Duration
 * @text 暴击持续时间
 * @parent ---Damage Popups---
 * @type number
 * @min 1
 * @desc 暴击闪烁效果持续的帧数。默认值：60
 * @default 60
 *
 * @param ---Tick-Settings---
 * @text ▁▂▃▄▄ 计时设置 ▄▄▃▂▁
 * @default
 *
 * @param Timed States
 * @text 计时状态
 * @parent ---Tick-Settings---
 * @type boolean
 * @on Time-Based States
 * @off Turn-Based States
 * @desc 若战斗系统为计时制，状态是否基于时间而非回合（是 / 否）。默认值：false
 * @default false
 *
 * @param Timed Buffs
 * @text 计时 buff
 * @parent ---Tick-Settings---
 * @type boolean
 * @on Time-Based Buffs
 * @off Turn-Based Buffs
 * @desc 若战斗系统为计时制，buff 是否基于时间而非回合（是 / 否）。默认值：false
 * @default false
 *
 * @param Turn Time
 * @text 回合时间
 * @parent ---Tick-Settings---
 * @type number
 * @min 1
 * @desc 多少个计时单位等于 1 回合。默认值：100
 * @default 100
 * 
 * @param AI Self Turns
 * @text AI 独立回合
 * @parent ---Tick-Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc AI 是否基于自身的独立回合（是 / 否）。默认值：true
 * @default true
 *
 * @param ---Window Settings---
 * @text ▁▂▃▄▄ 窗口设置 ▄▄▃▂▁
 * @default
 *
 * @param Lower Windows
 * @text 下方窗口
 * @parent ---Window Settings---
 * @type boolean
 * @on Bottom Layout
 * @off Default Layout
 * @desc 技能和物品窗口是否显示在屏幕底部（底部布局 / 默认布局）。默认值：true
 * OFF - false     ON - true
 * @default true
 *
 * @param Window Rows
 * @text 窗口行数
 * @parent ---Window Settings---
 * @number
 * @min 1
 * @desc 下方窗口显示的项目行数。默认值：4
 * @default 4
 *
 * @param Command Window Rows
 * @text 命令窗口行数
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc 每个命令窗口显示的行数。默认值：4
 * @default 4
 *
 * @param Command Alignment
 * @text 命令对齐方式
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 队伍 / 角色命令的文本对齐方式。可选项：左、中、右。默认值：左
 * @default center
 *
 * @param Start Actor Command
 * @text 起始角色命令
 * @parent ---Window Settings---
 * @type boolean
 * @on Actor Command Window
 * @off Party Command Window
 * @desc 回合开始时显示角色命令窗口而非队伍命令窗口（是 / 否）。默认值：true
 * OFF - false     ON - true
 * @default true
 *
 * @param Current Max
 * @text 当前 / 最大值
 * @parent ---Window Settings---
 * @type boolean
 * @on Current / Max
 * @off Just Current
 * @desc 是否显示 HP/MP 的当前值 / 最大值（是 / 否）。默认值：true
 * NO - false     YES - true     Default: true
 * @default false
 *
 * @param ---Selection Help---
 * @text ▁▂▃▄▄ 选择帮助设置 ▄▄▃▂▁
 * @default
 *
 * @param Mouse Over
 * @text 鼠标悬停
 * @parent ---Selection Help---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否允许鼠标悬停在敌人上自动选择目标（是 / 否）。默认值：true
 * OFF - false     ON - true
 * @default true
 *
 * @param Select Help Window
 * @text 选择帮助窗口
 * @parent ---Selection Help---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 选择角色和敌人时是否显示帮助窗口（是 / 否）。默认值：true
 * NO - false     YES - true
 * @default true
 *
 * @param User Help Text
 * @text 使用者帮助文本
 * @parent ---Selection Help---
 * @desc 帮助窗口中 “使用者” 的单数形式。默认值：User
 * @default User
 *
 * @param Ally Help Text
 * @text 盟友帮助文本
 * @parent ---Selection Help---
 * @desc 帮助窗口中 “盟友” 的单数形式。默认值：Ally
 * @default Ally
 *
 * @param Allies Help Text
 * @text 盟友们帮助文本
 * @parent ---Selection Help---
 * @desc 帮助窗口中 “盟友” 的复数形式。默认值：Allies
 * @default Allies
 *
 * @param Enemy Help Text
 * @text 敌人帮助文本
 * @parent ---Selection Help---
 * @desc 帮助窗口中 “敌人” 的单数形式。默认值：Enemy
 * @default Enemy
 *
 * @param Enemies Help Text
 * @text 敌人们帮助文本
 * @parent ---Selection Help---
 * @desc The plural form of 'Enemy' used in a help window.
 * @default Enemies
 *
 * @param All Help Text
 * @text 全体帮助文本
 * @parent ---Selection Help---
 * @desc When selecting a entire group of targets.
 * %1 - Target Group (Allies or Enemies)
 * @default All %1
 *
 * @param Random Help Text
 * @text 随机帮助文本
 * @parent ---Selection Help---
 * @desc 选择随机目标时的文本，%1 代表目标群体，%2 代表数量。默认值：%2 Random %1
 * @default %2 Random %1
 *
 * @param ---Enemy Select---
 * @text ▁▂▃▄▄ 敌人选择设置 ▄▄▃▂▁
 * @default
 *
 * @param Visual Enemy Select
 * @text 可视化敌人选择
 * @parent ---Enemy Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否用更可视化的界面替代敌人选择界面（是 / 否）。默认值：true
 * OFF - false     ON - true
 * @default true
 *
 * @param Show Enemy Name
 * @text 显示敌人名称
 * @parent ---Enemy Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 使用可视化敌人选择时是否显示敌人名称（是 / 否）。默认值：true
 * @default true
 *
 * @param Show Select Box
 * @text 显示选择框
 * @parent ---Enemy Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 选择敌人时是否显示选择框（是 / 否）。默认值：false
 * @default false
 *
 * @param Enemy Font Size
 * @text 敌人字体大小
 * @parent ---Enemy Select---
 * @type number
 * @min 1
 * @desc 显示敌人名称时的字体大小。默认值：28
 * Default: 28
 * @default 20
 *
 * @param Enemy Auto Select
 * @text 敌人自动选择
 * @parent ---Enemy Select---
 * @desc 初始自动选择的敌人，LEFT 表示 0，RIGHT 表示 this.furthestRight ()。默认值：this.furthestRight ()
 * @default this.furthestRight()
 *
 * @param ---Actor Select---
 * @text ▁▂▃▄▄ 角色选择设置 ▄▄▃▂▁
 * @default
 *
 * @param Visual Actor Select
 * @text 可视化角色选择
 * @parent ---Actor Select---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否允许点击屏幕上的角色进行选择（是 / 否）。默认值：true
 * @default true
 *
 * @param ---Battle Log---
 * @text ▁▂▃▄▄ 战斗日志设置 ▄▄▃▂▁
 * @default
 *
 * @param Show Emerge Text
 * @text 显示出现文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示敌人出现的战斗开始文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show Pre-Emptive Text
 * @text 显示先发制人文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示获得先发制人攻击的文本（是 / 否）。默认值：true
 * @default true
 *
 * @param Show Surprise Text
 * @text 显示突袭文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示遭遇突袭的文本（是 / 否）。默认值：true
 * @default true
 *
 * @param Optimize Speed
 * @text 优化速度
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否削减日志基线处理以优化战斗速度（是 / 否）。默认值：true
 * @default true
 *
 * @param Show Action Text
 * @text 显示动作文本
 * @parent ---Battle Log---
 * @type boolean
 * @on Full
 * @off Simple
 * @desc 显示完整的动作文本还是简化版本（完整 / 简化）。默认值：false
 * @default false
 *
 * @param Show State Text
 * @text 显示状态文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示所有与状态相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show Buff Text
 * @text 显示 buff 文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示所有与 buff 相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show Counter Text
 * @text 显示反击文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与反击相关的文本（是 / 否）。默认值：true
 * @default true
 *
 * @param Show Reflect Text
 * @text 显示反射文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与魔法反射相关的文本（是 / 否）。默认值：true
 * @default true
 *
 * @param Show Substitute Text
 * @text 显示替身文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与伤害替身相关的文本（是 / 否）。默认值：true
 * @default true
 *
 * @param Show Fail Text
 * @text 显示失败文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与攻击失败相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show Critical Text
 * @text 显示暴击文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与暴击相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show Miss Text
 * @text 显示未命中文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与攻击未命中相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show Evasion Text
 * @text 显示闪避文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与攻击被闪避相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show HP Text
 * @text显示 HP 文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与 HP 伤害或治疗相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show MP Text
 * @text 显示 MP 文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与 MP 伤害或恢复相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @param Show TP Text
 * @text 显示 TP 文本
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否显示与 TP 伤害或恢复相关的文本（是 / 否）。默认值：false
 * @default false
 *
 * @help
============================================================================
  介绍
============================================================================

  本插件对默认战斗系统的各个方面进行了修改，使其更符合现代 RPG 的流畅风格，摆脱老式 RPG 的笨拙感。
  具体包括选择战斗日志窗口顶部显示的文本内容及其显示方式等。
  
============================================================================
  战斗消息
============================================================================

  在修改战斗中显示的 “术语” 和 “消息” 时，在消息的任意位置插入以下标签，可使消息在战斗日志中居中显示。
<CENTER>
  该标签必须为全大写，战斗日志窗口才能将其识别为居中显示战斗文本消息的指令。
  有几个注释标签可用于更改某些技能和物品的显示方式，以防出现类似 “哈罗德的攻击” 这样你不想要的名称显示。
  技能和物品注释标签：
<Display Text: x>
  此标签会将显示的文本更改为 x。
<Display Icon: x>
  此标签会将显示的图标更改为 x。
  
============================================================================
  战斗窗口
============================================================================

  战斗系统中有多种窗口设置选项可供调整，使战斗系统的操作更直观。
  例如，可以设置回合开始时显示角色命令窗口，而非队伍命令窗口（战斗 / 逃跑窗口）。
  队伍命令窗口仍然可以访问，只需在第一个角色的窗口上按取消键即可。
  
============================================================================
  战斗顺序
============================================================================

  战斗回合顺序也得到了修正。这样，任何战斗者在战斗过程中敏捷值（AGI）发生变化，都会在当前回合体现出来，
  而不是在下一回合。行动速度的计算公式也可以调整和微调，甚至可以移除其中的随机因素，使
  敏捷值真正成为一个有战术价值的参数。
  
  技能和物品注释标签：
  
<speed: +x>
<speed: -x>

  这使你能够突破编辑器 - 2000 到 2000 的限制，更精确地设置行动速度。
  
============================================================================
  多重打击
============================================================================

  多重打击行动不会再因为目标在过程中死亡而提前结束。
  这是通过切换无敌状态实现的。要使用此功能，请确保你的数据库中存在无敌状态。
  如果不希望使用此功能，将 “无敌状态 ID” 参数设置为 0 即可。
  
============================================================================
  弹窗改进
============================================================================

  尽管伤害弹窗看起来可能仍与 MV 的默认弹窗相同，但它们的创建过程已有所不同，
  以简化伤害弹窗的显示流程。以前，弹窗每次只能显示一个，且至少要间隔一帧才能显示下一个。
  现在，任何在同一帧发生的行动，其对应的弹窗都会在同一帧显示，使伤害弹窗更加流畅，不再那么笨拙。
  
============================================================================
  公共事件
============================================================================

  现在，无论敌方队伍是否还存活，公共事件都会在每个行动结束时触发。通过合理放置行动序列标签，
  你还可以让技能的公共事件在行动过程中触发。但需要注意的是，如果在一个行动进行过程中强制触发另一个行动，
  前一个行动序列列表的剩余部分将失效，转而执行新的强制行动。
  
============================================================================
  施法动画
============================================================================

  施法动画有助于为玩家提供视觉提示，让他们知道哪个战斗者将要执行行动，以及该行动属于哪种技能类型。
  本插件允许技能拥有施法动画，这些动画既可以统一修改，也可以为每个技能单独定制。
  技能注释标签：
  
<Cast Animation: x>

  将技能的施法动画设置为动画 ID x。将 x 设置为 0，则该技能不会有任何动画。
  
============================================================================
  切换战斗系统
============================================================================

  当玩家不在战斗中时，你可以使用插件命令切换战斗系统。仅使用本插件时，只包含一种战斗系统：默认战斗系统。
  插件命令：
  setBattleSys DTB 将战斗系统设置为默认回合制战斗。
  未来的其他插件可能会包含可利用本战斗引擎核心的其他战斗系统。
  
============================================================================
  侧视视角动作
============================================================================

  在 RPG Maker MV 的默认战斗系统中，侧视视角和正视视角设置都不会显示反击、魔法反射以及任何队友替伤的情况。战斗引擎核心为使用侧视视角设置的游戏提供了少量动画，以更直观的方式向玩家传递信息。
  魔法反射也会显示反射动画，以表明该战斗者具有反射属性。此动画可以在参数中更改，但如果需要，特定的角色、职业、敌人、武器、防具和状态可以显示独特的反射动画。
  角色、职业、敌人、武器、防具和状态注释标签：
  
<Reflect Animation ID: x>

  将使用者的反射动画更改为 x。其优先级顺序如下：角色、职业、敌人、武器、防具、状态、默认。
  有时，你可能不希望敌人移动，或者不希望某些角色移动。无论出于何种原因，它们就是静止的。
  要实现这一点，你可以使用以下注释标签禁止战斗者移动。
  角色、职业、敌人、武器、防具和状态注释标签：
  
<Sprite Cannot Move>

  阻止战斗者的精灵移动。其优先级顺序如下：角色、职业、敌人、武器、防具、状态。
  如果敌人在执行行动时无法移动，它会像在正视视角中那样闪烁白光。
  
============================================================================
  自定义侧视战斗者锚点
============================================================================

  侧视战斗者通常水平居中，并以脚部为基准定位。然而，并非所有侧视战斗者精灵表都采用这种方式。
  如果你有不符合这些标准的侧视战斗者，可以通过其他方式设置其 “锚点”。
  角色、职业、武器、防具、状态注释标签：
  
<Anchor X: y.z>
<Anchor Y: y.z>

  此标签将角色侧视战斗者的锚点位置设置为 y.z。默认情况下，X 锚点为 0.5，Y 锚点为 1.0。
  如果希望 X 锚点更靠左一些，可将其设置为小于 0.5 的值；若希望 X 锚点更靠右，可将其设置为大于 0.5 的值。
  要提高 Y 锚点，可将数值设置为小于 1.0。不断调整，直到找到合适的锚点设置。
  如果一个锚点有多个特性导致不同的锚点值，将按照以下优先级顺序使用：
  
  状态
  武器
  防具
  职业
  角色
  默认
  
  优先级列表中位置越靠上，优先级越高。
  
============================================================================
  敌人攻击动画
============================================================================

  要为你的敌人设置独特的攻击动画，可以使用以下注释标签：
  敌人注释标签：
<Attack Animation: x>
  将 x 替换为你希望设置为敌人默认攻击动画的战斗动画 ID。

============================================================================
  状态自动移除条件
============================================================================

  在 RPG Maker MV 的默认战斗系统中，状态自动移除包含三种条件：无（不自动移除）、行动结束时、回合结束时。
  其中，“无” 和 “回合结束时” 的条件均按预期正常工作。但 “行动结束时” 条件存在问题：
  原本应在战斗者行动结束后移除状态，实际却在行动开始前就移除了状态。本插件已修复此问题，确保 “行动结束时” 仅在战斗者行动结束后触发状态移除。
  此外，本插件新增了两种状态自动移除条件：行动开始时和回合开始时。可通过以下注释标签（Notetag）添加并启用这两种条件：
  状态注释标签（State Notetags）：
  
<Action Start: x>
<Action Start: x to y>

  启用后，状态的剩余回合数将在战斗者行动开始时更新。其中，x 表示状态持续的固定回合数；
  若使用 x to y 格式（如 <Action Start: 2 to 4>），则状态施加时，其持续回合数会在 x 到 y 之间随机取值，达到该回合数后状态自动移除。
  
<Turn Start: x>
<Turn Start: x to y>

  启用后，状态的剩余回合数将在战斗回合开始时更新。其中，x 表示状态持续的固定回合数；若使用 x to y 格式，则状态施加时，
  其持续回合数会在 x 到 y 之间随机取值，达到该回合数后状态自动移除。
  需要特别说明的是，“行动结束时”（Action End）类型的状态有一个独特特性：
  若状态的施加者是当前活跃的战斗者（即行动主体），且该状态被施加到施加者自身时，该战斗者将获得一个 “额外回合”（Free Turn）。
  设计这一特性的目的是：避免因 “行动结束时移除” 的机制，导致战斗者在施加状态的当前回合就失去该状态的效果（额外回合可确保状态效果完整生效）。
  
============================================================================
  动作序列
============================================================================

  Yanfly 引擎插件 —— 战斗引擎核心（Battle Engine Core）支持使用自定义动作序列（Custom Action Sequences）。
  动作序列是一组基础指令，可从视觉表现和机制逻辑两方面，为技能创建个性化效果（例如自定义技能的攻击动画流程、角色移动路径等）。
  需要注意的是，本战斗引擎核心插件仅包含最基础的动作序列功能。关于如何创建自定义动作序列的详细说明，
  将在该插件的后续扩展插件（Extension Plugins）的帮助文档中提供。

============================================================================
  更新日志
============================================================================

版本 1.51：
修复了 updateBattlerName 函数（感谢 ZServ 提供修复支持）。
版本 1.50：
动作序列现在支持无限参数。
版本 1.49：
为 furthestRight() 函数的错误添加了安全防护机制（防止因该函数调用出错导致崩溃）。
版本 1.48：
性能优化更新。
版本 1.47：
修复了因更新至 RPG Maker MV 1.6.1 版本后，在脚本调用或自定义 “疯狂模式”（Lunatic Mode）代码段中插入错误代码时，触发 isDevToolsOpen() 函数报错的问题（新增绕过该错误的机制）。
版本 1.46：
适配 RPG Maker MV 1.6.1 版本。
版本 1.45：
适配 RPG Maker MV 1.5.0 版本。
版本 1.44：
修复了战斗中途切换场景后返回战斗时，敌人名称窗口消失的 bug。
版本 1.43b：
修复了使用不存在的动作时导致游戏崩溃的 bug。
性能优化更新。
版本 1.42：
性能优化更新。
版本 1.41：
修复了战斗中途移除队员时，部分精灵仍保留在活跃资源池中的 bug。
版本 1.40：
适配 RPG Maker MV 1.3.2 版本。
版本 1.39c：
修复了 “非目标”（Not Focus）动作序列瞄准逻辑中，死亡角色未被纳入瞄准范围的 bug。
性能优化更新。
优化 “强制动作队列”（queueForceAction）功能，现在支持同时使用数字（索引）和实际目标对象作为参数。
版本 1.38a：
性能优化更新。
适配 “选择控制”（Selection Control v1.08）插件。
修复了敌人镜像动画显示异常的 bug。
版本 1.37：
修复了敌人尺寸过小时，选择敌人时其名称显示被截断的 bug。
版本 1.36d：
优化了无战斗背景图（battleback）时的战斗背景截图逻辑，防止战斗中途打开菜单时，玩家队伍和敌人部队的图像被纳入背景截图。
调整 “死亡中断”（Death Break）动作序列的触发条件：仅在角色进入 “死亡状态” 时触发，不再包含 “HP 为 0” 的触发条件。
优化强制动作的序列执行逻辑，提升效率。
修复了 “行动次数 +”（Action Times+）特性在默认回合制（DTB）下无法正常工作的问题。
优化战斗日志的消息显示逻辑。
优化精灵的 Z 轴排序算法（提升图层显示合理性）。
版本 1.35d：
优化目标瞄准逻辑：针对 “死亡队友” 的瞄准范围，现在会自动选中第一个死亡的队友；针对 “所有死亡队友” 的瞄准范围，会锁定第一个死亡的队友（减少玩家操作困惑）。
为精灵位图添加防崩溃机制（防止因位图加载异常导致崩溃）。
为 “伪动作”（faux actions）添加防崩溃机制。
为不存在的动画添加防播放机制（防止调用不存在的动画导致报错）。
新增检测逻辑：使用特定动作序列时，隐藏的战斗者不会显示在画面中。
版本 1.34a：
修复了 “非目标”（NOT FOCUS）瞄准范围未包含死亡角色的 bug。
修复了使用 “非目标”（NOT FOCUS）瞄准范围时，死亡目标异常显示的 bug。
版本 1.33：
适配 RPG Maker MV 1.1.0 版本。
版本 1.32d：
修复了角色死亡时导致游戏崩溃的 bug。
新增动作引擎（为后续插件功能奠定基础）。
为后续插件更新做准备。
扩展 “锚点 X/Y”（<Anchor X: y.z>、<Anchor Y: y.z>）注释标签的适用范围：从仅支持角色，扩展至角色、职业、武器、防具、状态。
为技能和物品新增 “显示文本”（<Display Text: x>）和 “显示图标”（<Display Icon: x>）注释标签：分别用于自定义技能 / 物品执行时的显示名称和显示图标。
调整 “魔法反射” 与 “反击” 的检测顺序：现在魔法反射的优先级高于反击（反射动作会优先触发）。
版本 1.31b：
为 “行动结束时移除”（Action End）类型的状态新增特性：若状态施加者是当前活跃战斗者（主体），且该状态被施加到自身时，战斗者会获得一个 “额外回合”（Free Turn）。此设计用于避免因 “行动结束时移除” 的机制，导致战斗者失去该状态在当前回合的效果。
为 “额外回合” 功能添加安全防护机制，防止其他插件覆盖战斗开始时的函数导致该功能失效。
适配 “动画侧视敌人”（Animated SV Enemies）插件，优化敌人死亡动作的显示。
版本 1.30：
性能优化更新。
修复了若新增状态效果包含 “死亡状态” 时，该状态无法正常施加的 bug。
战斗日志文本现在支持显示文本代码（如颜色代码、图标代码等）。
版本 1.29：
修复了 “else if” 动作序列的条件判断顺序异常的 bug（确保逻辑判断按预期执行）。
版本 1.28d：
修复了即时施法（instant cast）技能导致敌方战斗者强制动作异常结束的 bug（感谢 DoubleX 提供修复支持）。
修复了鼠标悬停（mouse over）功能无法正常工作的 bug。
修复了强制动作导致战斗冻结的 bug（当强制动作使主要活跃主体离开战斗时触发）。
修复了计时状态（timed states）的回合数更新异常的 bug。
提升 “IF” 动作序列的优先级，避免其与其他动作序列产生冲突。
版本 1.27：
机制调整（仅影响使用回合制状态计时机制的场景）：将 “回合结束时”（Turn End）的状态更新逻辑，从 “回合结束” 阶段迁移至 “再生”（Regeneration）阶段，使计时更同步（两者时间差极小，玩家基本无感知）。同时，增益 / 减益（Buff/Debuff）的回合更新也迁移至再生阶段。
版本 1.26：
在 “选择帮助”（Selection Help）参数中新增 “鼠标悬停”（Mouse Over）选项：启用后，鼠标用户只需将鼠标悬停在敌人身上即可选中目标，无需点击两次。
版本 1.25f：
为强制动作队列添加安全防护机制。
在敌人选择时新增 “显示选择框”（Show Select Box）参数。
修复了 “回合结束事件”（End Turn events）无法正常触发的 bug。
优化战斗动画定位逻辑：默认情况下，战斗动画会基于目标精灵的基础位图定位；此前角色精灵无基础位图，导致动画无论如何定位都只能显示在角色脚部，此次更新为角色精灵添加了基础位图。
重新调整精灵宽度和高度的计算逻辑。
为无侧视角色图像的场景添加安全防护机制（防止报错）。
版本 1.24：
实现 “强制动作队列” 功能：若在一个动作执行过程中触发另一个强制动作，原动作会在强制动作完成后继续执行，而非像默认 MV 机制那样直接取消原动作。
版本 1.23：
修复了计时制（tick-based）战斗中，HP/MP/TP 再生功能无法正常工作的 bug。
版本 1.22：
修复了 MV 原生机制的 bug：回合结束时（Turn End）的强制动作会触发所有与回合结束相关的行为（如再生、状态回合更新等）。
机制调整：“行动开始时”（Action Start）和 “行动结束时”（Action End）类型的状态回合数，不再通过强制动作更新。
版本 1.21：
修复了在默认回合制（DTB）下，“行动结束时移除”（Action End）类型的状态回合数减少异常的 bug。
版本 1.20：
修复了复活的角色使用即时施法（instant cast）时，无法立即执行动作的 bug。
版本 1.19：
为敌人新增 “攻击动画”（<Attack Animation: x>）注释标签：用于自定义敌人的默认攻击动画。
为计时制（Tick-Based）战斗新增 “AI 独立回合”（AI Self Turns）功能：敌人的 AI 逻辑可基于自身回合触发，而非基于整个战斗回合。
状态机制调整：在 “行动结束时移除”（Action End）的基础上，新增两种状态自动移除条件 ——“行动开始时”（Action Start）和 “回合开始时”（Turn Start）。
为状态新增自动移除相关的注释标签：<Action Start: x>、<Action Start: x to y>（行动开始时移除，持续 x 回合 / 随机 x 至 y 回合）、<Turn Start: x>、<Turn Start: x to y>（回合开始时移除，持续 x 回合 / 随机 x 至 y 回合）。
版本 1.18：
修复了非规则瞄准范围（irregular targeting scopes）的逻辑异常 bug。
修复了 MV 原生 “全部恢复”（Recover All）事件无法刷新战斗者状态的 bug。
版本 1.17b：
修复了 “行动结束时移除”（Action End）类型的状态无法批量移除的 bug。
修复了精灵受击后 “退缩”（flinching）动画显示异常的 bug。
新增 “当前 / 最大值”（Current Max）参数：用于自定义战斗中 HP 的显示方式（仅显示当前值 / 显示当前值 / 最大值）。
状态机制调整：“行动结束时更新”（Action End）类型的状态，现在会在战斗者行动结束时移除，而非行动开始时。
为后续新增战斗系统做准备。
版本 1.16：
修复了镜像显示的敌人（mirrored enemies）其状态图标也被镜像的显示异常 bug。
版本 1.15a：
修复了状态窗口（status window）无法刷新的 bug。
更新默认初始位置计算公式，使其更适配不同的队伍规模：
新初始位置 X 公式：screenWidth - 16 - (maxSize + 2) * 32 + index * 32
新初始位置 Y 公式：screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 16
版本 1.14：
修复了强制动作导致战斗锁定的 bug。
新增机制（仅适用于计时制战斗）：“行动结束时移除”（Action End）类型的状态，其回合数现在会根据战斗者执行的行动次数减少，而非此前与 “回合结束时移除”（Turn End）类型状态无区别的机制。
新增机制：使用 “即时技能 / 物品”（来自 YEP_InstantCast.js 插件）时，也会触发 “行动结束时移除” 类型状态的回合数减少。
版本 1.13a：
修复了战斗背景图（battlebacks）消失的 bug。
重构 “可视化敌人选择”（visual enemy select）功能。
优化胜利阶段的状态窗口显示：不再立即显示角色升级带来的属性变化。
修复了 “可视化敌人选择” 功能显示死亡敌人名称的 bug。
版本 1.12b：
新增逻辑：若战斗 HUD（heads-up display，平视显示界面）在胜利序列中被隐藏，会自动恢复显示。
为技能 / 物品新增 “速度调整”（<speed: +x>、<speed: -x>）注释标签：突破编辑器中速度调整的数值限制（默认 ±2000），支持更灵活的速度自定义。
新增战斗结束条件：需等待所有动作序列执行完成后，战斗才会结束。
版本 1.11：
修复了 HP/MP 再生效果无法显示的 bug。
版本 1.10：
移除对 “不朽状态”（immortal state）的依赖：将 “不朽” 设为独立设置（无需再通过状态实现）。
为动作速度计算公式新增更多简化变量（方便用户自定义公式）。
修复了 “全体范围”（all-scope）攻击会提前显示 “中途出现”（Appear-Halfway）敌人的 bug。
修复了最终敌人被状态伤害杀死时，战斗无法结束的 bug。
版本 1.09：
修复了刷新状态窗口时因 “角色未定义”（undefined actor）导致的报错。
在插件设置中新增 “显示阴影”（Show Shadows）参数。
重构默认动作序列：避免强制动作重叠显示，且队伍治疗动画可同步播放。
版本 1.08：
修复了战斗者通过伤害公式为自身恢复 HP/MP 时，未触发数值弹窗的 bug。
修复了队伍逃跑失败时，本应在战斗结束后移除的状态被提前移除的 bug（感谢 Emjenoeg 提供修复支持）。
修复了即死（instant death）技能无法生效的 bug。
调整 “精灵优先级”（Sprite Priority）设置：现在可选择 “角色优先显示”“敌人优先显示” 或 “无优先级（默认）”。
版本 1.07：
优化状态窗口刷新逻辑：减少不必要的刷新，提升性能。
为后续插件奠定框架：
在参数中新增 “逃跑比率”（Escape Ratio）和 “逃跑失败增益”（Fail Escape Boost），支持用户自定义逃跑成功率计算公式。
在参数中新增 “正面精灵优先级”（Front Sprite Priority）和 “侧视精灵优先级”（Side Sprite Priority），用于控制角色精灵是否始终显示在顶层。
新增 “计时设置”（Tick-Settings）分类，为计时制战斗系统提供参数支持。
版本 1.06：
修复了战斗开始时，死亡角色的精灵未生成的 bug。
修复了帮助窗口在空技能槽位上仍显示上一个技能描述的 bug。
版本 1.05：
新增目标类型 “角色 X”（Character X）：支持直接选中队伍中 ID 为 X 的角色（若该角色在队伍中）。
修复了 “未命中”（Miss）和 “闪避”（Evade）弹窗无法显示的 bug。
版本 1.04：
修复了特定动画类型下，数值弹窗无法显示的 bug。
修复了部分战斗者动作（motion）无法正确刷新的 bug。
优化瞄准逻辑：无瞄准范围（scope=0）的动作，不再触发确认选择窗口。
版本 1.03：
新增 “等待效果”（Wait for Effect）动作序列。
优化动作执行逻辑：动作会等待效果（如角色倒地动画）完成后，再继续执行后续战斗流程或结束战斗。
版本 1.02：
修复了帮助窗口在无技能时仍保留上一个技能描述的 bug。
同步角色精灵与武器动画的显示时机（确保两者同时播放）。
修复了请求敌人执行不存在的动作时导致游戏崩溃的 bug。
版本 1.01：
优化数值弹窗显示：同时影响 HP 和 MP 的技能 / 物品，现在会分别显示 HP 和 MP 的数值弹窗。
版本 1.00：
插件正式完成！
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleEngineCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BECSystem = String(Yanfly.Parameters['Default System']);
Yanfly.Param.BECEscRatio = String(Yanfly.Parameters['Escape Ratio']);
Yanfly.Param.BECEscFail = String(Yanfly.Parameters['Fail Escape Boost']);
Yanfly.Param.CastCertHit = Number(Yanfly.Parameters['Certain Hit Animation']);
Yanfly.Param.CastPhysical = Number(Yanfly.Parameters['Physical Animation']);
Yanfly.Param.CastMagical = Number(Yanfly.Parameters['Magical Animation']);
Yanfly.Param.EnemyAtkAni = Number(Yanfly.Parameters['Enemy Attack Animation']);
Yanfly.Param.BECOptSpeed = String(Yanfly.Parameters['Optimize Speed']);
Yanfly.Param.BECOptSpeed = eval(Yanfly.Param.BECOptSpeed);
Yanfly.Param.BECEmergeText = String(Yanfly.Parameters['Show Emerge Text']);
Yanfly.Param.BECEmergeText = eval(Yanfly.Param.BECEmergeText);
Yanfly.Param.BECPreEmpText = String(Yanfly.Parameters['Show Pre-Emptive Text']);
Yanfly.Param.BECPreEmpText = eval(Yanfly.Param.BECPreEmpText);
Yanfly.Param.BECSurpText = String(Yanfly.Parameters['Show Surprise Text']);
Yanfly.Param.BECSurpText = eval(Yanfly.Param.BECSurpText);
Yanfly.Param.BECPopupOverlap = String(Yanfly.Parameters['Popup Overlap Rate']);
Yanfly.Param.BECPopupOverlap = eval(Yanfly.Param.BECPopupOverlap);
Yanfly.Param.BECNewPopBottom = String(Yanfly.Parameters['Newest Popup Bottom']);
Yanfly.Param.BECNewPopBottom = eval(Yanfly.Param.BECNewPopBottom);
Yanfly.Param.BECStartActCmd = String(Yanfly.Parameters['Start Actor Command']);
Yanfly.Param.BECStartActCmd = eval(Yanfly.Param.BECStartActCmd);
Yanfly.Param.BECCurMax = eval(String(Yanfly.Parameters['Current Max']));
Yanfly.Param.BECSelectHelp = String(Yanfly.Parameters['Select Help Window']);
Yanfly.Param.BECSelectHelp = eval(Yanfly.Param.BECSelectHelp);
Yanfly.Param.BECHelpUserTx = String(Yanfly.Parameters['User Help Text']);
Yanfly.Param.BECHelpAllyTx = String(Yanfly.Parameters['Ally Help Text']);
Yanfly.Param.BECHelpAlliesTx = String(Yanfly.Parameters['Allies Help Text']);
Yanfly.Param.BECHelpEnemyTx = String(Yanfly.Parameters['Enemy Help Text']);
Yanfly.Param.BECHelpEnemiesTx = String(Yanfly.Parameters['Enemies Help Text']);
Yanfly.Param.BECHelpAllTx = String(Yanfly.Parameters['All Help Text']);
Yanfly.Param.BECHelpRandTx = String(Yanfly.Parameters['Random Help Text']);
Yanfly.Param.BECFrontPosX = String(Yanfly.Parameters['Front Position X']);
Yanfly.Param.BECFrontPosY = String(Yanfly.Parameters['Front Position Y']);
Yanfly.Param.BECFrontSprite = String(Yanfly.Parameters['Front Actor Sprite']);
Yanfly.Param.BECFrontSprite = eval(Yanfly.Param.BECFrontSprite);
Yanfly.Param.BECFrSpPrio = String(Yanfly.Parameters['Front Sprite Priority']);
Yanfly.Param.BECHomePosX = String(Yanfly.Parameters['Home Position X']);
Yanfly.Param.BECHomePosY = String(Yanfly.Parameters['Home Position Y']);
Yanfly.Param.BECSideSpPrio = String(Yanfly.Parameters['Side Sprite Priority']);
Yanfly.Param.BECSideSpPrio = eval(Yanfly.Param.BECSideSpPrio);
Yanfly.Param.BECAnchorX = Number(Yanfly.Parameters['Default X Anchor']);
Yanfly.Param.BECAnchorY = Number(Yanfly.Parameters['Default Y Anchor']);
Yanfly.Param.BECStepDist = Number(Yanfly.Parameters['Step Distance']);
Yanfly.Param.BECFlinchDist = Number(Yanfly.Parameters['Flinch Distance']);
Yanfly.Param.BECShowShadows = String(Yanfly.Parameters['Show Shadows']);
Yanfly.Param.BECShowShadows = eval(Yanfly.Param.BECShowShadows);
Yanfly.Param.BECPopupDur = Number(Yanfly.Parameters['Popup Duration']);
Yanfly.Param.BECCritPopup = String(Yanfly.Parameters['Critical Popup']);
Yanfly.Param.BECCritDur = Number(Yanfly.Parameters['Critical Duration']);
Yanfly.Param.BECActionSpeed = String(Yanfly.Parameters['Action Speed']);
Yanfly.Param.BECReflectAni = Number(Yanfly.Parameters['Reflect Animation']);
Yanfly.Param.BECMotionWait = String(Yanfly.Parameters['Motion Waiting']);
Yanfly.Param.BECMotionWait = eval(Yanfly.Param.BECMotionWait);
Yanfly.Param.BECTimeStates = String(Yanfly.Parameters['Timed States']);
Yanfly.Param.BECTimeStates = eval(Yanfly.Param.BECTimeStates);
Yanfly.Param.BECTimeBuffs = String(Yanfly.Parameters['Timed Buffs']);
Yanfly.Param.BECTimeBuffs = eval(Yanfly.Param.BECTimeBuffs);
Yanfly.Param.BECTurnTime = Number(Yanfly.Parameters['Turn Time']);
Yanfly.Param.BECAISelfTurn = eval(String(Yanfly.Parameters['AI Self Turns']));
Yanfly.Param.BECLowerWindows = String(Yanfly.Parameters['Lower Windows']);
Yanfly.Param.BECLowerWindows = eval(Yanfly.Param.BECLowerWindows);
Yanfly.Param.BECSelectMouseOver = eval(String(Yanfly.Parameters['Mouse Over']));
Yanfly.Param.BECEnemySelect = String(Yanfly.Parameters['Visual Enemy Select']);
Yanfly.Param.BECEnemySelect = eval(Yanfly.Param.BECEnemySelect);
Yanfly.Param.BECActorSelect = String(Yanfly.Parameters['Visual Actor Select']);
Yanfly.Param.BECActorSelect = eval(Yanfly.Param.BECActorSelect);
Yanfly.Param.BECWindowRows = Number(Yanfly.Parameters['Window Rows']);
Yanfly.Param.BECEnemyFontSize = Number(Yanfly.Parameters['Enemy Font Size']);
Yanfly.Param.BECShowEnemyName = String(Yanfly.Parameters['Show Enemy Name']);
Yanfly.Param.BECShowEnemyName = eval(Yanfly.Param.BECShowEnemyName);
Yanfly.Param.BECShowSelectBox = String(Yanfly.Parameters['Show Select Box']);
Yanfly.Param.BECShowSelectBox = eval(Yanfly.Param.BECShowSelectBox);
Yanfly.Param.BECEnemyAutoSel = String(Yanfly.Parameters['Enemy Auto Select']);
Yanfly.Param.BECEnemyAutoSel = Yanfly.Param.BECEnemyAutoSel;
Yanfly.Param.BECCommandAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.BECCommandRows = Number(Yanfly.Parameters['Command Window Rows']);
Yanfly.Param.BECAniBaseDel = Number(Yanfly.Parameters['Animation Base Delay']);
Yanfly.Param.BECAniNextDel = Number(Yanfly.Parameters['Animation Next Delay']);

Yanfly.Param.BECFullActText = String(Yanfly.Parameters['Show Action Text']);
Yanfly.Param.BECFullActText = eval(Yanfly.Param.BECFullActText);
Yanfly.Param.BECShowCntText = String(Yanfly.Parameters['Show Counter Text']);
Yanfly.Param.BECShowCntText = eval(Yanfly.Param.BECShowCntText);
Yanfly.Param.BECShowRflText = String(Yanfly.Parameters['Show Reflect Text']);
Yanfly.Param.BECShowRflText = eval(Yanfly.Param.BECShowRflText);
Yanfly.Param.BECShowSubText = String(Yanfly.Parameters['Show Substitute Text']);
Yanfly.Param.BECShowSubText = eval(Yanfly.Param.BECShowSubText);
Yanfly.Param.BECShowFailText = String(Yanfly.Parameters['Show Fail Text']);
Yanfly.Param.BECShowFailText = eval(Yanfly.Param.BECShowFailText);
Yanfly.Param.BECShowCritText = String(Yanfly.Parameters['Show Critical Text']);
Yanfly.Param.BECShowCritText = eval(Yanfly.Param.BECShowCritText);
Yanfly.Param.BECShowMissText = String(Yanfly.Parameters['Show Miss Text']);
Yanfly.Param.BECShowMissText = eval(Yanfly.Param.BECShowMissText);
Yanfly.Param.BECShowEvaText = String(Yanfly.Parameters['Show Evasion Text']);
Yanfly.Param.BECShowEvaText = eval(Yanfly.Param.BECShowEvaText);
Yanfly.Param.BECShowHpText = String(Yanfly.Parameters['Show HP Text']);
Yanfly.Param.BECShowHpText = eval(Yanfly.Param.BECShowHpText);
Yanfly.Param.BECShowMpText = String(Yanfly.Parameters['Show MP Text']);
Yanfly.Param.BECShowMpText = eval(Yanfly.Param.BECShowMpText);
Yanfly.Param.BECShowTpText = String(Yanfly.Parameters['Show TP Text']);
Yanfly.Param.BECShowTpText = eval(Yanfly.Param.BECShowTpText);
Yanfly.Param.BECShowStateText = String(Yanfly.Parameters['Show State Text']);
Yanfly.Param.BECShowStateText = eval(Yanfly.Param.BECShowStateText);
Yanfly.Param.BECShowBuffText = String(Yanfly.Parameters['Show Buff Text']);
Yanfly.Param.BECShowBuffText = eval(Yanfly.Param.BECShowBuffText);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.BEC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.BEC.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_BattleEngineCore) {
    this.processMELODYNotetags($dataSkills);
    this.processMELODYNotetags($dataItems);
    this.processBECNotetags1($dataSkills);
    this.processBECNotetags2($dataSkills);
    this.processBECNotetags2($dataItems);
    this.processBECNotetags3($dataEnemies);
    this.processBECNotetags4($dataActors);
    this.processBECNotetags4($dataClasses);
    this.processBECNotetags4($dataWeapons);
    this.processBECNotetags4($dataArmors);
    this.processBECNotetags4($dataEnemies);
    this.processBECNotetags4($dataStates);
    this.processBECNotetags5($dataActors, true);
    this.processBECNotetags5($dataClasses, false);
    this.processBECNotetags5($dataWeapons, false);
    this.processBECNotetags5($dataArmors, false);
    this.processBECNotetags5($dataStates, false);
    this.processBECNotetags6($dataStates);
    Yanfly._loaded_YEP_BattleEngineCore = true;
  }
  return true;
};

DataManager.processMELODYNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.actionsMade) continue;
    obj.actionsMade = true;
    var notedata = obj.note.split(/[\r\n]+/);

    var actionType = 0;
    this.setDefaultActions(obj);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SETUP ACTION|setup)>/i)) {
        actionType = 1;
        obj.setupActions = [];
      } else if (line.match(/<\/(?:SETUP ACTION|setup)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:WHOLE ACTION|whole)>/i)) {
        actionType = 2;
        obj.wholeActions = [];
      } else if (line.match(/<\/(?:WHOLE ACTION|whole)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:TARGET ACTION|target)>/i)) {
        actionType = 3;
        obj.targetActions = [];
      } else if (line.match(/<\/(?:TARGET ACTION|target)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FOLLOW ACTION|follow)>/i)) {
        actionType = 4;
        obj.followActions = [];
      } else if (line.match(/<\/(?:FOLLOW ACTION|follow)>/i)) {
        var actionType = 0;
      } else if (line.match(/<(?:FINISH ACTION|finish)>/i)) {
        actionType = 5;
        obj.finishActions = [];
      } else if (line.match(/<\/(?:FINISH ACTION|finish)>/i)) {
        var actionType = 0;
      } else {
        this.convertSequenceLine(obj, line, actionType);
      }
    }
  }
};

Yanfly.BEC.DefaultActionSetup = [
    ['CLEAR BATTLE LOG'],
    ['DISPLAY ACTION'],
    ['IMMORTAL', ['TARGETS', 'TRUE']],
    ['PERFORM START'],
    ['WAIT FOR MOVEMENT'],
    ['CAST ANIMATION'],
    ['WAIT FOR ANIMATION']
];
Yanfly.BEC.DefaultActionWhole = [
    ['PERFORM ACTION'],
];
Yanfly.BEC.DefaultActionTarget = [
    ['PERFORM ACTION'],
];
if (Yanfly.Param.BECMotionWait) {
  Yanfly.BEC.DefaultActionWhole.push(['MOTION WAIT', ['USER']]);
  Yanfly.BEC.DefaultActionTarget.push(['MOTION WAIT', ['USER']]);
} else {
  Yanfly.BEC.DefaultActionWhole.push(['WAIT', [10]]);
  Yanfly.BEC.DefaultActionTarget.push(['WAIT', [10]]);
};
Yanfly.BEC.DefaultActionWhole.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionWhole.push(['WAIT FOR ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['WAIT FOR ANIMATION']);
Yanfly.BEC.DefaultActionFollow = [
];
Yanfly.BEC.DefaultActionFinish = [
    ['IMMORTAL', ['TARGETS', 'FALSE']],
    ['WAIT FOR NEW LINE'],
    ['CLEAR BATTLE LOG'],
    ['PERFORM FINISH'],
    ['WAIT FOR MOVEMENT'],
    ['WAIT FOR EFFECT'],
    ['ACTION COMMON EVENT'],
];
DataManager.setDefaultActions = function(obj) {
    obj.setupActions = Yanfly.BEC.DefaultActionSetup.slice();
    if (this.isWholeAction(obj)) {
      obj.wholeActions = Yanfly.BEC.DefaultActionWhole.slice();
      this.addActionEffects(obj, obj.wholeActions);
      obj.targetActions = [];
    } else {
      obj.wholeActions = [];
      obj.targetActions = Yanfly.BEC.DefaultActionTarget.slice();
      this.addActionEffects(obj, obj.targetActions);
    }
    obj.followActions = Yanfly.BEC.DefaultActionFollow.slice();
    obj.finishActions = Yanfly.BEC.DefaultActionFinish.slice();
};

DataManager.isWholeAction = function(obj) {
  if (obj.animationId > 0 && $dataAnimations[obj.animationId]) {
    var animation = $dataAnimations[obj.animationId];
    if (animation.position === 3) return true;
    if (animation.position !== 3 && [2, 8, 10].contains(obj.scope)) return true;
  }
  return false;
};

DataManager.addActionEffects = function(obj, array) {
    for (;;) {
      array[array.length] = ['ACTION EFFECT'];
      array[array.length] = ['DEATH BREAK'];
      obj.repeats -= 1;
      if (obj.repeats <= 0) break;
      array[array.length] = ['WAIT', [8]];
    }
    obj.repeats = 1;
};

DataManager.convertSequenceLine = function(obj, line, actionType) {
  if (actionType <= 0 || actionType > 5) return;
  Yanfly.BEC.SeqType;
  var seqArgs;
  if (line.match(/[ ]*(.*):[ ](.*)/i)) {
    Yanfly.BEC.SeqType = RegExp.$1.trim();
    seqArgs = RegExp.$2.split(',');
    var length = seqArgs.length;
    for (var i = 0; i < length; ++i) {
      seqArgs[i] = seqArgs[i].trim();
    }
  } else {
    Yanfly.BEC.SeqType = line.trim();
    seqArgs = [];
  }
  var array = [Yanfly.BEC.SeqType, seqArgs];
  if (actionType === 1) obj.setupActions[obj.setupActions.length] = array;
  if (actionType === 2) obj.wholeActions[obj.wholeActions.length] = array;
  if (actionType === 3) obj.targetActions[obj.targetActions.length] = array;
  if (actionType === 4) obj.followActions[obj.followActions.length] = array;
  if (actionType === 5) obj.finishActions[obj.finishActions.length] = array;
};

DataManager.processBECNotetags1 = function(group) {
  var note1 = /<(?:CAST ANIMATION|cast ani):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.castAnimation = 0;
    if (obj.hitType === 0) obj.castAnimation = Yanfly.Param.CastCertHit;
    if (obj.hitType === 1) obj.castAnimation = Yanfly.Param.CastPhysical;
    if (obj.hitType === 2) obj.castAnimation = Yanfly.Param.CastMagical;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.castAnimation = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processBECNotetags2 = function(group) {
  var note1 = /<(?:ACTION COPY):[ ](.*):[ ]*(\d+)>/i;
  var note2 = /<(?:SPEED):[ ]([\+\-]\d+)>/i;
  var note3 = /<(?:DISPLAY NAME|DISPLAY TEXT):[ ](.*)>/i;
  var note4 = /<(?:DISPLAY ICON):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.battleDisplayText = obj.name;
    obj.battleDisplayIcon = obj.iconIndex;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var text = String(RegExp.$1).toUpperCase();
        var target;
        if (['I', 'ITEM'].contains(text)) {
          target = $dataItems[parseInt(RegExp.$2)];
        } else if (['S', 'SKILL'].contains(text)) {
          target = $dataSkills[parseInt(RegExp.$2)];
        }
        if (target) {
          obj.setupActions = target.setupActions.slice();
          obj.wholeActions = target.wholeActions.slice();
          obj.targetActions = target.targetActions.slice();
          obj.followActions = target.followActions.slice();
          obj.finishActions = target.finishActions.slice();
        }
      } else if (line.match(note2)) {
        obj.speed = parseInt(RegExp.$1);
      } else if (line.match(note3)) {
        obj.battleDisplayText = String(RegExp.$1);
      } else if (line.match(note4)) {
        obj.battleDisplayIcon = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processBECNotetags3 = function(group) {
  var note1 = /<(?:ATTACK ANIMATION|attack ani):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.attackAnimationId = Yanfly.Param.EnemyAtkAni;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.attackAnimationId = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processBECNotetags4 = function(group) {
  var note1 = /<(?:REFLECT ANIMATION|reflect ani):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.reflectAnimationId = 0;
    obj.spriteCannotMove = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.reflectAnimationId = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SPRITE CANNOT MOVE)>/i)) {
        obj.spriteCannotMove = true;
      }
    }
  }
};

DataManager.processBECNotetags5 = function(group, isActor) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    if (isActor) {
      obj.anchorX = Yanfly.Param.BECAnchorX;
      obj.anchorY = Yanfly.Param.BECAnchorY;
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ANCHOR X):[ ](\d+)[.](\d+)>/i)) {
        obj.anchorX = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
      } else if (line.match(/<(?:ANCHOR Y):[ ](\d+)[.](\d+)>/i)) {
        obj.anchorY = eval(String(RegExp.$1) + '.' + String(RegExp.$2));
      }
    }
  }
};

DataManager.processBECNotetags6 = function(group) {
  var note1a = /<(?:ACTION START):[ ](\d+)>/i;
  var note1b = /<(?:ACTION START):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note2a = /<(?:TURN START):[ ](\d+)>/i;
  var note2b = /<(?:TURN START):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1a)) {
        var turns = parseInt(RegExp.$1);
        obj.autoRemovalTiming = 3;
        obj.maxTurns = turns;
        obj.minTurns = turns;
      } else if (line.match(note1b)) {
        var turns1 = parseInt(RegExp.$1);
        var turns2 = parseInt(RegExp.$2);
        obj.autoRemovalTiming = 3;
        obj.maxTurns = turns1;
        obj.minTurns = turns2;
      } else if (line.match(note2a)) {
        var turns = parseInt(RegExp.$1);
        obj.autoRemovalTiming = 4;
        obj.maxTurns = turns;
        obj.minTurns = turns;
      } else if (line.match(note2b)) {
        var turns1 = parseInt(RegExp.$1);
        var turns2 = parseInt(RegExp.$2);
        obj.autoRemovalTiming = 4;
        obj.maxTurns = turns1;
        obj.minTurns = turns2;
      }
    }
  }
};

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.BEC.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    Yanfly.BEC.TouchInput_onMouseMove.call(this, event);
    this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
    this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.BEC.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Yanfly.BEC.BattleManager_initMembers.call(this);
    this._forceSelection = false;
    this._allSelection = false;
    this._victoryPhase = false;
    this._forceActionQueue = [];
};

BattleManager.isBattleSystem = function(value) {
    return value.toLowerCase() === $gameSystem.getBattleSystem();
};

BattleManager.isDTB = function() {
    return this.isBattleSystem('dtb');
};

BattleManager.isTurnBased = function() {
    if (this.isDTB()) return true;
    return false;
};

BattleManager.isTickBased = function() {
    return !this.isTurnBased();
};

BattleManager.tickRate = function() {
    return 1;
};

BattleManager.forceSelection = function() {
    this._forceSelection = true;
};

BattleManager.isForceSelection = function() {
    return this._forceSelection;
};

BattleManager.resetSelection = function() {
    this._forceSelection = false;
};

BattleManager.startAllSelection = function() {
    this._allSelection = true;
};

BattleManager.isAllSelection = function() {
     return this._allSelection && BattleManager.isInputting();
};

BattleManager.stopAllSelection = function() {
    this._allSelection = false;
};

Yanfly.BEC.BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
    if (this.isDTB()) {
      var code = Yanfly.Param.BECEscRatio;
      try {
        this._escapeRatio = eval(code);
      } catch (e) {
        this._escapeRatio = 0;
        Yanfly.Util.displayError(e, code, 'ESCAPE RATIO FORMULA ERROR');
      }
      var code = Yanfly.Param.BECEscFail;
      try {
        this._escapeFailBoost = eval(code);
      } catch (e) {
        this._escapeFailBoost = 0;
        Yanfly.Util.displayError(e, code, 'ESCAPE FAIL BOOST FORMULA ERROR');
      }
    } else {
      this._escapeFailBoost = 0.1;
      Yanfly.BEC.BattleManager_makeEscapeRatio.call(this);
    }
};

BattleManager.timeBasedStates = function() {
    if (!$gameParty.inBattle()) return false;
    if (this.isTurnBased()) return false;
    if (this._timeBasedStates !== undefined) return this._timeBasedStates;
    this._timeBasedStates = Yanfly.Param.BECTimeStates;
    return this._timeBasedStates;
};

BattleManager.timeBasedBuffs = function() {
    if (!$gameParty.inBattle()) return false;
    if (this.isTurnBased()) return false;
    if (this._timeBasedBuffs !== undefined) return this._timeBasedBuffs;
    this._timeBasedBuffs = Yanfly.Param.BECTimeBuffs;
    return this._timeBasedBuffs;
};

BattleManager.displayStartMessages = function() {
    if (Yanfly.Param.BECEmergeText) {
      $gameTroop.enemyNames().forEach(function(name) {
          $gameMessage.add(TextManager.emerge.format(name));
      });
    }
    if (this._preemptive && Yanfly.Param.BECPreEmpText) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise && Yanfly.Param.BECSurpText) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};

BattleManager.registerSprite = function(battler, sprite) {
  if (!this._registeredSprites) this._registeredSprites = {};
  if (battler.isActor()) var id = 100000 + battler.actorId();
  if (battler.isEnemy()) var id = 200000 + battler.index();
  this._registeredSprites[id] = sprite;
};

BattleManager.getSprite = function(battler) {
  if (!this._registeredSprites) this._registeredSprites = {};
  if (battler.isActor()) var id = 100000 + battler.actorId();
  if (battler.isEnemy()) var id = 200000 + battler.index();
  return this._registeredSprites[id];
};

BattleManager.setSpritePriority = function() {
    if ($gameSystem.isSideView()) {
      this._spritePriority = Yanfly.Param.BECSideSpPrio;
    } else {
      this._spritePriority = Yanfly.Param.BECFrontSprite;
    }
    if (this._spritePriority === false) this._spritePriority = 0;
    if (this._spritePriority === true) this._spritePriority = 1;
};

BattleManager.getSpritePriority = function() {
    if (!this._spritePriority) this.setSpritePriority();
    return this._spritePriority;
};

BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    var lastActor = this.actor();
    this._actorIndex = newActorIndex;
    var newActor = this.actor();
    if (lastActor) {
        lastActor.setActionState(lastActorActionState);
        lastActor.spriteReturnHome();
    }
    if (newActor) {
        newActor.setActionState('inputting');
        newActor.spriteStepForward();
    }
};

BattleManager.createActions = function() {
    $gameParty.createActions();
    $gameTroop.createActions();
};

BattleManager.clearInputtingAction = function() {
    if (this.inputtingAction()) this.inputtingAction().clear();
};

Yanfly.BEC.BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
BattleManager.checkBattleEnd = function() {
    if (this._phase === 'actionList') return false;
    if (this._phase === 'actionTargetList') return false;
    if (this._phase === 'action') return false;
    if (this._phase === 'phaseChange') return false;
    if ($gameTroop.isEventRunning()) return false;
    return Yanfly.BEC.BattleManager_checkBattleEnd.call(this);
};

Yanfly.BEC.BattleManager_processTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
    this._processTurn = true;
    Yanfly.BEC.BattleManager_processTurn.call(this);
    this._processTurn = false;
};

Yanfly.BEC.BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    this._logWindow.clear();
    this._victoryPhase = true;
    if (this._windowLayer) this._windowLayer.x = 0;
    Yanfly.BEC.BattleManager_processVictory.call(this);
};

BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
    if ($gamePlayer.isDebugThrough()) success = true;
    if (success) {
        $gameParty.performEscapeSuccess();
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += this._escapeFailBoost;
        $gameParty.clearActions();
        this.startTurn();
    }
    return success;
};

Yanfly.BEC.BattleManager_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
    $gameParty.removeBattleStates();
    Yanfly.BEC.BattleManager_processAbort.call(this);
};

BattleManager.refreshAllMembers = function() {
  $gameParty.refreshMembers();
  $gameTroop.refreshMembers();
};

BattleManager.startTurn = function() {
    this._enteredEndPhase = false;
    this._phase = 'turn';
    this.clearActor();
    $gameTroop.increaseTurn();
    $gameParty.onTurnStart();
    $gameTroop.onTurnStart();
    this._performedBattlers = [];
    this.makeActionOrders();
    $gameParty.requestMotionRefresh();
    this._logWindow.startTurn();
    this._subject = this.getNextSubject();
};

Yanfly.BEC.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    if (this.isTurnBased() && this._spriteset.isPopupPlaying()) return;
    if (this.isTurnBased() && this._enteredEndPhase) {
      this._phase = 'turnEnd';
      this._preemptive = false;
      this._surprise = false;
      return;
    }
    this._enteredEndPhase = true;
    Yanfly.BEC.BattleManager_endTurn.call(this);
    BattleManager.refreshAllMembers();
};

BattleManager.getNextSubject = function() {
    if ($gameTroop.turnCount() <= 0) return;
    this._performedBattlers = this._performedBattlers || [];
    this.makeActionOrders();
    for (;;) {
        var battlerArray = [];
        for (var i = 0; i < this._actionBattlers.length; ++i) {
          var obj = this._actionBattlers[i];
          if (!this._performedBattlers.contains(obj)) battlerArray.push(obj);
        }
        this._actionBattlers = battlerArray;
        var battler = this._actionBattlers.shift();
        if (!battler) return null;
        if (battler.isBattleMember() && battler.isAlive()) {
            this.pushPerformedBattler(battler);
            return battler;
        }
    }
};

BattleManager.pushPerformedBattler = function(battler) {
  this._performedBattlers.push(battler);
};

BattleManager.update = function() {
    if (!this.isBusy() && !this.updateEvent()) {
        switch (this._phase) {
        case 'start':
            this.startInput();
            break;
        case 'turn':
            this.updateTurn();
            break;
        case 'action':
            this.updateAction();
            break;
        case 'phaseChange':
            this.updatePhase();
            break;
        case 'actionList':
            this.updateActionList()
            break;
        case 'actionTargetList':
            this.updateActionTargetList()
            break;
        case 'turnEnd':
            this.updateTurnEnd();
            break;
        case 'battleEnd':
            this.updateBattleEnd();
            break;
        }
    }
};

BattleManager.updateEvent = function() {
    if (this._processingForcedAction) return false;
    switch (this._phase) {
    case 'start':
    case 'turn':
    case 'turnEnd':
    case 'actionList':
    case 'actionTargetList':
      if (this.isActionForced()) {
        this.processForcedAction();
        return true;
      } else {
        return this.updateEventMain();
      }
    }
    return this.checkAbort();
};

BattleManager.queueForceAction = function(user, skillId, target) {
    if (target === undefined) {
      var targetIndex = 0;
    } else if (typeof target === 'number') {
      var targetIndex = target;
    } else {
      var targetIndex = target.index();
    }
    var param = [
      user.isEnemy() ? 0 : 1,
      user.isActor() ? user.actorId() : user.index(),
      skillId,
      targetIndex
    ];
    var command = {
      code: 339,
      indent: 0,
      parameters: param
    }
    $gameTemp.forceActionQueue(command);
    this.clearResults();
    if (this.isTickBased()) this._phase = 'action';
};

BattleManager.addText = function(text, wait) {
  if (!SceneManager._scene._logWindow) return;
  wait = wait || 0;
  SceneManager._scene._logWindow.addText(text);
  if (wait <= 0) return;
  var last = this._actionList[this._actionList.length - 1];
  if (last && last[0] === 'WAIT') return;
  this._actionList.push(['WAIT', [wait]]);
};

BattleManager.clearResults = function() {
  var group = this.allBattleMembers();
  var length = group.length;
  for (var i = 0; i < length; ++i) {
    var member = group[i];
    if (member) member.clearResult();
  }
  this._allTargets = [];
  this._targets = [];
  this._target = undefined;
};

Yanfly.BEC.BattleManager_forceAction = BattleManager.forceAction;
BattleManager.forceAction = function(battler) {
    if (this._subject) this._subject.clearResult();
    this.createForceActionFailSafes();
    this.savePreForceActionSettings();
    Yanfly.BEC.BattleManager_forceAction.call(this, battler);
};

BattleManager.createForceActionFailSafes = function() {
    this._actionList = this._actionList || [];
    this._targets = this._targets || [];
    this._allTargets = this._allTargets || [];
    this._individualTargets = this._individualTargets || [];
    this._phaseSteps = this._phaseSteps || [];
    this._conditionFlags = this._conditionFlags || [];
    this._trueFlags = this._trueFlags || [];
};

BattleManager.savePreForceActionSettings = function() {
    var settings = this.setPreForceActionSettings();
    this._forceActionQueue.push(settings);
};

BattleManager.setPreForceActionSettings = function() {
    return {
      subject: this._subject,
      action: JsonEx.makeDeepCopy(this._action),
      actionList: JsonEx.makeDeepCopy(this._actionList),
      targets: this._targets.slice(),
      allTargets: this._allTargets.slice(),
      indTargets: this._individualTargets.slice(),
      phaseSteps: JsonEx.makeDeepCopy(this._phaseSteps),
      returnPhase: this._returnPhase,
      phase: this._phase,
      conditionFlags: JsonEx.makeDeepCopy(this._conditionFlags),
      trueFlags: JsonEx.makeDeepCopy(this._trueFlags)
    }
};

BattleManager.loadPreForceActionSettings = function() {
    var settings = this._forceActionQueue[0];
    if (settings) {
      this._forceActionQueue.shift();
      this.resetPreForceActionSettings(settings);
      return this._subject && this._subject.isAppeared();
    } else {
      return false;
    }
};

BattleManager.resetPreForceActionSettings = function(settings) {
    this._subject = settings['subject'];
    this._action = settings['action'];
    this._actionList = settings['actionList'];
    this._targets = settings['targets'];
    this._allTargets = settings['allTargets'];
    this._individualTargets = settings['indTargets'];
    this._phaseSteps = settings['phaseSteps'];
    this._returnPhase = settings['returnPhase'];
    this._conditionFlags = settings['conditionFlags'];
    this._trueFlags = settings['trueFlags'];
    this._phase = settings['phase'];   
};

Yanfly.BEC.BattleManager_processForcedAction =
    BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
    if (this._actionForcedBattler) {
      this._preForcePhase = this._phase;
      this._processingForcedAction = true;
    }
    Yanfly.BEC.BattleManager_processForcedAction.call(this);
};

BattleManager.setTargets = function(array) {
    this._targets = [];
    var max = array.length;
    for (var i = 0; i < max; ++i) {
      var target = array[i];
      if (target) this._targets.push(target);
    }
};

BattleManager.updateAction = function() {
    var target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else {
        if (this._returnPhase === 'target') {
          this.setTargets([this._individualTargets[0]]);
          this._phase = 'actionTargetList';
        } else {
          this.setTargets(this._allTargets.slice());
          this._phase = 'actionList';
        }
    }
};

BattleManager.invokeAction = function(subject, target) {
  if (!Yanfly.Param.BECOptSpeed)  this._logWindow.push('pushBaseLine');
  var normal = true;
  if (Math.random() < this._action.itemMrf(target)) {
    this.invokeMagicReflection(subject, target);
  } else if (Math.random() < this._action.itemCnt(target)) {
    this.invokeCounterAttack(subject, target);
  } else {
    this.invokeNormalAction(subject, target);
  }
  if (subject) subject.setLastTarget(target);
  if (!Yanfly.Param.BECOptSpeed) this._logWindow.push('popBaseLine');
};

BattleManager.invokeCounterAttack = function(subject, target) {
    var action = new Game_Action(target);
    this._logWindow.displayCounter(target);
    action.setAttack();
    action.apply(subject);
    this._logWindow.displayActionResults(target, subject);
    if (subject.isDead()) subject.performCollapse();
};

Yanfly.BEC.BattleManager_invokeMagicReflection =
    BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
    Yanfly.BEC.BattleManager_invokeMagicReflection.call(this, subject, target);
    if (subject.isDead()) subject.performCollapse();
};

BattleManager.updatePhase = function() {
    var phase = this._phaseSteps.shift();
    if (phase) this.createPhaseChanges();
    switch (phase) {
    case 'setup':
      this.createSetupActions();
      break;
    case 'whole':
      this.createWholeActions();
      break;
    case 'target':
      this.createTargetActions();
      break;
    case 'follow':
      this.createFollowActions();
      break;
    case 'finish':
      this.createFinishActions();
      break;
    default:
      this.endAction();
      break;
    }
};

BattleManager.createPhaseChanges = function() {
    this._phase = 'actionList';
    this.setTargets(this._allTargets.slice());
    this._conditionFlags = [];
    this._trueFlags = [];
};

BattleManager.createSetupActions = function() {
    $gameTemp.clearActionSequenceSettings();
    this._returnPhase = 'setup';
    this._actionList = this._action.item().setupActions.slice();
};

BattleManager.createWholeActions = function() {
    this._returnPhase = 'whole';
    this._actionList = this._action.item().wholeActions.slice();
};

BattleManager.createTargetActions = function() {
    this._returnPhase = 'target';
    this._phase = 'actionTargetList';
    this.setTargets([this._individualTargets[0]]);
    this._actionList = this._action.item().targetActions.slice();
};

BattleManager.createFollowActions = function() {
    this._returnPhase = 'follow';
    this._actionList = this._action.item().followActions.slice();
};

BattleManager.createFinishActions = function() {
    this._returnPhase = 'finish';
    this._actionList = this._action.item().finishActions.slice();
};

Yanfly.BEC.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this._subject) {
      this._subject.onAllActionsEnd();
    }
    if (this._processingForcedAction) {
      this._subject.removeCurrentAction();
      this._phase = this._preForcePhase;
    }
    this._processingForcedAction = false;
    if (this.loadPreForceActionSettings()) return;
    Yanfly.BEC.BattleManager_endAction.call(this);
};

BattleManager.updateActionList = function() {
    for (;;) {
      this._actSeq = this._actionList.shift();
      if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
        var seqName = this._actSeq[0].toUpperCase();
        if (!this.processActionSequenceCheck(seqName, this._actSeq[1])) {
          break;
        }
      } else {
        this._phase = 'phaseChange';
        break;
      }
    }
};

BattleManager.updateActionTargetList = function() {
    for (;;) {
      this._actSeq = this._actionList.shift();
      if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
        var seqName = this._actSeq[0].toUpperCase();
        if (!this.processActionSequenceCheck(seqName, this._actSeq[1])) {
          break;
        }
      } else if (this._individualTargets.length > 0) {
        this._individualTargets.shift();
        if (this._individualTargets.length > 0) {
          this.setTargets([this._individualTargets[0]]);
          this._actionList = this._action.item().targetActions.slice();
        } else {
          this._phase = 'phaseChange';
          break;
        }
      } else {
        this._phase = 'phaseChange';
        break;
      }
    }
};

BattleManager.updateActionTargetList = function() {
    for (;;) {
      this._actSeq = this._actionList.shift();
      if (this._actSeq) {
        if (!this.actionConditionsMet(this._actSeq)) continue;
        var seqName = this._actSeq[0].toUpperCase();
        if (!this.processActionSequenceCheck(seqName, this._actSeq[1])) {
          break;
        }
      } else if (this._individualTargets.length > 0) {
        this._individualTargets.shift();
        if (this._individualTargets.length > 0) {
          this.setTargets([this._individualTargets[0]]);
          this._actionList = this._action.item().targetActions.slice();
        } else {
          this._phase = 'phaseChange';
          break;
        }
      } else {
        this._phase = 'phaseChange';
        break;
      }
    }
};

BattleManager.startAction = function() {
    var subject = this._subject;
    if (!subject) return this.endAction();
    var action = subject.currentAction();
    this._action = action;
    if (!this._action) return this.endAction();
    if (!this._action.item()) return this.endAction();
    var targets = action.makeTargets();
    this.setTargets(targets);
    this._allTargets = targets.slice();
    this._individualTargets = targets.slice();
    this._phase = 'phaseChange';
    this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
    this._returnPhase = '';
    this._actionList = [];
    subject.useItem(this._action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};

BattleManager.processActionSequenceCheck = function(actionName, actionArgs) {
    // IF condition
    if (actionName.match(/IF[ ](.*)/i)) {
      return this.actionIfConditions(actionName, actionArgs);
    }
    return this.processActionSequence(actionName, actionArgs)
};

BattleManager.processActionSequence = function(actionName, actionArgs) {
    // NO ACTION
    if (actionName === '') {
      return true;
    }
    // ACTION ANIMATION
    if (actionName === 'ACTION ANIMATION') {
      return this.actionActionAnimation(actionArgs);
    }
    // ACTION EFFECT
    if (actionName === 'ACTION COMMON EVENT') {
      return this.actionActionCommonEvent();
    }
    // ACTION EFFECT
    if (actionName === 'ACTION EFFECT') {
      return this.actionActionEffect(actionArgs);
    }
    // ANI WAIT: frames
    if (['ANI WAIT', 'ANIWAIT', 'ANIMATION WAIT'].contains(actionName)) {
      return this.actionAniWait(actionArgs[0]);
    }
    // CAST ANIMATION
    if (actionName === 'CAST ANIMATION') {
      return this.actionCastAnimation();
    }
    // CLEAR BATTLE LOG
    if (actionName === 'CLEAR BATTLE LOG') {
      return this.actionClearBattleLog();
    }
    // DEATH BREAK
    if (actionName === 'DEATH BREAK') {
      return this.actionDeathBreak();
    }
    // DISPLAY ACTION
    if (actionName === 'DISPLAY ACTION') {
      return this.actionDisplayAction();
    }
    // IMMORTAL: targets, true/false
    if (actionName === 'IMMORTAL') {
      return this.actionImmortal(actionArgs);
    }
    // MOTION WAIT
    if (actionName === 'MOTION WAIT') {
      return this.actionMotionWait(actionArgs);
    }
    // PERFORM ACTION
    if (actionName === 'PERFORM ACTION') {
      return this.actionPerformAction();
    }
    // PERFORM FINISH
    if (actionName === 'PERFORM FINISH') {
      return this.actionPerformFinish();
    }
    // PERFORM START
    if (actionName === 'PERFORM START') {
      return this.actionPerformStart();
    }
    // WAIT: frames
    if (actionName === 'WAIT') {
      return this.actionWait(actionArgs[0]);
    }
    // WAIT FOR ANIMATION
    if (actionName === 'WAIT FOR ANIMATION') {
      return this.actionWaitForAnimation();
    }
    // WAIT FOR EFFECT
    if (actionName === 'WAIT FOR EFFECT') {
      return this.actionWaitForEffect();
    }
    // WAIT FOR MOVEMENT
    if (actionName === 'WAIT FOR MOVEMENT') {
      return this.actionWaitForMovement();
    }
    // WAIT FOR NEW LINE
    if (actionName === 'WAIT FOR NEW LINE') {
      return this.actionWaitForNewLine();
    }
    // WAIT FOR POPUPS
    if (actionName === 'WAIT FOR POPUPS') {
      return this.actionWaitForPopups();
    }
    return false;
};

BattleManager.makeActionTargets = function(string) {
    var targets = []
    string = string.toUpperCase()
    if (['SUBJECT', 'USER'].contains(string)) {
      return [this._subject];
    }
    if (['TARGET', 'TARGETS'].contains(string)) {
      var group = this._targets;
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ACTORS', 'EXISTING ACTORS', 'ALIVE ACTORS'].contains(string)) {
      var group = $gameParty.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ACTORS ALL', 'ALL ACTORS', 'PARTY'].contains(string)) {
      var group = $gameParty.battleMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD ACTORS', 'DEAD ACTOR'].contains(string)) {
      var group = $gameParty.deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['ACTORS NOT USER', 'ACTORS NOT SUBJECT'].contains(string)) {
      var group = $gameParty.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (['ENEMIES', 'EXISTING ENEMIES', 'ALIVE ENEMIES', 'TROOP',
    'TROOPS'].contains(string)) {
      var group = $gameTroop.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ENEMIES ALL', 'ALL ENEMIES'].contains(string)) {
      var group = $gameTroop.members();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD ENEMIES', 'DEAD ENEMY'].contains(string)) {
      var group = $gameTroop.deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['ENEMIES NOT USER', 'ENEMIES NOT SUBJECT', 'TROOP NOT USER',
    'TROOP NOT SUBJECT'].contains(string)) {
      var group = $gameTroop.aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (string.match(/ACTOR[ ](\d+)/i)) {
      var target = $gameParty.battleMembers()[parseInt(RegExp.$1)];
      if (target && target.isAppeared()) return [target];
    }
    if (string.match(/ENEMY[ ](\d+)/i)) {
      var target = $gameTroop.members()[parseInt(RegExp.$1)];
      if (target && target.isAppeared()) return [target];
    }
    if (['FRIEND', 'FRIENDS', 'ALLIES'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL FRIENDS', 'ALL ALLIES'].contains(string)) {
      var group = this._action.friendsUnit().members();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD FRIEND', 'DEAD FRIENDS', 'DEAD ALLIES'].contains(string)) {
      var group = this._action.friendsUnit().deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['OPPONENT', 'OPPONENTS', 'RIVALS', 'FOES'].contains(string)) {
      var group = this._action.opponentsUnit().aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL OPPONENTS', 'ALL RIVALS', 'ALL FOES'].contains(string)) {
      var group = this._action.opponentsUnit().members();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['DEAD OPPONENT', 'DEAD OPPONENTS', 'DEAD RIVALS',
    'DEAD FOES'].contains(string)) {
      var group = this._action.opponentsUnit().deadMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['FRIENDS NOT USER', 'ALLIES NOT USER'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (string.match(/(?:FRIEND|ALLY)[ ](\d+)/i)) {
      var target = this._action.friendsUnit().members()[parseInt(RegExp.$1)];
      if (target && target.isAppeared()) return [target];
    }
    if (string.match(/(?:OPPONENT|FOE|RIVAL)[ ](\d+)/i)) {
      var target = this._action.opponentsUnit().members()[parseInt(RegExp.$1)]
      if (target && target.isAppeared()) return [target];
    }
    if (['ALL ALIVE'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      group = group.concat(this._action.opponentsUnit().aliveMembers());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL MEMBERS'].contains(string)) {
      var group = this._action.friendsUnit().members();
      group = group.concat(this._action.opponentsUnit().members());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      return targets;
    }
    if (['ALL DEAD'].contains(string)) {
      var group = this._action.friendsUnit().deadMembers();
      group = group.concat(this._action.opponentsUnit().deadMembers());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) targets.push(target);
      }
      return targets;
    }
    if (['ALL NOT USER'].contains(string)) {
      var group = this._action.friendsUnit().aliveMembers();
      group = group.concat(this._action.opponentsUnit().aliveMembers());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target !== this._subject && target.isAppeared()) {
          targets.push(target);
        }
      }
      return targets;
    }
    if (['FOCUS', 'PARTICIPANTS'].contains(string)) {
      var group = this._targets;
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target && target.isAppeared()) targets.push(target);
      }
      if (!targets.contains(this._subject)) targets.push(this._subject);
      return targets;
    }
    if (['NOT FOCUS', 'NONPARTICIPANTS'].contains(string)) {
      var group = this._action.friendsUnit().members();
      group = group.concat(this._action.opponentsUnit().members());
      for (var i = 0; i < group.length; ++i) {
        var target = group[i];
        if (target) {
          if (target === this._subject) continue;
          if (target.isHidden()) continue;
          if (this._targets.contains(target)) continue;

          if (target.isDead()) {
            if (Imported.KELYEP_DragonBones && target.isEnemy() && target.hasDragonBone) {
              continue;
            } else if (Imported.YEP_X_AnimatedSVEnemies && target.isEnemy()) {
              if (target.hasSVBattler() && !target.sideviewCollapse()) {
                // Ignore
              } else {
                continue;
              }
            } else if (target.isActor()) {
              // Ignore
            } else {
              continue;
            }
          }

          targets.push(target);
        }
      }
      return targets;
    }
    if (string.match(/(?:CHAR|CHARA|CHARACTER)[ ](\d+)/i)) {
      var actorId = parseInt(RegExp.$1);
      var actor = $gameActors.actor(actorId);
      if (actor && $gameParty.battleMembers().contains(actor)) {
        return [actor];
      }
    }
    if ('FIRST' === string.toUpperCase()) {
      return [this._targets[0]];
    }
    return targets;
};

BattleManager.actionConditionsMet = function(actSeq) {
  var ci = this._conditionFlags.length - 1;
  var actionName = actSeq[0];
  var actionArgs = actSeq[1];
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  if (actionName.match(/ELSE[ ]IF[ ](.*)/i)) {
    if (this._conditionFlags.length <= 0) return false;
    if (this._conditionFlags[ci]) {
      this._conditionFlags[ci] = false;
      this._trueFlags[ci] = true;
    } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
      var text = String(RegExp.$1);
      try {
        this._conditionFlags[ci] = eval(text);
        this._trueFlags[ci] = eval(text);
      } catch (e) {
        Yanfly.Util.displayError(e, text, 'ACTION SEQUENCE IF CONDITION ERROR');
        this._conditionFlags[ci] = false;
        this._trueFlags[ci] = false;
      }
    }
    return false;
  } else if (actionName.match(/ELSE[ ]*(.*)/i)) {
    if (this._conditionFlags.length <= 0) return false;
    if (this._conditionFlags[ci]) {
      this._conditionFlags[ci] = false;
      this._trueFlags[ci] = true;
    } else if (!this._conditionFlags[ci] && !this._trueFlags[ci]) {
      this._conditionFlags[ci] = true;
      this._trueFlags[ci] = true;
    }
    return false;
  } else if (actionName.toUpperCase() === 'END') {
    if (this._conditionFlags.length <= 0) return false;
    this._conditionFlags.pop();
    this._trueFlags.pop();
    return false;
  }
  if (this._conditionFlags.length > 0) return this._conditionFlags[ci];
  return true
};

BattleManager.actionActionAnimation = function(actionArgs) {
    if (actionArgs && actionArgs[0]) {
      var targets = this.makeActionTargets(actionArgs[0]);
    } else {
      var targets = this._targets;
    }
    var mirror = false;
    if (actionArgs && actionArgs[1]) {
      if (actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
    }
    var subject = this._subject;
    var group = targets.filter(Yanfly.Util.onlyUnique);
    var aniId = this._action.item().animationId;
    if (aniId < 0) {
      if (mirror) {
        this._logWindow.showActorAtkAniMirror(subject, group);
      } else {
        this._logWindow.showAttackAnimation(subject, group);
      }
    } else {
      this._logWindow.showNormalAnimation(group, aniId, mirror);
    }
    return true;
};

BattleManager.actionActionCommonEvent = function() {
    this._action.item().effects.forEach(function(effect) {
        if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
            $gameTemp.reserveCommonEvent(effect.dataId);
        }
    }, this);
    return false;
};

BattleManager.actionActionEffect = function(actionArgs) {
    if (actionArgs && actionArgs[0]) {
      var targets = this.makeActionTargets(actionArgs[0]);
    } else {
      var targets = this._targets;
    }
    targets.forEach(function(target) {
      if (target !== undefined) {
        var alreadyDead = target.isDead();
        this.invokeAction(this._subject, target);
        if (target.isDead() && !alreadyDead) {
            target.performCollapse();
        }
      }
    }, this);
    return true;
};

BattleManager.actionAniWait = function(frames) {
    frames *= Yanfly.Param.AnimationRate || 4;
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionCastAnimation = function() {
  if (!$gameSystem.isSideView() && this._subject.isActor()) return true;
  if (!this._action.isAttack() && !this._action.isGuard() &&
  this._action.isSkill()) {
    if (this._action.item().castAnimation > 0) {
      var ani = $dataAnimations[this._action.item().castAnimation]
      this._logWindow.showAnimation(this._subject, [this._subject],
        this._action.item().castAnimation);
    }
  }
  return true;
};


BattleManager.actionClearBattleLog = function() {
    this._logWindow.clear();
    return false;
};

BattleManager.actionDeathBreak = function() {
    if (this._subject.isDead()) {
      this._targets = [];
      this._actionList = [];
      this._individualTargets = [];
      this._phase = 'phaseChange';
      return false;
    }
    return true;
};

BattleManager.actionDisplayAction = function() {
    this._logWindow.displayAction(this._subject, this._action.item());
    return false;
};

BattleManager.actionIfConditions = function(actionName, actionArgs) {
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var critical = false;
  if (target && target.result()) critical = target.result().critical;
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  var actionName = this._actSeq[0];
  if (actionName.match(/IF[ ](.*)/i)) {
    var text = String(RegExp.$1);
    try {
      this._conditionFlags.push(eval(text));
    } catch (e) {
      this._conditionFlags.push(false);
      Yanfly.Util.displayError(e, text, 'ACTION SEQUENCE IF CONDITION ERROR');
    }
    this._trueFlags.push(false);
    var ci = this._conditionFlags.length;
  }
  return true;
};

BattleManager.actionImmortal = function(actionArgs) {
    var targets =
      this.makeActionTargets(actionArgs[0]).filter(Yanfly.Util.onlyUnique);
    try {
      var value = eval(String(actionArgs[1]).toLowerCase());
    } catch (e) {
      var value = false;
    }
    targets.forEach(function (target) {
      if (value) {
        target.addImmortal();
      } else {
        var alreadyDead = target.isDead();
        target.removeImmortal();
      }
    }, this);
    return true;
};

BattleManager.actionMotionWait = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets[0].isActor() && targets[0].isSpriteVisible()) {
      this._logWindow._waitCount += 12;
      return false;
    }
    return true;
};

BattleManager.actionPerformAction = function() {
    this._logWindow.performAction(this._subject, this._action);
    if (this._subject.isActor() && this._subject.isSpriteVisible) {
      this._logWindow._waitCount += 20;
      return false;
    }
    return true;
};

BattleManager.actionPerformFinish = function() {
    this._logWindow.performActionEnd(this._subject);
    $gameParty.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    $gameTroop.aliveMembers().forEach(function(member) {
      member.spriteReturnHome();
    });
    return true;
};

BattleManager.actionPerformStart = function() {
    this._logWindow.performActionStart(this._subject, this._action);
    return true;
};

BattleManager.actionWait = function(frames) {
    this._logWindow._waitCount = parseInt(frames);
    return false;
};

BattleManager.actionWaitForAnimation = function() {
    this._logWindow.waitForAnimation();
    return false;
};

BattleManager.actionWaitForEffect = function() {
    this._logWindow.waitForEffect();
    return false;
};

BattleManager.actionWaitForMovement = function() {
    this._logWindow.waitForMovement();
    return false;
};

BattleManager.actionWaitForNewLine = function() {
    this._logWindow.waitForNewLine();
    return false;
};

BattleManager.actionWaitForPopups = function() {
    this._logWindow.waitForPopups();
    return false;
};

//=============================================================================
// SceneManager
//=============================================================================

Yanfly.BEC.SceneManager_snapForBackground = SceneManager.snapForBackground;
SceneManager.snapForBackground = function() {
    if ($gameParty.inBattle()) {
      var spriteset = this._scene._spriteset;
      if (spriteset.battleback1Name() === '' && 
      spriteset.battleback2Name() === '') {
        return;
      }
    }
    Yanfly.BEC.SceneManager_snapForBackground.call(this);
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.BEC.Sprite_Battler_initialize = Sprite_Battler.prototype.initialize;
Sprite_Battler.prototype.initialize = function(battler) {
    this.preSpriteInitialize(battler);
    Yanfly.BEC.Sprite_Battler_initialize.call(this, battler);
};

Sprite_Battler.prototype.preSpriteInitialize = function(battler) {
};

Yanfly.BEC.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.BEC.Sprite_Battler_update.call(this);
    if (this._postSpriteInitialized) return;
    this.postSpriteInitialize();
};

Sprite_Battler.prototype.postSpriteInitialize = function() {
    this._postSpriteInitialized = true;
};

Yanfly.BEC.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Yanfly.BEC.Sprite_Battler_initMembers.call(this);
    this.adjustAnchor();
    this.setZ();
};

Sprite_Battler.prototype.adjustAnchor = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1.0;
};

Sprite_Battler.prototype.setZ = function() {
    this.z = 1;
};

Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
      if (this._battler.isSpriteVisible()) {
        var sprite = new Sprite_Damage();
        sprite.x = this.x + this.damageOffsetX();
        sprite.y = this.y + this.damageOffsetY();
        sprite.setup(this._battler);
        this.pushDamageSprite(sprite);
        BattleManager._spriteset.addChild(sprite);
        this._battler.clearResult();
      }
    } else {
      this._battler.clearDamagePopup();
    }
};

Sprite_Battler.prototype.pushDamageSprite = function(sprite) {
    var heightBuffer = Yanfly.Param.BECPopupOverlap;
    if (Yanfly.Param.BECNewPopBottom) {
      this._damages.push(sprite);
      this._damages.forEach(function(spr) {
        for (var i = 0; i < spr.children.length; i++) {
          childSprite = spr.children[i];
          childSprite.anchor.y += heightBuffer;
        }
      }, this);
    } else {
      this._damages.push(sprite);
      heightBuffer *= this._damages.length
      for (var i = 0; i < sprite.children.length; i++) {
        childSprite = sprite.children[i];
        childSprite.anchor.y += heightBuffer;
      }
    }
};

Yanfly.BEC.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Yanfly.BEC.Sprite_Battler_setBattler.call(this, battler);
    if (battler) battler.setBattler(this);
};

Yanfly.BEC.Sprite_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (this._battler && !this._battler.spriteCanMove()) return;
    Yanfly.BEC.Sprite_Battler_startMove.call(this, x, y, duration);
};

Sprite_Battler.prototype.stepForward = function() {
    this.startMove(Yanfly.Param.BECStepDist, 0, 12);
};

Sprite_Battler.prototype.stepBack = function() {
    this.startMove(0, 0, 12);
};

Sprite_Battler.prototype.stepFlinch = function() {
    var flinchX = this.x - this._homeX - Yanfly.Param.BECFlinchDist;
    var flinchY = this.y - this._homeY;
    this.startMove(flinchX, flinchY, 6);
};

Sprite_Battler.prototype.stepSubBack = function() {
    var backX = -1 * this.width / 2;
    this.startMove(backX, 0, 6);
};

Sprite_Battler.prototype.stepToSubstitute = function(focus) {
    var target = focus.battler();
    var targetX = (this.x - this._homeX) + (target._homeX - this._homeX);
    var targetY = (this.y - this._homeY) + (target._homeY - this._homeY);;
    if (focus.isActor()) targetX -= this._mainSprite.width / 2;
    if (focus.isEnemy()) targetX += this.width / 2;
    this.startMove(targetX, targetY, 1);
};

Sprite_Battler.prototype.startMotion = function(motionType) {
};

Sprite_Battler.prototype.forceMotion = function(motionType) {
};

Sprite_Battler.prototype.refreshMotion = function() {
};

Sprite_Battler.prototype.startActionMotion = function() {
};

Sprite_Battler.prototype.moveForward = function(distance, frames) {
    distance = parseInt(distance);
    frames = parseInt(frames);
    if (this._battler.isActor()) distance *= -1;
    var moveX = this.x - this._homeX + distance;
    var moveY = this.y - this._homeY;
    this.startMove(moveX, moveY, frames);
};

Sprite_Battler.prototype.moveToPoint = function(pointX, pointY, frames) {
    pointX = parseInt(pointX);
    pointY = parseInt(pointY);
    var targetX = pointX - this._homeX;
    var targetY = pointY - this._homeY;
    this.startMove(targetX, targetY, frames);
};

Sprite_Battler.prototype.setMirror = function(value) {
    if (this.scale.x > 0 && value) this.scale.x *= -1;
    if (this.scale.x < 0 && !value) this.scale.x *= -1;
};

Sprite_Battler.prototype.isPopupPlaying = function() {
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; ++i) {
        return this._damages[i].isPlaying();
      }
    }
    return false;
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Sprite_Actor.prototype.preSpriteInitialize = function(battler) {
    Sprite_Battler.prototype.preSpriteInitialize.call(this, battler);
};

Sprite_Actor.prototype.postSpriteInitialize = function() {
    Sprite_Battler.prototype.postSpriteInitialize.call(this);
};

Yanfly.BEC.Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
Sprite_Actor.prototype.updateShadow = function() {
    if (this._hideShadows === undefined) {
      this._hideShadows = Yanfly.Param.BECShowShadows;
    }
    if (!this._hideShadows) return this._shadowSprite.visible = false;
    Yanfly.BEC.Sprite_Actor_updateShadow.call(this);
};

Sprite_Actor.prototype.setActorHome = function(index) {
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameParty.maxBattleMembers();
    var partySize = $gameParty.battleMembers().length;
    var statusHeight = eval(Yanfly.Param.BECCommandRows);
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    if ($gameSystem.isSideView()) {
      var code = Yanfly.Param.BECHomePosX;
      try {
        var homeX = eval(code);
      } catch (e) {
        var homeX = 0;
        Yanfly.Util.displayError(e, code, 'SIDE VIEW HOME X FORMULA ERROR');
      }
      var code = Yanfly.Param.BECHomePosY;
      try {
        var homeY = eval(code);
      } catch (e) {
        var homeY = 0;
        Yanfly.Util.displayError(e, code, 'SIDE VIEW HOME Y FORMULA ERROR');
      }
    } else {
      var code = Yanfly.Param.BECFrontPosX;
      try {
        var homeX = eval(code);
      } catch (e) {
        var homeX = 0;
        Yanfly.Util.displayError(e, code, 'FRONT VIEW HOME X FORMULA ERROR');
      }
      var code = Yanfly.Param.BECFrontPosY;
      try {
        var homeY = eval(code);
      } catch (e) {
        var homeY = 0;
        Yanfly.Util.displayError(e, code, 'FRONT VIEW HOME Y FORMULA ERROR');
      }
    }
    this._checkAliveStatus = false;
    if ($gameParty.battleMembers()[index]) {
      var actor = $gameParty.battleMembers()[index];
      if (actor.isAlive()) this._checkAliveStatus = true;
    }
    this.setHome(homeX, homeY);
    this.moveToStartPosition();
};

Sprite_Actor.prototype.moveToStartPosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    if ($gameSystem.isSideView() && this._checkAliveStatus) {
      this.startMove(300, 0, 0);
    }
};

Sprite_Actor.prototype.setupMotion = function() {
};

Sprite_Actor.prototype.forceMotion = function(motionType) {
    var newMotion = Sprite_Actor.MOTIONS[motionType];
    this._motion = newMotion;
    this._motionCount = 0;
    this._pattern = 0;
};

Sprite_Actor.prototype.updateTargetPosition = function() {
};

Sprite_Actor.prototype.updateMotion = function() {
    this.updateMotionCount();
};

Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
};

Sprite_Actor.prototype.stepForward = function() {
    this.startMove(-Yanfly.Param.BECStepDist, 0, 12);
};

Sprite_Actor.prototype.stepFlinch = function() {
    var flinchX = this.x - this._homeX + Yanfly.Param.BECFlinchDist;
    var flinchY = this.y - this._homeY;
    this.startMove(flinchX, flinchY, 6);
};

Sprite_Actor.prototype.stepSubBack = function() {
    var backX = this._mainSprite.width / 2;
    this.startMove(backX, 0, 6);
};

Yanfly.BEC.Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
Sprite_Actor.prototype.updateBitmap = function() {
    var name = this._actor.battlerName();
    var needUpdate = false;
    if (this._battlerName !== name) needUpdate = true;
    Yanfly.BEC.Sprite_Actor_updateBitmap.call(this);
    if (needUpdate) this.adjustAnchor();
};

Sprite_Actor.prototype.adjustAnchor = function() {
    if (!this._mainSprite) return;
    this._mainSprite.anchor.x = this._actor.anchorX();
    this._mainSprite.anchor.y = this._actor.anchorY();
};

Yanfly.BEC.Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
Sprite_Actor.prototype.updateFrame = function() {
    Yanfly.BEC.Sprite_Actor_updateFrame.call(this);
    if (!this._mainSprite) return;
    if (!this._mainSprite.bitmap) return;
    if (this._mainSprite.bitmap.width > 0 && !this.bitmap) {
      var sw = this._mainSprite.bitmap.width / 9;
      var sh = this._mainSprite.bitmap.height / 6;
      this.bitmap = new Bitmap(sw, sh);
    }
};

Yanfly.BEC.Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    var actor = this._actor;
    if (!actor) return;
    var motionGuard = Sprite_Actor.MOTIONS['guard'];
    if (this._motion === motionGuard && !BattleManager.isInputting()) return;
    var stateMotion = actor.stateMotionIndex();
    if (actor.isInputting() || actor.isActing()) {
      this.startMotion(actor.idleMotion());
    } else if (stateMotion === 3) {
      this.startMotion(actor.deadMotion());
    } else if (stateMotion === 2) {
      this.startMotion(actor.sleepMotion());
    } else if (actor.isChanting()) {
      this.startMotion(actor.chantMotion());
    } else if (actor.isGuard() || actor.isGuardWaiting()) {
      this.startMotion(actor.guardMotion());
    } else if (stateMotion === 1) {
      this.startMotion(actor.abnormalMotion());
    } else if (actor.isDying()) {
      this.startMotion(actor.dyingMotion());
    } else if (actor.isUndecided()) {
      this.startMotion(actor.idleMotion());
    } else {
      this.startMotion(actor.waitMotion());
    }
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

Sprite_Enemy.prototype.preSpriteInitialize = function(battler) {
    Sprite_Battler.prototype.preSpriteInitialize.call(this, battler);
    this._visualSelect = Yanfly.Param.BECEnemySelect;
    if (this._visualSelect) this.createVisualSelectWindow();
};

Yanfly.BEC.Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    Yanfly.BEC.Sprite_Enemy_update.call(this);
    this.addVisualSelectWindow();
    this.checkExistInSceneChildren()
};

Sprite_Enemy.prototype.addVisualSelectWindow = function() {
    if (!this._visualSelect) return;
    if (this._addedVisualSelect) return;
    if (!SceneManager._scene) return;
    var scene = SceneManager._scene;
    if (!scene._windowLayer) return;
    this._addedVisualSelect = true;
    scene.addChild(this._visualSelectWindow);
};

Sprite_Enemy.prototype.createVisualSelectWindow = function() {
    this._visualSelectWindow = new Window_EnemyVisualSelect();
};

Yanfly.BEC.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    Yanfly.BEC.Sprite_Enemy_setBattler.call(this, battler);
    if (this._visualSelectWindow) this._visualSelectWindow.setBattler(battler);
};

Sprite_Enemy.prototype.checkExistInSceneChildren = function() {
    if (!this._visualSelect) return;
    if (!SceneManager._scene) return;
    var scene = SceneManager._scene;
    if (!scene._windowLayer) return;
    if (!scene.children.contains(this._visualSelectWindow)) {
      this._addedVisualSelect = true;
      scene.addChild(this._visualSelectWindow);
    }
};

//=============================================================================
// Sprite_Weapon
//=============================================================================

Yanfly.BEC.Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    Yanfly.BEC.Sprite_Weapon_setup.call(this, weaponImageId);
    this._animationCount -= 1; // Synch with sprite
};

//=============================================================================
// Sprite_Damage
//=============================================================================

Yanfly.BEC.Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    Yanfly.BEC.Sprite_Damage_initialize.call(this);
    this._duration = Yanfly.Param.BECPopupDur;
};

Sprite_Damage.prototype.setup = function(target) {
    this._result = target.shiftDamagePopup();
    var result = this._result;
    if (result.missed || result.evaded) {
      this.createMiss();
    } else if (result.hpAffected) {
      this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
};

Sprite_Damage.prototype.setupCriticalEffect = function() {
    this._flashColor = eval('[' + Yanfly.Param.BECCritPopup + ']');
    this._flashDuration = Yanfly.Param.BECCritDur;
};

Yanfly.BEC.Sprite_Damage_update = Sprite_Damage.prototype.update;
Sprite_Damage.prototype.update = function() {
    Yanfly.BEC.Sprite_Damage_update.call(this);
    if (this._duration <= 0 && this.parent) {
        this.parent.removeChild(this);
    }
};

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Yanfly.BEC.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
Sprite_StateIcon.prototype.update = function() {
    Yanfly.BEC.Sprite_StateIcon_update.call(this);
    this.updateMirror();
};

Sprite_StateIcon.prototype.updateMirror = function() {
    if (this.parent.scale.x < 0) this.scale.x = -1 * Math.abs(this.scale.x);
    if (this.parent.scale.x > 0) this.scale.x = Math.abs(this.scale.x);
};

//=============================================================================
// Sprite_StateOverlay
//=============================================================================

Yanfly.BEC.Sprite_StateOverlay_update = Sprite_StateOverlay.prototype.update;
Sprite_StateOverlay.prototype.update = function() {
    Yanfly.BEC.Sprite_StateOverlay_update.call(this);
    this.updateMirror();
};

Sprite_StateOverlay.prototype.updateMirror = function() {
    if (this.parent.scale.x < 0) this.scale.x = -1 * Math.abs(this.scale.x);
    if (this.parent.scale.x > 0) this.scale.x = Math.abs(this.scale.x);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isBusy = function() {
    return false;
};

Yanfly.BEC.Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    Yanfly.BEC.Spriteset_Battle_update.call(this);
    this.updateZCoordinates();
};

Spriteset_Battle.prototype.updateZCoordinates = function() {
  if (Imported.YEP_ImprovedBattlebacks) {
    this.updateBattlebackGroupRemove();
  } else {
    this._battleField.removeChild(this._back1Sprite);
    this._battleField.removeChild(this._back2Sprite);
  }
  this._battleField.children.sort(this.battleFieldDepthCompare);
  if (Imported.YEP_ImprovedBattlebacks) {
    this.updateBattlebackGroupAdd();
  } else {
    this._battleField.addChildAt(this._back2Sprite, 0);
    this._battleField.addChildAt(this._back1Sprite, 0);
  }
};

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
    var priority = BattleManager.getSpritePriority();
    if (a._battler && b._battler && priority !== 0) {
      if (priority === 1) {
        if (a._battler.isActor() && b._battler.isEnemy()) return 1;
        if (a._battler.isEnemy() && b._battler.isActor()) return -1;
      } else if (priority === 2) {
        if (a._battler.isActor() && b._battler.isEnemy()) return -1;
        if (a._battler.isEnemy() && b._battler.isActor()) return 1;
      }
    }
    if (a.z < b.z) return -1;
    if (a.z > b.z) return 1;
    if (a.y < b.y) return -1;
    if (a.y > b.y) return 1;
    return 0;
};

Spriteset_Battle.prototype.isPopupPlaying = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isPopupPlaying();
    });
};

Yanfly.BEC.Spriteset_Battle_battlerSprites =
  Spriteset_Battle.prototype.battlerSprites;
Spriteset_Battle.prototype.battlerSprites = function() {
  var sprites = Yanfly.BEC.Spriteset_Battle_battlerSprites.call(this);
  var length = sprites.length;
  var result = [];
  for (var i = 0; i < length; ++i) {
    var sprite = sprites[i];
    if (!sprite) continue;
    if (!sprite._battler) continue;
    result.push(sprite);
  }
  return result;
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.clearActionSequenceSettings = function() {
};

Game_Temp.prototype.forceActionQueue = function(command) {
  if (!this._forceActionQueue) {
    this._forceActionQueue = JsonEx.makeDeepCopy($dataCommonEvents[1]);
    this._forceActionQueue.list = [];
  }
  this._forceActionQueue.list.push(command);
};

Yanfly.BEC.Game_Temp_clearCommonEvent = Game_Temp.prototype.clearCommonEvent;
Game_Temp.prototype.clearCommonEvent = function() {
    this._forceActionQueue = undefined;
    Yanfly.BEC.Game_Temp_clearCommonEvent.call(this);
};

Yanfly.BEC.Game_Temp_isCommonEventReserved =
  Game_Temp.prototype.isCommonEventReserved;
Game_Temp.prototype.isCommonEventReserved = function() {
  if (this._forceActionQueue) return true;
  return Yanfly.BEC.Game_Temp_isCommonEventReserved.call(this);
};

Yanfly.BEC.Game_Temp_reservedCommonEvent =
  Game_Temp.prototype.reservedCommonEvent;
Game_Temp.prototype.reservedCommonEvent = function() {
  if (this._forceActionQueue) {
    return this._forceActionQueue;
  }
  return Yanfly.BEC.Game_Temp_reservedCommonEvent.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.BEC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.BEC.Game_System_initialize.call(this);
    this.initBattleSystem();
};

Game_System.prototype.initBattleSystem = function() {
    this._battleSystem = Yanfly.Param.BECSystem.toLowerCase();
};

Game_System.prototype.getBattleSystem = function() {
    if (this._battleSystem === undefined) this.initBattleSystem();
    return this._battleSystem;
};

Game_System.prototype.setBattleSystem = function(type) {
    this._battleSystem = type.toLowerCase();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.BEC.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.BEC.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'setBattleSys' && !$gameParty.inBattle()) {
      this.setBattleSystem(args[0]);
    }
};

Game_Interpreter.prototype.setBattleSystem = function(value) {
    $gameSystem.setBattleSystem(value);
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.speed = function() {
    var user = this.subject(); var a = user;
    var maxhp = user.mhp; var mhp = user.mhp; var hp = user.hp;
    var maxmp = user.mmp; var mmp = user.mmp; var mp = user.mp;
    var maxtp = user.maxTp(); var mtp = user.maxTp(); var tp = user.tp;
    var atk = user.atk; var def = user.def; var mat = user.mat;
    var int = user.mat; var mdf = user.mdf; var res = user.res;
    var agi = user.agi; var luk = user.luk;
    var code = Yanfly.Param.BECActionSpeed;
    try {
      var speed = eval(code);
    } catch (e) {
      var speed = 0;
      Yanfly.Util.displayError(e, code, 'ACTION SPEED FORMULA ERROR');
    }
    if (this.item()) speed += this.item().speed;
    if (this.isAttack()) speed += this.subject().attackSpeed();
    return speed;
};

Yanfly.BEC.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    target._result = null;
    target._result = new Game_ActionResult();
    this.subject()._result = null;
    this.subject()._result = new Game_ActionResult();
    Yanfly.BEC.Game_Action_apply.call(this, target);
    if ($gameParty.inBattle()) {
      target.startDamagePopup();
      target.performResultEffects();
      if (target !== this.subject()) this.subject().startDamagePopup();
    }
};

Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
    this.subject().attackStates().forEach(function(stateId) {
        var chance = effect.value1;
        chance *= target.stateRate(stateId);
        chance *= this.subject().attackStatesRate(stateId);
        chance *= this.lukEffectRate(target);
        if (Math.random() < chance) {
            if (stateId === target.deathStateId()) {
              if (target.isImmortal()) target.removeImmortal();
            }
            target.addState(stateId);
            this.makeSuccess(target);
        }
    }.bind(this), target);
};

Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    var stateId = effect.dataId;
    var chance = effect.value1;
    if (!this.isCertainHit()) {
      chance *= target.stateRate(stateId);
      chance *= this.lukEffectRate(target);
    }
    if (Math.random() < chance) {
      if (stateId === target.deathStateId()) {
        if (target.isImmortal()) target.removeImmortal();
      }
      target.addState(stateId);
      this.makeSuccess(target);
    }
};

Yanfly.BEC.Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
Game_Action.prototype.applyGlobal = function() {
    if ($gameParty.inBattle()) return;
    Yanfly.BEC.Game_Action_applyGlobal.call(this);
};

Yanfly.BEC.Game_Action_needsSelection = Game_Action.prototype.needsSelection;
Game_Action.prototype.needsSelection = function() {
    if ($gameParty.inBattle() && this.item().scope === 0) return false;
    if ($gameParty.inBattle() && BattleManager.isForceSelection()) return true;
    return Yanfly.BEC.Game_Action_needsSelection.call(this);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.BEC.Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    Yanfly.BEC.Game_BattlerBase_recoverAll.call(this);
    this.refresh();
    if ($gameParty.inBattle()) this.forceMotionRefresh();
};

Game_BattlerBase.prototype.requestStatusRefresh = function() {
    this._statusRefreshRequested = true;
};

Game_BattlerBase.prototype.isStatusRefreshRequested = function() {
    return this._statusRefreshRequested;
};

Game_BattlerBase.prototype.completetStatusRefreshRequest = function() {
    this._statusRefreshRequested = false;
};

Game_BattlerBase.prototype.updateStateTicks = function() {
    var needRefresh = false;
    for (var i = 0; i < this._states.length; ++i) {
      var stateId = this._states[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (state.autoRemovalTiming !== 2) continue;
      if (!this._stateTurns[stateId]) continue;
      var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
      var shown1 = Math.ceil(this._stateTurns[stateId]);
      this._stateTurns[stateId] -= value;
      var shown2 = Math.ceil(this._stateTurns[stateId]);
      if (shown1 !== shown2) needRefresh = true;
      if (this._stateTurns[stateId] <= 0) this.removeState(stateId);
    }
    if (needRefresh) this.refresh();
};

Game_BattlerBase.prototype.isBypassUpdateTurns = function() {
    if ($gameTroop.isEventRunning()) return true;
    return false;
};

Game_BattlerBase.prototype.updateStateTurns = function() {
    this.updateStateTurnEnd();
};

Game_BattlerBase.prototype.updateStateTurnTiming = function(timing) {
    if (this.isBypassUpdateTurns()) return;
    var statesRemoved = [];
    this._freeStateTurn = this._freeStateTurn || [];
    for (var i = 0; i < this._states.length; ++i) {
      var stateId = this._states[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (state.autoRemovalTiming !== timing) continue;
      if (!this._stateTurns[stateId]) continue;
      if (this._freeStateTurn.contains(stateId)) {
        var index = this._freeStateTurn.indexOf(stateId);
        this._freeStateTurn.splice(index, 1);
      } else {
        this._stateTurns[stateId] -= 1;
      }
      if (this._stateTurns[stateId] <= 0) statesRemoved.push(stateId);
    }
    for (var i = 0; i < statesRemoved.length; ++i) {
      var stateId = statesRemoved[i];
      this.removeState(stateId);
    }
};

Game_BattlerBase.prototype.updateStateActionStart = function() {
    this.updateStateTurnTiming(3);
};

Game_BattlerBase.prototype.updateStateActionEnd = function() {
    this.updateStateTurnTiming(1);
};

Game_BattlerBase.prototype.updateStateTurnStart = function() {
    this.updateStateTurnTiming(4);
};

Game_BattlerBase.prototype.updateStateTurnEnd = function() {
    this.updateStateTurnTiming(2);
};

Game_BattlerBase.prototype.updateBuffTicks = function() {
    var needRefresh = false;
    for (var i = 0; i < this._buffTurns.length; i++) {
      if (this._buffTurns[i] <= 0) continue;
      var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
      var shown1 = Math.ceil(this._buffTurns[i]);
      this._buffTurns[i] -= value;
      var shown2 = Math.ceil(this._buffTurns[i]);
      if (shown1 !== shown2) needRefresh = true;
      if (this._buffTurns[i] <= 0) this.removeBuff(i);
    }
    if (needRefresh) this.refresh();
};

Game_BattlerBase.prototype.timedTick = function() {
    return 1 * BattleManager.tickRate();
};

Yanfly.BEC.Game_BattlerBase_isStateResist =
    Game_BattlerBase.prototype.isStateResist;
Game_BattlerBase.prototype.isStateResist = function(stateId) {
    if (stateId === this.deathStateId() && this.isImmortal()) return true;
    return Yanfly.BEC.Game_BattlerBase_isStateResist.call(this, stateId);
};

Game_BattlerBase.prototype.isImmortal = function() {
    return this._immortalState;
};

Yanfly.BEC.Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    this.requestStatusRefresh();
    Yanfly.BEC.Game_BattlerBase_paySkillCost.call(this, skill);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BEC.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Yanfly.BEC.Game_Battler_useItem.call(this, item);
    this.refresh();
    if (!$gameParty.inBattle()) return;
    this.increaseSelfTurnCount();
    this.updateStateActionStart();
};

Yanfly.BEC.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.BEC.Game_Battler_onBattleStart.call(this);
    this._freeStateTurn = [];
    this._immortalState = false;
    this._selfTurnCount = 0;
};

Yanfly.BEC.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.BEC.Game_Battler_onBattleEnd.call(this);
    this._freeStateTurn = [];
    this._immortalState = false;
};

Yanfly.BEC.Game_Battler_isSelected = Game_Battler.prototype.isSelected;
Game_Battler.prototype.isSelected = function() {
    if ($gameParty.inBattle() && BattleManager.isAllSelection()) {
      if (!this.isAppeared()) return false;
      var action = BattleManager.inputtingAction();
      if (action && action.item()) {
        if (this.isDead() && this.isEnemy()) return false;
        if (this.isDead() && this.isActor()) return action.isForDeadFriend();
        if (action.isForFriend() && this.isActor()) return true;
        if (action.isForOpponent() && this.isEnemy()) return true;
      }
    }
    return Yanfly.BEC.Game_Battler_isSelected.call(this);
};

Yanfly.BEC.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    this.clearResult();
    var lifeState = this.isAlive();
    Yanfly.BEC.Game_Battler_regenerateAll.call(this);
    if ($gameParty.inBattle()) {
      if (!BattleManager.timeBasedStates()) this.updateStateTurns();
      if (!BattleManager.timeBasedBuffs()) {
        this.updateBuffTurns();
        this.removeBuffsAuto();
      }
      if (this.isDead() && lifeState === true) {
        this.performCollapse();
      }
      this.startDamagePopup();
    }
};

Game_Battler.prototype.addImmortal = function() {
    this._immortalState = true;
};

Game_Battler.prototype.removeImmortal = function() {
    var alreadyDead = this.isDead();
    this._immortalState = false;
    this.refresh();
    if (this.isDead() && !alreadyDead) this.performCollapse();
};

Yanfly.BEC.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    Yanfly.BEC.Game_Battler_removeState.call(this, stateId);
};

Game_Battler.prototype.clearDamagePopup = function() {
    this._damagePopup = [];
};

Game_Battler.prototype.isDamagePopupRequested = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.length > 0;
};

Game_Battler.prototype.startDamagePopup = function() {
    var result = this.result();
    if (result.missed || result.evaded) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.hpAffected) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.mpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      this._damagePopup.push(copyResult);
    }
};

Game_Battler.prototype.shiftDamagePopup = function() {
    if (!this._damagePopup) this.clearDamagePopup();
    return this._damagePopup.shift();
};

Yanfly.BEC.Game_Battler_performCollapse =
    Game_Battler.prototype.performCollapse;
Game_Battler.prototype.performCollapse = function() {
    Yanfly.BEC.Game_Battler_performCollapse.call(this);
    if ($gameParty.inBattle()) this.forceMotion(this.deadMotion());
};

Game_Battler.prototype.performResultEffects = function() {
    var result = this.result();
    if (result.missed && result.physical) this.performMiss();
    if (result.evaded) {
      if (result.physical) {
        this.performEvasion();
      } else {
        this.performMagicEvasion();
      }
    }
    if (result.hpAffected) {
      if (result.hpDamage > 0 && !result.drain) {
        this.performDamage();
      }
      if (result.hpDamage < 0) {
        this.performRecovery();
      }
    }
    if (this.isAlive() && result.mpDamage !== 0 && result.mpDamage < 0) {
      this.performRecovery();
    }
    if (this.isAlive() && result.tpDamage !== 0 && result.tpDamage < 0) {
      this.performRecovery();
    }
};

Yanfly.BEC.Game_Battler_performDamage =
  Game_Battler.prototype.performDamage;
Game_Battler.prototype.performDamage = function() {
    Yanfly.BEC.Game_Battler_performDamage.call(this);
    this.performFlinch();
};

Yanfly.BEC.Game_Battler_performMiss = Game_Battler.prototype.performMiss;
Game_Battler.prototype.performMiss = function() {
    Yanfly.BEC.Game_Battler_performMiss.call(this);
    this.performFlinch();
};

Yanfly.BEC.Game_Battler_performEvasion =
    Game_Battler.prototype.performEvasion;
Game_Battler.prototype.performEvasion = function() {
    Yanfly.BEC.Game_Battler_performEvasion.call(this);
    this.performFlinch();
};

Yanfly.BEC.Game_Battler_performMagicEvasion =
    Game_Battler.prototype.performMagicEvasion;
Game_Battler.prototype.performMagicEvasion = function() {
    Yanfly.BEC.Game_Battler_performMagicEvasion.call(this);
    this.performFlinch();
};

Game_Battler.prototype.performFlinch = function() {
    if (this._flinched || !$gameSystem.isSideView()) return;
    this._flinched = true;
    this.spriteStepFlinch();
};

Yanfly.BEC.Game_Battler_performReflection =
    Game_Battler.prototype.performReflection;
Game_Battler.prototype.performReflection = function() {
    Yanfly.BEC.Game_Battler_performReflection.call(this);
    if (!$gameSystem.isSideView() && this.isActor()) return;
    var animationId = this.reflectAnimationId();
    var mirror = this.isActor();
    this.startAnimation(animationId, mirror, 0);
};

Yanfly.BEC.Game_Battler_performSubstitute =
    Game_Battler.prototype.performSubstitute;
Game_Battler.prototype.performSubstitute = function(target) {
    Yanfly.BEC.Game_Battler_performSubstitute.call(this, target);
    if (!$gameSystem.isSideView()) return;
    this._flinched = true;
    if (BattleManager._action.isForAll()) {
      this.spriteStepForward();
      target.spriteStepSubBack();
    } else {
      this.spriteStepToSubstitute(target);
      target.spriteStepSubBack();
    }
};

Game_Battler.prototype.setBattler = function(sprite) {
    BattleManager.registerSprite(this, sprite);
};

Game_Battler.prototype.battler = function() {
    return BattleManager.getSprite(this);
};

Game_Battler.prototype.requestMotion = function(motionType) {
    this._motionType = motionType;
    if (this.battler()) {
      this.battler().startMotion(motionType);
    }
};

Game_Battler.prototype.forceMotion = function(motionType) {
    this._motionType = motionType;
    if (this.battler()) {
      this.battler().forceMotion(motionType);
    }
};

Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
    this._weaponImageId = weaponImageId;
    if (this.battler()) {
      this.battler().setupWeaponAnimation();
    }
};

Game_Battler.prototype.performActionStart = function(action) {
    if (!action.isGuard()) {
        this.setActionState('acting');
        this.spriteStepForward();
    }
};

Yanfly.BEC.Game_Battler_performActionEnd =
    Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    Yanfly.BEC.Game_Battler_performActionEnd.call(this);
    this.spriteReturnHome();
};

Game_Battler.prototype.spriteStepForward = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepForward();
    }
};

Game_Battler.prototype.spriteStepBack = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepBack();
    }
};

Game_Battler.prototype.spriteStepSubBack = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepSubBack();
    }
};

Game_Battler.prototype.spriteStepToSubstitute = function(target) {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepToSubstitute(target);
    }
};

Game_Battler.prototype.spriteStepFlinch = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this.battler().stepFlinch();
    }
};

Game_Battler.prototype.spriteReturnHome = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      this._flinched = false;
      this.spriteFaceForward();
      this.battler().stepBack();
      if (this.numActions() <= 0) {
        this.setActionState('undecided');
      }
      this.battler().refreshMotion();
    }
};

Game_Battler.prototype.reflectAnimationId = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.reflectAnimationId > 0) return state.reflectAnimationId;
    }
    return Yanfly.Param.BECReflectAni;
};

Game_Battler.prototype.spriteCanMove = function() {
    if (!$gameSystem.isSideView()) return false;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.spriteCannotMove) return false;
    }
    return this.canMove();
};

Game_Battler.prototype.spritePosX = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler().x;
    } else if (this.battler()) {
      return this.battler().x;
    } else {
      return 0;
    }
};

Game_Battler.prototype.spritePosY = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler().y;
    } else if (this.battler()) {
      return this.battler().y;
    } else {
      return 0;
    }
};

Game_Battler.prototype.spriteWidth = function() {
    if ($gameSystem.isSideView() && this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.width;
    } else if (this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.width;
    } else {
      return 1;
    }
};

Game_Battler.prototype.spriteHeight = function() {
    if ($gameSystem.isSideView() && this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.height;
    } else if (this.battler() && this.battler().bitmap) {
      return this.battler().bitmap.height;
    } else {
      return 1;
    }
};

Game_Battler.prototype.anchorX = function() {
    return Yanfly.Param.BECAnchorX;
};

Game_Battler.prototype.anchorY = function() {
    return Yanfly.Param.BECAnchorY;
};

Game_Battler.prototype.spriteHomeX = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._homeX;
    } else {
      return 0;
    }
};

Game_Battler.prototype.spriteHomeY = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._homeY;
    } else {
      return 0;
    }
};

Game_Battler.prototype.setMirror = function(value) {
    if ($gameSystem.isSideView() && this.battler() && this.spriteCanMove()) {
      this.battler().setMirror(value);
    }
};

Game_Battler.prototype.spriteFaceForward = function() {
    this.setMirror(false);
};

Game_Battler.prototype.spriteFaceBackward = function() {
    this.setMirror(true);
};

Game_Battler.prototype.spriteFacePoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceBackward();
    } else {
      this.spriteFaceForward();
    }
};

Game_Battler.prototype.spriteFaceAwayPoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceForward();
    } else {
      this.spriteFaceBackward();
    }
};

Game_Battler.prototype.spriteFaceTarget = function(target) {
    if (!target) return;
    var pointX = target.spritePosX();
    var pointY = target.spritePosY();
    this.spriteFacePoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceAwayTarget = function(target) {
    if (!target) return;
    var pointX = target.spritePosX();
    var pointY = target.spritePosY();
    this.spriteFaceAwayPoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceHome = function() {
    var pointX = this.spriteHomeX();
    var pointY = this.spriteHomeY();
    this.spriteFacePoint(pointX, pointY);
};

Game_Battler.prototype.spriteFaceAwayHome = function() {
    var pointX = target.spriteHomeX();
    var pointY = target.spriteHomeY();
    this.spriteFaceAwayPoint(pointX, pointY);
};

Game_Battler.prototype.attackMotion = function() {
    return 'thrust';
};

Game_Battler.prototype.performAttack = function() {
};

Game_Battler.prototype.forceMotionRefresh = function() {
    if (!$gameParty.inBattle()) return;
    if (this.battler()) this.battler().refreshMotion();
};

Game_Battler.prototype.requestMotionRefresh = function() {
    var deadMotion = this.deadMotion();
    if (this.isDead() && this._motionType !== deadMotion) {
      this.requestMotion(deadMotion);
    }
    if (this.isDead() && this._motionType === deadMotion) return;
    if (this._motionType === 'victory') return;
    if (this._motionType === 'escape' && !BattleManager.isInputting()) return;
    if (this._motionType === 'guard' && !BattleManager.isInputting()) return;
    this.clearMotion();
    if (this.battler() && BattleManager.isInputting()) {
      this.battler().refreshMotion();
    }
};

Game_Battler.prototype.onTurnStart = function() {
    this.updateStateTurnStart();
};

Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();
    if (BattleManager.isTurnBased()) {
      this.regenerateAll();
    } else if (BattleManager.isTickBased() && !BattleManager.isTurnEnd()) {
      this.regenerateAll();
    }
    this.removeStatesAuto(2);
};

Yanfly.BEC.Game_Battler_onAllActionsEnd =
    Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    Yanfly.BEC.Game_Battler_onAllActionsEnd.call(this);
    if (!BattleManager._processTurn) this.updateStateActionEnd();
};

Game_Battler.prototype.updateTick = function() {
    if (BattleManager.timeBasedStates()) this.updateStateTicks();
    if (BattleManager.timeBasedBuffs()) this.updateBuffTicks();
};

Game_Battler.prototype.increaseSelfTurnCount = function() {
    if (this._selfTurnCount === undefined) this._selfTurnCount = 0;
    this._selfTurnCount += 1;
};

Game_Battler.prototype.turnCount = function() {
    if (BattleManager.isTurnBased()) return $gameTroop.turnCount();
    if (BattleManager.isTickBased() && Yanfly.Param.BECAISelfTurn) {
      return this._selfTurnCount;
    }
    return $gameTroop.turnCount();
};

Game_Battler.prototype.createActions = function() {
    if (this.currentAction()) return;
    this.makeActions();
};

Yanfly.BEC.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    Yanfly.BEC.Game_Battler_addState.call(this, stateId);
    if (this.canAddStateFreeTurn(stateId)) this.setStateFreeTurn(stateId);
};

Game_Battler.prototype.canAddStateFreeTurn = function(stateId) {
    if (!$gameParty.inBattle()) return false;
    if (BattleManager._subject !== this) return false;
    if ($dataStates[stateId].autoRemovalTiming !== 1) return false;
    if (Imported.YEP_BuffsStatesCore) {
      if ($dataStates[stateId].reapplyRules === 0) return false;
    }
    return true;
};

Game_Battler.prototype.setStateFreeTurn = function(stateId) {
    this._freeStateTurn = this._freeStateTurn || [];
    this._freeStateTurn.push(stateId);
};

Game_Battler.prototype.idleMotion = function() {
    return 'walk';
};

Game_Battler.prototype.deadMotion = function() {
    return 'dead';
};

Game_Battler.prototype.sleepMotion = function() {
    return 'sleep';
};

Game_Battler.prototype.chantMotion = function() {
    return 'chant';
};

Game_Battler.prototype.guardMotion = function() {
    return 'guard';
};

Game_Battler.prototype.abnormalMotion = function() {
    return 'abnormal';
};

Game_Battler.prototype.dyingMotion = function() {
    return 'dying';
};

Game_Battler.prototype.waitMotion = function() {
    return 'wait';
};

Yanfly.BEC.Game_Battler_startAnimation = Game_Battler.prototype.startAnimation;
Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
  if (!$dataAnimations[animationId]) return;
  Yanfly.BEC.Game_Battler_startAnimation.call(this, animationId, mirror, delay);
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.BEC.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    this._anchorX = undefined;
    this._anchorY = undefined;
    Yanfly.BEC.Game_Actor_refresh.call(this);
    if ($gameParty.inBattle()) this.requestStatusRefresh();
};

Game_Actor.prototype.isSpriteVisible = function() {
    if ($gameSystem.isSideView()) return true;
    return Yanfly.Param.BECFrontSprite;
};

Game_Actor.prototype.reflectAnimationId = function() {
    if (this.actor().reflectAnimationId > 0) {
      return this.actor().reflectAnimationId;
    }
    if (this.currentClass().reflectAnimationId > 0) {
      return this.currentClass().reflectAnimationId;
    }
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.reflectAnimationId > 0) {
        return equip.reflectAnimationId;
      }
    }
    return Game_Battler.prototype.reflectAnimationId.call(this);
};

Game_Actor.prototype.spriteCanMove = function() {
    if (this.actor().spriteCannotMove) return false;
    if (this.currentClass().spriteCannotMove) return false;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.spriteCannotMove) return false;
    }
    return Game_Battler.prototype.spriteCanMove.call(this);
};

Game_Actor.prototype.spriteWidth = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._mainSprite.width;
    } else {
      return 1;
    }
};

Game_Actor.prototype.spriteHeight = function() {
    if ($gameSystem.isSideView() && this.battler()) {
      return this.battler()._mainSprite.height;
    } else {
      return 1;
    }
};

Game_Actor.prototype.anchorX = function() {
    if (this._anchorX !== undefined) return this._anchorX;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.anchorX !== undefined) {
        this._anchorX = obj.anchorX;
        return this._anchorX;
      }
    }
    length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.anchorX !== undefined) {
        this._anchorX = obj.anchorX;
        return this._anchorX;
      }
    }
    if (this.currentClass().anchorX !== undefined) {
      this._anchorX = this.currentClass().anchorX;
      return this._anchorX;
    }
    this._anchorX = this.actor().anchorX;
    return this._anchorX;
};

Game_Actor.prototype.anchorY = function() {
    if (this._anchorY !== undefined) return this._anchorY;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.anchorY !== undefined) {
        this._anchorY = obj.anchorY;
        return this._anchorY;
      }
    }
    length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.anchorY !== undefined) {
        this._anchorY = obj.anchorY;
        return this._anchorY;
      }
    }
    if (this.currentClass().anchorY !== undefined) {
      this._anchorY = this.currentClass().anchorY;
      return this._anchorY;
    }
    this._anchorY = this.actor().anchorY;
    return this._anchorY;
};

Game_Actor.prototype.spriteFacePoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceForward();
    } else {
      this.spriteFaceBackward();
    }
};

Game_Actor.prototype.spriteFaceAwayPoint = function(pointX, pointY) {
    if (this.spritePosX() > pointX) {
      this.spriteFaceBackward();
    } else {
      this.spriteFaceForward();
    }
};

Game_Actor.prototype.performAttack = function() {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
        this.forceMotion('thrust');
      } else if (attackMotion.type === 1) {
        this.forceMotion('swing');
      } else if (attackMotion.type === 2) {
        this.forceMotion('missile');
      }
      this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};

Game_Actor.prototype.attackMotion = function() {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
        return 'thrust';
      } else if (attackMotion.type === 1) {
        return 'swing';
      } else if (attackMotion.type === 2) {
        return 'missile';
      }
    };
    return 'thrust';
};

Game_Actor.prototype.performEscapeSuccess = function() {
    if (this.battler()) {
      this.performEscape();
      this.battler().startMove(300, 0, 60);
    }
};

//=============================================================================
// Game_Enemy
//=============================================================================

if (!Game_Enemy.prototype.skills) {
Game_Enemy.prototype.skills = function() {
  var skills = []
  for (var i = 0; i < this.enemy().actions.length; ++i) {
    var skill = $dataSkills[this.enemy().actions[i].skillId]
    if (skill) skills.push(skill);
  }
  return skills;
}
}; // (!Game_Enemy.prototype.skills)

Game_Enemy.prototype.performActionStart = function(action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    if (!$gameSystem.isSideView() || !this.spriteCanMove()) {
      this.requestEffect('whiten');
    }
};

Yanfly.BEC.Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    if ($gameSystem.isSideView()) {
      Game_Battler.prototype.performDamage.call(this);
      SoundManager.playEnemyDamage();
    } else {
      Yanfly.BEC.Game_Enemy_performDamage.call(this);
    }
};

Game_Enemy.prototype.attackAnimationId = function() {
    return this.enemy().attackAnimationId;
};

Game_Enemy.prototype.attackAnimationId1 = function() {
    return this.attackAnimationId();
};

Game_Enemy.prototype.attackAnimationId2 = function() {
    return this.attackAnimationId();
};

Game_Enemy.prototype.reflectAnimationId = function() {
    if (this.enemy().reflectAnimationId > 0) {
      return this.enemy().reflectAnimationId;
    }
    return Game_Battler.prototype.reflectAnimationId.call(this);
};

Game_Enemy.prototype.spriteCanMove = function() {
    if (this.enemy().spriteCannotMove) return false;
    return Game_Battler.prototype.spriteCanMove.call(this);
};

Game_Enemy.prototype.meetsTurnCondition = function(param1, param2) {
    var n = this.turnCount();
    if (param2 === 0) {
        return n === param1;
    } else {
        return n > 0 && n >= param1 && n % param2 === param1 % param2;
    }
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.createActions = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) member.createActions();
    }
};

Game_Unit.prototype.requestMotionRefresh = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) member.requestMotionRefresh();
    }
};

Game_Unit.prototype.onTurnStart = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) {
        member.onTurnStart();
        member.refresh();
      }
    }
};

Game_Unit.prototype.updateTick = function() {
    var max = this.members().length;
    for (var i = 0; i < max; ++i) {
      var member = this.members()[i];
      if (member) member.updateTick();
    }
};

Game_Unit.prototype.refreshMembers = function() {
    var group = this.allMembers();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.refresh();
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.performEscapeSuccess = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member) member.performEscapeSuccess();
    }
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.allMembers = function() {
  return this.members();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.BEC.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    Yanfly.BEC.Scene_Battle_update.call(this);
    this.updateStatusWindowRequests();
};

Scene_Battle.prototype.updateStatusWindowRequests = function() {
    if (!this._statusWindow) return;
    if (this._statusWindow.isClosed()) return;
    this._statusWindow.updateStatusRequests();
};

Yanfly.BEC.Scene_Battle_createSkillWindow =
    Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function() {
    Yanfly.BEC.Scene_Battle_createSkillWindow.call(this);
    if (Yanfly.Param.BECLowerWindows) {
      this.adjustLowerWindow(this._skillWindow);
    }
};

Yanfly.BEC.Scene_Battle_createItemWindow =
    Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function() {
    Yanfly.BEC.Scene_Battle_createItemWindow.call(this);
    if (Yanfly.Param.BECLowerWindows) {
      this.adjustLowerWindow(this._itemWindow);
    }
};

Yanfly.BEC.Scene_Battle_createActorWindow =
    Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    Yanfly.BEC.Scene_Battle_createActorWindow.call(this);
    this._actorWindow.x = Graphics.boxWidth - this._actorWindow.width;
    if (Yanfly.Param.BECSelectHelp) {
      this._actorWindow.setHelpWindow(this._helpWindow);
    }
};

Yanfly.BEC.Scene_Battle_createEnemyWindow =
    Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
    Yanfly.BEC.Scene_Battle_createEnemyWindow.call(this);
    if (Yanfly.Param.BECSelectHelp) {
      this._enemyWindow.setHelpWindow(this._helpWindow);
    }
};

Scene_Battle.prototype.adjustLowerWindow = function(win) {
    win.height = win.fittingHeight(Yanfly.Param.BECWindowRows);
    win.y = Graphics.boxHeight - win.height;
};

Yanfly.BEC.Scene_Battle_startPartyCommandSelection =
    Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    if (this.isStartActorCommand()) {
      this.selectNextCommand();
    } else {
      Yanfly.BEC.Scene_Battle_startPartyCommandSelection.call(this);
    }
};

Scene_Battle.prototype.isStartActorCommand = function() {
    if (this._isStartActorCommand === undefined) {
      this._isStartActorCommand = Yanfly.Param.BECStartActCmd;
    }
    return this._isStartActorCommand;
};

Yanfly.BEC.Scene_Battle_selectPreviousCommand =
    Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
    if (this.isStartActorCommand()) {
      BattleManager.selectPreviousCommand();
      if (BattleManager.isInputting() && BattleManager.actor()) {
        this.startActorCommandSelection();
      } else {
        Yanfly.BEC.Scene_Battle_startPartyCommandSelection.call(this);
      }
    } else {
      Yanfly.BEC.Scene_Battle_selectPreviousCommand.call(this);
    }
};

Yanfly.BEC.Scene_Battle_selectNextCommand =
    Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    Yanfly.BEC.Scene_Battle_selectNextCommand.call(this);
    this._helpWindow.clear();
    BattleManager.stopAllSelection();
};

Yanfly.BEC.Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_commandSkill.call(this);
};

Yanfly.BEC.Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_commandItem.call(this);
};

Yanfly.BEC.Scene_Battle_startActorCommandSelection =
    Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    BattleManager.createActions();
    Yanfly.BEC.Scene_Battle_startActorCommandSelection.call(this);
    this._statusWindow.refresh();
};

Yanfly.BEC.Scene_Battle_selectActorSelection =
    Scene_Battle.prototype.selectActorSelection;
Scene_Battle.prototype.selectActorSelection = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.show();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_selectActorSelection.call(this);
    this._actorWindow.autoSelect();
};

Yanfly.BEC.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.hide();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onActorCancel.call(this);
    BattleManager.stopAllSelection();
    BattleManager.clearInputtingAction();
};

Yanfly.BEC.Scene_Battle_selectEnemySelection =
    Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.show();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_selectEnemySelection.call(this);
    this._enemyWindow.autoSelect();
};

Yanfly.BEC.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    if (Yanfly.Param.BECSelectHelp) this._helpWindow.hide();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onEnemyCancel.call(this);
    BattleManager.stopAllSelection();
    BattleManager.clearInputtingAction();
};

Yanfly.BEC.Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
    if (Yanfly.Param.BECSelectHelp) BattleManager.forceSelection();
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onSelectAction.call(this);
    if (Yanfly.Param.BECSelectHelp) BattleManager.resetSelection();
};

Yanfly.BEC.Scene_Battle_onSkillOk =
    Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onSkillOk.call(this);
};

Yanfly.BEC.Scene_Battle_onSkillCancel =
    Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onSkillCancel.call(this);
    BattleManager.clearInputtingAction();
};

Yanfly.BEC.Scene_Battle_onItemOk =
    Scene_Battle.prototype.onItemOk;
Scene_Battle.prototype.onItemOk = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onItemOk.call(this);
};

Yanfly.BEC.Scene_Battle_onItemCancel =
    Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
    this._helpWindow.clear();
    Yanfly.BEC.Scene_Battle_onItemCancel.call(this);
    BattleManager.clearInputtingAction();
};

//=============================================================================
// Window_Selectable
//=============================================================================

Yanfly.BEC.Window_Selectable_isCursorMovable =
    Window_Selectable.prototype.isCursorMovable;
Window_Selectable.prototype.isCursorMovable = function() {
    if (this._inputLock) return false;
    return Yanfly.BEC.Window_Selectable_isCursorMovable.call(this);
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.BEC.Window_Help_clear = Window_Help.prototype.clear;
Window_Help.prototype.clear = function() {
    Yanfly.BEC.Window_Help_clear.call(this);
    this.contents.clear();
};

Window_Help.prototype.setBattler = function(battler) {
    this.contents.clear();
    this.clear();
    this.resetFontSettings();
    if (!$gameParty.inBattle()) return;
    if (!battler) return;
    var action = BattleManager.inputtingAction();
    if (this.specialSelectionText(action)) {
      this.drawSpecialSelectionText(action);
    } else {
      this.drawBattler(battler);
    }
};

Window_Help.prototype.specialSelectionText = function(action) {
    BattleManager.resetSelection();
    if (!action) return false;
    return !action.needsSelection();
};

Window_Help.prototype.drawBattler = function(battler) {
    var text = battler.name();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    this.drawText(text, wx, wy, this.contents.width, 'center');
};

Window_Help.prototype.drawSpecialSelectionText = function(action) {
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var text = '';
    if (action.isForUser()) {
      text = Yanfly.Param.BECHelpUserTx;
    } else if (action.isForRandom()) {
      BattleManager.startAllSelection();
      var fmt = Yanfly.Param.BECHelpRandTx;
      if (action.isForOpponent() && action.numTargets() !== 1) {
        var target = Yanfly.Param.BECHelpEnemiesTx;
      } else if (action.isForOpponent() && action.numTargets() === 1) {
        var target = Yanfly.Param.BECHelpEnemyTx;
      } else if (action.isForFriend() && action.numTargets() !== 1) {
        var target = Yanfly.Param.BECHelpAlliesTx;
      } else {
        var target = Yanfly.Param.BECHelpAllyTx;
      }
      text = fmt.format(target, Yanfly.Util.toGroup(action.numTargets()));
    } else if (action.isForAll()) {
      BattleManager.startAllSelection();
      var fmt = Yanfly.Param.BECHelpAllTx;
      if (action.isForOpponent()) {
        var target = Yanfly.Param.BECHelpEnemiesTx;
      } else {
        var target = Yanfly.Param.BECHelpAlliesTx;
      }
      text = fmt.format(target);
    }
    this.drawText(text, wx, wy, this.contents.width, 'center');
};

//=============================================================================
// Window_BattleActor
//=============================================================================

Window_BattleActor.prototype.autoSelect = function() {
    var action = BattleManager.inputtingAction();
    if (!action) return;
    this._inputLock = false;
    this._selectDead = false;
    this.setCursorAll(false);
    if (action.isForUser()) {
      this.select(BattleManager.actor().index());
      this._inputLock = true;
    } else if (action.isForAll()) {
      this._inputLock = true;
      this.setCursorAll(true);
    } else if (action.isForDeadFriend()) {
      this._selectDead = true;
      this.autoSelectFirstDeadActor();
    }
    this.updateCursor();
};

Window_BattleActor.prototype.updateCursor = function() {
    if (this._cursorAll) {
        var allRowsHeight = this.maxRows() * this.itemHeight();
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        this.setTopRow(0);
    } else if (this.isCursorVisible()) {
        var rect = this.itemRect(this.index());
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

Window_BattleActor.prototype.autoSelectFirstDeadActor = function() {
    var length = $gameParty.members().length;
    for (var i = 0; i < length; ++i) {
      var member = $gameParty.members()[i];
      if (member && member.isDead()) return this.select(i);
    }
};

Window_BattleActor.prototype.isOkEnabled = function() {
    if (this._selectDead) return this.actor().isDead();
    return Window_Selectable.prototype.isOkEnabled.call(this);
};

Window_BattleActor.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
    this._helpWindow.setBattler(this.actor());
};

Yanfly.BEC.Window_BattleActor_processTouch =
    Window_BattleActor.prototype.processTouch;
Window_BattleActor.prototype.processTouch = function() {
    if (Yanfly.Param.BECActorSelect && this.isOpenAndActive()) {
      if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
        if (this.getClickedActor() >= 0) {
          var index = this.getClickedActor();
          if (this.index() === index) {
            return this.processOk();
          } else {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (TouchInput.isPressed() && !this.isTouchedInsideFrame()) {
        if (this.getClickedActor() >= 0) {
          var index = this.getClickedActor();
          if (this.index() !== index) {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (Yanfly.Param.BECSelectMouseOver) {
        var index = this.getMouseOverActor();
        if (index >= 0 && this.index() !== index) {
          SoundManager.playCursor();
          return this.select(index);
        }
      }
    }
    Yanfly.BEC.Window_BattleActor_processTouch.call(this);
};

Window_BattleActor.prototype.getClickedActor = function() {
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var actor = $gameParty.battleMembers().reverse()[i];
      if (!actor) continue;
      if (this.isClickedActor(actor)) {
        if (this._selectDead && !actor.isDead()) continue;
        if (this._inputLock && actor.index() !== this.index()) continue;
        return actor.index();
      }
    }
    return -1;
};

Window_BattleActor.prototype.isClickedActor = function(actor) {
    if (!actor) return false;
    if (!actor.isSpriteVisible()) return false;
    if (!actor.isAppeared()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = new Rectangle();
    rect.width = actor.spriteWidth();
    rect.height = actor.spriteHeight();
    rect.x = actor.spritePosX() - rect.width / 2;
    rect.y = actor.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

Window_BattleActor.prototype.getMouseOverActor = function() {
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var actor = $gameParty.battleMembers().reverse()[i];
      if (!actor) continue;
      if (this.isMouseOverActor(actor)) {
        if (this._selectDead && !actor.isDead()) continue;
        if (this._inputLock && actor.index() !== this.index()) continue;
        return actor.index();
      }
    }
    return -1;
};

Window_BattleActor.prototype.isMouseOverActor = function(actor) {
    if (!actor) return false;
    if (!actor.isSpriteVisible()) return false;
    if (!actor.isAppeared()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput._mouseOverX;
    var y = TouchInput._mouseOverY;
    var rect = new Rectangle();
    rect.width = actor.spriteWidth();
    rect.height = actor.spriteHeight();
    rect.x = actor.spritePosX() - rect.width / 2;
    rect.y = actor.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

//=============================================================================
// Window_BattleEnemy
//=============================================================================

Yanfly.DisableWebGLMask = false;

Yanfly.BEC.Window_BattleEnemy_initialize =
    Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
    if (Yanfly.Param.BECEnemySelect) {
      x -= Graphics.boxWidth * 200;
      y -= Graphics.boxHeight * 200;
    };
    Yanfly.BEC.Window_BattleEnemy_initialize.call(this, x, y);
};

Yanfly.BEC.WindowLayer_webglMaskWindow =
    WindowLayer.prototype._webglMaskWindow;
WindowLayer.prototype._webglMaskWindow = function(renderSession, win) {
    if (win._ignoreMask) return;
    Yanfly.BEC.WindowLayer_webglMaskWindow.call(this, renderSession, win);
};

Yanfly.BEC.Window_BattleEnemy_maxCols =
    Window_BattleEnemy.prototype.maxCols;
Window_BattleEnemy.prototype.maxCols = function() {
    if (Yanfly.Param.BECEnemySelect) return this._enemies.length;
    return Yanfly.BEC.Window_BattleEnemy_maxCols.call(this);
};

Window_BattleEnemy.prototype.allowedTargets = function() {
    var targets = [];
    targets = targets.concat($gameTroop.aliveMembers());
    return targets;
};

Window_BattleEnemy.prototype.refresh = function() {
    this._enemies = this.allowedTargets();
    this.sortTargets();
    Window_Selectable.prototype.refresh.call(this);
};

Window_BattleEnemy.prototype.sortTargets = function() {
    this._enemies.sort(function(a, b) {
        if (a.spritePosX() === b.spritePosX()) {
          return a.spritePosY() - b.spritePosY();
        }
        return a.spritePosX() - b.spritePosX();
    });
};

Window_BattleEnemy.prototype.autoSelect = function() {
    if (Yanfly.Param.BECEnemyAutoSel === 0 ||
    Yanfly.Param.BECEnemyAutoSel === '0') {
      var selectIndex = 0;
    } else {
      var selectIndex = this.furthestRight();
    }
    this.select(selectIndex);
};

Window_BattleEnemy.prototype.furthestRight = function() {
    return this.maxItems() - 1;
};

Window_BattleEnemy.prototype.updateHelp = function() {
    if (!this._helpWindow) return;
    this._helpWindow.setBattler(this.enemy());
};

Yanfly.BEC.Window_BattleEnemy_processTouch =
    Window_BattleEnemy.prototype.processTouch;
Window_BattleEnemy.prototype.processTouch = function() {
    if (Yanfly.Param.BECEnemySelect && this.isOpenAndActive()) {
      if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
        if (this.getClickedEnemy() >= 0) {
          var index = this.getClickedEnemy();
          if (this.index() === index) {
            return this.processOk();
          } else {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (TouchInput.isPressed() && !this.isTouchedInsideFrame()) {
        if (this.getClickedEnemy() >= 0) {
          var index = this.getClickedEnemy();
          if (this.index() !== index) {
            SoundManager.playCursor();
            return this.select(index);
          }
        }
      }
      if (Yanfly.Param.BECSelectMouseOver) {
        var index = this.getMouseOverEnemy();
        if (index >= 0 && this.index() !== index) {
          SoundManager.playCursor();
          return this.select(index);
        }
      }
    };
    Yanfly.BEC.Window_BattleEnemy_processTouch.call(this);
};

Window_BattleEnemy.prototype.getClickedEnemy = function() {
    for (var i = 0; i < this._enemies.length; ++i) {
      var enemy = this._enemies[i];
      if (!enemy) continue;
      if (this.isClickedEnemy(enemy)) {
        if (this._selectDead && !enemy.isDead()) continue;
        var index = this._enemies.indexOf(enemy)
        if (this._inputLock && index !== this.index()) continue;
        return index;
      }
    }
    return -1;
};

Window_BattleEnemy.prototype.isClickedEnemy = function(enemy) {
    if (!enemy) return false;
    if (!enemy.isSpriteVisible()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = new Rectangle();
    rect.width = enemy.spriteWidth();
    rect.height = enemy.spriteHeight();
    rect.x = enemy.spritePosX() - rect.width / 2;
    rect.y = enemy.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

Window_BattleEnemy.prototype.getMouseOverEnemy = function() {
    for (var i = 0; i < this._enemies.length; ++i) {
      var enemy = this._enemies[i];
      if (!enemy) continue;
      if (this.isMouseOverEnemy(enemy)) {
        if (this._selectDead && !enemy.isDead()) continue;
        var index = this._enemies.indexOf(enemy)
        if (this._inputLock && index !== this.index()) continue;
        return index;
      }
    }
    return -1;
};

Window_BattleEnemy.prototype.isMouseOverEnemy = function(enemy) {
    if (!enemy) return false;
    if (!enemy.isSpriteVisible()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput._mouseOverX;
    var y = TouchInput._mouseOverY;
    var rect = new Rectangle();
    rect.width = enemy.spriteWidth();
    rect.height = enemy.spriteHeight();
    rect.x = enemy.spritePosX() - rect.width / 2;
    rect.y = enemy.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

//=============================================================================
// Window_EnemyVisualSelect
//=============================================================================

function Window_EnemyVisualSelect() {
    this.initialize.apply(this, arguments);
}

Window_EnemyVisualSelect.prototype = Object.create(Window_Base.prototype);
Window_EnemyVisualSelect.prototype.constructor = Window_EnemyVisualSelect;

Window_EnemyVisualSelect.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
    this._battler = null;
    this._battlerName = '';
    this._requestRefresh = false;
    this._showSelectCursor = Yanfly.Param.BECShowSelectBox;
    this._showEnemyName = Yanfly.Param.BECShowEnemyName;
    this.contentsOpacity = 0;
    this.opacity = 0;
};

Window_EnemyVisualSelect.prototype.setBattler = function(battler) {
    if (this._battler === battler) return;
    this._battler = battler;
    this._battlerName = battler.name();
};

Window_EnemyVisualSelect.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._battler) return;
    this.updateWindowAspects();
};

Window_EnemyVisualSelect.prototype.updateWindowAspects = function() {
    this.updateBattlerName();
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updateRefresh();
    this.updateCursor();
};

Window_EnemyVisualSelect.prototype.updateBattlerName = function() {
    if (this._battlerName !== this._battler.name()) {
        this._battlerName = this._battler.name();
        this._requestRefresh = true;
        this._nameTextWidth = undefined;
    }
};

Window_EnemyVisualSelect.prototype.updateWindowSize = function() {
    var spriteWidth = this._battler.spriteWidth();
    this.contents.fontSize = Yanfly.Param.BECEnemyFontSize;
    if (this._nameTextWidth === undefined) {
      this._nameTextWidth = this.textWidth(this._battler.name());
    }
    var textWidth = this._nameTextWidth;
    textWidth += this.textPadding() * 2;
    var width = Math.max(spriteWidth, textWidth) + this.standardPadding() * 2;
    width = Math.ceil(width);
    var height = this._battler.spriteHeight() + this.standardPadding() * 2;
    height = Math.ceil(height);
    height = Math.max(height, this.lineHeight() + this.standardPadding() * 2);
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.createContents();
    this._requestRefresh = true;
    this.makeWindowBoundaries();
};

Window_EnemyVisualSelect.prototype.makeWindowBoundaries = function() {
    if (!this._requestRefresh) return;
    this._minX = -1 * this.standardPadding();
    this._maxX = Graphics.boxWidth - this.width + this.standardPadding();
    this._minY = -1 * this.standardPadding();
    this._maxY = Graphics.boxHeight - this.height + this.standardPadding();
    this._maxY -= SceneManager._scene._statusWindow.height;
};

Window_EnemyVisualSelect.prototype.updateWindowPosition = function() {
    if (!this._battler) return;
    this.x = -1 * this.width / 2;
    this.y = -1 * this.height + this.standardPadding();
    this.x += this._battler.spritePosX();
    this.y += this._battler.spritePosY();
    this.x = this.x.clamp(this._minX, this._maxX);
    this.y = this.y.clamp(this._minY, this._maxY);
};

Window_EnemyVisualSelect.prototype.updateOpacity = function() {
    if (this.isShowWindow()) {
      this.contentsOpacity += 32;
    } else {
      this.contentsOpacity -= 32;
    }
};

Window_EnemyVisualSelect.prototype.isShowWindow = function() {
    var scene = SceneManager._scene;
    if (!scene._enemyWindow) return false;
    var enemyWindow = scene._enemyWindow;
    if (!enemyWindow.active) return false;
    if (!this._battler.isAppeared()) return false;
    if (this._battler.isDead()) {
      return enemyWindow._selectDead;
    }
    return enemyWindow._enemies.contains(this._battler);
};

Window_EnemyVisualSelect.prototype.updateCursor = function() {
    if (this.isShowCursor()) {
      var wy = this.contents.height - this.lineHeight();
      this.setCursorRect(0, wy, this.contents.width, this.lineHeight());
    } else {
      this.setCursorRect(0, 0, 0, 0);
    }
};

Window_EnemyVisualSelect.prototype.isShowCursor = function() {
    if (!this._showSelectCursor) return false;
    var scene = SceneManager._scene;
    if (!scene._enemyWindow) return false;
    var enemyWindow = scene._enemyWindow;
    if (!enemyWindow.active) return false;
    if (!this._battler.isAppeared()) return false;
    return this._battler.isSelected();
};

Window_EnemyVisualSelect.prototype.updateRefresh = function() {
    if (this._requestRefresh) this.refresh();
};

Window_EnemyVisualSelect.prototype.refresh = function() {
    this.contents.clear();
    if (!this._battler) return;
    if (!this._showEnemyName) return;
    if (this._battler.isHidden()) return;
    this._requestRefresh = false;
    this.contents.fontSize = Yanfly.Param.BECEnemyFontSize;
    var text = this._battler.name();
    var wy = this.contents.height - this.lineHeight();
    this.drawText(text, 0, wy, this.contents.width, 'center');
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Window_PartyCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.BECCommandAlign;
};

Window_PartyCommand.prototype.numVisibleRows = function() {
    return Yanfly.Param.BECCommandRows;
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.BECCommandAlign;
};

Window_ActorCommand.prototype.numVisibleRows = function() {
    return Yanfly.Param.BECCommandRows;
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.numVisibleRows = function() {
    return Yanfly.Param.BECCommandRows;
};

Window_BattleStatus.prototype.updateStatusRequests = function() {
    if (BattleManager._victoryPhase) return;
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var actor = $gameParty.battleMembers()[i];
      if (!actor) continue;
      if (actor.isStatusRefreshRequested()) this.processStatusRefresh(i);
    }
};

Window_BattleStatus.prototype.processStatusRefresh = function(index) {
    var actor = $gameParty.battleMembers()[index];
    if (!actor) return;
    var rect = this.itemRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.drawItem(index);
    actor.completetStatusRefreshRequest();
};

Window_BattleStatus.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
};

if (!Yanfly.Param.BECCurMax) {

Window_BattleStatus.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    this.changeTextColor(color1);
    this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth, 'right');
};

}; // Yanfly.Param.BECCurMax

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.BEC.Window_BattleLog_isFastForward =
    Window_BattleLog.prototype.isFastForward;
Window_BattleLog.prototype.isFastForward = function() {
    if (Yanfly.Param.BECOptSpeed) return true;
    return Yanfly.BEC.Window_BattleLog_isFastForward.call(this);
};

Window_BattleLog.prototype.updateWaitCount = function() {
    if (this._waitCount > 0) {
        this._waitCount -= 1;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
        return true;
    }
    return false;
};

Window_BattleLog.prototype.animationBaseDelay = function() {
    return Yanfly.Param.BECAniBaseDel;
};

Window_BattleLog.prototype.animationNextDelay = function() {
    return Yanfly.Param.BECAniNextDel;
};

Window_BattleLog.prototype.updateWaitMode = function() {
    var waiting = false;
    switch (this._waitMode) {
    case 'effect':
        waiting = this._spriteset.isEffecting();
        break;
    case 'movement':
        waiting = this._spriteset.isAnyoneMoving();
        break;
    case 'animation':
        waiting = this._spriteset.isAnimationPlaying();
        break;
    case 'popups':
        waiting = this._spriteset.isPopupPlaying();
        break;
    }
    if (!waiting) {
        this._waitMode = '';
    }
    return waiting;
};

Window_BattleLog.prototype.startAction = function(subject, action, targets) {
};

Window_BattleLog.prototype.endAction = function(subject) {
};

Window_BattleLog.prototype.waitForAnimation = function() {
    this.setWaitMode('animation');
};

Window_BattleLog.prototype.waitForEffect = function() {
    this.setWaitMode('effect');
};

Window_BattleLog.prototype.waitForPopups = function() {
    this.setWaitMode('popups');
};

Yanfly.BEC.Window_BattleLog_displayAction =
    Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (Yanfly.Param.BECFullActText) {
      Yanfly.BEC.Window_BattleLog_displayAction.call(this, subject, item);
    } else {
      this._actionIcon = this.displayIcon(item);
      var text = this.displayText(item);
      this.push('addText', '<SIMPLE>' + text);
      if (item.message2) {
        this.push('addText', '<CENTER>' + item.message2.format(text));
      }
    }
};

Window_BattleLog.prototype.displayIcon = function(item) {
    if (!item) return 0;
    return item.battleDisplayIcon;
};

Window_BattleLog.prototype.displayText = function(item) {
    if (!item) return '';
    return item.battleDisplayText;
};

Yanfly.BEC.Window_BattleLog_displayActionResults =
    Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    if (Yanfly.Param.BECOptSpeed) {
      if (target.result().used) {
          this.displayCritical(target);
          this.displayDamage(target);
          this.displayAffectedStatus(target);
          this.displayFailure(target);
      }
    } else {
      Yanfly.BEC.Window_BattleLog_displayActionResults.call(this, subject,
          target);
    }
    if (target.isDead()) target.performCollapse();
};

Yanfly.BEC.Window_BattleLog_drawLineText =
    Window_BattleLog.prototype.drawLineText;
Window_BattleLog.prototype.drawLineText = function(index) {
    if (this._lines[index].match('<CENTER>')) {
      this.drawCenterLine(index);
    } else if (this._lines[index].match('<SIMPLE>')) {
      this.drawSimpleActionLine(index);
    } else {
      Yanfly.BEC.Window_BattleLog_drawLineText.call(this, index);
    }
};

Window_BattleLog.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Window_BattleLog.prototype.drawCenterLine = function(index) {
    var text = this._lines[index].replace('<CENTER>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    var tw = this.textWidthEx(text);
    var wx = rect.x + (rect.width - tw) / 2;
    this.resetFontSettings();
    this.drawTextEx(text, wx, rect.y);
};

Window_BattleLog.prototype.drawSimpleActionLine = function(index) {
    var text = this._lines[index].replace('<SIMPLE>', '');
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    if (this._actionIcon) {
      var tw = this.textWidth(text);
      var ix = (rect.width - tw) / 2 - 4;
      this.drawIcon(this._actionIcon, ix, rect.y + 2);
    }
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
};

Window_BattleLog.prototype.displayCounter = function(target) {
    if (Yanfly.Param.BECShowCntText) {
      this.addText(TextManager.counterAttack.format(target.name()));
    }
    target.performCounter();
    this.showAttackAnimation(target, [BattleManager._subject]);
    this.waitForAnimation();
};

Window_BattleLog.prototype.displayReflection = function(target) {
    if (Yanfly.Param.BECShowRflText) {
      this.addText(TextManager.magicReflection.format(target.name()));
    }
    target.performReflection();
    var animationId = BattleManager._action.item().animationId;
    this.showNormalAnimation([BattleManager._subject], animationId);
    this.waitForAnimation();
};

Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
    if (Yanfly.Param.BECShowSubText) {
      var substName = substitute.name();
      this.addText(TextManager.substitute.format(substName, target.name()));
    }
    substitute.performSubstitute(target);
};

Yanfly.BEC.Window_BattleLog_displayFailure =
    Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
    if (!Yanfly.Param.BECShowFailText) return;
    Yanfly.BEC.Window_BattleLog_displayFailure.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayCritical =
    Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    if (!Yanfly.Param.BECShowCritText) return;
    Yanfly.BEC.Window_BattleLog_displayCritical.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayMiss =
    Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    if (!Yanfly.Param.BECShowMissText) return;
    Yanfly.BEC.Window_BattleLog_displayMiss.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayEvasion =
    Window_BattleLog.prototype.displayEvasion;
Window_BattleLog.prototype.displayEvasion = function(target) {
    if (!Yanfly.Param.BECShowEvaText) return;
    Yanfly.BEC.Window_BattleLog_displayEvasion.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayHpDamage =
    Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (!Yanfly.Param.BECShowHpText) return;
    Yanfly.BEC.Window_BattleLog_displayHpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayMpDamage =
    Window_BattleLog.prototype.displayMpDamage;
Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (!Yanfly.Param.BECShowMpText) return;
    Yanfly.BEC.Window_BattleLog_displayMpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayTpDamage =
    Window_BattleLog.prototype.displayTpDamage;
Window_BattleLog.prototype.displayTpDamage = function(target) {
    if (!Yanfly.Param.BECShowTpText) return;
    Yanfly.BEC.Window_BattleLog_displayTpDamage.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayCurrentState =
    Window_BattleLog.prototype.displayCurrentState;
Window_BattleLog.prototype.displayCurrentState = function(subject) {
    if (!Yanfly.Param.BECShowStateText) return;
    Yanfly.BEC.Window_BattleLog_displayCurrentState.call(this, subject);
};

Yanfly.BEC.Window_BattleLog_displayAddedStates =
    Window_BattleLog.prototype.displayAddedStates;
Window_BattleLog.prototype.displayAddedStates = function(target) {
    if (!Yanfly.Param.BECShowStateText) return;
    Yanfly.BEC.Window_BattleLog_displayAddedStates.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayRemovedStates =
    Window_BattleLog.prototype.displayRemovedStates;
Window_BattleLog.prototype.displayRemovedStates = function(target) {
    if (!Yanfly.Param.BECShowStateText) return;
    Yanfly.BEC.Window_BattleLog_displayRemovedStates.call(this, target);
};

Yanfly.BEC.Window_BattleLog_displayChangedBuffs =
    Window_BattleLog.prototype.displayChangedBuffs;
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
    if (!Yanfly.Param.BECShowBuffText) return;
    Yanfly.BEC.Window_BattleLog_displayChangedBuffs.call(this, target);
};

Window_BattleLog.prototype.popupDamage = function(target) {
};

Yanfly.BEC.Window_BattleLog_showEnemyAttackAnimation =
    Window_BattleLog.prototype.showEnemyAttackAnimation;
Window_BattleLog.prototype.showEnemyAttackAnimation =
function(subject, targets) {
    if ($gameSystem.isSideView()) {
      this.showNormalAnimation(targets, subject.attackAnimationId(), false);
    } else {
      this.showNormalAnimation(targets, subject.attackAnimationId(), false);
      Yanfly.BEC.Window_BattleLog_showEnemyAttackAnimation.call(this, subject,
          targets);
    }
};

Window_BattleLog.prototype.showActorAtkAniMirror = function(subject, targets) {
  if (subject.isActor()) {
    this.showNormalAnimation(targets, subject.attackAnimationId1(), true);
    this.showNormalAnimation(targets, subject.attackAnimationId2(), false);
  } else {
    this.showNormalAnimation(targets, subject.attackAnimationId1(), true)
  }
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

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

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
