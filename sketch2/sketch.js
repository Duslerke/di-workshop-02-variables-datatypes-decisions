// lines starting with // are comments - the computer ignores them
// other lines are commands that the computer runs
var screenstate = "menu";

var r = 80
var g = 120
var b = 90
var z = 0;
var canvaWidth = 1200;
var canvaHeight = 600;
var speedlimit = 1;
var flickerfix = false;
var gravAccell = 1;
var bounceConst = 0.7;

var frames = 0;
var enemyFrames = 0;
var ePS = 1; //enemies per second
var shieldFrames = 0;
var shieldDuration = 40;
var shieldCoolDown = 20;
// var temptarget = [-1,0];
// var temptarget = [0,]
var mousetemp = [-900, -900];
var nofood = 5;
var pillNO = 0;
var score = 0;
var scoreincr = 0; // another variable no one wants to have

var recarray = [-30, -20, 0, 0, 0]; // x,y, sx, sy, rotation angle;
var ellarray = [0,0,0,0,0];

var bulletArray = [];
var rectangleArray = [];

var foodArrayAlive = [];
for (let i = 0; i < nofood; i++) {
  foodArrayAlive.push(false);
}
var foodObjRef = [];
for (let i = 0; i < nofood; i++) {
  foodArrayAlive.push('demo');
}


var shipAni = [];
var backAni = [];
// var planetAni = [];

function preload () {
  shipAni[0] = loadImage('./images/intro/pixil-frame-0.png');
  shipAni[1] = loadImage('./images/intro/pixil-frame-1.png');
  // shipAni[1] = loadImage('./images/intro/test.png');

  backAni[0] = loadImage('./images/background/pixil-frame-0.png');
  backAni[1] = loadImage('./images/background/pixil-frame-1.png');
  backAni[2] = loadImage('./images/background/pixil-frame-2.png');
  backAni[3] = loadImage('./images/background/pixil-frame-3.png');
  backAni[4] = loadImage('./images/background/pixil-frame-4.png');
  backAni[5] = loadImage('./images/background/pixil-frame-5.png');
  backAni[6] = loadImage('./images/background/pixil-frame-6.png');

  
  // moonCopy = moon.get();
  // moonCopy.resize(windowWidth,0);
}

// function imageResizer () {

// }

function setup() {
  createCanvas(canvaWidth, canvaHeight)
// frameRate(1);
  background(r, g, b)

  for (let i = 0; i < nofood; i++) {
    foodpillsadd();
  }

  noCursor();

}

var playerOne = new Player(true);

var shieldObj = new Shields();

var startgame = new Button ("game", "Start Game", 600, 100, 100, 50, [170,80,0], gravAccell, canvaHeight/2);

var replay = new Button ("menu", "Try Again!", canvaWidth/2 -50, canvaHeight/2 +25, 100, 50, [120,40,0]);

var testscreen = new Button ("test", "Enter Test!", 450, 100, 100, 50, [80,150,0], gravAccell-0.2, canvaHeight/2);

var introShipAn = new IntroShip ( [100, 200], shipAni );

var introBackground = new Background ( backAni );





// rectangleArray.push(new Rectfollower([canvaWidth, canvaHeight*Math.random(), 1, 1, 0],true,speedlimit,'rocket'));
// rectangleArray.push(new Rectfollower([canvaWidth, canvaHeight*Math.random(), 1, 1, 0],true,speedlimit,"rocket")); //nice test

function rungame () {

  enemyFrames++;
  shieldFrames++;

  background(r, g, b); // food color
  // frameRate(1);

  infoDisplay();

  shieldObj.shieldsCheck();
  playerOne.draw();
  enemyGenerator();

  foodObjRef.forEach((pill) => {
    pill.draw();
    pill.mfcollision();
  });

  rectangleArray.forEach((enemy) => { //draw bullets
    enemy.draw();
  });


  playerOne.shoot();
  
  bulletArray.forEach((bullot) => { //draw bullets
    bullot.draw();
  });


  garbageCollection();
  collisionCheck();

  frames++; //need a function that does this
  
}

function draw() {
  switch (screenstate) {
    case "menu": 
      runmenu(); //create menu
      break;
    case "game":
      rungame();
      break;
    case "gameOver":
      runGameOver();
      break;
    case "test":
      runTest();
      break;
  }
}



function lossCond () {
  if (true && screenstate == 'game') { //if no shield - the later one is for later.
    //the difficult part is making rotating hitbox - need some time on that. Or I could hack --> if (Centers align) {...}
    frames = 0; // reseting time for gameover sreen
    screenstate = "gameOver";
    //maybe just put in while loop... and run it until button is pressed
  }
}

function collisionCheck () {
  for (var i=0; i<bulletArray.length; i++){
    // bulletArray[i].outOfBounds(i);
    for (var eni=0; eni<rectangleArray.length; eni++) {
      bulletArray[i].hitCheck(i, eni);
    }
  }
}


function garbageCollection () {
  for (var i=0; i<bulletArray.length; i++) {
    bulletArray[i].outOfBounds(i);

    if (bulletArray[i].alive == false) {
      bulletArray[i].popMeOut(i);         //pop it out of array
    }
  }
  for (var eni=0; eni<rectangleArray.length; eni++) {
    if ( rectangleArray[eni].alive == false ) {
      rectangleArray[eni].death(eni);
    }
  }
}

function enemyGenerator () {
  if (enemyFrames > 60/ePS) {
    var ranwall = Math.random();
    if(ranwall <= 0.25){ // right wall
      rectangleArray.push(new Rectfollower([canvaWidth, canvaHeight*Math.random(), 1, 1, 0],true,speedlimit,'rocket'));
      enemyFrames=0;
    }
    else if (ranwall <= 0.5){ // left wall
      rectangleArray.push(new Rectfollower([0, canvaHeight*Math.random(), 1, 1, 0],true,speedlimit,'rocket'));
      enemyFrames=0;
    }
    else if (ranwall <= 0.75) { // top wall
      rectangleArray.push(new Rectfollower([canvaWidth*Math.random(), 0, 1, 1, 0],true,speedlimit,'rocket'));
      enemyFrames=0;
    }
    else{
      rectangleArray.push(new Rectfollower([canvaWidth*Math.random(), canvaHeight, 1, 1, 0],true,speedlimit,'rocket'));
      enemyFrames=0;
    }
  }
}


