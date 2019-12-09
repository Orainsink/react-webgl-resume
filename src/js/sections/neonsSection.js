import Section from "../classes/SectionClass";

import Smoke from "../objects/SmokeObject3D";
import Neon from "../objects/NeonObject3D";

let neonsSection = new Section("neons");

let smoke = new Smoke({
	planesNumber: 3,
	frontColor: "#4c4c4c",
	backColor: "#ffffff",
	data: [
		{
			positionX: -2.5,
			positionY: -18.8,
			positionZ: -6,
			rotationZ: 2.7,
			scale: 8.5
		},
		{
			positionX: -11.1,
			positionY: 10.3,
			positionZ: -10.4,
			rotationZ: 1.4,
			scale: 5.8
		},
		{
			positionX: -15.1,
			positionY: -5.9,
			positionZ: -19.2,
			rotationZ: 1.6,
			scale: 7.4
		}
	]
});
neonsSection.add(smoke.el);

let neonA = new Neon({ width: 5, radiusTop: 0.1, radiusBottom: 0.4 });
neonA.el.position.set(-2, 13, 0);
neonA.el.rotation.z = 1;
neonA.callback(() => neonsSection.cb());

let neonB = new Neon({ width: 20, radiusTop: 0.2, radiusBottom: 0.4 });
neonB.el.position.set(6, 0, 0);
neonB.el.rotation.z = 1;
neonB.callback(() => neonsSection.cb());

let neonC = new Neon({ radiusTop: 0.2, radiusBottom: 0.2 });
neonC.el.position.set(0, 8, 0);
neonC.el.rotation.z = 2;
neonC.callback(() => neonsSection.cb());

let neonD = new Neon({ radiusTop: 0.4, radiusBottom: 0.2 });
neonD.el.position.set(0, -1.5, 0);
neonD.el.rotation.z = 0.9 * Math.PI;
neonD.callback(() => neonsSection.cb());

neonsSection.add(neonA.el);
neonsSection.add(neonB.el);
neonsSection.add(neonC.el);
neonsSection.add(neonD.el);

neonA.el.visible = false;
neonB.el.visible = false;
neonC.el.visible = false;
neonD.el.visible = false;
smoke.el.visible = false;

neonsSection.onStart(function() {
	neonA.start();
	neonB.start();
	neonC.start();
	neonD.start();

	neonA.el.visible = true;
	neonB.el.visible = true;
	neonC.el.visible = true;
	neonD.el.visible = true;
});

neonsSection.onStop(function() {
	neonA.stop();
	neonB.stop();
	neonC.stop();
	neonD.stop();

	neonA.el.visible = false;
	neonB.el.visible = false;
	neonC.el.visible = false;
	neonD.el.visible = false;
});

let smokePlaying = false;

neonsSection.smokeStart = function() {
	if (smokePlaying) {
		return false;
	}

	smokePlaying = true;

	smoke.start();

	smoke.el.visible = true;
};

neonsSection.smokeStop = function() {
	if (!smokePlaying) {
		return false;
	}

	smokePlaying = false;

	smoke.stop();

	smoke.el.visible = false;
};

export default neonsSection;
