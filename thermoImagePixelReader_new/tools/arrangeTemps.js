var fs = require('node:fs');
const Path = require('path');

const textFile = `./reviewing/tempVals.js`
const arrayString = fs.readFileSync(textFile).toString()
const baseArray = arrayString.split(',\n')

//vals to write
let tempsBG = new Array(10201).fill(0) //temps < 59
let tempsCable1 = new Array(10201).fill(0) //temps >= 59 && < 62 + x < 155
let tempsCable2 = new Array(10201).fill(0) //temps >= 65 + x > 155

const atPoint = (x, y) => {
    let arrayNum = (101 * x) + y; // Adjusted for a 100x100 image
    return baseArray[arrayNum];
}

for(let x = 0; x <= 101; x++){
    for(let y = 0; y <= 101; y++){
        const thisTemp = Number(atPoint(x, y))

        let arrayNum = (100 * x) + y;
        
        if(thisTemp < 59){
            tempsBG[arrayNum] = thisTemp
        } else if(thisTemp > 59 && thisTemp < 62 && x < 155){
            tempsCable1[arrayNum] = thisTemp
        } else if(thisTemp >= 65 && x > 155){
            tempsCable2[arrayNum] = thisTemp
        }
    };
};

let tempString = ""
let newFile = `./reviewing/tempValsBG.js`

//BG
console.log("Writing tempsBG...");
for(let i = 0; i <= tempsBG.length - 1; i++){
    let thisValString = String(tempsBG[i]);
    tempString += thisValString.concat(',\n');
};

if(tempString.length > 0){
    // Write to text file
    console.log("Writing text file...");

    try{
        fs.writeFileSync(newFile, tempString);
    }catch(e){
        console.log("Failed to rewrite. " + e);
        process.exit(0);
    };

    console.log('tempsBG done.');
} else {
    console.log("Error: No tempString")
}

//tempsCable1
tempString = ""
newFile = `./reviewing/tempValsCable1.js`

console.log("Writing tempsCable1...");
for(let i = 0; i <= tempsCable1.length - 1; i++){
    let thisValString = String(tempsCable1[i]);
    tempString += thisValString.concat(',\n');
};

if(tempString.length > 0){
    // Write to text file
    console.log("Writing text file...");

    try{
        fs.writeFileSync(newFile, tempString);
    }catch(e){
        console.log("Failed to rewrite. " + e);
        process.exit(0);
    };

    console.log('tempsCable1 done.');
} else {
    console.log("Error: No tempString")
}

//tempsCable2
tempString = ""
newFile = `./reviewing/tempValsCable2.js`

console.log("Writing tempsCable2...");
for(let i = 0; i <= tempsCable2.length - 1; i++){
    let thisValString = String(tempsCable2[i]);
    tempString += thisValString.concat(',\n');
};

if(tempString.length > 0){
    // Write to text file
    console.log("Writing text file...");

    try{
        fs.writeFileSync(newFile, tempString);
    }catch(e){
        console.log("Failed to rewrite. " + e);
        process.exit(0);
    };

    console.log('tempsCable2 done.');
} else {
    console.log("Error: No tempString")
}

// console.log(tempsBG)
// console.log(tempsCable1)
// console.log(tempsCable2)