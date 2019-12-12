import React, { useState, useEffect, useRef } from "react";
import "../../styles/Map.scss";
import { useDispatch, useMappedState } from "redux-react-hook";

let renderd = false;
export default function Map() {
	const mapState = React.useCallback(state => state, []);
	const { map } = useMappedState(mapState);
	const dispatch = useDispatch();

	const setMapScrollTo = React.useCallback(
		payload => dispatch({ type: "setMapScrollTo", payload }),
		[]
	);

	const [mapList, setMapList] = useState([]);

	function scrollTo(index) {
		console.log("scrollTo", index);
		if (index !== map.now) setMapScrollTo(index);
	}

	useEffect(() => {
		if (!map.count || renderd) return;
		let tmp = new Array(map.count).fill(0);
		setMapList(tmp);
		renderd = true;
	}, [map]);

	const mapRef = useRef(null);

	return (
		<div className="map" ref={mapRef}>
			{mapList.map((item, index) => (
				<div
					className={`map__node ${
						index === map.now ? "is-active" : ""
					}`}
					onClick={scrollTo.bind(this, index)}
					key={index}
				/>
			))}
		</div>
	);
}
