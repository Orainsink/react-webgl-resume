import { TweenMax } from "gsap/TweenMax";
import Section from "../classes/SectionClass";
import City from "../objects/CityObject3D";

let citySection = new Section("city");
const publicPath = process.env.PUBLIC_URL;
let city = new City();
city.addGroup({
	name: "shanghai",
	objs: {
		grounds: publicPath + "/3D/shanghai-grounds.json",
		buildings: publicPath + "/3D/shanghai-buildings.json",
		towers: publicPath + "/3D/shanghai-towers.json"
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

TweenMax.to(city.el.rotation, 30, {
	y: 2 * Math.PI,
	ease: "Power0.easeNone",
	onComplete: function() {
		this.restart();
	}
});

citySection.onIn(function(way) {});

citySection.onOut(function(way) {});

citySection.onStart(function(way) {});

citySection.onStop(function(way) {});

export default citySection;
