import * as THREE from "three";
import gsap from "gsap";

// import Events from "../classes/EventsClass";

import random from "../utils/randomUtil";
import map from "../utils/mapUtil";

/**
 * Animated height map
 *
 * @class HeightMap
 * @constructor
 * @param {Object} [options]
 * @param {Boolean} [options.horizontal=true] Horizontal lines?
 * @param {Boolean} [options.vertical=false] Vertical lines?
 * @param {Boolean} [options.plane=false] Plane?
 * @param {Boolean} [options.points=false] Points?
 * @param {Number} [options.divisionsX=30] X axis divisions
 * @param {Number} [options.divisionsY=30] Y axis divisions
 * @param {String} [options.fromColor='#4c4c4c'] Height min color
 * @param {String} [options.toColor='#ffffff'] Height max color
 * @param {Array} [options.maps=[]] Maps sources
 * @requires jQuery, THREE, TweenLite, Events, random, map
 */
class HeightMap {
  constructor(options) {
    this.parameters = Object.assign(HeightMap.defaultOptions, options);

    // this.events = new Events();

    this.fromColor = new THREE.Color(this.parameters.fromColor);
    this.toColor = new THREE.Color(this.parameters.toColor);
    this.colorsCache = {};
    this.faceIndices = ["a", "b", "c", "d"];

    this.ready = false;
    this.data = null;
    this.total = this.parameters.maps.length;
    this.previous = undefined;
    this.current = undefined;

    let group = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(
      50,
      50,
      this.parameters.divisionsX,
      this.parameters.divisionsY
    );

    if (this.parameters.plane) {
      this.plane = this.getPlane();
      group.add(this.plane);
    }

    if (this.parameters.points) {
      this.points = this.getPoints();
      group.add(this.points);
    }

    if (this.parameters.horizontal || this.parameters.vertical) {
      this.lines = this.getLines();
      group.add(this.lines);
    }

    this.loadMaps();

    this.el = group;

    this.start = function() {};

    this.stop = this.start;

    this.on("ready", () => {
      this.ready = true;

      const idleTween = this.getIdleTween();

      this.start = function() {
        idleTween.resume();
      };

      this.stop = function() {
        idleTween.pause();
      };
    });
  }
  /**
   * Get plane
   *
   * @method getPlane
   * @param {THREE.Geometry} geometry
   * @return {THREE.Mesh}
   */
  getPlane() {
    let material = new THREE.MeshLambertMaterial({
      flatShading: THREE.FlatShading,
      vertexColors: THREE.VertexColors
    });

    let plane = new THREE.Mesh(this.geometry, material);

    return plane;
  }

  /**
   * Get points
   *
   * @method getPoints
   * @param {THREE.Geometry} geometry
   * @return {THREE.Points}
   */
  getPoints() {
    const material = new THREE.PointsMaterial({ size: 0.3 });
    let points = new THREE.Points(this.geometry, material);

    return points;
  }

