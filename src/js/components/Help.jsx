import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { TweenLite } from "gsap/TweenMax";
import "../../styles/Help.scss";
import "../../styles/Slider.scss";
import Keys from "./Keys.jsx";
import Mouse from "./Mouse.jsx";
import Layout from "./Layout.jsx";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

function Quit() {
	const dispatch = useDispatch();
	const setHelp = React.useCallback(() => {
		dispatch({ type: "setHelp" });
	}, []);

	return (
		<div className="help__quit" onClick={setHelp}>
			<svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 25 20">
				<line
					stroke="#ffffff"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
					x1="5.8"
					y1="16.7"
					x2="19.2"
					y2="3.3"
				/>
				<line
					stroke="#ffffff"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
					x1="5.8"
					y1="3.3"
					x2="19.2"
					y2="16.7"
				/>
			</svg>
		</div>
	);
}

function Slide1(props) {
	const mapState = React.useCallback(state => state, []);
	const { device } = useMappedState(mapState);
	const { start } = props;
	const slideRef = useRef(null);

	useEffect(() => {
		if (start) {
			TweenLite.fromTo(slideRef.current, 0.5, { opacity: 0 }, { opacity: 1 });
		} else {
			TweenLite.to(slideRef.current, 0.2, { opacity: 0 });
		}
	}, [start]);

	return (
		<div className="slider__slide" ref={slideRef}>
			<div className="slider__slide__content">
				<Layout />
				<p className="text--center text--white">
					{`There are 2 parts on the website. Presentation and About me, you can switch between
					them anytime by ${device ? "clicking" : "tapping"} on the bottom and top part of the screen.`}
				</p>
			</div>
		</div>
	);
}

function Slide2(props) {
	const { start } = props;
	const slideRef = useRef(null);

	useEffect(() => {
		if (start) {
			TweenLite.fromTo(slideRef.current, 0.5, { opacity: 0 }, { opacity: 1 });
		} else {
			TweenLite.to(slideRef.current, 0.2, { opacity: 0 });
		}
	}, [start]);
	return (
		<div className="slider__slide" ref={slideRef}>
			<div className="slider__slide__content">
				<div className="help__navigation">
					<Mouse />
					<Keys />
				</div>
				<p className="text--center text--white">
					You can naviguate with either your mouse wheel / trackpad or up / down keys.
				</p>
			</div>
		</div>
	);
}

export default function Help() {
	const mapState = React.useCallback(state => state, []);
	const { help } = useMappedState(mapState);
	const [curSlide, setCurSlide] = useState(1);

	const helpRef = useRef(null);
	const sliderRef = useRef(null);
	const slidesRef = useRef(null);

	useEffect(() => {
		if (help) {
			TweenLite.to(helpRef.current, 0.5, { display: "block", opacity: 0.9, delay: 0.1 });
			setCurSlide(1);
		}
	}, [help]);

	useEffect(() => {
		if (help) {
			TweenLite.to(slidesRef.current, 0.5, { x: 2 - curSlide ? "0%" : "-50%", ease: "easeIn" });
			const timer = setInterval(() => {
				changeSlide();
			}, 12000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [curSlide]);

	function changeSlide() {
		setCurSlide(3 - curSlide);
	}

	function handleClickNode(slide) {
		if (slide !== curSlide) {
			setCurSlide(slide);
		}
	}

	return (
		<>
			{help && (
				<ReactScrollWheelHandler
					leftHandler={handleClickNode.bind(this, 2)}
					rightHandler={handleClickNode.bind(this, 1)}
				>
					<div className="help" ref={helpRef}>
						<Quit />

						<div className="slider" ref={sliderRef}>
							<div className="slider__slides" ref={slidesRef}>
								<Slide1 start={curSlide === 1} />
								<Slide2 start={curSlide === 2} />
							</div>

							<div className="slider__map">
								<div
									className={`slider__map__node ${curSlide === 1 ? "is-active" : ""}`}
									onClick={handleClickNode.bind(this, 1)}
								/>
								<div
									className={`slider__map__node ${curSlide === 2 ? "is-active" : ""}`}
									onClick={handleClickNode.bind(this, 2)}
								/>
							</div>
						</div>
					</div>
				</ReactScrollWheelHandler>
			)}
		</>
	);
}
