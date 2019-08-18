import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import "../styles/Main.scss"

export default class Main extends Component {
	state = {
		classes: {},
		showArrow: false
	};
	closeLoading() {
		// 组件挂载结束后,关闭loading,findDOMNode用来控制root以外的节点
		const Loading = document.getElementById("loading");
		setTimeout(()=>{
			ReactDOM.findDOMNode(Loading).classList.add("close_loading");
			this.initMain()
			setTimeout(()=>{
				ReactDOM.findDOMNode(Loading).remove()
			},1000)
		},3000)
	}
	initMain() {
		this.setState ({
			classes: {
				main: "main_init",
				mask: "",
				banner: "banner_init"
			},
			showArrow: true
		})
	}

	componentDidMount() {
		this.closeLoading()
	}
	arrow() {
		return <div className="arrow">
			<img src={ require("../assets/images/fire.gif") } alt=""/>
		</div>
	}

	render() {
		const state = this.state
		const classes = this.state.classes

		return (
			<div className={ `main ${classes.main}` }>
				<div className={ classes.banner } >
					<div className={ classes.mask } />
				</div>
				{ state.showArrow && this.arrow() }
				<SlideProgress />
				<TopNav />
				<View />
				<ControllerBox />
			</div>
		)
	}
}
class TopNav extends Component {
	render() {
		return (
				<div>
				</div>
		)
	}
}
class View extends Component {
	render() {
		return (
				<div>
				</div>
		)
	}

}
class ControllerBox extends Component {
	render() {
		return (
				<div>
				</div>
		)
	}
}
class SlideProgress extends Component {
	render() {
		return (
				<div>
				</div>
		)
	}
}
