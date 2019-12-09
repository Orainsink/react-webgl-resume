import * as THREE from "three";
import { TweenLite } from "gsap/TweenMax";
import loop from "../utils/loopUtil";
import textureWaveImg from "../../assets/images/texture-wave.png";

/**
 * Animated wave
 *
 * @class Wave
 * @constructor
 * @param {Object} [options]
 * @param {Object} [options.amplitude=10] Vertical amplitude
 * @param {Object} [options.divisionSize=2] Grid division size
 * @param {Object} [options.divisionX=50] X axis divisions
 * @param {Object} [options.divisionY=50] Y axis divisions
 * @param {Object} [options.speed=10] Animation speed
 * @requires jQuery, THREE, TweenLite, loop
 */
class Wave {
	constructor(options) {
		this.parameters = Object.assign(Wave.defaultOptions, options);

		let plane = this.getPlane();

		let time = 0;

		let divisionsX = this.parameters.divisionsX;
		let divisionsY = this.parameters.divisionsY;

		function updateWave() {
			let i = 0;

			for (let x = 0; x <= divisionsX; x++) {
				for (let y = 0; y <= divisionsY; y++) {
					let vertex = plane.geometry.vertices[i++];
					vertex.z = Math.sin((x + 1 + time) * 0.2) * 2 + Math.sin((y + 1 + time) * 0.2) * 5;
				}
			}

			plane.geometry.verticesNeedUpdate = true;
			time += 0.1;
		}

		updateWave();

		let idleTween = TweenLite.to({}, 5, {
			paused: true,
			ease: window.Linear.easeNone,
			onUpdate: updateWave,
			onComplete: loop
		});

		this.el = plane;

		this.in = function(way) {
			plane.position.y = way === "up" ? 20 : -20;
			TweenLite.to(plane.position, 1.5, { y: -10 });
		};

		this.out = function(way) {
			let y = way === "up" ? -20 : 20;
			TweenLite.to(plane.position, 1, { y: y });
		};

		this.start = function() {
			idleTween.resume();
		};

		this.stop = function() {
			idleTween.pause();
		};
	}
	/**
	 * Get wave's plane
	 *
	 * @method getPlane
	 * @return {THREE.Mesh}
	 */
	getPlane() {
		let texture = new THREE.TextureLoader().load(textureWaveImg);
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(20, 20);

		let material = new THREE.MeshLambertMaterial({
			map: texture,
			color: "#ffffff",
			side: THREE.DoubleSide
		});

		let geometry = new THREE.PlaneGeometry(
			this.parameters.divisionsX * this.parameters.divisionSize,
			this.parameters.divisionsY * this.parameters.divisionSize,
			this.parameters.divisionsX,
			this.parameters.divisionsY
		);

		let mesh = new THREE.Mesh(geometry, material);
		mesh.position.y = -20;
		mesh.rotation.x = -Math.PI / 2;

		return mesh;
	}
}

Wave.defaultOptions = {
	amplitude: 10,
	divisionSize: 2,
	divisionsX: 50,
	divisionsY: 50,
	speed: 10
};

export default Wave;
