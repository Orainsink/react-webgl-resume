import { useEffect, useRef } from "react";
import TweenLite from "gsap/TweenLite";
import TimelineMax from "gsap/TimelineMax";
import React from "react";
import "../../styles/Mouse.scss";

export default function Mouse() {
	const mouseWheelRef = useRef(null);
	let y = 0;

	useEffect(() => {
		const timer = setInterval(() => {
			scroll();
		}, 2000);
		return () => clearInterval(timer);
	}, []);

	function scroll() {
		TweenLite.to(mouseWheelRef.current, 400, { opacity: 1 });

		y = -80 - y;
		const tl = new TimelineMax();
		tl.to(".mouse__wheel__line", 500, { top: y });
		tl.to(".mouse__wheel__line", 300, { opacity: 0.2 });
	}

	return (
		<div className="mouse">
			<div className="mouse__body">
				<div className="mouse__body__line" />
			</div>
			<div className="mouse__wheel" ref={mouseWheelRef}>
				<div className="mouse__wheel__lines">
					<div className="mouse__wheel__line" />
					<div className="mouse__wheel__line" />
					<div className="mouse__wheel__line" />
					<div className="mouse__wheel__line" />
					<div className="mouse__wheel__line" />
					<div className="mouse__wheel__line" />
				</div>
			</div>
		</div>
	);
}
