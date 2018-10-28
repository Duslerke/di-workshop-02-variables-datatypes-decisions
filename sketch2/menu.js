var canvaWidth = 1200;
var canvaHeight = 600;

var gravAccell = 1;
var bounceConst = 0.7;


var testscreen = new Button ("test", "Enter Test!", 450, 100, 100, 50, [80,150,0], gravAccell-0.2, canvaHeight/2);
var startgame = new Button ("game", "Start Game", 600, 100, 100, 50, [170,80,0], gravAccell, canvaHeight/2);

function runmenu () {
  background(r,g,b);
  startgame.draw();
  testscreen.draw();
  fill(mouseY, 255-Math.sqrt(mouseX*mouseY), mouseX);
  playerOne.draw();

  if (mouseIsPressed){
    startgame.click();
    testscreen.click();
  }
  // screenstate = "game";
}