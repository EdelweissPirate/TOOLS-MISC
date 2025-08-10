var fs = require('fs');
const Path = require('path');
var Jimp = require('jimp');

//npm install --save jimp

//WRITES BW HEAT MAP COLOUR VALUES TO JS OBJECT

const imageFile = '../images/heatMap.jpg';
const nameFile2 = '../heatMapVals.txt';

let valArray = [];

Jimp.read(imageFile, (err, image) => {
    if (err) throw err;

    //reads big black and white map
    for(let i = 0; i <= 363; i++){
        for(let ii = 0; ii <= 270; ii++){
            letcolourHex = image.getPixelColour(i, ii);
            letcolourRGBA = Jimp.intToRGBA(colourHex);
            valArray.push('col_' + i + '_row_' + ii + ': ' + 
                '{ r: ' +colourRGBA.r + ', g: ' +colourRGBA.g + ', b: ' +colourRGBA.b + ', a: ' +colourRGBA.a + ' }'
            );
        };
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


