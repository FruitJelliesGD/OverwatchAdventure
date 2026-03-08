/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

/*:
 * @plugindesc (v.1.5)[PRO]Webm视频播放扩展[基础版]
 * @author Pheonix KageDesu
 * @url https://kdworkshop.net/plugins/vplayer/
 * @target MZ MV
 *
 * @help
 知识共享 4.0 署名、相同方式共享、非商业
（署名非商业性相同方式共享，cc by-nc-sa）
 
 付费版：https://kdworkshop.net/plugins/vplayer/
 
 * 将.gif图片转换为.webm并将文件放在{项目目录} movies文件夹中
 * 免费在线转换器： https://ezgif.com/gif-to-webm
 *
 * ==================================================================
 * 插件也有插件命令，但仅适用于 RPG Maker MZ
 *
 * 脚本调用（适用于 MV 和 MZ）：
汉化：YS
 
1. 显示动画（ShowVAnim）：
示例：显示文件名为 "test" 的动画，位置在屏幕左上角，循环播放
ShowVAnim(44, "test", 0, 0, true)


2. 在地图上显示动画（ShowVAnimOnMap）：
示例：在地图坐标（4, 6）处显示文件名为 "fire" 的动画，循环播放
ShowVAnimOnMap(11, "fire", 4, 6, true)

3. 删除动画（DeleteVAnim）：
示例：删除 ID 为 44 的动画
DeleteVAnim(44)

4. 移动动画（MoveVAnim）：
示例：将 ID 为 44 的动画移动到屏幕坐标（100, 100），时间为 120 帧（2 秒内移动完成）
MoveVAnim(44, 100, 100, 120)

5. 缩放动画（ScaleVAnim）：
示例：将 ID 为 44 的动画缩放至 40%（宽度和高度），时间为 60 帧（1 秒内缩放完成）
ScaleVAnim(44, 0.4, 0.4, 60)

6. 改变透明度（ChangeOpacityVAnim）：
示例：将 ID 为 44 的动画透明度改为 128，时间为 60 帧（1 秒内改变完成）
ChangeOpacityVAnim(44, 128, 60)

7. 设置点击事件脚本（SetClickScriptToVAnim）：
示例：当点击 ID 为 1 的动画时，执行 console.log('Hello')
SetClickScriptToVAnim(1, "console.log('Hello')", false)


------------------------------------------------



 *
 * ==================================================================
 *
 * !警告：未删除与游戏一起保存的带有循环的 MAP 动画图像（IS_LOOP为 TRUE）
 *
 * !警告：不建议在 RPG Maker MZ 中使用具有不同 ID 的相同 .webm 文件
 *
 * ==================================================================
動漫戰士
为敌人添加 GIF：

添加<GIF:NAME>到数据库中敌人的注释字段，其中NAME是.webm 文件名。
例子：<GIF:Slime>
注意： .webm 文件应位于电影文件夹 (movies/Slime.webm)。
击中或攻击时改变动画：

<onGotHitGIF:NAME>当敌人被击中时改变动画。
<onAttackGIF:NAME>当敌人攻击时改变动画。
设置动画的边距：

<gifMargins:X,Y>为动画设置额外的边距。
例子：<gifMargins:0,-60>
使用特定技能的动画：

<onUseSkillGIF_ID:NAME>当敌人使用特定技能时改变动画。
例子：<onUseSkillGIF_20:fireball>
在战斗中强制改变动画：

ForceChangeEnemyVAnimByEnemyId （ENEMY_ID ， NAME ， SET_BACK_TIMER ）
ForceChangeEnemyVAnimByTroopIndex （TROOP_INDEX ， NAME ， SET_BACK_TIMER ）
注意： SET_BACK_TIMER - 0（不需要）或动画返回到其初始状态的时间（以帧为单位）。
战斗动画
注意：仅适用于 RPG Maker MZ。

您可以在战斗中播放 GIF 动画而不是 Effekseer 动画。

将 Effekseer 动画替换为 GIF
添加:GIF到数据库中的动画名称。最后它应该看起来像Fire1:GIF。

注意： .webm 文件应位于电影文件夹中 (movies/Fire1.webm)。

您可以在动画设置中编辑比例、速度、偏移 X 和 Y。不支持旋转。
 *
 * ==================================================================
 *
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who supports me!
 * 
 * Special thanks to:
 *  - SMO_Valadorn (Tester)
 *  - Yukio Connor (Idea)
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * @command ShowVAnim
 * @text 显示动画
 * @desc Show Gif animation
 * 
 * @arg id
 * @text ID （文件名）
 * @desc .webm file name in movies folder. Uses as Unique ID for this animation for delete, move and other actions
 * @type text
 * @default 1
 * 
 * @arg order
 * @text 次序
 * @desc If Map - animation will be linked to map, event level, don't moving with camera
 * @type select
 * @option Screen, above windows
 * @option Screen, below windows
 * @option Screen, below pictures
 * @option Map, above Events
 * @option Map, below Events
 * @default Screen, above windows
 * 
 * @arg x
 * @text X
 * @desc X position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Y position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg isLoop
 * @text Is Looping?
 * @desc Should animation looping or play once?
 * @type boolean
 * @on Looping
 * @off Play Once
 * @default true
 * 
 * 
 * @command DeleteVAnim
 * @text Delete Animation
 * @desc Delete added Gif animation
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be deleted
 * @type text
 * @default 1
 * 
 * @command SetEndCallToAnim
 * @text Set End Action
 * @desc Add script or common event call when animation is end. Don't work with looping animations
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that the end action for
 * @type text
 * @default 1
 * 
 * @arg script
 * @text Script
 * @desc Call this script call when animation is end
 * @type text
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @desc Call common event when animation is end
 * @type common_event
 * @default 0
 * 
 * @arg isDelete
 * @text Last action?
 * @desc Delete animation when action is done (animation end) or repeat action (loop animation)
 * @type boolean
 * @on Delete
 * @off Repeat
 * @default false
 * 
 * @command SetClickToAnim
 * @text Set Click Action
 * @desc Add script or common event call when animation is clicked by mouse (touch)
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that the click action for
 * @type text
 * @default 1
 * 
 * @arg script
 * @text Script
 * @desc Call this script call when animation is clicked
 * @type text
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @desc Call common event when animation is clicked
 * @type common_event
 * @default 0
 * 
 * @arg isDelete
 * @text Delete?
 * @desc Delete animation after click?
 * @type boolean
 * @on Delete
 * @off Keep
 * @default false
 * 
 * @command MoveVAnim
 * @text Move Animation
 * @desc Move exists animation to new position over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be moved
 * @type text
 * @default 1
 * 
 * @arg x
 * @text X
 * @desc New X position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc New Y position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg duration
 * @text Duration
 * @desc Moving duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command ScaleVAnim
 * @text Scale Animation
 * @desc Scale exists animation to new size over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg x
 * @text Width
 * @desc New scale value for Width, 1 - 100 *, etc...
 * @type number
 * @decimals 2
 * @default 1.0
 * 
 * @arg y
 * @text Height
 * @desc New scale value for Height, 1 - 100 *, etc...
 * @type number
 * @decimals 2
 * @default 1.0
 * 
 * @arg duration
 * @text Duration
 * @desc Scale change duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command ChangeOpacity
 * @text Change Anim. Opacity
 * @desc Change exists animation opacity over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that opacity should be changed
 * @type text
 * @default 1
 * 
 * @arg opacity
 * @text Opacity level
 * @desc 0 - invisible, 255 - fully opaque
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg duration
 * @text Duration
 * @desc Change duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command SetVAnimBattleBack
 * @text Set Animated BattleBack
 * @desc Add .webm anmation to the battleback in battle
 * 
 * @arg id
 * @text File name
 * @desc .webm file name in movies folder. Keep empty for clear animated battleback
 * @type text
 * @default
 * 
 * @arg x
 * @text X
 * @desc Offset by X (in pixels)
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Offset by Y (in pixels)
 * @type number
 * @default 0
 * 
 * @command MirrorVAnim
 * @text Mirror Animation
 * @desc Mirror (flip) exists animation horizontally or vertically
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be flipped
 * @type text
 * @default 1
 * 
 * @arg mirrorType
 * @text Mirror
 * @desc Select how mirror (flip) animation
 * @type select
 * @option Vertical
 * @option Horizontal
 * @default Horizontal
 * 
 * @command AnchorVAnim
 * @text Change Anchor
 * @desc Change exist animation anchor point
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg x
 * @text X
 * @desc Anchor Point X
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Anchor Point Y
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0
 * 
 * @command StateVAnim
 * @text Change State
 * @desc Set pause or resume animation
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg state
 * @text State
 * @desc Select what you want do with animation. Switch - if paused then resume and otherwise
 * @type select
 * @option Pause
 * @option Resume
 * @option Switch
 * @default Pause
 * 
 * @command AddAction
 * @text Add Time Action
 * @desc Add action call at certain time (can be used multiple times)
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg time
 * @text Time
 * @desc Time (in frames, 1 sec = 60 frames) when this sound will be played
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg scriptCall
 * @text Script Call
 * @desc
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @type common_event
 * @desc
 * @default 0
 * 
 * @command AddSoundEffect
 * @text Sound Effect
 * @desc Add sound effect at certain time (can be used multiple times)
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg time
 * @text Time
 * @desc Time (in frames, 1 sec = 60 frames) when this sound will be played
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg seFileName
 * @text SE file
 * @desc
 * @type file
 * @required 1
 * @dir audio/se
 * @default
 * 
 * @command SetTime
 * @text Set Start Time
 * @desc Animation will start play from certain time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg time
 * @text Time
 * @desc Start play from this time (IN SECONDS!)
 * @decimals 2
 * @type number
 * @min 0.001
 * @default 0
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.5)[PRO] Воспроизведение .gif анимации
 * @author Pheonix KageDesu
 * @url https://kdworkshop.net/plugins/vplayer/
 * @target MZ MV
 *
 * @help
 *
 * Плагин позволяет воспроизводить анимацию в формате GIF (преобразованную в .webm)
 *
 * ==================================================================
 *
 * Преобразуйте изображение .gif в .webm и поместите файл в {каталог проекта} папку movies\
 * Бесплатный онлайн конвертер: https://ezgif.com/gif-to-webm
 *
 * ==================================================================
 * Есть команды плагина, но только для RPG Maker MZ
 *
 * Вызовы скриптов:
 *
 * - ShowVAnim(ID, FILE_NAME, X, Y, IS_LOOP) - добавьте анимированное изображение к любой сцене (над всеми окнами)
 *      ID - уникальный идентификатор, вы можете использовать любой номер
 *      FILE_NAME - имя файла без расширения в кавычках (файл .webm из папки movies)
 *      X, Y - координаты в пикселях
 *      IS_LOOP - true | false - зациклить анимацию
 *
 *      Пример: ShowVAnim(44, "test", 0, 0, true)
 *
 * - ShowVAnimOnSpriteset(ID, FILE_NAME, X, Y, IS_LOOP) -
            добавьте анимированное изображение на карту или сцену сражения (под окнами)
 *
 * - ShowVAnimScreenBelowPictures(ID, FILE_NAME, X, Y, IS_LOOP) - добавить анимированное изображение на экран (под всеми картинками)
 *

 * - ShowVAnimOnMap(ID, FILE_NAME, X, Y, IS_LOOP) - добавьте анимированное изображение к карте,
        как персонажа (ниже событий)
 *      X,Y - в координатах карты!
 *
 *      Пример: ShowVAnimOnMap(11, "fire", 4, 6, true)
 *
 *
 * - ShowVAnimOnMapAboveEvents(ID, FILE_NAME, X, Y, IS_LOOP) - аналогично, но ВЫШЕ событий
 *      X,Y - в координатах карты!
 *
 *      Пример: ShowVAnimOnMap(11, "fire", 4, 6, true)
 *
 * - DeleteVAnim(ID) - удалить анимацию (по ID)
 *
 * - MoveVAnim(ID, NEW_X, NEW_Y, DURATION) - двигать анимацию
 *      DURATION - продолжительность движения (в кадрах) (60 = 1 сек., 0 = мгновенно)
 *
 *      Пример: MoveVAnim(44, 100, 100, 120)
 *
 * - ScaleVAnim(ID, SCALE_X, SCALE_Y, DURATION) - масштабирование
 *
 *      SCALE_X, SCALE_Y - может быть вещественным числом
 *
 *      Пример: ScaleVAnim(44, 0.4, 0.4, 60)
 *
 * - MirrorVAnim(ID, IS_HORIZONTAL) - отразить (зеркально)
 *      IS_HORIZONTAL - если true, то по горизонтали, если false - то по вертикали
 *
 *      Пример: MirrorVAnim(1, false)
 *
 *
 * - SetAnchorForVAnim(ID, X, Y) - установите привязку для анимации
 *      X, Y = от 0 до 1, где 0.5 - центарльная точка
 *
 *      Пример: SetAnchorForVAnim(1, 0.5, 0.5)
 *
 * - ChangeOpacityVAnim(ID, OPACITY, DURATION) - изменить прозрачность
 *      OPACITY - от 0 до 255 (полностью видимый)
 *
 * - SetVAnimPause(ID, IS_PAUSE) - пауза (продолжить)
 *      IS_PAUSE - true для Паузы, false для Продолжения
 *
 *      Пример: SetVAnimPause(1, true)
 *
 *
 * - SetEndScriptToVAnim(ID, SCRIPT, IS_DELETE) - вызов скрипта, когда анимация закончилась
 *      SCRIPT - скрипт в кавычках
 *      IS_DELETE - true | false, если true - анимация будет удалена после вызова скрипта
 *
 *      Пример: SetEndScriptToVAnim(44, "console.log('привет')", false)
 *
 * - SetEndCommonEventToVAnim(ID, COMMON_EVENT_ID, IS_DELETE) - аналогично, только общее событие
 *      Пример: SetEndScriptToVAnim(44, 11, false)
 *
 * - SetClickScriptToVAnim(ID, SCRIPT, IS_DELETE) - вызов скрипта при нажатии на анимацию
 * - SetClickCommonEventToVAnim(ID, COMMON_EVENT_ID, IS_DELETE) - аналогично, только вызов общего события
 *
 * 
 * - SetVAnimBattleBack(FILE_NAME, OFFSET_X, OFFSET_Y) - Добавить анимацию как фон битвы
 *      FILE_NAME - имя файла без расширения в кавычках (файл .webm из папки movies)
 *
 * Пример: ShowVAnimOnMap("battle", 0, 0)
 * Пример: SetVAnimBattleBack("") - удаляет анимированный фон битвы
 *
 *  - SetVAnimCEOnTime(ID, TIME_IN_FRAMES, COMMON_EVENT_ID) - Запустить общее событие в TIME_IN_FRAMES
 *  - SetVAnimSCOnTime(ID, TIME_IN_FRAMES, SCRIPT) - Запустить скрипт в TIME_IN_FRAMES
 *  - SetVAnimSoundOnTime(ID, TIME_IN_FRAMES, SE_FILENAME) - Воспроизвести звук в TIME_IN_FRAMES
 *
 * Пример: SetVAnimCEOnTime(33, 60, 100); - запустить общее событие 10 после 1 секунды
 *
 * Пример: SetVAnimSoundOnTime(41, 120, "Bell1"); - воспроизвести звук "Bell1" после 2 секунд
 *  
 *  ! Вы можете установить множество событий и звуков для одной анимации, даже в одно и то же время
 *
 *  ! Если вы используете циклическую анимацию, убедитесь,
        что TIME_IN_FRAMES меньше продолжительности анимации
 *
 *
 *  - SetVAnimCurrentPlayTime(ID, TIME_IN_SECONDS); - начать воспроизводить анимацию с указанного времени (в секундах!)
 *      Пример: SetVAnimCurrentPlayTime("myAnim", 3.5);
 *
 *  - GetVAnimCurrentPlayTime(ID); - вернуть текущее время анимации (в секундах)
 *
 *
 * ==================================================================
 *
 * ! Warning: Зацикленные анимации (IS_LOOP is TRUE) сохраняются в файл сохранения (если их не удалить вручную)
 *
 * ! Предупреждение: Не рекомендуется использовать то же .webm файл с разными идентификаторами в RPG Maker MZ
 *
 * ==================================================================
 * Использование анимации как графики для врагов (в битве)
 *
 *  Добавить заметку <GIF:ИМЯ> к заметке противника в базе данных
 *  Где ИМЯ - имя файла .webm из папки movies\
 *
 * Пример: <GIF:Slime>
 * Для этого примера у вас должен быть файл movies\Slime.webm
 *
 * <onGotHitGIF:NAME> - анимация врага изменится на NAME, когда враг получит урон
 * <onAttackGIF:NAME> - анимация врага изменится на NAME, когда враг атакует
 *  ! Предупреждение, в обоих случаях анимация будет автоматически возвращена
 *      в нормальное состояние по окончании (без циклов)
 *
 * <gifMargins:X,Y> - добавить смещение анимации относительно позиции врага
 *  Пример: <gifMargins:0,-60>
 *
 * <onUseSkillGIF_ID:NAME> - анимация врага изменится на NAME, когда враг использует навык ID
 *      Пример: <onUseSkillGIF_20:fireball>
 *
 * Доп. вызовы скриптов для управления анимацией противников:
 * ForceChangeEnemyVAnimByEnemyId(ENEMY_ID, NAME, SET_BACK_TIMER);
 *     Принудительно изменить GIF-анимацию противника в бою.
 *     SET_BACK_TIMER - 0 (не надо) или время в КАДРАХ, когда анимация вернётся к изначальной
 *
 * ForceChangeEnemyVAnimByTroopIndex(TROOP_INDEX, NAME, SET_BACK_TIMER);
 *      То же самое, но используется индекс врага (TROOP_INDEX), а не его ID
 * 
 *
 * ==================================================================
 *
 * ---------------------------------------------------------------------------
 * ! Примеры использования комманд можно найти в демке !
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 
 * Отдельное спасибо:
 *  - SMO_Valadorn (Тестирование)
 *  - Yukio Connor (Изначальная идея)
 *

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * @command ShowVAnim
 * @text Show Animation
 * @desc Show Gif animation
 * 
 * @arg id
 * @text ID (File name)
 * @desc .webm file name in movies folder. Uses as Unique ID for this animation for delete, move and other actions
 * @type text
 * @default 1
 * 
 * @arg order
 * @text Order
 * @desc If Map - animation will be linked to map, event level, don't moving with camera
 * @type select
 * @option Screen, above windows
 * @option Screen, below windows
 * @option Screen, below pictures
 * @option Map, above Events
 * @option Map, below Events
 * @default Screen, above windows
 * 
 * @arg x
 * @text X
 * @desc X position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Y position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg isLoop
 * @text Is Looping?
 * @desc Should animation looping or play once?
 * @type boolean
 * @on Looping
 * @off Play Once
 * @default true
 * 
 * 
 * @command DeleteVAnim
 * @text Delete Animation
 * @desc Delete added Gif animation
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be deleted
 * @type text
 * @default 1
 * 
 * @command SetEndCallToAnim
 * @text Set End Action
 * @desc Add script or common event call when animation is end. Don't work with looping animations
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that the end action for
 * @type text
 * @default 1
 * 
 * @arg script
 * @text Script
 * @desc Call this script call when animation is end
 * @type text
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @desc Call common event when animation is end
 * @type common_event
 * @default 0
 * 
 * @arg isDelete
 * @text Last action?
 * @desc Delete animation when action is done (animation end) or repeat action (loop animation)
 * @type boolean
 * @on Delete
 * @off Repeat
 * @default false
 * 
 * @command SetClickToAnim
 * @text Set Click Action
 * @desc Add script or common event call when animation is clicked by mouse (touch)
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that the click action for
 * @type text
 * @default 1
 * 
 * @arg script
 * @text Script
 * @desc Call this script call when animation is clicked
 * @type text
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @desc Call common event when animation is clicked
 * @type common_event
 * @default 0
 * 
 * @arg isDelete
 * @text Delete?
 * @desc Delete animation after click?
 * @type boolean
 * @on Delete
 * @off Keep
 * @default false
 * 
 * @command MoveVAnim
 * @text Move Animation
 * @desc Move exists animation to new position over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be moved
 * @type text
 * @default 1
 * 
 * @arg x
 * @text X
 * @desc New X position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc New Y position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg duration
 * @text Duration
 * @desc Moving duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command ScaleVAnim
 * @text Scale Animation
 * @desc Scale exists animation to new size over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg x
 * @text Width
 * @desc New scale value for Width, 1 - 100%, 0.5 - 50%, etc...
 * @type number
 * @decimals 2
 * @default 1.0
 * 
 * @arg y
 * @text Height
 * @desc New scale value for Height, 1 - 100%, 0.5 - 50%, etc...
 * @type number
 * @decimals 2
 * @default 1.0
 * 
 * @arg duration
 * @text Duration
 * @desc Scale change duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command ChangeOpacity
 * @text Change Anim. Opacity
 * @desc Change exists animation opacity over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that opacity should be changed
 * @type text
 * @default 1
 * 
 * @arg opacity
 * @text Opacity level
 * @desc 0 - invisible, 255 - fully opaque
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg duration
 * @text Duration
 * @desc Change duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command SetVAnimBattleBack
 * @text Set Animated BattleBack
 * @desc Add .webm anmation to the battleback in battle
 * 
 * @arg id
 * @text File name
 * @desc .webm file name in movies folder. Keep empty for clear animated battleback
 * @type text
 * @default
 * 
 * @arg x
 * @text X
 * @desc Offset by X (in pixels)
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Offset by Y (in pixels)
 * @type number
 * @default 0
 * 
 * @command MirrorVAnim
 * @text Mirror Animation
 * @desc Mirror (flip) exists animation horizontally or vertically
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be flipped
 * @type text
 * @default 1
 * 
 * @arg mirrorType
 * @text Mirror
 * @desc Select how mirror (flip) animation
 * @type select
 * @option Vertical
 * @option Horizontal
 * @default Horizontal
 * 
 * @command AnchorVAnim
 * @text Change Anchor
 * @desc Change exist animation anchor point
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg x
 * @text X
 * @desc Anchor Point X
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Anchor Point Y
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0
 * 
 * @command StateVAnim
 * @text Change State
 * @desc Set pause or resume animation
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg state
 * @text State
 * @desc Select what you want do with animation. Switch - if paused then resume and otherwise
 * @type select
 * @option Pause
 * @option Resume
 * @option Switch
 * @default Pause
 * 
 * @command AddAction
 * @text Add Time Action
 * @desc Add action call at certain time (can be used multiple times)
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg time
 * @text Time
 * @desc Time (in frames, 1 sec = 60 frames) when this sound will be played
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg scriptCall
 * @text Script Call
 * @desc
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @type common_event
 * @desc
 * @default 0
 * 
 * @command AddSoundEffect
 * @text Sound Effect
 * @desc Add sound effect at certain time (can be used multiple times)
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg time
 * @text Time
 * @desc Time (in frames, 1 sec = 60 frames) when this sound will be played
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg seFileName
 * @text SE file
 * @desc
 * @type file
 * @required 1
 * @dir audio/se
 * @default
 * 
 * @command SetTime
 * @text Set Start Time
 * @desc Animation will start play from certain time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg time
 * @text Time
 * @desc Start play from this time (IN SECONDS!)
 * @decimals 2
 * @type number
 * @min 0.001
 * @default 0
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */



