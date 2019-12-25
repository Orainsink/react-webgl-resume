import React, { useEffect, useRef } from "react";
import "../../styles/Heads.scss";
import { TweenMax } from "gsap/TweenMax";

export default function Heads(props) {
	const heads = useRef(null);

	useEffect(() => {
		TweenMax.to(heads.current, 0.4, { ...props.params });
	}, [props.params]);

	return (
		<div className={"heads"} ref={heads}>
			{props.children}
		</div>
	);
}
