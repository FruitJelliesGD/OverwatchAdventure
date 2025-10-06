/*:
 * @plugindesc v1.21 GameCore 小游戏核心
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这是LiuYue系列小游戏插件的前置插件而使用
 *
 * 这个插件本身提供一些可以对图片进行操作的编辑操作
 * 可以实现图片旋转,移动,缩放,透明度,延时......的一些变化的插件命令
 * 
 * 
 *
 *-------------------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 * 
 *-------------------------------------------------------------------
 *
 *
 *
 *
 * 鸣谢：铅笔描绘的思念 https://rpg.blue/thread-400994-1-1.html
 * 感谢大佬分享关于渐变文字的实现方法
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 可以调整一些效果:
 * 入场 出场             :       进入退出的效果
 * 背景图片 背景BGM      :       声音效果
 * 操作按键              :       使用传统的9键手柄,上 下 左 右 A1 B1 A2 B2 P
 *
 *
 * 关于窗口颜色的设置颜色字符串格式 :   rgba(x,x,x,x)
 *
 * rgba中四个参数,分别对应红色R 绿色G 蓝色B 透明度A
 * RGB的取色范围0~255 值越高颜色越纯
 * A的取值范围0~1 代表透明度
 *
 *
 * 比如写入 rgba(0,255,0,0.8)
 * 那就是80%透明度的纯绿色。
 *
 *
 *
 * 另一种设置颜色的格式 : [x,x,x] 代表r g b
 * 数字范围也是0~255之间
 *
 *
 *
 *
 * 关于按键的设置,参考了八键游戏手柄的按钮+暂停,分别是 上,下,左,右,A1,B1,A2,B2,P 这几个按键
 * 
 * 默认的设置为键盘的上下左右,Z,X,A,S,P
 * (其实我感觉这种操作按钮很别扭)
 * 所以我建议设置的一套:
 * 上:W     下:S     左:A     右:D     A1:J     B1:K     A2:U     B2:I     P:P(暂停键)
 *
 *
 *     W       UI P
 *    ASD      JK 
 *
 *
 *
 * 重要:关于按键的命名规则,必须是完全大写,或者完全小写！
 * 键盘的26个英文字母,正常输入就行:A a B b C c......
 * 'tab'键           可以输入 tab TAB
 * 'shift'键         可以输入 shift SHIFT
 * 'ctrl'键          可以输入 control CONTROL
 * 'esc'键           可以输入 escape ESCAPE
 * '空格'键          可以输入 space SPACE
 * 'alt'键           可以输入 alt ALT
 * 'pageup'键        可以输入 pageup PAGEUP
 * 'pagedown'键      可以输入 pagedown PAGEDOWN
 * 'left(左箭头)'    可以输入 left LEFT
 * 'right(右箭头)'   可以输入 right RIGHT
 * 'up(上箭头)'      可以输入 up UP
 * 'down(下箭头)'    可以输入 down DOWN 
 * 
 * 键盘数字输入:1 2 3 4 5 6 7 8 9 0直接输入即可
 * 注意:不支持附键盘数字输入,请不要设置小键盘的标识
 * 注意:特殊字符也只支持一部分,[ ] \ ,不建议使用,可能导致不可预期的问题
 *
 *
 *
 *
 *
 * 重要:因原版按键的存在,所以在设置按键的时候会导致有些按键会响应一个情况
 *  比如键盘上的'Z'键 它与空格键,回车键,按下的效果都是一样的,所以在设置游戏按键时,尽量避免一些冲突按键
 *  以下是原版按键的列表:
     9: 'tab',       // tab
    13: 'ok',       // enter
    16: 'shift',    // shift
    17: 'control',  // control
    18: 'control',  // alt
    27: 'escape',   // escape
    32: 'ok',       // space
    33: 'pageup',   // pageup
    34: 'pagedown', // pagedown
    37: 'left',     // left arrow
    38: 'up',       // up arrow
    39: 'right',    // right arrow
    40: 'down',     // down arrow
    45: 'escape',   // insert
    81: 'pageup',   // Q
    87: 'pagedown', // W
    88: 'escape',   // X
    90: 'ok',       // Z
    96: 'escape',   // numpad 0
    98: 'down',     // numpad 2
    100: 'left',    // numpad 4
    102: 'right',   // numpad 6
    104: 'up',      // numpad 8
    120: 'debug'    // F9
 *
 *
 *
 * 以下是Window_ZzyGCFBase类型拓展的一些可继承的函数
 * 
 * 
 *
 *
 *	Window_ZzyGCFBase.prototype.OnKeyUp()			//游戏手柄上键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyDown()			//游戏手柄下键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyLeft()			//游戏手柄左键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyRight()		//游戏手柄右键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyA1()			//游戏手柄A1键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyB1()			//游戏手柄B1键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyA2()			//游戏手柄A2键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyB2()			//游戏手柄B2键被按下
 *	Window_ZzyGCFBase.prototype.OnKeyP()			//游戏手柄P 键被按下
 *	Window_ZzyGCFBase.prototype.OutKeyUp()			//游戏手柄上键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyDown()		//游戏手柄下键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyLeft()		//游戏手柄左键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyRight()		//游戏手柄右键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyA1()			//游戏手柄A1键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyB1()			//游戏手柄B1键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyA2()			//游戏手柄A2键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyB2()			//游戏手柄B2键被抬起
 *	Window_ZzyGCFBase.prototype.OutKeyP()			//游戏手柄P 键被抬起
 *	Window_ZzyGCFBase.prototype.InKeyUp()			//游戏手柄上键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyDown()			//游戏手柄下键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyLeft()			//游戏手柄左键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyRight()		//游戏手柄右键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyA1()			//游戏手柄A1键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyB1()			//游戏手柄B1键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyA2()			//游戏手柄A2键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyB2()			//游戏手柄B2键被持续按下
 *	Window_ZzyGCFBase.prototype.InKeyP()			//游戏手柄P 键被持续按下
 *	Window_ZzyGCFBase.prototype.OnTouch()			//鼠标或是触摸按下时
 *	Window_ZzyGCFBase.prototype.OutTouch()			//鼠标或是触摸抬起时
 *	Window_ZzyGCFBase.prototype.InTouch()			//鼠标火舌触摸持续按下时
 *
 *
 * 以下是Sprite_ZzyGCFBase类型拓展的一些可继承的函数
 *
 * Sprite_ZzyGCFBase.prototype.OnSelect()      //图片在被鼠标点击选中时会调用
 * Sprite_ZzyGCFBase.prototype.OutSelect()     //图片被选中时再次被鼠标点击会调用
 * Sprite_ZzyGCFBase.prototype.OnClick()       //图片被鼠标或者触控点击时会调用
 *
 *
 *
 *以下是一些插件和脚本的命令
 *
 *
 *---------------------Plugin Command--------------------
 * 插件命令
 *
 * ZzyGCF Play x                       //填入游戏名,这将进行小游戏,前提是安装了这个小游戏插件
 *
 * ZzyGCF IsFadeScene x(true/false)    //这将修改进入游戏是否拥有渐入渐出效果
 * ZzyGCF FadeInFrame x                //这将修改进入游戏场景时的渐入帧数
 * ZzyGCF FadeOutFrame x               //这将修改进入游戏场景时的渐出帧数
 * ZzyGCF FadeColor x                  //这将修改进入时的闪屏颜色,请使用固定格式,默认 [0,0,0] 黑色
 *
 * ZzyGCF BkPic x                      * //修改背景,请填入文件名称,图片存放在Picture文件夹中,如果填'',则显示快照
 *
 * ZzyGCF BkHue x                      //修改背景图片的色相,范围0~360
 * ZzyGCF BkIsScroll x(true/false)   //这将开启/关闭卷动图片的效果
 *
 * ZzyGCF BkScrollX x                  //这将设置图片的卷动方向横向和速度,前提是允许进行卷动,可填入小数值
 *
 * ZzyGCF BkScrollY x                  //这将设置图片的卷动方向纵向和速度,前提是允许进行卷动,可填入小数值
 * ZzyGCF BkBGM a b c d                //这将修改背景音乐,a代表BGM文件名,b代表音量,c代表音调,d代表声道
 *
 *
 * ZzyGCF SetKey Up Down Left Right A1 B1 A2 B2 P         //这将会设置小游戏中的九个按键对应键盘码
 * 例:ZzyGCF SetKey W S A D J K U I P
 * WASD控制方向 JKUI作用按钮 P暂停
 * 
 *
 *
 * ZzyGCF Create ID FileName Hue X Y    //这将在指定位置生成一张图片
 * -ID:图片的ID值,这个要自己管理,如果重复会被覆盖
 * -FileName:图片的名称,注意图片的路径要放在pictures文件夹中
 * -Hue:图片的色相 范围在0~360
 * -X:图片生成在屏幕X的位置
 * -y:图片生成在屏幕Y的位置
 * 例子:ZzyGCF Create 1 'ball' 0 200 100
 *
 *
 * ZzyGCF Destroy ID                  //这将会立即摧毁图片并消失
 * -ID:图片的ID值
 * 
 *
 * ZzyGCF MoveOfSpeed ID X Y Speed     //这将让图片在当前位置以指定的速度移动到指定的位置
 * -ID:图片的ID值,这个要自己管理,如果重复会被覆盖
 * -X:图片移动到屏幕的位置X
 * -Y:图片移动到屏幕的位置Y
 * -Speed:图片移动的速度
 * 例子:ZzyGCF MoveOfSpeed 2 500 200 5
 *
 *
 * ZzyGCF MoveOfTime ID X Y Frame     //这将让图片在当前位置以一定的时间移动到指定的位置
 * -ID:图片的ID值,这个要自己管理,如果重复会被覆盖
 * -X:图片移动到屏幕的位置X
 * -Y:图片移动到屏幕的位置Y
 * -Frame:图片移动到这个位置的时间,单位是帧数
 * 例子:ZzyGCF MoveOfTime 3 100 100 60
 *
 *
 *
 * ZzyGCF MoveOfPer ID X Y Per       //这将以图片每帧移动当前的百分比移动到指定的位置,这是个顺滑的过程
 * -ID:图片的ID值,这个要自己管理,如果重复会被覆盖
 * -X:图片移动到屏幕的位置X
 * -Y:图片移动到屏幕的位置Y
 * -Per:图片每次移动目前到终点距离的百分比,范围1~100
 * 例子:ZzyGCF MoveOfPer 4 500 400 10
 *
 *
 *
 * 同时,还有透明度,缩放,旋转,也是用同样的指令
 * ZzyGCF OpacityOfSpeed ID Opacity Speed
 * ZzyGCF ScaleOfSpeed ID ScaleX ScaleY Speed
 * ZzyGCF RotateOfSpeed ID Rotate Turns Clockwise Speed
 *
 * 注意旋转可能有些区别,以下是旋转参数解释
 * ID:图片的ID值,这个要自己管理,如果重复会被覆盖
 * Rotate:旋转到的角度,请输入0~359的范围
 * Turns:圈数,数量为1就会多转一圈并以Rotate的角度作为结束
 * Clockwise:(false/true)是否顺时针 如果输入true会以顺时针的方向旋转
 * Speed:每一帧旋转的角度
 *
 * 
 * ZzyGCF OpacityOfTime ID Opacity Time
 * ZzyGCF ScaleOfTime ID ScaleX ScaleY Time
 * ZzyGCF RotateOfTime ID Rotate Turns Clockwise Time
 *
 * ZzyGCF OpacityOfPer ID Opacity Per
 * ZzyGCF ScaleOfPer ID ScaleX ScaleY Per
 * ZzyGCF RotateOfPer ID Rotate Turns Clockwise Per
 *
 *
 * ZzyGCF MoveEndDis ID Delay         //这将会在图片移动结束后,删除这个图片,如果有延迟则延迟删除
 * ZzyGCF OpacityEndDis ID Delay      //这将会在图片透明结束后,删除这个图片,如果有延迟则延迟删除
 * ZzyGCF ScaleEndDis ID Delay        //这将会在图片缩放结束后,删除这个图片,如果有延迟则延迟删除
 * ZzyGCF RotateEndDis ID Delay       //这将会在图片旋转结束后,删除这个图片,如果有延迟则延迟删除
 * -ID:图片的ID值,这个要自己管理,如果重复会被覆盖
 * -Delay:延迟删除,到达指定目标后开始计时,单位为帧数
 *
 * ZzyGCF SetDelay ID Delay     //这会让图片进行待机,指不会进行(移动,缩放,透明,旋转)的相关变化,等待delay帧数后会解除
 * -ID:图片的ID值,这个要自己管理,如果重复会被覆盖
 * -Delay:等待的时间,以帧作为单位
 *
 *
 *
 *
 *
 *
 *
 *
 *---------------------------Script--------------------------------
 * 脚本
 *
 * Zzy.GCF.GameData();             //这将返回游戏进行中的数据信息,比如血量,蓝量,内置道具等等
 * Zzy.GCF.GameGlobal();           //这将返回游戏的全局信息,包括分数,游戏名,游戏经过时间等等
 * Zzy.GCF.GameHistory();          //这将返回整体的历史信息,包括游戏次数,总时间,胜负次数等等
 * Zzy.GCF.Score();                //这将返回游戏结束后获得的总分数
 * Zzy.GCF.Time();                 //这将返回游戏结束期间经历的时长,注意以帧数为单位
 * Zzy.GCF.IsPausing();	           //这将返回游戏是否处于暂停期
 *
 *
 *
 *
 *
 *
 *----------------------------------------------------------
 *
 *
 *
 * 我叫坂本: v1.21 修复了与部分按键拓展类插件导致的按键失效问题,修复结束游戏后公共事件重复调用的严重问题
 * 我叫坂本: v1.20 部分类接口拓展
 * 我叫坂本: v1.19 添加额外函数接口和算法,添加截图功能
 * 我叫坂本: v1.18 对Sprite_ZzyGCFNumber功能进行更新
 * 我叫坂本: v1.17 修复MV1.5.1无法兼容的部分函数,添加额外处理算法与功能
 * 我叫坂本: v1.16 更新Sprite_ZzyGCFBatchBase类,提供队列化处理功能,同时更新粒子类功能
 * 我叫坂本: v1.15 更新一些操作函数
 * 我叫坂本: v1.14 修复了Sprite_ZzyGCFNumber中关于数量定位的bug
 * 我叫坂本: v1.13 新增Sprite_ZzyGCFSelectCursorBase类,提供选择光标操作函数,更新Sprite_ZzyGCFNumber类
 * 我叫坂本: v1.12 修复重复申请的问题，添加额外工具函数
 * 我叫坂本: v1.11 拓展Sprite_ZzyGCFNumber类位图文字化显示的操作函数
 * 我叫坂本: v1.10 新增Sprite_ZzyGCFTextBase类,处理位图文字化显示
 * 我叫坂本：v1.09 更新Sprite_ZzyGCFBase碰撞功能,添加相关处理
 * 我叫坂本：v1.08 新增Sprite_ZzyGCFAnimaBase类,提供动态位图的操作函数
 * 我叫坂本：v1.07 新增Sprite_ZzyGCFBase类操作的回调函数
 * 我叫坂本：v1.06 新增Sprite_ZzyGCFTileBase类,提供卷动位图的操作函数
 * 我叫坂本：v1.05 为位图缩放添加了双层缓冲，解决了图片无法比例放大的问题
 * 我叫坂本：v1.04 添加插件操作指令,增加屏幕产生图片功能
 * 我叫坂本：v1.03 新增Sprite_ZzyGCFBase类的函数,修复了Speed函数出错的问题
 * 我叫坂本：v1.02 新增Sprite_ZzyGCFBase类的函数,并针对申请位图做优化处理
 * 我叫坂本：v1.01 添加Sprite_ZzyGCFBase类 并实现了一些操作的接口
 * 我叫坂本：v1.00 完成插件功能
 *
 *
 *
 *----------------------------------------------------------
 *
 * @param ---背景设置---
 * @default
 *
 *
 * @param BkPic
 * @text 背景图片名称
 * @parent ---背景设置---
 * @dir img/pictures
 * @type file
 * @desc 执行小游戏时,底部的背景,默认图片存放在Img/Picture文件夹中,不填写则以快照作为背景
 * @default
 *
 *
 * @param BkHue
 * @parent ---背景设置---
 * @text 背景图片色相
 * @type number
 * @min 0
 * @max 360
 * @desc 游戏背景图片的色相,范围0~360,默认0
 * @default 0
 *
 * @param BkIsScroll
 * @parent ---背景设置---
 * @text 是否是卷动的背景图片
 * @type boolean
 * @on YES
 * @off NO
 * @desc 游戏背景图片是否是动态卷动的，默认是关闭的
 * YES - true     NO - false
 * @default false
 *
 * @param BkScrollX
 * @parent ---背景设置---
 * @text 背景卷动速度X
 * @desc 游戏背景图片X卷动,±代表方向,可以输入小数,默认值为0
 * @default 0
 *
 * @param BkScrollY
 * @parent ---背景设置---
 * @text 背景卷动速度Y
 * @desc 游戏背景图片Y卷动,±代表方向,可以输入小数,默认值为0
 * @default 0
 *
 * @param BkBGMName
 * @text 背景BGM名称
 * @parent ---背景设置---
 * @dir audio/bgm
 * @type file
 * @desc 执行小游戏时,会播放的背景bgm,不填写则不会执行任何BGM,BGM应放在audio/bgm文件夹中
 * @default
 *
 *
 *
 * @param BkBGMVolume
 * @text 背景BGM音量
 * @parent ---背景设置---
 * @type Number
 * @desc 音量大小,默认100
 * @default 100
 
 * @param BkBGMPitch
 * @text 背景BGM声调
 * @parent ---背景设置---
 * @type Number
 * @desc 声调,默认100
 * @default 100
 
 * @param BkBGMBGSPan
 * @text 背景BGM声道
 * @parent ---背景设置---
 * @type Number
 * @desc 声道,默认0
 * @default 0
 *
 * @param ---场景设置---
 * @default
 *
 * @param IsFadeScene
 * @parent ---场景设置---
 * @text 是否有渐入渐出
 * @type boolean
 * @on YES
 * @off NO
 * @desc 进入小游戏场景时,是否会进行渐入渐出的闪屏
 * YES - true     NO - false
 * @default true
 *
 *
 * @param FadeInFrame
 * @parent ---场景设置---
 * @text 渐入帧数
 * @type number
 * @desc 进入游戏模式时闪屏的时长,默认值30帧
 * @default 30
 *
 * @param FadeOutFrame
 * @parent ---场景设置---
 * @text 渐出帧数
 * @type number
 * @desc 退出游戏模式时闪屏的时长,默认值30帧
 * @default 30
 *
 * @param FadeColor
 * @parent ---场景设置---
 * @text 缓入缓出颜色
 * @desc 消失/出现时的闪屏颜色,格式[r,g,b],默认[0,0,0] 黑色
 * @default [0,0,0]
 *
 *
 * @param ---输入控制---
 * @default
 *
 *
 * @param KeyUp
 * @text 上键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'上'键的按键码,请参考上方帮助文档进行设置,默认
 * @default up
 *
 * @param KeyDown
 * @text 下键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'下'键的按键码,请参考上方帮助文档进行设置,默认
 * @default down
 *
 * @param KeyLeft
 * @text 左键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'左'键的按键码,请参考上方帮助文档进行设置,默认
 * @default left
 *
 * @param KeyRight
 * @text 右键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'右'键的按键码,请参考上方帮助文档进行设置,默认
 * @default right
 *
 * @param KeyA1
 * @text A1键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'A1'键的按键码,请参考上方帮助文档进行设置,默认
 * @default Z
 *
 * @param KeyB1
 * @text B1键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'B1'键的按键码,请参考上方帮助文档进行设置,默认
 * @default X
 *
 * @param KeyA2
 * @text A2键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'A2'键的按键码,请参考上方帮助文档进行设置,默认
 * @default A
 *
 * @param KeyB2
 * @text B2键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'B2'键的按键码,请参考上方帮助文档进行设置,默认
 * @default S
 *
 * @param KeyP
 * @text P键
 * @parent ---输入控制---
 * @desc 设置对应游戏中'P'键的按键码,请参考上方帮助文档进行设置,默认
 * @default P
 *
 *
 * @param ---事件执行---
 * @default
 *
 * @param WinCommon
 * @text 胜利事件
 * @parent ---事件执行---
 * @type Number
 * @desc 这是小游戏结束后,如果以胜利告终,将会执行的事件ID,填0则不会执行
 * @default 0
 *
 * @param WinScript
 * @text 胜利脚本
 * @parent ---事件执行---
 * @type note
 * @desc
 * @default ""
 *
 *
 * @param FailCommon
 * @text 失败事件
 * @parent ---事件执行---
 * @type Number
 * @desc 这是小游戏结束后,如果以胜利告终,将会执行的事件ID,填0则不会执行
 * @default 0
 *
 * @param FailScript
 * @text 失败脚本
 * @parent ---事件执行---
 * @type note
 * @desc 
 * @default ""
 *
 *
 * @param Other1Common
 * @text 特殊情况1事件
 * @parent ---事件执行---
 * @type Number
 * @desc 除了胜利和失败外,允许出现一些特殊形况,那种自定义的终止条件,填0则不会执行
 * @default 0
 *
 * @param Other1Script
 * @text 特殊情况1脚本
 * @parent ---事件执行---
 * @type note
 * @desc 
 * @default ""
 *
 *
 * @param Other2Common
 * @text 特殊情况2事件
 * @parent ---事件执行---
 * @type Number
 * @desc 除了胜利和失败外,允许出现一些特殊形况,那种自定义的终止条件,填0则不会执行
 * @default 0
 *
 * @param Other2Script
 * @text 特殊情况2脚本
 * @parent ---事件执行---
 * @type note
 * @desc 
 * @default ""
 *
 * @param SaveScoreVariable
 * @text 存放分数变量
 * @parent ---事件执行---
 * @type Variable
 * @desc 这是在进行游戏后,存放分数变量的ID值,注意每一次开始游戏这个值都会被新的值覆盖,填0不会执行
 * @default 0
 *
 * @param SaveTimeVariable
 * @text 存放耗时变量
 * @parent ---事件执行---
 * @type Variable
 * @desc 这是在进行游戏后,存放事件变量的ID值,注意每一次开始游戏这个值都会被新的值覆盖,填0不会执行,注意以帧数为单位
 * @default 0
 *
 
 
 * @param ---结束---
 * @default 
 *
 */
 
 
 
 // * @param IsCanKey
 // * @parent ---Zzy Input---
 // * @text 键盘输入开关
 // * @type boolean
 // * @on YES
 // * @off NO
 // * @desc 这将允许游戏中是否会相应键盘响应消息
 // * YES - true     NO - false
 // * @default true
 // *
 // *
 // * @param IsCanTouch
 // * @parent ---Zzy Input---
 // * @text 鼠标/触摸输入开关
 // * @type boolean
 // * @on YES
 // * @off NO
 // * @desc 这将允许游戏中是否会相应鼠标/触摸消息
 // * YES - true     NO - false
 // * @default true 
 // *
 // *
 // * @param ---Zzy Game---
 // * @default
 // *
 // * @param IsCanPause
 // * @parent ---Zzy Game---
 // * @text 是否允许暂停
 // * @type boolean
 // * @on YES
 // * @off NO
 // * @desc 这将会让游戏是否允许暂停操作
 // * YES - true     NO - false
 // * @default true
 // *
 // * @param IsDynScore
 // * @parent ---Zzy Game---
 // * @text 动态增分
 // * @type boolean
 // * @on YES
 // * @off NO
 // * @desc 这会允许你游戏中分数显示的变化,是否直接获取分数还是动态递增
 // * YES - true     NO - false
 // * @default true 
 
 

var LiuYue = LiuYue || {};
LiuYue.LiuYue_GameCore = true;//插件启动


var Zzy = Zzy || {};
Zzy.GCF = Zzy.GCF || {};
Zzy.GCF.version = 1.21;  
Zzy.Parameters = PluginManager.parameters('LiuYue_GameCore');
Zzy.Param = Zzy.Param || {};


//------------------set-------------------
Zzy.Param.GCFHaveGame = [];//拥有游戏名称
Zzy.Param.GCFHaveRealGame = [];//映射真实游戏名称,这主要是为了对照,获取动态加载的名称

//------------------scene set-------------------

Zzy.Param.GCFIsFadeScene = eval(String(Zzy.Parameters['IsFadeScene']));//是否有闪屏效果
Zzy.Param.GCFFadeInFrame = parseInt(Zzy.Parameters['FadeInFrame']);//缓入缓出时长
Zzy.Param.GCFFadeOutFrame = parseInt(Zzy.Parameters['FadeOutFrame']); 
Zzy.Param.GCFFadeColor = eval(String(Zzy.Parameters['FadeColor'])); //闪屏颜色

//------------------bk set-------------------

Zzy.Param.GCFBkPic = String(Zzy.Parameters['BkPic']);//背景图片名称
Zzy.Param.GCFBkHue = Number(Zzy.Parameters['BkHue']);//背景图片色相
Zzy.Param.GCFBkIsScroll = eval(String(Zzy.Parameters['BkIsScroll']));//是否是卷动的背景图片
Zzy.Param.GCFBkScrollX = Number(Zzy.Parameters['BkScrollX']);//背景卷动速度X
Zzy.Param.GCFBkScrollY = Number(Zzy.Parameters['BkScrollY']);//背景卷动速度Y

Zzy.Param.GCFBkBGMName = String(Zzy.Parameters['BkBGMName']);//背景BGM名称
Zzy.Param.GCFBkBGMVolume = Number(Zzy.Parameters['BkBGMVolume']);//背景BGM音量
Zzy.Param.GCFBkBGMPitch = Number(Zzy.Parameters['BkBGMPitch']);//背景BGM声调
Zzy.Param.GCFBkBGMPan = Number(Zzy.Parameters['BkBGMPan']);//背景BGM声道

//------------------Input-------------------

Zzy.Param.GCFKeyUp = String(Zzy.Parameters['KeyUp']);//上键
Zzy.Param.GCFKeyDown = String(Zzy.Parameters['KeyDown']);//下键
Zzy.Param.GCFKeyLeft = String(Zzy.Parameters['KeyLeft']);//左键
Zzy.Param.GCFKeyRight = String(Zzy.Parameters['KeyRight']);//右键
Zzy.Param.GCFKeyA1 = String(Zzy.Parameters['KeyA1']);//A1键
Zzy.Param.GCFKeyB1 = String(Zzy.Parameters['KeyB1']);//B1键
Zzy.Param.GCFKeyA2 = String(Zzy.Parameters['KeyA2']);//A2键
Zzy.Param.GCFKeyB2 = String(Zzy.Parameters['KeyB2']);//B2键
Zzy.Param.GCFKeyP = String(Zzy.Parameters['KeyP']);//P键


//------------------game-------------------
//这个是作废的参数
// Zzy.Param.GCFIsCanKey = eval(String(Zzy.Parameters['IsCanKey']));//键盘输入开关
// Zzy.Param.GCFIsCanTouch = eval(String(Zzy.Parameters['IsCanTouch']));//鼠标/触摸输入开关
// Zzy.Param.GCFIsCanPause = eval(String(Zzy.Parameters['IsCanPause']));//暂停开关
// Zzy.Param.GCFIsDynScore = eval(String(Zzy.Parameters['IsDynScore']));//动态增增分

Zzy.Param.GCFIsCanPause = true;
Zzy.Param.GCFIsDynScore = true;
Zzy.Param.GCFIsCanKey = true;
Zzy.Param.GCFIsCanTouch = true;


//---------------common script------------------

Zzy.Param.GCFWinCommon = parseInt(Zzy.Parameters['WinCommon']);//胜利事件
Zzy.Param.GCFWinScript = new Function(JSON.parse(Zzy.Parameters['WinScript']) + '\nreturn true;');//胜利脚本
Zzy.Param.GCFFailCommon = parseInt(Zzy.Parameters['FailCommon']);//失败事件
Zzy.Param.GCFFailScript = new Function(JSON.parse(Zzy.Parameters['FailScript']) + '\nreturn true;');//失败脚本
Zzy.Param.GCFOther1Common = parseInt(Zzy.Parameters['Other1Common']);//特殊情况1事件
Zzy.Param.GCFOther1Script = new Function(JSON.parse(Zzy.Parameters['Other1Script']) + '\nreturn true;');//特殊情况1脚本
Zzy.Param.GCFOther2Common = parseInt(Zzy.Parameters['Other2Common']);//特殊情况2事件
Zzy.Param.GCFOther2Script = new Function(JSON.parse(Zzy.Parameters['Other2Script']) + '\nreturn true;');//特殊情况2脚本

Zzy.Param.GCFSaveScoreVariable = parseInt(Zzy.Parameters['SaveScoreVariable']);//变量index
Zzy.Param.GCFSaveTimeVariable = parseInt(Zzy.Parameters['SaveTimeVariable']);//变量index


//鼠标移动的参测位置
Zzy.GCF.MoveX = 0;
Zzy.GCF.MoveY = 0;


//----------------------temp data----------------------------
Zzy.GCF.tempCommonId = 0;//即将执行的事件ID
Zzy.GCF.tempScript = undefined;//即将执行的脚本函数
Zzy.GCF.tempReloadBk = false;//需要重载图片
Zzy.GCF.tempReleasedMapper = [];//按下消息,判断按键是否有被按下
Zzy.GCF.tempInGame = false;//是否在小游戏中
Zzy.GCF.tempID = 0;//分配的ID值
Zzy.GCF.tempSprCache = {};
Zzy.GCF.tempSceneMapPointer = undefined;//指针


Zzy.GCF.tempCacheBitmap = [];//缓存库,每一次开始游戏时都会清理

Zzy.GCF.RandomAreaArr = [];//随机区域:主要作用是分配一个区域内生成的bitmap对象保证其不重合


Zzy.GCF.tempKeyMapper = {};//存储进入游戏前的按键缓冲

//===============================================================================================
//Game_System
//===============================================================================================
Zzy.GCF.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.GCF.Game_System_initialize.call(this);
	this.ZzyGCFInitData();//初始化数据
};


Game_System.prototype.ZzyGCFInitData = function()
{
	//初始化参数信息
	this.ZzyGCFOfSetData();//初始化设置相关数据
	this.ZzyGCFOfGameData();//初始化游戏相关互数据
	this.ZzyGCFOfMapPicture();//初始化地图上的存放数据数组
	
}

Game_System.prototype.ZzyGCFOfSetData = function()//初始化设置相关参数
{
	this._ZzyGCFIsFadeScene = Zzy.Param.GCFIsFadeScene;//缓入缓出开关
	this._ZzyGCFFadeInFrame = Zzy.Param.GCFFadeInFrame;//缓入缓出时长
	this._ZzyGCFFadeOutFrame = Zzy.Param.GCFFadeOutFrame;//
	this._ZzyGCFFadeColor = Zzy.Param.GCFFadeColor;//闪屏颜色
	
	this._ZzyGCFBkPic = Zzy.Param.GCFBkPic;//背景图片名称
	this._ZzyGCFBkHue = Zzy.Param.GCFBkHue;//背景图片色相
	this._ZzyGCFBkIsScroll = Zzy.Param.GCFBkIsScroll;//是否是卷动的背景图片
	this._ZzyGCFBkScrollX = Zzy.Param.GCFBkScrollX;//背景卷动速度X
	this._ZzyGCFBkScrollY = Zzy.Param.GCFBkScrollY;//背景卷动速度Y
	
	this._ZzyGCFBkBGM = {//背景BGM
		name:Zzy.Param.GCFBkBGMName,
		volume: Zzy.Param.GCFBkBGMVolume,
		pitch: Zzy.Param.GCFBkBGMPitch,
		pan: Zzy.Param.GCFBkBGMPan
	}
	
	this._ZzyGCFIsDynScore = Zzy.Param.GCFIsDynScore;//动态增分
	
	
	this._ZzyGCFIsCanKey = Zzy.Param.GCFIsCanKey;//键盘输入开关
	this._ZzyGCFIsCanTouch = Zzy.Param.GCFIsCanTouch;//鼠标/触摸输入开关
	this._ZzyGCFIsCanPause = Zzy.Param.GCFIsCanPause;//暂停开关
	
	this.ZzyGCFOfSetKeyData();//初始化按键信息
}

Game_System.prototype.GetZzyGCFIsFadeScene = function()
{
	if(this._ZzyGCFIsFadeScene === undefined)
	{this._ZzyGCFIsFadeScene = Zzy.Param.GCFIsFadeScene;}
	return this._ZzyGCFIsFadeScene;
}

Game_System.prototype.SetZzyGCFIsFadeScene = function(value)
{
	this._ZzyGCFIsFadeScene = value;
}

Game_System.prototype.GetZzyGCFFadeInFrame = function()
{
	if(this._ZzyGCFFadeInFrame === undefined)
	{this._ZzyGCFFadeInFrame = Zzy.Param.GCFFadeInFrame;}
	return this._ZzyGCFFadeInFrame;
}

Game_System.prototype.SetZzyGCFFadeInFrame = function(value)
{
	this._ZzyGCFFadeInFrame = value;
}

Game_System.prototype.GetZzyGCFFadeOutFrame = function()
{
	if(this._ZzyGCFFadeOutFrame === undefined)
	{this._ZzyGCFFadeOutFrame = Zzy.Param.GCFFadeOutFrame;}
	return this._ZzyGCFFadeOutFrame;
}

Game_System.prototype.SetZzyGCFFadeOutFrame = function(value)
{
	this._ZzyGCFFadeOutFrame = value;
}

Game_System.prototype.GetZzyGCFFadeColor = function()
{
	if(this._ZzyGCFFadeColor === undefined)
	{this._ZzyGCFFadeColor = Zzy.Param.GCFFadeColor;}
	return this._ZzyGCFFadeColor;
}

Game_System.prototype.SetZzyGCFFadeColor = function(value)
{
	this._ZzyGCFFadeColor = value;
}

Game_System.prototype.GetZzyGCFBkPic = function()
{
	if(this._ZzyGCFBkPic === undefined)
	{this._ZzyGCFBkPic = Zzy.Param.GCFBkPic;}
	return this._ZzyGCFBkPic;
}

Game_System.prototype.SetZzyGCFBkPic = function(value)
{
	this._ZzyGCFBkPic = value;
}


Game_System.prototype.GetZzyGCFBkHue = function()
{
	if(this._ZzyGCFBkHue === undefined)
	{this._ZzyGCFBkHue = Zzy.Param.GCFBkHue;}
	return this._ZzyGCFBkHue;
}

Game_System.prototype.SetZzyGCFBkHue = function(value)
{
	this._ZzyGCFBkHue = value;
}

Game_System.prototype.GetZzyGCFBkIsScroll = function()
{
	if(this._ZzyGCFBkIsScroll === undefined)
	{this._ZzyGCFBkIsScroll = Zzy.Param.GCFBkIsScroll;}
	return this._ZzyGCFBkIsScroll;
}

Game_System.prototype.SetZzyGCFBkIsScroll = function(value)
{
	this._ZzyGCFBkIsScroll = value;
}


Game_System.prototype.GetZzyGCFBkScrollX = function()
{
	if(this._ZzyGCFBkScrollX === undefined)
	{this._ZzyGCFBkScrollX = Zzy.Param.GCFBkScrollX;}
	return this._ZzyGCFBkScrollX;
}

Game_System.prototype.SetZzyGCFBkScrollX = function(value)
{
	this._ZzyGCFBkScrollX = value;
}

Game_System.prototype.GetZzyGCFBkScrollY = function()
{
	if(this._ZzyGCFBkScrollY === undefined)
	{this._ZzyGCFBkScrollY = Zzy.Param.GCFBkScrollY;}
	return this._ZzyGCFBkScrollY;
}

Game_System.prototype.SetZzyGCFBkScrollY = function(value)
{
	this._ZzyGCFBkScrollY = value;
}


Game_System.prototype.GetZzyGCFIsDynScore = function()
{
	if(this._ZzyGCFIsDynScore === undefined)
	{this._ZzyGCFIsDynScore = Zzy.Param.GCFIsDynScore;}
	return this._ZzyGCFIsDynScore;
}

Game_System.prototype.SetZzyGCFIsDynScore = function(value)
{
	this._ZzyGCFIsDynScore = value;
}


Game_System.prototype.GetZzyGCFIsCanKey = function()
{
	if(this._ZzyGCFIsCanKey === undefined)
	{this._ZzyGCFIsCanKey = Zzy.Param.GCFIsCanKey;}
	return this._ZzyGCFIsCanKey;
}

Game_System.prototype.SetZzyGCFIsCanKey = function(value)
{
	this._ZzyGCFIsCanKey = value;
}


Game_System.prototype.GetZzyGCFIsCanTouch = function()
{
	if(this._ZzyGCFIsCanTouch === undefined)
	{this._ZzyGCFIsCanTouch = Zzy.Param.GCFIsCanTouch;}
	return this._ZzyGCFIsCanTouch;
}

Game_System.prototype.SetZzyGCFIsCanTouch = function(value)
{
	this._ZzyGCFIsCanTouch = value;
}


Game_System.prototype.GetZzyGCFIsCanPause = function()
{
	if(this._ZzyGCFIsCanPause === undefined)
	{this._ZzyGCFIsCanPause = Zzy.Param.GCFIsCanPause;}
	return this._ZzyGCFIsCanPause;
}

Game_System.prototype.SetZzyGCFIsCanPause = function(value)
{
	this._ZzyGCFIsCanPause = value;
}


