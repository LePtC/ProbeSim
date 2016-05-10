
更新日志
======

###2016.05.08

在 [w3schools](http://www.w3schools.com/games/default.asp) 学习 Javascript 游戏开发，发现可以看懂，于是想开发一个类似 [Duskers](http://search.bilibili.com/all?keyword=duskers) 的游戏作为练习。游戏属于解谜类型，操作方式类似命令行（我大概只能做到组合键…），控制若干个 Probe 探索未知的地图，思考如何探测并杀死敌人，搜集模块使 Probe 升级新功能等等。


###2016.05.10.v1

游戏以 [w3schools 最后这个](http://www.w3schools.com/games/game_movement.asp) 为模版开始开发。首先是 Probe 和墙的碰撞问题，常试用速度反向来解决，但发现这样的话会有反向按键就能穿墙的 bug…

考虑了正方形的旋转会增加 Probe 的碰撞体积。加入了 relax 机制，在 Probe 蹭墙的过程中角度会被动调正，以后玩家通过较窄的门时的体验会更好。




