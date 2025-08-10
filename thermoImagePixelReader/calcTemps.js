var fs = require('fs');
const Path = require('path');
var Jimp = require('jimp');

//npm install --save jimp

const imageFile = './images/heatMap.png';
const nameFile1 = './tempVals.txt';

let valArray = [];
let tempArray = [];

Jimp.read(imageFile, (err, image) => {
    if (err) throw err;

    // Reads big black and white map
    for(let i = 0; i <= 363; i++){
        for(let ii = 0; ii <= 270; ii++){
            let colourHex = image.getPixelColour(i, ii);
            let colourRGBA = Jimp.intToRGBA(colourHex);
            valArray.push(' col_' + i + '_row_' + ii + ': ' + 
                '{ r: ' + colourRGBA.r + ', g: ' + colourRGBA.g + ', b: ' + colourRGBA.b + ', a: ' + colourRGBA.a + ' }'
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

        // Convert colour value from 0 to 1 (black to white) i.e. temp magnitude
        let colourSum = red + green + blue;
        let colourSumSpan = inverse_between(0, 765, colourSum);
        let cSumSpanLimited = limit(0, 1, colourSumSpan);
        let tempMag = roundTo(between(0, 1, cSumSpanLimited), 2);

        // Convert temp magnitude to temperature
        let tempSpan = inverse_between(0, 1, tempMag);
        let tempSpanLimited = limit(0, 1, tempSpan);
        let thisTemp = between(51, 69, tempSpanLimited);
        
        tempArray.push(thisTemp);
    };

    // Remove spaces
    console.log("Fixing spaces...");
    for(let i = 0; i <= tempArray.length - 1; i++){
        let thisValString = String(tempArray[i]);
        // console.log('here: ', thisValString);
        tempArray[i] =  ' ' + thisValString.concat(',\n');
    };

    // Write to text file
    console.log("Writing text file...");
    try{
        fs.writeFileSync(nameFile1, tempArray);
    }catch(e){
        console.log("Failed to rewrite");
        process.exit(0);
    };

    console.log('done.');
});

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