Game_System.prototype.ZzyGCFOfSetKeyData = function()//初始化按键信息
{
	this._ZzyGCFKey = {
		Up:Zzy.Param.GCFKeyUp,//上键
		Down:Zzy.Param.GCFKeyDown,//下键
		Left:Zzy.Param.GCFKeyLeft,//左键
		Right:Zzy.Param.GCFKeyRight,//右键
		A1:Zzy.Param.GCFKeyA1,//A1键
		B1:Zzy.Param.GCFKeyB1,//B1键
		A2:Zzy.Param.GCFKeyA2,//A2键
		B2:Zzy.Param.GCFKeyB2,//B2键
		P:Zzy.Param.GCFKeyP//P键
	};
	
	this._ZzyGCFCustomKey = [];//记录下自定义的Key,方便修改
	
	Zzy.GCF.KeyCorrectAndBinding(this._ZzyGCFKey,this._ZzyGCFCustomKey);//因为输入的数据会与游戏原按键冲突,所以会自我矫正
}

Game_System.prototype.GetZzyGCFKey = function()
{
	if(this._ZzyGCFKey === undefined)
	{this.ZzyGCFOfSetKeyData();}
	return this._ZzyGCFKey;
}

Game_System.prototype.GetZzyGCFCustomKey = function()
{
	if(this._ZzyGCFCustomKey === undefined)
	{this.ZzyGCFOfSetKeyData();}
	return this._ZzyGCFCustomKey;
}








Game_System.prototype.ZzyGCFOfGameData = function()//初始化游戏相关数据
{
	this._ZzyGCFGameData = [];//这是一次游戏的临时数据
	this._ZzyGCFGameGlobal = {};//这是一次游戏的全局数据
	this._ZzyGCFGameHistory = {};//这是游戏的总记录数据信息
	this.clearZzyGCFGameGlobal();
	this.clearZzyGCFGameHistory();	
}

Game_System.prototype.SettlementGame = function()//结算游戏,返回结果,要在有些结束时就进行结算
{
	//Result代表结果 win胜利 fail失败 other1其他情况1 other2其他情况2
	var globalInfo = this.getZzyGCFGameGlobal();
	var historyInfo = this.getZzyGCFGameHistory();
	
	historyInfo.totalTime += globalInfo.time;//游戏总时长
	historyInfo.totalScore += globalInfo.score;//游戏总分数
	historyInfo.totalPlayCount++;//游戏次数总数
	
	//设置全局变量的结果
	if(Zzy.Param.GCFSaveScoreVariable)
	{$gameVariables.setValue(Zzy.Param.GCFSaveScoreVariable,globalInfo.score);}
	if(Zzy.Param.GCFSaveTimeVariable)
	{$gameVariables.setValue(Zzy.Param.GCFSaveTimeVariable,globalInfo.time);}
	
	
	switch(globalInfo.result)
	{
		case 'win'://胜利时
		Zzy.GCF.tempCommonId = Zzy.Param.GCFWinCommon;
		Zzy.GCF.tempScript = Zzy.Param.GCFWinScript;
		
		
		historyInfo.totalWinCount++;//增加胜利次数
		break;
		
		case 'fail'://失败时
		Zzy.GCF.tempCommonId = Zzy.Param.GCFFailCommon;
		Zzy.GCF.tempScript = Zzy.Param.GCFFailScript;		
		
		historyInfo.totalFailCount++;//增加失败次数
		break;
		
		case 'other1'://特殊情况1
		Zzy.GCF.tempCommonId = Zzy.Param.GCFOther1Common;
		Zzy.GCF.tempScript = Zzy.Param.GCFOther1Script;	

		historyInfo.totalOther1Count++;//增加特殊1次数		
		break;
		
		case 'other2'://特殊情况2
		Zzy.GCF.tempCommonId = Zzy.Param.GCFOther2Common;
		Zzy.GCF.tempScript = Zzy.Param.GCFOther2Script;		
		
		historyInfo.totalOther2Count++;//增加特殊2次数	
		break;
	}
}


Game_System.prototype.ZzyGCFOfMapPicture = function()
{
	this._ZzyGCFPictureArr = [];	
}

Game_System.prototype.GetZzyGCFPictureArr = function()
{
	if(this._ZzyGCFPictureArr === undefined)
	{this._ZzyGCFPictureArr = [];}
	return this._ZzyGCFPictureArr;
}

Game_System.prototype.ClearZzyGCFPictureArr = function()
{
	this._ZzyGCFPictureArr = [];
}

Game_System.prototype.ZzyGCFSavePicture = function(spr,ID,fileName,hue)
{
	var pArr = this.GetZzyGCFPictureArr();
	
	pArr[ID] = {};
	pArr[ID].fileName = fileName;	//存储图片名称,用于再次申请
	pArr[ID].hue = hue;//存储图片色相,用于再次申请
	pArrr[ID].anchor = {};
	pArr[ID].scale = {};
	
	Zzy.GCF.TransmitPicDate(spr,pArr[ID]);
}


Game_System.prototype.ZzyGCFLoadAllPicture = function()
{
	return this.GetZzyGCFPictureArr();
}



Game_System.prototype.GetZzyGCFBkBGM = function()
{
	if(this._ZzyGCFBkBGM === undefined)
	{
		this._ZzyGCFBkBGM = {//背景BGM
			name:Zzy.Param.GCFBkBGMName,
			volume: Zzy.Param.GCFBkBGMVolume,
			pitch: Zzy.Param.GCFBkBGMPitch,
			pan: Zzy.Param.GCFBkBGMPan
		}
	}
	return this._ZzyGCFBkBGM;
}

Game_System.prototype.setZzyGCFBkBGM = function(name,volume,pitch,pan)
{
	var bgm = this.GetZzyGCFBkBGM();
	
	bgm.name = name;
	bgm.volume = volume;
	bgm.pitch = pitch;
	bgm.pan = pan;
}

Game_System.prototype.getZzyGCFGameData = function()//获取游戏数据
{
	if(this._ZzyGCFGameData === undefined)
	{this._ZzyGCFGameData = [];}
	return this._ZzyGCFGameData;
}

Game_System.prototype.clearZzyGCFGameData = function()//清理游戏数据
{this._ZzyGCFGameData = [];}

Game_System.prototype.getZzyGCFGameGlobal = function()//获取全局数据
{
	if(this._ZzyGCFGameGlobal === undefined)
	{this._ZzyGCFGameGlobal = {};this.clearZzyGCFGameGlobal();}	
	return this._ZzyGCFGameGlobal;
}

Game_System.prototype.clearZzyGCFGameGlobal = function()//清理全局数据
{
	//全局数据
	this._ZzyGCFGameGlobal = 
	{
		name:'',//游戏名称
		score:0,//总分数
		time:0,//时间
		isRunning:false,//是否运行中
		isPausing:false,//是否暂停中
		result:''//游戏结果
	};	
}

Game_System.prototype.getZzyGCFGameHistory = function()//获取统计数据
{
	if(this._ZzyGCFGameHistory === undefined)
	{this._ZzyGCFGameHistory = {};this.clearZzyGCFGameHistory();}	
	return this._ZzyGCFGameHistory;
}

Game_System.prototype.clearZzyGCFGameHistory = function()//清理统计数据
{
	this._ZzyGCFGameHistory =
	{
		totalTime:0,			//游玩游戏的总时长
		totalScore:0,			//游玩游戏的总分数
		totalPlayCount:0,		//进入游戏的总次数
		totalWinCount:0,		//游戏成功的总次数
		totalFailCount:0,		//游戏失败的总次数
		totalOther1Count:0,		//游戏其他情况的总次数
		totalOther2Count:0		//游戏其他情况的总次数
	}
	
}

Game_System.prototype.ZzyGCFStartGameData = function(gameName)//开始游戏时数据的处理
{
	this.clearZzyGCFGameData();
	this.clearZzyGCFGameGlobal();	
	this.getZzyGCFGameGlobal().name = gameName;//获得游戏名称
}


Game_System.prototype.getZzyGCFIsCanKey = function()//键盘输入开关
{return this._ZzyGCFIsCanKey;}

Game_System.prototype.setZzyGCFIsCanKey = function(isEnable)//键盘输入开关
{this._ZzyGCFIsCanKey = isEnable;}

Game_System.prototype.changeZzyGCFIsCanKey = function()//键盘输入开关
{this._ZzyGCFIsCanKey = !this._ZzyGCFIsCanKey;}

Game_System.prototype.getZzyGCFIsCanTouch = function()//鼠标/触摸输入开关
{return this._ZzyGCFIsCanTouch;}

Game_System.prototype.setZzyGCFIsCanTouch = function(isEnable)//鼠标/触摸输入开关
{this._ZzyGCFIsCanTouch = isEnable;}

Game_System.prototype.changeZzyGCFIsCanTouch = function(isEnable)//鼠标/触摸输入开关
{this._ZzyGCFIsCanTouch = !this._ZzyGCFIsCanTouch;}

Game_System.prototype.getZzyGCFIsCanPause = function()//暂停开关
{return this._ZzyGCFIsCanPause;}

Game_System.prototype.setZzyGCFIsCanPause = function(isEnable)//暂停开关
{this._ZzyGCFIsCanPause = isEnable;}

Game_System.prototype.changeZzyGCFIsCanPause = function(isEnable)//暂停开关
{this._ZzyGCFIsCanPause = !this._ZzyGCFIsCanPause;}

Game_System.prototype.getZzyGCFKey = function()
{return this.GetZzyGCFKey();}





//=================================================================
//Game_Interpreter
//=================================================================

Zzy.GCF.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	Zzy.GCF.Game_Interpreter_pluginCommand.call(this,command,args);

	if(command === 'ZzyGCF')
	{
		this.ZzyGCFCommand(args);
	}

}

Game_Interpreter.prototype.ZzyGCFCommand = function(args)
{
	var command = String(args[0]);
	
	switch(command)
	{
		case 'Play'://这将会运行游戏信息
		    var gameName = String(args[1]);
		    Zzy.GCF.startGame(gameName);//开始游戏
		break;
		
		case 'IsFadeScene':
			var isEnable = eval(String(args[1]));
			$gameSystem.SetZzyGCFIsFadeScene(isEnable);
		break;
		
		case 'FadeInFrame':
			var Val = parseInt(args[1]);
			$gameSystem.SetZzyGCFFadeInFrame(Val);
		break;
		
		case 'FadeOutFrame':
			var Val = parseInt(args[1]);
			$gameSystem.SetZzyGCFFadeOutFrame(Val);
		break;
		
		case 'FadeColor':
			var color = String(args[1]);
			$gameSystem.SetZzyGCFFadeColor(color);
		break;
		
		case 'BkPic':
			var fileName = String(args[1]);
			if(fileName === '\'\''){fileName = undefined;}
			$gameSystem.SetZzyGCFBkPic(fileName);
			Zzy.GCF.tempReloadBk = true;
		break;
		
		case 'BkHue':
			var hue = Number(args[1]);
			$gameSystem.SetZzyGCFBkHue(hue);
			Zzy.GCF.tempReloadBk = true;
		break;		
		
		case 'BkIsScroll':
			var isEnable = eval(String(args[1]));
			$gameSystem.SetZzyGCFBkIsScroll(isEnable);
		break;	
		
		case 'BkScrollX':
			var SX = Number(args[1]);
			$gameSystem.SetZzyGCFBkScrollX(SX);
		break;			
		
		case 'BkScrollX':
			var SY = Number(args[1]);
			$gameSystem.SetZzyGCFBkScrollY(SY);
		break;	
		
		case 'BkBGM'://设置背景音乐
			var name = String(args[1]);
			var volume = Number(args[2]);
			var pitch = Number(args[3]);
			var pan = Number(args[4]);
			$gameSystem.setZzyGCFBkBGM(name,volume,pitch,pan);//更新BGM数据
		break;		
		
		// case 'IsDynScore':
			// var isEnable = eval(String(args[1]));
			// $gameSystem.SetZzyGCFIsDynScore(isEnable);
		// break;
		
		// case 'IsCanKey':
			// var isEnable = eval(String(args[1]));
			// $gameSystem._ZzyGCFIsCanKey = isEnable;		
		// break;
		
		// case 'IsCanTouch':
			// var isEnable = eval(String(args[1]));
			// $gameSystem._ZzyGCFIsCanTouch = isEnable;		
		// break;
		
		// case 'IsCanPause':
			// var isEnable = eval(String(args[1]));
			// $gameSystem._ZzyGCFIsCanPause = isEnable;		
		// break;
		
		case 'SetKey':
			this.ZzyGCFSetKeyCommand(args);
		break;
   
		case 'Create':
			var ID = parseInt(args[1]);
			var fileName = String(args[2]);
			var Hue = parseInt(args[3]);
			var x = parseInt(args[4]);
			var y = parseInt(args[5]);
			
			Zzy.GCF.CreatePicture(ID,fileName,Hue,x,y);
		break;
		
		case 'Destroy':
			var ID = parseInt(args[1]);
			Zzy.GCF.DestroyPicture(ID);
		break;
		
		case 'MoveOfSpeed':
			var ID = parseInt(args[1]);
			var x = parseInt(args[2]);
			var y = parseInt(args[3]);
			var speed = Number(args[4]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.MoveToOfSpeed(x,y,speed);}
			
		break;
		
		case 'MoveOfTime':
			var ID = parseInt(args[1]);
			var x = parseInt(args[2]);
			var y = parseInt(args[3]);
			var time = Number(args[4]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.MoveToOfTime(x,y,time);}
		break;
		
		case 'MoveOfPer':
			var ID = parseInt(args[1]);
			var x = parseInt(args[2]);
			var y = parseInt(args[3]);
			var per = Number(args[4]);	
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.MoveToOfPer(x,y,per);}			
		break;
		
		case 'OpacityOfSpeed':
			var ID = parseInt(args[1]);
			var op = Number(args[2]);
			var speed = Number(args[3]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.OpacityToOfSpeed(op,speed);}
		break;
		
		case 'OpacityOfTime':
			var ID = parseInt(args[1]);
			var op = Number(args[2]);
			var time = Number(args[3]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.OpacityToOfTime(op,time);}
		break;
		
		case 'OpacityOfPer':
			var ID = parseInt(args[1]);
			var op = Number(args[2]);
			var per = Number(args[3]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.OpacityToOfPer(op,per);}
		break;

		case 'ScaleOfSpeed':
			var ID = parseInt(args[1]);
			var scaleX = Number(args[2]);
			var scaleY = Number(args[3]);
			var speed = Number(args[4]);

			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.ScaleToOfSpeed(scaleX,scaleY,speed);}			
		break;
		
		case 'ScaleOfTime':
			var ID = parseInt(args[1]);
			var scaleX = Number(args[2]);
			var scaleY = Number(args[3]);
			var time = Number(args[4]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.ScaleToOfTime(scaleX,scaleY,time);}
		break;
				
		case 'ScaleOfPer':
			var ID = parseInt(args[1]);
			var scaleX = Number(args[2]);
			var scaleY = Number(args[3]);
			var per = Number(args[4]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.ScaleToOfPer(scaleX,scaleY,per);}
		break;
	
		case 'RotateOfSpeed':
			var ID = parseInt(args[1]);
			var rotate = Number(args[2]);
			var turns = parseInt(args[3]);
			var isClockwise = eval(String(args[4]));
			var speed = Number(args[5]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.RotateToOfSpeed(rotate,turns,isClockwise,speed);}
		break;
		
		case 'RotateOfTime':
			var ID = parseInt(args[1]);
			var rotate = Number(args[2]);
			var turns = parseInt(args[3]);
			var isClockwise = eval(String(args[4]));
			var time = Number(args[5]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.RotateToOfTime(rotate,turns,isClockwise,time);}
		break;
				
		case 'RotateOfPer':
			var ID = parseInt(args[1]);
			var rotate = Number(args[2]);
			var turns = parseInt(args[3]);
			var isClockwise = eval(String(args[4]));
			var per = Number(args[5]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.RotateToOfPer(rotate,turns,isClockwise,per);}
		break;

		case 'MoveEndDis':
			var ID = parseInt(args[1]);
			var delay = parseInt(args[2]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.setMoveEndDisvisible();}
		break;
		
		case 'OpacityEndDis':
			var ID = parseInt(args[1]);
			var delay = parseInt(args[2]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.setOpacityEndDisvisible();}
		break;
		
		case 'ScaleEndDis':
			var ID = parseInt(args[1]);
			var delay = parseInt(args[2]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.setScaleEndDisvisible();}
		break;
				
		case 'RotateEndDis':
			var ID = parseInt(args[1]);
			var delay = parseInt(args[2]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.setRotateEndDisvisible();}
		break;
		
		case 'SetDelay':
			var ID = parseInt(args[1]);
			var delay = parseInt(args[2]);
			
			var spr = Zzy.GCF.GetPicture(ID);
			if(spr){spr.setDelay(delay);}
		break;
	}
}

 

Game_Interpreter.prototype.ZzyGCFSetKeyCommand = function(args)
{
	var Keys = $gameSystem.getZzyGCFKey();
	
	var keysLen = 9;//9个按键
	
	
	Keys.Up = String(args[1]);
	Keys.Down = String(args[2]);
	Keys.Left = String(args[3]);
	Keys.Right = String(args[4]);
	Keys.A1 = String(args[5]);
	Keys.B1 = String(args[6]);
	Keys.A2 = String(args[7]);
	Keys.B2 = String(args[8]);
	Keys.P = String(args[9]);

	Zzy.GCF.ClearCustomKey();
	$gameSystem._ZzyGCFCustomKey = [];//清除之前设置的按键消息
	Zzy.GCF.KeyCorrectAndBinding(Keys,$gameSystem._ZzyGCFCustomKey);
}





//===============================================================================================
//Scene_Map
//===============================================================================================

Zzy.GCF.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() 
{
	Zzy.GCF.Scene_Map_start.call(this);
	//执行游戏结束后的脚本和事件
	if(Zzy.GCF.tempCommonId)//执行事件
	{$gameTemp.reserveCommonEvent(Zzy.GCF.tempCommonId);}
	if(Zzy.GCF.tempScript)//执行脚本
	{Zzy.GCF.tempScript();}
	
	Zzy.GCF.tempCommonId = 0;
	Zzy.GCF.tempScript = undefined;
	
	Zzy.GCF.tempSceneMapPointer = this;
	this._ZzyGCFPic = [];
	this._ZzyGCFPicName = [];//记录名称,为了更佳方便
	this._ZzyGCFPicHue = [];//记录色相,为了更佳方便
	
	
	//读取之前存储的位图
	this._ZzyGCFPictureArr = $gameSystem.ZzyGCFLoadAllPicture();
	this.ZzyGCFReloadPic();//通过位图再次申请
};

Scene_Map.prototype.ZzyGCFReloadPic = function()
{
	var len = this._ZzyGCFPictureArr.length;
	for(var i=0;i<len;i++)
	{
		if(this._ZzyGCFPictureArr[i])
		{
			//重新加载
			var tempData = this._ZzyGCFPictureArr[i];
			this.ZzyGCFCreatePicture(i,tempData.fileName,tempData.hue,tempData.x,tempData.y);
			this.ZzyGCFReloadData(i,tempData);//重新加载数据
		}
	}
}


Scene_Map.prototype.ZzyGCFReloadData = function(ID,tempData)//重新加载之前的内容信息
{
	
	this._ZzyGCFPicName[ID] = tempData.fileName;
	this._ZzyGCFPicHue[ID] = tempData.hue;
	Zzy.GCF.TransmitPicDate(tempData,this._ZzyGCFPic[ID]);

}




Zzy.GCF.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() 
{
	Zzy.GCF.Scene_Map_terminate.call(this);
    //this.removeChild(this._spriteset);
	
	this.SaveAllPictureData();//记录所有图片的数据信息
	this.ZzyGCFRemoveAllPicture();//移除所有的图片
	Zzy.GCF.tempSceneMapPointer = undefined;
	
};

Scene_Map.prototype.SaveAllPictureData = function()
{
	$gameSystem.ClearZzyGCFPictureArr();//清空
	
	var len = this._ZzyGCFPic.length;
	for(var i=0;i<len;i++)
	{
		var tempSpr = this._ZzyGCFPic[i];
		if(tempSpr)
		{
			var fileName = this._ZzyGCFPicName[i];
			var hue = this._ZzyGCFPicHue[i];
			$gameSystem.ZzyGCFSavePicture(tempSpr,i,fileName,hue);//存储图片的信息
		}			
	}
}


Scene_Map.prototype.ZzyGCFRemoveAllPicture = function()
{
	var len = this._ZzyGCFPic.length;
	for(var i=0;i<len;i++)
	{
		var tempSpr = this._ZzyGCFPic[i];
		if(tempSpr)
		{
			this.removeChild(tempSpr);
			this._ZzyGCFPic[i] = undefined;
		}
	}
}



Scene_Map.prototype.ZzyGCFCreatePicture = function(ID,filename,hue,x,y)
{
	//首先判断这个ID是否在图片群中
	
	var tempSpr = this._ZzyGCFPic[ID];
	if(tempSpr)//删除这个位图
	{this.ZzyGCFDestoryPicture(ID);}
	
	var newSpr = new Sprite_ZzyGCFBase(x,y,filename,hue);//申请新的位图信息
	this._ZzyGCFPicName[ID] = filename;
	this._ZzyGCFPicHue[ID] = hue;
	
	this._ZzyGCFPic[ID] = newSpr;
	this.addChild(newSpr);//添加新的位图
}

Scene_Map.prototype.ZzyGCFDestoryPicture = function(ID)
{
	var tempSpr = this._ZzyGCFPic[ID];
	if(!tempSpr)return;
	this.removeChild(tempSpr);
	this._ZzyGCFPic[ID] = undefined;
}

Scene_Map.prototype.ZzyGCFGetPicture = function(ID)
{
	var tempSpr = this._ZzyGCFPic[ID];
	return tempSpr;
}







//===============================================================================================
//Scene_ZzyGCFGame
//===============================================================================================


function Scene_ZzyGCFGame() 
{
    this.initialize.apply(this, arguments);
}

Scene_ZzyGCFGame.prototype = Object.create(Scene_Base.prototype);
Scene_ZzyGCFGame.prototype.constructor = Scene_ZzyGCFGame;

Scene_ZzyGCFGame.prototype.initialize = function() 
{
    Scene_Base.prototype.initialize.call(this);
	
	this.InitData();//初始化数据
};

Scene_ZzyGCFGame.prototype.InitData = function()
{
	//获取到游戏数据
	this.gameData = $gameSystem.getZzyGCFGameData();
	this.gameGlobal = $gameSystem.getZzyGCFGameGlobal();
	this.isError = false;//是否出现错误,这将会决定是否强制退出这个窗口
	this._gameWindow = undefined;//创建窗口
	this._gameWindowUI = undefined;//创建UI窗口
	
	
	
	this.OnTouchX = 0;//鼠标按下的X
	this.OnTouchY = 0;//鼠标按下的Y
	this.OutTouchX = 0;//鼠标抬起的X
	this.OutTouchY = 0;//鼠标抬起的Y	
	this.InTouchX = 0;//按住时鼠标X
	this.InTouchY = 0;//按住时鼠标Y
	
	this.isTouchMoving = false;//是否处于按下移动中
	
	//按键信息
	this.keyUp = 0;
	this.keyDown = 0;	
	this.keyLeft = 0;
	this.keyRight = 0;
	this.keyA1 = 0;
	this.keyB1 = 0;
	this.keyA2 = 0;
	this.keyB2 = 0;
	this.keyP = 0;
}


Scene_ZzyGCFGame.prototype.create = function() 
{
    Scene_Base.prototype.create.call(this);
    //this.playGameoverMusic();
    this.createBackground();//创建背景
	this.createGameWindow();//创造游戏Window
};

Scene_ZzyGCFGame.prototype.start = function() 
{
    Scene_Base.prototype.start.call(this);
	this.fadeInAll();//载入全部
};

Scene_ZzyGCFGame.prototype.update = function() //作为子类的扩充
{
    Scene_Base.prototype.update.call(this);
	
	
	this.CheckErrorExit();//检测错误退出
	this.CheckReloadBk();//检测重载图片
	this.ScrollBk();//卷动背景
	this.updateInputKey();//刷新输入键盘
	this.updateInputTouch();//刷新输入触摸
	
};

Scene_ZzyGCFGame.prototype.updateInputKey = function()
{
	//if(!$gameSystem._ZzyGCFIsCanKey)return;//键盘响应控制,遗弃
	if(!this._gameWindow)return;
	
	this.updateKeyTriggered();//检测键盘按下
	this.updateKeyReleased();//检测键盘按住
	this.updateKeyPressed();//检测

}


Scene_ZzyGCFGame.prototype.updateKeyTriggered = function()//检测键盘按下时
{
	var Keys = Zzy.GCF.Keys();
	
	if(Input.isTriggered(Keys.Up))
	{
		this._gameWindow.OnKeyUp();
	}
	else if(Input.isTriggered(Keys.Down))
	{
		this._gameWindow.OnKeyDown();
	}
	else if(Input.isTriggered(Keys.Left))
	{
		this._gameWindow.OnKeyLeft();
	}
	else if(Input.isTriggered(Keys.Right))
	{
		this._gameWindow.OnKeyRight();
	}
	else if(Input.isTriggered(Keys.A1))
	{
		this._gameWindow.OnKeyA1();
	}
	else if(Input.isTriggered(Keys.B1))
	{
		this._gameWindow.OnKeyB1();
	}
	else if(Input.isTriggered(Keys.A2))
	{
		this._gameWindow.OnKeyA2();
	}
	else if(Input.isTriggered(Keys.B2))
	{
		this._gameWindow.OnKeyB2();
	}
	else if(Input.isTriggered(Keys.P))
	{
		this._gameWindow.OnKeyP();
	}	
}

Scene_ZzyGCFGame.prototype.updateKeyReleased = function()//检测键盘松开时
{
	var Keys = Zzy.GCF.Keys();
	
	if(Input.ZzyGCFisReleased(Keys.Up))
	{
		this._gameWindow.OutKeyUp();
	}
	else if(Input.ZzyGCFisReleased(Keys.Down))
	{
		this._gameWindow.OutKeyDown();
	}
	else if(Input.ZzyGCFisReleased(Keys.Left))
	{
		this._gameWindow.OutKeyLeft();
	}
	else if(Input.ZzyGCFisReleased(Keys.Right))
	{
		this._gameWindow.OutKeyRight();
	}
	else if(Input.ZzyGCFisReleased(Keys.A1))
	{
		this._gameWindow.OutKeyA1();
	}
	else if(Input.ZzyGCFisReleased(Keys.B1))
	{
		this._gameWindow.OutKeyB1();
	}
	else if(Input.ZzyGCFisReleased(Keys.A2))
	{
		this._gameWindow.OutKeyA2();
	}
	else if(Input.ZzyGCFisReleased(Keys.B2))
	{
		this._gameWindow.OutKeyB2();
	}
	else if(Input.ZzyGCFisReleased(Keys.P))
	{
		this._gameWindow.OutKeyP();
	}		
}

Scene_ZzyGCFGame.prototype.updateKeyPressed = function()//检测按住时
{
	var Keys = Zzy.GCF.Keys();
	
	if(Input.isPressed(Keys.Up))
	{
		this._gameWindow.InKeyUp();
	}
	else if(Input.isPressed(Keys.Down))
	{
		this._gameWindow.InKeyDown();
	}
	else if(Input.isPressed(Keys.Left))
	{
		this._gameWindow.InKeyLeft();
	}
	else if(Input.isPressed(Keys.Right))
	{
		this._gameWindow.InKeyRight();
	}
	else if(Input.isPressed(Keys.A1))
	{
		this._gameWindow.InKeyA1();
	}
	else if(Input.isPressed(Keys.B1))
	{
		this._gameWindow.InKeyB1();
	}
	else if(Input.isPressed(Keys.A2))
	{
		this._gameWindow.InKeyA2();
	}
	else if(Input.isPressed(Keys.B2))
	{
		this._gameWindow.InKeyB2();
	}
	else if(Input.isPressed(Keys.P))
	{
		this._gameWindow.InKeyP();
	}		

}


Scene_ZzyGCFGame.prototype.updateInputTouch = function()
{
	//if(!$gameSystem._ZzyGCFIsCanTouch)return;//点击响应控制,遗弃
	if(!this._gameWindow)return;
	
	if(TouchInput.isTriggered())//按下
	{this._gameWindow.OnTouch();}
	
	if(TouchInput.isReleased())//抬起
	{this._gameWindow.OutTouch();}
	
	if(this.isTouchMoving)//处于移动中
	{this._gameWindow.InTouch();}
}

Scene_ZzyGCFGame.prototype.CheckReloadBk = function()
{
	if(Zzy.GCF.tempReloadBk)
	{
		this.requestBkBitmap();//刷新位图
		Zzy.GCF.tempReloadBk = false;
	}
}

Scene_ZzyGCFGame.prototype.ScrollBk = function()
{
	if($gameSystem.GetZzyGCFBkIsScroll())
	{
		this._backgroundSprite.origin.x -= $gameSystem.GetZzyGCFBkScrollX();
		this._backgroundSprite.origin.y -= $gameSystem.GetZzyGCFBkScrollY();
	}

}


Scene_ZzyGCFGame.prototype.CheckErrorExit = function()
{
	if (this.isBusy())return;
	
	if(this.isError)
	{
		this.isError = false;
		Zzy.GCF.errorExitGame();//退出游戏
	}	
}



Scene_ZzyGCFGame.prototype.stop = function() 
{
    Scene_Base.prototype.stop.call(this);
    this.fadeOutAll();//执行缓出
};

Scene_ZzyGCFGame.prototype.terminate = function() 
{
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};


Scene_ZzyGCFGame.prototype.fadeOutAll = function() //全部缓出
{
    var time = this.slowFadeOutSpeed() / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
	
	if($gameSystem.GetZzyGCFIsFadeScene())
	{this.startFadeOut(this.slowFadeOutSpeed());}
};

Scene_ZzyGCFGame.prototype.fadeInAll = function()//全部缓入
{
	this.PlayBkBGM();//播放背景音乐
	var time = this.slowFadeInSpeed() / 60;
	AudioManager.fadeInBgm(time);
	AudioManager.fadeOutBgs(time);//BGS和ME退出
    AudioManager.fadeOutMe(time);
	
	if($gameSystem.GetZzyGCFIsFadeScene())
	{ this.startFadeIn(this.slowFadeInSpeed(), false);}//执行缓入
}

Scene_ZzyGCFGame.prototype.PlayBkBGM = function()
{
	//是否播放背景曲调
	var bgm = $gameSystem.GetZzyGCFBkBGM();
	
	if(bgm.name)//存在音乐
	{AudioManager.replayBgm(bgm);}//播放音乐	
}



Scene_ZzyGCFGame.prototype.requestBkBitmap = function()
{
	if($gameSystem.GetZzyGCFBkPic())
	{
		var picName = $gameSystem.GetZzyGCFBkPic();
		var hue = $gameSystem.GetZzyGCFBkHue();
		this._backgroundSprite.bitmap = ImageManager.loadPicture(picName,hue); 
	}
	else
	{
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	}
	this._backgroundSprite.move(0,0,Graphics.boxWidth,Graphics.boxHeight);	
}

Scene_ZzyGCFGame.prototype.createBackground = function() //创造背景图片
{
	
    this._backgroundSprite = new TilingSprite();
	
	this.requestBkBitmap();//申请位图
    this.addChild(this._backgroundSprite);
};


Scene_ZzyGCFGame.prototype.slowFadeInSpeed = function() 
{return $gameSystem.GetZzyGCFFadeInFrame();};

Scene_ZzyGCFGame.prototype.slowFadeOutSpeed = function() 
{return $gameSystem.GetZzyGCFFadeOutFrame();};


Scene_ZzyGCFGame.prototype.createFadeSprite = function(white)//申请遮罩
{
	
    if (!this._fadeSprite) 
	{
        this._fadeSprite = new ScreenSprite();
        this.addChild(this._fadeSprite);
    }
	
	var color = $gameSystem.GetZzyGCFFadeColor();
	
	var r = color[0];
	var g = color[1]; 
	var b = color[2]; 
	this._fadeSprite.setColor(r,g,b);
};


Scene_ZzyGCFGame.prototype.createGameWindow = function()
{
	//判断这个游戏名称是否注册过
	var gameName = this.gameGlobal.name;
	var Len = Zzy.Param.GCFHaveGame.length;
	var index = -1;
	var isHave = false;
		
	for(var i=0;i<Len;i++)
	{
		if(gameName === Zzy.Param.GCFHaveGame[i])
		{
			isHave = true;
			index = i;
			break;
		}
	}
	if(!isHave)//出现错误
	{
		Zzy.GCF.errorGame(1);
		this.isError = true;
		return;
	}

	//通过动态编译的方式,来获取游戏窗口

	gameName = Zzy.Param.GCFHaveRealGame[index];//转换成窗口名称

	this._gameWindow = eval(String('new Window_ZzyGCF' + gameName));
	this._gameWindowUI = eval(String('new Window_ZzyGCF' + gameName + 'UI'));
	
	this._gameWindow.setUI(this._gameWindowUI);
	
	this.addChild(this._gameWindow);//游戏层
	//添加额外的信息窗口,用来做分层
	this.AddLayer1();
	this.AddLayer2();
	this.AddLayer3();
	this.AddLayer4();
	this.AddLayer5();
	this.AddLayer6();
	this.AddLayer7();
	this.AddLayer8();
	this.AddLayer9();
	this.AddLayer10();
	this.addChild(this._gameWindowUI);//UI层
}


Scene_ZzyGCFGame.prototype.AddLayer1 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer2 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer3 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer4 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer5 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer6 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer7 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer8 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer9 = function()
{}//继承写入窗口
Scene_ZzyGCFGame.prototype.AddLayer10 = function()
{}//继承写入窗口




Scene_ZzyGCFGame.prototype.isTriggered = function()//触发键盘确认按键或是鼠标点击按键
{
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};


Scene_ZzyGCFGame.prototype.terminate = function()//退出时 
{
    this.removeChild(this._gameWindow);
	$gameSystem.SettlementGame();//结算游戏
	Scene_Base.prototype.terminate.call(this);
	
	if(this._gameWindow)//删除游戏窗口
	{this.removeChild(this._gameWindow);}
	
};


//层类
//=========================================================================================
//Window_ZzyGCFLayerBase
//=========================================================================================

function Window_ZzyGCFLayerBase() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGCFLayerBase.prototype = Object.create(Window_Base.prototype);
Window_ZzyGCFLayerBase.prototype.constructor = Window_ZzyGCFLayerBase;

Window_ZzyGCFLayerBase.prototype.initialize = function()
{
	
    Window_Base.prototype.initialize.call(this,0,0,Graphics.boxWidth,Graphics.boxHeight);
	this.opacity = 0;//透明
	
};

Window_ZzyGCFLayerBase.prototype.standardPadding = function() 
{
	return 0;
}


//===============================================================================================
//Window_ZzyGCFBase
//===============================================================================================

function Window_ZzyGCFBase() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGCFBase.prototype = Object.create(Window_Base.prototype);
Window_ZzyGCFBase.prototype.constructor = Window_ZzyGCFBase;

Window_ZzyGCFBase.prototype.initialize = function() 
{
	//初始化
    var width = this.Width();
    var height = this.Height();
	
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	this.opacity = 0;
	
	//获得游戏数据
	this.gameData = $gameSystem.getZzyGCFGameData();
	this.gameGlobal = $gameSystem.getZzyGCFGameGlobal();
	this.scene = SceneManager._scene;//获取全部的数值
	this.UI = undefined;//UI窗口
	
	// this._textWindow = undefined;
	// this.createTextWindow();
};

// Window_ZzyGCFBase.prototype.createTextWindow = function()//创建文字窗口
// {
	// //因为渲染顺序的原因,图片会在drawText之后处理,这导致了游戏中的无法显示在位图的上方
	// //通过双层子窗口的方式,让文字显示在位图的上方
	// this._textWindow = new Window_ZzyGCFText();
	// this._textWindow.opacity = 0;
	// this.addChild(this._textWindow);
// }


Window_ZzyGCFBase.prototype.update = function() //作为子类的扩充
{
	Window_Base.prototype.update.call(this);
	
}

Window_ZzyGCFBase.prototype.standardPadding = function() //宽度边距消除
{
    return 0;
};

Window_ZzyGCFBase.prototype.Width = function()
{
	return Graphics.boxWidth;
}

Window_ZzyGCFBase.prototype.Height = function()
{
	return Graphics.boxHeight;
}


Window_ZzyGCFBase.prototype.clear = function() //清理
{
    this.contents.clear();
};

Window_ZzyGCFBase.prototype.refresh = function() //刷新
{
    this.contents.clear();
};

Window_ZzyGCFBase.prototype.setUI = function(UIWindow)
{
	this.UI = UIWindow;//UI窗口
}

// Window_ZzyGCFBase.prototype.drawText = function(text,x,y,pos)
// {
	// this._textWindow.drawText(text,x,y,pos);
// }

// function Window_ZzyGCFText() 
// {
    // this.initialize.apply(this, arguments);
// }

// Window_ZzyGCFText.prototype = Object.create(Window_Base.prototype);
// Window_ZzyGCFText.prototype.constructor = Window_ZzyGCFText;

// Window_ZzyGCFText.prototype.initialize = function() 
// {
    // var width = Graphics.boxWidth;
    // var height = Graphics.boxHeight;
    // Window_Base.prototype.initialize.call(this, 0, 0, width, height);
// };



// Window_ZzyGCFText.prototype.standardPadding = function() //宽度边距消除
// {
    // return 0;
// };





