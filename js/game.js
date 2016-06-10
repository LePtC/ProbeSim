
var vx = 0; // 视野原点, 左右留作显示信息
var vy = 0;
var stagew = 600; // 舞台宽度
var stageh = 420;
var fullw = 800; // 地图总宽度
var fullh = 800;
var wd = 10; // 墙宽
var iwd = 80; // 每行网格数

// 将字母翻译为键码
// var A=65,B=66,C=67,D=68,E=69,F=70,G=71,H=72,I=73,J=74,K=75,L=76,M=77,N=78,O=79,P=80,Q=81,R=82,S=83,T=84,U=85,V=86,W=87,X=88,Y=89,Z=90;
// var n = new Array(48,49,50,51,52,53,54,55,56,57); // 0~9
// var f = new Array(112,113,114,115,116,117,118,119,120,121,122,123); // f1~f12

var Wall = new Array(); // 墙像素 10^2, 网格 80*80, 总像素 800*800
var map = new Array(
  2,2,2,2,2,2,2,2,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  2,0,0,0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,2,0,0,0,0,0,2,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,1,0,1,0,1,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,1,0,0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,1,1,0,1,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
);

var WallType = new Array("white","green","#0094FF"); // 0 地板 1 墙 2 母舰墙

var Probe1;

var FoeType = new Array("#fff","#222","red","green"); // 1 Shooter 2 Creeper 3 Hamper
var FoeSpeed = new Array(0,0.6,1.55,1.65);
var FoeList =  new Array(); // 记录敌人本体
// var FoeNull;
var BuList = new Array(); // 记录子弹对象
var FdropImg = new Array("img/0.png","img/ModBull4.png","img/ModTrap.png","img/ModHeal.png"); // 敌人死亡掉落 -1 子弹 -2 陷阱 -3 治疗

var ModImg = new Array("img/0.png","img/ModCirclit.png","img/ModLifesen.png","img/ModHacker.png","img/ModShield.png");
// 静态插件 1 环形照明 2 生命探测 3 黑客系统 4 护盾 9 母舰芯片
var BulImg = new Array("img/0.png","img/ModBull.png","img/ModBull2.png","img/ModBull3.png","img/ModBull4.png"); // 子弹数
var ModNull; // 我需要一个空对象
var ModCirclit = new Array();
var ModList = new Array(); // 除 Circlit 以外的 mod 本体


var litmax = new Array(200,200,300,350,400,450); // 最远光照半径
var lifmax =  new Array(0,150,200,250,300,350); // 生命探测半宽
var hurt = new Array(20,10,6,3,2,1,0); // 护盾减少伤害

var SDprobemove;
var SDshoot;
var SDcreeper;
var SDexplode;



