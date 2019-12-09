import * as THREE from "three";
import random from "../utils/randomUtil";

/**
 * Background floating lines
 *
 * @class BackgroundLines
 * @constructor
 * @param {Object} [options]
 * @param {Number} [options.count=200] Number of lines
 * @param {Array} [options.rangeY=[-100, 100]] Y range for the random
 * @requires THREE
 */
class BackgroundLines {
	constructor(options) {
		this.defaultOptions = {
			count: 200,
			rangeY: [-100, 100]
		};
		let parameters = Object.assign(this.defaultOptions, options);

		let group = new THREE.Object3D();

		let line = BackgroundLines.getLine();

		for (let i = 0; i < parameters.count; i++) {
			let lineCopy = line.clone();

			lineCopy.position.x = random(-20, 20);
			lineCopy.position.y = random(parameters.rangeY[0], parameters.rangeY[1]);
			lineCopy.position.z = random(-50, 50);

			group.add(lineCopy);
		}

		this.el = group;
		this.line = line;
	}
	/**
	 * Get base line
	 *
	 * @method getLine
	 * @return {Line}
	 */
	static getLine() {
		let material = new THREE.LineBasicMaterial();

		let geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(0, 0.2, 0));
		geometry.vertices.push(new THREE.Vector3(0, 0, 0));

		let line = new THREE.Line(geometry, material);

		return line;
	}

	/**
	 * Update lines Y size
	 *
	 * @method updateY
	 * @param {Number} [speed]
	 */
	updateY(speed) {
		this.line.geometry.vertices[0].y = speed + 0.2;
		this.line.geometry.verticesNeedUpdate = true;
		this.line.geometry.computeBoundingSphere();
	}

	/**
	 * Update lines Z size
	 *
	 * @method updateZ
	 * @param {Number} [speed]
	 */
	updateZ(speed) {
		this.line.geometry.vertices[0].z = speed;
		this.line.geometry.verticesNeedUpdate = true;
		this.line.geometry.computeBoundingSphere();
	}
}

export default BackgroundLines;
