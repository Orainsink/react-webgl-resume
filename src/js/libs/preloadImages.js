// 预加载图片, 加载完成过后结束loading, 因为考虑到bundle文件较大加载慢,影响用户体验, 所以直接控制真实DOM.
import ImagesLoader from "../libs/imagesLoader";

(function() {
	let loader = document.getElementById("loader");
	const imagesLoader = new ImagesLoader([]);
	let text = document.getElementsByClassName("loader__text")[0];
	let bar = document.getElementsByClassName("loader__bar")[0];
	imagesLoader.start();
	imagesLoader.onProgress(percent => {
		text.innerText = `${Math.round(percent)}%`;
		bar.style.width = `${Math.round(percent)}%`;
	});
	imagesLoader.onComplete(() => {
		text.innerText = "100%";
		bar.style.width = "100%";
		setTimeout(() => {
			loader.style.display = "none";
		}, 2000);
	});
})();
