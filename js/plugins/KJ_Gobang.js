/*:
 * @plugindesc Gobang. v1.04
 * @author Kong Jing
 *
 * @param VariableId
 * @desc the variableId to save result
 * 1 is win, 2 is lose
 * @default 1
 *
 * @param CancelText
 * @desc the name display. if none, will no command to give up.
 * @default 放弃
 *
 * @param RegretEnable
 * @desc allow regret or not
 * @default true
 *
 * @param Level
 * @desc 1~6
 * @default 3
 *
 * @param Size
 * @desc the size of the chessboard
 * @default 750
 *
 * @param Sound
 * @desc Se
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param UI
 * @desc the picture of paper
 * @default
 * @require 1
 * @dir img/Gobang/
 * @type file
 *
 * @requiredAssets img/Gobang/black
 * @requiredAssets img/Gobang/white
 * @requiredAssets img/Gobang/chessboard
 * @requiredAssets img/Gobang/last
 *
 * @help
 * 参数说明：
 * VariableId参数是，下棋结束后会修改的游戏变量，1为胜利，2为失败。
 * CancelText参数，放弃显示的文字
 * RegretEnable参数，是否允许悔棋
 * Level参数，难易度，最低1，6开始电脑下棋开始感觉得到延迟。
 * Size * Size是棋盘的像素大小，棋子像素宽高均是Size除15
 * 图片均可自行替换，但不要改名字（改名字也可以，修改相应代码orz）。
 * Sound游戏下子音效，UI设置给左右两侧增加纸条背景。
 *
 * 使用方法：
 * 插件命令
 * Gobang Level RegretEnable
 * 如Gobang 1 true
 *
 * 
 */

// Imported
var Imported = Imported || {};
Imported.KJ_Gobang = true;

// Parameter Variables
var KJ = KJ || {};
KJ.Gobang = KJ.Gobang || {};

KJ.Gobang.Parameters = PluginManager.parameters('KJ_Gobang');
KJ.Gobang.Param = KJ.Gobang.Param || {};

KJ.Gobang.Param.VariableId = parseInt(KJ.Gobang.Parameters['VariableId']);
KJ.Gobang.Param.CancelText = String(KJ.Gobang.Parameters['CancelText']);
KJ.Gobang.Param.RegretEnable = (KJ.Gobang.Parameters['RegretEnable'].toLowerCase() === 'true');
KJ.Gobang.Param.Level = parseInt(KJ.Gobang.Parameters['Level']) || 1;
KJ.Gobang.Param.Size = parseInt(KJ.Gobang.Parameters['Size']) || 750;
KJ.Gobang.Param.Sound = String(KJ.Gobang.Parameters['Sound']);
KJ.Gobang.Param.UI = String(KJ.Gobang.Parameters['UI']);
// Interpreter
KJ.Gobang.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	KJ.Gobang.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'Gobang') {
		KJ.Gobang.Param.Level = parseInt(args[0]) || 1;
		KJ.Gobang.Param.RegretEnable = args[1].toLowerCase() === 'true';
		SceneManager.push(Scene_Gobang);
	}
};

ImageManager.loadGobang = function(filename, hue) {
	return this.loadBitmap('img/Gobang/', filename, hue, true);
};
function Scene_Gobang() {
    this.initialize.apply(this, arguments);
}
Scene_Gobang.prototype = Object.create(Scene_Base.prototype);
Scene_Gobang.prototype.constructor = Scene_Gobang;
Scene_Gobang.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._scale = Graphics.boxHeight * 0.9 / KJ.Gobang.Param.Size;
	this._black = ImageManager.loadGobang('black');
	this._white = ImageManager.loadGobang('white');
	this._delta = KJ.Gobang.Param.Size / 15 * this._scale; 
	this._startX = Graphics.boxWidth * 0.5 - 7.5 * this._delta;
	this._startY = 0 * this._delta;
	this._current = -1;
	this._result = null;
	this._judge = true;
	this._player = Math.floor(Math.random() * 2);
	this._realturn = 0;
	this._turn = 0;
	this._step = 0;
	this._loadingTime = 20;
	this._lastcurrent = -1;
	this._sound = {"name":KJ.Gobang.Param.Sound,"pan":0,"pitch":100,"volume":90};
	this._show = false;
};
Scene_Gobang.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createChessboard();
    this.createWindowLayer();
	this.createCommandWindow();
	this.createMessageWindow();
};
Scene_Gobang.prototype.createChessboard = function() {
	if(KJ.Gobang.Param.UI){
		var height = Graphics.boxHeight * 0.5;
		var width = (Graphics.boxWidth - Graphics.boxHeight * 0.9) / 2;
		for(var i = 1; i < 3; i++){
			this['_MessageSprite' + i] = new Sprite(ImageManager.loadGobang(KJ.Gobang.Param.UI));
			this['_MessageSprite' + i].y = height;
			this.adjustSprite(this['_MessageSprite' + i]);
			this.addChild(this['_MessageSprite' + i]);
		}
		this._MessageSprite1.x = width / 2;
		this._MessageSprite2.x = Graphics.boxWidth - width / 2;
	}
	
    this._backgroundSprite = new Sprite(ImageManager.loadGobang('chessboard'));
	this._backgroundSprite.x = Graphics.boxWidth * 0.5;
	this._backgroundSprite.y = Graphics.boxHeight * 0.45;
	this.adjustSprite(this._backgroundSprite);
	this.addChild(this._backgroundSprite);
	var number, x, y;
	for(var i = 0; i < 15; i++)
		for(var j = 0; j < 15; j++){
			number = i + j * 15;
			x = this._startX + (i + 0.5) * this._delta;
			y = this._startY + (j + 0.5) * this._delta;
			this['_chess' + number] = new Sprite(null);
			this['_chess' + number].x = x;
			this['_chess' + number].y = y;
			this.adjustSprite(this['_chess' + number]);
			this.addChild(this['_chess' + number]);
		}
	KJ.Gobang.chessboard = [];
	for(var i = 0; i < 16; i++){
		KJ.Gobang.chessboard.push([]);
		for(var j = 0; j < 32; j++){
			KJ.Gobang.chessboard[i].push(0);
		}
	}
	this._lastchessSprite = new Sprite(ImageManager.loadGobang('last'));
	this._lastchessSprite.x = this._startX + (7 + 0.5) * this._delta;
	this._lastchessSprite.y = this._startY + (7 + 0.5) * this._delta;
	this.adjustSprite(this._lastchessSprite);
	this.addChild(this._lastchessSprite);
};
Scene_Gobang.prototype.adjustSprite = function(sprite) {
	sprite.scale.x = this._scale;
	sprite.scale.y = this._scale;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};
