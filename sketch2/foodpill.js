class Foodpill {
    constructor(coordis, sizea, sizeb, hitarr, pillIndex, alive) { // [x,y] , a,b , [xl,xr, yt, yb], index, bool
      this.coordis = coordis;
      this.sizea = sizea;
      this.sizeb = sizeb;
      this.hitarr = hitarr;
      this.pillIndex = pillIndex;
      this.alive = alive;
    }
    pillDeath (){
      this.alive = false; //I know... this code is shit..unfortunatelly my past self didn't.
      foodArrayAlive[this.pillIndex]=this.alive;
      score++;
      scoreincr++;
      foodpillsadd();
      incrementer();
    }
    draw(){
      // console.log(this.sizea, this.sizeb);
      if (this.alive==true) {
        fill(170,170,0);
        rect(this.coordis[0],this.coordis[1], this.sizea, this.sizeb);
      }
    }
      mfcollision () { //mouse-food collision. foodcoord = hitarr
      if ( ( (this.hitarr[0]<=mouseX+7)&&(this.hitarr[1]>=mouseX-7) ) && ( (this.hitarr[2]<=mouseY+7)&&(this.hitarr[3]>=mouseY-7) ) ) { //ellipse radius = 7
        this.pillDeath();
        //play sound or smth.
      }
    }
    // ellipse(coords[0],coords[1], sizea, sizeb);    not ready yet.
  }

  function foodpillsadd () { //move it outside the draw
    for (let w=0; w < nofood; w++){
      if (foodArrayAlive[w]==false){
        foodArrayAlive[w] = true;
        pillNO = w;
        break; //                       ------------You could makes this a shoot function-----------------
     }   //                    all it does is makes projectile objects alive. So you could shoot them.
    }
    foodpillscreate();
  }
  
  function foodpillscreate() { // set index
    var pillcoordinate = [(canvaWidth-100)*Math.random()+50, (canvaHeight-100)*Math.random()+50]; //change to canvas variables later
    var sizea = 10;
    var sizeb = 20;
    var hitbo = hitarr(pillcoordinate, sizea, sizeb);
    foodObjRef[pillNO] = new Foodpill(pillcoordinate, sizea, sizeb, hitbo, pillNO, foodArrayAlive[pillNO]);
  }
  
  function hitarr(coordis, sizea, sizeb) { //for rectangle  xleft, xright, ytop, ydown
    var hittb = [];
    hittb[0] = coordis[0];
    hittb[1] = coordis[0] + sizea;
    hittb[2] = coordis[1];
    hittb[3] = coordis[1] + sizeb; //assuming that it starts of from top left corner
    
    return hittb;
  }

  function incrementer () { //--------------------------Game controls
    if (scoreincr == 10) {
      speedlimit = speedlimit + 1;
      scoreincr = 0;
      // console.log(speedlimit);
    }
  }