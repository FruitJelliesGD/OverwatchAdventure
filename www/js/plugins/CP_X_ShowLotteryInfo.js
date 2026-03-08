/*:
 * @target MV MZ
 * @plugindesc (v1.01)显示奖池信息
 * @author 小c
 * @version 1.00
 * @date 1/11/2025
 *
 * @param Command Show Info
 * @text 查看奖池命令
 * @default 查看奖池
 *
 * @help
 * 查看奖池信息
 * 本插件需要抽奖核心前置
 * 如果你使用了GT信息框，请把本插件放在他的下面
 *
 * 本插件新增一个查看奖池的选项。
 *
 * 更新日志
 * v1.00
 * 插件完成
 *
 * v1.01
 * 对抽奖1.06的支持
 */

var Imported = Imported || {};
Imported.CP_X_ShowLotteryInfo = true;

var CP = CP || {};
CP.ShowLotteryInfo = CP.ShowLotteryInfo || {};
CP.ShowLotteryInfo.Params = PluginManager.parameters("CP_X_ShowLotteryInfo");
CP.ShowLotteryInfo.COMMAND_SHOW_INFO = CP.ShowLotteryInfo.Params["Command Show Info"].trim();

//-------------------------------
// Scene_Lottery
//-------------------------------
CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_ALL_WINDOWS = Scene_Lottery.prototype.createAllWindows;
Scene_Lottery.prototype.createAllWindows = function(){
	this.createHelpWindow();
	CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_ALL_WINDOWS.call(this);
};

Scene_Lottery.prototype.createHelpWindow = function(){
	Scene_MenuBase.prototype.createHelpWindow.call(this);
	this._helpWindow.hide();
};

CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_COMMAND_WINDOW = Scene_Lottery.prototype.createCommandWindow;
Scene_Lottery.prototype.createCommandWindow = function(){
	CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_COMMAND_WINDOW.call(this);
	this._commandWindow.setHandler("show", this.commandShowLottery.bind(this));
    this._commandWindow.y += 15;
};

Scene_Lottery.prototype.commandShowLottery = function(){
    this._helpWindow.show();
	this._dataWindow.activate();
	this._dataWindow.select(0);
    if(CP.Lottery.isMZ){
        this._dataWindow.scrollTo(0, 0);
    }
};

CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_DATA_WINDOW = Scene_Lottery.prototype.createDataWindow;
Scene_Lottery.prototype.createDataWindow = function(){
    CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_DATA_WINDOW.call(this);
    this._dataWindow.setHandler("cancel", this.onDataCancel.bind(this));
    this._dataWindow.setHelpWindow(this._helpWindow);
};

Scene_Lottery.prototype.onDataCancel = function(){
    this._helpWindow.hide();
    this._dataWindow.deselect();
    this._dataWindow.deactivate();
    this._commandWindow.activate();
};

CP.ShowLotteryInfo.SCENE_LOTTERY_START = Scene_Lottery.prototype.start;
Scene_Lottery.prototype.start = function(){
    CP.ShowLotteryInfo.SCENE_LOTTERY_START.call(this);
    this._commandWindow.select(1);
};

if(CP.Lottery.isMZ){
Scene_Lottery.prototype.isBottomHelpMode = function() {
    return false;
};

Scene_Lottery.prototype.isBottomButtonMode = function() {
    return true;
};
}

if(Imported.GT_ObjectInfoWindow){
//配置本场景的信息框样式
Scene_Lottery.prototype.getObjInfoWindowSet = function(){
    this._objInfoWindowSet = GT.Param.OIWSceneItemSet;
};

CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_OBJ_INFO_WINDOW = Scene_Lottery.prototype.createObjInfoWindow;
Scene_Lottery.prototype.createObjInfoWindow = function(){
    if(CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_OBJ_INFO_WINDOW)
        CP.ShowLotteryInfo.SCENE_LOTTERY_CREATE_OBJ_INFO_WINDOW.call(this);
    else{
        this._objInfoWindow = new Window_ObjectInfo(this._objInfoWindowSet);
        this.addChild(this._objInfoWindow);
    }
    this._dataWindow.setObjInfoWindow(this._objInfoWindow);
};
}

//-------------------------------
// Window_LotteryCommand
//-------------------------------
CP.ShowLotteryInfo.WINDOW_LOTTERY_COMMAND_MAKE_COMMAND_LIST = Window_LotteryCommand.prototype.makeCommandList;
Window_LotteryCommand.prototype.makeCommandList = function(){
	this.addCommand(CP.ShowLotteryInfo.COMMAND_SHOW_INFO, "show");
	CP.ShowLotteryInfo.WINDOW_LOTTERY_COMMAND_MAKE_COMMAND_LIST.call(this);
};

Window_LotteryCommand.prototype.maxCols = function(){
	return !!this._list ? this._list.length : 1;
};

//-------------------------------
// Window_LotteryPoolData
//-------------------------------
CP.ShowLotteryInfo.WINDOW_LOTTERY_POOL_DATA_UPDATE_SCROLL_COUNT = Window_LotteryPoolData.prototype.updateScrollDataCount;
Window_LotteryPoolData.prototype.updateScrollDataCount = function(){
	if(!this.active)
		CP.ShowLotteryInfo.WINDOW_LOTTERY_POOL_DATA_UPDATE_SCROLL_COUNT.call(this);
};

//当前的物品对象
Window_LotteryPoolData.prototype.item = function(){
    var index = this.index();
    if(index >= 0)
        return CP.Lottery.getItemObject(this.currentPool().pool[index]);
    else
        return null;
};

Window_LotteryPoolData.prototype.callUpdateHelp = function(){
    Window_Selectable.prototype.callUpdateHelp.call(this);
};

Window_LotteryPoolData.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};