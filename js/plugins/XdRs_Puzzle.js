//=================================================================================================
// The Puzzle.js
//=================================================================================================
/*:
* @plugindesc 拼图。
*
* @author 芯☆淡茹水
*
* @help
* 
* 〓 说明 〓
*
* 1, 该拼图插件可将保存在 pictures 文件夹里的任意图片用来进行拼图游戏。
* 
* 2，成功拼图后，插件设置项所设置的 完成次数变量 将会累加 1 ，可在拼图
*    游戏前用另一变量先记录以前的 完成次数 ，拼图后再用 完成次数变量 与
*    之前记录的变量比对，可得出该场拼图是否完成。
* 
* 3，拼图图片的尺寸，理论上无限制。但为了拼图游戏的可玩性，尽量使用尺寸
*    大于 半个游戏分辨率 的图片。再大无限制。
* 
* 4，拼图图片，最好使用 无透明底 的图片。
* 
* 〓 插件命令 〓
* 
* 1，开始拼图游戏 => StartPuzzleGame xs ys name
*    xs :竖向图片的切割数（最小为 3）
*    ys :横向图片的切割数（最小为 3）
*    name :拼图的图片名。
*    例：用一张名为 Image 的图片，进行 4x3 的拼图游戏 => StartPuzzleGame 4 3 Image
*    <若代入的 横/竖 切割数小于 3，该命令无效>
* 
* 2，以变量值作为切割块数，开始拼图游戏 => StartPuzzleGameByVal v1 v2 name
*    v1 :竖向图片的切割数的变量ID（变量值为切割数）
*    v2 :横向图片的切割数的变量ID（变量值为切割数）
*    name :拼图的图片名。
*    例：分别用变量 10 和 11 的值作为 竖/横 切割数，用名为 Image2 的图片进行拼图游戏 =>  
*        StartPuzzleGameByVal 10 11 Image2
*
*
*
*
* @param RandomBlankBlock
* @desc 是否随机空白块（是:ON；否:OFF）。
* 随机时，空白块为 四角随机；不随机时，空白块固定为 左上角 。
* @default ON
*
* @param cpVal
* @desc 完成次数储存的变量ID。
* @default 5
*
* @param titleWord
* @desc 标题用语。
* @default 智力拼图
*
* @param stepWord
* @desc 步数用语。
* @default 步数:
*
* @param cmd1
* @desc 选项继续游戏用语。
* @default 继续游戏
*
* @param cmd2
* @desc 选项查看完整图片用语。
* @default 完整图片
*
* @param cmd3
* @desc 选项退出游戏用语。
* @default 退出游戏
*
* @param titleColor
* @desc 标题文字颜色（红,绿,蓝）。
* @default 0,200,200
*
* @param stepColor
* @desc 描绘步数用语的颜色（红,绿,蓝）。
* @default 255,180,0
*
* @param anmId
* @desc 拼图完成时，播放的动画ID。
* @default 48
*/
//=================================================================================================
var XdRsData = XdRsData || {};
XdRsData.puzzle = XdRsData.puzzle || {};
XdRsData.puzzle.params = PluginManager.parameters('XdRs_Puzzle');
//=================================================================================================
XdRsData.puzzle.isRandomBlankBlock = function() {
    return this.params['RandomBlankBlock'] === 'ON';
};
XdRsData.puzzle.addCompletedCount = function() {
    var id = +this.params['cpVal'];
    var count = $gameVariables.value(id) + 1;
    $gameVariables.setValue(id, count);
};
//=================================================================================================
TouchInput.inRect = function(){
    var arr = arguments;
    var x = arr.length === 1 ? arr[0].x : arr[0];
    var y = arr.length === 1 ? arr[0].y : arr[1];
    var w = arr.length === 1 ? arr[0].width  : arr[2];
    var h = arr.length === 1 ? arr[0].height : arr[3];
    return this.x > x && this.x < x + w && this.y > y && this.y < y + h;
};
//=================================================================================================
XdRsData.puzzle.GIpluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    XdRsData.puzzle.GIpluginCommand.call(this, command, args);
    command === 'StartPuzzleGame'      && this.openScenePuzzle(+args[0], +args[1], args[2]);
    command === 'StartPuzzleGameByVal' && this.openScenePuzzleByVal(+args[0], +args[1], args[2]);
};
Game_Interpreter.prototype.openScenePuzzle = function(xSize, ySize, imageName) {
    if (xSize < 3 || ySize < 3 || !imageName) return;
    SceneManager.push(Scene_Puzzle);
    SceneManager.prepareNextScene(xSize, ySize, imageName);
};
Game_Interpreter.prototype.openScenePuzzleByVal = function(id1, id2, imageName) {
    var xSize = $gameVariables.value(id1);
    var ySize = $gameVariables.value(id2);
    this.openScenePuzzle(xSize, ySize, imageName);
};
//=================================================================================================
Sprite.prototype.localX = function() {
    var x = 0;
    var obj = this;
    while (obj) {
        x += obj.x;
        obj = obj.parent;
    }
    return x;
};
Sprite.prototype.localY = function() {
    var y = 0;
    var obj = this;
    while (obj) {
        y += obj.y;
        obj = obj.parent;
    }
    return y;
};
Sprite.prototype.isTouch = function() {
    if (!this.bitmap || !this.visible) return false;
    var w = this.width  * this.scale.x;
    var h = this.height * this.scale.y;
    var x = this.localX() - w * this.anchor.x;
    var y = this.localY() - h * this.anchor.y;
    return TouchInput.inRect(x, y, w, h);
};
//=================================================================================================
function Puzzle_Cursor() {
    this.initialize.apply(this, arguments);
}
Puzzle_Cursor.prototype = Object.create(Sprite.prototype);
Puzzle_Cursor.prototype.constructor = Puzzle_Cursor;
Puzzle_Cursor.prototype.initialize = function(width, height) {
    Sprite.prototype.initialize.call(this);
    this._blendCount = 0;
    this._blendAlpha = 255;
    this.bitmap = new Bitmap(width+8, height+8);
    this.drawBitmap();
};
Puzzle_Cursor.prototype.color = function() {
    return 'rgb(255,200,0)';
};
Puzzle_Cursor.prototype.drawBitmap = function() {
    var w = this.bitmap.width;
    var h = this.bitmap.height;
    var x = 6, r = 6, y = 6;
    this.bitmap.drawCircle(x, y, r, this.color());
    this.bitmap.drawCircle(w-x, y, r, this.color());
    this.bitmap.drawCircle(x, h-y, r, this.color());
    this.bitmap.drawCircle(w-x, h-y, r, this.color());
    this.bitmap.fillRect(x, 0, w-r*2, h, this.color());
    this.bitmap.fillRect(0, y, w, h-r*2, this.color());
    this.bitmap.clearRect(x-3, y-3, w-r, h-r);
};
Puzzle_Cursor.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBlend();
};
Puzzle_Cursor.prototype.updateBlend = function() {
    if (!this.visible) return;
    this._blendCount = (this._blendCount + 1) % 40;
    this.setBlendColor([255,255,255,this._blendAlpha]);
    this._blendAlpha += this._blendCount < 20 ? -12 : 12;
};
//=================================================================================================
function Sprite_Puzzle() {
    this.initialize.apply(this, arguments);
}
Sprite_Puzzle.prototype = Object.create(Sprite.prototype);
Sprite_Puzzle.prototype.constructor = Sprite_Puzzle;
Sprite_Puzzle.prototype.initialize = function(rect, isEmpty, baseIndex) {
    Sprite.prototype.initialize.call(this);
    this._rect = rect;
    this._isEmpty = isEmpty;
    this._baseIndex = baseIndex;
    this.endMove();
};
Sprite_Puzzle.prototype.setupImage = function() {
    if (!this._isEmpty) this.bitmap = this.parent.puzzleBitmap();
    else this.bitmap = new Bitmap(this._rect.width-2,this._rect.height-2);
    this.setFrame(this._rect.x+1,this._rect.y+1,this._rect.width-2,this._rect.height-2);
};
Sprite_Puzzle.prototype.index = function() {
    return this._index;
};
Sprite_Puzzle.prototype.point = function() {
    return new Point(this.x, this.y);
};
Sprite_Puzzle.prototype.setIndex = function(index) {
    this._index = index;
};
Sprite_Puzzle.prototype.setMoveEndMethod = function(method) {
    this._moveEndMethod = method;
};
Sprite_Puzzle.prototype.callMethod = function() {
    this._moveEndMethod && this._moveEndMethod();
};
Sprite_Puzzle.prototype.isEmpty = function() {
    return this._isEmpty;
};
Sprite_Puzzle.prototype.inSitu = function() {
    return this._index === this._baseIndex;
};
Sprite_Puzzle.prototype.startMove = function(point) {
    this._movePoint = point;
};
Sprite_Puzzle.prototype.endMove = function() {
    if (this._movePoint) this.move(this._movePoint.x, this._movePoint.y);
    this._movePoint = null;
    !this._isEmpty && this.callMethod();
};
Sprite_Puzzle.prototype.speedX = function() {
    var dx = this.x - this._movePoint.x;
    var mx = Math.min(this._rect.width / 10, Math.abs(dx));
    return dx > 0 ? -mx : mx;
};
Sprite_Puzzle.prototype.speedY = function() {
    var dy = this.y - this._movePoint.y;
    var my = Math.min(this._rect.height / 10, Math.abs(dy));
    return dy > 0 ? -my : my;
};
Sprite_Puzzle.prototype.isArrived = function() {
    if (!this._movePoint) return true;
    return this.x === this._movePoint.x && this.y === this._movePoint.y;
};
Sprite_Puzzle.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateMove();
};
Sprite_Puzzle.prototype.updateMove = function() {
    if (!this._movePoint) return;
    this.isArrived() && this.endMove();
    if (this._movePoint) {
        this.x += this.speedX();
        this.y += this.speedY();
    }
};
//=================================================================================================
function Sprite_FullGallery() {
    this.initialize.apply(this, arguments);
}
Sprite_FullGallery.prototype = Object.create(Sprite.prototype);
Sprite_FullGallery.prototype.constructor = Sprite_FullGallery;
Sprite_FullGallery.prototype.initialize = function(imageName) {
    Sprite.prototype.initialize.call(this);
    this.setBitmap(imageName);
};
Sprite_FullGallery.prototype.setBitmap = function(imageName) {
    var bitmap = ImageManager.loadPicture(imageName);
    var w = Math.min(Graphics.width,  bitmap.width);
    var h = Math.min(Graphics.height, bitmap.height);
    var fs = Math.min(w / bitmap.width, h / bitmap.height);
    var bw = bitmap.width * fs;
    var bh = bitmap.height * fs;
    this.bitmap = new Bitmap(bw, bh);
    this.bitmap.blt(bitmap,0,0,bitmap.width,bitmap.height,0,0,bw,bh);
    this.setupLocation();
    this.setupActionData();
};
Sprite_FullGallery.prototype.setupLocation = function() {
    var mw = Graphics.width * 0.2;
    var mh = Graphics.height * 0.2;
    var s = Math.min(mw / this.bitmap.width, mh / this.bitmap.height);
    this.anchor = new Point(1, 0);
    this.scale  = new Point(s, s);
    this.move(Graphics.width - 4, 4);
};
Sprite_FullGallery.prototype.setupActionData = function() {
    this._actionData = {};
    var tx = (Graphics.width - this.bitmap.width) / 2 + this.bitmap.width;
    var ty = (Graphics.height - this.bitmap.height) / 2;
    this._actionData.scale = (1 - this.scale.x) * 0.1;
    this._actionData.blowUpPoint = new Point(tx, ty);
    this._actionData.shrinkPoint = new Point(this.x, this.y);
    this._actionData.movePoint = new Point(Math.abs(this.x-tx)*0.1, Math.abs(this.y-ty)*0.1);
};
Sprite_FullGallery.prototype.setMethod = function(sym, method) {
    this._actionData[sym] = method;
};
Sprite_FullGallery.prototype.startMove = function(type) {
    this._actionData.type = type;
    this._actionData.count = 10;
};
Sprite_FullGallery.prototype.endMove = function() {
    if (this._actionData.type === 'shrink') {
        this._actionData['sk'] && this._actionData['sk']();
    }
    if (this._actionData.type === 'blowUp') this._actionData.active = true;
    this._actionData.type = null;
};
Sprite_FullGallery.prototype.isInputCancel = function() {
    return TouchInput.isCancelled() || Input.isTriggered('escape');
};
Sprite_FullGallery.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateMove();
    this.updateInput();
};
Sprite_FullGallery.prototype.updateMove = function() {
    if (!this._actionData.type || !this._actionData.count) return;
    this._actionData.count--;
    this.applyMove();
    !this._actionData.count && this.endMove();
};
Sprite_FullGallery.prototype.updateInput = function() {
    if (!this._actionData.active || !this.isInputCancel()) return;
    SoundManager.playCancel();
    this._actionData.active = false;
    this._actionData['cancel'] && this._actionData['cancel']();
};
Sprite_FullGallery.prototype.applyMove = function() {
    var s = this._actionData.scale;
    var mp = this._actionData.movePoint;
    var op = this._actionData[this._actionData.type + 'Point'];
    this.x += this.x < op.x ? mp.x : -mp.x;
    this.y += this.y < op.y ? mp.y : -mp.y;
    var ms = this.scale.x + (this._actionData.type === 'blowUp' ? s : -s);
    this.scale  = new Point(ms, ms);
};
//=================================================================================================
function Sprite_PuzzlieFinish() {
    this.initialize.apply(this, arguments);
}
Sprite_PuzzlieFinish.prototype = Object.create(Sprite_Base.prototype);
Sprite_PuzzlieFinish.prototype.constructor = Sprite_PuzzlieFinish;
Sprite_PuzzlieFinish.prototype.initialize = function(objWindow) {
    Sprite_Base.prototype.initialize.call(this);
    this.bitmap = new Bitmap(objWindow.width, objWindow.height);
    this.move(objWindow.x, objWindow.y);
    this._isCompleted = false;
    this.visible = false;
};
Sprite_PuzzlieFinish.prototype.playCompleted = function() {
    this.visible = true;
    this._isCompleted = true;
    var anm = $dataAnimations[+XdRsData.puzzle.params['anmId']];
    if (!anm) return this.drawFinishText();
    var sprite = new Sprite_Animation();
    sprite.setup(this, anm, false, false);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
    this._waitCount = anm.frames.length * 4 + 10;
};
Sprite_PuzzlieFinish.prototype.drawFinishText = function() {
    var text = '恭喜！完成了拼图！';
    this._waitCount = 120;
    this.bitmap.fontSize = 32;
    this.bitmap.textColor = 'rgb(255,0,180)';
    this.bitmap.drawText(text,0,0,this.bitmap.width,this.bitmap.height,'center');
};
Sprite_PuzzlieFinish.prototype.someInput = function() {
    if (TouchInput.isTriggered() || Input.isTriggered('ok')) return true;
    return Sprite_FullGallery.prototype.isInputCancel.call(this);
};
Sprite_PuzzlieFinish.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateWaitCount();
    this.updateInput();
};
Sprite_PuzzlieFinish.prototype.updateWaitCount = function() {
    if (this._waitCount) this._waitCount--;
};
Sprite_PuzzlieFinish.prototype.updateInput = function() {
    if (this._waitCount || !this._isCompleted) return;
    if (this.someInput()) {
        SoundManager.playOk();
        SceneManager.pop();
    }
};
//=================================================================================================
function Window_PuzzlieTitle() {
    this.initialize.apply(this, arguments);
}
Window_PuzzlieTitle.prototype = Object.create(Window_Selectable.prototype);
Window_PuzzlieTitle.prototype.constructor = Window_PuzzlieTitle;
Window_PuzzlieTitle.prototype.initialize = function() {
    var width = Graphics.width * 0.5;
    var height = this.lineHeight() + this.standardPadding() * 2;
    var x = (Graphics.width - width) / 2;
    Window_Selectable.prototype.initialize.call(this, x, 4, width, height);
    this.drawTitle();
    this.activate();
};
Window_PuzzlieTitle.prototype.drawTitle = function() {
    var data = XdRsData.puzzle.params['titleColor'];
    var color = data ? 'rgb('+data+')' : 'rgb(255,255,255)';
    var text = XdRsData.puzzle.params['titleWord'];
    this.changeTextColor(color);
    this.drawText(text, 0, 0, this.contentsWidth(), 'center');
};
//=================================================================================================
function Window_PuzzlieStep() {
    this.initialize.apply(this, arguments);
}
Window_PuzzlieStep.prototype = Object.create(Window_Base.prototype);
Window_PuzzlieStep.prototype.constructor = Window_PuzzlieStep;
Window_PuzzlieStep.prototype.initialize = function() {
    var width = Graphics.width * 0.2;
    var height = this.lineHeight() + this.standardPadding() * 2;
    Window_Base.prototype.initialize.call(this, 4, 4, width, height);
    this._stepCount = 0;
    this.drawStep();
};
Window_PuzzlieStep.prototype.lineHeight = function() {
    return 18;
};
Window_PuzzlieStep.prototype.addStep = function() {
    this.drawStep(this._stepCount++);
};
Window_PuzzlieStep.prototype.drawStep = function() {
    this.contents.clear();
    this.contents.fontSize = 18;
    var data = XdRsData.puzzle.params['stepColor'];
    var color = data ? 'rgb('+data+')' : this.systemColor();
    this.changeTextColor(color);
    var text = XdRsData.puzzle.params['stepWord'];
    this.drawText(text, 0, 0, this.contentsWidth());
    this.resetTextColor();
    this.drawText(''+this._stepCount, 0, 0, this.contentsWidth(), 'right');
};
//=================================================================================================
function Window_PuzzlieCommand() {
    this.initialize.apply(this, arguments);
}
Window_PuzzlieCommand.prototype = Object.create(Window_Command.prototype);
Window_PuzzlieCommand.prototype.constructor = Window_PuzzlieCommand;
Window_PuzzlieCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.setupLocation();
    this.close();
    this.hide();
};
Window_PuzzlieCommand.prototype.windowWidth = function() {
    var bitmap = new Bitmap(32,32);
    bitmap.fontSize = this.standardFontSize();
    var arr = [1,2,3].map(function(n){
        var text = XdRsData.puzzle.params['cmd'+n];
        return Math.max(64, bitmap.measureTextWidth(text) + 8);
    }, this);
    return Math.max.apply(null, arr) + this.standardPadding() * 2;
};
Window_PuzzlieCommand.prototype.makeCommandList = function() {
    this.addCommand(XdRsData.puzzle.params['cmd1'], 'continue');
    this.addCommand(XdRsData.puzzle.params['cmd2'], 'fullGallery');
    this.addCommand(XdRsData.puzzle.params['cmd3'], 'exit');
};
Window_PuzzlieCommand.prototype.setupLocation = function() {
    this.x = (Graphics.width - this.width) / 2;
    this.y = (Graphics.height - this.height) / 2;
};
//=================================================================================================
function Window_Puzzlies() {
    this.initialize.apply(this, arguments);
}
Window_Puzzlies.prototype = Object.create(Window_Base.prototype);
Window_Puzzlies.prototype.constructor = Window_Puzzlies;
Window_Puzzlies.prototype.initialize = function(xSize, ySize, pictureName) {
    this._index = 0;
    this._xSize = xSize;
    this._ySize = ySize;
    this.setupPuzzle(pictureName);
    this.callSuper();
    this.createPuzzlies();
    this.createCursor();
};
Window_Puzzlies.prototype.standardPadding = function() {
    return 10;
};
Window_Puzzlies.prototype.activate = function() {
    Window_Base.prototype.activate.call(this);
    if (this._cursor) this._cursor.visible = true;
    this.refreshPuzzlies();
};
Window_Puzzlies.prototype.deactivate = function() {
    Window_Base.prototype.deactivate.call(this);
    if (this._cursor) this._cursor.visible = false;
};
Window_Puzzlies.prototype.setStepMethod = function(method) {
    this._stepMethod = method;
};
Window_Puzzlies.prototype.setCompletedMethod = function(method) {
    this._completedMethod = method;
};
Window_Puzzlies.prototype.setupPuzzle = function(pictureName) {
    var bitmap = ImageManager.loadPicture(pictureName);
    var bw = Math.min(this.maxWidth(), bitmap.width);
    var bh = Math.min(this.maxHeight(), bitmap.height);
    var rs = Math.min(bw / bitmap.width, bh / bitmap.height);
    bw = rs * bitmap.width;
    bh = rs * bitmap.height;
    this._puzzleBitmap = new Bitmap(bw, bh);
    this._puzzleBitmap.blt(bitmap,0,0,bitmap.width,bitmap.height,0,0,bw,bh);
};
Window_Puzzlies.prototype.callSuper = function() {
    var image = this._puzzleBitmap;
    var width  = image.width + this.standardPadding() * 2;
    var height = image.height + this.standardPadding() * 2;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2 + 32;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
};
Window_Puzzlies.prototype.maxWidth = function() {
    return Graphics.width * 0.6;
};
Window_Puzzlies.prototype.maxHeight = function() {
    return Graphics.height * 0.6;
};
Window_Puzzlies.prototype.puzzleBitmap = function() {
    return this._puzzleBitmap;
};
Window_Puzzlies.prototype.puzzleWidth = function() {
    return this._puzzleBitmap.width / this._xSize;
};
Window_Puzzlies.prototype.puzzleHeight = function() {
    return this._puzzleBitmap.height / this._ySize;
};
Window_Puzzlies.prototype.createPuzzlies = function() {
    this._puzzlies = [];
    this.createPuzzliesParent();
    var maxSize = this._xSize * this._ySize;
    var emptyIndex = this.getEmptyIndex();
    for (var i=0;i<maxSize;++i){
        var px = i % this._xSize * this.puzzleWidth();
        var py = Math.floor(i / this._xSize) * this.puzzleHeight();
        var rect = new Rectangle(px, py, this.puzzleWidth(), this.puzzleHeight());
        var picture = new Sprite_Puzzle(rect, emptyIndex===i, i);
        this._puzzlies.push(picture);
    }
    this.sortPuzzlies();
};
Window_Puzzlies.prototype.createPuzzliesParent = function() {
    this._suzzliesParent = new Sprite();
    this._suzzliesParent.puzzleBitmap = this.puzzleBitmap.bind(this);
    this.addChild(this._suzzliesParent);
};
Window_Puzzlies.prototype.sortPuzzlies = function() {
    this._puzzlies.sort(function(){return Math.randomInt(2) ? 1 : -1;});
    for (var i=0;i<this._puzzlies.length;++i){
        var puzzle = this._puzzlies[i];
        this._suzzliesParent.addChild(puzzle);
        puzzle.setupImage();
        puzzle.setMoveEndMethod(this.activate.bind(this));
    }
    this.activate();
};
Window_Puzzlies.prototype.refreshPuzzlies = function() {
    for (var i=0;i<this._puzzlies.length;++i){
        var puzzle = this._puzzlies[i];
        var px = i % this._xSize * this.puzzleWidth();
        var py = Math.floor(i / this._xSize) * this.puzzleHeight();
        var x = px + this.standardPadding();
        var y = py + this.standardPadding();
        puzzle.setIndex(i);
        puzzle.move(x, y);
    }
    this.judge();
};
Window_Puzzlies.prototype.getEmptyIndex = function() {
    if (!XdRsData.puzzle.isRandomBlankBlock()) return 0;
    return this.fourCorners()[Math.randomInt(4)];
};
Window_Puzzlies.prototype.fourCorners = function() {
    return [0,this._xSize-1,(this._ySize-1)*this._xSize,this._xSize*this._ySize-1];
};
Window_Puzzlies.prototype.createCursor = function() {
    this._cursor = new Puzzle_Cursor(this.puzzleWidth(), this.puzzleHeight());
    this.refreshCursor();
    this.addChild(this._cursor);
};
Window_Puzzlies.prototype.refreshCursor = function() {
    var sp = this.standardPadding() - 5;
    var x = this._index % this._xSize * this.puzzleWidth() + sp;
    var y = Math.floor(this._index / this._xSize) * this.puzzleHeight() + sp;
    this._cursor.move(x, y);
};
Window_Puzzlies.prototype.emptyPuzzle = function() {
    return this._puzzlies.filter(function(p){return p.isEmpty();}).shift();
};
Window_Puzzlies.prototype.currentPuzzle = function() {
    return this._puzzlies[this._index];
};
Window_Puzzlies.prototype.adjacentEmpty = function() {
    var puzzle = this.currentPuzzle();
    if (puzzle.isEmpty()) return false;
    return this.getEmptyAdjacentData().contains(puzzle.index());
};
Window_Puzzlies.prototype.getEmptyAdjacentData = function() {
    var index = this.emptyPuzzle().index();
    var dMax = (this._ySize - 1) * this._xSize;
    var nl = (index % this._xSize) ? index-1 : -1;
    var nr = (index % this._xSize !== (this._xSize-1)) ? index+1 : -1;
    var nu = index >= this._xSize ? index-this._xSize : -1;
    var nd = index < dMax ? index+this._xSize : -1;
    return [nl,nr,nu,nd];
};
Window_Puzzlies.prototype.exchangePuzzle = function() {
    if (!this.adjacentEmpty()) {
        SoundManager.playBuzzer();
        return;
    }
    SoundManager.playOk();
    var emptyPuzzle   = this.emptyPuzzle();
    var currentPuzzle = this.currentPuzzle();
    currentPuzzle.startMove(emptyPuzzle.point());
    this._puzzlies[this._index] = emptyPuzzle;
    this._puzzlies[emptyPuzzle.index()] = currentPuzzle;
    this._suzzliesParent.removeChild(currentPuzzle);
    this._suzzliesParent.addChild(currentPuzzle);
    this._stepMethod && this._stepMethod();
    this.deactivate();
};
Window_Puzzlies.prototype.judge = function() {
    if (!this._puzzlies.every(function(p){return p.inSitu();})) return;
    this.deactivate();
    XdRsData.puzzle.addCompletedCount();
    this._completedMethod && this._completedMethod();
};
Window_Puzzlies.prototype.setIndex = function(index) {
    var lastIndex = this._index;
    this._index = index;
    lastIndex !== this._index && this.refreshIndexChanged();
};
Window_Puzzlies.prototype.follUp = function() {
    var nx = this._index % this._xSize;
    var index = this._index - this._xSize;
    var tx = (this._ySize - 1) * this._xSize;
    this.setIndex(index >= 0 ? index : nx+tx);
};
Window_Puzzlies.prototype.follDown = function() {
    var nx = this._index % this._xSize;
    var max = this._puzzlies.length;
    var index = this._index + this._xSize;
    this.setIndex(index < max ? index : nx);
};
Window_Puzzlies.prototype.follLeft = function() {
    var nx = this._index % this._xSize;
    var tx = Math.floor(this._index / this._xSize) * this._xSize;
    var index = (nx + this._xSize - 1) % this._xSize + tx;
    this.setIndex(index);
};
Window_Puzzlies.prototype.follRight = function() {
    var nx = this._index % this._xSize;
    var tx = Math.floor(this._index / this._xSize) * this._xSize;
    var index = (nx + 1) % this._xSize + tx;
    this.setIndex(index);
};
Window_Puzzlies.prototype.refreshIndexChanged = function() {
    SoundManager.playCursor();
    this.refreshCursor();
};
Window_Puzzlies.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateInput();
    this.updateTouch();
};
Window_Puzzlies.prototype.updateInput = function() {
    if (!this.active) return;
    if (Input.isTriggered('ok'))  return this.exchangePuzzle();
    if (Input.isRepeated('up')    || Input.isTriggered('up'))    return this.follUp();
    if (Input.isRepeated('left')  || Input.isTriggered('left'))  return this.follLeft();
    if (Input.isRepeated('down')  || Input.isTriggered('down'))  return this.follDown();
    if (Input.isRepeated('right') || Input.isTriggered('right')) return this.follRight();
};
Window_Puzzlies.prototype.updateTouch = function() {
    if (!this.active || !TouchInput.isTriggered()) return;
    var index = this.getTouchIndex();
    if (index !== null) {
        index === this._index ? this.exchangePuzzle() : this.setIndex(index);
    }
};
Window_Puzzlies.prototype.getTouchIndex = function() {
    for (var i=0;i<this._puzzlies.length;++i) if (this._puzzlies[i].isTouch()) return i;
    return null;
};
//=============================================================================
function Scene_Puzzle() {
    this.initialize.apply(this, arguments);
}
Scene_Puzzle.prototype = Object.create(Scene_Base.prototype);
Scene_Puzzle.prototype.constructor = Scene_Puzzle;
Scene_Puzzle.prototype.prepare = function(xSize, ySize, pictureName) {
    this._xSize = xSize;
    this._ySize = ySize;
    this._pictureName = pictureName;
    var bitmap = ImageManager.loadPicture(this._pictureName);
    bitmap.addLoadListener(this.createAllWindows.bind(this));
};
Scene_Puzzle.prototype.createAllWindows = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.createTitleWindow();
    this.createStepWindow();
    this.createPuzzliesWindow();
    this.createFullGallery();
    this.createCommandWindow();
    this.createFinishSprite();
};
Scene_Puzzle.prototype.createTitleWindow = function() {
    this._titleWindow = new Window_PuzzlieTitle();
    this._titleWindow.setHandler('cancel', this.onGameCancel.bind(this));
    this.addChild(this._titleWindow);
};
Scene_Puzzle.prototype.createStepWindow = function() {
    this._stepWindow = new Window_PuzzlieStep();
    this.addChild(this._stepWindow);
};
Scene_Puzzle.prototype.createPuzzliesWindow = function() {
    this._puzzliesWindow = new Window_Puzzlies(this._xSize,this._ySize,this._pictureName);
    this._puzzliesWindow.setStepMethod(this.addGameStep.bind(this));
    this._puzzliesWindow.setCompletedMethod(this.onCompleted.bind(this));
    var th = this._titleWindow.y + this._titleWindow.height;
    var height = this._puzzliesWindow.height;
    this._puzzliesWindow.y = (Graphics.height - height + th) / 2;
    this.addChild(this._puzzliesWindow);
};
Scene_Puzzle.prototype.createFullGallery = function() {
    this._fullGallery = new Sprite_FullGallery(this._pictureName);
    this._fullGallery.setMethod('sk',     this.onGameCancel.bind(this));
    this._fullGallery.setMethod('cancel', this.shrinkFullGallery.bind(this));
    this.addChild(this._fullGallery);
};
Scene_Puzzle.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_PuzzlieCommand();
    this._commandWindow.setHandler('exit',        this.popScene.bind(this));
    this._commandWindow.setHandler('cancel',      this.continueGame.bind(this));
    this._commandWindow.setHandler('continue',    this.continueGame.bind(this));
    this._commandWindow.setHandler('fullGallery', this.showFullGallery.bind(this));
    this.addChild(this._commandWindow);
};
Scene_Puzzle.prototype.createFinishSprite = function() {
    this._finishSprite = new Sprite_PuzzlieFinish(this._puzzliesWindow);
    this.addChild(this._finishSprite);
};
Scene_Puzzle.prototype.addGameStep = function() {
    this._stepWindow.addStep();
};
Scene_Puzzle.prototype.onGameCancel = function() {
    this._puzzliesWindow.deactivate();
    this._commandWindow.open();
    this._commandWindow.show();
    this._commandWindow.activate();
};
Scene_Puzzle.prototype.continueGame = function() {
    this._commandWindow.close();
    this._puzzliesWindow.activate();
    this._titleWindow.activate();
};
Scene_Puzzle.prototype.showFullGallery = function() {
    this._fullGallery.startMove('blowUp');
    this._commandWindow.hide();
};
Scene_Puzzle.prototype.shrinkFullGallery = function() {
    this._fullGallery.startMove('shrink');
};
Scene_Puzzle.prototype.onCompleted = function() {
    this._titleWindow.deactivate();
    this._finishSprite.playCompleted();
};
//=================================================================================================
// end
//=================================================================================================