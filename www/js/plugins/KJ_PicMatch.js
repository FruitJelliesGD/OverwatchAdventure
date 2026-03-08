/*:
 * @plugindesc PicMatch v1.00.
 * @author Kong Jing
 *
 * @param PicCount
 * @desc the total number of picture
 * @default 8
 *
 * @param PicName
 * @desc for exmaple, Pic(1), Pic(2)...
 * @default Pic
 *
 * @param Color
 * @desc the color of line
 * @default #ffffff
 *
 * @param Size
 * @desc the size of the chessboard
 * @default 100
 *
 * @param Col
 * @desc how many cols?
 * @default 6
 *
 * @param Row
 * @desc how many rows?
 * @default 6
 *
 * @param SwitchId
 * @desc the SwitchId to save result
 * 1 is win, 2 is lose
 * @default 1
 *
 * @param CancelText
 * @desc the name display. if none, will no command to give up.
 * @default 放弃
 *
 * @param Sound1
 * @desc Se, when select picture
 * @default
 *
 * @param Sound2
 * @desc Se, when match two pictures
 * @default
 *
 * @param UI
 * @desc the picture of paper
 * @default
 *
 * @help
 * 参数说明：
 * PicCount参数是，素材图片总数量。
 * (根据算法问题，尽量平均每张图片总数量，但除不通时，靠后的图片数量大于等于靠前的图片)
 * PicName参数是，素材图片的名字。
 * Size * Size是连连看图片的像素大小。
 * Col参数是，总共多少列。
 * Row参数是，总共多少行。
 * SwitchId参数是，小游戏胜利会打开的游戏开关。
 * CancelText参数，放弃显示的文字，为空不允许放弃
 * 图片均可自行替换，但不要改名字（改名字也可以，修改相应代码orz）
 * UI设置给左侧增加纸条背景。
 * Sound游戏音效，1是选中图片，2是成功消除。
 *
 * 使用方法：
 * 插件命令
 * PicMatch Col Row
 * 如PicMatch 6 6
 *
 * 
 */

// Imported
var Imported = Imported || {};
Imported.KJ_PicMatch = true;

// Parameter Variables
var KJ = KJ || {};
KJ.PicMatch = KJ.PicMatch || {};

KJ.PicMatch.Parameters = PluginManager.parameters('KJ_PicMatch');
KJ.PicMatch.Param = KJ.PicMatch.Param || {};

