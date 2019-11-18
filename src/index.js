import React from "react";
import ReactDOM from "react-dom";
import { StoreContext } from "redux-react-hook";

import "./index.css";
import App from "./App.jsx";
import { makeStore } from "./js/store";

import * as serviceWorker from "./serviceWorker";

import "./js/libs/preloadImages";

const store = makeStore();

ReactDOM.render(
	<StoreContext.Provider value={store}>
		<App />
	</StoreContext.Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
