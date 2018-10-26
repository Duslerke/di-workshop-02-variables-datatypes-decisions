function displayscore () {
    textSize(32);
    fill(0, 102, 153);
    text('Food Collected: ' + score, 10, 30);
}

function displayShield () {
    if (!shieldObj.shieldInUse && !shieldObj.shieldReady && shieldFrames <= 60*shieldCoolDown) {
        let shieldpercent = Math.floor(shieldFrames/(60*shieldCoolDown)*100);
        textSize(32);
        fill(255, 255, 255);
        text('Shields Energy: ' + shieldpercent + '%', 500, 30);
    }
    else if (shieldObj.shieldInUse && shieldFrames < 60*shieldDuration) {
        let shieldpercent = Math.floor( (1 - shieldFrames/(60*shieldDuration))*100);
        textSize(32);
        fill(255, 255, 255);
        text('Shield Energy: ' + shieldpercent + '%', 500, 30);
    }
    else {
        textSize(20);
        fill(255, 255, 255);
        text('Shield Energy: ' + 100 + '%', 500, 30);
        fill(130,0,0);
        text('Shields Ready', 700, 30);
    }
}

function infoDisplay () {
    displayscore();
    displayShield();
    text(frames, 40, height / 2);

}


