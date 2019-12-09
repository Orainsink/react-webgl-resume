export default function reducer(state, action) {
	if (!state) {
		return null;
	}

	switch (action.type) {
		case "setDevice": {
			let device = action.payload;
			return { ...state, device };
		}

		case "setTrigger": {
			let trigger = action.payload;
			return { ...state, trigger };
		}

		case "setMute": {
			let mute = !state.mute;
			return { ...state, mute };
		}

		case "setHelp": {
			let help = !state.help;
			return { ...state, help };
		}

		case "setSounds": {
			let sounds = action.payload;
			return { ...state, sounds };
		}

		case "setIsSliding": {
			let isSliding = action.payload;
			return { ...state, isSliding };
		}

		case "setQuality": {
			let quality = state.quality === 0.5 ? 1 : 0.5;
			return { ...state, quality };
		}

		case "setHeadsVisib": {
			return { ...state, headsVisib: action.payload };
		}

		case "setIsOpen": {
			return { ...state, isOpen: action.payload };
		}

		case "setWaypoint": {
			return { ...state, waypoint: action.payload };
		}

		case "setMap": {
			return { ...state, map: action.payload };
		}

		case "setMapScrollTo": {
			return { ...state, mapScrollTo: action.payload };
		}

		case "setSectionChangeBegin": {
			return { ...state, sectionChangeBegin: action.payload };
		}

		case "setSectionChangeComplete": {
			return { ...state, sectionChangeComplete: action.payload };
		}

		default:
			return state;
	}
}
