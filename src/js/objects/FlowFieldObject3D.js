import * as THREE from "three";
import { TweenLite } from "gsap/TweenMax";

import random from "../utils/randomUtil";
import noise from "../utils/noiseUtil";
import map from "../utils/mapUtil";

/**
 * 3D Flow field
 * Fake flocking
 *
 * @param {Array} [points] MainCurve's points
 * @param {Object} [options]
 * @param {Object} [options.subsNumber=3] SubCurves number
 * @param {Number} [options.subsAmplitude=30] SubCurves amplitude
 * @param {Number} [options.subsPrecision=10] SubCurves precision (=subdivisions)
 * @param {Number} [options.noiseXincrement=0.1] SubCurves x noise
 * @param {Number} [options.moiseYincrement=0.1] SubCurves y noise
 * @param {Number} [options.noiseZincrement=0.1] SubCurves z noise
 * @param {Number} [options.renderResolution=100] SubCurves render precision (=subdivisions)
 * @param {String} [options.mainColor='#ffffff'] MainCurve's color
 * @param {String} [options.subsColor='#4c4c4c'] SubCurves color
 * @requires jQuery, THREE, TweenLite, random, noise, map
 */
class FlowField {
  constructor(points, options) {
    this.parameters = Object.assign(FlowField.defaultOptions, options);

    let group = new THREE.Object3D();

    let curves = this.getCurves(points);
    let main = curves.main;
    let subs = curves.subs;
    let lines = this.getLines(main, subs);
    let inTweens = [];

    for (let i = 0, j = lines.length; i < j; i++) {
      group.add(lines[i]);
      inTweens.push(this.getInTween(lines[i]));
    }

    let triangleGeometry = new THREE.TetrahedronGeometry(3);
    let triangleMaterial = new THREE.MeshLambertMaterial({
      flatShading: THREE.FlatShading
    });
    let triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

    let follow = this.getFollow(triangleMesh, subs);

    for (let k = 0, l = follow.meshes.length; k < l; k++) {
      group.add(follow.meshes[k]);
    }

    this.el = group;

    this.in = function() {
      for (let i = 0, j = inTweens.length; i < j; i++) {
        inTweens[i].restart();
      }
    };

    this.out = function() {
      for (let i = 0, j = inTweens.length; i < j; i++) {
        inTweens[i].reverse();
      }
    };

    this.start = function() {
      for (let i = 0, j = follow.tweens.length; i < j; i++) {
        follow.tweens[i].resume();
      }
    };

    this.stop = function() {
      for (let i = 0, j = follow.tweens.length; i < j; i++) {
        follow.tweens[i].pause();
      }
    };
  }
  /**
   * Get main and subs curves
   *
   * @method getCurves
   * @return {Object}
   */
  getCurves(points) {
    let main = new THREE.CatmullRomCurve3(points);

    let subsPoints = main.getPoints(this.parameters.subsPrecision);

    let subs = [];

    for (let i = 0; i < this.parameters.subsNumber; i++) {
      let noiseX = random(0, 10);
      let noiseY = random(0, 10);
      let noiseZ = random(0, 10);

      let newPoints = [];
      for (let j = 0, k = subsPoints.length; j < k; j++) {
        let point = subsPoints[j].clone();

        point.x += map(
          noise(noiseX),
          [0, 1],
          [-this.parameters.subsAmplitude, this.parameters.subsAmplitude]
        );
        point.y += map(
          noise(noiseY),
          [0, 1],
          [-this.parameters.subsAmplitude, this.parameters.subsAmplitude]
        );
        point.z += map(
          noise(noiseZ),
          [0, 1],
          [-this.parameters.subsAmplitude, this.parameters.subsAmplitude]
        );

        noiseX += this.parameters.noiseXincrement;
        noiseY += this.parameters.moiseYincrement;
        noiseZ += this.parameters.noiseZincrement;

        newPoints.push(point);
      }

      subs.push(new THREE.CatmullRomCurve3(newPoints));
    }

    return {
      main: main,
      subs: subs
    };
  }

  /**
   * Get lines
   *
   * @method getLines
   * @param {THREE.CatmullRomCurve3} [main] Main curve
   * @param {Array} [subs] Sub curves
   * @return {Array}
   */
  getLines(main, subs) {
    let lines = [];

    let mainMaterial = new THREE.LineBasicMaterial({
      color: this.parameters.mainColor
    });

    let mainGeometry = new THREE.Geometry();
    let mainPoints = main.getPoints(this.parameters.renderResolution);
    mainGeometry.vertices = mainPoints;

    let mainLine = new THREE.Line(mainGeometry, mainMaterial);
    mainLine.visible = false;
    lines.push(mainLine);

    let subMaterial = new THREE.LineBasicMaterial({
      color: this.parameters.subsColor
    });

    for (let i = 0, j = subs.length; i < j; i++) {
      let subGeometry = new THREE.Geometry();
      let subPoints = subs[i].getPoints(this.parameters.renderResolution);
      subGeometry.vertices = subPoints;

      let subLine = new THREE.Line(subGeometry, subMaterial);
      subLine.visible = false;
      lines.push(subLine);
    }

    return lines;
  }

  /**
   * Get in animation
   *
   * @method getInTween
   * @param {THREE.Line} [line] Line to animate
   * @return {TweenLite}
   */
  getInTween(line) {
    return TweenLite.to({}, random(1, 3),{
      paused: true,
      onComplete: function() {
        line.visible = true;

        TweenLite.delayedCall(0.2, function() {
          line.visible = false;
        });

        TweenLite.delayedCall(0.3, function() {
          line.visible = true;
        });
      },
      onReverseComplete: function() {
        line.visible = false;
      }
    });
  }

  /**
   * Get follow animatiom
   *
   * @method getFollor
   * @param {THREE.Mesh} Mesh following
   * @param {Array} Curves
   * @return {Object}
   */
  getFollow(mesh, curves) {
    let meshes = [];
    let tweens = [];

    function getTween(mesh, sub) {
      return TweenLite.to({ i: 0 }, random(4, 8),{
        i: 1,
        paused: true,
        ease: window.Linear.easeNone,
        onUpdate: function() {
          let position = sub.getPoint(this.target.i);
          let rotation = sub.getTangent(this.target.i);

          mesh.position.set(position.x, position.y, position.z);
          mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        },
        onComplete: function() {
          this.restart();
        }
      });
    }

    for (let i = 0, j = curves.length; i < j; i++) {
      let meshCopy = mesh.clone();
      let curve = curves[i];

      meshes.push(meshCopy);
      tweens.push(getTween(meshCopy, curve));
    }

    return {
      tweens: tweens,
      meshes: meshes
    };
  }
}

FlowField.defaultOptions = {
  subsNumber: 3,
  subsAmplitude: 30,
  subsPrecision: 10,
  noiseXincrement: 0.1,
  moiseYincrement: 0.1,
  noiseZincrement: 0.1,
  renderResolution: 100,
  mainColor: "#ffffff",
  subsColor: "#4c4c4c",
  subsHiddenColo: "#0a0a0a"
};

export default FlowField;
