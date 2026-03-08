/*:
* @target MV MZ
* @plugindesc (v1.08)抽奖核心
* @author 小c
* @version 1.0.8
* @date 3/30/2022
*
* @command StartLottery
* @text 开始抽奖
*
* @command LotteryPool
* @text 操作奖池
*
* @arg opt
* @text 指令
* @type select
* @option 添加
* @value add
* @option 移除
* @value remove
* @default add
*
* @arg poolId
* @text 奖池id
* @type number
* @min 1
* @default 1
*
* @command LotteryLog
* @text 显示抽奖记录
*
* @arg poolId
* @text 奖池id
* @type number
* @min 1
* @default 1
*
* @param Data
* @text ===数据===
*
* @param Pools
* @parent Data
* @text 奖池列表
* @type struct<lotteryPool>[]
* @default []
* @desc 各个奖池id从1起，第一个奖池id=1，第二个id=2，以此类推
*
* @param Default Pools List
* @parent Data
* @text 默认可见奖池
* @type number[]
* @default []
* @desc 初始可见的奖池id列表
*
* @param View
* @text ===界面===
*
* @param Lottery Animation
* @parent View
* @text 单抽抽奖动画
* @type animation
* @default 0
* @desc 值若为0，没有动画
*
* @param Muti Lottery Animation
* @parent View
* @text 多抽抽奖动画
* @type animation
* @default 0
* @desc 值若为0，没有动画
*
* @param Lottery Animation Mirror
* @parent View
* @text 动画是否镜像
* @type boolean
* @on 是
* @off 否
* @default false
*
* @param Lottery Animation Offset X
* @parent View
* @text 动画偏移X
* @type number
* @min -65535
* @default 0
* @desc 非画面型动画生效，当动画偏移为(0,0)时，动画在屏幕正中间，X越大越靠右
*
* @param Lottery Animation Offset Y
* @parent View
* @text 动画偏移Y
* @type number
* @min -65535
* @default 0
* @desc 非画面型动画生效，当动画偏移为(0,0)时，动画在屏幕正中间，Y越大越靠下
*
* @param Select Pool Command
* @parent View
* @text 选择奖池命令名称
* @default 选择奖池
*
* @param Simple Command
* @parent View
* @text 单抽指令名称
* @default 单抽
*
* @param Repeat Command
* @parent View
* @text 多抽指令名称
* @default 十连抽
*
* @param Repeat Count
* @parent View
* @text 多抽次数
* @type number
* @min 2
* @default 10
*
* @param Cancel Command
* @parent View
* @text 取消指令名称
* @default 取消
*
* @param Current Pool Color
* @parent View 
* @text 当前奖池字体颜色
* @type number
* @default 6
*
* @param Data Title Format
* @parent View
* @text 奖池信息标题格式
* @desc %1-奖池名称 %2-保底描述 %3-当前次数 %4-保底次数
* @default %1 (%2: %3 / %4)
*
* @param Pool Cost Info
* @parent View
* @text 奖池消耗说明
* @default 需要道具：
*
* @param Pool Safe Text
* @parent View
* @text 保底描述
* @default 保底
*
* @param Show Lottery Rate
* @parent View
* @text 显示概率
* @type boolean
* @on 显示
* @off 不显示
* @default true
*
* @param Lottery Rate Count
* @parent View
* @text 概率位数
* @type number
* @default 1
* @desc 显示概率时的小数位数，0表示整数百分比
*
* @param Data Rate X Offset
* @parent View
* @text 概率显示X偏移量
* @type number
* @min 0
* @default 0
* @desc 此值越大，概率显示越偏左，取0时最偏右，但不可超过项目显示范围。
*
* @param Show Safe Info
* @parent View
* @text 显示保底信息
* @type boolean
* @on 显示
* @off 不显示
* @default true
*
* @param Safe Info Text
* @parent View
* @text 保底文字
* @default [保底]
*
* @param Single Info Text
* @parent View
* @text 已获得保底文字
* @default [已获得]
* @desc 当奖池保底值获得一次时，已获得的保底物品提示
*
* @param Safe Info Size
* @parent View
* @text 保底文字大小
* @type number
* @min 1
* @default 28
*
* @param Safe Info Offset X
* @parent View
* @text 保底文字X偏移
* @type number
* @min -65535
* @default 10
*
* @param Safe Info Offset Y
* @parent View
* @text 保底文字Y偏移
* @type number
* @min -65535
* @default 0
*
* @param Data Scroll Count
* @parent View
* @text 奖品滚动频率
* @type number
* @min 1
* @default 60
* @desc 信息框奖品滚动频率，单位：帧
*
* @param Data Reset Scroll Times
* @parent View
* @text 重置滚动等待次数
* @type number
* @min 0
* @default 2
* @desc 当滚到底时，再经过几次滚动的时间重置回顶部
*
* @param Result Text
* @parent View
* @text 结果标题
* @default 抽奖结果：
*
* @param Lottery Command Name
* @parent View
* @text 主菜单抽奖指令名
* @default 抽奖
*
* @param Main Show Lottery
* @parent View
* @text 主菜单显示抽奖
* @type boolean
* @on 显示
* @off 不显示
* @default false
*
* @param Lottery Log Title
* @parent View
* @text 抽奖记录标题
* @default %1 抽奖记录（已抽%2次）
* @desc %1-奖池名称 %2-已抽次数
*
* @help
* 抽奖核心，使玩家可以执行抽奖
* 抽奖执行伪随机算法，SL无效
*
* 若更新至1.02版，请留意插件参数
* 建议在插件管理器中点进本插件，确认所有参数后【确定】，保存
* 本插件的1.03版开始，支持RPG MAKER MZ
* 1.03追加保底奖品提示
* 1.05追加概率位数参数，请及时确认所有参数后【确定】【保存】
* 1.07追加插件参数，请确认所有插件参数后保存
* 1.07在奖池配置中新增【保底获得一次】参数，请及时补充配置
* MZ的插件指令会对MV的插件参数有干扰，在VZ通用时，指令应 放在参数上方
*
* 插件参数-奖池的配置说明
* 奖池列表中奖池的配置方法
* 1. 奖池名称：显示在奖池列表中的名称
* 2. 抽奖物品：该奖池所使用的抽奖物品
* 3. 保底次数：该奖池的保底次数，满足保底时会得到保底物品，设为0没有保
* 底。
* 4. 保底获得一次：该奖池保底物品是否只获得一次，若设为true，所有保底
* 物品只会抽中一次。
* 5. 奖池
* （1）物品、武器、防具三者只配其一。
* （2）概率：该物品的抽奖概率，此为【相对概率】。
* （3）保底物品：设置该物品为保底。
*
* 关于【相对概率】
* 同一个奖池中的所有物品，其概率以加权平均的方法运算
* 举例：该奖池有物品ABC，概率分别为【A：3，B：1，C：1】，实际概率为：
* A：60%（3/5），B：20%（1/5），C：20%（1/5）
*
* 即：设奖池中有n个物品，记为A[i]，每个物品的相对概率记为a[i]，此处
* i = 1,2,..,n
* 则物品A[i]被抽中的概率公式为
*                   n
* P(A[i]) = a[i] / (Σa[k])
*                  k=1
* 上述公式中a[i]的值即是参数中的概率取值
*
* 关于【相对概率的设置方法】
* 如果你希望有比较准确的实际抽奖概率百分比，建议使用以下方法
* 准备工具：Excel演算表
* 首先，决定好所有项目的相对概率总和为一个定值，比如10000
* 然后开始对每一项设置概率
* 比如说，大保底 倚天剑，概率为1，那么他的实际抽奖百分比概率即为0.01%
* 在已知概率总和的条件下，要指定相对概率就想对简单了
* 相对概率=相对概率总和×物品百分比概率
* 注意：当你向已配置完成的奖池中引入新物品时，请保证相对概率总和不变
* 而相对概率之和这个定值的指定，和你预计概率最小值有关
* 比如说倚天剑是概率最低的0.01%，也就是万分之一，那么，总和就可以定
* 为10000
* 此时倚天剑相对概率为1，其他物品以他为准是他的若干倍，最终保证总和
* 为10000即可
*
* 关于【保底】
* 玩家平时抽奖时，在该奖池的所有奖品中随机产生结果
* 保底条件：若该奖池保底次数大于0，当抽奖次数大于保底次数时满足条件，
* 其他情况一律不满足条件
* 当达到保底条件时，将在该奖池内的所有保底奖品【保底为true的所有奖品】
* 中随机获取一个，即若有多个保底，获得的保底物品也是随机的
* 如果该奖池有保底次数设置却没有保底奖品，达到保底次数时会出错
* 因此若该奖池没有保底奖品，该奖池的保底次数务必设置为0
*
* 关于【默认可见奖池】
* 玩家进入抽奖界面时默认可见的奖池
*
* 进入抽奖界面，可通过主菜单选择
* 也使用插件指令：StartLottery
*
* 添加奖池，插件指令：LotteryPool add id
* 移除奖池，插件指令：LotteryPool remove id
* 例子：
* LotteryPool add 3 添加3号奖池进入列表
* LotteryPool remove 1 从列表移除1号奖池
*
* 查看抽奖记录
* 插件指令：LotteryLog id
* 查看指定奖池的抽奖记录
* 例子：LotteryLog 3
*
* 当某个奖池里奖品项目过多时，奖品列表会按一定速度滚动，滚动速度由插
* 件参数决定。
*
* 此插件可以二次修改但禁止二次售卖。
* 此插件与HWGZS协作完成，请在游戏名单中致谢小C、HWGZS。
*
* 更新日志
* v1.00
* 插件完成
*
* v1.01
* 添加抽奖记录的插件指令
*
* v1.02
* 添加抽奖动画
*
* v1.03
* 增加对RPGMZ的支持
* 添加保底提示
*
* v1.04
* 优化动画效果，添加动画偏移参数
*
* v1.05
* 追加概率位数参数
* 补充概率配置方法说明
*
* v1.06
* 将奖池标题和奖池内容拆分为两个窗口
*
* v1.07
* 追加奖池中保底仅抽中一次的配置
*
* v1.08
* 修复在默认界面尺寸下使用了显示奖池后，帮助窗口和列表窗口上端重叠的bug
*/
/*~struct~itemListData:
 * @param item
 * @text 物品
 * @type item
 * @desc 物品
 * @default 0
 *
 * @param weapon
 * @text 武器
 * @type weapon
 * @desc 武器
 * @default 0
 *
 * @param armor
 * @text 护甲
 * @type armor
 * @desc 护甲
 * @default 0
 *
 * @param rate
 * @text 概率
 * @type number
 * @desc 概率，此处为和其他所有道具的【相对概率】
 * @default 0
 *
 * @param isSafe
 * @text 是否是保底物品
 * @type boolean
 * @desc 此物品是否为可保底物品
 * @on 保底
 * @off 不保底
 * @default false
 */