function startGame() {

  for (n in map) { Wall[n] = new WallCom(wd,n) }

  ModNull = new ModCom(wd+2, 0, -20, -20);
  // 母舰光,干脆用吃不到的 LitMod 代替吧
  ModCirclit[0] = new ModCom(wd+2, 1, 42, 90);
  ModCirclit[1] = new ModCom(wd+2, 1, 622, 64);
  ModCirclit[2] = new ModCom(wd+2, 1, 320, 322);
  ModCirclit[3] = new ModCom(wd+2, 1, 622, 550);
  ModCirclit[4] = new ModCom(wd+2, 1, 324, 46);
  ModList[0] = new ModCom(wd+2, 2, 172, 32); // ModLifesen1
  ModList[1] = new ModCom(wd+2, 2, 214, 30); // ModLifesen2
  ModList[2] = new ModCom(wd+2, 2, 470, 234); // ModLifesen3
  ModList[3] = new ModCom(wd+2, 3, 674, 572); // ModHacker
  ModList[4] = new ModCom(wd+2, 4, 62, 60); // ModShield
  ModList[5] = new ModCom(wd+2, 4, 670, 62); // ModShield
  ModList[6] = new ModCom(wd+2, 4, 302, 300); // ModShield
  ModList[6] = new ModCom(wd+2, -1, 202, 130); // ModBull

  for (n in ModCirclit) {ModCirclit[n].updatelit()}

  Probe1 = new ProbeCom(15, "#C59D0D", 30, 30);
  Probe1.ang = Math.PI / 2;
  Probe1.Info = new InfoCom(Probe1, 16, 200);

  // FoeNull = new ModCom(1, 0, -20, -20);
  FoeList[0] = new FoeCom(6, 1, 500,  30, 0); // FoeShoot1
  FoeList[1] = new FoeCom(6, 1, 500, 100, 1); // FoeShoot2
  FoeList[2] = new FoeCom(7, 2, 500, 500, 2); // FoeCreep
  FoeList[3] = new FoeCom(5, 3, 310, 300, 3); // FoeHampe1
  FoeList[4] = new FoeCom(5, 3, 320, 300, 4); // FoeHampe2
  FoeList[5] = new FoeCom(5, 3, 310, 310, 5); // FoeHampe3
  FoeList[6] = new FoeCom(6, 1, 500, 500, 6);
  FoeList[7] = new FoeCom(7, 2, 200, 550, 7);
  FoeList[8] = new FoeCom(5, 3, 500, 100, 8);

  SDprobemove = new Sound("sound/probemove.wav");
  SDshoot = new Sound("sound/shoot.wav");
  SDcreeper = new Sound("sound/creeper.wav");
  SDexplode = new Sound("sound/explode.wav");

  myGameArea.x = 0; // 解决鼠标开始哪儿都没点的 bug
  myGameArea.y = 0;
  myGameArea.start();
}



var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = stagew; // document.body.clientWidth
    this.canvas.height = stageh;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20); // 每 20th 毫秒 (50 fps)

    this.canvas.style.cursor = "crosshair";
    window.addEventListener('mousedown', function (e) { // mousemove
      myGameArea.x = e.pageX; // 点按钮用
      myGameArea.y = e.pageY;
    })
    window.addEventListener('mouseup', function (e) {
      myGameArea.x = false;
      myGameArea.y = false;
    })
    // window.addEventListener('touchmove', function (e) {
    //   myGameArea.x = e.touches[0].screenX;
    //   myGameArea.y = e.touches[0].screenY;
    // })
    window.addEventListener('touchstart', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
    window.addEventListener('touchend', function (e) {
      myGameArea.x = false;
      myGameArea.y = false;
    })
    window.addEventListener('keydown', function (e) {
      e.preventDefault();
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true; // (e.type == "keydown")
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    })
  },
  stop : function() {
    clearInterval(this.interval);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}



function WallCom(wid, n) {

  this.wid = wid;
  this.n = n;
  this.j = n%iwd; // i,j start from 0
  this.i = (n-this.j)/iwd;
  this.x = wd*(this.j+0.5);
  this.y = wd*(this.i+0.5);
  this.type = map[n];
  this.alpha = 0;
  this.conv = 0;
  this.preupdate = function() { // 先算一轮卷积前的
    this.alpha = lightlevel(Probe1,this,litmax[Probe1.modnum(1)]);
    if (this.alpha>0.001) {this.conv = iswallinline(Probe1.x,Probe1.y,this.x,this.y)}
  }
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = WallType[this.type];

    if (iswall(this.type)) {
      if (Probe1.modnum(3)>0) {this.alpha = 0.8}
      else {
        var temp = this.conv*2;
        if (i>0) {temp+=Wall[(i-1)*iwd+j].conv}
        if (i<fullw/wd-1) {temp+=Wall[(i+1)*iwd+j].conv}
        if (j>0) {temp+=Wall[i*iwd+j-1].conv}
        if (j<fullh/wd-1) {temp+=Wall[i*iwd+j+1].conv}
        if (temp<4) {this.conv = 1} // 给墙补光
        else {this.conv = 1-temp/6}
      this.alpha = cutone(this.alpha*this.conv+modlitsum(n))
      ctx.globalAlpha = this.alpha;
      ctx.fillRect(vx+this.x-this.wid/2, vy+this.y-this.wid/2, this.wid, this.wid);
      }
    } else { // if (this.type==0)
      this.alpha = cutone(this.alpha*(1-this.conv)+modlitsum(n))
      ctx.globalAlpha = this.alpha;
      ctx.fillRect(vx+this.x-this.wid/2+3, vy+this.y-this.wid/2+3, 4, 4);
    }
  }
}