Scene_Gobang.prototype.createMessageWindow = function() {
	this._messageWindow = new Window_Base(0, Graphics.boxHeight * 0.30, Graphics.boxWidth, Graphics.boxHeight * 0.40);
	this._messageWindow.setBackgroundType(2);
	this.addWindow(this._messageWindow);
	var height = Graphics.boxHeight * 0.5;
	var width = (Graphics.boxWidth - Graphics.boxHeight * 0.9) / 2;
    this._messageWindow1 = new Window_Base(0, Graphics.boxHeight * 0.25, width, height);
	this._messageWindow2 = new Window_Base(Graphics.boxWidth - width, Graphics.boxHeight * 0.25, width, height);
	this._messageWindow1.setBackgroundType(2);
	this._messageWindow2.setBackgroundType(2);
    this.addWindow(this._messageWindow1);
	this.addWindow(this._messageWindow2);
};
Scene_Gobang.prototype.createCommandWindow = function() {
	var width = 150;
	var x = (Graphics.boxWidth - width) * 0.5;
	var y = Graphics.boxHeight * 0.9;
	this._commandWindow = new Window_CancelCommand(x, y);
	this._commandWindow.setBackgroundType(2);
	this._commandWindow.setHandler('cancel',    this.regret.bind(this));
	this.addWindow(this._commandWindow);
};
Scene_Gobang.prototype.regret = function(){
	if(KJ.Gobang.Param.RegretEnable && this._lastcurrent >= 0){
		var x = this._x;
		var y = this._y;
		KJ.Gobang.chessboard[x][y] = 0;
		y = y / 2 - 1;
		var number = x + y * 15;
		this['_chess' + number].bitmap = null;
		x = this._lastcurrent % 15;
		y = Math.floor(this._lastcurrent / 15) * 2 + 2;
		KJ.Gobang.chessboard[x][y] = 0;
		number = this._lastcurrent;
		this['_chess' + number].bitmap = null;
		this._step-=2;
		this._lastcurrent = -1;
		this._commandWindow.redrawItem(0, KJ.Gobang.Param.CancelText);
	}
	else this.popScene();
};
Scene_Gobang.prototype.start = function() {
    this._active = true;
	this.showInformation();
	this.updateInformation();
};
Scene_Gobang.prototype.update = function(){
	Scene_Base.prototype.update.call(this);
	var content;
	this.showInformation();
	if(this._loadingTime > 0){
		this._loadingTime--;
	}
	else if(this._judge){
		this.updateInformation();
		this.updateControl();
		if(this.updateChess()){
			if(this._result == true){
				$gameVariables.setValue(KJ.Gobang.Param.VariableId, 1);
				content = '赢了!';
				this.updateContent('恭喜胜利');
			}
			else{
				$gameVariables.setValue(KJ.Gobang.Param.VariableId, 2);
				content = '输了';
				this.updateContent('继续努力');
			}
			this._lastcurrent = -1;
			this._commandWindow.redrawItem(0, content);
			this._waitTime = 0;
		}
	}
	else if(this._waitTime > 0){
		this._waitTime--;
		if(this._waitTime === 0){
			this._judge = true;
		}
	}
};
Scene_Gobang.prototype.updateContent = function(content){
	var padding = this._messageWindow.padding;
	var height = this._messageWindow.height;
	var width = this._messageWindow.width;
	this._messageWindow.contents.fontSize = 50;
	this._messageWindow.setBackgroundType(1);
	this._messageWindow.contents.clearRect(0, 0, width, height);
	this._messageWindow.drawText(content, 0, height/3, width - padding*2, 'center');
};
Scene_Gobang.prototype.updateInformation = function(){
	var padding = this._messageWindow1.padding;
	var height = this._messageWindow1.height;
	var width = this._messageWindow1.width;
	this._messageWindow1.contents.clearRect(0, 0, width, height);
	this._messageWindow1.drawText('步数：', 0, 0, width - padding*2, 'center');
	this._messageWindow1.drawText(''+this._step, 0, height/2, width - padding*2, 'center');
};
Scene_Gobang.prototype.showInformation = function(){
	if(this._show){
		return;
	}
	if(!this._black.isReady() || !this._white.isReady()){
		return;
	}
	var height = this._messageWindow2.contents.height;
	var width = this._messageWindow2.contents.width;
	var bitmap1 = (this._player === 0)? this._white:this._black;
	var bitmap2 = (this._player === 1)? this._white:this._black;
	this._messageWindow2.contents.clearRect(0, 0, width, height);
	var w1, w2, h1, h2;
	w1 = bitmap1.width; w2 = bitmap2.width;
	h1 = bitmap1.height; h2 = bitmap2.height;
	this._messageWindow2.drawText('敌方', 0, 0, width, 'center');
	this._messageWindow2.contents.blt(bitmap1, 0, 0, w1, h1, (width-w1)/2, height/4-h1/2);
	this._messageWindow2.drawText('我方', 0, height/2, width, 'center');
	this._messageWindow2.contents.blt(bitmap2, 0, 0, w2, h2, (width-w2)/2, height/4*3-h2/2);
	this._show = true;
};
Scene_Gobang.prototype.updateControl = function(){
	if(TouchInput.isTriggered()){
		var i = Math.floor((TouchInput.x - this._startX) / this._delta);
		var j = Math.floor((TouchInput.y - this._startY) / this._delta);
		if(i  >= 0 && i  < 15 && j >= 0 && j < 15)
			this._current = i + j * 15;
	}
};
Scene_Gobang.prototype.updateChess = function() {
	var judge = 0;
	if(this._realturn === this._player){
		if(this._current > -1){
			var i = this._current % 15;
			var j = Math.floor(this._current / 15);
			j = (j + 1) * 2;
			if(this.issblank(i, j)){
				KJ.Gobang.chessboard[i][j] = 1 - this._turn + 1;
				this.drawChess(i, j);
				if(KJ.Gobang.Param.RegretEnable && this._lastcurrent < 0){
					this._commandWindow.redrawItem(0, '悔棋');
				}
				this._lastcurrent = this._current;
				this._current = -1;
				this._realturn = 1 - this._realturn;
				this._turn = 1 - this._turn;
				this._step++;
				AudioManager.playSe(this._sound);
				judge = this.judge();
			}
		}
	}
	else {
		this.choose(KJ.Gobang.Param.Level);
		var x = this._x;
		var y = this._y;
		KJ.Gobang.chessboard[x][y] = 1 - this._turn + 1;
		this.drawChess(x, y);
		this._realturn = 1 - this._realturn;
		this._turn = 1 - this._turn;
		this._step++;
		AudioManager.playSe(this._sound);
		judge = this.judge();
	}
	if(judge === 0)
		return false;
	else if(judge === 2 - this._player)
		this._result = true;
	else
		this._result = false;
	return true;
};
Scene_Gobang.prototype.drawChess = function(i, j) {
	var number = i + (j / 2 - 1) * 15;
	if(KJ.Gobang.chessboard[i][j] === 1){
		this['_chess' + number].bitmap = this._white;
	}
	else if(KJ.Gobang.chessboard[i][j] === 2){
		this['_chess' + number].bitmap = this._black;
	}
	this._lastchessSprite.x = this._startX + (i + 0.5) * this._delta;
	this._lastchessSprite.y = this._startY + (j / 2 - 0.5) * this._delta;
	this._judge = false;
	this._waitTime = 20;
};
Scene_Gobang.prototype.recover = function(i, j){
	KJ.Gobang.chessboard[i][j] = 0;
};
Scene_Gobang.prototype.choose = function(n){
	var max1 = {};
	var max2 = {};
	var max3 = {};
	var max4 = {};
	var max5 = {};

	max1.point=max2.point=max3.point=max4.point=max5.point=0;
	var max = -100000000;
	var i,j;
	var occasion;
	if(n > 1){
		for(i = 0; i <= 14;i++)
			for(j = 2;j <= 30;j+=2)
				if(this.issblank(i,j)){
					if(this.point(i,j)>=max1.point){
						max5 = max4;
						max4 = max3;
						max3 = max2;
						max2 = max1;
						max1.point = this.point(i,j);
						max1.x = i;
						max1.y = j;
					}
					else if(this.point(i,j)>=max2.point){
						max5 = max4;
						max4 = max3;
						max3 = max2;
						max2.point = this.point(i,j);
						max2.x = i;
						max2.y = j;
					}
					else if(this.point(i,j)>=max3.point){
						max5 = max4;
						max4 = max3;
						max3.point = this.point(i,j);
						max3.x = i;
						max3.y = j;
					}
					else if(this.point(i,j)>=max4.point){
						max5 = max4;
						max4.point = this.point(i,j);
						max4.x = i;
						max4.y = j;
					}
					else if(this.point(i,j)>=max5.point){
						max5.point = this.point(i,j);
						max5.x = i;
						max5.y = j;
					}
				}
		occasion = Math.floor(max1.point/1000);
		max1.point = max1.point-1000*Math.floor(max1.point/1000);
		if(occasion===11)
			max1.point+=25000*Math.pow(2,n);
		if(occasion===9||occasion===8)
			max1.point+=5000*Math.pow(2,n);
		if(occasion===4)
			max1.point+=1000*Math.pow(2,n);
		max2.point = max2.point-1000*Math.floor(max2.point/1000);
		max3.point = max3.point-1000*Math.floor(max3.point/1000);
		max4.point = max4.point-1000*Math.floor(max4.point/1000);
		max5.point = max5.point-1000*Math.floor(max5.point/1000);
		this._turn = 1-this._turn;
		KJ.Gobang.chessboard[max1.x][max1.y] = (1-this._turn)? 1: 2;
		max1.point-=this.choose(n-1);
		this.recover(max1.x,max1.y);
		KJ.Gobang.chessboard[max2.x][max2.y] = (1-this._turn)? 1: 2;
		max2.point-=this.choose(n-1);
		this.recover(max2.x,max2.y);
		KJ.Gobang.chessboard[max3.x][max3.y] = (1-this._turn)? 1: 2;
		max3.point-=this.choose(n-1);
		this.recover(max3.x,max3.y);
		KJ.Gobang.chessboard[max4.x][max4.y] = (1-this._turn)? 1: 2;
		max4.point-=this.choose(n-1);
		this.recover(max4.x,max4.y);
		KJ.Gobang.chessboard[max5.x][max5.y] = (1-this._turn)? 1: 2;
		max5.point-=this.choose(n-1);
		this.recover(max5.x,max5.y);
		this._turn = 1-this._turn;
		if(max1.point>max){
			this._x = max1.x;
			this._y = max1.y;
			max = max1.point;
		}
		if(max2.point>max){
			this._x = max2.x;
			this._y = max2.y;
			max = max2.point;
		}
		if(max3.point>max){
			this._x = max3.x;
			this._y = max3.y;
			max = max3.point;
		}
		if(max4.point>max){
			this._x = max4.x;
			this._y = max4.y;
			max = max4.point;
		}
		if(max5.point>max){
			this._x = max5.x;
			this._y = max5.y;
			max = max5.point;
		}
		return max;
	}
	else{
		for(i = 0;i<=14;i++)
			for(j = 2;j<=30;j+=2)
				if(this.issblank(i,j))
					if(this.point(i,j)>max)
					{
						this._x = i;
						this._y = j;
						max = this.point(i,j);
					}
		occasion = Math.floor(max/1000);
		max = max-1000*occasion;
		if(occasion===11||occasion===9||occasion===8||occasion===4)
			max+=2000;
		return max;
	}
};
Scene_Gobang.prototype.point = function(x, y){
	var point = 0;
	var occasion = 0;
	if(this.fwu(x,y)>=1){
		if(this.fchang(x,y)===0)
			occasion = 11;
		else
			occasion = 1;
	}
	if(this.dsi(x,y)>=1&&occasion===0)
		occasion = 10;
	if(this.fhuosi(x,y)>=1&&occasion===0)
		occasion = 9;
	if(this.fchongsi(x,y)>=1&&this.fhuosan(x,y)>=1&&occasion===0)
		occasion = 8;
	if(this.dhuosan(x,y)>=1&&occasion===0){
		if(this.dhuosan(x,y)>1||this.dchongsan(x,y)>0||this.dhuoer(x,y)>0)
			occasion = 7;
		else
			occasion = 6;
	}
	if(this.dchongsan(x,y)+this.dhuoer(x,y)>1&&occasion===0)
		occasion = 5;
	if(this.fhuosan(x,y)>=2&&occasion===0)
		occasion = 4;
	if(this.dhuoer(x,y)>=2&&occasion===0)
		occasion = 3;
	if(occasion===0)
		occasion = 2;
	if(this.fchongsi(x,y)===1)
		point += 90;
	if(this.fhuosan(x,y)===1)
		point += 50;
	point += this.fhuoer(x,y)*80;
	point += this.fchongsan(x,y)*50;
	if(this.dhuoer(x,y)===1)
		point += 141;
	if(this.dchongsan(x,y)===1)
		point += 80;
	if(this.dhuoyi(x,y)===1&&this.dhuoer(x,y)===0)
		point+=50;
	else if(this.dhuoyi(x,y)===2&&this.dhuoer(x,y)===0)
		point+=120;
	else if(this.dhuoyi(x,y)===3&&this.dhuoer(x,y)===0)
		point+=160;
	if(x===7&&y===16)
		point++;
	if(this._step===2&&x===8&&y===16)
		point+=100;
	if(this._step===3){
		if((KJ.Gobang.chessboard[8][16]===2||KJ.Gobang.chessboard[7][14]===2||KJ.Gobang.chessboard[6][16]===2||KJ.Gobang.chessboard[7][18]===2)&&((x===8&&y===18)||(x===8&&y===14)||(x===6&&y===18)||(x===6&&y===14)))
			point+=700;
		else if((KJ.Gobang.chessboard[8][18]===2||KJ.Gobang.chessboard[6][14]===2||KJ.Gobang.chessboard[8][14]===2||KJ.Gobang.chessboard[6][18]===2)&&((x===8&&y===18)||(x===8&&y===14)||(x===6&&y===18)||(x===6&&y===14))&&KJ.Gobang.chessboard[14-x][32-y]!=2)
			point+=500;
	}
	if(this._step===4&&this.dhuoer(x,y)===1)
		point+=700;
	point += occasion*1000;
	return point;
};

