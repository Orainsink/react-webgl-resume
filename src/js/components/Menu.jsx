import React, { useState, useRef } from "react";
import "../../styles/Menu.scss";
import { useDispatch, useMappedState } from "redux-react-hook";
import gsap from "gsap";

export default function Menu() {
	const mapState = React.useCallback(state => state, []);
	const { isOpen, mute, quality } = useMappedState(mapState);
	const dispatch = useDispatch();

	const [active, setActive] = useState(false);

	const setQuality = React.useCallback(() => {
		dispatch({ type: "setQuality" });
	}, []);
	const setMute = React.useCallback(() => {
		dispatch({ type: "setMute" });
	}, []);

	const menu = useRef(null);
	const menuButton = useRef(null);
	const menuItems = useRef(null);
	const menuItem = [];

	function mouseover() {
		setActive(true);

		gsap.to(menu.current, { left: 0, duration: 0.4, ease: "power2" });
		gsap.to(menuButton.current, { opacity: 0, duration: 0.4 });
		const tl = gsap.timeline();
		menuItem.forEach(item => {
			tl.fromTo(item, { opacity: 0 }, { opacity: 1, duration: 0.2 });
		});
	}
	function mouseout() {
		setActive(false);

		gsap.to(menu.current, { left: 30, duration: 0.4, ease: "power2" });
		gsap.to(menuButton.current, { opacity: 1, duration: 0.4 });
	}

	return (
		!isOpen && (
			<div className={`menu`} onMouseEnter={mouseover} onMouseLeave={mouseout} ref={menu}>
				<div className="menu__button" ref={menuButton}>
					<div className="menu__button__line menu__button__line--top" />
					<div className="menu__button__line menu__button__line--middle" />
					<div className="menu__button__line menu__button__line--bottom" />
				</div>
				<div className={`menu__items ${active ? "active" : ""}`} ref={menuItems}>
					<a className="menu__item menu__items--3D" ref={a => (menuItem[0] = a)} onClick={setMute}>
						{mute ? " UNMUTE " : " MUTE "}
					</a>
					<a className="menu__item menu__items--3D" ref={a => (menuItem[1] = a)}>
						{" HELP "}
					</a>
					<a className="menu__item menu__items--3D" ref={a => (menuItem[2] = a)}>
						{" CONTACT "}
					</a>
					<a
						className="menu__item menu__items--3D"
						ref={a => (menuItem[3] = a)}
						onClick={setQuality}
					>
						{` QUALITY : ${quality} `}
					</a>
				</div>
			</div>
		)
	);
}
