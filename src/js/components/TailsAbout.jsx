import React, { useEffect } from "react";
import { useMappedState } from "redux-react-hook";
import gsap from "gsap";

let hasStarted = false;
export default function About() {
	const mapState = React.useCallback(state => state, []);
	const { waypoint } = useMappedState(mapState);

	useEffect(() => {
		if (waypoint) {
			if (hasStarted) return;
			gsap.fromTo(
				".tails__section--about .tails__section__el",
				{ opacity: 0, y: "10%" },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
			);

			hasStarted = true;
		}
	}, [waypoint]);

	return (
		<div className="tails__section tails__section--about">
			<h1 className="tails__section__el">
				HELLO <span className="placeholder--agency placeholder--agency--capital" />
			</h1>
			<h2 className="tails__section__el text--center">
				I'm V, a french creative / front end developer. <br />
				And I want to work for you.
			</h2>
			<div className="tails__section__el">
				<p>I love to experiment, iterate and build premium experiences.</p>
				<p>
					I studied graphic design for a few years, and then started coding, at first to enrich my
					reflection and get a better understanding of how a project is conducted, but soon for the
					thrill of it.
				</p>
				<p>
					After working in Shanghai for more than a year as a web developer, it's time for a change.
					I'm looking to work for an agency with curious, dynamic and innovative people, and I think{" "}
					<span className="placeholder--agency placeholder--agency--you" /> can be the one for me.
				</p>
				<p>
					To conclude, I am a hardworker with team spirit, creative, curious, and eager to learn new
					things.
				</p>
				<p>
					I'm of course available for any questions you might have. You can contact me at
					valentin.marmonier@gmail.com
				</p>
				<div className="text--center">
					<a className="tails__link placeholder--email"> Contact me </a>
				</div>
				<p>Thank you in advance for your time.</p>
				<p>Valentin Marmonier</p>
			</div>
		</div>
	);
}
