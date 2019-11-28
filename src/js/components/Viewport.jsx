import React, { useRef, useState, useEffect } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import "../../styles/Viewport.scss";
import ViewportTrigger from "./ViewportTrigger.jsx";
import { TweenLite } from "gsap/TweenMax";
import * as THREE from "three";
import BackgroundLines from "../objects/BackgroundLinesObject3D";
import BackgroundParticles from "../objects/BackgroundParticlesObject3D";
import SPRITE3D from "../libs/sprite3DLib";
import useResizeAware from "react-resize-aware";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

import helloSection from "../sections/helloSection";
import beamsSection from "../sections/beamsSection";
import dropSection from "../sections/dropSection";
import ballSection from "../sections/ballSection";
import flowSection from "../sections/flowSection";
import neonsSection from "../sections/neonsSection";
import heightSection from "../sections/heightSection";
import waveSection from "../sections/waveSection";
import faceSection from "../sections/faceSection";
import rocksSection from "../sections/rocksSection";
import galaxySection from "../sections/galaxySection";
import gravitySection from "../sections/gravitySection";
import citySection from "../sections/citySection";
import endSection from "../sections/endSection";

// THREE Scene
let renderer, scene, camera, frameId;
let cameraShakeY = 0;
// general
let isActive;
let isStarted = false;
let width,
	height = 0;
// camera
let cameraCache = { speed: 0 };
let isScrolling = false;
// background lines
let backgroundLines;
// sections
let sections = [];
let sectionsMap = {};
let totalSections;
let currentIndex = 0;
let previousIndex = 0;
// parameters
let fogColor = "#0a0a0a";
let sectionHeight = 50;
// mouse
let mouseX = 0;

