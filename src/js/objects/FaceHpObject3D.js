import gsap from "gsap";
import yoyo from "../utils/yoyoUtil";
import matCap from "../materials/matCapMaterial";
import matCapShinyImg from "../../assets/images/matCap-shiny.jpg"
const THREE = require("three");
require("../utils/legacyJSONLoaderUtil");

matCap.uniforms.map.value = new THREE.TextureLoader().load(
  matCapShinyImg
);
/**
 * 3D face
 *
 * @class Face
 * @constructor
 * @requires THREE, TweenLite, random, yoyo, matCap
 */
class Face {
  constructor() {
    let group = new THREE.Object3D();

    let loader = new THREE.LegacyJSONLoader();
    loader.load("public/3D/face-hp.json", (geometry) => {
      let mesh = new THREE.Mesh(geometry, matCap);
      mesh.scale.x = 1.5;
      mesh.scale.y = 1.5;

      group.add(mesh);

      let idleTween = gsap.to({ y: -0.2 },  {
        duration: 2,
        y: 0.2,
        paused: true,
        onUpdate: function() {
          mesh.rotation.y = this._targets[0].y;
        },
        onComplete: yoyo,
        onReverseComplete: yoyo
      });

      this.in = function() {
        gsap.to(mesh.rotation, {duration:1.5,  x: 0 });
      };

      this.out = function(way) {
        let x = way === "up" ? -1 : 1;
        gsap.to(mesh.rotation, {duration: 1.5,  x: x });
      };

      this.start = function() {
        idleTween.resume();
      };

      this.stop = function() {
        idleTween.pause();
      };
    });

    this.el = group;
    this.start = function() {};
    this.stop = this.start;
    this.in = this.start;
    this.out = this.start;
  }
}

export default Face;