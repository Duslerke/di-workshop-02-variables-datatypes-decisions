
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