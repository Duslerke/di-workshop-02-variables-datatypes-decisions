var position = 100;
var y=100;

// var size = 30;
var restatx = 500;
var restaty = 550;
var oldcx = restatx;
var oldcy = restaty;

//boss coordinates
var bossx = 400;
var bossy = -100;

//--------------------------------------- color of the minibox
var boxesr = 100;
var boxesg = 50;
var boxesb = 10;
//------------------------------------

var prjx = restatx+15;
var prjy = restaty-5;

var bosshealth =100;
var tetdeg = 250;
var teta = tetdeg*(Math.PI)/180;
var spinrad = 75;
var phi = 0;
var wobble;
var wobrad = 7;                 //-----------------------wobble---------------------------
var bspeedx = 3.1;
var bspeedy = 1.9;
var shootdamage = 9 + 3*Math.random(); //boss damage
var bosscoll = 0;

var alive = true;
var airborne = false;
var hit = false;
var bossready = false;
var showdown = false;
var spindown = false;
var killcount;
var tempbx = 0;
var tempby = 0;

var z =0; //----------------------------------testing

var reversed = false;
var boxspeed = 1;
var padspeed = 10;

var miniboxesA = [];
var numbofboxes = 10;
for (var i=0; i < numbofboxes; i++){
  miniboxesA.push(true);
}

var rocketarray = [];                     //----------------------Rocket Array ---------------------------
var numbofrockets = 10;
for (var i=0; i < numbofrockets; i++){
  rocketarray.push(false);
}


var rocketdata = [0,0,0,0,0];  //------------------Test variables
var dircheckx = 0;
var dirchecky = 0;
var rocketl = 10;
var rocketh = 40;
var raccel = 0.1;
var speedlimit = 0.5;
var rocketangle = 0;


function preload() {
  hitsound = loadSound('./sound/beep.mp3', volumeset);
  backsong = loadSound('./sound/runkittyrun.mp3', loaded);
}

function volumeset(){
  hitsound.setVolume(0.2);
}

function loaded(){
  backsong.setVolume(0.1);
  backsong.play();
}

function setup() {
  createCanvas(1000, 600);

}

function draw() {
  background(50);

 //------------------------------------MOVEMENT------------------------------

  if (!reversed) {

    position = position + boxspeed; //computes global x for boxes

    if (position >= 250){ //1000 -720  -30 size... 60space 30 size
      y=y+30;
      reversed = true;
    }
  }
  else{
    position=position-boxspeed;
    if (position <= 0){
      y=y+30;
      reversed=false;
    }
  }

  //----------------------------------End of MOVEMENT-----------------------
 





//----------------------------------------------------------------------------------------------

  //now the condition... if the box is alive, it will be drawn...same goes for all the boxes. 

  if (miniboxesA[0]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+90, y, 30, 30);
  }

  if (miniboxesA[1]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+270, y, 30, 30);
  }

  if (miniboxesA[2]==true) { // need to add +7.5 because of where projectile center is.
    fill(boxesr,boxesg,boxesb);
    rect(position+450, y, 30, 30);
  }

  if (miniboxesA[3]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+630, y, 30, 30);
  }

  if (miniboxesA[4]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+360, y-60, 30, 30);
  }

  if (miniboxesA[5]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position, y+60, 30, 30);
  }

  if (miniboxesA[6]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+180, y+60, 30, 30);
  }

  if (miniboxesA[7]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+360, y+60, 30, 30);
  }

  if (miniboxesA[8]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+540, y+60, 30, 30);
  }

  if (miniboxesA[9]==true) {
    fill(boxesr,boxesg,boxesb);
    rect(position+720, y+60, 30, 30);
  }



 //-----------------------------------Collisions-------------------------------------------------

 if(hit==false&&miniboxesA[0]){
    //this is called flag ... it only looks for collision if there wasn't one before.
    if (  (prjx+7 >= position+90 &&  prjx-7<=position+120 ) && (prjy <= y+30 && prjy>=y-15)  ) {
      hitsound.play();
      hit=true;
      miniboxesA[0]=false;
    }   
 }

 if(hit==false&&miniboxesA[1]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+270 &&  prjx-7<=position+300 ) && (prjy <= y+30 && prjy>=y-15)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[1]=false;
  }   
}

