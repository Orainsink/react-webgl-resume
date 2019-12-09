import React from "react";
import "../../styles/Trigger.scss";
import { useDispatch, useMappedState } from "redux-react-hook";

export default function Trigger() {
	const mapState = React.useCallback(state => state, []);
	const { isOpen } = useMappedState(mapState);
	const dispatch = useDispatch();

	const setTrigger = React.useCallback(
		payload => dispatch({ type: "setTrigger", payload }),
		[]
	);

	return (
		<div
			className={`trigger trigger_${isOpen ? "top" : "bottom"}`}
			onMouseEnter={setTrigger.bind(this, "mouseEnter")}
			onMouseLeave={setTrigger.bind(this, "mouseLeave")}
			onClick={setTrigger.bind(this, "click")}
		/>
	);
}