KJ.PicMatch.Param.PicCount = parseInt(KJ.PicMatch.Parameters['PicCount']) || 4;
KJ.PicMatch.Param.PicName = String(KJ.PicMatch.Parameters['PicName']);
KJ.PicMatch.Param.Color = String(KJ.PicMatch.Parameters['Color']);
KJ.PicMatch.Param.Col = parseInt(KJ.PicMatch.Parameters['Col']) || 6;
KJ.PicMatch.Param.Row = parseInt(KJ.PicMatch.Parameters['Row']) || 6;
KJ.PicMatch.Param.SwitchId = parseInt(KJ.PicMatch.Parameters['SwitchId']);
KJ.PicMatch.Param.CancelText = String(KJ.PicMatch.Parameters['CancelText']);
KJ.PicMatch.Param.Size = parseInt(KJ.PicMatch.Parameters['Size']) || 750;
KJ.PicMatch.Param.Sound1 = String(KJ.PicMatch.Parameters['Sound1']);
KJ.PicMatch.Param.Sound2 = String(KJ.PicMatch.Parameters['Sound2']);
KJ.PicMatch.Param.UI = String(KJ.PicMatch.Parameters['UI']);
// Interpreter
KJ.PicMatch.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	KJ.PicMatch.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'PicMatch') {
		KJ.PicMatch.Param.Col = parseInt(args[0]) || 6;
		KJ.PicMatch.Param.Row = parseInt(args[1]) || 6;
		SceneManager.push(Scene_PicMatch);
	}
};
Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
        return 'Zcoolkuaile, Heiti TC, sans-serif';
    } else if ($gameSystem.isKorean()) {
        return 'Dotum, AppleGothic, sans-serif';
    } else {
        return 'GameFont';
    }
};
ImageManager.loadPicMatch = function(filename, hue) {
	return this.loadBitmap('img/PicMatch/', filename, hue, true);
};
function Scene_PicMatch() {
    this.initialize.apply(this, arguments);
}
Scene_PicMatch.prototype = Object.create(Scene_Base.prototype);
Scene_PicMatch.prototype.constructor = Scene_PicMatch;
Scene_PicMatch.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._step = 0;
	this._totalNumber = KJ.PicMatch.Param.Col * KJ.PicMatch.Param.Row;
	this._remainNumber = this._totalNumber;
	this._deleteNumber = 0;
	this._current = -1;
	this._match = 0;
	this._width = Graphics.boxWidth * 0.25;
	this._judge = true;
	this._result = false;
	this._animationTime = 30;
	this._sound1 = {"name":KJ.PicMatch.Param.Sound1,"pan":0,"pitch":100,"volume":90};
	this._sound2 = {"name":KJ.PicMatch.Param.Sound2,"pan":0,"pitch":100,"volume":90};
	this.initSize();
	this.initNumber();
};
Scene_PicMatch.prototype.initSize = function() {
	var width = Graphics.boxWidth - this._width;
	var height = Graphics.boxHeight;
	var x = width / (KJ.PicMatch.Param.Col + 2);
	var y = height / (KJ.PicMatch.Param.Row + 2);
	if(x > y){
		this._picSize = height / (KJ.PicMatch.Param.Row + 2) + 1;
		this._scale = y / KJ.PicMatch.Param.Size;
	}
	else {
		this._picSize = width / (KJ.PicMatch.Param.Col + 2) + 1;
		this._scale = x / KJ.PicMatch.Param.Size;
	}
	this._picX = this._width + (width - this._picSize * KJ.PicMatch.Param.Col) * 0.5;
	this._picY = (height - this._picSize * KJ.PicMatch.Param.Row) * 0.5;
};
Scene_PicMatch.prototype.initNumber = function() {
	var total = this._totalNumber;
	var number = KJ.PicMatch.Param.PicCount + 1;
	for(var i = 1; i < number; i++){
		this['PicBitmap' + i] = ImageManager.loadPicMatch(KJ.PicMatch.Param.PicName + '(' + i + ')');
		var count = Math.floor(total / (number - i) / 2);
		if(count < 1)
			count = 1;
		this['PicNumber' + i] = count * 2;
		total -= count * 2;
	}
};
Scene_PicMatch.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createBackgroud();
    this.createWindowLayer();
	this.createMessageWindow();
	if(KJ.PicMatch.Param.CancelText)
		this.createCommandWindow();
};
Scene_PicMatch.prototype.adjustSprite = function(sprite) {
	sprite.scale.x = this._scale;
	sprite.scale.y = this._scale;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};
