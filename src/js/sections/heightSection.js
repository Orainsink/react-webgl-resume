import Section from "../classes/SectionClass";
import TextPanel from "../objects/TextPanelObject3D";
import HeightMap from "../objects/HeightMapObject3D";
import AImg from "../../assets/images/heightMap-A.jpg"
import OImg from "../../assets/images/heightMap-O.jpg"
import RImg from "../../assets/images/heightMap-R.jpg"
import NImg from "../../assets/images/heightMap-N.jpg"
import device from "../utils/deviceUtil"

let heightSection = new Section("height");

let heightMap = new HeightMap({
  horizontal: true,
  vertical: false,
  plane: false,
  points: false,
  maps: [
    { name: "O", url: OImg },
    { name: "R", url: RImg },
    { name: "A", url: AImg },
    { name: "N", url: NImg }
  ]
});
heightMap.el.position.z = -10;
heightMap.el.rotation.y = -0.6;
heightSection.add(heightMap.el);

let text = new TextPanel( device?"L  E  T    I  T\nM  O  R  P  H":"L  E  T    I  T    M  O  R  P  H", {
  align: "right",
  style: "",
  size: 50,
  lineSpacing: 40
});
if (device){
  text.el.position.set(-20, 0, 0);
}else {
  text.el.position.set(0, -25, 0);
}

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
