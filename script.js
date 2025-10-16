import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Materials
 */
const basicWireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

/**
 * Geometries demos
 */
// 1) Box with subdivisions (wireframe)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const boxMesh = new THREE.Mesh(boxGeometry, basicWireframeMaterial)
boxMesh.position.x = -2
scene.add(boxMesh)

// 2) Sphere with segments (wireframe)
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32)
const sphereMesh = new THREE.Mesh(sphereGeometry, basicWireframeMaterial)
sphereMesh.position.x = 0
scene.add(sphereMesh)

// 3) Custom BufferGeometry with random triangles
const randomGeometry = new THREE.BufferGeometry()
const triangleCount = 50
const positionsArray = new Float32Array(triangleCount * 3 * 3)
for(let i = 0; i < triangleCount * 3 * 3; i++)
{
	positionsArray[i] = (Math.random() - 0.5) * 2 // random in [-1, 1] scaled
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
randomGeometry.setAttribute('position', positionsAttribute)
const randomMesh = new THREE.Mesh(randomGeometry, basicWireframeMaterial)
randomMesh.position.x = 2
scene.add(randomMesh)

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () =>
{
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
	const elapsedTime = clock.getElapsedTime()

	// Optional: slow rotations for visual interest
	boxMesh.rotation.y = elapsedTime * 0.2
	sphereMesh.rotation.y = elapsedTime * 0.2
	randomMesh.rotation.y = elapsedTime * 0.2

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()