function ModCom(wid, type, x, y) {

  this.exist = -1; // -1 表示在地上, 012 表示在插槽, -2 表示消耗掉
  this.wait = false; // 等待复活
  this.wid = wid;
  this.x = x;
  this.y = y;
  this.ang = "A";
  this.type = type;
  this.bunum = 4; // 子弹数目
  this.modlit = new Array(); // 静态光源只计算一次,存着重复用
  if (this.type == 1) {for (n in map) {this.modlit[n]=0}}

  this.update = function() {
    if (this.exist == -1) {
      this.updatedraw();
      var empty = Probe1.findempty();
      if (empty>=0) {
        if (this.crashWith(Probe1)) {
          Probe1.mod[empty] = this; // 将本实体放入 Probe 的插槽
          this.exist = empty;
          if (type==1) {for (n in map) {this.modlit[n]=0}}
        }
      } // else 提示插槽已满
    } else if (this.wait) {
      this.updatedraw();
      if (!this.crashWith(Probe1)) {
        this.wait = false;
        this.exist = -1;
      }
    }
  }
  this.updatedraw = function() {
    ctx = myGameArea.context;
    ctx.globalAlpha = cubelit(Wall[nat(this.x,this.y)].alpha);
    var img = new Image();
    img.src = imgsrc(this);
    ctx.drawImage(img,vx+this.x-wid/2,vy+this.y-wid/2,this.wid,this.wid);
  }
  this.updatelit = function() {
    // 计算 ModCirclit 方块的光影,max=10
    for (i=0;i<20;i++) {
    for (j=0;j<20;j++) {
      n = nat(this.x-(i-10)*wd,this.y-(j-10)*wd);
      if (iswall(map[n])) {
        this.modlit[n] = lightlevel(this,Wall[n],70);
      }
      if (map[n]==0) {
        this.modlit[n] = lightlevel(this,Wall[n],70);
      }
    }}
  }
  this.crashWith = function(other) {
    return crash(this,this.wid/2,other,other.cubewid);
  }
}



