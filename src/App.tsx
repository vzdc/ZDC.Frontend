import React, { ReactElement } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { Login, Logout } from "./components/Auth";
import Footer from "./components/Footer";

function App(): ReactElement {
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				{/* Auth */}
				<Route exact path="/login" component={Login}/>
				<Route exact path="/logout" component={Logout}/>
				{/* Pages */}
				<Route exact path="/" component={Home}/>
				<Route exact path="/events" component={Events}/>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