if(hit==false&&miniboxesA[2]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+450 &&  prjx-7<=position+480 ) && (prjy <= y+30 && prjy>=y-15)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[2]=false;
  }   
}

if(hit==false&&miniboxesA[3]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+630 &&  prjx-7<=position+660 ) && (prjy <= y+30 && prjy>=y-15)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[3]=false;
  }   
}

if(hit==false&&miniboxesA[4]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+360 &&  prjx-7<=position+390 ) && (prjy <= y-30 && prjy>=y-75)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[4]=false;
  }   
}

if(hit==false&&miniboxesA[5]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position &&  prjx-7<=position+30 ) && (prjy <= y+90 && prjy>=y+45)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[5]=false;
  }   
}

if(hit==false&&miniboxesA[6]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+180 &&  prjx-7<=position+210 ) && (prjy <= y+90 && prjy>=y+45)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[6]=false;
  }   
}

if(hit==false&&miniboxesA[7]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+360 &&  prjx-7<=position+390 ) && (prjy <= y+90 && prjy>=y+45)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[7]=false;
  }   
}

if(hit==false&&miniboxesA[8]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+540 &&  prjx-7<=position+570 ) && (prjy <= y+90 && prjy>=y+45)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[8]=false;
  }   
}

if(hit==false&&miniboxesA[9]){
  //this is called flag ... it only looks for collision if there wasn't one before.
  if (  (prjx+7 >= position+720 &&  prjx-7<=position+750 ) && (prjy <= y+90 && prjy>=y+45)  ) {
    hitsound.play();
    hit=true;
    miniboxesA[9]=false;
  }   
}

