import React, { useState, useRef } from "react";
import "../../styles/TailsSite.scss";
import { Waypoint } from "react-waypoint";
import { TweenMax } from "gsap/TweenMax";
import { TimelineMax } from "gsap";

let interval = null;
let hasStarted = false;

export default function Site() {
	let currentPosition = 0;

	const [leftColumn, setLeftColumn] = useState({});

	const $elh = useRef(null);
	const $elw = useRef(null);
	const $elp = useRef(null);
	const textLines = [];

	function animate() {
		// wireframe timeline
		const tl1 = new TimelineMax();
		const tl2 = new TimelineMax();
		tl1.staggerTo(".wireframe__frame--top", 0.2, { width: "100%" }, 0.1);
		tl1.staggerTo(".wireframe__frame--bottom", 0.2, { width: "100%" }, 0.1);
		TweenMax.staggerTo(".wireframe__frame--left", 0.2, { height: "100%" }, 0.2);
		TweenMax.staggerTo(".wireframe__frame--right", 0.6, { height: "100%" }, 0.2);
		TweenMax.staggerTo(".wireframe__controls__node", 0.8, { top: 0 }, 0.2);
		textLines.forEach(item => {
			const width = item.className.includes("wireframe__text__line--incomplete") ? "60%" : "100%";
			tl2.to(item, 0.1, { width: width });
		});

		TweenMax.staggerFromTo(
			".tails__section--site .tails__section__el",
			0.5,
			{ opacity: 0, y: 100 },
			{ opacity: 1, y: 0, delay: 1 },
			0.8
		);

		hasStarted = true;
	}

	function start() {
		!hasStarted && animate();

		// left column interval
		if (interval) return;
		const positions = [-20, -90, -135, -200, -20, 40];
		const totalPositions = positions.length;
		interval = setInterval(() => {
			if (currentPosition > totalPositions) {
				currentPosition = 0;
			}
			setLeftColumn({ top: positions[currentPosition] + "px" });
			currentPosition++;
		}, 2000);
	}

	function stop() {
		if (!interval) return true;

		clearInterval(interval);
		interval = null;
	}

	return (
		<Waypoint onEnter={start} onLeave={stop}>
			<div className={`tails__section tails__section--site`}>
				<h1 className="tails__section__el" ref={$elh}>
					ABOUT THIS WEBSITE
				</h1>

				<div className="wireframe" ref={$elw}>
					<div className="wireframe__page">
						<div className={`wireframe__frame--left `} />
						<div className={`wireframe__frame--right`} />
						<div className={`wireframe__frame--top`} />
						<div className={`wireframe__frame--bottom`} />
						<div className={`wireframe__column wireframe__column--left`} style={leftColumn}>
							<div className="wireframe__picture wireframe__picture--tall">
								<div className={`wireframe__frame--left`} />
								<div className={`wireframe__frame--right`} />
								<div className={`wireframe__frame--top `} />
								<div className={`wireframe__frame--bottom`} />
								<div className="wireframe__controls">
									<div className={`wireframe__controls__node `} />
									<div className={`wireframe__controls__node`} />
									<div className={`wireframe__controls__node `} />
									<div className={`wireframe__controls__node `} />
								</div>
							</div>
							<div className="wireframe__break" />
							<div className="wireframe__picture wireframe__picture--left">
								<div className={`wireframe__frame--left `} />
								<div className={`wireframe__frame--right `} />
								<div className={`wireframe__frame--top`} />
								<div className={`wireframe__frame--bottom`} />
							</div>
							<div className="wireframe__text wireframe__text--right">
								<div className={`wireframe__text__line`} ref={div => (textLines[0] = div)} />
								<div className={`wireframe__text__line`} ref={div => (textLines[1] = div)} />
								<div
									className={`wireframe__text__line wireframe__text__line--incomplete`}
									ref={div => (textLines[2] = div)}
								/>
							</div>
							<div className="wireframe__break" />
							<div className="wireframe__text">
								<div className={`wireframe__text__line`} ref={div => (textLines[3] = div)} />
								<div className={`wireframe__text__line`} ref={div => (textLines[4] = div)} />
								<div
									className={`wireframe__text__line wireframe__text__line--incomplete`}
									ref={div => (textLines[5] = div)}
								/>
							</div>
							<div className="wireframe__break" />
							<div className="wireframe__picture wireframe__picture--right">
								<div className={"wireframe__frame--left"} />
								<div className={`wireframe__frame--right`} />
								<div className={`wireframe__frame--top`} />
								<div className={"wireframe__frame--bottom"} />
							</div>
							<div className="wireframe__text wireframe__text--left">
								<div className={`wireframe__text__line`} ref={div => (textLines[6] = div)} />
								<div className={`wireframe__text__line`} ref={div => (textLines[7] = div)} />
								<div
									className={`wireframe__text__line wireframe__text__line--incomplete`}
									ref={div => (textLines[8] = div)}
								/>
							</div>
						</div>
						<div className="wireframe__column wireframe__column--right">
							<div className="wireframe__picture">
								<div className={`wireframe__frame--left `} />
								<div className={`wireframe__frame--right`} />
								<div className={`wireframe__frame--top `} />
								<div className={`wireframe__frame--bottom`} />
							</div>
							<div className="wireframe__break" />
							<div className="wireframe__text">
								<div className={`wireframe__text__line`} ref={div => (textLines[9] = div)} />
								<div className={`wireframe__text__line`} ref={div => (textLines[10] = div)} />
								<div
									className={`wireframe__text__line wireframe__text__line--incomplete`}
									ref={div => (textLines[11] = div)}
								/>
							</div>
							<div className="wireframe__break" />
							<div className="wireframe__picture wireframe__picture--tall">
								<div className={`wireframe__frame--left `} />
								<div className={`wireframe__frame--right `} />
								<div className={`wireframe__frame--top`} />
								<div className={`wireframe__frame--bottom`} />
							</div>
						</div>
					</div>
				</div>

				<p className={"tails__section--site__p"} ref={$elp}>
					这个网站是我学习 React Hooks，Three.js，GSAP3.0 时的练手产物，感谢原作者 @Valentin 发布的{" "}
					<br />
					Extraordinary Experiment:{" "}
					<a href="https://github.com/vaalentin/2015" target={"_blank"}>
						https://github.com/vaalentin/2015
					</a>
					<br />
					重写一个5年前的项目总是会遇到非常多的困难，当我把源码下载下来但是根本跑不通的时候，
					我就感觉可能不好啃了，jQuery和React是两种完全不同的思维方式，
					在初步重写的过程中我用了大量的ref，以此获取dom元素，再用gsap来达到原项目的动画效果，
					但是这样直接操纵dom的方式有悖react的设计理念，也会产生性能的问题，
					我在想办法移除不必要的dom操作。
					<br />
					webGL 很难，但是真的很有趣。
				</p>
			</div>
		</Waypoint>
	);
}
