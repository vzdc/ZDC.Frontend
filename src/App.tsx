import React, { ReactElement } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import instance from "./helpers/axios";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";

function App(): ReactElement {
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route exact path="/" component={Home}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
