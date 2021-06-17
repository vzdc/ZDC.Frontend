import React, { ReactElement } from "react";
import BounceLoader from "./BounceLoader";

export default function LoadingScreen(): ReactElement {
	return (
		<div className="loader">
			<BounceLoader/>
		</div>
	);
}