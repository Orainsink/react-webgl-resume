import React, { useState, useEffect } from "react";
import "../../styles/Keys.scss";

export default function Keys() {
	const [current, setCurrent] = useState("top");

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent(current === "top" ? "bottom" : "top");
		}, 1000);
		return () => clearInterval(timer);
	}, [current]);

	return (
		<div className="keys">
			<div className="key key--left">
				<div className="key__triangle key__triangle--left" />
			</div>
			<div className={`key key--bottom ${current === "bottom" ? "key__active" : ""}`}>
				<div className="key__triangle key__triangle--bottom" />
			</div>
			<div className={`key key--top ${current === "top" ? "key__active" : ""}`}>
				<div className="key__triangle key__triangle--top" />
			</div>
			<div className="key key--right">
				<div className="key__triangle key__triangle--right" />
			</div>
		</div>
	);
}
