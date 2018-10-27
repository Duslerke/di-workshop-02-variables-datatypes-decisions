var durationAfterLoss = 0;


function runGameOver () {
    cursor(ARROW);

    if(frames > 60*durationAfterLoss){ // no more abrupt screenSaver - it will be delayed of some amount of seconds
        screenSaver();
    }

    textSize(62);
    fill(255, 255, 255);
    text('Game Over! Your score: ' + score, 250, 200); //need some sort of timer to make it less abrupts
    replay.draw();

    if (mouseIsPressed){
        replay.click();
    }
    // console.log(frames);
    frames++;
}

function screenSaver (){
    var randDotX = canvaWidth*Math.random();
    var randDotY = canvaHeight*Math.random(); 

    // fill(mouseY/2, 255-Math.sqrt(mouseX*mouseY/6), mouseX/3);
    // fill(randDotY/2, 255-Math.sqrt(randDotX*randDotY/6), randDotX/3-100); //remove -100 to get original no red
    var randArray = [randDotX,randDotY];
    // var randArray = [mouseX,mouseY];

    var coloray = Coloriser(randArray);
    fill(coloray[0],coloray[1],coloray[2]);

    ellipse(randDotX, randDotY, 14,14);
}

