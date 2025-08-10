const props = {
    timeouts: [],
    heatAlpha: 1,
    raysAlpha: 1,
    objAlpha: 1,
    bushingAlpha: 0,
    nightAlpha: 0,
    stage: 0,
    labels: false,

    rays: [],
    objects: [],
    tempPoints: [],

    pixelSize: 1,
    pixelMulti: 10,

    thermal: {
        width: 602,
        height: 602
    },

    // tempVals: {
    //     a: 55,
    //     b: 31,
    //     c: 34,
    //     d: 24
    // },

    tempMag: 0,

    temp: {
        min: 0, //°C
        max: 100, //°C
        defaultMin: 0, //°C
        defaultMax: 0, //°C
    },

    range: {
        min: 21,//-4.4,//-4.4, //°C
        max: 45//40 //40, //°C
    },
}


function onEnterFrame(){
    
}

document.ready(function(){
    init_touch()
    init_()

    thermalImage.init()

});