/*~struct~lotteryPool:
 * @param name
 * @text 奖池名称
 *
 * @param lotteryItem
 * @text 抽奖物品
 * @type item
 * @default 0
 * @desc 该奖池消耗的抽奖物品
 *
 * @param safeCount
 * @text 保底次数
 * @type number
 * @min 0
 * @default 100
 *
 * @param singleSafe
 * @text 保底是否获得一次
 * @type boolean
 * @on 是
 * @off 否
 * @default false
 * @desc 抽中保底后，该保底是否从奖池移除，即保底只能获得一次。
 *
 * @param pool
 * @text 奖池内容
 * @type struct<itemListData>[]
 * @desc 奖池中【物品】【武器】【防具】只可填一个
 * @default []
 */

var Imported = Imported || {};
Imported.CPWH_LotteryCore = true;

var CP = CP || {};
CP.Lottery = CP.Lottery || {};
CP.Lottery.isMZ = Utils.RPGMAKER_NAME === "MZ";
CP.Lottery.Params = PluginManager.parameters("CPWH_LotteryCore");

CP.Lottery.ALL_POOLS = JSON.parse(CP.Lottery.Params["Pools"]).map(function(str, index){
	var item = JSON.parse(str);
	item.id = index + 1;
	item.lotteryItem = Number(item.lotteryItem) || 0;
	item.safeCount = Number(item.safeCount) || 0;
	item.singleSafe = eval(item.singleSafe) || false;

	item.pool = JSON.parse(item.pool).map(function(pStr){
		var poolItem = JSON.parse(pStr);
		poolItem.item = Number(poolItem.item) || 0;
		poolItem.weapon = Number(poolItem.weapon) || 0;
		poolItem.armor = Number(poolItem.armor) || 0;
		poolItem.rate = Number(poolItem.rate) || 0;
		poolItem.isSafe = eval(poolItem.isSafe) || false;
		return poolItem;
	});
	return item;
});

CP.Lottery.DEFAULT_POOL_LIST = JSON.parse(CP.Lottery.Params["Default Pools List"]).map(function(numStr){
	return Number(numStr) || 0;
});

CP.Lottery.LOTTERY_ANIMATION = {
	baseAnimationId: Number(CP.Lottery.Params["Lottery Animation"]) || 0,
	mutiAnimationId: Number(CP.Lottery.Params["Muti Lottery Animation"]) || 0,
	mirror: eval(CP.Lottery.Params["Lottery Animation Mirror"]) || false,
	offsetX: Number(CP.Lottery.Params["Lottery Animation Offset X"]) || 0,
	offsetY: Number(CP.Lottery.Params["Lottery Animation Offset Y"]) || 0
};

CP.Lottery.SELECT_POOL_COMMAND = CP.Lottery.Params["Select Pool Command"].trim();
CP.Lottery.SIMPLE_COMMAND = CP.Lottery.Params["Simple Command"].trim();
CP.Lottery.REPEAT_COMMAND = CP.Lottery.Params["Repeat Command"].trim();
CP.Lottery.REPEAT_COUNT = Number(CP.Lottery.Params["Repeat Count"]) || 2;
CP.Lottery.CANCEL_COMMAND = CP.Lottery.Params["Cancel Command"].trim();
CP.Lottery.CURRENT_POOL_COLOR = Number(CP.Lottery.Params["Current Pool Color"]) || 0;
CP.Lottery.DATA_TITLE_FORMAT = CP.Lottery.Params["Data Title Format"].trim();
CP.Lottery.POOL_COST_INFO = CP.Lottery.Params["Pool Cost Info"].trim();
CP.Lottery.POOL_SAFE_TEXT = CP.Lottery.Params["Pool Safe Text"].trim();
CP.Lottery.SHOW_LOTTERY_RATE = eval(CP.Lottery.Params["Show Lottery Rate"]) || false;
CP.Lottery.LOTTERY_RATE_COUNT = Number(CP.Lottery.Params["Lottery Rate Count"]) || 0;
CP.Lottery.DATA_RATE_X_OFFSET = Number(CP.Lottery.Params["Data Rate X Offset"]) || 0;
CP.Lottery.SHOW_SAFE_INFO = eval(CP.Lottery.Params["Show Safe Info"]) || false;
CP.Lottery.SAFE_INFO_TEXT = CP.Lottery.Params["Safe Info Text"].trim();
CP.Lottery.SINGLE_INFO_TEXT = CP.Lottery.Params["Single Info Text"].trim();
CP.Lottery.SAFE_INFO_SIZE = Number(CP.Lottery.Params["Safe Info Size"]) || 1;
CP.Lottery.SAFE_INFO_OFFSET_X = Number(CP.Lottery.Params["Safe Info Offset X"]) || 0;
CP.Lottery.SAFE_INFO_OFFSET_Y = Number(CP.Lottery.Params["Safe Info Offset Y"]) || 0;
CP.Lottery.DATA_SCROLL_COUNT = Number(CP.Lottery.Params["Data Scroll Count"]) || 1;
CP.Lottery.DATA_RESET_SCROLL_TIMES = Number(CP.Lottery.Params["Data Reset Scroll Times"]) || 0;
CP.Lottery.RESULT_TEXT = CP.Lottery.Params["Result Text"].trim();
CP.Lottery.LOTTERY_COMMAND_NAME = CP.Lottery.Params["Lottery Command Name"].trim();
CP.Lottery.MAIN_SHOW_LOTTERY = eval(CP.Lottery.Params["Main Show Lottery"]) || false;
CP.Lottery.LOTTERY_LOG_TITLE = CP.Lottery.Params["Lottery Log Title"].trim();

