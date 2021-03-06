// lines starting with // are comments - the computer ignores them
// other lines are commands that the computer runs
var screenstate = "menu";

var r = 80
var g = 120
var b = 90
var z = 0;

var speedlimit = 1;
var flickerfix = false;


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



// var planetAni = [];

//preload

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


var replay = new Button ("menu", "Try Again!", canvaWidth/2 -50, canvaHeight/2 +25, 100, 50, [120,40,0]);





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
    case "controls":
      runControls();
      break;
  }
}


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


