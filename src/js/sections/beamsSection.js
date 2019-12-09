import Section from "../classes/SectionClass";
import Beam from "../objects/BeamObject3D";
import device from "../utils/deviceUtil";

let beamsSection = new Section("beams");

let leftBeam = new Beam({ color: "#808080", delay: 0.2 });
leftBeam.el.position.set(15, device ? 25 : 32, -10);
beamsSection.add(leftBeam.el);

let middleBeam = new Beam({
	color: "#ffffff",
	width: 4,
	cubeSize: 1,
	delay: 0.1
});
middleBeam.el.position.y = device ? 15 : 22;
beamsSection.add(middleBeam.el);

let rightBeam = new Beam({ color: "#4c4c4c", delay: 0.4 });
rightBeam.el.position.set(-20, device ? 30 : 37, -20);
beamsSection.add(rightBeam.el);

leftBeam.el.visible = false;
middleBeam.el.visible = false;
rightBeam.el.visible = false;

beamsSection.onIn(function() {
	leftBeam.in();
	middleBeam.in();
	rightBeam.in();
});

beamsSection.onOut(function(way) {
	leftBeam.out(way);
	middleBeam.out(way);
	rightBeam.out(way);
});

beamsSection.onStart(function() {
	leftBeam.start();
	middleBeam.start();
	rightBeam.start();

	leftBeam.el.visible = true;
	middleBeam.el.visible = true;
	rightBeam.el.visible = true;
});

beamsSection.onStop(function() {
	leftBeam.stop();
	middleBeam.stop();
	rightBeam.stop();

	leftBeam.el.visible = false;
	middleBeam.el.visible = false;
	rightBeam.el.visible = false;
});

export default beamsSection;
