/*:
 * @plugindesc Web版标题界面存档管理（导入/导出） v1.2
 * @author 果冻大神
 *
 * @help
 * 标题界面增加「存档管理」按钮
 * 进入后可选择导出或导入存档
 * 仅适用于 HTML5 浏览器环境
 */

(function () {

  // 只在浏览器环境启用
  if (Utils.isNwjs()) return;

  // =========================
  // 存档导出
  // =========================
  function exportSave() {
    const data = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("RPG")) {
        data[key] = localStorage.getItem(key);
      }
    }

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rpgmaker_mv_save.json";
    a.click();
  }

  // =========================
  // 存档导入
  // =========================
  function importSave() {
    if (!confirm("导入存档将覆盖当前所有存档，是否继续？")) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);

          // 清空旧存档
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith("RPG")) {
              localStorage.removeItem(key);
            }
          }

          // 写入新存档
          for (const key in data) {
            if (key.startsWith("RPG")) {
              localStorage.setItem(key, data[key]);
            }
          }

          alert("存档导入完成，游戏将刷新");
          location.reload();

        } catch (e) {
          alert("存档文件无效或已损坏！");
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  // =========================
  // 存档管理窗口
  // =========================
  function Window_SaveManager() {
    this.initialize.apply(this, arguments);
  }

  Window_SaveManager.prototype = Object.create(Window_Command.prototype);
  Window_SaveManager.prototype.constructor = Window_SaveManager;

  Window_SaveManager.prototype.initialize = function () {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
  };

  Window_SaveManager.prototype.makeCommandList = function () {
    this.addCommand("导出存档", "export");
    this.addCommand("导入存档", "import");
    this.addCommand("返回", "cancel");
  };

  Window_SaveManager.prototype.updatePlacement = function () {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
  };

  // =========================
  // 标题命令扩展
  // =========================
  const _Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;

  Window_TitleCommand.prototype.makeCommandList = function () {
    _Window_TitleCommand_makeCommandList.call(this);
    this.addCommand("存档管理", "saveManager");
  };

  // =========================
  // 标题场景处理
  // =========================
  const _Scene_Title_createCommandWindow =
    Scene_Title.prototype.createCommandWindow;

  Scene_Title.prototype.createCommandWindow = function () {
    _Scene_Title_createCommandWindow.call(this);

    this._commandWindow.setHandler(
      "saveManager",
      this.commandSaveManager.bind(this)
    );
  };

  Scene_Title.prototype.commandSaveManager = function () {
    this._commandWindow.deactivate();

    this._saveManagerWindow = new Window_SaveManager();
    this._saveManagerWindow.setHandler("export", () => {
      exportSave();
      this._saveManagerWindow.activate();
    });
    this._saveManagerWindow.setHandler("import", () => {
      importSave();
      this._saveManagerWindow.activate();
    });
    this._saveManagerWindow.setHandler("cancel", () => {
      this._saveManagerWindow.close();
      this._commandWindow.activate();
    });

    this.addWindow(this._saveManagerWindow);
  };

})();