Scene_PicMatch.prototype.createBackgroud = function(){
	if(KJ.PicMatch.Param.UI){
		var height = Graphics.boxHeight * 0.5;
		var width = this._width;
		this._MessageSprite = new Sprite(ImageManager.loadPicMatch(KJ.PicMatch.Param.UI));
		this._MessageSprite.x = width / 2;
		this._MessageSprite.y = height;
		this._MessageSprite.anchor.x = 0.5;
		this._MessageSprite.anchor.y = 0.5;
		var scale = Graphics.boxWidth / 1500;
		this._MessageSprite.scale.x = scale;
		this._MessageSprite.scale.y = scale;
		this.addChild(this._MessageSprite);
	}
	var number;
	for(var i = 0; i < KJ.PicMatch.Param.Col; i++){
		for(var j = 0; j < KJ.PicMatch.Param.Row; j++){
			number = i + j * KJ.PicMatch.Param.Col;
			this['_PicSprite' + number] = new Sprite();
			this.adjustSprite(this['_PicSprite' + number]);
			this['_PicSprite' + number].x = this._picX + this._picSize * (i + 0.5);
			this['_PicSprite' + number].y = this._picY + this._picSize * (j + 0.5);
			this.addChild(this['_PicSprite' + number]);
		}
	}
	for(var i = 1; i <= 2; i++){
		this['_selectSprite' + i] = new Sprite(ImageManager.loadPicMatch('select'));
		this['_selectSprite' + i].opacity = 0;
		this.adjustSprite(this['_selectSprite' + i]);
		this.addChild(this['_selectSprite' + i]);
	}
};
Scene_PicMatch.prototype.randomPicMatch = function() {
	this._Board = [];
	for(var i = 0; i < this._totalNumber; i++){
		this['_PicSprite' + i].bitmap = null;
		this['_PicSprite' + i].opacity = 255;
		this._Board.push(0);
	}
	var number;
	var place;
	for(var i = 1; i <= KJ.PicMatch.Param.PicCount; i++){
		number = this['PicNumber' + i];
		for(var j = 0; j < number; j++){
			place = Math.floor(Math.random()*this._totalNumber);
			while(true){
				place++; place %= this._totalNumber;
				if(this._Board[place] === 0){
					this._Board[place] = i;
					this['_PicSprite' + place].bitmap = this['PicBitmap' + i];
					break;
				}
			}
		}
	}
};
Scene_PicMatch.prototype.createMessageWindow = function(){
	this._linkWindow = new Window_Base(0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this._linkWindow.setBackgroundType(2);
	this.addWindow(this._linkWindow);
	
	this._messageWindow = new Window_Base(0, Graphics.boxHeight * 0.25, Graphics.boxWidth, Graphics.boxHeight * 0.40);
	this._messageWindow.setBackgroundType(1);
	this._messageWindow.hide();
	this.addWindow(this._messageWindow);
	
	var height = Graphics.boxHeight * 0.5;
	var width = this._width;
    this._informationWindow = new Window_Base(0, Graphics.boxHeight * 0.25, width, height);
	this._informationWindow.setBackgroundType(2);
    this.addWindow(this._informationWindow);
};
Scene_PicMatch.prototype.createCommandWindow = function() {
	var width = 150;
	var x = (this._width - width) * 0.5;
	var y = Graphics.boxHeight * 0.75;
	this._commandWindow = new Window_CancelCommand(x, y);
	this._commandWindow.setBackgroundType(2);
	this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};
Scene_PicMatch.prototype.start = function() {
    this._active = true;
	this.randomPicMatch();
	this.updateInformation();
	while(this.checkMatch()){
		this.randomPicMatch();
	}
	this._linkWindow.contents.clear();
};
Scene_PicMatch.prototype.checkMatch = function(){
	var x, y, i, j;
	if(this._remainNumber === 0){
		this._result = true;
		return false
	}
	for(var m = 0; m < this._totalNumber; m++){
		if(this._Board[m] != 0){
			x = m % KJ.PicMatch.Param.Col;
			y = Math.floor(m / KJ.PicMatch.Param.Col);
			for(var n = m + 1; n < this._totalNumber; n++){
				if(this._Board[n] === this._Board[m]){
					i = n % KJ.PicMatch.Param.Col;
					j = Math.floor(n / KJ.PicMatch.Param.Col);
					if(this.directLink(x, y, i, j)){
						return false;
					}
					else if(this.bendOnce(x, y, i, j)){
						return false;
					}
					else if(this.bendTwice(x, y, i, j)){
						return false;
					}
				}
			}
		}
	}
	return true;
};
Scene_PicMatch.prototype.update = function(){
	Scene_Base.prototype.update.call(this);
	if(this._judge){
		this.updateControl();
		if(this._result){
			this.updateContent('恭喜胜利');
			$gameSwitches.setValue(KJ.PicMatch.Param.SwitchId, true);
			this._commandWindow.redrawItem(0, '成功');
			this._judge = false;
		}
		else if(this._current != -1){
			if(this._Board[this._current] != 0){
				this._step++;
				this.updateInformation();
				var x = this._current % KJ.PicMatch.Param.Col;
				var y = Math.floor(this._current / KJ.PicMatch.Param.Col);
				if(this._match == 0){
					this._selectSprite1.opacity = 255;
					this._selectSprite1.x = this._picX + this._picSize * (x + 0.5);
					this._selectSprite1.y = this._picY + this._picSize * (y + 0.5);
					this._match = this._Board[this._current];
					this._x = x;
					this._y = y;
					AudioManager.playSe(this._sound1);
				}
				else if(this._match == this._Board[this._current]){
					if(x != this._x || y != this._y){
						this._selectSprite2.opacity = 255;
						this._selectSprite2.x = this._picX + this._picSize * (x + 0.5);
						this._selectSprite2.y = this._picY + this._picSize * (y + 0.5);
						this._i = x;
						this._j = y;
						this.updateMatching();
					}
				}
				else{
					AudioManager.playSe(this._sound1);
					this._match = 0;
					this._selectSprite1.opacity = 0;
					this._selectSprite2.opacity = 0;
				}
			}
			this._current = -1;
		}
	}
	else if(this._waitTime > 0){
		this._waitTime--;
		// this._linkWindow.contentsOpacity = this._waitTime / this._animationTime * 255;
		var number = this._x + this._y * KJ.PicMatch.Param.Col;
		this['_PicSprite' + number].opacity = this._waitTime / this._animationTime * 255;
		number = this._i + this._j * KJ.PicMatch.Param.Col;
		this['_PicSprite' + number].opacity = this._waitTime / this._animationTime * 255;
		if(this._waitTime === 0){
			this._judge = true;
			this['PicNumber' + this._match] -= 2;
			this._match = 0;
			this._Board[this._x + this._y * KJ.PicMatch.Param.Col] = 0;
			this._Board[this._i + this._j * KJ.PicMatch.Param.Col] = 0;
			this._remainNumber -= 2;
			this._deleteNumber += 2;
			this._selectSprite1.opacity = 0;
			this._selectSprite2.opacity = 0;
			this._linkWindow.contents.clear();
			while(this.checkMatch()){
				this.randomPicMatch();
			}
			this._linkWindow.contents.clear();
			this.updateInformation();
		}
	}
};
Scene_PicMatch.prototype.updateContent = function(content){
	this._messageWindow.show();
	var padding = this._messageWindow.padding;
	var height = this._messageWindow.height;
	var width = this._messageWindow.width;
	this._messageWindow.contents.fontSize = 50;
	this._messageWindow.contents.clearRect(0, 0, width, height);
	this._messageWindow.drawText(content, 0, height/3, width - padding*2, 'center');
};
Scene_PicMatch.prototype.updateInformation = function(){
	var padding = this._informationWindow.padding;
	var height = this._informationWindow.height;
	var width = this._informationWindow.width;
	this._informationWindow.contents.clearRect(0, 0, width, height);
	this._informationWindow.drawText('步数：'+this._step, 0, 0, width - padding*2, 'center');
	this._informationWindow.drawText('剩余：'+this._remainNumber, 0, height/3, width - padding*2, 'center');
	this._informationWindow.drawText('消除：'+this._deleteNumber, 0, height/3*2, width - padding*2, 'center');
};

Scene_PicMatch.prototype.updateControl = function(){
	if(TouchInput.isTriggered()){
		var i = Math.floor((TouchInput.x - this._picX) / this._picSize);
		var j = Math.floor((TouchInput.y - this._picY) / this._picSize);
		if(i  >= 0 && i < KJ.PicMatch.Param.Col && j >= 0 && j < KJ.PicMatch.Param.Row)
			this._current = i + j * KJ.PicMatch.Param.Col;
	}
};
Scene_PicMatch.prototype.updateMatching = function(){
	var x = this._x;
	var y = this._y;
	var i = this._i;
	var j = this._j;
	if(this.directLink(x, y, i, j)){
		this._judge = false;
		AudioManager.playSe(this._sound2);
	}
	else if(this.bendOnce(x, y, i, j)){
		this._judge = false;
		AudioManager.playSe(this._sound2);
	}
	else if(this.bendTwice(x, y, i, j)){
		this._judge = false;
		AudioManager.playSe(this._sound2);
	}
	else{
		AudioManager.playSe(this._sound1);
		this._match = 0;
		this._selectSprite1.opacity = 0;
		this._selectSprite2.opacity = 0;
	}
	this._waitTime = this._animationTime;
};
Scene_PicMatch.prototype.drawLine = function(x, y, i, j){
	var padding = this._linkWindow.padding;
	var a = Math.floor(this._picX + this._picSize * (x + 0.5)) - padding;
	var b = Math.floor(this._picX + this._picSize * (i + 0.5)) - padding;
	var c = Math.floor(this._picY + this._picSize * (y + 0.5)) - padding;
	var d = Math.floor(this._picY + this._picSize * (j + 0.5)) - padding;
	var context = this._linkWindow.contents._context;
	context.save();
	context.strokeStyle = KJ.PicMatch.Param.Color;
	context.lineWidth = 4;
	context.beginPath();
	context.moveTo(a, c);
	context.lineTo(b, d);
	// context.closePath();
	context.stroke();
	context.restore();
	this._linkWindow.contents._setDirty();
};
Scene_PicMatch.prototype.directLink = function(x, y, i, j){
	var start, end, delta;
	if(x === i){
		if(x === -1 || x === KJ.PicMatch.Param.Col){
			this.drawLine(x, y, i, j);
			return true;
		}
		delta = KJ.PicMatch.Param.Col;
		start = (y < j) ? x + y * KJ.PicMatch.Param.Col: i + j * KJ.PicMatch.Param.Col ;
		end = (y > j) ? x + y * KJ.PicMatch.Param.Col: i + j * KJ.PicMatch.Param.Col ;
	}
	else if(y === j){
		if(y === -1 || y === KJ.PicMatch.Param.Row){
			this.drawLine(x, y, i, j);
			return true;
		}
		delta = 1;
		start = (x < i) ? x + y * KJ.PicMatch.Param.Col: i + j * KJ.PicMatch.Param.Col;
		end = (x > i) ? x + y * KJ.PicMatch.Param.Col: i + j * KJ.PicMatch.Param.Col;
	}
	else return false;
	for(var m = start + delta; m < end; m += delta){
		if(this._Board[m] !== 0)
			return false;
	}
	this.drawLine(x, y, i, j);
	return true;
};
Scene_PicMatch.prototype.bendOnce = function(x, y, i, j){
	var m, n;
	m = x; n = j;
	if(m >= 0 && m < KJ.PicMatch.Param.Col && n >= 0 && n < KJ.PicMatch.Param.Row){
		if(this._Board[m + n * KJ.PicMatch.Param.Col] == 0)
			if(this.directLink(x, y, m, n) && this.directLink(m, n, i, j))
				return true;
	}
	else if(this.directLink(x, y, m, n) && this.directLink(m, n, i, j))
		return true;
	m = i; n = y;
	this._linkWindow.contents.clear();
	if(m >= 0 && m < KJ.PicMatch.Param.Col && n >= 0 && n < KJ.PicMatch.Param.Row){
		if(this._Board[m + n * KJ.PicMatch.Param.Col] == 0)
			if(this.directLink(x, y, m, n) && this.directLink(m, n, i, j))
				return true;
	}
	else if(this.directLink(x, y, m, n) && this.directLink(m, n, i, j))
		return true;
	this._linkWindow.contents.clear();
	return false;
};
Scene_PicMatch.prototype.bendTwice = function(x, y, i, j){
	var m, n;
	n = j;
	for(m = -1; m <= KJ.PicMatch.Param.Col; m++){
		if(m === -1 || m === KJ.PicMatch.Param.Col){
			if(this.bendOnce(x, y, m, n) && this.directLink(m, n, i, j))
				return true;
		}
		else if(this._Board[m + n * KJ.PicMatch.Param.Col] == 0){
			if(this.bendOnce(x, y, m, n) && this.directLink(m, n, i, j))
				return true;
		}
		this._linkWindow.contents.clear();
	}
	m = i;
	for(n = -1; n <= KJ.PicMatch.Param.Row; n++){
		if(n === -1 || n === KJ.PicMatch.Param.Row){
			if(this.bendOnce(x, y, m, n) && this.directLink(m, n, i, j))
				return true;
		}
		else if(this._Board[m + n * KJ.PicMatch.Param.Col] == 0){
			if(this.bendOnce(x, y, m, n) && this.directLink(m, n, i, j))
				return true;
		}
		this._linkWindow.contents.clear();
	}
	return false;
};
function Window_CancelCommand() {
	this.initialize.apply(this, arguments);
}
Window_CancelCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_CancelCommand.prototype.constructor = Window_CancelCommand;
Window_CancelCommand.prototype.initialize = function (x, y) {
	Window_HorzCommand.prototype.initialize.call(this, x, y);
};
Window_CancelCommand.prototype.maxCols = function () {
	return 1;
};
Window_CancelCommand.prototype.makeCommandList = function () {
	this.addCommand(KJ.PicMatch.Param.CancelText, 'cancel');
};
Window_CancelCommand.prototype.windowWidth = function() {
    return 150;
};
Window_CancelCommand.prototype.redrawItem = function(index, name) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
	this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.drawText(name, rect.x, rect.y, rect.width, align);
	this.activate();
};