// code and shader is from youtuber juxtopposed https://codepen.io/Juxtopposed/pen/GRPRPyR?editors=1010

import * as THREE from 'three';

const imageContainer = document.getElementById("imageContainer");
const imageElement = document.getElementById("spooky");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    80, 1, 0.01, 10
);

camera.position.z = 1;

const texture = new THREE.TextureLoader().load(imageElement.src);

const shaderUniforms = {
    tDiffuse: { value: texture },
    glitchIntensity: { value: 0.0 }
}

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `


const fragmentShader = `
    uniform sampler2D tDiffuse;
    uniform float glitchIntensity;
    varying vec2 vUv;

    void main() {
    vec2 uv = vUv;
    vec4 baseState = texture2D(tDiffuse, uv);

    if (glitchIntensity > 0.0) {
        float segment = floor(uv.x * 12.0); 
        float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
        vec2 offset = vec2(0.0, randomValue * 0.03) * glitchIntensity;

        vec4 redGlitch = texture2D(tDiffuse, uv + offset);
        vec4 greenGlitch = texture2D(tDiffuse, uv - offset);
        vec4 blueGlitch = texture2D(tDiffuse, uv);

        if (mod(segment, 3.0) == 0.0) {
            gl_FragColor = vec4(redGlitch.r, greenGlitch.g, baseState.b, 1.0);
        } else if (mod(segment, 3.0) == 1.0) {
            gl_FragColor = vec4(baseState.r, greenGlitch.g, blueGlitch.b, 1.0);
        } else {
            gl_FragColor = vec4(redGlitch.r, baseState.g, blueGlitch.b, 1.0);
        }
    } else {
        gl_FragColor = baseState; 
    }
    }
    `

const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
        uniforms: shaderUniforms,
        vertexShader,
        fragmentShader
    })
);

scene.add(planeMesh)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);

imageContainer.appendChild(renderer.domElement);

const ANIMATION_CONFIG = {
    updateFrequency: 0.1,
    glitchIntensityMod: 1
  };
  
var glitchDuration = 0

function animate(){
    glitchDuration += ANIMATION_CONFIG.updateFrequency

    if (glitchDuration > 1){
        glitchDuration = 0
        planeMesh.material.uniforms.glitchIntensity.value = Math.random() * ANIMATION_CONFIG.glitchIntensityMod
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

