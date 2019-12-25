import React, { useState, useEffect } from "react";
import "./App.scss";
import Trigger from "./js/components/Trigger.jsx";
import Map from "./js/components/Map.jsx";
import Menu from "./js/components/Menu.jsx";
import Heads from "./js/components/Heads.jsx";
import Tails from "./js/components/Tails.jsx";
import Viewport from "./js/components/Viewport.jsx";
import Sound from "./js/components/Sound.jsx";
import Help from "./js/components/Help.jsx";

import { useDispatch, useMappedState } from "redux-react-hook";

function bodyScroll(e) {
	e.preventDefault();
}
function App() {
	const mapState = React.useCallback(state => state, []);
	const { trigger, isOpen, isSliding, device } = useMappedState(mapState);
	const dispatch = useDispatch();

	const [headsParam, setHeadsParam] = useState({});
	const [tailsParam, setTailsParam] = useState({});
	const setSounds = React.useCallback(
		payload => dispatch({ type: "setSounds", payload }),
		[]
	);

	const setHeadsVisib = React.useCallback(
		blur => dispatch({ type: "setHeadsVisib", payload: blur }),
		[]
	);
	const setIsSliding = React.useCallback(
		blur => dispatch({ type: "setIsSliding", payload: blur }),
		[]
	);
	const setWaypoint = React.useCallback(
		blur => dispatch({ type: "setWaypoint", payload: blur }),
		[]
	);
	const setDevice = React.useCallback(
		payload => dispatch({ type: "setDevice", payload }),
		[]
	);
	const setIsOpen = React.useCallback(
		blur => dispatch({ type: "setIsOpen", payload: blur }),
		[]
	);
	const setTrigger = React.useCallback(
		payload => dispatch({ type: "setTrigger", payload }),
		[]
	);

	/**
	 * 检测设备类型 device [true: web, false: phone]
	 */
	useEffect(() => {
		const tmp =
			navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/webOS/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/iPod/i) ||
			navigator.userAgent.match(/BlackBerry/i) ||
			navigator.userAgent.match(/Windows Phone/i);
		setDevice(!tmp);
	}, [device]);
	/**
	 * 处理trigger事件, 包括点击, 鼠标进入, 鼠标移除
	 */
	useEffect(() => {
		switch (trigger) {
			case "mouseEnter":
				open();
				break;
			case "mouseLeave":
				close();
				break;
			case "click":
				slide();
				break;
			default:
				break;
		}
	}, [trigger]);
	/**
	 * Heads时禁掉页面滚动, 用于处理微信/qq/safari浏览器下拉时会出现空白,以及夸克等浏览器会下拉刷新的bug
	 * tails时取消监听, 可以正常监听滚动事件.
	 */
	useEffect(() => {
		if (!isOpen) {
			document.body.addEventListener("touchmove", bodyScroll, {
				passive: false
			});
		} else {
			document.body.removeEventListener("touchmove", bodyScroll, {
				passive: false
			});
		}
	}, [isOpen]);
	/**
	 * 鼠标进入trigger时执行,
	 */
	function open() {
		let y, to;
		if (isOpen) {
			y = "-90%";
			to = "heads";
			setHeadsVisib(true);
		} else {
			y = "-10%";
			to = "tails";
		}

		setHeadsParam({ y, ease: "Power2" });
		setTailsParam({ y, ease: "Power2" });
	}

	/**
	 * 鼠标离开trigger时执行
	 */
	function close() {
		if (isSliding) return false;
		let y, to;

		if (isOpen) {
			to = "heads";
			y = "-100%";
		} else {
			to = "tails";
			y = "0%";
		}

		function onComplete() {
			if (to === "heads") {
				setHeadsVisib(false);
			}
		}

		setTimeout(() => {
			onComplete();
		}, 400);

		setHeadsParam({ y, ease: "Power2" });
		setTailsParam({ y, ease: "Power2" });
	}
	/**
	 * 切换tail <-> heads动作
	 */
	function slide() {
		setIsSliding(true);

		let to, y, durations;

		if (isOpen) {
			to = "heads";
			y = "0%";
			durations = [1.05, 1];
			setHeadsVisib(true);
		} else {
			to = "tails";
			y = "-100%";
			durations = [1, 1.05];
		}

		slideBegin(to);

		function onComplete() {
			setIsSliding(false);

			slideComplete(to);

			if (to === "tails") {
				setHeadsVisib(false);
			}
		}
		function slideBegin(to) {
			if (to === "heads") {
				setWaypoint(false);

				try {
					setSounds({ background: true });
				} catch (e) {
					console.warn(e);
				}
			} else {
				setSounds({ background: false });
			}
		}
		function slideComplete(to) {
			if (to === "tails") {
				setWaypoint(true);
			}
		}

		setTimeout(() => {
			onComplete();
		}, 400);

		setHeadsParam({ y, duration: durations[0], ease: "Power2" });
		setTailsParam({ y, duration: durations[1], ease: "Power2" });

		setIsOpen(!isOpen);
		setTrigger(null);
	}

	return (
		<div className="App">
			<Help />
			<Heads params={headsParam}>
				<Map />
				<Menu />
				<Viewport />
			</Heads>
			<Tails params={tailsParam} />
			<Trigger />
			<Sound />
		</div>
	);
}

export default App;
