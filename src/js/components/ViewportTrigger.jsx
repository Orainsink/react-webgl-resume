import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMappedState } from "redux-react-hook";

export default function ViewportTrigger() {
	const mapState = React.useCallback(state => state, []);
	const { trigger, isOpen } = useMappedState(mapState);

	const arrow = useRef(null);
	const heads = useRef(null);
	const tails = useRef(null);

	useEffect(() => {
		if (trigger === "mouseEnter" && !isOpen) {
			gsap.to(arrow.current, { opacity: 0, bottom: 20, duration: 0.5 });
			gsap.to(tails.current, { opacity: 1, duration: 0.8 });
		}
		if (trigger === "mouseLeave" && !isOpen) {
			gsap.to(arrow.current, { opacity: 0.5, bottom: 0, duration: 0.5 });
			gsap.to(tails.current, { opacity: 0, duration: 0.8 });
		}
		if (trigger === "mouseEnter" && isOpen) {
			gsap.to(arrow.current, { opacity: 0, bottom: 20, duration: 0.5 });
			gsap.to(heads.current, { opacity: 1, duration: 0.8 });
		}
		if (trigger === "mouseLeave" && isOpen) {
			gsap.to(arrow.current, { opacity: 0.5, bottom: 0, duration: 0.5 });
			gsap.to(heads.current, { opacity: 0, duration: 0.8 });
		}
		if (trigger === "click" && isOpen) {
			gsap.to(heads.current, { opacity: 0, duration: 0.8 });
			gsap.to(arrow.current, { opacity: 0.5, bottom: 0, duration: 0.5 });
		}
		if (trigger === "click" && !isOpen) {
			gsap.to(tails.current, { opacity: 0, duration: 0.8 });
		}
	}, [trigger]);
	return (
		<>
			<div className="trigger__info trigger__info--arrow" ref={arrow}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 20">
					<path
						fill="none"
						stroke="#ffffff"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.5,5L12.5 15 22.5 5"
					/>
				</svg>
			</div>

			<div className="trigger__info trigger__info--heads" ref={heads}>
				<p className="trigger__info__text"> BACK TO THE PRESENTATION </p>
				<div className="trigger__info__bg trigger__info__bg--heads" />
			</div>

			<div className="trigger__info trigger__info--tails" ref={tails}>
				<p className="trigger__info__text"> ABOUT ME </p>
				<div className="trigger__info__bg trigger__info__bg--tails" />
			</div>
		</>
	);
}
