			Physijs.scripts.worker = 'js/physijs_worker.js';
			Physijs.scripts.ammo = 'ammo.js';
			var container, camera, scene, renderer, geometry, group;

			var mouseX = 0,
			    mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			document.addEventListener('mousemove', onDocumentMouseMove, false);

			init();
			animate();


			function init() {
			    container = document.createElement('div');
			    document.body.appendChild(container);

			    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
			    camera.position.z = 600;

			    scene = new Physijs.Scene();
			    scene.setGravity(new THREE.Vector3(0, -100, 0));
			    scene.background = new THREE.Color(0xffffff);
			    var texture = new THREE.TextureLoader().load('textures/crate.gif');
				var ground_texture = new THREE.TextureLoader().load('textures/ground.jpg');
			    var geometry = new THREE.BoxGeometry(10, 10, 10);
			    var material = new THREE.MeshBasicMaterial({
			        map: texture
			    });

			    // Materials
			    ground_material = Physijs.createMaterial(
			        new THREE.MeshBasicMaterial({
			            map: ground_texture
			        }),
			        .8,
			        .4
			    );
			    ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
			    ground_material.map.repeat.set(10, 10);

			    // Ground
			    ground = new Physijs.BoxMesh(
			        new THREE.CubeGeometry(300, 1, 300),
			        ground_material,
			        0 // mass
			    );
			    ground.receiveShadow = true;
				ground.position.y = -400
			    scene.add(ground);

			    var parent = new Physijs.BoxMesh(geometry, material);

			    for (var i = 0; i < 1000; i++) {

			        var mesh = new Physijs.BoxMesh(geometry, material);
			        mesh.__dirtyPosition = true;
			        mesh.position.x = Math.random() * 200 - 100;
			        mesh.position.y = Math.random() * 200 - 100;
			        mesh.position.z = Math.random() * 200 - 100;

					scene.add(mesh);

			        mesh.matrixAutoUpdate = false;
			        mesh.updateMatrix();
			        parent.add(mesh);

			    }

			    scene.add(parent);

			    renderer = new THREE.WebGLRenderer({
			        antialias: true
			    });
			    renderer.setPixelRatio(window.devicePixelRatio);
			    renderer.setSize(window.innerWidth, window.innerHeight);
			    controls = new THREE.OrbitControls(camera, renderer.domElement);
			    container.appendChild(renderer.domElement);


			    //

			    window.addEventListener('resize', onWindowResize, false);

			}

			function onWindowResize() {

			    windowHalfX = window.innerWidth / 2;
			    windowHalfY = window.innerHeight / 2;

			    camera.aspect = window.innerWidth / window.innerHeight;
			    camera.updateProjectionMatrix();

			    renderer.setSize(window.innerWidth, window.innerHeight);

			}
			controls = new THREE.OrbitControls(camera, renderer.domElement);

			function onDocumentMouseMove(event) {

			    mouseX = (event.clientX - windowHalfX) * 10;
			    mouseY = (event.clientY - windowHalfY) * 10;

			}

			//

			function animate() {

			    requestAnimationFrame(animate);

			    render();

			}

			function render() {
			    scene.simulate();

			    camera.lookAt(scene.position);

			    parent.__dirtyRotation = true;



			    renderer.render(scene, camera);


			}
