class Player { //I'm yet to instantiate one, though
  constructor (alive) {
    this.playercoord =[];
    this.alive = alive;
    this.rateOfFire = 2;
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
    
    if (keyIsPressed && frames > 60) { // need to make this more ellegant ... create a function for frame calc
      
      switch (key) {
        case "a" : 
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], -1, 0], true)); //what if you called a function for bullet creation...and that function would have multiple bullets..based on power up?
        frames = 0;
        break;
        case "d" :  
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], 1, 0], true));
        break;
        case "w" :
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], 0, -1], true));
        break;
        case "s" :
        bulletArray.push(new Bullet ([this.playercoord[0], this.playercoord[1], 0, 1], true));
        break;
      }
    }
  }

  // shield () {}

}