Scene_Gobang.prototype.issblank = function(x, y){
	if(KJ.Gobang.chessboard[x][y] != 0)
		return false;
	else return true;
};

Scene_Gobang.prototype.dhuosan = function(x, y){
	var number = 0;
	var c = (1-this._turn)? 1: 2;
	if(x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&this.issblank(x+4,y))
		number++;
	if(x > 3)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&this.issblank(x-4,y))
		number++;
	if(y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+6]===c&&this.issblank(x,y+8))
		number++;
	if(y > 9)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&this.issblank(x,y-8))
		number++;
	if(x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&this.issblank(x+4,y+8))
		number++;
	if(y > 9 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&this.issblank(x+4,y-8))
		number++;
	if(x > 3 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&this.issblank(x-4,y+8))
		number++;
	if(x > 3 && y > 9)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&this.issblank(x-4,y-8))
		number++;
	if(x > 2 && x < 13)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x+1][y]===c&&this.issblank(x-3,y)&&this.issblank(x+2,y))
		number++;
	if(x > 1 && x < 12)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+1][y]===c&&this.issblank(x-2,y)&&this.issblank(x+3,y))
		number++;
	if(y > 5 && y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y-2]===c&&this.issblank(x,y+6)&&this.issblank(x,y-4))
		number++;
	if(y > 7 && y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-2]===c&&this.issblank(x,y-6)&&this.issblank(x,y+4))
		number++;
	if(x > 2 && y > 7 && y < 27 && x < 13)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&this.issblank(x-3,y-6)&&this.issblank(x+2,y+4))
		number++;
	if(x > 1 && y > 5 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&this.issblank(x+3,y+6)&&this.issblank(x-2,y-4))
		number++;
	if(x > 2 && y > 5 && x < 13 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x+1][y-2]===c&&this.issblank(x-3,y+6)&&this.issblank(x+2,y-4))
		number++;
	if(x > 1 && y > 7 && x < 12 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+1][y-2]===c&&this.issblank(x+3,y-6)&&this.issblank(x-2,y+4))
		number++;
	if(x < 10 && y < 21)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+4][y+8]===c&&this.issblank(x+3,y+6)&&this.issblank(x+5,y+10))
		number++;
	if(x < 10 && y < 21)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+3][y+4]===c&&KJ.Gobang.chessboard[x+4][y+8]===c&&this.issblank(x+2,y+4)&&this.issblank(x+5,y+10))
		number++;
	if(x > 4 && y > 11)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-4][y-8]===c&&this.issblank(x-3,y-6)&&this.issblank(x-5,y-10))
		number++;
	if(x > 4 && y > 11)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-3][y-4]===c&&KJ.Gobang.chessboard[x-4][y-8]===c&&this.issblank(x-2,y-4)&&this.issblank(x-5,y-10))
		number++;
	if(x > 4 && y < 21)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-4][y+8]===c&&this.issblank(x-3,y+6)&&this.issblank(x-5,y+10))
		number++;
	if(x > 4 && y < 21)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-3][y+4]===c&&KJ.Gobang.chessboard[x-4][y+8]===c&&this.issblank(x-2,y+4)&&this.issblank(x-5,y+10))
		number++;
	if(y > 11 && x < 10)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+4][y-8]===c&&this.issblank(x+3,y-6)&&this.issblank(x+5,y-10))
		number++;
	if(y > 11 && x < 10)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+3][y-4]===c&&KJ.Gobang.chessboard[x+4][y-8]===c&&this.issblank(x+2,y-4)&&this.issblank(x+5,y-10))
		number++;
	if(x < 10)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+4][y]===c&&this.issblank(x+3,y)&&this.issblank(x+5,y))
		number++;
	if(x < 10)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&KJ.Gobang.chessboard[x+4][y]===c&&this.issblank(x+2,y)&&this.issblank(x+5,y))
		number++;
	if(x > 4)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-4][y]===c&&this.issblank(x-3,y)&&this.issblank(x-5,y))
		number++;
	if(x > 3 && x < 10)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x-4][y]===c&&this.issblank(x-2,y)&&this.issblank(x+5,y))
		number++;
	if(y < 21)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+8]===c&&this.issblank(x,y+6)&&this.issblank(x,y+10))
		number++;
	if(y < 21)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+6]===c&&KJ.Gobang.chessboard[x][y+8]===c&&this.issblank(x,y+4)&&this.issblank(x,y+10))
		number++;
	if(y > 11)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-8]===c&&this.issblank(x,y-6)&&this.issblank(x,y-10))
		number++;
	if(y > 11)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-6]===c&&KJ.Gobang.chessboard[x][y-8]===c&&this.issblank(x,y-4)&&this.issblank(x,y-10))
		number++;
	return number;
};

