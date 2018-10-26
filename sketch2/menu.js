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

  function runmenu () {
    background(r,g,b);
    startgame.draw();
    fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
    playerOne.draw();
  
    if (mouseIsPressed){
      startgame.click();
    }
    // screenstate = "game";
  }