function ProbeCom(wid, color, x, y) {

  this.wid = wid;
  this.cubewid = wid;
  this.speed = 0; // 前进速度
  this.ang = 0;
  this.angspeed = 0;
  this.x = x;
  this.y = y;
  this.headx = x; // 每个 probe 有不同的目的地
  this.heady = y;
  this.touch = false; // 触控还是键盘
  this.color = color;
  this.health = 99;
  this.Info = null;
  this.mod = new Array(ModNull,ModNull,ModNull,ModNull,ModNull); // 一个 Probe 现最多搭载 5 个插件, 以体积增大为惩罚?
  this.lastfire = -10; // 开火时间有 CD
  this.modnum = function(id) {
    var sum = 0;
    for (i=0;i<5;i++) {sum+=(this.mod[i].type==id)}
    return(sum)
  }
  this.findempty = function() {
    for (i=0;i<5;i++) {if(this.mod[i].type==0){return i}}
    return(-1)
  }
  this.putdown = function(i) {
    if (this.mod[i] != ModNull) {
      // var wa = Wall[nat(this.x,this.y)];
      this.mod[i].x = this.x;
      this.mod[i].y = this.y;
      this.mod[i].wait = true;
      if (this.mod[i].type == 1) {this.mod[i].updatelit()}
      this.mod[i] = ModNull;
    }
  }
  this.fire = function(i) {
    if (this.mod[i].type == -1) {
      if (myGameArea.frameNo - this.lastfire > 10) {
        if (this.mod[i].bunum > 0) {
          newbu(this.x,this.y,this.cubewid,Math.sin(this.ang),-Math.cos(this.ang));
          this.mod[i].bunum --;
          if (this.mod[i].bunum <= 0) {
            this.mod[i].exist = -2;
            this.mod[i] = ModNull;
          }
        }
        this.lastfire = myGameArea.frameNo;
      }
    }
  }
  this.update = function() {
    if (this.modnum(-3)>0) { // 持有治疗插件则回血
      for (f=0;f<this.modnum(-3);f++) { // 加血时刻均匀化
        if (myGameArea.frameNo % 20 == f*4) {this.health++}
      }
      if (this.health>99) {this.health=99}
    }
    while (this.modnum(-3)>0 && this.health<0) {
      // Probe 死亡则自动消耗掉回血插件
      this.health += 99;
      var i = 0;
      while (this.mod[i].type!=-3) {i++}
      this.mod[i].exist = -2;
      this.mod[i] = ModNull;
    }
    if (this.health<0) {this.reBirth()}
    this.newPos();
    // this.wid = wid+2*((this.mod[0]!=0)+(this.mod[1]!=0)+(this.mod[2]!=0));
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(vx+this.x, vy+this.y);
    ctx.rotate(this.ang);
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.fillRect(this.wid / -2, this.wid / -2, this.wid, this.wid);
    ctx.fillStyle = "#0568B7";
    ctx.fillRect(this.wid / -4, this.wid / -2  , this.wid/2, this.wid/4);
    ctx.restore();
    if (this.modnum(2)>0) { // 生命探测范围指示
      ctx.fillStyle = "#28FF28";
      ctx.globalAlpha = 0.3;
      var w = lifmax[this.modnum(2)];
      ctx.fillRect(vx+this.x-w, vy+this.y-w , 2*w, 1); // 上
      ctx.fillRect(vx+this.x-w, vy+this.y+w , 2*w, 1); // 下
      ctx.fillRect(vx+this.x-w, vy+this.y-w, 1 , 2*w); // 左
      ctx.fillRect(vx+this.x+w, vy+this.y-w, 1 , 2*w); // 右
    }
    this.Info.update();
  }
  this.newPos = function() {
    this.ang += this.angspeed * Math.PI / 180;
    var sin = Math.sin(this.ang);
    var cos = Math.cos(this.ang);
    this.x += this.speed*sin; // + this.rispeed*cos;
    this.y +=-this.speed*cos; // + this.rispeed*sin;
  }
  this.crashWith = function(other) {
    this.cubewid = this.wid/1.414214*Math.cos(Math.PI/4-Math.abs(this.ang%(Math.PI/2)));
    if (crash(this,this.cubewid,other,other.wid/2)) {
      this.speed *= 0.5;
      if (Math.abs(this.x-other.x)>=Math.abs(this.y-other.y)) {
        this.x += 2*bool2sgn(this.x,other.x);
      }
      if (Math.abs(this.x-other.x)<=Math.abs(this.y-other.y)) {
        this.y += 2*bool2sgn(this.y,other.y);
      }
    }
  }
  this.relaxAng = function() {
    var relaxang = this.ang % (Math.PI/2);
    var relax;
    if (relaxang >0) {
      if (relaxang < Math.PI/4) {relax = -1} else {relax = 1}
    } else {
      if (relaxang < -Math.PI/4) {relax = -1} else {relax = 1}
    }
    this.ang += 2*relax * Math.PI / 180;
  }
  this.reBirth = function() {
    for (i in this.mod) {
      this.x += 8*Math.random()-4; // 随机散落避免重叠
      this.y += 8*Math.random()-4;
      this.putdown(i);
    }
    this.x = x;
    this.y = y;
    this.ang = Math.PI/2;
    this.health = 99;
    vx = 0;
    vy = 0;
  }
}



