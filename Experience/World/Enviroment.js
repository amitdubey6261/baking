import * as THREE from 'three';

import Experience from '../Experience';

export default class Enviroment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.setLight();
    }

    setLight(){
        this.abmLight = new THREE.AmbientLight(  0xf3e7d3 , 0.1 );
        this.abmLight.position.set( 0  , -10 , 0);
        console.log("hi")
        this.scene.add(this.abmLight);
    }

    update(){

    }
}