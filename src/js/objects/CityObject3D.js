import dilate from "../utils/dilateUtil";
import outlineMaterial from "../materials/outlineMaterial";
const THREE = require("three");
require("../utils/legacyJSONLoaderUtil");

/**
 * City
 *
 * @class City
 * @constructor
 * @requires jQuery, THREE
 */
class City {
	constructor() {
		this.el = new THREE.Object3D();

		this.groups = {};
		this.baseMaterial = new THREE.MeshLambertMaterial({ color: "#333333" });

		this.loader = new THREE.LegacyJSONLoader();
	}
	addGroup(data) {
		if (!this.groups[data.name]) {
			this.groups[data.name] = new THREE.Object3D();
		}

		if (!data.outline) {
			data.outline = {};
		}

		const groupName = data.name;

		for (const objName in data.objs) {
			if (data.objs.hasOwnProperty(objName)) {
				const url = data.objs[objName];

				if (!data.outline[objName]) {
					data.outline[objName] = {};
				}

				const isSolid = !!data.outline[objName].solid;
				const offset = data.outline[objName].offset ? data.outline[objName].offset : 0.15;

				this.loadObj(groupName, url, offset, isSolid);
			}
		}
	}

	loadObj(groupName, url, offset, isSolid) {
		this.loader.load(url, geometry => {
			this.processObj({
				geometry: geometry,
				group: groupName,
				offset: offset,
				solid: isSolid
			});
		});
	}

	processObj(data) {
		const groupName = data.group;
		const geometry = data.geometry;

		let mesh = new THREE.Mesh(geometry, this.baseMaterial);

		this.groups[groupName].add(mesh);

		const outlineGeometry = geometry.clone();
		dilate(outlineGeometry, data.offset);

		const localOutlineMaterial = outlineMaterial.clone();
		localOutlineMaterial.uniforms = THREE.UniformsUtils.clone(outlineMaterial.uniforms);
		// TODO add customColor
		/*outlineGeometry.attributes = THREE.UniformsUtils.clone({
      customColor: { type: "v4", value: [] }
    });*/

		let outlineMesh = new THREE.Mesh(outlineGeometry, localOutlineMaterial);

		outlineGeometry.computeBoundingBox();
		const height = outlineGeometry.boundingBox.max.y - outlineGeometry.boundingBox.min.y;

		for (let i = 0, j = outlineGeometry.vertices.length; i < j; i++) {
			let color;

			if (data.solid) {
				color = new THREE.Vector4(0.7, 0.7, 0.7, 1.0);
			} else {
				const vertex = outlineGeometry.vertices[i];
				const percent = Math.floor((vertex.y * 100) / height) - 10;
				color = new THREE.Vector4(0.7, 0.7, 0.7, percent / 100);
			}
			// TODO add customColor
			// localOutlineMaterial.attributes.customColor.value[i] = color;
		}

		this.groups[groupName].add(outlineMesh);
	}

	showGroup(name) {
		this.el.add(this.groups[name]);
	}
}

export default City;
