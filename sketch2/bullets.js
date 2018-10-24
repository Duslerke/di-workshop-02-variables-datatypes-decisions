class Bullet {
    constructor(bulletCoord, alive) { //add bulletspeed later on, if you add more bullet types
    
      this.bulletCoord = bulletCoord; //x,y, Sx, Sy
      this.bulletspeed = 10;
      this.bulletsize = 5;
      this.alive = alive;
    }
  
    move () {
      //move from shot position
      this.bulletCoord[0] = this.bulletCoord[0] + this.bulletCoord[2]*this.bulletspeed;
      this.bulletCoord[1] = this.bulletCoord[1] + this.bulletCoord[3]*this.bulletspeed;
    }

    outOfBounds () {
      if (this.bulletCoord[0] < 0 || this.bulletCoord[0] > 1000 || this.bulletCoord[1] < 0 || this.bulletCoord[1] > 600) {
        this.alive = false;
        //pop it out of array
      }
    }
  
    draw () {
      if (this.alive) {
        //draw
        this.move(); //moves by default
        this.outOfBounds();
        fill (170, 20, 0);
        ellipse(this.bulletCoord[0],this.bulletCoord[1],this.bulletsize, this.bulletsize);
      }
    }
  }