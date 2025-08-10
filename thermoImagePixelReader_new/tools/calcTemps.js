var fs = require('node:fs');
const Path = require('path');
var Jimp = require('jimp');

//npm install --save jimp

const imageFile = `./images/foil.png`;
const nameFile1 = `./reviewing/tempVals.js`;

let valArray = [];
let tempArray = [];

const min_x = 0 //105 //0
const max_x = 602//725//410//205 //363

const min_y = 0//65 //0
const max_y = 602//600//258//165 //270

const minTemp = 22//10
const maxTemp = 45//30.9

let countdown = 3

let countdownInterval = setInterval(() => {
    if(countdown === 3){
        console.log("Starting in " + countdown + "...")
        countdown--
    } else if(countdown > 0){
        console.log(countdown + "...")
        countdown--
    } else {
        countdown = 0
        clearInterval(countdownInterval)
        readHeatMap()
    }
}, 1000)

function readHeatMap(){
    Jimp.read(imageFile, (err, image) => {
        if (err) throw err;
    
        
        console.log("Reading Black & White heat image...")
    
        // Reads big black and white map
        for(let i = min_x; i < max_x; i++){
            for(let ii = min_y; ii < max_y; ii++){
                let colourHex = image.getPixelColour(i, ii);
                let colourRGBA = Jimp.intToRGBA(colourHex);
                valArray.push('col_' + i + '_row_' + ii + ': ' + 
                    '{ r: ' +colourRGBA.r + ', g: ' +colourRGBA.g + ', b: ' +colourRGBA.b + ', a: ' +colourRGBA.a + ' }'
                );
            };
        };
    
        for(let i = 0; i <= valArray.length - 1; i++){
            let thisColourObj = valArray[i];
            thisColourObj = thisColourObj.split(' {');
            thisColourObj = thisColourObj[1].split(' }');
            thisColourObj = thisColourObj[0];
            
            let getRed = () => {
                let red0 = thisColourObj.split('r: ');
                red0 = thisColourObj.split(', '); 
                red0 = red0[0].trim().replace('r: ', '');
                red0 = Number(red0);
    
                return red0
            };
    
            let getGreen = () => {
                let green0 = thisColourObj.split('g: ');
                green0 = thisColourObj.split(', '); 
                green0 = green0[1].trim().replace('g: ', '');
                green0 = Number(green0);
    
                return green0
            };
    
            let getBlue = () => {
                let blue0 = thisColourObj.split('b: ');
                blue0 = thisColourObj.split(', '); 
                blue0 = blue0[2].trim().replace('b: ', '');
                blue0 = Number(blue0);
    
                return blue0
            };
            
            let red = getRed();
            let green = getGreen();
            let blue = getBlue();
    
            //convertcolour value from 0 to 1 (black to white) i.e. temp magnitude
            let colourSum = red + green + blue;
            let colourSumSpan = inverse_between(0, 765,colourSum);
            let cSumSpanLimited = limit(0, 1,colourSumSpan);
            let tempMag = roundTo(between(0, 1,cSumSpanLimited), 2);
    
            //convert temp magnitude to temperature
            let tempSpan = inverse_between(0, 1, tempMag);
            let tempSpanLimited = limit(0, 1, tempSpan);
            let thisTemp = between(minTemp, maxTemp, tempSpanLimited);
            
            tempArray.push(roundTo(thisTemp, 2));
        };
    
        let tempString = ''
    
        // Remove spaces
        console.log("Fixing spaces...");
        for(let i = 0; i <= tempArray.length - 1; i++){
            let thisValString = String(tempArray[i]);
            tempString += thisValString.concat(',\n');
        };
    
        if(tempString.length > 0){
            // Write to text file
            console.log("Writing text file...");
    
            try{
                fs.writeFileSync(nameFile1, "const tempVals = [\n" + tempString + "]");
            }catch(e){
                console.log("Failed to rewrite. " + e);
                process.exit(0);
            };
    
            console.log('done.');
        } else {
            console.log("Error: No tempString")
        }
    });
}

//Utilities
function round(x){
    return Math.round(x);
};

function roundTo(x,places){
    var rounder = pow(10,places);
    return round(x * rounder)/rounder;
};

function max(x,y){
    return Math.max(x,y);
};

function min(x,y){
    return Math.min(x,y);
};

function between(min,max,n){
    return line_y(n,min,min,max);
};

function inverse_between(min,max,val){
    return 1 - (max - val)/(max - min);
};

function limit(l_bound,u_bound,x){
    var l = min(l_bound,u_bound);
    var u = max(l_bound,u_bound);
    return min(u,max(l,x));
};

function pow(x,n){
    return Math.pow(x,n);
};

function line_y(m,x0,y0,x){
    return m * (x - x0) + y0;
};