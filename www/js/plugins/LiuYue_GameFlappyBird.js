/*:
 * @plugindesc v1.06 GameFlappyBird 飞翔鸟
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 *
 * 这个插件内置了一款《飞翔鸟》的小游戏
 *
 *
 *《flappy bird》是一款由来自越南的独立游戏开发者Dong Nguyen所开发的作品，游戏于2013年5月24日上线，并在2014年2月突然暴红。2014年2月，《Flappy Bird》被开发者本人从苹果及谷歌应用商店撤下。2014年8月份正式回归APP STORE，正式加入Flappy迷们期待已久的多人对战模式。游戏中玩家必须控制一只小鸟，跨越由各种不同长度水管所组成的障碍。
 *
 *
 * 这是一款可以让你啸着玩的游戏
 *
 *
 * 注意:运行这个插件至少需要LiuYue_GameCore(v1.20版本)(流月小游戏核心)作为前置插件
 *
 *---------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 *
 *---------------------------------------------------------
 *
 *
 * 以下是在写入公式时可以带入的数据信息:
 *
 * variables : 这个值是全局变量数组
 * v : 同上
 * V : 同上
 * switchs : 这个值是全局开关数组
 * s : 同上
 * S : 同上
 * level : 这个值是目前关卡等级的数值
 * maxlevel : 这个值游戏的最大通关等级,如果有,则存在
 *
 *
 *
 * 关于对参数等级的填写,如果没有填写对应等级的参数信息,则会自动补充到与最高等级相同的参数,参数使用最后的填写值
 * 关于动画图片,请写入正确的格式?x?    (中间的是字母x) 前面代表列数 后面代表行数  图片填入后会自动播放动画
 *
 * 首先是对图片资源的介绍,以下单位均以xp(像素)为单位
 * '背景1:FBBk1'                                            816 * 230
 * '背景2:FBBk2'                                            816 * 172
 * '背景3:FBBk3'                                            816 * 123
 * '地面板'                                                 816 * 96
 * '背景图片'                                               816 * 642(默认全屏)
 * '玩家3*1'                                                180 * 36
 * '其他小鸟3*1'                                            180 * 36
 * '3款选择模式板'                                          400 * 100       
 * '退出按钮'                                               110 * 60
 * 
 *
 *
 *
 * 以下是一些插件用到的插件指令
 *---------------------Plugin Command--------------------
 *
 * ZzyGCF Play x                      //填入游戏名,这将进行小游戏,游戏名要和参数中设定的一致,默认为 FlappyBird
 * ZzyGFB BackGround id(1~3) x,x,x,x  //可以修改背景层的卷动速度,正数向右,负数向左
 * -id:背景层的ID,一共有三层,1层最后 2层中层 3层前层
 * -x:每秒钟卷动的帧数,可以使小数
 *
 * ZzyGFB BackFloor x,x,x,x           /可以修改地面层的卷动速度,正数向右,负数向左,
 * -x:每秒钟卷动的帧数,可以使小数
 *
 * ZzyGFB SetMode mode(Normal/Gliding/Reverse) enable(true/false)       //这会开启或关闭某个游戏模式
 * -mode:游戏模式,可选择Normal(普通) 可选择Gliding(滑翔) 可选择Reverse(颠倒)
 * -enable:true代表开启 false代表关闭
 *
 *
 * ZzyGFB StartLevel x              //设置开始游戏时的关卡数值,这可以是一个公式,默认值为1
 * ZzyGFB MaxLevel x                //这会修改能进行关卡的最大等级,这可以是一个公式
 *
 * ZzyGFB PipeSpeed x,x,x,x         //这代表每个等级下水管的移动速度,通过等级输入数据,用逗号隔开,可以输入小数
 * 例:ZzyGFB PipeSpeed 3,4,5,5.5,6      //1级3速度,2级4速度....
 *
 * ZzyGFB PipeScore x,x,x,x         //这代表每个等级下通过水管的得分,通过等级输入数据,用逗号隔开
 *
 * ZzyGFB PipeHue x,x,x,x(0~360)    //这代表每个等级下出现的水管的色相
 * 
 * ZzyGFB PipeAppear x,x,x,x        //这是代表每个等级出现水管的帧数
 *	
 * ZzyGFB PipeSpace x,x,x,x         //这是代表每个等级出现水管的间距,单位为像素
 *
 * ZzyGFB UpLimit x                 //这会修改上管随机的极限边界,单位为像素
 * ZzyGFB DownLimit x               //这会修改下管随机的极限边界,单位为像素
 *
 * ZzyGFB NextLevel x,x,x,x         //这会在通过一定数量的水管后,进入下一个等级
 *
 * ZzyGFB SetUpMode x(MainInterface/Normal/Gliding/reverse)     //这代表启动游戏将会进入的模式,同时也决定退出的模式
 * -MainInterface:进入游戏会进入到主界面
 * -Normal:进入游戏会直接进入到普通模式,同时退出会直接退出游戏
 * -Gliding:进入游戏会直接进入到滑翔模式,同时退出会直接退出游戏
 * -reverse:进入游戏会直接进入到颠倒模式,同时退出会直接退出游戏
 *
 *
 *
 *
 *-------------------------------------------------------------------------
 *
 *
 *
 * 以下是一些插件用到的脚本函数
 *---------------------Plugin Command--------------------
 *
 *
 *
 * Zzy.GFB.BackGround(ID,speed)         //可以修改1~3背景层的卷动速度,正数向右,负数向左       
 * Zzy.GFB.BackFloor(speed)             //可以修改地面层的卷动速度,正数向右,负数向左,
 * Zzy.GFB.SetMode(mode(Normal/Gliding/Reverse),enable(true/false))             //这会开启或关闭某个游戏模式
 *
 * Zzy.GFB.StartLevel(value)            //设置开始游戏时的关卡数值,这可以是一个公式,默认值为1
 * Zzy.GFB.MaxLevel(max)                //这会修改能进行关卡的最大等级,这可以是一个公式
 *
 * Zzy.GFB.PipeSpeed(speedStr)          //这代表每个等级下水管的移动速度,通过等级输入数据,用逗号隔开,可以输入小数,必须是一个字符串
 * Zzy.GFB.PipeScore(scoreStr)          //这代表每个等级下通过水管的得分,通过等级输入数据,用逗号隔开,必须是一个字符串
 * Zzy.GFB.PipeHue(hueStr)              //这代表每个等级下出现的水管的色相,通过等级输入数据,用逗号隔开,必须是一个字符串
 * Zzy.GFB.PipeAppear(appearStr)        //这是代表每个等级出现水管的帧数,通过等级输入数据,用逗号隔开,必须是一个字符串
 * Zzy.GFB.PipeSpace(spaceStr)          //这是代表每个等级出现水管的间距,单位为像素,通过等级输入数据,用逗号隔开,必须是一个字符串
 * Zzy.GFB.UpLimit(dis)                 //这会修改上管随机的极限边界,单位为像素
 * Zzy.GFB.DownLimit(dis)               //这会修改下管随机的极限边界,单位为像素
 * Zzy.GFB.NextLevel(levelStr)          //这会在通过一定数量的水管后,进入下一个等级,通过等级输入数据,用逗号隔开,必须是一个字符串
 * Zzy.GFB.SetUpMode(mode(MainInterface/Normal/Gliding/reverse))   //这代表启动游戏将会进入的模式,同时也决定退出的模式
 * 
 *
 *-------------------------------------------------------------------------
 *
 *
 * 我叫坂本：v1.06 拓展游戏结算后的事件执行参数,添加控制开始关卡参数
 * 我叫坂本：v1.05 拓展脚本函数,添加控制进入界面参数以及相关指令
 * 我叫坂本：v1.04 可通过参数修改图片存放路径,修复记录数据显示异常的问题,额外存储变量
 * 我叫坂本：v1.03 添加更多可控制参数,添加与旧存档兼容
 * 我叫坂本：v1.02 修复内存消耗问题,请将GameCore插件更新到版本1.12及以上
 * 我叫版本: v1.01 添加背景和背景BGM参数
 * 我叫坂本：v1.00 完成插件功能
 *
 *-------------------------------------------------------------------------
 *
 * @param ---主设置---
 * @default
 *
 *
 * @param GameName
 * @text 游戏名
 * @parent ---主设置---
 * @type text
 * @desc 这是启动游戏的名称,调用Play插件命令后填写的游戏名
 * @default FlappyBird
 *
 * @param SetUpMode
 * @parent ---主设置---
 * @text 启动游戏模式
 * @type combo
 * @option MainInterface
 * @option Normal
 * @option Gliding
 * @option Reverse
 * @desc 游戏开始进到的界面,默认MainInterface(主界面),Normal(普通),Gliding(滑翔),Reverse(颠倒)
 * @default MainInterface
 *
 *
 * @param ---事件执行---
 * @default
 *
 *
 * @param WinCommon
 * @text 胜利事件
 * @parent ---事件执行---
 * @type Number
 * @desc 这是小游戏结束后,如果以胜利告终,将会执行的事件ID,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param WinScript
 * @text 胜利脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param FailCommon
 * @text 失败事件
 * @parent ---事件执行---
 * @type Number
 * @desc 这是小游戏结束后,如果以胜利告终,将会执行的事件ID,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param FailScript
 * @text 失败脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param Other1Common
 * @text 特殊情况1事件
 * @parent ---事件执行---
 * @type Number
 * @desc 除了胜利和失败外,允许出现一些特殊形况,那种自定义的终止条件,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param Other1Script
 * @text 特殊情况1脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param Other2Common
 * @text 特殊情况2事件
 * @parent ---事件执行---
 * @type Number
 * @desc 除了胜利和失败外,允许出现一些特殊形况,那种自定义的终止条件,填0则不会执行,填写优先级会高于小游戏核心
 * @default 0
 *
 * @param Other2Script
 * @text 特殊情况2脚本
 * @parent ---事件执行---
 * @type note
 * @desc 填写优先级会高于小游戏核心
 * @default ""
 *
 *
 * @param SaveScoreVariable
 * @text 存放分数变量
 * @parent ---事件执行---
 * @type Variable
 * @desc 这是在进行游戏后,存放分数变量的ID值,这个变量是额外对这款游戏的分数进行存储,与核心中的存放不冲突,填0则不会存储
 * @default 0
 *
 * @param SaveTimeVariable
 * @text 存放耗时变量
 * @parent ---事件执行---
 * @type Variable
 * @desc 这是在进行游戏后,存放事件变量的ID值,这个变量是额外对这款游戏的耗时进行存储,与核心中的存放不冲突,填0则不会存储
 * @default 0
 *
 *
 * @param ---图片路径---
 * @default
 *
 * @param PicPath
 * @text 图片路径
 * @parent ---图片路径---
 * @type text
 * @desc 存储图片的路径,默认值是在指定文件夹中,改成自定义文件夹请确保文件夹存在
 * @default img/pictures/FlappyBird/
 *
 * @param ---图片资源---
 * @default
 *
 *
 * @param BackGroundPic
 * @text 背景图片
 * @parent ---图片资源---
 * @type text
 * @desc 如果填写了背景图片的文件名,则会作为背景图片,如果没有填写,会默认使用GameCore参数的背景图片
 * @default FBBk
 *
 *
 *
 * @param BackGround1Pic
 * @text 1层景深图片
 * @parent ---图片资源---
 * @type text
 * @desc 最底层背景层,图片放在Pictures文件夹中
 * @default FBBk1
 *
 * @param BackGround2Pic
 * @text 2层景深图片
 * @parent ---图片资源---
 * @type text
 * @desc 中层背景层,图片放在Pictures文件夹中
 * @default FBBk2
 *
 * @param BackGround3Pic
 * @text 3层景深图片
 * @parent ---图片资源---
 * @type text
 * @desc 前层背景层,图片放在Pictures文件夹中
 * @default FBBk3
 *
 * @param BackFloorPic
 * @text 地面图片
 * @parent ---图片资源---
 * @type text
 * @desc 地面背景层,图片放在Pictures文件夹中
 * @default FBFloor
 *
 * @param PlayerPic
 * @text 玩家图片
 * @parent ---图片资源---
 * @type text
 * @desc 玩家的图像,注意 _?x?的格式,这是指定动画切片的格式,导入动态图片请按照这种格式来指定
 * @default FBPlayer_3x1
 *
 * @param BkBridPic
 * @text 背景鸟图片
 * @parent ---图片资源---
 * @type text
 * @desc 玩家的图像,注意 _?x?的格式,这是指定动画切片的格式,导入动态图片请按照这种格式来指定
 * @default FBBkBrid_3x1
 *
 * @param PipePic
 * @text 水管障碍图片
 * @parent ---图片资源---
 * @type text
 * @desc 水管障碍的图片,图片放在Pictures文件夹中
 * @default FBPipe
 *
 * @param PipeHeadPic
 * @text 水管头障碍图片
 * @parent ---图片资源---
 * @type text
 * @desc 水管头障碍的图片,图片放在Pictures文件夹中
 * @default FBPipeH
 *
 * @param FBNormalModePic
 * @text 正常模式图片
 * @parent ---图片资源---
 * @type text
 * @desc 显示选择正常模式的图片,图片放在Pictures文件夹中
 * @default FBNormal
 *
 * @param FBGlidingModePic
 * @text 滑翔模式图片
 * @parent ---图片资源---
 * @type text
 * @desc 显示选择滑翔模式的图片,图片放在Pictures文件夹中
 * @default FBGliding
 *
 * @param FBReverseModePic
 * @text 颠倒模式图片
 * @parent ---图片资源---
 * @type text
 * @desc 显示选择颠倒模式的图片,图片放在Pictures文件夹中
 * @default FBReverse
 *
 * @param FBPausePic
 * @text 暂停图片
 * @parent ---图片资源---
 * @type text
 * @desc 暂停情况下显示的图片,图片放在Pictures文件夹中
 * @default FBPause
 *
 * @param ExitButtonPic
 * @text 退出按钮
 * @parent ---图片资源---
 * @type text
 * @desc 退出按钮的图片名称,图片放在Pictures文件夹中,注意按钮有3张图片,后两张后缀标注'1','2'
 * @default FBExit
 *
 *
 *
 *
 *
 *
 *
 * @param ---数据设置---
 * @default
 *
 * @param Bk1ScrollSpeed
 * @parent ---数据设置---
 * @text 背景层1卷动速度
 * @type text
 * @desc 这是背景层跟随卷动的速度,正数向右,负数向左,可以输入小数,默认值-0.3,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default -0.3,-0.3,-0.3,-0.3,-0.3
 *
 * 
 * @param Bk2ScrollSpeed
 * @parent ---数据设置---
 * @text 背景层2卷动速度
 * @type text
 * @desc 这是背景层跟随卷动的速度,正数向右,负数向左,可以输入小数,默认值-0.5,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default -0.5,-0.5,-0.5,-0.5,-0.5
 *
 * @param Bk3ScrollSpeed
 * @parent ---数据设置---
 * @text 背景层3卷动速度
 * @type text
 * @desc 这是背景层跟随卷动的速度,正数向右,负数向左,可以输入小数,默认值-0.8,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default -0.8,-0.8,-0.8,-0.8,-0.8
 *
 * @param BkFloorScrollSpeed
 * @text 地面卷动速度
 * @parent ---数据设置---
 * @type text
 * @desc 这是地面的卷动速度,正数向右,负数向左,可以输入小数,默认值-5,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default -5,-5.5,-6,-6.5,-7
 *
 *
 * @param StartLevel
 * @parent ---数据设置---
 * @text 起始等级
 * @type Text
 * @desc 这是游戏开始时的等级值,这可以是一个公式,默认数值为1
 * @default 1
 *
 *
 * @param MaxLevel
 * @text 最高等级
 * @parent ---数据设置---
 * @type Text
 * @desc 这是关卡能进行的最高等级,这可以是一个公式,默认上限为5
 * @default 5
 *
 *
 * @param PipeSpeed
 * @text 水管速度
 * @parent ---数据设置---
 * @type text
 * @desc 这是水管的移动速度可以是一个小数,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default 5,5.5,6,6.5,7
 *
 * @param PipeScore
 * @text 水管分数
 * @parent ---数据设置---
 * @type text
 * @desc 这是通过水管获得的分数,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default 5,10,15,20,25
 *
 * @param PipeHue
 * @text 水管色相
 * @parent ---数据设置---
 * @type text
 * @desc 这是不同等级下刷出的水管的色相,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default 0,60,120,180,240
 *
 * @param PipeAppear
 * @text 水管出现帧数
 * @parent ---数据设置---
 * @type text
 * @desc 这是不同等级下刷出的水管帧数时长,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default 90,86,82,78,74
 *
 * @param PipeSpace
 * @text 上下水管的间距
 * @parent ---数据设置---
 * @type text
 * @desc 这是不同等级下刷出的水管间距,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default 164,160,156,152,150
 *
 * @param PipeUpLimit
 * @text 上水管极限距离
 * @parent ---数据设置---
 * @type text
 * @desc 这是随机刷出水管位置的上方极限值,随机刷出的高度不会低于这个值
 * @default 64
 *
 * @param PipeDownLimit
 * @text 下水管极限距离
 * @parent ---数据设置---
 * @type text
 * @desc 这是随机刷出水管位置的下方极限值,随机刷出的高度不会高于这个值
 * @default 64
 *
 * @param NextLevel
 * @text 难度等级提升
 * @parent ---数据设置---
 * @type text
 * @desc 这是通过多少水管提升一个等级,请写入固定格式,x,x,x,x其中x代表不同等级下的数值
 * @default 50,100,150,200,250
 *
 * @param IsHaveBkBrid
 * @text 是否有背景小鸟
 * @parent ---数据设置---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否有其他飞过的小鸟作为背景
 * YES - true     NO - false
 * @default true
 *
 * @param BkBridTime
 * @text 背景小鸟出现
 * @parent ---数据设置---
 * @type text
 * @desc 背景小鸟出现的时长范围,请输入帧数,默认300-600,代表300~600帧之内出现
 * @default 300-600
 *
 * @param BkBridSpeed
 * @text 背景小鸟速度
 * @parent ---数据设置---
 * @type text
 * @desc 背景小鸟速度的范围,请输入帧数,默认2-5,代表2-5帧之内出现
 * @default 2-5
 *
 *
 *
 *
 * @param ---玩法---
 * @default
 *
 * @param IsHaveNormalMode
 * @parent ---玩法---
 * @text 是否激活普通模式
 * @type boolean
 * @on YES
 * @off NO
 * @desc 经典的飞翔鸟玩法,躲避障碍获得高分,关闭后将不会包含这个模式,默认开启
 * YES - true     NO - false
 * @default true
 *
 * @param IsHaveGlidingMode
 * @parent ---玩法---
 * @text 是否激活滑翔模式
 * @type boolean
 * @on YES
 * @off NO
 * @desc 飞翔鸟跟随鼠标玩法,躲避障碍获得高分,关闭后将不会包含这个模式,默认开启
 * YES - true     NO - false
 * @default true
 *
 * @param IsHaveReverseMode
 * @parent ---玩法---
 * @text 是否激活颠倒模式
 * @type boolean
 * @on YES
 * @off NO
 * @desc 飞翔鸟会反重力,躲避障碍获得高分,关闭后将不会包含这个模式,默认开启
 * YES - true     NO - false
 * @default true
 *
 *
 *
 * @param ---特殊结束条件1---
 * @default
 *
 * @param OtherEnd1Script
 * @text 特殊情况1脚本
 * @parent ---特殊结束条件1---
 * @type note
 * @desc 
 * @default ""
 *
 *
 * @param ---特殊结束条件2---
 * @default
 *
 * @param OtherEnd2Script
 * @text 特殊情况2脚本
 * @parent ---特殊结束条件2---
 * @type note
 * @desc 
 * @default ""
 *
 *
 * @param ---画面调整---
 * @default
 *
 *
 *
 * @param SelectSpr1T
 * @text 分数文本
 * @parent ---画面调整---
 * @type text
 * @desc 显示的文本内容
 * @default 分数:
 *
 *
 * @param SelectSpr1X
 * @text 分数文本图片X
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置X,这可以是一段代码
 * @default Graphics.boxWidth / 4 + 64
 *
 * @param SelectSpr1Y
 * @text 分数文本图片Y
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置Y,这可以是一段代码
 * @default Graphics.boxHeight / 10
 *
 *
 *
 * @param SelectSpr2T
 * @text 时间文本
 * @parent ---画面调整---
 * @type text
 * @desc 显示的文本内容
 * @default 时间:
 *
 * @param SelectSpr2X
 * @text 时间文本图片X
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置X,这可以是一段代码
 * @default Graphics.boxWidth / 2 + 64
 *
 * @param SelectSpr2Y
 * @text 时间文本图片Y
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置Y,这可以是一段代码
 * @default Graphics.boxHeight / 10
 *
 *
 *
 * @param SelectSpr3T
 * @text 等级文本
 * @parent ---画面调整---
 * @type text
 * @desc 显示的文本内容
 * @default 等级:
 *
 * @param SelectSpr3X
 * @text 等级文本图片X
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置X,这可以是一段代码
 * @default Graphics.boxWidth * 3 / 4 + 64
 *
 * @param SelectSpr3Y
 * @text 等级文本图片Y
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置Y,这可以是一段代码
 * @default Graphics.boxHeight / 10
 *
 *
 *
 * @param CountNumberX
 * @text 计数位置X
 * @parent ---画面调整---
 * @type text
 * @desc 位置X,这可以是一段代码
 * @default Graphics.boxWidth / 2
 *
 * @param CountNumberY
 * @text 计数位置Y
 * @parent ---画面调整---
 * @type text
 * @desc 位置Y,这可以是一段代码
 * @default Graphics.boxHeight / 3
 *
 *
 *

 *
 *
 * @param SelectPic1X
 * @text 选择图片1X
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置X,这可以是一段代码
 * @default Graphics.boxWidth / 2
 *
 * @param SelectPic1Y
 * @text 选择图片1Y
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置Y,这可以是一段代码
 * @default Graphics.boxHeight / 4
 *
 *
 *
 * @param SelectPic2X
 * @text 选择图片2X
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置X,这可以是一段代码
 * @default Graphics.boxWidth / 2
 *
 * @param SelectPic2Y
 * @text 选择图片2Y
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置Y,这可以是一段代码
 * @default Graphics.boxHeight / 2
 *
 *
 *
 * @param SelectPic3X
 * @text 选择图片3X
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置X,这可以是一段代码
 * @default Graphics.boxWidth / 2
 *
 * @param SelectPic3Y
 * @text 选择图片3Y
 * @parent ---画面调整---
 * @type text
 * @desc 图片位置Y,这可以是一段代码
 * @default Graphics.boxHeight * 3 / 4
 *
 *
 *
 *
 *
 * @param ExitButtonX
 * @text 退出按钮位置X
 * @parent ---画面调整---
 * @type text
 * @desc 位置X,这可以是一段代码
 * @default Graphics.boxWidth - 64
 *
 * @param ExitButtonY
 * @text 退出按钮位置Y
 * @parent ---画面调整---
 * @type text
 * @desc 位置Y,这可以是一段代码
 * @default Graphics.boxHeight - 32
 *
 *
 *
 *
 * @param ---音效---
 * @default
 *
 *
 * @param BkBGMName
 * @text 背景BGM名称
 * @parent ---音效---
 * @type text
 * @desc 执行小游戏时,会播放的背景bgm,BGM应放在audio/bgm文件夹中,不填写会使用GameCore插件中默认的背景音效
 * @default
 *
 * @param BkBGMVolume
 * @text 背景BGM音量
 * @parent ---音效---
 * @type Number
 * @desc 音量大小,默认100
 * @default 100
 
 * @param BkBGMPitch
 * @text 背景BGM声调
 * @parent ---音效---
 * @type Number
 * @desc 声调,默认100
 * @default 100
 
 * @param BkBGMBGSPan
 * @text 背景BGM声道
 * @parent ---音效---
 * @type Number
 * @desc 声道,默认0
 * @default 0
 *
 * @param ButtonSound
 * @text 按钮时音效
 * @parent ---音效---
 * @type text
 * @desc 按钮时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Cancel2
 *
 * @param ButtonVolume
 * @text 按钮时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 按钮时产生的音量,默认值100
 * @default 100
 *
 * @param ButtonPitch
 * @text 按钮时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 按钮时产生的音调,默认值100
 * @default 100
 *
 * @param ButtonPan
 * @text 按钮时声道
 * @parent ---音效---
 * @type number
 * @desc 按钮时产生的声道,默认值0
 * @default 0
 *
 *
 *
 * @param SelectSound
 * @text 选择时音效
 * @parent ---音效---
 * @type text
 * @desc 选择时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Coin
 *
 * @param SelectVolume
 * @text 选择时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 选择时产生的音量,默认值100
 * @default 100
 *
 * @param SelectPitch
 * @text 选择时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 选择时产生的音调,默认值100
 * @default 100
 *
 * @param SelectPan
 * @text 选择时声道
 * @parent ---音效---
 * @type number
 * @desc 选择时产生的声道,默认值0
 * @default 0
 *
 *
 * @param FlySound
 * @text 飞翔时音效
 * @parent ---音效---
 * @type text
 * @desc 飞翔时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Crossbow
 *
 * @param FlyVolume
 * @text 飞翔时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 飞翔时产生的音量,默认值100
 * @default 100
 *
 * @param FlyPitch
 * @text 飞翔时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 飞翔时产生的音调,默认值100
 * @default 100
 *
 * @param FlyPan
 * @text 飞翔时声道
 * @parent ---音效---
 * @type number
 * @desc 飞翔时产生的声道,默认值0
 * @default 0
 *
 *
 * @param PassSound
 * @text 飞翔时音效
 * @parent ---音效---
 * @type text
 * @desc 飞翔时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Decision2
 *
 * @param PassVolume
 * @text 飞翔时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 飞翔时产生的音量,默认值100
 * @default 100
 *
 * @param PassPitch
 * @text 飞翔时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 飞翔时产生的音调,默认值100
 * @default 100
 *
 * @param PassPan
 * @text 飞翔时声道
 * @parent ---音效---
 * @type number
 * @desc 飞翔时产生的声道,默认值0
 * @default 0
 *
 *
 * @param LevelSound
 * @text 难度升级时音效
 * @parent ---音效---
 * @type text
 * @desc 难度升级时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Heal2
 *
 * @param LevelVolume
 * @text 难度升级时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 难度升级时产生的音量,默认值100
 * @default 100
 *
 * @param LevelPitch
 * @text 难度升级时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 难度升级时产生的音调,默认值100
 * @default 100
 *
 * @param LevelPan
 * @text 难度升级时声道
 * @parent ---音效---
 * @type number
 * @desc 难度升级时产生的声道,默认值0
 * @default 0
 *
 *
 * @param CollSound
 * @text 碰撞时音效
 * @parent ---音效---
 * @type text
 * @desc 碰撞时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Damage3
 *
 * @param CollVolume
 * @text 碰撞时音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 碰撞时产生的音量,默认值100
 * @default 100
 *
 * @param CollPitch
 * @text 碰撞时音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 碰撞时产生的音调,默认值100
 * @default 100
 *
 * @param CollPan
 * @text 碰撞时声道
 * @parent ---音效---
 * @type number
 * @desc 碰撞时产生的声道,默认值0
 * @default 0
 *
 *
 *
 *
 *
 */
 
 
