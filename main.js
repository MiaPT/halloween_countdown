import * as three from 'three';

const scene = new three.Scene();

// lights
scene.add( new three.AmbientLight( 0x999999 ) );
const light = new three.DirectionalLight(0xffffff, 3);
light.position.set(4, 4, 8)
light.castShadow = true;
scene.add(light)


// camera
const camera = new three.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
    )
camera.position.set(0, 0, 24);
camera.lookAt(0, 0, 0);

// renderer
const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement)


// background
const bgGeometry = new three.PlaneGeometry(100, 100);
const bgMaterial = new three.MeshPhongMaterial({color: 0x886699})

const bg = new three.Mesh(bgGeometry, bgMaterial);
bg.receiveShadow = true;
bg.position.set(0, 0, -7);
scene.add(bg);


// cube
const cubeGeometry = new three.BoxGeometry(5, 5, 5);
const cubeMaterial = new three.MeshPhongMaterial({color: 0x55aa22});
const cube = new three.Mesh( cubeGeometry, cubeMaterial);
cube.castShadow = true;
scene.add(cube);



// Line
const lineMaterial = new three.LineBasicMaterial({color: 0x4444dd})

const points = [];
points.push( new three.Vector3( - 10, 0, 0 ) );
points.push( new three.Vector3( 0, 10, 0 ) );
points.push( new three.Vector3( 10, 0, 0 ) );

const lineGeometry = new three.BufferGeometry().setFromPoints(points);
const line = new three.Line(lineGeometry, lineMaterial);
scene.add(line);


function animate(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)
