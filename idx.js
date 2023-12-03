import * as THREE from './node_modules/three/build/three.module.js';
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js'
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();

const orbit = new OrbitControls(camera, renderer.domElement)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const BoxWidth = 7;
const BoxHeight = 7;
const BoxDepth = 7;
const WidthSegments = 100, HeightSegments = 50, DepthSegments = 50;


const geometry = new THREE.BoxGeometry(
    BoxWidth, 
    BoxHeight, 
    BoxDepth,
    WidthSegments,
    HeightSegments,
    DepthSegments);
const material = new THREE.MeshBasicMaterial({color: "rgb(0, 120, 120)"});
const cube = new THREE.Mesh(geometry, material);
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
scene.add(cube);


camera.position.set(20, 40,20);



function animate(time){
    requestAnimationFrame(animate)
    cube.position.z = Math.sin(time/1000) *15;
    cube.position.x = Math.cos(time/1000) *15;
    cube.position.y = Math.abs(Math.sin(time/1000)*20);
    
    console.log(`x: ${cube.position.x} || y: ${cube.position.y} || z: ${cube.position.z}`);


    camera.lookAt(cube.position.x, cube.position.y, cube.position.z);
    renderer.render(scene, camera);
}

animate();