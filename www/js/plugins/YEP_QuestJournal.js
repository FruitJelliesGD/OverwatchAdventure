//=============================================================================
// Yanfly Engine Plugins - Quest Journal System
// YEP_QuestJournal.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_QuestJournal = true;

var Yanfly = Yanfly || {};
Yanfly.Quest = Yanfly.Quest || {};
Yanfly.Quest.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc YEP任务日志系统-优
 * @author Yanfly Engine Plugins
 *
 * @help
   汉：硕明云书
 * ============================================================================
 * 指令
 * ============================================================================
 * Quest Add x //接取任务  Quest Add x, x, x  任务多个
 * Quest Journal Open //打开任务栏
 * Quest Remove x     //移除任务x
 * Quest Set Completed x   //完成任务x
 * Quest Set Failed x      //失败任务x
 * Quest Set Available x   //可进行任务x
 * Quest x Show/Hide Objective y   //显示/隐藏任务x的y目标
 * Quest x Complete Objective y    //完或任务x的y目标
 * Quest x Fail Objective y        //失败任务x的y目标
 * Quest x Show/Hide Reward y      //显示/隐藏任务x的y奖励
 * Quest x Show Reward y //显示奖励
 * Quest x Hide Reward y //隐藏奖励
 * Quest x Change Description Entry To y  //描述更改
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * 插件命令:
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 *   Quest Journal Open
 *   - 打开没有选择任务的任务日志系统菜单。

 *   Quest Journal Show
 *   Quest Journal Hide
 *   - 在主菜单中显示或隐藏任务日志选项。
 *
 *   Quest Journal Enable
 *   Quest Journal Disable
 *   - 在主菜单中启用或禁用任务日志选项。
 *
 *
 *   Quest Add x
 *   - 用整数替换“x”。将任务ID“x”作为可用任务添加到任务
 *   日志中。
 *
 *   Quest Add x to y
 *   - 将“x”和“y”替换为整数值，
 *   确定您希望添加到任务日志中的任务ID范围。
 *
 *   Quest Add x, x, x
 *   - 用代表您希望添加到任务日志中的任务ID的整数值替
 *   换“x”值。
 *
 *
 *   Quest Remove x
 *   - 用整数替换“x”。这将从任务日志中删除任务ID“x”。
 *   ...
 *
 *   Quest Remove x to y
 *   - 将“x”和“y”替换为整数值，以确定您希望从任务日志中大
 *   量删除的任务ID范围。
 *
 *   Quest Remove x, x, x
 *   - 用代表您希望从任务日志中删除的任务ID的整数值替换“x”值。
 *   ...
 *
 *   ---
 *
 *   Quest Set Completed x
 *   Quest Set Failed x
 *   Quest Set Available x
 *
 *   Quest Set Completed x to y
 *   Quest Set Failed x to y
 *   Quest Set Available x to y
 *   Quest Set Completed x, x, x
 *   Quest Set Failed x, x, x
 *   Quest Set Available x, x, x
 * 
 *   Quest x Change Description Entry To y
 *   - 将“x”替换为您要修改其描述的任务ID。
 *   用您希望将任务更改为的描述条目ID替换“y”。
 *   这将使描述，当在游戏中查看任务日志时，
 *   显示在任务“x”的插件参数中找到的描述条目ID“y”。
 *   这是用于你希望在任务中途更新描述文本的时候。
 *   ...
 *
 *   ---
 *
 *   Quest x Show Objective y
 *   Quest x Hide Objective y
 *   - 将“x”替换为您希望改变目标的任务ID。
 *   用您希望显示/隐藏的目标ID替换“y”。
 *   任务可以同时显示多个目标。
 *
 *   Quest x Show Objective y to z
 *   Quest x Hide Objective y to z
 *   - 将“x”替换为您希望改变目标的任务ID。
 *   用您希望显示/隐藏的目标ID范围替换“y”和“z”。
 *   任务可以同时显示多个目标。
 *
 *   Quest x Show Objective y, y, y
 *   Quest x Hide Objective y, y, y
 *   - 将“x”替换为您希望改变目标的任务ID。
 *   用代表您希望显示/隐藏的目标ID的整数值替换“y”值。
 *   任务可以同时显示多个目标。
 *
 *   Quest X Show All Objectives
 *   Quest X Hide All Objectives
 *   - 将“x”替换为您希望更改其目标的任务ID。
 *   这将显示/隐藏任务的所有目标。
 *
 *   Quest x Complete Objective y
 *   Quest x Fail Objective y
 *   Quest x Normalize Objective y
 *   - 将“x”替换为您希望改变目标的任务ID。
 *   将“y”替换为您希望更改其状态的目标ID。
 *  使用'Complete'将目标标记为已完成。使用'Fail'将目标标记为失败。
 *   使用'Normalize'会将目标的状态设置为
 *   “未完成”或“失败”
 *
 *   Quest x Complete Objective y to z
 *   Quest x Fail Objective y to z
 *   Quest x Normalize Objective y to z
 *   - 将“x”替换为您希望改变目标的任务ID。
 *   将“y”和“z”替换为您希望更改其状态的目标ID范围。
 *   使用'Complete'将目标标记为已完成。使用'Fail'将目标标记为失败。
 *   使用'Normalize'会将目标的状态设置为
 *   “未完成”或“失败”
 *
 *   Quest x Complete Objective y, y, y
 *   Quest x Fail Objective y, y, y
 *   Quest x Normalize Objective y, y, y
 *   - 将“x”替换为您希望改变目标的任务ID。
 *   用代表要更改状态的目标ID的整数值替换“y”值。
 *   使用'Complete'将目标标记为已完成。使用'Fail'将目标标记为失败。
 *   使用'Normalize'会将目标的状态设置为
 *   “未完成”或“失败”
 *   (WO有.BK)
 *
 *   Quest x Complete All Objectives
 *   Quest x Fail All Objectives
 *   Quest x Normalize All Objectives
 *   - 将“x”替换为您希望更改其目标的任务ID。
 *   这将complete/fail/normalize任务的所有目标。
 *
 *   ---
 *
 *   Quest x Show Reward y
 *   Quest x Hide Reward y
 *   - 用你希望改变奖励的任务号替换“x”。
 *   用您希望显示/隐藏的奖励ID替换“y”。
 *   任务可以同时显示多个奖励。
 *
 *   Quest x Show Reward y to z
 *   Quest x Hide Reward y to z
 *   - 用你希望改变奖励的任务号替换“x”。
 *   用您希望显示/隐藏的奖励ID范围替换“y”和“z”。
 *   任务可以同时显示多个奖励。
 *
 *   Quest x Show Reward y, y, y
 *   Quest x Hide Reward y, y, y
 *   - 用你希望改变奖励的任务号替换“x”。
 *   用代表您希望显示/隐藏的奖励ID的整数值替换“y”值。
 *   任务可以同时显示多个奖励。
 *
 *   Quest x Show All Rewards
 *   Quest x Hide All Rewards
 *   - 用你希望改变奖励的任务号替换“x”。
 *   这将显示/隐藏任务的所有奖励。
 *
 *   Quest x Claim Reward y
 *   Quest x Deny Reward y
 *   Quest x Normalize Reward y
 *   - 用你希望改变奖励的任务号替换“x”。
 *   将“y”替换为您希望更改其状态的奖励ID。
 *   使用'Claim'将奖励ID为要求。使用'Deny'将奖励标记为拒绝。
 *   使用'Normalize'会将奖励的状态设置为
 *   “未申请”或“已拒绝”。
 *
 *   Quest x Claim Reward y to z
 *   Quest x Deny Reward y to z
 *   Quest x Normalize Reward y to z
 *   - 用你希望改变奖励的任务号替换“x”。
 *   将“y”和“z”替换为您希望更改其状态的奖励ID范围。
 *   使用'Claim'将奖励ID为要求。使用'Deny'将奖励标记为拒绝。
 *   使用'Normalize'会将奖励的状态设置为
 *   “未申请”或“已拒绝”。
 *
 *   Quest x Claim Reward y, y, y
 *   Quest x Deny Reward y, y, y
 *   Quest x Normalize Reward y, y, y
 *   - 用你希望改变奖励的任务号替换“x”。
 *   将“y”值替换为代表您希望更改其状态的奖励ID的整数值。
 *   使用'Claim'将奖励ID为要求。使用'Deny'将奖励标记为拒绝。
 *   使用'Normalize'会将奖励的状态设置为
 *   “未申请”或“已拒绝”。
 *
 *   Quest x Claim All Rewards
 *   Quest x Deny All Rewards
 *   Quest x Normalize All Rewards
 *   - 用你希望改变奖励的任务号替换“x”。
 *   这将claim/deny/normalize任务的所有奖励。
 *
 *   ---
 *
 *   Quest x Change Subtext Entry To y
 *   - 将“x”替换为您要修改其潜台词的任务ID。
 *   将“y”替换为您希望将任务更改为的子文本条目ID。
 *   这将使潜台词，当在游戏中查看任务日志时，
 *   显示在任务“x”的插件参数中找到的潜台词条目ID“y”。
 *   这是用于你希望在任务中途更新潜台词的时候。
 *
 *   ---
 *
 * ============================================================================
 * 指令
 * ============================================================================
 *
 * 插件参数'Lunatic Mode'是为熟悉JavaScript的用户设计的。
 * 这些参数允许你添加额外的代码行到他们各自的函数
 * 中，只要各自的任务日志函数在游戏中出现。它们的定
 * 时将发生在功能发生之后，并且仅当它成功地传递改变时。
 * （...）
 *
 *   ---
 *
 *   Before Create Windows
 *   After Create Windows
 *   Close Quest Menu
 *
 *   ---
 *
 *   Quest Add
 *   Quest Remove
 *   Quest Complete
 *   Quest Fail
 *   Quest Available
 *
 *   ---
 *
 *   Change Description
 *
 *   ---
 *
 *   Show Objective
 *   Hide Objective
 *   Complete Objective
 *   Fail Objective
 *   Normalize Objective
 *
 *   ---
 *
 *   Show Reward
 *   Hide Reward
 *   Claim Reward
 *   Deny Reward
 *   Normalize Reward
 *
 *   ---
 *
 *   Change Subtext
 *
 *   ---
 *
 * 有几个规则需要注意。每个插件函数的代码只有在满足
 * 这些规则时才会运行:
 *
 *   1. 代码将为每个任务或任务属性的改变而运行。这意味
 *      着，如果你使用一个插件命令，
 *      一次改变一组任务或任务属性，
 *      代码将为每个任务或任务属性单独运行多次。
 *
 *   2. 代码只有在任务或任务属性成功更改的情况下才会运行。
 *      例如，如果一个任务已经设置为'Failed',
 *      运行插件命令再次失败该任务将不会触发
 *      Lunatic Mode代码再次运行。
 *
 *   3. 当任务第一次被添加时，任何默认属性都不会触发Lunatic Mode
 *      例如，如果被添加的任务的目标1和2从一开始就已经可见，
 *      那么，Lunatic Mode代码将不会运行1和2
 *      ...
 *
 * 确保您理解这些规则，
 * 这样您就知道是什么控制着自定义代码是否运行。
 * ============================================================================
 * 脚本调用
 * ============================================================================
 *
 * --- 控制变量事件的脚本调用 ---
 *
 *
 * $gameSystem.totalQuestsAvailable()
 * - 将变量值设置为可用任务数。
 *
 * $gameSystem.totalQuestsCompleted()
 * - 将变量值设置为已完成任务的数量。
 *
 * $gameSystem.totalQuestsFailed()
 * - 将变量值设置为失败任务数。
 *
 * $gameSystem.totalQuestsKnown()
 * - 将变量值设置为已知任务总数。
 *
 * $gameSystem.totalQuestsInGame()
 * - 将变量的值设置为游戏中任务的总数。
 *
 * $gameSystem.totalQuestTypes(category, type)
 * - 将 'category'替换为'available', 'completed', 'failed',或
 * 'all' 来指定类别。 用任务类型替换 'type' 
 * (ie. 'Main Quests', 'Side Quests', 'Character Quests', etc). 
 * （主线任务、支线任务、角色任务等)。包括类别和类型周围的引号
 * 例子: $gameSystem.totalQuestTypes('all', 'Main Quests')
 *
 * $gameSystem.getQuestDescriptionIndex(questId)
 * - 将 'questId'替换为您正在寻找的任务的ID.
 * 这将设置变量以显示当前正在使用的描述。
 * 例子: $gameSystem.getQuestDescriptionIndex(50)
 *
 * $gameSystem.totalVisibleQuestObjectives(questId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 这将设置变量来显示当前所选任务中
 * 有多少任务目标是可见的。
 * 例子: $gameSystem.totalVisibleQuestObjectives(50)
 *
 * $gameSystem.totalQuestObjectives(questId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 这将设置变量来显示所选任务设置的任务目标总数。
 * ...
 * 例子: $gameSystem.totalQuestObjectives(50)
 *
 * $gameSystem.totalVisibleQuestRewards(questId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 这将设置变量来显示所选
 * 任务当前可见的任务奖励数量。
 * 例子: $gameSystem.totalVisibleQuestRewards(50)
 *
 * $gameSystem.totalQuestRewards(questId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 这将设置变量来显示所选
 * 任务设置的任务奖励总数。
 * 例子: $gameSystem.totalQuestRewards(50)
 *
 * $gameSystem.getQuestSubtextIndex(questId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 这将设置变量以显示当前正在使用的子文本。
 * 例子: $gameSystem.getQuestSubtextIndex(50)
 *
 *
 * --- 条件分支事件的脚本调用 ---
 *
 * 
 * $gameSystem.isQuestObjectiveCompleted(questId, objectiveId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 将'objectiveId'替换为您要检查的目标的ID。
 * 这将检查条件分支的脚本调用，
 * 这将检查条件分支的脚本调用，(true)还是未完成(false).
 * 例子: $gameSystem.isQuestObjectiveCompleted(50, 1)
 *
 * $gameSystem.isQuestObjectiveFailed(questId, objectiveId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 将'objectiveId'替换为您要检查的目标的ID。
 * 这将在条件分支的脚本调用中进行检查，
 * 以查看目标的状态是失败(true)还是不失败(false).
 * 例子: $gameSystem.isQuestObjectiveFailed(50, 1)
 *
 * $gameSystem.isQuestObjectiveUncleared(questId, objectiveId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 将'objectiveId'替换为您要检查的目标的ID。
 * 这将在条件分支的脚本调用中进行检查，
 * 以查看目标的状态是既未完成也未失败(true)还是还是既未完成也未失败(false).
 * 例子: $gameSystem.isQuestObjectiveUncleared(50, 1)
 * 
 * $gameSystem.isQuestRewardClaimed(questId, rewardId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 用您要检查的奖励的ID替换'rewardId'
 * 这将在条件分支的脚本调用中进行检查，
 * 以查看奖励的状态是声明的(true)还是未声明的(false).
 * 例子: $gameSystem.isQuestRewardClaimed(50, 1)
 * 
 * $gameSystem.isQuestRewardDenied(questId, rewardId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 用您要检查的奖励的ID替换'rewardId'
 * 这将在条件分支的脚本调用中进行检查，
 * 以查看奖励的状态是拒绝(true)还是不拒绝(false).
 * 例子: $gameSystem.isQuestRewardDenied(50, 1)
 * 
 * $gameSystem.isQuestRewardUnclaimed(questId, rewardId)
 * - 将'questId'替换为您正在寻找的任务的ID。
 * 用您要检查的奖励的ID替换'rewardId'
 * 这将在条件分支的脚本调用中进行检查，
 * 以查看奖励的状态是既未声明也未拒绝(true)还是既未声明也未拒绝(false).
 * 例子: $gameSystem.isQuestRewardUnclaimed(50, 1)
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Fixed some bugs regarding certain plugin commands not working properly.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Help
 * ============================================================================
 *
 * @param ---Main Menu---
 * @text 主菜单
 * @default
 *
 * @param Quest Command
 * @text 任务命令
 * @parent ---Main Menu---
 * @desc 这是用于主菜单命令的文本
 * @default 任务
 *
 * @param Show Command
 * @text 显示命令
 * @parent ---Main Menu---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 默认在主菜单显示Quest命令？
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @text 启用命令
 * @parent ---Main Menu---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 默认情况下，在主菜单中启用合成命令？
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Place Command
 * @text 自动放置命令
 * @parent ---Main Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 允许这个插件决定菜单放置位置？
 * NO - false     YES - true
 * @default true
 *
 * @param ---Quest Menu---
 * @text 任务菜单
 * @default
 *
 * @param Quest Category Window
 * @text 任务类别窗口
 * @parent ---Quest Menu---
 * @type struct<CategoryWindow>
 * @desc 在这里调整任务类别窗口的属性
 * @default {"---Categories---":"","Category Order":"[\"available\",\"completed\",\"failed\",\"all\"]","Available Text":"\\i[192]正进行任务 (%1)","Completed Text":"\\i[191]已完成任务 (%1)","Failed Text":"\\i[194]失败的任务 (%1)","All Text":"\\i[189]所有的任务 (%1)","Cancel Text":"\\i[161]取消","---Window Settings---":"","X":"0","Y":"0","Width":"Graphics.boxWidth / 3","Height":"this.fittingHeight(this.numVisibleRows())","Rows":"4","Columns":"1","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Text Alignment":"left","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 *
 * @param Quest List Window
 * @text 任务列表窗口
 * @parent ---Quest Menu---
 * @type struct<ListWindow>
 * @desc 在这里调整任务列表窗口的属性。
 * @default {"---Types---":"","Show Types":"true","Type Order":"[\"\\\\c[6]主线任务\",\"\\\\c[4]支线任务\",\"\\\\c[3]特殊任务\",\"\\\\c[5]教程任务\"]","List Open Symbol":"-","List Closed Symbol":"+","Type Text Format":"%1%2 (%3)","Quest Indent":"0","Show Empty":"false","Read Quest":"\\i[121]查看任务","Cancel":"\\i[16]退出","---Window Settings---":"","X":"0","Y":"Graphics.boxHeight - height","Width":"Graphics.boxWidth / 3","Height":"Graphics.boxHeight - this.fittingHeight(4)","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Type Alignment":"left","Quest Alignment":"left","Window Skin":"Window"}
 *
 * @param Quest Title Window
 * @text 任务标题窗口
 * @parent ---Quest Menu---
 * @type struct<TitleWindow>
 * @desc 在这里调整任务标题窗口的属性。
 * @default {"---Window Settings---":"","No Quest Title":"\\c[4]❀ 任务日志 ❀","X":"Graphics.boxWidth - width","Y":"0","Width":"Graphics.boxWidth * 2 / 3","Height":"this.fittingHeight(1)","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Text Alignment":"center","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window"}
 *
 * @param Quest Data Window
 * @text 任务数据窗口
 * @parent ---Quest Menu---
 * @type struct<DataWindow>
 * @desc 在这里调整任务数据窗口的属性。
 * @default {"---Data Settings---":"","No Data Text":"\"欢迎来到 \\\\c[4]任务系统\\\\c[0].\\n\"","Quest Data Format":"\"\\\\c[4]任务难度:\\\\c[0] %2\\n\\\\c[4]任务发布:\\\\c[0] %3\\n\\\\c[4]发布地点:\\\\c[0] %4\\n\\n\\\\c[4]任务描述:\\\\c[0]\\n%5\\n\\n\\\\c[4]任务目标:\\\\c[0]\\n%6\\n\\n\\\\c[4]任务奖励:\\\\c[0]\\n%7\\n\\n%8\"","Uncleared Objective":"\\i[160]%1","Completed Objective":"\\i[165]%1","Failed Objective":"\\i[162]%1","Unclaimed Reward":"\\i[160]%1","Claimed Reward":"\\i[163]%1","Denied Reward":"\\i[161]%1","Load Delay":"30","---Window Settings---":"","X":"Graphics.boxWidth - width","Y":"Graphics.boxHeight - height","Width":"Graphics.boxWidth * 2 / 3","Height":"Graphics.boxHeight - this.fittingHeight(1)","Line Height":"36","Font Face":"GameFont","Font Size":"28","Standard Padding":"18","Text Padding":"6","Standard Opacity":"255","Back Opacity":"192","Window Skin":"Window","Scroll Speed":"4"}
 *
 * @param Lunatic Mode
 * @text 疯狂模式
 * @parent ---Quest Menu---
 * @type struct<LunaticMode>
 * @desc 为插件的每个主要功能添加自定义代码。
 * @default {"---Quest Menu---":"","Before Create Windows":"\"// Variables\\n//   background - background image used for the menu\\n//   windowLayer - sprite layer that contains all windows\\n//\\n// background.bitmap = ImageManager.loadTitle1(\\\"Book\\\");\\n// this.fitScreen(background);\"","After Create Windows":"\"// Variables\\n//   background - background image used for the menu\\n//   windowLayer - sprite layer that contains all windows\"","Close Quest Menu":"\"// Variables\\n//   background - background image used for the menu\\n//   windowLayer - sprite layer that contains all windows\"","---Quest Status---":"","Quest Add":"\"// Variables:\\n//   questId - ID of the quest being added\\n//\\n// console.log('Quest ' + questId + ' successfully added!')\"","Quest Remove":"\"// Variables:\\n//   questId - ID of the quest being removed\\n//\\n// console.log('Quest ' + questId + ' successfully removed!')\"","Quest Complete":"\"// Variables:\\n//   questId - ID of the quest set to completed\\n//\\n// console.log('Quest ' + questId + ' status changed to Completed!')\"","Quest Fail":"\"// Variables:\\n//   questId - ID of the quest set to failed\\n//\\n// console.log('Quest ' + questId + ' status changed to Failed!')\"","Quest Available":"\"// Variables:\\n//   questId - ID of the quest set to available\\n//\\n// console.log('Quest ' + questId + ' status changed to Available!')\"","---Description---":"","Change Description":"\"// Variables:\\n//   questId - ID of the quest whose description is changed\\n//   index - Description index being changed to\\n//\\n// console.log('Quest ' + questId + ' description index changed to ' + index)\"","---Objectives---":"","Show Objective":"\"// Variables:\\n//   questId - ID of the quest whose objectives are altered\\n//   objectiveId - ID of the objective being shown\\n//\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to shown!')\"","Hide Objective":"\"// Variables:\\n//   questId - ID of the quest whose objectives are altered\\n//   objectiveId - ID of the objective being hidden\\n//\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to hidden!')\"","Complete Objective":"\"// Variables:\\n//   questId - ID of the quest whose objectives are altered\\n//   objectiveId - ID of the objective being completed\\n//\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to completed!')\"","Fail Objective":"\"// Variables:\\n//   questId - ID of the quest whose objectives are altered\\n//   objectiveId - ID of the objective having failed\\n//\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to failed!')\"","Normalize Objective":"\"// Variables:\\n//   questId - ID of the quest whose objectives are altered\\n//   objectiveId - ID of the objective normalized\\n//\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to normal!')\"","---Rewards---":"","Show Reward":"\"// Variables:\\n//   questId - ID of the quest whose rewards are altered\\n//   rewardId - ID of the reward being shown\\n//\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' becomes shown!')\"","Hide Reward":"\"// Variables:\\n//   questId - ID of the quest whose rewards are altered\\n//   rewardId - ID of the reward being hidden\\n//\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' becomes hidden!')\"","Claim Reward":"\"// Variables:\\n//   questId - ID of the quest whose rewards are altered\\n//   rewardId - ID of the reward becoming claimed\\n//\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is now claimed!')\"","Deny Reward":"\"// Variables:\\n//   questId - ID of the quest whose rewards are altered\\n//   rewardId - ID of the reward becoming denied\\n//\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is now denied!')\"","Normalize Reward":"\"// Variables:\\n//   questId - ID of the quest whose rewards are altered\\n//   rewardId - ID of the reward normalized\\n//\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is normalized!')\"","---Subtext---":"","Change Subtext":"\"// Variables:\\n//   questId - ID of the quest whose subtext is changed\\n//   index - Subtext index being changed to\\n//\\n// console.log('Quest ' + questId + ' subtext index changed to ' + index)\""}
 *
 * @param ---Quest List---
 * @text 任务列表
 * @default
 *
 * @param Quest 1
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc 修改此任务条目使用的数据。
 * 有关每个设置的更多信息，请参考帮助。
 * @default
 *
 * @param Quest 2
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc 修改此任务条目使用的数据。
 * 有关每个设置的更多信息，请参考帮助。
 * @default
 *
 * @param Quest 3
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc 修改此任务条目使用的数据。
 * 有关每个设置的更多信息，请参考帮助。
 * @default
 *
 * @param Quest 4
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc 修改此任务条目使用的数据。
 * 有关每个设置的更多信息，请参考帮助。（后面以此类推）
 * @default
 *
 * @param Quest 5
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 6
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 7
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 8
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 9
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 10
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 11
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 12
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 13
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 14
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 15
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 16
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 17
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 18
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 19
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 * 
 * @param Quest 20
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 21
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 22
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 23
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 24
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 25
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 26
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 27
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 28
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 29
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 30
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 31
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 32
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 33
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 34
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 35
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 36
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 37
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 38
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 39
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 40
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 41
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 42
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 43
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 44
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 45
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 46
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 47
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 48
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 49
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 50
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 51
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 52
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 53
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 54
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 55
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 56
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 57
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 58
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 59
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 60
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 61
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 62
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 63
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 64
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 65
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 66
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 67
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 68
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 69
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 70
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 71
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 72
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 73
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 74
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 75
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 76
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 77
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 78
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 79
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 80
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 81
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 82
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 83
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 84
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 85
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 86
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 87
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 88
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 89
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 90
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 91
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 92
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 93
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 94
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 95
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 96
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 97
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 98
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 99
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 *
 * @param Quest 100
 * @parent ---Quest List---
 * @type struct<Quest>
 * @desc Modify the data used by this quest entry.
 * Refer to Help for more information about each setting.
 * @default
 */
//=============================================================================
/* Plugin Parameter Structure Settings
 *=============================================================================
 */
/* ----------------------------------------------------------------------------
 * CategoryWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~CategoryWindow:
 * @param ---Categories---
 * @text ---类别---
 * @default
 *
 * @param Category Order
 * @text 类别的顺序
 * @parent ---Categories---
 * @type string[]
 * @desc 任务类型类别的顺序列表。
 * Options: available, completed, failed, all, cancel
 * @default ["available","completed","failed","all"]
 *
 * @param Available Text
 * @parent ---Categories---
 * @desc 用于可用任务的文本。
 * Text codes allowed. %1 - Quest Number
 * @default \i[192]进行中的任务 (%1)
 *
 * @param Completed Text
 * @parent ---Categories---
 * @desc 用于已完成任务的文本。
 * Text codes allowed. %1 - Quest Number
 * @default \i[191]已完成的任务 (%1)
 *
 * @param Failed Text
 * @parent ---Categories---
 * @desc 用于失败任务的文本。
 * Text codes allowed. %1 - Quest Number
 * @default \i[194]失败的任务 (%1)
 *
 * @param All Text
 * @parent ---Categories---
 * @desc 用于所有任务的文本。
 * Text codes allowed. %1 - Quest Number
 * @default \i[189]全部任务 (%1)
 *
 * @param Cancel Text
 * @parent ---Categories---
 * @desc 用于关闭选项的文本。
 * Text codes allowed.
 * @default \i[161]Close
 * 
 * @param ---Window Settings---
 * @default
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc 窗口的X位置公式。
 * @default 0
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc 窗口Y位置的公式。
 * @default 0
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc 窗口宽度公式。
 * @default Graphics.boxWidth / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option this.fittingHeight(1)
 * @option this.fittingHeight(2)
 * @option this.fittingHeight(3)
 * @option this.fittingHeight(4)
 * @option this.fittingHeight(5)
 * @option this.fittingHeight(this.numVisibleRows())
 * @desc 窗口高度公式。
 * @default this.fittingHeight(this.numVisibleRows())
 *
 * @param Rows
 * @parent ---Window Settings---
 * @type combo
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @desc 窗口行数的公式。
 * @default 4
 *
 * @param Columns
 * @parent ---Window Settings---
 * @type combo
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @desc 窗口列数的公式。
 * @default 1
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc 用于每个行条目的高度.
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc 游戏中使用的字体。
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc 标准字体大小的公式。
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc 窗口填充的公式。
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc 显示文本前使用的填充公式。
 * @default 6
 *
 * @param Text Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 选择窗口文本的对齐方式。
 * left     center     right
 * @default left
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的标准不透明度公式。
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的不透明度公式。
 * @default 192
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc 使用了窗口皮肤。
 * @default Window
 * 
 */
/* ----------------------------------------------------------------------------
 * ListWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~ListWindow:
 * @param ---Types---
 * @default
 *
 * @param Show Types
 * @parent ---Types---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在任务列表中显示任务类型？
 * @default true
 *
 * @param Type Order
 * @parent ---Types---
 * @type string[]
 * @desc 任务列表类型的顺序列表。
 * Name these however you want. Text codes are allowed.
 * @default ["\\c[6]Main Quests","\\c[4]Side Quests","\\c[3]Character Quests","\\c[5]Tutorial Quests"]
 *
 * @param List Open Symbol
 * @parent ---Types---
 * @desc 显示类型是否打开的文本指示器。
 * 打开的任务类型将显示该任务类型中的所有任务。
 * @default -
 *
 * @param List Closed Symbol
 * @parent ---Types---
 * @desc 显示类型是否关闭的文本指示器。
 * 封闭类型不会显示该任务类型中的所有任务。
 * @default +
 *
 * @param Type Text Format
 * @parent ---Types---
 * @desc 用于显示任务类型的格式。允许文本代码。
 * %1 - Open/Closed   %2 - Type Name   %3 - Quest Number
 * @default %1%2 (%3)
 *
 * @param Quest Indent
 * @parent ---Types---
 * @number
 * @number 0
 * @desc 任务缩进多少像素？
 * @default 0
 *
 * @param Show Empty
 * @parent ---Types---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 显示空的任务类型？如果没有，
 * 没有任何任务的类型将从列表中隐藏。
 * @default false
 *
 * @param Read Quest
 * @parent ---Types---
 * @desc 'Read Quest'选项使用的词汇。
 * 您可以使用文本代码。
 * @default \\i[121]Read Quest
 *
 * @param Cancel
 * @parent ---Types---
 * @desc 用于'Cancel'选项的词汇。
 * @default \\i[16]Cancel
 * 
 * @param ---Window Settings---
 * @default
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc 窗口的X位置公式.
 * @default 0
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc Formula for the window's Y position.
 * @default Graphics.boxHeight - height
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc 窗口宽度公式。
 * @default Graphics.boxWidth / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxHeight - this.fittingHeight(1)
 * @option Graphics.boxHeight - this.fittingHeight(2)
 * @option Graphics.boxHeight - this.fittingHeight(3)
 * @option Graphics.boxHeight - this.fittingHeight(4)
 * @option Graphics.boxHeight - this.fittingHeight(5)
 * @desc 窗口高度公式。
 * @default Graphics.boxHeight - this.fittingHeight(4)
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc The height used for each line entry.
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc 游戏中使用的字体。
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc 标准字体大小的公式。
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc 窗口填充的公式。
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc 显示文本前使用的填充公式。
 * @default 6
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的标准不透明度公式。
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的不透明度公式。
 * @default 192
 *
 * @param Type Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 选择任务类型的对齐方式。
 * left     center     right
 * @default left
 *
 * @param Quest Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 选择什么类型的路线用于任务本身。
 * left     center     right
 * @default left
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc 使用了窗口皮肤。
 * @default Window
 * 
 */
/* ----------------------------------------------------------------------------
 * TitleWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~TitleWindow:
 * @param ---Window Settings---
 * @default
 *
 * @param No Quest Title
 * @parent ---Window Settings---
 * @desc 当没有选择任务时显示这个。
 * 允许文本代码。
 * @default \\c[4]Quest Journal
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc 窗口的X位置公式。
 * @default Graphics.boxWidth - width
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc 窗口Y位置的公式。
 * @default 0
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc 窗口宽度公式。
 * @default Graphics.boxWidth * 2 / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option this.fittingHeight(1)
 * @option this.fittingHeight(2)
 * @option this.fittingHeight(3)
 * @option this.fittingHeight(4)
 * @option this.fittingHeight(5)
 * @desc 窗口高度公式。
 * @default this.fittingHeight(1)
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc 用于每个行条目的高度。
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc 游戏中使用的字体。
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc 标准字体大小的公式。
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc 窗口填充的公式。
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc 显示文本前使用的填充公式。
 * @default 6
 *
 * @param Text Alignment
 * @parent ---Window Settings---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 选择窗口文本的对齐方式。
 * left     center     right
 * @default center
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的标准不透明度公式。
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的不透明度公式。
 * @default 192
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc 使用了窗口皮肤。
 * @default Window
 * 
 */
/* ----------------------------------------------------------------------------
 * DataWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~DataWindow:
 * @param ---Data Settings---
 * @text ---数据设置---
 * @default
 *
 * @param No Data Text
 * @text 没任务显示的文本
 * @parent ---Data Settings---
 * @type note
 * @desc 没有任务数据时显示的文本。
 * @default "欢迎您进入 \\c[4]任务系统\\c[0].\n\n暂时无任务可做！"
 *
 * @param Quest Data Format
 * @parent ---Data Settings---
 * @type note
 * @desc %1 - Title, %2 - Difficulty, %3 - From, %4 - Location
 * %5 - Desc，%6 -目标，%7 -奖励，%8 -潜台词
 * @default "\\{%1\\}\n\\c[4]Level:\\c[0] %2\n\\c[4]From:\\c[0] %3\n\\c[4]Location:\\c[0] %4\n\n\\c[4]Description:\\c[0]\n%5\n\n\\c[4]Objectives:\\c[0]\n%6\n\n\\c[4]Rewards:\\c[0]\n%7\n\n%8"
 *
 * @param Uncleared Objective
 * @text 未明确的目标
 * @parent ---Data Settings---
 * @desc 未清除任务目标的文本格式。
 * %1 -目标文本
 * @default \i[160]%1
 *
 * @param Completed Objective
 * @parent ---Data Settings---
 * @desc 已完成任务目标的文本格式。
 * %1 -目标文本
 * @default \i[165]%1
 *
 * @param Failed Objective
 * @parent ---Data Settings---
 * @desc 失败任务目标的文本格式。
 * %1 -目标文本
 * @default \i[162]%1
 *
 * @param Unclaimed Reward
 * @parent ---Data Settings---
 * @desc 无人领取任务奖励的文本格式。
 * %1 -奖励文本
 * @default \i[160]%1
 *
 * @param Claimed Reward
 * @parent ---Data Settings---
 * @desc 申请任务奖励的文本格式。
 * %1 -奖励文本
 * @default \i[163]%1
 *
 * @param Denied Reward
 * @parent ---Data Settings---
 * @desc 拒绝任务奖励的文本格式。
 * %1 -奖励文本
 * @default \i[161]%1
 *
 * @param Load Delay
 * @parent ---Data Settings---
 * @type number
 * @desc 帧中数据的加载时间延迟。
 * 这是为了防止引擎负担过重。
 * @default 30
 *
 * @param ---Window Settings---
 * @default
 *
 * @param X
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc 窗口的X位置公式。
 * @default Graphics.boxWidth - width
 *
 * @param Y
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc 窗口Y位置的公式。
 * @default Graphics.boxHeight - height
 *
 * @param Width
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth * 2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth * 3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth * 4 / 5
 * @desc 窗口宽度公式。
 * @default Graphics.boxWidth * 2 / 3
 *
 * @param Height
 * @parent ---Window Settings---
 * @type combo
 * @option Graphics.boxHeight - this.fittingHeight(1)
 * @option Graphics.boxHeight - this.fittingHeight(2)
 * @option Graphics.boxHeight - this.fittingHeight(3)
 * @option Graphics.boxHeight - this.fittingHeight(4)
 * @option Graphics.boxHeight - this.fittingHeight(5)
 * @desc 窗口高度公式。
 * @default Graphics.boxHeight - this.fittingHeight(1)
 *
 * @param Line Height
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc 用于每个行条目的高度。
 * @default 36
 *
 * @param Font Face
 * @parent ---Window Settings---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc 游戏中使用的字体。
 * @default GameFont
 *
 * @param Font Size
 * @parent ---Window Settings---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc 标准字体大小的公式。
 * @default 28
 *
 * @param Standard Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc 窗口填充的公式。
 * @default 18
 *
 * @param Text Padding
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc 显示文本前使用的填充公式。
 * @default 6
 *
 * @param Standard Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的标准不透明度公式。
 * @default 255
 *
 * @param Back Opacity
 * @parent ---Window Settings---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc 窗口使用的不透明度公式。
 * @default 192
 *
 * @param Window Skin
 * @parent ---Window Settings---
 * @type file
 * @dir img/system/
 * @desc 使用了窗口皮肤。
 * @default Window
 *
 * @param Scroll Speed
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @desc 按下向上/向下键时窗口滚动的速度。
 * @default 4
 * 
 */
/* ----------------------------------------------------------------------------
 * LunaticMode Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~LunaticMode:
 * @param ---Quest Menu---
 * @default
 *
 * @param Before Create Windows
 * @parent ---Quest Menu---
 * @type note
 * @desc 这段代码将在为场景创建任何任务菜单之前运行。
 * ...
 * @default "// Variables\n//   background - background image used for the menu\n//   windowLayer - sprite layer that contains all windows\n//\n// background.bitmap = ImageManager.loadTitle1(\"Book\");\n// this.fitScreen(background);"
 *
 * @param After Create Windows
 * @parent ---Quest Menu---
 * @type note
 * @desc 这段代码将在为场景创建所有任务菜单后运行。
 * ...
 * @default "// Variables\n//   background - background image used for the menu\n//   windowLayer - sprite layer that contains all windows"
 *
 * @param Close Quest Menu
 * @parent ---Quest Menu---
 * @type note
 * @desc 这个代码将在任务菜单关闭时运行。
 * @default "// Variables\n//   background - background image used for the menu\n//   windowLayer - sprite layer that contains all windows"
 *
 * @param ---Quest Status---
 * @default 
 * 
 * @param Quest Add
 * @parent ---Quest Status---
 * @type note
 * @desc 这段代码将在任务被成功添加到任务日志的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest being added\n//\n// console.log('Quest ' + questId + ' successfully added!')"
 *
 * @param Quest Remove
 * @parent ---Quest Status---
 * @type note
 * @desc 这段代码将在任务成功从任务日志中移除时运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest being removed\n//\n// console.log('Quest ' + questId + ' successfully removed!')"
 *
 * @param Quest Complete
 * @parent ---Quest Status---
 * @type note
 * @desc 这段代码将在任务状态变为完成时运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest set to completed\n//\n// console.log('Quest ' + questId + ' status changed to Completed!')"
 *
 * @param Quest Fail
 * @parent ---Quest Status---
 * @type note
 * @desc 这段代码将在任务状态变为失败时运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest set to failed\n//\n// console.log('Quest ' + questId + ' status changed to Failed!')"
 *
 * @param Quest Available
 * @parent ---Quest Status---
 * @type note
 * @desc 这段代码将在任务状态变为可用时运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest set to available\n//\n// console.log('Quest ' + questId + ' status changed to Available!')"
 *
 * @param ---Description---
 * @default
 *
 * @param Change Description
 * @parent ---Description---
 * @type note
 * @desc 这段代码将在任务描述被修改成特定索引时运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose description is changed\n//   index - Description index being changed to\n//\n// console.log('Quest ' + questId + ' description index changed to ' + index)"
 *
 * @param ---Objectives---
 * @default
 *
 * @param Show Objective
 * @parent ---Objectives---
 * @type note
 * @desc 这段代码将在任务目标显示出来的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose objectives are altered\n//   objectiveId - ID of the objective being shown\n//\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to shown!')"
 *
 * @param Hide Objective
 * @parent ---Objectives---
 * @type note
 * @desc 这段代码会在任务目标隐藏的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose objectives are altered\n//   objectiveId - ID of the objective being hidden\n//\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to hidden!')"
 *
 * @param Complete Objective
 * @parent ---Objectives---
 * @type note
 * @desc 这段代码将在任务目标完成时运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose objectives are altered\n//   objectiveId - ID of the objective being completed\n//\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to completed!')"
 *
 * @param Fail Objective
 * @parent ---Objectives---
 * @type note
 * @desc 这段代码将在任务目标失败的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose objectives are altered\n//   objectiveId - ID of the objective having failed\n//\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to failed!')"
 *
 * @param Normalize Objective
 * @parent ---Objectives---
 * @type note
 * @desc 这段代码将在任务目标被规范化的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose objectives are altered\n//   objectiveId - ID of the objective normalized\n//\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to normal!')"
 *
 * @param ---Rewards---
 * @default
 *
 * @param Show Reward
 * @parent ---Rewards---
 * @type note
 * @desc 这段代码将在任务奖励显示的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose rewards are altered\n//   rewardId - ID of the reward being shown\n//\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' becomes shown!')"
 *
 * @param Hide Reward
 * @parent ---Rewards---
 * @type note
 * @desc 这段代码会在任务的奖励被隐藏时运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose rewards are altered\n//   rewardId - ID of the reward being hidden\n//\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' becomes hidden!')"
 *
 * @param Claim Reward
 * @parent ---Rewards---
 * @type note
 * @desc 这段代码将会在任务的任何时候运行。
 * ....
 * @default "// Variables:\n//   questId - ID of the quest whose rewards are altered\n//   rewardId - ID of the reward becoming claimed\n//\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is now claimed!')"
 *
 * @param Deny Reward
 * @parent ---Rewards---
 * @type note
 * @desc 这段代码将在任务奖励被拒绝的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose rewards are altered\n//   rewardId - ID of the reward becoming denied\n//\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is now denied!')"
 *
 * @param Normalize Reward
 * @parent ---Rewards---
 * @type note
 * @desc 这段代码将在任务奖励正常化的任何时候运行。
 * ...
 * @default "// Variables:\n//   questId - ID of the quest whose rewards are altered\n//   rewardId - ID of the reward normalized\n//\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is normalized!')"
 *
 * @param ---Subtext---
 * @default
 *
 * @param Change Subtext
 * @parent ---Subtext---
 * @type note
 * @desc 这段代码将在任何时候任务的潜台词被改变为一个特定
 * 的索引时运行。
 * @default "// Variables:\n//   questId - ID of the quest whose subtext is changed\n//   index - Subtext index being changed to\n//\n// console.log('Quest ' + questId + ' subtext index changed to ' + index)"
 * 
 */
/* ----------------------------------------------------------------------------
 * Quest Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Title
 * @desc 任务的标题。
 * 允许文本代码.
 * @default \i[87]任务名
 *
 * @param Type
 * @parent Title
 * @type combo
 * @option 主线任务
 * @option 支线任务
 * @option 特殊任务
 * @option 教程任务
 * @desc 这是什么类型的任务？
 * @default 主线任务
 *
 * @param Difficulty
 * @parent Title
 * @desc 这个任务的难度。
 * Text codes allowed.
 * @default 简单难度
 *
 * @param From
 * @parent Title
 * @desc 插入发出这个任务的NPC的名字。
 * Text codes allowed.
 * @default 发布人名字
 *
 * @param Location
 * @parent Title
 * @desc 插入发出此任务的NPC的位置。
 * Text codes allowed.
 * @default 发布位置
 *
 * @param Description
 * @parent Title
 * @type note[]
 * @desc 请输入此任务的描述。
 * Text codes allowed.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Objectives List
 * @type note[]
 * @desc 这个任务要完成的目标。
 * Text codes allowed.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param Visible Objectives
 * @parent Objectives List
 * @type number[]
 * @min 1
 * @desc 从一开始就显而易见的目标。
 * @default ["1"]
 *
 * @param Rewards List
 * @type note[]
 * @desc 这个任务的奖励列表。
 * Text codes allowed.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 * 
 * @param Visible Rewards
 * @parent Rewards List
 * @type number[]
 * @min 1
 * @desc 从一开始就显而易见的奖励。
 * @default ["1"]
 *
 * @param Subtext
 * @type note[]
 * @desc 潜台词与任务一起展示。
 * @default ["\"\"","\"This is a subtext. It is used as\\nextra text that you may want to\\nplace on your quest journal that\\ndiffers from the description.\""]
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.3.5") {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_QuestJournal');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.QuestCmdName = String(Yanfly.Parameters['Quest Command']);
Yanfly.Param.QuestCmdShow = eval(Yanfly.Parameters['Show Command']);
Yanfly.Param.QuestCmdEnable = eval(Yanfly.Parameters['Enable Command']);
Yanfly.Param.QuestCmdPlace = eval(Yanfly.Parameters['Auto Place Command']);

Yanfly.Param.QuestCategoryWindow = 
  JSON.parse(Yanfly.Parameters['Quest Category Window']);
Yanfly.Param.QuestListWindow = 
  JSON.parse(Yanfly.Parameters['Quest List Window']);
Yanfly.Param.QuestTitleWindow = 
  JSON.parse(Yanfly.Parameters['Quest Title Window']);
Yanfly.Param.QuestDataWindow = 
  JSON.parse(Yanfly.Parameters['Quest Data Window']);
Yanfly.Quest.LunaticMode = 
  JSON.parse(Yanfly.Parameters['Lunatic Mode']);

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.Quest.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
  Yanfly.Quest.TouchInput_onMouseMove.call(this, event);
  this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
  this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//=============================================================================
// DataManager
//=============================================================================

var $dataQuests = [null];
Yanfly.Quest.totalCount = 0;

DataManager.questDatabaseAdd = function(id, data) {
  if (!data) return $dataQuests.push(null);
  data = this.questDataFailsafe(id, data);
  var visibleObjectives = JSON.parse(data['Visible Objectives']);
  for (var i = 0; i < visibleObjectives.length; ++i) {
    visibleObjectives[i] = parseInt(visibleObjectives[i]);
  };
  var visibleRewards = JSON.parse(data['Visible Rewards']);
  for (var i = 0; i < visibleRewards.length; ++i) {
    visibleRewards[i] = parseInt(visibleRewards[i]);
  };
  var description = JSON.parse(data['Description']);
  description.unshift('');
  var objectives = JSON.parse(data['Objectives List']);
  objectives.unshift('');
  var rewards = JSON.parse(data['Rewards List']);
  rewards.unshift('');
  var subtext = JSON.parse(data['Subtext']);
  subtext.unshift('');
  var type = data['Type'];
  type = type.replace(/\\I\[(\d+)\]/gi, '').trim();
  type = type.replace(/\\C\[(\d+)\]/gi, '').trim();
  var quest = {
    name: data['Title'],
    id: id,
    type: type,
    difficulty: data['Difficulty'],
    from: data['From'],
    location: data['Location'],
    description: description,
    objectives: objectives,
    visibleObjectives: visibleObjectives,
    rewards: rewards,
    visibleRewards: visibleRewards,
    subtext: subtext,
    note: ''
  };
  $dataQuests[id] = quest;
  Yanfly.Quest.totalCount += 1;
};

DataManager.questDataFailsafe = function(id, data) {
  if (!data['Title']) data['Title'] = "\\i[87]Unfinished Quest";
  if (!data['Type']) data['Type'] = "Main Quests";
  if (!data['Difficulty']) data['Difficulty'] = "Easy Peasy";
  if (!data['From']) data['From'] = "NPC Name";
  if (!data['Location']) data['Location'] = "Location Name";
  if (!data['Description']) data['Description'] = "[\"\\\"\\\"\"]";
  if (data['Description'] === '[]') data['Description'] = "[\"\\\"\\\"\"]";
  if (!data['Objectives List']) data['Objectives List'] = "[\"\\\"\\\"\"]";
  if (data['Objectives List'] === '[]') data['Objectives List'] =
    "[\"\\\"\\\"\"]";
  if (!data['Visible Objectives']) data['Visible Objectives'] = "[\"1\"]";
  if (!data['Rewards List']) data['Rewards List'] = "[\"\\\"\\\"\"]";
  if (data['Rewards List'] === '[]') data['Rewards List'] = "[\"\\\"\\\"\"]";
  if (!data['Visible Rewards']) data['Visible Rewards'] = "[\"1\"]";
  if (!data['Subtext']) data['Subtext'] = "[\"\\\"\\\"\"]";
  if (data['Subtext'] === '[]') data['Subtext'] = "[\"\\\"\\\"\"]";
  return data;
};

DataManager.questDatabaseCreate = function() {
  $dataQuests = [null];
  for (var i = 1; i <= 100; ++i) {
    var questData = JSON.parse(Yanfly.Parameters['Quest ' + i] || 'null');
    if (!questData) continue;
    this.questDatabaseAdd(i, questData);
  };
};

DataManager.questDatabaseCreate();

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.reservedQuestOpen = function(questId) {
  this._questOpen = questId;
};

Game_Temp.prototype.getQuestOpen = function() {
  return this._questOpen;
};

Game_Temp.prototype.clearQuestOpen = function() {
  this._questOpen = undefined;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Quest.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Quest.Game_System_initialize.call(this);
  this.initQuestSettings();
};

Game_System.prototype.initQuestSettings = function() {
  this._showQuest = this._showQuest || Yanfly.Param.QuestCmdShow;
  this._enableQuest = this._enableQuest || Yanfly.Param.QuestCmdEnable;
  this._questsKnown = this._questsKnown || [];
  this._questsCompleted = this._questsCompleted || [];
  this._questsFailed = this._questsFailed || [];
  this._questsDescription = this._questsDescription || {};
  this._questsObjectives = this._questsObjectives || {};
  this._questsObjectivesCompleted = this._questsObjectivesCompleted || {};
  this._questsObjectivesFailed = this._questsObjectivesFailed || {};
  this._questsRewards = this._questsRewards || {};
  this._questsRewardsClaimed = this._questsRewardsClaimed || {};
  this._questsRewardsDenied = this._questsRewardsDenied || {};
  this._questsSubtext = this._questsSubtext || {};
};

Game_System.prototype.isShowQuest = function() {
  this.initQuestSettings();
  return this._showQuest;
};

Game_System.prototype.setShowQuest = function(value) {
  this.initQuestSettings();
  this._showQuest = value;
};

Game_System.prototype.isEnableQuest = function() {
  this.initQuestSettings();
  return this._enableQuest;
};

Game_System.prototype.setEnableQuest = function(value) {
  this.initQuestSettings();
  this._enableQuest = value;
};

Game_System.prototype.getQuestsAvailable = function() {
  this.initQuestSettings();
  var result = [];
  var length = this._questsKnown.length;
  for (var i = 0; i < length; ++i) {
    var questId = this._questsKnown[i];
    if (this._questsCompleted.contains(questId)) continue;
    if (this._questsFailed.contains(questId)) continue;
    result.push(questId);
  }
  return result;
};

Game_System.prototype.getQuestsCompleted = function() {
  this.initQuestSettings();
  var result = [];
  var length = this._questsKnown.length;
  for (var i = 0; i < length; ++i) {
    var questId = this._questsKnown[i];
    if (this._questsCompleted.contains(questId)) result.push(questId);
  }
  return result;
};

Game_System.prototype.getQuestsFailed = function() {
  this.initQuestSettings();
  var result = [];
  var length = this._questsKnown.length;
  for (var i = 0; i < length; ++i) {
    var questId = this._questsKnown[i];
    if (this._questsFailed.contains(questId)) result.push(questId);
  }
  return result;
};

Game_System.prototype.getAllQuests = function() {
  this.initQuestSettings();
  return this._questsKnown;
};

Game_System.prototype.getTypeQuests = function(category, type) {
  this.initQuestSettings();
  category = category || 'all';
  type = type || '';
  var result = [];
  if (category === 'available') {
    var quests = this.getQuestsAvailable();
  } else if (category === 'completed') {
    var quests = this.getQuestsCompleted();
  } else if (category === 'failed') {
    var quests = this.getQuestsFailed();
  } else {
    var quests = this.getAllQuests();
  }
  var length = quests.length;
  for (var i = 0; i < length; ++i) {
    var questId = quests[i];
    var questData = $dataQuests[questId];
    if (!questData) continue;
    if (questData.type === type) result.push(questId);
  }
  return result;
};

Game_System.prototype.getQuestDescriptionIndex = function(questId) {
  this.initQuestSettings();
  return this._questsDescription[questId] || 0;
};

Game_System.prototype.getQuestObjectives = function(questId) {
  this.initQuestSettings();
  return this._questsObjectives[questId] || ['1'];
};

Game_System.prototype.getQuestObjectiveStatus = function(questId, objId) {
  this.initQuestSettings();
  this._questsObjectivesCompleted[questId] =
    this._questsObjectivesCompleted[questId] || [];
  this._questsObjectivesFailed[questId] =
    this._questsObjectivesFailed[questId] || [];
  if (this._questsObjectivesCompleted[questId].contains(objId)) {
    return 'Completed Objective';
  } else if (this._questsObjectivesFailed[questId].contains(objId)) {
    return 'Failed Objective';
  } else {
    return 'Uncleared Objective';
  }
};

Game_System.prototype.getQuestRewards = function(questId) {
  this.initQuestSettings();
  return this._questsRewards[questId] || ['1'];
};

Game_System.prototype.getQuestRewardStatus = function(questId, objId) {
  this.initQuestSettings();
  if (this._questsRewardsClaimed[questId].contains(objId)) {
    return 'Claimed Reward';
  } else if (this._questsRewardsDenied[questId].contains(objId)) {
    return 'Denied Reward';
  } else {
    return 'Unclaimed Reward';
  }
};

Game_System.prototype.getQuestSubtextIndex = function(questId) {
  this.initQuestSettings();
  return this._questsSubtext[questId] || 0;
};

Game_System.prototype.questAdd = function(questId) {
  this.initQuestSettings();
  if (this._questsKnown.contains(questId)) return;
  var questData = $dataQuests[questId];
  if (!questData) return;
  this._questsKnown.push(questId);
  this._questsKnown.sort(function(a, b) {
    return a - b;
  });
  this._questsDescription[questId] = 1;
  this._questsObjectives[questId] = [];
  for (var i = 0; i < questData['visibleObjectives'].length; ++i) {
    var value = questData['visibleObjectives'][i];
    this._questsObjectives[questId].push(value);
  }
  this._questsObjectivesCompleted[questId] = [];
  this._questsObjectivesFailed[questId] = [];
  this._questsRewards[questId] = [];
  for (var i = 0; i < questData['visibleRewards'].length; ++i) {
    var value = questData['visibleRewards'][i];
    this._questsRewards[questId].push(value);
  }
  this._questsRewardsClaimed[questId] = [];
  this._questsRewardsDenied[questId] = [];
  this._questsSubtext[questId] = 1;
  this.questAddCustomEval(questId);
};

Yanfly.Quest.questAdd = 
  JSON.parse(Yanfly.Quest.LunaticMode['Quest Add']);
Game_System.prototype.questAddCustomEval = function(questId) {
  eval(Yanfly.Quest.questAdd);
};

Game_System.prototype.questAddRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var questId = range[i];
    this.questAdd(questId);
  }
};

Game_System.prototype.questRemove = function(questId) {
  this.initQuestSettings();
  if (!this._questsKnown.contains(questId)) return;
  var index = this._questsKnown.indexOf(questId);
  this._questsKnown.splice(index, 1);
  this.questRemoveCustomEval(questId);
};

Yanfly.Quest.questRemove = 
  JSON.parse(Yanfly.Quest.LunaticMode['Quest Remove']);
Game_System.prototype.questRemoveCustomEval = function(questId) {
  eval(Yanfly.Quest.questRemove);
};

Game_System.prototype.questRemoveRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var questId = range[i];
    this.questRemove(questId);
  }
};

Game_System.prototype.questSetCompleted = function(questId) {
  this.initQuestSettings();
  var changed = false;
  if (!this._questsKnown.contains(questId)) this.questAdd(questId);
  if (!this._questsCompleted.contains(questId)) {
    changed = true;
    this._questsCompleted.push(questId);
    this._questsCompleted.sort(function(a, b) {
      return a - b;
    });
  }
  if (this._questsFailed.contains(questId)) {
    var index = this._questsFailed.indexOf(questId);
    this._questsFailed.splice(index, 1);
    this._questsFailed.sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.questSetCompletedEval(questId);
};

Yanfly.Quest.questSetCompleted = 
  JSON.parse(Yanfly.Quest.LunaticMode['Quest Complete']);
Game_System.prototype.questSetCompletedEval = function(questId) {
  eval(Yanfly.Quest.questSetCompleted);
};

Game_System.prototype.questSetCompletedRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var questId = range[i];
    this.questSetCompleted(questId);
  }
};

Game_System.prototype.questSetFailed = function(questId) {
  this.initQuestSettings();
  var changed = false;
  if (!this._questsKnown.contains(questId)) this.questAdd(questId);
  if (!this._questsFailed.contains(questId)) {
    changed = true;
    this._questsFailed.push(questId);
    this._questsFailed.sort(function(a, b) {
      return a - b;
    });
  }
  if (this._questsCompleted.contains(questId)) {
    var index = this._questsCompleted.indexOf(questId);
    this._questsCompleted.splice(index, 1);
    this._questsCompleted.sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.questSetFailedEval(questId);
};

Yanfly.Quest.questSetFailed = 
  JSON.parse(Yanfly.Quest.LunaticMode['Quest Fail']);
Game_System.prototype.questSetFailedEval = function(questId) {
  eval(Yanfly.Quest.questSetFailed);
};

Game_System.prototype.questSetFailedRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var questId = range[i];
    this.questSetFailed(questId);
  }
};

Game_System.prototype.questSetAvailable = function(questId) {
  this.initQuestSettings();
  var changed = false;
  if (!this._questsKnown.contains(questId)) this.questAdd(questId);
  if (this._questsCompleted.contains(questId)) {
    changed = true;
    var index = this._questsCompleted.indexOf(questId);
    this._questsCompleted.splice(index, 1);
    this._questsCompleted.sort(function(a, b) {
      return a - b;
    });
  }
  if (this._questsFailed.contains(questId)) {
    changed = true;
    var index = this._questsFailed.indexOf(questId);
    this._questsFailed.splice(index, 1);
    this._questsFailed.sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.questSetAvailableEval(questId);
};

Yanfly.Quest.questSetAvailable = 
  JSON.parse(Yanfly.Quest.LunaticMode['Quest Available']);
Game_System.prototype.questSetAvailableEval = function(questId) {
  eval(Yanfly.Quest.questSetAvailable);
};

Game_System.prototype.questSetAvailableRange = function(range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var questId = range[i];
    this.questSetAvailable(questId);
  }
};

Game_System.prototype.questChangeDescriptionIndex = function(questId, index) {
  this.initQuestSettings();
  this._questsDescription[questId] = index;
  this.questChangeDescIndexEval(questId, index);
};

Yanfly.Quest.questChangeDescriptionIndex = 
  JSON.parse(Yanfly.Quest.LunaticMode['Change Description']);
Game_System.prototype.questChangeDescIndexEval = function(questId, index) {
  eval(Yanfly.Quest.questChangeDescriptionIndex);
};

Game_System.prototype.questObjectivesShow = function(questId, objectiveId) {
  this.initQuestSettings();
  this._questsObjectives[questId] = this._questsObjectives[questId] || [];
  if (this._questsObjectives[questId].contains(objectiveId)) return;
  this._questsObjectives[questId].push(objectiveId);
  this._questsObjectives[questId].sort(function(a, b) {
    return a - b;
  });
  this.questObjectivesShowEval(questId, objectiveId);
};

Yanfly.Quest.questObjectivesShow = 
  JSON.parse(Yanfly.Quest.LunaticMode['Show Objective']);
Game_System.prototype.questObjectivesShowEval = function(questId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Quest.questObjectivesShow);
};

Game_System.prototype.questObjectivesShowRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.questObjectivesShow(questId, objId);
  }
};

Game_System.prototype.questObjectivesShowAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.questObjectivesShow(questId, i);
  }
};

Game_System.prototype.questObjectivesHide = function(questId, objectiveId) {
  this.initQuestSettings();
  this._questsObjectives[questId] = this._questsObjectives[questId] || [];
  if (!this._questsObjectives[questId].contains(objectiveId)) return;
  var index = this._questsObjectives[questId].indexOf(objectiveId);
  this._questsObjectives[questId].splice(index, 1);
  this._questsObjectives[questId].sort(function(a, b) {
    return a - b;
  });
  this.questObjectivesHideEval(questId, objectiveId);
};

Yanfly.Quest.questObjectivesHide = 
  JSON.parse(Yanfly.Quest.LunaticMode['Hide Objective']);
Game_System.prototype.questObjectivesHideEval = function(questId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Quest.questObjectivesHide);
};

Game_System.prototype.questObjectivesHideRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.questObjectivesHide(questId, objId);
  }
};

Game_System.prototype.questObjectivesHideAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.questObjectivesHide(questId, i);
  }
};

Game_System.prototype.questObjectivesNormal = function(questId, objectiveId) {
  this.initQuestSettings();
  var changed = false;
  this._questsObjectivesCompleted[questId] = 
    this._questsObjectivesCompleted[questId] || [];
  if (this._questsObjectivesCompleted[questId].contains(objectiveId)) {
    changed = true;
    var index = this._questsObjectivesCompleted[questId].indexOf(objectiveId);
    this._questsObjectivesCompleted[questId].splice(index, 1);
    this._questsObjectivesCompleted[questId].sort(function(a, b) {
      return a - b;
    });
  }
  if (this._questsObjectivesFailed[questId].contains(objectiveId)) {
    changed = true;
    var index = this._questsObjectivesFailed[questId].indexOf(objectiveId);
    this._questsObjectivesFailed[questId].splice(index, 1);
    this._questsObjectivesFailed[questId].sort(function(a, b) {
      return a - b;
    });
  }
  this.questObjectivesNormalEval(questId, objectiveId);
};

Yanfly.Quest.questObjectivesNormal = 
  JSON.parse(Yanfly.Quest.LunaticMode['Normalize Objective']);
Game_System.prototype.questObjectivesNormalEval = function(questId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Quest.questObjectivesNormal);
};

Game_System.prototype.questObjectivesNormalRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.questObjectivesNormal(questId, objId);
  }
};

Game_System.prototype.questObjectivesNormalAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.questObjectivesNormal(questId, i);
  }
};

Game_System.prototype.questObjectivesComplete = function(questId, objectiveId) {
  this.initQuestSettings();
  var changed = false;
  this._questsObjectivesCompleted[questId] = 
    this._questsObjectivesCompleted[questId] || [];
  if (!this._questsObjectivesCompleted[questId].contains(objectiveId)) {
    changed = true;
    this._questsObjectivesCompleted[questId].push(objectiveId);
    this._questsObjectivesCompleted[questId].sort(function(a, b) {
      return a - b;
    });
  }
  this._questsObjectivesFailed[questId] = 
    this._questsObjectivesFailed[questId] || [];
  if (this._questsObjectivesFailed[questId].contains(objectiveId)) {
    var index = this._questsObjectivesFailed[questId].indexOf(objectiveId);
    this._questsObjectivesFailed[questId].splice(index, 1);
    this._questsObjectivesFailed[questId].sort(function(a, b) {
      return a - b;
    });
  }
  this.questObjectivesCompleteEval(questId, objectiveId);
};

Yanfly.Quest.questObjectivesComplete = 
  JSON.parse(Yanfly.Quest.LunaticMode['Complete Objective']);
Game_System.prototype.questObjectivesCompleteEval = function(questId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Quest.questObjectivesComplete);
};

Game_System.prototype.questObjectivesCompleteRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.questObjectivesComplete(questId, objId);
  }
};

Game_System.prototype.questObjectivesCompleteAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.questObjectivesComplete(questId, i);
  }
};

Game_System.prototype.questObjectivesFail = function(questId, objectiveId) {
  this.initQuestSettings();
  var changed = false;
  this._questsObjectivesFailed[questId] = 
    this._questsObjectivesFailed[questId] || [];
  if (!this._questsObjectivesFailed[questId].contains(objectiveId)) {
    changed = true;
    this._questsObjectivesFailed[questId].push(objectiveId);
    this._questsObjectivesFailed[questId].sort(function(a, b) {
      return a - b;
    });
  }
  this._questsObjectivesCompleted[questId] = 
    this._questsObjectivesCompleted[questId] || [];
  if (this._questsObjectivesCompleted[questId].contains(objectiveId)) {
    var index = this._questsObjectivesCompleted[questId].indexOf(objectiveId);
    this._questsObjectivesCompleted[questId].splice(index, 1);
    this._questsObjectivesCompleted[questId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.questObjectivesFailEval(questId, objectiveId);
};

Yanfly.Quest.questObjectivesFail = 
  JSON.parse(Yanfly.Quest.LunaticMode['Fail Objective']);
Game_System.prototype.questObjectivesFailEval = function(questId, obj) {
  var objectiveId = obj;
  eval(Yanfly.Quest.questObjectivesFail);
};

Game_System.prototype.questObjectivesFailRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var objId = parseInt(range[i]);
    this.questObjectivesFail(questId, objId);
  }
};

Game_System.prototype.questObjectivesFailAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.objectives.length;
  for (var i = 1; i < length; ++i) {
    this.questObjectivesFail(questId, i);
  }
};

Game_System.prototype.questRewardsShow = function(questId, rewardId) {
  this.initQuestSettings();
  this._questsRewards[questId] = this._questsRewards[questId] || [];
  if (this._questsRewards[questId].contains(rewardId)) return;
  this._questsRewards[questId].push(rewardId);
  this._questsRewards[questId].sort(function(a, b) {
    return a - b;
  });
  this.questRewardsShowEval(questId, rewardId);
};

Yanfly.Quest.questRewardsShow = 
  JSON.parse(Yanfly.Quest.LunaticMode['Show Reward']);
Game_System.prototype.questRewardsShowEval = function(questId, rewardId) {
  eval(Yanfly.Quest.questRewardsShow);
};

Game_System.prototype.questRewardsShowRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.questRewardsShow(questId, rewardId);
  }
};

Game_System.prototype.questRewardsShowAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.questRewardsShow(questId, i);
  }
};

Game_System.prototype.questRewardsHide = function(questId, rewardId) {
  this.initQuestSettings();
  this._questsRewards[questId] = this._questsRewards[questId] || [];
  if (!this._questsRewards[questId].contains(rewardId)) return;
  var index = this._questsRewards[questId].indexOf(rewardId);
  this._questsRewards[questId].splice(index, 1);
  this._questsRewards[questId].sort(function(a, b) {
    return a - b;
  });
  this.questRewardsHideEval(questId, rewardId);
};

Yanfly.Quest.questRewardsHide = 
  JSON.parse(Yanfly.Quest.LunaticMode['Hide Reward']);
Game_System.prototype.questRewardsHideEval = function(questId, rewardId) {
  eval(Yanfly.Quest.questRewardsHide);
};

Game_System.prototype.questRewardsHideRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.questRewardsHide(questId, rewardId);
  }
};

Game_System.prototype.questRewardsHideAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.questRewardsHide(questId, i);
  }
};

Game_System.prototype.questRewardsNormal = function(questId, rewardId) {
  this.initQuestSettings();
  var changed = false;
  this._questsRewardsClaimed[questId] = 
    this._questsRewardsClaimed[questId] || [];
  if (this._questsRewardsClaimed[questId].contains(rewardId)) {
    changed = true;
    var index = this._questsRewardsClaimed[questId].indexOf(rewardId);
    this._questsRewardsClaimed[questId].splice(index, 1);
    this._questsRewardsClaimed[questId].sort(function(a, b) {
      return a - b;
    });
  }
  this._questsRewardsDenied[questId] = 
    this._questsRewardsDenied[questId] || [];
  if (this._questsRewardsDenied[questId].contains(rewardId)) {
    changed = true;
    var index = this._questsRewardsDenied[questId].indexOf(rewardId);
    this._questsRewardsDenied[questId].splice(index, 1);
    this._questsRewardsDenied[questId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.questRewardsNormalEval(questId, rewardId);
};

Yanfly.Quest.questRewardsNormal = 
  JSON.parse(Yanfly.Quest.LunaticMode['Normalize Reward']);
Game_System.prototype.questRewardsNormalEval = function(questId, rewardId) {
  eval(Yanfly.Quest.questRewardsNormal);
};

Game_System.prototype.questRewardsNormalRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.questRewardsNormal(questId, rewardId);
  }
};

Game_System.prototype.questRewardsNormalAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.questRewardsNormal(questId, i);
  }
};

Game_System.prototype.questRewardsClaim = function(questId, rewardId) {
  this.initQuestSettings();
  var changed = false;
  this._questsRewardsClaimed[questId] = 
    this._questsRewardsClaimed[questId] || [];
  if (!this._questsRewardsClaimed[questId].contains(rewardId)) {
    changed = true;
    this._questsRewardsClaimed[questId].push(rewardId);
    this._questsRewardsClaimed[questId].sort(function(a, b) {
      return a - b;
    });
  }
  this._questsRewardsDenied[questId] = 
    this._questsRewardsDenied[questId] || [];
  if (this._questsRewardsDenied[questId].contains(rewardId)) {
    var index = this._questsRewardsDenied[questId].indexOf(rewardId);
    this._questsRewardsDenied[questId].splice(index, 1);
    this._questsRewardsDenied[questId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.questRewardsClaimEval(questId, rewardId);
};

Yanfly.Quest.questRewardsClaim = 
  JSON.parse(Yanfly.Quest.LunaticMode['Claim Reward']);
Game_System.prototype.questRewardsClaimEval = function(questId, rewardId) {
  eval(Yanfly.Quest.questRewardsClaim);
};

Game_System.prototype.questRewardsClaimRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.questRewardsClaim(questId, rewardId);
  }
};

Game_System.prototype.questRewardsClaimAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.questRewardsClaim(questId, i);
  }
};

Game_System.prototype.questRewardsDeny = function(questId, rewardId) {
  this.initQuestSettings();
  var changed = false;
  this._questsRewardsDenied[questId] = 
    this._questsRewardsDenied[questId] || [];
  if (!this._questsRewardsDenied[questId].contains(rewardId)) {
    changed = true;
    this._questsRewardsDenied[questId].push(rewardId);
    this._questsRewardsDenied[questId].sort(function(a, b) {
      return a - b;
    });
  }
  this._questsRewardsClaimed[questId] = 
    this._questsRewardsClaimed[questId] || [];
  if (this._questsRewardsClaimed[questId].contains(rewardId)) {
    var index = this._questsRewardsClaimed[questId].indexOf(rewardId);
    this._questsRewardsClaimed[questId].splice(index, 1);
    this._questsRewardsClaimed[questId].sort(function(a, b) {
      return a - b;
    });
  }
  if (changed) this.questRewardsDenyEval(questId, rewardId);
};

Yanfly.Quest.questRewardsDeny = 
  JSON.parse(Yanfly.Quest.LunaticMode['Deny Reward']);
Game_System.prototype.questRewardsDenyEval = function(questId, rewardId) {
  eval(Yanfly.Quest.questRewardsDeny);
};

Game_System.prototype.questRewardsDenyRange = function(questId, range) {
  var length = range.length;
  for (var i = 0; i < length; ++i) {
    var rewardId = parseInt(range[i]);
    this.questRewardsDeny(questId, rewardId);
  }
};

Game_System.prototype.questRewardsDenyAll = function(questId) {
  this.initQuestSettings();
  var questData = $dataQuests[questId];
  if (!questData) return;
  var length = questData.rewards.length;
  for (var i = 1; i < length; ++i) {
    this.questRewardsDeny(questId, i);
  }
};

Game_System.prototype.questChangeSubtextIndex = function(questId, index) {
  this.initQuestSettings();
  this._questsSubtext[questId] = index;
  this.questChangeSubtextIndexEval(questId, index);
};

Yanfly.Quest.questChangeSubtextIndexEval = 
  JSON.parse(Yanfly.Quest.LunaticMode['Change Subtext']);
Game_System.prototype.questChangeSubtextIndexEval = function(questId, index) {
  eval(Yanfly.Quest.questChangeSubtextIndexEval);
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Game_System Script Calls
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Game_System.prototype.totalQuestsAvailable = function() {
  return this.getQuestsAvailable().length;
};

Game_System.prototype.totalQuestsCompleted = function() {
  return this.getQuestsCompleted().length;
};

Game_System.prototype.totalQuestsFailed = function() {
  return this.getQuestsFailed().length;
};

Game_System.prototype.totalQuestsKnown = function() {
  return this.getAllQuests().length;
};

Game_System.prototype.totalQuestsInGame = function() {
  return Yanfly.Quest.totalCount;
};

Game_System.prototype.totalQuestTypes = function(category, type) {
  return this.getTypeQuests(category, type).length;
};

Game_System.prototype.totalVisibleQuestObjectives = function(questId) {
  return this.getQuestObjectives(questId).length;
};

Game_System.prototype.totalQuestObjectives = function(questId) {
  var questData = $dataQuests[questId];
  if (!questData) return 0;
  return questData.objectives.length;
};

Game_System.prototype.totalVisibleQuestRewards = function(questId) {
  return this.getQuestRewards(questId).length;
};

Game_System.prototype.totalQuestRewards = function(questId) {
  var questData = $dataQuests[questId];
  if (!questData) return 0;
  return questData.rewards.length;
};

Game_System.prototype.isQuestObjectiveCompleted = function(questId, objId) {
  if (this._questsObjectivesCompleted[questId]) {
    return this._questsObjectivesCompleted[questId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isQuestObjectiveFailed = function(questId, objId) {
  if (this._questsObjectivesFailed[questId]) {
    return this._questsObjectivesFailed[questId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isQuestObjectiveUncleared = function(questId, objId) {
  if (this._questsKnown.contains(questId)) {
    return !this.isQuestObjectiveCompleted(questId, objId) &&
      !this.isQuestObjectiveFailed(questId, objId)
  } else {
    return false;
  }
};

Game_System.prototype.isQuestRewardClaimed = function(questId, objId) {
  if (this._questsRewardsClaimed[questId]) {
    return this._questsRewardsClaimed[questId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isQuestRewardDenied = function(questId, objId) {
  if (this._questsRewardsDenied[questId]) {
    return this._questsRewardsDenied[questId].contains(objId);
  } else {
    return false;
  }
};

Game_System.prototype.isQuestRewardUnclaimed = function(questId, objId) {
  if (this._questsKnown.contains(questId)) {
    return !this.isQuestRewardClaimed(questId, objId) &&
      !this.isQuestRewardDenied(questId, objId)
  } else {
    return false;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Quest.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Quest.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'OpenQuestJournal') {
    SceneManager.push(Scene_Quest);
  } else if (command === 'Quest') {
    this.processQuestPluginCommands(this.argsToString(args));
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

Game_Interpreter.prototype.parseNumericRange = function(str) {
  if (str.match(/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)) {
    var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
      parseInt(RegExp.$2));
  } else {
    var range = str.split(',');
    var length = range.length;
    for (var i = 0; i < length; ++i) {
      range[i] = parseInt(range[i]);
    }
  }
  return range;
};

Game_Interpreter.prototype.processQuestPluginCommands = function(line) {
  if (line.match(/EVAL[ ](.*)/i)) {
    eval(RegExp.$1);

  } else if (line.match(/JOURNAL OPEN TO[ ](\d+)/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questAdd(questId);
    $gameTemp.reservedQuestOpen(questId);
    SceneManager.push(Scene_Quest);
  } else if (line.match(/JOURNAL OPEN/i)) {
    SceneManager.push(Scene_Quest);

  } else if (line.match(/JOURNAL SHOW/i)) {
    $gameSystem.setShowQuest(true);
  } else if (line.match(/JOURNAL HIDE/i)) {
    $gameSystem.setShowQuest(false);
  } else if (line.match(/JOURNAL ENABLE/i)) {
    $gameSystem.setEnableQuest(true);
  } else if (line.match(/JOURNAL DISABLE/i)) {
    $gameSystem.setEnableQuest(false);

  } else if (line.match(/SET COMPLETED[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.questSetCompletedRange(range);
  } else if (line.match(/SET FAILED[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.questSetFailedRange(range);
  } else if (line.match(/SET AVAILABLE[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.questSetAvailableRange(range);

  } else if (line.match(/(\d+)[ ]CHANGE DESCRIPTION ENTRY TO[ ](\d+)/i)) {
    var questId = parseInt(RegExp.$1);
    var value = parseInt(RegExp.$2);
    $gameSystem.questChangeDescriptionIndex(questId, value);

  } else if (line.match(/(\d+)[ ]SHOW OBJECTIVE[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questObjectivesShowRange(questId, range);
  } else if (line.match(/(\d+)[ ]SHOW ALL OBJECTIVE/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questObjectivesShowAll(questId);
  } else if (line.match(/(\d+)[ ]HIDE OBJECTIVE[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questObjectivesHideRange(questId, range);
  } else if (line.match(/(\d+)[ ]HIDE ALL OBJECTIVE/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questObjectivesHideAll(questId);
  } else if (line.match(/(\d+)[ ]NORMALIZE OBJECTIVE[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questObjectivesNormalRange(questId, range);
  } else if (line.match(/(\d+)[ ]NORMALIZE ALL OBJECTIVE/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questObjectivesNormalAll(questId);
  } else if (line.match(/(\d+)[ ]COMPLETE OBJECTIVE[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questObjectivesCompleteRange(questId, range);
  } else if (line.match(/(\d+)[ ]COMPLETE ALL OBJECTIVE/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questObjectivesCompleteAll(questId);
  } else if (line.match(/(\d+)[ ]FAIL OBJECTIVE[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questObjectivesFailRange(questId, range);
  } else if (line.match(/(\d+)[ ]FAIL ALL OBJECTIVE/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questObjectivesFailAll(questId);

  } else if (line.match(/(\d+)[ ]SHOW REWARD[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questRewardsShowRange(questId, range);
  } else if (line.match(/(\d+)[ ]SHOW ALL REWARD/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questRewardsShowAll(questId);
  } else if (line.match(/(\d+)[ ]HIDE REWARD[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questRewardsHideRange(questId, range);
  } else if (line.match(/(\d+)[ ]HIDE ALL REWARD/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questRewardsHideAll(questId);
  } else if (line.match(/(\d+)[ ]NORMALIZE REWARD[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questRewardsNormalRange(questId, range);
  } else if (line.match(/(\d+)[ ]NORMALIZE ALL REWARD/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questRewardsNormalAll(questId);
  } else if (line.match(/(\d+)[ ]CLAIM REWARD[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questRewardsClaimRange(questId, range);
  } else if (line.match(/(\d+)[ ]CLAIM ALL REWARD/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questRewardsClaimAll(questId);
  } else if (line.match(/(\d+)[ ]DENY REWARD[ ](.*)/i)) {
    var questId = parseInt(RegExp.$1);
    var range = this.parseNumericRange(String(RegExp.$2));
    $gameSystem.questRewardsDenyRange(questId, range);
  } else if (line.match(/(\d+)[ ]DENY ALL REWARD/i)) {
    var questId = parseInt(RegExp.$1);
    $gameSystem.questRewardsDenyAll(questId);

  } else if (line.match(/(\d+)[ ]CHANGE SUBTEXT ENTRY TO[ ](\d+)/i)) {
    var questId = parseInt(RegExp.$1);
    var value = parseInt(RegExp.$2);
    $gameSystem.questChangeSubtextIndex(questId, value);

  } else if (line.match(/ADD[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.questAddRange(range);

  } else if (line.match(/REMOVE[ ](.*)/i)) {
    var range = this.parseNumericRange(String(RegExp.$1));
    $gameSystem.questRemoveRange(range);

  }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.Quest.Window_MenuCommand_addOriginalCommands =
  Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  Yanfly.Quest.Window_MenuCommand_addOriginalCommands.call(this);
  this.addQuestCommand();
};

Window_MenuCommand.prototype.addQuestCommand = function() {
  if (!Yanfly.Param.QuestCmdPlace) return;
  if (!$gameSystem.isShowQuest()) return;
  if (this.findSymbol('quest') > -1) return;
  var text = Yanfly.Param.QuestCmdName;
  var enabled = $gameSystem.isEnableQuest();
  this.addCommand(text, 'quest', enabled);
};

//=============================================================================
// Window_QuestData
//=============================================================================

function Window_QuestData() {
  this.initialize.apply(this, arguments);
};

Window_QuestData.prototype = Object.create(Window_Selectable.prototype);
Window_QuestData.prototype.constructor = Window_QuestData;

Window_QuestData.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  this._allTextHeight = 0;
  this._countdown = 0;
  this._arrowBlinkTimer = 0;
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.setQuestId(0);
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
};

Window_QuestData.prototype.settings = function(key) {
  return Yanfly.Param.QuestDataWindow[key];
};

Window_QuestData.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_QuestData.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_QuestData.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_QuestData.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_QuestData.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_QuestData.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_QuestData.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_QuestData.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_QuestData.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_QuestData.prototype.delayLoadFrames = function() {
  if (this._delayLoad === undefined) {
    this._delayLoad = Math.round(eval(this.settings('Load Delay')));
  }
  return this._delayLoad;
};

Window_QuestData.prototype.setQuestId = function(id) {
  if (this._questId !== id) {
    this._questId = id;
    this._countdown = 30;
    this.refresh();
  }
};

Window_QuestData.prototype.refresh = function() {
  if (this._countdown > 0) return;
  this.contents.clear();
  this._lastOriginY = -200;
  this.origin.y = 0;
  this._allTextHeight = 0;
  if (this._questId > 0) {
    this.drawQuestData();
  } else {
    this.drawEmpty();
  }
};

Window_QuestData._questNoDataFmt = 
  JSON.parse(Yanfly.Param.QuestDataWindow['No Data Text'] || "");

Window_QuestData.prototype.drawEmpty = function() {
  var fmt = Window_QuestData._questNoDataFmt;
  var wordwrap = fmt.match(/<(?:WordWrap)>/i);
  var text = fmt.format();
  var textState = { index: 0 };
  textState.originalText = text;
  textState.text = this.convertEscapeCharacters(text);
  this.resetFontSettings();
  this._allTextHeight = this.calcTextHeight(textState, true);
  this._allTextHeight *= (wordwrap) ? 10 : 1;
  this.createContents();
  this.drawQuestTextEx(text, 0, 0);
};

Window_QuestData.prototype.drawQuestData = function() {
  Window_QuestData._questDataFmt = 
    JSON.parse(Yanfly.Param.QuestDataWindow['Quest Data Format'] || "");
  var questData = $dataQuests[this._questId];
  if (!questData) return;
  var fmt = Window_QuestData._questDataFmt;
  var wordwrap = fmt.match(/<(?:WordWrap)>/i);
  var title = questData.name;
  title = title.replace(/\\I\[(\d+)\]/gi, '').trim();
  title = title.replace(/\\C\[(\d+)\]/gi, '').trim();
  var difficulty = questData.difficulty;
  var from = questData.from;
  var location = questData.location;
  var description = this.getQuestDescription();
  var objectives = this.getQuestObjectives(wordwrap);
  var rewards = this.getQuestRewards(wordwrap);
  var subtext = this.getQuestSubtext();
  var text = fmt.format(title, difficulty, from, location, description,
    objectives, rewards, subtext);
  var textState = { index: 0 };
  textState.originalText = text;
  textState.text = this.convertEscapeCharacters(text);
  this.resetFontSettings();
  this._allTextHeight = this.calcTextHeight(textState, true);
  this._allTextHeight *= (wordwrap) ? 10 : 1;
  this.createContents();
  this.drawQuestTextEx(text, 0, 0);
};

Window_QuestData.prototype.drawQuestTextEx = function(text, x, y) {
  if (text) {
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    this.resetFontSettings();
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    this._allTextHeight = textState.y - y + this.lineHeight();
    return textState.x - x;
  } else {
    return 0;
  }
};

Window_QuestData.prototype.getQuestDescription = function() {
  var questData = $dataQuests[this._questId];
  var index = $gameSystem.getQuestDescriptionIndex(this._questId);
  return JSON.parse(questData.description[index]);
};

Window_QuestData.prototype.getQuestObjectives = function(wordwrap) {
  var questData = $dataQuests[this._questId];
  var lineData = questData.objectives;
  var visibleObjectives = $gameSystem.getQuestObjectives(this._questId);
  var length = visibleObjectives.length;
  var text = '';
  for (var i = 0; i < length; ++i) {
    if (i > 0) text += wordwrap ? '<br>' : '\n';
    var objectiveId = visibleObjectives[i];
    var key = $gameSystem.getQuestObjectiveStatus(this._questId, objectiveId);
    var fmt = this.settings(key);
    text += fmt.format(JSON.parse(lineData[objectiveId]));
  }
  return text;
};

Window_QuestData.prototype.getQuestRewards = function(wordwrap) {
  var questData = $dataQuests[this._questId];
  var lineData = questData.rewards;
  var visibleRewards = $gameSystem.getQuestRewards(this._questId);
  var length = visibleRewards.length;
  var text = '';
  for (var i = 0; i < length; ++i) {
    if (i > 0) text += wordwrap ? '<br>' : '\n';
    var rewardId = visibleRewards[i];
    var key = $gameSystem.getQuestRewardStatus(this._questId, rewardId);
    var fmt = this.settings(key);
    text += fmt.format(JSON.parse(lineData[rewardId]));
  }
  return text;
};

Window_QuestData.prototype.getQuestSubtext = function() {
  var questData = $dataQuests[this._questId];
  var index = $gameSystem.getQuestSubtextIndex(this._questId);
  return JSON.parse(questData.subtext[index]);
};

Window_QuestData.prototype.select = function(index) {
};

Window_QuestData.prototype.contentsHeight = function() {
  var standard = this.height - this.standardPadding() * 2;
  return Math.max(standard, this._allTextHeight);
};

Window_QuestData.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this.updateCountdown();
  if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_QuestData.prototype.updateCountdown = function() {
  if (this._countdown > 0) {
    this._countdown -= 1;
    if (this._countdown <= 0) this.refresh();
  }
};

Window_QuestData.prototype.scrollSpeed = function() {
  if (this._scrollSpeed === undefined) {
    this._scrollSpeed = Number(this.settings('Scroll Speed'));
  }
  return this._scrollSpeed;
};

Window_QuestData.prototype.scrollOriginDown = function(speed) {
  var value = this.contentsHeight() - this.height + 
    this.standardPadding() * 2;
  this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_QuestData.prototype.scrollOriginUp = function(speed) {
  this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_QuestData.prototype.updateKeyScrolling = function() {
  if (Input.isPressed('up')) {
    this.scrollOriginUp(this.scrollSpeed());
  } else if (Input.isPressed('down')) {
    this.scrollOriginDown(this.scrollSpeed());
  } else if (Input.isPressed('pageup')) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  } else if (Input.isPressed('pagedown')) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
};

Window_QuestData.prototype.updateArrows = function() {
  if (this._lastOriginY === this.origin.y) return;
  this.showArrows();
};

Window_QuestData.prototype.showArrows = function() {
  this._lastOriginY = this.origin.y;
  this.upArrowVisible = this.origin.y !== 0;
  this.downArrowVisible = this.origin.y !== this.contentsHeight() -
    this.height + this.standardPadding() * 2;
};

Window_QuestData.prototype.hideArrows = function() {
  this.upArrowVisible = false;
  this.downArrowVisible = false;
};

Window_QuestData.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_QuestData.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
  if (TouchInput.wheelY <= -threshold) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  }
};

//=============================================================================
// Window_QuestTitle
//=============================================================================

function Window_QuestTitle() {
  this.initialize.apply(this, arguments);
};

Window_QuestTitle.prototype = Object.create(Window_Base.prototype);
Window_QuestTitle.prototype.constructor = Window_QuestTitle;

Window_QuestTitle.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.setText(this.settings('No Quest Title'));
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
};

Window_QuestTitle.prototype.settings = function(key) {
  return Yanfly.Param.QuestTitleWindow[key];
};

Window_QuestTitle.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_QuestTitle.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_QuestTitle.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_QuestTitle.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_QuestTitle.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_QuestTitle.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_QuestTitle.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_QuestTitle.prototype.itemTextAlign = function() {
    return this.settings('Text Alignment')
};

Window_QuestTitle.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_QuestTitle.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_QuestTitle.prototype.setText = function(text) {
  if (this._text !== text) {
    this._text = text;
    this.refresh();
  }
};

Window_QuestTitle.prototype.refresh = function() {
  this.contents.clear();
  var align = this.settings('Text Alignment');
  var wx = 0;
  var ww = this.contents.width;
  if (align === 'left') {
    wx = this.textPadding();
  } else if (align === 'center') {
    wx += (ww - this.textWidthEx(this._text)) / 2;
  } else {
    wx += ww - this.textWidthEx(this._text) - this.textPadding();
  }
  this.drawTextEx(this._text, wx, 0);
};

Window_QuestTitle.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_QuestCategories
//=============================================================================

function Window_QuestCategories() {
  this.initialize.apply(this, arguments);
};

Window_QuestCategories.prototype = Object.create(Window_Command.prototype);
Window_QuestCategories.prototype.constructor = Window_QuestCategories;

Window_QuestCategories.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  Window_Command.prototype.initialize.call(this, x, y);
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
};

Window_QuestCategories.prototype.settings = function(key) {
  return Yanfly.Param.QuestCategoryWindow[key];
};

Window_QuestCategories.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_QuestCategories.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_QuestCategories.prototype.numVisibleRows = function() {
  if (this._windowRows === undefined) {
    this._windowRows = Math.round(eval(this.settings('Rows')));
  }
  return this._windowRows;
};

Window_QuestCategories.prototype.maxCols = function() {
  if (this._windowColumns === undefined) {
    this._windowColumns = Math.round(eval(this.settings('Columns')));
  }
  return this._windowColumns;
};

Window_QuestCategories.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_QuestCategories.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_QuestCategories.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_QuestCategories.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_QuestCategories.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_QuestCategories.prototype.itemTextAlign = function() {
    return this.settings('Text Alignment')
};

Window_QuestCategories.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_QuestCategories.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_QuestCategories.prototype.makeCommandList = function() {
  var list = JSON.parse(this.settings('Category Order'));
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var listItem = list[i];
    switch (listItem) {
    case 'available':
      var fmt = this.settings('Available Text');
      var number = $gameSystem.totalQuestsAvailable();
      break;
    case 'completed':
      var fmt = this.settings('Completed Text');
      var number = $gameSystem.totalQuestsCompleted();
      break;
    case 'failed':
      var fmt = this.settings('Failed Text');
      var number = $gameSystem.totalQuestsFailed();
      break;
    case 'all':
      var fmt = this.settings('All Text');
      var number = $gameSystem.totalQuestsKnown();
      break;
    case 'cancel':
      var text = this.settings('Cancel Text');
      this.addCommand(text, 'cancel');
      continue;
      break;
    }
    number = Yanfly.Util.toGroup(number);
    var text = fmt.format(number);
    this.addCommand(text, 'category', true, listItem);
  }
};

Window_QuestCategories.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var text = this.commandName(index);
  var align = this.settings('Text Alignment');
  var wx = 0;
  var ww = rect.width;
  if (align === 'left') {
    wx = rect.x;
  } else if (align === 'center') {
    wx += (ww - this.textWidthEx(text)) / 2;
  } else {
    wx += ww - this.textWidthEx(text) - this.textPadding();
  }
  this.drawTextEx(text, wx, rect.y);
};

Window_QuestCategories.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

Window_QuestCategories.prototype.setListWindow = function(win) {
  this._listWindow = win;
};

Window_QuestCategories.prototype.update = function() {
  Window_Command.prototype.update.call(this);
  if (this._listWindow) this._listWindow.setCategoryType(this.currentExt());
};

Window_QuestCategories.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_QuestCategories.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) this.scrollDown();
  if (TouchInput.wheelY <= -threshold) this.scrollUp();
};

//=============================================================================
// Window_QuestList
//=============================================================================

function Window_QuestList() {
  this.initialize.apply(this, arguments);
};

Window_QuestList.prototype = Object.create(Window_Command.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;

Window_QuestList.prototype.initialize = function(cw, dw, tw) {
  this._currentCategory =
    JSON.parse(Yanfly.Param.QuestCategoryWindow['Category Order'])[0];
  this._closedQuestTypes = [];
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = Math.round(eval(this.settings('X')));
  var y = Math.round(eval(this.settings('Y')));
  this._dataWindow = dw;
  this._titleWindow = tw;
  this._mode = 'Quest';
  Window_Command.prototype.initialize.call(this, x, y);
  cw.setListWindow(this);
  this.opacity = Math.round(eval(this.settings('Standard Opacity')));
  this.deselect();
  this.deactivate();
};

Window_QuestList.prototype.settings = function(key) {
  return Yanfly.Param.QuestListWindow[key];
};

Window_QuestList.prototype.windowWidth = function() {
  if (this._windowWidth === undefined) {
    this._windowWidth = Math.round(eval(this.settings('Width')));
  }
  return this._windowWidth;
};

Window_QuestList.prototype.windowHeight = function() {
  if (this._windowHeight === undefined) {
    this._windowHeight = Math.round(eval(this.settings('Height')));
  }
  return this._windowHeight;
};

Window_QuestList.prototype.maxCols = function() {
  return 1;
};

Window_QuestList.prototype.lineHeight = function() {
  if (this._windowLineHeight === undefined) {
    this._windowLineHeight = parseInt(this.settings('Line Height'));
  }
  return this._windowLineHeight;
};

Window_QuestList.prototype.standardFontFace = function() {
  if (this._windowFontFace === undefined) {
    this._windowFontFace = this.settings('Font Face');
  }
  return this._windowFontFace;
};

Window_QuestList.prototype.standardFontSize = function() {
  if (this._windowFontSize === undefined) {
    this._windowFontSize = Math.round(eval(this.settings('Font Size')));
  }
  return this._windowFontSize;
};

Window_QuestList.prototype.standardPadding = function() {
  if (this._windowStandardPadding === undefined) {
    this._windowStandardPadding = 
      Math.round(eval(this.settings('Standard Padding')));
  }
  return this._windowStandardPadding;
};

Window_QuestList.prototype.textPadding = function() {
  if (this._windowTextPadding === undefined) {
    this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
  }
  return this._windowTextPadding;
};

Window_QuestList.prototype.standardBackOpacity = function() {
  if (this._windowBackOpacity === undefined) {
    this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
  }
  return this._windowBackOpacity;
};

Window_QuestList.prototype.loadWindowskin = function() {
  this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
};

Window_QuestList.prototype.itemTextAlign = function() {
    return this.settings('Quest Alignment')
};

Window_QuestList.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var text = this.commandName(index);
  var symbol = this.commandSymbol(index);
  this.changePaintOpacity(this.isCommandEnabled(index));
  if (symbol === 'type') {
    var align = this.settings('Type Alignment');
  } else {
    var align = this.settings('Quest Alignment');
    var indent = parseInt(this.settings('Quest Indent'));
    rect.x += indent;
    rect.width -= indent;
  }
  var wx = 0;
  var ww = rect.width;
  if (align === 'left') {
    wx = rect.x;
  } else if (align === 'center') {
    wx += (ww - this.textWidthEx(text)) / 2;
  } else {
    wx += ww - this.textWidthEx(text) - this.textPadding();
  }
  this.drawTextEx(text, wx, rect.y);
};

Window_QuestList.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

Window_QuestList.prototype.setCategoryType = function(category) {
  if (this._currentCategory !== category) {
    this._currentCategory = category;
    this.refresh();
    this.resetScroll();
    this.deselect();
    this.update();
  }
};

Window_QuestList.prototype.showType = function() {
  if (this._settingsShowType === undefined) {
    this._settingsShowType = Math.round(eval(this.settings('Show Types')));
  }
  return this._settingsShowType;
};

Window_QuestList.prototype.showEmptyTypes = function() {
  if (this._showEmpty === undefined) {
    this._showEmpty = eval(this.settings('Show Empty'));
  }
  return this._showEmpty;
};

Window_QuestList.prototype.setMode = function(mode) {
  if (mode === 'Extra') {
    this._prevTopRow = this.topRow();
    this._prevIndex = this.index();
    this._forcedExt = this.currentExt();
    this.setTopRow(0);
  } else {
    this._forcedExt = undefined;
  }
  this._mode = mode;
  this.refresh();
  this.activate();
  if (mode === 'Extra') {
    this.select(0);
  } else {
    this.select(this._prevIndex);
    this.setTopRow(this._prevTopRow);
  }
};

Window_QuestList.prototype.currentExt = function() {
  return this._forcedExt || Window_Command.prototype.currentExt.call(this);
};

Window_QuestList.prototype.makeCommandList = function() {
  if (this._mode === 'Quest') {
    this.makeQuestList();
  } else {
    this.makeExtraList();
  }
};

Window_QuestList.prototype.makeQuestList = function() {
  if (this.showType()) {
    var list = JSON.parse(this.settings('Type Order'));
    var length = list.length;
    for (var i = 0; i < length; ++i) {
      var listItem = list[i];
      var fmt = this.settings('Type Text Format');
      var type = listItem.replace(/\\I\[(\d+)\]/gi, '').trim();
      var type = listItem.replace(/\\C\[(\d+)\]/gi, '').trim();
      if (this._closedQuestTypes.contains(type)) {
        var closed = this.settings('List Closed Symbol');
      } else {
        var closed = this.settings('List Open Symbol');
      }
      var number = $gameSystem.getTypeQuests(this._currentCategory,
        type).length;
      if (!this.showEmptyTypes() && number <= 0) continue;
      number = Yanfly.Util.toGroup(number);
      var text = fmt.format(closed, listItem, number);
      this.addCommand(text, 'type', true, type);
      if (!this._closedQuestTypes.contains(type)) {
        this.addQuestCommands(this._currentCategory, type);
      }
    }
  } else {
    this.addQuestCommands(this._currentCategory)
  }
};

Window_QuestList.prototype.makeExtraList = function() {
  this.addReadQuestCommand();
  this.makeExtraListA();
  this.makeExtraListB();
  this.makeExtraListC();
  this.makeExtraListD();
  this.makeExtraListE();
  this.makeExtraListF();
  this.addCancelCommand();
};

Window_QuestList.prototype.addReadQuestCommand = function() {
  var text = this.settings('Read Quest') || '\\i[121]Read Quest';
  this.addCommand(text, 'readQuest');
};

Window_QuestList.prototype.addCancelCommand = function() {
  var text = this.settings('Cancel') || '\\i[16]Cancel';
  this.addCommand(text, 'cancel');
};

Window_QuestList.prototype.makeExtraListA = function() {
};

Window_QuestList.prototype.makeExtraListB = function() {
};

Window_QuestList.prototype.makeExtraListC = function() {
};

Window_QuestList.prototype.makeExtraListD = function() {
};

Window_QuestList.prototype.makeExtraListE = function() {
};

Window_QuestList.prototype.makeExtraListF = function() {
};

Window_QuestList.prototype.addQuestCommands = function(category, type) {
  category = category || this._currentCategory;
  type = type || '';
  var list = $gameSystem.getTypeQuests(category, type);
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var questId = list[i];
    var questData = $dataQuests[questId];
    if (!questData) continue;
    var text = questData.name;
    this.addCommand(text, 'quest', true, questId);
  }
};

Window_QuestList.prototype.update = function() {
  Window_Command.prototype.update.call(this);
  if (this._dataWindow) {
    if (this.currentSymbol() === 'quest' || this._mode === 'Extra') {
      this._dataWindow.setQuestId(this.currentExt());
    } else {
      this._dataWindow.setQuestId(0);
    }
  }
  if (this._titleWindow) {
    if (this.currentSymbol() === 'quest' || this._mode === 'Extra') {
      this._titleWindow.setText($dataQuests[this.currentExt()].name);
    } else {
      this._titleWindow.setText(this._titleWindow.settings('No Quest Title'));
    }
  }
};

Window_QuestList.prototype.typeToggle = function(type) {
  if (this._closedQuestTypes.contains(type)) {
    var index = this._closedQuestTypes.indexOf(type);
    this._closedQuestTypes.splice(index, 1);
  } else {
    this._closedQuestTypes.push(type);
  }
  this.refresh();
};

Window_QuestList.prototype.getVisibleRows = function() {
  var value = this.height - (this.standardPadding() * 2);
  value = Math.floor(value / this.lineHeight());
  return value;
};

Window_QuestList.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Window_QuestList.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) this.scrollDown();
  if (TouchInput.wheelY <= -threshold) this.scrollUp();
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.Quest.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  Yanfly.Quest.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler('quest', this.commandQuest.bind(this));
};

Scene_Menu.prototype.commandQuest = function() {
  SceneManager.push(Scene_Quest);
};

//=============================================================================
// Scene_Quest
//=============================================================================

function Scene_Quest() {
  this.initialize.apply(this, arguments);
};

Scene_Quest.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Quest.prototype.constructor = Scene_Quest;

Scene_Quest.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Quest.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.runCustomCode(Yanfly.Quest.createBefore);
  this.createDataWindow();
  this.createTitleWindow();
  this.createCategoryWindow();
  this.createListWindow();
  this.processQuestOpen();
  this.runCustomCode(Yanfly.Quest.createAfter);
};

Yanfly.Quest.createBefore = 
  JSON.parse(Yanfly.Quest.LunaticMode['Before Create Windows']);
Yanfly.Quest.createAfter = 
  JSON.parse(Yanfly.Quest.LunaticMode['After Create Windows']);
Yanfly.Quest.terminateMenu = 
  JSON.parse(Yanfly.Quest.LunaticMode['Close Quest Menu']);

Scene_Quest.prototype.runCustomCode = function(code) {
  var background = this._backgroundSprite;
  var windowLayer = this._windowLayer;
  eval(code);
};

Scene_Quest.prototype.createDataWindow = function() {
  this._dataWindow = new Window_QuestData();
  this._dataWindow.setHandler('cancel', this.onDataCancel.bind(this));
  this.addWindow(this._dataWindow);
};

Scene_Quest.prototype.createTitleWindow = function() {
  this._titleWindow = new Window_QuestTitle();
  this.addWindow(this._titleWindow);
};

Scene_Quest.prototype.createCategoryWindow = function() {
  this._categoryWindow = new Window_QuestCategories();
  this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
  this._categoryWindow.setHandler('category', this.onCategoryOk.bind(this));
  this.addWindow(this._categoryWindow);
};

Scene_Quest.prototype.createListWindow = function() {
  this._listWindow = new Window_QuestList(this._categoryWindow, 
    this._dataWindow, this._titleWindow);
  this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
  this._listWindow.setHandler('type', this.onListTypeToggle.bind(this));
  this._listWindow.setHandler('quest', this.onListQuest.bind(this));
  this._listWindow.setHandler('readQuest', this.dataWindowActivate.bind(this));
  this.addWindow(this._listWindow);
};

Scene_Quest.prototype.onCategoryCancel = function() {
  this.runCustomCode(Yanfly.Quest.terminateMenu);
  this.popScene();
};

Scene_Quest.prototype.onCategoryOk = function() {
  this._listWindow.activate();
  if (this._listWindow.index() < 0) this._listWindow.select(0);
};

Scene_Quest.prototype.isQuestExtraCommand = function() {
  return false;
};

Scene_Quest.prototype.onListCancel = function() {
  if (this._listWindow._mode === 'Extra') {
    this._listWindow.setMode('Quest');
  } else {
    this._categoryWindow.activate();
  }
};

Scene_Quest.prototype.onListTypeToggle = function() {
  this._listWindow.activate();
  this._listWindow.typeToggle(this._listWindow.currentExt());
};

Scene_Quest.prototype.onListQuest = function() {
  if (this.isQuestExtraCommand()) {
    this._listWindow.setMode('Extra');
  } else {
    this.dataWindowActivate();
  }
};

Scene_Quest.prototype.dataWindowActivate = function() {
  this._dataWindow.activate();
};

Scene_Quest.prototype.onDataCancel = function() {
  if (this._dataWindow._mode === 'Extra') {
    this._listWindow.setMode('Quest');
  } else {
    this._dataWindow.deactivate();
    this._listWindow.activate();
  }
};

Scene_Quest.prototype.processQuestOpen = function() {
  var questId = $gameTemp.getQuestOpen();
  if (questId) {
    var categoryOrder = this.getQuestOpenCategories();
    var length = categoryOrder.length;
    for (var i = 0; i < length; ++i) {
      var category = categoryOrder[i];
      var index = this._categoryWindow.findExt(category);
      if (index >= 0) break;
    }
    this._categoryWindow.selectExt(index);
    this.onCategoryOk();
    this._categoryWindow.deactivate();
    this._listWindow.selectExt(questId);
    this.onListQuest();
    this._listWindow.deactivate();
    this._listWindow.setTopRow(this._listWindow.findExt(questId));
    var scrollTimes = Math.floor(this._listWindow.getVisibleRows() / 2);
    while (scrollTimes--) { 
      this._listWindow.scrollUp();
    }
    this._listWindow.ensureCursorVisible();
    this._listWindow.updateCursor();
  }
  $gameTemp.clearQuestOpen();
};

Scene_Quest.prototype.getQuestOpenCategories = function() {
  return ['available', 'completed', 'failed', 'all'];
};

// Custom Code

Scene_Quest.prototype.centerSprite = function(sprite) {
  sprite.x = Graphics.width / 2;
  sprite.y = Graphics.height / 2;
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
};

Scene_Quest.prototype.fitScreen = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) {
    return setTimeout(this.fitScreen.bind(this, sprite), 5);
  }
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) sprite.scale.x = ratioX;
  if (ratioY > 1.0) sprite.scale.y = ratioY;
  this.centerSprite(sprite);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
};

}; // Yanfly.Util.toGroup

Yanfly.Util.getRange = function(n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};

//=============================================================================
// End of Main Functions
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_QuestJournal while your project files are lower than version ';
text += '1.5.0.\n\nPlease visit this thread for instructions on how to update ';
text += 'your project files to 1.5.0 or higher: \n\n';
text += 'https://forums.rpgmakerweb.com/index.php?threads/';
text += 'rpg-maker-mv-1-5-0-update.79677/';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0')
//=============================================================================
// End of File
//=============================================================================