//物品类型转换成int
CP.Lottery.ITEM_TYPE_ITEM = 1;
CP.Lottery.ITEM_TYPE_WEAPON = 2;
CP.Lottery.ITEM_TYPE_ARMOR = 3;

CP.Lottery.lotteryPool = function(index){
	return this.ALL_POOLS[index - 1];
};

//从奖池数据对象查找物品
CP.Lottery.getItemObject = function(poolItem){
	if(poolItem.item > 0)
		return $dataItems[poolItem.item];
	if(poolItem.weapon > 0)
		return $dataWeapons[poolItem.weapon];
	if(poolItem.armor > 0)
		return $dataArmors[poolItem.armor];
	return null;
};

//读取物品对象主键数据
CP.Lottery.getItemData = function(item){
	if(!item)
		return [0, 0];
	else
		return [this.getItemType(item), item.id];
};

//获取物品类型
CP.Lottery.getItemType = function(item){
	if($dataItems.contains(item))
		return this.ITEM_TYPE_ITEM;
	else if($dataWeapons.contains(item))
		return this.ITEM_TYPE_WEAPON;
	else if($dataArmors.contains(item))
		return this.ITEM_TYPE_ARMOR;
	else
		return 0;
};

CP.Lottery.getLotteryRealRateData = function(itemDataList){
	var total = 0;
	var result = [];
	for(var i = 0; i < itemDataList.length; i++){
		var poolItem = itemDataList[i];
		var item = this.getItemObject(poolItem);
		if(!!item){
			total += poolItem.rate;
			result.push({item: item, rate: total, isSafe: poolItem.isSafe});
		}
	}
	result.total = total;
	return result;
};

CP.Lottery.getLotteryResult = function(randomValue, dataList){
	var value = randomValue * dataList.total;
	for(var i = 0; i < dataList.length; i++){
		var item = dataList[i];
		if(value < item.rate)
			return item;
	}
	return null;
};

//---------------------------------
// MZ-插件指令
//---------------------------------
//MZ插件指令的@arg规则同插件参数的@param
if(CP.Lottery.isMZ){
PluginManager.registerCommand("CPWH_LotteryCore", "StartLottery", (args) => {
	SceneManager.push(Scene_Lottery);
});

PluginManager.registerCommand("CPWH_LotteryCore", "LotteryPool", (args) => {
	var opt = args.opt.toUpperCase().trim();
	var poolId = Number(args.poolId) || 0;
	if(poolId > 0){
		switch(opt){
			case "ADD":
				$gameSystem.addLotteryPool(poolId);
				break;
			case "REMOVE":
				$gameSystem.removeLotteryPool(poolId);
				break;
		}
	}
});

PluginManager.registerCommand("CPWH_LotteryCore", "LotteryLog", (args) => {
	var poolId = Number(args.poolId) || 0;
	if(poolId > 0){
		SceneManager.push(Scene_LotteryLog);
		SceneManager.prepareNextScene(poolId);
	}
});

}

//---------------------------------
// LotteryRandomBuilder 随机数生成器
//---------------------------------
function LotteryRandomBuilder(){
	this.initialize.apply(this, arguments);
};

LotteryRandomBuilder.prototype.initialize = function(seed){
	if(seed === undefined)
		seed = Date.now() % 999999999;
	this._seed = seed;
};

LotteryRandomBuilder.prototype.updateSeed = function(){
	this._seed = (this._seed * 9301 + 49297) % 233280;
};

LotteryRandomBuilder.prototype.next = function(){
	this.updateSeed();
	return this._seed / 233280.0;
};

//---------------------------------
// DataManager
//---------------------------------
CP.Lottery.EXTRACT_SAVE_CONTENTS = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
	CP.Lottery.EXTRACT_SAVE_CONTENTS.call(this, contents);
	$gameSystem.initLotteryData();
};

//---------------------------------
// Game_System
//---------------------------------
CP.Lottery.INIT_SYS = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
	CP.Lottery.INIT_SYS.call(this);
	this.initLotteryData();
};

Game_System.prototype.initLotteryData = function(){
	this.initLotteryPools();
	this.initLotteryRandoms();
	this.initLotteryCount();
	this.initLotteryLogs();
};

Game_System.prototype.initLotteryPools = function(){
	if(!this._lotteryPools){
		this._lotteryPools = [];
		for(var i = 0; i < CP.Lottery.DEFAULT_POOL_LIST.length; i++){
			var id = CP.Lottery.DEFAULT_POOL_LIST[i];
			this.addLotteryPool(id);
		}
	}
};

Game_System.prototype.lotteryPools = function(){
	if(!this._lotteryPools)
		this._lotteryPools = [];
	return this._lotteryPools;
};

Game_System.prototype.initLotteryRandoms = function(){
	var length = CP.Lottery.ALL_POOLS.length + 1;
	if(!this._lotteryRandoms)
		this._lotteryRandoms = new Array(length);
	for(var i = 1; i < length; i++){
		if(!this._lotteryRandoms[i])
			this._lotteryRandoms[i] = new LotteryRandomBuilder(Date.now() + Math.round(Math.random() * 10 + 10 * i));
	}
};

Game_System.prototype.nextLotteryRandom = function(poolId){
	var random = this._lotteryRandoms[poolId];
	if(!!random)
		return random.next();
	else
		return 0;
};

Game_System.prototype.initLotteryCount = function(){
	var length = CP.Lottery.ALL_POOLS.length + 1;
	if(!this._lotteryCounts)
		this._lotteryCounts = new Array(length);
	for(var i = 1; i < length; i++){
		if(!this._lotteryCounts[i])
			this._lotteryCounts[i] = 0;
	}
};

Game_System.prototype.lotteryCount = function(poolId){
	var count = this._lotteryCounts[poolId];
	if(!!count)
		return count;
	return 0;
};

Game_System.prototype.hasLotteryPool = function(poolId){
	return !!this._lotteryRandoms[poolId];
};

Game_System.prototype.addLotteryCount = function(poolId){
	var pool = CP.Lottery.lotteryPool(poolId);
	if(this.hasLotteryPool(poolId)){
		this._lotteryCounts[poolId]++;
		if(this._lotteryCounts[poolId] > pool.safeCount)
			this._lotteryCounts[poolId] = pool.safeCount;
	}
};

