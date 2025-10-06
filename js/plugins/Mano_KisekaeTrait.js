 //=============================================================================
// Mano_KisekaeTrait.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
// ----------------------------------------------------------------------------
//=============================================================================
/**
 * 再配布を許可します。
 * ゲームの内容による使用制限はありません。
 * 
 * 以下の行為は禁止します。
 * ・自分が作ったと偽ること
 * ・このプラグイン自体を素材として販売すること
 * （他の素材と併用する形での同梱は禁止しません）
 * read meには以下の内容を記載してください。
 * しぐれん：[github]:https://github.com/Sigureya/RPGmakerMV
 * 
 */
/*:
 * 改造した場合、この後ろに「改変者（〇〇）」などの形で表記してください。
 * @author しぐれん  汉化：硕明云书
 * @plugindesc 装备图像换装系统
 * 
 * @param kisekae1
 * @text 形象1
 * @type struct<Kisekae>
 * @default {"armor":"1","characterId":"1","character":"Actor1","sv_actor":"Actor1_1"}
 * @param kisekae2
 * @text 形象2
 * @type struct<Kisekae>
 * 
 * @param kisekae3
 * @text 形象3
 * @type struct<Kisekae>
 * 
 * @param kisekae4
 * @text 形象4
 * @type struct<Kisekae>
 * 
 * @param kisekae5
 * @text 形象5
 * @type struct<Kisekae>
 * 
 * @param kisekae6
 * @text 形象6
 * @type struct<Kisekae>
 * @param kisekae7
 * @text 形象7
 * @type struct<Kisekae>
 * @param kisekae8
 * @text 形象8
 * @type struct<Kisekae>
 * @param kisekae9
 * @text 形象9
 * @type struct<Kisekae>
 * @param kisekae10
 * @text 形象10
 * @type struct<Kisekae>
 * @param kisekae11
 * @text 形象11
 * @type struct<Kisekae>
 * @param kisekae12
 * @text 形象12
 * @type struct<Kisekae>
 * @param kisekae13
 * @text 形象13
 * @type struct<Kisekae>
 * @param kisekae14
 * @text 形象14
 * @type struct<Kisekae>
 * @param kisekae15
 * @text 形象15
 * @type struct<Kisekae>
 * @param kisekae16
 * @text 形象16
 * @type struct<Kisekae>
 * @param kisekae17
 * @text 形象17
 * @type struct<Kisekae>
 * @param kisekae18
 * @text 形象18
 * @type struct<Kisekae>
 * @param kisekae19
 * @text 形象19
 * @type struct<Kisekae>
 * @param kisekae20
 * @text 形象20
 * @type struct<Kisekae>
 * @param kisekae21
 * @text 形象21
 * @type struct<Kisekae>
 * @param kisekae22
 * @text 形象22
 * @type struct<Kisekae>
 * @param kisekae23
 * @text 形象23
 * @type struct<Kisekae>
 * @param kisekae24
 * @text 形象24
 * @type struct<Kisekae>
 * @param kisekae25
 * @text 形象25
 * @type struct<Kisekae>
 * @param kisekae26
 * @text 形象26
 * @type struct<Kisekae>
 * @param kisekae27
 * @text ----------------
 * @type struct<Kisekae>
 * 
 * 如果设置数量不足，请将上述内容复制到备忘录并添加项目。
 * 
 * @help
-----------------------------------------------
 ♥ 使用条款：
-----------------------------------------------
1、插件允许转载
2、允许商业和非商业游戏
3、禁止售卖此插件
4、禁止修改为自己制作的插件
5、请在您的作品自述中包括以下内容：
* しぐれん：[github]:https://github.com/Sigureya/RPGmakerMV
-----------------------------------------------
 * 切换装备时图像会发生变化。
 * 
 * var 0.9.0(2017/09/20) 公開
*/

