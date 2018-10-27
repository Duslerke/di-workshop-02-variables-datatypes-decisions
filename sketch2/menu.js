

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