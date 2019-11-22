import gsap from "gsap";
import Section from "../classes/SectionClass";
import City from "../objects/CityObject3D";

import grounds from "../../assets/3D/shanghai-grounds.json"
import buildings from "../../assets/3D/shanghai-buildings.json"
import towers from "../../assets/3D/shanghai-towers.json"

let citySection = new Section("city");

let city = new City();
city.addGroup({
  name: "shanghai",
  objs: {
    grounds: "src/assets/3D/shanghai-grounds.json",
    buildings:"src/assets/3D/shanghai-buildings.json",
    towers:"src/assets/3D/shanghai-towers.json",
  },
  outline: {
    ground: {
      offset: 0.2,
      solid: true
    }
  }
});

// city.el.rotation.y = Math.PI / 6;
city.el.rotation.y = 0;
city.el.rotation.z = Math.PI / 16;
city.el.position.set(5, -10, 0);
citySection.add(city.el);
city.showGroup("shanghai");

gsap.to(city.el.rotation, {
  duration:30,
  y: 2 * Math.PI,
  ease: "none",
  onComplete: function() {
    this.restart();
  }
});

citySection.onIn(function(way) {});

citySection.onOut(function(way) {});

citySection.onStart(function(way) {});

citySection.onStop(function(way) {});

export default citySection;
