const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// Dimensions for the image
const width = 1024;
const height = 768;

// Instantiate the canvas object
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

let test

//1
function parseThisShit(){
    try{
        const rawdata = fs.readFileSync('pixelData.json');
        test = JSON.parse(rawdata)

        return console.log(test.c_1_r_1)
    } catch(err){
        return console.log('fucked. \r', err)
    }
    
}

//Try making the pixel sizes bigger so theres less pixel data, you dont feel full res for the drawings
console.log('Parsing JSON...')
parseThisShit()


//2
async function parseThisShit(){
    try{
        const rawdata = fs.readFileSync('pixelData.json');
        test = JSON.parse(rawdata)

        return console.log(test.c_1_r_1)
    } catch(err){
        return console.log('fucked. \r', err)
    }
    
}

console.log('Parsing JSON...')

async function doParse(){
    await parseThisShit()
}

doParse()

// // Fill the rectangle with bg colour
// context.fillStyle = "#80ded0";
// context.fillRect(0, 0, width, height);

// const scales = [0.8, 0.6, 0.5, 0.4, 0.28]
// const distances = ['Nearest', 'Near', 'Regular', 'Far', 'Farthest']
// const pixelisations = [150, 130, 120, 100]
// const resolutions = ['VeryLow', 'Low', 'Medium', 'High']
// const FOVs = ['25mm', '19mm', '13mm', '9mm']

// function generateImages(image) {
//     scales.map((scale, i) => {
//         resolutions.map((res, ii) => {
//             // FOVs.map(fov => {
                
//                 let pix

//                 switch (ii) {
//                     case 0:
//                         pix = (((160 / 1024) * 10) * (10.6))// * 10
//                         break;
//                     case 1:
//                         pix = ((320 / 1024) * 10) * (10.6)
//                         break;
//                     case 2:
//                         pix = ((640 / 1024) * 10) * (10.6)
//                         break;
//                     case 3:
//                         pix = 100
//                         break;
//                 }

//                 context.mozImageSmoothingEnabled = true
//                 context.imageSmoothingEnabled = true
//                 context.webkitImageSmoothingEnabled = true

//                 const xCoord = (context.canvas.width - image.width * scale) / 2
//                 const yCoord = (context.canvas.height - image.height * scale) / 2

//                 //drawImageSmall
//                 const size = (pix/100)
//                 const w = canvas.width * size 
//                 const h = canvas.height * size
//                 context.drawImage(image, 0, 0, w, h)

//                 //drawImageBig
//                 context.msImageSmoothingEnabled = false;
//                 context.mozImageSmoothingEnabled = false;
//                 context.webkitImageSmoothingEnabled = false;
//                 context.imageSmoothingEnabled = false;

//                 context.drawImage(canvas, 0, 0, w, h, xCoord, yCoord, image.width * scale, image.height * scale);

//                 //save image
//                 const buffer = canvas.toBuffer("image/png");

//                 const filename = distances[i] + '_' + resolutions[ii] + '_' + FOVs[0]
//                 fs.writeFileSync("./output/"+ filename + ".jpg", buffer);
//                 console.log(filename + ' saved!')
//             // })
//         })
//     })
// }

// loadImage("./assets/transformer_highres.jpg").then((image) => {
//     generateImages(image)
// });