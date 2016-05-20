
var wd = 10; // 墙宽
var iwd = 80; // 每行网格数
var litmax = 300; // 最远光照半径
var lifmax =  new Array(0,200,350,500); // 生命探测半宽


// 将字母翻译为键码
var A=65,B=66,C=67,D=68,E=69,F=70,G=71,H=72,I=73,J=74,K=75,L=76,M=77,N=78,O=79,P=80,Q=81,R=82,S=83,T=84,U=85,V=86,W=87,X=88,Y=89,Z=90;
var n = new Array(48,49,50,51,52,53,54,55,56,57); // 0~9
var f = new Array(112,113,114,115,116,117,118,119,120,121,122,123); // f1~f12

var Wall = new Array(); // 墙像素 10^2, 网格 80*60, 总像素 800*600
var map = new Array(
  2,2,2,2,2,2,2,2,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  2,0,0,0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,2,2,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,2,0,0,0,0,2,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,2,2,2,2,2,2,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
);


var Probe1;
var Probe1Info;
var ShootFoe;
var CreepFoe;

var ModImg = new Array("img/0.png","img/ModCirclit.png","img/ModLifesen.png","img/ModHacker.png");
// 静态插件 1 环形照明 2 生命探测 3 黑客系统 4 护盾 9 母舰芯片
var ModNull; // 我需要一个空对象
var ModCirclit1;
var ModCirclit2;
var ModCirclit3;
var ModLifesen1;
var ModLifesen2;
var ModLifesen3;
var ModHacker;
// 动作插件 -1 拖车 -2 机枪 -3 陷阱

var SDprobemove;



function startGame() {

  for (x in map) {
    var j = x%iwd; // i,j start from 0
    var i = (x-j)/iwd;
    switch(map[x]) {
    case 0:
        Wall[x] = new WallComponent(wd, "white", wd*(j+0.5), wd*(i+0.5));
        break;
    case 1:
        Wall[x] = new WallComponent(wd, "green", wd*(j+0.5), wd*(i+0.5));
        break;
    case 2:
        Wall[x] = new WallComponent(wd, "#0094FF", wd*(j+0.5), wd*(i+0.5));
        break;
    default:

    }
  }

  ModNull = new ModComponent(wd+2, 0, -20, -20);
  ModCirclit1 = new ModComponent(wd+2, 1, 120+wd/2, 230+wd/2);
  ModCirclit2 = new ModComponent(wd+2, 1, 420+wd/2, 120+wd/2);
  ModCirclit3 = new ModComponent(wd+2, 1, 320+wd/2, 320+wd/2);
  ModLifesen1 = new ModComponent(wd+2, 2, 170+wd/2, 70+wd/2);
  ModLifesen2 = new ModComponent(wd+2, 2, 170+wd/2, 100+wd/2);
  ModLifesen3 = new ModComponent(wd+2, 2, 170+wd/2, 130+wd/2);
  ModHacker = new ModComponent(wd+2, 3, 370+wd/2, 70+wd/2);

  ModCirclit1.updatelit();
  ModCirclit2.updatelit();
  ModCirclit3.updatelit();

  Probe1 = new ProbeComponent(15, "#C59D0D", 20, 30);
  Probe1.ang = Math.PI / 2;
  Probe1Info = new InfoComponent(Probe1, 16, 250);

  ShootFoe = new FoeComponent(7, "#222", 500, 300);
  CreepFoe = new FoeComponent(7, "red", 500, 500);

  SDprobemove = new Sound("sound/probemove.wav");

  myGameArea.start();
}



