import Section from "../classes/SectionClass";
import TextPanel from "../objects/TextPanelObject3D";
import LookAtField from "../objects/LookAtFieldObject3D";
import device from "../utils/deviceUtil";

let endSection = new Section("end");

let text = new TextPanel("T  H  A  N  K  S \n F  O  R    W  A  T  C  H  I  N  G", {
	align: "center",
	style: "",
	size: 45,
	lineSpacing: device ? 50 : 40
});
endSection.add(text.el);

let field = new LookAtField({
	count: 50
});
endSection.add(field.el);

endSection.onIn(function() {
	text.in();
	field.in();
});

endSection.onOut(function(way) {
	text.out(way);
	field.out(way);
});

export default endSection;
