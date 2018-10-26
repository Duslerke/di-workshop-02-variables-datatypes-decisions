class Rectfollower {
    constructor(coordarray, alive, maxspeed, type) { //coordinates array, boolean alive (draw, not draw) , shapearray
      this.coordarray = coordarray; //initialize based on external conditions.
      this.alive = alive;
      this.maxspeed = maxspeed;
      this.type = type;
      this.width = 10*2;
      this.height = 40;
      // this.shapearray = shapearray;  //for now let's forget it
    }
   //I no need no stinking method.. sad truth it's tad bit too big.
  
    draw() {
      if (this.alive) {

        this.tracker(speedlimit, playerOne.playercoord, this.coordarray);
        fill(this.coordarray[1], 255-Math.sqrt(this.coordarray[0]*this.coordarray[1]), this.coordarray[0]);
        push();
        rectMode(CENTER);
        translate(this.coordarray[0],this.coordarray[1]); // I move my square by translate
    
        rotate(this.coordarray[4]-Math.PI/2);
        // tint(255, 122); transparency doesn't work
        rect(0,0, this.width, this.height);
        this.colide();
        pop();
        // console.log(this.coordarray[4]*(180/Math.PI));
      }
    }
    colide() { // this is exceptional collision - has to be calculated when coord system is altered
      // push();
      // rotate(this.coordarray[4]-Math.PI/2); what if i called collion inside draw, so I wouldn't need to mess with coordinate system twice
      // var spx = 7*Math.cos(this.coordarray[4]+Math.PI); //sphere x Projection from radius vector rectangle--->player
      // var spy = 7*Math.sin(this.coordarray[4]+Math.PI); // same with y

      if ( (this.coordarray[0]-(this.width/2) <= mouseX && mouseX <= this.coordarray[0]+(this.width/2) ) &&(this.coordarray[1]-(this.height/2) <= mouseY && mouseY <= this.coordarray[1]+(this.height/2)) ) {

        if (!shieldObj.shieldInUse) {
          pop();
          lossCond();
        }
        // ADD COOL SHIELD EFFECT!!!

      }
      // idea is that you get hit by front wall anyway.. it's probably the bottom one.
    }
  
    death (index) {
      rectangleArray.splice(index, 1);
    }

    tracker (maxspeed, target) {

        var XYSpeedlimits = universalSpeedLimit(maxspeed, target, this.coordarray);
        var truedist = distance(target, this.coordarray);
        var singleloop = false;
        
        if ( speedlimit >= truedist[2] && !flickerfix){
          this.coordarray[2] = 0;
          this.coordarray[3] = 0;
          this.coordarray[0] = playerOne.playercoord[0];
          this.coordarray[1] = playerOne.playercoord[1];
          if ((mousetemp[0] != mouseX || mousetemp[1] != mouseY) && singleloop){
      
            flickerfix = true;
          }
          singleloop = true; //still within if statement... checks whether it was executed at least once before turning it off.
          // This should create a single frame lag.
        }
        else {
          this.coordarray[2] = XYSpeedlimits[0];
          this.coordarray[3] = XYSpeedlimits[1]; //temporary nonsense for testing..still need acceleration for dodging action
      
          this.coordarray[0] = this.coordarray[0] + this.coordarray[2]; //x
          this.coordarray[1] = this.coordarray[1] + this.coordarray[3]; //y
      
          speeddirection(this.coordarray);
        }
        
        mousetemp[0] = mouseX;
        mousetemp[1] = mouseY;
      }
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

  
  