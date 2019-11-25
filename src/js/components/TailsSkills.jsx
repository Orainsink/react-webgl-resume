import React from "react";
import { Waypoint } from "react-waypoint";
import { TweenMax } from "gsap/TweenMax";

let hasStarted = false;
export default function Skills() {
	function start() {
		if (hasStarted) return;
		TweenMax.staggerFromTo(
			".tails__section--skills .tails__section__el",
			0.5,
			{ opacity: 0, y: 100 },
			{ opacity: 1, y: 0, delay: 0.5 },
			0.1
		);

		hasStarted = true;
	}

	return (
		<Waypoint onEnter={start}>
			<div className="tails__section tails__section--skills">
				<h1 className="tails__section__el"> MY SKILLS </h1>
				<h2 className="tails__section__el"> Javascript </h2>
				<div className="tails__section__el">
					<p>
						<span className={"bold"}>ES6</span>
						<br />
						<span className={"bold"}>Node.js</span> <br />
						<span className={"bold"}>Typescript</span>
					</p>
					<p>
						<span className={"bold"}> 框架: </span> 掌握Vue，React，微信原生小程序，了解uni/taro{" "}
						<br />
						<span className={"bold"}> 响应式UI框架: </span> Element UI <br />
						<span className={"bold"}> 一把梭: </span> jQury，bootstrap <br />
						<span className={"bold"}> WebGL: </span> Three.js <br />
						<span className={"bold"}> Canvas: </span> D3.js <br />
						<span className={"bold"}> 动画库: </span> GSAP <br />
						<span className={"bold"}> 预处理: </span> babel，Sass，postcss <br />
						<span className={"bold"}> 打包工具: </span> Webpack <br />
						<span className={"bold"}> 测试工具: </span> jest，Karma，Mocha，Travis CI <br />
					</p>
				</div>

				<h2 className="tails__section__el"> HTML / CSS </h2>
				<div className="tails__section__el">
					<p>
						<span className={"bold"}>HTML5 / CSS3</span> <br />
					</p>
					<p>
						<span className={"bold"}>移动端兼容: </span>flexible-rem方案，vh/vw方案，媒体查询
					</p>
				</div>
				<h2 className="tails__section__el"> Misc </h2>
				<div className="tails__section__el">
					<p>
						<span className={"bold"}>Python </span>
						<br />
						<span className={"bold"}>代码托管工具: </span>Git，SVN <br />
						<span className={"bold"}>设计软件: </span>PS，AI，LR，XD，Maya，CAD <br />
					</p>
				</div>
			</div>
		</Waypoint>
	);
}
