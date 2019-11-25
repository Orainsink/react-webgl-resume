import React, { useEffect, useRef } from "react";
import "../../styles/Tails.scss";
import About from "./TailsAbout.jsx";
import Site from "./TailsSite.jsx";
import Skills from "./TailsSkills.jsx";
import { TweenLite } from "gsap/TweenMax";

export default function Tails(props) {
	const tails = useRef(null);

	useEffect(() => {
		TweenLite.to(tails.current, 0.4, { ...props.params });
	}, [props.params]);

	return (
		<div className="tails" ref={tails}>
			<About />
			<Site />
			<Skills />
		</div>
	);
}
