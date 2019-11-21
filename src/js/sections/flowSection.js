

import * as THREE from "three";

import Section from "../classes/SectionClass";

import FlowField from "../objects/FlowFieldObject3D";
import TextPanel from "../objects/TextPanelObject3D";

let flowSection = new Section("flow");

let points = [
  new THREE.Vector3(0, 50, 20),
  new THREE.Vector3(20, 0, -10),
  new THREE.Vector3(-20, -100, 0)
];

let field = new FlowField(points, {
  subsAmplitude: 50,
  subsNumber: 10
});
flowSection.add(field.el);

let text = new TextPanel("F  O  L  L  O  W \n T  H  E    T  R  E  N  D  S", {
  align: "center",
  style: "",
  size: 50,
  lineSpacing: 40
});
text.el.position.z = -10;
text.el.rotation.y = 0.4;
flowSection.add(text.el);

field.el.visible = false;

let fieldIn = false;

flowSection.fieldIn = function() {
  if (fieldIn) {
    return false;
  }

  fieldIn = true;

  field.in();
};

flowSection.onIn(function() {
  text.in();
});

flowSection.onOut(function(way) {
  text.out(way);
});

flowSection.onStart(function() {
  field.start();

  field.el.visible = true;
});

flowSection.onStop(function() {
  field.stop();

  field.el.visible = false;
});

export default flowSection;
