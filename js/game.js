
var CubeProbe;
var myObstacle;

function startGame() {

  CubeProbe = new ProbeComponent(20, 20, "#C59D0D", 20, 300);
  // CubeProbe.angle = Math.PI / 2;

  myObstacle = new WallComponent(10, 200, "green", 100, 120);

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
    this.interval = setInterval(updateGameArea, 20); // every 20th millisecond (50 frames per second)

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
    var cubewidth = this.width/1.414214*Math.cos(Math.PI/4-this.angle);
    var myleft = this.x - cubewidth;
    var myright = this.x + cubewidth;
    var mytop = this.y - cubewidth;
    var mybottom = this.y + cubewidth;
    var otherleft = otherobj.x - (otherobj.width)/2;
    var otherright = otherobj.x + (otherobj.width)/2;
    var othertop = otherobj.y - (otherobj.height)/2;
    var otherbottom = otherobj.y + (otherobj.height)/2;
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) ||
        (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
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
  myObstacle.update();

  CubeProbe.moveAngle = 0;
  CubeProbe.speed = 0;

  if (myGameArea.keys && myGameArea.keys[37]) {CubeProbe.moveAngle = -5; }
  if (myGameArea.keys && myGameArea.keys[39]) {CubeProbe.moveAngle = 5; }
  if (myGameArea.keys && myGameArea.keys[38]) {CubeProbe.speed = 2; }
  if (myGameArea.keys && myGameArea.keys[40]) {CubeProbe.speed = -2; }

  if (CubeProbe.crashWith(myObstacle)) {
    CubeProbe.speed = CubeProbe.speed * (-1);

    var relaxangle = CubeProbe.angle % (Math.PI/2);
    var relax;
    if(relaxangle >0) {
      if(relaxangle < Math.PI/4) {relax = -3} else {relax = 3}
    } else {
      if(relaxangle < -Math.PI/4) {relax = -3} else {relax = 3}
    }
    CubeProbe.angle += relax * Math.PI / 180;
  }

  CubeProbe.newPos();
  CubeProbe.update();

}
