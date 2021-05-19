import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./theme/theme.scss";

ReactDOM.render(
	<React.StrictMode>
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