var LiuYue = LiuYue || {};
LiuYue.LiuYue_GameFlappyBird = true;//插件启动


var Zzy = Zzy || {};
Zzy.GFB = Zzy.GFB || {};
Zzy.GFB.version = 1.06;  
Zzy.Parameters = PluginManager.parameters('LiuYue_GameFlappyBird');
Zzy.Param = Zzy.Param || {};
Zzy.Param.GFBGameName = String(Zzy.Parameters['GameName']);//启动游戏的名称


Zzy.GFB.GameCorePlugin = false;
if(LiuYue.LiuYue_GameCore)//前置插件检测
{
	Zzy.GCF.GameCorePlugin = true;
}
else
{
	console.log("Error:(LiuYue_GameFlappyBird):这个插件需要LiuYue_GameCore作为前置插件,请将这个插件放在核心插件下!!!");
}

//注册游戏
Zzy.GCF.RegisterGame(Zzy.Param.GFBGameName,'FlappyBird');


//--------------------------------------数据----------------------------------------
Zzy.Param.GFBBk1ScrollSpeed = String(Zzy.Parameters['Bk1ScrollSpeed']);//背景层1卷动速度
Zzy.Param.GFBBk2ScrollSpeed = String(Zzy.Parameters['Bk2ScrollSpeed']);//背景层2卷动速度
Zzy.Param.GFBBk3ScrollSpeed = String(Zzy.Parameters['Bk3ScrollSpeed']);//背景层3卷动速度
Zzy.Param.GFBBkFloorScrollSpeed = String(Zzy.Parameters['BkFloorScrollSpeed']);//地面卷动速度

Zzy.Param.GFBStartLevel = String(Zzy.Parameters['StartLevel']);//目前等级
Zzy.Param.GFBMaxLevel = String(Zzy.Parameters['MaxLevel']);//最高等级
Zzy.Param.GFBPipeSpeed = String(Zzy.Parameters['PipeSpeed']);//水管速度
Zzy.Param.GFBPipeScore = String(Zzy.Parameters['PipeScore']);//水管分数
Zzy.Param.GFBPipeHue = String(Zzy.Parameters['PipeHue']);//水管色相
Zzy.Param.GFBPipeAppear = String(Zzy.Parameters['PipeAppear']);//水管刷出帧数
Zzy.Param.GFBPipeSpace = String(Zzy.Parameters['PipeSpace']);//上下水管的间距
Zzy.Param.GFBPipeUpLimit = parseInt(Zzy.Parameters['PipeUpLimit']);//上水管的间距
Zzy.Param.GFBPipeDownLimit = parseInt(Zzy.Parameters['PipeDownLimit']);//下水管的间距
Zzy.Param.GFBNextLevel = String(Zzy.Parameters['NextLevel']);//下一关等级

Zzy.Param.GFBIsHaveBkBrid = eval(String(Zzy.Parameters['IsHaveBkBrid']))//是否有背景小鸟
Zzy.Param.GFBBkBridTime = String(Zzy.Parameters['BkBridTime']);//背景小鸟出现
Zzy.Param.GFBBkBridSpeed = String(Zzy.Parameters['BkBridSpeed']);//背景小鸟速度


//--------------------------------------玩法模式----------------------------------------
Zzy.Param.GFBIsHaveNormalMode = eval(String(Zzy.Parameters['IsHaveNormalMode']));//是否包含普通模式
Zzy.Param.GFBIsHaveGlidingMode = eval(String(Zzy.Parameters['IsHaveGlidingMode']));//是否包含滑翔模式
Zzy.Param.GFBIsHaveReverseMode = eval(String(Zzy.Parameters['IsHaveReverseMode']));//是否包含颠倒模式


Zzy.GFB.SetUpModeToID = function(str)
{
	switch(str)
	{
		case 'MainInterface':return 0;
		case 'Normal':return 1;
		case 'Gliding':return 2;
		case 'Reverse':return 3;
	}
	console.log('Error:一个错误(来自LiuYue_GameFlappyBird),怀疑是否启动模式字符串输入错误?');
	return 0;
}

Zzy.Param.GFBSetUpMode = String(Zzy.Parameters['SetUpMode']);
Zzy.Param.GFBSetUpMode = Zzy.GFB.SetUpModeToID(Zzy.Param.GFBSetUpMode);


//---------------------------------------图片-----------------------------------------

Zzy.Param.GFBWinCommon = parseInt(Zzy.Parameters['WinCommon']);//胜利事件
Zzy.Param.GFBWinScript = Zzy.Parameters['WinScript'] ? new Function(JSON.parse(Zzy.Parameters['WinScript']) + '\nreturn true;') : undefined;//胜利脚本
Zzy.Param.GFBFailCommon = parseInt(Zzy.Parameters['FailCommon']);//失败事件
Zzy.Param.GFBFailScript = Zzy.Parameters['FailScript'] ? new Function(JSON.parse(Zzy.Parameters['FailScript']) + '\nreturn true;') : undefined;//失败脚本
Zzy.Param.GFBOther1Common = parseInt(Zzy.Parameters['Other1Common']);//特殊情况1事件
Zzy.Param.GFBOther1Script = Zzy.Parameters['Other1Script'] ? new Function(JSON.parse(Zzy.Parameters['Other1Script']) + '\nreturn true;') : undefined;//特殊情况1脚本
Zzy.Param.GFBOther2Common = parseInt(Zzy.Parameters['Other2Common']);//特殊情况2事件
Zzy.Param.GFBOther2Script = Zzy.Parameters['Other2Script'] ? new Function(JSON.parse(Zzy.Parameters['Other2Script']) + '\nreturn true;') : undefined;//特殊情况2脚本
Zzy.Param.GFBSaveScoreVariable = parseInt(Zzy.Parameters['SaveScoreVariable']);//变量index
Zzy.Param.GFBSaveTimeVariable = parseInt(Zzy.Parameters['SaveTimeVariable']);//变量index



Zzy.Param.GFBPicPath = String(Zzy.Parameters['PicPath']);//图片路径

Zzy.Param.GFBBackGroundPic = String(Zzy.Parameters['BackGroundPic']);//背景图片

Zzy.Param.GFBBackGround1Pic = String(Zzy.Parameters['BackGround1Pic']);//1层景深
Zzy.Param.GFBBackGround2Pic = String(Zzy.Parameters['BackGround2Pic']);//2层景深
Zzy.Param.GFBBackGround3Pic = String(Zzy.Parameters['BackGround3Pic']);//2层景深
Zzy.Param.GFBBackFloorPic = String(Zzy.Parameters['BackFloorPic']);//地面
Zzy.Param.GFBPlayerPic = String(Zzy.Parameters['PlayerPic']);//玩家图片
Zzy.Param.GFBBkBridPic = String(Zzy.Parameters['BkBridPic']);//背景鸟图片
Zzy.Param.GFBPipePic = String(Zzy.Parameters['PipePic']);//水管障碍图片
Zzy.Param.GFBPipeHeadPic = String(Zzy.Parameters['PipeHeadPic']);//水管头障碍图片
Zzy.Param.GFBFBNormalModePic = String(Zzy.Parameters['FBNormalModePic']);//正常模式图片
Zzy.Param.GFBFBGlidingModePic = String(Zzy.Parameters['FBGlidingModePic']);//滑翔模式图片
Zzy.Param.GFBFBReverseModePic = String(Zzy.Parameters['FBReverseModePic']);//颠倒模式图片
Zzy.Param.GFBPausePic = String(Zzy.Parameters['FBPausePic']);//暂停模式下的图片
Zzy.Param.GFBExitButtonPic = String(Zzy.Parameters['ExitButtonPic']);//退出按钮图片


