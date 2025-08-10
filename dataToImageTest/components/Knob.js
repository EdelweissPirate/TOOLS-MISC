//pressTrigger(knob)
// -> called when knob is pressed

//releaseTrigger(knob)
// -> called when knob is released

function Knob(knob,properties){
    //properties = {
    //  orientation: low/mid/high
    //  enabled:     true/false
    //  glow:       true/false
    //  editable:   true/false
    //}

    knob.properties = {
        dragOn: false,
        A: 0,
        sensorOffset: 11,
        //Defaults:
        orientation: 'low', //low/mid/high
        enabled: true,
        glow: false,
        editable: true
    };

    //Define externally:
    knob.pressTrigger = function(knob){};
    knob.releaseTrigger = function(knob){};


    if(typeof properties !== 'object'){
        properties = {};
    }

    //orientation: 'low', 'mid', 'high'
    if(properties.orientation !== "low" && properties.orientation !== "mid" && properties.orientation !== "high"){
        properties.orientation = "low";
    }
    knob.chevron_low.visible  = (properties.orientation == "low");
    knob.chevron_mid.visible  = (properties.orientation == "mid");
    knob.chevron_high.visible = (properties.orientation == "high");

    if(typeof properties.enabled == "undefined"){
        properties.enabled = true;
    }
    knob.spinner.alpha = 0.5 + 0.5 * properties.enabled;

    if(typeof properties.glow == "undefined"){
        properties.glow = false;
    }
    knob.glower.visible = properties.glow;

    if(typeof properties.editable == "undefined"){
        properties.editable = true;
    }


    // knob.properties = properties;
    knob.properties.orientation = properties.orientation;
    knob.properties.enabled = properties.enabled;
    knob.properties.glow = properties.glow;
    knob.properties.editable = properties.editable;

    // knob.properties.dragOn = false;
    // knob.properties.A = 0;
    // knob.properties.sensorOffset = 11;

    knob.enterFrame = function(){
        if(knob.properties.dragOn){
            let rotation;
            if(knob.sensor.x == 0){
                rotation = 0;
            }else{
                rotation = (
                    180 * Math.atan(knob.sensor.y/knob.sensor.x)/Math.PI + knob.sensor.x/Math.abs(knob.sensor.x) * 90
                );
            }


            knob.glower.rotation =
                knob.spinner.rotation = rotation;
            if(Math.abs(knob.spinner.rotation) > 160){
                knob.glower.rotation =
                    knob.spinner.rotation = 160 * Math.abs(knob.spinner.rotation)/knob.spinner.rotation;
            }
            knob.properties.A = (knob.spinner.rotation + 160)/320;
            switch(knob.properties.orientation){
                case 'mid':
                    knob.properties.A = knob.properties.A * 2 - 1;
                    break;
                case 'high':
                    knob.properties.A = knob.properties.A - 1;
                    break;
            }

        }
    };
    knob.setValue = function(thisValue){
        switch(knob.properties.orientation){
            case 'low':
                knob.spinner.rotation = thisValue * 320 - 160;
                break;
            case 'mid':
                knob.spinner.rotation = thisValue * 160;
                break;
            case 'high':
                knob.spinner.rotation = 160 - thisValue * 320;
                break;
        }
        knob.glower.rotation = knob.spinner.rotation;

        var angleRad = knob.glower.rotation * Math.PI / 180;
        knob.sensor.x = knob.properties.sensorOffset * Math.sin( angleRad );
        knob.sensor.y = knob.properties.sensorOffset * -Math.cos( angleRad );

        knob.properties.A = thisValue;
    }

    //Bind Enterframe
    FrameUpdate.addFunction(knob.enterFrame);

    //Bind Clicks
    knob.sensor.on("mousedown",function(event){
        if(!knob.enabled || !knob.editable){
            return;
        }
        var thisObj = event.currentTarget;
        startDrag(thisObj);
        knob.properties.dragOn = true;

        knob.pressTrigger(knob);
    }.bind(this));
    knob.sensor.on("pressup",function(event){
        var thisObj = event.currentTarget;

        stopDrag();
        knob.properties.dragOn = false;

        var offset = Math.sqrt(Math.pow(thisObj.x,2) + Math.pow(thisObj.y,2));
        thisObj.x = knob.properties.sensorOffset * thisObj.x /offset;
        thisObj.y = knob.properties.sensorOffset * thisObj.y /offset;

        knob.releaseTrigger(knob);
    }.bind(this));
    document.ready(function(){
        knob.setValue(knob.properties.A);
    });

    Object.defineProperty(knob, 'enabled', {
        set: function(onOff) {
            this.properties.enabled = onOff;
            this.spinner.alpha = 0.5 + 0.5 * onOff;
        },
        get: function(){
            return this.properties.enabled
        }
    });
    Object.defineProperty(knob, 'editable', {
        set: function(onOff){
            this.properties.editable = onOff
        },
        get: function(){
            return this.properties.editable
        }
    });


    //Both of the below are the same function
    Object.defineProperty(knob, 'value', {
        set: function(val) {
            this.properties.A = val;
            this.setValue(val);
        },
        get: function(){
            return this.properties.A;
        }
    });
    Object.defineProperty(knob, 'A', {
        set: function(val) {
            this.properties.A = val;
            this.setValue(val);
        },
        get: function(){
            return this.properties.A;
        }
    });


    Object.defineProperty(knob, 'glow', {
        set: function(onOff) {
            this.properties.glow = onOff;
            knob.glower.visible = onOff;
        },
        get: function(){
            return this.properties.glow;
        }
    });


    Object.defineProperty(knob, 'orientation', {
        set: function(dir) {

            if(dir !== "low" && dir !== "mid" && dir !== "high"){
                this.properties.orientation = "low";
            }else{
                this.properties.orientation = dir;
            }
            this.chevron_low.visible  = (this.properties.orientation == "low");
            this.chevron_mid.visible  = (this.properties.orientation == "mid");
            this.chevron_high.visible = (this.properties.orientation == "high");

            this.setValue(this.properties.A);
        },
        get: function(){
            return this.properties.orientation;
        }
    });



    return knob;
}