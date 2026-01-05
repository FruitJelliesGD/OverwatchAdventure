//=============================================================================
// InfoWindow.js
//=============================================================================

/*:
 * @plugindesc 场景情报信息窗口
 * @author Me
 *
 * @param DisplayText
 * @text 显示文本
 * @desc 窗口中显示的描述文本
 * @default 记忆碎片
 *
 * @param IconId
 * @text 图标ID
 * @desc 显示的图标ID
 * @type number
 * @default 222
 *
 * @param VariableId
 * @text 变量ID
 * @desc 显示的变量ID
 * @type variable
 * @default 2
 *
 * @param VariableSuffix
 * @text 变量后缀文本
 * @desc 变量值后面的文本
 * @default 个
 *
 * @param PositionX
 * @text X坐标
 * @desc 窗口的X轴位置
 * @type number
 * @default 20
 *
 * @param PositionY
 * @text Y坐标
 * @desc 窗口的Y轴位置
 * @type number
 * @default 20
 *
 * @help 
 
 可以通过插件参数设置显示的文本、图标、变量和位置
 修正/汉化：云书
 增加插件参数方便设置
 * 
 * 插件命令：
 * InfoWindow show - 显示信息窗口
 * InfoWindow hide - 隐藏信息窗口
 * InfoWindow toggle - 切换窗口显示状态
 */

(function() {
    // 获取插件参数
    var parameters = PluginManager.parameters('InfoWindow');
    var displayText = String(parameters['DisplayText'] || '记忆碎片');
    var iconId = Number(parameters['IconId'] || 222);
    var variableId = Number(parameters['VariableId'] || 2);
    var variableSuffix = String(parameters['VariableSuffix'] || '个');
    var positionX = Number(parameters['PositionX'] || 20);
    var positionY = Number(parameters['PositionY'] || 20);

    // 全局窗口实例
    var infoWindowInstance = null;

    // 地图上显示窗口
    var Scene_map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        Scene_map_start.call(this);
        this._InfoWindow = new Window_Info();
        this.addWindow(this._InfoWindow);
        infoWindowInstance = this._InfoWindow;
    };
    
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (this._InfoWindow) {
            this._InfoWindow.setText();
        }
    };
	
	// 信息窗口类
	function Window_Info() {
	    this.initialize.apply(this, arguments);
	}

	Window_Info.prototype = Object.create(Window_Base.prototype);
	Window_Info.prototype.constructor = Window_Info;
	
	Window_Info.prototype.initialize = function() {
		var x = positionX;
		var y = positionY;
	    var width = 180;
	    var height = 108;
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	};

	Window_Info.prototype.setText = function(str) {
		this._text = str;
		this.refresh();
	};
	
	// 窗口内容刷新
	Window_Info.prototype.refresh = function() {
	    this.contents.clear();
		this.changeTextColor(this.textColor(16));
        this.drawIcon(iconId, 1, 1);
		this.drawText(displayText, 40, 1);
		this.resetTextColor();
		// 使用参数中的变量后缀文本
		this.drawText($gameVariables.value(variableId) + " " + variableSuffix, 0, this.lineHeight());
	};
	
	// 字体大小
	Window_Info.prototype.standardFontSize = function() {
    	return 20;
    };
    
	// 窗口透明度
	Window_Info.prototype.standardBackOpacity = function() {
    	return 255;
	};
    
    // 窗口边距
	Window_Info.prototype.standardPadding = function() {
    	return 18;
	};
    
	// 窗口色调
	Window_Info.prototype.updateTone = function() {
    	this.setTone(64, 0, 128);
	};

    // 修复窗口显示隐藏方法（使用Window类原生的show/hide）
    Window_Info.prototype.showWindow = function() {
        this.show(); // 替换setVisible(true)
    };

    Window_Info.prototype.hideWindow = function() {
        this.hide(); // 替换setVisible(false)
    };

    Window_Info.prototype.toggleWindow = function() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    };

    // 插件命令处理
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'InfoWindow') {
            switch (args[0]) {
                case 'show':
                    if (infoWindowInstance) infoWindowInstance.showWindow();
                    break;
                case 'hide':
                    if (infoWindowInstance) infoWindowInstance.hideWindow();
                    break;
                case 'toggle':
                    if (infoWindowInstance) infoWindowInstance.toggleWindow();
                    break;
            }
        }
    };
	
})();