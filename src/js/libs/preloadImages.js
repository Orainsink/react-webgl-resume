// 预加载图片, 加载完成过后结束loading, 因为考虑到bundle文件较大加载慢,影响用户体验, 所以直接控制真实DOM.
import ImagesLoader from "../libs/imagesLoader";

const imgList = [
  require("../../assets/images/heightMap-A.jpg"),
  require("../../assets/images/heightMap-R.jpg"),
  require("../../assets/images/heightMap-N.jpg"),
  require("../../assets/images/heightMap-O.jpg"),
  require("../../assets/images/matCap.jpg"),
  require("../../assets/images/matCap-shiny.jpg"),
  require("../../assets/images/part-beam.png"),
  require("../../assets/images/part-drop.png"),
  require("../../assets/images/part-face.png"),
  require("../../assets/images/part-field.png"),
  require("../../assets/images/part-galaxy.jpg"),
  require("../../assets/images/part-gravity.jpg"),
  require("../../assets/images/part-height.png"),
  require("../../assets/images/part-grid.png"),
  require("../../assets/images/part-neons.png"),
  require("../../assets/images/part-rocks.jpg"),
  require("../../assets/images/part-smoke.png"),
  require("../../assets/images/part-sphere.png"),
  require("../../assets/images/part-stars.png"),
  require("../../assets/images/sprite-none.png"),
  require("../../assets/images/sprite-smoke.png"),
  require("../../assets/images/texture-ball.png"),
  require("../../assets/images/texture-ballAlpha.png"),
  require("../../assets/images/texture-drop.png"),
  require("../../assets/images/texture-laserBody.png"),
  require("../../assets/images/texture-laserCap.png"),
  require("../../assets/images/texture-laserFlare.png"),
  require("../../assets/images/texture-neonGlow.png"),
  require("../../assets/images/texture-neonProjection.png"),
  require("../../assets/images/texture-wave.png")
];
export default function preloadImages(cb){
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
      text.innerText = `${Math.ceil(percent+ (100-percent)*barWidth/barBoxWidth)}%`;
      bar.style.width = `${Math.ceil(percent+ (100-percent)*barWidth/barBoxWidth)}%`;
    });
    imagesLoader.onComplete(() => {
      text.innerText = "100%";
      bar.style.width = "100%";

      setTimeout(()=>{
        loader.style.display = "none";
      },1000);

      cb && cb()
    });
	}