Scene_Gobang.prototype.dsi = function(x, y){
	var number = 0;
	var c = (1-this._turn)? 1: 2;
	if(x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&KJ.Gobang.chessboard[x+4][y]===c)
		number++;
	if(x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&KJ.Gobang.chessboard[x+4][y+8]===c)
		number++;
	if(y > 9 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&KJ.Gobang.chessboard[x+4][y-8]===c)
		number++;
	if(x > 3)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x-4][y]===c)
		number++;
	if(x > 3 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&KJ.Gobang.chessboard[x-4][y+8]===c)
		number++;
	if(x > 3 && y > 9)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&KJ.Gobang.chessboard[x-4][y-8]===c)
		number++;
	if(y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+6]===c&&KJ.Gobang.chessboard[x][y+8]===c)
		number++;
	if(y > 9)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&KJ.Gobang.chessboard[x][y-8]===c)
		number++;
	
	if(y > 5 && y < 27)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c)
		number++;
	if(x > 1 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c)
		number++;
	if(x > 1 && y > 5 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c)
		number++;
	if(x > 1 && y > 5 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c)
		number++;
	if(y > 7 && y < 29)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&KJ.Gobang.chessboard[x][y+2]===c)
		number++;
	if(y > 3 && y < 25)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+6]===c)
		number++;
	if(x > 0 && x < 12)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+3][y]===c)
		number++;
	if(x > 2 && x < 14)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c)
		number++;
	if(x > 2 && y > 7 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&KJ.Gobang.chessboard[x+1][y+2]===c)
		number++;
	if(x > 0 && y > 3 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c)
		number++;
	if(x > 0 && y > 7 && x < 12 && y < 29)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x+3][y-6]===c)
		number++;
	if(x > 2 && y > 7 && x < 14 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c)
		number++;
	return number;
};

