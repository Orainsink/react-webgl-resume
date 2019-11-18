import React, { useState } from "react";
import ReactHowler from "react-howler";
import { useMappedState } from "redux-react-hook";
import PageVisibility from "react-page-visibility";

import background from "../../assets/sounds/background.ogg";
import wind from "../../assets/sounds/wind.ogg";
import whitenoise from "../../assets/sounds/whitenoise.ogg";
import neon from "../../assets/sounds/neon.ogg";

export default function Sound(props) {
	const mapState = React.useCallback(state => state, []);
	const { mute } = useMappedState(mapState);
	const [visibility, setVisibility] = useState(true);

	let { sound, playing } = props.params;
	sound = sound || "background";

	function soundError(e) {
		console.log(e);
	}

	const sounds = {
		background: {
			src: background,
			volume: 0.5,
			loop: true
		},
		wind: {
			src: wind
		},
		whitenoise: {
			src: whitenoise,
			volume: 0.5
		},
		neon: {
			src: neon,
			volume: 0.5
		}
	};

	return (
		<>
			<PageVisibility onChange={setVisibility} />
			<ReactHowler
				{...sounds[sound]}
				playing={playing}
				mute={!visibility || mute}
				onLoadError={soundError}
			/>
			;
		</>
	);
}
