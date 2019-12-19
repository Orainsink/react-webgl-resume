import React, { useState } from "react";
import ReactHowler from "react-howler";
import { useMappedState } from "redux-react-hook";
import PageVisibility from "react-page-visibility";

export default function Sound() {
	const mapState = React.useCallback(state => state, []);
	const { mute, sounds, isOpen } = useMappedState(mapState);

	const [visibility, setVisibility] = useState(true);

	const soundsList = [
		{
			name: "background",
			src: [
				require("../../assets/sounds/background.ogg"),
				require("../../assets/sounds/background.mp3"),
				require("../../assets/sounds/background.wav")
			],
			volume: 0.05,
			loop: true
		},
		{
			name: "wind",
			src: [
				require("../../assets/sounds/wind.ogg"),
				require("../../assets/sounds/wind.mp3"),
				require("../../assets/sounds/wind.wav")
			]
		},
		{
			name: "whitenoise",
			src: [
				require("../../assets/sounds/whitenoise.ogg"),
				require("../../assets/sounds/whitenoise.mp3"),
				require("../../assets/sounds/whitenoise.wav")
			],
			volume: 0.05
		},
		{
			name: "neon",
			src: [
				require("../../assets/sounds/neon.ogg"),
				require("../../assets/sounds/neon.mp3"),
				require("../../assets/sounds/neon.wav")
			],
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
					mute={!visibility || mute || isOpen}
				/>
			))}
		</>
	);
}
