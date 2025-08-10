const redraw = {
    init: () => {
        let offScreenCanvas = document.createElement('canvas');
        let offScreenContext = offScreenCanvas.getContext('2d');

        // Set the off-screen canvas size
        offScreenCanvas.width = 363 * 3; // 3 times width
        offScreenCanvas.height = 270 * 3; // 3 times height

        // Draw the content on the off-screen canvas
        offScreenContext.scale(3, 3); // Scale the drawing context
        
        for(let i = 1; i <= 24; i++){
            redraw.drawContent(offScreenContext, i);

            // Draw the scaled content onto the main canvas
            let canvas = document.getElementById('canvas');
            let context = canvas.getContext('2d');

            //Blur
            context.filter = 'blur(3px)';

            context.drawImage(offScreenCanvas, 0, 0);

            // Reset filter
            context.filter = 'none';

            // setTimeout(() => {
                // Save the canvas as an image
                let link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'image_' + (6 + i) + '.png';
                link.click();
            // }, 500)
        };
    },

    drawContent: (context, level) => {
        let xGraph = floor(36.3 + ((363 / 10) * props.pixelMulti));
        let yGraph = floor(27 + ((270 / 10) * props.pixelMulti));
    
        for (let i = 0; i <= xGraph; i += props.pixelSize) {
            for (let ii = 0; ii <= yGraph; ii += props.pixelSize) {
                let thisColour = redraw.getColour(i, ii, level);
                redraw.drawPixel(context, thisColour, i, ii);
            }
        }
    },

    getColour: (x, y, level) => {
        let tempMag;
        let arrayNum;
        let thisTemp;
    
        // Calc array num from coords
        arrayNum = ((271 * x) + y);

        const temps = [
            tempVals_0,
            tempVals_1,
            tempVals_2,
            tempVals_3,
            tempVals_4,
            tempVals_5,
            tempVals_6,
            tempVals_7
        ];
    
        const activeVals = temps[0];

        // const level = 0

        const rangeMin = level - 13
        const rangeMax = level + 14

        thisTemp = activeVals[arrayNum];

        // Calc temp magnitude from range
        let thisTempSpan = inverse_between(rangeMin, rangeMax, thisTemp);
        let thisTempSpanLimited = limit(0, 1, thisTempSpan);
        tempMag = roundTo(between(0, 1, thisTempSpanLimited + (1 - 1)), 2);
        
        if(tempMag > 1){
            tempMag = 1;
        } else if(tempMag < 0){
            tempMag = 0;
        };
        
        // Get colour from spectrum and return 
        let colourMod = roundTo(((tempMag)*100), 0);
        if(colourMod < 0) colourMod = 0;
        let colourTag = 'colour_' + colourMod;

        const colours = tempColours
        
        let thisColourObj = colours[colourTag];

        if(!thisColourObj) return

        let red2 = thisColourObj.r;
        let green2 = thisColourObj.g;
        let blue2 = thisColourObj.b;
        let alpha2 = thisColourObj.a;
        let thisColour = 'rgba(' + red2 + ', ' + green2 + ', ' + blue2 + ', ' + alpha2 + ')';
    
        return thisColour
    },
    
    drawPixel: (context, thisColour, x, y) => {
        let pixelSize = props.pixelSize;
    
        context.strokeStyle = thisColour //setStrokeStyle(1);
        context.fillStyle = thisColour
        context.strokeRect(x - (pixelSize/2), y - (pixelSize/2), pixelSize, pixelSize);
        context.fillRect(x - (pixelSize/2), y - (pixelSize/2), pixelSize, pixelSize);
    }
}