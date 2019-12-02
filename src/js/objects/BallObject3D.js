import * as THREE from "three";
import { TweenLite } from "gsap/TweenMax";
import random from "../utils/randomUtil";
import yoyo from "../utils/yoyoUtil";
import glitchMaterial from "../materials/glitchMaterial";
import textureBallImg from "../../assets/images/texture-ball.png"
import textureBallAlpha from "../../assets/images/texture-ballAlpha.png"

/**
 * Animated ball
 *
 * @class Ball
 * @constructor
 * @requires THREE, TweenLite, SOUNDS, random, yoyo, glitchMaterial
 */
class Ball {
  constructor() {
    this.cb = function(){};
    let _this = this;
    let texture = new THREE.TextureLoader().load(
      textureBallImg
    );
    let textureAlpha = new THREE.TextureLoader().load(
      textureBallAlpha
    );
    texture.wrapS = textureAlpha.wrapS = THREE.RepeatWrapping;
    texture.wrapT = textureAlpha.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = textureAlpha.repeat.x = 0;
    texture.repeat.y = textureAlpha.repeat.y = 0;

    let materialStripe = new THREE.MeshLambertMaterial({
      map: texture,
      color: "#ffffff",
      emissive: "#0a0a0a",
      depthWrite: false,
      depthTest: true,
      transparent: true,
      emissiveMap: texture
    });

    let geometry = new THREE.SphereGeometry(10, 30, 30);

    let mesh = new THREE.Mesh(geometry, materialStripe);

    let colorA = new THREE.Color("#0a0a0a");
    let colorB = new THREE.Color("#ffffff");

    // Make the ball blink once
    function blink() {
      materialStripe.emissive = colorB;
      materialStripe.color = colorA;

      _this.cb(true);
      TweenLite.delayedCall(random(0.1, 1), function() {
        materialStripe.emissive = colorA;
        materialStripe.color = colorB;
        _this.cb(false)
      });
    }

    // Make the ball glitch once
    function glitch() {
      mesh.material = glitchMaterial;
      _this.cb(true);

      TweenLite.delayedCall(random(0.2, 1), function() {
        mesh.material = materialStripe;
        _this.cb(false)
      });
    }

    let inTween = TweenLite.to({ y: 40, opacity: 0 }, 1.5, {
      y: 0,
      opacity: 1,
      paused: true,
      onUpdate: function() {
        mesh.position.y = this.target.y;
        materialStripe.opacity = this.target.opacity;
      }
    });

    let appearTweenSteps = 6;
    let appearTweenCurrent = 0;
    let repeatValues = [1, 10, 30, 0, 1, 5];

    let appearTween = TweenLite.to({}, 0.1,{
      paused: true,
      onComplete: function() {
        appearTweenCurrent++;

        if (appearTweenCurrent < appearTweenSteps) {
          mesh.material.map = textureAlpha;
          textureAlpha.repeat.set(1, repeatValues[appearTweenCurrent]);

          this.duration(0.2);
          this.restart();
        } else {
          mesh.material.map = texture;
          appearTweenCurrent = 0;
        }
      }
    });

    let rotateY = 0;
    let rotateX = 0;

    let idleTweens = {
      rotate: TweenLite.to({ textureRepeat: 3 }, 5, {
        textureRepeat: 8,
        paused: true,
        onUpdate: function() {
          texture.repeat.set(1, this.target.textureRepeat);

          mesh.rotation.y = rotateY;
          mesh.rotation.x = rotateX;

          rotateY += 0.01;
          rotateX += 0.02;
        },
        onComplete: yoyo,
        onReverseComplete: yoyo
      }),

      glitch: TweenLite.to({}, random(0.1, 5),{
        paused: true,
        onComplete: function() {
          glitch();
          this.duration(random(0.1, 5));
          this.restart();
        }
      }),

      blink: TweenLite.to({}, random(0.1, 5),{
        paused: true,
        onComplete: function() {
          blink();
          this.duration(random(0.1, 5));
          this.restart();
        }
      })
    };

    this.el = mesh;

    this.in = function() {
      inTween.play();
      appearTween.restart();
    };

    this.out = function() {
      inTween.reverse();
    };

    this.start = function() {
      idleTweens.rotate.resume();
      // idleTweens.glitch.resume();
      idleTweens.blink.resume();
    };

    this.stop = function() {
      idleTweens.rotate.pause();
      // idleTweens.glitch.pause();
      idleTweens.blink.pause();
    };
  }
  callback(cb){
    this.cb = cb
  }
}

export default Ball;
