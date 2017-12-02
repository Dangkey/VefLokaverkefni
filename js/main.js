			//Kallar í scriptur fyrir physics
			Physijs.scripts.worker = 'js/physijs_worker.js';
			Physijs.scripts.ammo = 'ammo.js';

			//Variables
			var container, camera, scene, renderer, geometry, group;
			var loader = new THREE.TextureLoader();


			//breytur sem ná í hálfa stærðina á browsernum sem verður notað í function seinna
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;



			//Init býr til sceneið og restina og animate kallar á rendererinn þanni að það keyrist
			init();
			animate();

			//Function sem býr til Sceneið og setur hluti inní það
			function init() {
				//býr til div sem sceneið er sett í
			    container = document.createElement('div');
			    document.body.appendChild(container);

				//Býr til scene sem höndlar physics og breyti þar þyngdaraflinu
				scene = new Physijs.Scene();
			    scene.setGravity(new THREE.Vector3(0, -100, 0));

				//Býr til aðal myndavélina og ræð hvar hún er staðsett
			    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
			    camera.position.z = 800;
				camera.position.y = 500;

				//Loadar inn textures sem við notum
			    var sky = loader.load('textures/sky.jpg');
			    var ground_texture = loader.load('textures/ground.jpg');

				//bý til background mesh sem við setjum svo texture á seinna sem mun vera bakgrunnurinn
			    var bakgrunnur = new THREE.Mesh(
			        new THREE.PlaneGeometry(2, 2, 0),
			        new THREE.MeshBasicMaterial({
			            map: sky
			        })
			    );

			    // Notað til þess að láta bakgrunnin ekki hugsa um z-bufferið
			    bakgrunnur.material.depthTest = false;
			    bakgrunnur.material.depthWrite = false;

				//Býr til scene þar sem bakgrunnurinn er geymdur og myndavél fyrir það.
			    bakgrunnurScene = new THREE.Scene();
			    bakgrunnurCam = new THREE.Camera();
			    bakgrunnurScene.add(bakgrunnurCam);
			    bakgrunnurScene.add(bakgrunnur);

			    //materialið fyrir pallinn
			    ground_material = Physijs.createMaterial(
			        new THREE.MeshBasicMaterial({
			            map: ground_texture
			        }),
			        .8,
			        .4
			    );
				//lætur texturið á pallinum ná alla leiðina í staðinn fyrir að vera bara part af honum
			    ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
			    ground_material.map.repeat.set(10, 10);

			    // býr til pallinn
			    ground = new Physijs.BoxMesh(
			        new THREE.BoxGeometry(1000, 1, 1000),
			        ground_material,
			        0 // mass
			    );
			    scene.add(ground);

				//breytur sem við notum þegar við búum til Kassana, geometry er notað til að gera Kassana,
				// material er notað til þess að setja texture á kassana.
			    var geometry = new THREE.BoxGeometry(20, 20, 20);
			    var material = new THREE.MeshNormalMaterial();


				//for loopa sem býr til mesh úr geometry og material, og gefur hverju meshi random staðsetningu.
			    for (var i = 0; i < 500; i++) {
			        var mesh = new Physijs.BoxMesh(geometry, material);
			        mesh.__dirtyPosition = true;

			        mesh.position.x = Math.floor(Math.random() * 40 - 20) * 20;
			        mesh.position.y = Math.floor(Math.random() * 40) * 20 + 10;
			        mesh.position.z = Math.floor(Math.random() * 40 - 20) * 20;

			        scene.add(mesh);
			    }

				//býr til renderer sem er notaður til þess að birta allt sem við búum til.
			    renderer = new THREE.WebGLRenderer({
			        antialias: true,
			        alpha: true
			    });
			    renderer.setPixelRatio(window.devicePixelRatio);
			    renderer.setSize(window.innerWidth, window.innerHeight);

				//Þetta setur upp OrbitControls sem er notað til að gera zoomað inn og skoðað allt betur
			    controls = new THREE.OrbitControls(camera, renderer.domElement);
				//setur rendererinn í Divið sem við bjuggum til áðan
			    container.appendChild(renderer.domElement);

				//event listener sem lætur rendererinn minnkast ef browserinn er minnkaður
			    window.addEventListener('resize', onWindowResize, false);

			}
			//functionið til að minnka rendererinn
			function onWindowResize() {
			    windowHalfX = window.innerWidth / 2;
			    windowHalfY = window.innerHeight / 2;
			    camera.aspect = window.innerWidth / window.innerHeight;
			    camera.updateProjectionMatrix();
			    renderer.setSize(window.innerWidth, window.innerHeight);
			}

			//kallar í renderinn og sýnir animations
			function animate() {
			    requestAnimationFrame(animate);
			    render();
			}
			//functionið sem setur allt í rendererinn og simulatar physics á sceneinu
			function render() {
			    scene.simulate();
			    renderer.autoClear = false;
			    renderer.clear();
			    renderer.render(bakgrunnurScene, bakgrunnurCam);
			    renderer.render(scene, camera);
			}