//以下这些方法会用于做游戏的重载,On开头代表按下,Out开头代表松开,In开头代表持续按下时长
Window_ZzyGCFBase.prototype.OnKeyUp = function()
{
	this.scene.keyUp = 1;
}
Window_ZzyGCFBase.prototype.OnKeyDown = function()
{
	this.scene.keyDown = 1;
}
Window_ZzyGCFBase.prototype.OnKeyLeft = function()
{
	this.scene.keyLeft = 1;
}
Window_ZzyGCFBase.prototype.OnKeyRight = function()
{
	this.scene.keyRight = 1;
}
Window_ZzyGCFBase.prototype.OnKeyA1 = function()
{
	this.scene.keyA1 = 1;
}
Window_ZzyGCFBase.prototype.OnKeyB1 = function()
{
	this.scene.keyB1 = 1;
}
Window_ZzyGCFBase.prototype.OnKeyA2 = function()
{
	this.scene.keyA2 = 1;
}
Window_ZzyGCFBase.prototype.OnKeyB2 = function()
{
	this.scene.keyB2 = 1;
}
Window_ZzyGCFBase.prototype.OnKeyP = function()
{
	this.scene.keyP = 1;
	
	//暂停游戏/继续游戏切换
	this.gameGlobal.isPausing = !this.gameGlobal.isPausing;
	this.gameGlobal.isRunning = !this.gameGlobal.isRunning;
	
	return this.gameGlobal.isPausing;
}

Window_ZzyGCFBase.prototype.OutKeyUp = function()
{
	this.scene.keyUp = 0;
}
Window_ZzyGCFBase.prototype.OutKeyDown = function()
{
	this.scene.keyDown = 0;
}
Window_ZzyGCFBase.prototype.OutKeyLeft = function()
{
	this.scene.keyLeft = 0;
}
Window_ZzyGCFBase.prototype.OutKeyRight = function()
{
	this.scene.keyRight = 0;
}
Window_ZzyGCFBase.prototype.OutKeyA1 = function()
{
	this.scene.keyA1 = 0;
}
Window_ZzyGCFBase.prototype.OutKeyB1 = function()
{
	this.scene.keyB1 = 0;
}
Window_ZzyGCFBase.prototype.OutKeyA2 = function()
{
	this.scene.keyA2 = 0;
}
Window_ZzyGCFBase.prototype.OutKeyB2 = function()
{
	this.scene.keyB2 = 0;
}
Window_ZzyGCFBase.prototype.OutKeyP = function()
{
	this.scene.keyP = 0;
}

Window_ZzyGCFBase.prototype.InKeyUp = function()
{
	this.scene.keyUp++;
}
Window_ZzyGCFBase.prototype.InKeyDown = function()
{
	this.scene.keyDown++;
}
Window_ZzyGCFBase.prototype.InKeyLeft = function()
{
	this.scene.keyLeft++;
}
Window_ZzyGCFBase.prototype.InKeyRight = function()
{
	this.scene.keyRight++;
}
Window_ZzyGCFBase.prototype.InKeyA1 = function()
{
	this.scene.keyA1++;
}
Window_ZzyGCFBase.prototype.InKeyB1 = function()
{
	this.scene.keyB1++;
}

Window_ZzyGCFBase.prototype.InKeyA2 = function()
{
	this.scene.keyA2++;
}
Window_ZzyGCFBase.prototype.InKeyB2 = function()
{
	this.scene.keyB2++;
}
Window_ZzyGCFBase.prototype.InKeyP = function()
{
	this.scene.keyP++;
}



Window_ZzyGCFBase.prototype.OnTouch = function()//鼠标按下
{
	this.scene.OnTouchX = TouchInput.x;
	this.scene.OnTouchY = TouchInput.y;
	this.scene.InTouchX = TouchInput.x;
	this.scene.InTouchY = TouchInput.y;	
	this.scene.isTouchMoving = true;

}
Window_ZzyGCFBase.prototype.OutTouch = function()//鼠标抬起
{
	this.scene.OutTouchX = TouchInput.x;
	this.scene.OutTouchY = TouchInput.y;
	this.scene.isTouchMoving = false;
}

Window_ZzyGCFBase.prototype.InTouch = function()//移动中
{
	this.scene.InTouchX = TouchInput.x;
	this.scene.InTouchY = TouchInput.y;
}

//===============================================================================================
//Window_ZzyGCFBaseUI
//===============================================================================================

function Window_ZzyGCFBaseUI() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGCFBaseUI.prototype = Object.create(Window_ZzyGCFBase.prototype);
Window_ZzyGCFBaseUI.prototype.constructor = Window_ZzyGCFBaseUI;

Window_ZzyGCFBaseUI.prototype.initialize = function() 
{
	//初始化
    var width = this.Width();
    var height = this.Height();
	
    Window_ZzyGCFBase.prototype.initialize.call(this, 0, 0, width, height);
	this.opacity = 0;
	
	//获得游戏数据
	this.gameData = $gameSystem.getZzyGCFGameData();
	this.gameGlobal = $gameSystem.getZzyGCFGameGlobal();
	this.scene = SceneManager._scene;//获取全部的数值
	
	
};




//==========================================================================
//Sprite_ZzyGCFBase
//==========================================================================


function Sprite_ZzyGCFBase() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGCFBase.prototype = Object.create(Sprite.prototype);
Sprite_ZzyGCFBase.prototype.constructor = Sprite_ZzyGCFBase;

Sprite_ZzyGCFBase.prototype.initialize = function(x,y,fileName,hue) 
{
    Sprite.prototype.initialize.call(this);
	//设置位置
	this.x = x;
	this.y = y;
	this.bitmap = undefined;
	this.loadBitmap(fileName,hue);

	this.initOrigin();//初始化原
	this.autoSetOrigin();//自动设置原
	
    this.initMembers();//初始化数据
	this.initPower();//申请权限
	
	this.autoSetParam();//自动设置参数信息
};

Sprite_ZzyGCFBase.prototype.loadBitmap = function(fileName,hue)//加载图片
{
	this.bitmap = Zzy.GCF.LoadPicture(fileName,hue);
}


Sprite_ZzyGCFBase.prototype.ResetInfo = function(paramArr)//可以被重写
{}



Sprite_ZzyGCFBase.prototype.initOrigin = function()
{
	this.originalX = this.x;//生成的原位置
	this.originalY = this.y;//生成的原位置
	this.originOp = this.opacity;//原透明度
	this.originScaleX = this.scale.x;//原缩放
	this.originScaleY = this.scale.y;	
	this.originBitmap = this.bitmap;//原图像
}

Sprite_ZzyGCFBase.prototype.autoSetOrigin = function()
{}//用于子类的重写

Sprite_ZzyGCFBase.prototype.autoSetParam = function()
{}//用于子类的重写

Sprite_ZzyGCFBase.prototype.initPower = function()
{
	this.isCanMoving = true;//允许移动
	this.isCanOpaciting = true;//允许透明度
	this.isCanScaling = true;//允许缩放
	this.isCanRotating = true;//允许旋转
	
	this.isCanSelect = false;//允许被选择
	this.isCanCollision = false;//允许发生碰撞
	this.isCanButton = false;//允许按钮效果
	this.ignorePause = false;//忽略暂停 这个内容不会暂停	
}

Sprite_ZzyGCFBase.prototype.initMembers = function() 
{
	//位置信息
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;


	this.ID = 0;//对象的ID值
	Zzy.GCF.AssignmentID(this);//分配ID值
	
	//判定信息
	this.moving = false;//是否处于移动中
	this.scaling = false;//是否处于缩放中
	this.opaciting = false;//是否处于透明度变化中 
	this.rotating = false;//是否处于旋转中
	
	this.selecting = false;//是否被选中
	this.collising = false;//是否触碰对象
	this.buttoning = false;//是否被点击
	
	this.collisObj = [];//碰撞到的对象
	
	//用于移动的数据信息
	this.moveSpeed = 0;//移动速度
	this.moveDegree = 0;//角度
	this.moveTime = 0;//移动的时长
	this.moveCTime = 0;//计数
	this.movePer = 0;//移动百分比
	
	this.moveMode = 0;//移动模式
	
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
	
	//用于透明的数据信息
	this.opSpeed = 0;//透明速度
	this.opTime = 0;//透明度时长
	this.opCTime = 0;//计数
	this.opPer = 0;//透明百分比
	this.opMode = 0;//透明模式
	
	this.startOp = 0;
	this.endOp = 0;
	
	//用于缩放的数据信息
	this.scaleZoomX = 1;
	this.scaleZoomY = 1;
	this.tempScaleX = 1;
	this.tempScaleY = 1;
	this.scaleSpeed = 0;//缩放速度
	this.scaleDegree = 0;//角度
	this.scaleTime = 0;//缩放的时长
	this.scaleCTime = 0;//计数
	this.scalePer = 0;//缩放百分比
	this.scaleMode = 0;//缩放模式
	
	this.startScaleX = 0;
	this.startScaleY = 0;
	this.endScaleX = 0;
	this.endScaleY = 0;
	
	
	//用于旋转的数据信息
	this.rotateSpeed = 0;//旋转速度以度数为单位
	this.rotateTime = 0;//旋转时长
	this.rotateCTime = 0;//旋转计数
	this.rotatePer = 0;//旋转百分比
	this.rotateMode = 0;//旋转模式
	
	this.startRotate = 0;//开始时的度数
	this.endRotate = 0;//结束时的度数
	this.isClockwise = false;//是否是顺时针
	this.rotateTurns = 0;//圈数
	this.realEndRotate = 0;//真实结束角度
	
	
	//碰撞检测框,左上右下,也是按钮的检测框
	this.frameWidth = 0;//选择框宽度
	this.frameHeight = 0;//选择框高度
	this.frameL = 0;
	this.frameU = 0;
	this.frameR = 0;
	this.frameD = 0;

	this.blackBitmap = new Bitmap(48,48);//未填充时的黑色位图
	this.blackBitmap.fillAll('rgba(0,0,0,1)');
	
	this.isInButton = false;//鼠标是否在按钮中
	this.isPressButton = false;//鼠标一直按着按钮
	this.selectBitmap = this.blackBitmap;//被选中的贴图
	this.buttonInScopeBitmap = this.blackBitmap;//鼠标在范围中的按钮贴图
	this.buttonDownBitmap = this.blackBitmap;//被按下按住的按钮贴图
	
	this.touchOffX = 0;//被点击距离中心的偏移X
	this.touchOffY = 0;//被点击距离中心的偏移Y
	
	this.delayTime = 0;//延迟时间
	this.isDelay = false;//延迟中
	
	this.pausing = false;//暂停中
	this.ignorePause = false;//忽略暂停 这个内容不会暂停
	

	//基础操作后先关的数据
	this.moveEndDisvisibleDelay = 0;
	this.moveEndDisvisible = false;
	this.scaleEndDisvisibleDelay = 0;
	this.scaleEndDisvisible = false;
	this.opacityEndDisvisibleDelay = 0;
	this.opacityEndDisvisible = false;
	this.rotateEndDisvisibleDelay = 0;
	this.rotateEndDisvisible = false;

	//基础造作结束后,会回调方法
	
	this.moveEndCallFunction = undefined;
	this.moveEndCallFunctionDelay = 0;
	this.moveEndCallFunctionParam = undefined
	
	this.scaleEndCallFunction = undefined;
	this.scaleEndCallFunctionDelay = 0;
	this.scaleEndCallFunctionParam = 0;
	
	this.opacityEndCallFunction = undefined;
	this.opacityEndCallFunctionDelay = 0;
	this.opacityEndCallFunctionParam = 0;
	
	this.rotateEndCallFunction = undefined;
	this.rotateEndCallFunctionDelay = 0;
	this.rotateEndCallFunctionParam = 0;
	
	//注意添加碰撞对象是可以直接通过OnCollision,InCollision,OutCollision来进行判断的
	//而添加对象组,只能识别InCollision
	
	//碰撞相关对象
	this.collisionObjArr = [];//碰撞对象检测组
	this.collisionObjsArr = [];//对象组合组
};



//添加 -- 碰撞对象检测组
Sprite_ZzyGCFBase.prototype.AddCollisionObj = function(obj)//添加检测:单个对象
{
	for(var i=0;i<this.collisionObjArr.length;i++)
	{
		if(!this.collisionObjArr[i])
		{
			this.collisionObjArr[i] = {};
			this.collisionObjArr[i].onCo = true;//首次碰撞
			this.collisionObjArr[i].inCo = false;
			this.collisionObjArr[i].outCo = false;
			this.collisionObjArr[i].obj = obj;
			return false;
		}
	}
	
	var tempObj = {
		onCo:true,
		inCo:false,
		outCo:false,
		obj:obj
	};
	
	this.collisionObjArr.push(tempObj);
	return true;
}

Sprite_ZzyGCFBase.prototype.AddCollisionObjs = function(objs)//添加对象组
{
	for(var i=0;i<this.collisionObjsArr.length;i++)
	{
		if(!this.collisionObjsArr[i])
		{
			this.collisionObjsArr[i] = objs;
			return false;
		}		
	}
	this.collisionObjsArr.push(objs);
	return true;
}

Sprite_ZzyGCFBase.prototype.RemoveCollisionObj = function(obj)//移除单个检测对象,如果不存在则返回false
{
	for(var i=0;i<this.collisionObjArr.length;i++)
	{
		if(this.collisionObjArr[i])
		{
			if(this.collisionObjArr[i].obj === obj)
			{
				this.collisionObjArr[i] = undefined;
				return true;				
			}
		}
	}
	return false;
}

Sprite_ZzyGCFBase.prototype.RemoveCollisionObjs = function(objs)
{
	for(var i=0;i<this.collisionObjsArr.length;i++)
	{
		if(this.collisionObjsArr[i] === objs)
		{
			this.collisionObjsArr[i] = undefined;
			return true;
		}
	}
	return false;	
}

Sprite_ZzyGCFBase.prototype.ClearCollisionObj = function()//清空
{
	this.collisionObjArr = [];
}

Sprite_ZzyGCFBase.prototype.ClearCollisionObjs = function()//清空
{
	this.collisionObjsArr = [];
}



//设置 -- 这将会开始运动
Sprite_ZzyGCFBase.prototype.MoveToOfSpeed = function(x,y,speed)//以一定的速度移动到指定的位置
{
	this.moving = true;
	this.startX = this.x;
	this.startY = this.y;
	this.endX = x;
	this.endY = y;
	this.moveSpeed = speed;
	this.moveMode = 1;
	this.moveDegree = Zzy.GCF.ATANARC(this.endX-this.startX,this.endY-this.startY);
	
}

Sprite_ZzyGCFBase.prototype.MoveToOfTime = function(x,y,time)//以一定的事件移动到指定位置
{
	this.moving = true;
	this.startX = this.x;
	this.startY = this.y;
	this.endX = x;
	this.endY = y;
	this.moveTime = time;
	this.moveCTime = 0;
	this.moveMode = 2;
	
}

Sprite_ZzyGCFBase.prototype.MoveToOfPer = function(x,y,per)//以百分比的方式移动,这是一个顺滑的过程
{
	
	this.moving = true;
	this.startX = this.x;
	this.startY = this.y;
	this.endX = x;
	this.endY = y;
	this.movePer = per;
	this.moveMode = 3;
}

Sprite_ZzyGCFBase.prototype.OpacityToOfSpeed = function(op,speed)
{
	this.opaciting = true;
	this.startOp = this.opacity;
	this.endOp = op;
	this.opSpeed = speed;
	this.opMode = 1;
}

Sprite_ZzyGCFBase.prototype.OpacityToOfTime = function(op,time)
{
	this.opaciting = true;
	this.startOp = this.opacity;
	this.endOp = op;
	this.opTime = time;
	this.opCTime = 0;
	this.opMode = 2;
	
}

Sprite_ZzyGCFBase.prototype.OpacityToOfPer = function(op,per)
{
	this.opaciting = true;
	this.startOp = this.opacity;
	this.endOp = op;
	this.opPer = per;
	this.opMode = 3;
}

Sprite_ZzyGCFBase.prototype.ScaleToOfSpeed = function(sx,sy,speed)
{
	this.scaling = true;
	this.startScaleX = this.scale.x / this.scaleZoomX;
	this.startScaleY = this.scale.y / this.scaleZoomY;
	this.tempScaleX = this.scale.x / this.scaleZoomX;
	this.tempScaleY = this.scale.y / this.scaleZoomY;
	this.endScaleX = sx;
	this.endScaleY = sy;
	this.scaleSpeed = speed;
	this.scaleDegree = Zzy.GCF.ATANARC(sx-this.scale.x,sy-this.scale.y);	
	this.scaleMode = 1;
}

Sprite_ZzyGCFBase.prototype.ScaleToOfTime = function(sx,sy,time)
{
	this.scaling = true;
	this.startScaleX = this.scale.x / this.scaleZoomX;
	this.startScaleY = this.scale.y / this.scaleZoomY;
	this.tempScaleX = this.startScaleX;
	this.tempScaleY = this.startScaleY;	
	this.endScaleX = sx;
	this.endScaleY = sy;
	this.scaleDegree = Zzy.GCF.ATANARC(sx-this.scale.x,sy-this.scale.y) - Math.PI / 2;
	this.scaleTime = time;
	this.scaleCTime = 0;
	this.scaleMode = 2;
}

Sprite_ZzyGCFBase.prototype.ScaleToOfPer = function(sx,sy,per)
{
	this.scaling = true;
	this.startScaleX = this.scale.x / this.scaleZoomX;
	this.startScaleY = this.scale.y / this.scaleZoomY;
	this.tempScaleX = this.startScaleX;
	this.tempScaleY = this.startScaleY;
	this.endScaleX = sx;
	this.endScaleY = sy;
	this.scalePer = per;
	this.scaleMode = 3;
}

Sprite_ZzyGCFBase.prototype.RotateToOfSpeed = function(rotate,turns,isClockwise,speed)
{

	this.rotating = true;
	this.rotateSpeed = speed * Math.PI / 180;//转换弧度
	this.startRotate = this.rotation;
	
	
	this.endRotate = rotate * Math.PI / 180;//计算弧度
	
	this.rotateTurns = turns;
	this.isClockwise = isClockwise;	
	
	var tempEnd = this.endRotate < 0 ? this.endRotate + Math.PI * 2 : this.endRotate;
	
	if(tempEnd > this.startRotate)//终点在起点前面
	{
		if(this.isClockwise)//顺时针
		{
			this.endRotate = tempEnd;
		}
		else//逆时针
		{
			this.endRotate = tempEnd - Math.PI * 2;
		}
	}
	else if(tempEnd < this.startRotate)//终点在起点后面
	{
		if(this.isClockwise)//顺时针
		{
			this.endRotate += Math.PI*2;
		}
		else//逆时针
		{
			this.endRotate = tempEnd - Math.PI * 2;
		}		
	}
	else
	{
		if(this.isClockwise)
		{
			if(this.endRotate<0)this.endRotate+=Math.PI*2;
		}
		else
		{
			if(this.endRotate>0)this.endRotate-=Math.PI*2;
		}
	}

	if(this.isClockwise)
	{
		this.realEndRotate = this.endRotate + turns * Math.PI * 2;
	}
	else
	{
		this.realEndRotate = this.endRotate - turns * Math.PI * 2;
	}

	this.rotateMode = 1;
}

Sprite_ZzyGCFBase.prototype.RotateToOfTime = function(rotate,turns,isClockwise,time)
{
	this.rotating = true;
	this.rotateTime = time;
	this.rotateCTime = 0;
	this.startRotate = this.rotation;
	this.endRotate = rotate * Math.PI / 180;//计算弧度
	this.rotateTurns = turns;
	this.isClockwise = isClockwise;
	if(this.isClockwise)
	{
		this.realEndRotate = this.endRotate + turns * Math.PI * 2;
	}
	else
	{
		this.realEndRotate = this.endRotate - turns * Math.PI * 2;
	}
	
	this.rotateMode = 2;	
}

Sprite_ZzyGCFBase.prototype.RotateToOfPer = function(rotate,turns,isClockwise,per)
{
	this.rotating = true;
	this.rotatePer = per;
	this.startRotate = this.rotation;
	this.endRotate = rotate * Math.PI / 180;//计算弧度
	this.rotateTurns = turns;
	this.isClockwise = isClockwise;
	if(this.isClockwise)
	{
		this.realEndRotate = this.endRotate + turns * Math.PI * 2;
	}
	else
	{
		this.realEndRotate = this.endRotate - turns * Math.PI * 2;
	}
	
	this.rotateMode = 3;
}

Sprite_ZzyGCFBase.prototype.setMoveEndDisvisible = function(delay)//在执行命令移动结束后会隐藏
{
	this.moveEndDisvisibleDelay = delay ? delay : 0;
	this.moveEndDisvisible = true;
}

Sprite_ZzyGCFBase.prototype.setScaleEndDisvisible = function(delay)//在执行命令缩放结束后会隐藏
{
	this.scaleEndDisvisibleDelay = delay ? delay : 0;
	this.scaleEndDisvisible = true;
}

Sprite_ZzyGCFBase.prototype.setOpacityEndDisvisible = function(delay)//在执行命令透明度结束后会隐藏
{
	this.opacityEndDisvisibleDelay = delay ? delay : 0;
	this.opacityEndDisvisible = true;
}

Sprite_ZzyGCFBase.prototype.setRotateEndDisvisible = function(delay)//在执行命令旋转结束后会隐藏
{
	this.rotateEndDisvisibleDelay = delay ? delay : 0;
	this.rotateEndDisvisible = true;
}

Sprite_ZzyGCFBase.prototype.setMoveEndCallFunction = function(fun,param,delay)
{

	this.moveEndCallFunctionDelay = delay ? delay : 0;
	this.moveEndCallFunctionParam = param;
	this.moveEndCallFunction = fun;	
}

Sprite_ZzyGCFBase.prototype.setScaleEndCallFunction = function(fun,param,delay)
{
	this.scaleEndCallFunctionDelay = delay ? delay : 0;
	this.scaleEndCallFunctionParam = param;
	this.scaleEndCallFunction = fun;
}

Sprite_ZzyGCFBase.prototype.setOpacityEndCallFunction = function(fun,param,delay)
{
	this.opacityEndCallFunctionDelay = delay ? delay : 0;
	this.opacityEndCallFunctionParam = param;
	this.opacityEndCallFunction = fun;
}

Sprite_ZzyGCFBase.prototype.setRotateEndCallFunction = function(fun,param,delay)
{
	this.rotateEndCallFunctionDelay = delay ? delay : 0;
	this.rotateEndCallFunctionParam = param;
	this.rotateEndCallFunction = fun;
}




//设置 -- 这将会停止运动
Sprite_ZzyGCFBase.prototype.stopMoving = function()
{
	this.moving = false;
}

Sprite_ZzyGCFBase.prototype.stopOpaciting = function()
{
	this.opaciting = false;
}

Sprite_ZzyGCFBase.prototype.stopScaling = function()
{
	this.scaling = false;
}

Sprite_ZzyGCFBase.prototype.stopRotating = function()
{
	this.rotating = false;
}

Sprite_ZzyGCFBase.prototype.stopAlling = function()
{
	this.moving = false;
	this.opaciting = false;
	this.scaling = false;
	this.rotating = false;
}


//设置 -- 这将会停止运动 同時不会调用函数指针,消失
Sprite_ZzyGCFBase.prototype.stopMovingClearAfter = function()
{
	this.stopMoving();
	this.moveEndCallFunctionDelay = 0;
	this.moveEndCallFunctionParam = undefined;
	this.moveEndCallFunction = undefined;
	this.moveEndDisvisibleDelay = 0;
	this.moveEndDisvisible = false;
}

Sprite_ZzyGCFBase.prototype.stopOpacitingClearAfter = function()
{
	this.stopOpaciting();
	this.opacityEndCallFunctionDelay = 0;
	this.opacityEndCallFunctionParam = undefined;
	this.opacityEndCallFunction = undefined;
	this.opacityEndDisvisibleDelay = 0;
	this.opacityEndDisvisible = false;
}

Sprite_ZzyGCFBase.prototype.stopScalingClearAfter = function()
{
	this.stopScaling();
	this.scaleEndCallFunctionDelay = 0;
	this.scaleEndCallFunctionParam = undefined;
	this.scaleEndCallFunction = undefined;
	this.scaleEndDisvisibleDelay = 0;
	this.scaleEndDisvisible = false;
}

Sprite_ZzyGCFBase.prototype.stopRotatingClearAfter = function()
{
	this.stopRotating();
	this.rotateEndCallFunctionDelay = 0;
	this.rotateEndCallFunctionParam = undefined;
	this.rotateEndCallFunction = undefined;
	this.rotateEndDisvisibleDelay = 0;
	this.rotateEndDisvisible = false;
}

//清理全部移动,同時不会调用函数指针,消失
Sprite_ZzyGCFBase.prototype.stopAllingClearAfter = function()
{
	this.stopMovingClearAfter();
	this.stopOpacitingClearAfter();
	this.stopScalingClearAfter();
	this.stopRotatingClearAfter();
}


Sprite_ZzyGCFBase.prototype.update = function() 
{
    Sprite.prototype.update.call(this);
   
    //暂停刷新 如果这个类不会被暂停,则不会进行暂停 ,或者自身被暂停
	if(Zzy.GCF.IsPausing() && !this.ignorePause || this.pausing)return false;
   
    //设置延迟延迟时间后,基础效果不会再执行
	this.updateData();//更新数据信息
	
    if(!this.isInDelaying())
	{
		if(this.isCanMoving) this.updateMoving();//更新移动
		if(this.isCanScaling) this.updateScaling();//更新缩放
		if(this.isCanOpaciting) this.updateOpaciting();//更新透明度
		if(this.isCanRotating) this.updateRotating();//更新旋转		
	}
	
	if(this.isNeedUpdateFrame()) this.updateFrame();//更新选择框
	if(this.isCanSelect) this.updateSelect();//更新被选择
	if(this.isCanCollision) this.updateCollision();//更新发生碰撞
	if(this.isCanButton) this.updateButton();//更新按钮效果
	
	return true;
};

Sprite_ZzyGCFBase.prototype.updateData = function()
{
	if(this.isInDelaying())
	{
		this.delayTime--;
		if(this.delayTime <= 0)
		{
			this.isDelaying = false;//关闭延迟
			this.delayTime = 0;
		}
	}
	
}



Sprite_ZzyGCFBase.prototype.updateMoveEndDisvisible = function()
{
	
	if(this.moveEndDisvisible)
	{
		
		if(this.moveEndDisvisibleDelay > 0)
		{this.moveEndDisvisibleDelay--;}
		else
		{
			this.moveEndDisvisibleDelay = 0;
			this.moveEndDisvisible = false;
			this.visible = false;
		}
	}	
}

Sprite_ZzyGCFBase.prototype.updateOpacityEndDisvisible = function()
{
	if(this.opacityEndDisvisible)
	{
		
		if(this.opacityEndDisvisibleDelay > 0)
		{this.opacityEndDisvisibleDelay--;}
		else
		{
			this.opacityEndDisvisibleDelay = 0;
			this.opacityEndDisvisible = false;
			this.visible = false;
		}
	}		
}


Sprite_ZzyGCFBase.prototype.updateRotateEndDisvisible = function()
{
	if(this.rotateEndDisvisible)
	{
		if(this.rotateEndDisvisibleDelay > 0)
		{this.rotateEndDisvisibleDelay--;}
		else
		{
			this.rotateEndDisvisibleDelay = 0;
			this.rotateEndDisvisible = false;
			this.visible = false;
		}
	}		
}

Sprite_ZzyGCFBase.prototype.updateScaleEndDisvisible = function()
{
	if(this.scaleEndDisvisible)
	{
		if(this.scaleEndDisvisibleDelay > 0)
		{this.scaleEndDisvisibleDelay--;}
		else
		{
			this.scaleEndDisvisibleDelay = 0;
			this.scaleEndDisvisible = false;
			this.visible = false;
		}
	}		
}

Sprite_ZzyGCFBase.prototype.updateMoveEndCallFunction = function()
{

	if(!!this.moveEndCallFunction)
	{		
		if(this.moveEndCallFunctionDelay > 0)
		{this.moveEndCallFunctionDelay--;}
		else
		{
			this.moveEndCallFunctionDelay = 0;
			this.moveEndCallFunction(this.moveEndCallFunctionParam);//调用回调语法
			this.moveEndCallFunction = undefined;
			this.moveEndCallFunctionParam = undefined;

		}
	}
}

Sprite_ZzyGCFBase.prototype.updateScaleEndCallFunction = function()
{
	if(!!this.scaleEndCallFunction)
	{
		if(this.scaleEndCallFunctionDelay > 0)
		{this.scaleEndCallFunctionDelay--;}
		else
		{
			this.scaleEndCallFunctionDelay = 0;
			this.scaleEndCallFunction(this.scaleEndCallFunctionParam);//调用回调语法
			this.scaleEndCallFunction = undefined;
			this.scaleEndCallFunctionParam = undefined;
		}
	}
}

Sprite_ZzyGCFBase.prototype.updateOpacityEndCallFunction = function()
{
	if(!!this.opacityEndCallFunction)
	{
		if(this.opacityEndCallFunctionDelay > 0)
		{this.opacityEndCallFunctionDelay--;}
		else
		{
			this.opacityEndCallFunctionDelay = 0;
			this.opacityEndCallFunction(this.opacityEndCallFunctionParam);//调用回调语法
			this.opacityEndCallFunction = undefined;
			this.opacityEndCallFunctionParam = undefined;
		}
	}
}

Sprite_ZzyGCFBase.prototype.updateRotateEndCallFunction = function()
{
	if(!!this.rotateEndCallFunction)
	{
		if(this.rotateEndCallFunctionDelay > 0)
		{this.rotateEndCallFunctionDelay--;}
		else
		{
			this.rotateEndCallFunctionDelay = 0;
			this.rotateEndCallFunction(this.rotateEndCallFunctionParam);//调用回调语法
			this.rotateEndCallFunction = undefined;
			this.rotateEndCallFunctionParam = undefined;
		}
	}
}



Sprite_ZzyGCFBase.prototype.updateMoving = function()
{
	if(!this.moving)
	{
		this.updateMoveEndCallFunction();
		this.updateMoveEndDisvisible();
		return;
	}
	
	switch(this.moveMode)
	{
		case 1://速度
	    this.x += this.moveSpeed * Math.cos(this.moveDegree);
        this.y += this.moveSpeed * Math.sin(this.moveDegree);
		if(this.x >= this.endX - (this.moveSpeed) && this.x <= this.endX + (this.moveSpeed) && this.y >= this.endY - (this.moveSpeed) && this.y <= this.endY + (this.moveSpeed))
		{
			this.x = this.endX;
			this.y = this.endY;
			this.moving = false;
		}
		
		break;
		
		case 2://时间
		this.moveCTime++;
		this.x = Math.floor(this.startToEndOfTime(this.startX,this.endX,this.moveTime,this.moveCTime));
		this.y = Math.floor(this.startToEndOfTime(this.startY,this.endY,this.moveTime,this.moveCTime));
		if(this.IsMoveDestination()){this.moving = false;}//到达
		break;
		
		case 3://百分比
		this.x = this.startToEndOfPer(this.x,this.endX,this.movePer,1);
		this.y = this.startToEndOfPer(this.y,this.endY,this.movePer,1); 
		if(this.IsMoveDestination()){this.moving = false;}//到达
		break;
	}
}


Sprite_ZzyGCFBase.prototype.updateScaling = function()
{
	if(!this.scaling)
	{
		this.updateScaleEndDisvisible();
		this.updateScaleEndCallFunction();
		return;
	}

	switch(this.scaleMode)
	{
		case 1://速度
	    this.tempScaleX += this.scaleSpeed * Math.cos(this.scaleDegree);
        this.tempScaleY += this.scaleSpeed * Math.sin(this.scaleDegree);
		if(this.tempScaleX >= this.endScaleX - this.scaleSpeed && 
		this.tempScaleX <= this.endScaleX + this.scaleSpeed && 
		this.tempScaleY >= this.endScaleY - this.scaleSpeed &&
		this.tempScaleY <= this.endScaleY + this.scaleSpeed)
		{
			this.scale.x = this.endScaleX * this.scaleZoomX;
			this.scale.y = this.endScaleY * this.scaleZoomY;
			this.scaling = false;
		}
		else
		{
			this.scale.x = this.tempScaleX * this.scaleZoomX;
			this.scale.y = this.tempScaleY * this.scaleZoomY;			
		}

		break;
		
		case 2://时间
		this.scaleCTime++;
		this.tempScaleX = this.startToEndOfTime(this.startScaleX,this.endScaleX,this.scaleTime,this.scaleCTime);
		this.tempScaleY = this.startToEndOfTime(this.startScaleY,this.endScaleY,this.scaleTime,this.scaleCTime);
		if(this.IsScaleDestination())
		{
			this.scaling = false;
			this.scale.x = this.endScaleX * this.scaleZoomX;
			this.scale.y = this.endScaleY * this.scaleZoomY;				
		}
		else
		{
			this.scale.x = this.tempScaleX * this.scaleZoomX;
			this.scale.y = this.tempScaleY * this.scaleZoomY;				
		}
	
		break;
		
		case 3://百分比
		this.tempScaleX = this.startToEndOfPer(this.tempScaleX,this.endScaleX,this.scalePer,0.01);
		this.tempScaleY = this.startToEndOfPer(this.tempScaleY,this.endScaleY,this.scalePer,0.01);
		if(this.IsScaleDestination())
		{
			this.scaling = false;
			this.scale.x = this.endScaleX * this.scaleZoomX;
			this.scale.y = this.endScaleY * this.scaleZoomY;			
		}
		else
		{
			this.scale.x = this.tempScaleX * this.scaleZoomX;
			this.scale.y = this.tempScaleY * this.scaleZoomY;			
		}
		break;
	}
}

Sprite_ZzyGCFBase.prototype.updateOpaciting = function()
{
	if(!this.opaciting)
	{
		this.updateOpacityEndCallFunction();
		this.updateOpacityEndDisvisible();
		return;
	}
	
	
	switch(this.opMode)
	{
		case 1://速度
		this.opacity = this.startToEndOfSpeed(this.opacity,this.endOp,this.opSpeed);
		if(this.IsOpacityDestination()){this.opaciting = false;}
		break;
		
		case 2://时间
		this.opCTime++;
		this.opacity = this.startToEndOfTime(this.startOp,this.endOp,this.opTime,this.opCTime);
		if(this.IsOpacityDestination()){this.opaciting = false;}
		break;
		
		case 3://百分比
		this.opacity = this.startToEndOfPer(this.opacity,this.endOp,this.opPer,0.1);
		if(this.IsOpacityDestination()){this.opaciting = false;}
		break;
	}	
	
}

Sprite_ZzyGCFBase.prototype.updateRotating = function()
{
	if(!this.rotating)
	{
		this.updateRotateEndCallFunction();
		this.updateRotateEndDisvisible();
		return;
	}
	
	switch(this.rotateMode)
	{
		case 1://速度
		this.rotation = this.startToEndOfSpeed(this.rotation,this.realEndRotate,this.rotateSpeed);
		if(this.IsRotateDestination())//到达
		{
			this.rotation = Zzy.GCF.LimitRotateRange(this.rotation);
			this.rotating = false;
		}
		break;
		
		case 2://时间
		this.rotateCTime++;
		this.rotation = this.startToEndOfTime(this.startRotate,this.realEndRotate,this.rotateTime,this.rotateCTime);
		if(this.IsRotateDestination())
		{
			this.rotation = Zzy.GCF.LimitRotateRange(this.rotation);
			this.rotating = false;
		}
		break;
		
		case 3://百分比
		this.rotation = this.startToEndOfPer(this.rotation,this.realEndRotate,this.rotatePer,0.01);
		if(this.IsRotateDestination())
		{
			this.rotation = Zzy.GCF.LimitRotateRange(this.rotation);
			this.rotating = false;			
		}
		break;
	}
}


Sprite_ZzyGCFBase.prototype.startToEndOfPer = function(start,end,per,min)//开始到结束的比例
{
	if(start === end)return end;
	if((Math.abs(end - start)) < min)return end;
	
	var distance = (end-start)*per*0.01;
	return distance + start;
}

Sprite_ZzyGCFBase.prototype.startToEndOfSpeed = function(start,end,speed)
{
	if(start === end)return end;
	if(start < end)
	{
		var distance = start + speed;
		return (distance > end ? end : distance);
	}
	else
	{
		var distance = start - speed;
		return (distance < end ? end : distance);
	}
}

Sprite_ZzyGCFBase.prototype.startToEndOfTime = function(start,end,time,ctime)
{
	if(start === end)return end;
	
	var distance = (end - start) * ctime / time;
	return start + distance;
}

//这个方法会设置操作比例,他会改变图片应该有的比例大小,在更新缩放是也会应用
Sprite_ZzyGCFBase.prototype.setScaleZoom = function(scaleX,scaleY)
{
	this.scaleZoomX = scaleX;
	this.scaleZoomY = scaleY;
	
	this.scale.x *= this.scaleZoomX;
	this.scale.y *= this.scaleZoomY;
}

Sprite_ZzyGCFBase.prototype.setScale = function(scaleX,scaleY)
{
	this.scale.x = scaleX;
	this.scale.y = scaleY;
	this.scale.x *= this.scaleZoomX;
	this.scale.y *= this.scaleZoomY;
}




Sprite_ZzyGCFBase.prototype.updateFrame = function()
{
	if(!this.bitmap)return;
	this.frameWidth = this.bitmap.width * this.scale.x;
	this.frameHeight = this.bitmap.height * this.scale.y;
	
	this.frameL = Math.round(this.x - this.frameWidth / 2);
	this.frameR = this.frameL + this.frameWidth;
	this.frameU = Math.round(this.y - this.frameHeight / 2);
	this.frameD = this.frameU + this.frameHeight;
}


Sprite_ZzyGCFBase.prototype.updateSelect = function()//基础选择为点选切换,点中会被选取,再次点击会反向
{
	if(TouchInput.isTriggered())//按下选择
	{
		var pt = {x:TouchInput.x,y:TouchInput.y};
		var rect = {left:this.frameL,right:this.frameR,up:this.frameU,down:this.frameD};
		if(Zzy.GCF.PtInRect(pt,rect))
		{
			this.ExecuteSelect();//执行选择
		}
	}
}


