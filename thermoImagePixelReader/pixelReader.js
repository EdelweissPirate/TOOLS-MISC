var fs = require('fs');
const Path = require('path');
var Jimp = require('jimp');

//npm install --save jimp

const imageFile = './images/tempSpan.png';
const nameFile2 = './tempSpan.txt';

let valArray = [];

Jimp.read(imageFile, (err, image) => {
    if (err) throw err;

    //reads big black and white map
    // for(let i = 0; i <= 363; i++){
    //     for(let ii = 0; ii <= 270; ii++){
    //         let colourHex = image.getPixelColour(i, ii);
    //         let colourRGBA = Jimp.intToRGBA(colourHex);
    //         valArray.push(' col_' + i + '_row_' + ii + ': ' + 
    //             '{ r: ' + colourRGBA.r + ', g: ' + colourRGBA.g + ', b: ' + colourRGBA.b + ', a: ' + colourRGBA.a + ' }'
    //         );
    //     };
    // };

    //reads slim temp span
    let rowCount = 0;

    for(let ii = 80; ii >= 0; ii-=0.8){
        let colourHex = image.getPixelColour(4, ii);
        let colourRGBA = Jimp.intToRGBA(colourHex);
        valArray.push('colour_' + rowCount + ': ' + 
            '{ r: ' + colourRGBA.r + ', g: ' + colourRGBA.g + ', b: ' + colourRGBA.b + ', a: ' + colourRGBA.a + ' }'
        );
        rowCount++
    };

    console.log(valArray.length);

    console.log("Fixing commas...");
    for(let i = 0; i <= valArray.length - 1; i++){
        let thisVal = valArray[i];
        valArray[i] = valArray[i].concat(',\n');
        if(thisVal.charAt(0) == ','){
            valArray[i] = valArray[i].replace(thisVal.charAt(0), '');
        };
    };

    console.log("Writing text file...");
    try{
        fs.writeFileSync(nameFile2, valArray);
    }catch(e){
        console.log("Failed to rewrite");
        process.exit(0);
    };

    console.log('done.');
});