Scene_Gobang.prototype.dchongsan = function(x, y){
	var number = 0;
	var c = (1-this._turn)? 1: 2;
	if(x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&KJ.Gobang.chessboard[x+4][y]!=c&&!this.issblank(x+4,y))
		number++;
	if(x > 3)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x-4][y]!=c&&!this.issblank(x-4,y))
		number++;
	if(y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+6]===c&&KJ.Gobang.chessboard[x][y+8]!=c&&!this.issblank(x,y+8))
		number++;
	if(y > 9 && y < 23)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&KJ.Gobang.chessboard[x][y+8]!=c&&!this.issblank(x,y-8))
		number++;
	if(x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&KJ.Gobang.chessboard[x+4][y+8]!=c&&!this.issblank(x+4,y+8))
		number++;
	if(y > 9 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&KJ.Gobang.chessboard[x+4][y-8]!=c&&!this.issblank(x+4,y-8))
		number++;
	if(x > 3 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&KJ.Gobang.chessboard[x-4][y+8]!=c&&!this.issblank(x-4,y+8))
		number++;
	if(x > 3 && y > 9)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&KJ.Gobang.chessboard[x-4][y-8]!=c&&!this.issblank(x-4,y-8))
		number++;

	if(x > 2 && x < 13)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-3][y]!=c&&KJ.Gobang.chessboard[x+2][y]!=c&&(this.issblank(x-3,y)+this.issblank(x+2,y))===1)
		number++;
	if(x > 1 && x < 12)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-2][y]!=c&&KJ.Gobang.chessboard[x+3][y]!=c&&(this.issblank(x-2,y)+this.issblank(x+3,y))===1)
		number++;
	if(y > 5 && y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y+6]!=c&&KJ.Gobang.chessboard[x][y-4]!=c&&(this.issblank(x,y+6)+this.issblank(x,y-4))===1)
		number++;
	if(y > 7 && y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]!=c&&KJ.Gobang.chessboard[x][y+4]!=c&&(this.issblank(x,y-6)+this.issblank(x,y+4))===1)
		number++;
	if(x > 2 && y > 7 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x-3][y-6]!=c&&KJ.Gobang.chessboard[x+2][y+4]!=c&&(this.issblank(x-3,y-6)+this.issblank(x+2,y+4))===1)
		number++;
	if(x > 2 && y > 5 && x < 13 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x-3][y+6]!=c&&KJ.Gobang.chessboard[x-2][y-4]!=c&&(this.issblank(x+3,y+6)+this.issblank(x-2,y-4))===1)
		number++;
	if(x > 2 && y > 5 && x < 13 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x-3][y+6]!=c&&KJ.Gobang.chessboard[x+2][y-4]!=c&&(this.issblank(x-3,y+6)+this.issblank(x+2,y-4))===1)
		number++;
	if(x > 1 && y > 7 && x < 12 & y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+3][y-6]!=c&&KJ.Gobang.chessboard[x-2][y+4]!=c&&(this.issblank(x+3,y-6)+this.issblank(x-2,y+4))===1)
		number++;

	if(x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+4][y+8]===c&&this.issblank(x+3,y+6))
		number++;
	if(x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+3][y+4]===c&&KJ.Gobang.chessboard[x+4][y+8]===c&&this.issblank(x+2,y+4))
		number++;
	if(x > 3 && y > 9)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-4][y-8]===c&&this.issblank(x-3,y-6))
		number++;
	if(x > 3 && y > 9)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-3][y-4]===c&&KJ.Gobang.chessboard[x-4][y-8]===c&&this.issblank(x-2,y-4))
		number++;
	if(x > 3 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-4][y+8]===c&&this.issblank(x-3,y+6))
		number++;
	if(x > 3 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&KJ.Gobang.chessboard[x-4][y+8]===c&&this.issblank(x-2,y+4))
		number++;
	if(y > 9 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+4][y-8]===c&&this.issblank(x+3,y-6))
		number++;
	if(y > 9 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&KJ.Gobang.chessboard[x+4][y-8]===c&&this.issblank(x+2,y-4))
		number++;
	if(x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+4][y]===c&&this.issblank(x+3,y))
		number++;
	if(x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&KJ.Gobang.chessboard[x+4][y]===c&&this.issblank(x+2,y))
		number++;
	if(x > 3)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-4][y]===c&&this.issblank(x-3,y))
		number++;
	if(x > 3)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x-4][y]===c&&this.issblank(x-2,y))
		number++;
	if(y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+8]===c&&this.issblank(x,y+6))
		number++;
	if(y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+6]===c&&KJ.Gobang.chessboard[x][y+8]===c&&this.issblank(x,y+4))
		number++;
	if(y > 9)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-8]===c&&this.issblank(x,y-6))
		number++;
	if(y > 9)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-6]===c&&KJ.Gobang.chessboard[x][y-8]===c&&this.issblank(x,y-4))
		number++;

	if(x > 2 && x < 12)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&this.issblank(x-1,y)&&KJ.Gobang.chessboard[x+3][y]!=c&&KJ.Gobang.chessboard[x-3][y]!=c)          
		number++;
	if(x > 2 && x < 12)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&this.issblank(x-1,y)&&KJ.Gobang.chessboard[x-3][y]!=c&&KJ.Gobang.chessboard[x+3][y]!=c)
		number++;
	if(x > 2 && y > 7 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&this.issblank(x-1,y-2)&&KJ.Gobang.chessboard[x+3][y+6]!=c&&KJ.Gobang.chessboard[x-3][y-6]!=c)
		number++;
	if(x > 2 && y > 7 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-6]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&this.issblank(x+1,y+2)&&KJ.Gobang.chessboard[x-3][y-6]!=c&&KJ.Gobang.chessboard[x+3][y+6]!=c)
		number++;
	if(x > 2 && y > 7 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&this.issblank(x-1,y+2)&&KJ.Gobang.chessboard[x+3][y-6]!=c&&KJ.Gobang.chessboard[x-3][y+6]!=c)
		number++;
	if(x > 2 && y > 7 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&this.issblank(x+1,y-2)&&KJ.Gobang.chessboard[x-3][y+6]!=c&&KJ.Gobang.chessboard[x+3][y-6]!=c)
		number++;
	if(y > 7 && y < 25)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y+4]===c&&this.issblank(x,y+2)&&KJ.Gobang.chessboard[x][y+6]!=c&&KJ.Gobang.chessboard[x][y-6]!=c)
		number++;
	if(y > 7 && y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y-4]===c&&this.issblank(x,y-2)&&KJ.Gobang.chessboard[x][y+6]!=c&&KJ.Gobang.chessboard[x][y-6]!=c)
		number++;
	if(x > 3 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&this.issblank(x-1,y)&&KJ.Gobang.chessboard[x+2][y]!=c&&KJ.Gobang.chessboard[x-4][y]!=c)          
		number++;
	if(x > 1 && x < 11)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&this.issblank(x+1,y)&&KJ.Gobang.chessboard[x-2][y]!=c&&KJ.Gobang.chessboard[x+4][y]!=c)
		number++;
	if(x > 3 && y > 9 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&this.issblank(x-1,y-2)&&KJ.Gobang.chessboard[x+2][y+4]!=c&&KJ.Gobang.chessboard[x-4][y-8]!=c)
		number++;
	if(x > 1 && y > 5 && x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&this.issblank(x+1,y+2)&&KJ.Gobang.chessboard[x-2][y-4]!=c&&KJ.Gobang.chessboard[x+4][y+8]!=c)
		number++;
	if(x > 3 && y > 5 && x < 13 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&this.issblank(x-1,y+2)&&KJ.Gobang.chessboard[x+2][y-4]!=c&&KJ.Gobang.chessboard[x-4][y+8]!=c)
		number++;
	if(x > 1 && y > 9 && x < 11 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&this.issblank(x+1,y-2)&&KJ.Gobang.chessboard[x-2][y+4]!=c&&KJ.Gobang.chessboard[x+4][y-8]!=c)
		number++;
	if(x > 3 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&this.issblank(x-1,y)&&KJ.Gobang.chessboard[x+2][y]!=c&&KJ.Gobang.chessboard[x-4][y]!=c)
		number++;
	if(x > 1 && x < 11)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&this.issblank(x+1,y)&&KJ.Gobang.chessboard[x-2][y]!=c&&KJ.Gobang.chessboard[x+4][y]!=c)
		number++;
	return number;
};
Scene_Gobang.prototype.dhuoer = function(x, y){
	var number = 0;
	var c = (1-this._turn)? 1: 2;
	if(x < 12)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&this.issblank(x+3,y))
		number++;
	if(x > 2)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&this.issblank(x-3,y))
		number++;
	if(x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&this.issblank(x+3,y+6))
		number++;
	if(y > 7 && x < 12)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&this.issblank(x+3,y-6))
		number++;
	if(x > 2 && y > 7)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&this.issblank(x-3,y-6))
		number++;
	if(x > 2 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&this.issblank(x-3,y+6))
		number++;
	if(y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&this.issblank(x,y+6))
		number++;
	if(y > 7)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&this.issblank(x,y-6))
		number++;

	if(x > 1 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-1][y]===c&&this.issblank(x+2,y)&&this.issblank(x-2,y))
		number++;
	if(x > 1 && y > 5 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x-1][y-2]===c&&this.issblank(x+2,y+4)&&this.issblank(x-2,y-4))
		number++;
	if(x > 1 && y > 5 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x-1][y+2]===c&&this.issblank(x+2,y-4)&&this.issblank(x-2,y+4))
		number++;
	if(y > 5 && y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y-2]===c&&this.issblank(x,y+4)&&this.issblank(x,y-4))
		number++;
	
	if(x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&this.issblank(x+2,y)&&this.issblank(x+4,y))
		number++;
	if(x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&this.issblank(x+2,y+4)&&this.issblank(x+4,y+8))
		number++;
	if(y > 9 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&this.issblank(x+2,y-4)&&this.issblank(x+4,y-8))
		number++;
	if(y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+6]===c&&this.issblank(x,y+4)&&this.issblank(x,y+8))
		number++;
	if(x > 2 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&this.issblank(x-1,y)&&this.issblank(x-3,y)&&this.issblank(x+2,y))
		number++;
	if(x > 1 && x < 12)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&this.issblank(x+1,y)&&this.issblank(x+3,y)&&this.issblank(x-2,y))
		number++;
	if(x > 2 && y > 7 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&this.issblank(x-1,y-2)&&this.issblank(x-3,y-6)&&this.issblank(x+2,y+4))
		number++;
	if(x > 2 && y > 5 && x < 13 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&this.issblank(x-1,y+2)&&this.issblank(x-3,y+6)&&this.issblank(x+2,y-4))
		number++;
	if(x > 1 && y > 5 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&this.issblank(x+1,y+2)&&this.issblank(x+3,y+6)&&this.issblank(x-2,y-4))
		number++;
	if(x > 1 && y > 7 && x < 12 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&this.issblank(x+1,y-2)&&this.issblank(x+3,y-6)&&this.issblank(x-2,y+4))
		number++;
	if(y > 7 && y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&this.issblank(x,y-2)&&this.issblank(x,y-6)&&this.issblank(x,y+4))
		number++;
	if(y > 5 && y < 25)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&this.issblank(x,y+2)&&this.issblank(x,y+6)&&this.issblank(x,y-4))
		number++;
	return number;
};

