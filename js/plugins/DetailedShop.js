//=============================================================================
// DetailedShop
//=============================================================================
//v1.0 
/*:
 * @plugindesc 商店系统升级版
 * @author Jeremy Cannady 汉化:硕明云书
 *
 * @param ShopKeeper
 * @text 店主
 * @desc 
 * @default ---------------------------------
 *
 * @param Shopkeeper Enabled
 * @text 店主已启用
 * @desc 启用或禁用店主图片 true 或 false
 * @default true
 *
 * @param Shopkeeper Picure
 * @text 店主立绘
 * @desc The name of the shopkeeper picture. Must be in the /img/pictures folder.
 * @default DZ
 *
 * @param Shopkeeper X Adjust
 * @text 立绘 X
 * @desc Adjust the Shopkeeper picture, x is left(-) and right(+).
 * @default 0
 *
 * @param Shopkeeper Y Adjust 
 * @text 立绘 Y
 * @desc Adjust the Shopkeeper picture, y is up(+) and down(-).
 * @default 0
 *
 * @param Background Picture
 * @text 背景图片
 * @desc 
 * @default ---------------------------------
 *
 * @param BattleBack Default
 * @text 默认战斗背景
 * @desc 将默认背景图像设置为当前的战斗背景
 * @default false
 *
 * @param Override Battleback 1
 * @text 覆盖战斗背景1
 * @desc If we chose not to use the default then use these specific images for the background. Must be in the /img/battleback1
 * @default Ship
 *
 * @param Override Battleback 2
 * @text 覆盖战斗背景2
 * @desc If we chose not to use the default then use these specific images for the background. Must be in the /img/battleback2
 * @default Room1
 *
 * @param Text Options
 * @text 文本描述
 * @desc 
 * @default ---------------------------------
 *
 * @param Options Text
 * @text 进店欢迎语
 * @desc Text to display when we start the shop.
 * @default 欢迎光临！需要点什么帮助？
 *
 * @param Buy Text
 * @text 购买用语
 * @desc Text to say when we select buy.
 * @default 想要买点什么？
 *
 * @param Sell Text
 * @text 出售用语
 * @desc Text to say when we select sell.
 * @default 你想要卖什么？
 
 
 * @help
 *只需像往常一样使用内置的商店处理功能
 *
*/
var COLD = COLD || {};

COLD.Parameters = PluginManager.parameters('DetailedShop');
COLD.Param = COLD.Param || {};
COLD.Param.ShopBBEnabled = COLD.Parameters['BattleBack Enabled'] || 'true';
COLD.Param.ShopKEnabled = COLD.Parameters['Shopkeeper Enabled'] || 'false';
COLD.Param.ShopKPicture = COLD.Parameters['Shopkeeper Picure'] || 'Package2_2';
COLD.Param.ShopxAdjust = Number(COLD.Parameters['Shopkeeper X Adjust'] || 0);
COLD.Param.ShopyAdjust = Number(COLD.Parameters['Shopkeeper Y Adjust'] || 0);
COLD.Param.ShopBBDefault = COLD.Parameters['BattleBack Default'] || 'true';
COLD.Param.ShopBBOverride1 = COLD.Parameters['Override Battleback 1'] || 'Cobblestones1';
COLD.Param.ShopBBOverride2 = COLD.Parameters['Override Battleback 2'] || 'Town3';
COLD.Param.ShopOptionsText = COLD.Parameters['Options Text'];
COLD.Param.ShopBuyText = COLD.Parameters['Buy Text'];
COLD.Param.ShopSellText = COLD.Parameters['Sell Text'];


	//Plugin Commands Section
	//Changes the shopkeeper picture
	var changeShopPicture_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		changeShopPicture_pluginCommand.call(this, command, args);
		if (command === "changeShopPicture") {
			COLD.Param.ShopKPicture = args[0];
		};
	};
	//End Plugin Command Section
	
