var testFrames=0;
var wobFrames = -20;
var moveFrames = 0;
var backFrames = 0;

class Background {
    constructor (frameArray) {
        this.framedur = 0.8;
        this.frameArray = frameArray;
        this.frameNumb;
    }

    draw () {
        this.frameNumb = Math.floor(backFrames/(60*this.framedur));

        if (this.frameNumb > this.frameArray.length - 1) { //reset animation
            this.frameNumb = 0;
            backFrames = 0;
        }
        // console.log(testFrames, testFrames/(60*this.framedur));
        image(this.frameArray[this.frameNumb], 0, 0, 1200, 600);

    }
}

class IntroShip {
    constructor (coordArray, frameArray) {
        this.coordArray = coordArray; //x,y,Sx,Sy,R?
        // this.sizeArray = [400, 200]; //w,h
        this.pixelWobble = 10;
        this.framedur = 1/3;
        this.frameArray = frameArray;
        this.frameNumb;
        this.animPerWob = 3;
        // this.animationFrame = 0;
    }

    draw () {
        this.frameNumb = Math.floor(testFrames/(60*this.framedur));
        this.wobble();
        this.moveDiscrete();

        if (this.frameNumb > 1) { //reset animation
            this.frameNumb = 0;
            testFrames = 0;
            // this.wobHappened = true;
        }
        // console.log(testFrames, testFrames/(60*this.framedur));
        // tint(80, 0, 255); // Tint blue
        image(this.frameArray[this.frameNumb], this.coordArray[0], this.coordArray[1], 200, 100);

    }

    // move () {
    //     this.coordArray[0] += 1.3;
    //     // this.coordArray[1] += 1/16;
    // }

    moveDiscrete () {
        if (moveFrames > 60) {
            this.coordArray[0] += 50;
            moveFrames = 0;
        }
    }


    wobble () {
        if (wobFrames == 60*this.framedur*1*this.animPerWob) {
            this.coordArray[1] += this.pixelWobble;
        }
        if (wobFrames == 60*this.framedur*2*this.animPerWob) {
            this.coordArray[1] -= this.pixelWobble;
            wobFrames = 0;
        }
    }
}

function runTest () {
    cursor(HAND);
    background(r,g,b);

    if (keyIsPressed && key == 'q') {
        screenstate = 'menu';
    }

    introBackground.draw();
    introShipAn.draw();

    displayQuit();
    testFrames++;
    wobFrames++;
    backFrames++;
    moveFrames++;
}

function displayQuit () {
    textSize(20)
    var a=Coloriser([mouseX,mouseY])
    fill (a[0],a[1],a[2])
    text('Press q to quit test mode.', 10,30);
}



