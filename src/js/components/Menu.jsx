import React, { useState, useRef } from "react";
import "../../styles/Menu.scss";
import { useDispatch, useMappedState } from "redux-react-hook";
import { TweenLite } from "gsap/TweenMax";
import { TimelineMax } from "gsap";

export default function Menu() {
	const mapState = React.useCallback(state => state, []);
	const { isOpen, mute, quality, device } = useMappedState(mapState);
	const dispatch = useDispatch();

	const [active, setActive] = useState(false);

	const setQuality = React.useCallback(() => {
		dispatch({ type: "setQuality" });
	}, []);
	const setMute = React.useCallback(() => {
		dispatch({ type: "setMute" });
	}, []);
	const setHelp = React.useCallback(() => {
		dispatch({ type: "setHelp" });
	}, []);
	const setTrigger = React.useCallback(blur => dispatch({ type: "setTrigger", payload: blur }), []);

	const menu = useRef(null);
	const menuButton = useRef(null);
	const menuItems = useRef(null);
	const menuItem = [];

	function mouseover() {
		setActive(true);

		TweenLite.to(menu.current, 0.4, { left: 0, ease: window.Linear.easeNone });
		TweenLite.to(menuButton.current, 0.4, { opacity: 0 });
		const tl = new TimelineMax();
		menuItem.forEach(item => {
			tl.fromTo(item, 0.2, { opacity: 0 }, { opacity: 1 });
		});
	}

	function mouseout() {
		setActive(false);

		TweenLite.to(menu.current, 0.4, { left: 30, ease: window.Linear.easeNone });
		TweenLite.to(menuButton.current, 0.4, { opacity: 1 });
	}

	function tap() {
		if (!device && !active) {
			mouseover();
		}
	}

	return (
		!isOpen && (
			<div
				className={`menu`}
				onMouseEnter={mouseover}
				onMouseLeave={mouseout}
				ref={menu}
				onClick={tap}
			>
				<div className="menu__button" ref={menuButton}>
					<div className="menu__button__line menu__button__line--top" />
					<div className="menu__button__line menu__button__line--middle" />
					<div className="menu__button__line menu__button__line--bottom" />
				</div>
				<div className={`menu__items ${active ? "active" : ""}`} ref={menuItems}>
					<a className="menu__item menu__items--3D" ref={a => (menuItem[0] = a)} onClick={setMute}>
						{mute ? " UNMUTE " : " MUTE "}
					</a>
					<a className="menu__item menu__items--3D" ref={a => (menuItem[1] = a)} onClick={setHelp}>
						{" HELP "}
					</a>
					<a
						className="menu__item menu__items--3D"
						ref={a => (menuItem[2] = a)}
						onClick={setTrigger.bind(this, "click")}
					>
						{" CONTACT "}
					</a>
					<a
						className="menu__item menu__items--3D"
						ref={a => (menuItem[3] = a)}
						onClick={setQuality}
						style={{ whiteSpace: "nowrap" }}
					>
						{` QUALITY : ${quality} `}
					</a>
				</div>
			</div>
		)
	);
}
