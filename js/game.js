
var wd = 10; // 墙宽
var iwd = 80; // 网格宽度
var maxdistance = 300; // 最远光照


var CubeProbe;
var ShootFoe;
var CreepFoe;

var CubeWalls = new Array(); // 墙像素 10^2, 网格 80*40, 总像素 800*400
var walls = new Array(
  2,2,2,2,2,2,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  2,0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  2,2,2,2,2,2,2,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
);



function startGame() {

  for (x in walls) {
    var j = x%iwd; // i,j start from 0
    var i = (x-j)/iwd;
    switch(walls[x]) {
    case 0:
        CubeWalls[x] = new WallComponent(wd, wd, "white", wd*(j+0.5), wd*(i+0.5));
        break;
    case 1:
        CubeWalls[x] = new WallComponent(wd, wd, "green", wd*(j+0.5), wd*(i+0.5));
        break;
    case 2:
        CubeWalls[x] = new WallComponent(wd, wd, "#0094FF", wd*(j+0.5), wd*(i+0.5));
        break;
    default:

    }
  }

  CubeProbe = new ProbeComponent(15, 15, "#C59D0D", 20, 20);
  CubeProbe.angle = Math.PI / 2;

  ShootFoe = new FoeComponent(7, "#222", 500, 300);
  CreepFoe = new FoeComponent(7, "red", 500, 200);

  myGameArea.start();
}



var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 800; // document.body.clientWidth
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20); // 每 20th 毫秒 (50 fps)

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



function WallComponent(width, height, color, x, y, type) {

  this.type = type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function(getalpha) {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.globalAlpha = getalpha;
    ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
  }
}



function ProbeComponent(width, height, color, x, y, type) {

  this.type = type;
  this.width = width;
  this.height = height;
  this.speed = 0;
  this.angle = 0;
  this.moveAngle = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.fillStyle = "#0568B7";
    ctx.fillRect(this.width / -4, this.height / -2  , this.width/2, this.height/4);
    ctx.restore();
  }
  this.newPos = function() {
    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }
  this.crashWith = function(otherobj) {
    var cubewidth = this.width/1.414214*Math.cos(Math.PI/4-Math.abs(this.angle%(Math.PI/2)));
    var myleft = this.x - cubewidth;
    var myright = this.x + cubewidth;
    var mytop = this.y - cubewidth;
    var mybottom = this.y + cubewidth;
    var otherleft = otherobj.x - (otherobj.width)/2;
    var otherright = otherobj.x + (otherobj.width)/2;
    var othertop = otherobj.y - (otherobj.height)/2;
    var otherbottom = otherobj.y + (otherobj.height)/2;
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || // 注意 y 轴正向向下
        (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    if (crash) {
      this.speed *= 0.5;
      if (Math.abs(this.x-otherobj.x)>=Math.abs(this.y-otherobj.y)) {
        this.x += 2*bool2sgn(this.x,otherobj.x);
      }
      if (Math.abs(this.x-otherobj.x)<=Math.abs(this.y-otherobj.y)) {
        this.y += 2*bool2sgn(this.y,otherobj.y);
      }
    }
    return crash;
  }
  this.relaxAng = function() {
    var relaxangle = this.angle % (Math.PI/2);
    var relax;
    if (relaxangle >0) {
      if (relaxangle < Math.PI/4) {relax = -1} else {relax = 1}
    } else {
      if (relaxangle < -Math.PI/4) {relax = -1} else {relax = 1}
    }
    this.angle += 2*relax * Math.PI / 180;
  }
}



function FoeComponent(radius, color, x, y, type) {

  this.type = type;
  this.r = radius;
  this.x = x;
  this.y = y;
  this.randomang = Math.random()*2*Math.PI;
  this.update = function(getalpha) {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    ctx.fillStyle = color;
    ctx.globalAlpha = getalpha;
    ctx.fill();
    // ctx.lineWidth = 3;
    // ctx.strokeStyle = '#FF8000';
    // ctx.stroke();
  }
  this.newPos = function(speed) { // 追击速度
    if (!iswallinline(CubeProbe.x,CubeProbe.y,this.x,this.y)) {
      var angledx = CubeProbe.x-this.x;
      var angledy = CubeProbe.y-this.y;
      var dr = getr(angledx,angledy);
      this.x += speed * angledx/dr;
      this.y += speed * angledy/dr;
    } else {
      if (myGameArea.frameNo % 50 == 0) { // 每 1 秒随机改变方向
        if (Math.random()>0.2) {
          this.randomang += 10*Math.random();
        }
      }
      var sin = Math.sin(this.randomang);
      var cos = Math.cos(this.randomang);
      if (wallat(this.x+2*radius*sin,this.y+2*radius*cos)==1) { // 预判, 不是非要撞到墙才转向
        this.randomang += Math.PI; // 若撞墙则角度加 180
        this.x -= speed*sin;
        this.y -= speed*cos;
      } else {
        this.x += 0.5*speed*sin; // 随机游走速度 * 0.5
        this.y += 0.5*speed*cos;
      }
    }
  }
}



