var flipTheColorWheel = true; //flip or not?
var flipdir;
if (flipTheColorWheel) {
    flipdir = -1;
} else {
    flipdir = 1;
}

var circDisplaceX = 0;
var circDisplaceY = 75;
// add displace the circle so you could get more red...if cricle moves down, while fliped .. more % screen is red

function centerToMouseAngle (objectCoords, mode='angle') {
  
    var xStrich = objectCoords[0] - canvaWidth/2 - circDisplaceX;   //x ...
    var yStrich = objectCoords[1] - canvaHeight/2 - circDisplaceY; //y mouse coordinates with respect to canvas center
    yStrich = flipdir*yStrich;
    var rStrich = Math.sqrt(xStrich**2 + yStrich**2); //radius vector length in translated coordinates

    if (mode.toLowerCase() == 'radius') {
        return rStrich;
    }
    else{
        var cmAngle;

        if (xStrich >= 0) { //angles 270deg --> 90deg
            cmAngle = Math.asin( yStrich/rStrich );
        }
        else { //angles 90deg -->270 deg
            cmAngle = Math.PI - Math.asin( yStrich/rStrich );
        }
    
        var cmAngleDeg = 180*cmAngle/Math.PI;
        if (cmAngleDeg < 0){ //negative arcsin angle recalculation
            cmAngleDeg = 360 + cmAngleDeg;
        }
        // console.log(cmAngleDeg);
        return cmAngleDeg;
    }
}

function Coloriser (objectCoords) {
    var degAngle = centerToMouseAngle(objectCoords);
    var zonalR = 255;
    var zonalG = 255;
    var zonalB = 255;
    var bonusZoneR;
    var bonusZoneG;
    var bonusZoneB;
    var finalColor = []; // r,g,b

    if (30 <= degAngle && degAngle <= 150) { //100% Red Zone
        if (30 <= degAngle && degAngle <= 90) { //b dec
            bonusZoneB = (1-(degAngle - 30)/60)*255;
            bonusZoneG = 0;
        }
        else{ // 90 --> 150 ,g inc
            bonusZoneG = ((degAngle - 90)/60)*255;
            bonusZoneB = 0;
        }
        finalColor[0] = zonalR;
        finalColor[1] = bonusZoneG;
        finalColor[2] = bonusZoneB;
    } 
    else if (150 <= degAngle && degAngle <= 270) { //100% Green Zone
        if (150 <= degAngle && degAngle <= 210) { //r dec
            bonusZoneR = (1-(degAngle - 150)/60)*255;
            bonusZoneB = 0;
        }
        else{ // 210 --> 270 ,b inc
            bonusZoneB = ((degAngle - 210)/60)*255;
            bonusZoneR = 0;
        }
        finalColor[0] = bonusZoneR;
        finalColor[1] = zonalG;
        finalColor[2] = bonusZoneB;
    } 
    else { //100% Blue Zone
        if (270 <= degAngle && degAngle <= 330) { //g dec
            bonusZoneG = (1-(degAngle - 270)/60)*255;
            bonusZoneR = 0;
        }
        else if (330 <= degAngle && degAngle <= 360){ //r inc
            bonusZoneR = ((degAngle - 330)/60)*255;
            bonusZoneG = 0;
        }
        else { // 0 --> 30
            bonusZoneR = ((30 + degAngle - 0)/60)*255; //r inc
            bonusZoneG = 0;
        }
        finalColor[0] = bonusZoneR;
        finalColor[1] = bonusZoneG;
        finalColor[2] = zonalB;
        // console.log(finalColor, degAngle);
    }
    rBrightener(objectCoords);
    return finalColor;

    function rBrightener (objectCoords) {
        var distance = centerToMouseAngle(objectCoords, 'radius');
        var offset = 1;
    
        finalColor[0] += (10000/(distance+offset)**1); //10000 = wanted bright* at wanted radius^1 10000= 200*50
        finalColor[1] += (10000/(distance+offset)**1);
        finalColor[2] += (10000/(distance+offset)**1); // if i want to add 100 at 49px radius
    }
}

// Add a "brightener" function, which would brighten all the colors closer to the center