Game_System.prototype.resetLotteryCount = function(poolId){
	if(this.hasLotteryPool(poolId))
		this._lotteryCounts[poolId] = 0;
};

Game_System.prototype.addLotteryPool = function(poolId){
	if(!this._lotteryPools.contains(poolId))
		this._lotteryPools.push(poolId);
};

Game_System.prototype.removeLotteryPool = function(poolId){
	if(this._lotteryPools.contains(poolId)){
		var index = this._lotteryPools.indexOf(poolId);
		this._lotteryPools.splice(index, 1);
	}
};

Game_System.prototype.initLotteryLogs = function(){
	var length = CP.Lottery.ALL_POOLS.length + 1;
	if(!this._lotteryLogs)
		this._lotteryLogs = new Array(length);
	for(var i = 1; i < length; i++){
		if(!this._lotteryLogs[i])
			this._lotteryLogs[i] = {};
	}
};

Game_System.prototype.lotteryLog = function(poolId){
	return this._lotteryLogs[poolId] || {};
};

Game_System.prototype.addLotteryLog = function(poolId, item){
	var data = CP.Lottery.getItemData(item);
	var count = this.lotteryLogItemCount(poolId, data);
	this._lotteryLogs[poolId][data] = count + 1;
};

//抽奖记录里的物品数[以物品key为准]
Game_System.prototype.lotteryLogItemCount = function(poolId, itemKey){
	if(!this._lotteryLogs[poolId])
		return 0;
	else
		return this._lotteryLogs[poolId][itemKey] || 0;
};

//获取抽奖记录里指定物品的记录数量
Game_System.prototype.lotteryLogItemObjectCount = function(poolId, item){
	var key = CP.Lottery.getItemData(item);
	return this.lotteryLogItemCount(poolId, key);
};

Game_System.prototype.lotteryLogCount = function(){
	var count = 0;
	for(var i = 1; i < this._lotteryLogs.length; i++){
		var data = this._lotteryLogs[i];
		var keys = Object.keys(data).map((s) => s.split(",").map((num) => Number(num) || 0));
		for(var k = 0; k < keys.length; k++){
			var key =  keys[k];
			count += this.lotteryLogItemCount(i, key);
		}
	}
	return count;
};

//---------------------------------
// Game_Interpreter
//---------------------------------
if(!CP.Lottery.isMZ){
CP.Lottery.PLUGIN_COMMAND = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	CP.Lottery.PLUGIN_COMMAND.call(this, command, args);
	if(command == 'StartLottery')
		SceneManager.push(Scene_Lottery);
	else if(command == 'LotteryPool'){
		var type = args[0].toUpperCase();
		var id = Number(args[1]) || 0;
		if(id > 0){
			switch(type){
				case "ADD":
					$gameSystem.addLotteryPool(id);
					break;
				case "REMOVE":
					$gameSystem.removeLotteryPool(id);
					break;
			}
		}
	}else if(command == 'LotteryLog'){
		var id = Number(args[0]) || 0;
		if(id > 0){
			SceneManager.push(Scene_LotteryLog);
			SceneManager.prepareNextScene(id);
		}
	}
};

}


//---------------------------------
// Sprite_LotteryAnimation 抽奖动画
//---------------------------------

//MZ没有Base精灵
if(CP.Lottery.isMZ && !Sprite_Base)
	var Sprite_Base = Sprite;

function Sprite_LotteryAnimation(){
	this.initialize.apply(this, arguments);
};

Sprite_LotteryAnimation.prototype = Object.create(Sprite_Base.prototype);
Sprite_LotteryAnimation.prototype.constructor = Sprite_LotteryAnimation;

//MZ动画精灵数组只存在于Spriteset中，精灵播动画默认不可行，需要补充
Sprite_LotteryAnimation.prototype.initialize = function(x, y){
	if(CP.Lottery.isMZ)
		this._animationSprites = [];
	this.resetAnimationData();
	Sprite_Base.prototype.initialize.call(this);

	this.move(x, y);
};

Sprite_LotteryAnimation.prototype.setAnimationData = function(animationId, mirror){
	this._animationId = animationId; //动画id
	this._mirror = mirror; //镜像
};

Sprite_LotteryAnimation.prototype.resetAnimationData = function(){
	this.setAnimationData(0, false);
	this._finishCallback = null; //结束回调函数
};

Sprite_LotteryAnimation.prototype.startLotteryAnimation = function(animationId, mirror, callback){
	this._finishCallback = callback;
	if(!!$dataAnimations[animationId]){
		this.setAnimationData(animationId, mirror);
		this.playAnimation();
	}else{
		if(!!this._finishCallback)
			this._finishCallback.call(this);
		this.resetAnimationData();
	}
};

Sprite_LotteryAnimation.prototype.playAnimation = function(){
	this.startAnimation($dataAnimations[this._animationId], this._mirror, 0);
};

if(CP.Lottery.isMZ){
//补充MZ在Spriteset重点动画逻辑
Sprite_LotteryAnimation.prototype.isMVAnimation = function(animation) {
    return !!animation.frames;
};

Sprite_LotteryAnimation.prototype.startAnimation = function(animation, mirror, delay){
	var mv = this.isMVAnimation(animation);
    var sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    var targetSprites = [this];
    var baseDelay = this.animationBaseDelay();
    var previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
};

Sprite_LotteryAnimation.prototype.animationBaseDelay = function(){
	return 0;
};

Sprite_LotteryAnimation.prototype.lastAnimationSprite = function(){
	this._animationSprites[this._animationSprites.length - 1];
};

}

Sprite_LotteryAnimation.prototype.update = function(){
	Sprite_Base.prototype.update.call(this);
	if(CP.Lottery.isMZ)
		this.updateAnimations();
	this.updateAnimationCallback();
};

Sprite_LotteryAnimation.prototype.updateAnimations = function(){
    for(var i = 0; i < this._animationSprites.length; i++){
    	var sprite = this._animationSprites[i];
        if(!sprite.isPlaying())
            this.removeAnimation(sprite);
    }
};

Sprite_LotteryAnimation.prototype.removeAnimation = function(sprite) {
    this._animationSprites.remove(sprite);
    this.parent.removeChild(sprite);
    sprite.destroy();
};

Sprite_LotteryAnimation.prototype.updateAnimationCallback = function(){
	if(!this.isAnimationPlaying() && this._animationId > 0 && !!this._finishCallback){
		this._finishCallback.call(this);
		this.resetAnimationData();
	}
};

Sprite_LotteryAnimation.prototype.isAnimationPlaying = function(){
	if(CP.Lottery.isMZ)
		return this._animationSprites.length > 0;
	else
		return Sprite_Base.prototype.isAnimationPlaying.call(this);
};

//---------------------------------
// Scene_Lottery 抽奖场景
//---------------------------------
function Scene_Lottery(){
	this.initialize.apply(this, arguments);
};

Scene_Lottery.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Lottery.prototype.constructor = Scene_Lottery;

Scene_Lottery.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Lottery.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);

	this.createAllWindows();
	this.createAnimationSprite();
};

Scene_Lottery.prototype.createAllWindows = function(){
	this.createCommandWindow();
	this.createListWindow();
	this.createTitleWindow();
	this.createDataWindow();
	this.createResultWindow();
};

Scene_Lottery.prototype.createCommandWindow = function(){
	var y = Math.floor(4 * Graphics.boxHeight / 5);
	this._commandWindow = new Window_LotteryCommand(0, y, this);

	this._commandWindow.setHandler("select", this.commandSelect.bind(this));
	this._commandWindow.setHandler("simple", this.commandLottery.bind(this, 1));
	this._commandWindow.setHandler("repeat", this.commandLottery.bind(this, CP.Lottery.REPEAT_COUNT));
	this._commandWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};

