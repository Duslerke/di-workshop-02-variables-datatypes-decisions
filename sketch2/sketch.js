// lines starting with // are comments - the computer ignores them
// other lines are commands that the computer runs
var screenstate = "menu";

var r = 80
var g = 120
var b = 90
var z = 0;
var speedlimit = 1;
var flickerfix = false;
var gravAccel = 1;
var bounceConst = 0.7;

var frames = 0;
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

var foodArrayAlive = [];
for (let i = 0; i < nofood; i++) {
  foodArrayAlive.push(false);
}
var foodObjRef = [];
for (let i = 0; i < nofood; i++) {
  foodArrayAlive.push('demo');
}

function setup() {
  createCanvas(1200, 700)
// frameRate(1);
  background(r, g, b)

  for (let i = 0; i < nofood; i++) {
    foodpillsadd();
  }

}

 var playerOne = new Player(true);


function directionfix(target, seeker) { //you lose negative signs when squaring distance, so.. once hunter passes target, it wonders off to infinity. This function is here to fix that
                                      
  var xfix = Math.sign(target[0] - seeker[0]);
  var yfix = Math.sign(target[1] - seeker[1]);
  var xyfixarray = [xfix, yfix];
  return xyfixarray;

}

function distance (target, seeker){
  
  var deltax = target[0] - seeker[0];
  var deltay = target[1] - seeker[1];
  var distonce = Math.sqrt( Math.pow(deltax,2) + Math.pow(deltay, 2) );
  var tempdistarray = [deltax, deltay, distonce]; // dx, dy, distance.
  // console.log("p1: " + playerOne.playercoord + " t: " + tempfoll.coordarray);
  // console.log(tempdistarray)


  return tempdistarray;
}

function percentcalc (target, seeker) { // calculates squared dx, dy % with respect to distance;

  var distdata = distance(target, seeker);
  var percentx = Math.pow(distdata[0], 2)/Math.pow(distdata[2],2);
  var percenty = Math.pow(distdata[1], 2)/Math.pow(distdata[2],2);

  var percarray = [percentx, percenty];

  return percarray; // % x,y array
}

function universalSpeedLimit (maxspeed, target, seeker) {

  var speedratios = percentcalc(target, seeker);
  var polarity = directionfix(target, seeker);

  var limitx = polarity[0]*Math.sqrt( Math.pow(maxspeed,2)*speedratios[0] );
  var limity = polarity[1]*Math.sqrt( Math.pow(maxspeed,2)*speedratios[1] );
  var XYlimitArray = [limitx, limity]; // can finally be used in conditional statements;

  return XYlimitArray;
  
}

function speeddirection (seeker) {

  if (seeker[2] >= 0) {
    seeker[4] = Math.asin(seeker[3]/Math.sqrt( Math.pow(seeker[2], 2) + Math.pow(seeker[3], 2) ));
  }
  if (seeker[2] < 0) { //can change to x anyway
    seeker[4] = Math.PI - Math.asin(seeker[3]/Math.sqrt( Math.pow(seeker[2], 2) + Math.pow(seeker[3], 2) ));
  }

}



class Button {
  constructor(purpose, name, x, y, w, h) {
    this.purpose = purpose;
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.Sy =0;
  }

  click () {
    if (((this.x <= mouseX+7)&&(mouseX-7 <= this.x + this.w)) && ((this.y <= mouseY+7)&&(mouseY-7 <= this.y + this.h)))  {
      screenstate = this.purpose;
    }
  }
  draw () {
    this.fall();
    fill(123,145,23);
    rect(this.x, this.y, this.w, this.h)
    this.description();
  }
  fall () {

    if (Math.abs(this.Sy) < 1 && this.y >= 578) {
      this.Sy = 0;
    }
    else{
      this.y = this.y + this.Sy;
      this.Sy = this.Sy + gravAccel;
    }

    if (580-this.y <= this.Sy ) {
      this.y = 580;
    }
    if (this.y >= 580) {
      this.Sy = -bounceConst*(this.Sy); //+1
    }

  }
  description () {
    textSize(16);
    fill(0, 0, 0);
    text('Start Game', this.x + 10, this.y + this.h/2 + 5);
  }

}

var startgame = new Button ("game", "Start Game", 600, 100, 100, 50);

function runmenu () {
  background(r,g,b);
  startgame.draw();
  fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
  ellipse(ellarray[0], ellarray[1], 14, 14);

  if (mouseIsPressed){
    startgame.click();
  }
  // screenstate = "game";
}

var tempfoll = new Rectfollower([1000, 600*Math.random(), 1, 1, 0],true,speedlimit,'rocket')
var tempfoll2 = new Rectfollower([1000, 600*Math.random(), 1, 1, 0],true,speedlimit,'rocket') //nice test


function rungame () {
    // fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
  // z=z+0.017;
  // ellarray[0] = mouseX;
  // ellarray[1] = mouseY;

// console.log(tempfoll.coordarray);
  background(r, g, b) // food color





  displayscore(); //has to be before the full of cursor and trackers

  playerOne.draw();
  tempfoll.draw();
  tempfoll2.draw();

  // need listenForInput () {} function to get shooting, shield, other powers
  playerOne.shoot();

  foodObjRef.forEach((pill) => {
    pill.draw();
    pill.mfcollision();
  });
  
  bulletArray.forEach((bullot) => { //draw bullets
    bullot.draw();
  });

  // need a separate function for drawing shit, collision checking, and so on...

  // text(frameCount, 20, height / 2);
  text(frames, 40, height / 2);
  frames++; //need a function that does this
  // if (frames = 60) {
  //   frames = 0;
  // }

  console.log(bulletArray)
  // tracker(speedlimit, playerOne.playercoord, tempfoll.coordarray); //tracker turi buti po p1, nes p1 nespeja initialise

  //rectangle_object.draw();
  
  // fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
  // push();
  // rectMode(CENTER);
  // translate(recarray[0],recarray[1]); // I move my square by translate

  // rotate(recarray[4]-Math.PI/2);
  // rect(0,0, 10, 40);
  // pop();
  //smth smth

  // fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
  // ellipse(ellarray[0], ellarray[1], 14, 14);

  // lossCond(); instead of this search for collisions for each object
}

function draw() {
  switch (screenstate) {
    case "menu": 
      runmenu(); //create menu
      break;
    case "game":
      rungame();
      break;
  }
}

function displayscore () {
  textSize(32);
  fill(0, 102, 153);
  text('Food Collected: ' + score, 10, 30);
}



function lossCond () {
  if (mouseX==recarray[0] && mouseY==recarray[1]) { //if collision AND no shield - the later one is for later.
    //the difficult part is making rotating hitbox - need some time on that. Or I could hack --> if (Centers align) {...}
    textSize(62);
    fill(255, 255, 255);
    text('Game Over! Your score: ' + score, 250, 350);
    screenstate = "loss";
    //maybe just put in while loop... and run it until button is pressed
  }
}





// function mfcollision (foodbox) { //mouse-food collision. foodcoord = hitarr
//   if ( ( (foodbox[0]<=mouseX+7)&&(foodbox[1]>=mouseX-7) ) && ( (foodbox[2]<=mouseY+7)&&(foodbox[3]>=mouseY-7) ) ) { //ellipse radius = 7
//     this.pillDeath();
//     //play sound or smth.
//   }
// }




