/*:
 * @plugindesc v1.2 修复 RPG Maker MV 在高刷新率显示器下的地图抖动（仅 NW.js 生效）
 * @author Zumi Kua
 *
 * @param Mode
 * @text 帧率模式
 * @type select
 * @option 固定 60FPS（推荐）
 * @value fixed60
 * @option 高刷新率平滑（安全）
 * @value smooth
 * @default smooth
 *
 * @param MaxDelta
 * @text 最大帧时间（秒）
 * @type number
 * @decimals 3
 * @default 0.05
 *
 * @help
 * ■ 平台说明
 * - 本插件 **仅在 NW.js（桌面版）生效**
 * - Web / 手机浏览器下完全不运行，避免时间异常
 *
 * ■ 核心设计
 * - 游戏逻辑始终固定 60FPS
 * - 高刷新率下避免 0 / 2 帧跳变
 * - 不会导致动画、事件加速
 */

/*: zh
 * @plugindesc v1.2 修复 RPG Maker MV 在高刷新率显示器下的地图抖动（仅 NW.js 生效）
 */

(function () {

    'use strict';

    //==================================================
    // 仅 NW.js 启用
    //==================================================

    if (!Utils.isNwjs()) {
        // Web / Mobile：完全不介入
        return;
    }

    //==================================================
    // 参数
    //==================================================

    const params = PluginManager.parameters('HighRefreshFix');

    const MODE = String(params['Mode'] || 'smooth');
    const MAX_DELTA = Number(params['MaxDelta'] || 0.05);

    const FIXED_DT = 1 / 60;
    const USE_SMOOTH = MODE === 'smooth';

    //==================================================
    // SceneManager.update
    //==================================================

    SceneManager.update = function (stamp) {
        try {
            this.tickStart();

            if (Utils.isMobileSafari()) {
                this.updateInputData();
            }

            this.updateManagers();
            this.updateMain(stamp);

            this.tickEnd();
        } catch (e) {
            this.catchException(e);
        }
    };

    //==================================================
    // 核心修复逻辑（NW.js only）
    //==================================================

    SceneManager.updateMain = function (stamp) {

        if (Utils.isMobileSafari()) {
            this.changeScene();
            this.updateScene();
            this.renderScene();
            this.requestUpdate();
            return;
        }

        let delta = (stamp - this._currentTime) / 1000;
        this._currentTime = stamp;

        if (delta < 0) delta = 0;
        if (delta > MAX_DELTA) delta = MAX_DELTA;

        this._accumulator = this._accumulator || 0;
        this._deltaTime = FIXED_DT;

        this._accumulator += delta;

        let updated = false;

        while (this._accumulator >= FIXED_DT) {
            this.updateInputData();
            this.changeScene();
            this.updateScene();
            this._accumulator -= FIXED_DT;
            updated = true;

            if (USE_SMOOTH) break;
        }

        if (!updated) {
            this.updateInputData();
            this.changeScene();
            this.updateScene();
        }

        this.renderScene();
        this.requestUpdate();
    };

})();