Scene_Lottery.prototype.createListWindow = function(){
	var width = Math.floor(Graphics.boxWidth / 4);
	var height = Math.floor(2 * Graphics.boxHeight / 3);
	var y = this._commandWindow.y - height;
	var fittingHeight = this._commandWindow.fittingHeight(2);
	if(Imported.CP_X_ShowLotteryInfo && y < fittingHeight){
		y = fittingHeight;
		height = this._commandWindow.y - y;
	}
	this._listWindow = new Window_LotteryPoolList(0, y, width, height);
	this._listWindow.setHandler("ok", this.onListOk.bind(this));
	this._listWindow.setHandler("cancel", this.onListCancel.bind(this));
	this._listWindow.setSelectHandler(this.onListSelect.bind(this));
	this._listWindow.setCurrentChangeHandler(this.onCurrentChange.bind(this));
	this.addWindow(this._listWindow);
};

Scene_Lottery.prototype.createTitleWindow = function(){
	var x = this._listWindow.x + this._listWindow.width;
	var width = Graphics.boxWidth - x;
	var y = this._listWindow.y;
	this._titleWindow = new Window_LotteryPoolDataTitle(x, y, width, 2);
	this.addWindow(this._titleWindow);
};

Scene_Lottery.prototype.createDataWindow = function(){
	var x = this._listWindow.x + this._listWindow.width;
	var width = Graphics.boxWidth - x;
	var y = this._titleWindow.y + this._titleWindow.height;
	var height = this._commandWindow.y - y;
	this._dataWindow = new Window_LotteryPoolData(x, y, width, height);
	this.addWindow(this._dataWindow);
};

Scene_Lottery.prototype.createResultWindow = function(){
	var x = Math.floor(Graphics.boxWidth / 8);
	var y = Math.floor(Graphics.boxHeight / 8);
	var width = Math.floor(3 *Graphics.boxWidth / 4);
	var height = Math.floor(3 * Graphics.boxHeight / 4);

	this._resultWindow = new Window_LotteryResult(x, y, width, height);
	this._resultWindow.setHandler("ok", this.onResultOk.bind(this));
	this._resultWindow.setHandler("cancel", this.onResultOk.bind(this));
	this.addWindow(this._resultWindow);
};

Scene_Lottery.prototype.commandSelect = function(){
	var pool = this._listWindow.currentPool();
	this._listWindow.activate();
	if(!!pool)
		this._listWindow.select(pool.id - 1);
	else
		this._listWindow.select(0);
};

Scene_Lottery.prototype.commandLottery = function(count){
	this._dataWindow.startAnimation(count, this.lotteryCommandEffect.bind(this, count));
};

Scene_Lottery.prototype.lotteryCommandEffect = function(count){
	var results = this.executeLottery(count);
	this._dataWindow.refresh();
	this.gainLotteryItem(results);
	this._resultWindow.setup(results);
};

Scene_Lottery.prototype.onListOk = function(){
	var pool = this._listWindow.pool();
	if(!!pool)
		this._listWindow.setCurrentPool(pool.id);
	
	this.onListCancel();
};

Scene_Lottery.prototype.onListCancel = function(){
	this._listWindow.deselect();
	this._listWindow.deactivate();
	this._commandWindow.refresh();
	this._commandWindow.activate();
};

Scene_Lottery.prototype.onListSelect = function(){
	var pool = this._listWindow.pool();
	if(!!pool){
		this._titleWindow.setCurrentPool(pool.id);
		this._dataWindow.setCurrentPool(pool.id);
	}
	else if(this._listWindow.index() >= 0){
		this._titleWindow.setCurrentPool(0);
		this._dataWindow.setCurrentPool(0);
	}
};

Scene_Lottery.prototype.onResultOk = function(){
	this._resultWindow.deactivate();
	this._resultWindow.close();
	this._titleWindow.refresh();
	this._dataWindow.refresh();
	this._commandWindow.refresh();
	this._commandWindow.activate();
};

Scene_Lottery.prototype.onCurrentChange = function(){
	var pool = this.currentPool();
	this._titleWindow.setCurrentPool(pool.id);
	this._dataWindow.setCurrentPool(pool.id);
};

Scene_Lottery.prototype.currentPool = function(){
	if(!!this._listWindow)
		return this._listWindow.currentPool();
	else
		return null;
};

Scene_Lottery.prototype.lotteryItemCost = function(){
	var pool = this.currentPool();
	if(!!pool)
		return $dataItems[pool.lotteryItem];
	else
		return null;
};

Scene_Lottery.prototype.executeLotteryCost = function(count){
	var item = this.lotteryItemCost();
	if(!!item)
		$gameParty.loseItem(item, count);
};

Scene_Lottery.prototype.hasSafeLottery = function(poolList){
	var pool = this.currentPool();
	if(pool.safeCount <= 0)
		return false;
	else if(pool.singleSafe && !poolList.some((poolItem) => poolItem.isSafe))
		return false;
	else
		return $gameSystem.lotteryCount(pool.id) >= pool.safeCount - 1;
};

Scene_Lottery.prototype.getUsablePoolList = function(pool){
	if(!pool.singleSafe)
		return pool.pool;

	return pool.pool.filter(function(poolItem){
		if(!poolItem.isSafe)
			return true;
		else{
			var item = CP.Lottery.getItemObject(poolItem);
			return $gameSystem.lotteryLogItemObjectCount(pool.id, item) < 1;
		}
	});
};

Scene_Lottery.prototype.getLotteryResult = function(){
	var pool = this.currentPool();
	var list = this.getUsablePoolList(pool);
	if(this.hasSafeLottery(list)){
		list = list.filter(function(poolItem){
			return poolItem.isSafe;
		});
	}
	var data = CP.Lottery.getLotteryRealRateData(list);
	var randomValue = $gameSystem.nextLotteryRandom(pool.id);
	var result = CP.Lottery.getLotteryResult(randomValue, data);
	if(result.isSafe)
		$gameSystem.resetLotteryCount(pool.id);
	else
		$gameSystem.addLotteryCount(pool.id);
	return result;
};

Scene_Lottery.prototype.executeLottery = function(count){
	var results = [];
	var currentPool = this.currentPool();
	for(var i = 0; i < count; i++){
		var lotteryItem = this.getLotteryResult();
		results.push(lotteryItem.item);

		//记录抽奖结果，因为这里还没有获得道具，不存在独立物品
		//因此添加记录的时候，不需要判独立
		//单抽时就要添加记录，因为上次的抽奖结果会影响下次的结果
		$gameSystem.addLotteryLog(currentPool.id, results[i]);
	}
	this.executeLotteryCost(count);
	return results;
};

Scene_Lottery.prototype.gainLotteryItem = function(results){
	for(var i = 0; i < results.length; i++)
		$gameParty.gainItem(results[i], 1);
};

Scene_Lottery.prototype.start = function(){
	Scene_MenuBase.prototype.start.call(this);

	this.setupCurrentPool();
};

Scene_Lottery.prototype.setupCurrentPool = function(){
	var sysPools = $gameSystem.lotteryPools();
	if(sysPools.length > 0){
		this._listWindow.setCurrentPool(sysPools[0]);
		this._listWindow.refresh();
		this._commandWindow.refresh();
	}
};

Scene_Lottery.prototype.createAnimationSprite = function(){
	this._animationSprite = new Sprite_LotteryAnimation(Graphics.boxWidth / 2
		+ CP.Lottery.LOTTERY_ANIMATION.offsetX, Graphics.boxHeight / 2
		+ CP.Lottery.LOTTERY_ANIMATION.offsetY);
	this.addChild(this._animationSprite);
	this._dataWindow.setAnimationSprite(this._animationSprite);
};