  /**
   * Get lines
   *
   * @method getLines
   * @param {THREE.Geometry} geometry
   * @return {THREE.Object3D}
   */
  getLines() {
    let material = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors
    });

    let lines = new THREE.Object3D();

    if (this.parameters.vertical) {
      for (let x = 0; x < this.parameters.divisionsX + 1; x++) {
        let lineGeometry = new THREE.Geometry();

        for (let y = 0; y < this.parameters.divisionsY + 1; y++) {
          let vertex = this.geometry.vertices[
            x + (y * this.parameters.divisionsX + y)
          ];
          lineGeometry.vertices.push(vertex);
        }

        let line = new THREE.Line(lineGeometry, material);
        lines.add(line);
      }
    }

    if (this.parameters.horizontal) {
      for (let y = 0; y < this.parameters.divisionsY + 1; y++) {
        let lineGeometry = new THREE.Geometry();

        for (let x = 0; x < this.parameters.divisionsX + 1; x++) {
          let vertex = this.geometry.vertices[
            y * (this.parameters.divisionsX + 1) + x
          ];
          lineGeometry.vertices.push(vertex);

          if (x === 0) {
            vertex.x -= random(0, 20);
          }

          if (x === this.parameters.divisionsX) {
            vertex.x += random(0, 20);
          }
        }

        let line = new THREE.Line(lineGeometry, material);
        lines.add(line);
      }
    }

    return lines;
  }

  /**
   * Get animations
   *
   * @method getIdleTween
   * @return {TweenLite}
   */
  getIdleTween() {
    let _this = this;

    return gsap.to({}, {
      duration:2,
      paused: true,
      onComplete: function() {
        _this.current++;

        if (_this.current === _this.total) {
          _this.current = 0;
        }

        _this.applyMap();

        this.duration(random(1.5, 5));
        this.restart();
      }
    });
  }

  /**
   * Load maps
   *
   * @method loadMaps
   */
  loadMaps() {
    let totalData =
      (this.parameters.divisionsX + 1) * (this.parameters.divisionsY + 1);
    this.data = { default: new Float32Array(totalData) };

    let loader = new THREE.ImageLoader();
    let total = this.parameters.maps.length;
    let loaded = 0;

    let addMap = function(name, image) {
      let width = image.width;
      let height = image.height;

      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      let context = canvas.getContext("2d");

      context.drawImage(image, 0, 0);

      let stepX = width / this.parameters.divisionsX;
      let stepY = height / this.parameters.divisionsY;

      let data = new Float32Array(totalData);
      let i = 0;

      for (let y = 0; y < height; y += stepY) {
        for (let x = 0; x < width; x += stepX) {
          let pixelData = context.getImageData(x, y, 1, 1).data;

          // Luminance = R + G + B
          // int8 must be in the [-127, 127] range
          // Max luminance = 765 (255 * 3), dividing by 10 ensures it can only be 76.5 at max
          data[i++] = (pixelData[0] + pixelData[1] + pixelData[2]) / 100;
        }
      }

      _this.data[name] = data;
    }.bind(this);

    let _this = this;

    function loadMap(map, index) {
      loader.load(map.url, function(image) {
        addMap(map.name, image);

        loaded++;

        if (loaded === 1) {
          _this.current = index;
          _this.applyMap();
        }

        if (loaded === total) {
          _this.trigger("ready");
        }
      });
    }

    for (let i = 0; i < total; i++) {
      let map = this.parameters.maps[i];
      loadMap(map, i);
    }
  }

  /**
   * Apply current map
   *
   * @method applyMap
   */
  applyMap() {
    let previousName =
      typeof this.previous === "undefined"
        ? "default"
        : this.parameters.maps[this.previous].name;

    let currentName = this.parameters.maps[this.current].name;

    let previousData = this.data[previousName];
    let currentData = this.data[currentName];

    let _this = this;

    gsap.to({ factor: 1 }, {
      duration: 1,
      factor: 0,
      ease: window.Elastic.easeOut,
      onUpdate: function() {
        for (let i = 0, j = _this.geometry.vertices.length; i < j; i++) {
          let vertex = _this.geometry.vertices[i];
          let offset =
            currentData[i] +
            (previousData[i] - currentData[i]) * this._targets[0].factor;
          vertex.z = offset;
        }

        _this.geometry.verticesNeedUpdate = true;

        if (_this.lines) {
          for (let k = 0, l = _this.lines.children.length; k < l; k++) {
            _this.lines.children[k].geometry.verticesNeedUpdate = true;
          }
        }

        _this.setColors();
      }
    });

    this.previous = this.current;
  }

  /**
   * Set lines/points/plane vertices colors
   *
   * @method setColors
   */
  setColors() {
    // lines
    if (this.lines) {
      for (let i = 0, j = this.lines.children.length; i < j; i++) {
        let line = this.lines.children[i];

        for (let k = 0, l = line.geometry.vertices.length; k < l; k++) {
          let vertex = line.geometry.vertices[k];

          // (255 + 255 + 255) / 10 = 76.5, 76.5 / 20 = 3.8
          let percent = map(vertex.z, [0, 3.8], [0, 2]);
          percent = Math.round(percent * 10) / 10;

          if (!this.colorsCache[percent]) {
            this.colorsCache[percent] = this.fromColor
              .clone()
              .lerp(this.toColor, percent);
          }

          line.geometry.colors[k] = this.colorsCache[percent];
        }

        line.geometry.colorsNeedUpdate = true;
      }
    }

    // planes/points
    if (this.plane || this.points) {
      for (let i = 0, j = this.geometry.faces.length; i < j; i++) {
        let face = this.geometry.faces[i];

        // Assumption : instanceof THREE.Face3
        for (let k = 0; k < 3; k++) {
          let vertexIndex = face[this.faceIndices[k]];
          let vertex = this.geometry.vertices[vertexIndex];

          // (255 + 255 + 255) / 10 = 76.5, 76.5 / 20 = 3.8
          let percent = map(vertex.z, [0, 3.8], [0, 2]);
          percent = Math.round(percent * 10) / 10;

          if (!this.colorsCache[percent]) {
            this.colorsCache[percent] = this.fromColor
              .clone()
              .lerp(this.toColor, percent);
          }

          face.vertexColors[k] = this.colorsCache[percent];
        }
      }

      this.geometry.colorsNeedUpdate = true;
    }
  }

  /**
   * Listen to event bus
   *
   * @method on
   */
  on() {
    // this.events.on.apply(this.events, arguments);
  }

  /**
   * Trigger event on event bus
   *
   * @method trigger
   */
  trigger() {
    // this.events.trigger.apply(this.events, arguments);
  }
}

HeightMap.defaultOptions = {
  horizontal: true,
  vertical: false,
  plane: false,
  points: false,
  divisionsX: 30,
  divisionsY: 30,
  fromColor: "#4c4c4c",
  toColor: "#ffffff",
  maps: []
};

export default HeightMap;