Sprite_ZzyGCFBase.prototype.updateCollision = function()//碰撞
{
	//检测碰撞
	//this.collisionObjArr = [];//碰撞对象检测组
	if(!this.visible)return;//隐身则不碰撞
	for(var i=0;i<this.collisionObjArr.length;i++)
	{
		
		if(!this.collisionObjArr[i])continue;//不存在对象
		if(!this.collisionObjArr[i].obj.visible)continue;//对象未显示
		if(!this.collisionObjArr[i].obj.isCanCollision)continue;//对象不可以碰撞
		// var r1 = {left:this.frameL,right:this.frameR,up:this.frameU,down:this.frameD};
		// var r2 = {left:this.collisionObjArr[i].obj.frameL,
			      // right:this.collisionObjArr[i].obj.frameR,
				  // up:this.collisionObjArr[i].obj.frameU,
				  // down:this.collisionObjArr[i].obj.frameD};
		// if(Zzy.GCF.CheckRectCollision(r1,r2))
		// {
			// //碰撞检测效果
			// 
		// }
		//OBB碰撞检测
		if(this.JudgOBBCollision(this.collisionObjArr[i].obj))
		{
			//触碰到,检测是否为第一次触碰
			if(this.collisionObjArr[i].onCo)
			{
				this.collisionObjArr[i].onCo = false;//首次碰撞
				this.collisionObjArr[i].inCo = true;//连续碰撞开启
				this.OnCollision(this.collisionObjArr[i].obj);//碰撞到了对象
			}
			else if(this.collisionObjArr[i].inCo)//持续碰撞
			{
				this.InCollision(this.collisionObjArr[i].obj);//碰撞到了对象
			}
		}
		else
		{
			if(this.collisionObjArr[i].inCo)//离开碰撞判断
			{
				this.collisionObjArr[i].onCo = true;
				this.collisionObjArr[i].inCo = false;
				this.collisionObjArr[i].outCo = true;
				
				if(this.collisionObjArr[i].outCo)
				{
					this.collisionObjArr[i].outCo = false;
					this.OutCollision(this.collisionObjArr[i].obj);//碰撞到了对象
				}
			}
		}
	}
	
	
	//this.collisionObjsArr = [];//对象组合组
	for(var i=0;i<this.collisionObjsArr.length;i++)
	{
		if(!this.collisionObjsArr[i])continue;
		for(var j=0;j<this.collisionObjsArr[i].length;j++)
		{
			//对象组对象
			if(!this.collisionObjsArr[i][j])continue;//不存在对象
			if(!this.collisionObjsArr[i][j].visible)continue;//对象未显示
			if(!this.collisionObjsArr[i][j].isCanCollision)continue;//对象不可以碰撞	
			if(this.JudgOBBCollision(this.collisionObjsArr[i][j]))
			{
				this.InCollision(this.collisionObjArr[i][j]);//碰撞到了对象
			}
		}
	}
}




Sprite_ZzyGCFBase.prototype.OnCollision = function(obj)//首次碰撞接口
{
	
}

Sprite_ZzyGCFBase.prototype.InCollision = function(obj)//持续碰撞接口
{
	
}

Sprite_ZzyGCFBase.prototype.OutCollision = function(obj)//离开碰撞接口
{
	
}





Sprite_ZzyGCFBase.prototype.Dot = function(axisA,axisB)//向量在这个单位向量上的投影长度
{ 
     //注意axisA和axisB是向量,存放数据是坐标系 [x,y] 是axisA向量在，单位向量axisB上投影的长度。
     return Math.abs(axisA[0] * axisB[0] + axisA[1] * axisB[1]); 
}


//根据垂直公式:向量1 · 向量2 = 0
//获取一个矩形的两条检测轴的单位向量

Sprite_ZzyGCFBase.prototype.GetAxisX = function(rotation)//获取x检测轴的单位向量
{
	var GetAxisX = [];
	GetAxisX[0] = Math.cos(rotation);
	GetAxisX[1] = Math.sin(rotation);
	return GetAxisX;
}

Sprite_ZzyGCFBase.prototype.GetAxisY = function(rotation)//获取y检测轴的单位向量
{
	var GetAxisY = [];
	GetAxisY[0] = -Math.sin(rotation);
	GetAxisY[1] = Math.cos(rotation);
	
	return GetAxisY;
}


Sprite_ZzyGCFBase.prototype.GetProjectionRadius = function(axis) 
{  
	//获取两条检测轴的单位向量
    var axisX = this.GetAxisX(this.rotation);
	var axisY = this.GetAxisY(this.rotation);
   
    //获取轴半径
    var halfWidth = this.bitmap.width/2;
    var halfHeight = this.bitmap.height/2;
   
    //根据投影获取比例长度
    var projectionAxisX = this.Dot(axis, axisX);  
    var projectionAxisY = this.Dot(axis, axisY);  

   
    //返回实际轴半径长度
	
    return halfWidth * projectionAxisX + halfHeight * projectionAxisY;  

}


//检测四个轴的碰撞情况
Sprite_ZzyGCFBase.prototype.JudgOBBCollision = function(obbObj) 
{  
	//中心点距离向量
    var centerDistanceVertor = [];//{x,y};
	centerDistanceVertor[0] = this.GetBitmapCenterX() - obbObj.GetBitmapCenterX();
	centerDistanceVertor[1] = this.GetBitmapCenterY() - obbObj.GetBitmapCenterY();
	
    var axes = [];//四个轴的轴心
    axes[0] = this.GetAxisX(this.rotation);
	axes[1] = this.GetAxisY(this.rotation);
	axes[2] = obbObj.GetAxisX(obbObj.rotation);
	axes[3] = obbObj.GetAxisY(obbObj.rotation);
	
	
	
   
    //判断四个轴向的碰撞情况
    for(var i = 0; i < axes.length; i++) 
	{  

        if(this.GetProjectionRadius(axes[i]) + obbObj.GetProjectionRadius(axes[i])   
                <= this.Dot(centerDistanceVertor, axes[i]))
		{
		    
            return false;  
        }  
    }  
   //如果投影长度小于等于半径投影,代表相撞了
    return true;  
}  




//因为anchor的值不同,使得需要对位置进行转换
Sprite_ZzyGCFBase.prototype.GetBitmapCenterX = function()//获取中心点
{
	return this.x + (this.bitmap.width * (0.5 - this.anchor.x) * Math.sin(this.rotation));
}

Sprite_ZzyGCFBase.prototype.GetBitmapCenterY = function()
{
	return this.y + (this.bitmap.height * (0.5 - this.anchor.y) * Math.cos(this.rotation));
}



Sprite_ZzyGCFBase.prototype.updateButton = function()//按钮按下的消息效果
{
	//检测鼠标是否在Button中
	var pt = {x:Zzy.GCF.MoveX,y:Zzy.GCF.MoveY};
	
	var rect = {left:this.frameL,right:this.frameR,up:this.frameU,down:this.frameD};	
	
	var pressOk = false;//是否点钟了按钮
	if(Zzy.GCF.PtInRect(pt,rect))
	{
		if(TouchInput.isTriggered())
		{
			this.ExecuteButton(1);//鼠标按下
		}
		if(TouchInput.isReleased())//在范围内点中了按钮
		{
			pressOk = true;
			this.ExecuteButton(4);
		}		
		else
		{
			this.ExecuteButton(2);
		}
	}
	else
	{
		this.ExecuteButton(3);
	}
	
	if(!pressOk && TouchInput.isReleased())
	{
		this.ExecuteButton(5);
	}
	
	
		
}

Sprite_ZzyGCFBase.prototype.ExecuteButton = function(code)
{
	switch(code)
	{
		case 1://代表在范围内按下了鼠标
			if(!this.isPressButton)
			{
				this.isPressButton = true;
				this.bitmap = this.buttonDownBitmap;
			}
		break;
		case 2://代表在矩形范围内,但没有点击
			if(!this.isInButton)
			{
				this.isInButton = true;
				this.bitmap = this.buttonInScopeBitmap;
			}
		break;
		case 3:
			if(this.isInButton && !this.isPressButton)
			{
				this.isInButton = false;
				this.bitmap = this.originBitmap;
			}		
		break;
		case 4://这里是点中了按钮
			this.isInButton = false;
			this.isPressButton = false;		
			this.OnClick();
			this.bitmap = this.buttonInScopeBitmap;
		break;
		case 5://这里是没有点中按钮
			this.isInButton = false;
			this.isPressButton = false;
			this.bitmap = this.originBitmap;			
		break;
	}
	
}

Sprite_ZzyGCFBase.prototype.ExecuteSelect = function()//执行选择
{
	if(this.selecting)//切换图片,相应事件
	{
		this.selecting = false;
		this.bitmap = this.originBitmap;
		this.OutSelect();
	}
	else
	{
		this.selecting = true;
		this.bitmap = this.selectBitmap;		
		this.OnSelect();
	}
}

Sprite_ZzyGCFBase.prototype.isInDelaying = function()
{
	return this.isDelaying;
}

Sprite_ZzyGCFBase.prototype.setDelay = function(delay)
{
	this.delayTime = delay;//延迟时间
	this.isDelaying = true;
}

Sprite_ZzyGCFBase.prototype.addDelay = function(delay)
{
	this.delayTime += delay;//延迟时间
	this.isDelaying = true;
}
Sprite_ZzyGCFBase.prototype.subDelay = function(delay)
{
	this.delayTime -= delay;//延迟时间
	if(this.delayTime < 0)this.delayTime = 0;
}


Sprite_ZzyGCFBase.prototype.setBitmap = function(bitmap)
{
	this.bitmap = bitmap;
	this.originBitmap = bitmap;
}




Sprite_ZzyGCFBase.prototype.OnSelect = function()//被选中,用于子类的调用
{
	
}

Sprite_ZzyGCFBase.prototype.OutSelect = function()//被取消选择,用于子类的调用
{
	
}

Sprite_ZzyGCFBase.prototype.OnClick = function()//按钮被点,用于子类的调用
{
	
}


Sprite_ZzyGCFBase.prototype.IsMoveDestination = function()//移动是否到达目的地
{
	return (this.x === this.endX && this.y === this.endY);
}

Sprite_ZzyGCFBase.prototype.IsOpacityDestination = function()//透明倒达目的地
{
	return (this.opacity === this.endOp);
}

Sprite_ZzyGCFBase.prototype.IsScaleDestination = function()
{
	return (this.tempScaleX === this.endScaleX && this.tempScaleY === this.endScaleY);
}

Sprite_ZzyGCFBase.prototype.IsRotateDestination = function()//完成
{
	return (this.rotation === this.realEndRotate);
}



//是否处于繁忙中
Sprite_ZzyGCFBase.prototype.isBusy = function()
{
	if(this.moving || this.scaling || this.opaciting || this.rotating){return true;}
	return false;
}

//是否需要更新选择框
Sprite_ZzyGCFBase.prototype.isNeedUpdateFrame = function()
{
	if(this.isCanSelect || this.isCanCollision || this.isCanButton)return true;
	return false;
}


Sprite_ZzyGCFBase.prototype.setAngle = function(angle)//设置旋转的角度
{
	angle = angle ? angle : 0;
	this.rotation = angle * Math.PI / 180;
}

Sprite_ZzyGCFBase.prototype.setPosition = function(x,y)
{
	this.x = x;
	this.y = y;
}









//==========================================================================
//Particle_ZzyGCFBase
//==========================================================================
//粒子对象


function Particle_ZzyGCFBase() {
    this.initialize.apply(this, arguments);
}

Particle_ZzyGCFBase.prototype = Object.create(PIXI.Container.prototype);
Particle_ZzyGCFBase.prototype.constructor = Particle_ZzyGCFBase;

Particle_ZzyGCFBase.prototype.initialize = function(windowPointer,fileName)//指针,粒子图片名称
{
    PIXI.Container.call(this);

	this.windowPointer = windowPointer;//获得窗口指针
	
	this.spriteArr = [];//存放粒子的数组



	
	//-------------------创造器信息---------------------
	this.CID = 0;//产生粒子对象时的ID标记,这算是数量记录
	this.UID = 0;//产生粒子对象的唯一ID标记
	this.createrType = this.defaultCreaterType();//创造器类型
	this.createrRange = this.defaultCreaterRange();//创造器范围,默认是一个点	
	this.createrFrame = this.defaultCreaterFrame();//创造器每次产生所需帧数
	this.createrCount = this.defaultCreaterCount();//创造器每次产生的数量
	this.createrFrameRandPer = this.defaultCreaterFrameRandPer();//产生帧数扰乱
	this.createrCountRandPer = this.defaultCreaterCountRandPer();//数量扰乱
	this.createrOffsetX = this.defaultCreaterOffsetX();//默认偏移位置,锚点
	this.createrOffsetY = this.defaultCreaterOffsetY();//默认偏移位置
	this.createrIsDynHue = this.defaultCreaterIsDynHue();//默认动态偏色
	this.createrDynHueSpeed = this.defaultCreaterDynHueSpeed();//默认动态变色
	
	this.isPause = false;//是否暂停
	this.tFrame = 0;//临时值
	this.tCount = 0;//临时确认数量
	
	
	
	//----------------粒子基本信息---------------
	//速度
	this.partSpeed = 0;//移动速度
	this.partSpeedRandPer = 0;//移动速度扰乱
	//角度:移动
	this.partRotateDir = 0;//角度方向
	this.partRotateArea = 0;//角度区间
	//角度:图片精灵
	this.partSprRotateDir = 0;
	this.partSprRotateArea = 0;//角度区间
	this.partIsfollowDir = false;//是否跟随移动角度
	//缩放
	this.partScaleX = 0;
	this.partScaleY = 0;
	this.partScalePer = 0;
	this.partIsEqualScale = false;//是否等比缩放
	//透明
	this.partOpacity = 0;
	this.partOpacityRandPer = 0;//透明值扰乱
	//-----------------------------------------
	

	
	this.bitmapFileName = fileName;
	this.partBitmap = undefined;
	this.CreateBitmap();//粒子图片
	
	
	this.StartUp();//启动
}


Particle_ZzyGCFBase.prototype.setPartSpriteInfo = function()//设置信息,这个函数可以用来重写
{
	this.partSpeed = 5;//移动速度
	this.partSpeedRandPer = 20;//移动速度扰乱
	//角度:移动
	this.partRotateDir = 0;//角度方向
	this.partRotateArea = 360;//角度区间
	//角度:图片精灵
	this.partSprRotateDir = 0;
	this.partSprRotateArea = 360;//角度区间
	this.partIsfollowDir = true;//是否跟随移动角度
	//缩放
	this.partScaleX = 1;
	this.partScaleY = 1;
	this.partScaleRandPer = 20;
	this.partIsEqualScale = true;//是否等比缩放
	//透明
	this.partOpacity = 255;
	this.partOpacityRandPer = 0;//透明值扰乱
	//时长-帧数
	this.partTime = 60;
	this.partTimeRandPer = 0;//时长扰乱
}




Particle_ZzyGCFBase.prototype.CreateBitmap = function()
{
	this.partBitmap = ImageManager.loadPicture(this.bitmapFileName);
}



Particle_ZzyGCFBase.prototype.StartUp = function()//启动
{
	//计算t信息
	this.setPartSpriteInfo();//设置粒子的参数信息
	this.CreaterNextWait();
}


Particle_ZzyGCFBase.prototype.calculationTFrame = function()//计算出帧数扰乱
{
	this.tFrame = Zzy.GCF.RandomIntTheValueOfPer(this.createrFrame,this.createrFrameRandPer);
	this.tFrame = Math.max(1,this.tFrame);
}


Particle_ZzyGCFBase.prototype.calculationTCount = function()//计算数量信息
{
	this.tCount = Zzy.GCF.RandomIntTheValueOfPer(this.createrCount,this.createrCountRandPer);
}


Particle_ZzyGCFBase.prototype.setPause = function(pause)
{
	this.isPause = pause;
}

Particle_ZzyGCFBase.prototype.setStop = function()
{
	this.isPause = true;
}

Particle_ZzyGCFBase.prototype.setContinue = function()
{
	this.isPause = false;
}


Particle_ZzyGCFBase.prototype.update = function() 
{
    if(this.NotUpdate())return;
	
	this.updateCreaterDynHue();//更新动态色相
	this.updateCreaterSpawn();//更新创造器
};





Particle_ZzyGCFBase.prototype.updateCreaterDynHue = function()
{
	if(!this.createrIsDynHue)return;
	this.partBitmap.rotateHue(this.createrDynHueSpeed);
	
}


Particle_ZzyGCFBase.prototype.updateCreaterSpawn = function()
{
	if(this.tFrame > 0)//满足产生对象条件
	{this.tFrame--;}
	else
	{
		this.tFrame = 0;
		//通过数量遍历产生对象
		for(var i=0;i<this.tCount;i++)
		{
			var pSpr = this.RequestSprite();//获得一个精灵对象
			pSpr.bitmap = this.partBitmap;//设置位图
			this.MakeRandomInfo(pSpr);//产生随机性
			this.MakeSpecialInfo(pSpr);//设置特殊数据信息
			pSpr.StartUp();//启动
		}
		
		this.CreaterNextWait();//计算下一次所需要的信息
	}
}

Particle_ZzyGCFBase.prototype.CreaterNextWait = function()
{
	this.calculationTFrame();
	this.calculationTCount();	
}




Particle_ZzyGCFBase.prototype.MakeRandomInfo = function(Spr)
{
	
	this.MakeRandomPos(Spr);//首先修改位置
	this.MakeRandomSpeed(Spr);//修改速度
	this.MakeRandomRotate(Spr);//角度
	this.MakeRandomSprRotate(Spr);//图像角度
	this.MakeRandomScale(Spr);//修改缩放
	this.MakeRandomOpacity(Spr);//修改透明度
	this.MakeRandomTime(Spr);//随机时长
}

Particle_ZzyGCFBase.prototype.MakeSpecialInfo = function(pSpr)
{

}





Particle_ZzyGCFBase.prototype.MakeRandomRotate = function(Spr)//角度
{

	var angle = Zzy.GCF.RandomTheValueOfRange(this.partRotateDir,this.partRotateArea);
	Spr.startRotate = Zzy.GCF.AngleToRadian(angle);

}

Particle_ZzyGCFBase.prototype.MakeRandomSprRotate = function(Spr)//图像角度
{
	var angle = Zzy.GCF.RandomTheValueOfRange(this.partSprRotateDir,this.partSprRotateArea);
	Spr.startSprRotate = Zzy.GCF.AngleToRadian(angle);
	Spr.partIsfollowDir = this.partIsfollowDir;
}

Particle_ZzyGCFBase.prototype.MakeRandomOpacity = function(Spr)//修改随机缩放
{
	Spr.startOpactiy = Zzy.GCF.RandomTheValueOfPer(this.partOpacity,this.partOpacityRandPer);
}

Particle_ZzyGCFBase.prototype.MakeRandomTime = function(Spr)//随机时长
{
	Spr.startTime = Zzy.GCF.RandomTheValueOfPer(this.partTime,this.partTimeRandPer);
}




Particle_ZzyGCFBase.prototype.MakeRandomScale = function(Spr)//修改随机缩放
{	
	Spr.startScaleX	= Zzy.GCF.RandomTheValueOfPer(this.partScaleX,this.partScaleRandPer);
	if(this.partIsEqualScale)
	{
		Spr.startScaleY = Spr.startScaleX * (this.partScaleY / this.partScaleX);
	}
	else
	{
		Spr.startScaleY = Zzy.GCF.RandomTheValueOfPer(this.partScaleX,this.partScaleRandPer);
	}
}

Particle_ZzyGCFBase.prototype.MakeRandomSpeed = function(Spr)//修改随机速度
{
	Spr.startSpeed = Zzy.GCF.RandomTheValueOfPer(this.partSpeed,this.partSpeedRandPer);
}





Particle_ZzyGCFBase.prototype.MakeRandomPos = function(Spr)//制作随机位置
{

	switch(this.createrType)
	{
		case 1://代表矩形范围
			Spr.x = Zzy.GCF.RandomIntArea(this.createrRange.left,this.createrRange.right)+this.createrOffsetX;
			Spr.y = Zzy.GCF.RandomIntArea(this.createrRange.up,this.createrRange.down)+this.createrOffsetY;
		break;
		
		case 2://代表椭圆形范围
			var rateY = (this.createrRange.down-this.createrRange.up)/(this.createrRange.right-this.createrRange.left);
			
			//获取半径
			var radius = (this.createrRange.right-this.createrRange.left)/2;
			var randomR = Math.random()*radius;
			//获取角度
			var angle = Math.random() * Math.PI * 2;
			
			Spr.x = Math.round(Math.sin(angle)*randomR)+this.createrOffsetX;
			Spr.y = Math.round(Math.cos(angle)*randomR*rateY)+this.createrOffsetY;
		break;
	}
}




Particle_ZzyGCFBase.prototype.NotUpdate = function()
{
	if(this.isPause)return true;//是否被暂停
	
	return false;
}


Particle_ZzyGCFBase.prototype.RequestSprite = function()//申请精灵对象
{
	//遍历
	for(var i=0;i<this.spriteArr.length;i++)
	{
		if(this.spriteArr[i] && !this.spriteArr[i].visible)
		{
			this.spriteArr[i].visible = true;
			this.spriteArr[i].ResetInfo();//重置信息
			
			this.spriteArr[i].CID = this.CID++;
			return this.spriteArr[i];
		}
	}
	//否则需要申请对象
	
	var spr = this.CreateAParticleSpr();
	this.spriteArr.push(spr);
	this.windowPointer.addChild(spr);//添加到窗口中
		
	spr.UID = this.UID++;
	spr.CID = this.CID++;
	return spr;
}


Particle_ZzyGCFBase.prototype.CreateAParticleSpr = function()//这个方法可以用重写创造其他粒子类的效果
{
	return new PSprite_ZzyGCFBase(this);
}


Particle_ZzyGCFBase.prototype.RandomSprInfo = function(spr)//随机粒子的信息
{
	
	
}


Particle_ZzyGCFBase.prototype.createASprite = function()//创造一个精灵
{
	var spr = this.RequestSprite();//获取一个精灵对象
	this.RandomSprInfo(spr);//随机spr的信息
}


Particle_ZzyGCFBase.prototype.defaultCreaterFrame = function()
{
	return 6;//6帧会响应粒子产生情况
}

Particle_ZzyGCFBase.prototype.defaultCreaterCount = function()
{
	return 2;//每次产生粒子的数量
}

Particle_ZzyGCFBase.prototype.defaultCreaterFrameRandPer = function()//产生帧数扰乱
{//请输入范围0~100,代表扰乱的百分比情况
	return 0;
}

Particle_ZzyGCFBase.prototype.defaultCreaterCountRandPer = function()//数量扰乱
{
	return 0;
}

Particle_ZzyGCFBase.prototype.defaultCreaterOffsetX = function()//默认偏移位置,锚点
{
	return Math.round(Graphics.boxWidth/2);
}

Particle_ZzyGCFBase.prototype.defaultCreaterOffsetY = function()//默认偏移位置
{
	return Math.round(Graphics.boxHeight/2);
}


Particle_ZzyGCFBase.prototype.defaultCreaterType = function()
{
	//类型1:矩形 类型2:圆形
	return 1;
}

Particle_ZzyGCFBase.prototype.defaultCreaterRange = function()
{
	var bw = 0;
	var bh = 0;
	var tRect = 
	{
		left:bw,right:bw,up:bh,down:bh
	};
	return tRect;
}

Particle_ZzyGCFBase.prototype.defaultCreaterIsDynHue = function()//默认动态偏色
{
	return true;
}

Particle_ZzyGCFBase.prototype.defaultCreaterDynHueSpeed = function()//默认动态变色
{
	return 3;
}



Particle_ZzyGCFBase.prototype.setCreaterIsDynHue = function(isEnable)//动态偏色
{
	this.createrIsDynHue = isEnable;
}

Particle_ZzyGCFBase.prototype.setCreaterDynHueSpeed = function(speed)//动态变色,每帧色相变化速度
{
	this.createrDynHueSpeed = speed;
}


Particle_ZzyGCFBase.prototype.setCreaterFrame = function(frame)
{
	this.createrFrame = frame;
}

Particle_ZzyGCFBase.prototype.setCreaterCount = function(count)
{
	this.createrCount = count;
}

Particle_ZzyGCFBase.prototype.setCreaterFrameRandPer = function(per)//产生帧数扰乱
{//请输入范围0~100,代表扰乱的百分比情况
	this.createrFrameRandPer = per;
}

Particle_ZzyGCFBase.prototype.setCreaterCountRandPer = function(per)//数量扰乱
{
	this.createrCountRandPer = per;
}




Particle_ZzyGCFBase.prototype.setCreaterOffsetPos = function(x,y)
{
	this.createrOffsetX = x;
	this.createrOffsetY = y;
}

Particle_ZzyGCFBase.prototype.setCreaterX = function(x)
{
	this.createrOffsetX = x;
}

Particle_ZzyGCFBase.prototype.setCreaterY = function(y)
{
	this.createrOffsetY = y;
}
Particle_ZzyGCFBase.prototype.setCreaterPos = function(x,y)
{
	this.createrOffsetX = x;
	this.createrOffsetY = y;
}




Particle_ZzyGCFBase.prototype.setCreaterType = function(type)
{
	switch(type)
	{	
		case 1:case 'Rect':
		this.createrType = 1;
		break;
		
		case 2:case 'Circle':
		this.createrType = 2;
		break;		
	}

}


Particle_ZzyGCFBase.prototype.setCreaterRange = function(left,right,up,down)
{
	this.createrRange.left = left;
	this.createrRange.right = right;
	this.createrRange.up = up;
	this.createrRange.down = down;
}



//===========================================================================
//粒子对象PSprite_ZzyGCFBase

function PSprite_ZzyGCFBase() 
{
    this.initialize.apply(this, arguments);
}


PSprite_ZzyGCFBase.prototype = Object.create(Sprite.prototype);
PSprite_ZzyGCFBase.prototype.constructor = PSprite_ZzyGCFBase;

PSprite_ZzyGCFBase.prototype.initialize = function(creater) 
{
	Sprite.prototype.initialize.call(this);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.CID = 0;//产生的编号
	this.UID = 0;//唯一性编号
	this.creater = creater;//获取创造器

	this.startSpeed = 0;
	this.startOpactiy = 0;
	this.startRotate = 0;
	this.startSprRotate = 0;
	this.startScaleX = 0;
	this.startScaleY = 0;
	this.startTime = 0;//消失时长
	this.partIsfollowDir = false;//图片方向是否跟随角度
	this.executing = false;//是否执行中
	
	this.destroyTime = 0;//消失时间
	this.CdestroyTime = 0;//计数
	this.temp1 = 0;//临时数据
	this.temp2 = 0;
	this.temp3 = 0;
	this.temp4 = 0;
	this.temp5 = 0;
}

PSprite_ZzyGCFBase.prototype.ResetInfo = function()//重置
{
	
	this.destroyTime = 0;//消失时间
	this.CdestroyTime = 0;//计数
	
	
	this.temp1 = 0;//临时数据
	this.temp2 = 0;
	this.temp3 = 0;
	this.temp4 = 0;
	this.temp5 = 0;
}


PSprite_ZzyGCFBase.prototype.defaultDestroyTime = function()
{
	return Math.round(this.startTime * (1-(this.startSpeed)/(5+this.startSpeed)));
}



PSprite_ZzyGCFBase.prototype.StartUp = function()//启动
{
	this.executing = true;
	this.rotation = this.startSprRotate;
	this.opacity = this.startOpactiy;
	this.scale.x = this.startScaleX;
	this.scale.y = this.startScaleY;
	
	this.destroyTime = this.defaultDestroyTime();
	this.CdestroyTime = this.destroyTime;
	this.MakeTempInfo();//制作临时数据
	
}


PSprite_ZzyGCFBase.prototype.MakeTempInfo = function()
{
	//temp1代表透明度开始的帧数
	this.temp1 = Math.floor(this.destroyTime * 0.5);
}


PSprite_ZzyGCFBase.prototype.update = function()
{
	if(!this.executing || !this.visible)return false;

	this.updateMove();//更新移动
	this.updateOpacity();//更新透明度
	this.updateSprRotate();//更新角度
	this.updateScale();//更新大小变化
	this.updateCustom();//更新设计效果
	
	this.updateDestroy();//更新消失规则
	return true;
}

PSprite_ZzyGCFBase.prototype.updateCustom = function()
{

}

PSprite_ZzyGCFBase.prototype.updateScale = function()
{
	
}


PSprite_ZzyGCFBase.prototype.updateSprRotate = function()
{
	if(this.partIsfollowDir)
	{
		this.rotation = this.startRotate;//跟随角度
	}
	
	
}


PSprite_ZzyGCFBase.prototype.updateMove = function()
{
	//按照方向移动
	this.x += Math.sin(this.startRotate) * this.startSpeed;
	this.y += Math.cos(this.startRotate) * this.startSpeed;
	
}

PSprite_ZzyGCFBase.prototype.updateOpacity = function()
{
	//透明度小于50%时开始进入渐变
	if(this.CdestroyTime > this.temp1)return;
	this.opacity = this.startOpactiy * this.CdestroyTime / this.temp1;
}




PSprite_ZzyGCFBase.prototype.updateDestroy = function()
{
	//这里会执行消失条件
	if(this.CdestroyTime > 0)
	{this.CdestroyTime--;}
	else
	{
		this.CdestroyTime = 0;
		this.executing = false;
		this.visible = false;
	}

}




//==========================================================================
//Sprite_ZzyGCFTextBase
//==========================================================================
//显示文字操作

function Sprite_ZzyGCFTextBase() 
{
    this.initialize.apply(this, arguments);
}


Sprite_ZzyGCFTextBase.prototype = Object.create(Sprite_ZzyGCFBase.prototype);
Sprite_ZzyGCFTextBase.prototype.constructor = Sprite_ZzyGCFTextBase;

Sprite_ZzyGCFTextBase.prototype.initialize = function(prefix,fontSize,borderWidth) 
{
	this.bitmapW = this.defaultBitmapWidth();
	this.bitmapH = this.defaultBitmapHeight();
	this.text = [];//文字
	
	this.fontSize = fontSize ? fontSize : this.defaultFontSize();
	this.borderWidth = borderWidth ? borderWidth : this.defaultBorderWidth();
	
	this.textColor = this.defaultTextColor();
	this.borderColor = this.defaultBorderColor();
	this.textPos = this.defaultTextPos();

	this.setPrefixToTextArr(prefix);//转换存储
	this.AutoSetBitmapWH();//自动设置长宽信息
	
    Sprite_ZzyGCFBase.prototype.initialize.call(this,0,0,'',0);
	this.CreateBitmap();//创建位图
	this.isRefresh = true;//是否需要刷新
	
	this.x = Graphics.width/2;
	this.y = Graphics.height/2;		
	
	this.special = [];//每行的特殊设置
	//[0]:字体大小
	//[1]:边框大小
	//[2]:字体颜色
	//[3]:边框颜色
	//[4]:字串位置
	
	this.isDynShow = this.defaultDynShow();//动态显示文字信息
	
	this.dynText = [];//动态展示存储信息
	
	this.showFrame = this.defaultShowFrame();//默认多少帧一个1
	this.CshowFrame = 0;//计数
	
	this.dynLine = 0;//动态显示行
	this.dynIndex = 0;//目前动态显示的下标
	this.dynMaxIndex = 0;//行数最大下标值
	this.dynShowing = false;//是否动态显示中
	this.dynPause = false;//是否暂停
	
	this.isGradualText = false;//是否为渐变文字
	this.isTextureText = false;//是否为纹理文字
	this.isGradualBorder = false;//是否为渐变边框
	this.isTextureBorder = false;//是否为纹理边框
	
	this.gradStyleText = undefined;//渐变颜色表
	this.gradStyleBorder = undefined;//渐变边框表
	this.tureStyleText = undefined;//纹理颜色表
	this.tureStyleBorder = undefined;//纹理边框表
	
	//纹理图片
	this.textImg = undefined;
	this.borderImg = undefined;
	
	this.waitTextImg = false;
	this.CwaitTextImg = 0;
	this.waitBorderImg = false;
	this.CwaitBorderImg = 0;
	
	this.fontType = '';//字体
	this.isBorderBottom = false;//赋值绘制的先后顺序
};


Sprite_ZzyGCFTextBase.prototype.CreateBitmap = function()
{
	this.bitmap = new Bitmap(this.bitmapW,this.bitmapH);//长宽
	this.saveFontType();
}

Sprite_ZzyGCFTextBase.prototype.saveFontType = function()//存储字体类型
{
	var fArr = this.bitmap._context.font.split(' ');
	this.fontType = fArr[fArr.length-1];
}


Sprite_ZzyGCFTextBase.prototype.loadBitmap = function(fileName,hue)
{
	
}

Sprite_ZzyGCFTextBase.prototype.update = function()
{
	Sprite_ZzyGCFBase.prototype.update.call(this);
	
	this.updateDynShow();
	this.updateTextImg();
	this.updateBorderImg();

	if(!this.isRefresh)return;
	this.updateRefresh();//刷新
	this.isRefresh = false;		
}

Sprite_ZzyGCFTextBase.prototype.updateTextImg = function()//等待加载
{
	if(!this.waitTextImg)return;
	
	if(this.CwaitTextImg > 0)
	{this.CwaitTextImg--;}
	else
	{
		this.CwaitTextImg = 0;
		this.waitTextImg = false;
		
		var context = this.bitmap._context;
		this.tureStyleText = context.createPattern(this.textImg,"repeat");
		context.fillStyle = this.tureStyleText;
		this.isRefresh = true;
	}

}

Sprite_ZzyGCFTextBase.prototype.updateBorderImg = function()//等待加载
{
	if(!this.waitBorderImg)return;
	
	if(this.CwaitBorderImg > 0)
	{this.CwaitBorderImg--;}
	else
	{
		this.CwaitBorderImg = 0;
		this.waitBorderImg = false;
		
		var context = this.bitmap._context;
		this.tureStyleBorder = context.createPattern(this.borderImg,"repeat");
		context.strokeStyle = this.tureStyleBorder;	
		this.isRefresh = true;		
	}
}



Sprite_ZzyGCFTextBase.prototype.updateDynShow = function()
{
	if(!this.isCanDynShow())return;
	
	//刷新帧数
	
	if(this.CshowFrame < this.showFrame)
	{
		this.CshowFrame++;
	}
	else
	{
		this.dynText[this.dynLine][this.dynIndex] = this.text[this.dynLine][this.dynIndex];
		this.CshowFrame = 0;//清零
		this.dynIndex++;
		
		if(this.dynIndex >= this.dynMaxIndex)
		{
			while(true)
			{
				this.dynLine++;
				if(this.dynLine >= this.text.length)
				{
					this.dynShowing = false;//显示结束
					break;
				}
				else if(this.calNextLineStr(this.dynLine))//获取到正确的行数
				{
					break;
				}
			}
		}
		this.isRefresh = true;
		
	}
	
}


Sprite_ZzyGCFTextBase.prototype.calNextLineStr = function(nextLine)//计算本行信息
{
	nextLine = nextLine ? nextLine : 0;
	
	if(!this.text[nextLine])
	{this.dynMaxIndex = 0;}
	else
	{this.dynMaxIndex = this.text[nextLine].length;}
	this.dynIndex = 0;

	if(this.dynMaxIndex)
	{
		this.dynText[nextLine] = [];
		return true;
	}
	return false;
}

Sprite_ZzyGCFTextBase.prototype.isCanDynShow = function()
{
	if(this.dynPause || !this.isDynShow || !this.dynShowing)return false;
	return true;
}


Sprite_ZzyGCFTextBase.prototype.updateRefresh = function()//刷新
{
	this.bitmap.clear();

	for(var i=0;i<this.text.length;i++)
	{
		this.bitmap.fontSize = this.fontSize;
		this.bitmap.outlineWidth = this.borderWidth;
		this.bitmap.textColor = this.textColor;
		this.bitmap.outlineColor = this.borderColor;		
		
		var tempTextPos = this.textPos;
		
      	//[0]:字体大小   //[1]:边框大小   //[2]:字体颜色   //[3]:边框颜色   //[4]:字串位置		
		if(!this.text[i])continue;
		
		//判断是否有特殊输入
		if(this.special[i])
		{
			this.bitmap.fontSize = this.special[i][0] ? this.special[i][0] : this.bitmap.fontSize;
			this.bitmap.outlineWidth = this.special[i][1] ? this.special[i][1] : this.bitmap.outlineWidth;
			this.bitmap.textColor = this.special[i][2] ? this.special[i][2] : this.bitmap.textColor;
			this.bitmap.outlineColor = this.special[i][3] ? this.special[i][3] : this.bitmap.borderColor;
			tempTextPos = this.special[i][4] ? this.special[i][4] : tempTextPos;
		}

		if(this.isDynShow)
		{	
			if(!this.dynText[i])continue;
			
			var isSenior = false;//是否拥有高级效果	
			
			if(this.isGradualText || this.isGradualBorder || 
			this.isTextureText || this.isTextureBorder)//包含渐变文字时
			{
				isSenior = true;
			}			
			
			if(isSenior)
			{	
				this.bitmap._context.font = this.bitmap._makeFontNameText();
				this.bitmap._context.lineWidth = this.bitmap.outlineWidth;
		
				this.drawSeniorText(this.dynText[i].join(""),this.borderWidth,
				this.getYOfLine(i)+this.fontSize-this.borderWidth,this.bitmapW,tempTextPos);
				
			}
			else
			{
				this.bitmap.drawText(this.dynText[i].join(""),this.borderWidth,this.getYOfLine(i),this.bitmapW,
				this.fontSize + this.borderWidth*2,tempTextPos);			
			}
			
		}
		else
		{
	
			var isSenior = false;//是否拥有高级效果
			if(this.isGradualText || this.isGradualBorder || 
			this.isTextureText || this.isTextureBorder)//包含渐变文字时
			{
				isSenior = true;
			}

			if(isSenior)
			{
				this.bitmap._context.font = this.bitmap._makeFontNameText();
				this.bitmap._context.lineWidth = this.bitmap.outlineWidth;
		
				this.drawSeniorText(this.text[i],
				this.borderWidth,
				this.getYOfLine(i)+this.fontSize-this.borderWidth,
				this.bitmapW,
				tempTextPos);
				
			}
			else
			{
				this.bitmap.drawText(this.text[i],this.borderWidth,this.getYOfLine(i),this.bitmapW,
				this.fontSize + this.borderWidth*2,tempTextPos);				
			}
		}

	}
}