export default function Viewport() {
	const mapState = React.useCallback(state => state, []);
	const {
		quality,
		headsVisib,
		sounds,
		sectionChangeBegin,
		sectionChangeComplete,
		mapScrollTo,
		device
	} = useMappedState(mapState);
	const dispatch = useDispatch();

	const setSounds = React.useCallback(payload => dispatch({ type: "setSounds", payload }), []);
	const setMap = React.useCallback(payload => dispatch({ type: "setMap", payload }), []);
	const setSectionChangeBegin = React.useCallback(
		payload => dispatch({ type: "setSectionChangeBegin", payload }),
		[]
	);
	const setSectionChangeComplete = React.useCallback(
		payload => dispatch({ type: "setSectionChangeComplete", payload }),
		[]
	);
	const setTrigger = React.useCallback(payload => dispatch({ type: "setTrigger", payload }), []);

	const [resizeListener, sizes] = useResizeAware();

	const viewport = useRef(null);
	const sectionsList = [
		helloSection,
		beamsSection,
		dropSection,
		ballSection,
		flowSection,
		neonsSection,
		heightSection,
		waveSection,
		faceSection,
		rocksSection,
		galaxySection,
		gravitySection,
		citySection,
		endSection
	];

	/**
	 * 初始化
	 */
	useEffect(() => {
		console.log("init");
		setup();
		// 添加 sections
		addSections(sectionsList);
		setupBackground();
		sceneIn();
		start();
	}, []);
	// 点击 map 切换
	useEffect(() => {
		if (mapScrollTo || mapScrollTo === 0) {
			currentIndex = mapScrollTo;
			animateCamera(currentIndex);
		}
	}, [mapScrollTo]);
	// changeBegin
	useEffect(() => {
		if (!sectionChangeBegin || !sectionChangeBegin.to) return;

		const way = sectionChangeBegin.way;
		const to = sectionChangeBegin.to.name;
		const index = sectionChangeBegin.to.index;
		const from = sectionChangeBegin.from.name;
		console.log("changeBegin", way, to, from);

		setMap({ count: sectionsList.length, now: index });

		// in begin
		if (to === "hello") {
			helloSection.in();
			helloSection.start();
			helloSection.smokeStart();

			beamsSection.out("up");
			beamsSection.start();
		} else if (to === "beams") {
			helloSection.smokeStart();

			beamsSection.in();
			beamsSection.start();
		} else if (to === "drop") {
			beamsSection.out("down");
			beamsSection.start();

			dropSection.in();
			dropSection.start();
		} else if (to === "ball") {
			dropSection.out("down");
			dropSection.start();

			ballSection.in();
			ballSection.start();

			flowSection.fieldIn();
			flowSection.start();
		} else if (to === "flow") {
			flowSection.in();
			flowSection.fieldIn();
			flowSection.start();

			neonsSection.smokeStart();
		} else if (to === "neons") {
			flowSection.fieldIn();
			flowSection.start();

			neonsSection.start();
			neonsSection.smokeStart();

			heightSection.show();
		} else if (to === "height") {
			flowSection.fieldIn();
			flowSection.start();

			neonsSection.smokeStart();

			heightSection.show();
			heightSection.in();
			heightSection.start();
		} else if (to === "wave") {
			heightSection.show();

			waveSection.in(way);
			waveSection.start();
		} else if (to === "face") {
			faceSection.in();
			faceSection.start();
			rocksSection.show();
		} else if (to === "rocks") {
			rocksSection.show();
			rocksSection.in();
			rocksSection.start();
		} else if (to === "galaxy") {
			rocksSection.show();

			galaxySection.in(way);
			galaxySection.start();

			gravitySection.show();
		} else if (to === "gravity") {
			gravitySection.show();
			gravitySection.in();
			gravitySection.start();
		} else if (to === "end") {
			endSection.in();
		}

		// out begin
		if (from === "hello" && to !== "hello") {
			helloSection.out(way);
		} else if (from === "beams") {
			beamsSection.out(way);
		} else if (from === "drop") {
			dropSection.out(way);
		} else if (from === "ball") {
			ballSection.out(way);
		} else if (from === "flow") {
			flowSection.out(way);
		} else if (from === "neons") {
			neonsSection.out(way);
		} else if (from === "height") {
			heightSection.out(way);
		} else if (from === "wave") {
			waveSection.out(way);
		} else if (from === "face") {
			faceSection.out(way);
		} else if (from === "rocks") {
			rocksSection.out(way);
		} else if (from === "galaxy") {
			galaxySection.out(way);
		} else if (from === "gravity") {
			gravitySection.out(way);
		} else if (from === "end") {
			endSection.out(way);
		}
	}, [sectionChangeBegin]);
	// changeComplete
	useEffect(() => {
		if (!sectionChangeComplete || !sectionChangeComplete.to) return;
		const to = sectionChangeComplete.to.name;
		const from = sectionChangeComplete.from.name;
		console.log(to, from);
		// out complete
		if (from === "hello") {
			helloSection.stop();

			if (to !== "beams") {
				helloSection.smokeStop();
			}

			if (to !== "beams" && to !== "drop") {
				beamsSection.stop();
			}
		} else if (from === "beams") {
			if (to !== "hello") {
				helloSection.smokeStop();
			}

			if (to !== "hello" && to !== "drop") {
				beamsSection.stop();
			}
		} else if (from === "drop") {
			if (to !== "hello" && to !== "beams") {
				beamsSection.stop();
			}

			if (to !== "ball") {
				dropSection.stop();
			}
		} else if (from === "ball") {
			ballSection.stop();

			if (to !== "drop") {
				dropSection.stop();
			}

			if (to !== "flow" && to !== "neons" && to !== "height") {
				flowSection.stop();
			}
		} else if (from === "flow") {
			if (to !== "neons" && to !== "height") {
				neonsSection.smokeStop();
			}

			if (to !== "ball" && to !== "neons" && to !== "height") {
				flowSection.stop();
			}
		} else if (from === "neons") {
			neonsSection.stop();

			if (to !== "flow" && to !== "height") {
				neonsSection.smokeStop();
			}

			if (to !== "ball" && to !== "flow" && to !== "height") {
				flowSection.stop();
			}

			if (to !== "height" && to !== "wave") {
				heightSection.hide();
			}
		} else if (from === "height") {
			heightSection.stop();

			if (to !== "neons" && to !== "wave") {
				heightSection.hide();
			}

			if (to !== "flow" && to !== "neons") {
				neonsSection.smokeStop();
			}

			if (to !== "ball" && to !== "flow" && to !== "neons") {
				flowSection.stop();
			}
		} else if (from === "wave") {
			waveSection.stop();

			if (to !== "neons" && to !== "height") {
				heightSection.hide();
			}
		} else if (from === "face") {
			faceSection.stop();

			if (to !== "rocks" && to !== "galaxy") {
				rocksSection.hide();
			}
		} else if (from === "rocks") {
			rocksSection.stop();

			if (to !== "face" && to !== "galaxy") {
				rocksSection.hide();
			}
		} else if (from === "galaxy") {
			galaxySection.stop();

			if (to !== "face" && to !== "rocks") {
				rocksSection.hide();
			}

			if (to !== "gravity") {
				gravitySection.hide();
			}
		} else if (from === "gravity") {
			gravitySection.stop();

			if (to !== "galaxy") {
				gravitySection.hide();
			}
		}
	}, [sectionChangeComplete]);
	// 切换head <->tails时触发
	useEffect(() => {
		console.log("headsVisibChange", headsVisib);
		if (headsVisib) {
			start();
		} else {
			stop();
		}
	}, [headsVisib]);
	// 修改模型质量时触发
	useEffect(() => {
		console.log("quality");
		if (!renderer) return;
		renderer.setSize(width * quality, height * quality);
	}, [quality]);
	/**
	 * resize事件
	 * 组件刚建立的时候,初始化width和height, 其后每次resize, 更新渲染器和相机
	 */
	useEffect(() => {
		width = sizes.width || viewport.current.offsetWidth || 0;
		height = sizes.height || viewport.current.offsetHeight || 0;
		if (!camera) return;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width * quality, height * quality);
	}, [sizes]);

	/**
	 * 启动渲染
	 */
	function start() {
		console.log("start");
		isActive = true;

		if (!isStarted) {
			// first event
			const data = {
				from: {
					name: sectionsMap[previousIndex],
					index: previousIndex
				},
				to: {
					name: sectionsMap[currentIndex],
					index: currentIndex
				},
				way: "down"
			};
			setSectionChangeBegin(data);
			isStarted = true;
		}

		if (!frameId) {
			draw();
		}
	}

	/**
	 * drawing loop stop
	 */
	function stop() {
		if (frameId) {
			window.cancelAnimationFrame(frameId);
			frameId = undefined;
			isActive = false;
		}
	}

	/**
	 * 初次渲染, 相机视距2s内从200到60
	 */
	function sceneIn() {
		console.log("sceneIn");
		TweenLite.to({ fov: 200, speed: 0 }, 2, {
			bezier: { type: "soft", values: [{ speed: 20 }, { speed: 0 }] },
			fov: 60,
			ease: "easeOutCubic",
			onUpdate: function() {
				backgroundLines.updateZ(this.target.speed);
				camera.fov = this.target.fov;
				camera.updateProjectionMatrix();
			}
		});
	}

	/**
	 * setScene
	 */
	function setup() {
		console.log("setup");
		// 检查父元素
		if (!viewport) {
			console.error("set viewport first");
			return false;
		}
		// 检查父元素尺寸
		if (!width) {
			width = viewport.current.offsetWidth;
			height = viewport.current.offsetHeight;
		}
		initRender();
		initScene();
		initCamera();
		draw();

		function initRender() {
			console.log("initRender");
			// 渲染器初始化
			// for transparent bg, also set alpha: true
			// renderer.setClearColor(0x000000, 0);
			renderer = new THREE.WebGLRenderer({
				alpha: false,
				antialias: false
			});
			renderer.setClearColor("#0a0a0a", 1);
			renderer.setSize(width * quality, height * quality);
			viewport.current.appendChild(renderer.domElement);
		}
		function initScene() {
			console.log("initScene");
			// 场景初始化
			scene = new THREE.Scene();
			scene.fog = new THREE.FogExp2(fogColor, 0.01);
			let light = new THREE.DirectionalLight("#ffffff", 0.5);
			light.position.set(0.2, 1, 0.5);
			scene.add(light);
		}
		function initCamera() {
			console.log("initCamera");
			// 透视相机初始化
			camera = new THREE.PerspectiveCamera(20, width / height, 1, 4000);
			camera.position.set(0, 0, 40);
		}
	}

	/**
	 * 下一个section
	 */
	function next() {
		console.log("next");
		if (currentIndex === totalSections) {
			setTrigger("click");
			return;
		}
		currentIndex++;
		animateCamera(currentIndex);
	}
	/**
	 * 上一个section
	 */
	function prev() {
		console.log("prev");
		if (currentIndex === 0) {
			return false;
		}
		currentIndex--;

		animateCamera(currentIndex);
	}

	/**
	 * 渲染循环
	 */
	function draw() {
		SPRITE3D.update();
		// camera noise
		camera.position.y += Math.cos(cameraShakeY) / 50;
		cameraShakeY += 0.02;
		// mouse camera move
		camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
		renderer.render(scene, camera);

		frameId = window.requestAnimationFrame(draw);
	}
	/**
	 * 设置背景
	 */
	function setupBackground() {
		// add background particles and lines
		// rangeY based on the size and the number of sections
		console.log("setupBackground");
		const rangeY = [sectionHeight, -sectionsList.length * sectionHeight - sectionHeight];

		setSounds({ ...sounds, background: true });

		const backgroundParticles = new BackgroundParticles({
			rangeY: rangeY,
			count: 1000
		});
		scene.add(backgroundParticles.el);

		backgroundLines = new BackgroundLines({ rangeY: rangeY, count: 200 });
		scene.add(backgroundLines.el);
	}

	/**
	 * 滚动事件
	 * 根据鼠标滚动方向, 执行next()或prev()方法
	 * @param event
	 */
	function handleWheel(way) {
		console.log("scroll");
		if (!isScrolling && isActive) {
			if (way === "down") {
				next();
			} else {
				prev();
			}
		}
	}

	/**
	 * 鼠标移动事件
	 * 根据鼠标位置更新 mouseX
	 * @param e
	 */
	function onMouseMove(e) {
		if (!device) return;
		mouseX = (e.clientX / window.innerWidth) * 2 - 1;
	}

	/**
	 * 相机位置
	 * @param {Number} [index]
	 */
	function animateCamera(index) {
		// in case goTo is called
		// otherwise navigation set currentIndex
		console.log("animateCamera");
		currentIndex = index;

		let nextPosition = index * -sectionHeight;

		// which way are we animating?
		let way = index < previousIndex ? -1 : 1;

		// event's data
		let data = {
			from: {
				name: sectionsMap[previousIndex],
				index: previousIndex
			},
			to: {
				name: sectionsMap[index],
				index: index
			},
			way: way === -1 ? "up" : "down"
		};
		TweenLite.to(camera.position, 1.5, {
			y: nextPosition,
			ease: window.Quad.easeInOut,
			onStart: function() {
				console.log("sliding_start");
				isScrolling = true;
				setSounds({ ...sounds, wind: true });
				setSectionChangeBegin(data);
			},
			onComplete: function() {
				if (previousIndex === index) {
					return false;
				}

				isScrolling = false;
				setSectionChangeComplete(data);
				previousIndex = index;
			}
		});

		TweenLite.to(cameraCache, 1.5, {
			bezier: { type: "soft", values: [{ speed: 10 }, { speed: 0 }] },
			onUpdate: function() {
				backgroundLines.updateY(this.target.speed);
			}
		});
	}
	/**
	 * Add sections
	 *
	 * @method addSections
	 * @param {Array} [sections] Array of Sections
	 */
	function addSections(sections) {
		console.log("addSections");
		totalSections = sections.length - 1;

		for (let i = 0, j = sections.length; i < j; i++) {
			const section = sections[i];
			sectionsMap[i] = section.name;
			section.el.position.y = i * -sectionHeight;
			scene.add(section.el);
		}
	}

	return (
		<ReactScrollWheelHandler
			upHandler={handleWheel.bind(this, "up")}
			downHandler={handleWheel.bind(this, "down")}
		>
			<div className="heads__viewport" ref={viewport} onMouseMove={onMouseMove}>
				{resizeListener}
				<ViewportTrigger />
			</div>
		</ReactScrollWheelHandler>
	);
}
