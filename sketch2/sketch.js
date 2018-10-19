// lines starting with // are comments - the computer ignores them
// other lines are commands that the computer runs

var r = 80
var g = 120
var b = 90
var z = 0;
var speedlimit = 7;
var flickerfix = false;
// var temptarget = [-1,0];
// var temptarget = [0,]
var mousetemp = [-900, -900];

var recarray = [-30, -20, 0, 0, 0]; // x,y, sx, sy, rotation angle;
var ellarray = [0,0,0,0,0];

function setup() {
  createCanvas(1200, 700)
// frameRate(1);
  background(r, g, b)
}

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

function tracker (maxspeed, target, seeker) {

  var XYSpeedlimits = universalSpeedLimit(maxspeed, target, seeker);
  var truedist = distance(target, seeker);
  var singleloop = false;
  
  if ( speedlimit >= truedist[2] && !flickerfix){
    recarray[2] = 0;
    recarray[3] = 0;
    recarray[0] = ellarray[0];
    recarray[1] = ellarray[1];
    if ((mousetemp[0] != mouseX || mousetemp[1] != mouseY) && singleloop){

      flickerfix = true;
    }
    singleloop = true; //still within if statement... checks whether it was executed at least once before turning it off.
    // This should create a single frame lag.
  }
  else {
    recarray[2] = XYSpeedlimits[0];
    recarray[3] = XYSpeedlimits[1]; //temporary nonsense for testing..still need acceleration for dodging action

    recarray[0] = recarray[0] + recarray[2]; //x
    recarray[1] = recarray[1] + recarray[3]; //y

    speeddirection(seeker);
  }
  
  mousetemp[0] = mouseX;
  mousetemp[1] = mouseY;
}

function draw() {
  // fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
  // z=z+0.017;
  ellarray[0] = mouseX;
  ellarray[1] = mouseY;

  // console.log(recarray);

  tracker(speedlimit, ellarray, recarray);
  // console.log( Math.sqrt(  Math.pow(recarray[2],2)+ Math.pow(recarray[3],2)  ) );

    // console.log("1", recarray[2], recarray[3]);//, Math.sqrt(Math.pow(recarray[2],2)+Math.pow(recarray[3],2)));
//constrain <-- look up .. part pf p5.

  background(r, g, b)

  fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);


  push();
  rectMode(CENTER);
  translate(recarray[0],recarray[1]); // I move my square by translate
  
  
  rotate(recarray[4]-Math.PI/2);
  rect(0,0, 10, 40);
  pop();

  ellipse(ellarray[0], ellarray[1], 15, 15);
}

function recthitbox () {

}

class Rectfollower {
  constructor(coordarray, shapearray, alive, maxspeed, type) { //coordinates array, boolean alive (draw, not draw)
    this.coordarray = coordarray; //initialize based on external conditions.
    this.alive = alive;
    this.maxspeed = maxspeed;
    this.type = type;
    this.shapearray = shapearray;
  }
 //I no need no stinking method.. sad truth it's tad bit too big.
}