function runGameOver () {
    cursor(ARROW);
    var randDotX = canvaWidth*Math.random();
    var randDotY = canvaHeight*Math.random(); 

    // fill(mouseY/2, 255-Math.sqrt(mouseX*mouseY/6), mouseX/3);
    // fill(randDotY/2, 255-Math.sqrt(randDotX*randDotY/6), randDotX/3);
    var randArray = [randDotX,randDotY];
    // var randArray = [mouseX,mouseY];

    var coloray = Coloriser(randArray);
    fill(coloray[0],coloray[1],coloray[2]);

    ellipse(randDotX, randDotY, 14,14);

    textSize(62);
    fill(255, 255, 255);
    text('Game Over! Your score: ' + score, 250, 350);
}