(function(){

	/**
    * Create the description window.
    */
	COLD.shopDescriptionWindow = function() {
		this.initialize.apply(this, arguments);
	};

	COLD.shopDescriptionWindow.prototype = Object.create(Window_Base.prototype);
	COLD.shopDescriptionWindow.prototype.constructor = COLD.shopDescriptionWindow;

	//Define variables
	COLD.shopDescriptionWindow.prototype.currentItem = null;
	COLD.shopDescriptionWindow.prototype.currentActor = null;

	COLD.shopDescriptionWindow.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Base.prototype.initialize.call(this, x, y, width, height);
	};

	//What we do on each update.
	COLD.shopDescriptionWindow.prototype.update = function() {
		this.contents.clear();
		if(this.currentItem != null){
			var item = this.currentItem;
			this.drawItemName(0, 0, this.windowWidth(), item);
			this.drawHorzLine(this.lineHeight()-8)
			this.drawItemIcon(this.standardPadding(), this.lineHeight() * 2, item);
			this.drawItemType(0, this.lineHeight() * 2, this.windowWidth(), item);
			this.drawHorzLine(this.lineHeight()*3)
			this.drawItemDescription(0, this.lineHeight() * 4, this.windowWidth(), item);
			this.drawHorzLine(this.windowHeight() - this.lineHeight()*7)
			this.drawHorzLine(this.windowHeight() - this.lineHeight()*2-18)
			this.drawPrice(0, this.windowHeight() - this.lineHeight() * 2, this.windowWidth(), item);
		};
		//Draw the parameter changes.
		if(this.currentItem != null && this.currentActor){
			this.drawItemParamChanges(0, this.windowHeight() - this.lineHeight()*6, this.windowWidth(), this.currentItem);
		};	
	};

	COLD.shopDescriptionWindow.prototype.windowWidth = function() {
		return Graphics.width - 100 - this.standardPadding() * 3;
	};

	COLD.shopDescriptionWindow.prototype.windowHeight = function() {
		return Graphics.height - 100;
	};

	COLD.shopDescriptionWindow.prototype.drawItemName = function( x, y, width, item) {
		this.drawText(item.name, x, y, width, 'center');
	};
	COLD.shopDescriptionWindow.prototype.drawItemIcon = function( x, y, item) {
		//Load the icon
		this.bitmapIcon = new Sprite(ImageManager.loadSystem('IconSet'));
		//Change the scale to twice as big
		this.bitmapIcon.scale.x = 2;
		this.bitmapIcon.scale.y = 2;
		//Position the icon x, y
		this.bitmapIcon.x = x
		this.bitmapIcon.y = y;
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = item.iconIndex % 16 * pw;
		var sy = Math.floor(item.iconIndex / 16) * ph;
		//Add the bitmap to the window
		this.addChild(this.bitmapIcon);
		this.bitmapIcon.setFrame(sx, sy, 32, 32);
	};
	
	COLD.shopDescriptionWindow.prototype.drawItemType = function( x, y, width, item) {
		if(COLD.shopIconSelectWindow.prototype.equipType == 1){
			var text = '武器类型：' + $dataSystem.weaponTypes[item.wtypeId];
			this.drawText(text, x, y, width - this.standardPadding() * 2, 'right');
		};
		if(COLD.shopIconSelectWindow.prototype.equipType == 2){
			var text = '护甲类型：' + $dataSystem.armorTypes[item.atypeId];
			this.drawText(text, x, y, width - this.standardPadding() * 2, 'right');
		};
	};

	COLD.shopDescriptionWindow.prototype.drawItemDescription = function( x, y, width, item) {
		this.drawText(item.description, x, y, width, 'left');
	};

	COLD.shopDescriptionWindow.prototype.drawHorzLine = function(y) {
		var lineY = y + this.lineHeight() / 2 - 1;
		this.contents.paintOpacity = 48;
		this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
		this.contents.paintOpacity = 255;
	};

	COLD.shopDescriptionWindow.prototype.paramChangeText = function(actor, item, paramIndex){
		var slotId = item.etypeId - 1;
		var currentEquipped = actor.equips()[slotId];
		if(!currentEquipped){
			var paramChange = item.params[paramIndex];
		}else{
			var paramChange = item.params[paramIndex] - currentEquipped.params[paramIndex];	
		};
		return paramChange;
	};

	COLD.shopDescriptionWindow.prototype.drawItemParamChanges = function(x, y, width, item) {
		var item = item;
		if(!DataManager.isItem(item)){
			var length = item.params.length;
			var intialY = y;
			var intialX = x;
			var  x;
			var text;
			for(var i = 0; i < length; i++){
				if( i % 2 == 0){
					x = intialX;
				}else{
					x = intialX + this.windowWidth() / 2;
				};
				text = $dataSystem.terms.params[i] + ': ';
				var change = this.paramChangeText(this.currentActor ,item, i);
				this.drawText(text, x, y, width, 'left');
				var xOffset = this.textWidth(text);
				if(change > 0){
					this.changeTextColor(this.textColor(11));
				}else if(change == 0){
					this.changeTextColor(this.normalColor());	
				}else{	
					this.changeTextColor(this.textColor(2));
				}
				this.drawText(change, x + xOffset, y, width, 'left');
				if( i % 2 != 0){
					y += this.lineHeight();
				};
				this.resetTextColor();
			};
		};
	};
	
	//Draw the price and our current gold value.
	COLD.shopDescriptionWindow.prototype.drawPrice = function( x, y, width, item) {
		var text = $gameParty._gold + ' ' + $dataSystem.currencyUnit;
		this.changeTextColor(this.textColor(20));
		this.drawText(text, x, y, width - this.standardPadding() * 2, 'right');	
		this.changeTextColor(this.textColor(22));
		var text = '售价: ' + item.price + ' ' + $dataSystem.currencyUnit;
		this.drawText(text, x, y, width - this.standardPadding() * 2, 'left');	
		this.resetTextColor();
	};
	
	/**
    * Create the item window.
    */

	COLD.shopItemWindow = function() {
		this.initialize.apply(this, arguments);
	};

	COLD.shopItemWindow.prototype = Object.create(Window_Base.prototype);
	COLD.shopItemWindow.prototype.constructor = COLD.shopItemWindow;
	
	COLD.shopItemWindow.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Base.prototype.initialize.call(this, x, y, width, height);
	};

	//What we do on each update.
	COLD.shopItemWindow.prototype.update = function() {
		this.item = this.currentItem;
		//Only execute if we have an item.
		if(this.currentItem != null){
			this.contents.clear();
			this.drawItemName(0, 0, this.windowWidth(), this.item);
			this.drawHorzLine(this.lineHeight() - this.standardPadding());
			this.drawItemDescription(0, this.lineHeight(), this.windowWidth(), this.item)
			this.drawHorzLine(this.lineHeight() * 3 - this.standardPadding());
			this.drawPrice(0, this.lineHeight() * 3, this.windowWidth(), this.item)
		};	
	};

	COLD.shopItemWindow.prototype.windowWidth = function() {
		return Graphics.width;
	};

	COLD.shopItemWindow.prototype.windowHeight = function() {
		return this.lineHeight() * 4+ this.standardPadding()*2;
	};

	COLD.shopItemWindow.prototype.drawItemName = function( x, y, width, item) {
		this.drawText(item.name, x, y, width, 'center');
	};

	COLD.shopItemWindow.prototype.drawItemDescription = function( x, y, width, item) {
		this.drawText(item.description, x, y, width, 'left');
	};

	COLD.shopItemWindow.prototype.drawHorzLine = function(y) {
		var lineY = y + this.lineHeight() / 2 - 1;
		this.contents.paintOpacity = 48;
		this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
		this.contents.paintOpacity = 255;
	};

	COLD.shopItemWindow.prototype.drawPrice = function( x, y, width, item) {
		var text = $gameParty._gold + ' ' + $dataSystem.currencyUnit;
		this.changeTextColor(this.textColor(20));
		this.drawText(text, x, y, width - this.standardPadding() * 2, 'right');	
		this.changeTextColor(this.textColor(22));
		var text = '售价: ' + item.price + ' ' + $dataSystem.currencyUnit;
		this.drawText(text, x, y, width - this.standardPadding() * 2, 'left');	
		this.resetTextColor();
	};

	/**
    * Create the actor window.
    */
	COLD.shopAbleToEquipWindow = function() {
		this.initialize.apply(this, arguments);
	};

	COLD.shopAbleToEquipWindow.prototype = Object.create(Window_Selectable.prototype);
	COLD.shopAbleToEquipWindow.prototype.constructor = COLD.shopAbleToEquipWindow;

	//Define variables.
	COLD.shopAbleToEquipWindow.prototype.lastIndex = -1;
	
	COLD.shopAbleToEquipWindow.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this._pendingIndex = -1;
		this.select(0);
		this.loadImages();
		this.refresh();
	};

	//What we do on each update.
	COLD.shopAbleToEquipWindow.prototype.update = function() {
		this._item = COLD.shopDescriptionWindow.prototype.currentItem;
		this.refresh();
		if(this._item){
			Window_Selectable.prototype.update.call(this);
			
			if(this.index() >= 0 && this.index() != this.lastIndex){
				COLD.shopDescriptionWindow.prototype.currentActor = this.equipAbleList(this._item)[this.index()];
				this.lastIndex = this.index();
			};
			
			//Check to see if we only have 1 actor and update accordingly.
			if(this.equipAbleList(this._item).length = 1){
				COLD.shopDescriptionWindow.prototype.currentActor = this.equipAbleList(this._item)[this.index()];
			};
		};
	};

	COLD.shopAbleToEquipWindow.prototype.loadImages = function() {
		$gameParty.members().forEach(function(actor) {
			ImageManager.loadFace(actor.faceName());
		}, this);
	};

	COLD.shopAbleToEquipWindow.prototype.drawItem = function(index) {
		if(this._item && !DataManager.isItem(this._item)) this.drawItemImage(index);
	};

	COLD.shopAbleToEquipWindow.prototype.drawItemImage = function(index) {
		var actor = this.equipAbleList(this._item)[index];
		var rect = this.itemRect(index);
		if(actor) this.drawActorFace(actor, rect.x + 9, rect.y + 9, 100, 100);
	};

	COLD.shopAbleToEquipWindow.prototype.equipAbleList = function(item){
		var array = [];
		$gameParty.members().forEach(function(actor){
			if(actor.canEquip(item))array.push(actor);
		}, this);
		return array;
	};

	COLD.shopAbleToEquipWindow.prototype.windowWidth = function(){
		return 100 + this.standardPadding() * 3;
	};

	COLD.shopAbleToEquipWindow.prototype.windowHeight = function(){
		return Graphics.height - 100;
	};

	COLD.shopAbleToEquipWindow.prototype.maxItems = function() {
		return this.equipAbleList(this._item).length || 1;
	};

	COLD.shopAbleToEquipWindow.prototype.itemHeight = function() {
		return 118;
	};

	COLD.shopAbleToEquipWindow.prototype.itemWidth = function() {
		return 118;
	};

	COLD.shopAbleToEquipWindow.prototype.numVisibleRows = function() {
		return 4;
	};

	COLD.shopAbleToEquipWindow.prototype.spacing = function() {
		return 0;
	};

	COLD.shopAbleToEquipWindow.prototype.maxCols = function() {
		return 1;
	};

	COLD.shopAbleToEquipWindow.prototype.selectLast = function() {
		this.select(0);
	};

	/**
	* Window to draw the selectable icons.
	*/

	COLD.shopIconSelectWindow = function() {
		this.initialize.apply(this, arguments);
	}

	COLD.shopIconSelectWindow.prototype = Object.create(Window_Selectable.prototype);
	COLD.shopIconSelectWindow.prototype.constructor = COLD.shopIconSelectWindow;

	//Define variables.
	COLD.shopIconSelectWindow.prototype.lastIndex = -1;
	COLD.shopIconSelectWindow.prototype.updateIcons = false;
	COLD.shopIconSelectWindow.prototype.currentItems = [];

	COLD.shopIconSelectWindow.prototype.initialize = function(x, y, goods) {
		this._goods = goods;
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this._pendingIndex = -1;
		this.refresh();
		this.activate();
		this.select(0);
	};

	COLD.shopIconSelectWindow.prototype.maxItems = function() {
		var items = [];
		var length = this._goods.length;
		for(var i = 0; i < length; i++){
			if(this._goods[i][0] == this.equipType) items.push(this._goods[i]);
		};
		return items.length || 1;
	};

	COLD.shopIconSelectWindow.prototype.itemHeight = function() {
		return 50;
	};

	COLD.shopIconSelectWindow.prototype.itemWidth = function() {
		return 50;
	};

	COLD.shopIconSelectWindow.prototype.numVisibleRows = function() {
		return 1;
	};

	COLD.shopIconSelectWindow.prototype.spacing = function() {
		return this.standardPadding();
	};

	COLD.shopIconSelectWindow.prototype.maxCols = function() {
		return this.maxItems() || 1;
	};

	COLD.shopIconSelectWindow.prototype.itemRect = function(index) {
		var rect = new Rectangle();
		var maxCols = this.maxCols();
		rect.width = this.itemWidth();
		rect.height = this.itemHeight();
		rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX + 9;
		rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 9;
		return rect;
	};

	COLD.shopIconSelectWindow.prototype.selectLast = function() {
		this.select(0);
	};

	COLD.shopIconSelectWindow.prototype.equipType = null;

	COLD.shopIconSelectWindow.prototype.windowWidth = function() {
		return Graphics.width;
	};

	COLD.shopIconSelectWindow.prototype.windowHeight = function() {
		return 100;
	};

	//What we do on each update.
	COLD.shopIconSelectWindow.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		this.refresh();
		if(this.index() != this.lastIndex || this.updateIcons == true){
			this.currentItems = [];
			for(var i = 0; i < this._goods.length; i++){
				if(this._goods[i][0] == COLD.shopIconSelectWindow.prototype.equipType){
					this.currentItems.push(this._goods[i])
				};
			};
			var itemNumber = this.currentItems[this.index()];
			var price = null;
			if(this.equipType == 0){
				COLD.shopItemWindow.prototype.currentItem = $dataItems[itemNumber[1]];
				price = (itemNumber[2] === 0) ? $dataItems[this.currentItems[this.index()][1]].price : itemNumber[3];
			}
			if(this.equipType == 1){
				COLD.shopDescriptionWindow.prototype.currentItem = $dataWeapons[itemNumber[1]];
				price = (itemNumber[2] === 0) ? $dataWeapons[this.currentItems[this.index()][1]].price : itemNumber[3];
			}
			if(this.equipType == 2){
				COLD.shopDescriptionWindow.prototype.currentItem = $dataArmors[itemNumber[1]];
				price = (itemNumber[2] === 0) ? $dataArmors[this.currentItems[this.index()][1]].price : itemNumber[3];
			};
			COLD.shopPurchaseCommandWindow.prototype.currentPrice = price;
			this.lastIndex = this.index();
		};
	};

	COLD.shopIconSelectWindow.prototype.drawItem = function(index) {
		this.drawItemIcons(index);
	};

	COLD.shopIconSelectWindow.prototype.drawItemIcons = function(index){
		var iconIndex = null;
		this.items = [];
	
		var length = this._goods.length;
		for(var i = 0; i < length; i++){
			if(this._goods[i][0] == COLD.shopIconSelectWindow.prototype.equipType){
				this.items.push(this._goods[i])
			};
		};

	
		switch(this.equipType) {
			case 0:
				iconIndex = $dataItems[this.items[index][1]].iconIndex;
				break;
			case 1:
				iconIndex = $dataWeapons[this.items[index][1]].iconIndex;
				break;
			case 2:
				iconIndex = $dataArmors[this.items[index][1]].iconIndex;
				break;
		};
		var rect = this.itemRect(index);
		this.drawIcon(iconIndex, rect.x + 9, rect.y + 9)
	};
	
	/**
	* Window to select options to buy or sell.
	*/
	
	COLD.shopOptionsWindow = function() {
		this.initialize.apply(this, arguments);
	}

	COLD.shopOptionsWindow.prototype = Object.create(Window_HorzCommand.prototype);
	COLD.shopOptionsWindow.prototype.constructor = COLD.shopOptionsWindow;

	COLD.shopOptionsWindow.prototype.initialize = function(x, y, purchaseOnly) {
		this._purchaseOnly = purchaseOnly;
		Window_HorzCommand.prototype.initialize.call(this, x, y);
		this.drawOptionsText();
	};

	COLD.shopOptionsWindow.prototype.windowWidth = function() {
		return Graphics.width;
	};

	COLD.shopOptionsWindow.prototype.windowHeight = function() {
		return 170;
	};

	COLD.shopOptionsWindow.prototype.maxCols = function() {
		return 3;
	};

	COLD.shopOptionsWindow.prototype.drawOptionsText = function(){
		this.drawText(COLD.Param.ShopOptionsText, 0, 0 , this.windowWidth(), 'center');
	};

	COLD.shopOptionsWindow.prototype.itemRect = function(index) {
		var rect = new Rectangle();
		var maxCols = this.maxCols();
		rect.width = this.itemWidth();
		rect.height = this.itemHeight();
		rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
		rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 100;
		return rect;
	};

	COLD.shopOptionsWindow.prototype.itemRectForText = function(index) {
		var rect = this.itemRect(index);
		rect.x += this.textPadding();
		rect.width -= this.textPadding() * 2;
		return rect;
	};

	COLD.shopOptionsWindow.prototype.makeCommandList = function() {
		this.addCommand(TextManager.buy,    'buy');
		this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
		this.addCommand(TextManager.cancel, 'cancel');
	};

	/**
	* Window to select items, weapons, or armors.
	*/

	COLD.shopCategoryWindow = function() {
		this.initialize.apply(this, arguments);
	}

	COLD.shopCategoryWindow.prototype = Object.create(Window_HorzCommand.prototype);
	COLD.shopCategoryWindow.prototype.constructor = COLD.shopCategoryWindow;

	COLD.shopCategoryWindow.prototype.initialize = function(x, y, goods) {
		this._goods = goods;
		Window_HorzCommand.prototype.initialize.call(this, x, y);
		this.refresh();
	};

	COLD.shopCategoryWindow.prototype.windowWidth = function() {
		return Graphics.width;
	};

	COLD.shopCategoryWindow.prototype.windowHeight = function() {
		return 170;
	};

	COLD.shopCategoryWindow.prototype.maxCols = function() {
		return 3;
	};

	COLD.shopCategoryWindow.prototype.drawCategory = null;

	COLD.shopCategoryWindow.prototype.refresh = function(){
		Window_Command.prototype.refresh.call(this);
			this.drawCategoryText();
	}

	COLD.shopCategoryWindow.prototype.drawCategoryText = function(){
		if(this.drawCategory == 'buy'){
			this.drawText(COLD.Param.ShopBuyText, 0, 0 , this.windowWidth(), 'center');
		}else if (this.drawCategory == 'sell'){
			this.drawText(COLD.Param.ShopSellText, 0, 0 , this.windowWidth(), 'center');
		}else{}
	};

	COLD.shopCategoryWindow.prototype.checkForItems = function(){
		var haveItems = false;
		for(var i = 0; i < this._goods.length; i++){
			if(this._goods[i][0] == 0){
			var haveItems = true;
			};
		};
		return haveItems;
	};

	COLD.shopCategoryWindow.prototype.checkForWeapons = function(){
		var haveWeapons = false;
		for(var i = 0; i < this._goods.length; i++){
			if(this._goods[i][0] == 1){
			var haveWeapons = true;
			};
		};
		return haveWeapons;	
	};

	COLD.shopCategoryWindow.prototype.checkForArmors = function(){
		var haveArmors = false;
		for(var i = 0; i < this._goods.length; i++){
			if(this._goods[i][0] == 2) var haveArmors = true;
		};
		return haveArmors;	
	};

	COLD.shopCategoryWindow.prototype.itemRect = function(index) {
		var rect = new Rectangle();
		var maxCols = this.maxCols();
		rect.width = this.itemWidth();
		rect.height = this.itemHeight();
		rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
		rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 100;
		return rect;
	};

	COLD.shopCategoryWindow.prototype.itemRectForText = function(index) {
		var rect = this.itemRect(index);
		rect.x += this.textPadding();
		rect.width -= this.textPadding() * 2;
		return rect;
	};

	COLD.shopCategoryWindow.prototype.makeCommandList = function() {
		this.addCommand(TextManager.item,    'item', this.checkForItems());
		this.addCommand(TextManager.weapon,  'weapon', this.checkForWeapons());
		this.addCommand(TextManager.armor,   'armor', this.checkForArmors());
	};
	
	/**
	* Window to select purchase,compare or buy.
	*/
	
	COLD.shopPurchaseCommandWindow = function() {
		this.initialize.apply(this, arguments);
	}

	COLD.shopPurchaseCommandWindow.prototype = Object.create(Window_HorzCommand.prototype);
	COLD.shopPurchaseCommandWindow.prototype.constructor = COLD.shopPurchaseCommandWindow;

	COLD.shopPurchaseCommandWindow.prototype.initialize = function(x, y) {
		Window_HorzCommand.prototype.initialize.call(this, x, y);
	};

	COLD.shopPurchaseCommandWindow.prototype.windowWidth = function() {
		return Graphics.width;
	};

	COLD.shopPurchaseCommandWindow.prototype.windowHeight = function() {
		return 100;
	};

	COLD.shopPurchaseCommandWindow.prototype.maxCols = function() {
		return 3;
	};
	
	COLD.shopPurchaseCommandWindow.prototype.currentPrice = 0;
	
	COLD.shopPurchaseCommandWindow.prototype.makeCommandList = function() {
		var enabled = (this.currentPrice <= $gameParty._gold);
		this.addCommand('购买', 'purchase', enabled);
		var actorList = COLD.shopAbleToEquipWindow.prototype.equipAbleList(COLD.shopDescriptionWindow.prototype.currentItem);
		var enabled = actorList.length > 0;
		this.addCommand('比较', 'compare', enabled);
		this.addCommand('取消',  'cancel');
	};
	
	/**
	* Window up list of items to sell.
	*/

	COLD.Window_ShopSell = function() {
		this.initialize.apply(this, arguments);
	}

	COLD.Window_ShopSell.prototype = Object.create(Window_ItemList.prototype);
	COLD.Window_ShopSell.prototype.constructor = COLD.Window_ShopSell;

	COLD.Window_ShopSell.prototype.initialize = function(x, y, width, height) {
		Window_ItemList.prototype.initialize.call(this, x, y, width, height);
	};

	COLD.Window_ShopSell.prototype.isEnabled = function(item) {
		return item && item.price > 0;
	};
})();

	/**
	* Override Scene_Shop
	*/
	
