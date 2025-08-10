//Must be included AFTER document.ready.js

var FrameUpdate_three = {
    updateFunctions: [],
    time: 0,
    refresh: function(time){
        const dt = time - FrameUpdate_three.time;
        FrameUpdate_three.time = time;

        for(var r = 0; r < FrameUpdate_three.updateFunctions.length; r++){
            FrameUpdate_three.updateFunctions[r](dt);
        }
        requestAnimationFrame(FrameUpdate_three.refresh);
    },

    addFunction: function(newFunction){
        if(typeof newFunction === 'function'){
            switch(newFunction.name){
                case 'onEnterFrame':
                    this.updateFunctions.push(newFunction);
                    break;
                case 'updateDrag':
                default:
                    this.updateFunctions.unshift(newFunction);
                    break;
            }
        }
    }
}
document.ready(function(){
    if(typeof updateDrag !== 'undefined'){
        FrameUpdate_three.addFunction(updateDrag);
    }
    if(typeof onEnterFrame !== 'undefined'){
        FrameUpdate_three.addFunction(onEnterFrame);
    }
    // exportRoot.addEventListener("tick",FrameUpdate.refresh.bind(exportRoot));

    FrameUpdate_three.refresh();
});
