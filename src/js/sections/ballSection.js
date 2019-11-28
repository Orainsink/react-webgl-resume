import Section from "../classes/SectionClass";
import TextPanel from "../objects/TextPanelObject3D";
import Ball from "../objects/BallObject3D";
import Grid from "../objects/GridObject3D";
import device from "../utils/deviceUtil"

let ballSection = new Section("ball");

let ball = new Ball();
ball.el.rotation.z = 2;
ballSection.add(ball.el);

let grid = new Grid({
  step: 5,
  stepsX: 11,
  stepsY: 11,
  loop: true
});
grid.el.rotation.set(1.5, 1, 2);
grid.el.position.x = -20;
ballSection.add(grid.el);

let text = new TextPanel("G  I  V  E \n S  H  A  P  E", {
  align: "left",
  style: "",
  size: 50,
  lineSpacing: 40
});
if (device){
  text.el.position.set(15, 0, 15);
}else {
  text.el.position.set(-5, -15, 15);
}
text.el.rotation.y = -0.4;
ballSection.add(text.el);

ball.el.visible = false;
grid.el.visible = false;

ballSection.onIn(function() {
  ball.in();
  grid.in();
  text.in();
});

ballSection.onOut(function(way) {
  text.out(way);
  grid.out(way);

  if (way === "up") {
    ball.out();
  }
});

ballSection.onStart(function() {
  ball.start();
  grid.start();

  ball.el.visible = true;
  grid.el.visible = true;
});

ballSection.onStop(function() {
  ball.stop();
  grid.stop();

  ball.el.visible = false;
  grid.el.visible = false;
});

export default ballSection;
