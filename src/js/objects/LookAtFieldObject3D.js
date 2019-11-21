

import * as THREE from "three";
import gsap from "gsap";

import random from "../utils/randomUtil";

/**
 * Cloud of meshes looking at the same coordinates
 *
 * @class LookAtField
 * @constructor
 * @param {Object} [options]
 * @param {Number} [options.count=100] Meshes number
 * @requires jQuery, THREE, TweenLite, random
 */

class LookAtField {
  constructor(options) {
    let parameters = Object.assign(
      {
        count: 100
      },
      options
    );

    let center = new THREE.Vector3(0, 50, 0);

    let triangleGeometry = new THREE.TetrahedronGeometry(3);

    let triangleMaterial = new THREE.MeshLambertMaterial({
      flatShading: THREE.FlatShading
    });
    let triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

    let group = new THREE.Object3D();

    for (let i = 0; i < parameters.count; i++) {
      let triangleCopy = triangleMesh.clone();
      triangleCopy.position.x = random(-50, 50);
      triangleCopy.position.y = random(-50, 50);
      triangleCopy.position.z = random(-50, 30);

      triangleCopy.rotation.x = random(0, 2 * Math.PI);
      triangleCopy.rotation.y = random(0, 2 * Math.PI);
      triangleCopy.rotation.z = random(0, 2 * Math.PI);

      triangleCopy.scale.x = triangleCopy.scale.y = triangleCopy.scale.z = random(
        0.6,
        1
      );

      triangleCopy.lookAt(center);

      group.add(triangleCopy);
    }

    group.position.y = -50;

    function update() {
      for (let i = 0; i < parameters.count; i++) {
        group.children[i].lookAt(center);
      }
    }

    this.el = group;

    this.in = function() {
      group.visible = true;
      gsap.to(center, {duration:2,  y: 0, onUpdate: update });
      gsap.to(group.position, {duration:1,  y: 0 });
    };

    this.out = function() {
      gsap.to(center, {
        duration:1,
        y: 50,
        onUpdate: update,
        onComplete: function() {
          group.visible = false;
        }
      });
      gsap.to(group.position, {duration: 1, y: -50 });
    };
  }
}

export default LookAtField;
