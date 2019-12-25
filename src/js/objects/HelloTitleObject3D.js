import * as THREE from "three";
import { TweenLite } from "gsap/TweenLite";

import SPRITE3D from "../libs/sprite3DLib";
import spriteImg from "../../assets/images/sprite-none.png";

/**
 * Hello title
 *
 * @class Title
 * @constructor
 * @requires THREE, SPRITE3D,
 */
class Title {
	constructor() {
		let path;

		path = spriteImg;
		let texture = new THREE.TextureLoader().load(path);
		texture.flipY = true;

		let sprite = new SPRITE3D.Sprite(texture, {
			horizontal: 4,
			vertical: 10,
			total: 40,
			duration: 70,
			loop: true
		});

		let material = new THREE.MeshBasicMaterial({
			map: texture,
			depthWrite: false,
			depthTest: true,
			transparent: true
		});

		let geometry = new THREE.PlaneGeometry(30, 15);
		let plane = new THREE.Mesh(geometry, material);

		function update() {
			plane.position.y = cache.y;
			material.opacity = cache.opacity;
		}

		let cache = { y: 20, opacity: 0 };
		let inTween = TweenLite.to(cache, 1, {
			y: 0,
			opacity: 1,
			paused: true,
			onUpdate: update
		});

		this.el = plane;

		this.in = function() {
			inTween.play();
		};

		this.out = function() {
			inTween.reverse();
		};

		this.start = function() {
			sprite.start();
		};

		this.stop = function() {
			sprite.stop();
		};
	}
}
export default Title;