//---------------------------------
// Window_LotteryCommand 命令窗口
//---------------------------------
function Window_LotteryCommand(){
	this.initialize.apply(this, arguments);
};

Window_LotteryCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_LotteryCommand.prototype.constructor = Window_LotteryCommand;

Window_LotteryCommand.prototype.initialize = function(x, y, baseScene){
	this._baseScene = baseScene;
	if(CP.Lottery.isMZ)
		Window_HorzCommand.prototype.initialize.call(this, this.mzRect(x, y));
	else
		Window_HorzCommand.prototype.initialize.call(this, x, y);
};

Window_LotteryCommand.prototype.mzRect = function(x, y){
	var width = this.windowWidth();
	var height = this.windowHeight();
	return new Rectangle(x, y, width, height);
};

Window_LotteryCommand.prototype.windowWidth = function(){
	return Graphics.boxWidth;
};

if(CP.Lottery.isMZ){
Window_LotteryCommand.prototype.windowHeight = function(){
	return this.fittingHeight(1);
};
}

Window_LotteryCommand.prototype.makeCommandList = function(){
	this.addCommand(CP.Lottery.SELECT_POOL_COMMAND, "select", $gameSystem.lotteryPools().length > 0);
	this.addCommand(CP.Lottery.SIMPLE_COMMAND, "simple", this.lotteryItemCount() >= 1);
	this.addCommand(CP.Lottery.REPEAT_COMMAND, "repeat", this.lotteryItemCount() >= CP.Lottery.REPEAT_COUNT);
	this.addCommand(CP.Lottery.CANCEL_COMMAND, "cancel");
};

Window_LotteryCommand.prototype.currentPool = function(){
	return this._baseScene.currentPool();
};

Window_LotteryCommand.prototype.lotteryItemCount = function(){
	var pool = this.currentPool();
	if(!!pool){
		var item = $dataItems[pool.lotteryItem];
		if(!!item)
			return $gameParty.numItems(item);
		else
			return -1;
	}
	return -1;
};

//---------------------------------
// Window_LotteryPoolList 奖池列表
//---------------------------------
function Window_LotteryPoolList(){
	this.initialize.apply(this, arguments);
};

Window_LotteryPoolList.prototype = Object.create(Window_Selectable.prototype);
Window_LotteryPoolList.prototype.constructor = Window_LotteryPoolList;

Window_LotteryPoolList.prototype.initialize = function(x, y, width, height){
	this._currentPool = 0; //当前奖池 最小值1
	if(CP.Lottery.isMZ)
		Window_Selectable.prototype.initialize.call(this, new Rectangle(x, y, width, height));
	else
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);

	this.refresh();
};

Window_LotteryPoolList.prototype.setSelectHandler = function(method){
	this._selectHandler = method;
};

Window_LotteryPoolList.prototype.setCurrentChangeHandler = function(method){
	this._currentChangeHandler = method;
};

Window_LotteryPoolList.prototype.maxItems = function(){
	return $gameSystem.lotteryPools().length;
};

Window_LotteryPoolList.prototype.setCurrentPool = function(poolId){
	this._currentPool = poolId;
	this._currentChangeHandler();
	this.refresh();
};

Window_LotteryPoolList.prototype.currentPool = function(){
	if(this._currentPool > 0)
		return CP.Lottery.lotteryPool(this._currentPool);
	else
		return null;
};

Window_LotteryPoolList.prototype.pool = function(){
	var poolIds = $gameSystem.lotteryPools();
	return CP.Lottery.lotteryPool(poolIds[this.index()]);
};

Window_LotteryPoolList.prototype.drawItem = function(index){
	var rect = this.itemRect(index);
	var poolIds = $gameSystem.lotteryPools();
	var pool = CP.Lottery.lotteryPool(poolIds[index]);
	this.changePoolNameColor(pool.id);
	this.drawText(pool.name, rect.x, rect.y, rect.width, "left");
};

Window_LotteryPoolList.prototype.currentPoolColor = function(){
	if(CP.Lottery.isMZ)
		return ColorManager.textColor(CP.Lottery.CURRENT_POOL_COLOR);
	else
		return this.textColor(CP.Lottery.CURRENT_POOL_COLOR);
};

Window_LotteryPoolList.prototype.changePoolNameColor = function(poolId){
	if(this._currentPool === poolId)
		this.changeTextColor(this.currentPoolColor());
	else
		this.resetTextColor();
};

Window_LotteryPoolList.prototype.select = function(index){
	Window_Selectable.prototype.select.call(this, index);
	if(!!this._selectHandler)
		this._selectHandler();
};

//---------------------------------
// Window_LotteryPoolDataTitle 奖池信息标题
//---------------------------------
function Window_LotteryPoolDataTitle(){
	this.initialize.apply(this, arguments);
};

Window_LotteryPoolDataTitle.prototype = Object.create(Window_Selectable.prototype);
Window_LotteryPoolDataTitle.prototype.constructor = Window_LotteryPoolDataTitle;

Window_LotteryPoolDataTitle.prototype.initialize = function(x, y, width, lines){
	this._currentPool = 0;

	var height = this.fittingHeight(lines);
	if(CP.Lottery.isMZ)
		Window_Selectable.prototype.initialize.call(this, this.mzRect(x, y, width, height));
	else
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
};

Window_LotteryPoolDataTitle.prototype.mzRect = function(x, y, width, height){
	return new Rectangle(x, y, width, height);
};

Window_LotteryPoolDataTitle.prototype.setCurrentPool = function(poolId){
	this._currentPool = poolId;
	this.refresh();
};

Window_LotteryPoolDataTitle.prototype.currentPool = function(){
	return CP.Lottery.lotteryPool(this._currentPool);
};

Window_LotteryPoolDataTitle.prototype.lotteryItemCount = function(){
	var pool = this.currentPool();
	if(!!pool){
		var item = $dataItems[pool.lotteryItem];
		if(!!item)
			return $gameParty.numItems(item);
		else
			return -1;
	}
	return -1;
};

Window_LotteryPoolDataTitle.prototype.currentLotteryCount = function(){
	var pool = this.currentPool();
	if(!!pool)
		return $gameSystem.lotteryCount(pool.id);
	else
		return -1;
};

Window_LotteryPoolDataTitle.prototype.titleRect = function(){
	return Window_Selectable.prototype.itemRect.call(this, 0);
};

Window_LotteryPoolDataTitle.prototype.costRect = function(){
	return Window_Selectable.prototype.itemRect.call(this, 1);
};

Window_LotteryPoolDataTitle.prototype.infoTitleRect = function(){
	return Window_Selectable.prototype.itemRect.call(this, 2);
};

Window_LotteryPoolDataTitle.prototype.drawAllItems = function(){
	if(!!this.currentPool()){
		this.resetFontSettings();
		this.drawPoolName();
		this.drawCost();
		Window_Selectable.prototype.drawAllItems.call(this);	
	}
	
};

Window_LotteryPoolDataTitle.prototype.drawPoolName = function(){
	var rect = this.titleRect();
	var pool = this.currentPool();
	var name = CP.Lottery.DATA_TITLE_FORMAT.format(pool.name, CP.Lottery.POOL_SAFE_TEXT, this.currentLotteryCount()
		, pool.safeCount);
	this.drawText(name, rect.x, rect.y, rect.width, "center");
};

