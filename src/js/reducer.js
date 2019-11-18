export default function reducer(state, action) {
	if (!state) {
		return null;
	}

	switch (action.type) {
		case "setEvent": {
			return {
				...state,
				event: action.payload
			};
		}

		case "setTrigger": {
			let trigger = action.payload;
			return { ...state, trigger };
		}

		case "setMute": {
			let mute = !state.mute;
			return { ...state, mute };
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
			return {...state,waypoint: action.payload}
		}

		default:
			return state;
	}
}
