var fs = require('fs');
const Path = require('path');
var Jimp = require('jimp');

//CMD
// node --max-old-space-size=8192 pixelReader_big

//npm install --save jimp

const imageFile = './images/transformer_highres.jpg';
// const nameFile2 = './tempSpan.txt';
const nameFile2 = './pixelData3.json';

let valArray = [];

Jimp.read(imageFile, (err, image) => {
    if (err) throw err;

    console.log('Reading pixels...')
    for(let i = 1; i <= 4256; i++){
        for(let ii = 1; ii <= 2832; ii++){
            let colourHex = image.getPixelColour(i, ii);
            let colourRGBA = Jimp.intToRGBA(colourHex);
            valArray.push('"c_' + i + '_r_' + ii + '": ' + 
                '[' + colourRGBA.r + ', ' + colourRGBA.g + ', ' + colourRGBA.b + ', ' + colourRGBA.a + ']'
                // '{ "r": ' + colourRGBA.r + ', "g": ' + colourRGBA.g + ', "b": ' + colourRGBA.b + ', "a": ' + colourRGBA.a + ' }'
            );
        };
    };

    console.log("Fixing commas...");
    for(let i = 0; i <= valArray.length - 1; i++){
        let thisVal = valArray[i];
        // if(i < 20) console.log(valArray[i])

        valArray[i] = valArray[i].concat('\n');
        if(thisVal.charAt(0) == ','){
            valArray[i] = valArray[i].replace(thisVal.charAt(0), '');
        };
        // if(i < 20) console.log('amended:', valArray[i])
    };

    console.log("Writing text file...");

    appendToFile(nameFile2, '{\r')

    for(let i = 0; i <= 1206; i++){
        let tempArray = []
        let countMod = 10000 * i

        for(let ii = 0 + (countMod); ii <= 9999 + (countMod); ii++){
            if(valArray[ii]){
                tempArray.push(valArray[ii])
            } else {
                break
            }
        };

        let toBeWritten = String(tempArray) + ','

        appendToFile(nameFile2, toBeWritten)
    };

    appendToFile(nameFile2, '\r}')

    console.log('done.');
});

function appendToFile (fileName, content){
    try{
        fs.appendFile(fileName, content, function(err){
            if(err) throw err;
        });
    }catch(e){
        console.log("Failed to rewrite \r", e);
        process.exit(0);
    };
}