Window_LotteryPoolDataTitle.prototype.drawCost = function(){
	var rect = this.costRect();
	var tw = this.textWidth(CP.Lottery.POOL_COST_INFO) + 5;

	this.drawText(CP.Lottery.POOL_COST_INFO, rect.x, rect.y, rect.width);
	this.drawCostItem(rect.x + tw, rect.y, rect.width - tw);
};

Window_LotteryPoolDataTitle.prototype.drawCostItem = function(x, y, width){
	var item = $dataItems[this.currentPool().lotteryItem];
	this.drawItemName(item, x, y, width);
	this.drawCostCount(x, y, width);
};

Window_LotteryPoolDataTitle.prototype.drawCostCount = function(x, y, width){
	var count = this.lotteryItemCount();
	if(count >= 0)
		this.drawText("%1 / %2".format(count, 1), x, y, width, "right");
};

//---------------------------------
// Window_LotteryPoolData 奖池信息框
//---------------------------------
function Window_LotteryPoolData(){
	this.initialize.apply(this, arguments);
};

Window_LotteryPoolData.prototype = Object.create(Window_Selectable.prototype);
Window_LotteryPoolData.prototype.constructor = Window_LotteryPoolData;

Window_LotteryPoolData.prototype.initialize = function(x, y, width, height){
	this._currentPool = 0; //当前奖池
	this._scrollCount = 0;
	this._resetScrollTimes = 0;
	if(CP.Lottery.isMZ)
		Window_Selectable.prototype.initialize.call(this, new Rectangle(x, y, width, height));
	else
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
};

//这个精灵是在Scene上【窗口层上】，但归这个窗口管
Window_LotteryPoolData.prototype.setAnimationSprite = function(sprite){
	this._animationSprite = sprite;
};

Window_LotteryPoolData.prototype.startAnimation = function(lotteryCount, method){
	var animationId = lotteryCount > 1 ? CP.Lottery.LOTTERY_ANIMATION.mutiAnimationId
		: CP.Lottery.LOTTERY_ANIMATION.baseAnimationId;
	this._animationSprite.startLotteryAnimation(animationId, CP.Lottery.LOTTERY_ANIMATION.mirror, method);
};

Window_LotteryPoolData.prototype.setCurrentPool = function(poolId){
	this._currentPool = poolId;
	this.resetScrollData();
	this.refresh();
};

Window_LotteryPoolData.prototype.currentPool = function(){
	return CP.Lottery.lotteryPool(this._currentPool);
};

Window_LotteryPoolData.prototype.totalRate = function(){
	var pool = this.currentPool();
	var total = 0;
	if(!pool)
		return 0;
	for(var i = 0; i < pool.pool.length; i++){
		var pi = pool.pool[i];
		total += pi.rate;
	}
	return total;
};

Window_LotteryPoolData.prototype.realRate = function(poolItem){
	var total = this.totalRate();
	return poolItem.rate / total;
};

Window_LotteryPoolData.prototype.maxCols = function(){
	return 2;
};

Window_LotteryPoolData.prototype.maxItems = function(){
	var pool = this.currentPool();
	if(!!pool)
		return pool.pool.length;
	else
		return 0;
};

Window_LotteryPoolData.prototype.resetScrollData = function(){
	this.setTopRow(0);
	this._scrollCount = 0;
	this._resetScrollTimes = 0;
};

Window_LotteryPoolData.prototype.drawAllItems = function(){
	if(!!this.currentPool())
		Window_Selectable.prototype.drawAllItems.call(this);
};

Window_LotteryPoolData.prototype.drawItem = function(index){
	var pool = this.currentPool().pool;
	var poolItem = pool[index];
	var item = CP.Lottery.getItemObject(poolItem);
	var rect = this.itemRect(index);

	this.resetFontSettings();
	this.drawItemName(item, rect.x, rect.y, rect.width);
	if(CP.Lottery.SHOW_LOTTERY_RATE)
		this.drawItemRate(poolItem, rect.x, rect.y, rect.width - CP.Lottery.DATA_RATE_X_OFFSET);
	if(CP.Lottery.SHOW_SAFE_INFO){
		var iconWidth = CP.Lottery.isMZ ? ImageManager.iconWidth : Window_Base._iconWidth;
		var safeX = rect.x + this.textWidth(item.name) + iconWidth + CP.Lottery.SAFE_INFO_OFFSET_X;
		this.drawItemSafe(poolItem, safeX, rect.y + CP.Lottery.SAFE_INFO_OFFSET_Y, rect.width);
	}
};

Window_LotteryPoolData.prototype.drawItemRate = function(poolItem, x, y, width){
	var rate = this.realRate(poolItem);
	var text = "%1%".format(Math.round(rate * Math.pow(10, CP.Lottery.LOTTERY_RATE_COUNT + 2)) 
		/ Math.pow(10, CP.Lottery.LOTTERY_RATE_COUNT));
	this.resetFontSettings();
	this.drawText(text, x, y, width, "right");
};

Window_LotteryPoolData.prototype.drawItemSafe = function(poolItem, x, y, width){
	var pool = this.currentPool();
	if(poolItem.isSafe){
		var item = CP.Lottery.getItemObject(poolItem);
		var text = pool.singleSafe && $gameSystem.lotteryLogItemObjectCount(pool.id, item) > 0
			? CP.Lottery.SINGLE_INFO_TEXT : CP.Lottery.SAFE_INFO_TEXT;
		this.resetFontSettings();
		this.contents.fontSize = CP.Lottery.SAFE_INFO_SIZE;
		this.drawText(text, x, y, width);
	}
};

Window_LotteryPoolData.prototype.update = function(){
	Window_Selectable.prototype.update.call(this);
	this.updateScrollDataCount();
};

Window_LotteryPoolData.prototype.updateScrollDataCount = function(){
	this._scrollCount++;
	if(this._scrollCount >= CP.Lottery.DATA_SCROLL_COUNT)
		this.updateScrollData();
};

Window_LotteryPoolData.prototype.updateScrollData = function(){
	if(this.canScrollData()){
		if(this.hasScrolledButtom()){
			this._resetScrollTimes++;
			if(this._resetScrollTimes >= CP.Lottery.DATA_RESET_SCROLL_TIMES){
				this.setTopRow(0);
				this._resetScrollTimes = 0;
			}
		}else
			this.setTopRow(this.topRow() + 1);
		this.refresh();
	}
	this._scrollCount = 0;
};

Window_LotteryPoolData.prototype.canScrollData = function(){
	if(CP.Lottery.isMZ)
		return this.maxScrollY() > 0;
	else
		return this.maxItems() > this.maxPageItems();
};

Window_LotteryPoolData.prototype.hasScrolledButtom = function(){
	if(CP.Lottery.isMZ)
		return this.scrollY() >= this.maxScrollY();
	else
		return this.topIndex() + this.maxPageItems() >= this.maxItems();
};

//---------------------------------
// Window_LotteryResult 抽奖结果
//---------------------------------
function Window_LotteryResult(){
	this.initialize.apply(this, arguments);
};

Window_LotteryResult.prototype = Object.create(Window_Selectable.prototype);
Window_LotteryResult.prototype.constructor = Window_LotteryResult;

Window_LotteryResult.prototype.initialize = function(x, y, width, height){
	this._results = null;
	if(CP.Lottery.isMZ)
		Window_Selectable.prototype.initialize.call(this, new Rectangle(x, y, width, height));
	else
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);

	this.openness = 0;
};

Window_LotteryResult.prototype.maxItems = function(){
	return !!this._data ? this._data.length : 0;
};

Window_LotteryResult.prototype.maxCols = function(){
	return 2;
};

Window_LotteryResult.prototype.setup = function(results){
	this._results = results;
	if(this._results){
		this.open();
		this.refresh();
		this.activate();
		this.select(0);
	}
};

