var fs = require('fs');
const Path = require('path');
var Jimp = require('jimp');

//npm install --save jimp

//WRITES SPAN COLOUR VALUES TO JS OBJECT

const imageFile = './images/tempColours_rainbow.png';
const nameFile2 = './reviewing/tempColours.js';

let valArray = [];

Jimp.read(imageFile, (err, image) => {
    if (err) throw err;

    //reads slim temp span
    let rowCount = 0;

    for(let ii = 100; ii >= 0; ii--){
        let colourHex = image.getPixelColour(4, ii);
        let colourRGBA = Jimp.intToRGBA(colourHex);
        valArray.push('colour_' + rowCount + ': ' + 
            '{ r: ' +colourRGBA.r + ', g: ' +colourRGBA.g + ', b: ' +colourRGBA.b + ', a: ' +colourRGBA.a + ' }'
        );
        rowCount++
    };

    console.log("Fixingcommas...");

    let valString = ''

    for(let i = 0; i <= valArray.length - 1; i++){
        let thisValString = String(valArray[i]);
        valString += thisValString.concat(',\n');
    };

    console.log("Writing text file...");

    try{
        fs.writeFileSync(nameFile2, valString);
    }catch(e){
        console.log("Failed to rewrite. " + e);
        process.exit(0);
    };

    console.log('done.');
});


