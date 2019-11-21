import { createStore } from "redux";
import reducer from "./reducer.js";

export function makeStore() {
	return createStore(reducer, {
		event: "", // 全局传递参数
		trigger: null, // Trigger触发事件[null,"mouseEnter","mouseLeave","click"]
		mute: false, // 静音
		quality: 1, // 模型质量 [0.5,1]
		headsVisib: true, // Heads可见 [true,false]
		isSliding: false, // 滑动中
		isOpen: false, // true为Tails, false为Heads
    waypoint: false, // 触发事件 [true,false]
    scene: false, // three 场景激活 [true,false]
    sound: {}, // 音效{curSound:string,playing:bulr}
    sectionChangeBegin: {},
    sectionChangeComplete: {},
	});
}