Window_LotteryResult.prototype.close = function(){
	this._data = null;
	this._results = null;
	Window_Selectable.prototype.close.call(this);
};

Window_LotteryResult.prototype.results = function(){
	if(!this._results)
		return [];
	var list = [];
	for(var i = 0; i < this._results.length; i++){
		var item = this._results[i];
		for(var k = 0; k < list.length; k++){
			if(list[k].item === item){
				list[k].count++;
				break;
			}
		}
		if(k === list.length)
			list.push({item: item, count: 1});
	}
	return list;
};

Window_LotteryResult.prototype.refresh = function(){
	this._data = this.results();
	Window_Selectable.prototype.refresh.call(this);
};

Window_LotteryResult.prototype.titleRect = function(){
	var rect = Window_Selectable.prototype.itemRect.call(this, this.topIndex());
	rect.width *= 2;
	return rect;
};

Window_LotteryResult.prototype.itemRect = function(index){
	return Window_Selectable.prototype.itemRect.call(this, index + this.maxCols());
};

Window_LotteryResult.prototype.drawAllItems = function(){
	this.drawTitle();
	Window_Selectable.prototype.drawAllItems.call(this);
};

Window_LotteryResult.prototype.drawTitle = function(){
	var rect = this.titleRect();
	this.resetFontSettings();
	this.drawText(CP.Lottery.RESULT_TEXT, rect.x, rect.y, rect.width, "center");
};

Window_LotteryResult.prototype.drawItem = function(index){
	var item = this._data[index];
	var rect = this.itemRect(index);

	this.resetFontSettings();
	this.drawItemName(item.item, rect.x, rect.y, rect.width);
	this.drawText(item.count, rect.x, rect.y, rect.width, "right");
};

//---------------------------------
// Window_MenuCommand
//---------------------------------
CP.Lottery.MENU_ADD_ORIGINAL_COMMANDS = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function(){
	CP.Lottery.MENU_ADD_ORIGINAL_COMMANDS.call(this);
	if(CP.Lottery.MAIN_SHOW_LOTTERY)
		this.addCommand(CP.Lottery.LOTTERY_COMMAND_NAME, "lottery");
};

//---------------------------------
// Scene_LotteryLog 抽奖记录
//---------------------------------
function Scene_LotteryLog(){
	this.initialize.apply(this, arguments);
};

Scene_LotteryLog.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LotteryLog.prototype.constructor = Scene_LotteryLog;

Scene_LotteryLog.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
	this.resetPool();
};

Scene_LotteryLog.prototype.setPool = function(poolId){
	this._poolId = poolId;
};

Scene_LotteryLog.prototype.resetPool = function(){
	this.setPool(0);
};

Scene_LotteryLog.prototype.prepare = function(poolId){
	this.setPool(poolId);
};

Scene_LotteryLog.prototype.currentPool = function(){
	if(this._poolId > 0)
		return CP.Lottery.lotteryPool(this._poolId);
	else
		return null;
};

Scene_LotteryLog.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);
	this.createAllWindows();
};

Scene_LotteryLog.prototype.createAllWindows = function(){
	this.createTitleWindow();
	this.createListWindow();
};

Scene_LotteryLog.prototype.createTitleWindow = function(){
	this._titleWindow = new Window_LotteryLogTitle();
	this.addWindow(this._titleWindow);
};

Scene_LotteryLog.prototype.createListWindow = function(){
	var y = this._titleWindow.y + this._titleWindow.height;
	var height = Graphics.boxHeight - y;

	this._listWindow = new Window_LotteryLogList(0, y, Graphics.boxWidth, height);
	this._listWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._listWindow);
};

Scene_LotteryLog.prototype.start = function(){
	Scene_MenuBase.prototype.start.call(this);
	this._titleWindow.setPoolData(this.currentPool());
	this._listWindow.setup(this.currentPool());
};

//---------------------------------
// Window_LotteryLogTitle
//---------------------------------
function Window_LotteryLogTitle(){
	this.initialize.apply(this,arguments);
};

Window_LotteryLogTitle.prototype = Object.create(Window_Base.prototype);
Window_LotteryLogTitle.prototype.constructor = Window_LotteryLogTitle;

Window_LotteryLogTitle.prototype.initialize = function(){
	if(CP.Lottery.isMZ)
		Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, Graphics.boxWidth
			, this.fittingHeight(1)));
	else
		Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, this.fittingHeight(1));
	this.setPoolData(null);
};

Window_LotteryLogTitle.prototype.setPoolData = function(pool){
	this._pool = pool;
	this.refresh();
};

Window_LotteryLogTitle.prototype.refresh = function(){
	this.contents.clear();
	if(!!this._pool)
		this.drawPoolTitle();
};

Window_LotteryLogTitle.prototype.drawPoolTitle = function(){
	this.resetFontSettings();
	this.drawText(CP.Lottery.LOTTERY_LOG_TITLE.format(this._pool.name
		, $gameSystem.lotteryLogCount(this._pool.id)), 0, 0, this.width, "center");
};

//---------------------------------
// Window_LotteryLogList
//---------------------------------
function Window_LotteryLogList(){
	this.initialize.apply(this, arguments);
};

Window_LotteryLogList.prototype = Object.create(Window_Selectable.prototype);
Window_LotteryLogList.prototype.constructor = Window_LotteryLogList;

Window_LotteryLogList.prototype.initialize = function(x, y, width, height){
	this.setPoolData(null);
	if(CP.Lottery.isMZ)
		Window_Selectable.prototype.initialize.call(this, new Rectangle(x, y, width, height));
	else
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
};

Window_LotteryLogList.prototype.maxCols = function(){
	return 2;
};

Window_LotteryLogList.prototype.maxItems = function(){
	if(!this._keys)
		return 0;
	else
		return this._keys.length;
};

Window_LotteryLogList.prototype.setPoolData = function(pool){
	if(!!pool){
		this._data = $gameSystem.lotteryLog(pool.id);
		this._keys = Object.keys(this._data).map((s) => s.split(",").map((num) => Number(num) || 0));
		this.refresh();
	}else{
		this._keys = [];
		this._data = {};
	}
};

Window_LotteryLogList.prototype.setup = function(pool){
	this.setPoolData(pool);
	this.activate();
	this.select(0);
};

Window_LotteryLogList.prototype.drawItem = function(index){
	var key = this._keys[index];
	var item = this.findItemByKey(key);
	var count = this._data[key] || 0;
	var rect = this.itemRect(index);

	this.resetFontSettings();
	this.drawItemName(item, rect.x, rect.y, rect.width);
	this.drawText(count, rect.x, rect.y, rect.width, "right");
};

Window_LotteryLogList.prototype.findItemByKey = function(key){
	switch(key[0]){
		case CP.Lottery.ITEM_TYPE_ITEM:
			return $dataItems[key[1]];
		case CP.Lottery.ITEM_TYPE_WEAPON:
			return $dataWeapons[key[1]];
		case CP.Lottery.ITEM_TYPE_ARMOR:
			return $dataArmors[key[1]];
		default:
			return null;
	}
};

//---------------------------------
// Scene_Menu
//---------------------------------
CP.Lottery.MENU_SCENE_CREATE_COMMAND_WINDOW = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function(){
	CP.Lottery.MENU_SCENE_CREATE_COMMAND_WINDOW.call(this);
	if(CP.Lottery.MAIN_SHOW_LOTTERY)
		this._commandWindow.setHandler("lottery", this.commandLottery.bind(this));
};

Scene_Menu.prototype.commandLottery = function(){
	SceneManager.push(Scene_Lottery);
};