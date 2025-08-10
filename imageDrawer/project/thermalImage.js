const thermalImage = {
    init: () => {
        _.holder_thermal.dObj = new createjs.Shape();
        _.holder_thermal.addChild(_.holder_thermal.dObj);

        thermalImage.clear()
        thermalImage.drawPreset(_.holder_thermal)
    },

    clear: () => {
        let dObj = _.holder_thermal.dObj

        dObj.uncache();
        dObj.graphics.clear();
    },

    drawPreset: (holder) => {
        let dObj = holder.dObj;

        dObj.graphics.moveTo(0, 0);
        props.pixelSize = 1;

        const w = props.thermal.width;
        const h = props.thermal.height;

        let xGraph = w //floor(((400 / 10) * props.pixelMulti))
        let yGraph = h //floor(((271 / 10) * props.pixelMulti))

        for(let i = 0; i <= xGraph; i += props.pixelSize){
            for(let ii = 0; ii <= yGraph; ii += props.pixelSize){
                let thisColour = thermalImage.getColour(i, ii);
                thermalImage.drawPixel(dObj, thisColour, i, ii);
            };
        };

        let blurFilter = new createjs.BlurFilter(2,2,2);
        dObj.filters = [blurFilter];

        dObj.cache(0, 0, w, h);
    },

    getColour: (x, y) => {
        let tempMag;
        let arrayNum;
        let thisTemp;
    
        // Calc array num from coords
        arrayNum = ((props.thermal.height * x) + y);
        thisTemp = tempVals[arrayNum];

        if (thisTemp < 25) { thisTemp = 0}
    
        let emm = 1

        // Calc temp magnitude from range
        let thisTempSpan = inverse_between(props.range.min, props.range.max, thisTemp);
        let thisTempSpanLimited = limit(0, 1, thisTempSpan);
        tempMag = roundTo(between(0, 1, thisTempSpanLimited + (1 - (1 * (emm)))), 2);
        
        if(tempMag > 1){
            tempMag = 1;
        } else if(tempMag < 0){
            tempMag = 0;
        };
        
        // Get colour from spectrum and return 
        let colourMod = roundTo(((tempMag)*100), 0);
        if(colourMod < 0) colourMod = 0;
        let colourTag = 'colour_' + colourMod;
        
        let thisColourObj2 = tempColours[colourTag];

        if(!thisColourObj2) return

        let red2 = thisColourObj2.r;
        let green2 = thisColourObj2.g;
        let blue2 = thisColourObj2.b;
        let alpha2 = thisColourObj2.a;
        let thisColour = 'rgba(' + red2 + ', ' + green2 + ', ' + blue2 + ', ' + alpha2 + ')';
    
        return thisColour
    },
    
    drawPixel: (holderDObj, thisColour, x, y) => {
        let dObj = holderDObj.graphics;
        let pixelSize = props.pixelSize;
    
        dObj.setStrokeStyle(1);
        dObj.beginStroke(thisColour);
        dObj.beginFill(thisColour);
        dObj.drawRect(x - (pixelSize/2), y - (pixelSize/2), pixelSize, pixelSize);
    }
}