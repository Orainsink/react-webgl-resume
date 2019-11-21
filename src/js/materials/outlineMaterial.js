"use strict";

import * as THREE from "three";

/**
 * Basic material that accepts vec4 as vertices colors (rgba).
 *
 * @attribute {Object} [customColor]
 * @attribute {Array} [customColor.value]
 */
let outlineShader = new THREE.ShaderMaterial({
  uniforms: {
    time: { type: "f", value: 1 }
  },
  vertexShader: [
    "attribute vec4 customColor;",
    "varying vec4 vColor;",

    "void main () {",
    "vColor = customColor;",
    "gl_Position = projectionMatrix * (modelViewMatrix * vec4(position, 1.0));",
    "}"
  ].join("\n"),
  fragmentShader: [
    "uniform float time;",
    "varying vec4 vColor;",

    "void main () {",
    "gl_FragColor = vColor;",
    "gl_FragColor.a += sin(time) - time;",
    "}"
  ].join("\n"),
  transparent: true,
  side: THREE.BackSide
});

export default outlineShader;
