

import * as THREE from "three";
import gsap from "gsap";

import random from "../utils/randomUtil";

/**
 * Animated strip
 *
 * @class Strip
 * @constructor
 * @param {Object} [options]
 * @pram {Number} [options.count=10] Strips count
 * @pram {Array} [options.colors=['#ffffff']] Strips colors
 * @pram {Number} [options.width=10] Strip width
 * @pram {Number} [options.height=3] Strip height
 * @pram {Number} [options.speed=1] Animations speed
 * @pram {Array} [options.rangeX=[-50, 50]] X position range
 * @pram {Array} [options.rangeY=[-50, 50]] Y position range
 * @pram {Array} [options.rangeZ=[-50, 50]] Z position range
 * @requires jQuery, THREE, TweenLite, random
 */
class Strip {
  constructor(options) {
    this.parameters = Object.assign(Strip.defaultOptions, options);

    this.geometry = new THREE.PlaneGeometry(
      this.parameters.width,
      this.parameters.height
    );

    this.el = new THREE.Object3D();

    let materials = {};

    for (let i = 0; i < this.parameters.count; i++) {
      let x = random(this.parameters.rangeX[0], this.parameters.rangeX[1]);
      let y = random(this.parameters.rangeY[0], this.parameters.rangeY[1]);
      let z = random(this.parameters.rangeZ[0], this.parameters.rangeZ[1]);

      let color = this.parameters.colors[
        random(0, this.parameters.colors.length, true)
      ];

      if (!materials[color]) {
        let material = new THREE.MeshBasicMaterial({
          color: color,
          side: THREE.DoubleSide
        });

        materials[color] = material;
      }

      let mesh = new THREE.Mesh(this.geometry, materials[color]);
      mesh.position.set(x, y, z);
      this.el.add(mesh);
    }

    this.from = this.geometry.vertices[0].x;
    this.to = this.geometry.vertices[1].x;
    this.cache = { x: this.from };

    this.geometry.vertices[1].x = this.geometry.vertices[3].x = this.geometry.vertices[0].x;
  }
  update() {
    this.geometry.vertices[1].x = this.geometry.vertices[3].x = this.cache.x;
    this.geometry.verticesNeedUpdate = true;
    this.geometry.computeBoundingSphere();
  }

  in() {
    gsap.to(this.cache, {
      duration:this.parameters.speed,
      x: this.to,
      onUpdate: this.update.bind(this)
    });
  }

  out() {
    gsap.to(this.cache,{
      duration: this.parameters.speed,
      x: this.from,
      onUpdate: this.update.bind(this)
    });
  }
}

Strip.defaultOptions = {
  count: 10,
  colors: ["#ffffff"],
  width: 10,
  height: 3,
  speed: 1,
  rangeX: [-50, 50],
  rangeY: [-50, 50],
  rangeZ: [-50, 50]
};

export default Strip;