Sprite_ZzyGCFTextBase.prototype.drawSeniorText = function(text,x,y,width,align)
{
	var tx = x;
	if(align === 'center')
	{
		tx += width / 2;
	}
	else if(align === 'right')
	{
		tx += width;
	}
	this.bitmap._context.textAlign = align;
	
	if(this.isBorderBottom)//绘制边框和文字的先后顺序
	{
		if(this.isGradualBorder || this.isTextureBorder)
		{this.bitmap._context.strokeText(text,tx,
		y,width);}	
		
		if(this.isGradualText || this.isTextureText)
		{this.bitmap._context.fillText(text,tx,
		y,width);}		
	}
	else
	{
		if(this.isGradualText || this.isTextureText)
		{this.bitmap._context.fillText(text,tx,
		y,width);}	

		if(this.isGradualBorder || this.isTextureBorder)
		{this.bitmap._context.strokeText(text,tx,
		y,width);}			
	}
	
	

}

Sprite_ZzyGCFTextBase.prototype.ForceRefresh = function()//这会强制刷新
{
	this.updateRefresh();
}


Sprite_ZzyGCFTextBase.prototype.getYOfLine = function(line)
{
	return line * (this.fontSize + this.borderWidth*2)+this.borderWidth;
}

Sprite_ZzyGCFTextBase.prototype.defaultBitmapWidth = function()
{
	return 256;
}

Sprite_ZzyGCFTextBase.prototype.defaultBitmapHeight = function()
{
	return 64;
}

Sprite_ZzyGCFTextBase.prototype.defaultFontSize = function()
{
	return 30;
}

Sprite_ZzyGCFTextBase.prototype.defaultBorderWidth = function()
{
	return 2;
}

Sprite_ZzyGCFTextBase.prototype.defaultTextColor = function()
{
	return '#ffffff';
}

Sprite_ZzyGCFTextBase.prototype.defaultBorderColor = function()
{
	return 'rgba(0,0,0,1)';
}

Sprite_ZzyGCFTextBase.prototype.defaultTextPos = function()
{
	return 'center';
}

Sprite_ZzyGCFTextBase.prototype.defaultDynShow = function()
{
	return false;
}

Sprite_ZzyGCFTextBase.prototype.defaultShowFrame = function()//多少帧显示一个字符
{
	return 6;
}

