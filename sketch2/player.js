class Player { //I'm yet to instantiate one, though
  constructor (alive) {
    this.playercoord =[];
    this.alive = alive;
    this.shieldReady = true;
    this.shieldInUse = false;
    this.rateOfFire = 20; //this should be a value stored in database of all bullets
  }
  //power ups and shit
  move () {
    this.playercoord[0] = mouseX;
    this.playercoord[1] = mouseY;
  }

  draw () {
    this.move();
    fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
    ellipse(this.playercoord[0], this.playercoord[1], 14, 14);
  }

  shoot () {       //create another bullet - need rate of fire...
    
    if (keyIsPressed && frames > 60/this.rateOfFire) { // need to make this more ellegant ... create a function for frame calc
      
      switch (key) {
        case "a" : 
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], -1, 0], true)); //what if you called a function for bullet creation...and that function would have multiple bullets..based on power up?
        frames = 0;
        break;
        case "d" :  
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], 1, 0], true));
        frames = 0;
        break;
        case "w" :
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], 0, -1], true));
        frames = 0;
        break;
        case "s" :
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], 0, 1], true));
        frames = 0;
        break;
      }
    }
  }

  shield () {
    if (this.shieldReady && keyIsPressed && key == "e") { //I know code is shit.. I'm writing it in 02:01 in the morning
      this.shieldReady = false;
      this.shieldInUse = true;
      shieldFrames = 0;
    }
    if (this.shieldInUse && shieldFrames > 60*shieldDuration) {
      this.shieldInUse = false;
      shieldFrames = 0;
    }
    if (!this.shieldInUse && !this.shieldReady && shieldFrames > 60*shieldCoolDown) {
      this.shieldReady = true;
      shieldFrames = 0;
    }
  }

}