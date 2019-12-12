import React, { useEffect, useRef } from "react";
import { TweenLite } from "gsap/TweenMax";
import { useMappedState } from "redux-react-hook";

export default function ViewportTrigger() {
	const mapState = React.useCallback(state => state, []);
	const { trigger, isOpen } = useMappedState(mapState);

	const arrow = useRef(null);
	const heads = useRef(null);
	const tails = useRef(null);

	useEffect(() => {
		if (trigger === "mouseEnter" && !isOpen) {
			TweenLite.to(arrow.current, 0.5, { opacity: 0, bottom: 20 });
			TweenLite.to(tails.current, 0.8, { opacity: 1 });
		}
		if (trigger === "mouseLeave" && !isOpen) {
			TweenLite.to(arrow.current, 0.5, { opacity: 0.5, bottom: 0 });
			TweenLite.to(tails.current, 0.8, { opacity: 0 });
		}
		if (trigger === "mouseEnter" && isOpen) {
			TweenLite.to(arrow.current, 0.5, { opacity: 0, bottom: 20 });
			TweenLite.to(heads.current, 0.8, { opacity: 1 });
		}
		if (trigger === "mouseLeave" && isOpen) {
			TweenLite.to(arrow.current, 0.5, { opacity: 0.5, bottom: 0 });
			TweenLite.to(heads.current, 0.8, { opacity: 0 });
		}
		if (trigger === "click" && isOpen) {
			TweenLite.to(heads.current, 0.8, { opacity: 0 });
			TweenLite.to(arrow.current, 0.5, { opacity: 0.5, bottom: 0 });
		}
		if (trigger === "click" && !isOpen) {
			TweenLite.to(tails.current, 0.8, { opacity: 0 });
		}
	}, [isOpen, trigger]);
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
				<p className="trigger__info__text">
					{" "}
					BACK TO THE PRESENTATION{" "}
				</p>
				<div className="trigger__info__bg trigger__info__bg--heads" />
			</div>

			<div className="trigger__info trigger__info--tails" ref={tails}>
				<p className="trigger__info__text"> ABOUT ME </p>
				<div className="trigger__info__bg trigger__info__bg--tails" />
			</div>
		</>
	);
}
