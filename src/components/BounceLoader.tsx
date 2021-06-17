import React, { ReactElement } from "react";
import "./Spinner.css";

export default function BounceLoader(): ReactElement {
	return (
		<div className="spinner" style={{width: 60, height: 60}}>
			<div className="double-bounce1"/>
			<div className="double-bounce2"/>
		</div>
	);
}