if (!bossready){
  killcount=0;
  for (var i=0; i < numbofboxes; i++){
    if (miniboxesA[i]==false){
      killcount++
      if (killcount=10){  //remove one = to get bug for testing
        bossready=true;
      }
    }
  }
}

 //-------------------------------------End of Collisions-----------------------------------------





 //------------------------Pad controls and projectile movement---------------------
  //end of boxes... start of input
  
  fill(25,0,0); //Player pad
  rect(restatx, restaty, 30, 5);

  
  fill(50,50,0); //Projectile
  ellipse(prjx, prjy, 15,15);

  if(keyIsPressed){
    if (key == "a"){
      restatx=restatx-padspeed;
      if (prjy>=530){
        prjx=prjx-padspeed;
      }
    }
    if (key == "d"){
      restatx=restatx+padspeed;
      if (prjy>=530){
        prjx=prjx+padspeed;
      }      
    }
    if (key == " " && !airborne){
      // prjy=prjy-2;
      airborne = true;
    }
  }
  //------------------------------End of pad controls------------------------------

 //-------------------------------Ball reset after hit---------------------

  if (airborne){
    prjy=prjy-10;
    if (prjy<=0 || hit) {
      airborne=false;
      prjy=restaty-5;
      prjx=restatx+15;
      hit= false;

    }
  }
 //------------------------------End of Ball reset---------------------------
  
   //-------------------------------------Boss Summon + Move-----------------------------------------------
  // fill(77,77,7)
  // rect(500,500,50,40)

  if( bossready && bosshealth > 0 ){
    
    if (bossy < 100 && !showdown){
      bossy = bossy + 1;
      if ( bossy >= 100 ){
        showdown = true;
        spindown = true; //i know it's inverted
        tempbx = bossx - spinrad*Math.cos(teta);
        tempby = bossy - spinrad*Math.sin(teta);
      }
    } else if (showdown && spindown){
      teta = teta - 2*(Math.PI)/180;
      bossx =  spinrad*Math.cos((teta)) + tempbx; // minus teta, because y axis is inverted...making it turn counterclock
      // console.log(bossx);
      bossy =  spinrad*Math.sin((teta)) + tempby;
      if (teta <= ((tetdeg-360)/180)*Math.PI) { //250-360
        spindown=!spindown;
        tempbx = bossx;
        tempby = bossy;
      }
    }
    else {
      phi = phi + 4*(Math.PI)/180;
      wobble = wobrad*Math.sin(phi);
      // wobble = 
      bossx = bossx + wobble + bspeedx;
      bossy = bossy + wobble + bspeedy;

      if (bossx <= 150 || bossx >= 650){
        bspeedx = -bspeedx;
        bosscoll++;
      }
      if (bossy <= 50 || bossy >= 200) {
        bspeedy = -bspeedy;
        bosscoll++;
      }
    }

    fill(255,30,20);
    rect(bossx,bossy, 200, 100);

    if (phi > 0){
      bossx = bossx - wobble;
      bossy = bossy - wobble;
    }
  }
  //----------------------------------------------End of Boss Movement------------------------------------------

  //----------------------------------------------Boss shooting--------------------------------------------------
  //Rocket
  if (bosscoll == 15){ // change rocket frequency here
    bossrocket();
    bosscoll = 0;
  }

  function bossrocket () { //move it outside the draw
    for (var w=0; w < numbofrockets; w++){
      if (rocketarray[w]==false){
        rocketarray[w] = true;
        break; //                       ------------You could makes this a shoot function-----------------
     }   //                    all it does is makes projectile objects alive. So you could shoot them.
    }
  }



  function Homming (rstatus) { //x, y, speedx, speedy, rotation angle.
    dircheckx = Math.sign((restatx + 15) - (rstatus[0] + rocketl/2));
    dirchecky = Math.sign((restaty + 2.5) - (rstatus[1] + rocketh/2)); //doesn't pay off. Starts changing direction only when
    // too late. After he passes... uhm too much speed gained makes it miss.
    // make the calculate the difference in coordinates... and keep subtracting from it:  Rx=Padx+deltax
    //by doing so, you automatically change speed.

    if (rstatus[2]<=speedlimit || rstatus[2]>-speedlimit) {
      rstatus[2] = rstatus[2] + dircheckx*raccel; //raccel = acceleration
    }
    if (rstatus[3]<=speedlimit || rstatus[3]>-speedlimit) { //make it with Math.abs();
      rstatus[3] = rstatus[3] + dirchecky*raccel; //this changes speed
    }


    if (rstatus[2] >= 0) {
      rstatus[4] = Math.asin(rstatus[3]/Math.sqrt( Math.pow(rstatus[2], 2) + Math.pow(rstatus[3], 2) ));
    }
    if (rstatus[3] < 0) {
      rstatus[4] = Math.PI - Math.asin(rstatus[3]/Math.sqrt( Math.pow(rstatus[2], 2) + Math.pow(rstatus[3], 2) ));
    }

    rocketangle = rstatus[4];
    //you got the angle now you need to transform



    rstatus[0] = rstatus[0] + rstatus[2]; //moves the damn thing
    rstatus[1] = rstatus[1] + rstatus[3];
  }

  Homming (rocketdata);
  translate(-rocketl / 2, -rocketh / 2); //this ruins your calculations above, no?
  // rotate(rocketangle);
  // z=z+0.017;
  // rotate(z);
  // p5.rotate(rocketangle)
  rect(rocketdata[0],rocketdata[1], rocketl, rocketh);

  if (keyIsPressed && key == "m") { //-------------------debug cheats
    rocketdata = [mouseX,mouseY,0,0,0];
  }

  function randrocket () {
    // random location and direction  ... rstatus generator
  }



 //-------------------------------------End Boss--------------------------------------------------

 
}


