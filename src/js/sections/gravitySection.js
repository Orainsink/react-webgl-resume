

import Section from "../classes/SectionClass";

import GravityGrid from "../objects/GravityGridObject3D";

let gravitySection = new Section("gravity");

let grid = new GravityGrid({
  linesColor: "#666666"
});
grid.el.position.z = 0;
grid.el.rotation.x = -1;
gravitySection.add(grid.el);

grid.el.visible = false;

gravitySection.onIn(function() {
  grid.in();
});

gravitySection.onOut(function() {
  grid.out();
});

gravitySection.onStart(function() {
  grid.start();
});

gravitySection.onStop(function() {
  grid.stop();
});

gravitySection.show = function() {
  grid.el.visible = true;
};

gravitySection.hide = function() {
  grid.el.visible = false;
};

export default gravitySection;
