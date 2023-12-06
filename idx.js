import * as THREE from 'three';
import { OrbitControls} from 'OrbitControls';
import { TextureLoader } from 'three';
//import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';    
//import {Pathfinding, Pathfindinghelper} from 'three-pathfinding'

//SCENE

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(255,255,240)");

//CAMERA

const aspect = window.innerWidth/window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.set(35,35,35);

//RENDERER
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;


//ORBIT CAMERA CONTROLS
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.mouseButtons = {
    MIDDLE: THREE.MOUSE.ROTATE,
    RIGHT: THREE.MOUSE.PAN
};
orbit.enableDamping = true;
orbit.enablePan = true;
orbit.minDistance = 5;
orbit.maxDistance = 60;
orbit.maxPolarAngle = Math.PI / 2 - 0.05;
orbit.minPolarAngle = Math.PI / 4;
orbit.update();

//DIRECTIONAL LIGHT
const dLight = new THREE.DirectionalLight('white', 0.8);
dLight.position.set(20,30,0);
dLight.castShadow = true;
dLight.shadow.mapSize.width = 4096;
dLight.shadow.mapSize.height = 4096;

const d = 35;
dLight.shadow.camera.left = -d;
dLight.shadow.camera.right = d;
dLight.shadow.camera.top = d;
dLight.shadow.camera.bottom = -d;   
scene.add(dLight);

//AMBIENT LIGHT

const aLight = new THREE.AmbientLight('white', 0.5);
scene.add(aLight);

document.body.appendChild(renderer.domElement);

function WindowResize(){
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', WindowResize);

const BoxWidth = 7;
const BoxHeight = 7;
const BoxDepth = 7;
const WidthSegments = 50, HeightSegments = 50, DepthSegments = 50;


const geometry = new THREE.BoxGeometry(
    BoxWidth, 
    BoxHeight, 
    BoxDepth,
    WidthSegments,
    HeightSegments,
    DepthSegments);
const material = new THREE.MeshBasicMaterial({color: "rgb(255, 200, 120)"});
const cube = new THREE.Mesh(geometry, material);
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
scene.add(cube);



const clock = new THREE.Clock();

let gameLoop = () =>{
    //move(clock.getDelta());
    orbit.update();
    renderer.render(scene,camera);
    requestAnimationFrame(gameLoop);
}

gameLoop();