function FoeCom(radius, type, x, y, exist) {

  this.exist = exist; // 012 表示在 FoeList 中的 index
  this.r = radius;
  this.x = x;
  this.y = y;
  this.type = type;
  this.randomang = Math.random()*2*Math.PI;
  this.pursuerandx = 0;
  this.pursuerandy = 0;
  this.bombframe = -1; // Creeper 引爆
  this.update = function() {
    if (this.type != 0) {
      this.newPos();
      ctx = myGameArea.context;
      if (Probe1.modnum(2)>0 && Math.abs(Probe1.x-this.x)<=lifmax[Probe1.modnum(2)] && Math.abs(Probe1.y-this.y)<=lifmax[Probe1.modnum(2)]) {
        ctx.fillStyle = "#28FF28";
        ctx.globalAlpha = 1;
        ctx.fillRect(vx+this.x-2, vy+this.y-2, 4, 4);
      }
      ctx.beginPath();
      ctx.arc(vx+this.x, vy+this.y, this.r, 0, 2*Math.PI, false);
      ctx.fillStyle = FoeType[this.type];
      ctx.globalAlpha = cubelit(Wall[nat(this.x,this.y)].alpha);
      ctx.fill();
      // ctx.lineWidth = 3;
      // ctx.strokeStyle = '#FF8000';
      // ctx.stroke();
    }
  }
  this.newPos = function() { // 追击速度
    // 即将爆炸的 Creeper 是不动的
    if (this.bombframe > 0) {
      if (myGameArea.frameNo == this.bombframe) {
        SDexplode.play();
        this.dead();
        var r2 = getr2(this.x-Probe1.x,this.y-Probe1.y);
        var h = hurt[Probe1.modnum(4)];
        if (r2 < 100*wd*wd) {Probe1.health -= h}
        if (r2 < 64*wd*wd) {Probe1.health -= h}
        if (r2 < 36*wd*wd) {Probe1.health -= h}
        if (r2 < 16*wd*wd) {Probe1.health -= h}
        if (r2 < 4*wd*wd) {Probe1.health -= h}
      }
      return(0);
    }
    var speed = FoeSpeed[this.type];
    if (!iswallinline(Probe1.x,Probe1.y,this.x,this.y)) {
      var angdx = Probe1.x-this.x;
      var angdy = Probe1.y-this.y;
      var dr = getr(angdx,angdy);
      angdx = angdx/dr;
      angdy = angdy/dr;
      if (myGameArea.frameNo % 25 == 0) {
        if (this.type != 3) {
          this.pursuerandx = 40*Math.random()-20; // 追击方向加入随机涨落,除了hamper
          this.pursuerandy = 40*Math.random()-20;
        }
        if (this.type == 1) { // 每 0.5 秒生成新子弹
          newbu(this.x,this.y,this.r,angdx,angdy);
        }
        if (this.type == 2) {
          if (getr2(this.x-Probe1.x,this.y-Probe1.y) < 25*wd*wd) {
            this.bombframe = myGameArea.frameNo + 15;
            SDcreeper.play();
          }
        }
      }
      this.x += speed * (angdx+this.pursuerandx/dr); // 距离越远涨落越小
      this.y += speed * (angdy+this.pursuerandy/dr);
    } else {
      if (myGameArea.frameNo % 50 == 0) { // 每 1 秒随机改变方向
        if (Math.random()>0.2) {
          this.randomang += 10*Math.random();
        }
      }
      var sin = Math.sin(this.randomang);
      var cos = Math.cos(this.randomang);
      if (idat(this.x+2*this.r*sin,this.y+2*this.r*cos)==1) { // 预判, 不是非要撞到墙才转向
        this.randomang += Math.PI; // 若撞墙则角度加 180
        this.x -= speed*sin;
        this.y -= speed*cos;
      } else {
        this.x += 0.5*speed*sin; // 随机游走速度 * 0.5
        this.y += 0.5*speed*cos;
      }
    }
    // Probe 和敌人互怼检测
    if (touch(Probe1,this)) {
      Probe1.crashWith(this);
      this.crashWith(Probe1);
    }
  }
  this.crashWith = function(other) {
    if (crash(this,this.r,other,(other.wid)/1.5)) {
      if (Math.abs(this.x-other.x)>=Math.abs(this.y-other.y)) {
        this.x += 2*bool2sgn(this.x,other.x);
      }
      if (Math.abs(this.x-other.x)<=Math.abs(this.y-other.y)) {
        this.y += 2*bool2sgn(this.y,other.y);
      }
    }
  }
  this.dead = function(other) {
    ModList[ModList.length] = new ModCom(wd+2, -this.type, this.x, this.y);
    // this.x = -20; this.y = -20;
    this.type = 0;
    // FoeList[this.exist] = FoeNull;
  }
}



