/*:
 * @plugindesc Web 字体强制加载
 */

(function() {
    var _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function() {
        _Scene_Boot_loadGameFonts.call(this);
        FontManager.load('GameFont', 'mplus-1m-regular.ttf');
    };
})();
