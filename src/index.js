import React from "react";
import ReactDOM from "react-dom";
import { StoreContext } from "redux-react-hook";

import "./index.css";
import App from "./App.jsx";
import { makeStore } from "./js/store";

import * as serviceWorker from "./serviceWorker";

import { imgList }from "./js/libs/preloadImages";
import ImagesLoader from "./js/libs/imagesLoader";

let loader = document.getElementById("loader");
const imagesLoader = new ImagesLoader(imgList);
let text = document.getElementsByClassName("loader__text")[0];
let bar = document.getElementsByClassName("loader__bar")[0];
let barBox = document.getElementsByClassName("loader__box")[0];

// 清除假进度条计时器
window.clearInterval( window.loaderLoadingProgressTimer);
window.loaderLoadingProgressTimer = null;

const barWidth = bar.offsetWidth;
const barBoxWidth = barBox.offsetWidth;

imagesLoader.start();
imagesLoader.onProgress(percent => {
  text.innerText = `${Math.round(percent+ (100-percent)*barWidth/barBoxWidth)}%`;
  bar.style.width = `${Math.round(percent+ (100-percent)*barWidth/barBoxWidth)}%`;
});
imagesLoader.onComplete(() => {
  text.innerText = "100%";
  bar.style.width = "100%";
  setTimeout(() => {
    loader.style.display = "none";
    startApp()
  }, 2000);
});

function startApp(){
  const store = makeStore();

  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>,
    document.getElementById("root")
  );
}

serviceWorker.unregister();
