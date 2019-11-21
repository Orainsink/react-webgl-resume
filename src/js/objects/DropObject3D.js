import * as THREE from "three";
import gsap from "gsap";

import loop from "../utils/loopUtil";

/**
 * Animated water ripple
 *
 * @class Drop
 * @constructor
 * @param {Object} [options]
 * @param {Number} [options.count=6] Rings number
 * @param {String} [options.color='#ffffff'] Rings color
 * @param {Number} [options.amplitude=2] Rings max expanded amplitude
 * @requires jQuery, THREE, TweenLite, loop
 */
class Drop {
  constructor(options) {
    this.parameters = Object.assign(Drop.defaultOptions, options);
    let group = new THREE.Object3D();
    let plane = this.getPlane();
    let caches = [];
    let idleTweens = [];

    for (let i = 0; i < this.parameters.count; i++) {
      const planeCopy = plane.clone();
      planeCopy.material = planeCopy.material.clone();

      let tween = this.getTween(planeCopy, i);
      const cache = {
        duration: (10 + i) / 10,
        z: (this.parameters.count - i) * 5
      };

      group.add(planeCopy);
      caches.push(cache);
      idleTweens.push(tween);
    }

    this.el = group;

    this.in = function() {
      for (let i = 0, j = group.children.length; i < j; i++) {
        const el = group.children[i];
        const cache = caches[i];
        gsap.to(el.position, { duration: cache.duration, z: 0 });
      }
    };

    this.out = function(way) {
      const factor = way === "up" ? 1 : -1;

      for (let i = 0, j = group.children.length; i < j; i++) {
        let el = group.children[i];
        let cache = caches[i];
        gsap.to(el.position, {duration: cache.duration,  z: factor * cache.z });
      }
    };

    this.start = function() {
      for (let i = 0, j = idleTweens.length; i < j; i++) {
        idleTweens[i].resume();
      }
    };

    this.stop = function() {
      for (let i = 0, j = idleTweens.length; i < j; i++) {
        idleTweens[i].pause();
      }
    };
  }
  /**
   * Get water ripple plane
   *
   * @method getPlane
   * @return {Mesh}
   */
  getPlane() {
    let texture = new THREE.TextureLoader().load(
      require("../../assets/images/texture-drop.png")
    );

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      depthWrite: false,
      depthTest: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      color: this.parameters.color,
      side: THREE.DoubleSide
    });

    let geometry = new THREE.PlaneGeometry(20, 20, 1, 1);

    return new THREE.Mesh(geometry, material);
  }

  /**
   * Get ripple animation
   *
   * @method getTween
   * @param {THREE.Mesh} [plane]
   * @param {Number} [index]
   * @return {TweenLite}
   */
  getTween(plane, index) {
    const cache = { scale: 0.1, opacity: 1 };
    const scale =
      ((index + 1) * this.parameters.amplitude) / this.parameters.count;

    let tween =  gsap.to(cache, {
      duration:1.5,
      scale: scale,
      opacity: 0,
      paused: true,
      delay: (index * 100) / 1000,
      onUpdate: function() {
        plane.scale.x = plane.scale.y = cache.scale;
        plane.material.opacity = cache.opacity;
      },
      onComplete: loop
    });
    return tween
  }
}

Drop.defaultOptions = {
  count: 6,
  color: "#ffffff",
  amplitude: 2
};

export default Drop;