/*~struct~Kisekae:
 * @param armor
 * @text 服装选择
 * @desc 选择决定替换的护甲
 * @type armor
 * 
 * @param characterIndex
 * @text 图像序号
 * @desc 确定要引用的步行图形
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * 
 * @param character
 * @text 行走图
 * @type file
 * @dir img/characters
 * 
 * @param battler
 * @text 战斗图
 * @desc 设置侧视图的图像
 * @type file
 * @dir img/sv_actors
 */
(function(){

'use strict'
//開発用　入力保管を有効にするならこれを使う
// class KisekaeTrait{
//     constructor(){
//         this.character ='';
//         this.index=1;
//         this.battler='';
//     }
// }

/**
 * 
 * @param {String} characterName
 * @param {Number} index
 * @param {String} battlerName
 * 
 */
function createKisekaeDefine(characterName,index,battlerName){
    return {
        character:characterName,
        index:index,
        battler:battlerName
    };
}
function boot_kisekae_eachArmor(param){
    const equipId = Number( param.armor);
    const index = Number(param.characterIndex);

    const characterName = param.character;
    const battlerName =param.battler;
    $dataArmors[equipId].kisekaeTrait_MA =createKisekaeDefine(characterName,index,battlerName);
}

const Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start =function(){
    Scene_Boot_start.call(this);
    const param =(  PluginManager.parameters('Mano_KisekaeTrait'));
    for(var key in param){
        var data = param[key];
        if(data){
            boot_kisekae_eachArmor(JSON.parse(data) );
        }
    }
};
/**
 * @param {Game_Actor} actor 
 * @return {RPG.Armor} 見つからなかったらnull
 */
function fetchKisekaeArmor(actor){
    const equips = actor.equips();
    for(var i =0; i< equips.length; i+=1){
        const e = equips[i];
        if(e && e.kisekaeTrait_MA){
            return e;
        }
    }
    return null;
}

/**
 * @param {RPG.Armor} armor
 * @return {KisekaeTrait}
 */
function fetchKisekaeTrait(armor){
    return armor.kisekaeTrait_MA;
}
/**
 * @return {boolean}
 * @param {RPG.Armor} armor 
 */
function hasKisekaeTrait(armor){
    return armor && !!fetchKisekaeTrait(armor);
}

/**
 * 
 * @param {KisekaeTrait} trait 
 */
function requestKisekaeImage(trait){
    if(trait.character){
        ImageManager.requestCharacter(trait.character);
    }
    if(trait.battler){
        ImageManager.requestSvActor(trait.battler);
    }

}

/**
 * @param {Game_Actor} actor
 * @param {RPG.Armor} [armor=null]
 */
function kisekaeRefresh(actor,armor){
    if(armor){
        const trait = fetchKisekaeTrait(armor);
        if(trait){
            requestKisekaeImage(trait);
            actor.setCharacterImage(trait.character,trait.index);
            actor.setBattlerImage(trait.battler);
            return;
        }
    }
    const dataActor =actor.actor();
    actor.setCharacterImage(dataActor.characterName,dataActor.characterIndex);
    actor.setBattlerImage(dataActor.battlerName);
}

function kisekaeRefreshAll(){
    $gameParty.members().forEach(function(actor){
        actor.applyKiesekae();
    });
}

const  Game_Actor_setup =Game_Actor.prototype.setup;
Game_Actor.prototype.setup =function(actorId){
    Game_Actor_setup.call(this,actorId);
    this.applyKiesekae();
};

const Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip =function(slotId, item){
    const lastItem = this._equips[slotId].object();
    Game_Actor_changeEquip.call(this,slotId,item);

    if(lastItem ===item){
        return;
    }
    if(hasKisekaeTrait(item) || hasKisekaeTrait(lastItem) ){
        kisekaeRefresh(this,item);
        $gamePlayer.refresh();        
    }
};

Game_Actor.prototype.applyKiesekae =function(){
    const e = fetchKisekaeArmor(this);
    kisekaeRefresh(this,e);
};

const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command, args){
    if(command ==='kisekae'){
        const actors = $gameParty.members();
        actors.forEach(function(actor){actor.applyKiesekae()});
        $gamePlayer.refresh();
    }
};

})();