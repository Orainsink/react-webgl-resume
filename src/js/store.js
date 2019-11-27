import { createStore } from "redux";
import reducer from "./reducer.js";

export function makeStore() {
	return createStore(reducer, {
		event: "", // 全局传递参数
		trigger: null, // Trigger触发事件[null,"mouseEnter","mouseLeave","click"]
		mute: false, // 静音
		help: false, // 帮助页面
		quality: 1, // 模型质量 [0.5,1]
		headsVisib: true, // Heads可见 [true,false]
		isSliding: false, // 滑动中
		isOpen: false, // true为Tails, false为Heads
    waypoint: false, // 触发事件 [true,false]
    scene: false, // three 场景激活 [true,false]
    sounds: {
			background: false,
			wind: false,
      whitenoise: false,
      neon: false,
		}, // 音效
		map: {count: null,now: null},
    mapScrollTo: null, // 通过右边的导航点进行切换{Number}
    setSectionChangeBegin: {},
    setSectionChangeComplete: {},
	});
}