//------------------------------特殊情况1,2脚本--------------------------------
Zzy.Param.GFBOtherEnd1Script = new Function(JSON.parse(Zzy.Parameters['OtherEnd1Script']));//结束情况1
Zzy.Param.GFBOtherEnd2Script = new Function(JSON.parse(Zzy.Parameters['OtherEnd2Script']));//结束情况2



//------------------------------------画面调整-------------------------

Zzy.Param.GFBSelectSpr1T = String(Zzy.Parameters['SelectSpr1T']);
Zzy.Param.GFBSelectSpr1X = String(Zzy.Parameters['SelectSpr1X']);
Zzy.Param.GFBSelectSpr1Y = String(Zzy.Parameters['SelectSpr1Y']);


Zzy.Param.GFBSelectSpr2T = String(Zzy.Parameters['SelectSpr2T']);
Zzy.Param.GFBSelectSpr2X = String(Zzy.Parameters['SelectSpr2X']);
Zzy.Param.GFBSelectSpr2Y = String(Zzy.Parameters['SelectSpr2Y']);


Zzy.Param.GFBSelectSpr3T = String(Zzy.Parameters['SelectSpr3T']);
Zzy.Param.GFBSelectSpr3X = String(Zzy.Parameters['SelectSpr3X']);
Zzy.Param.GFBSelectSpr3Y = String(Zzy.Parameters['SelectSpr3Y']);


Zzy.Param.GFBCountNumberX = String(Zzy.Parameters['CountNumberX']);
Zzy.Param.GFBCountNumberY = String(Zzy.Parameters['CountNumberY']);


Zzy.Param.GFBExitButtonX = String(Zzy.Parameters['ExitButtonX']);
Zzy.Param.GFBExitButtonY = String(Zzy.Parameters['ExitButtonY']);


Zzy.Param.GFBSelectPic1X = String(Zzy.Parameters['SelectPic1X']);
Zzy.Param.GFBSelectPic1Y = String(Zzy.Parameters['SelectPic1Y']);

Zzy.Param.GFBSelectPic2X = String(Zzy.Parameters['SelectPic2X']);
Zzy.Param.GFBSelectPic2Y = String(Zzy.Parameters['SelectPic2Y']);

Zzy.Param.GFBSelectPic3X = String(Zzy.Parameters['SelectPic3X']);
Zzy.Param.GFBSelectPic3Y = String(Zzy.Parameters['SelectPic3Y']);

//------------------------------音效-------------------------------

Zzy.GFB.MakeSE = function(seName,seVolume,sePitch,sePan)
{
	if(!seName)return undefined;
	var se = {
		name:seName,
		volume:(seVolume ? seVolume : 100),
		pitch:(sePitch ? sePitch : 100),
		pan:(sePan ? sePan : 0)
	};
	return se;
}

Zzy.Param.GFBBkBGMName = String(Zzy.Parameters['BkBGMName']);//背景BGM名称
Zzy.Param.GFBBkBGMVolume = parseInt(Zzy.Parameters['BkBGMVolume']);//背景BGM音量
Zzy.Param.GFBBkBGMPitch = parseInt(Zzy.Parameters['BkBGMPitch']);//背景BGM声调
Zzy.Param.GFBBkBGMBGSPan = parseInt(Zzy.Parameters['BkBGMPan']);//背景BGM声道
Zzy.Param.GFBBkBGM = Zzy.GFB.MakeSE(Zzy.Param.GFBBkBGMName,Zzy.Param.GFBBkBGMVolume,Zzy.Param.GFBBkBGMPitch,Zzy.Param.GFBBkBGMBGSPan);


Zzy.Param.GFBButtonSound = String(Zzy.Parameters['ButtonSound']);//按钮时音效
Zzy.Param.GFBButtonVolume = parseInt(Zzy.Parameters['ButtonVolume']);//按钮时音量
Zzy.Param.GFBButtonPitch = parseInt(Zzy.Parameters['ButtonPitch']);//按钮时音调
Zzy.Param.GFBButtonPan = parseInt(Zzy.Parameters['ButtonPan']);//按钮时声道
Zzy.Param.GFBButtonSE = Zzy.GFB.MakeSE(Zzy.Param.GFBButtonSound,Zzy.Param.GFBButtonVolume,Zzy.Param.GFBButtonPitch,Zzy.Param.GFBButtonPan);

Zzy.Param.GFBSelectSound = String(Zzy.Parameters['SelectSound']);//选择时音效
Zzy.Param.GFBSelectVolume = parseInt(Zzy.Parameters['SelectVolume']);
Zzy.Param.GFBSelectPitch = parseInt(Zzy.Parameters['SelectPitch']);
Zzy.Param.GFBSelectPan = parseInt(Zzy.Parameters['SelectPan']);
Zzy.Param.GFBSelectSE = Zzy.GFB.MakeSE(Zzy.Param.GFBSelectSound,Zzy.Param.GFBSelectVolume,Zzy.Param.GFBSelectPitch,Zzy.Param.GFBSelectPan);

Zzy.Param.GFBFlySound = String(Zzy.Parameters['FlySound']);//飞翔时音效
Zzy.Param.GFBFlyVolume = parseInt(Zzy.Parameters['FlyVolume']);
Zzy.Param.GFBFlyPitch = parseInt(Zzy.Parameters['FlyPitch']);
Zzy.Param.GFBFlyPan = parseInt(Zzy.Parameters['FlyPan']);
Zzy.Param.GFBFlySE = Zzy.GFB.MakeSE(Zzy.Param.GFBFlySound,Zzy.Param.GFBFlyVolume,Zzy.Param.GFBFlyPitch,Zzy.Param.GFBFlyPan);

Zzy.Param.GFBPassSound = String(Zzy.Parameters['PassSound']);//通过时音效
Zzy.Param.GFBPassVolume = parseInt(Zzy.Parameters['PassVolume']);
Zzy.Param.GFBPassPitch = parseInt(Zzy.Parameters['PassPitch']);
Zzy.Param.GFBPassPan = parseInt(Zzy.Parameters['PassPan']);
Zzy.Param.GFBPassSE = Zzy.GFB.MakeSE(Zzy.Param.GFBPassSound,Zzy.Param.GFBPassVolume,Zzy.Param.GFBPassPitch,Zzy.Param.GFBPassPan);

Zzy.Param.GFBLevelSound = String(Zzy.Parameters['LevelSound']);//通过时音效
Zzy.Param.GFBLevelVolume = parseInt(Zzy.Parameters['LevelVolume']);
Zzy.Param.GFBLevelPitch = parseInt(Zzy.Parameters['LevelPitch']);
Zzy.Param.GFBLevelPan = parseInt(Zzy.Parameters['LevelPan']);
Zzy.Param.GFBLevelSE = Zzy.GFB.MakeSE(Zzy.Param.GFBLevelSound,Zzy.Param.GFBLevelVolume,Zzy.Param.GFBLevelPitch,Zzy.Param.GFBLevelPan);

Zzy.Param.GFBCollSound = String(Zzy.Parameters['CollSound']);//通过时音效
Zzy.Param.GFBCollVolume = parseInt(Zzy.Parameters['CollVolume']);
Zzy.Param.GFBCollPitch = parseInt(Zzy.Parameters['CollPitch']);
Zzy.Param.GFBCollPan = parseInt(Zzy.Parameters['CollPan']);
Zzy.Param.GFBCollSE = Zzy.GFB.MakeSE(Zzy.Param.GFBCollSound,Zzy.Param.GFBCollVolume,Zzy.Param.GFBCollPitch,Zzy.Param.GFBCollPan);

Zzy.Param.GFBAllSE = [];
Zzy.Param.GFBAllSE = [undefined,
		Zzy.Param.GFBButtonSE,Zzy.Param.GFBSelectSE,
		Zzy.Param.GFBFlySE,Zzy.Param.GFBPassSE,
		Zzy.Param.GFBLevelSE,Zzy.Param.GFBCollSE];

//声音ID
//0 - undefined
//1 - 按钮音效
//2 - 选择框音效
//3 - 飞翔时音效
//4 - 通过水管
//5 - 难度提升
//6 - 碰撞到建筑



//----------------------------临时变量-----------------------------

Zzy.GFB.WindowPointer = undefined;//最底层,背景
Zzy.GFB.Window1Pointer = undefined;//层1,三层卷动背景,其他小鸟背景
Zzy.GFB.Window2Pointer = undefined;//层2,水管
Zzy.GFB.Window3Pointer = undefined;//层2,水管头
Zzy.GFB.Window4Pointer = undefined;//层4,玩家,地面卷动



//==================================================================
//Game_System
//==================================================================

Zzy.GFB.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.GFB.Game_System_initialize.call(this);
	this.ZzyGFBInitData();//初始化数据
};

Game_System.prototype.ZzyGFBInitData = function()
{
	
	this._ZzyGFBBk1ScrollSpeed = Zzy.Param.GFBBk1ScrollSpeed;//背景层1卷动速度
	this._ZzyGFBBk2ScrollSpeed = Zzy.Param.GFBBk2ScrollSpeed;//背景层2卷动速度
	this._ZzyGFBBk3ScrollSpeed = Zzy.Param.GFBBk3ScrollSpeed;//背景层3卷动速度
	this._ZzyGFBBkFloorScrollSpeed = Zzy.Param.GFBBkFloorScrollSpeed;//地面卷动
	
	this._ZzyGFBIsHaveNormalMode = Zzy.Param.GFBIsHaveNormalMode;//是否包含普通模式
	this._ZzyGFBIsHaveGlidingMode = Zzy.Param.GFBIsHaveGlidingMode;//是否包含滑翔模式
	this._ZzyGFBIsHaveReverseMode = Zzy.Param.GFBIsHaveReverseMode;//是否包含颠倒模式
	
	this._ZzyGFBNormalHighCount = 0;//历史最佳分
	this._ZzyGFBGlidingHighCount = 0;
	this._ZzyGFBReverseHighCount = 0;

	this._ZzyGFBStartLevel = Zzy.Param.GCSStartLevel;//开始值
	this._ZzyGFBMaxLevel = Zzy.Param.GFBMaxLevel;//关卡最高等级
	this._ZzyGFBPipeSpeed = Zzy.Param.GFBPipeSpeed;//水管速度
	this._ZzyGFBPipeScore = Zzy.Param.GFBPipeScore;//水管分数
	this._ZzyGFBPipeHue = Zzy.Param.GFBPipeHue;//水管色相
	this._ZzyGFBPipeAppear = Zzy.Param.GFBPipeAppear;//水管出现帧数
	this._ZzyGFBPipeSpace = Zzy.Param.GFBPipeSpace;//上下水管间距
	this._ZzyGFBPipeUpLimit = Zzy.Param.GFBPipeUpLimit;//上水管的间距
	this._ZzyGFBPipeDownLimit = Zzy.Param.GFBPipeDownLimit;//下水管的间距
	this._ZzyGFBNextLevel = Zzy.Param.GFBNextLevel;//下一关等级
	
	this._ZzyGFBSetUpMode = Zzy.Param.GFBSetUpMode;
}



Game_System.prototype.GetZzyGFBStartLevel = function()
{
	if(this._ZzyGFBStartLevel === undefined)
	{this._ZzyGFBStartLevel = Zzy.Param.GFBStartLevel;}
	return this._ZzyGFBStartLevel;
}


Game_System.prototype.SetZzyGFBStartLevel = function(level)
{
	this._ZzyGCSStartLevel = level;
}



Game_System.prototype.GetZzyGFBSetUpMode = function()
{
	if(this._ZzyGFBSetUpMode === undefined)
	{
		this._ZzyGFBSetUpMode = Zzy.Param.GFBSetUpMode;
	}
	return this._ZzyGFBSetUpMode;

}

Game_System.prototype.SetZzyGFBSetUpMode = function(modeID)
{
	this._ZzyGFBSetUpMode = modeID;
}


Game_System.prototype.GetZzyGFBBk1ScrollSpeed = function()
{
	if(this._ZzyGFBBk1ScrollSpeed === undefined)
	{this._ZzyGFBBk1ScrollSpeed = Zzy.Param.GFBBk1ScrollSpeed;}
	return this._ZzyGFBBk1ScrollSpeed;
}

Game_System.prototype.SetZzyGFBBk1ScrollSpeed = function(value)
{
	this._ZzyGFBBk1ScrollSpeed = value;
}


Game_System.prototype.GetZzyGFBBk2ScrollSpeed = function()
{
	if(this._ZzyGFBBk2ScrollSpeed === undefined)
	{this._ZzyGFBBk2ScrollSpeed = Zzy.Param.GFBBk2ScrollSpeed;}
	return this._ZzyGFBBk2ScrollSpeed;
}

Game_System.prototype.SetZzyGFBBk2ScrollSpeed = function(value)
{
	this._ZzyGFBBk2ScrollSpeed = value;
}


Game_System.prototype.GetZzyGFBBk3ScrollSpeed = function()
{
	if(this._ZzyGFBBk3ScrollSpeed === undefined)
	{this._ZzyGFBBk3ScrollSpeed = Zzy.Param.GFBBk3ScrollSpeed;}
	return this._ZzyGFBBk3ScrollSpeed;
}

Game_System.prototype.SetZzyGFBBk3ScrollSpeed = function(value)
{
	this._ZzyGFBBk3ScrollSpeed = value;
}

Game_System.prototype.GetZzyGFBBkFloorScrollSpeed = function()
{
	if(this._ZzyGFBBkFloorScrollSpeed === undefined)
	{this._ZzyGFBBkFloorScrollSpeed = Zzy.Param.GFBBkFloorScrollSpeed;}
	return this._ZzyGFBBkFloorScrollSpeed;
}

Game_System.prototype.SetZzyGFBBkFloorScrollSpeed = function(value)
{
	this._ZzyGFBBkFloorScrollSpeed = value;
}


Game_System.prototype.GetZzyGFBIsHaveNormalMode = function()
{
	if(this._ZzyGFBIsHaveNormalMode === undefined)
	{this._ZzyGFBIsHaveNormalMode = Zzy.Param.GFBIsHaveNormalMode;}
	return this._ZzyGFBIsHaveNormalMode;
}

Game_System.prototype.SetZzyGFBIsHaveNormalMode = function(value)
{
	this._ZzyGFBIsHaveNormalMode = value;
}



Game_System.prototype.GetZzyGFBIsHaveGlidingMode = function()
{
	if(this._ZzyGFBIsHaveGlidingMode === undefined)
	{this._ZzyGFBIsHaveGlidingMode = Zzy.Param.GFBIsHaveGlidingMode;}
	return this._ZzyGFBIsHaveGlidingMode;
}

Game_System.prototype.SetZzyGFBIsHaveGlidingMode = function(value)
{
	this._ZzyGFBIsHaveGlidingMode = value;
}


Game_System.prototype.GetZzyGFBIsHaveReverseMode = function()
{
	if(this._ZzyGFBIsHaveReverseMode === undefined)
	{this._ZzyGFBIsHaveReverseMode = Zzy.Param.GFBIsHaveReverseMode;}
	return this._ZzyGFBIsHaveReverseMode;
}

Game_System.prototype.SetZzyGFBIsHaveReverseMode = function(value)
{
	this._ZzyGFBIsHaveReverseMode = value;
}


Game_System.prototype.GetZzyGFBNormalHighCount = function()
{
	if(this._ZzyGFBNormalHighCount === undefined)
	{this._ZzyGFBNormalHighCount = 0;}
	return this._ZzyGFBNormalHighCount;
}

Game_System.prototype.SetZzyGFBNormalHighCount = function(value)
{
	this._ZzyGFBNormalHighCount = value;
}



Game_System.prototype.GetZzyGFBGlidingHighCount = function()
{
	if(this._ZzyGFBGlidingHighCount === undefined)
	{this._ZzyGFBGlidingHighCount = 0;}
	return this._ZzyGFBGlidingHighCount;
}

Game_System.prototype.SetZzyGFBGlidingHighCount = function(value)
{
	this._ZzyGFBGlidingHighCount = value;
}



Game_System.prototype.GetZzyGFBReverseHighCount = function()
{
	if(this._ZzyGFBReverseHighCount === undefined)
	{this._ZzyGFBReverseHighCount = 0;}
	return this._ZzyGFBReverseHighCount;
}

Game_System.prototype.SetZzyGFBReverseHighCount = function(value)
{
	this._ZzyGFBReverseHighCount = value;
}




Game_System.prototype.GetZzyGFBMaxLevel = function()
{
	if(this._ZzyGFBMaxLevel === undefined)
	{this._ZzyGFBMaxLevel = Zzy.Param.GFBMaxLevel;}
	return this._ZzyGFBMaxLevel;
}

Game_System.prototype.SetZzyGFBMaxLevel = function(value)
{
	this._ZzyGFBMaxLevel = value;
}


Game_System.prototype.GetZzyGFBPipeSpeed = function()
{
	if(this._ZzyGFBPipeSpeed === undefined)
	{this._ZzyGFBPipeSpeed = Zzy.Param.GFBPipeSpeed;}
	return this._ZzyGFBPipeSpeed;
}

Game_System.prototype.SetZzyGFBPipeSpeed = function(value)
{
	this._ZzyGFBPipeSpeed = value;
}


Game_System.prototype.GetZzyGFBPipeScore = function()
{
	if(this._ZzyGFBPipeScore === undefined)
	{this._ZzyGFBPipeScore = Zzy.Param.GFBPipeScore;}
	return this._ZzyGFBPipeScore;
}

Game_System.prototype.SetZzyGFBPipeScore = function(value)
{
	this._ZzyGFBPipeScore = value;
}