Scene_Gobang.prototype.dhuoyi = function(x, y){
	var number = 0;
	var c = (1-this._turn)? 1: 2;
	if(x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&this.issblank(x+2,y))
		number++;
	if(x > 1)
	if(KJ.Gobang.chessboard[x-1][y]===c&&this.issblank(x-2,y))
		number++;
	if(x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&this.issblank(x+2,y+4))
		number++;
	if(y > 5 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&this.issblank(x+2,y-4))
		number++;
	if(y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&this.issblank(x,y+4))
		number++;
	if(y > 5)
	if(KJ.Gobang.chessboard[x][y-2]===c&&this.issblank(x,y-4))
		number++;
	if(x > 1 && y > 5)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&this.issblank(x-2,y-4))
		number++;
	if(x > 1 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&this.issblank(x-2,y+4))
		number++;
	return number;
};
Scene_Gobang.prototype.fhuosan = function(x, y){
	var number = 0;
	var c = (this._turn)? 1: 2;
	if(x > 0 && x < 12)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&this.issblank(x+3,y)&&this.issblank(x-1,y))
		number++;
	if(x > 2 && x < 14)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&this.issblank(x-3,y)&&this.issblank(x+1,y))
		number++;
	if(x > 0 && y > 3 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&this.issblank(x+3,y+6)&&this.issblank(x-1,y-2))
		number++;
	if(x > 0 && y > 7 && x < 12 && y < 29)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&this.issblank(x+3,y-6)&&this.issblank(x-1,y+2))
		number++;
	if(x > 2 && y > 7 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&this.issblank(x-3,y-6)&&this.issblank(x+1,y+2))
		number++;
	if(x > 2 && y > 3 && x < 14 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&this.issblank(x-3,y+6)&&this.issblank(x+1,y-2))
		number++;
	if(y > 3 && y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&this.issblank(x,y+6)&&this.issblank(x,y-2))
		number++;
	if(y > 5 && y < 29)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&this.issblank(x,y+2))
		number++;

	if(x > 3 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-1][y]===c&&this.issblank(x+2,y)&&this.issblank(x-4,y))
		number++;
	if(x > 1 && y > 5 && x < 13 && y < 29)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x-1][y-2]===c&&this.issblank(x+2,y+4)&&this.issblank(x-2,y-4))
		number++;
	if(x > 1 && y > 5 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x-1][y+2]===c&&this.issblank(x+2,y-4)&&this.issblank(x-2,y+4))
		number++;
	if(y > 5 && y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y-2]===c&&this.issblank(x,y+4)&&this.issblank(x,y-4))
		number++;

	if(x > 2 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&this.issblank(x-1,y)&&this.issblank(x-3,y)&&this.issblank(x+2,y))
		number++;
	if(x > 1 && x < 12)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&this.issblank(x+1,y)&&this.issblank(x+3,y)&&this.issblank(x-2,y))
		number++;
	if(x > 2 && y > 7 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&this.issblank(x-1,y-2)&&this.issblank(x-3,y-6)&&this.issblank(x+2,y+4))
		number++;
	if(x > 2 && y > 5 && x < 13 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&this.issblank(x-1,y+2)&&this.issblank(x-3,y+6)&&this.issblank(x+2,y-4))
		number++;
	if(x > 1 && y > 5 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&this.issblank(x+1,y+2)&&this.issblank(x+3,y+6)&&this.issblank(x-2,y-4))
		number++;
	if(x > 1 && y > 7 && x < 12 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&this.issblank(x+1,y-2)&&this.issblank(x+3,y-6)&&this.issblank(x-2,y+4))
		number++;
	if(y > 7 && y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&this.issblank(x,y-2)&&this.issblank(x,y-6)&&this.issblank(x,y+4))
		number++;
	if(y > 5 && y < 25)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&this.issblank(x,y+2)&&this.issblank(x,y+6)&&this.issblank(x,y-4))
		number++;

	if(x > 0 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&this.issblank(x+2,y)&&this.issblank(x+4,y)&&this.issblank(x-1,y))
		number++;
	if(x > 0 && y > 3 && x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&this.issblank(x+2,y+4)&&this.issblank(x+4,y+8)&&this.issblank(x-1,y-2))
		number++;
	if(x > 0 && y > 7 && x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&this.issblank(x+2,y-4)&&this.issblank(x+4,y+8)&&this.issblank(x-1,y+2))
		number++;
	if(x > 3 && x < 14)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&this.issblank(x-2,y)&&this.issblank(x-4,y)&&this.issblank(x+1,y))
		number++;
	if(x > 3 && y > 9 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&this.issblank(x-2,y-4)&&this.issblank(x-4,y-8)&&this.issblank(x+1,y+2))
		number++;
	if(x > 3 && y > 3 && x < 14 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&this.issblank(x-2,y+4)&&this.issblank(x-4,y+8)&&this.issblank(x+1,y-2))
		number++;
	if(y > 3 && y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+6]===c&&this.issblank(x,y+4)&&this.issblank(x,y+8)&&this.issblank(x,y-2))
		number++;
	if(y > 9 && y < 29)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-6]===c&&this.issblank(x,y-4)&&this.issblank(x,y-8)&&this.issblank(x,y+2))
		number++;

	if(x > 0 && x < 11)
	if(KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&this.issblank(x+1,y)&&this.issblank(x+4,y)&&this.issblank(x-1,y))
		number++;
	if(x > 0 && y > 3 && x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&this.issblank(x+1,y+2)&&this.issblank(x+4,y+8)&&this.issblank(x-1,y-2))
		number++;
	if(x > 0 && y > 7 && x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&this.issblank(x+1,y-2)&&this.issblank(x+4,y+8)&&this.issblank(x-1,y+2))
		number++;
	if(x > 3 && x < 14)
	if(KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&this.issblank(x-1,y)&&this.issblank(x-4,y)&&this.issblank(x+1,y))
		number++;
	if(x > 3 && y > 9 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&this.issblank(x-1,y-2)&&this.issblank(x-4,y-8)&&this.issblank(x+1,y+2))
		number++;
	if(x > 3 && y > 3 && x < 14 && y < 23)
	if(KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&this.issblank(x-1,y+2)&&this.issblank(x-4,y+8)&&this.issblank(x+1,y-2))
		number++;
	if(y > 3 && y < 23)
	if(KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+6]===c&&this.issblank(x,y+2)&&this.issblank(x,y+8)&&this.issblank(x,y-2))
		number++;
	if(y > 9 && y < 29)
	if(KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&this.issblank(x,y-2)&&this.issblank(x,y-8)&&this.issblank(x,y+2))
		number++;
	return number;
};

