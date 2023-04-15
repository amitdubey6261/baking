import * as THREE from 'three'
import * as CANNON from 'cannon-es';
import CannonDebugger from "cannon-es-debugger";

import Experience from '../Experience';
import Enviroment from './Enviroment';

export default class World {
    constructor() {
        this.timeStep = 1 / 60;
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources ; 
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createCannonWorld();
        this.env = new Enviroment();
        this.intCode();
    }


    createCannonWorld() {
        this.CannonWorld = new CANNON.World({
            gravity: new CANNON.Vec3(0, -10, 0),
        })

        this.CannonDebugger = new CannonDebugger(this.scene, this.CannonWorld, {
            color: 0xff0000,
            scale: 1.0
        })
    }

    intCode(){
        this.textureLoader = new THREE.TextureLoader();
        this.bakedTexture = this.textureLoader.load('./textures/firstBake.jpg');
        this.bakedTexture.flipY = 0;
        this.bakedTexture.encoding = THREE.sRGBEncoding ;
        this.backedMaterial = new THREE.MeshBasicMaterial({map:this.bakedTexture});
        this.modelTexture = this.experience.resources.items.baking ;
        this.modelTexture.scene.traverse((child)=>{
            child.material = this.backedMaterial;
        })
        
        this.scene.add(this.experience.resources.items.baking.scene)

    }

    update() {
        this.CannonWorld.step(this.timeStep);
        this.CannonDebugger.update();
    }

}