Game_System.prototype.GetZzyGFBPipeHue = function()
{
	if(this._ZzyGFBPipeHue === undefined)
	{this._ZzyGFBPipeHue = Zzy.Param.GFBPipeHue;}
	return this._ZzyGFBPipeHue;
}

Game_System.prototype.SetZzyGFBPipeHue = function(value)
{
	this._ZzyGFBPipeHue = value;
}

Game_System.prototype.GetZzyGFBPipeAppear = function()
{
	if(this._ZzyGFBPipeAppear === undefined)
	{this._ZzyGFBPipeAppear = Zzy.Param.GFBPipeAppear;}
	return this._ZzyGFBPipeAppear;
}

Game_System.prototype.SetZzyGFBPipeAppear = function(value)
{
	this._ZzyGFBPipeAppear = value;
}

Game_System.prototype.GetZzyGFBPipeSpace = function()
{
	if(this._ZzyGFBPipeSpace === undefined)
	{this._ZzyGFBPipeSpace = Zzy.Param.GFBPipeSpace;}
	return this._ZzyGFBPipeSpace;
}

Game_System.prototype.SetZzyGFBPipeSpace = function(value)
{
	this._ZzyGFBPipeSpace = value;
}

Game_System.prototype.GetZzyGFBPipeUpLimit = function()
{
	if(this._ZzyGFBPipeUpLimit === undefined)
	{this._ZzyGFBPipeUpLimit = Zzy.Param.GFBPipeUpLimit;}
	return this._ZzyGFBPipeUpLimit;
}

Game_System.prototype.SetZzyGFBPipeUpLimit = function(value)
{
	this._ZzyGFBPipeUpLimit = value;
}

Game_System.prototype.GetZzyGFBPipeDownLimit = function()
{
	if(this._ZzyGFBPipeDownLimit === undefined)
	{this._ZzyGFBPipeDownLimit = Zzy.Param.GFBPipeDownLimit;}
	return this._ZzyGFBPipeDownLimit;
}

Game_System.prototype.SetZzyGFBPipeDownLimit = function(value)
{
	this._ZzyGFBPipeDownLimit = value;
}

Game_System.prototype.GetZzyGFBNextLevel = function()
{
	if(this._ZzyGFBNextLevel === undefined)
	{this._ZzyGFBNextLevel = Zzy.Param.GFBNextLevel;}
	return this._ZzyGFBNextLevel;
}

Game_System.prototype.SetZzyGFBNextLevel = function(value)
{
	this._ZzyGFBNextLevel = value;
}

Game_System.prototype.GetZzyGCFBkHue = function()
{
	return 0;
}

Game_System.prototype.ZzyGFBSetBackGroundScrollSpeed = function(ID,SpeedStr)
{
	switch(ID)
	{
		case 1:this.SetZzyGFBBk1ScrollSpeed(SpeedStr);break;
		case 2:this.SetZzyGFBBk2ScrollSpeed(SpeedStr);break;
		case 3:this.SetZzyGFBBk3ScrollSpeed(SpeedStr);break;
	}
}

//==================================================================
//Game_Interpreter
//==================================================================

Zzy.GFB.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)//插件命令
{
	Zzy.GFB.Game_Interpreter_pluginCommand.call(this,command,args);

	if(command === 'ZzyGFB')
	{
		this.ZzyGFBCommand(args);
	}
	

}

Game_Interpreter.prototype.ZzyGFBCommand = function(args)
{
	var command = String(args[0]);
	
	switch(command)
	{
		case 'StartLevel':
		var cLevel = String(args[1]);
			Zzy.GFB.StartLevel(cLevel);
		break;	
		
		
		case 'BackGround':
		var ID = parseInt(args[1]);
		var speed = String(args[2]);
		Zzy.GFB.BackGround(ID,speed);
		
		//$gameSystem.ZzyGFBSetBackGroundScrollSpeed(ID,speed);
		break;
	
		case 'BackFloor':
		var speed = String(args[1]);
		Zzy.GFB.BackFloor(speed);
		
		//$gameSystem.SetZzyGFBBkFloorScrollSpeed(speed);
		break;
		
		case 'SetMode':
		var mode = String(args[1]);
		var enable = eval(String(args[2]));
		Zzy.GFB.SetMode(mode,enable);
		
		//this.ZzyGFBSetGameMode(mode,enable);
		break;
		
		case 'MaxLevel':
		var max = String(args[1]);
		Zzy.GFB.MaxLevel(max);
		
		//$gameSystem.SetZzyGFBMaxLevel(max);
		break;
		
		case 'PipeSpeed':
		var speedStr = String(args[1]);
		Zzy.GFB.PipeSpeed(speedStr);
		
		//$gameSystem.SetZzyGFBPipeSpeed(speedStr);
		break;
		
		case 'PipeScore':
		var scoreStr = String(args[1]);
		Zzy.GFB.PipeScore(scoreStr);
		
		//$gameSystem.SetZzyGFBPipeScore(scoreStr);
		break;
		
		case 'PipeHue':
		var hueStr = String(args[1]);
		Zzy.GFB.PipeHue(hueStr);
		
		//$gameSystem.SetZzyGFBPipeHue(hueStr);
		break;		

		case 'PipeAppear':
		var appearStr = String(args[1]);
		Zzy.GFB.PipeAppear(appearStr);
		
		//$gameSystem.SetZzyGFBPipeAppear(appearStr);
		break;	

		case 'PipeSpace':
		var spaceStr = String(args[1]);
		Zzy.GFB.PipeSpace(spaceStr);
		
		//$gameSystem.SetZzyGFBPipeSpace(spaceStr);
		break;
		
		case 'UpLimit':
		var dis = parseInt(args[1]);
		Zzy.GFB.UpLimit(dis);
		
		//$gameSystem.SetZzyGFBPipeUpLimit(dis);
		break;
		
		case 'DownLimit':
		var dis = parseInt(args[1]);
		Zzy.GFB.DownLimit(dis);
		
		//$gameSystem.SetZzyGFBPipeDownLimit(dis);
		break;
		
		case 'NextLevel':
		var levelStr = String(args[1]);
		Zzy.GFB.NextLevel(levelStr);
		
		//$gameSystem.SetZzyGFBNextLevel(levelStr);
		break;
		
		case 'SetUpMode':
		var modeStr = String(args[1]);
		Zzy.GFB.SetUpMode(modeStr);
		
		break;
	}
}





Game_Interpreter.prototype.ZzyGFBSetGameMode = function(mode,enable)//设置游戏模式
{
	switch(mode)
	{
		case 'Normal':
		$gameSystem.SetZzyGFBIsHaveNormalMode(enable);
		break;
		case 'Gliding':
		$gameSystem.SetZzyGFBIsHaveGlidingMode(enable);
		break;
		case 'Reverse':
		$gameSystem.SetZzyGFBIsHaveReverseMode(enable);
		break;
	}
}



//=======================================================================
//Sprite_ZzyGFBBase
//=======================================================================
function Sprite_ZzyGFBBase() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBBase.prototype = Object.create(Sprite_ZzyGCFBase.prototype);
Sprite_ZzyGFBBase.prototype.constructor = Sprite_ZzyGFBBase;

Sprite_ZzyGFBBase.prototype.initialize = function(x,y,fileName,hue) 
{
	Sprite_ZzyGCFBase.prototype.initialize.call(this,x,y,fileName,hue);
	
}

Sprite_ZzyGFBBase.prototype.loadBitmap = function(fileName,hue)//加载图片
{
	this.bitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath, fileName, hue, true);
}



//=========================================================================================
//Sprite_ZzyGFBTileBase
//=========================================================================================
function Sprite_ZzyGFBTileBase() 
{
    this.initialize.apply(this, arguments);
}


Sprite_ZzyGFBTileBase.prototype = Object.create(Sprite_ZzyGCFTileBase.prototype);
Sprite_ZzyGFBTileBase.prototype.constructor = Sprite_ZzyGFBTileBase;

Sprite_ZzyGFBTileBase.prototype.initialize = function(width,height,value,fileName,hue) 
{
	Sprite_ZzyGCFTileBase.prototype.initialize.call(this,width,height,value,fileName,hue);

}

Sprite_ZzyGFBTileBase.prototype.loadBitmap = function(fileName,hue)//位图
{
	this.bitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,fileName,hue,true);
}





//=========================================================================================
//Sprite_ZzyGFBText
//=========================================================================================

function Sprite_ZzyGFBText() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBText.prototype = Object.create(Sprite_ZzyGCFNumber.prototype);
Sprite_ZzyGFBText.prototype.constructor = Sprite_ZzyGFBText;

Sprite_ZzyGFBText.prototype.initialize = function(prefix,w,h) 
{
	var tw = w ? w : Graphics.boxWidth;
	var th = h ? h : Graphics.boxHeight;
	this.GFBPrefixTextArr = [];
	this.GFBPrefixTextArr[0] = prefix ? prefix : '';//前缀	

    Sprite_ZzyGCFNumber.prototype.initialize.call(this,tw,th,0);

	this.borderColor('rgba(68,51,0,1)');
	this.numberColor('#fffff0');
	this.borderWidth(6);		
	this.visible = false;
	
	this.isDelayAppear = false;//延迟出现
	this.delayAppear = 0;
	this.CdelayAppear = 0;
	this.visibleEnbale = false;
};


Sprite_ZzyGFBText.prototype.setGameModeText = function(gameMode)
{
	switch(gameMode)
	{
		case 1:
			this.setText(2,'经典模式');
		break;
		case 2:
			this.setText(2,'滑翔模式');
		break;
		case 3:
			this.setText(2,'颠倒模式');
		break;
	}
}



Sprite_ZzyGFBText.prototype.setDelayVisble = function(delay,isEnable)//延迟出现/消失
{
	this.delayAppear = delay;
	this.isDelayAppear = true;
	this.CdelayAppear = 0;
	this.visibleEnbale = isEnable;

}

Sprite_ZzyGFBText.prototype.update = function()
{
	Sprite_ZzyGCFNumber.prototype.update.call(this);
	this.updateDelayVisible();
}

Sprite_ZzyGFBText.prototype.updateDelayVisible = function()
{
	if(!this.isDelayAppear)return;

		if(this.CdelayAppear < this.delayAppear)
		{
			this.CdelayAppear++;
		}
		else
		{
			this.isDelayAppear = false;
			//出现/消失
			this.visible = this.visibleEnbale;
		}	
}



Sprite_ZzyGFBText.prototype.setText = function(line,text)
{
	this.GFBPrefixTextArr[line] = text;
	this.isRefresh = true;
}

Sprite_ZzyGFBText.prototype.addText = function(line,text)
{
	this.GFBPrefixTextArr[line] += text;
	this.isRefresh = true;
}
Sprite_ZzyGFBText.prototype.clearText = function(line,text)
{
	this.GFBPrefixTextArr[line] = '';
	this.isRefresh = true;
}

Sprite_ZzyGFBText.prototype.DefaultTextHeight = function()
{
	return this.bitmap.fontSize + this.bitmap.outlineWidth*2;
}


Sprite_ZzyGFBText.prototype.refresh = function()//这将会主动的去刷新
{
	this.bitmap.clear();
	
	for(var i=0;i<this.GFBPrefixTextArr.length;i++)//写入文字
	{
		if(!!this.GFBPrefixTextArr[i])
		{
			this.bitmap.drawText(this.GFBPrefixTextArr[i],
			0,
			this.DefaultTextHeight()*i,
			this.bWidth,this.bHeight,this.drawPos);
		}
		
	}
	
}

Sprite_ZzyGFBText.prototype.defaultFontSize = function()
{
	return 64;
}




//=========================================================================================
//Sprite_ZzyGFBNumber
//=========================================================================================

function Sprite_ZzyGFBNumber() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBNumber.prototype = Object.create(Sprite_ZzyGCFNumber.prototype);
Sprite_ZzyGFBNumber.prototype.constructor = Sprite_ZzyGFBNumber;

Sprite_ZzyGFBNumber.prototype.initialize = function(prefix,w,h) 
{
	var tw = w ? w : 256;
	var th = h ? h : 64;
	
	
    Sprite_ZzyGCFNumber.prototype.initialize.call(this,tw,th,0);

	this.GFBPrefixText = prefix ? prefix : '';//前缀

	this.borderColor('rgba(68,51,0,1)');
	this.numberColor('#fffff0');
	this.borderWidth(6);
	
	this.visible = false;
};


Sprite_ZzyGFBNumber.prototype.defaultFontSize = function()
{
	return 32;
}


Sprite_ZzyGFBNumber.prototype.refresh = function()//这将会主动的去刷新
{
	this.bitmap.clear();
	this.ExecuteDynNumber();//执行动态增粉

	if(this.GFBPrefixText != '')
	{
		this.bitmap.drawText(this.GFBPrefixText,10,0,this.bWidth,this.bHeight,'left');
		this.bitmap.drawText(this.showNumber,0,0,this.bWidth,this.bHeight,'center');
	}
	else
	{
		this.bitmap.drawText(this.showNumber,0,0,this.bWidth,this.bHeight,this.drawPos);
	}

	
}







//=========================================================================================
//Sprite_ZzyGFBBkBrid
//=========================================================================================
//背景小鸟

function Sprite_ZzyGFBBkBrid() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBBkBrid.prototype = Object.create(Sprite_ZzyGCFAnimaBase.prototype);
Sprite_ZzyGFBBkBrid.prototype.constructor = Sprite_ZzyGFBBkBrid;

Sprite_ZzyGFBBkBrid.prototype.initialize = function(speed)//速度选择
{
    Sprite_ZzyGCFAnimaBase.prototype.initialize.call(this,Graphics.boxWidth + 100,Graphics.boxHeight/2,Zzy.Param.GFBBkBridPic,0);
	//设置位置
	this.setAnimaMode(2);//设置为pingpang模式
	
	this.birdSpeed = 0;//速度
	this.originBridY = 0;//原位置
	this.Ctemp = 0;//临时下标
	
	
	this.temp1 = 0;//控制周期
	this.temp2 = 0;//控制位移范围
	
	this.ResetInfo(speed);
};

Sprite_ZzyGFBBkBrid.prototype.loadBitmap = function(fileName,hue)//位图
{
	this.bitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,fileName,hue,true);	
}


Sprite_ZzyGFBBkBrid.prototype.ResetInfo = function(speed)
{

	
	this.birdSpeed = speed;
	var half = this.bitmap.height / 2;
	this.x = Graphics.boxWidth + 100;	
	this.y = Zzy.GCF.RandomIntArea(half,Graphics.boxHeight / 2 - half);
	this.originBridY = this.y;
	this.visible = true;
	var randS = Math.min(Math.max(0.4,Math.random() * 1),0.8);
	this.setScale(randS,randS);
	
	this.Ctemp = 0;//临时下标
	this.temp1 = Math.PI / Zzy.GCF.RandomIntArea(40,80);//控制周期
	this.temp2 = Zzy.GCF.RandomIntArea(30,60) * this.scale.x;//控制位移范围
	
}

Sprite_ZzyGFBBkBrid.prototype.update = function()
{
	if(!this.visible)return;
	Sprite_ZzyGCFAnimaBase.prototype.update.call(this);
	if(Zzy.GFB.WindowPointer.isPauseDown)return;
	
	this.updateBkBrid();//更新移动信息
	
}

Sprite_ZzyGFBBkBrid.prototype.updateBkBrid = function()
{
	this.x -= this.birdSpeed;//向左移动
	if(this.x <= -100)
	{this.visible = false;}
	this.Ctemp++;

	this.y = this.originBridY + Math.cos(this.Ctemp * this.temp1) * this.temp2;//实现上下浮动的周期运算
	
}





//=========================================================================================
//Sprite_ZzyGFBPipe
//=========================================================================================

//水管
function Sprite_ZzyGFBPipe() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBPipe.prototype = Object.create(Sprite_ZzyGFBBase.prototype);
Sprite_ZzyGFBPipe.prototype.constructor = Sprite_ZzyGFBPipe;

Sprite_ZzyGFBPipe.prototype.initialize = function(hue)//模式选择
{
	Sprite_ZzyGFBBase.prototype.initialize.call(this,Graphics.boxWidth+100,Graphics.boxHeight/2,Zzy.Param.GFBPipePic,hue);
	this.anchor.x = 0.5;
	this.anchor.y = 0;
	
	this.pipeHue = hue;//色相
	this.isCanCount = false;//是否包含计数
	
	
	//开启碰撞
	this.isCanCollision = true;//碰撞检测
	this.AddCollisionObj(Zzy.GFB.WindowPointer.playerSpr);//添加碰撞对象-玩家
}

Sprite_ZzyGFBPipe.prototype.ResetInfo = function()
{
	this.x = Graphics.boxWidth+100;
	this.y = Graphics.boxHeight/2;
}




Sprite_ZzyGFBPipe.prototype.changePipeHue = function(hue)//切换色相
{
	if(this.pipeHue === hue)return;
	this.pipeHue = hue;
	//this.bitmap = ImageManager.loadPicture(Zzy.Param.GFBPipePic,hue);
	this.bitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,Zzy.Param.GFBPipePic,hue,true);	
}



Sprite_ZzyGFBPipe.prototype.update = function()
{
	Sprite_ZzyGFBBase.prototype.update.call(this);
	if(!this.isCanCount)return;
	if(!this.visible)return;
	//判断玩家是否经过
	if(!this.JudgPlayerExceed())return;
	
	if(this.isCanCount)
	{
		Zzy.GFB.WindowPointer.PassAPipe(this);//通过一个水管
		this.isCanCount = false;
	}
	
}
Sprite_ZzyGFBPipe.prototype.JudgPlayerExceed = function()
{
	return Zzy.GFB.WindowPointer.playerSpr.x > this.x;
}


