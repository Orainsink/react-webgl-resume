import * as THREE from "three";
import { TweenLite } from "gsap/TweenLite";

import random from "../utils/randomUtil";
import map from "../utils/mapUtil";
import loop from "../utils/loopUtil";

/**
 * @class Galaxy
 * @constructor
 * @param {Object} [options]
 * @param {String} [ringFromColor='#ffffff'] Off color
 * @param {String} [ringToColor='#333333'] On color
 * @param {Number} [ringDivisions=100] Rings divisions
 * @param {Number} [ringColorSteps=30] Gradient steps
 * @requires jQuery, THREE, TweenLite, random, map, loop
 */
class Galaxy {
	constructor(options) {
		this.parameters = Object.assign(Galaxy.defaultOptions, options);

		const group = new THREE.Object3D();

		const ring = this.getRing();
		const planet = Galaxy.getPlanet();

		const greyPlanet = planet.clone();
		greyPlanet.material = greyPlanet.material.clone();
		greyPlanet.material.color = new THREE.Color("#4c4c4c");

		const blackPlanet = planet.clone();
		blackPlanet.material = blackPlanet.material.clone();
		blackPlanet.material.color = new THREE.Color("#000000");

		const radius = [8, 10, 16, 25, 31];
		const planets = {
			8: { el: planet.clone(), scale: 0.2, increment: 0.03 },
			10: { el: greyPlanet.clone(), scale: 0.1, increment: 0.03 },
			16: { el: greyPlanet.clone(), scale: 0.5, increment: 0.02 },
			25: { el: planet.clone(), scale: 0.7 },
			31: { el: blackPlanet.clone(), scale: 0.5, increment: 0.05 }
		};

		for (let i = 0, j = radius.length; i < j; i++) {
			const ringRadius = radius[i];

			const ringCopy = ring.clone();
			ringCopy.scale.x = ringCopy.scale.y = ringRadius;
			ringCopy.rotation.z = random(0, Math.PI);

			group.add(ringCopy);

			if (planets[ringRadius]) {
				const planetCopy = planets[ringRadius].el;
				const scale = planets[ringRadius].scale;

				planetCopy.scale.x = planetCopy.scale.y = planetCopy.scale.z = scale;

				// random start theta
				const theta = random(0, 2 * Math.PI);
				const x = ringRadius * Math.cos(theta);
				const y = ringRadius * Math.sin(theta);
				planets[ringRadius].theta = theta;
				planetCopy.position.set(x, y, 0);

				group.add(planetCopy);
			}
		}

		let cache = { rotationX: 0, rotationY: 0 };

		function update() {
			group.rotation.y = cache.rotationY;
			group.rotation.x = cache.rotationX;
		}

		this.el = group;

		this.in = function(way) {
			cache =
				way === "up" ? { rotationY: -0.6, rotationX: -0.5 } : { rotationY: 0.6, rotationX: -1.5 };

			update();

			TweenLite.to(cache, 2, {
				rotationX: -1,
				rotationY: 0.2,
				onUpdate: update
			});
		};

		this.out = function(way) {
			const to =
				way === "up"
					? { rotationY: 0.6, rotationX: -1.5, onUpdate: update }
					: { rotationY: -0.6, rotationX: -0.5, onUpdate: update };

			TweenLite.to(cache, 1, to);
		};

		const idleTween = TweenLite.to({}, 10, {
			paused: true,
			onUpdate: function() {
				for (let radius in planets) {
					if (planets.hasOwnProperty(radius)) {
						const el = planets[radius].el;
						const theta = planets[radius].theta;
						const increment = planets[radius].increment || 0.01;

						const x = radius * Math.cos(theta);
						const y = radius * Math.sin(theta);

						planets[radius].theta -= increment;

						el.position.x = x;
						el.position.y = y;
					}
				}

				ring.geometry.colors = ring.geometry.colors.concat(ring.geometry.colors.splice(0, 1));
				ring.geometry.colorsNeedUpdate = true;
			},
			onComplete: loop
		});

		this.start = function() {
			idleTween.resume();
		};

		this.stop = function() {
			idleTween.pause();
		};
	}

	/**
	 * Get base planet
	 *
	 * @method getPlanet
	 * @return {THREE.Mesh}
	 */
	static getPlanet() {
		let planetMaterial = new THREE.MeshBasicMaterial();
		let planetGeometry = new THREE.SphereGeometry(5, 20, 20);
		let planet = new THREE.Mesh(planetGeometry, planetMaterial);

		return planet;
	}

	/**
	 * Get base ring
	 *
	 * @method getRing
	 * @return {THREE.Line}
	 */
	getRing() {
		let material = new THREE.LineBasicMaterial({
			vertexColors: THREE.VertexColors
		});

		let geometry = new THREE.Geometry();

		let step = (2 * Math.PI) / this.parameters.ringDivisions;

		for (let i = 0; i < this.parameters.ringDivisions + 1; i++) {
			let theta = i * step;

			let vertex = new THREE.Vector3(1 * Math.cos(theta), 1 * Math.sin(theta), 0);

			geometry.vertices.push(vertex);
		}

		let fromColor = new THREE.Color(this.parameters.ringFromColor);
		let toColor = new THREE.Color(this.parameters.ringToColor);

		let colors = [];

		for (let j = 0; j < this.parameters.ringColorSteps; j++) {
			let percent = map(j + 1, [0, this.parameters.ringColorSteps], [0, 1]);
			colors[j] = fromColor.clone().lerp(toColor, percent);
		}

		let total = geometry.vertices.length;
		let start = 0;
		let current = start;

		let verticesColors = [];

		for (let k = 0; k < total; k++) {
			current++;

			if (current > total) {
				current = 0;
			}

			let vertexColor = colors[current] ? colors[current] : toColor;

			verticesColors.push(vertexColor);
		}

		geometry.colors = verticesColors;

		let ring = new THREE.Line(geometry, material);

		return ring;
	}
}

Galaxy.defaultOptions = {
	ringFromColor: "#ffffff",
	ringToColor: "#333333",
	ringDivisions: 100,
	ringColorSteps: 30
};

export default Galaxy;
