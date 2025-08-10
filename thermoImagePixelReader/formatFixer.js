var fs = require('fs');
const Path = require('path');

const textFile = './heatMapVals.txt';

const array1 = fs.readFileSync(textFile).toString();//.replace(/\r\n/g,'\n').split(',\n');
let array2 = array1.replace
for(let i = 0; i <= array1.length - 1; i++){
    array1[i] = array1[i].replace(/, /g, '').concat(',');
};

console.log(array1);

// console.log("Writing text file...");
// try{
//     fs.writeFileSync(textFile, array1);
// }catch(e){
//     console.log("Failed to rewrite");
//     process.exit(0);
// };

console.log('done.');