var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 800; // document.body.clientWidth
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 40); // 每 40th 毫秒 (25 fps)

    this.canvas.style.cursor = "crosshair";
    window.addEventListener('mousemove', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
    window.addEventListener('touchmove', function (e) {
      myGameArea.x = e.touches[0].screenX;
      myGameArea.y = e.touches[0].screenY;
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



function WallComponent(wid, color, x, y) {

  this.wid = wid;
  this.x = x;
  this.y = y;
  this.alpha = 0;
  this.update = function(x) {
    if (iswall(map[x])) {
      if (Probe1.modnum(3)>0) {this.alpha = 0.8}
      else {
        this.alpha = cutone(lightlevel(Probe1,this,litmax,1)+
          ModCirclit1.modlit[x]+ModCirclit2.modlit[x]+ModCirclit3.modlit[x]);
      }
    } else { // if (map[x]==0)
      this.alpha = cutone(lightlevel(Probe1,this,litmax,0)+
        ModCirclit1.modlit[x]+ModCirclit2.modlit[x]+ModCirclit3.modlit[x]);
    }
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.globalAlpha = this.alpha;
    ctx.fillRect(this.x-this.wid/2, this.y-this.wid/2, this.wid, this.wid);
  }
}



function ModComponent(wid, type, x, y) {

  this.exist = -1; // -1 表示在地上, 012 表示在插槽
  this.wait = false; // 等待复活
  this.wid = wid;
  this.x = x;
  this.y = y;
  this.ang = "A";
  this.type = type;
  this.image = new Image();
  this.image.src = ModImg[type];
  this.modlit = new Array(); // 静态光源只计算一次,存着重复用
  if (this.type == 1) {for (x in map) {this.modlit[x]=0}}

  this.update = function() {
    if (this.exist == -1) {
      this.updatedraw();
      var empty = Probe1.findempty();
      if (empty>=0) {
        if (this.crashWith(Probe1)) {
          Probe1.mod[empty] = this; // 将本实体放入 Probe 的插槽
          this.exist = empty;
          if (type==1) {for (x in map) {this.modlit[x]=0}}
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
    ctx.globalAlpha = cubelit(Wall[xat(this.x,this.y)].alpha);
    ctx.drawImage(this.image,this.x-wid/2,this.y-wid/2,this.wid,this.wid);
  }
  this.updatelit = function() {
    // 计算 ModCirclit 方块的光影,max=10
    for (i=0;i<20;i++) {
    for (j=0;j<20;j++) {
      x = xat(this.x-(i-10)*wd,this.y-(j-10)*wd);
      if (iswall(map[x])) {
        this.modlit[x] = lightlevel(this,Wall[x],100,1);
      }
      if (map[x]==0) {
        this.modlit[x] = lightlevel(this,Wall[x],100,0);
      }
    }}
  }

  this.crashWith = function(other) {
    var myleft = this.x - this.wid/2;
    var myright = this.x + this.wid/2;
    var mytop = this.y - this.wid/2;
    var mybottom = this.y + this.wid/2;
    var otherleft = other.x - other.cubewid;
    var otherright = other.x + other.cubewid;
    var othertop = other.y - other.cubewid;
    var otherbottom = other.y + other.cubewid;
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) ||
        (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}



function ProbeComponent(wid, color, x, y) {

  this.wid = wid;
  this.cubewid = wid;
  this.speed = 0;
  this.ang = 0;
  this.angspeed = 0;
  this.x = x;
  this.y = y;
  this.color = color;
  this.mod = new Array(ModNull,ModNull,ModNull); // 一个 Probe 现最多搭载 3 个插件, 以体积增大为惩罚
  this.modnum = function(id) {
    return((this.mod[0].type==id)+(this.mod[1].type==id)+(this.mod[2].type==id))
  }
  this.findempty = function() {
    if(this.mod[0].type==0){return 0}
    if(this.mod[1].type==0){return 1}
    if(this.mod[2].type==0){return 2}
    return(-1)
  }
  this.putdown = function(i) {
    var wa = Wall[xat(this.x,this.y)];
    this.mod[i].x = wa.x-1;
    this.mod[i].y = wa.y-1;
    this.mod[i].wait = true;
    if (this.mod[i].type==1) {this.mod[i].updatelit()}
    this.mod[i] = ModNull;
  }
  this.update = function() {
    // this.wid = wid+2*((this.mod[0]!=0)+(this.mod[1]!=0)+(this.mod[2]!=0));
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
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
      ctx.fillRect(this.x-w, this.y-w , 2*w, 1); // 上
      ctx.fillRect(this.x-w, this.y+w , 2*w, 1); // 下
      ctx.fillRect(this.x-w, this.y-w, 1 , 2*w); // 左
      ctx.fillRect(this.x+w, this.y-w, 1 , 2*w); // 右
    }
  }
  this.newPos = function() {
    this.ang += this.angspeed * Math.PI / 180;
    this.x += this.speed * Math.sin(this.ang);
    this.y -= this.speed * Math.cos(this.ang);
  }
  this.crashWith = function(other) {
    this.cubewid = this.wid/1.414214*Math.cos(Math.PI/4-Math.abs(this.ang%(Math.PI/2)));
    var myleft = this.x - this.cubewid;
    var myright = this.x + this.cubewid;
    var mytop = this.y - this.cubewid;
    var mybottom = this.y + this.cubewid;
    var otherleft = other.x - (other.wid)/2;
    var otherright = other.x + (other.wid)/2;
    var othertop = other.y - (other.wid)/2;
    var otherbottom = other.y + (other.wid)/2;
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || // 注意 y 轴正向向下
        (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    if (crash) {
      this.speed *= 0.5;
      if (Math.abs(this.x-other.x)>=Math.abs(this.y-other.y)) {
        this.x += 2*bool2sgn(this.x,other.x);
      }
      if (Math.abs(this.x-other.x)<=Math.abs(this.y-other.y)) {
        this.y += 2*bool2sgn(this.y,other.y);
      }
    }
    return crash;
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
}



function FoeComponent(radius, color, x, y) {

  this.r = radius;
  this.x = x;
  this.y = y;
  this.randomang = Math.random()*2*Math.PI;
  this.update = function() {
    ctx = myGameArea.context;
    if (Probe1.modnum(2)>0 && Math.abs(Probe1.x-this.x)<=lifmax[Probe1.modnum(2)] && Math.abs(Probe1.y-this.y)<=lifmax[Probe1.modnum(2)]) {
      ctx.fillStyle = "#28FF28";
      ctx.globalAlpha = 1;
      ctx.fillRect(this.x-2, this.y-2, 4, 4);
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    ctx.fillStyle = color;
    ctx.globalAlpha = cubelit(Wall[xat(this.x,this.y)].alpha);
    ctx.fill();
    // ctx.lineWidth = 3;
    // ctx.strokeStyle = '#FF8000';
    // ctx.stroke();
  }
  this.newPos = function(speed) { // 追击速度
    if (!iswallinline(Probe1.x,Probe1.y,this.x,this.y)) {
      var angdx = Probe1.x-this.x;
      var angdy = Probe1.y-this.y;
      var dr = getr(angdx,angdy);
      this.x += speed * angdx/dr;
      this.y += speed * angdy/dr;
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
  }
  this.crashWith = function(other) {
    var myleft = this.x - this.r;
    var myright = this.x + this.r;
    var mytop = this.y - this.r;
    var mybottom = this.y + this.r;
    var otherleft = other.x - (other.wid)/1.5;
    var otherright = other.x + (other.wid)/1.5;
    var othertop = other.y - (other.wid)/1.5;
    var otherbottom = other.y + (other.wid)/1.5;
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || // 注意 y 轴正向向下
        (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    if (crash) {
      if (Math.abs(this.x-other.x)>=Math.abs(this.y-other.y)) {
        this.x += 2*bool2sgn(this.x,other.x);
      }
      if (Math.abs(this.x-other.x)<=Math.abs(this.y-other.y)) {
        this.y += 2*bool2sgn(this.y,other.y);
      }
    }
    return crash;
  }
}


function InfoComponent(host, x, y) {
  // this.host = Probe1;
  // this.x = x;
  // this.y = y;
  this.update =function() {
    ctx = myGameArea.context;
    ctx.globalAlpha = 1;
    ctx.fillStyle = host.color;
    ctx.fillRect(x+host.wid / -2, y+host.wid / -2, host.wid, host.wid);
    ctx.fillStyle = "#0568B7";
    ctx.fillRect(x+host.wid / -4, y+host.wid / -2  , host.wid/2, host.wid/4);
    for (i in host.mod) {
      var img = new Image();
      img.src = ModImg[host.mod[i].type];
      ctx.drawImage(img,x+30+16*i,y-5,wd+2,wd+2);
    }
  }
}


function Sound(src) {
  // 造两个声音对象以解决循环播放的顿歇
  this.sound1 = document.createElement("audio");
  this.sound1.src = src;
  this.sound1.setAttribute("preload", "auto");
  this.sound1.setAttribute("controls", "none");
  this.sound1.style.display = "none";
  document.body.appendChild(this.sound1);

  this.sound2 = document.createElement("audio");
  this.sound2.src = src;
  this.sound2.setAttribute("preload", "auto");
  this.sound2.setAttribute("controls", "none");
  this.sound2.style.display = "none";
  document.body.appendChild(this.sound2);

  this.play = function(){
    if (myGameArea.frameNo % 20 >10) {this.sound1.play();}
    else {this.sound2.play();}
  }
  this.stop = function(){
    this.sound1.pause();
    this.sound2.pause();
  }
}



function updateGameArea() {

  myGameArea.frameNo++;
  myGameArea.clear();

  for (x in map) {Wall[x].update(x)}

  ShootFoe.newPos(1); // 敌人速度比 Probe 慢
  ShootFoe.update();

  CreepFoe.newPos(1.2); // 苦力怕速度
  CreepFoe.update();

  Probe1.angspeed = 0;
  Probe1.speed = 0;

  if (myGameArea.x && myGameArea.y) { // myGameArea.touchX && myGameArea.touchY
    var dx = myGameArea.x-Probe1.x;
    var dy = Probe1.y-myGameArea.y; // y 轴指向下
    var rot = Probe1.ang;
    var dxp = Math.cos(rot)*dx-Math.sin(rot)*dy; // 转动变换
    var dyp = Math.sin(rot)*dx+Math.cos(rot)*dy;

    if(dxp>4) {Probe1.angspeed = 4}
    else if(dxp<-4) {Probe1.angspeed = -4}
    if(dyp>4) {Probe1.speed = 1.5}
    else if(dyp<-4) {Probe1.speed = -1.5}
  }

  if (myGameArea.keys && myGameArea.keys[37]) {Probe1.angspeed = -4} // left
  if (myGameArea.keys && myGameArea.keys[39]) {Probe1.angspeed = 4}
  if (myGameArea.keys && myGameArea.keys[38]) {Probe1.speed = 1.5} // up
  if (myGameArea.keys && myGameArea.keys[40]) {Probe1.speed = -1.5}
  for (i=0;i<3;i++) {
    if (myGameArea.keys && myGameArea.keys[49+i]) {Probe1.putdown(i)}
  }

  if(Probe1.speed != 0 || Probe1.angspeed != 0) {SDprobemove.play()} else {SDprobemove.stop()}


  // Probe 撞墙检测
  var loc = xat(Probe1.x,Probe1.y);
  for (i=-1;i<=1;i++) { for (j=-1;j<=1;j++) {
    var xtest = loc+i*iwd+j;
    if(iswall(map[xtest])) {
      Probe1.crashWith(Wall[xtest]);
      Probe1.relaxAng();
    }
  }}
  // Probe 撞敌人检测
  if (touch(Probe1,ShootFoe)) {
    Probe1.crashWith(ShootFoe);
    ShootFoe.crashWith(Probe1);
  }
  if (touch(Probe1,CreepFoe)) {
    Probe1.crashWith(CreepFoe);
    CreepFoe.crashWith(Probe1);
  }


  Probe1.newPos();

  ModCirclit1.update();
  ModCirclit2.update();
  ModCirclit3.update();
  ModLifesen1.update();
  ModLifesen2.update();
  ModLifesen3.update();
  ModHacker.update();

  Probe1.update();
  Probe1Info.update();

}



function lightlevel(source,target,max,highlight) {
// return 1 // debug 用
  var ax = source.x;
  var ay = source.y;
  var ang = source.ang; // source 必须是 Probe (或 ModCirclit)
  var bx = target.x;
  var by = target.y;
  var r = getr(bx-ax,by-ay);
  if (r>=max) {return 0} // 提前 return 以节约计算量
  var slant = 1;
  if (ang != "A") { if (source.modnum(1)==0) {
    slant = dot(-Math.sin(ang),Math.cos(ang),bx-ax,by-ay,r);
    slant = Math.pow(0.5*(1-slant),3);
    if (slant<0.005) {return 0}
  }}
  var convolve = (2*iswallinline(ax,ay,bx,by)+
    iswallinline(ax,ay,bx+wd/2,by)+iswallinline(ax,ay,bx-wd/2,by)+
    iswallinline(ax,ay,bx,by+wd/2)+iswallinline(ax,ay,bx,by-wd/2))/6;
  if (highlight>0 && convolve<0.95) {convolve = 0} // 给墙补光
  // if (highlight<2) {slant = Math.pow(slant,2)} else {r /= 1.5} // 给实体补光
  return((1-r/max)*slant*slant*(1-convolve))
}


function cubelit(maplit) { // 实体直接从地板获得光
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

function xat(x,y) {
  var j = Math.floor(x/wd); // 用 floor 才能照亮右下方的墙…
  var i = Math.floor(y/wd);
  return(i*iwd+j)
}
function idat(x,y) {
  return(map[xat(x,y)])
}

function iswall(id) {
  if (id>=1 && id<=5) {return true}
  else {return false}
}

function touch(p,f) {
  var widsum = p.wid/2+f.r;
  if (p.x-f.x<widsum && p.x-f.x>-widsum && p.y-f.y<widsum && p.y-f.y>-widsum) {return true}
  else {return false}
}

function cutone(a) {
  if(a>1){return 1}
  else{return a}
}

function bool2sgn(a,b) {
  if(a>b){return 1}
  if(a==b){return 0}
  if(a<b){return -1}
}

function getr(dx,dy) {
  return(Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)))
}

function dot(ax,ay,bx,by,br) {
  bx=bx/br;
  by=by/br;
  return(ax*bx+ay*by)
}



