const redraw = {
    init: () => {
        _.dObj = new createjs.Shape()
        _.addChild(_.dObj)

        redraw.clear()
        redraw.update()
    },

    clear: () => {
        // let dObj = _.dObj;

        // dObj.uncache();
        // dObj.graphics.clear();
    },

    update: () => {
        let dObj = _.dObj.graphics;

        // Create an off-screen canvas
        let offScreenCanvas = document.createElement('canvas');
        let offScreenContext = offScreenCanvas.getContext('2d');

        // Set the off-screen canvas size
        offScreenCanvas.width = 363 * 3; // 3 times width
        offScreenCanvas.height = 270 * 3; // 3 times height

        // Draw the content on the off-screen canvas
        offScreenContext.scale(3, 3); // Scale the drawing context
        redraw.drawContent(offScreenContext);

        // Draw the scaled content onto the main canvas
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');

        // dObj.clear();
        context.drawImage(offScreenCanvas, 0, 0);

        // Uncomment the following lines if you want to apply a blur filter
        // let blurFilter = new createjs.BlurFilter(3, 3, 2);
        // dObj.filters = [blurFilter];
        // _.dObj.cache(0, 0, 363, 270);
    },

    drawContent: (context) => {
        let xGraph = floor(36.3 + ((363 / 10) * props.pixelMulti));
        let yGraph = floor(27 + ((270 / 10) * props.pixelMulti));
    
        for (let i = 0; i <= xGraph; i += props.pixelSize) {
            for (let ii = 0; ii <= yGraph; ii += props.pixelSize) {
                let thisColour = redraw.getColour(i, ii);
                redraw.drawPixel(context, thisColour, i, ii);
            }
        }
    },

    getColour: (x, y) => {
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

        thisTemp = activeVals[arrayNum];

        // Calc temp magnitude from range
        let thisTempSpan = inverse_between(7, 34, thisTemp);
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
        
        let thisColourObj2 = colours[colourTag];

        if(!thisColourObj2) return

        let red2 = thisColourObj2.r;
        let green2 = thisColourObj2.g;
        let blue2 = thisColourObj2.b;
        let alpha2 = thisColourObj2.a;
        let thisColour = 'rgba(' + red2 + ', ' + green2 + ', ' + blue2 + ', ' + alpha2 + ')';
    
        return thisColour
    },
    
    drawPixel: (context, thisColour, x, y) => {
        // let dObj = thermalImage;
        let pixelSize = props.pixelSize;
    
        context.strokeStyle = thisColour //setStrokeStyle(1);
        // context.beginStroke(thisColour);
        context.fillStyle = thisColour
        context.fillRect(x - (pixelSize/2), y - (pixelSize/2), pixelSize, pixelSize);
        // context.drawRect(x - (pixelSize/2), y - (pixelSize/2), pixelSize, pixelSize);
    }
}