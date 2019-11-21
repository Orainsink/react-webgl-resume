

import Section from "../classes/SectionClass";

import TextPanel from "../objects/TextPanelObject3D";
import Rocks from "../objects/RocksObject3D";

let rocksSection = new Section("rocks");

let rocks = new Rocks();
rocksSection.add(rocks.el);

let text = new TextPanel("K  E  E  P  \n  L  E  A  R  N  I  N  G", {
  align: "center",
  style: "",
  size: 50,
  lineSpacing: 40
});
text.el.position.set(0, 0, 0);
rocksSection.add(text.el);
text.out("down");

rocks.el.visible = false;

rocksSection.onIn(function() {
  text.in();
  rocks.in();
});

rocksSection.onOut(function(way) {
  text.out("down");
  rocks.out(way);
});

rocksSection.onStart(function() {
  rocks.start();
});

rocksSection.onStop(function() {
  rocks.stop();
});

rocksSection.show = function() {
  rocks.el.visible = true;
};

rocksSection.hide = function() {
  rocks.el.visible = false;
};

export default rocksSection;
