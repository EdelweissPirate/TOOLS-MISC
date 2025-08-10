const fs = require('fs');
const path = require('path');

const image_names = [
    "bg_city_1.jpg",
    "walls_city_1.png",
];

const image_paths = image_names.map(el => {
    return path.join(__dirname, "images/" + el);
})

// Function to convert image to base64 and log the size
function convertImageToBase64(imagePath) {
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        console.log("Image Path: ", imagePath + "\n");

        // Convert the image data to a base64 string
        const base64Image = data.toString('base64');
        // console.log('Base64 Image String:');
        // console.log(base64Image);

        // Log the size of the Base64 string
        const base64Size = Buffer.byteLength(base64Image, 'utf8');
        console.log(`Size of Base64 String: ${base64Size} bytes` + "\n");
        console.log("-------------------------------");
    });
}

image_paths.forEach(el => {
    // Call the function
    convertImageToBase64(el);
})