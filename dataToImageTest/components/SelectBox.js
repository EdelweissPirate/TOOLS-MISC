//onChange(selectBox)
//  -> called when selectBox value changes

// selectBox.selectOption(index)

function SelectBox(placeholder,properties){
    // labels,values,selected
    //placeholder = movieclip (selectBox_placeholder)
    //properties = {
    //  labels: ["label1", "label2", "label3"...]
    //  values (optional): [value1, value2, value2...]
    //           default : [0,1,2...]
    //  selected (optional): (index)
    //             default : 0
    //}
    //  enabled: true/false



    var labels = properties.labels;
    var values = properties.values;
    var selected = properties.selected;

    var comp = AdobeAn.getComposition(AdobeAn.bootcompsLoaded[0]);
    var lib=comp.getLibrary();

    var selectBox = new lib.SelectBox();

    selectBox.properties = {
        selectedIndex: 0,
        enabled: true
    }


    //TODO: remove controls when component is disabled

    if(typeof selectBox.onChange === "undefined"){
        selectBox.onChange = function(selectBox){};
    }

    selectBox.isOpen = false;
    if(typeof selected !== "undefined"){
        selectBox.value = selected;
    }else{
        selectBox.value = 0;
    }

    var widthInPixels = placeholder.scaleX * 100;

    var widthOfPanel = 18;
    var widthOfLeft = 4.5;
    var baseWidthOfCentre = 200;

    var widthOfCentre = widthInPixels - widthOfPanel - widthOfLeft;
    var scaleXOfCentre = widthOfCentre / baseWidthOfCentre;

    selectBox.frame_centre.scaleX = scaleXOfCentre;
    selectBox.frame_centre.x = widthOfCentre/2 + widthOfLeft;// - scaleXOfCentre *2;

    setTimeout(function(selectBox){
        selectBox.panel.gotoAndStop(0);
    },50,selectBox);

    //Main Area
    selectBox.panel.x = widthInPixels - widthOfPanel;

    selectBox.hitRegion.scaleX = placeholder.scaleX;
    selectBox.hitRegion.x = 100 * placeholder.scaleX / 2;

    selectBox.hitRegion.pressCount = 0;

    var width_textMask = widthOfLeft + widthOfCentre;
    var scale_textMask = width_textMask / 10;

    var box = new createjs.Shape();
    box.graphics.beginFill(["rgba(0,0,0,0)"]);
    box.graphics.drawRect(0, 0, width_textMask, 22);
    box.cache(0, 0, width_textMask, 22);

    selectBox.label.mask = box;

    stage.enableMouseOver();

    //click event for actual actions
    selectBox.hitRegion.addEventListener("click", function(event) {
        if(!selectBox.enabled){
            return;
        }
        selectBox.toggle();
    });
    selectBox.hitRegion.addEventListener("mousedown", function(event) {
        if(!selectBox.enabled){
            return;
        }
        selectBox.hitRegion.pressCount++;
        selectBox.panel.gotoAndStop(selectBox.hitRegion.pressCount);
    });
    selectBox.hitRegion.addEventListener("pressup", function(event) {
        selectBox.hitRegion.pressCount--;
        selectBox.panel.gotoAndStop(selectBox.hitRegion.pressCount);
    });
    selectBox.hitRegion.addEventListener("rollover",function(event){
        if(!selectBox.enabled){
            return;
        }
        selectBox.hitRegion.pressCount++;
        selectBox.panel.gotoAndStop(selectBox.hitRegion.pressCount);
    });
    selectBox.hitRegion.addEventListener("rollout",function(event){
        selectBox.hitRegion.pressCount--;
        selectBox.panel.gotoAndStop(selectBox.hitRegion.pressCount);
    });


    //Options area
    var O = selectBox.options;
    var options_height = labels.length * 22;

    var outer_baseHeight = 70;
    var inner_baseHeight = 68;

    var caps_baseWidth = 98;

    // widthInPixels

    O.frame_outer_left.scaleY =
        O.frame_outer_right.scaleY = (options_height + 4)/outer_baseHeight;

    O.frame_inner_left.scaleY =
        O.frame_inner_right.scaleY = (options_height + 2)/inner_baseHeight;

    O.frame_bottom.scaleX =
        O.frame_top.scaleX = (widthInPixels - 2)/caps_baseWidth;

    O.frame_bottom.y = options_height + 2;
    O.frame_inner_right.x = widthInPixels - 2;
    O.frame_outer_right.x = widthInPixels - 1;




    //Options mask
    var optionsMask = new createjs.Shape();
    optionsMask.graphics.beginFill(["rgba(0,0,0,0)"]);
    optionsMask.graphics.drawRect(0, 22, widthInPixels, options_height + 4);
    optionsMask.cache(0, 22, widthInPixels, options_height + 4);

    selectBox.options.labels = [];
    selectBox.options.values = [];

    selectBox.options.mask = optionsMask;
    selectBox.options.height = options_height + 4;

    selectBox.options.y = (22 - selectBox.options.height)/2;

    selectBox.toggle = function(){
        if(selectBox.isOpen){
            selectBox.close();
        }else{
            selectBox.open();
        }
    }

    selectBox.open = function(){
        selectBox.isOpen = true;
        var tweenObject =  createjs.Tween.get(selectBox.options,{override:false}).to({
            //
            y: 57  //22 +(selectBox.options.height)/2
        }, 300, createjs.Ease.getPowOut(2));
    };
    selectBox.close = function(){
        selectBox.isOpen = false;
        var tweenObject =  createjs.Tween.get(selectBox.options,{override:false}).to({
            //
            y: 57 -(selectBox.options.height)
        }, 300, createjs.Ease.getPowIn(2));
    };

    var opts = [];
    selectBox.opts = opts;
    selectBox.selectOption = function (optionNum) {
        for(var o = 0; o < selectBox.opts.length; o++){
            selectBox.opts[o].setSelected(o === optionNum);
        }
        selectBox.label.text = selectBox.options.labels[optionNum];
        selectBox.value = selectBox.options.values[optionNum];

        selectBox.close();
        selectBox.onChange(selectBox);
    }

    function initOption(selectBox,option,label,num,width,selectFunction){
        option.selected = false;
        option.num = num;
        option.parent_selectFunction = selectFunction;


        option.y = 2 + num * 22;
        option.x = 3;

        option.bg.scaleX =
            option.bg_hover.scaleX =
                option.overlay_selected.scaleX = width/10;

        option.bg_hover.visible =
            option.overlay_selected.visible = false;

        var textMask = new createjs.Shape();
        textMask.graphics.beginFill(["rgba(0,0,0,0)"]);
        textMask.graphics.drawRect(0, 0, width, 20);
        textMask.cache(0, 0, width, 20);

        option.label.mask = textMask;
        // option.addCild(textMask);

        selectBox.options.addChild(option);

        option.label.text = label;


        option.setSelected = function(onOff){
            option.selected = onOff;
            option.overlay_selected.visible = onOff;
        }

        option.addEventListener("rollover",function(event){
            option.bg_hover.visible = true;
            option.overlay_selected.visible = false;
        });
        option.addEventListener("rollout",function(event){
            option.bg_hover.visible = false;
            if(option.selected){
                option.overlay_selected.visible = true;
            }
        });
        option.addEventListener("mousedown",function(event){
            option.bg_hover.visible = false;
            option.overlay_selected.visible = true;
            option.selected = true;
            option.parent_selectFunction(option.num);


            option.overlay_selected.scaleY = 0.1;
            var tweenObject =  createjs.Tween.get(option.overlay_selected,{override:false}).to({
                scaleY: 1
            }, 200, createjs.Ease.getPowOut(2));//.call(do_motionFinished);
        });



    }
    for(var o = 0; o < labels.length; o++){
        selectBox.options.labels[o] = labels[o];
        if(typeof values !== "undefined"){
            selectBox.options.values[o] = values[o];
        }else{
            selectBox.options.values[o] = o;
        }
        opts[o] = new lib.SelectBox_Option();
        initOption(selectBox,opts[o],labels[o],o,widthInPixels-5,selectBox.selectOption);
    }

    selectBox.x = placeholder.x - widthInPixels/2;
    selectBox.y = placeholder.y - 22/2;

    selectBox.selectOption(selectBox.value);

    placeholder.visible = false;
    exportRoot.addChild(selectBox);

    //Destroys placeholder and moves new selectBox to its index,
    // so that layers are preserved.
    setTimeout(function(placeholder,selectBox){
        var _ = exportRoot;
        var indexToSet = _.getChildIndex(placeholder);

        _.removeChild(placeholder);

        _[placeholder.name] = selectBox;

        _.setChildIndex(_[placeholder.name],indexToSet);

    },200,placeholder,selectBox);

    Object.defineProperty(selectBox, 'selectedIndex', {
        set: function(index) {
            //Make sure it's in range
            if(index >= this.options.labels.length){
                index = this.options.labels.length - 1;
            }
            this.properties.selectedIndex = index;
            this.selectOption(index);
        },
        get: function(){
            return this.properties.selectedIndex;
        }
    });

    Object.defineProperty(selectBox, 'enabled', {
        set: function(onOff){
            this.properties.enabled = onOff;
            this.label.alpha = 0.5 + 0.5 * onOff;

        },
        get: function(){
            return this.properties.enabled;
        }
    });

    if(typeof properties.enabled !== "undefined"){
        selectBox.enabled = properties.enabled;
    }else{
        selectBox.enabled = true;
    }


    return selectBox;
}