Sprite_ZzyGFBPipe.prototype.OnCollision = function(obj)//碰撞接口
{
	//角色死亡
	Zzy.GFB.WindowPointer.OnPlayerCollision(this);//角色撞到了
	
}



Sprite_ZzyGFBPipe.prototype.setCanCount = function()//设置包含计数
{
	this.isCanCount = true;
	
}


Sprite_ZzyGFBPipe.prototype.setPipeDir = function(dir)
{
	//up down
	switch(dir)
	{
		case 'up':
		this.rotation = Math.PI;
		break;
		case 'down':
		this.rotation = 0;
		break;
	}	
}

Sprite_ZzyGFBPipe.prototype.setPipeMirror = function(isEnable)//设置为镜像
{
	if(isEnable)
	{
		this.setScale(-1,1);
	}
	else
	{
		this.setScale(1,1);
	}
}




//=========================================================================================
//Sprite_ZzyGFBPipeHead
//=========================================================================================

//水管头
function Sprite_ZzyGFBPipeHead() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBPipeHead.prototype = Object.create(Sprite_ZzyGFBBase.prototype);
Sprite_ZzyGFBPipeHead.prototype.constructor = Sprite_ZzyGFBPipeHead;

Sprite_ZzyGFBPipeHead.prototype.initialize = function(hue)//模式选择
{
	Sprite_ZzyGFBBase.prototype.initialize.call(this,Graphics.boxWidth+100,Graphics.boxHeight/2,Zzy.Param.GFBPipeHeadPic,hue);
	this.anchor.x = 0.5;
	this.anchor.y = 0;
	
	this.pipeHue = hue;//色相
	this.pipeObj = undefined;
	
}


Sprite_ZzyGFBPipeHead.prototype.ResetInfo = function()
{
	this.x = Graphics.boxWidth+100;
	this.y = Graphics.boxHeight/2;
}


Sprite_ZzyGFBPipeHead.prototype.changePipeHue = function(hue)//切换色相
{
	if(this.pipeHue === hue)return;
	
	this.pipeHue = hue;
	//this.bitmap = ImageManager.loadPicture(Zzy.Param.GFBPipeHeadPic,hue);
	this.bitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,Zzy.Param.GFBPipeHeadPic,hue,true);	
}



Sprite_ZzyGFBPipeHead.prototype.update = function()
{
	if(!this.pipeObj)return;
	
	this.x = this.pipeObj.x;
	this.y = this.pipeObj.y;
	this.rotation = this.pipeObj.rotation;	
	
	
	if(this.pipeObj.visible === false)
	{
		this.visible = false;
		this.unPinPipe();//摘除
	}
}


Sprite_ZzyGFBPipeHead.prototype.unPinPipe = function()
{
	this.pipeObj = undefined;
}


Sprite_ZzyGFBPipeHead.prototype.pinPipe = function(spr)
{
	this.pipeObj = spr;
	
	this.x = this.pipeObj.x;
	this.y = this.pipeObj.y;
	this.rotation = this.pipeObj.rotation;
}


Sprite_ZzyGFBPipeHead.prototype.setPipeMirror = function(isEnable)//设置为镜像
{
	if(isEnable)
	{
		this.setScale(-1,1);
	}
	else
	{
		this.setScale(1,1);
	}
}





//=========================================================================================
//Sprite_ZzyGFBPlayer
//=========================================================================================


function Sprite_ZzyGFBPlayer() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBPlayer.prototype = Object.create(Sprite_ZzyGCFAnimaBase.prototype);
Sprite_ZzyGFBPlayer.prototype.constructor = Sprite_ZzyGFBPlayer;

Sprite_ZzyGFBPlayer.prototype.initialize = function(fileName)//模式选择
{

    Sprite_ZzyGCFAnimaBase.prototype.initialize.call(this,-100,Graphics.boxHeight/2,fileName,0);
	//设置位置
	this.visible = false;
	this.appearancing = true;
	this.startFlappy = false;//开始移动
	this.playerDeath = false;//玩家死亡判断
	this.setAnimaMode(2);//设置为pingpang模式
	
	this.isCanCollision = true;//开启碰撞
	this.gTime = 0;//时长
	this.flyY = 0;
};

Sprite_ZzyGFBPlayer.prototype.loadBitmap = function(fileName,hue)//位图
{
	this.bitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,fileName,hue,true);	
}


Sprite_ZzyGFBPlayer.prototype.ResetInfo = function()
{
	this.rotation = 0;
	this.visible = false;
	this.appearancing = true;
	this.startFlappy = false;//开始移动
	this.playerDeath = false;//玩家死亡判断	
	this.setAnimaMode(2);//设置为pingpang模式	
	this.isCanCollision = true;//开启碰撞
	this.gTime = 0;//时长
	this.flyY = 0;
	this.x = Graphics.boxWidth+100;
	this.y = Graphics.boxHeight/2;
}



Sprite_ZzyGFBPlayer.prototype.Appearance = function()//出场
{
	this.appearancing = true;//出场中
	this.x = -100;
	this.y = Graphics.boxHeight / 2;
	this.MoveToOfSpeed(150,Graphics.boxHeight / 2,3);
	this.setMoveEndCallFunction(this.EndAppearance);
	this.visible = true;
	this.setAnimaPause(false);
}

Sprite_ZzyGFBPlayer.prototype.EndAppearance = function()//结束出场
{
	this.appearancing = false;
	
}

Sprite_ZzyGFBPlayer.prototype.IsCanControl = function()//可以控制
{
	if(this.appearancing)return false;
	
	return true;
}


Sprite_ZzyGFBPlayer.prototype.JumpFlight = function()
{
	//改变角度
	this.gTime = -20;//清除重力
	if(!this.startFlappy)//开始移动第一次跳跃
	{
		this.startFlappy = true;
		Zzy.GFB.WindowPointer.FirstJump();
	}
}



Sprite_ZzyGFBPlayer.prototype.update = function()
{
	Sprite_ZzyGCFAnimaBase.prototype.update.call(this);
	if(Zzy.GFB.WindowPointer.isPauseDown)return;

	if(!this.JudgStart())return;
	
	if(this.playerDeath)return;//玩家死亡不会进行以下判断


	this.updateCollisionTop();//碰撞到棚顶
	this.updateCollisionFloor();//碰撞到地面
	this.updateGravity();//更新重力
	this.updateBirdRotate();//更新角度
}

Sprite_ZzyGFBPlayer.prototype.JudgStart = function()
{
	if(!this.startFlappy)return false;
	return true;
}

Sprite_ZzyGFBPlayer.prototype.updateCollisionTop = function()//更新碰撞到顶部
{
	if(this.frameU > 0)return;
	
	//碰撞到棚顶,消除速度,也就是摔倒了
	
	switch(Zzy.GFB.WindowPointer.gameMode)
	{
		case 1:
			if(this.gTime<0)
			{this.gTime = 0;}		
		break;
		
		case 3:
			if(this.gTime > 10);
			{this.gTime -= 10;}
			this.y = this.frameHeight/2;

		break;
	}
	

}
Sprite_ZzyGFBPlayer.prototype.updateCollisionFloor = function()//碰撞到地面了
{
	//地面高度位置
	if(this.playerDeath)return;
	if(this.frameD < Zzy.GFB.WindowPointer.BkFloorSpr.y)return;
	//碰撞到了地面
	Zzy.GFB.WindowPointer.OnPlayerCollision(this);
}



Sprite_ZzyGFBPlayer.prototype.updateGravity = function()
{
	//游戏模式不同的方式

	switch(Zzy.GFB.WindowPointer.gameMode)
	{
		case 1:this.updateGravityMode1();break;
		case 2:this.updateGravityMode2();break;
		case 3:this.updateGravityMode3();break;
	
	}
	
}

Sprite_ZzyGFBPlayer.prototype.updateGravityMode1 = function()
{
	this.gTime++;
	var tempT = this.gTime / 60;
	
	var extraAcc = 120*Math.max(0,(1-Math.abs(this.gTime)/25));
	this.gAcceleration = (60 + extraAcc)*tempT*tempT;

	this.gAcceleration = Math.min(15,this.gAcceleration);
	if(this.gTime < 0)
	{this.y -= this.gAcceleration;}
	else
	{this.y += this.gAcceleration;}//更新重力	
}

Sprite_ZzyGFBPlayer.prototype.updateGravityMode2 = function()
{
	if(Zzy.GFB.WindowPointer.scene.isTouchMoving)//鼠标按住时
	{
		if(this.gTime < 0){this.gTime = 0;}
		this.gTime++;
		var tempT = this.gTime / 60;	
		//var extraAcc = 120*Math.max(0,(1-Math.abs(this.gTime)/25));

		this.gAcceleration = (10)*tempT*tempT;	
		
		this.gAcceleration = Math.min(Math.max(0,6-this.gTime*0.01),this.gAcceleration);	
		//判断鸟和鼠标Y的方向
		
		var inTouch = Zzy.GFB.WindowPointer.scene.InTouchY;
		if(this.flyY <= 0)return;
	  
		if(this.flyY < inTouch - 6)
		{
			this.flyY += this.gAcceleration;
			
		}
		else if(this.flyY > inTouch + 6)
		{
			this.flyY -= this.gAcceleration;
		}
		
		this.y = this.flyY + this.gTime*0.2;
		
	}
	else
	{
		this.gTime = 0;
		this.y++;
		this.flyY = this.y;
	}
	
}

Sprite_ZzyGFBPlayer.prototype.updateGravityMode3 = function()
{
	this.gTime++;
	var tempT = this.gTime / 60;
	
	var extraAcc = 120*Math.max(0,(1-Math.abs(this.gTime)/25));
	this.gAcceleration = (60 + extraAcc)*tempT*tempT;

	this.gAcceleration = Math.min(15,this.gAcceleration);
	if(this.gTime < 0)
	{this.y += this.gAcceleration;}
	else
	{this.y -= this.gAcceleration;}//更新重力		
	
}




Sprite_ZzyGFBPlayer.prototype.updateBirdRotate = function()
{
	//更新小鸟角度,角度跟随加速度发生改变,0~15,
	
	
	if(this.gTime < 0)
	{
		this.rotation = -(Math.PI / 60 * this.gAcceleration);
	}
	else
	{
		this.rotation = Math.PI / 30 * this.gAcceleration;
	}
	
	
}

Sprite_ZzyGFBPlayer.prototype.IsDeath = function()
{
	return this.playerDeath;//玩家死亡
}




//=========================================================================================
//Sprite_ZzyGFBButton
//=========================================================================================


function Sprite_ZzyGFBButton() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBButton.prototype = Object.create(Sprite_ZzyGFBBase.prototype);
Sprite_ZzyGFBButton.prototype.constructor = Sprite_ZzyGFBButton;

Sprite_ZzyGFBButton.prototype.initialize = function(x,y,fileName,hue,commandId) 
{
    Sprite_ZzyGFBBase.prototype.initialize.call(this,x,y,fileName,hue);
	//激活Button
	this.isCanButton = true;//激活按钮
	//this.buttonInScopeBitmap = Zzy.GCF.LoadPicture(fileName + '1');
	//this.buttonDownBitmap = Zzy.GCF.LoadPicture(fileName + '2');
	this.buttonInScopeBitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,fileName + '1',undefined,true);
	this.buttonDownBitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,fileName + '2',undefined,true);
	
	this.commandId = commandId;
	//ID 1确认

};

Sprite_ZzyGFBButton.prototype.OnClick = function()//按下按钮
{
	if(!this.visible)return;//按钮隐形不做任何响应
	if(this.isBusy())return;//繁忙时不可操作


	if(Zzy.GFB.WindowPointer.gameStage === 1)
	{
		switch(this.commandId)
		{
			case 1://1代表退出

			break;
			
		}
	}
	else if(Zzy.GFB.WindowPointer.gameStage === 2)
	{
		switch(this.commandId)
		{
			case 1://1代表退出
			Zzy.GFB.WindowPointer.UI.OnExitButton();//按下退出
			Zzy.GFB.PlaySE(1);//退出音效
			break;
		}
	}
	else if(Zzy.GFB.WindowPointer.gameStage === 3)
	{
		switch(this.commandId)
		{
			case 1:

			break;

		}		
	}

}







//=========================================================================================
//Sprite_ZzyGFBSelectMode
//=========================================================================================


function Sprite_ZzyGFBSelectMode() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBSelectMode.prototype = Object.create(Sprite_ZzyGFBBase.prototype);
Sprite_ZzyGFBSelectMode.prototype.constructor = Sprite_ZzyGFBSelectMode;

Sprite_ZzyGFBSelectMode.prototype.initialize = function(x,y,fileName,modeId)//模式选择
{

    Sprite_ZzyGFBBase.prototype.initialize.call(this,x,y,fileName,0);
	//设置位置

	this.isCanButton = true;//激活按钮

	this.modeId = modeId;
	this.isNotOpen = false;//这会导致点中不触发反应,同时黑化
	this.isExecuteSelect = true;
	this.isCancelSelect = false;
	
	this.isResponseDelay = false;
	this.responseDelay = 0;
};

Sprite_ZzyGFBSelectMode.prototype.setOpenSelect = function(enable)
{
	this.isNotOpen = !enable;
	if(this.isNotOpen)
	{
		this.setColorTone([0, 0, 0, 255]);//灰化
	}
	else
	{
		this.setColorTone([0, 0, 0, 0]);//正常化
	}
}



Sprite_ZzyGFBSelectMode.prototype.updateButton = function()//按钮按下的消息效果
{
	if(this.isNotOpen)return;
	if(!this.visible)return;
	//检测鼠标是否在Button中
	Sprite_ZzyGFBBase.prototype.updateButton.call(this);
	
	var pt = {x:Zzy.GCF.MoveX,y:Zzy.GCF.MoveY};
	
	var rect = {left:this.frameL,right:this.frameR,up:this.frameU,down:this.frameD};	

	if(Zzy.GCF.PtInRect(pt,rect))
	{this.ExecuteSelect();}
	else
	{this.CancelSelect();}
	
}


Sprite_ZzyGFBSelectMode.prototype.ExecuteButton = function(code)
{
	switch(code)
	{
		case 1://代表在范围内按下了鼠标
			if(!this.isPressButton)
			{
				this.isPressButton = true;
			}
		break;
		case 2://代表在矩形范围内,但没有点击
			if(!this.isInButton)
			{
				this.isInButton = true;
				Zzy.GFB.PlaySE(2);//选择音效
			}
		break;
		case 3:
			if(this.isInButton && !this.isPressButton)
			{
				this.isInButton = false;
			}		
		break;
		case 4://这里是点中了按钮
			this.isInButton = false;
			this.isPressButton = false;		
			this.OnClick();
		break;
		case 5://这里是没有点中按钮
			this.isInButton = false;
			this.isPressButton = false;		
		break;
	}
	
}



Sprite_ZzyGFBSelectMode.prototype.ExecuteSelect = function()//执行选择
{
	if(this.isExecuteSelect)
	{
		this.isExecuteSelect = false;
		this.isCancelSelect = true;
		this.ScaleToOfSpeed(1.2,1.2,0.04);
	}
}

Sprite_ZzyGFBSelectMode.prototype.CancelSelect = function()//取消选择
{
	if(this.isCancelSelect)
	{
		this.isExecuteSelect = true;
		this.isCancelSelect = false;
		this.ScaleToOfSpeed(1,1,0.04);		
	}
}


Sprite_ZzyGFBSelectMode.prototype.OnClick = function()
{
	if(!this.visible)return;
	if(this.isResponseDelay)return;

	Zzy.GFB.WindowPointer.ConfirmSelectMode(this.modeId);//确认选择游戏模式
}

Sprite_ZzyGFBSelectMode.prototype.update = function()
{
	Sprite_ZzyGFBBase.prototype.update.call(this);
	if(!this.visible)return;
	
	
	this.updateResponseDelay();
}

Sprite_ZzyGFBSelectMode.prototype.updateResponseDelay = function()
{
	if(!this.isResponseDelay)return;
	if(this.responseDelay > 0)
	{
		this.responseDelay --;
	}
	else
	{
		this.isResponseDelay = false;//关闭
		this.responseDelay  = 0;
	}
	
}


Sprite_ZzyGFBSelectMode.prototype.setResponseDelay = function(delay)
{
	this.isResponseDelay = true;
	this.responseDelay = delay;
}




//======================================================================
//Sprite_ZzyGFBPause
//======================================================================

function Sprite_ZzyGFBPause() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGFBPause.prototype = Object.create(Sprite_ZzyGFBBase.prototype);
Sprite_ZzyGFBPause.prototype.constructor = Sprite_ZzyGFBPause;

Sprite_ZzyGFBPause.prototype.initialize = function(x,y,fileName,hue) 
{
    Sprite_ZzyGFBBase.prototype.initialize.call(this,x,y,fileName,hue);
	
	this.ignorePause = true;//激活按钮
	this.visible = false;
	
	this.isPause = Zzy.GCF.GameGlobal().isPausing;
	this.executPausing = false;//执行暂停中
};


Sprite_ZzyGFBPause.prototype.update = function()
{
	Sprite_ZzyGFBBase.prototype.update.call(this);


}

Sprite_ZzyGFBPause.prototype.startPause = function(isPause)
{
	if(isPause)
	{
		this.opacity = 0;
		this.visible = true;
		this.OpacityToOfTime(255,30);	
		this.executPausing = true;
	}
	else
	{
		this.opacity = 255;
		this.visible = true;
		this.OpacityToOfTime(0,30);
		this.setOpacityEndDisvisible();//移动结束后隐藏
		this.executPausing = true;
	}
}


