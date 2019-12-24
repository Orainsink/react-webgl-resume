import React from "react";
import { Waypoint } from "react-waypoint";
// import { TweenMax } from "gsap/TweenMax";
import { TimelineLite } from "gsap/TimelineLite";

let hasStarted = false;
export default function Skills() {
	function start() {
		if (hasStarted) return;
		const tl = new TimelineLite()
		tl.staggerFromTo(
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
						掌握<span className={"bold"}> ES6</span>
						<br />
						能使用<span className={"bold"}> Node.js</span> <br />
						能使用<span className={"bold"}> Typescript</span>
					</p>
					<p>
						<span className={"bold"}> 框架: </span>{" "}
						掌握Vue，React，微信原生小程序，了解uni/taro <br />
						<span className={"bold"}> 响应式UI框架: </span>能使用
						Element UI <br />
						<span className={"bold"}> 一把梭: </span> 能使用
						jQury，bootstrap <br />
						<span className={"bold"}> WebGL: </span>能使用 Three.js{" "}
						<br />
						{/*<span className={"bold"}> Canvas: </span> D3.js <br />*/}
						<span className={"bold"}> 动画库: </span>熟练使用 GSAP{" "}
						<br />
						<span className={"bold"}> 预处理: </span>
						能使用 babel，Sass，postcss <br />
						<span className={"bold"}> 打包工具: </span>
						能手动配置 Webpack <br />
						<span className={"bold"}> 测试工具: </span>
						能使用 Karma，Mocha，Travis CI <br />
					</p>
				</div>

				<h2 className="tails__section__el"> HTML / CSS </h2>
				<div className="tails__section__el">
					<p>
						掌握<span className={"bold"}> HTML5 / CSS3 / SVG</span>{" "}
						<br />
						能绘制<span className={"bold"}> SVG, Canvas</span>{" "}
					</p>
					<p>
						<span className={"bold"}>移动端兼容: </span>
						flexible-rem方案，vh/vw方案，媒体查询
					</p>
				</div>
				<h2 className="tails__section__el"> Misc </h2>
				<div className="tails__section__el">
					<p>
						<span className={"bold"}>代码托管工具: </span>Git
						<br />
						<span className={"bold"}>设计软件: </span>
						PS，AI，LR，XD，CAD <br />
					</p>
				</div>
			</div>
		</Waypoint>
	);
}