function BuCom(x, y, dx, dy, index) {

  this.x = x;
  this.y = y;
  this.index = index;
  var dxn = 7*dx; // +(Math.random()*2-1); // 线速度 7px/frame
  var dyn = 7*dy; // +(Math.random()*2-1);
  this.update = function() {
    this.x += dxn;
    this.y += dyn;

    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(vx+this.x, vy+this.y, 2, 0, 2*Math.PI, false);
    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.8;
    ctx.fill();

    // 子弹击中 Probe 检测
    if (crash(this,2,Probe1,Probe1.wid/2)) {
      Probe1.health -= hurt[Probe1.modnum(4)];
      BuList[index] = null;
      return 0; // 提前结束函数
    }
    // 子弹击中 Foe 检测
    for (n in FoeList) {
      var f = FoeList[n];
      if (f.type != 0) {
        if (crash(this,2,f,f.r)) {
          f.dead();
          BuList[index] = null;
          return 0;
        }
      }
    }
    // 子弹撞墙检测
    var loc = nat(this.x,this.y);
    for (i=-1;i<=1;i++) { for (j=-1;j<=1;j++) {
      var ntest = loc+i*iwd+j;
      if(iswall(map[ntest])) {
        if (crash(this,2,Wall[ntest],wd/2)) {
          BuList[index] = null;
          return 0;
        }
      }
    }}
  }
}

function newbu(x,y,r,dx,dy) {
  var empty = 0;
  while (BuList[empty] != null) {empty++}
  BuList[empty] = new BuCom(x+1.1*r*dx,y+1.1*r*dy,dx,dy,empty); // 防止打死自己 2333
  SDshoot.play();
}


function InfoCom(host, x, y) {
  this.host = host;
  this.x = x+wd*3.5; // 记录的是中心点
  this.y = y+wd;
  // this.modimg = new Array(); // 作按钮用
  this.update = function() {
    ctx = myGameArea.context;
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#222";
    ctx.fillRect(x-15, y-3*wd, wd*9, wd*8);

    ctx.fillStyle = host.color;
    ctx.fillRect(x+host.wid / -2, y+host.wid / -2, host.wid, host.wid);
    ctx.fillStyle = "#0568B7";
    ctx.fillRect(x+host.wid / -4, y+host.wid / -2  , host.wid/2, host.wid/4);

    ctx.fillStyle = "#fff";
    ctx.font="20px Verdana";
    ctx.fillText(host.health.toString(),x+20,y+7);

    for (i in host.mod) {
      var img = new Image();
      img.src = imgsrc(host.mod[i]);
      ctx.drawImage(img,x-8+16*i,y+15,wd+2,wd+2);
    }
  }
  this.clicked = function(i) {
    var vec = new vecCom(x-8+16*i+wd/2+1,y+15+wd/2+1);
    return(crash(vec,wd/2+1,myGameArea,2));
  }
}



