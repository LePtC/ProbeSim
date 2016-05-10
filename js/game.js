
var CubeProbe;
var CubeWalls = new Array(); // block size 25^2, grid 24*16, size 600*400
var walls = new Array(
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1
);

function startGame() {

  CubeProbe = new ProbeComponent(20, 20, "#C59D0D", 20, 300);
  // CubeProbe.angle = Math.PI / 2;

  for (x in walls) {
    var j = x%24; // i,j start from 0
    var i = (x-j)/24;
    if(walls[x]==1) {
      CubeWalls[x] = new WallComponent(25, 25, "green", 212.5+25*j, 12.5+25*i);
    }
  }

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
    this.interval = setInterval(updateGameArea, 15); // every 15th millisecond (67 frames per second)

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
    var cubewidth = this.width/1.414214*Math.cos(Math.PI/4-Math.abs(this.angle%(Math.PI/2))) +1;
    var myleft = this.x - cubewidth;
    var myright = this.x + cubewidth;
    var mytop = this.y - cubewidth;
    var mybottom = this.y + cubewidth;
    var otherleft = otherobj.x - (otherobj.width)/2;
    var otherright = otherobj.x + (otherobj.width)/2;
    var othertop = otherobj.y - (otherobj.height)/2;
    var otherbottom = otherobj.y + (otherobj.height)/2;
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || // y axis heading downward
        (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    if(crash){
      this.x += 2*bool2sgn(this.x>otherobj.x);
      this.y += 2*bool2sgn(this.y>otherobj.y);
    }
    return crash;
  }
  this.relaxAng = function() {
    var relaxangle = this.angle % (Math.PI/2);
    var relax;
    if(relaxangle >0) {
      if(relaxangle < Math.PI/4) {relax = -3} else {relax = 3}
    } else {
      if(relaxangle < -Math.PI/4) {relax = -3} else {relax = 3}
    }
    this.angle += relax * Math.PI / 180;
  }
}

function bool2sgn(flag) {
  if(flag){return 1}else{return -1}
}



function WallComponent(width, height, color, x, y, type) {

  this.type = type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
  }
}



function updateGameArea() {

  myGameArea.clear();
  for (x in walls) { if(walls[x]==1) {
    CubeWalls[x].update();
  }}

  CubeProbe.moveAngle = 0;
  CubeProbe.speed = 0;

  if (myGameArea.keys && myGameArea.keys[37]) {CubeProbe.moveAngle = -5; }
  if (myGameArea.keys && myGameArea.keys[39]) {CubeProbe.moveAngle = 5; }
  if (myGameArea.keys && myGameArea.keys[38]) {CubeProbe.speed = 2; }
  if (myGameArea.keys && myGameArea.keys[40]) {CubeProbe.speed = -2; }

  var crashflag = false;
  for (x in walls) { if(walls[x]==1) {
    crashflag = crashflag || CubeProbe.crashWith(CubeWalls[x]);
  }}
  if (crashflag) { CubeProbe.relaxAng() }

  CubeProbe.newPos();
  CubeProbe.update();

}

