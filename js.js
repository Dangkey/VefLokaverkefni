var container;

			var camera, scene, renderer;

			var geometry, group;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			document.addEventListener( 'mousemove', onDocumentMouseMove, false );

			init();
			animate();

			
			function init() {
				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 6000;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );
				scene.fog = new THREE.Fog( 0xffffff, 1, 10000 );

				var geometry = new THREE.BoxGeometry( 100, 100, 100 );
				var material = new THREE.MeshNormalMaterial();
				group = new THREE.Group();
				
				

				for ( var i = 0; i < 1000; i ++ ) {

					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 2000 - 1000;
					mesh.position.y = Math.random() * 2000 - 1000;
					mesh.position.z = Math.random() * 2000 - 1000;

					mesh.rotation.x = 30;
					mesh.rotation.y = 30;

					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();

					group.add( mesh );

				}

				scene.add( group );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild( renderer.domElement );


			//

			window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
			controls = new THREE.OrbitControls(camera, renderer.domElement);
			function onDocumentMouseMove(event) {

				mouseX = ( event.clientX - windowHalfX ) * 10;
				mouseY = ( event.clientY - windowHalfY ) * 10;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				
				render();

			}

			function render() {
 				

				camera.lookAt( scene.position );

				group.rotation.x += 0.03;
				group.rotation.y += 0.03;
				group.rotation.z += 0.03;

				renderer.render( scene, camera );

			}