function Scene_Shop() {
    this.initialize.apply(this, arguments);
}

Scene_Shop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Shop.prototype.constructor = Scene_Shop;

Scene_Shop.prototype.initialize = function() {
	
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Shop.prototype.createBackground = function() {
	if(COLD.Param.ShopBBDefault === 'true'){
		this._backSprite1 = new Sprite(ImageManager.loadBattleback1($gameMap.battleback1Name()));
		this._backSprite2 = new Sprite(ImageManager.loadBattleback2($gameMap.battleback2Name()));
	}else{
		this._backSprite1 = new Sprite(ImageManager.loadBattleback1(COLD.Param.ShopBBOverride1));
		this._backSprite2 = new Sprite(ImageManager.loadBattleback2(COLD.Param.ShopBBOverride2));		
	};
	this.addChild(this._backSprite1);
	this.addChild(this._backSprite2);
};

Scene_Shop.prototype.createShopKeeper = function() {
	if(COLD.Param.ShopKEnabled === 'true'){
		var bitmap = ImageManager.loadPicture(COLD.Param.ShopKPicture)
		bitmap.addLoadListener(function() {
			this._shopkeeper = new Sprite(bitmap);
			this._shopkeeper.setFrame(COLD.Param.ShopxAdjust, COLD.Param.ShopyAdjust, this._shopkeeper.width, this._shopkeeper.height);
			this.addChild(this._shopkeeper);
      }.bind(this));
	};
};

Scene_Shop.prototype.centerSprite = function(sprite) {
	var swidth = sprite.width;
	var sheight  = sprite.height;
	
    if(swidth < Graphics.width) sprite.scale.x = Graphics.width/sprite.width;
	else sprite.scale.x = sprite.width/Graphics.width;
	if(sheight < Graphics.height) sprite.scale.y = Graphics.height/sprite.height;
	else sprite.scale.y = sprite.height/Graphics.height;

	sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
    this._goods = goods;
    this._purchaseOnly = purchaseOnly;
    this._item = null;
};

Scene_Shop.prototype.create = function() {
   Scene_MenuBase.prototype.create.call(this);
	this.createBackground();
	this.createWindowLayer();
	this.createShopKeeper();
	this.createDescriptionWindow();
	this.createAbleToEquipWindow();
	this.createCommandWindow();
	this.createIconWindow();
	this.createCategoryWindow();
	this.createPurchaseWindow();
	this.createItemWindow();
	this.createNumberWindow();
	this.createSellWindow();
};

Scene_Shop.prototype.start = function() {
	if(COLD.Param.ShopBBEnabled === 'true'){
		this.centerSprite(this._backSprite1);
		this.centerSprite(this._backSprite2);
	};
};
Scene_Shop.prototype.createSellWindow = function() {
	var y = COLD.shopDescriptionWindow.prototype.windowHeight()-70;
    this._sellWindow = new COLD.Window_ShopSell(0, y, Graphics.boxWidth, Graphics.boxHeight - y);
    this._sellWindow.hide();
	this._sellWindow.deactivate();
	this._sellWindow.refresh();
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCanceled.bind(this));
    this.addWindow(this._sellWindow);
};

