import React, { useState, useRef } from "react";
import "../../styles/Help.scss";
import { useDispatch, useMappedState } from "redux-react-hook";

export default function Help() {
	return (
		<div className="help">
			<div className="help__quit">
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

			<div className="slider">
				<div className="slider__slides">
					<div className="slider__slide">
						<div className="slider__slide__content">
							<div className="help__layout">
								<div className="layout">
									<div className="layout__mouse">
										<div className="layout__mouse__icon"></div>
										<div className="layout__mouse__click"></div>
									</div>
									<div className="layout__frame"></div>
									<div className="layout__parts">
										<div className="layout__part"></div>
										<div className="layout__part"></div>
									</div>
								</div>
							</div>
							<p className="text--center text--white">
								There&apos;re 2 parts on the website. Presentation and About me, you can switch
								between them anytime by clicking on the bottom and top part of the screen.
							</p>
						</div>
					</div>

					<div className="slider__slide">
						<div className="slider__slide__content">
							<div className="help__navigation">
								<div className="mouse">
									<div className="mouse__body">
										<div className="mouse__body__line"></div>
									</div>
									<div className="mouse__wheel">
										<div className="mouse__wheel__lines">
											<div className="mouse__wheel__line"></div>
											<div className="mouse__wheel__line"></div>
											<div className="mouse__wheel__line"></div>
											<div className="mouse__wheel__line"></div>
											<div className="mouse__wheel__line"></div>
											<div className="mouse__wheel__line"></div>
										</div>
									</div>
								</div>
								<div className="keys">
									<div className="key key--left">
										<div className="key__triangle key__triangle--left"></div>
									</div>
									<div className="key key--bottom">
										<div className="key__triangle key__triangle--bottom"></div>
									</div>
									<div className="key key--top">
										<div className="key__triangle key__triangle--top"></div>
									</div>
									<div className="key key--right">
										<div className="key__triangle key__triangle--right"></div>
									</div>
								</div>
							</div>
							<p className="text--center text--white">
								You can naviguate with either your mouse wheel / trackpad or up / down keys.
							</p>
						</div>
					</div>
				</div>
				<div className="slider__map"></div>
			</div>
		</div>
	);
}
