

import Section from "../classes/SectionClass";

import TextPanel from "../objects/TextPanelObject3D";
import HeightMap from "../objects/HeightMapObject3D";

let heightSection = new Section("height");

let heightMap = new HeightMap({
  horizontal: true,
  vertical: false,
  plane: false,
  points: false,
  maps: [
    { name: "A", url: require("../../assets/images/heightMap-A.jpg") },
    { name: "B", url: require("../../assets/images/heightMap-B.jpg") },
    { name: "O", url: require("../../assets/images/heightMap-O.jpg") }
  ]
});
heightMap.el.position.z = -10;
heightMap.el.rotation.y = -0.6;
heightSection.add(heightMap.el);

let text = new TextPanel("L  E  T    I  T \n M  O  R  P  H", {
  align: "right",
  style: "",
  size: 50,
  lineSpacing: 40
});
text.el.position.set(-20, 0, 0);
heightSection.add(text.el);

heightMap.el.visible = false;

heightSection.onIn(function() {
  text.in();
});

heightSection.onOut(function(way) {
  text.out(way);
});

heightSection.onStart(function() {
  if (!heightMap.ready) {
    return false;
  }

  heightMap.start();
});

heightSection.onStop(function() {
  if (!heightMap.ready) {
    return false;
  }

  heightMap.stop();
});

heightSection.show = function() {
  heightMap.el.visible = true;
};

heightSection.hide = function() {
  heightMap.el.visible = false;
};

export default heightSection;
