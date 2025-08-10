const fs = require('fs');

let image, pixelArr

var getPixels = require("get-pixels")

getPixels("./images/resolution_placeholder.png", function(err, pixels) {
    if(err) {
        console.log("Bad image path")
        return
    }
    console.log("got pixels", pixels.data[0])
})

function getImage(){
    
};

function pixelateImage(){
    
};

function storeData(){
    
};
