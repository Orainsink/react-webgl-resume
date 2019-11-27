import { useEffect, useRef, useState } from "react";
import TweenLite from "gsap/TweenLite";
import TimelineMax from "gsap/TimelineMax";
import React from "react";
import "../../styles/Mouse.scss";

export default function Mouse() {
	const mouseWheelRef = useRef(null);
	const [y, setY] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			scroll();
		}, 2000);
		return () => clearInterval(timer);
	}, [y]);

	function scroll() {
		setY(-80 - y);
		const tl = new TimelineMax();
		TweenLite.to(mouseWheelRef.current, 0.4, { opacity: 1 });
		tl.to(".mouse__wheel__line", 0.5, { top: y + "%" });
		tl.to(".mouse__wheel", 0.3, { opacity: 0.2 });
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
