import React, { useEffect } from "react";
import { useMappedState } from "redux-react-hook";
import { TimelineLite } from "gsap/TimelineLite";

let hasStarted = false;
export default function About() {
	const mapState = React.useCallback(state => state, []);
	const { waypoint } = useMappedState(mapState);

	const publicPath = process.env.PUBLIC_URL;

	useEffect(() => {
		if (waypoint) {
			if (hasStarted) return;

			const tl = new TimelineLite();
			tl.staggerFromTo(
				".tails_ani",
				0.5,
				{ opacity: 0, y: 100 },
				{ opacity: 1, y: 0 },
				0.1
			);
			
			hasStarted = true;
		}
	}, [waypoint]);

	return (
		<div className="tails__section tails__section--about">
			<h1 className="tails__section__el tails_ani">
				HELLO{" "}
				<span className="placeholder--agency placeholder--agency--capital" />
			</h1>
			<h2 className="tails__section__el text--center tails_ani">
				I'm Oran, nice to meet you. <br />
			</h2>
			<div className="tails__section__el tails_ani">
				<p className="tails_ani">本名易文庭，摩羯座，男，24岁，是社畜。</p>
				<br />
				<p className="tails_ani">
					我喜欢和图形打交道，喜欢前端的工作，并且对
					摄影/图像处理/模型 有所涉猎。
				</p>
				<br />
				<p className="tails_ani">
					<span className={"bold"}>英语水平：</span>CET-6，听/读/写
					尚可，但平时也离不开谷歌翻译。
				</p>
				<br />
				<p className="tails_ani">
					<span className={"bold"}>学习经历：</span>
					2018年6月毕业于四川大学土木工程专业。
					大学期间学习理工科基础、8大力学以及工程制图，学习
					CAD，3Dmax等软件， 因为对 IT 感兴趣，于大三开始接触
					Python，大三下学期秋招时开始学习前端。
				</p>
				<br />
				<p className="tails_ani">
					<span className={"bold"}>工作经历：</span>
					大四开学春招时进入长虹股份有限公司担任前端工程师。
					2018年7月入职长虹互联网事业部。负责用 Vue
					完成多个后台管理系统前端，及H5页面开发。
				</p>
				<p className="tails_ani">
					2019年5月从长虹离职，同月入职美亚联环保科技，独立负责"早点星球"小程序，H5，web，后台及其他恰饭项目前端开发。
				</p>
				<br />
				<p className={"bold tails_ani"}>
					PDF简历：{"  "}
					<a
						href={publicPath + "/resume.pdf"}
						download="Oran_resume.pdf"
					>
						点我下载
					</a>
				</p>
				<div className="text--center tails_ani">
					<a className="tails__link placeholder--email">
						{" "}
						Contact me{" "}
					</a>
				</div>
				<p className="tails_ani">如果你对我感兴趣，欢迎通过以下方式联系我: </p>
				<br />
				<p className="tails_ani">
					<span className={"bold"}>邮箱: </span>
					ywt1250066597@gmail.com
				</p>
				<br />
				<p className="tails_ani">
					<span className={"bold"}>Git: </span>
					<a href="https://github.com/Orainsink" target={"_blank"}>
						Orainsink
					</a>
				</p>
				<br />
				<p className="tails_ani">
					<span className={"bold"}>Blog: </span>
					<a href="https://foolishrobot.xyz/about/" target={"_blank"}>
						Orainsink's Blog
					</a>
				</p>
				<br />
				<p className="tails_ani">
					<span className={"bold"}>WeChat nickName: </span>
					insinkORA
				</p>
			</div>
		</div>
	);
}