Sprite_ZzyGFBPause.prototype.isExecutPausing = function()
{
	return this.executPausing;
}






//==========================================================================
//Sprite_ZzyGFBBk
//==========================================================================

function Sprite_ZzyGFBBk() 
{
    this.initialize.apply(this, arguments);
}


Sprite_ZzyGFBBk.prototype = Object.create(Sprite_ZzyGFBTileBase.prototype);
Sprite_ZzyGFBBk.prototype.constructor = Sprite_ZzyGFBBk;

Sprite_ZzyGFBBk.prototype.initialize = function(height,fileName)
{
	Sprite_ZzyGFBTileBase.prototype.initialize.call(this,Graphics.boxWidth,height,100,fileName,0);

	this.setPostion(0,Graphics.boxHeight-height);
	this.setOffsetX(0);
}

Sprite_ZzyGFBBk.prototype.update = function()
{
	//判断暂停
	if(Zzy.GFB.WindowPointer.isPauseDown)return;//暂停不会更新
	Sprite_ZzyGFBTileBase.prototype.update.call(this);
	
}



//==========================================================================
//Sprite_ZzyGFBFloor
//==========================================================================

function Sprite_ZzyGFBFloor() 
{
    this.initialize.apply(this, arguments);
}


Sprite_ZzyGFBFloor.prototype = Object.create(Sprite_ZzyGFBBk.prototype);
Sprite_ZzyGFBFloor.prototype.constructor = Sprite_ZzyGFBFloor;

Sprite_ZzyGFBFloor.prototype.initialize = function(height,fileName)
{
	Sprite_ZzyGFBBk.prototype.initialize.call(this,height,fileName);
}




//=========================================================================================
//Scene_ZzyGCFFlappyBird
//=========================================================================================
function Scene_ZzyGCFFlappyBird() 
{
    this.initialize.apply(this, arguments);
}

Scene_ZzyGCFFlappyBird.prototype = Object.create(Scene_ZzyGCFGame.prototype);
Scene_ZzyGCFFlappyBird.prototype.constructor = Scene_ZzyGCFFlappyBird;

Scene_ZzyGCFFlappyBird.prototype.initialize = function() 
{
    Scene_ZzyGCFGame.prototype.initialize.call(this);

};

Scene_ZzyGCFFlappyBird.prototype.terminate = function()//退出时 
{
	Scene_ZzyGCFGame.prototype.terminate.call(this);
	
	this.GFBClearData();//清理数据
	
	//存储分数和时间到额外变量
	this.SettlementExGame();
};


Scene_ZzyGCFFlappyBird.prototype.SettlementExGame = function()
{
	var globalInfo = $gameSystem.getZzyGCFGameGlobal()
	var tempCommonId = 0;
	var tempScript = undefined;
	switch(globalInfo.result)
	{
		case 'win'://胜利时
		tempCommonId = Zzy.Param.GFBWinCommon;
		tempScript = Zzy.Param.GFBWinScript;
		break;
		case 'fail'://失败时
		tempCommonId = Zzy.Param.GFBFailCommon;
		tempScript = Zzy.Param.GFBFailScript;
		break;
		case 'other1'://特殊情况1
		tempCommonId = Zzy.Param.GFBOther1Common;
		tempScript = Zzy.Param.GFBOther1Script;
		break;
		case 'other2'://特殊情况2
		tempCommonId = Zzy.Param.GFBOther2Common;
		tempScript = Zzy.Param.GFBOther2Script;
		break;
	}
	//修改结算信息
	Zzy.GCF.tempCommonId = tempCommonId === 0 ? Zzy.GCF.tempCommonId : tempCommonId;
	Zzy.GCF.tempScript = tempScript === undefined ? Zzy.GCF.tempScript : tempScript;
	if(Zzy.Param.GFBSaveScoreVariable){$gameVariables.setValue(Zzy.Param.GFBSaveScoreVariable,globalInfo.score);}
	if(Zzy.Param.GFBSaveTimeVariable){$gameVariables.setValue(Zzy.Param.GFBSaveTimeVariable,globalInfo.time);}
}



Scene_ZzyGCFFlappyBird.prototype.GFBClearData = function()
{
	Zzy.GFB.WindowPointer = undefined;//窗口指针
	Zzy.GFB.Window1Pointer = undefined;
	Zzy.GFB.Window2Pointer = undefined;
	Zzy.GFB.Window3Pointer = undefined;
	
	//清理缓存池
}

Scene_ZzyGCFFlappyBird.prototype.AddLayer1 = function()//层1,
{
	Scene_ZzyGCFGame.prototype.AddLayer1.call(this);
	this._Window1 = new Window_ZzyGFBLayerWindow();
	this.addChild(this._Window1);
	Zzy.GFB.Window1Pointer = this._Window1;
}


Scene_ZzyGCFFlappyBird.prototype.AddLayer2 = function()//层2显示
{
	Scene_ZzyGCFGame.prototype.AddLayer2.call(this);
	this._Window2 = new Window_ZzyGFBLayerWindow();
	this.addChild(this._Window2);
	Zzy.GFB.Window2Pointer = this._Window2;
}


Scene_ZzyGCFFlappyBird.prototype.AddLayer3 = function()//层3显示,
{
	Scene_ZzyGCFGame.prototype.AddLayer3.call(this);
	this._Window3 = new Window_ZzyGFBLayerWindow();
	this.addChild(this._Window3);
	Zzy.GFB.Window3Pointer = this._Window3;
}

Scene_ZzyGCFFlappyBird.prototype.AddLayer4 = function()//层4显示,
{
	Scene_ZzyGCFGame.prototype.AddLayer4.call(this);
	this._Window4 = new Window_ZzyGFBLayerWindow();
	this.addChild(this._Window4);
	Zzy.GFB.Window4Pointer = this._Window4;
}





Scene_ZzyGCFFlappyBird.prototype.requestBkBitmap = function()//申请背景图
{
	//满足条件存在图片名称同时游戏关卡名称正确
	if(!!Zzy.Param.GFBBackGroundPic)
	{
		var picName = Zzy.Param.GFBBackGroundPic;
		var hue = $gameSystem.GetZzyGCFBkHue();
		//this._backgroundSprite.bitmap = ImageManager.loadPicture(picName,hue); 
		this._backgroundSprite.bitmap = ImageManager.loadBitmap(Zzy.Param.GFBPicPath,picName,hue,true);	
		this._backgroundSprite.move(0,0,Graphics.boxWidth,Graphics.boxHeight);		
	}
	else
	{
		Scene_ZzyGCFGame.prototype.requestBkBitmap.call(this);
	}
	
}


Scene_ZzyGCFFlappyBird.prototype.PlayBkBGM = function()//播放音乐
{
	//修改播放声音
	if(Zzy.Param.GFBBkBGMName)
	{AudioManager.replayBgm(Zzy.Param.GFBBkBGM);}	
	else
	{Scene_ZzyGCFGame.prototype.PlayBkBGM.call(this);}
}










//=========================================================================================
//Window_ZzyGFBLayerWindow
//=========================================================================================

function Window_ZzyGFBLayerWindow() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGFBLayerWindow.prototype = Object.create(Window_ZzyGCFLayerBase.prototype);
Window_ZzyGFBLayerWindow.prototype.constructor = Window_ZzyGFBLayerWindow;

Window_ZzyGFBLayerWindow.prototype.initialize = function()
{
    Window_ZzyGCFLayerBase.prototype.initialize.call(this);
	

};




//=========================================================================================
//Window_ZzyGCFFlappyBird
//=========================================================================================

function Window_ZzyGCFFlappyBird() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGCFFlappyBird.prototype = Object.create(Window_ZzyGCFBase.prototype);
Window_ZzyGCFFlappyBird.prototype.constructor = Window_ZzyGCFFlappyBird;


Window_ZzyGCFFlappyBird.prototype.initialize = function() 
{
	//初始化
    Window_ZzyGCFBase.prototype.initialize.call(this);

	//获得游戏数据
	// this.gameData = $gameSystem.getZzyGCFGameData();
	// this.gameGlobal = $gameSystem.getZzyGCFGameGlobal();
	// this.scene = SceneManager._scene;//获取全部的数值
	// this.UI							//UI窗口

	//Zzy.GFB.ReloadGFBBitmapArr();//加载位图缓存
	Zzy.GFB.WindowPointer = this;//赋予窗口指针

	this.gameStage = 0;//游戏阶段
	this.installSpr = true;//这个值是在确保所有位图全部加载成功后,在所有窗口也确认加载时,在进行位图安装
	this.centerX = Graphics.boxWidth / 2;
	this.centerY = Graphics.boxHeight / 2;
	
	this.InitialAllData();//初始化数据
	this.CreateAllSprite();//加载位图

	this.startUpGame();//启动游戏
};



Window_ZzyGCFFlappyBird.prototype.InitialAllData = function()
{
	//游戏模式
	this.gameMode = 0;//可以进行的游戏模式

	//背景滚动速度
	this.Bk1SprSpeed = 0;
	this.Bk2SprSpeed = 0;
	this.Bk3SprSpeed = 0;
	this.BkFloorSpeed = 0;
	
		//背景滚动速度
	this.Bk1SprSpeedArr = [];
	this.Bk2SprSpeedArr = [];
	this.Bk3SprSpeedArr = [];
	this.BkFloorSpeedArr = [];
	
	this.isReadyPlayerAppear = false;//是否玩家出现
	this.startFlappy = false;//第一次按下跳跃,开始游戏
	
	this.pipeSprArr = [];//水管对象缓存
	this.pipeHSprArr = [];//水管头对象缓存
	this.pipeGroupArr = [];//屏幕中水管组
	
	this.maxLevel = 0;//关卡最高等级
	this.level = 0;//目前等级
	this.pipeSpeed = 0;//目前增加速度
	this.pipeScore = 0;//目前增加分数
	this.pipeHue = 0;//目前增加色相
	this.pipeAppear = 0;//目前出现的帧数
	this.CpipeAppear = 0;//刷出的帧数计数
	this.pipeSpace = 0;//间距
	this.nextLevelCount = 0;//下一关需求
	
	this.count = 0;//通过管子的数量
	this.pipeUpLimit = 0;//极限距离
	this.pipeDownLimit = 0;//极限距离
	
	this.pipeSpeedArr = [];//速度
	this.pipeScoreArr = [];//分数
	this.pipeHueArr = [];//色相
	this.pipeAppearArr = [];//帧数
	this.pipeSpaceArr = [];//间距
	this.nextLevelArr = [];//下一关等级
	
	this.isCanCreatePipe = false;//水管创造器标志
	
	this.isCanCreateBkBrid = false;//背景小鸟创造器
	this.BkBridSprArr = [];//缓存数组
	this.BkBridTimeArr = [];//时间
	this.BkBridTime = 0;//刷出时间
	this.CBkBridTime = 0;//计数
	this.BkBridSpeedArr = [];//小鸟随机速度数组
	
	//单次最高信息,用于返回游戏的信息临时存储
	this.SingleHighScore = 0;
	this.SingleHighTime = 0;
	this.SingleHighCount = 0;
}

Window_ZzyGCFFlappyBird.prototype.startUpGame = function()
{
	this.gameStage = 1;
	this.MakeGameRuleData();
}

Window_ZzyGCFFlappyBird.prototype.PassAPipe = function(pipeObj)//通过一个水管
{
	this.AddPassScore();//加分
	this.AddPassCount();//加次数
	Zzy.GFB.PlaySE(4);//通过音效	
	
	
	//判断是否到达下一个级别
	if(this.count < this.nextLevelCount)return;
	if(this.level >= this.maxLevel)return;
	this.ArriveNextLevel();
	
	Zzy.GFB.PlaySE(5);//通过音效	
}


Window_ZzyGCFFlappyBird.prototype.AddPassScore = function()//添加分数
{
	this.gameGlobal.score += this.pipeScore;
}

Window_ZzyGCFFlappyBird.prototype.AddPassCount = function()//添加次数
{
	this.count++;
}

Window_ZzyGCFFlappyBird.prototype.OnPlayerCollision = function(obj)
{
	this.PlayerDeathInfo();//玩家死亡,游戏结算
	Zzy.GFB.PlaySE(6);
}


Window_ZzyGCFFlappyBird.prototype.ExitGameProcess = function()//退出游戏过程
{
	
	this.gameGlobal.time = this.SingleHighTime;
	this.gameGlobal.score = this.SingleHighScore;
	this.gameData[0] = this.SingleHighCount;
	this.gameGlobal.result = 'win';
	this.ExitGame();
}

Window_ZzyGCFFlappyBird.prototype.ExitGame = function()
{
	Zzy.GCF.exitGame(this.gameGlobal.result);
}





Window_ZzyGCFFlappyBird.prototype.PlayerDeathInfo = function()
{
	//玩家挂了
	this.playerSpr.playerDeath = true;//玩家死亡
	
	//所有物体停止卷动
	this.Bk1Spr.setOffsetX(0);
	this.Bk2Spr.setOffsetX(0);
	this.Bk3Spr.setOffsetX(0);
	this.BkFloorSpr.setOffsetX(0);
	
	for(var i=0;i<this.pipeSprArr.length;i++)
	{
		if(this.pipeSprArr[i])
		{
			this.pipeSprArr[i].stopAlling();//停止所有的移动
			this.pipeSprArr[i].moveEndDisvisible = false;
		}
	}
	this.isCanCreatePipe = false;//关闭水管创造器
	
	
	//玩家向下坠落:
	this.playerSpr.MoveToOfSpeed(this.playerSpr.x,this.BkFloorSpr.y-this.playerSpr.bitmap.height/2,10);
	this.playerSpr.RotateToOfSpeed(90,0,true,5);
	this.playerSpr.setAnimaPause(true);//暂停动画	
	
	
	//呼叫结算,分数赋值,过程:保存最高消耗时间,保存最高分数,保存最高操作次数
	
	
	this.SingleHighScore = Math.max(this.gameGlobal.score,this.SingleHighScore);
	this.SingleHighTime = Math.max(this.gameGlobal.time,this.SingleHighTime);
	this.SingleHighCount = Math.max(this.count,this.SingleHighCount);	
	
	this.Stage2ToStage3();//到达第三类型
	this.UI.CallSettlementInterface();//结算界面
}

Window_ZzyGCFFlappyBird.prototype.SettlementInfo = function()//结算数据
{
	switch(this.gameMode)//设置历史最高分
	{
		case 1:
			$gameSystem.SetZzyGFBNormalHighCount(Math.max(this.count,$gameSystem.GetZzyGFBNormalHighCount()));
		break;
		
		case 2:
			$gameSystem.SetZzyGFBGlidingHighCount(Math.max(this.count,$gameSystem.GetZzyGFBGlidingHighCount()));
		break;
		
		case 3:
			$gameSystem.SetZzyGFBReverseHighCount(Math.max(this.count,$gameSystem.GetZzyGFBReverseHighCount()));
		break;
	}	


}



Window_ZzyGCFFlappyBird.prototype.MakeGameRuleData = function()//制作关卡数据
{
	this.maxLevel = this.EvalTranslate($gameSystem.GetZzyGFBMaxLevel());//最高等级

	this.Bk1SprSpeedArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBBk1ScrollSpeed());
	this.Bk2SprSpeedArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBBk2ScrollSpeed());
	this.Bk3SprSpeedArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBBk3ScrollSpeed());
	this.BkFloorSpeedArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBBkFloorScrollSpeed());	
	
	this.pipeSpeedArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBPipeSpeed());
	this.pipeScoreArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBPipeScore());
	this.pipeHueArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBPipeHue());
	this.pipeAppearArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBPipeAppear());
	this.pipeSpaceArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBPipeSpace());
	this.nextLevelArr = Zzy.GFB.StrToNumberArr($gameSystem.GetZzyGFBNextLevel());

	this.pipeUpLimit = $gameSystem.GetZzyGFBPipeUpLimit();//极限距离
	this.pipeDownLimit = $gameSystem.GetZzyGFBPipeDownLimit();//极限距离
	
	//不满足所需长度,不足最后一位
	
	Zzy.GFB.SupplementArrLen(this.Bk1SprSpeedArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.Bk2SprSpeedArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.Bk3SprSpeedArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.BkFloorSpeedArr,this.maxLevel);//补充长度	
	Zzy.GFB.SupplementArrLen(this.pipeSpeedArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.pipeScoreArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.pipeHueArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.pipeAppearArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.pipeSpaceArr,this.maxLevel);//补充长度
	Zzy.GFB.SupplementArrLen(this.nextLevelArr,this.maxLevel);//补充长度
	
	
	this.isCanCreateBkBrid = Zzy.Param.GFBIsHaveBkBrid;//背景小鸟创造器
	this.BkBridTimeArr = Zzy.Param.GFBBkBridTime.split('-');
	for(var i=0;i<this.BkBridTimeArr.length;i++)//转换
	{this.BkBridTimeArr[i] = parseInt(this.BkBridTimeArr[i]);}
	this.BkBridTime = Zzy.GCF.RandomIntArea(this.BkBridTimeArr[0],this.BkBridTimeArr[1]);
	
	this.BkBridSpeedArr = Zzy.Param.GFBBkBridSpeed.split('-');
	for(var i=0;i<this.BkBridSpeedArr.length;i++)//转换
	{this.BkBridSpeedArr[i] = parseInt(this.BkBridSpeedArr[i]);}
}



