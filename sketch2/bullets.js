class Bullet {
    constructor(bulletCoord, alive) { //add bulletspeed later on, if you add more bullet types
    
      this.bulletCoord = bulletCoord; //x,y, Sx, Sy
      this.bulletspeed = 10;
      this.bulletsize = 5;
      this.alive = alive;
      this.fakeCoord = [];
    }
  
    move () {
      //move from shot position
      this.bulletCoord[0] = this.bulletCoord[0] + this.bulletCoord[2]*this.bulletspeed;
      this.bulletCoord[1] = this.bulletCoord[1] + this.bulletCoord[3]*this.bulletspeed;

      // console.log( Math.sqrt(this.bulletCoord[0]**2 + this.bulletCoord[1]**2) );

    }

    // this.tracker(speedlimit, playerOne.playercoord, this.coordarray);
    // fill(this.coordarray[1], 255-Math.sqrt(this.coordarray[0]*this.coordarray[1]), this.coordarray[0]);
    // push();
    // rectMode(CENTER);
    // translate(this.coordarray[0],this.coordarray[1]); // I move my square by translate

    // rotate(this.coordarray[4]-Math.PI/2);
    // // tint(255, 122); transparency doesn't work
    // rect(0,0, this.width, this.height);
    // collisionCheck();
    // this.colide();
    // pop();

    hitCheck (index, enemyIndex) {
      // var xleft = rectangleArray[enemyIndex].coordarray[0] - rectangleArray[enemyIndex].width/2;
      // var xright = rectangleArray[enemyIndex].coordarray[0] + rectangleArray[enemyIndex].width/2;
      // var ytop = rectangleArray[enemyIndex].coordarray[1] - rectangleArray[enemyIndex].height/2;
      // var ybot = rectangleArray[enemyIndex].coordarray[1] + rectangleArray[enemyIndex].height/2;
      var xleft = 0 - rectangleArray[enemyIndex].width/2;
      var xright = 0 + rectangleArray[enemyIndex].width/2;
      var ytop = 0 - rectangleArray[enemyIndex].height/2;
      var ybot = 0 + rectangleArray[enemyIndex].height/2;
      

      this.RotatedCoordinates(enemyIndex);

      push();
      rectMode(CENTER);
      translate(rectangleArray[enemyIndex].coordarray[0], rectangleArray[enemyIndex].coordarray[1]);
      rotate(rectangleArray[enemyIndex].coordarray[4]-Math.PI/2);
      if (xleft <= this.fakeCoord[0] && this.fakeCoord[0] <= xright) {
        if (ytop <= this.fakeCoord[1] && this.fakeCoord[1] <= ybot) {
          //rect follower dies
          this.alive = false;
          rectangleArray[enemyIndex].alive = false;
          console.log("Fake: "+this.fakeCoord + " True: "+ [xleft,xright]+ " "+ [ytop, ybot]);
        }
      }
      pop();
    }

    RotatedCoordinates (enemyIndex) { //Bullet coordinates in rotated, translated coordinate systems (rectangle)
      var alphu = rectangleArray[enemyIndex].coordarray[4]-Math.PI/2;
      var xfirst = this.bulletCoord[0] - rectangleArray[enemyIndex].coordarray[0];
      var yfirst = this.bulletCoord[1] - rectangleArray[enemyIndex].coordarray[1];
      this.fakeCoord[0] = (xfirst)*Math.cos(alphu) + (yfirst)*Math.sin(alphu);
      this.fakeCoord[1] = (yfirst)*Math.cos(alphu) - (xfirst)*Math.sin(alphu);
      //it's better to check for bullet-enemy collisions only when bullet is fired: NObullets<NOenemies
    }


    outOfBounds (index) {
      if (this.bulletCoord[0] < 0 || this.bulletCoord[0] > canvaWidth || this.bulletCoord[1] < 0 || this.bulletCoord[1] > canvaHeight) {
        this.alive = false;
      }
    }

    popMeOut (index){ //pops out of array
      bulletArray.splice(index,1); // .splice (index, how many to delete, what to put in ...)
    }
  
    draw () {
      if (this.alive) {
        //draw
        this.move(); //moves by default
        fill (170, 20, 0);
        ellipse(this.bulletCoord[0],this.bulletCoord[1],this.bulletsize, this.bulletsize);
      }
    }
  }