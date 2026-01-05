/*:
 * @plugindesc Desktop版存档管理（Web JSON ↔ NW.js rpgsave） v1.1
 * @author 果冻大神
 *
 * @help
 * 适用于 Windows / macOS（NW.js）
 * 正确支持：
 *  - file1.rpgsave ~ file20.rpgsave
 *  - global.rpgsave
 *  - config.rpgsave
 */

(function () {

  if (!Utils.isNwjs()) return;

  const fs = require("fs");
  const path = require("path");

  // =========================
  // 存档目录
  // =========================
  function saveDir() {
    return StorageManager.localFileDirectoryPath();
  }

  // =========================
  // 导出为 Web 通用 JSON
  // =========================
  function exportSaveToJSON() {
    const dir = saveDir();
    const data = {};

    if (!fs.existsSync(dir)) {
      alert("未找到存档目录");
      return;
    }

    const files = fs.readdirSync(dir);

    files.forEach(file => {
      // fileX.rpgsave
      const fileMatch = file.match(/^file(\d+)\.rpgsave$/);
      if (fileMatch) {
        const index = fileMatch[1];
        data[`RPG File${index}`] =
          fs.readFileSync(path.join(dir, file), "utf8");
        return;
      }

      // global.rpgsave
      if (file === "global.rpgsave") {
        data["RPG Global"] =
          fs.readFileSync(path.join(dir, file), "utf8");
        return;
      }

      // config.rpgsave
      if (file === "config.rpgsave") {
        data["RPG Config"] =
          fs.readFileSync(path.join(dir, file), "utf8");
      }
    });

    const jsonPath = path.join(dir, "rpgmaker_mv_save.json");
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");

    alert("已成功导出全部存档：\n" + jsonPath);
  }

  // =========================
  // 从 Web JSON 导入
  // =========================
  function importSaveFromJSON() {
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
          const dir = saveDir();

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          for (const key in data) {
            // RPG FileX
            const fileMatch = key.match(/^RPG File(\d+)/);
            if (fileMatch) {
              const index = fileMatch[1];
              fs.writeFileSync(
                path.join(dir, `file${index}.rpgsave`),
                data[key],
                "utf8"
              );
              continue;
            }

            // RPG Global
            if (key === "RPG Global") {
              fs.writeFileSync(
                path.join(dir, "global.rpgsave"),
                data[key],
                "utf8"
              );
              continue;
            }

            // RPG Config
            if (key === "RPG Config") {
              fs.writeFileSync(
                path.join(dir, "config.rpgsave"),
                data[key],
                "utf8"
              );
            }
          }

          alert("存档导入完成，游戏将刷新");
          location.reload();

        } catch (e) {
          console.error(e);
          alert("JSON 文件无效或已损坏");
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  // =========================
  // 标题界面入口（简单版）
  // =========================
  const _Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;

  Window_TitleCommand.prototype.makeCommandList = function () {
    _Window_TitleCommand_makeCommandList.call(this);
    this.addCommand("存档管理", "saveManager");
  };

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
    const isExport = confirm(
      "【确定】导出存档为 Web JSON\n【取消】从 Web JSON 导入存档"
    );

    if (isExport) {
      exportSaveToJSON();
    } else {
      importSaveFromJSON();
    }

    this._commandWindow.activate();
  };

})();
