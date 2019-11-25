

import * as THREE from "three";
import { TweenLite } from "gsap/TweenMax";

import random from "../utils/randomUtil";
import yoyo from "../utils/yoyoUtil";

/**
 * Animated grid
 *
 * @class Grid
 * @constructor
 * @param {Object} [options]
 * @param {Boolean} [options.points=false] Points?
 * @param {Number} [options.divisionsSize=10] Divisions size
 * @param {Number} [options.divisionsX=11] X axis divisions
 * @param {Number} [options.divisionsY=11] Y axis divisions
 * @param {String} [options.fromColor='#ffffff'] On color
 * @param {String} [options.toColor='#0a0a0a'] Off color
 * @requires jQuery, THREE, TweenLite, random, yoyo
 */
class Grid {
  constructor(options) {
    this.parameters = Object.assign(Grid.defaultOptions, options);

    this.width =
      (this.parameters.divisionsX - 1) * this.parameters.divisionsSize;
    this.height =
      (this.parameters.divisionsY - 1) * this.parameters.divisionsSize;

    let group = new THREE.Object3D();

    let vertices = this.getVertices();

    if (this.parameters.points) {
      let pointsGeometry = new THREE.Geometry();

      for (let i = 0, j = vertices.length; i < j; i++) {
        pointsGeometry.vertices.push(vertices[i][0]);
        pointsGeometry.vertices.push(vertices[i][1]);
        pointsGeometry.vertices.push(vertices[i][2]);
      }

      let pointsMaterial = new THREE.PointsMaterial({ size: 0.2 });
      let points = new THREE.Points(pointsGeometry, pointsMaterial);

      group.add(points);
    }

    let lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors,
      linewidth: 1
    });

    let colorsCache = {};
    let fromColor = new THREE.Color(this.parameters.fromColor);
    let toColor = new THREE.Color(this.parameters.toColor);

    let idleTweens = [];

    for (let k = 0, l = vertices.length; k < l; k++) {
      let lineGeometry = new THREE.Geometry();

      let firstTo = vertices[k][0].clone();
      let secondTo = vertices[k][2].clone();

      lineGeometry.vertices.push(vertices[k][1].clone());
      lineGeometry.vertices.push(vertices[k][1]);
      lineGeometry.vertices.push(vertices[k][1].clone());

      for (let m = 0, n = lineGeometry.vertices.length; m < n; m++) {
        let color = null;
        let percent = null;

        if (k >= this.parameters.divisionsX) {
          // horizontal
          let y = lineGeometry.vertices[m].y;
          percent = Math.abs((y * 100) / this.height / 100);
        } else {
          // vertical
          let x = lineGeometry.vertices[m].x;
          percent = Math.abs((x * 100) / this.width / 100);
        }

        if (!colorsCache[percent]) {
          color = fromColor.clone().lerp(toColor, percent + 0.2);
          colorsCache[percent] = color;
        } else {
          color = colorsCache[percent];
        }

        lineGeometry.colors.push(toColor);
        lineGeometry.colors.push(color);
        lineGeometry.colors.push(toColor);
      }

      let line = new THREE.Line(lineGeometry, lineMaterial);

      idleTweens.push(this.getTween(line, line.geometry.vertices[0], firstTo));
      idleTweens.push(this.getTween(line, line.geometry.vertices[2], secondTo));

      group.add(line);
    }

    this.el = group;

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

    this.in = function() {
      TweenLite.to(group.position,1,{ y: 0 });
    };

    this.out = function(way) {
      let y = way === "up" ? -50 : 50;
      TweenLite.to(group.position, 1,{y: y });
    };
  }

  /**
   * Get vertices
   *
   * @method getVertices
   * @return {Array} vertices
   */
  getVertices() {
    let vertices = [];

    // horizontal
    for (let x = 0; x < this.parameters.divisionsX; x++) {
      let xPosH = x * this.parameters.divisionsSize - this.width / 2;
      let yPosH = this.height - this.height / 2;

      vertices.push([
        new THREE.Vector3(xPosH, -this.height / 2, 0),
        new THREE.Vector3(xPosH, yPosH - this.height / 2, 0),
        new THREE.Vector3(xPosH, yPosH, 0)
      ]);
    }

    // vertical
    for (let y = 0; y < this.parameters.divisionsY; y++) {
      let xPosV = this.width - this.width / 2;
      let yPosV = y * this.parameters.divisionsSize - this.height / 2;

      vertices.push([
        new THREE.Vector3(-this.width / 2, yPosV, 0),
        new THREE.Vector3(xPosV - this.width / 2, yPosV, 0),
        new THREE.Vector3(xPosV, yPosV, 0)
      ]);
    }

    return vertices;
  }

  /**
   * Get line animation
   *
   * @method getTween
   * @param {THREE.Line} [line] Line to animate
   * @param {THREE.Vector3} [from] Start coordinates
   * @param {THREE.Vector3} [to] End coordinates
   */
  getTween(line, from, to) {
    let parameters = {
      paused: true,
      delay: random(0, 2),
      onUpdate: function() {
        line.geometry.verticesNeedUpdate = true;
        line.geometry.computeBoundingSphere();
      },
      onComplete: yoyo,
      onReverseComplete: yoyo,
      x: to.x,
      y: to.y,
      z: to.z
    };

    return TweenLite.to(from, random(1, 2), parameters);
  }
}

Grid.defaultOptions = {
  points: false,
  divisionsSize: 10,
  divisionsX: 11,
  divisionsY: 11,
  fromColor: "#ffffff",
  toColor: "#0a0a0a"
};

export default Grid;