Scene_Shop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
	this._numberWindow.showButtons();
};

Scene_Shop.prototype.maxSell = function() {
    return $gameParty.numItems(this._item);
};

Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor(this._item.price / 2);
};

Scene_Shop.prototype.onSellCanceled = function() {
    this._sellWindow.hide();
	this._sellWindow.deactivate();
	this._categoryWindow.show();
    this._categoryWindow.activate();
	this.updateShopKeeper(255);
};
Scene_Shop.prototype.createDescriptionWindow = function() {
    this._descriptionWindow = new COLD.shopDescriptionWindow(0, 0);
	this._descriptionWindow.hide();
	this.addWindow(this._descriptionWindow );
};

Scene_Shop.prototype.createCommandWindow = function() {
    this._commandWindow = new COLD.shopOptionsWindow(0, COLD.shopDescriptionWindow.prototype.windowHeight() - 70,this._purchaseOnly);
    this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Shop.prototype.createCategoryWindow = function() {
    this._categoryWindow = new COLD.shopCategoryWindow(0, COLD.shopDescriptionWindow.prototype.windowHeight()-70, this._goods);
	this._categoryWindow.hide();
	this._categoryWindow.deactivate();
    this._categoryWindow.setHandler('item',    this.commandItem.bind(this));
    this._categoryWindow.setHandler('weapon',   this.commandWeapon.bind(this));
    this._categoryWindow.setHandler('armor', this.commandArmor.bind(this));
	this._categoryWindow.setHandler('cancel', this.activateCommand.bind(this));
    this.addWindow(this._categoryWindow);
};
Scene_Shop.prototype.createPurchaseWindow = function() {
    this._purchaseWindow = new COLD.shopPurchaseCommandWindow(0, COLD.shopDescriptionWindow.prototype.windowHeight());
	this._purchaseWindow.hide();
	this._purchaseWindow.deactivate();
    this._purchaseWindow.setHandler('purchase',    this.onPurchase.bind(this));
    this._purchaseWindow.setHandler('compare',   this.onSelectionCompare.bind(this));
	this._purchaseWindow.setHandler('cancel', this.onPurchaseCancel.bind(this));
    this.addWindow(this._purchaseWindow);
};

Scene_Shop.prototype.createItemWindow = function() {
	var y = COLD.shopDescriptionWindow.prototype.windowHeight();
    this._itemWindow = new COLD.shopItemWindow(0, y - COLD.shopItemWindow.prototype.windowHeight());
	this._itemWindow.hide();
    this.addWindow(this._itemWindow);
};

Scene_Shop.prototype.onPurchase = function(){
	switch (this._categoryWindow.currentSymbol()) {
		case 'item':
			this._item = COLD.shopItemWindow.prototype.currentItem;
			break;
		case 'weapon':
			this._item = COLD.shopDescriptionWindow.prototype.currentItem;
			break;
		case 'armor':
			this._item = COLD.shopDescriptionWindow.prototype.currentItem;
			break;
	};
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
	this._numberWindow.showButtons();
	this._numberWindow.refresh();
    this._numberWindow.activate();
};

Scene_Shop.prototype.maxBuy = function() {
    var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
    var price = this.buyingPrice();
    if (price > 0) {
        return Math.min(max, Math.floor(this.money() / price));
    } else {
        return max;
    };
};

Scene_Shop.prototype.money = function() {
    return $gameParty.gold();
};

Scene_Shop.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Scene_Shop.prototype.buyingPrice = function() {
    return this._item.price;
};

Scene_Shop.prototype.onPurchaseCancel = function(){
	this._purchaseWindow.hide();
	this._iconWindow.activate();
	this._iconWindow.show();
};

Scene_Shop.prototype.activateCommand = function() {
	this._categoryWindow.hide();
	this._commandWindow.show();
	this._commandWindow.activate();
}

Scene_Shop.prototype.commandBuy = function() {
	COLD.shopCategoryWindow.prototype.drawCategory = 'buy';
    this._commandWindow.hide();
    this._categoryWindow.show();
	this._commandWindow.deactivate();
	this._categoryWindow.activate();
	this._categoryWindow.refresh();
};

Scene_Shop.prototype.commandSell = function() {
	COLD.shopCategoryWindow.prototype.drawCategory = 'sell';
	this._commandWindow.hide();
	this._commandWindow.deactivate();
	this._categoryWindow.show();
	this._categoryWindow.activate();
	this._categoryWindow.refresh();
};

Scene_Shop.prototype.commandItem = function() {
	switch (this._commandWindow.currentSymbol()) {
		case 'buy':
			this.updateShopKeeper(0);
			this._categoryWindow.hide();
			COLD.shopIconSelectWindow.prototype.updateIcons = true;
			COLD.shopIconSelectWindow.prototype.equipType = 0;
			this._itemWindow.show();
			this._iconWindow.activate();
			this._iconWindow.show();
				break;
		case 'sell':
			this.updateShopKeeper(0);
			this._categoryWindow.hide();
			this._sellWindow.setCategory('item');
			this._sellWindow.refresh();
			this._sellWindow.show();
			this._sellWindow.activate();
			this._sellWindow.select(0);
				break;
    };
};

Scene_Shop.prototype.updateShopKeeper = function(number){
	if(COLD.Param.ShopKEnabled === 'true')this._shopkeeper.opacity = number;
};

Scene_Shop.prototype.commandWeapon = function() {
		switch (this._commandWindow.currentSymbol()) {
    case 'buy':
		this.updateShopKeeper(0);
		this._categoryWindow.hide();
		COLD.shopIconSelectWindow.prototype.updateIcons = true;
		COLD.shopIconSelectWindow.prototype.equipType = 1;
		this._ableToEquipWindow.show();
		this._ableToEquipWindow.refresh();
		this._descriptionWindow.show();
		this._iconWindow.activate();
		this._iconWindow.show();
			break;
    case 'sell':
		this.updateShopKeeper(0);
		this._sellWindow.setCategory('weapon');
		this._categoryWindow.hide();
		this._sellWindow.refresh();
		this._sellWindow.show();
		this._sellWindow.activate();
		this._sellWindow.select(0);
			break;
    };
};
Scene_Shop.prototype.commandArmor = function() {
	    switch (this._commandWindow.currentSymbol()) {
    case 'buy':
	this.updateShopKeeper(0);
	COLD.shopIconSelectWindow.prototype.updateIcons = true;
	COLD.shopIconSelectWindow.prototype.equipType = 2;
	this._descriptionWindow.show();
	this._ableToEquipWindow.show();
	this._ableToEquipWindow.refresh();
	this._iconWindow.activate();
	this._iconWindow.show();
        break;
    case 'sell':
		this.updateShopKeeper(0);
		this._categoryWindow.hide();
		this._sellWindow.activate();
		this._sellWindow.show();
	   	this._sellWindow.setCategory('armor');
		this._sellWindow.refresh();
		this._sellWindow.select(0);
        break;
    }
    this._categoryWindow.hide();

};

Scene_Shop.prototype.onSelectionCancel = function() {
    this._categoryWindow.show();
	this.updateShopKeeper(255);
	COLD.shopIconSelectWindow.prototype.updateIcons = false;
	this._categoryWindow.activate();
	this._descriptionWindow.hide();
	this._descriptionWindow.contents.clear();
	this._ableToEquipWindow.hide();
	this._itemWindow.hide();
    this._iconWindow.hide();
	COLD.shopDescriptionWindow.prototype.currentItem = null;
	COLD.shopIconSelectWindow.prototype.equipType = null;
	this._iconWindow.select(0);
};

Scene_Shop.prototype.onSelectionCompare = function(){
	this._ableToEquipWindow.activate();
};

Scene_Shop.prototype.onSelectionOk = function() {
	this._iconWindow.hide();
	this._purchaseWindow.show();
	this._purchaseWindow.activate();
	this._purchaseWindow.refresh();
}

Scene_Shop.prototype.createIconWindow = function() {
    this._iconWindow = new COLD.shopIconSelectWindow(0, COLD.shopDescriptionWindow.prototype.windowHeight(), this._goods);
	this._iconWindow.setHandler('cancel', this.onSelectionCancel.bind(this));
	this._iconWindow.setHandler('ok', this.onSelectionOk.bind(this));
	this._iconWindow.hide();
	this._iconWindow.deactivate();
	this.addWindow(this._iconWindow );
};

Scene_Shop.prototype.onCompareCancel = function(){
	this._ableToEquipWindow.deactivate();
	this._purchaseWindow.activate();
}

Scene_Shop.prototype.createAbleToEquipWindow = function() {
    this._ableToEquipWindow = new COLD.shopAbleToEquipWindow(COLD.shopDescriptionWindow.prototype.windowWidth(), 0);
	this._ableToEquipWindow.setHandler('cancel', this.onCompareCancel.bind(this));
	this._ableToEquipWindow.hide();
	this._ableToEquipWindow.deactivate();
	this.addWindow(this._ableToEquipWindow);
};

Scene_Shop.prototype.createNumberWindow = function() {
	//illuminati
    this._numberWindow = new Window_ShopNumber(0, 0, 330);
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

Scene_Shop.prototype.onNumberOk = function() {
    SoundManager.playShop();
    switch (this._commandWindow.currentSymbol()) {
    case 'buy':
        this.doBuy(this._numberWindow.number());
        break;
    case 'sell':
        this.doSell(this._numberWindow.number());
		this._sellWindow.refresh();
        break;
    }
	this._purchaseWindow.refresh();
    this.endNumberInput();
};

Scene_Shop.prototype.onNumberCancel = function() {
    SoundManager.playCancel();
    this.endNumberInput();
};

Scene_Shop.prototype.doBuy = function(number) {
    $gameParty.loseGold(number * this.buyingPrice());
    $gameParty.gainItem(this._item, number);
};

Scene_Shop.prototype.doSell = function(number) {
    $gameParty.gainGold(number * this.sellingPrice());
    $gameParty.loseItem(this._item, number);
};

Scene_Shop.prototype.endNumberInput = function() {
    this._numberWindow.hide();
    switch (this._commandWindow.currentSymbol()) {
    case 'buy':
     this._purchaseWindow.activate();
        break;
    case 'sell':
        this._sellWindow.show();
		this._sellWindow.activate();
        break;
    }
};