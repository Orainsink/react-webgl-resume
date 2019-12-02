import * as THREE from "three";

/**
 * Section class
 *
 * @class Section
 * @constructor
 * @param {String} [name]
 * @requires THREE
 */
class Section {
  constructor(name) {
    this.name = name;
    this.playing = false;

    const fn = function() {};
    this._in = fn;
    this._out = fn;
    this._start = fn;
    this._stop = fn;
    this.cb = fn;

    this.el = new THREE.Object3D();
  }

  /**
   * Add a new object
   *
   * @method add
   * @param {THREE.Object3D} [object]
   */
  add(object) {
    this.el.add(object);
  }

  /**
   * Section's in animation
   *
   * @method in
   * @param {String} [way]
   */
  in(way) {
    this._in(way);
  }

  /**
   * Section's out animation
   *
   * @method out
   * @param {String} [way]
   */
  out(way) {
    this._out(way);
  }

  /**
   * Start the section
   *
   * @method start
   */
  start() {
    if (this.playing) {
      return false;
    }

    this._start();

    this.playing = true;
  }

  /**
   * Stop the section
   *
   * @method stop
   */
  stop() {
    if (!this.playing) {
      return false;
    }

    this._stop();

    this.playing = false;
  }

  /**
   * Pass the in handler
   *
   * @method onIn
   * @param {Function} [callback]
   */
  onIn(callback) {
    this._in = callback;
  }

  /**
   * Pass the out handler
   *
   * @method onOut
   * @param {Function} [callback]
   */
  onOut(callback) {
    this._out = callback;
  }

  /**
   * Pass the start handler
   *
   * @method onStart
   * @param {Function} [callback]
   */
  onStart(callback) {
    this._start = callback;
  }

  /**
   * Pass the stop handler
   *
   * @method onStop
   * @param {Function} [callback]
   */
  onStop(callback) {
    this._stop = callback;
  }

  /**
   * pass the callback function
   * @param {Function} [cb]
   */
  callback(cb){
    this.cb = cb
  }
}

export default Section;
