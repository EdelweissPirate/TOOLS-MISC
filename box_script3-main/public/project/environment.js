function Environment(){
    function init(){
        props.sizes.width =  window.innerWidth
        props.sizes.height = window.innerHeight
        
        props.environment.scene = new THREE.Scene()

        Lights()
        Camera()

        Materials()
        Cubes()

        // create renderer
        const renderer = props.renderer = new THREE.WebGLRenderer({
            antialias:true, // doesn't seem to work in off screen rendering?
            alpha: true
        })
        renderer.setPixelRatio(window.devicePixelRatio * 2);
        renderer.setSize(props.sizes.width, props.sizes.height)
        renderer.gammaOutput = true;
        renderer.gammaFactor = 1.3;

        // configure html
        const container = props.environment.container = document.createElement( 'div' )
        document.body.appendChild(container)
        container.appendChild(renderer.domElement)
        document.addEventListener('resize', onWindowResize )

        props.renderer.render(props.environment.scene, props.environment.camera)
    };

    // ====================================================

    function Lights(){
        const pointLight = new THREE.PointLight(0XFFFFFF, .6)
        pointLight.position.x = 0
        pointLight.position.y = 25
        pointLight.position.z = 20

        const pointLight2 = new THREE.PointLight(0xFFFFFF, .6)
        pointLight2.position.x = 0
        pointLight2.position.y = 25
        pointLight2.position.z = -20

        const pointLight3 = new THREE.PointLight(0xFFFFFF, .6)
        pointLight2.position.x = 0
        pointLight2.position.y = 25
        pointLight2.position.z = 0

        // add light to scene
        props.environment.lights[0] = pointLight
        props.environment.lights[1] = pointLight2
        props.environment.lights[2] = pointLight3
        
        props.environment.scene.add(pointLight)
        props.environment.scene.add(pointLight2)
        props.environment.scene.add(pointLight3)
    };

    // ====================================================

    function Camera(){
        // set some camera attributes
        const view_angle = 55
        const aspect = props.sizes.width / props.sizes.height
        const near = 0.1
        const far = 1000

        const camera = new THREE.PerspectiveCamera(
            view_angle,
            aspect,
            near,
            far
        )

        props.environment.camera = camera
        props.environment.scene.add(camera)

        // Update camera
        props.environment.camera.aspect = props.sizes.width / props.sizes.height
        props.environment.camera.updateProjectionMatrix()

        function calcCamPos(){
            let x = 2
            let y = 20
            let z = 35
            let rot = -0.45


            return {x: x, y: y, z: z, rot: rot}
        };

        const camPos = calcCamPos();

        camera.position.x = camPos.x
        camera.position.y = camPos.y 
        camera.position.z = camPos.z 
        camera.rotation.x = camPos.rot
    };

    function rotateCamera(){
        const camera = props.environment.camera

        let rotSpeed = .01

        let x = camera.position.x
        let z = camera.position.z
    
        camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
        camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
        
        camera.lookAt(props.environment.scene.position);
    };

    // ====================================================

    function onWindowResize() {
        // Update sizes
        props.sizes.width = window.innerWidth
        props.sizes.height = window.innerHeight

        // Update camera
        props.environment.camera.aspect = props.sizes.width / props.sizes.height
        props.environment.camera.updateProjectionMatrix()

        // Update renderer
        props.renderer.setSize(props.sizes.width, props.sizes.height, false)
        props.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    };

    // ====================================================

    // Rerender
    function update (){
        rotateCamera()

        props.renderer.render(props.environment.scene, props.environment.camera)
        window.requestAnimationFrame(update)
    };

    init()
    window.requestAnimationFrame(update)
};