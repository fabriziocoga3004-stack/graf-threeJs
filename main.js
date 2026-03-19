import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

// Escena
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometría
const geometry = new THREE.IcosahedronGeometry(1, 0);

// Materiales (colores mejorados)
const materialGreen = new THREE.MeshStandardMaterial({ 
  color: 0x00ffff,
  emissive: 0x003333
});

const materialBlue  = new THREE.MeshStandardMaterial({ 
  color: 0x8a2be2,
  emissive: 0x220044
});

const materialRed   = new THREE.MeshStandardMaterial({ 
  color: 0xff8c00,
  emissive: 0x331a00
});

// Meshes
const icoGreen = new THREE.Mesh(geometry, materialGreen);
const icoBlue  = new THREE.Mesh(geometry, materialBlue);
const icoRed   = new THREE.Mesh(geometry, materialRed);

// Posiciones
icoGreen.position.x = -2.5;
icoBlue.position.x  = 0;
icoRed.position.x   = 2.5;

// Agregar a escena
scene.add(icoGreen, icoBlue, icoRed);

// Luces
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(0, 0, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Animación
function animate() {
  requestAnimationFrame(animate);

  icoGreen.rotation.x += 0.005;
  icoGreen.rotation.y += 0.005;

  icoBlue.rotation.x += 0.01;
  icoBlue.rotation.y += 0.01;

  icoRed.rotation.x += 0.03;
  icoRed.rotation.y += 0.03;

  renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});