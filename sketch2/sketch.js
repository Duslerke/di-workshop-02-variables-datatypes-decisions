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

var recarray = [-30, -20, 0, 0]; // x,y, sx, sy;
var ellarray = [0,0,0,0];

function setup() {
  createCanvas(1200, 700)
// frameRate(1);
  background(r, g, b)
}

function directionfix(target, seeker) { // once hunter passes target, it wonders off to infinity. This function is here to fix that

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

function tracker (maxspeed, target, seeker) {

  var XYSpeedlimits = universalSpeedLimit(maxspeed, target, seeker);
  var truedist = distance(target, seeker);
  var singleloop = false;
  console.log(truedist);
  if ( speedlimit >= truedist[2] && !flickerfix){
    recarray[2] = 0;
    recarray[3] = 0;
    recarray[0] = ellarray[0];
    recarray[1] = ellarray[1];
    if ((mousetemp[0] != mouseX || mousetemp[1] != mouseY) && singleloop){

      flickerfix = true;
    }
    singleloop = true; //still withinn if statment... checks whether it was executed at least once before turning it off.
    // This should create a single frame lag.
  }
  else {
    recarray[2] = XYSpeedlimits[0];
    recarray[3] = XYSpeedlimits[1]; //temporary nonsense

    recarray[0] = recarray[0] + recarray[2]; //x
    recarray[1] = recarray[1] + recarray[3]; //y
  }
  
  mousetemp[0] = mouseX;
  mousetemp[1] = mouseY;
}

function draw() {
  // fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
  z=z+0.017;
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
  
  
  rotate(z);
  rect(0,0, 30, 30);
  pop();

  ellipse(ellarray[0], ellarray[1], 15, 15);
}