function Sound(src) {
  // 造两个声音对象以解决循环播放的间歇
  this.sound1 = document.createElement("audio");
  this.sound1.src = src;
  this.sound1.setAttribute("preload", "auto");
  this.sound1.setAttribute("controls", "none");
  this.sound1.style.display = "none";
  document.body.appendChild(this.sound1);

  // this.sound2 = document.createElement("audio");
  // this.sound2.src = src;
  // this.sound2.setAttribute("preload", "auto");
  // this.sound2.setAttribute("controls", "none");
  // this.sound2.style.display = "none";
  // document.body.appendChild(this.sound2);

  this.play = function(){
    // if (myGameArea.frameNo % 20 >10) {
      this.sound1.play();
    // }
    // else {this.sound2.play();}
  }
  this.stop = function(){
    this.sound1.pause();
    // this.sound2.pause();
  }
}



function updateGameArea() {

  myGameArea.frameNo++;
  myGameArea.clear();

  Control(Probe1);

  for (n in map) {
    if (Wall[n].x+vx>-wd && Wall[n].x+vx<stagew+wd
      && Wall[n].y+vy>-wd && Wall[n].y+vy<stageh+wd) {Wall[n].preupdate();Wall[n].update()}
  }

  for (n in ModCirclit) {ModCirclit[n].update()}
  for (n in ModList) {ModList[n].update()}

  for (n in FoeList) {FoeList[n].update()}

  Probe1.update();

  for (n in BuList) { if (BuList[n] != null) {BuList[n].update()} }

}



function Control(Prob) {

  Prob.speed = 0;

  // myGameArea.touchX && myGameArea.touchY
  if (myGameArea.x && myGameArea.x<stagew && myGameArea.y<stageh && (!crash(myGameArea,2,Prob.Info,wd*5))) {
    Prob.headx = myGameArea.x-vx;
    Prob.heady = myGameArea.y-vy;
    Prob.touch = true;
  }
  if (Prob.touch) {
    var dx = Prob.headx-Prob.x;
    var dy = Prob.y-Prob.heady; // y 轴指向下
    var dxp = Math.cos(Prob.ang)*dx-Math.sin(Prob.ang)*dy; // 转动变换
    var dyp = Math.sin(Prob.ang)*dx+Math.cos(Prob.ang)*dy;
    var flag = false; // 由于键盘引入了角加速度,触控需手动清理残余角动量…
    if(dxp>4) {Prob.angspeed = 4.5}
    else if(dxp<-4) {Prob.angspeed = -4.5}
    else {flag = true}
    if(dyp>4) {Prob.speed = 1.8}
    else if(dyp<-4) {Prob.speed = -1.8}
    else { if(flag){Prob.angspeed=0} }
  }

  if (myGameArea.keys) {
    if (myGameArea.keys[38]) { // 前 ↑
      if (myGameArea.keys[17]) {vy+=20} // ctrl 调视角
      else {Prob.touch = false; Prob.speed = 1.8;}
    }
    if (myGameArea.keys[40]) { // 后 ↓
      if (myGameArea.keys[17]) {vy-=20}
      else {Prob.touch = false; Prob.speed = -1.8;}
    }

    if (myGameArea.keys[37]) { // 逆转 ←
      if (myGameArea.keys[17]) {vx+=20}
      else {Prob.touch = false; Prob.angspeed -= 1.5;
      if (Prob.angspeed<-35) {Prob.angspeed=-35}}
    } else if (myGameArea.keys[39]) { // 顺转 →
      if (myGameArea.keys[17]) {vx-=20}
      else {Prob.touch = false; Prob.angspeed += 1.5;
      if (Prob.angspeed>35) {Prob.angspeed=35}}
    } else if (!Prob.touch) {
      Prob.angspeed = 0;
    }
  }

  // 暂时设为自动将 Probe 置于视野中心, ctrl 暂时不用了吧
  if (Prob.x>stagew/2 && Prob.x<fullw-stagew/2) {vx=stagew/2-Math.floor(Prob.x)}
  if (Prob.y>stageh/2 && Prob.y<fullh-stageh/2) {vy=stageh/2-Math.floor(Prob.y)}

  for (n=0;n<5;n++) {
    if (myGameArea.keys && myGameArea.keys[49+n] || Prob.Info.clicked(n)) {Prob.putdown(n)} // 1~5
    if (myGameArea.keys && myGameArea.keys[112+n]) {Prob.fire(n)} // F1~F5
  }

  if(Prob.speed != 0 || Prob.angspeed != 0) {SDprobemove.play()} else {SDprobemove.stop()}

  // Probe 撞墙检测
  var loc = nat(Prob.x,Prob.y);
  for (i=-1;i<=1;i++) { for (j=-1;j<=1;j++) {
    var ntest = loc+i*iwd+j;
    if(iswall(map[ntest])) {
      Prob.crashWith(Wall[ntest]);
      Prob.relaxAng();
    }
  }}

}



