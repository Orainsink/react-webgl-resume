import React, { useEffect, useRef } from "react";
import "../../styles/Tails.scss";
import About from "./TailsAbout.jsx";
import Site from "./TailsSite.jsx";
import Skills from "./TailsSkills.jsx";
import { TweenMax } from "gsap/TweenMax";
import { useMappedState } from "redux-react-hook";

export default function Tails(props) {
	const tails = useRef(null);
	const mapState = React.useCallback(state => state, []);
	const { trigger, isOpen, device } = useMappedState(mapState);
	const arrow = useRef(null);

	useEffect(() => {
		TweenMax.to(tails.current, 0.4, { ...props.params });
	}, [props.params]);

	useEffect(() => {
		if (device) return;
		if (trigger === "click" && isOpen) {
			TweenMax.to(arrow.current, 0.8, { opacity: 0 });
		}
		if (trigger === "click" && !isOpen) {
			TweenMax.to(arrow.current, 0.5, {
				transform: "rotate(180deg)",
				opacity: 0.5,
				top: 0
			});
		}
	}, [trigger]);

	return (
		<div className="tails" style={{opacity: isOpen?1:0}} ref={tails}>
			{!device && (
				<div className="tails__info tails__info--arrow" ref={arrow}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 20">
						<path
							fill="none"
							stroke="#0a0a0a"
							strokeWidth="1"
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.5,5L12.5 15 22.5 5"
						/>
					</svg>
				</div>
			)}
			<About />
			<Site />
			<Skills />
		</div>
	);
}