var Imported = Imported || {};
Imported.PKD_VPlayer = true;

var VPLAYER = {};

//@[GLOBAL]
window.VPLAYER = VPLAYER;

VPLAYER.Version = 1.5;

VPLAYER.printError = function (error, message) {
    if (message)
        console.warn('PKD_VPlayer.js: ' + message);
    console.error(error);
};

VPLAYER.GetVMByID = function(id) {
    if (SceneManager._scene) {
        var vm = SceneManager._scene._getVM(id);
        if (vm) {
            return vm;
        }
    }
    return null;
};

//%[I] Battler: <onDeath:Name>, <onStateAdded_ID:Name>


// * PIXI EXTENSION =============================================================
(function () {

    if(Imported && Imported.DAE_Lighting == true) return;
    if(!Utils.RPGMAKER_NAME.contains("MV")) return;

    eval(function (p, h, e, o, n, d, x) {
        n = function (e) {
            return (e < h ? '' : n(parseInt(e / h))) + ((e = e % h) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        };
        if (!''.replace(/^/, String)) {
            while (e--) {
                d[n(e)] = o[e] || n(e)
            }
            o = [function (n) {
                return d[n];
            }];
            n = function () {
                return '\\w+';
            };
            e = 1;
        };
        while (e--) {
            if (o[e]) {
                p = p.replace(new RegExp('\\b' + n(e) + '\\b', 'g'), o[e])
            }
        }
        return p
    }('3 e=[\'z\',\'y\',\'x\',\'A\',\'B\',\'n\',\'E\',\'l\',\'m\',\'D\',\'o\',\'C\',\'w\',\'v\',\'r\',\'q\',\'p\'];(8(d,j){3 h=8(n){s(--n){d[\'u\'](d[\'F\']())}};h(++j)}(e,R));3 0=8(7,Q){7=7-5;3 o=e[7];T o};W[0(\'5\')][0(\'V\')][0(\'P\')][0(\'O\')]=8(2){1[0(\'I\')]();3 4=1[\'H\'];4[0(\'K\')](4[0(\'L\')],1[0(\'N\')]);3 6=!!2[0(\'f\')];3 b=6?2[0(\'f\')]:2[0(\'h\')];3 9=6?2[0(\'S\')]:2[0(\'i\')];M(9!==1[\'n\']||b!==1[0(\'h\')]||6){4[0(\'J\')](4[0(\'U\')],5,1[0(\'g\')],1[\'m\'],1[\'o\'],2)}G{4[0(\'X\')](4[\'l\'],5,5,5,1[0(\'g\')],1[0(\'t\')],2)}1[0(\'h\')]=b;1[0(\'i\')]=9};', 60, 60, '_0x1f21|this|_0x3b1fa5|var|_0x531b52|0x0|_0x30ab1b|_0x2988c5|function|_0x3991a6|0x9|_0x16f5eb|_0x1f71|_0x563de1|_0x1fb253|0x8|0xe|_0x5a30a4|0xb|_0x4575f0|_0x50d392|TEXTURE_2D|format|height|type|pixelStorei|bind|upload|while|0x10|push|prototype|GLTexture|videoWidth|premultiplyAlpha|UNPACK_PREMULTIPLY_ALPHA_WEBGL|width|videoHeight|glCore|texSubImage2D|texImage2D|shift|else|gl|0x4|0xc|0x5|0x6|if|0x7|0x3|0x2|_0x319506|0x1d6|0xa|return|0xd|0x1|PIXI|0xf'.split('|'), 0, {}));


})();

(function(){
    
    VPLAYER.PluginName = "PKD_VPlayer";

    VPLAYER.LoadPluginSettings = () => {

        if(KDCore.isMZ()) VPLAYER.RegisterMZPluginCommands();
    };

    VPLAYER.RegisterMZPluginCommands = () => {

        PluginManager.registerCommand(VPLAYER.PluginName, 'ShowVAnim', args => {
            try {
                let id = args.id;
                let name = id;
                let x = parseInt(args.x);
                let y = parseInt(args.y);
                let isLoop = eval(args.isLoop);
                let order = args.order;
                if(order.contains('below windows')) {
                    window.ShowVAnimOnSpriteset(id, name, x, y, isLoop);
                } else if(order.contains('Map, below')) {
                    window.ShowVAnimOnMap(id, name, x, y, isLoop);
                } else if(order.contains('Map, above')) {
                    window.ShowVAnimOnMapAboveEvents(id, name, x, y, isLoop);
                } else if (order.contains('below pictures')) {
                    window.ShowVAnimScreenBelowPictures(id, name, x, y, isLoop);
                }
                else {
                    window.ShowVAnim(id, name, x, y, isLoop);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'DeleteVAnim', args => {
            try {
                let id = args.id;
                window.DeleteVAnim(id);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'SetEndCallToAnim', args => {
            try {
                let id = args.id;
                let script = args.script;
                let commonEventId = parseInt(args.commonEvent);
                let isDelete = eval(args.isDelete);
                if(script && script != "") {
                    window.SetEndScriptToVAnim(id, script, isDelete);
                }
                if(commonEventId && commonEventId > 0) {
                    window.SetEndCommonEventToVAnim(id, commonEventId, isDelete);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'SetClickToAnim', args => {
            try {
                let id = args.id;
                let script = args.script;
                let commonEventId = parseInt(args.commonEvent);
                let isDelete = eval(args.isDelete);
                if(script && script != "") {
                    window.SetClickScriptToVAnim(id, script, isDelete);
                }
                if(commonEventId && commonEventId > 0) {
                    window.SetClickCommonEventToVAnim(id, commonEventId, isDelete);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'MoveVAnim', args => {
            try {
                let id = args.id;
                let x = parseInt(args.x);
                let y = parseInt(args.y);
                var duration = parseInt(args.duration);
                if(duration <= 0) {
                    duration = null;
                }
                window.MoveVAnim(id, x, y, duration);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'ScaleVAnim', args => {
            try {
                let id = args.id;
                let x = Number(args.x);
                let y = Number(args.y);
                var duration = parseInt(args.duration);
                if(duration <= 0) {
                    duration = null;
                }
                window.ScaleVAnim(id, x, y, duration);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'ChangeOpacity', args => {
            try {
                let id = args.id;
                let opacity = parseInt(args.opacity);
                var duration = parseInt(args.duration);
                if(duration <= 0) {
                    duration = null;
                }
                window.ChangeOpacityVAnim(id, opacity, duration);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'SetVAnimBattleBack', args => {
            try {
                let id = args.id;
                let x = parseInt(args.x);
                let y = parseInt(args.y);
                window.SetVAnimBattleBack(id, x, y);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'MirrorVAnim', args => {
            try {
                let id = args.id;
                let mirrorType = args.mirrorType;
                window.MirrorVAnim(id, mirrorType.contains('Horizontal'));
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'AnchorVAnim', args => {
            try {
                let id = args.id;
                let x = Number(args.x);
                let y = Number(args.y);
                window.SetAnchorForVAnim(id, x, y);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'StateVAnim', args => {
            try {
                let id = args.id;
                let state = args.state;
                var paused = true;
                if(state.contains('Resume')) {
                    paused = false;
                } else if (state.contains("Switch")) {
                    anim = VPLAYER.GetVMByID(id);
                    if(anim) {
                        paused = !anim._isPaused;
                    } else { // * Нет анимации
                        return;
                    }
                }
                window.SetVAnimPause(id, paused);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'AddSoundEffect', args => {
            try {
                let id = args.id;
                let time = parseInt(args.time);
                let seFileName = args.seFileName;
                window.SetVAnimSoundOnTime(id, time, seFileName);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'AddAction', args => {
            try {
                let id = args.id;
                let time = parseInt(args.time);
                let scriptCall = args.scriptCall;
                let commonEventId = parseInt(args.commonEvent);
                if(scriptCall != "") {
                    window.SetVAnimSCOnTime(id, time, scriptCall);
                }
                if(commonEventId > 0) {
                    window.SetVAnimCEOnTime(id, time, commonEventId);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'SetTime', args => {
            try {
                let id = args.id;
                let time = Number(args.time);
                window.SetVAnimCurrentPlayTime(id, time);
            } catch (e) {
                console.warn(e);
            }
        });
    };

})();







(function(){
    
    // * На сцене, поверх всего
    window.ShowVAnim = function (id, name, x = 0, y = 0, isLoop = true) {
        if (SceneManager._scene) {
            SceneManager._scene._createVM(id, name, x, y, isLoop);
            var vm = VPLAYER.GetVMByID(id);
            if (vm && SceneManager._scene instanceof Scene_Map) {
                $gameMap.storeVWOnMapScene(id, name, x, y, isLoop);
            }
        }
    };

    // * На спрайтсете (карта, битва) (ниже окон)
    window.ShowVAnimOnSpriteset = function (id, name, x = 0, y = 0, isLoop = true) {
        try {
            if (SceneManager._scene) {
                if (SceneManager._scene._spriteset) {
                    SceneManager._scene._createVM(id, name, x, y, isLoop);
                    var vm = VPLAYER.GetVMByID(id);
                    if (vm && SceneManager._scene._spriteset.__animLayer) {
                        SceneManager._scene._spriteset.__animLayer.addChild(vm);
                        if (SceneManager._scene instanceof Scene_Map) {
                            $gameMap.storeVWOnMapSpriteset(id, name, x, y, isLoop);
                        }
                    }
                }
            }
        } catch (e) {
            VPLAYER.printError(e, 'ShowVAnimOnSpriteset');
        }
    };

    // * На карте (привязка к карте)
    window.ShowVAnimOnMap = function (id, name, x = 0, y = 0, isLoop = true) {
        try {
            if (SceneManager._scene) {
                if (SceneManager._scene instanceof Scene_Map) {
                    SceneManager._scene._createVM(id, name, x * $gameMap.tileWidth(), y * $gameMap.tileHeight(), isLoop);
                    var vm = VPLAYER.GetVMByID(id);
                    if (vm && SceneManager._scene._spriteset.__animLayerMap) {
                        SceneManager._scene._spriteset.__animLayerMap.addChild(vm);
                        vm.setOnMap(); // * For movement in map coordinates
                        $gameMap.storeVWOnMapOwn(id, name, x, y, isLoop);
                    }
                }
            }
        } catch (e) {
            VPLAYER.printError(e, 'ShowVAnimOnMap');
        }
    };

    // * На карте (привязка к карте), выше событий
    //?VERSION 
    window.ShowVAnimOnMapAboveEvents = function (id, name, x = 0, y = 0, isLoop = true) {
        alert('ShowVAnimOnMapAboveEvents works only in PRO version');
    };

    //?VERSION 
    window.ShowVAnimScreenBelowPictures = function (id, name, x = 0, y = 0, isLoop = true) {
        alert('ShowVAnimScreenBelowPictures works only in PRO version');
    };

    window.DeleteVAnim = function (id) {
        if (SceneManager._scene)
            SceneManager._scene._removeVM(id);
    };

    window.SetEndScriptToVAnim = function (id, script, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm) {
                vm.onEndScript = script;
                if (isDelete === true)
                    vm.setDestroyAfterEnd();
            }
        }
    };

    window.SetEndCommonEventToVAnim = function (id, cmEvId, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm && cmEvId > 0) {
                vm.onEndCommonEvent = cmEvId;
                if (isDelete === true)
                    vm.setDestroyAfterEnd();
            }
        }
    };

    window.SetClickScriptToVAnim = function (id, script, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm) {
                vm.onActionScript = script;
                if (isDelete === true)
                    vm.setDestroyAfterAction();
            }
        }
    };

    window.SetClickCommonEventToVAnim = function (id, cmEvId, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm && cmEvId > 0) {
                vm.onActionCommonEvent = cmEvId;
                if (isDelete === true)
                    vm.setDestroyAfterAction();
            }
        }
    };

    window.MoveVAnim = function (id, x, y, duration) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if (duration) {
                vm.moveSlow(x, y, duration);
            } else {
                vm.move(x, y);
            }
        }
    };

    // * Отразить по горизонтали (вертикали)
    //? VERSION
    window.MirrorVAnim = function() {
        alert('MirrorVAnim works only in PRO version');
    };

    window.ScaleVAnim = function (id, x, y, duration) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if (duration) {
                vm.scaleSlow(x, y, duration);
            } else {
                vm.scale.x = x;
                vm.scale.y = y;
            }
        }
    };

    window.SetAnchorForVAnim = function(id, x, y = 0) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            vm.surface.anchor.x = x;
            vm.surface.anchor.y = y;
        }
    };

    window.ChangeOpacityVAnim = function (id, opacity, duration) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if (duration) {
                vm.opacitySlow(opacity, duration);
            } else {
                vm.opacity = opacity;
            }
        }
    };

    //? VERSION
    window.SetVAnimPause = function() {
        alert('SetVAnimPause works only in PRO version');
    };

    window.SetVAnimBattleBack = function(name, x = 0, y = 0) {
        alert('SetVAnimBattleBack works only in PRO version');
    };

    // * На карте (привязка к карте), выше событий
    window.ShowVAnimOnMapAboveEvents = function (id, name, x = 0, y = 0, isLoop = true) {
        try {
            if (SceneManager._scene) {
                if (SceneManager._scene instanceof Scene_Map) {
                    SceneManager._scene._createVM(id, name, x * $gameMap.tileWidth(), y * $gameMap.tileHeight(), isLoop);
                    var vm = VPLAYER.GetVMByID(id);
                    if (vm && SceneManager._scene._spriteset.__animLayerMap2) {
                        SceneManager._scene._spriteset.__animLayerMap2.addChild(vm);
                        vm.setOnMap(); // * For movement in map coordinates
                        $gameMap.storeVWOnMapOwn2(id, name, x, y, isLoop);
                    }
                }
            }
        } catch (e) {
            VPLAYER.printError(e, 'ShowVAnimOnMapAboveEvents');
        }
    };

    window.ShowVAnimScreenBelowPictures = function (id, name, x = 0, y = 0, isLoop = true) {
        try {
            if (SceneManager._scene) {
                if (SceneManager._scene instanceof Scene_Map) {
                    SceneManager._scene._createVM(id, name, x * $gameMap.tileWidth(), y * $gameMap.tileHeight(), isLoop);
                    var vm = VPLAYER.GetVMByID(id);
                    if (vm && SceneManager._scene._spriteset.__animLayerBelowPics) {
                        SceneManager._scene._spriteset.__animLayerBelowPics.addChild(vm);
                        if (SceneManager._scene instanceof Scene_Map) {
                            $gameMap.storeVWOnScreenBelowPictures(id, name, x, y, isLoop);
                        }
                    }
                }
            }
        } catch (e) {
            VPLAYER.printError(e, 'ShowVAnimScreenBelowPictures');
        }
    };

    window.SetVAnimPause = function(id, isPause = true) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if (isPause) {
                vm.pause();
            } else {
                vm.resume();
            }
        }
    };

    // * Отразить по горизонтали (вертикали)
    window.MirrorVAnim = function(id, isHorizontal = true) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if(isHorizontal)
                vm.flipHor();
            else
                vm.flipVer();
        }
    };


    window.SetVAnimBattleBack = function(name, x = 0, y = 0) {
        $gameSystem.vwBattleBack = name;
        $gameSystem.vwBattleBackX = x;
        $gameSystem.vwBattleBackY = y;
    };

})();

// Generated by CoffeeScript 2.6.1
var KDCore;

KDCore = window.KDCore || {};

(function() {
  var SDK;
  if (KDCore.isMV == null) {
    KDCore.isMV = function() {
      return Utils.RPGMAKER_NAME.contains("MV");
    };
  }
  if (KDCore.isMZ == null) {
    KDCore.isMZ = function() {
      return !KDCore.isMV();
    };
  }
  if (KDCore.warning == null) {
    KDCore.warning = function(e) {
      return console.warn(e);
    };
  }
  if (KDCore.SDK == null) {
    SDK = function() {};
    SDK.canvasToLocalX = function(layer, x) {
      while (layer) {
        x -= layer.x;
        layer = layer.parent;
      }
      return x;
    };
    SDK.canvasToLocalY = function(layer, y) {
      while (layer) {
        y -= layer.y;
        layer = layer.parent;
      }
      return y;
    };
    KDCore.SDK = SDK;
  }
  if (KDCore.Utils == null) {
    KDCore.Utils = function() {};
    (function() {
      var _;
      _ = KDCore.Utils;
      _.hasMeta = function(symbol, obj) {
        return (obj.meta != null) && (obj.meta[symbol] != null);
      };
      _.getValueFromMeta = function(symbol, obj) {
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        return obj.meta[symbol];
      };
      return _.playSE = function(seFileName, pitch = 100, volume = 100) {
        var sound;
        if (seFileName == null) {
          return;
        }
        if (seFileName === "") {
          return;
        }
        sound = {
          name: seFileName,
          pan: 0,
          pitch: pitch,
          volume: volume
        };
        AudioManager.playStaticSe(sound);
      };
    })();
  }
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    VPLAYER.LoadPluginSettings();
    ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
window.SetVAnimCEOnTime = function(id, timeStampInFrames, commonEventId) {
  var e, vm;
  try {
    if (SceneManager._scene == null) {
      return;
    }
    vm = SceneManager._scene._getVM(id);
    if (vm == null) {
      return;
    }
    return vm.addTimeEventCommonEvent(timeStampInFrames, commonEventId);
  } catch (error) {
    e = error;
    return console.warn(e);
  }
};

window.SetVAnimSCOnTime = function(id, timeStampInFrames, scriptText) {
  var e, vm;
  try {
    if (SceneManager._scene == null) {
      return;
    }
    vm = SceneManager._scene._getVM(id);
    if (vm == null) {
      return;
    }
    return vm.addTimeEventScriptCall(timeStampInFrames, scriptText);
  } catch (error) {
    e = error;
    return console.warn(e);
  }
};

window.SetVAnimSoundOnTime = function(id, timeStampInFrames, seFileName) {
  var e, vm;
  try {
    if (SceneManager._scene == null) {
      return;
    }
    vm = SceneManager._scene._getVM(id);
    if (vm == null) {
      return;
    }
    return vm.addTimeSEPlay(timeStampInFrames, seFileName);
  } catch (error) {
    e = error;
    return console.warn(e);
  }
};

window.SetVAnimCurrentPlayTime = function(id, playTimeInSeconds) {
  var e, vm;
  try {
    if (SceneManager._scene == null) {
      return;
    }
    vm = SceneManager._scene._getVM(id);
    if (vm == null) {
      return;
    }
    return vm.setPlayTime(playTimeInSeconds);
  } catch (error) {
    e = error;
    return console.warn(e);
  }
};

window.GetVAnimCurrentPlayTime = function(id) {
  var e, vm;
  try {
    if (SceneManager._scene == null) {
      return -1;
    }
    vm = SceneManager._scene._getVM(id);
    if (vm == null) {
      return -1;
    }
    return vm.getPlayTime();
  } catch (error) {
    e = error;
    console.warn(e);
    return -1;
  }
};

window.ForceChangeEnemyVAnimByEnemyId = function(enemyId, newAnimName, setBackTime) {
  var e, enemy;
  try {
    enemy = $gameTroop.members().find(function(e) {
      return e.enemyId() === enemyId;
    });
    if (enemy != null) {
      return ForceChangeEnemyVAnimByEnemy(enemy, newAnimName, setBackTime);
    }
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
};

window.ForceChangeEnemyVAnimByEnemy = function(enemy, newAnimName, setBackTime = 0) {
  var e, eS, i, len, results, sSet;
  try {
    if (!(SceneManager._scene instanceof Scene_Battle)) {
      return;
    }
    if (setBackTime == null) {
      setBackTime = 0;
    }
    sSet = SceneManager._scene._spriteset._enemySprites;
    results = [];
    for (i = 0, len = sSet.length; i < len; i++) {
      eS = sSet[i];
      if (eS._enemy === enemy) {
        results.push(eS.forceChangeVMBattlerGif(newAnimName, setBackTime));
      } else {
        results.push(void 0);
      }
    }
    return results;
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
};

window.ForceChangeEnemyVAnimByTroopIndex = function(troopIndex, newAnimName, setBackTime = 0) {
  var e, enemy;
  try {
    enemy = $gameTroop.members()[troopIndex];
    if (enemy != null) {
      return ForceChangeEnemyVAnimByEnemy(enemy, newAnimName, setBackTime);
    }
  } catch (error) {
    e = error;
    return KDCore.warning(e);
  }
};


// Generated by CoffeeScript 2.6.1
//@[GLOBAL]
var VWSprite;

VWSprite = class VWSprite extends Sprite {
  constructor(filename) {
    super();
    this.filename = filename;
    this._loaded = false;
    this._loop = false;
    this._isPaused = false;
    this.onEndCommonEvent = 0;
    this.onEndScript = null;
    this.onActionCommonEvent = 0;
    this.onActionScript = null;
    this._destroyAfterEnd = false;
    this._onClickCommonEvent = 0;
    this._destroyAfterAction = false;
    this._xDuration = 0;
    this._sDurationX = 0;
    this._oDuration = 0;
    this._onMapCreated = false;
    this._currentFrameTimer = 0;
    this._events = [];
    this._soundsEffects = [];
    return;
  }

  addTimeEventCommonEvent(t, ce) {
    return this._events.push({t, ce});
  }

  addTimeEventScriptCall(t, sc) {
    return this._events.push({t, sc});
  }

  addTimeSEPlay(t, seName) {
    return this._soundsEffects.push({t, seName});
  }

  setLoop() {
    return this._loop = true;
  }

  setOnLoaded(onLoaded) {
    this.onLoaded = onLoaded;
  }

  setPlayTime(timeInSeconds) {
    if (this.source != null) {
      this.source.currentTime = timeInSeconds;
      this._currentFrameTimer = Math.round(timeInSeconds * 60);
    } else {
      this.__startTimePreload = timeInSeconds;
    }
  }

  getPlayTime() {
    var e;
    try {
      if (this.source != null) {
        return this.source.currentTime;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return -1;
  }

  create() {
    if (KDCore.isMV()) {
      this.vidTexture = PIXI.Texture.fromVideo('movies/' + this.filename + '.webm');
    } else {
      this.vidTexture = PIXI.Texture.from('movies/' + this.filename + '.webm');
    }
    this.surface = new PIXI.Sprite(this.vidTexture);
    this.source = null;
    if (KDCore.isMZ() && this.surface._texture.valid === true) {
      this._workWithTexture(this.source);
    }
    this.surface._texture.baseTexture.on('loaded', () => {
      return this._workWithTexture(this.source);
    });
    //@_textureSource(@surface._texture).addEventListener 'timeupdate', () => @_timeUpdate()
    this._textureSource(this.surface._texture).addEventListener('ended', () => {
      return this._onEnd();
    });
  }

  _workWithTexture(source) {
    var playPromise;
    //"TEXTURE LOADED".p()
    source = this._textureSource(this.vidTexture);
    this.surface.width = source.videoWidth;
    this.surface.heigth = source.videoHeight;
    //console.log source
    this.addChild(this.surface);
    this._loaded = true;
    this.source = source;
    this.source.loop = this._loop;
    //@source.play()
    if (this.__startTimePreload != null) {
      this.source.currentTime = this.__startTimePreload;
      this._currentFrameTimer = Math.round(this.__startTimePreload * 60);
      this.__startTimePreload = null;
    }
    playPromise = this.source.play();
    if (playPromise != null) {
      playPromise.then(function() {}).catch(function() {});
    }
    if (this.onLoaded != null) {
      return this.onLoaded();
    }
  }

  _textureSource(texture) {
    if (KDCore.isMV()) {
      return texture.baseTexture.source;
    } else {
      if (texture.baseTexture.resource != null) {
        return texture.baseTexture.resource.source;
      } else {
        return null;
      }
    }
  }

  _onEnd() {
    var e, runned;
    try {
      this._currentFrameTimer = 0;
      runned = false;
      if (this.onEndCommonEvent > 0) {
        //"COMO".p()
        $gameTemp.reserveCommonEvent(this.onEndCommonEvent);
        runned = true;
      }
      if (this.onEndScript != null) {
        try {
          //"EVAL".p()
          eval(this.onEndScript);
        } catch (error) {
          e = error;
          VPLAYER.printError(e, 'Error in Script Action on End');
        }
        runned = true;
      }
      if (this.onEndHandler != null) {
        try {
          this.onEndHandler();
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
        runned = true;
      }
      if (runned === false || this._destroyAfterEnd === true) {
        if (!this._loop) {
          return this._selfDestroy();
        }
      }
    } catch (error) {
      e = error;
      return VPLAYER.printError(e, 'On Animation End');
    }
  }

  _selfDestroy() {
    var e, s;
    //"SELF DESTR".p()
    this._selfStop();
    try {
      s = SceneManager._scene;
      if ((s != null) && (s._checkVMToDestoroy != null)) {
        return s._checkVMToDestoroy();
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

  _selfStop() {
    var ref, source;
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
    //"SELF STOP".p()
    this.visible = false;
    source = this._textureSource(this.vidTexture);
    if (source != null) {
      source.pause();
      this.surface._texture.baseTexture.destroy();
      this._texture.destroy();
      this.surface.destroy();
      if (KDCore.isMV()) {
        PIXI.loader.reset();
      } else {
        PIXI.Loader.shared.reset();
      }
    }
    return this._destroyed = true;
  }

  isLoaded() {
    return this._loaded === true;
  }

  isDestroyed() {
    return this._destroyed === true;
  }

  setDestroyAfterEnd() {
    return this._destroyAfterEnd = true;
  }

  setDestroyAfterAction() {
    return this._destroyAfterAction = true;
  }

  setOnMap() {
    return this._onMapCreated = true;
  }

  isCanBeSaved() {
    return this._loop === true && !this.isDestroyed();
  }

  isInMouseTouchPosition() {
    var x, y;
    if (this.opacity === 0) {
      return false;
    }
    if (KDCore.isMV()) {
      x = Sprite_Button.prototype.canvasToLocalX.call(this, TouchInput.x);
      y = Sprite_Button.prototype.canvasToLocalY.call(this, TouchInput.y);
    } else {
      x = KDCore.SDK.canvasToLocalX(this, TouchInput.x);
      y = KDCore.SDK.canvasToLocalY(this, TouchInput.y);
    }
    return x >= 0 && y >= 0 && x < (this.surface.width * this.scale.x) && y < (this.surface.heigth * this.scale.y);
  }

  isHasAction() {
    return (this.onActionScript != null) || this.onActionCommonEvent > 0;
  }

  callAction() {
    var e;
    if (this.onActionCommonEvent > 0) {
      $gameTemp.reserveCommonEvent(this.onActionCommonEvent);
    }
    if (this.onActionScript != null) {
      try {
        eval(this.onActionScript);
      } catch (error) {
        e = error;
        VPLAYER.printError(e, 'Error in Script Action on Click');
      }
    }
    if (this._destroyAfterAction === true) {
      this._selfDestroy();
    }
  }

  moveSlow(x, y, d) {
    this._targetX = x;
    this._targetY = y;
    if (this._onMapCreated === true) {
      this._targetX *= $gameMap.tileWidth();
      this._targetY *= $gameMap.tileHeight();
    }
    return this._xDuration = d;
  }

  scaleSlow(x, y, d) {
    this._targetScaleX = x;
    this._targetScaleY = y;
    return this._sDurationX = d;
  }

  opacitySlow(v, d) {
    this.targetOpacity = v;
    return this._oDuration = d;
  }

  flipHor() {
    this.scale.x *= -1;
    if (this.scale.x < 0) {
      this.x += this.surface.width * Math.abs(this.scale.x);
    } else {
      this.x -= this.surface.width * Math.abs(this.scale.x);
    }
  }

  flipVer() {
    this.scale.y *= -1;
    if (this.scale.y < 0) {
      this.y += this.surface.heigth * Math.abs(this.scale.y);
    } else {
      this.y -= this.surface.heigth * Math.abs(this.scale.y);
    }
  }

  pause() {
    var e, source;
    try {
      source = this._textureSource(this.vidTexture);
      source.pause();
      this._isPaused = true;
    } catch (error) {
      e = error;
      console.warn(e);
      this._isPaused = false;
    }
  }

  resume() {
    if (this._isPaused === true) {
      return this._isPaused = false;
    }
  }

  update() {
    var playPromise;
    super.update();
    if (!this.isLoaded()) {
      return;
    }
    this.source.loop = this._loop;
    //console.log @source.currentTime
    if (this._isPaused !== true) {
      this._currentFrameTimer++;
      this._updateEvents();
      this._updateSoundEffects();
      if (this._loop === true) {
        this._updateLoopAction();
      }
      playPromise = this.source.play();
      if (playPromise != null) {
        playPromise.then(function() {}).catch(function() {});
      }
    }
    this.vidTexture.baseTexture.update();
    return this._updateOther();
  }

  _updateLoopAction() {
    if (this._loopBeenStarted === true) {
      if (this.source.currentTime < 0.1) {
        this._currentFrameTimer = 0;
        this._loopBeenStarted = false;
        this._onEnd();
      }
    }
    if (this.source.currentTime > 0.1) {
      return this._loopBeenStarted = true;
    }
  }

  _updateEvents() {
    var ev, i, len, ref;
    if (this._events == null) {
      return;
    }
    if (this._events.length === 0) {
      return;
    }
    ref = this._events;
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev.t === this._currentFrameTimer) {
        this._callEvent(ev);
      }
    }
  }

  _callEvent(ev) {
    var e;
    try {
      if ((ev.ce != null) && ($dataCommonEvents[ev.ce] != null)) {
        $gameTemp.reserveCommonEvent(ev.ce);
      }
      if ((ev.sc != null) && ev.sc !== "") {
        return eval(ev.sc);
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

  _updateSoundEffects() {
    var i, item, len, ref;
    if (this._soundsEffects == null) {
      return;
    }
    if (this._soundsEffects.length === 0) {
      return;
    }
    ref = this._soundsEffects;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item.t === this._currentFrameTimer) {
        this._playSoundEffect(item.seName);
      }
    }
  }

  _playSoundEffect(seName) {
    var e;
    try {
      return KDCore.Utils.playSE(seName);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _updateOther() {
    this._updateMove();
    this._updateScaleXX();
    return this._updateOpacity();
  }

  _updateMove() {
    var d;
    if (this._xDuration <= 0) {
      return;
    }
    d = this._xDuration;
    this.x = (this.x * (d - 1) + this._targetX) / d;
    this.y = (this.y * (d - 1) + this._targetY) / d;
    return this._xDuration--;
  }

  _updateScaleXX() {
    var d;
    if (this._sDurationX <= 0) {
      return;
    }
    d = this._sDurationX;
    this.scale.x = (this.scale.x * (d - 1) + this._targetScaleX) / d;
    this.scale.y = (this.scale.y * (d - 1) + this._targetScaleY) / d;
    return this._sDurationX--;
  }

  _updateOpacity() {
    var d;
    if (this._oDuration <= 0) {
      return;
    }
    d = this._oDuration;
    this.opacity = (this.opacity * (d - 1) + this.targetOpacity) / d;
    return this._oDuration--;
  }

  makeSD() {
    return [this.onEndCommonEvent, this.onEndScript, this.onActionCommonEvent, this.onActionScript, this._destroyAfterEnd, this._onClickCommonEvent, this._destroyAfterAction, this._xDuration, this._sDurationX, this._oDuration, this.scale.x, this.scale.y, this.opacity, this.x, this.y, this.surface.anchor.x, this.surface.anchor.y, this._events, this._soundsEffects];
  }

  loadSD(data) {
    if (data == null) {
      return;
    }
    this.onEndCommonEvent = data[0];
    this.onEndScript = data[1];
    this.onActionCommonEvent = data[2];
    this.onActionScript = data[3];
    this._destroyAfterEnd = data[4];
    this._onClickCommonEvent = data[5];
    this._destroyAfterAction = data[6];
    this._xDuration = data[7];
    this._sDurationX = data[8];
    this._oDuration = data[9];
    this.scale.x = data[10];
    this.scale.y = data[11];
    this.opacity = data[12];
    this.x = data[13];
    this.y = data[14];
    this.surface.anchor.x = data[15];
    this.surface.anchor.y = data[16];
    this._events = data[17] || [];
    this._soundsEffects = data[18] || [];
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startAction, _;
  //@[DEFINES]
  _ = BattleManager;
  //@[ALIAS]
  ALIAS__startAction = _.startAction;
  _.startAction = function() {
    var e;
    ALIAS__startAction.call(this, ...arguments);
    try {
      if ((this._subject != null) && this._subject instanceof Game_Enemy) {
        return this._subject.pVAnimOnStartBattleAction(this._action);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  _.pIsAutoGifRequested = function() {
    return (this._pAutoGifName != null) && this._pAutoGifName !== "";
  };
  _.pOnAutoGif = function() {
    return this._pAutoGifName = null;
  };
  _.pGetAutoGifName = function() {
    return this._pAutoGifName;
  };
  _.pSetAutoGifName = function(_pAutoGifName) {
    this._pAutoGifName = _pAutoGifName;
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onDamage, _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
  //@[ALIAS]
  ALIAS__onDamage = _.onDamage;
  _.onDamage = function() {
    var e, pGifOnHit;
    ALIAS__onDamage.call(this, ...arguments);
    try {
      pGifOnHit = this.pGetOnHitGifAnimation();
      if ((pGifOnHit != null) && pGifOnHit !== "") {
        return this.pSetAutoGifName(pGifOnHit);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
  _.pGetOnHitGifAnimation = function() {
    return KDCore.Utils.getValueFromMeta('onGotHitGIF', this.enemy());
  };
  _.pGetOnAttackGifAnimation = function() {
    return KDCore.Utils.getValueFromMeta('onAttackGIF', this.enemy());
  };
  _.pVAnimOnStartBattleAction = function(action) {
    var attackAnim, e, skillAnim;
    try {
      if ((action != null) && action.isSkill()) {
        skillAnim = this.pVAnimGetGiffAnimationForSkill(action.item().id);
        if ((skillAnim != null) && skillAnim !== "") {
          this.pSetAutoGifName(skillAnim);
          return;
        }
      }
      attackAnim = this.pGetOnAttackGifAnimation();
      if ((attackAnim != null) && attackAnim !== "") {
        this.pSetAutoGifName(attackAnim);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.pVAnimGetGiffAnimationForSkill = function(skillId) {
    var animationName, e;
    try {
      if ((skillId != null) && skillId > 0) {
        animationName = KDCore.Utils.getValueFromMeta('onUseSkillGIF_' + skillId, this.enemy());
        if ((animationName != null) && animationName !== "") {
          return animationName;
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return "";
  };
  _.vpGetExtraMarginsForGif = function() {
    var e, margins, match, x, y;
    try {
      margins = KDCore.Utils.getValueFromMeta('gifMargins', this.enemy());
      if (margins != null) {
        //match = margins.match(/<gifMargins:(-?\d+),(-?\d+)>/)
        match = margins.match(/(-?\d+),\s*(-?\d+)/);
        if (match) {
          x = parseInt(match[1]);
          y = parseInt(match[2]);
          return {x, y};
        } else {
          null;
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  _._initVWStorage = function() {
    if (this._vwStorage == null) {
      return this._vwStorage = {};
    }
  };
  _._saveVW = function(id, name, x, y, isLoop, stateFlag) {
    this._vwStorage[id] = [name, x, y, isLoop, stateFlag];
  };
  _._refreshVWStorage = function() {
    var id, item, obj, ref;
    this._initVWStorage();
    ref = this._vwStorage;
    for (id in ref) {
      item = ref[id];
      obj = VPLAYER.GetVMByID(id);
      if (obj == null) {
        delete this._vwStorage[id];
      } else {
        if (!obj.isCanBeSaved()) {
          DeleteVAnim(id);
          delete this._vwStorage[id];
        } else {
          this._vwStorage[id][5] = obj.makeSD();
          obj._selfStop();
        }
      }
    }
  };
  _._removeFromVWStorage = function(id) {
    this._initVWStorage();
    if (this._vwStorage[id] != null) {
      delete this._vwStorage[id];
    }
  };
  _._reloadVWStorage = function() {
    var e, id, item, tempStorage, vm;
    this._initVWStorage();
    tempStorage = JsonEx.makeDeepCopy(this._vwStorage);
    for (id in tempStorage) {
      item = tempStorage[id];
      switch (item[4]) {
        case 0:
          ShowVAnim(id, ...item);
          break;
        case 1:
          ShowVAnimOnSpriteset(id, ...item);
          break;
        case 2:
          ShowVAnimOnMap(id, ...item);
          break;
        case 3:
          ShowVAnimOnMapAboveEvents(id, ...item);
          break;
        case 4:
          ShowVAnimScreenBelowPictures(id, ...item);
      }
    }
    for (id in tempStorage) {
      item = tempStorage[id];
      try {
        vm = VPLAYER.GetVMByID(id);
        if (item[5] != null) {
          vm.loadSD(item[5]);
        }
      } catch (error) {
        e = error;
        VPLAYER.printError(e, 'restore VM saved parameters');
      }
    }
  };
  _.storeVWOnMapScene = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 0);
  };
  _.storeVWOnMapSpriteset = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 1);
  };
  _.storeVWOnMapOwn = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 2);
  };
  _.storeVWOnMapOwn2 = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 3);
  };
  _.storeVWOnScreenBelowPictures = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 4);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__create, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //@[ALIAS]
  ALIAS__create = _.create;
  _.create = function() {
    ALIAS__create.call(this);
    return this._initVW();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    var i, ref, vw;
    ALIAS__update.call(this);
    if (this._vwStorage == null) {
      return;
    }
    if (TouchInput.isTriggered()) {
      ref = this._vwStorage;
      for (i in ref) {
        vw = ref[i];
        if (vw == null) {
          continue;
        }
        if (vw.isHasAction() && !vw.isDestroyed()) {
          if (vw.isInMouseTouchPosition()) {
            vw.callAction();
            return;
          }
        }
      }
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  _._createVM = function(id, name, x, y, isLoop) {
    var e, s;
    try {
      if (this._vwStorage[id] != null) {
        //"CREATE".p()
        this._removeVM(id);
      }
      this._vwStorage[id] = new VWSprite(name);
      s = this._vwStorage[id];
      if (isLoop === true) {
        s.setLoop();
      }
      s.create();
      s.move(x, y);
      this.addChild(s);
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'createVM');
    }
  };
  _._initVW = function() {
    return this._vwStorage = {};
  };
  _._removeVM = function(id) {
    var e, x;
    try {
      //"REMOVE ".p(id)
      x = this._vwStorage[id];
      if (x != null) {
        x.visible = false;
        try {
          if (!x.isDestroyed()) {
            x._selfDestroy();
          }
        } catch (error) {
          e = error;
          console.warn(e);
        }
        this.removeChild(x);
        if (KDCore.isMV()) {
          x.destroy();
        }
      }
      this._vwStorage[id] = null;
      delete this._vwStorage[id];
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'removeVM');
    }
  };
  _._getVM = function(id) {
    return this._vwStorage[id];
  };
  _._checkVMToDestoroy = function() {
    var i, ref, vw;
    ref = this._vwStorage;
    //"CHECK TO DESTROY".p()
    for (i in ref) {
      vw = ref[i];
      if (vw == null) {
        continue;
      }
      if (vw.isDestroyed()) {
        this._removeVM(i);
      }
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  //@[ALIAS]
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    return this._createVWBattleBackAnimation();
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  _._createVWBattleBackAnimation = function() {
    var e, onL;
    if (!(($gameSystem.vwBattleBack != null) && $gameSystem.vwBattleBack !== "")) {
      return;
    }
    try {
      this.vws = new VWSprite($gameSystem.vwBattleBack);
      this.vws.setLoop();
      onL = function() {
        var h, w;
        w = this.vws.surface.width;
        h = this.vws.surface.height;
        this.vws.bitmap = new Bitmap(w, h);
      };
      this.vws.setOnLoaded(onL.bind(this));
      this.vws.create();
      if ($gameSystem.vwBattleBackX != null) {
        this.vws.x = $gameSystem.vwBattleBackX;
        this.vws.y = $gameSystem.vwBattleBackY;
      }
      return this._spriteset._pAnimatedGifBackSprite.addChild(this.vws);
    } catch (error) {
      e = error;
      return VPLAYER.printError(e, 'Create Animated Battleback');
    }
  };
  
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    var e, i, item, len, ref, ref1;
    try {
      if ((ref = this.vws) != null) {
        ref._selfDestroy();
      }
      if ($gameTemp._vwsEnemySpritesToDestroy != null) {
        ref1 = $gameTemp._vwsEnemySpritesToDestroy;
        for (i = 0, len = ref1.length; i < len; i++) {
          item = ref1[i];
          if (item != null) {
            item._selfDestroy();
          }
        }
      }
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'Destroy Animated Battleback');
    }
    return ALIAS__stop.call(this);
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isMapTouchOk, ALIAS__onMapLoaded, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    return $gameMap._reloadVWStorage();
  };
  
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    return $gameMap._refreshVWStorage();
  };
  //@[ALIAS]
  ALIAS__isMapTouchOk = _.isMapTouchOk;
  _.isMapTouchOk = function() {
    var e, i, ref, vw;
    if (this._vwStorage != null) {
      try {
        if (TouchInput.isTriggered()) {
          ref = this._vwStorage;
          for (i in ref) {
            vw = ref[i];
            if (vw == null) {
              continue;
            }
            if (vw.isHasAction() && !vw.isDestroyed()) {
              if (vw.isInMouseTouchPosition()) {
                return false;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        VPLAYER.printError(e, 'isMapTouchOk');
      }
    }
    return ALIAS__isMapTouchOk.call(this);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS_RVM, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS INNER]
  // * Переопределение нового метода из Scene_Base
  ALIAS_RVM = _._removeVM;
  _._removeVM = function(id) {
    var e;
    ALIAS_RVM.call(this, id);
    try {
      return $gameMap._removeFromVWStorage(id);
    } catch (error) {
      e = error;
      return VPLAYER.printError(e, 'removeVM, MAP memory');
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadBitmap, ALIAS__update, _;
  //@[DEFINES]
  _ = Sprite_Enemy.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    if (this.isVWBattlerSprite()) {
      this._updateForceGifChangeAutoReset();
      this._updateGifAutoActions();
    }
  };
  //@[ALIAS]
  ALIAS__loadBitmap = _.loadBitmap;
  _.loadBitmap = function(name, hue) {
    if (this.isVWBattlerSprite()) {
      return this._createVWBattler();
    } else {
      return ALIAS__loadBitmap.call(this, name, hue);
    }
  };
})();

// ■ END Sprite_Enemy.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Enemy.prototype;
  _.isVWBattlerSprite = function() {
    var e;
    try {
      if ((this._gifSpriteForceName != null) && this._gifSpriteForceName !== "") {
        this._gifSpriteName = this._gifSpriteForceName;
      }
      if (this._gifSpriteName == null) {
        this._gifSpriteName = KDCore.Utils.getValueFromMeta('GIF', this._enemy.enemy());
      }
      return this._gifSpriteName != null;
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'Check <VW> Note for Battler');
      return false;
    }
  };
  _._createVWBattler = function() {
    var e, onL;
    this.bitmap = new Bitmap(1, 1); // * HOLDER
    try {
      if (this.vws != null) {
        this.vws._selfDestroy();
        // * Read name again
        this._gifSpriteName = null;
        this.isVWBattlerSprite();
      }
      this.vws = new VWSprite(this._gifSpriteName);
      if (this._gifShouldRevertOnEnd !== true) {
        this.vws.setLoop();
      } else {
        // * Reset after END
        this.vws.onEndHandler = () => {
          var e;
          try {
            return this.forceChangeVMBattlerGif(null, 0);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
      }
      onL = function() {
        var h, w;
        w = this.vws.surface.width;
        h = this.vws.surface.height;
        this.vws.move(w / -2, -h);
        this.bitmap = new Bitmap(w, h);
        this._applyGifExtraMargins();
      };
      this.vws.setOnLoaded(onL.bind(this));
      this.vws.create();
      this.addChild(this.vws);
      if ($gameTemp._vwsEnemySpritesToDestroy == null) {
        $gameTemp._vwsEnemySpritesToDestroy = [];
      }
      $gameTemp._vwsEnemySpritesToDestroy.push(this.vws);
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'Create Animated Battler');
    }
  };
  _.forceChangeVMBattlerGif = function(_gifSpriteForceName, _gifReturnTime) {
    var e;
    this._gifSpriteForceName = _gifSpriteForceName;
    this._gifReturnTime = _gifReturnTime;
    try {
      this._createVWBattler();
      if (this._gifReturnTime > 0) {
        return this._gitAutoResetTime = this._gifReturnTime;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.autoChangeVMBattlerGif = function(_gifSpriteForceName) {
    var e;
    this._gifSpriteForceName = _gifSpriteForceName;
    try {
      this._gifShouldRevertOnEnd = true;
      this._createVWBattler();
      return this._gifShouldRevertOnEnd = false;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._updateForceGifChangeAutoReset = function() {
    var e;
    if (this._gitAutoResetTime == null) {
      return;
    }
    try {
      this._gitAutoResetTime--;
      if (this._gitAutoResetTime <= 0) {
        this.forceChangeVMBattlerGif(null, 0);
        this._gitAutoResetTime = null;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._gitAutoResetTime = null;
    }
  };
  _._updateGifAutoActions = function() {
    if (this._enemy == null) {
      return;
    }
    if (this._enemy.pIsAutoGifRequested()) {
      this.autoChangeVMBattlerGif(this._enemy.pGetAutoGifName());
      this._enemy.pOnAutoGif();
    }
  };
  _._applyGifExtraMargins = function() {
    var e, margins;
    try {
      if (this.vws == null) {
        return;
      }
      margins = this._enemy.vpGetExtraMarginsForGif();
      if (margins == null) {
        return;
      }
      this.vws.x = this.vws.x + margins.x;
      return this.vws.y = this.vws.y + margins.y;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Sprite_Enemy.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createPictures, _;
  //@[DEFINES]
  _ = Spriteset_Base.prototype;
  //@[ALIAS]
  ALIAS__createPictures = _.createPictures;
  _.createPictures = function() {
    this.__animLayerBelowPics = new Sprite();
    this.addChild(this.__animLayerBelowPics);
    ALIAS__createPictures.call(this);
    this.__animLayer = new Sprite();
    return this.addChild(this.__animLayer);
  };
})();

// ■ END Spriteset_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createBattleback, _;
  //@[DEFINES]
  _ = Spriteset_Battle.prototype;
  //@[ALIAS]
  ALIAS__createBattleback = _.createBattleback;
  _.createBattleback = function() {
    ALIAS__createBattleback.call(this, ...arguments);
    this._pAnimatedGifBackSprite = new Sprite();
    if (KDCore.isMV()) {
      this._battleField.addChild(this._pAnimatedGifBackSprite);
    } else {
      this._baseSprite.addChild(this._pAnimatedGifBackSprite);
    }
  };
})();

// ■ END Spriteset_Battle.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, ALIAS__updateTilemap, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    this.__animLayerMap = new Sprite();
    this.__animLayerMap.z = 1;
    this.__animLayerMap2 = new Sprite();
    this.__animLayerMap2.z = 1;
    if (KDCore.isMV()) {
      this.__animLayerMap2.z = 9;
    }
    this._tilemap.addChild(this.__animLayerMap);
    ALIAS__createCharacters.call(this);
    return this._tilemap.addChild(this.__animLayerMap2);
  };
  
  //@[ALIAS]
  ALIAS__updateTilemap = _.updateTilemap;
  _.updateTilemap = function() {
    var screenX, screenY;
    ALIAS__updateTilemap.call(this);
    if (this.__animLayerMap.children.length > 0 || this.__animLayerMap2.children.length > 0) {
      if (this.___tw == null) {
        this.___tw = $gameMap.tileWidth();
        this.___tw2 = this.___tw / 2;
        this.___th = $gameMap.tileHeight();
      }
      screenX = Math.round($gameMap.adjustX(-0.5) * this.___tw + this.___tw2);
      screenY = Math.round($gameMap.adjustY(-1) * this.___th + this.___th);
      this.__animLayerMap.move(screenX, screenY);
      return this.__animLayerMap2.move(screenX, screenY);
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_VPlayer builded by PKD PluginBuilder 2.2 - 16.08.2023