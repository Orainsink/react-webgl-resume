import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../styles/Main.scss";
import TopNav from "../components/TopNav"

import "fullpage.js/vendors/scrolloverflow";
import ReactFullpage from "@fullpage/react-fullpage";

export default class Main extends Component {
	fullpageOptions = {
		anchors: ["firstPage", "secondPage", "thirdPage", "fourthPage", "fifthPage", "sixthPage", "seventhPage"],
		sectionsColor: ["#000000", "#252626", "#4B4D4C", "#707372", "#969997", "#DEE3E1", "#FFFFFF"],
		callbacks: ["onLeave", "afterLoad"],
		navigation: true,
		navigationPosition: "right",
		scrollOverflow: true
	};
	init() {
		// 组件挂载结束后,关闭loading,初始化页面
		const Loading = document.getElementById("loading");
		setTimeout(() => {
			ReactDOM.findDOMNode(Loading).classList.add("close_loading");
			this.setState({
				step: "init"
			});
			setTimeout(() => {
				ReactDOM.findDOMNode(Loading).remove();
			}, 1000);
		}, 100);
	}
	componentDidMount() {
		this.init();
	}

	render() {
		return (
			<div>
				<TopNav />
				<FootNav />
				<ReactFullpage
					{...this.fullpageOptions}
					render={({ state, fullpageApi }) => {
						return (
							<div id="fullpage_wrapper">
								<div className="section">
									<h3>1</h3>
								</div>
								<div className="section">
									<h3>2</h3>
								</div>
								<div className="section">
									<h3>3</h3>
								</div>
								<div className="section">
									<h3>4</h3>
								</div>
								<div className="section">
									<h3>5</h3>
								</div>
								<div className="section">
									<h3>6</h3>
								</div>
								<div className="section">
									<h3>7</h3>
								</div>
							</div>
						);
					}}
				/>
			</div>
		);
	}
}


class FootNav extends Component {
	render() {
		return <div>

		</div>;
	}
}
