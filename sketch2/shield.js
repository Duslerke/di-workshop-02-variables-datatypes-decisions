class Shields {
    constructor(){
        this.shieldCoords = []; //x,y
        this.shieldReady = true;
        this.shieldInUse = false;
        this.shieldSize = 34;
    }

    draw() {
        if (this.shieldInUse) {
            this.move();
            fill(0, 150, 170);
            ellipse(this.shieldCoords[0], this.shieldCoords[1], this.shieldSize, this.shieldSize); //player is 14
            fill(r,g,b);
            ellipse(this.shieldCoords[0], this.shieldCoords[1], this.shieldSize*0.9, this.shieldSize*0.8);
        }
    }

    move() {
        this.shieldCoords[0] = playerOne.playercoord[0];
        this.shieldCoords[1] = playerOne.playercoord[1];
    }

    shieldsCheck () {
        if (this.shieldReady && keyIsPressed && key == "e") { //I know code is shit.. I'm writing it in 02:01 in the morning
            this.shieldReady = false;
            this.shieldInUse = true;
            shieldFrames = 0;
        }
        this.shieldsDur();
        this.shieldCooldown();
    }

    shieldsDur(){
        if (this.shieldInUse && shieldFrames > 60*shieldDuration) {
            this.shieldInUse = false;
            shieldFrames = 0;
        }
        this.draw();
    }

    shieldCooldown(){
        if (!this.shieldInUse && !this.shieldReady && shieldFrames > 60*shieldCoolDown) {
            this.shieldReady = true;
            shieldFrames = 0;
        }
    }
} //is it worth it? No, but looks cool