function updateGameArea() {

  myGameArea.frameNo++;
  myGameArea.clear();

  for (x in walls) {
    if (iswall(walls[x])) {
      CubeWalls[x].update(lightlevel(CubeProbe.x,CubeProbe.y,CubeProbe.angle,CubeWalls[x].x,CubeWalls[x].y,true));
    }
    if (walls[x]==0) {
      CubeWalls[x].update(lightlevel(CubeProbe.x,CubeProbe.y,CubeProbe.angle,CubeWalls[x].x,CubeWalls[x].y,false));
    }
  }


  ShootFoe.newPos(1); // 敌人速度比 Probe 慢
  ShootFoe.update(lightlevel(CubeProbe.x,CubeProbe.y,CubeProbe.angle,ShootFoe.x,ShootFoe.y,true));

  CreepFoe.newPos(1.2); // 苦力怕速度
  CreepFoe.update(lightlevel(CubeProbe.x,CubeProbe.y,CubeProbe.angle,CreepFoe.x,CreepFoe.y,true));

  CubeProbe.moveAngle = 0;
  CubeProbe.speed = 0;

  if (myGameArea.x && myGameArea.y) { // myGameArea.touchX && myGameArea.touchY
    var dx = myGameArea.x-CubeProbe.x;
    var dy = CubeProbe.y-myGameArea.y; // y 轴指向下
    var rot = CubeProbe.angle;
    var dxp = Math.cos(rot)*dx-Math.sin(rot)*dy; // 转动变换
    var dyp = Math.sin(rot)*dx+Math.cos(rot)*dy;

    if(dxp>4) {CubeProbe.moveAngle = 4; }
    else if(dxp<-4) {CubeProbe.moveAngle = -4; }
    if(dyp>4) {CubeProbe.speed = 1.5; }
    else if(dyp<-4) {CubeProbe.speed = -1.5; }
  }

  if (myGameArea.keys && myGameArea.keys[37]) {CubeProbe.moveAngle = -4; } // left
  if (myGameArea.keys && myGameArea.keys[39]) {CubeProbe.moveAngle = 4; }
  if (myGameArea.keys && myGameArea.keys[38]) {CubeProbe.speed = 1.5; } // up
  if (myGameArea.keys && myGameArea.keys[40]) {CubeProbe.speed = -1.5; }

  var crashflag = false;
  for (x in walls) { if(iswall(walls[x])) {
    crashflag = crashflag || CubeProbe.crashWith(CubeWalls[x]);
  }}
  if (crashflag) { CubeProbe.relaxAng() }

  CubeProbe.newPos();
  CubeProbe.update();

}



function lightlevel(ax,ay,ang,bx,by,highlight) {
// return 1 // debug 用
  var distance = getr(bx-ax,by-ay);
  if(distance>=maxdistance){return 0} // 提前 return 以节约计算量
  var slant = dot(-Math.sin(ang),Math.cos(ang),bx-ax,by-ay,distance);
  slant = Math.pow(0.5*(1-slant),6);
  // slant = 1; // 环闪
  if(slant<0.005){return 0}
  var convolve = (2*iswallinline(ax,ay,bx,by)+
    iswallinline(ax,ay,bx+wd/2,by)+iswallinline(ax,ay,bx-wd/2,by)+
    iswallinline(ax,ay,bx,by+wd/2)+iswallinline(ax,ay,bx,by-wd/2))/6;
  if(highlight && convolve<0.95){convolve=0} // 给墙和敌人单独补光
  return((1-distance/maxdistance)*slant*(1-convolve))
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
    flag = flag || iswall(wallat(ax+n*dx,ay+n*dy));
  }
  return(flag)
}

function wallat(x,y) {
  var j = Math.floor(x/wd);  // 用 floor 才能照亮右下方的墙…
  var i = Math.floor(y/wd);
  return(walls[i*iwd+j])
}

function iswall(id) {
  if (id>=1 && id<=5) {return true}
  else {return false}
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



