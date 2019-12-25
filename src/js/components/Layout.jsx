import React, { useRef, useEffect } from "react";
import { TweenLite } from "gsap/TweenLite";
import "../../styles/Layout.scss";
import { useMappedState } from "redux-react-hook";

export default function Layout() {
	const mapState = React.useCallback(state => state, []);
	const { device } = useMappedState(mapState);
	const mouseRef = useRef(null);
	const clickRef = useRef(null);
	const containerRef = useRef(null);

	// targets
	let y = 0;
	let openY = -15;
	let mouseY = 90;

	useEffect(() => {
		const timer = setInterval(() => {
			slide();
		}, 4000);
		return () => clearInterval(timer);
	}, []);

	function slide() {
		// update targets
		if (y === 0) {
			y = -100;
			openY = -15;
			mouseY = 83;
		} else {
			y = 0;
			openY = -85;
			mouseY = 3;
		}
		moveMouse();

		function moveMouse() {
			let flag = false;

			TweenLite.to(mouseRef.current, 0.5, {
				top: mouseY + "%",
				onUpdate: function() {
					if (this.time() > 0.25) {
						flag = !flag;
						mouseRef.current && open();
					}
				}
			});
		}

		function open() {
			TweenLite.to(containerRef.current, 0.8, {
				top: openY + "%",
				onComplete: () => {
					containerRef.current && click();
				}
			});
		}

		function click() {
			let flag = false;
			TweenLite.fromTo(
				clickRef.current,
				0.4,
				{
					width: 70,
					height: 70,
					"margin-left": -35,
					"margin-top": -35,
					opacity: 0
				},
				{
					duration: 0.4,
					width: 0,
					height: 0,
					"margin-left": 0,
					"margin-top": 0,
					opacity: 1,
					delay: 0.5,
					onUpdate: function() {
						if (!flag && this.time() > 0.28) {
							flag = !flag;
							clickRef.current && slide();
						}
					}
				}
			);
		}

		function slide() {
			TweenLite.to(containerRef.current, 0.5, { top: y + "%" });
			centerMouse();
		}

		function centerMouse() {
			TweenLite.to(mouseRef.current, 0.5, { delay: 0.3, top: "45%" });
		}
	}

	return (
		<div className="help__layout">
			<div className="layout">
				<div className="layout__mouse" ref={mouseRef}>
					<div
						className={`layout__mouse__icon layout__mouse__icon__${
							device ? "mouse" : "tap"
						}`}
					/>
					<div className="layout__mouse__click" ref={clickRef} />
				</div>
				<div className="layout__frame" />
				<div className="layout__parts" ref={containerRef}>
					<div className="layout__part" />
					<div className="layout__part" />
				</div>
			</div>
		</div>
	);
}
