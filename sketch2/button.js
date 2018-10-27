class Button {
    constructor(purpose, name, x, y, w, h, rgb, gravAccel = 0, falldepth = (canvaHeight-100)) {
      this.purpose = purpose;
      this.name = name;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.Sy =0;
      this.rgb = rgb;
      this.gravAccel=gravAccel;
      this.falldepth = falldepth;
    }
  
    click () {
      if (((this.x <= mouseX+7)&&(mouseX-7 <= this.x + this.w)) && ((this.y <= mouseY+7)&&(mouseY-7 <= this.y + this.h)))  {
        screenstate = this.purpose;
      }
    }
    draw () {
      this.fall();
      fill(this.rgb[0],this.rgb[1],this.rgb[2]);
      rect(this.x, this.y, this.w, this.h)
      this.description();
    }
    fall () {
  
      if (Math.abs(this.Sy) < 1 && this.y >= this.falldepth-2) {
        this.Sy = 0;
      }
      else{
        this.y = this.y + this.Sy;
        this.Sy = this.Sy + this.gravAccel;
      }
  
      if (this.falldepth-this.y <= this.Sy ) {
        this.y = this.falldepth;
      }
      if (this.y >= this.falldepth) {
        this.Sy = -bounceConst*(this.Sy); //+1
      }
  
    }
    description () {
      textSize(16);
      fill(0, 0, 0);
      text(this.name, this.x + 10, this.y + this.h/2 + 5);
    }
  
  }