import React from "react";

export default function Sections() {
	return (
		<div className="heads__sections">
			<div className="heads__section heads__section--hello">
				<div className="part part--title hello__title">
					<h1 className="text--white text--noMargin"> HELLO </h1>
					<h1 className="text--white text--noMargin">
						<span className="placeholder--agency placeholder--agency--capital" />
					</h1>
				</div>
				<div className="part part--smoke" />
			</div>

			<div className="heads__section heads__section--beams">
				<div className="part part--beam--left" />
				<div className="part part--beam--center" />
				<div className="part part--beam--right" />
			</div>

			<div className="heads__section heads__section--drop">
				<div className="part part--title drop__title">
					<h1 className="text--white text--right text--noMargin"> FROM </h1>
					<h1 className="text--white text--right text--noMargin"> AN IDEA </h1>
				</div>
				<div className="part part--drop" />
			</div>

			<div className="heads__section heads__section--ball">
				<div className="part part--title ball__title">
					<h1 className="text--white text--noMargin text--left"> GIVE </h1>
					<h1 className="text--white text--noMargin text--left"> SHAPE </h1>
				</div>
				<div className="part part--sphere" />
				<div className="part part--grid" />
			</div>

			<div className="heads__section heads__section--flow">
				<div className="part part--field" />
				<div className="part part--neons" />
				<div className="part part--smoke flow__smoke" />
			</div>

			<div className="heads__section heads__section--height">
				<div className="part part--title height__title">
					<h1 className="text--white text--right text--noMargin"> LET IT </h1>
					<h1 className="text--white text--right text--noMargin"> MORPH </h1>
				</div>
				<div className="part part--height" />
			</div>

			<div className="heads__section heads__section--face">
				<div className="part part--title face__title">
					<h1 className="text--white text--left text--noMargin"> KEEP </h1>
					<h1 className="text--white text--left text--noMargin"> TRYING </h1>
				</div>
				<div className="part part--face" />
			</div>

			<div className="heads__section heads__section--rocks">
				<div className="part part--title rocks__title">
					<h1 className="text--white text--noMargin"> KEEP </h1>
					<h1 className="text--white text--noMargin"> LEARNING </h1>
				</div>
				<div className="part part--rocks" />
			</div>

			<div className="heads__section heads__section--galaxy">
				<div className="part part--title galaxy__title">
					<h1 className="text--white text--noMargin"> WORK </h1>
					<h1 className="text--white text--noMargin"> AS A TEAM </h1>
				</div>
				<div className="part part--galaxy" />
			</div>

			<div className="heads__section heads__section--gravity">
				<div className="part part--gravity" />
			</div>

			<div className="heads__section heads__section--end">
				<div className="part part--title end__title">
					<h1 className="text--white text--noMargin"> THANKS FOR </h1>
					<h1 className="text--white text--noMargin"> WATCHING </h1>
				</div>
			</div>

			<div className="part part--stars" />
		</div>
	);
}
