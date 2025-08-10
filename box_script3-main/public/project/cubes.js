function Cubes(){
    props.cubes.geometry = new THREE.BoxGeometry(1, 1, 1)
    props.cubes.geometry.center()

    function createCube(){
        return new THREE.Mesh(props.cubes.geometry, props.materials.current)
    }

    function addCube(i){
        let thisCube = createCube(props.materials.lib[props.materials.current]);
        props.environment.cubes.add(thisCube)
        
        thisCube.coords = props.cubes.posArray[i]
        thisCube.position.x = thisCube.coords.x
        thisCube.position.y = thisCube.coords.y
        thisCube.position.z = thisCube.coords.z

        return thisCube
    }

    function addCubes(){
        props.environment.cubes = new THREE.Group()

        props.cubes.posArray.map((b, i) => {
            let thisCube = addCube(i)
            props.cubes.meshes.push(thisCube)
        })

        props.environment.scene.add(props.environment.cubes)
        props.environment.cubes.position.set(-7, 0, 8)
    }

    props.cubes.generate = function(){
        addCubes()
    }

    props.cubes.generate()
};