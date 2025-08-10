async function Materials(){
    function init(){
        props.materials.current = props.materials.generate(props.cubes.type)
    }

    props.materials.generate = function(type){
        let materialParams = chooseMaterialStyle(type)
        let thisMaterial = new THREE.MeshLambertMaterial({
            color: materialParams.colour
        })

        props.materials.lib[type] = thisMaterial
        return thisMaterial
    }

    function chooseMaterialStyle(type){
        switch (type) {
            case 'eth':
                return {colour: 'royalblue'}
        
            default:
                return {colour: '#ff0000'}
        }
    }
    
    init()
};