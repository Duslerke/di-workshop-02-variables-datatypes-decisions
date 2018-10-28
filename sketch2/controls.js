

class CargoShip {
    constructor (frameArray) {
        this.framedur = 0.15;
        this.frameArray = frameArray;
        this.frameNumb;
    }

    draw () {
        this.frameNumb = Math.floor(testFrames/(60*this.framedur));

        if (this.frameNumb > this.frameArray.length - 1) { //reset animation
            this.frameNumb = 0;
            testFrames = 0;
        }
        // console.log(testFrames, testFrames/(60*this.framedur));
        image(this.frameArray[this.frameNumb], 0, 0, 52, 128);

    } // write tracking script for cargoship...the more efficient one
}

function runControls () { //let's player test out the controls and kind of runs the game
    background (r,g,b);
    testCargo.draw();
    testFrames++;
}

// function wiper () { // wipes gamestate from memory clean. 

// } //Needs to wipe out scared allien array, 

var testCargo = new CargoShip (cargoShip);