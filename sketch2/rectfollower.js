class Rectfollower {
    constructor(coordarray, alive, maxspeed, type) { //coordinates array, boolean alive (draw, not draw) , shapearray
      this.coordarray = coordarray; //initialize based on external conditions.
      this.alive = alive;
      this.maxspeed = maxspeed;
      this.type = type;
      // this.shapearray = shapearray;  //for now let's forget it
    }
   //I no need no stinking method.. sad truth it's tad bit too big.
  
    draw() {
      if (this.alive) {

        this.tracker(speedlimit, playerOne.playercoord, tempfoll.coordarray);
        fill(this.coordarray[1], 255-Math.sqrt(this.coordarray[0]*this.coordarray[1]), this.coordarray[0]);
        push();
        rectMode(CENTER);
        translate(this.coordarray[0],this.coordarray[1]); // I move my square by translate
    
        rotate(this.coordarray[4]-Math.PI/2);
        rect(0,0, 10, 40);
        pop();
      }
    }
    colide() {
      if (mouseX==this.coordarray[0] && mouseY==this.coordarray[1]) {
        lossCond();
      }
    }
  
    death () {
      this.alive = false; // good for now
      // if () {}
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

  
  