Scene_Gobang.prototype.fhuosi = function(x, y){
	var c = (this._turn)? 1: 2;
	var number = 0;
	if(x > 0 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&this.issblank(x+4,y)&&this.issblank(x-1,y))
		number++;
	if(x > 3 && x < 14)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&this.issblank(x-4,y)&&this.issblank(x+1,y))
		number++;
	if(y > 3 && y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+6]===c&&this.issblank(x,y+8)&&this.issblank(x,y-2))
		number++;
	if(y > 9 && y < 29)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&this.issblank(x,y-8)&&this.issblank(x,y+2))
		number++;
	if(x > 0 && y > 3 && x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&this.issblank(x+4,y+8)&&this.issblank(x-1,y-2))
		number++;
	if(x > 0 && y > 9 && x < 11 && y < 29)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&this.issblank(x+4,y-8)&&this.issblank(x-1,y+2))
		number++;
	if(x > 3 && y > 3 && x < 14 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&this.issblank(x-4,y+8)&&this.issblank(x+1,y-2))
		number++;
	if(x > 3 && y > 9 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&this.issblank(x-4,y-8)&&this.issblank(x+1,y+2))
		number++;

	if(x > 2 && x < 13)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x+1][y]===c&&this.issblank(x-3,y)&&this.issblank(x+2,y))
		number++;
	if(x > 1 && x < 12)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+1][y]===c&&this.issblank(x-2,y)&&this.issblank(x+3,y))
		number++;
	if(y > 5 && y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y-2]===c&&this.issblank(x,y+6)&&this.issblank(x,y-4))
		number++;
	if(y > 7 && y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&this.issblank(x,y-6)&&this.issblank(x,y+4))
		number++;
	if(x > 2 && y > 7 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&this.issblank(x-3,y-6)&&this.issblank(x+2,y+4))
		number++;
	if(x > 1 && y > 5 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&this.issblank(x+3,y+6)&&this.issblank(x-2,y-4))
		number++;
	if(x > 2 && y > 5 && x < 13 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x+1][y-2]===c&&this.issblank(x-3,y+6)&&this.issblank(x+2,y-4))
		number++;
	if(x > 1 && y > 7 && x < 12 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+1][y-2]===c&&this.issblank(x+3,y-6)&&this.issblank(x-2,y+4))
		number++;

	return number;
};

Scene_Gobang.prototype.fchongsi = function(x, y){
	var number;
	this._turn = 1-this._turn;
	number = this.dchongsan(x,y);
	this._turn = 1-this._turn;
	return number;
};

Scene_Gobang.prototype.fwu = function(x, y){
	var number;
	this._turn = 1-this._turn;
	number = this.dsi(x,y);
	this._turn = 1-this._turn;
	return number;
};

Scene_Gobang.prototype.fhuoer = function(x, y){
	var number = 0;
	var c = (this._turn)? 1: 2;
	if(x < 13)
	if(KJ.Gobang.chessboard[x+1][y]===c&&this.issblank(x+2,y))
		number++;
	if(x > 1)
	if(KJ.Gobang.chessboard[x-1][y]===c&&this.issblank(x-2,y))
		number++;
	if(x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&this.issblank(x+2,y+4))
		number++;
	if(y > 5 && x < 13)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&this.issblank(x+2,y-4))
		number++;
	if(y < 27)
	if(KJ.Gobang.chessboard[x][y+2]===c&&this.issblank(x,y+4))
		number++;
	if(y > 5)
	if(KJ.Gobang.chessboard[x][y-2]===c&&this.issblank(x,y-4))
		number++;
	if(x > 1 && y > 5)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&this.issblank(x-2,y-4))
		number++;
	if(x > 1 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&this.issblank(x-2,y+4))
		number++;
	if(x > 0 && x < 12)
	if(KJ.Gobang.chessboard[x+2][y]===c&&this.issblank(x+1,y)&&this.issblank(x+3,y)&&this.issblank(x-1,y))
		number++;
	if(x > 0 && y > 3 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x+2][y+4]===c&&this.issblank(x+1,y+2)&&this.issblank(x+3,y+6)&&this.issblank(x-1,y-2))
		number++;
	if(x > 0 && y > 7 && x < 12 && y < 29)
	if(KJ.Gobang.chessboard[x+2][y-4]===c&&this.issblank(x+1,y-2)&&this.issblank(x+3,y-6)&&this.issblank(x-1,y+2))
		number++;
	if(y > 3 && y < 25)
	if(KJ.Gobang.chessboard[x][y+4]===c&&this.issblank(x,y+2)&&this.issblank(x,y+6)&&this.issblank(x,y-2))
		number++;
	if(y > 7 && y < 29)
	if(KJ.Gobang.chessboard[x][y-4]===c&&this.issblank(x,y-2)&&this.issblank(x,y-6)&&this.issblank(x,y+2))
		number++;
	if(x > 2 && y > 7 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-2][y-4]===c&&this.issblank(x-1,y-2)&&this.issblank(x-3,y-6)&&this.issblank(x+1,y+2))
		number++;
	if(x > 2 && y > 3 && x < 14 && y < 25)
	if(KJ.Gobang.chessboard[x-2][y+4]===c&&this.issblank(x-1,y+2)&&this.issblank(x-3,y+6)&&this.issblank(x+1,y-2))
		number++;
	if(x > 2 && x < 14)
	if(KJ.Gobang.chessboard[x-2][y]===c&&this.issblank(x-1,y)&&this.issblank(x-3,y)&&this.issblank(x+1,y))
		number++;
	return number;
};

