var fs = require('fs');
const Path = require('path');

const textFile = './heatMapVals.txt';

const array1 = fs.readFileSync(textFile).toString();//.replace(/\r\n/g,'\n').split(',\n');
// let array2 = array1.replace
for(let i = 0; i <= array1.length - 1; i++){
    array1[i] = array1[i].replace(/, /g, '').concat(',');
};

console.log(array1);

//console.log("Writing text file...");
// try{
//     fs.writeFileSync(textFile, array1);
// }catch(e){
//    console.log("Failed to rewrite");
//     process.exit(0);
// };

console.log('formatting done.');

//
//const textFile = './tempVals.txt';

//const array1 = fs.readFileSync(textFile).toString().split('\n');

// for(let i = 0; i <= array1.length - 1; i++){
//    const oldVal = array1[i]
//     //console.log("oldVal: ", oldVal)
//    const newVal = oldVal.replace(/, /g, '')//.concat(',');
//     array1[i] = newVal.replace(',', '')
//     //console.log("newVal: ", array1[i])
// };

// //console.log(array1);

//console.log("Writing text file...");
// try{
//     fs.writeFileSync(textFile, array1.toString().replace(/, /g, ', \n'));
// }catch(e){
//    console.log("Failed to rewrite");
//     process.exit(0);
// };

//console.log('done.');