Sprite_ZzyGCFTextBase.prototype.setBorderColor = function(colorStr)//设置边框颜色
{
	this.borderColor = colorStr;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.borderRedColor = function()//红
{this.borderColor = 'rgba(240,40,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderOrangeColor = function()//橙
{this.borderColor = 'rgba(240,120,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderYellowColor = function()//黄
{this.borderColor = 'rgba(240,240,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderEmeraldColor = function()//翠绿
{this.borderColor = 'rgba(120,240,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderGreenColor = function()//绿
{this.borderColor = 'rgba(40,240,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderTurquoiseColor = function()//青绿
{this.borderColor = 'rgba(40,240,120,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderCyanColor = function()//青
{this.borderColor = 'rgba(40,240,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderSeablueColor = function()//海蓝
{this.borderColor = 'rgba(40,120,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderBlueColor = function()//蓝
{this.borderColor = 'rgba(40,40,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderPurpleColor = function()//紫
{this.borderColor = 'rgba(120,40,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderPinkColor = function()//粉
{this.borderColor = 'rgba(240,40,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.borderPinkredColor = function()//粉红
{this.borderColor = 'rgba(240,40,120,1)';this.isRefresh = true;}

Sprite_ZzyGCFTextBase.prototype.setTextColor = function(colorStr)
{
	this.textColor = colorStr;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.textRedColor = function()//红
{this.textColor = '#ff2222';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textOrangeColor = function()//橙
{this.textColor = '#ff7f22';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textYellowColor = function()//黄
{this.textColor = '#ffff22';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textEmeraldColor = function()//翠绿
{this.textColor = '#7fff22';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textGreenColor = function()//绿
{this.textColor = '#22ff22';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textTurquoiseColor = function()//青绿
{this.textColor = '#22ff7f';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textCyanColor = function()//青
{this.textColor = '#22ffff';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textSeablueColor = function()//海蓝
{this.textColor = '#227fff';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textBlueColor = function()//蓝
{this.textColor = '#2222ff';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textPurpleColor = function()//紫
{this.textColor = '#7f22ff';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textPinkColor = function()//粉
{this.textColor = '#ff22ff';this.isRefresh = true;}
Sprite_ZzyGCFTextBase.prototype.textPinkredColor = function()//粉红
{this.textColor = '#ff227f';this.isRefresh = true;}



Sprite_ZzyGCFTextBase.prototype.Random12TextColor = function()//一个随机12色文字
{
	var textColorFun = [this.textRedColor,this.textOrangeColor,this.textYellowColor,this.textEmeraldColor,this.textGreenColor,this.textTurquoiseColor,this.textCyanColor,this.textSeablueColor,this.textBlueColor,this.textPurpleColor,this.textPinkColor,this.textPinkredColor];
	
	var rcID = Zzy.GCF.RandomIntArea(0,12);
	textColorFun[rcID].call(this);
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.Random12BorderColor = function()//一个随机12色边框
{
	var borderColorFun = [this.borderRedColor,this.borderOrangeColor,this.borderYellowColor,this.borderEmeraldColor,this.borderGreenColor,this.borderTurquoiseColor,this.borderCyanColor,this.borderSeablueColor,this.borderBlueColor,this.borderPurpleColor,this.borderPinkColor,this.borderPinkredColor];	
	var rcID = Zzy.GCF.RandomIntArea(0,12);
	borderColorFun[rcID].call(this);
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.Random12Color = function()//一个随机12色文字和边框
{
	this.Random12TextColor();
	this.Random12BorderColor();
	this.isRefresh = true;
}

//对指定的行数进行特殊文字颜色设置
Sprite_ZzyGCFTextBase.prototype.setFontSizeOfLine = function(line,fontSize)
{
	if(!this.special[line]){this.special[line] = [];}
	this.special[line][0] = fontSize ? fontSize : this.defaultFontSize();
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setFontSize = function(fontSize)
{
	this.fontSize = fontSize;
	this.ReCreateBitmap();
	this.isRefresh = true;
}


Sprite_ZzyGCFTextBase.prototype.clearFontSizeOfLine = function(line)
{
	if(!this.special[line])return;
	this.special[line][0] = undefined;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setBorderWidthOfLine = function(line,borderWidth)
{
	if(!this.special[line]){this.special[line] = [];}
	this.special[line][1] = borderWidth ? borderWidth : this.defaultBorderWidth();
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setBorderWidth = function(borderWidth)
{
	this.borderWidth = borderWidth;
	this.ReCreateBitmap();	
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.clearBorderWidthOfLine = function(line)
{
	if(!this.special[line])return;
	this.special[line][1] = undefined;
	this.isRefresh = true;
}


Sprite_ZzyGCFTextBase.prototype.setTextColorOfLine = function(line,textColor)
{
	if(!this.special[line]){this.special[line] = [];}
	this.special[line][2] = textColor ? textColor : this.defaultTextColor();
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setTextColor = function(textColor)
{
	this.textColor = textColor;
	this.isRefresh = true;
}


Sprite_ZzyGCFTextBase.prototype.clearTextColorOfLine = function(line)
{
	if(!this.special[line])return;
	this.special[line][2] = undefined;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setBorderColorOfLine = function(line,borderColor)
{
	if(!this.special[line]){this.special[line] = [];}
	this.special[line][3] = borderColor ? borderColor : this.defaultBorderColor();
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setBorderColor = function(borderColor)
{
	this.borderColor = borderColor;
	this.isRefresh = true;
}


Sprite_ZzyGCFTextBase.prototype.clearBorderColorOfLine = function(line)
{
	if(!this.special[line])return;
	this.special[line][3] = undefined;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setTextPosOfLine = function(line,textPos)
{
	if(!this.special[line]){this.special[line] = [];}
	this.special[line][4] = textPos ? textPos : this.defaultTextPos();
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.setTextPos = function(textPos)
{
	this.textPos = textPos;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.clearTextPosOfLine = function(line)
{
	if(!this.special[line])return;
	this.special[line][4] = undefined;
	this.isRefresh = true;
}


Sprite_ZzyGCFTextBase.prototype.hideBorder = function()//隐藏边框
{
	//隐藏
	this.bitmap.outlineWidth = 0;
	this.setGradualColorOfBorder(['rgba(0,0,0,0)']);
	this.isRefresh = true;
}







//这会设置一行中拥有特殊效果
Sprite_ZzyGCFTextBase.prototype.setSpecialOfLine = function(line,infoArr)
{
	//[0]:字体大小   //[1]:边框大小   //[2]:字体颜色   //[3]:边框颜色   //[4]:字串位置	
	if(!this.special[line]){this.special[line] = [];}
	this.setFontSizeOfLine(line,infoArr[0]);
	this.setBorderWidthOfLine(line,infoArr[1]);
	this.setTextColorOfLine(line,infoArr[2]);
	this.setBorderColorOfLine(line,infoArr[3]);
	this.setTextPosOfLine(line,infoArr[4]);
}

Sprite_ZzyGCFTextBase.prototype.clearSpecialOfLine = function(line)//清理特殊行数标记
{
	this.special[line] = undefined;
	this.isRefresh = true;
}


Sprite_ZzyGCFTextBase.prototype.setBorderBottom = function(isEnable)//修改绘制流程
{
	isEnable = isEnable ? isEnable : false;
	this.isBorderBottom = isEnable;
	this.isRefresh = true;
}





Sprite_ZzyGCFTextBase.prototype.AutoSetBitmapWH = function()//自动匹配长宽参数
{
	//选出最大长度的字符串
	var maxLen = 0;
	for(var i=0;i<this.text.length;i++)
	{
		maxLen = Math.max(maxLen,this.text[i].length);
	}
	
	//比较宽度
	var tempS = this.fontSize + this.borderWidth * 2;
	var tempW = maxLen * this.fontSize + this.borderWidth * 2;
	var tempH = this.text.length * tempS;
	
	this.bitmapW = Math.max(this.bitmapW,tempW);
	this.bitmapH = Math.max(this.bitmapH,tempH);
}


Sprite_ZzyGCFTextBase.prototype.setPrefixToTextArr = function(prefix)
{
	//将'\n'进行拆分
	this.text = prefix.split('\n');//切割成多段数组
}


Sprite_ZzyGCFTextBase.prototype.setText = function(text)//重新设置文字组
{
	this.setPrefixToTextArr(text);
	this.ReCreateBitmap();
	this.isRefresh = true;//刷新
}

Sprite_ZzyGCFTextBase.prototype.ReCreateBitmap = function()
{
	var oldW = this.bitmapW;
	var oldH = this.bitmapH;
	this.AutoSetBitmapWH();//重新设置长宽信息
	if(oldW !== this.bitmapW || oldH !== this.bitmapH)
	{
		this.CreateBitmap();//重新申请位图
		return true;
	}	
	return false;
}


Sprite_ZzyGCFTextBase.prototype.setTextOfLine = function(line,ltext)
{
	this.text[line] = ltext;
	this.ReCreateBitmap();
	this.isRefresh = true;//刷新
}

Sprite_ZzyGCFTextBase.prototype.addTextOfLine = function(line,ltext)
{
	this.text[line] += ltext;
	this.ReCreateBitmap();
	this.isRefresh = true;//刷新
}

Sprite_ZzyGCFTextBase.prototype.setDynShow = function(isEnable)
{
	this.isDynShow = isEnable;
}

//速度值代表每帧显示的字符数量,这可以是一个小数
Sprite_ZzyGCFTextBase.prototype.setShowFrame = function(frame)
{
	this.showFrame = frame;
}

//开始动态显示文字
Sprite_ZzyGCFTextBase.prototype.startDynShow = function(line)
{
	this.setDynShow(true);
	
	this.dynLine = line ? line : 0;//默认从第0行开始
	this.dynShowing = true;
	this.dynText = [];//动态展示存储信息
	this.dynIndex = 0;
	
	//通过行数设置初始化的dynText信息
	for(var i=0;i<line;i++)
	{
		this.dynText[i] = [];
		for(var j=0;j<this.text[i].length;j++)
		{
			this.dynText[i][j] = this.text[i][j];
		}
	}
	this.calNextLineStr(line);
}


//设置文字平均渐变颜色
Sprite_ZzyGCFTextBase.prototype.setGradualColorOfText = function(colorArr,isH,isV)
{
	this.isGradualText = true;
	this.isTextureText = false;//关闭纹理
	var context = this.bitmap._context;//获取画布

	this.gradStyleText = undefined;//渐变颜色表
	
	if(!isH && !isV)
	{
		this.gradStyleText = context.createLinearGradient(0,0,this.bitmapW,0);//设置渐变范围
	}
	else
	{
		var tw = isH ? this.bitmapW : 0;
		var th = isV ? this.bitmapH : 0;
		this.gradStyleText = context.createLinearGradient(0,0,tw,th);//设置渐变范围
	}

	var len = colorArr.length;//通过长度平均分配
	var rate = 0;
	if(len <= 1){rate = 0;}
	else{rate = 1 / (len-1);}//获取百分比
	for(var i=0;i<=len-1;i++)
	{
		this.gradStyleText.addColorStop(rate*i,colorArr[i]);//制作渐变信息
	}
	context.fillStyle = this.gradStyleText;//设置风格模式
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.addGradualColorOfText = function(ratePos,colorStr)//添加变色效果
{
	if(!this.gradStyleText){Zzy.GCF.Bug(1);return;}
	this.gradStyleText.addColorStop(ratePos,colorStr);
	this.bitmap._context.fillStyle = this.gradStyleText;
	this.isRefresh = true;
}

//设置边框平均渐变颜色
Sprite_ZzyGCFTextBase.prototype.setGradualColorOfBorder = function(colorArr,isH,isV)
{
	this.isGradualBorder = true;
	this.isTextureBorder = false;//关闭纹理
	var context = this.bitmap._context;//获取画布
	
	this.gradStyleBorder = undefined;//渐变颜色表
	
	if(!isH && !isV)
	{
		this.gradStyleBorder = context.createLinearGradient(0,0,this.bitmapW,0);//设置渐变范围
	}
	else
	{
		var tw = isH ? this.bitmapW : 0;
		var th = isV ? this.bitmapH : 0;
		this.gradStyleBorder = context.createLinearGradient(0,0,tw,th);//设置渐变范围
	}	
	
	
	var len = colorArr.length;//通过长度平均分配
	var rate = 0;
	if(len <= 1){rate = 0;}
	else{rate = 1 / (len-1);}//获取百分比
	for(var i=0;i<=len-1;i++)
	{
		this.gradStyleBorder.addColorStop(rate*i,colorArr[i]);//制作渐变信息
	}
	context.strokeStyle = this.gradStyleBorder;//设置风格模式
	this.isRefresh = true;	
}

Sprite_ZzyGCFTextBase.prototype.addGradualColorOfBorder = function(ratePos,colorStr)//添加变色效果
{
	if(!this.gradStyleBorder){Zzy.GCF.Bug(2);return;}
	this.gradStyleBorder.addColorStop(ratePos,colorStr);
	this.bitmap._context.strokeStyle = this.gradStyleBorder;
	this.isRefresh = true;
}


Sprite_ZzyGCFTextBase.prototype.setTextureOfText = function(fileName)//纹理名称
{
	this.isTextureText = true;//开启纹理
	this.isGradualText = false;//关闭渐变
	var context = this.bitmap._context;//获取画布
	
	fileName = '../img/pictures/' + fileName + '.png';
	this.textImg = new Image();
	this.textImg.src = fileName;
	
	this.waitTextImg = true;
	this.CwaitTextImg = 5;

	this.tureStyleText = undefined;//位图	
	this.isRefresh = true;
	
}

Sprite_ZzyGCFTextBase.prototype.setTextureOfBorder = function(fileName)//纹理名称
{
	this.isTextureBorder = true;//开启纹理	
	this.isGradualBorder = false;//关闭渐变

	var context = this.bitmap._context;//获取画布
	
	fileName = '../img/pictures/' + fileName + '.png';
	this.borderImg = new Image();
	this.borderImg.src = fileName;
	
	this.waitBorderImg = true;
	this.CwaitBorderImg = 5;
	this.tureStyleBorder = undefined;//位图	
	this.isRefresh = true;
	
}



Sprite_ZzyGCFTextBase.prototype.closeGradualColorOfText = function()//关闭渐变颜色
{
	this.isGradualText = false;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.closeGradualColorOfBorder = function()//关闭渐变边框
{
	this.isGradualBorder = false;
	this.isRefresh = true;
	
}

Sprite_ZzyGCFTextBase.prototype.closeTextureOfText = function()//关闭纹理名称
{
	this.isTextureText = false;
	this.isRefresh = true;
}

Sprite_ZzyGCFTextBase.prototype.closeTextureOfBorder = function()//关闭纹理边框
{
	this.isTextureBorder = false;
	this.isRefresh = true;
}


//动态递减文字，参数为是否使用所目前拥有动态字符串数量,为false时会变为所有字符串
Sprite_ZzyGCFTextBase.prototype.startRemoveDynShow = function(isCurrent)
{
	this.setDynShow(true);
	
	if(!isCurrent)
	{
		this.dynText = [];
		
		
	}
}


Sprite_ZzyGCFTextBase.prototype.setDynPause = function(isPause)//是否暂停动态显示效果
{
	this.dynPause = isPause;
}



//==========================================================================
//Sprite_ZzyGCFNumber
//==========================================================================


function Sprite_ZzyGCFNumber() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGCFNumber.prototype = Object.create(Sprite_ZzyGCFBase.prototype);
Sprite_ZzyGCFNumber.prototype.constructor = Sprite_ZzyGCFNumber;

Sprite_ZzyGCFNumber.prototype.initialize = function(w,h,num) 
{
    Sprite_ZzyGCFBase.prototype.initialize.call(this,0,0,'',0);
	
	//数字位图
	this.realNumber = num ? num : 0;//真实数字
	this.showNumber = num ? num : 0;//显示分数


	this.bWidth = w;
	this.bHeight = h;
	this.CreateBitmap();
	
	this.isDynNumber = this.DefaultDynNumber();//是否动态增分
	this.dyning = false//增加中
	this.drawPos = this.DefaultDrawPos();
	
	this.numberDelay = 0;//延迟
	this.isNumberDelay = false;//延迟判断
	this.setFontSize();
	this.isRefresh = false;//需要刷新
	
	this.bindNumberFun = undefined;//绑定返回数字函数
	
	this.x = Graphics.boxWidth / 2;
	this.y = Graphics.boxHeight / 2;
	
	

	this.isGradualNumber = false;//是否为渐变数字
	this.isTextureNumber = false;//是否为纹理数字
	this.isGradualBorder = false;//是否为渐变边框
	this.isTextureBorder = false;//是否为纹理边框
	
	this.gradStyleNumber = undefined;//渐变颜色表
	this.gradStyleBorder = undefined;//渐变边框表
	this.tureStyleNumber = undefined;//纹理颜色表
	this.tureStyleBorder = undefined;//纹理边框表
	
	//纹理图片
	this.numberImg = undefined;
	this.borderImg = undefined;
	
	this.waitNumberImg = false;
	this.CwaitNumberImg = 0;
	this.waitBorderImg = false;
	this.CwaitBorderImg = 0;
	
	this.fontType = '';//字体
	this.isBorderBottom = false;//描边是否在底层
	
	
	this.isUseBitmapCollection = this.DefaultUseBitmapCollection();//使用位图合集
	this.collection = [];
	
	this.isFillDigit = this.DefaultFillDigit();//是否补充位数
	this.digitCount = this.DefaultDigitCount();//位数
	
	
	this.refresh();//强制刷新
};


Sprite_ZzyGCFNumber.prototype.DefaultDynNumber = function()//是否动态增分
{
	return true;
}

Sprite_ZzyGCFNumber.prototype.DefaultFillDigit = function()//默认是否拥有占位
{
	return false;
}

Sprite_ZzyGCFNumber.prototype.DefaultDigitCount = function()//默认占位长度
{
	return 0;
}

Sprite_ZzyGCFNumber.prototype.DefaultDrawPos = function()//默认位置
{
	return 'center';
}

Sprite_ZzyGCFNumber.prototype.DefaultUseBitmapCollection = function()
{
	return false;
}

Sprite_ZzyGCFNumber.prototype.DefaultTextColor = function()
{
	return '#000000';
}

Sprite_ZzyGCFNumber.prototype.DefaultBorderColor = function()
{
	return 'rgba(0,0,0,0.5)';
}

Sprite_ZzyGCFNumber.prototype.DefaultBorderWidth = function()
{
	return 2;
}


Sprite_ZzyGCFNumber.prototype.setFillDigit = function(isEnable)//返回是否添加0补充
{
	this.isFillDigit = isEnable;
}

Sprite_ZzyGCFNumber.prototype.setDigitCount = function(digitCount)
{
	this.digitCount = digitCount;
}


Sprite_ZzyGCFNumber.prototype.setBitmapCollection = function(collection)
{
	this.collection = collection;
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.setUseBitmapCollection = function(isEnable)
{
	this.isUseBitmapCollection = isEnable;//是否使用图集显示数字
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.CreateBitmap = function()
{	
	this.bitmap = new Bitmap(this.bWidth,this.bHeight);//长宽
	
	this.bitmap.textColor = this.DefaultTextColor();
	this.bitmap.outlineColor = this.DefaultBorderColor();
	this.bitmap.outlineWidth = this.DefaultBorderWidth();

	this.saveFontType();
}


Sprite_ZzyGCFNumber.prototype.saveFontType = function()//存储字体类型
{
	var fArr = this.bitmap._context.font.split(' ');
	this.fontType = fArr[fArr.length-1];
}


//设置数字平均渐变颜色,isH,isV代表是否水平或者垂直进行渐变情况
Sprite_ZzyGCFNumber.prototype.setGradualColorOfNumber = function(colorArr,isH,isV)
{
	this.isGradualNumber = true;
	this.isTextureNumber = false;//关闭纹理
	var context = this.bitmap._context;//获取画布

	this.gradStyleNumber = undefined;//渐变颜色表
	
	
	if(!isH && !isV)
	{
		this.gradStyleNumber = context.createLinearGradient(0,0,this.bWidth,0);//设置渐变范围
	}
	else
	{
		var tw = isH ? this.bWidth : 0;
		var th = isV ? this.bHeight : 0;
		this.gradStyleNumber = context.createLinearGradient(0,0,tw,th);//设置渐变范围
	}
	
	var len = colorArr.length;//通过长度平均分配
	var rate = 0;
	if(len <= 1){rate = 0;}
	else{rate = 1 / (len-1);}//获取百分比
	for(var i=0;i<=len-1;i++)
	{
		this.gradStyleNumber.addColorStop(rate*i,colorArr[i]);//制作渐变信息
	}
	context.fillStyle = this.gradStyleNumber;//设置风格模式
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.addGradualColorOfNumber = function(ratePos,colorStr)//添加变色效果
{
	if(!this.gradStyleNumber){Zzy.GCF.Bug(3);return;}
	this.gradStyleNumber.addColorStop(ratePos,colorStr);
	this.bitmap._context.fillStyle = this.gradStyleNumber;
	this.isRefresh = true;
}

//设置边框平均渐变颜色
Sprite_ZzyGCFNumber.prototype.setGradualColorOfBorder = function(colorArr,isH,isV)
{
	this.isGradualBorder = true;
	this.isTextureBorder = false;//关闭纹理
	var context = this.bitmap._context;//获取画布
	
	this.gradStyleBorder = undefined;//渐变颜色表
	
	
	if(!isH && !isV)
	{
		this.gradStyleBorder = context.createLinearGradient(0,0,this.bWidth,0);//设置渐变范围
	}
	else
	{
		var tw = isH ? this.bWidth : 0;
		var th = isV ? this.bHeight : 0;
		this.gradStyleBorder = context.createLinearGradient(0,0,tw,th);//设置渐变范围
	}
	
	
	
	var len = colorArr.length;//通过长度平均分配
	var rate = 0;
	if(len <= 1){rate = 0;}
	else{rate = 1 / (len-1);}//获取百分比
	for(var i=0;i<=len-1;i++)
	{
		this.gradStyleBorder.addColorStop(rate*i,colorArr[i]);//制作渐变信息
	}
	context.strokeStyle = this.gradStyleBorder;//设置风格模式
	this.isRefresh = true;	
}

Sprite_ZzyGCFNumber.prototype.addGradualColorOfBorder = function(ratePos,colorStr)//添加变色效果
{
	if(!this.gradStyleBorder){Zzy.GCF.Bug(4);return;}
	this.gradStyleBorder.addColorStop(ratePos,colorStr);
	this.bitmap._context.strokeStyle = this.gradStyleBorder;
	this.isRefresh = true;
}


Sprite_ZzyGCFNumber.prototype.setTextureOfNumber = function(fileName)//纹理名称
{
	this.isTextureNumber = true;//开启纹理
	this.isGradualNumber = false;//关闭渐变
	var context = this.bitmap._context;//获取画布
	
	fileName = '../img/pictures/' + fileName + '.png';
	this.numberImg = new Image();
	this.numberImg.src = fileName;
	
	this.waitNumberImg = true;
	this.CwaitNumberImg = 5;

	this.tureStyleNumber = undefined;//位图	
	this.isRefresh = true;
	
}

Sprite_ZzyGCFNumber.prototype.setTextureOfBorder = function(fileName)//纹理名称
{
	this.isTextureBorder = true;//开启纹理	
	this.isGradualBorder = false;//关闭渐变

	var context = this.bitmap._context;//获取画布
	
	fileName = '../img/pictures/' + fileName + '.png';
	this.borderImg = new Image();
	this.borderImg.src = fileName;
	
	this.waitBorderImg = true;
	this.CwaitBorderImg = 5;
	this.tureStyleBorder = undefined;//位图	
	this.isRefresh = true;
	
}


Sprite_ZzyGCFNumber.prototype.closeGradualColorOfText = function()//关闭渐变颜色
{
	this.isGradualNumber = false;
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.closeGradualColorOfBorder = function()//关闭渐变边框
{
	this.isGradualBorder = false;
	this.isRefresh = true;
	
}

Sprite_ZzyGCFNumber.prototype.closeTextureOfNumber = function()//关闭纹理名称
{
	this.isTextureNumber = false;
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.closeTextureOfBorder = function()//关闭纹理边框
{
	this.isTextureBorder = false;
	this.isRefresh = true;
}

//设置绘制顺序
Sprite_ZzyGCFNumber.prototype.setBorderBottom = function(isEnable)
{
	isEnable = isEnable ? isEnable : false;
	this.isBorderBottom = isEnable;
	this.isRefresh;
}


Sprite_ZzyGCFNumber.prototype.update = function()
{
	Sprite_ZzyGCFBase.prototype.update.call(this);
	
	this.updateBindNumFun();//更新有绑定函数
	
	this.updateNumberImg();//等待加载
	this.updateBorderImg();//等待加载
	
	if(this.isRefresh)//刷新一次位图
	{
		this.refresh();
		this.isRefresh = false;
	}
	
	if(!this.isNotUpdate())return;//数据没有变化不需要刷新
	
	this.updateNumberDelay();//更新延迟
	
	if(this.isNumberDelay)return;//延迟不刷新
	this.refresh();//刷新
}


Sprite_ZzyGCFNumber.prototype.updateNumberImg = function()//等待加载
{
	if(!this.waitNumberImg)return;
	
	if(this.CwaitNumberImg > 0)
	{this.CwaitNumberImg--;}
	else
	{
		this.CwaitNumberImg = 0;
		this.waitNumberImg = false;
		var context = this.bitmap._context;

		this.tureStyleNumber = context.createPattern(this.numberImg,"repeat");
		context.fillStyle = this.tureStyleNumber;
		this.isRefresh = true;
	}
}


Sprite_ZzyGCFNumber.prototype.updateBorderImg = function()//等待加载
{
	if(!this.waitBorderImg)return;
	
	if(this.CwaitBorderImg > 0)
	{this.CwaitBorderImg--;}
	else
	{
		this.CwaitBorderImg = 0;
		this.waitBorderImg = false;
		var context = this.bitmap._context;
		this.tureStyleBorder = context.createPattern(this.borderImg,"repeat");
		context.strokeStyle = this.tureStyleBorder;	
		this.isRefresh = true;		
	}
}




Sprite_ZzyGCFNumber.prototype.updateNumberDelay = function()
{
	if(!this.isNumberDelay)return;
		
	if(this.numberDelay > 0)
	{this.numberDelay--;}
	else
	{
		this.numberDelay = 0;
		this.isNumberDelay = false;
	}
}


Sprite_ZzyGCFNumber.prototype.updateBindNumFun = function()
{
	if(!this.bindNumberFun)return;
	
	this.realNumber = this.bindNumberFun();//获取数值
	
}



Sprite_ZzyGCFNumber.prototype.setBindNumberFunction = function(fun)
{this.bindNumberFun = fun;}

Sprite_ZzyGCFNumber.prototype.clearBindNumberFunction = function()
{this.bindNumberFun = undefined;}


Sprite_ZzyGCFNumber.prototype.loadBitmap = function(fileName,hue)
{

}


Sprite_ZzyGCFNumber.prototype.setFontSize = function(fontSize)//设置字体大小
{
	if(!fontSize){this.bitmap.fontSize = this.defaultFontSize();return;}
	
	this.bitmap.fontSize = fontSize;
}

Sprite_ZzyGCFNumber.prototype.setMaxFontSize = function()//设置为最大显示字体
{
	//取宽高比最大
	var minS = Math.min(this.bWidth,this.bHeight);
	minS = minS - this.bitmap.outlineWidth*2;
	this.bitmap.fontSize = minS;
	this.isRefresh = true;
}


Sprite_ZzyGCFNumber.prototype.defaultFontSize = function()
{return 32;}


Sprite_ZzyGCFNumber.prototype.getNumber = function()
{return this.realNumber;}

Sprite_ZzyGCFNumber.prototype.getShowNumber = function()
{return this.showNumber;}

Sprite_ZzyGCFNumber.prototype.setDelayOfNumber = function(delay)
{
	this.numberDelay = delay;
	this.isNumberDelay = true;
}


Sprite_ZzyGCFNumber.prototype.addDelayOfNumber = function(delay)
{
	this.numberDelay += delay;
	this.isNumberDelay = true;
}

Sprite_ZzyGCFNumber.prototype.subDelayOfNumber = function(delay)
{
	this.numberDelay -= delay;
	this.isNumberDelay = true;
}






Sprite_ZzyGCFNumber.prototype.refresh = function()//这将会主动的去刷新
{
	this.bitmap.clear();
	this.ExecuteDynNumber();//执行动态增粉

	if(this.isUseBitmapCollection)//用位图的方式来显示
	{
		this.refreshHaveCollection();
	}
	else
	{
		this.refreshNoCollection();
	}	
}


Sprite_ZzyGCFNumber.prototype.refreshHaveCollection = function()
{
	//通过位图集来进行显示
	
	//位图范围0~9
	var bCount = 0;//位数

	this.tNumber = this.showNumber;
	this.tArrIndex = [];
	//获取位数

	if(this.tNumber === 0)
	{
		this.tArrIndex.push(0);
		bCount++;
	}
	else
	{
		while(this.tNumber !== 0)
		{

			this.tArrIndex.push(this.tNumber%10);
			this.tNumber = Math.floor(this.tNumber/10);
			bCount++;
			
		}		
	}

	var totalWidth = 0;//总长度
	var startPosX = 0;//开始X位置
	for(var i=0;i<this.tArrIndex.length;i++)
	{
		var tBitmap = this.collection[this.tArrIndex[i]];
		if(!tBitmap)continue;
		totalWidth += tBitmap.width;
	}
	

	switch(this.drawPos)
	{
		case 'left':
			startPosX = 0;
		break;
		
		case 'center':
			startPosX = this.bWidth/2 - totalWidth/2;
		break;
		
		case 'right':
			startPosX = this.bWidth - totalWidth;
		break;
	}
	
	var currentX = 0;
	
	
	this.tArrIndex.reverse();//调个顺序
	
	if(this.isFillDigit)//存在填充占位
	{
		if(bCount < this.digitCount)
		{
			var tCount = this.digitCount - bCount;//添位
			var ZeroArr = [];
			for(var i=0;i<tCount;i++)
			{
				ZeroArr[i] = 0;
			}
			
			this.tArrIndex = Zzy.GCF.InsertToOtherArr(this.tArrIndex,0,ZeroArr);
			
		}
	}		
		
	for(var i=0;i<this.tArrIndex.length;i++)
	{
		var tBitmap = this.collection[this.tArrIndex[i]];
		if(!tBitmap)continue;
		this.bitmap.blt(tBitmap,0,0,tBitmap.width,tBitmap.height,
		startPosX+currentX,0,tBitmap.width,tBitmap.height);//传递
		currentX += tBitmap.width;		
	}	


}


Sprite_ZzyGCFNumber.prototype.refreshNoCollection = function()
{
	var isSenior = false;//是否拥有高级效果
	if(this.isGradualNumber || this.isGradualBorder || 
	this.isTextureNumber || this.isTextureBorder)//包含渐变文字时
	{isSenior = true;}


	var number = this.showNumber;
	if(this.isFillDigit)
	{number = this.getFillDigitText(number);}		

	if(isSenior)
	{
		this.bitmap._context.font = this.bitmap._makeFontNameText();
		this.bitmap._context.lineWidth = this.bitmap.outlineWidth;
		
		this.drawSeniorText(number,
		0,
		this.bitmap.fontSize,
		this.bWidth,this.drawPos);
	}
	else
	{

		this.bitmap.drawText(number,0,0,this.bWidth,this.bHeight,this.drawPos);
	}	
}


Sprite_ZzyGCFNumber.prototype.getFillDigitText = function(number)//获取补位内容
{
	//数组转换成字符串
	var nStr = number.toString();//转换成字符串
	if(nStr.length < this.digitCount)
	{
		var count = this.digitCount - nStr.length;
		
		//添加字符串
		var strBuffer = [];
		for(var i=0;i<count;i++)
		{
			strBuffer.push('0');//压入0
		}
		strBuffer.push(nStr);
	}
	
	
	nStr = strBuffer.join("");
	return nStr;
}


Sprite_ZzyGCFNumber.prototype.drawSeniorText = function(text,x,y,width,align)
{
	var tx = x;
	if(align === 'center')
	{
		tx += width / 2;
	}
	else if(align === 'right')
	{
		tx += width;
	}
	this.bitmap._context.textAlign = align;
	
	if(this.isBorderBottom)
	{
		if(this.isGradualBorder || this.isTextureBorder)
		{this.bitmap._context.strokeText(text,tx,
		y,width);}
		
		if(this.isGradualNumber || this.isTextureNumber)
		{this.bitmap._context.fillText(text,tx,
		y,width);}			
	}
	else
	{
		if(this.isGradualNumber || this.isTextureNumber)
		{this.bitmap._context.fillText(text,tx,
		y,width);}	

		if(this.isGradualBorder || this.isTextureBorder)
		{this.bitmap._context.strokeText(text,tx,
		y,width);}			
	}
	

}



Sprite_ZzyGCFNumber.prototype.setDrawPos = function(pos)//设置显示位置
{this.drawPos = pos;}
Sprite_ZzyGCFNumber.prototype.setTextPos = function(pos)
{this.drawPos = pos;}
Sprite_ZzyGCFNumber.prototype.setNumberPos = function(pos)
{this.drawPos = pos;}


Sprite_ZzyGCFNumber.prototype.setIsDynNumber = function(isEnable)//设置动态增分
{this.isDynNumber = isEnable;}

Sprite_ZzyGCFNumber.prototype.ExecuteDynNumber = function()//这个方法的公式可以用来重写
{
	//不存在动态增分时
	if(!this.isDynNumber){this.showNumber = this.realNumber;return;}

	var disPar = this.realNumber - this.showNumber;
	this.dyning = true;
	
	if(disPar > 100000)
	{
		this.showNumber += 100000;
	}
	else if(disPar > 10000)
	{
		this.showNumber += 10000;
	}
	else if(disPar > 1000)
	{
		this.showNumber += 1000;
	}	
	else if(disPar > 100)
	{
		this.showNumber += 100;
	}
	else if(disPar > 10)
	{
		this.showNumber += 10;
	}
	else if(disPar > 1)
	{
		this.showNumber += 1;
	}
	else if(disPar < -100000)
	{
		this.showNumber -= 100000;
	}
	else if(disPar < -10000)
	{
		this.showNumber -= 10000;
	}
	else if(disPar < -1000)
	{
		this.showNumber -= 1000;
	}
	else if(disPar < -100)
	{
		this.showNumber -= 100;
	}
	else if(disPar < -10)
	{
		this.showNumber -= 10;
	}
	else if(disPar < -1)
	{
		this.showNumber -= 1;
	}
	else
	{
		this.showNumber = this.realNumber;
		//这是因为可能存在小数	
		this.dyning = false;
	}
}

Sprite_ZzyGCFNumber.prototype.isDyning = function()
{
	return this.dyning;
}


Sprite_ZzyGCFNumber.prototype.isNotUpdate = function()//不满足更新的情况
{
	if(this.realNumber === this.showNumber)return false;//相同则不需要更新
	
	return true;
}

Sprite_ZzyGCFNumber.prototype.ForceSetNumber = function(number)
{
	this.realNumber = number;
	this.showNumber = number;
	this.refresh();
}

Sprite_ZzyGCFNumber.prototype.setShowNumber = function(number)//设置显示值
{
	this.showNumber = number;
}

Sprite_ZzyGCFNumber.prototype.setNumber = function(number)
{
	this.realNumber = number;
}
Sprite_ZzyGCFNumber.prototype.setValue = function(value)
{
	this.realNumber = value;
}

Sprite_ZzyGCFNumber.prototype.addNumber = function(number)
{
	this.realNumber += number;
}

Sprite_ZzyGCFNumber.prototype.addValue = function(value)
{
	this.realNumber += value;
}

Sprite_ZzyGCFNumber.prototype.subNumber = function(number)
{
	this.realNumber -= number;
}

Sprite_ZzyGCFNumber.prototype.subValue = function(value)
{
	this.realNumber -= value;
}



Sprite_ZzyGCFNumber.prototype.borderWidth = function(width)//设置边框宽度
{this.bitmap.outlineWidth = width;this.isRefresh = true;}

Sprite_ZzyGCFNumber.prototype.setBorderWidth = function(width)
{
	this.bitmap.outlineWidth = width;
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.hideBorder = function()
{
	//隐藏
	this.bitmap.outlineWidth = 0;
	this.setGradualColorOfBorder(['rgba(0,0,0,0)']);
	this.isRefresh = true;
}







Sprite_ZzyGCFNumber.prototype.addBorderWidth = function(width)
{
	this.bitmap.outlineWidth += width;
	this.isRefresh = true;
}


Sprite_ZzyGCFNumber.prototype.subBorderWidth = function(width)
{
	this.bitmap.outlineWidth -= width;
	this.isRefresh = true;
}


Sprite_ZzyGCFNumber.prototype.borderColor = function(colorStr)//设置边框颜色
{this.bitmap.outlineColor = colorStr;this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.setBorderColor = function(colorStr)//设置边框颜色
{this.bitmap.outlineColor = colorStr;this.isRefresh = true;}

Sprite_ZzyGCFNumber.prototype.borderRedColor = function()//红
{this.bitmap.outlineColor = 'rgba(240,40,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderOrangeColor = function()//橙
{this.bitmap.outlineColor = 'rgba(240,120,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderYellowColor = function()//黄
{this.bitmap.outlineColor = 'rgba(240,240,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderEmeraldColor = function()//翠绿
{this.bitmap.outlineColor = 'rgba(120,240,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderGreenColor = function()//绿
{this.bitmap.outlineColor = 'rgba(40,240,40,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderTurquoiseColor = function()//青绿
{this.bitmap.outlineColor = 'rgba(40,240,120,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderCyanColor = function()//青
{this.bitmap.outlineColor = 'rgba(40,240,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderSeablueColor = function()//海蓝
{this.bitmap.outlineColor = 'rgba(40,120,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderBlueColor = function()//蓝
{this.bitmap.outlineColor = 'rgba(40,40,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderPurpleColor = function()//紫
{this.bitmap.outlineColor = 'rgba(120,40,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderPinkColor = function()//粉
{this.bitmap.outlineColor = 'rgba(240,40,240,1)';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.borderPinkredColor = function()//粉红
{this.bitmap.outlineColor = 'rgba(240,40,120,1)';this.isRefresh = true;}


Sprite_ZzyGCFNumber.prototype.numberColor = function(colorStr)
{this.bitmap.textColor = colorStr;this.isRefresh = true;}

Sprite_ZzyGCFNumber.prototype.setNumberColor = function(colorStr)
{
	this.bitmap.textColor = colorStr;
	this.isRefresh = true;
}


Sprite_ZzyGCFNumber.prototype.numberRedColor = function()//红
{this.bitmap.textColor = '#ff2222';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberOrangeColor = function()//橙
{this.bitmap.textColor = '#ff7f22';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberYellowColor = function()//黄
{this.bitmap.textColor = '#ffff22';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberEmeraldColor = function()//翠绿
{this.bitmap.textColor = '#7fff22';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberGreenColor = function()//绿
{this.bitmap.textColor = '#22ff22';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberTurquoiseColor = function()//青绿
{this.bitmap.textColor = '#22ff7f';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberCyanColor = function()//青
{this.bitmap.textColor = '#22ffff';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberSeablueColor = function()//海蓝
{this.bitmap.textColor = '#227fff';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberBlueColor = function()//蓝
{this.bitmap.textColor = '#2222ff';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberPurpleColor = function()//紫
{this.bitmap.textColor = '#7f22ff';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberPinkColor = function()//粉
{this.bitmap.textColor = '#ff22ff';this.isRefresh = true;}
Sprite_ZzyGCFNumber.prototype.numberPinkredColor = function()//粉红
{this.bitmap.textColor = '#ff227f';this.isRefresh = true;}


Sprite_ZzyGCFNumber.prototype.Random12TextColor = function()//一个随机12色文字
{
	var textColorFun = [this.numberRedColor,this.numberOrangeColor,this.numberYellowColor,this.numberEmeraldColor,this.numberGreenColor,this.numberTurquoiseColor,this.numberCyanColor,this.numberSeablueColor,this.numberBlueColor,this.numberPurpleColor,this.numberPinkColor,this.numberPinkredColor];
	
	var rcID = Zzy.GCF.RandomIntArea(0,12);
	textColorFun[rcID].call(this);
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.Random12BorderColor = function()//一个随机12色边框
{
	var borderColorFun = [this.borderRedColor,this.borderOrangeColor,this.borderYellowColor,this.borderEmeraldColor,this.borderGreenColor,this.borderTurquoiseColor,this.borderCyanColor,this.borderSeablueColor,this.borderBlueColor,this.borderPurpleColor,this.borderPinkColor,this.borderPinkredColor];	
	var rcID = Zzy.GCF.RandomIntArea(0,12);
	borderColorFun[rcID].call(this);
	this.isRefresh = true;
}

Sprite_ZzyGCFNumber.prototype.Random12Color = function()//一个随机12色文字和边框
{
	this.Random12TextColor();
	this.Random12BorderColor();
	this.isRefresh = true;
}




//==========================================================================
//Sprite_ZzyGCFAnimaBase
//==========================================================================

function Sprite_ZzyGCFAnimaBase() 
{
    this.initialize.apply(this, arguments);
}


Sprite_ZzyGCFAnimaBase.prototype = Object.create(Sprite_ZzyGCFBase.prototype);
Sprite_ZzyGCFAnimaBase.prototype.constructor = Sprite_ZzyGCFAnimaBase;

Sprite_ZzyGCFAnimaBase.prototype.initialize = function(x,y,fileName,hue) 
{
	Sprite_ZzyGCFBase.prototype.initialize.call(this,x,y,fileName,hue);
	
	this.collection = this.bitmap;
	this.fileName = fileName;
	this.visible = this.DefaultAnimaVisible();//不显示
	this.animaArr1 = [];//存放位图的一维数组
	this.animaArr2 = [];//存放位图的二维数组
	this.isWaitSplit = true;//等待拆分
	
	this.animaFrame = this.DefaultAnimationFrame();//默认动画6帧播放一格
	this.animaSpeed = this.DefaultAnimationSpeed();//动画播放速度,这会影响动画速率,这个值默认为1
	this.animaMode = this.DefaultAnimationMode();//播放模式,一般分为单次,循环,乒乓
	this.animaCFrame = 0;//等待的计数
	
	this.animaIndex = this.DefaultAnimationIndex();//动画下标
	this.isAnimaPause = this.DefaultAnimationPause();//动画暂停
	this.isAnimaMirror = this.DefaultAnimaMirror();//是否镜像播放动画
	
	
	
	this.delayAnima = 0;//延迟播放
	this.isDelayAnima = false;//延迟判断
	
	
	//模式2的参数
	this.isPingpangDir = false;//是否为乒乓反向中
	
	//模式3的参数
	this.animaLoopCount = 0;//循环圈数
}

Sprite_ZzyGCFAnimaBase.prototype.DefaultAnimationPause = function()
{
	return false;
}

Sprite_ZzyGCFAnimaBase.prototype.DefaultAnimaMirror = function()
{
	return false;
}

Sprite_ZzyGCFAnimaBase.prototype.DefaultAnimaVisible = function()
{
	return false;
}



Sprite_ZzyGCFAnimaBase.prototype.update = function()
{
	Sprite_ZzyGCFBase.prototype.update.call(this);
	this.updateAnimaPicLoad();//更新加载
	
	if(this.updateAnimaDelay())return;//更新延迟
	this.updateAnimation();//更新动画

}



Sprite_ZzyGCFAnimaBase.prototype.updateAnimaDelay = function()
{
	if(this.isDelayAnima)
	{
		if(this.delayAnima > 0)
		{
			this.delayAnima--;
			return false;
		}
		else
		{
			this.delayAnima = 0;
			this.isDelayAnima = false;
			return true;
		}
	}
	return false;
}



Sprite_ZzyGCFAnimaBase.prototype.updateAnimation = function()//更新动画
{
	if(this.isAnimaPause)return;
	
	if(this.animaCFrame < this.animaFrame)
	{
		this.animaCFrame += this.animaSpeed;//添加帧数
	}
	else
	{
		this.animaCFrame -= this.animaFrame;
		//触发一次变动
		this.AutoChangeAnimation();//自动切换动画
	}
}


Sprite_ZzyGCFAnimaBase.prototype.AutoChangeAnimation = function()//自动执行动画效果
{
	
	switch(this.animaMode)
	{
		case 1:
			this.ExecuteAnimaMode1();
		break;
		case 2:
			this.ExecuteAnimaMode2();
		break;
		case 3:
			this.ExecuteAnimaMode3();
		break;
	}
	
}



Sprite_ZzyGCFAnimaBase.prototype.ExecuteAnimaMode1 = function()//模式1循环,执行
{
	if(this.isAnimaMirror)//镜像
	{this.PrevAnimaBitmap();}
	else
	{this.NextAnimaBitmap();}	
}


Sprite_ZzyGCFAnimaBase.prototype.ExecuteAnimaMode2 = function()//模式2乒乓,执行
{
	if(this.isAnimaMirror)//镜像
	{
		if(this.isPingpangDir)
		{
			if(this.ReturnNextAnimaIndexButLimit() < 0)
			{
				this.ReturnPrevAnimaIndexButLimit();
				this.isPingpangDir = true;
			}			
		}
		else
		{
			if(this.ReturnPrevAnimaIndexButLimit() < 0)
			{
				this.ReturnNextAnimaIndexButLimit();
				this.isPingpangDir = false;
			}			
		}
	}
	else
	{
		if(this.isPingpangDir)
		{
			if(this.ReturnPrevAnimaIndexButLimit() < 0)
			{
				this.ReturnNextAnimaIndexButLimit();
				this.isPingpangDir = false;
			}
		}
		else
		{
			if(this.ReturnNextAnimaIndexButLimit() < 0)
			{
				this.ReturnPrevAnimaIndexButLimit();
				this.isPingpangDir = true;
			}
		}
	}
	this.setAnimaBitmap(this.animaIndex);
}


Sprite_ZzyGCFAnimaBase.prototype.ExecuteAnimaMode3 = function()//模式3循环一定次数,执行
{
	if(this.isAnimaMirror)//镜像
	{
		if(this.ReturnPrevAnimaIndexButLimit() < 0)
		{
			this.animaLoopCount--;
			if(this.animaLoopCount<=0)
			{
				this.animaLoopCount = 0;
				this.animaMode = 0;
			}
		}
	}
	else
	{
		if(this.ReturnNextAnimaIndexButLimit() < 0)
		{
			this.animaLoopCount--;
			if(this.animaLoopCount<=0)
			{
				this.animaIndex = 0;
				this.animaLoopCount = 0;
				this.animaMode = 0;
			}			
		}
		
	}
	this.setAnimaBitmap(this.animaIndex);
}

Sprite_ZzyGCFAnimaBase.prototype.setAnimaMode = function(mode,count)//设置模式
{
	switch(mode)
	{
		case 0:this.animaMode = 0;break;
		case 1:case 'loop':this.animaMode = 1;break;
		case 2:case 'pingpang':this.animaMode = 2;break;
		case 3:
			this.animaMode = 3;
			this.animaLoopCount = count > 0 ? count : 1;
			break;
		default:
		this.animaMode = 0;
	}
}

Sprite_ZzyGCFAnimaBase.prototype.updateAnimaPicLoad = function()
{
	if(!this.isWaitSplit)return false;
		if(this.collection.width && this.collection.height)//加载完成
		{
			//拆分
			this.animaArr1 = Zzy.GCF.SplitPictureToArr1(this.fileName,this.collection);
			this.animaArr2 = Zzy.GCF.SplitPictureToArr2(this.fileName,this.collection);
			this.startAnimaShow();//显示
			this.isWaitSplit = false;
		}
	return true;
}



Sprite_ZzyGCFAnimaBase.prototype.setAnimaIndex = function(index)
{
	//设置范围
	var ti = index ? index : 0;
	//防止越界 
	ti = Math.min(ti,this.animaArr1.length-1);
	this.animaIndex = ti;
}

Sprite_ZzyGCFAnimaBase.prototype.getAnimaIndex = function()
{
	return this.animaIndex;
}

Sprite_ZzyGCFAnimaBase.prototype.getAnimaBitmapIndex = function()//获取当前下标
{
	return this.animaIndex;
} 



Sprite_ZzyGCFAnimaBase.prototype.startAnimaShow = function()//开始播放动画
{
	this.bitmap = this.animaArr1[this.animaIndex];
	this.visible = true;
}

Sprite_ZzyGCFAnimaBase.prototype.DefaultAnimationFrame = function()
{
	//默认动画帧，这代表经过多少帧数会播放一格动画
	return 6;
}

Sprite_ZzyGCFAnimaBase.prototype.DefaultAnimationSpeed = function()
{
	return 1;
}

Sprite_ZzyGCFAnimaBase.prototype.DefaultAnimationMode = function()//播放模式
{
	//0代表无类型//1代表循环//2代表乒乓//3代表单次
	return 1;
}


Sprite_ZzyGCFAnimaBase.prototype.DefaultAnimationIndex = function()//默认开始下标
{
	return 0;//默认开始时的下标
}

Sprite_ZzyGCFAnimaBase.prototype.setAnimationFrame = function(animaFrame)//设置每帧动画执行时长
{
	this.animaFrame = animaFrame;
}

Sprite_ZzyGCFAnimaBase.prototype.setAnimationSpeed = function(animaSpeed)//设置每帧的执行速度
{
	this.animaSpeed = animaSpeed;
}

Sprite_ZzyGCFAnimaBase.prototype.setAnimationMode = function(animaMode)//设置动画模式
{
	this.animaMode = animaMode;
}




Sprite_ZzyGCFAnimaBase.prototype.setAnimaMirror = function(isEnable)
{
	this.isAnimaMirror = isEnable;
}

Sprite_ZzyGCFAnimaBase.prototype.changeAnimaMirror = function()//切换播放
{
	this.isAnimaMirror = !this.isAnimaMirror;
}

Sprite_ZzyGCFAnimaBase.prototype.setAnimaDelay = function(delay)//设置延迟
{
	this.delayAnima = delay;
	this.isDelayAnima = true;	
}

Sprite_ZzyGCFAnimaBase.prototype.setAnimaPause = function(isEnable)
{
	this.isAnimaPause = isEnable;
}


Sprite_ZzyGCFAnimaBase.prototype.changeAnimaPause = function()
{
	this.isAnimaPause = !this.isAnimaPause;
}




Sprite_ZzyGCFAnimaBase.prototype.PrevAnimaBitmap = function()//切换到前一张图片
{
	this.animaIndex--;
	if(this.animaIndex<0){this.animaIndex = this.animaArr1.length-1;}
	this.bitmap = this.animaArr1[this.animaIndex];
}

Sprite_ZzyGCFAnimaBase.prototype.NextAnimaBitmap = function()//切换到下一张图片
{
	this.animaIndex = (this.animaIndex+1)%this.animaArr1.length;
	this.bitmap = this.animaArr1[this.animaIndex];
}

Sprite_ZzyGCFAnimaBase.prototype.setAnimaBitmap = function(animaIndex)
{
	this.bitmap = this.animaArr1[animaIndex];
}

Sprite_ZzyGCFAnimaBase.prototype.ReturnPrevAnimaIndexButLimit = function()//返回前一个坐标但是有边界
{
	this.animaIndex--;
	if(this.animaIndex < 0)
	{
		this.animaIndex = 0;
		return -1;
	}
	return this.animaIndex;
}

Sprite_ZzyGCFAnimaBase.prototype.ReturnNextAnimaIndexButLimit = function()//返回下一个坐标但是有边界
{
	this.animaIndex++;
	if(this.animaIndex >= this.animaArr1.length)
	{
		this.animaIndex = this.animaArr1.length-1;
		return -1;
	}
	return this.animaIndex;
}


//==========================================================================
//Sprite_ZzyGCFSelectCursorBase
//==========================================================================
//光标可以调整位置信息,注意光标要为动画类型


function Sprite_ZzyGCFSelectCursorBase() 
{
    this.initialize.apply(this, arguments);
}


Sprite_ZzyGCFSelectCursorBase.prototype = Object.create(Sprite_ZzyGCFAnimaBase.prototype);
Sprite_ZzyGCFSelectCursorBase.prototype.constructor = Sprite_ZzyGCFSelectCursorBase;

Sprite_ZzyGCFSelectCursorBase.prototype.initialize = function(fileName,hue,isAnima) 
{
	var x = Graphics.boxWidth/2;
	var y = Graphics.boxHeight/2;
	
	this.isAnima = isAnima ? true : false;
	Sprite_ZzyGCFAnimaBase.prototype.initialize.call(this,x,y,fileName,hue);

	this.selectList = [];
	this.selectIndex = this.defaultSelectIndex();//选择下标
	this.isCanUpLoop = this.defaultUpLoop();//允许下标上循环
	this.isCanDownLoop = this.defaultDownLoop();//允许下标下循环
	this.offSetList = [];//偏移列表
	this.functionList = [];//函数列表
	
	this.isResponseMouse = this.defaultResponseMouse();//是否响应鼠标
	this.isResponseKey = this.defaultResponseKey();//是否响应键盘
	
	this.isDelaySelectCommand = false;//延迟选择命令
	this.delaySelectCommand = 0;
	this.CdelaySelectCommand = 0;
	this.executeFunction = null;
	
}


Sprite_ZzyGCFSelectCursorBase.prototype.updateAnimaPicLoad = function()
{
	if(this.isAnima)
	{
		Sprite_ZzyGCFAnimaBase.prototype.updateAnimaPicLoad.call(this);
	}
	else
	{
		this.isWaitSplit = false;
		this.startAnimaShow();//显示
		this.animaArr1 = [this.bitmap];
	}
	
}



Sprite_ZzyGCFSelectCursorBase.prototype.update = function()
{
	Sprite_ZzyGCFAnimaBase.prototype.update.call(this);
	
	this.updateResponseMouse();
	this.updateSelectCommand();//执行选择指令
}

Sprite_ZzyGCFSelectCursorBase.prototype.updateResponseMouse = function()
{
	if(!this.isResponseMouse)return;
	var len = this.selectList.length;
	
	for(var i=0;i<len;i++)
	{
		var fw = this.selectList[i].bitmap.width/2;
		var fh = this.selectList[i].bitmap.height/2;
		
		var rect = {left:this.selectList[i].x-fw,right:this.selectList[i].x+fw,up:this.selectList[i].y-fh,down:this.selectList[i].y+fh};
		var pt = {x:Zzy.GCF.MoveX,y:Zzy.GCF.MoveY}; 

		if(Zzy.GCF.PtInRect(pt,rect))//在范围中
		{
			this.setSelectIndex(i);//设置下标
			return;
		}
		
	}
}

Sprite_ZzyGCFSelectCursorBase.prototype.updateSelectCommand = function()
{
	if(!this.isDelaySelectCommand)return;
	
	if(this.CdelaySelectCommand < this.delaySelectCommand)
	{
		this.CdelaySelectCommand++;
	}
	else
	{
		this.CdelaySelectCommand = 0;
		this.delaySelectCommand = 0;
		this.isDelaySelectCommand = false;
		this.executeFunction();//执行
	}
	
}

	
	

Sprite_ZzyGCFSelectCursorBase.prototype.defaultResponseKey = function()
{
	return true;
}

Sprite_ZzyGCFSelectCursorBase.prototype.defaultResponseMouse = function()
{
	return true;
}

Sprite_ZzyGCFSelectCursorBase.prototype.defaultDownLoop = function()//允许下标下循环
{
	return true;
}

Sprite_ZzyGCFSelectCursorBase.prototype.defaultUpLoop = function()//允许下标上循环
{
	return true;
}

Sprite_ZzyGCFSelectCursorBase.prototype.defaultSelectIndex = function()
{
	return 0;
}

Sprite_ZzyGCFSelectCursorBase.prototype.clearSelectList = function()//添加精灵对象
{
	this.selectList = [];
	this.offSetList = [];
}

Sprite_ZzyGCFSelectCursorBase.prototype.pushSelectSpr = function(spr,offsetX,offsetY)//添加精灵对象,参数2,3代表偏移
{
	offsetX = offsetX ? offsetX : 0;
	offsetY = offsetY ? offsetY : 0;
	
	var index = this.selectList.length;
	this.selectList.push(spr);
	this.offSetList[index] = {ofx:offsetX,ofy:offsetY};
}


Sprite_ZzyGCFSelectCursorBase.prototype.pushSelectSprArr = function(sprArr,offsetX,offsetY)////添加精灵对象组,参数2,3代表偏移
{
	var len = sprArr.length;
	for(var i=0;i<len;i++)
	{
		var tSpr = sprArr[i];
		if(!tSpr)continue;
		this.pushSelectSpr(tSpr,offsetX,offsetY);
	}
}


Sprite_ZzyGCFSelectCursorBase.prototype.popSelectSpr = function()
{
	if(this.selectList.length)
	{
		this.offSetList[this.selectList.length-1] = null;
		return this.selectList.pop();
	}
	return null;
}

Sprite_ZzyGCFSelectCursorBase.prototype.insertSelectSpr = function(index,spr,offsetX,offsetY)
{
	offsetX = offsetX ? offsetX : 0;
	offsetY = offsetY ? offsetY : 0;	
	
	//判断是否超过了最大长度
	var len = this.selectList.length;
	index = index < len ? index : len; 
	//向后腾出位置
	for(var i=len-1;i>=index;i++)
	{
		this.selectList[i+1] = this.selectList[i];
		this.offSetList[i+1] = this.offSetList[i];
	}
	this.selectList[index] = spr;
	this.offSetList[index] = {ofx:offsetX,ofy:offsetY};
}

Sprite_ZzyGCFSelectCursorBase.prototype.insertSelectSprArr = function(index,sprArr,offsetX,offsetY)
{
	var len = sprArr.length;
	for(var i=0;i<len;i++)
	{
		var tSpr = sprArr[i];
		if(!tSpr)continue;
		this.insertSelectSpr(index+i,tSpr,offsetX,offsetY);
	}
}


Sprite_ZzyGCFSelectCursorBase.prototype.removeSelectSpr = function(index,spr)
{
	var len = this.selectList.length;
	if(index >= len)return null;
	var reSpr = this.selectList[index];
	
	for(var i=index;i<len-1;i++)
	{
		this.selectList[i] = this.selectList[i+1];
	}
	this.offSetList[this.selectList.length-1] = null;
	this.selectList.pop();
	return reSpr;
}

Sprite_ZzyGCFSelectCursorBase.prototype.getSelectIndex = function()
{
	return this.selectIndex;
}


Sprite_ZzyGCFSelectCursorBase.prototype.setSelectOffset = function(index,offsetX,offsetY)
{
	if(index >= this.selectList.length)return false;
	this.offSetList[index] = this.offSetList[index] || {};
	this.offSetList[index].ofx = offsetX;
	this.offSetList[index].ofy = offsetY;
	return true;
}

Sprite_ZzyGCFSelectCursorBase.prototype.addSelectOffset = function(index,offsetX,offsetY)
{
	if(index >= this.selectList.length)return false;
	this.offSetList[index] = this.offSetList[index] || {};
	this.offSetList[index].ofx += offsetX;
	this.offSetList[index].ofy += offsetY;
	return true;	
}


Sprite_ZzyGCFSelectCursorBase.prototype.subSelectOffset = function(index,offsetX,offsetY)
{
	if(index >= this.selectList.length)return false;
	this.offSetList[index] = this.offSetList[index] || {};
	this.offSetList[index].ofx -= offsetX;
	this.offSetList[index].ofy -= offsetY;
	return true;	
}


Sprite_ZzyGCFSelectCursorBase.prototype.setAllSelectOffset = function(offsetX,offsetY)//设置所有的偏移为指定值
{
	offsetX = offsetX ? offsetX : 0;
	offsetY = offsetY ? offsetY : 0;		
	var len = this.selectList.length;
	for(var i=0;i<len;i++)
	{
		this.offSetList[i] = {ofx:offsetX,ofy:offsetY};
	}
}

Sprite_ZzyGCFSelectCursorBase.prototype.addAllSelectOffset = function(addOfx,addOfy)
{
	var len = this.selectList.length;
	for(var i=0;i<len;i++)
	{
		this.offSetList[i].ofx += addOfx;
		this.offSetList[i].ofy += addOfy;
	}	
}

Sprite_ZzyGCFSelectCursorBase.prototype.subAllSelectOffset = function(subOfx,subOfy)
{
	var len = this.selectList.length;
	for(var i=0;i<len;i++)
	{
		this.offSetList[i].ofx -= subOfx;
		this.offSetList[i].ofy -= subOfy;
	}	
}

Sprite_ZzyGCFSelectCursorBase.prototype.setSelectIndex = function(index)//设置下标值
{
	var tIndex = Math.min(this.selectList.length-1,Math.max(0,index));
	this.selectIndex = tIndex;
	this.CursorMove();
}

Sprite_ZzyGCFSelectCursorBase.prototype.NextSelect = function(count)//切换到下面的选择
{
	count = count ? count : 1;
	this.selectIndex += count;
	
	if(this.selectIndex >= this.selectList.length)
	{
		if(this.isCanDownLoop)
		{
			this.selectIndex = this.selectIndex % this.selectList.length;
		}
		else
		{
			this.selectIndex = this.selectList.length-1;
		}
	}
	this.CursorMove();
}

Sprite_ZzyGCFSelectCursorBase.prototype.PrevSelect = function(count)//切换到前面的选择
{
	count = count ? count : 1;
	this.selectIndex -= count;
	
	if(this.selectIndex < 0)
	{
		if(this.isCanUpLoop)
		{
			this.selectIndex = this.selectIndex % this.selectList.length;
			if(this.selectIndex < 0)
			{
				this.selectIndex += this.selectList.length;//变为正数
			}
		}
		else
		{
			this.selectIndex = 0;
		}
	}
	this.CursorMove();
}

Sprite_ZzyGCFSelectCursorBase.prototype.CursorMove = function()//光标移动方式
{
	this.x = this.selectList[this.selectIndex].x + this.offSetList[this.selectIndex].ofx;
	this.y = this.selectList[this.selectIndex].y + this.offSetList[this.selectIndex].ofy;
}

Sprite_ZzyGCFSelectCursorBase.prototype.BindSelectFunction = function(index,Fun)
{
	this.functionList[index] = Fun;//绑定函数
	
}

Sprite_ZzyGCFSelectCursorBase.prototype.BindSelectCommand = function(index,Fun)
{
	this.functionList[index] = Fun;//绑定函数
	
}

Sprite_ZzyGCFSelectCursorBase.prototype.ExecuteCommand = function(delay)//执行命令,满足延迟
{	
	this.isDelaySelectCommand = true;//延迟选择命令
	this.delaySelectCommand = delay ? delay : 0;
	this.CdelaySelectCommand = 0;
	this.executeFunction = this.functionList[this.selectIndex];
}




//==========================================================================
//Sprite_ZzyGCFTileBase
//==========================================================================

function Sprite_ZzyGCFTileBase() 
{
    this.initialize.apply(this, arguments);
}


Sprite_ZzyGCFTileBase.prototype = Object.create(TilingSprite.prototype);
Sprite_ZzyGCFTileBase.prototype.constructor = Sprite_ZzyGCFTileBase;

Sprite_ZzyGCFTileBase.prototype.initialize = function(width,height,value,fileName,hue) 
{
	TilingSprite.prototype.initialize.call(this);
	this.originzWidth = width ? width : 0;
	this.originzHeigth = height ? height : 0;
	this.originValue = value ? value : 0;

	this.loadBitmap(fileName,hue);
	
	this.posX = 0;
	this.posY = 0;
	
	this.zWidth = width;	
	this.zHeight = height;
	
	this.value = value;//这个值会决定width或者height的变化
	this.isHorizontalRate = true;//水平比率确认宽度
	this.isVerticalRate = false;//垂直比率确认宽度
	
	
	this.rate = this.value / this.originValue;
	
	//最大,最小比率
	this.isRateLimit = true;//是否有rate限制
	this.minRate = 0;
	this.maxRate = 1;
	
	
	this.offsetX = 0;//偏移X
	this.offsetY = 0;//偏移Y
	this.offsetStartX = 0;
	this.offsetStartY = 0;
	this.offsetRealX = 0;//真实偏移
	this.offsetRealY = 0;//真实偏移
	this.isOffsetTimingX = false;
	this.offsetTimeX = 0;//这是渐入,渐出偏移的时长
	this.offsetCTimeX = 0;
	this.isOffsetTimingY = false;
	this.offsetTimeY = 0;//这是渐入,渐出偏移的时长
	this.offsetCTimeY = 0;
	
	this.isRefresh = true;//是否需要刷新数据
	
	this.panSprite = undefined;//绑定到对象上,跟随移动
	this.panOffsetX = 0;//偏移
	this.panOffsetY = 0;
	this.panScaleOrgX = 0;
	this.panScaleOrgY = 0;

	this.panScaleRateX = 1;
	this.panScaleRateY = 1;

	this.isPanOpacity = false;
	this.isPanScale = false;
	
	this.delayTime = 0;//延迟时间
	this.isDelaying = false;//延迟中	
	
	
	//动态数据的相关操作
	this.valuing = false;//操作中
	this.startValue = 0;
	this.endValue = 0;
	this.valueSpeed = 0;
	this.valueTime = 0;
	this.valueCTime = 0;
	this.valuePer = 0;
	this.valueMode = 0;//动态模式
	
	this.move(this.posX,this.posY,this.zWidth,this.zHeight);
}


Sprite_ZzyGCFTileBase.prototype.loadBitmap = function(fileName,hue)//位图
{
	this.bitmap = Zzy.GCF.LoadPicture(fileName,hue);//位图
}


Sprite_ZzyGCFTileBase.prototype.Pan = function(sprite)//这将绑定到精灵上
{
	this.panOffsetX = sprite.x - this.x;
	this.panOffsetY = sprite.y - this.y;
	
	this.panSprite = sprite;
}

Sprite_ZzyGCFTileBase.prototype.PanOpacity = function()//同步Opacity
{
	this.isPanOpacity = true;
	
}

Sprite_ZzyGCFTileBase.prototype.PanScale = function()//同步Scale
{
	this.isPanScale = true;
	this.panScaleOrgX = this.panSprite.tempScaleX;
	this.panScaleOrgY = this.panSprite.tempScaleY;
	this.panScaleRateX = 1;
	this.panScaleRateY = 1;
}


Sprite_ZzyGCFTileBase.prototype.PanCenter = function(sprite,offX,offY)//绑定到精灵的中心,同时添加偏移
{
	var offX2 = offX ? offX : 0;
	var offY2 = offY ? offY : 0;
	
	var x = sprite.x - this.zWidth / 2 + offX2;
	var y = sprite.y - this.zHeight / 2 + offY2;
	
	this.setPostion(x,y);
	this.Pan(sprite);
}

Sprite_ZzyGCFTileBase.prototype.PanPointer = function(sprite,pointer,offX,offY)//通过不同的点进行绑定
{
	var offX2 = 0;
	var offY2 = 0;
	switch(pointer)//图片的九个点的位置
	{
		case 'leftup':case 1:
		offX2 = -sprite.bitmap.width / 2;
		offY2 = -sprite.bitmap.height / 2;
		break;
		case 'up':case 2:
		offY2 = -sprite.bitmap.height / 2;
		break;
		case 'rightup':case 3:
		offX2 = sprite.bitmap.width / 2;
		offY2 = -sprite.bitmap.height / 2;
		break;
		case 'left':case 4:
		offX2 = -sprite.bitmap.width / 2;
		break;
		case 'center':case 5:break;
		case 'right':case 6:
		offX2 = sprite.bitmap.width / 2;
		break;
		case 'leftdown':case 7:
		offX2 = -sprite.bitmap.width / 2;
		offY2 = sprite.bitmap.height / 2;
		break;
		case 'down':case 8:
		offY2 = sprite.bitmap.height / 2;
		break;
		case 'rightdown':case 9:
		offX2 = sprite.bitmap.width / 2;
		offY2 = sprite.bitmap.height / 2;
		break;
	}
	
	this.PanCenter(sprite,offX + offX2,offY + offY2);
	
}



Sprite_ZzyGCFTileBase.prototype.unPan = function()//这将取消对精灵的绑定
{
	this.panSprite = undefined;
	this.panOffsetX = 0;
	this.panOffsetY = 0;
	this.isPanOpacity = false;
	this.isPanScale = false;
}


Sprite_ZzyGCFTileBase.prototype.isInDelaying = function()
{
	return this.isDelay;
}

Sprite_ZzyGCFTileBase.prototype.setDelay = function(delay)
{
	this.delayTime = delay;//延迟时间
	this.isDelaying = true;
}

Sprite_ZzyGCFTileBase.prototype.addDelay = function(delay)
{
	this.delayTime += delay;//延迟时间
	this.isDelaying = true;
}
Sprite_ZzyGCFTileBase.prototype.subDelay = function(delay)
{
	this.delayTime -= delay;//延迟时间
	if(this.delayTime < 0)this.delayTime = 0;
}



Sprite_ZzyGCFTileBase.prototype.getMaxValue = function()
{
	return this.originValue;
}

Sprite_ZzyGCFTileBase.prototype.setMaxValue = function(maxValue)
{
	this.originValue = maxValue;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.addMaxValue = function(maxValue)
{
	this.originValue += maxValue;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.subMaxValue = function(maxValue)
{
	this.originValue -= maxValue;
	this.isRefresh = true;
}


Sprite_ZzyGCFTileBase.prototype.setOffsetX = function(offsetX,time)//设置卷动的方向和速度
{
	this.offsetX = offsetX;
	if(!time)
	{
		this.isOffsetTimingX = false;
		this.offsetRealX = offsetX;
	}
	else
	{
		this.isOffsetTimingX = true;
		this.offsetStartX = this.offsetRealX;
		this.offsetTimeX = time;
		this.offsetCTimeX = 0;
	}
}

Sprite_ZzyGCFTileBase.prototype.setOffsetY = function(offsetY,time)//设置卷动的方向和速度
{
	this.offsetY = offsetY;
	if(!time)
	{
		this.isOffsetTimingY = false;
		this.offsetRealY = offsetY;
	}
	else
	{
		this.isOffsetTimingY = true;
		this.offsetStartY = this.offsetRealY;
		this.offsetTimeY = time;
		this.offsetCTimeY = 0;
	}
}

Sprite_ZzyGCFTileBase.prototype.setOffsetXY = function(offsetX,offsetY,time)
{
	this.setOffsetX(offsetX,time);
	this.setOffsetY(offsetY,time);
}


Sprite_ZzyGCFTileBase.prototype.setPostion = function(x,y)
{
	this.posX = x;
	this.posY = y;
	
	this.move(this.posX,this.posY,this.zWidth,this.zHeight);
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.setPosition = function(x,y)
{
	this.setPostion(x,y);
}



Sprite_ZzyGCFTileBase.prototype.setValue = function(value)//设置数值
{
	this.value = value;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.addValue = function(value)//添加数值
{
	this.value += value;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.subValue = function(value)//减少数值
{
	this.value -= value;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.setPer = function(per)//设置百分比
{
	this.value = this.originValue * per * 0.01;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.addPer = function(per)//添加百分比
{
	this.value += this.originValue * per * 0.01;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.subPer = function(per)//减少百分比
{
	this.value -= this.originValue * per * 0.01;
	this.isRefresh = true;
}



Sprite_ZzyGCFTileBase.prototype.setValueOfSpeed = function(value,speed)
{
	this.valuing = true;//操作中
	this.startValue = this.value;
	this.endValue = value;
	this.valueSpeed = speed;
	this.valueMode = 1;
}

Sprite_ZzyGCFTileBase.prototype.setValueOfTime = function(value,time)
{
	this.valuing = true;//操作中
	this.startValue = this.value;
	this.endValue = value;
	this.valueTime = time;
	this.valueCTime = 0;
	this.valueMode = 2;
}

Sprite_ZzyGCFTileBase.prototype.setValueOfPer = function(value,per)
{
	this.valuing = true;//操作中
	this.startValue = this.value;
	this.endValue = value;
	this.valuePer = per;	
	this.valueMode = 3;
}

Sprite_ZzyGCFTileBase.prototype.addValueOfSpeed = function(value,speed)
{
	var value2 = value + this.value;
	this.setValueOfSpeed(value2,speed);
}

Sprite_ZzyGCFTileBase.prototype.addValueOfTime = function(value,time)
{
	var value2 = value + this.value;
	this.setValueOfTime(value2,time);	
}

Sprite_ZzyGCFTileBase.prototype.addValueOfPer = function(value,per)
{
	var value2 = value + this.value;
	this.setValueOfPer(value2,per);	
}

Sprite_ZzyGCFTileBase.prototype.subValueOfSpeed = function(value,speed)
{
	var value2 = this.value - value;
	this.setValueOfSpeed(value2,speed);
}

Sprite_ZzyGCFTileBase.prototype.subValueOfTime = function(value,time)
{
	var value2 = this.value - value;
	this.setValueOfTime(value2,time);	
}

Sprite_ZzyGCFTileBase.prototype.subValueOfPer = function(value,per)
{
	var value2 = this.value - value;
	this.setValueOfPer(value2,per);	
}


Sprite_ZzyGCFTileBase.prototype.setPerOfSpeed = function(per,speed)//设置百分比
{
	//计算出value的相对值
	var tempValue = this.originValue * per * 0.01;
	this.setValueOfSpeed(tempValue,speed);
}

Sprite_ZzyGCFTileBase.prototype.addPerOfSpeed = function(per,speed)//设置百分比
{
	//计算出value的相对值
	var tempValue = this.originValue * per * 0.01;
	this.addValueOfSpeed(tempValue,speed);
}

Sprite_ZzyGCFTileBase.prototype.subPerOfSpeed = function(per,speed)//设置百分比
{
	//计算出value的相对值
	var tempValue = this.originValue * per * 0.01;
	this.subValueOfSpeed(tempValue,speed);
}


Sprite_ZzyGCFTileBase.prototype.setPerOfTime = function(per,time)//设置百分比
{
	var tempValue = this.originValue * per * 0.01;
	this.setValueOfTime(tempValue,time);
}

Sprite_ZzyGCFTileBase.prototype.addPerOfTime = function(per,time)//设置百分比
{
	var tempValue = this.originValue * per * 0.01;
	this.addValueOfTime(tempValue,time);
}

Sprite_ZzyGCFTileBase.prototype.subPerOfTime = function(per,time)//设置百分比
{
	var tempValue = this.originValue * per * 0.01;
	this.subValueOfTime(tempValue,time);
}

Sprite_ZzyGCFTileBase.prototype.setPerOfPer = function(per1,per2)//设置百分比
{
	var tempValue = this.originValue * per1 * 0.01;
	this.setValueOfPer(tempValue,per2);
}

Sprite_ZzyGCFTileBase.prototype.addPerOfPer = function(per1,per2)//设置百分比
{
	var tempValue = this.originValue * per1 * 0.01;
	this.addValueOfPer(tempValue,per2);
}

Sprite_ZzyGCFTileBase.prototype.subPerOfPer = function(per1,per2)//设置百分比
{
	var tempValue = this.originValue * per1 * 0.01;
	this.subValueOfPer(tempValue,per2);
}


Sprite_ZzyGCFTileBase.prototype.getValue = function()//获取数值
{
	return this.value;
}


Sprite_ZzyGCFTileBase.prototype.closeIsRateLimit = function()//关闭限制
{
	this.isRateLimit = false;
}

Sprite_ZzyGCFTileBase.prototype.startIsRateLimit = function(min,max)//启用限制
{
	this.isRateLimit = true;
	
	if(min){this.minRate = min;}
	if(max){this.maxRate = max;}
	
	this.isRefresh = true;
}


Sprite_ZzyGCFTileBase.prototype.closeHorizontalRate = function()
{
	this.isHorizontalRate = false;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.startHorizontalRate = function()
{
	this.isHorizontalRate = true;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.closeVerticalRate = function()
{
	this.isVerticalRate = false;
	this.isRefresh = true;
}

Sprite_ZzyGCFTileBase.prototype.startVerticalRate = function()
{
	this.isVerticalRate = true;
	this.isRefresh = true;
}


Sprite_ZzyGCFTileBase.prototype.setIsRateLimit = function(min,max)//设置限制
{
	var min = min ? min : 0;
	var max = max ? max : 0;
	this.minRate = min;
	this.maxRate = max;
}



Sprite_ZzyGCFTileBase.prototype.Refresh = function()
{
	
	this.rate = this.value / this.originValue;
	
	if(this.isRateLimit)//如果有限制范围,则进行限制
	{this.rate = Math.max(Math.min(this.rate,this.maxRate),this.minRate);}

	
	
	//刷新位置对比
	var tempWidth = this.originzWidth;
	var tempHeight = this.originzHeigth;
	

	
	if(this.isHorizontalRate){tempWidth *= this.rate;}
	if(this.isVerticalRate){tempHeight *= this.rate;}
	
	
	this.zWidth = tempWidth;
	this.zHeight = tempHeight;
	this.move(this.posX,this.posY,this.zWidth,this.zHeight);//重新设置位置信息
	

}




Sprite_ZzyGCFTileBase.prototype.update = function()
{
	TilingSprite.prototype.update.call(this);
	
	if(this.isRefresh)//是否需要刷新
	{
		this.Refresh();//刷新
		this.isRefresh = false;
	}
	
	this.updateTime();//更新计时
	this.updateDate();//更新数据
	this.updateScroll();//更新卷动
}





Sprite_ZzyGCFTileBase.prototype.updateTime = function()
{
	if(this.isDelaying)//延迟不会执行以下的time
	{
		this.delayTime--;
		if(this.delayTime <= 0)
		{
			this.delayTime = 0;
			this.isDelaying = false;
		}
		return;
	}	
	
	
	
	
	if(this.isOffsetTimingX)
	{
		if(this.offsetCTimeX < this.offsetTimeX)
		{
			this.offsetCTimeX++;
		}
		else
		{
			this.offsetCTimeX = this.offsetTimeX;
			this.isOffsetTimingX = false;
			this.offsetRealX = this.offsetX;
		}
	}
	
	if(this.isOffsetTimingY)
	{
		if(this.offsetCTimeY < this.offsetTimeY)
		{
			this.offsetCTimeY++;
		}
		else
		{
			this.offsetCTimeY = this.offsetTimeY;
			this.isOffsetTimingY = false;
			this.offsetRealY = this.offsetY;
		}		
	}
	
	
	
}



Sprite_ZzyGCFTileBase.prototype.updateDate = function()
{
	//更新位置信息
	if(this.panSprite)
	{
		if(this.isPanOpacity)
		{
			this.opacity = this.panSprite.opacity;
		}
		if(this.isPanScale)
		{
			this.scale.x = this.panSprite.tempScaleX;
			this.scale.y = this.panSprite.tempScaleY;
			
			if(this.panScaleOrgX !== this.panSprite.tempScaleX)
			{
				this.panScaleRateX = this.panSprite.tempScaleX / this.panScaleOrgX;
			}
			if(this.panScaleOrgY !== this.panSprite.tempScaleY)
			{
				this.panScaleRateY = this.panSprite.tempScaleY / this.panScaleOrgY;
			}
			
		}
		
		this.move((this.panSprite.x - this.panOffsetX  * this.panScaleRateX),
		(this.panSprite.y - this.panOffsetY * this.panScaleRateY),
		this.zWidth,this.zHeight);//重新设置位置信息
	}

	if(this.isOffsetTimingX)
	{this.offsetRealX = (this.offsetX - this.offsetStartX) * this.offsetCTimeX / this.offsetTimeX;}

	if(this.isOffsetTimingY)
	{this.offsetRealY = (this.offsetY - this.offsetStartY) * this.offsetCTimeY / this.offsetTimeY;}


	//更新value的数据变化
	
	this.updateValue();


}
Sprite_ZzyGCFTileBase.prototype.updateValue = function()
{
	if(!this.valuing)return;
	
	this.isRefresh = true;
	
	switch(this.valueMode)
	{
		case 1:
		this.value = Zzy.GCF.startToEndOfSpeed(this.value,this.endValue,this.valueSpeed);
		if(this.value === this.endValue)
		{this.valuing = false;}
		
		break;
		
		case 2:
		this.valueCTime++;
		this.value = Zzy.GCF.startToEndOfTime(this.startValue,this.endValue,this.valueTime,this.valueCTime);
		if(this.value === this.endValue)
		{
			this.valueCTime = 0;
			this.valueTime = 0;
			this.valuing = false;
		}
		break;
		
		case 3:
		this.value = Zzy.GCF.startToEndOfPer(this.value,this.endValue,this.valuePer,0.1);
		if(this.value === this.endValue)
		{
			this.valuing = false;
		}
		break;
	}
	
	
}



Sprite_ZzyGCFTileBase.prototype.updateScroll = function()
{
	if(this.offsetRealX)
	{
		this.origin.x -= this.offsetRealX;
	}
	
	if(this.offsetRealY)
	{
		this.origin.y -= this.offsetRealY;
	}
	
}



//==========================================================================
//Sprite_ZzyGCFBatchBase
//==========================================================================

function Sprite_ZzyGCFBatchBase() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGCFBatchBase.prototype = Object.create(Sprite_ZzyGCFAnimaBase.prototype);
Sprite_ZzyGCFBatchBase.prototype.constructor = Sprite_ZzyGCFBatchBase;
Sprite_ZzyGCFBatchBase.prototype.initialize = function(addWindowPointer) //需要添加参数 精灵源 窗口指针
{
	Sprite_ZzyGCFBase.prototype.initialize.call(this,0,0,'',0);
	this.bitmap = this.DefaultBitmap();
	this.addWindowPointer = addWindowPointer ? addWindowPointer : undefined;

	this.line = this.DefaultLine();
	this.list = this.DefaultList();
	this.anchorX = this.DefaultAnchorX();
	this.anchorY = this.DefaultAnchorY();
	this.sizeX = this.DefaultSizeX(); 
	this.sizeY = this.DefaultSizeY();
	this.exSpaceX = this.DefaultExSpaceX();
	this.exSpaceY = this.DefaultExSpaceY();
	this.offSprX = this.DefaultOffSprX();
	this.offSprY = this.DefaultOffSprY();
	
	this.offX = 0;
	this.offY = 0;
	
	this.isRefresh = true;//是否刷新
	
	this.sprArr = [];//对象池
	this.sprArr2 = [];//存放数据内容的数组
	
	this.DefaultPosition();//设置xy位置	
	this.ResetInfo(this.line,this.list);//初始化
	
	if(this.addWindowPointer){this.addWindowPointer.addChild(this);}//添加到窗口中
}


Sprite_ZzyGCFBatchBase.prototype.DefaultOffSprX = function()
{
	return 0;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultOffSprY = function()
{
	return 0;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultSizeX = function()
{
	return 32;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultSizeY = function()
{
	return 32;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultExSpaceX = function()//额外间距x
{
	return 0;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultExSpaceY = function()//额外间距y
{
	return 0;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultAnchorX = function()
{
	return 0.5;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultAnchorY = function()
{
	return 0.5;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultBitmap = function()
{
	return undefined;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultLine = function()
{
	return 5;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultList = function()
{
	return 5;
}

Sprite_ZzyGCFBatchBase.prototype.DefaultPosition = function()//默认位置
{
	this.x = Graphics.boxWidth/2;
	this.y = Graphics.boxHeight/2;
}


Sprite_ZzyGCFBatchBase.prototype.GetSpr = function(xIndex,yIndex)//返回精灵
{
	return this.sprArr2[yIndex][xIndex];
}

Sprite_ZzyGCFBatchBase.prototype.update = function()
{
	Sprite_ZzyGCFBase.prototype.update.call(this);
	this.updateRefresh();//刷新
}


Sprite_ZzyGCFBatchBase.prototype.updateRefresh = function()//刷新
{
	//刷新精灵的位置信息
	if(!this.isRefresh)return;
	
	this.RefreshSprPosition();//刷新位置
	this.RefreshCustom();//刷新自定义
	
	this.isRefresh = false;
}


Sprite_ZzyGCFBatchBase.prototype.RefreshSprPosition = function()//刷新位置
{
	//计算宽度
	var tWidth = this.sizeX * this.list;
	if(this.exSpaceX)
	{tWidth += (((this.list-1) > 0 ? (this.list-1) : 0) * this.exSpaceX);}
	
	
	var tHeight = this.sizeY * this.line;
	if(this.exSpaceY)
	{tHeight += (((this.line-1) > 0 ? (this.line-1) : 0) * this.exSpaceY);}
	

	this.offX = tWidth * this.anchorX;
	this.offY = tHeight * this.anchorY;

	var spX = this.sizeX+this.exSpaceX;
	var spY = this.sizeY+this.exSpaceY;

	for(var i=0;i<this.line;i++)
	{
		for(var j=0;j<this.list;j++)
		{
			var tx = spX*j - this.offX;
			var ty = spY*i - this.offY;			
			this.sprArr2[i][j].x = tx + this.x;
			this.sprArr2[i][j].y = ty + this.y;
			this.CorrectSprSelfPos(this.sprArr2[i][j]);//修正位置
		}
	}
}


Sprite_ZzyGCFBatchBase.prototype.CorrectSprSelfPos = function(spr)
{
	spr.x += this.offSprX;
	spr.y += this.offSprY;
}


Sprite_ZzyGCFBatchBase.prototype.ExecuteSprArrFunction1 = function()//执行方法中的函数
{
	for(var i=0;i<this.line;i++)
	{
		for(var j=0;j<this.list;j++)
		{
			this.ExecuteFunction1(this.sprArr2[i][j]);//执行函数
		}
	}
}


Sprite_ZzyGCFBatchBase.prototype.ExecuteSprArrFunction2 = function()//执行方法中的函数
{
	for(var i=0;i<this.line;i++)
	{
		for(var j=0;j<this.list;j++)
		{
			this.ExecuteFunction2(this.sprArr2[i][j]);//执行函数
		}
	}
}


Sprite_ZzyGCFBatchBase.prototype.ExecuteSprArrFunction3 = function()//执行方法中的函数
{
	for(var i=0;i<this.line;i++)
	{
		for(var j=0;j<this.list;j++)
		{
			this.ExecuteFunction3(this.sprArr2[i][j]);//执行函数
		}
	}
}

Sprite_ZzyGCFBatchBase.prototype.ResetInfo = function(line,list)
{
	if(line !== undefined)this.line = line;
	if(list !== undefined)this.list = list;
	
	this.DisVisibleAllSpr();//隐藏所有图片
	this.sprArr2 = [];//存放数据内容的数组
	for(var i=0;i<this.line;i++)
	{
		this.sprArr2[i] = [];
		for(var j=0;j<this.list;j++)
		{
			var spr = this.RequestNewSpr();//生产
			spr.ResetInfo();//重置信息
			this.sprArr2[i][j] = spr;
		}
	}
	this.RefreshSprPosition();
	this.isRefresh = true;
}

Sprite_ZzyGCFBatchBase.prototype.DisVisibleAllSpr = function()
{
	var len = this.sprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.sprArr[i])
		{
			this.sprArr[i].visible = false;
			this.DisVisibleSprAfter(this.sprArr[i]);//隐藏之后
		}
	}

}


Sprite_ZzyGCFBatchBase.prototype.SetExSpace = function(spaceX,spaceY)
{
	spaceY = spaceY ? spaceY : spaceX;
	this.exSpaceX = spaceX;
	this.exSpaceY = spaceY;
}

Sprite_ZzyGCFBatchBase.prototype.SetIntervalSize = function(sizeX,sizeY)//设置间距
{
	sizeY = sizeY ? sizeY : sizeX;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
}

Sprite_ZzyGCFBatchBase.prototype.SetAnchor = function(anchorX,anchorY)//设置锚点
{
	anchorY = anchorY ? anchorY : anchorX;
	this.anchorX = anchorX;
	this.anchorY = anchorY;
}


Sprite_ZzyGCFBatchBase.prototype.SetLineList = function(line,list)
{
	list = list ? list : line;
	this.line = line;
	this.list = list;
}

Sprite_ZzyGCFBatchBase.prototype.SetLine = function(line)
{
	return line; 
}

Sprite_ZzyGCFBatchBase.prototype.SetList = function(list)
{
	return list; 
}

Sprite_ZzyGCFBatchBase.prototype.RequestNewSpr = function()
{
	if(!this.addWindowPointer)return;
	var len = this.sprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.sprArr[i] && !this.sprArr[i].visible)
		{
			this.sprArr[i].visible = true;
			return this.sprArr[i];
		}
	}
	
	//申请对象
	var newSpr = this.CreateSpr();
	//深拷贝
	this.sprArr.push(newSpr);
	this.addWindowPointer.addChild(newSpr);//压入
	return newSpr;
}

Sprite_ZzyGCFBatchBase.prototype.RemoveAllSpr = function()//移除
{
	var len = this.sprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.sprArr[i])
		{this.addWindowPointer.removeChild(this.sprArr[i]);}
	}
	this.sprArr = [];
}


Sprite_ZzyGCFBatchBase.prototype.CreateSpr = function()//需要重载
{
	return new Sprite_ZzyGCFBase(0,0,'',0);
}


Sprite_ZzyGCFBatchBase.prototype.RefreshCustom = function()//需要重载
{
	
}

Sprite_ZzyGCFBatchBase.prototype.DisVisibleSprAfter = function(spr)//被隐藏之后,可以重载
{
	
}

Sprite_ZzyGCFBatchBase.prototype.ExecuteFunction1 = function(spr)//执行函数,可以重载
{
	
}

Sprite_ZzyGCFBatchBase.prototype.ExecuteFunction2 = function(spr)//执行函数,可以重载
{
	
}

Sprite_ZzyGCFBatchBase.prototype.ExecuteFunction3 = function(spr)//执行函数,可以重载
{
	
}




//-------------------------------Zzy.GCF.Function----------------------------

Zzy.GCF.LoadPicture = function(str,hue)//优化申请位图
{
	if(!str)
	{
		var bitm = new Bitmap(48,48);
		bitm.fillAll("rgba(0,0,0,1)");
		return bitm;
	};
	if(hue)
	{
		return ImageManager.loadPicture(str,hue);
	}
	else
	{
		//判断缓存库
		if(!Zzy.GCF.tempCacheBitmap[str])
		{
			Zzy.GCF.tempCacheBitmap[str] = ImageManager.loadPicture(str);
			return Zzy.GCF.tempCacheBitmap[str];
		}
		else
		{return Zzy.GCF.tempCacheBitmap[str];}
	}
}



//获取数据
Zzy.GCF.GameData = function()
{return $gameSystem.getZzyGCFGameData();}

Zzy.GCF.GameGlobal = function()
{return $gameSystem.getZzyGCFGameGlobal();}

Zzy.GCF.GameHistory = function()
{return $gameSystem.getGCFGameHistory();}

Zzy.GCF.Score = function()//这将返回游戏结束后获得的总分数
{return $gameSystem.getZzyGCFGameGlobal().score;}

Zzy.GCF.Time = function()//这将返回游戏结束期间经历的时长,注意以帧数为单位
{return $gameSystem.getZzyGCFGameGlobal().time;}

Zzy.GCF.Result = function()//这将返回游戏结果
{return $gameSystem.getZzyGCFGameGlobal().result;}

Zzy.GCF.Name = function()//这将返回所玩的游戏名字
{return $gameSystem.getZzyGCFGameGlobal().name;}

Zzy.GCF.IsCanKey = function()//这将返回是否可以使用键盘输入
{return $gameSystem.getZzyGCFIsCanKey();}

Zzy.GCF.IsCanTouch = function()//这将返回是否可以使用点击
{return $gameSystem.getZzyGCFIsCanTouch();}

Zzy.GCF.IsCanPause = function()//这将返回是否可以暂停
{return $gameSystem.getZzyGCFIsCanPause();}

Zzy.GCF.Keys = function()//返回按键配置
{return $gameSystem.getZzyGCFKey();}

Zzy.GCF.IsPausing = function()//返回游戏是否暂停
{return $gameSystem.getZzyGCFGameGlobal().isPausing;}
	


Zzy.GCF.startGame = function(gameName)//开始游戏
{
	//清理数据
	$gameSystem.ZzyGCFStartGameData(gameName);//开始游戏数据清理
	//SceneManager.push(Scene_ZzyGCFGame);//压入场景
	
	//配置替换键盘信息
	Zzy.GCF.BackKeyMapper();
	
	Zzy.GCF.SceneManagerPush();//压入场景
	Zzy.GCF.startGameData();
}


Zzy.GCF.BackKeyMapper = function()//配置替换键盘信息,在进入和退出游戏时,临时替换按键效果
{
	Zzy.GCF.tempKeyMapper = {};

	for(key in Input.keyMapper)
	{
		Zzy.GCF.tempKeyMapper[key] = Input.keyMapper[key];
	}
	
	//进行键盘设置
	var keys = $gameSystem.getZzyGCFKey();
	
	for(var key in keys)
	{
		var cc = String(key);
		if(cc.length <= 1)
		{
			CC = cc.toUpperCase();
			ASCII = CC.charCodeAt();
			Input.keyMapper[ASCII] = key;//存放字母
		}
	}
}



Zzy.GCF.ReLoadKeyMapper = function()//读取之前的配置信息
{
	Input.keyMapper = Zzy.GCF.tempKeyMapper;
}



Zzy.GCF.SceneManagerPush = function()//场景压入
{
	var tempG = Zzy.GCF.GameGlobal();
	var gameName = tempG.name;
	var Len = Zzy.Param.GCFHaveGame.length;
	var index = -1;
	var isHave = false;	
	
	for(var i=0;i<Len;i++)
	{
		if(gameName === Zzy.Param.GCFHaveGame[i])
		{
			isHave = true;
			index = i;
			break;
		}
	}	
	if(!isHave)//出现错误
	{
		Zzy.GCF.errorGame(1);
		this.isError = true;
		return;
	}
	//通过动态编译的方式,来获取游戏窗口
	gameName = Zzy.Param.GCFHaveRealGame[index];//转换成窗口名称
	var managerStr = 'SceneManager.push(Scene_ZzyGCF' + gameName + ')';
	eval(managerStr);//通过eval压入场景
}



Zzy.GCF.startGameData = function()
{
	$gameSystem.getZzyGCFGameGlobal().isRunning = true;//设置运行游戏
	Zzy.GCF.tempCacheBitmap = [];//清理位图缓存库
	Zzy.GCF.tempInGame = true;//在游戏中
	Zzy.GCF.tempID = 1;	
}


Zzy.GCF.exitGame = function(result)//退出游戏
{
	$gameSystem.SettlementGame(result);//结算游戏
	
	Zzy.GCF.exitGameData();//清算标记
	if(!SceneManager._stack.length)
	{SceneManager.goto(Scene_Map);}
	else
	{SceneManager.pop();}


	Zzy.GCF.ReLoadKeyMapper();//回复进入前的键盘配置

}

Zzy.GCF.exitGameData = function()
{
	Zzy.GCF.tempReleasedMapper = [];//清理按下记录
	Zzy.GCF.tempID = 0;
	Zzy.GCF.tempInGame = false;//退出游戏	
}


Zzy.GCF.errorGame = function(errorCode)//错误退出游戏
{
	Zzy.GCF.tempReleasedMapper = [];//清理按下记录
	switch(errorCode)
	{
		case 1:console.log("Error:(来自LiuYue_GameCore)运行的游戏:" + $gameSystem.getZzyGCFGameGlobal.name + "没有注册!!!");break;
	}
}

Zzy.GCF.Bug = function(errorCode)//显示错误提示
{
	switch(errorCode)
	{
		case 1:console.log("Error:1 (来自LiuYue_GameCore)调用错误:请先调用setGradualColorOfText函数,再调用addGradualColorOfText");
		break;
		case 2:console.log("Error:2 (来自LiuYue_GameCore)调用错误:请先调用setGradualColorOfBorder函数,再调用addGradualColorOfBorder");
		break;
		case 3:console.log("Error:3 (来自LiuYue_GameCore)调用错误:请先调用setGradualColorOfNumber函数,再调用addGradualColorOfNumber");
		break;
		case 4:console.log("Error:4 (来自LiuYue_GameCore)调用错误:请先调用setGradualColorOfBorder函数,再调用addGradualColorOfBorder");
		break;	
		
	}
}







Zzy.GCF.errorExitGame = function()//错误退出游戏
{
	if(!SceneManager._stack.length)
	{SceneManager.goto(Scene_Map);}
	else
	{SceneManager.pop();}
	Zzy.GCF.exitGameData();
}


Zzy.GCF.KeyCorrectAndBinding = function(keys,customs)//按键矫正和绑定
{
	//对九按进行分别设置
	var tempKeyArr = [keys.Up,keys.Down,keys.Left,keys.Right,keys.A1,keys.B1,keys.A2,keys.B2,keys.P];
	
	
	 var tempKeyArrLen = tempKeyArr.length;
	 for(var i=0;i<tempKeyArrLen;i++)
	 {
		 var tempKey = tempKeyArr[i];
		 var ASCII = 0;
		 switch(tempKey)//字符按键转换
		 {
			 //上
			 case 'up': case 'UP': case 'num8': case 'NUM8':
			 tempKeyArr[i] = 'up';
			 break;
			 //下
			 case 'down': case 'DOWN': case 'num2': case 'NUM2':
			 tempKeyArr[i] = 'down';
			 break;
			 //左
			 case 'left': case 'LEFT': case 'num4': case 'NUM4':
			 tempKeyArr[i] = 'left';
			 break;
			 //右
			 case 'right': case 'RIGHT': case 'num6': case 'NUM6':
			 tempKeyArr[i] = 'right';
			 break;
			 //z键
			 case 'Z':case 'z':case 'space':case 'enter':case 'SPACE':case 'ENTER':
			 tempKeyArr[i] = 'ok';
			 break;
			 //x键
			 case 'X':case 'x':case 'escape':case 'num0':case 'NUM0':case 'insert':case 'ESCAPE':case 'INSERT':
			 tempKeyArr[i] = 'escape';
			 break;
			 
			 case 'W':case 'w':case 'pagedown':case 'PAGEDOWN':
			 tempKeyArr[i] = 'pagedown';
			 break;	

			 case 'Q':case 'q':case 'pageup':case 'PAGEUP':
			 tempKeyArr[i] = 'pageup';
			 break;	

			 case 'tab':case 'TAB':
			 tempKeyArr[i] = 'tab';
			 break;
			 
			 case 'shift':case 'SHIFT':
			 tempKeyArr[i] = 'shift';
			 break;
			 
			 case 'control':case 'alt':case 'CONTROL':case 'ALT':
			 tempKeyArr[i] = 'control';
			 break;
			 
			 default:
			 
				if(tempKeyArr[i].length <= 1)//字母
				{
					tempKeyArr[i] = tempKeyArr[i].toUpperCase();//切换为大写字母
					// var CC = tempKeyArr[i];
					// ASCII = CC.charCodeAt();
					
					// if(ASCII > 0 && ASCII < 256)
					// {
						// Input.keyMapper[ASCII] = tempKeyArr[i];//存放字母
						
						// customs.push(ASCII);//压入自定义的信息
					// }
				}
		 }
		
	 }
	
	//按键恢复
	keys.Up = tempKeyArr[0];
	keys.Down = tempKeyArr[1];
	keys.Left = tempKeyArr[2];
	keys.Right = tempKeyArr[3];
	keys.A1 = tempKeyArr[4];
	keys.B1 = tempKeyArr[5];
	keys.A2 = tempKeyArr[6];
	keys.B2 = tempKeyArr[7];
	keys.P = tempKeyArr[8];
	
}

Zzy.GCF.ClearCustomKey = function()//清理自定义按键
{
	var cusKey = $gameSystem.GetZzyGCFCustomKey();
	var Len = cusKey.length;
	
	for(var i=0;i<Len;i++)
	{
		var ASCII = cusKey[i];
		Input.keyMapper[ASCII] = undefined;//清理
	}
}

Zzy.GCF.RegisterGame = function(gameName,realGameName)//注册游戏
{
	//判断是否重复
	var gameLen = Zzy.Param.GCFHaveGame.length;
	for(var i=0;i<gameLen;i++)
	{
		if(Zzy.Param.GCFHaveGame[i] === gameName)return false;
	}
	
	Zzy.Param.GCFHaveGame.push(gameName);
	Zzy.Param.GCFHaveRealGame.push(realGameName);
	
	
	return true;
}

Zzy.GCF.keyNameTokeyCode = function(keyName)//按键转换
{
	//转换
	switch(keyName)
	{
		case 'ok':
		return [13,32,90];
		case 'up':
		return [38,104];
		case 'down':
		return [40,98];
		case 'left':
		return [37,100];
		case 'right':
		return [39,102];
		case 'tab':
		return [9];
		case 'shift':
		return [16];
		case 'control':
		return [17,18];
		case 'escape':
		return [27,45,88,96];
		case 'pageup':
		return [33,81];
		case 'pagedown':
		return [34,87];
		case 'debug':
		return [120];
		default:
		//转换成ASCII码
		return [keyName.charCodeAt()];
	}
}


//=============================================================
//Input
//==============================================================


//针对MV没有直接可调用鼠标移动检测
Zzy.GCF.TouchInput_setupEventHandlers = TouchInput._setupEventHandlers;
TouchInput._setupEventHandlers = function() 
{
	Zzy.GCF.TouchInput_setupEventHandlers.call(this);
	
    document.addEventListener('mousemove', this._onZzyGCFMove.bind(this));
};

TouchInput._onZzyGCFMove = function(event)
{
	if(Zzy.GCF.tempInGame)
	{
		Zzy.GCF.MoveX = Graphics.pageToCanvasX(event.pageX);
		Zzy.GCF.MoveY = Graphics.pageToCanvasY(event.pageY);		
	}
}



//针对MV没有直接可调用键盘抬起的侦测
Zzy.GCF.OnKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) 
{
	Zzy.GCF.OnKeyUp.call(this,event);
    Zzy.GCF.tempReleasedMapper[event.keyCode] = true;
}

Input.ZzyGCFisReleased = function(keyName)//检测是否有按键被抬起
{
	var CodeArr = Zzy.GCF.keyNameTokeyCode(keyName);
	var CodeArrLen = CodeArr.length;
	
	var isTrue = false;
	for(var i=0;i<CodeArrLen;i++)
	{
		if(Zzy.GCF.tempReleasedMapper[CodeArr[i]])
		{
			Zzy.GCF.tempReleasedMapper[CodeArr[i]] = false;
			isTrue = true;
		}
	}
	
	return isTrue;
}


//=============================================================
//Zzy.GCF.Funtcion
//==============================================================

Zzy.GCF.LimitRotateRange = function(rotation)//限制圆的角度区间
{
	//0 ~ 2*Math.PI
	if(rotation >= 0 && rotation < Math.PI * 2)return rotation;
	var turns = Math.floor(rotation / (Math.PI * 2));//获取圈数
	rotation -= (turns * 2 * Math.PI);
	if(rotation < 0){rotation = 2 / Math.PI - rotation;}
	return rotation;
}



Zzy.GCF.AssignmentID = function(obj)
{
	obj.ID = Zzy.GCF.tempID;
	Zzy.GCF.tempSprCache[obj.ID] = obj;
	Zzy.GCF.tempID++;
}

//创造空位图
Zzy.GCF.CreateEmptyTextSpr = function(w,h)//创造文字显示
{
	var tempSpr = new Sprite();
	tempSpr.bitmap = new Bitmap(w,h);
	tempSpr.anchor.x = 0.5;
	tempSpr.anchor.y = 0.5;
	tempSpr.blendMode = Graphics.BLEND_ADD;
	return tempSpr;	
}

//创造空位图
Zzy.GCF.CreateEmptyTextZzySpr = function(w,h)//创造文字显示
{
	var tempSpr = new Sprite_ZzyGCFBase();
	tempSpr.bitmap = new Bitmap(w,h);
	tempSpr.anchor.x = 0.5;
	tempSpr.anchor.y = 0.5;
	tempSpr.blendMode = Graphics.BLEND_ADD;
	return tempSpr;	
}

//创建数字位图
Zzy.GCF.CreateNumberTextSpr = function(w,h,num)
{
	var tempSpr = new Sprite_ZzyGCFNumber(w,h,num);
	var s = Math.min(w,h);
	tempSpr.setFontSize(s);
	tempSpr.refresh();
	return tempSpr;	
}



//获取照片的相关操作
Zzy.GCF.GetPicture = function(ID)
{
	if(SceneManager._scene instanceof Scene_Map)
	{
		return Zzy.GCF.tempSceneMapPointer.ZzyGCFGetPicture(ID);
	}
	return undefined;
}

Zzy.GCF.CreatePicture = function(ID,filename,hue,x,y)
{
	if(SceneManager._scene instanceof Scene_Map)
	{
		Zzy.GCF.tempSceneMapPointer.ZzyGCFCreatePicture(ID,filename,hue,x,y);
	}
}

Zzy.GCF.DestroyPicture = function(ID)//删除位图
{
	if(SceneManager._scene instanceof Scene_Map)
	{
		Zzy.GCF.tempSceneMapPointer.ZzyGCFDestoryPicture(ID);
	}
}



Zzy.GCF.startToEndOfPer = function(start,end,per,min)//开始到结束的比例
{
	if(start === end)return end;
	if((Math.abs(end - start)) < min)return end;
	
	var distance = (end-start)*per*0.01;
	return distance + start;
}

Zzy.GCF.startToEndOfSpeed = function(start,end,speed)
{
	if(start === end)return end;
	if(start < end)
	{
		var distance = start + speed;
		return (distance > end ? end : distance);
	}
	else
	{
		var distance = start - speed;
		return (distance < end ? end : distance);
	}
}

Zzy.GCF.startToEndOfTime = function(start,end,time,ctime)
{
	if(start === end)return end;
	
	var distance = (end - start) * ctime / time;
	return start + distance;
}



Zzy.GCF.TransmitPicDate = function(spr,spr2)//传递数据
{
	spr2.visible = spr.visible;
	spr2.x = spr.x;
	spr2.y = spr.y;
	spr2.opacity = spr.opacity;
	spr2.rotate = spr.rotate;
	spr2.blendMode = spr.blendMode;
	spr2.scale.x = spr.scale.x;
	spr2.scale.y = spr.scale.y;
	spr2.anchor.x = spr.anchor.x;
	spr2.anchor.y = spr.anchor.y;
	spr2.ID = spr.ID;
	spr2.moving = spr.moving;
	spr2.scaling = spr.scaling;
	spr2.opaciting = spr.opaciting;
	spr2.rotating = spr.rotating;
	spr2.selecting = spr.selecting;
	spr2.collising = spr.collising;
	spr2.buttoning = spr.buttoning;
	spr2.moveSpeed = spr.moveSpeed;
	spr2.moveDegree = spr.moveDegree;
	spr2.moveTime = spr.moveTime;
	spr2.moveCTime = spr.moveCTime;
	spr2.movePer = spr.movePer;
	spr2.moveMode = spr.moveMode;
	spr2.startX = spr.startX;
	spr2.startY = spr.startY;
	spr2.endX = spr.endX;
	spr2.endY = spr.endY;
	spr2.opSpeed = spr.opSpeed;
	spr2.opTime = spr.opTime;
	spr2.opCTime = spr.opCTime;
	spr2.opPer = spr.opPer;
	spr2.opMode = spr.opMode;
	spr2.startOp = spr.startOp;
	spr2.endOp = spr.endOp;
	spr2.scaleSpeed = spr.scaleSpeed;
	spr2.scaleDegree = spr.scaleDegree;
	spr2.scaleTime = spr.scaleTime;
	spr2.scaleCTime = spr.scaleCTime;
	spr2.scalePer = spr.scalePer;
	spr2.scaleMode = spr.scaleMode;
	spr2.startScaleX = spr.startScaleX;
	spr2.startScaleY = spr.startScaleY;
	spr2.endScaleX = spr.endScaleX;
	spr2.endScaleY = spr.endScaleY;
	spr2.rotateSpeed = spr.rotateSpeed;
	spr2.rotateTime = spr.rotateTime;
	spr2.rotateCTime = spr.rotateCTime;
	spr2.rotatePer = spr.rotatePer;
	spr2.rotateMode = spr.rotateMode;
	spr2.startRotate = spr.startRotate;
	spr2.endRotate = spr.endRotate;
	spr2.isClockwise = spr.isClockwise;
	spr2.rotateTurns = spr.rotateTurns;
	spr2.realEndRotate = spr.realEndRotate;
	spr2.frameWidth = spr.frameWidth;
	spr2.frameHeight = spr.frameHeight;
	spr2.frameL = spr.frameL;
	spr2.frameU = spr.frameU;
	spr2.frameR = spr.frameR;
	spr2.frameD = spr.frameD;
	spr2.isInButton = spr.isInButton;
	spr2.isPressButton = spr.isPressButton;
	spr2.touchOffX = spr.touchOffX;
	spr2.touchOffY = spr.touchOffY;
	spr2.delayTime = spr.delayTime;
	spr2.isDelay = spr.isDelay;
	spr2.pausing = spr.pausing;
	spr2.ignorePause = spr.ignorePause;
	spr2.moveEndDisvisibleDelay = spr.moveEndDisvisibleDelay;
	spr2.moveEndDisvisible = spr.moveEndDisvisible;
	spr2.scaleEndDisvisibleDelay = spr.scaleEndDisvisibleDelay;
	spr2.scaleEndDisvisible = spr.scaleEndDisvisible;
	spr2.opacityEndDisvisibleDelay = spr.opacityEndDisvisibleDelay;
	spr2.opacityEndDisvisible = spr.opacityEndDisvisible;
	spr2.rotateEndDisvisibleDelay = spr.rotateEndDisvisibleDelay;
	spr2.rotateEndDisvisible = spr.rotateEndDisvisible;
	spr2.originalX = spr.originalX;
	spr2.originalY = spr.originalY;
	spr2.originOp = spr.originOp;
	spr2.originScaleX	= spr.originScaleX;
	spr2.originScaleY	= spr.originScaleY;
	spr2.isCanMoving = spr.isCanMoving;
	spr2.isCanOpaciting = spr.isCanOpaciting;
	spr2.isCanScaling = spr.isCanScaling;
	spr2.isCanRotating = spr.isCanRotating;
	spr2.isCanSelect = spr.isCanSelect;
	spr2.isCanCollision = spr.isCanCollision;
	spr2.isCanButton = spr.isCanButton;
	spr2.ignorePause = spr.ignorePause;
	spr2.scaleZoomX = spr.scaleZoomX;
	spr2.scaleZoomY = spr.scaleZoomY;
	spr2.tempScaleX = spr.tempScaleX;
	spr2.tempScaleY = spr.tempScaleY;	
	
	
	return spr2;
}


//------------------------------------ToolFunction--------------------------------



Zzy.GCF.ATANARC = function(x,y)//换算转换为弧度
{
	if(x===0)
	{
		if(y > 0)
		{return Math.PI/2;}
		else
		{return Math.PI*3/2;}
	}	
	
	var arc = Math.atan( y / x );

	if(x < 0)
	{
		arc += Math.PI;
	}

	return arc;
}

Zzy.GCF.ATANARC2 = function(x1,y1,x2,y2)//填写两个点的下标,返回x1到x2所差距的角度
{
	var x = x2-x1;
	var y = y2-y1;
	return Zzy.GCF.ATANARC(x,y);
}

Zzy.GCF.P1P2Rotation = function(x1,y1,x2,y2)//计算p1延伸到p2的弧度
{
	var x = Math.abs(x1-x2);
	var y = Math.abs(y1-y2);
	var z = Math.sqrt(x*x+y*y);
	var r = Math.acos(y / z);
	
	
	if(y1 >= y2)
	{
		if(x1 <= x2){}
		else{r = -r;}
	}
	else
	{
		if(x1 <= x2)
		{r = Math.PI-r;}
		else
		{r=Math.PI+r;}
	}
	
	
	return r;
}

Zzy.GCF.P1P2Angle = function(x1,y1,x2,y2)//计算p1延伸到p2的角度
{
	var src = Zzy.GCF.P1P2Rotation(x1,y1,x2,y2);
	
	return src * 180 / Math.PI;
}




Zzy.GCF.PtInRect = function(pt,rect)//判断点是否在矩形内
{
	if(pt.x >= rect.left && pt.x <= rect.right && pt.y >= rect.up && pt.y <= rect.down){return true;}
	return false;
}

Zzy.GCF.PtInRect2 = function(pt,rect)
{
	if(pt.x > rect.left && pt.x < rect.right && pt.y > rect.up && pt.y < rect.down){return true;}
	return false;
}



Zzy.GCF.PtInRectEllipse = function()//判断一个点是否在椭圆形内
{
	//
}


Zzy.GCF.Distance = function(x1,y1,x2,y2)//两个点之间的距离
{
	var tx = x2 - x1;
	var ty = y2 - y1;	
	return Math.sqrt(tx*tx+ty*ty);
}

Zzy.GCF.DistanceOfP = function(p1,p2)
{
	return Zzy.GCF.Distance(p1.x,p1.y,p2.x,p2.y);
}



Zzy.GCF.RandomIntArea = function(start,end,weightArr)//返回一个区域随机的整数,并根据权重控制范围
{
	if(start === end)return start;
	
	var range = end - start;
	if(!weightArr)
	{return Math.floor(Math.random() * range) + start;}

	var len = weightArr.length;
	var comArr = [];
	var totalWig = 0;
	for(var i=0;i<len;i++)
	{
		totalWig += weightArr[i]
		comArr[i] = totalWig;
	}
	
	var wigRand = Math.floor(Math.random() * comArr[comArr.length-1]);

	//比较权重范围
	var index = 0;
	for(var i=0;i<len;i++)
	{
		if(wigRand < comArr[i])//范围中
		{index = i;break;}//确认使用范围信息
	}

	 var wRange = range / len;//确认整数区间
	 var exRand = Math.random() * wRange;

	 var tempS = index * wRange + exRand;
	 var exValue = tempS + start;
	return Math.floor(exValue);
}

Zzy.GCF.RandomTheValueOfPer = function(value,per)//根据数值百分比返回扰乱值
{
	if(!per)return value;
	
	var valR = value * per * 0.01;
	var Rval = Math.random() * valR;//获取随机值
	
	var isZ = Math.floor(Math.random() * 2);
	if(!isZ){Rval = -Rval;}
	return value + Rval;
}


Zzy.GCF.RandomIntTheValueOfPer = function(value,per)//根据数值百分比返回扰乱值,这回返回一个整数
{
	if(!per)return value;
	var valR = value * per * 0.01;
	var Rval = Math.random() * valR;//获取随机值
	
	var isZ = Math.floor(Math.random() * 2);
	if(!isZ){Rval = -Rval;}
	
	
	return Math.round(value + Rval);	
}


Zzy.GCF.RandomTheValueOfRange = function(value,Range)//根据一个数值和限定范围,返回一个随机值
{
	if(!Range)return value;
	var Rha = Math.random() * (Range / 2);

	var isZ = Math.floor(Math.random() * 2);
	if(!isZ){Rha = -Rha;}	
	
	return value + Rha;
}

Zzy.GCF.RandomIntTheValueOfRange = function(value,Range)//根据一个整数数值和限定范围,返回一个随机整数值
{
	if(!Range)return value;
	var Rha = Math.random() * (Range / 2);

	var isZ = Math.floor(Math.random() * 2);
	if(!isZ){Rha = -Rha;}	
	
	return Math.round(value + Rha);
}


Zzy.GCF.FileNameFindXTo2Arr = function(fileName)//转换
{
	//开始拆分
	var tempArr = fileName.split('_');
	var strArr = tempArr[tempArr.length-1].split('x');
	var intArr = [];
	for(var i=0;i<strArr.length;i++)
	{
		intArr[i] = parseInt(strArr[i]);
	}
	
	return intArr;
}

Zzy.GCF.SplitPictureToArr1 = function(fileName,collBitmap)//通过_?x?的格式,将图片拆分成一个一维数组
{
	var lenArr = Zzy.GCF.FileNameFindXTo2Arr(fileName);
	var bitmapArr = [];
	
	var listSize = collBitmap.width / lenArr[0];	
	var lineSize = collBitmap.height / lenArr[1];

	for(var i=0;i<lenArr[1];i++)
	{
		for(var j=0;j<lenArr[0];j++)
		{
			var bitBitmap = new Bitmap(listSize,lineSize);
			bitBitmap.blt(collBitmap,j*listSize,i*lineSize,listSize,lineSize,0,0);
			bitmapArr[i*lenArr[0]+j] = bitBitmap;
		}
	}
	return bitmapArr;	
}

Zzy.GCF.SplitPictureToArr2 = function(fileName,collBitmap)//通过_?x?的格式,将图片拆分成一个二维数组
{
	var lenArr = Zzy.GCF.FileNameFindXTo2Arr(fileName);
	var bitmapArr = [];
	
	var listSize = collBitmap.width / lenArr[0];	
	var lineSize = collBitmap.height / lenArr[1];

	for(var i=0;i<lenArr[1];i++)
	{
		bitmapArr[i] = [];
		for(var j=0;j<lenArr[0];j++)
		{
			var bitBitmap = new Bitmap(listSize,lineSize);
			bitBitmap.blt(collBitmap,j*listSize,i*lineSize,listSize,lineSize,0,0);
			bitmapArr[i][j] = bitBitmap;
		}
	}
	return bitmapArr;		
}


Zzy.GCF.CheckRectCollision = function(Rect1,Rect2)//检测两个矩形之间是否发生了交互,矩形不可以存在角度
{
	//效率太低
	// if(Zzy.GCF.PtInRect({x:Rect1.left,y:Rect1.up},Rect2))return true;
	// if(Zzy.GCF.PtInRect({x:Rect1.left,y:Rect1.down},Rect2))return true;
	// if(Zzy.GCF.PtInRect({x:Rect1.right,y:Rect1.up},Rect2))return true;
	// if(Zzy.GCF.PtInRect({x:Rect1.right,y:Rect1.down},Rect2))return true;
	
	//两个矩形进行了接触
	if(Rect1.right >= Rect2.left && Rect1.left <= Rect2.right &&
	Rect1.down >= Rect2.up && Rect1.up <= Rect2.down)
	{
		return true;
	}
	return false;
}

Zzy.GCF.AngleToRadian = function(angle)//角度转换弧度
{
	return angle * Math.PI / 180;
	
}

Zzy.GCF.GetIntRandomArr1 = function(list,min,max)//返回一个随机整数值的一维数组
{
	var Arr1 = [];
	var range = max-min;
	
	for(var i=0;i<list;i++)
	{
		Arr1[i] = Math.floor((Math.random() * range) + min);
	}
	return Arr1;
}

Zzy.GCF.GetIntRandomArr2 = function(line,list,min,max)//返回一个随机整数值的二维数组
{
	var Arr2 = [];
	for(var i=0;i<line;i++)
	{
		Arr2[i] = [];
		for(var j=0;j<list;j++)
		{
			Arr2[i][j] = Math.floor((Math.random() * range) + min);
		}
	}
	return Arr2;
}


Zzy.GCF.GetIndexRandomArr1 = function(list,startIndex)//返回一个从startIndex开始计数随机排列的一维数组,startIndex可以为null
{
	var start = startIndex ? startIndex : 0;
	var Arr1 = [];
	
	for(var i=0;i<list;i++)
	{
		Arr1[i] = start+i;
	}
	
	var index1 = 0;
	var index2 = 0;
	var temp = 0;
	
	var count = list*4;
	for(var i=0;i<count;i++)
	{
		index1 = Math.floor(Math.random() * list);
		index2 = Math.floor(Math.random() * list);
		
		temp = Arr1[index1];
		Arr1[index1] = Arr1[index2];
		Arr1[index2] = temp;		
	}
	return Arr1;
}

Zzy.GCF.GetIndexRandomArr2 = function(line,list,startIndex)//返回一个从startIndex开始计数随机排列的二维数组,startIndex可以为null
{
	var start = startIndex ? startIndex : 0;
	
	
	var Arr2 = [];
	for(var i=0;i<line;i++)
	{
		Arr2[i] = [];
		for(var j=0;j<list;j++)
		{
			Arr2[i][j] = j+i*list+start;
		}
	}
	var maxValue = line * list;
	//进行随机操作
	var indexX1 = 0;
	var indexY1 = 0;
	var indexX2 = 0;
	var indexY2 = 0;
	var temp = 0;
	
	var count = line*list*4;//随机调换指定的对应次数
	for(var i=0;i<count;i++)
	{
		//通过随机交换两个数的方法,来实现随机数组的方式
		indexX1 = Math.floor(Math.random() * list);
		indexY1 = Math.floor(Math.random() * line);
		indexX2 = Math.floor(Math.random() * list);
		indexY2 = Math.floor(Math.random() * line);	

		//对数据进行交换
		temp = Arr2[indexY1][indexX1];
		Arr2[indexY1][indexX1] = Arr2[indexY2][indexX2];
		Arr2[indexY2][indexX2] = temp;
	}
	return Arr2;
}

Zzy.GCF.RandomArr1Element = function(Arr1,count)//一维数组打乱
{
	var c = count ? count : Arr1.length*4;
	var index1 = 0;
	var index2 = 0;	
	var temp = 0;
	for(var i=0;i<c;i++)
	{
		index1 = Math.floor(Math.random() * Arr1.length);
		index2 = Math.floor(Math.random() * Arr1.length);
		//交换
		temp = Arr1[index1];
		Arr1[index1] = Arr1[index2];
		Arr1[index2] = temp;
	}
	return Arr1;
}

Zzy.GCF.RandomArr2Element = function(Arr2,count)//二维数组打乱
{
	var len1 = Arr2.length;
	if(!Arr2[0])
	{
		return Zzy.GCF.RandomArr1Element(Arr2,len1*4);
	}
	var len2 = Arr2[0].length;
	var c = count ? count : len1 * len2 * 4;
	var x1 = 0;
	var x2 = 0;
	var y1 = 0;
	var y2 = 0;
	
	for(var i=0;i<len1;i++)//交换
	{
		for(var j=0;j<len2;j++)
		{
			x1 = Math.floor(Math.random() * len2);
			y1 = Math.floor(Math.random() * len1);
			x2 = Math.floor(Math.random() * len2);
			y2 = Math.floor(Math.random() * len1);			
			
			temp = Arr2[y1][x1];
			Arr2[y1][x1] = Arr[y2][x2];
			Arr[y2][x2] = temp;
			
		}
	}
	return Arr2;
}

Zzy.GCF.GetArrOfBeing = function(Arr)//剔除所有空的内容
{
	var tempArr = [];
	for(var i=0;i<Arr.length;i++)
	{
		if(Arr[i] === undefined || Arr[i] === null)continue;
		tempArr.push(Arr[i]);
	}
	return tempArr;
}

Zzy.GCF.InsertToOtherArr = function(Arr1,Index,Arr2)//将Arr2插入到Arr1数组中,注意这将会修改Arr1数组中的内容
{
	var len = Arr2.length;
	
	//位移
	for(var i=Arr1.length-1;i>=Index;i--)
	{
		Arr1[i+len] = Arr1[i];
	}
	//添加
	for(var i=0;i<len;i++)
	{
		Arr1[i+Index] = Arr2[i];
	}
	return Arr1;
}

Zzy.GCF.SplitStringToIntArr = function(str,spell)//拆减一个字符串并转换为整数数组
{
	spell = spell ? spell : ',';
	var tempArr = str.split(',');
	for(var i=0;i<tempArr.length;i++)
	{
		tempArr[i] = parseInt(tempArr[i]);
	}
	return tempArr;
}

Zzy.GCF.SplitStringToNumberArr = function(str,spell)//拆减一个字符串并转换为数字数组
{
	spell = spell ? spell : ',';
	var tempArr = str.split(',');
	for(var i=0;i<tempArr.length;i++)
	{
		tempArr[i] = Number(tempArr[i]);
	}	
	return tempArr;
}

Zzy.GCF.SpawnWhiteBitmap = function(width,height)//生成一个空的白色画布
{
	width = width ? width : Graphics.boxWidth;
	height = height ? height : Graphics.boxHeight;
	var bitmap = new Bitmap(width,height);
	bitmap.fillAll('#ffffff');
}

Zzy.GCF.SpawnBlackBitmap = function(width,height)//生成一个空的黑色画布
{
	width = width ? width : Graphics.boxWidth;
	height = height ? height : Graphics.boxHeight;
	var bitmap = new Bitmap(width,height);
	bitmap.fillAll('#000000');
}

Zzy.GCF.SpawnBlackBitmap = function(color,width,height)//生成一个指定颜色的画布
{
	width = width ? width : Graphics.boxWidth;
	height = height ? height : Graphics.boxHeight;
	var bitmap = new Bitmap(width,height);
	bitmap.fillAll(color);
}

// Zzy.GCF.DeepCopyObject = function(obj, cache = new Set())
// {
	// if((typeof obj !== 'object' && obj !== null) || cache.has(obj))
	// {
		// return obj;
	// }
  // if (Array.isArray(obj)) 
  // {
    // return obj.map(t => {
      // cache.add(t)
      // return t
    // })
  // } 
  // else 
  // {
// // 注意symbol key
    // return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].reduce((res, key) => {
      // cache.add(obj[key])
      // res[key] = Zzy.GCF.DeepCopyObject(obj[key], cache)
      // return res
    // }, obj.constructor !== Object ? Object.create(obj.constructor.prototype) : {}) // 继承
  // }
// }

Zzy.GCF.CopyObject = function(obj)//浅拷贝一个对象的内容信息
{
	var newObj = {};
	var key = 0;
	for(obj in key)
	{
		newObj[key] = obj[key];
	}
	
	return newObj;
}


Zzy.GCF.SpawnRandomPos = function(rect,count)//在一定的范围内生成随机的坐标点
{
	var rangeX = rect.right - rect.left;
	var rangeY = rect.down - rect.up;
	var posArr = [];
	var x = 0;
	var y = 0;
	var pos = {};
	for(var i=0;i<count;i++)
	{
		x = Math.random() * rangeX + rect.left;
		y = Math.random() * rangeY + rect.up;
		pos.x = x;
		pos.y = y;
		posArr.push(pos);
	}
	return Zzy.GCF.AddOffsetPosArr(posArr,rect.left,rect.up);
}

//type可以输入类型为rect(矩形)或是circle(圆形),不填写默认为rect
//rect代表生成点的范围,count代表生成的数量,rangeX,rangeY代表限制范围的宽度和高度,type代表类型
Zzy.GCF.SpawnRandomSinglePos = function(rect,count,rangeX,rangeY,type)//在一定的范围内生成随机的坐标点,并保证坐标点在一定范围内不会重复
{
	if(type === undefined)
	{type = 'rect'}
	rangeY = rangeY ? rangeY : rangeX;

	//随机的点
	var disRangeX = rect.right - rect.left;
	var disRangeY = rect.down - rect.up;
	var posArr = [];
	var pRect = {};
	var isPass = true;
	var notCount = 0;//匹配失败次数
	if(type === 'rect')
	{
		for(var i=0;i<count;i++)
		{
			var pos = {};
			pos.x = Math.random() * disRangeX;
			pos.y = Math.random() * disRangeY;

			//遍历之前
			for(var j=0;j<posArr.length;j++)
			{
				pRect.left = posArr[j].x - rangeX;
				pRect.right = posArr[j].x + rangeX;
				pRect.up = posArr[j].y - rangeY;
				pRect.down = posArr[j].y + rangeY;
				if(Zzy.GCF.PtInRect(pos,pRect))//在点的范围内
				{
					isPass = false;
					break;
				}
			}	
			if(!isPass)//返回重来
			{
				notCount++;
				if(notCount >= 10000)//匹配超过10000次,防止卡死
				{
					return Zzy.GCF.AddOffsetPosArr(posArr,rect.left,rect.up);
				}
				
				isPass = true;i--;continue;
			}	
			posArr.push(pos);
			notCount = 0;
		}			
	}
	else if(type === 'circle')
	{
		for(var i=0;i<count;i++)
		{
			var pos = {};
			pos.x = Math.random() * disRangeX;
			pos.y = Math.random() * disRangeY;
			
			//遍历之前
			for(var j=0;j<posArr.length;j++)
			{
				var sPos = posArr[j];
				var fx = pos.x - sPos.x;
				var fy = pos.y - sPos.y;
				
				if(rangeX > rangeY)
				{
					if((fx * fx / rangeX / rangeX + fy * fy / rangeY / rangeY) < 1)
					{isPass = false;break;}
				}
				else
				{
					if((fy * fy / rangeX / rangeX + fx * fx / rangeY / rangeY) < 1)
					{isPass = false;break;}
				}
			}	
			if(!isPass)//返回重来
			{
				notCount++;
				if(notCount >= 10000)//匹配超过10000次,防止卡死
				{
					return Zzy.GCF.AddOffsetPosArr(posArr,rect.left,rect.up);
				}
				
				isPass = true;i--;continue;
			}	
			posArr.push(pos);
			notCount = 0;
		}			
	}
	return Zzy.GCF.AddOffsetPosArr(posArr,rect.left,rect.up);
}

Zzy.GCF.AddOffsetPosArr = function(posArr,ofx,ofy)//对一个精灵数组中所有的精灵对象进行位置偏移
{
	ofx = ofx ? ofx : 0;
	ofy = ofy ? ofy : 0;
	
	var len = posArr.length;
	for(var i=0;i<len;i++)
	{
		if(posArr[i])
		{
			posArr[i].x += ofx;
			posArr[i].y += ofy;
		}
	}
	return posArr;
}


Zzy.GCF.AddScaleArr = function(arr,ofScaleX,ofScaleY)//对一个精灵数组中所有的大小尺寸进行数值偏移
{
	var ofsx = ofScaleX ? ofScaleX : 0;
	var ofsy = ofScaleY ? ofScaleY : ofScaleX;
	
	var len = posArr.length;
	for(var i=0;i<len;i++)
	{
		if(posArr[i])
		{
			posArr[i].scale.x += ofsx;
			posArr[i].scale.y += ofsy;
		}		
	}
	return posArr;
}

Zzy.GCF.AddAngleArr = function(arr,angle)//对一个精灵数组中所有的角度进行数值偏移,角度的范围为,angle为角度而不是弧度
{
	var angle = angle ? angle : 0;
	
	var a = angle * Math.PI / 180;
	
	var len = posArr.length;
	for(var i=0;i<len;i++)
	{
		if(posArr[i])
		{
			posArr[i].rotation += a;
		}		
	}
	return posArr;	
	
}

Zzy.GCF.AddOpacityArr = function(arr,op)//对一个精灵数组所有的透明度进行数值偏移
{
	var len = arr.length;
	for(var i=0;i<len;i++)
	{
		if(arr[i])
		{
			arr[i].opacity += op;
			arr[i].opacity = Math.min(Math.max(arr[i].opacity,0),255);
		}
	}
	return arr;
}

Zzy.GCF.SetVisibleArr = function(arr,enable)//对一个精灵数组所有的显示开关进行设置,并返回被修改过开关的新的精灵数组
{
	var newArr = [];
	
	var len = arr.length;
	for(var i=0;i<len;i++)
	{
		if(arr[i])
		{
			if(arr[i].visible !== enable)
			{
				newArr.push(arr[i]);
				arr[i].visible = enable;
			}
		}
	}
	return newArr;
}

Zzy.GCF.ValueInLoopRange = function(value,min,max)//限制一个数值位于一个范围循环内的,并返回循环后的数值和循环的次数
{
	var m = (max - min);
	
	var r = Math.floor(value / m);//倍率
	
	var e = value - r * m;//额外数值
	
	var f = min + e;
	
	var info = {
		loop:r,
		value:f
	};
	
	return info;
}

Zzy.GCF.BubbleSort = function(numberArr,isGreat)//冒泡排序,numberArr是存放数据的数组,isGreat是否是从大到小的排序
{
	isGreat = isGreat ? isGreat : false;
	//进行冒泡排序
	if(isGreat)//从大到小
	{
		var Temp = 0;
		for(var i=0;i<numberArr.length;i++)
		{
			for(var j=0;j<numberArr.length-i-1;j++)
			{
				if(numberArr[j] < numberArr[j+1])
				{
					Temp = numberArr[j];
					numberArr[j] = numberArr[j+1];
					numberArr[j+1] = Temp;
				}
			}
		}
	}
	else//从小到大
	{
		var Temp = 0;
		for(var i=0;i<numberArr.length;i++)
		{
			for(var j=0;j<numberArr.length-i-1;j++)
			{
				if(numberArr[j] > numberArr[j+1])
				{
					Temp = numberArr[j];
					numberArr[j] = numberArr[j+1];
					numberArr[j+1] = Temp;
				}
			}
		}
	}
	return numberArr;
}

Zzy.GCF.SelectSort = function(numberArr,isGreat)//选择排序,numberArr是存放数据的数组,isGreat是否是从大到小的排序
{
	isGreat = isGreat ? isGreat : false;
	//进行选择排序
	if(isGreat)
	{
		var Index = 0;
		var Temp = 0;

		for(var i=0;i<numberArr.length;i++)
		{
			Index = i;
			for(var j=i;j<numberArr.length;j++)
			{
				if(numberArr[Index] < numberArr[j])
				{Index = j;}
			}

			Temp = numberArr[i];
			numberArr[i] = numberArr[Index];
			numberArr[Index] = Temp;
		}
	}
	else
	{
		var Index = 0;
		var Temp = 0;

		for(var i=0;i<numberArr.length;i++)
		{
			Index = i;
			for(var j=i;j<numberArr.length;j++)
			{
				if(numberArr[Index] > numberArr[j])
				{Index = j;}
			}

			Temp = numberArr[i];
			numberArr[i] = numberArr[Index];
			numberArr[Index] = Temp;
		}
	}
}


Zzy.GCF.InsertSort = function(numberArr,isGreat)//插入排序
{
	isGreat = isGreat ? isGreat : false;
	//进行插入排序
	if(isGreat)
	{
		var j = 0;
		var temp = 0;
		for(var i=0;i<numberArr.length;i++)
		{
			temp = numberArr[i];
			j=i;
			while(j>0)
			{
				if(temp > numberArr[j-1])
				{numberArr[j] = numberArr[j-1];}
				else
				{break;}
				j--;
			}
			numberArr[j] = temp;
		}
	}
	else
	{
		var j = 0;
		var temp = 0;
		for(var i=0;i<numberArr.length;i++)
		{
			temp = numberArr[i];
			j=i;
			while(j>0)
			{
				if(temp < numberArr[j-1])
				{numberArr[j] = numberArr[j-1];}
				else
				{break;}
				j--;
			}
			numberArr[j] = temp;
		}
	}
}

Zzy.GCF.XierSort = function(numberArr,isGreat)//希尔排序
{
	isGreat = isGreat ? isGreat : false;
	//进行希尔排序
	var len = numberArr.length;
	var temp = 0;
	
	if(isGreat)
	{
		var d = 0;
		for(d = len / 2;d >= 1;d=Math.floor(d / 2))
		{
			for(var i=d;i < len;i++)
			{
				temp = numberArr[i];
				for(var j = i - d;j >= 0 && temp > numberArr[j];j = j - d)
				{
					numberArr[j + d] = numberArr[j];
				}
				numberArr[j + d] = temp;
			}
		}
	}
	else
	{
		var d = 0;
		for(d = len / 2;d >= 1;d=Math.floor(d / 2))
		{
			for(var i=d;i < len;i++)
			{
				temp = numberArr[i];
				for(var j = i - d;j >= 0 && temp < numberArr[j];j = j - d)
				{
					numberArr[j + d] = numberArr[j];
				}
				numberArr[j + d] = temp;
			}
		}	
	}
	
}

Zzy.GCF.WeightArrRandomIndex = function(weightArr)//权重数组返回下标值
{
	var total = 0;
	for(var i=0;i<weightArr.length;i++)
	{
		total += weightArr[i];
	}
	
	var randomValue = Math.random()*total;
	
	for(var i=0;i<weightArr.length;i++)
	{
		randomValue -= weightArr[i];
		if(randomValue <= 0)
		{
			return i;//返回正确下标
		}
	}
	
	return weightArr.length-1;//最后一个下标
}


Zzy.GCF.RequestNewRandomArea = function(rect)//申请一个空白的区域,用于随机填充显示一个范围内bitmap对象的下标值
{
	var ID = 0;
	var isTr = false;
	for(var i=0;i<Zzy.GCF.RandomAreaArr.length;i++)
	{
		if(Zzy.GCF.RandomAreaArr[i] === undefined)
		{ID = i;isTr = true;}
	}
	if(!isTr)
	{ID = Zzy.GCF.RandomAreaArr.length;}

	Zzy.GCF.RandomAreaArr[ID] = {};
	Zzy.GCF.RandomAreaArr[ID].rect = rect;
	Zzy.GCF.RandomAreaArr[ID].sprRectArr = [];
	
	return ID;
}

Zzy.GCF.ReturnSprRandomAreaPos = function(ID,spr)
{
	var rect = {};
	var w = spr.bitmap.width;
	var h = spr.bitmap.height;
	//计算范围值
	var tempSRect = Zzy.GCF.RandomAreaArr[ID].rect;
	var rangRect = {};
	rangRect.left = tempSRect.left;
	rangRect.up = tempSRect.up;
	rangRect.right = tempSRect.right-w;
	rangRect.down = tempSRect.down-h;
	
	var rangW = rangRect.right - rangRect.left;
	var rangH = rangRect.down - rangRect.up;

	
	if(w > rangW || h > rangH)//大小越界
	{return {x:NaN,y:NaN};}
	
	
	var randX = 0;
	var randY = 0;
	var tRect = {};
	
	for(var i=0;i<200;i++)//重复200此,满足不覆盖,防止卡死
	{
		randX = Math.round(Math.random()*rangW)+rangRect.left;
		randY = Math.round(Math.random()*rangH)+rangRect.up;
		
		tRect.left = randX;
		tRect.up = randY;
		tRect.right = randX+w;
		tRect.down = randY+h;
		
		
		var isLapped = false;
		
		for(var j=0;j<Zzy.GCF.RandomAreaArr[ID].sprRectArr.length;j++)
		{
			var tRect2 = Zzy.GCF.RandomAreaArr[ID].sprRectArr[j];
			
			if(Zzy.GCF.CheckRectCollision(tRect,tRect2))//重叠
			{
				isLapped = true;
				break;
			}
			
		}
		if(!isLapped)//没有重叠
		{break;}
	}
	
	//压入内容
	Zzy.GCF.RandomAreaArr[ID].sprRectArr.push(tRect);
	
	//返回点位
	var ofx = spr.anchor.x*w;
	var ofy = spr.anchor.y*h;
	
	
	return {x:tRect.left+ofx,y:tRect.up+ofy};
}


Zzy.GCF.DeleteRandomArea = function(ID)//删除这个区域
{
	Zzy.GCF.RandomAreaArr[ID] = undefined;
}

Zzy.GCF.Dot = function(P1,P2)//点乘
{
	return P1.x * P2.x + P1.y * P2.y;
}

Zzy.GCF.Cross = function(P1,P2)//叉乘
{
	return P1.x * P2.y - P2.x * P1.y;
}

Zzy.GCF.VectorAdd = function(P1,P2)//矢量相加
{
	var tP = {};
	tP.x = P1.x+P2.x;
	tP.y = P1.y+P2.y;
	return tP;
}



Zzy.GCF.VectorSub = function(P1,P2)//矢量相减
{
	var tP = {};
	tP.x = P1.x-P2.x;
	tP.y = P1.y-P2.y;
	return tP;
}


Zzy.GCF.JudgPointInPolygon = function(Point,polygonArr)//判断一个点是否在多边形中
{
	if(polygonArr.length <= 2)//不满足至少三条边缘,不成立
	{return NaN;}
	
	var flag = false;
	var P1 = undefined;
	var P2 = undefined;
	var Po = Point;
	
	for(var i=0;i<polygonArr.length;i++)
	{
		P1 = polygonArr[i];
		P2 = polygonArr[(i+1)%polygonArr.length];
		
		if(Zzy.GCF.OnSegment(Po,P1,P2))return true;//点在多边形的一条边上
		//与右侧水平射线相交判断
		if((Zzy.GCF.Dcmp(P1.y-Po.y) > 0 !== Zzy.GCF.Dcmp(P2.y-Po.y) > 0) && Zzy.GCF.Dcmp(Po.x - (Po.y - P1.y)*(P1.x-P2.x) / (P1.y-P2.y)-P1.x) < 0)
		{
			flag = !flag;
		}
	}
	return flag;
}


Zzy.GCF.Dcmp = function(v)
{
	var tv = v;
	if(tv<0)tv*=-1;
	if(tv<0.000001)return 0;
	else
		return v<0?-1:1;
}

Zzy.GCF.OnSegment = function( Po, P1, P2)//判断一个点是否在线段上
{
	var tp1 = Zzy.GCF.VectorSub(P1,Po);
	var tp2 = Zzy.GCF.VectorSub(P2,Po);
	return Zzy.GCF.Dcmp(Zzy.GCF.Cross(tp1,tp2)) === 0 && Zzy.GCF.Dcmp(Zzy.GCF.Dot(tp1,tp2)) <= 0;
}

Zzy.GCF.ScaleToPolygon = function(spr,pointArr,size,isInt)//确定一个点,使这个多边形按照点的比例进行缩放
{
	isInt = isInt === undefined ? true : isInt;
	//if(size === 1){return pointArr;}
	
	var tempPointArr = [];
	var CenterX = spr.bitmap.width * spr.anchor.x;
	var CenterY = spr.bitmap.height * spr.anchor.y;	
	
	for(var i=0;i<pointArr.length;i++)
	{
		tempPointArr[i] = {};
		
		if(pointArr[i].x<CenterX)
		{tempPointArr[i].x = CenterX - (CenterX-pointArr[i].x)*size;}
		else if(pointArr[i].x>CenterX)
		{tempPointArr[i].x = CenterX + (pointArr[i].x-CenterX)*size;}
		else
		{tempPointArr[i].x = CenterX;}
		
		if(pointArr[i].y<CenterY)
		{tempPointArr[i].y = CenterY - (CenterY-pointArr[i].y)*size;}
		else if(pointArr[i].y>CenterY)
		{tempPointArr[i].y = CenterY + (pointArr[i].y-CenterY)*size;}
		else
		{tempPointArr[i].y = CenterY;}	
	
		if(isInt)
		{
			tempPointArr[i].x = Math.round(tempPointArr[i].x);
			tempPointArr[i].y = Math.round(tempPointArr[i].y);
		}	
	
	}
	return tempPointArr;	
}

Zzy.GCF.OfRotaionToPolygon = function(spr,pointArr,rotation,isInt)//确定一个点,使这个多边形按照点的较短进行旋转任意弧度,范围-Math.PI~Math.PI,同时也用于刷新
{
	isInt = isInt === undefined ? true : isInt;
	
	rotation = rotation ? rotation : 0;
	var tempPointArr = [];
	var CenterX = spr.bitmap.width * spr.anchor.x;
	var CenterY = spr.bitmap.height * spr.anchor.y;		
	var fRot = 0//临时角度
	var dis = 0;
	
	
	
	for(var i=0;i<pointArr.length;i++)
	{
		tempPointArr[i] = {};
		
		fRot = spr.rotation + Zzy.GCF.P1P2Rotation(CenterX,CenterY,pointArr[i].x,pointArr[i].y) + rotation;//计算角度
		dis = Zzy.GCF.Distance(CenterX,CenterY,pointArr[i].x,pointArr[i].y);//计算距离
		tempPointArr[i].x = Math.sin(fRot) * dis + CenterX;
		tempPointArr[i].y = CenterY - Math.cos(fRot) * dis;

		if(isInt)
		{
			tempPointArr[i].x = Math.round(tempPointArr[i].x);
			tempPointArr[i].y = Math.round(tempPointArr[i].y);
		};
	}
	return tempPointArr;
}

Zzy.GCF.OfPosToPolygon = function(spr,pointArr,pos,isInt)
{
	isInt = isInt === undefined ? true : isInt;
	
	for(var i=0;i<pointArr.length;i++)
	{
		tempPointArr[i] = {};
		tempPointArr[i].x = pointArr[i].x+pos.x;
		tempPointArr[i].y = pointArr[i].y+pos.y;
	}
	return tempPointArr;	
}


Zzy.GCF.SnapToLocal = function(path,fileName)//截图到本地 path需要输入路径  fileName需要输入文件名
{
	path = path ? path : '';
	fileName = fileName ? fileName : '';
	var snapBitmap = SceneManager.snap();//屏幕截图
	
	if(!snapBitmap)
	{
		console.log("Error:(来自LiuYue_GameCore)未知错误:执行SceneManager.snap()失败");return false;
	}
	
	var url = snapBitmap._canvas.toDataURL('image/png');//转换为URL
	var base64Data = url.replace(/^data:image\/\w+;base64,/,"");//正则表达式
	var dataBuffer = new Buffer(base64Data,'base64');//转换成缓冲
	
	var path = './'+path+'/'+fileName+'.png';
	const fs = require('fs');
	
	var pointer = fs.writeFile(path,dataBuffer,function(err){
		if(err)
		{console.log(err);}
	});
	return true;
}

Zzy.GCF.SnapToLocalOfPictures = function(fileName)//截图到pcitures文件夹中
{
	return Zzy.GCF.SnapToLocal('img/pictures',fileName);
}

Zzy.GCF.SnapToLocalOfSystem = function(fileName)//截图到system文件夹中
{
	return Zzy.GCF.SnapToLocal('img/system',fileName);
}

Zzy.GCF.BezierP3 = function(p0,p1,p2,count)//返回一个完整点的贝塞尔曲线(3点)  p0类型:{x: ,y:  }
{
	count = count ? count : 100;
	var t = 0;
	var st = 0;
	var x = 0;
	var y = 0;
	var pArr = [];
	for(var i=0;i<=count;i++)
	{
		t = i / count;
		st = 1 - t;
		x = st * st * p0.x + 2 * t * st * p1.x + t * t * p2.x;
		y = st * st * p0.y + 2 * t * st * p1.y + t * t * p2.y;
		pArr[i] = {x:x,y:y};
	}
	return pArr;
}

Zzy.GCF.BezierP3Point = function(p0,p1,p2,tPer)//tPer输入位于路径上的百分比,范围0~100之间,返回值为坐标点
{
	var t = tPer * 0.01;
	var st = 1 - t;
	var x = st * st * p0.x + 2 * t * st * p1.x + t * t * p2.x;
	var y = st * st * p0.y + 2 * t * st * p1.y + t * t * p2.y;
	return {x:x,y:y};
}


Zzy.GCF.BezierP4 = function(p0,p1,p2,p3,count)//返回一个完整点的贝塞尔曲线(4点)
{
	count = count ? count : 100;
	var t = 0;
	var st = 0;
	var x = 0;
	var y = 0;
	var pArr = [];
	for(var i=0;i<=count;i++)
	{
		t = i / count;
		st = 1 - t;
		x = p0.x * st * st * st + 3 * p1.x * t * st * st + 3 * p2.x * t * t * st + p3.x * t * t * t;
		y = p0.y * st * st * st + 3 * p1.y * t * st * st + 3 * p2.y * t * t * st + p3.y * t * t * t;
		pArr[i] = {x:x,y:y};
	}
	return pArr;
}

Zzy.GCF.BezierP4Point = function(p0,p1,p2,p3,tPer)//tPer输入位于路径上的百分比,范围0~100之间,返回值为坐标点
{
	var t = tPer * 0.01;
	var st = 1 - t;
	var x = p0.x * st * st * st + 3 * p1.x * t * st * st + 3 * p2.x * t * t * st + p3.x * t * t * t;
	var y = p0.y * st * st * st + 3 * p1.y * t * st * st + 3 * p2.y * t * t * st + p3.y * t * t * t;
	return {x:x,y:y};	
}
