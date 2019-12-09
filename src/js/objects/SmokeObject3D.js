import * as THREE from "three";

import SPRITE3D from "../libs/sprite3DLib";
import random from "../utils/randomUtil";
import smokeImg from "../../assets/images/sprite-smoke.png";

/**
 * Animated smoke
 *
 * @class Smoke
 * @constructor
 * @param {Object} [options]
 * @param {String} [options.frontColor='#9b69b2'] Front layers color
 * @param {String} [options.backColor='#e1455f'] Back layers color
 * @param {Number} [options.layers=5] Planes number
 * @param {Array} [options.data=[]] Non random values
 * @requires THREE, SPRITE3D, random
 */
class Smoke {
	constructor(options) {
		let parameters = Object.assign(Smoke.defaultOptions, options);

		let texture = new THREE.TextureLoader().load(smokeImg);
		texture.flipY = false;

		this.sprite = new SPRITE3D.Sprite(texture, {
			horizontal: 8,
			vertical: 8,
			total: 64,
			duration: 50
		});

		let baseMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			depthWrite: false,
			depthTest: true,
			transparent: true,
			opacity: 0.2
		});

		let backMaterial = baseMaterial.clone();
		backMaterial.color = new THREE.Color(parameters.backColor);

		let frontMaterial = baseMaterial.clone();
		frontMaterial.color = new THREE.Color(parameters.frontColor);

		let geometry = new THREE.PlaneGeometry(10, 10);

		this.el = new THREE.Object3D();

		for (let i = 0; i < parameters.layers; i++) {
			let positionX;
			let positionY;
			let positionZ;
			let rotationZ;
			let scale;

			if (parameters.data[i]) {
				positionX = parameters.data[i].positionX || random(-20, 20);
				positionY = parameters.data[i].positionY || random(-20, 20);
				positionZ = parameters.data[i].positionZ || random(-20, 20);
				rotationZ = parameters.data[i].rotationZ || random(0, Math.PI);
				scale = parameters.data[i].scale || random(1, 10);
			} else {
				positionX = random(-20, 20);
				positionY = random(-20, 20);
				positionZ = random(-20, 20);
				rotationZ = random(0, Math.PI);
				scale = random(1, 10);
			}

			let material = positionZ < 0 ? backMaterial : frontMaterial;

			let plane = new THREE.Mesh(geometry, material);
			plane.position.set(positionX, positionY, positionZ);
			plane.rotation.z = rotationZ;
			plane.scale.set(scale, scale, 1);

			this.el.add(plane);
		}
	}

	start() {
		this.sprite.start();
	}

	stop() {
		this.sprite.stop();
	}
}
Smoke.defaultOptions = {
	frontColor: "#9b69b2",
	backColor: "#e1455f",
	layers: 5,
	data: []
};

export default Smoke;