function lightlevel(source,target,max) {
// return 1 // debug 用
  var ang = source.ang; // source 必须是 Probe (或 ModCirclit)
  var dx = target.x-source.x;
  var dy = target.y-source.y;
  var r = getr(dx,dy);
  if (r>=max) {return 0} // 提前 return 以节约计算量
  var slant = 1;
  if (ang != "A") { if (source.modnum(1)==0) {
    slant = dot(-Math.sin(ang),Math.cos(ang),dx,dy,r);
    slant = Math.pow(0.5*(1-slant),3);
    if (slant<0.005) {return 0}
  }}
  return((1-r/max)*slant*slant)
}


function cubelit(maplit) { // 实体直接从地板获得光照级别
  if (maplit>0.25) {return 1}
  else if (maplit>0.1) {return maplit*1.5}
  else {return(maplit)}
}


function iswallinline(ax,ay,bx,by) {
  var len = getr(by-ay,bx-ax);
  var total = 1+Math.round(len/wd);
  var dx = (bx-ax)/total;
  var dy = (by-ay)/total;
  // var n = 0;
  // while(!iswall(ax+n*dx,ay+n*dy) && n<total) {n++;}
  // return(n/total)
  var flag = false;
  // total--; // 减弱判断条件以照亮墙本身
  for(n=0;n<total;n++) {
    flag = flag || iswall(idat(ax+n*dx,ay+n*dy));
  }
  return(flag)
}

function nat(x,y) {
  var j = Math.floor(x/wd); // 用 floor 才能照亮右下方的墙…
  var i = Math.floor(y/wd);
  return(i*iwd+j)
}
function idat(x,y) {
  return(map[nat(x,y)])
}

function iswall(id) {
  if (id>=1 && id<=5) {return true}
  else {return false}
}

function touch(p,f) {
  var widsum = p.wid/2+f.r;
  if (p.x-f.x<widsum && p.x-f.x>-widsum && p.y-f.y<widsum && p.y-f.y>-widsum) {return true
  } else {return false}
}

function cutone(a) {
  if(a>1){return 1}
  else {return(a)}
}

function bool2sgn(a,b) {
  if(a>b){return 1}
  if(a==b){return 0}
  if(a<b){return -1}
}

function getr2(dx,dy) {
  return(dx*dx+dy*dy)
}

function getr(dx,dy) {
  return(Math.sqrt(getr2(dx,dy)))
}

function dot(ax,ay,bx,by,br) {
  return(ax*bx/br+ay*by/br)
}

function crash(my, myhwid, other, otherhwid) {
  if ((my.y+myhwid < other.y-otherhwid) || (my.y-myhwid > other.y+otherhwid) ||
      (my.x+myhwid < other.x-otherhwid) || (my.x-myhwid > other.x+otherhwid)) {
    return(false);
  } else {return(true)}
}

function vecCom(x,y) {
  this.x = x;
  this.y = y;
}

function modlitsum(n) {
  var sum = 0;
  for (x in ModCirclit) {sum += ModCirclit[x].modlit[n]}
  return(sum)
}

function imgsrc(mod) {
  if (mod.type>=0) {return ModImg[mod.type]}
  if (mod.type==-1) {return BulImg[mod.bunum]}
  if (mod.type<-1) {return FdropImg[-mod.type]}
}
