//Ready
document.check = {
    schedule: [],
    onEnterFrame: null,
    interval: setInterval(function() {
        if (document.readyState === 'complete') {
            clearInterval(document.check.interval);
            document.check.execute();
        }

    }, 10),
    execute: function(){
        for(var i = 0; i < document.check.schedule.length; i++){
            document.check.schedule[i]();
        }
        if(document.onEnterFrame){
            document.onEnterFrame();
        }
    },
};
document.ready = function(newFunc){
    if(newFunc.name === "onEnterFrame"){
        document.onEnterFrame = newFunc;
    }else{
        document.check.schedule.push(newFunc);
    }

};