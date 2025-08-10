//run function with stage object as 'checkbox'
//set value with 'checkbox.checked = boolean'
//eg
//_.checkbox_test.checked = true;

//pressTrigger(); runs on checkbox mousedown.

//i.e
//checkbox.pressTrigger = function(checkbox){
    // do something e.g update prop;
// };

//eg
// function init_checkbox(checkbox, prop){
//     checkbox.label = prop;
//     props.checkbox[prop].obj = Checkbox(checkbox, 'object');
//     props.checkbox[prop].obj.pressTrigger = function(checkbox){
//         props.checkbox[prop].checked = props.checkbox[prop].obj.checked;
//         props.spectrum.bands[prop] = Number(props.checkbox[prop].checked);
//     };
// }

function Checkbox(checkbox){

    checkbox.properties = {
        checked: false,
    };

    checkbox.pressTrigger = function(checkbox){};

    if(typeof properties !== 'object'){
        properties = {};
    }

    if(typeof properties.checked == "undefined") {
        properties.checked = false;
    };

    checkbox.properties.checked = properties.checked;

    checkbox.enterFrame = function() {
        checkbox.properties.checked = false;
    };

    checkbox.setValue = function(thisValue){
        checkbox.properties.checked = thisValue;
        checkbox.cross.visible = checkbox.properties.checked;
    };

    checkbox.on('mousedown', function(event){
        checkbox.setValue(!checkbox.properties.checked);
        checkbox.pressTrigger(checkbox);
    });

    document.ready(function(){
        checkbox.setValue(checkbox.properties.checked);
    });

    Object.defineProperty(checkbox, 'checked', {
        set: function(onOff) {
            checkbox.properties.checked = onOff;
            checkbox.cross.visible = onOff;
        },
        get: function(){
            return checkbox.properties.checked;
        }
    });

    return checkbox;

}