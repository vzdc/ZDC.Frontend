import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/brands.js";
import "@fortawesome/fontawesome-free/js/solid.js";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "./theme/theme.scss";

ReactDOM.render(
	<React.StrictMode>
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

