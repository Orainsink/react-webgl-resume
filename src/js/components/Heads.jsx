import React, { useEffect, useRef } from "react";
import "../../styles/Heads.scss";
import { TweenLite } from "gsap/TweenMax";

export default function Heads(props) {
	const heads = useRef(null);

	useEffect(() => {
		TweenLite.to(heads.current, 0.4, { ...props.params });
	}, [props.params]);

	return (
		<div className={"heads"} ref={heads}>
			{props.children}
		</div>
	);
}