Window_ZzyGCFFlappyBird.prototype.ArriveNextLevel = function()//到达下一个等级
{
	this.level++;//目前等级
	this.level = Math.min(this.level,this.maxLevel);
	this.Bk1SprSpeed = this.Bk1SprSpeedArr[this.level-1];
	this.Bk2SprSpeed = this.Bk2SprSpeedArr[this.level-1];
	this.Bk3SprSpeed = this.Bk3SprSpeedArr[this.level-1];
	this.BkFloorSpeed = this.BkFloorSpeedArr[this.level-1];
	this.pipeSpeed = this.pipeSpeedArr[this.level-1];
	this.pipeScore = this.pipeScoreArr[this.level-1];
	this.pipeHue = this.pipeHueArr[this.level-1];
	this.pipeAppear = this.pipeAppearArr[this.level-1];
	this.pipeSpace = this.pipeSpaceArr[this.level-1];	
	this.nextLevelCount = this.nextLevelArr[this.level-1];
	
	this.Bk1Spr.setOffsetX(this.Bk1SprSpeed,60);
	this.Bk2Spr.setOffsetX(this.Bk2SprSpeed,60);
	this.Bk3Spr.setOffsetX(this.Bk3SprSpeed,60);
	this.BkFloorSpr.setOffsetX(this.BkFloorSpeed,60);
}

Window_ZzyGCFFlappyBird.prototype.FirstLevel = function()
{

	this.level = parseInt(this.EvalTranslate($gameSystem.GetZzyGFBStartLevel())) - 1;

	
	this.ArriveNextLevel();
}


Window_ZzyGCFFlappyBird.prototype.getScore = function()
{
	return Zzy.GFB.WindowPointer.gameGlobal.score;
}
Window_ZzyGCFFlappyBird.prototype.getTime = function()
{
	return Math.floor(Zzy.GFB.WindowPointer.gameGlobal.time / 60);
}
Window_ZzyGCFFlappyBird.prototype.getLevel = function()
{
	return Zzy.GFB.WindowPointer.level;
}
Window_ZzyGCFFlappyBird.prototype.getCount = function()
{
	return Zzy.GFB.WindowPointer.count;
}



Window_ZzyGCFFlappyBird.prototype.FirstJump = function()//首次跳跃
{
	this.startFlappy = true;
	this.UI.ShowInfoText();//出现字体
	this.FirstLevel();//1级难度
	this.startPipeCreater();//启动水管创造器
}




Window_ZzyGCFFlappyBird.prototype.startPipeCreater = function()
{
	this.isCanCreatePipe = true;//水管可以创造
}




Window_ZzyGCFFlappyBird.prototype.PushInPipeGroupArr = function(group)//压入组中
{
	var len = this.pipeGroupArr.length;
	for(var i=0;i<len;i++)
	{
		if(!this.pipeGroupArr[i])
		{
			this.pipeGroupArr[i] = group;
			return;
		}
	}
	this.pipeGroupArr.push(group);
	
}



Window_ZzyGCFFlappyBird.prototype.SpawnAPipeGroup = function()//创造一个水管组这是随机出的障碍
{
	var sprPipeUp = this.RequestPipeSpr();//请求对象
	var sprPipeHUp = this.RequestPipeHSpr();
	var sprPipeDown = this.RequestPipeSpr();//请求对象
	var sprPipeHDown = this.RequestPipeHSpr();
	
	sprPipeUp.setPipeDir('up');
	sprPipeUp.setPipeMirror(true);
	sprPipeHUp.setPipeMirror(true);
	
	sprPipeHUp.pinPipe(sprPipeUp);//钉在目标上
	sprPipeHDown.pinPipe(sprPipeDown);//钉在目标上
	
	var pipeGroup = {pipeU:sprPipeUp,pipeHU:sprPipeHUp,pipeD:sprPipeDown,pipeHD:sprPipeHDown};
	this.PushInPipeGroupArr(pipeGroup);//添加到组合中
	return pipeGroup;
}

Window_ZzyGCFFlappyBird.prototype.RequestPipeSpr = function()
{
	var len = this.pipeSprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.pipeSprArr[i] && !this.pipeSprArr[i].visible)
		{
			var spr2 = this.pipeSprArr[i];
			spr2.visible = true;
			spr2.changePipeHue(this.pipeHue);
			spr2.ResetInfo();
			return spr2;
		}
	}
	
	var spr = new Sprite_ZzyGFBPipe(this.pipeHue);
	Zzy.GFB.Window2Pointer.addChild(spr);
	this.pipeSprArr.push(spr);
	return spr;
}

Window_ZzyGCFFlappyBird.prototype.RequestPipeHSpr = function()
{
	var len = this.pipeHSprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.pipeHSprArr[i] && !this.pipeHSprArr[i].visible)
		{
			var spr2 = this.pipeHSprArr[i];
			spr2.visible = true;
			spr2.changePipeHue(this.pipeHue);
			spr2.ResetInfo();
			return spr2;
		}
	}
	
	var spr = new Sprite_ZzyGFBPipeHead(this.pipeHue);
	Zzy.GFB.Window2Pointer.addChild(spr);
	this.pipeHSprArr.push(spr);
	return spr;
}


Window_ZzyGCFFlappyBird.prototype.CreateAllSprite = function()
{
	this.CreateBackSprite();//背景和地面

}


Window_ZzyGCFFlappyBird.prototype.CreateBackSprite = function()
{
	this.Bk1Spr = new Sprite_ZzyGFBBk(230,Zzy.Param.GFBBackGround1Pic);
	this.Bk2Spr = new Sprite_ZzyGFBBk(172,Zzy.Param.GFBBackGround2Pic);
	this.Bk3Spr = new Sprite_ZzyGFBBk(123,Zzy.Param.GFBBackGround3Pic);
	this.BkFloorSpr = new Sprite_ZzyGFBFloor(96,Zzy.Param.GFBBackFloorPic);//地面
	
	
}


Window_ZzyGCFFlappyBird.prototype.ConfirmSelectMode = function(ID)
{
	this.gameMode = ID;//模式
	this.UI.HideSelectSpr();//隐藏选择精灵
	this.RestartPlayingGame();//开始游戏
}


Window_ZzyGCFFlappyBird.prototype.AutoConfirmSelectMode = function()//自动选择游戏模式
{
	var gameModeID = $gameSystem.GetZzyGFBSetUpMode();
	
	switch(gameModeID)
	{
		case 0:break;
		case 1:case 2:case 3://普通,滑翔,颠倒模式
		this.ConfirmSelectMode(gameModeID);
	}
}






Window_ZzyGCFFlappyBird.prototype.RestartPlayingGame = function()//开始游戏
{
	this.isReadyPlayerAppear = true;//玩家将会出现
	this.startFlappy = false;
	
	//清理分数
	this.gameGlobal.score = 0;
	this.gameGlobal.time = 0;
	this.count = 0;
}



Window_ZzyGCFFlappyBird.prototype.update = function()
{
	Window_ZzyGCFBase.prototype.update.call(this);
	if(this.isPauseDown)return;//暂停不会更新

	this.updateData();//更新数据
	this.drawData();//绘制数据
}


Window_ZzyGCFFlappyBird.prototype.updateData = function()
{
	switch(this.gameStage)//不同阶段刷新情况
	{
		case 1:this.Stage1();break;//游戏开始时
		case 2:this.Stage2();break;//游戏运行中
		case 3:this.Stage3();break;
		case 4:this.Stage4();break;//暂停时
	}
}

Window_ZzyGCFFlappyBird.prototype.drawData = function()
{
	
	
	
}

Window_ZzyGCFFlappyBird.prototype.IsReadyWindowPointer = function()
{
	if(Zzy.GFB.WindowPointer && 
	Zzy.GFB.WindowPointer.UI &&
	Zzy.GFB.Window1Pointer &&
	Zzy.GFB.Window2Pointer &&
	Zzy.GFB.Window3Pointer &&
	Zzy.GFB.Window4Pointer)
	{return true;}
	return false;
	
}





Window_ZzyGCFFlappyBird.prototype.AddChildOfBk = function()//添加背景
{
	Zzy.GFB.Window1Pointer.addChild(this.Bk1Spr);
	Zzy.GFB.Window1Pointer.addChild(this.Bk2Spr);
	Zzy.GFB.Window1Pointer.addChild(this.Bk3Spr);
	Zzy.GFB.Window4Pointer.addChild(this.BkFloorSpr);
}





Window_ZzyGCFFlappyBird.prototype.updatePlayerInScreen = function()
{
	if(!this.isReadyPlayerAppear)return false;
	//角色入场
	this.playerSpr.Appearance();//入场动画
	
	this.isReadyPlayerAppear = false;
}


Window_ZzyGCFFlappyBird.prototype.RequestPlayerSpr = function()
{
	if(this.playerSpr && !this.playerSpr.visible)
	{
		this.playerSpr.ResetInfo();
		this.playerSpr.visible = true;
	}
	else
	{
		//申请角色
		this.playerSpr = new Sprite_ZzyGFBPlayer(Zzy.Param.GFBPlayerPic);//申请玩家
		
		Zzy.GFB.Window4Pointer.addChild(this.playerSpr);//添加玩家
	}
	
	
}

Window_ZzyGCFFlappyBird.prototype.updatePipeCreater = function()//更新水管创造器
{
	if(!this.isCanCreatePipe)return;
	
	
	//可以出现水管
	if(this.CpipeAppear < this.pipeAppear)
	{
		this.CpipeAppear++;
	}
	else
	{
		this.CpipeAppear -= this.pipeAppear;
		
		//刷出一次水管组合
		var group = this.SpawnAPipeGroup();
		
		this.InitGroupInfo(group);
		this.RandomPipePos(group);
		this.StartPipeMove(group);//开始移动	
	}
}


Window_ZzyGCFFlappyBird.prototype.InitGroupInfo = function(group)
{
	group.pipeD.setCanCount();//设置计分

}



Window_ZzyGCFFlappyBird.prototype.StartPipeMove = function(group)
{
	group.pipeD.MoveToOfSpeed(-100,group.pipeD.y,this.pipeSpeed);
	group.pipeU.MoveToOfSpeed(-100,group.pipeU.y,this.pipeSpeed);
	
	group.pipeD.setMoveEndDisvisible();
	group.pipeU.setMoveEndDisvisible();//移动后隐藏
	
}





Window_ZzyGCFFlappyBird.prototype.RandomPipePos = function(group)//随机水管之间的位置
{
	//确认随机区间
	
	var up = this.pipeUpLimit+this.pipeSpace;//极限范围+间距
	var down = Graphics.boxHeight - this.pipeDownLimit - this.BkFloorSpr.bitmap.height;//极限范围+地面高度

	var tempY = Zzy.GCF.RandomIntArea(up,down,[1,2,1]);//返回出现的位置
	
	group.pipeD.y = tempY;
	group.pipeU.y = tempY - this.pipeSpace;//间距


}

Window_ZzyGCFFlappyBird.prototype.updateGroupArr = function()//刷新显示情况
{
	
	for(var i=0;i<this.pipeGroupArr.length;i++)
	{
		if(this.pipeGroupArr[i])
		{
			if(!this.pipeGroupArr[i].pipeD.visible || !this.pipeGroupArr[i].pipeU.visible)
			{
				this.pipeGroupArr[i] = undefined;//删除	
			}
		}
	}
	
}


Window_ZzyGCFFlappyBird.prototype.updateBkBridCreater = function()//背景小鸟创造器
{
	if(!this.isCanCreateBkBrid)return;
	if(this.CBkBridTime < this.BkBridTime)
	{
		this.CBkBridTime++;
	}
	else
	{
		this.CBkBridTime = 0;
		this.BkBridTime = Zzy.GCF.RandomIntArea(this.BkBridTimeArr[0],this.BkBridTimeArr[1]);
		this.RequestBkBrid();
	}
	
}


Window_ZzyGCFFlappyBird.prototype.RequestBkBrid = function()//申请背景小鸟
{
	this.BkBridSprArr = [];//缓存数组
	var randSpeed = Zzy.GCF.RandomIntArea(this.BkBridSpeedArr[0],this.BkBridSpeedArr[1]);
	
	var len = this.BkBridSprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.BkBridSprArr[i] && !this.BkBridSprArr[i].visible)
		{
			var spr2 = this.BkBridSprArr[i];
			spr2.visible = true;
			spr2.ResetInfo(randSpeed);
			return spr2;
		}
	}
	
	var spr = new Sprite_ZzyGFBBkBrid(randSpeed);
	
	Zzy.GFB.Window2Pointer.addChildToBack(spr);//添加小鸟
	this.BkBridSprArr.push(spr);
	return spr;
}

Window_ZzyGCFFlappyBird.prototype.Stage1 = function()
{
	if(this.installSpr)//加载图片检测
	{
		if(this.IsReadyWindowPointer())
		{
			
			this.installSpr = false;
			//安装图片
			this.AddChildOfBk();			
			this.Stage1ToStage2();//进入第二阶段
		}
		
	}
}


Window_ZzyGCFFlappyBird.prototype.Stage1ToStage2 = function()
{
		
	this.RequestPlayerSpr();//请求角色
	
	this.gameStage = 2;//进入第二阶段
	
	this.AutoConfirmSelectMode();//此处将会自动判断进入主界面还是特定模式界面
}



Window_ZzyGCFFlappyBird.prototype.Stage2 = function()
{

	//更新角色入场
	this.updatePlayerInScreen();//更新角色入场
	this.updatePipeCreater();//更新水管创造器
	this.updateGroupArr();//刷新显示情况
	this.updateBkBridCreater();//刷新背景小鸟创造器
	this.updateGameTime();//刷新游戏时间



	if(this.isSpecial1())//特殊情况结束
	{
		this.gameGlobal.result = 'other1';
		this.Stage2ToStage3();//跳到游戏结束界面
	}
	else if(this.isSpecial2())
	{
		this.gameGlobal.result = 'other2';
		this.Stage2ToStage3();//跳到游戏结束界面
	}	
	
}


Window_ZzyGCFFlappyBird.prototype.updateGameTime = function()//刷新游戏时间
{
	if(!this.isCanCreatePipe)return;
	this.gameGlobal.time++;
}



Window_ZzyGCFFlappyBird.prototype.Stage2ToStage3 = function()
{
	this.SettlementInfo();
	this.gameStage = 3;

}


Window_ZzyGCFFlappyBird.prototype.Stage3 = function()
{
	//小鸟继续刷
	this.updateBkBridCreater();//刷新背景小鸟创造器
	
}



Window_ZzyGCFFlappyBird.prototype.Stage4 = function()//暂停时
{
	
	
}


Window_ZzyGCFFlappyBird.prototype.isCanReturnSelect = function()//可以返回游戏模式选择
{
	if(!this.UI.GameOverText.visible)return false;//结束文字必须出现

	return true;
}

Window_ZzyGCFFlappyBird.prototype.ReturnSelectInterface = function()//选择模式界面
{
	this.ClearReturnData();//清理返回数据
	this.ClearAllSprCache();//清理缓存
	this.MakeGameRuleData();//加载游戏数据
	this.UI.ShowSelectSpr();//显示选择图片
	this.UI.HideGamingInfoTextSpr();//隐藏
	this.UI.GameOverText.visible = false;//隐藏

	this.Stage1ToStage2();//返回第二模式
}


Window_ZzyGCFFlappyBird.prototype.ClearAllSprCache = function()//清理缓存
{
	//将水管,小鸟图像隐藏
	this.playerSpr.visible = false;	
	var len = this.pipeSprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.pipeSprArr[i] && this.pipeSprArr[i].visible)
		{
			this.pipeSprArr[i].visible = false;//隐藏
		}
	}

	len = this.pipeHSprArr.length;
	for(var i=0;i<len;i++)
	{
		if(this.pipeHSprArr[i] && this.pipeHSprArr[i].visible)
		{
			this.pipeHSprArr[i].visible = false;//隐藏
		}
	}	
	
}


Window_ZzyGCFFlappyBird.prototype.ClearReturnData = function()
{
	this.gameMode = 0;//可以进行的游戏模式

	//背景滚动速度
	this.Bk1SprSpeed = 0;
	this.Bk2SprSpeed = 0;
	this.Bk3SprSpeed = 0;
	this.BkFloorSpeed = 0;
	
		//背景滚动速度
	this.Bk1SprSpeedArr = [];
	this.Bk2SprSpeedArr = [];
	this.Bk3SprSpeedArr = [];
	this.BkFloorSpeedArr = [];	
	
	//玩家
	this.isReadyPlayerAppear = false;//是否玩家出现
	this.startFlappy = false;//第一次按下跳跃,开始游戏	
	
	this.pipeGroupArr = [];//屏幕中水管组
	
	this.maxLevel = 0;//关卡最高等级
	this.level = 0;//目前等级

	this.pipeSpeed = 0;//目前增加速度
	this.pipeScore = 0;//目前增加分数
	this.pipeHue = 0;//目前增加色相
	this.pipeAppear = 0;//目前出现的帧数
	this.CpipeAppear = 0;//刷出的帧数计数
	this.pipeSpace = 0;//间距
	this.nextLevelCount = 0;//下一关需求	
	

	this.pipeUpLimit = 0;//极限距离
	this.pipeDownLimit = 0;//极限距离

	this.pipeSpeedArr = [];//速度
	this.pipeScoreArr = [];//分数
	this.pipeHueArr = [];//色相
	this.pipeAppearArr = [];//帧数
	this.pipeSpaceArr = [];//间距
	this.nextLevelArr = [];//下一关等级
	
	this.isCanCreatePipe = false;//水管创造器标志
	
}




Window_ZzyGCFFlappyBird.prototype.isSpecial1 = function()
{
	return Zzy.Param.GFBOtherEnd1Script();
}

