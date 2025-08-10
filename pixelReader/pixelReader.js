var fs = require('fs');
const Path = require('path');
var Jimp = require('jimp');

//npm install --save jimp

const imageFile = './images/image_0.png';
// const nameFile2 = './tempSpan.txt';
const nameFile2 = './pixelData.txt';

let valArray = [];

Jimp.read(imageFile, (err, image) => {
    if (err) throw err;

    for(let i = 1; i <= 814; i++){
        for(let ii = 1; ii <= 525; ii++){
            let colourHex = image.getPixelColour(i, ii);
            let colourRGBA = Jimp.intToRGBA(colourHex);
            valArray.push(' col_' + i + '_row_' + ii + ': ' + 
                '{ r: ' + colourRGBA.r + ', g: ' + colourRGBA.g + ', b: ' + colourRGBA.b + ', a: ' + colourRGBA.a + ' }'
            );
        };
    };

    console.log("Fixing commas...");
    for(let i = 0; i <= valArray.length - 1; i++){
        let thisVal = valArray[i];
        valArray[i] = valArray[i].concat('\n');
        if(thisVal.charAt(0) == ','){
            valArray[i] = valArray[i].replace(thisVal.charAt(0), '');
        };
    };

    console.log("Writing text file...");
    try{
        fs.writeFileSync(nameFile2, String(valArray));
    }catch(e){
        console.log("Failed to rewrite", e);
        process.exit(0);
    };

    console.log('done.');
});


//attempt 2 - JSON?
// var Jimp = require('Jimp');
// var fs = require('fs');

// // Create two-dimensional pixels rgb array based on png image
// Jimp.read('240p.png')
//     .then(image => {
//     var width = image.bitmap.width;
//     var height = image.bitmap.height;
//     var pixels = [];
//     for (var y = 0; y < height; y++) {
//         var rowPixels = [];
//         for (var x = 0; x < width; x++) {
//         var pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
//         rowPixels.push(`${pixel.r}, ${pixel.g}, ${pixel.b}`);
//         }
//         pixels.push(rowPixels);
//     }
//     fs.writeFile('INPUT_DATA.json', JSON.stringify({ data: pixels }), 'utf8', err => {
//         if (err) { throw err; }
//         }
//     );
//     })
//     .catch(err => { throw err; });
