//init slider by passing Slider() stage object and the SETTING you want it to update

//place 'slider.update_property()' in update_grab to update setting based on grabber positon

//use 'slider.update_slider_val(newVal)' to set a specific value

/**
    //function set up example:
    // function init_sliders(){
    //     let slider = props.slider;
    //     let settings = props.settings;

    //     slider.one.obj = Slider(_.slider_one, settings.distort.a);
    //     slider.one.obj.xMin = -72.5;
    //     slider.one.obj.xMax = 72.5;

    //     slider.two.obj = Slider(_.slider_two, settings.distort.b);
    //     slider.two.obj.xMin = -72.5;
    //     slider.two.obj.xMax = 72.5;

    //     slider.three.obj = Slider(_.slider_three, settings.distort.c);
    //     slider.three.obj.xMin = -72.5;
    //     slider.three.obj.xMax = 72.5;
    // };

    //prop set up example
    // props = {
    //     slider: {
    //         one: {
    //             obj: null,
    //         },
    //         two: {
    //             obj: null,
    //         },
    //         three: {
    //             obj: null,
    //         },
    //     },
    //     settings: {
    //         distort: {
    //             a: {
    //                 min: 0,
    //                 max: 100,
    //                 val: 50,
    //             },
    //             b: {
    //                 min: 0,
    //                 max: 100,
    //                 val: 50,
    //             },
    //             c: {
    //                 min: 0,
    //                 max: 100,
    //                 val: 50,
    //             },
    //         },
    //     },
    // }
**/

function Slider(object, setting){
    const slider = {
        grabber: null,
        A: 0,
        xMin: -50, //OG: -50
        xMax: 50, //OG: 50

        init: () => {
            slider.grabber = object.grabber;

            slider.set_slider_val();

            slider.grabber.on('mousedown', function(event) {
                grab.start(slider.grabber);
            });
            slider.grabber.on('pressup', function(event) {
                grab.stop(slider.grabber);
            });
        },

        set_slider_val: () => {
            var span = inverse_between(setting.min, setting.max, setting.val);
            var spanLimited = limit(0, 1, span);

            slider.A = spanLimited;
            slider.grabber.x = between(slider.xMin, slider.xMax, slider.A);
        },
    };

    slider.init();

    slider.update_setting = function(){
        slider.grabber.y = 0;
        var span = inverse_between(slider.xMin, slider.xMax, slider.grabber.x);
        var spanLimited = limit(0, 1, span);
        
        slider.A = spanLimited;

        var settingVal = between(setting.min, setting.max, slider.A);
        setting.val = settingVal;
        slider.grabber.x = between(slider.xMin, slider.xMax, slider.A);
    };

    slider.update_slider_val = function(newVal){
        if(newVal > setting.max){
            newVal = setting.max;
        } else if(newVal < setting.min){
            newVal = setting.min;
        };

        setting.val = newVal;

        slider.set_slider_val();

    };

    return slider;
}