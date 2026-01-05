/*:
 * @plugindesc 自动启用拉伸填充屏幕（兼容 Web）v1.1
 * @author 果冻大神
 *
 * @help
 * 游戏启动后自动启用拉伸模式（等同 F3），
 * Web / 桌面端均有效。
 */

(() => {
	Graphics._switchFullScreen();

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);

        // 延迟一帧，确保 Canvas 初始化完成
        requestAnimationFrame(() => {
            if (!Graphics._stretchEnabled) {
                Graphics._switchStretchMode();
            }
        });
    };

})();
