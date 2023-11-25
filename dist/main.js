import * as THREE from 'three';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

//scene and render settings
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

renderer.setClearAlpha(0);

//camera
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);



camera.position.set(0, 9, 0);
camera.lookAt(scene.position);


//lighting
const ambientLight = new THREE.AmbientLight('white',.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('orange',1.5);
scene.add(directionalLight);
directionalLight.position.set(0,3,2);
directionalLight.target.position.set(scene.position);


// const vehicle = new YUKA.Vehicle();

// vehicle.scale.set(0.15, 0.15, 0.15);

// function sync(entity, renderComponent) {
//     renderComponent.matrix.copy(entity.worldMatrix);
// }

// const entityManager = new YUKA.EntityManager();
// entityManager.add(vehicle);

const loader = new GLTFLoader();
const boat = new THREE.Group();


//slideshow


//boat

loader.load('../assets/steamboat.glb', function(glb) {
    const steamboat = glb.scene;
	
    
	// scene.add(boat);
	steamboat.position.set(0,0,0);
	steamboat.scale.set(.25,.25,.25);
   boat.add(steamboat);
    
    // vehicle.setRenderComponent(boat, sync);
});
scene.add(boat);

/*
//dock
const dockPos = new THREE.Vector3(-11,.2,-4);
const dockLookAt = new THREE.Vector3(dockPos.x + 5, dockPos.y + .5, dockPos.z);
loader.load('./assets/dock.glb', function(glb){
	const dock = glb.scene;
	dock.rotateY(-1.4);
	
	dock.position.set(dockPos.x,dockPos.y,dockPos.z);
	scene.add(dock);
});
*/

//dragon

const dragonPos = new THREE.Vector3(-6,.7,-3);
const dragonGroup = new THREE.Group();
loader.load('../assets/dragon.glb', function(glb){
	const dragon = glb.scene;
	
	dragon.scale.set(0.3,0.3,0.3);
	dragon.position.set(dragonPos.x,dragonPos.y,dragonPos.z);
	dragon.rotateY(3.4);
	dragon.name='dragon'
	dragonGroup.add(dragon);
});
scene.add(dragonGroup);


//island
const islandPos = new THREE.Vector3(5,-0.05,-1);
const islandLookAt = new THREE.Vector3(islandPos.x, islandPos.y+.7, islandPos.z);

loader.load('../assets/volcano.glb', function(glb){
	const island = glb.scene;
	
	island.scale.set(0.1,0.1,0.1);
	island.rotateY(1);
	island.position.set(islandPos.x,islandPos.y,islandPos.z);
	scene.add(island);
	island.name = 'island';
});

const fishGroup = new THREE.Group();
loader.load('../assets/fish.glb', function(glb){
	const fish = glb.scene;
	
	
	fish.rotateY(1.5);
	fish.position.set(-2,-0.3,5);
	fishGroup.add(fish);
	
});
scene.add(fishGroup);

const birdGroup = new THREE.Group();
loader.load('../assets/birds.glb', function(glb){
	const birds = glb.scene;
	
	birds.scale.set(0.3,0.3,0.3);
	birds.rotateY(0.2);
	birds.position.set(-8,2,-0);
	birdGroup.add(birds);
	
});
scene.add(birdGroup);

//ocean
/*
loader.load('./assets/ocean_still.glb', function(glb){
	const ocean = glb.scene;
	
	
	ocean.scale.set(0.8,0.8,0.8);
	ocean.position.set(0,.28,0);
	scene.add(ocean);
});
*/


// const target = new YUKA.GameEntity();
// //target.setRenderComponent(targetMesh, sync);
// entityManager.add(target);

// const arriveBehavior = new YUKA.ArriveBehavior(target.position, 0.5, 0.1);
// vehicle.steering.add(arriveBehavior);

// vehicle.position.set(-3, 0, -3);

// vehicle.maxSpeed = 10;



const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
});


const planeGeo = new THREE.PlaneGeometry(50, 50);
const planeMat = new THREE.MeshBasicMaterial({
	color: '#368287',
	visible: true});
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
planeMesh.rotation.x = -0.5 * Math.PI;
scene.add(planeMesh);
planeMesh.position.set(0,0,0);
planeMesh.name = 'plane';


const raycaster = new THREE.Raycaster();

window.addEventListener('click', function() {
    raycaster.setFromCamera(mousePosition, camera);
    const intersects = raycaster.intersectObjects(scene.children);
	
    for(let i = 0; i < intersects.length; i++) {
		if(intersects[i].object.name === 'dragon')
		{
			lookForward();
		}
	}
		

// 		if(this.document.getElementById("islandPage").style.display=="block" || this.document.getElementById("pilatusPage").style.display=="block")
// 		{
// 			target.position.set(scene.position);
// 		}
// 		else{
//         if(intersects[i].object.name === 'plane')
// 		{
//             target.position.set(intersects[i].point.x, 0, intersects[i].point.z);
// 		}
// 		}
// }



		

});

function lookLeft(){	
	camera.position.set(0,1,-3);
	camera.lookAt(-10,1,-3);	
}

var leftButton =
document.getElementById("left-button");
leftButton.addEventListener("click",lookLeft);




function lookDown(){
	camera.position.set(0,15,0);
	camera.lookAt(scene.position);
}
var downButton =
document.getElementById("down-button");
downButton.addEventListener("click",lookDown);

function lookRight(){
	camera.position.set(-5,1,0);
	camera.lookAt(10,1,0);
}
var rightButton =
document.getElementById("right-button");
rightButton.addEventListener("click",lookRight);

function lookForward(){
	camera.position.set(0,1,5);
	camera.lookAt(0,1,-10);
}
var forwardButton =
document.getElementById("forward-button");
forwardButton.addEventListener("click",lookForward);





window.addEventListener("keydown", (e) => {
	if (e.key === "w") {
	  boat.translateZ(1.0);
	  
	}
	if (e.key === "a") {
		boat.rotateY(1.5708);
		
	  }
	  if (e.key === "d") {
		boat.rotateY(-1.5708);
		
	  }
  },false);

  if(boat.position.x <= -2)
{
	lookLeft();
}
if(boat.position.x >= -2 && boat.position.x <= 2){
	lookForward();
}

  

//const time = new YUKA.Time();

function animate() {
    requestAnimationFrame(animate);

	



    // entityManager.update(delta);
    // group.position.y = 0.05 * Math.sin(t / 500);

	// camera.position.x= vehicle.position.x;
	// camera.position.y= 5;
	// camera.position.z = vehicle.position.z+5;
	// camera.lookAt(vehicle.position.x,vehicle.position.y,vehicle.position.z);

	// if(vehicle.position.distanceTo(dragonPos) <=2)
	// {
	// 	document.getElementById("pilatusPage").style.display = "block";
	// }

	// if(vehicle.position.distanceTo(islandPos) <=2)
	// {
	// 	document.getElementById("islandPage").style.display = "block";
	// }
	
	/*
	if(vehicle.position.distanceTo(dockPos) <=6){
		camera.lookAt(dockLookAt);
		camera.zoom = 4;
		camera.position.x = dockLookAt.x;
		camera.updateProjectionMatrix();
		
	}
	else if(vehicle.position.distanceTo(islandPos) <=2){
		camera.lookAt(islandLookAt);
		camera.zoom = 3;
		camera.position.x = islandLookAt.x;
		camera.updateProjectionMatrix();
	}
	else{
		camera.lookAt(scene.position);
		camera.zoom = 1;
		camera.position.x = 0;
		camera.updateProjectionMatrix();
	}
	*/

	
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