Scene_Gobang.prototype.fchongsan = function(x, y){
	var number = 0;
	var c = (this._turn)? 1: 2;
	var b = (1-this._turn)? 1: 2;
	if(x > 0 && x < 12)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x-1][y]===b&&this.issblank(x+3,y))
		number++;
	if(x > 0 && y > 3 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x-1][y-2]===b&&this.issblank(x+3,y+6))
		number++;
	if(x > 0 && y > 7 && x < 12 && y < 29)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x-1][y+2]===b&&this.issblank(x+3,y-6))
		number++;
	if(x > 2 && x < 14)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x+1][y]===b&&this.issblank(x-3,y))
		number++;
	if(x > 2 && y > 7 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x+1][y+2]===b&&this.issblank(x-3,y-6))
		number++;
	if(x > 2 && y > 3 && x < 14 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x+1][y-2]===b&&this.issblank(x-3,y+6))
		number++;
	if(y > 3 && y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y-2]===b&&this.issblank(x,y+6))
		number++;
	if(y > 7 && y < 29)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y+2]===b&&this.issblank(x,y-6))
		number++;
	return number;
};
Scene_Gobang.prototype.fchang = function(x, y){
	var number = 0;
	var c = (this._turn)? 1: 2;
	if(x > 1 && x < 12)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c)
		number++;
	if(x > 1 && y > 5 && x < 12 && y < 25)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c)
		number++;
	if(x > 1 && y > 7 && x < 12 && y < 27)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c)
		number++;
	if(x > 2 && x < 13)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c)
		number++;
	if(x > 2 && y > 5 && x < 13 && y < 25)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c)
		number++;
	if(x > 2 && y > 7 && x < 13 && y < 27)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c)
		number++;
	if(y > 5 && y < 25)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+6]===c&&KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c)
		number++;
	if(y > 7 && y < 27)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c)
		number++;
	if(x > 0 && x < 11)
	if(KJ.Gobang.chessboard[x+1][y]===c&&KJ.Gobang.chessboard[x+2][y]===c&&KJ.Gobang.chessboard[x+3][y]===c&&KJ.Gobang.chessboard[x+4][y]===c&&KJ.Gobang.chessboard[x-1][y]===c)
		number++;
	if(x > 3 && x < 14)
	if(KJ.Gobang.chessboard[x-1][y]===c&&KJ.Gobang.chessboard[x-2][y]===c&&KJ.Gobang.chessboard[x-3][y]===c&&KJ.Gobang.chessboard[x-4][y]===c&&KJ.Gobang.chessboard[x+1][y]===c)
		number++;
	if(x > 0 && y > 3 && x < 11 && y < 23)
	if(KJ.Gobang.chessboard[x+1][y+2]===c&&KJ.Gobang.chessboard[x+2][y+4]===c&&KJ.Gobang.chessboard[x+3][y+6]===c&&KJ.Gobang.chessboard[x+4][y+8]===c&&KJ.Gobang.chessboard[x-1][y-2]===c)
		number++;
	if(x > 3 && y > 9 && x < 14 && y < 29)
	if(KJ.Gobang.chessboard[x-1][y-2]===c&&KJ.Gobang.chessboard[x-2][y-4]===c&&KJ.Gobang.chessboard[x-3][y-6]===c&&KJ.Gobang.chessboard[x-4][y-8]===c&&KJ.Gobang.chessboard[x+1][y+2]===c)
		number++;
	if(x > 0 && y > 9 && x < 11 && y < 29)
	if(KJ.Gobang.chessboard[x+1][y-2]===c&&KJ.Gobang.chessboard[x+2][y-4]===c&&KJ.Gobang.chessboard[x+3][y-6]===c&&KJ.Gobang.chessboard[x+4][y-8]===c&&KJ.Gobang.chessboard[x-1][y+2]===c)
		number++;
	if(x > 3 && y > 3 && x < 14 && y < 23)
	if(KJ.Gobang.chessboard[x-1][y+2]===c&&KJ.Gobang.chessboard[x-2][y+4]===c&&KJ.Gobang.chessboard[x-3][y+6]===c&&KJ.Gobang.chessboard[x-4][y+8]===c&&KJ.Gobang.chessboard[x+1][y-2]===c)
		number++;
	if(y > 3 && y < 23)
	if(KJ.Gobang.chessboard[x][y+2]===c&&KJ.Gobang.chessboard[x][y+4]===c&&KJ.Gobang.chessboard[x][y+6]===c&&KJ.Gobang.chessboard[x][y+8]===c&&KJ.Gobang.chessboard[x][y-2]===c)
		number++;
	if(y > 9 && y < 29)
	if(KJ.Gobang.chessboard[x][y-2]===c&&KJ.Gobang.chessboard[x][y-4]===c&&KJ.Gobang.chessboard[x][y-6]===c&&KJ.Gobang.chessboard[x][y-8]===c&&KJ.Gobang.chessboard[x][y+2]===c)
		number++;
	return number;
};

Scene_Gobang.prototype.dchang = function(x, y){
	var number = 0;
	this._turn = 1-this._turn;
	number = this.fchang(x,y);
	this._turn = 1-this._turn;
	return number;
};
Scene_Gobang.prototype.judge = function(){
	var i,j,x,y;
	for(i = 3;i<=13;i++)
		for(j = 1;j <= 15;j++){
			x = j-1;
			y = 2*i;
			if(KJ.Gobang.chessboard[x][y]==1&&KJ.Gobang.chessboard[x][y-2]==1&&KJ.Gobang.chessboard[x][y-4]==1&&
				KJ.Gobang.chessboard[x][y+2]==1&&KJ.Gobang.chessboard[x][y+4]==1)
				return 1;
			if(KJ.Gobang.chessboard[x][y]==2&&KJ.Gobang.chessboard[x][y-2]==2&&KJ.Gobang.chessboard[x][y-4]==2&&
				KJ.Gobang.chessboard[x][y+2]==2&&KJ.Gobang.chessboard[x][y+4]==2)
				return 2;
		}
	for(j = 3;j<=13;j++)
		for(i = 1;i<=15;i++){
			x = j-1;
			y = 2*i;
			if(KJ.Gobang.chessboard[x-1][y]==1&&KJ.Gobang.chessboard[x-2][y]==1&&KJ.Gobang.chessboard[x][y]==1&&
				KJ.Gobang.chessboard[x+1][y]==1&&KJ.Gobang.chessboard[x+2][y]==1)
				return 1;
			if(KJ.Gobang.chessboard[x][y]==2&&KJ.Gobang.chessboard[x+1][y]==2&&KJ.Gobang.chessboard[x+2][y]==2&&
				KJ.Gobang.chessboard[x-1][y]==2&&KJ.Gobang.chessboard[x-2][y]==2)
				return 2;
		}
	for(j = 3;j<=13;j++)
		for(i = 3;i<=13;i++){
			x = j-1;
			y = 2*i;
			if(KJ.Gobang.chessboard[x][y]==1&&KJ.Gobang.chessboard[x-1][y-2]==1&&KJ.Gobang.chessboard[x-2][y-4]==1&&
				KJ.Gobang.chessboard[x+1][y+2]==1&&KJ.Gobang.chessboard[x+2][y+4]==1)
				return 1;
			if(KJ.Gobang.chessboard[x][y]==1&&KJ.Gobang.chessboard[x-1][y+2]==1&&KJ.Gobang.chessboard[x-2][y+4]==1&&
				KJ.Gobang.chessboard[x+1][y-2]==1&&KJ.Gobang.chessboard[x+2][y-4]==1)
				return 1;
			if(KJ.Gobang.chessboard[x][y]==2&&KJ.Gobang.chessboard[x+1][y-2]==2&&KJ.Gobang.chessboard[x+2][y-4]==2&&
				KJ.Gobang.chessboard[x-1][y+2]==2&&KJ.Gobang.chessboard[x-2][y+4]==2)
				return 2;
			if(KJ.Gobang.chessboard[x][y]==2&&KJ.Gobang.chessboard[x-1][y-2]==2&&KJ.Gobang.chessboard[x-2][y-4]==2&&
				KJ.Gobang.chessboard[x+1][y+2]==2&&KJ.Gobang.chessboard[x+2][y+4]==2)
				return 2;
		}
	return 0;
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
	this.addCommand(KJ.Gobang.Param.CancelText, 'cancel');
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