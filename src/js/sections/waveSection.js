import Section from "../classes/SectionClass";

import TextPanel from "../objects/TextPanelObject3D";
import Wave from "../objects/WaveObject3D";

let waveSection = new Section("wave");

let wave = new Wave();
waveSection.add(wave.el);

let text = new TextPanel("E  Y  E  S    O  N    T  H  E \n H  O  R  I  Z  O  N", {
	align: "center",
	style: "",
	size: 50,
	lineSpacing: 40
});
text.el.position.y = 10;
text.el.rotation.x = 0.2;
waveSection.add(text.el);

wave.el.visible = false;

waveSection.onIn(function(way) {
	text.in();
	wave.in(way);
});

waveSection.onOut(function(way) {
	text.out(way);
	wave.out(way);
});

waveSection.onStart(function() {
	wave.start();

	wave.el.visible = true;
});

waveSection.onStop(function() {
	wave.stop();

	wave.el.visible = false;
});

export default waveSection;
