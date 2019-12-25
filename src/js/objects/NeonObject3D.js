import * as THREE from "three";
import { TweenLite } from "gsap/TweenLite";
import random from "../utils/randomUtil";
import yoyo from "../utils/yoyoUtil";

import textureNeonProjectionImg from "../../assets/images/texture-neonProjection.png";
import textureNeonGlowImg from "../../assets/images/texture-neonGlow.png";

/**
 * Animated Neon
 *
 * @class Neon
 * @constructor
 * @params {Object} [options]
 * @params {String} [options.color='#ffffff'] Neon color
 * @params {Number} [options.width=20] Neon width
 * @params {Boolean} [options.projection=true] Projection halo?
 * @params {Boolean} [options.planes=3] Glow planes
 * @requires THREE, TweenLite, SOUNDS, random, yoyo
 */

class Neon {
	constructor(options) {
		this.parameters = Object.assign(Neon.defaultOptions, options);

		this.el = new THREE.Object3D();

		// setup 3d els
		this.tube = this.getTube();
		this.glow = this.getGlow();
		this.cb = function() {};

		let glows = this.getGlows(this.glow);

		this.el.add(this.tube);
		this.el.add(glows);

		if (this.parameters.projection) {
			this.projection = this.getProjection();
			this.el.add(this.projection);
		}

		// flicker
		this.currentFlicker = 0;
		this.totalFlicker = random(3, 6, true);
		this.flickering = false;

		// animations
		let _this = this;

		this.idleIntensityTween = TweenLite.to({ projection: 0.08, glow: 0.4 }, random(0.8, 5), {
			projection: 0.15,
			glow: 0.7,
			paused: true,
			onStart: function() {
				_this.tube.material.emissive.set(_this.parameters.color);
			},
			onUpdate: function() {
				if (_this.flickering) {
					return false;
				}

				_this.glow.material.opacity = this.target.glow;
				if (_this.parameters.projection) {
					_this.projection.opacity = this.target.opacity;
				}
			},
			onComplete: yoyo,
			onReverseComplete: yoyo
		});

		this.idleFlickTween = TweenLite.to({}, random(0.1, 10), {
			paused: true,
			onComplete: function() {
				_this.flickOff();
				this.duration(random(0.1, 10));
				this.restart();
			}
		});

		this.inTween = TweenLite.to({}, random(0.2, 2), {
			paused: true,
			onComplete: function() {
				if (_this.currentFlicker++ < _this.totalFlicker) {
					_this.flickOn();
					this.duration(random(0.1, 0.5));
					this.restart();
				} else {
					_this.animations = [_this.idleIntensityTween, _this.idleFlickTween];
					_this.start();
				}
			}
		});

		this.animations = [this.inTween];
	}

	/**
	 * Start animations sequence
	 */
	start() {
		for (let i = 0, j = this.animations.length; i < j; i++) {
			this.animations[i].resume();
		}
	}

	/**
	 * Stop animations sequence
	 */
	stop() {
		for (let i = 0, j = this.animations.length; i < j; i++) {
			this.animations[i].pause();
		}
	}

	/**
	 * Flick on once
	 * from off to on
	 */
	flickOn() {
		this.tube.material.emissive.set(this.parameters.color);
		this.tube.material.needsUpdate = true;

		this.glow.material.opacity = 0.3;

		if (this.parameters.projection) {
			this.projection.material.opacity = 0.05;
		}

		this.cb();

		TweenLite.delayedCall(random(0.05, 0.07), () => {
			this.tube.material.emissive.set("#000000");
			this.tube.material.needsUpdate = true;

			this.glow.material.opacity = 0;

			if (this.parameters.projection) {
				this.projection.material.opacity = 0;
			}
		});
	}

	/**
	 * Flick off once
	 * from on to off
	 */
	flickOff() {
		this.flickering = !this.flickering;

		this.glow.material.opacity = 0;

		if (this.parameters.projection) {
			this.projection.material.opacity = 0.05;
		}

		TweenLite.delayedCall(random(0.05, 0.1), () => {
			this.flickering = !this.flickering;

			this.cb();
		});
	}

	/**
	 * Get neon tube
	 *
	 * @method getTube
	 * @return {THREE.Mesh}
	 */
	getTube() {
		let geometry = new THREE.CylinderGeometry(
			this.parameters.radiusTop,
			this.parameters.radiusBottom,
			this.parameters.width,
			6
		);
		let material = new THREE.MeshLambertMaterial({
			color: "#808080",
			emissive: "#000000"
		});
		let mesh = new THREE.Mesh(geometry, material);

		return mesh;
	}

	/**
	 * Get neon single glow
	 *
	 * @method getGlow
	 * @return {THREE.Mesh}
	 */
	getGlow() {
		let texture = new THREE.TextureLoader().load(textureNeonGlowImg);
		let material = new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			map: texture,
			depthWrite: false,
			depthTest: true,
			transparent: true,
			color: this.parameters.color,
			opacity: 0,
			blending: THREE.AdditiveBlending
		});

		let geometry = new THREE.PlaneGeometry(5, this.parameters.width + 3);
		let mesh = new THREE.Mesh(geometry, material);

		return mesh;
	}

	/**
	 * Get neon glows
	 *
	 * @method getGlows
	 * @param {THREE.Mesh} [glow]
	 * @return {THREE.Object3D}
	 */
	getGlows(glow) {
		let glows = new THREE.Object3D();

		for (let i = 0; i < this.parameters.planes; i++) {
			let copy = glow.clone();
			copy.rotation.y = i * (0.7 * Math.PI);
			glows.add(copy);
		}

		return glows;
	}

	/**
	 * Get neon projection
	 *
	 * @method getProjection
	 * @return {THREE.Mesh}
	 */
	getProjection() {
		let texture = new THREE.TextureLoader().load(textureNeonProjectionImg);
		let material = new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			map: texture,
			depthWrite: false,
			depthTest: true,
			transparent: true,
			color: this.parameters.color,
			opacity: 0,
			blending: THREE.AdditiveBlending
		});

		let geometry = new THREE.PlaneGeometry(this.parameters.width * 2, 50);
		let mesh = new THREE.Mesh(geometry, material);
		mesh.position.z = -1;

		return mesh;
	}

	callback(cb) {
		this.cb = cb;
	}
}

Neon.defaultOptions = {
	color: "#ffffff",
	width: 20,
	radiusTop: 0.2,
	radiusBottom: 0.2,
	projection: true,
	planes: 3
};

export default Neon;
