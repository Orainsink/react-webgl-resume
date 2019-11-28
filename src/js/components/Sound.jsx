import React, { useState } from "react";
import ReactHowler from "react-howler";
import { useMappedState } from "redux-react-hook";
import PageVisibility from "react-page-visibility";

import background from "../../assets/sounds/background.ogg";
import wind from "../../assets/sounds/wind.ogg";
import whitenoise from "../../assets/sounds/whitenoise.ogg";
import neon from "../../assets/sounds/neon.ogg";

export default function Sound() {
	const mapState = React.useCallback(state => state, []);
	const { mute, sounds } = useMappedState(mapState);

	const [visibility, setVisibility] = useState(true);

	const soundsList = [
		{ name: "background", src: background, volume: 0.5, loop: true },
		{ name: "wind", src: wind },
		{
			name: "whitenoise",
			src: whitenoise,
			volume: 0.5
		},
		{
			name: "neon",
			src: neon,
			volume: 0.5
		}
	];

	return (
		<>
			<PageVisibility onChange={setVisibility} />
			{soundsList.map((item, i) => (
				<ReactHowler
					key={i}
					{...item}
					playing={sounds[item.name] || false}
					mute={!visibility || mute}
				/>
			))}
		</>
	);
}
