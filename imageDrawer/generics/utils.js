function set_bounds(min_val, max_val, val){
    return Math.min(Math.max(min_val, val), max_val)
}

function show_obj(obj, onOff){
    obj.visible = onOff;
    obj.alpha = onOff * 1;
}

function check_NaN(val){
    if(isNaN(val) || !isFinite(val)){
        val = 0
    }

    return val
}

function set_mouse_props() {
    props.mouse.x = stage.mouseX/stage.scaleX
    props.mouse.y = stage.mouseY/stage.scaleY
}

function set_height(obj, height, defaultHeight) {
    obj.scaleY = height / defaultHeight
}

function set_width(obj, width, defaultWidth) {
    obj.scaleX = width / defaultWidth
}

function follow_mouse(obj){
    obj.x = props.mouse.x
    obj.x = props.mouse.y
}

function get_local_mouse_stage(){
    return _.globalToLocal(stage.mouseX, stage.mouseY)
}

function get_local_mouse_obj(obj){
    return obj.globalToLocal(stage.mouseX, stage.mouseY)
}

function init_lineHolder(holder) {
    holder.dObj = new createjs.Shape()
    holder.addChild(holder.dObj)
}

function check_tween(tween) {
    if(tween){
        tween.pause()
    }
}

function disable_control(obj){
    obj.mouseEnabled = false
    obj.alpha = .5
}

function enable_control(obj){
    obj.mouseEnabled = true
    obj.alpha = 1
}

function bringToFront(obj){
    obj.parent.stop()
    obj.parent.setChildIndex(obj, obj.parent.children.length - 1)
}

function set_zIndex(obj, x){
    obj.parent.stop()
    obj.parent.setChildIndex(obj, x)
}

function random_hexColour() {
    const keys = '0123456789ABCDEF'
    let colour = '#'
    for (let i = 0; i < 6; i++) {
        colour += keys[Math.floor(Math.random() * 16)]
    }

    return colour
}