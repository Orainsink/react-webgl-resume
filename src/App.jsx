import React, { useState, useEffect } from "react";
import "./App.scss";
import Trigger from "./js/components/Trigger.jsx";
import Map from "./js/components/Map.jsx";
import Menu from "./js/components/Menu.jsx";
import Heads from "./js/components/Heads.jsx";
import Tails from "./js/components/Tails.jsx";
import Viewport from "./js/components/Viewport.jsx";
import Sound from "./js/components/Sound.jsx";

import { useDispatch, useMappedState } from "redux-react-hook";

function App() {
	const mapState = React.useCallback(state => state, []);
	const { trigger, isOpen, isSliding, sounds } = useMappedState(mapState);
	const dispatch = useDispatch();

	const [headsParam, setHeadsParam] = useState({});
	const [tailsParam, setTailsParam] = useState({});
	const setSounds = React.useCallback(payload => dispatch({ type: "setSounds", payload }), []);

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
	const setIsOpen = React.useCallback(blur => dispatch({ type: "setIsOpen", payload: blur }), []);
	const setTrigger = React.useCallback(payload => dispatch({ type: "setTrigger", payload }), []);
	/**
	 * navigation
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
	// 鼠标进入trigger
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

		setHeadsParam({ y, duration: 0.4, ease: "power2" });
		setTailsParam({ y, duration: 0.4, ease: "power2" });
	}
	// 鼠标离开trigger
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

		setHeadsParam({ y, ease: "power2" });
		setTailsParam({ y, ease: "power2" });
	}
	// 切换tail <-> heads
	function slide(callback) {
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
			if (callback) {
				callback();
			}
		}
		function slideBegin(to) {
			if (to === "heads") {
				setWaypoint(false);

				try {
					setSounds({ ...sounds, background: true });
				} catch (e) {
					console.warn(e);
				}
			} else {
				setSounds({ ...sounds, background: false });
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

		setHeadsParam({ y, duration: durations[0], ease: "power2" });
		setTailsParam({ y, duration: durations[1], ease: "power2" });

		setIsOpen(!isOpen);

		if (isOpen) {
			setTrigger("tails");
		} else {
			setTrigger("heads");
		}
	}

	return (
		<div className="App">
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
