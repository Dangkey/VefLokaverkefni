var width = window.innerWidth;
var height = window.innerHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xf0f0f0, 1);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

controls = new THREE.OrbitControls(camera, renderer.domElement);
// create the cube
var geometry = new THREE.BoxGeometry(1, 1, 1);
for (var i = 0; i < geometry.faces.length; i += 2) {

  var hex = Math.random() * 0xffffff;
  geometry.faces[i].color.setHex(hex);
  geometry.faces[i + 1].color.setHex(hex);

}
var material = new THREE.MeshPhysicalMaterial({
  vertexColors: THREE.FaceColors
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// create lights

scene.add(new THREE.AmbientLight(0xffffff));
var light = new THREE.PointLight(0xffffff, 6, 40);
light.position.set(20, 20, 20);
scene.add(light);

// set the camera
camera.position.z = 5;

// define an animation loop
var render = function() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  renderer.render(scene, camera);
};

render();