Window_ZzyGCFFlappyBird.prototype.isSpecial2 = function()
{
	return Zzy.Param.GFBOtherEnd2Script();
}




Window_ZzyGCFFlappyBird.prototype.OnTouch = function()//移动中
{
	//是否可以键盘或者鼠标操控
	if(!this.IsOperation())return;
	Window_ZzyGCFBase.prototype.OnTouch.call(this);

	// this.scene.OnTouchX    this.scene.OnTouchY
	switch(this.gameStage)//成功的一次点击
	{
		case 2:
			//确认点击的位置坐标点
			this.playerSpr.JumpFlight();//跳跃
			Zzy.GFB.PlaySE(3);//飞翔
		break;
		
		case 3:
			if(this.isCanReturnSelect())
			{
				if(this.IsGameOverShouldExit())
				{
					this.ExitGameProcess();//退出游戏
				}
				else
				{
					this.ReturnSelectInterface();//返回选择模式类型
				}
			}
		break;
	}

}

Window_ZzyGCFFlappyBird.prototype.IsGameOverShouldExit = function()//判断是否因该直接退出
{
	var gameModeID = $gameSystem.GetZzyGFBSetUpMode();
	switch(gameModeID)
	{
		case 0:return false;
		case 1:case 2:case 3://普通,滑翔,颠倒模式
		return true;
	}
	return false;
}


Window_ZzyGCFFlappyBird.prototype.IsOperation = function()//可以操作
{
	//不处于等待操控和按下暂停时
	if(this.isPauseDown)return false;
	if(!this.playerSpr.IsCanControl())return false;
	//if(this.playerSpr.IsDeath())return false;//玩家死亡
	
	return true;
}


Window_ZzyGCFFlappyBird.prototype.OnKeyP = function()
{
	var isPause = Window_ZzyGCFBase.prototype.OnKeyP.call(this);
	this.isPauseDown = isPause;
	this.UI.setPause(isPause);//执行暂停图片
}


Window_ZzyGCFFlappyBird.prototype.ExecutePase = function()//暂停
{
	this.gameStage = 4;
}

Window_ZzyGCFFlappyBird.prototype.ExitGame = function()
{
	
	Zzy.GCF.exitGame(this.gameGlobal.result);
}


Window_ZzyGCFFlappyBird.prototype.EvalTranslate = function(formula)//转换
{
	var variables = $gameVariables._data;//全局变量
	var v = $gameVariables._data;
	var V = v;
	var switchs = $gameSwitches._data;//全局开关
	var s = $gameSwitches._data;
	var S = s;	
	var level = this.level;	
	var maxlevel = this.maxLevel;
	
	return eval(formula);
}





//=======================================================================
//Window_ZzyGCFFlappyBirdUI
//=======================================================================

function Window_ZzyGCFFlappyBirdUI() 
{
    this.initialize.apply(this, arguments);
}

Window_ZzyGCFFlappyBirdUI.prototype = Object.create(Window_ZzyGCFBaseUI.prototype);
Window_ZzyGCFFlappyBirdUI.prototype.constructor = Window_ZzyGCFFlappyBirdUI;

Window_ZzyGCFFlappyBirdUI.prototype.initialize = function() 
{
	//初始化
    var width = this.Width();
    var height = this.Height();
	
    Window_ZzyGCFBaseUI.prototype.initialize.call(this, 0, 0, width, height);

	this.centerX = Graphics.boxWidth / 2;
	this.centerY = Graphics.boxHeight / 2;
	
	this.CreateAllSprite();
};	


Window_ZzyGCFFlappyBirdUI.prototype.OnExitButton = function()
{
	switch(Zzy.GFB.WindowPointer.gameStage)
	{
		case 2:
			//返回到主界面
			
		break;
		
		case 4:

		break;
	}
}



Window_ZzyGCFFlappyBirdUI.prototype.HideSelectSpr = function()
{
	this.NormalSelectSpr.visible = false;
	this.GlidingSelectSpr.visible = false;
	this.ReverseSelectSpr.visible = false;	
	this.NormalHighSpr.visible = false;	
	this.GlidingHighSpr.visible = false;	
	this.ReverseHighSpr.visible = false;
}

Window_ZzyGCFFlappyBirdUI.prototype.ShowSelectSpr = function()
{
	this.NormalSelectSpr.visible = true;
	this.GlidingSelectSpr.visible = true;
	this.ReverseSelectSpr.visible = true;	
	this.NormalHighSpr.visible = true;	
	this.GlidingHighSpr.visible = true;
	this.ReverseHighSpr.visible = true;
	
	
	//做出延迟
	
	this.NormalSelectSpr.setResponseDelay(30);
	this.GlidingSelectSpr.setResponseDelay(30);
	this.ReverseSelectSpr.setResponseDelay(30);
}





Window_ZzyGCFFlappyBirdUI.prototype.OnExitButton = function()//按下退出
{
	switch(Zzy.GFB.WindowPointer.gameMode)
	{
		case 0:
			//判定退出游戏
			Zzy.GFB.WindowPointer.ExitGameProcess();//退出游戏
		break;
		case 1:case 2:case 3:
		default:
			if(Zzy.GFB.WindowPointer.playerSpr.startFlappy)
			{
				Zzy.GFB.WindowPointer.PlayerDeathInfo();//判定死亡
			}
	}

}



Window_ZzyGCFFlappyBirdUI.prototype.OnCancelButton = function()//取消退出
{

}



Window_ZzyGCFFlappyBirdUI.prototype.BackGameRunning = function()//返回游戏界面
{
	Zzy.GFB.WindowPointer.gameStage = 2;//回到游戏运行状态
}


Window_ZzyGCFFlappyBirdUI.prototype.CreateAllSprite = function()
{
	this.CreateSelectSprite();//选择模式
	this.CreateInfoAndText();//创造文字和数字
	this.CreateAllButton();//创造按钮
	this.CreateSettlement();//结算
	this.CreatePauseSpr();//暂停
}




Window_ZzyGCFFlappyBirdUI.prototype.CreateSettlement = function()
{
	this.GameOverText = new Sprite_ZzyGFBText('游戏结束!');//游戏结束文字提示
	this.GameOverText.setText(3,'按任意键回到界面');
	this.GameOverText.y = Graphics.boxHeight/4;
	this.addChild(this.GameOverText);
}


Window_ZzyGCFFlappyBirdUI.prototype.CreateAllButton = function()
{
	var ex = eval(Zzy.Param.GFBExitButtonX);
	var ey = eval(Zzy.Param.GFBExitButtonY);

	this.ExitButtonSpr = new Sprite_ZzyGFBButton(ex,ey,Zzy.Param.GFBExitButtonPic,0,1);//1代表退出
	
	this.addChild(this.ExitButtonSpr);
}




Window_ZzyGCFFlappyBirdUI.prototype.HideGamingInfoTextSpr = function()
{
	this.ScoreNumberSpr.visible = false;
	this.TimeNumberSpr.visible = false;
	this.LevelNumberSpr.visible = false;
	this.CountNumberSpr.visible = false;

}

Window_ZzyGCFFlappyBirdUI.prototype.ShowGamingInfoTextSpr = function()
{
	this.ScoreNumberSpr.visible = true;
	this.TimeNumberSpr.visible = true;
	this.LevelNumberSpr.visible = true;
	this.CountNumberSpr.visible = true;
}





Window_ZzyGCFFlappyBirdUI.prototype.CreateInfoAndText = function()
{
	

	
	var halfCenterX = this.centerX / 2;
	var offSetX = 64;	
	var offX = 180;
	var offY = 32;	
	
	//分数,时间,等级,次数
	this.ScoreNumberSpr = new Sprite_ZzyGFBNumber(Zzy.Param.GFBSelectSpr1T);
	this.ScoreNumberSpr.x = eval(Zzy.Param.GFBSelectSpr1X);
	this.ScoreNumberSpr.y = eval(Zzy.Param.GFBSelectSpr1Y);
	

	this.TimeNumberSpr = new Sprite_ZzyGFBNumber(Zzy.Param.GFBSelectSpr2T);	
	this.TimeNumberSpr.x = eval(Zzy.Param.GFBSelectSpr2X);
	this.TimeNumberSpr.y = eval(Zzy.Param.GFBSelectSpr2Y);
	
	
	
	this.LevelNumberSpr = new Sprite_ZzyGFBNumber(Zzy.Param.GFBSelectSpr3T);
	this.LevelNumberSpr.x = eval(Zzy.Param.GFBSelectSpr3X);
	this.LevelNumberSpr.y = eval(Zzy.Param.GFBSelectSpr3Y);
	

	
	this.CountNumberSpr = new Sprite_ZzyGFBNumber();
	this.CountNumberSpr.x = eval(Zzy.Param.GFBCountNumberX);
	this.CountNumberSpr.y = eval(Zzy.Param.GFBCountNumberY);



	
	this.NormalHighSpr = new Sprite_ZzyGFBNumber('记录:',200);
	this.NormalHighSpr.x = this.NormalSelectSpr.x+offX;
	this.NormalHighSpr.y = this.NormalSelectSpr.y+offY;
	this.NormalHighSpr.setFontSize(20);
	
	this.GlidingHighSpr = new Sprite_ZzyGFBNumber('记录:',200);
	this.GlidingHighSpr.x = this.GlidingSelectSpr.x+offX;
	this.GlidingHighSpr.y = this.GlidingSelectSpr.y+offY;	
	this.GlidingHighSpr.setFontSize(20);
	
	this.ReverseHighSpr = new Sprite_ZzyGFBNumber('记录:',200);
	this.ReverseHighSpr.x = this.ReverseSelectSpr.x+offX;
	this.ReverseHighSpr.y = this.ReverseSelectSpr.y+offY;	
	this.ReverseHighSpr.setFontSize(20);
	
	
	
	
	this.NormalHighSpr.visible = true;
	this.GlidingHighSpr.visible = true;
	this.ReverseHighSpr.visible = true;
	

	//添加对象
	this.addChild(this.ScoreNumberSpr);
	this.addChild(this.TimeNumberSpr);
	this.addChild(this.LevelNumberSpr);
	this.addChild(this.CountNumberSpr);
	this.addChild(this.NormalHighSpr);
	this.addChild(this.GlidingHighSpr);
	this.addChild(this.ReverseHighSpr);
	
	
	//全部绑定
	this.ScoreNumberSpr.setBindNumberFunction(Zzy.GFB.WindowPointer.getScore);	
	this.TimeNumberSpr.setBindNumberFunction(Zzy.GFB.WindowPointer.getTime);
	this.LevelNumberSpr.setBindNumberFunction(Zzy.GFB.WindowPointer.getLevel);
	this.CountNumberSpr.setBindNumberFunction(Zzy.GFB.WindowPointer.getCount);
	
	this.NormalHighSpr.setBindNumberFunction(this.GetZzyGFBNormalHighCount);
	this.GlidingHighSpr.setBindNumberFunction(this.GetZzyGFBGlidingHighCount);
	this.ReverseHighSpr.setBindNumberFunction(this.GetZzyGFBReverseHighCount);
	
}


Window_ZzyGCFFlappyBirdUI.prototype.CallSettlementInterface = function()
{
	
	this.GameOverText.setGameModeText(Zzy.GFB.WindowPointer.gameMode);
	this.GameOverText.setDelayVisble(60,true);//延迟60秒出现

}


Window_ZzyGCFFlappyBirdUI.prototype.ShowInfoText = function()//显示信息
{
	this.ScoreNumberSpr.visible = true;
	this.TimeNumberSpr.visible = true;
	this.LevelNumberSpr.visible = true;
	this.CountNumberSpr.visible = true;
}






Window_ZzyGCFFlappyBirdUI.prototype.CreateSelectSprite = function()
{
	
	
	
	
	var tempY = Graphics.boxHeight / 4;
	this.NormalSelectSpr = new Sprite_ZzyGFBSelectMode(eval(Zzy.Param.GFBSelectPic1X),eval(Zzy.Param.GFBSelectPic1Y),Zzy.Param.GFBFBNormalModePic,1);
	
	this.GlidingSelectSpr = new Sprite_ZzyGFBSelectMode(eval(Zzy.Param.GFBSelectPic2X),eval(Zzy.Param.GFBSelectPic2Y),Zzy.Param.GFBFBGlidingModePic,2);
	
	this.ReverseSelectSpr = new Sprite_ZzyGFBSelectMode(eval(Zzy.Param.GFBSelectPic3X),eval(Zzy.Param.GFBSelectPic3Y),Zzy.Param.GFBFBReverseModePic,3);
	
	//asd
	
	this.NormalSelectSpr.setOpenSelect($gameSystem.GetZzyGFBIsHaveNormalMode());
	this.GlidingSelectSpr.setOpenSelect($gameSystem.GetZzyGFBIsHaveGlidingMode());
	this.ReverseSelectSpr.setOpenSelect($gameSystem.GetZzyGFBIsHaveReverseMode());
	
	this.addChild(this.NormalSelectSpr);
	this.addChild(this.GlidingSelectSpr);
	this.addChild(this.ReverseSelectSpr);	


}


Window_ZzyGCFFlappyBirdUI.prototype.GetZzyGFBNormalHighCount = function()
{
	return $gameSystem.GetZzyGFBNormalHighCount();
}

Window_ZzyGCFFlappyBirdUI.prototype.GetZzyGFBGlidingHighCount = function()
{
	return $gameSystem.GetZzyGFBGlidingHighCount();
}
Window_ZzyGCFFlappyBirdUI.prototype.GetZzyGFBReverseHighCount = function()
{
	return $gameSystem.GetZzyGFBReverseHighCount();
}






Window_ZzyGCFFlappyBirdUI.prototype.CreatePauseSpr = function()//创建暂停
{
	this.PauseSpr = new Sprite_ZzyGFBPause(this.centerX,this.centerY,Zzy.Param.GFBPausePic);
	
	this.addChild(this.PauseSpr);
}




Window_ZzyGCFFlappyBirdUI.prototype.OpenResultInterface = function()//召唤结算界面
{
	switch(this.gameGlobal.result)
	{
		case 'win':

			this.OpenWinInterface();//游戏胜利
		break;
			
		case 'fail':

			this.OpenFailInterface();//游戏失败
		break;
		default:

			this.OpenWinInterface();//游戏胜利
	}

	
}



Window_ZzyGCFFlappyBirdUI.prototype.OpenWinInterface = function()//胜利界面
{

}



Window_ZzyGCFFlappyBirdUI.prototype.OpenFailInterface = function()//失败界面
{

}


Window_ZzyGCFFlappyBirdUI.prototype.setPause = function(isPause)//执行暂停
{
	if(isPause)
	{
		this.PauseSpr.visible = true;
	}
	else
	{
		this.PauseSpr.visible = false;
	}
	
}

//------------------------------Zzy.GFB.Function--------------------------------


Zzy.GFB.StrToNumberArr = function(str)
{
	var strArr = str.split(',');
	var len = strArr.length;
	var numArr = [];
	for(var i=0;i<len;i++)
	{
		numArr[i] = Number(strArr[i]);
	}
	return numArr;
}


Zzy.GFB.SupplementArrLen = function(numArr,len)
{
	if(numArr.length >= len)return;
	
	var value = numArr[numArr.length-1];
	
	for(var i=numArr.length;i<len;i++)
	{numArr[i] = value;}
}


Zzy.GFB.PlaySE = function(soundID)//播放声音
{
	var se = Zzy.Param.GFBAllSE[soundID];
	
	if(se && se.name)
	{
		AudioManager.playSe(se);
	}
	
}


//------------------------------Zzy.GFB.Function--------------------------------

Zzy.GFB.BackGround = function(ID,speed)
{
	$gameSystem.ZzyGFBSetBackGroundScrollSpeed(ID,speed);
}

Zzy.GFB.BackFloor = function(speed)
{
	$gameSystem.SetZzyGFBBkFloorScrollSpeed(speed);
}

Zzy.GFB.SetMode = function(mode,enable)
{
	this.ZzyGFBSetGameMode(mode,enable);
}

Zzy.GFB.MaxLevel = function(max)
{
	$gameSystem.SetZzyGFBMaxLevel(max);
}

Zzy.GFB.PipeSpeed = function(speedStr)
{
	$gameSystem.SetZzyGFBPipeSpeed(speedStr);
}

Zzy.GFB.PipeScore = function(scoreStr)
{
	$gameSystem.SetZzyGFBPipeScore(scoreStr);
}

Zzy.GFB.PipeHue = function(hueStr)
{
	$gameSystem.SetZzyGFBPipeHue(hueStr);
}

Zzy.GFB.PipeAppear = function(appearStr)
{
	$gameSystem.SetZzyGFBPipeAppear(appearStr);
}
	
Zzy.GFB.PipeSpace = function(spaceStr)
{
	$gameSystem.SetZzyGFBPipeSpace(spaceStr);
}

Zzy.GFB.UpLimit = function(dis)
{
	$gameSystem.SetZzyGFBPipeUpLimit(dis);
}

Zzy.GFB.DownLimit = function(dis)
{
	$gameSystem.SetZzyGFBPipeDownLimit(dis);
}

Zzy.GFB.NextLevel = function(levelStr)
{
	$gameSystem.SetZzyGFBNextLevel(levelStr);
}

Zzy.GFB.SetUpMode = function(modeStr)
{
	var modeID = Zzy.GFB.SetUpModeToID(modeStr);
	$gameSystem.SetZzyGFBSetUpMode(modeID);
}

Zzy.GFB.StartLevel = function(value)
{
	$gameSystem.SetZzyGFBStartLevel(value);
}

