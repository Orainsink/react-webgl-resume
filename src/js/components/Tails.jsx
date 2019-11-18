import React, { useEffect, useRef } from "react";
import "../../styles/Tails.scss";
import About from "./TailsAbout.jsx";
import Site from "./TailsSite.jsx";
import Skills from "./TailsSkills.jsx";
import gsap from "gsap";

export default function Tails(props) {
	const tails = useRef(null);

	useEffect(() => {
		gsap.to(tails.current, { ...props.params });
	}, [props.params]);

	return (
		<div className="tails" ref={tails}>
			<About />
			<Site />
			<Skills />
		</div>
	);
}
