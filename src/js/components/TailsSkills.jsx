import React from "react";
import { Waypoint } from "react-waypoint";
import gsap from "gsap";

let hasStarted = false;
export default function Skills() {
	function start() {
		if (hasStarted) return;
		gsap.fromTo(
			".tails__section--skills .tails__section__el",
			{ opacity: 0, y: "10%" },
			{ opacity: 1, y: 0, duration: 0.5, delay: 1, stagger: 0.2 }
		);

		hasStarted = true;
	}

	return (
		<Waypoint onEnter={start}>
			<div className="tails__section tails__section--skills">
				<h1 className="tails__section__el"> MY SKILLS </h1>
				<h2 className="tails__section__el"> Javascript </h2>
				<div className="tails__section__el">
					<p>
						ES5 / ES6 <br />
						Node.js <br />
						Coffeescript <br />
						Typescript
					</p>
					<p>
						<span> Make life easier: </span> jQuery, Zepto, underscore.js <br />
						<span> WebGL: </span> Three.js <br />
						<span> Canvas: </span> paper.js, D3.js <br />
						<span> Animation: </span> TweenLite / TweenMax, Velocity.js <br />
						<span> MV* Frameworks: </span> Backbone.js, AngularJS, React <br />
						<span> Package manager: </span> Npm, Bower <br />
						<span> Dependencies injection: </span> AMD (requirejs), CommonJS (browserify) <br />
						<span> build tools: </span> Grunt, Gulp, Make <br />
						<span> features detection: </span> Modernizr <br />
						<span> Tests: </span> Jasmine, PhantomJS <br />
					</p>
				</div>

				<h2 className="tails__section__el"> HTML / CSS </h2>
				<div className="tails__section__el">
					<p>
						HTML5 / CSS3 <br />
						SVG
					</p>
					<p>
						Preprocessors: LESS, SASS <br />
						Modular: SMACSS, BEM
					</p>
				</div>
				<h2 className="tails__section__el"> Misc </h2>
				<div className="tails__section__el">
					<p>
						PHP: Cake PHP, Wordpress <br />
						Python &amp; Ruby <br />
						Version control: Git, SVN <br />
						I care about the elders: Polyfills and fallbacks for older browsers <br />
						Design patterns: MV*, Pubsub, Modules, Singleton, Decorator, ... <br />
						Adobe creative suite: Photoshop, Illustrator, InDesign, ... <br />
						3D: Maya
					</p>
				</div>
			</div>
		</Waypoint>
	);
}
