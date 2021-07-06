import React, { ReactElement } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventView from "./pages/Event";
import { Login, Logout } from "./components/Auth";
import Footer from "./components/Footer";
import Staff from "./pages/Staff";
import Roster from "./pages/Roster";
import Statistics from "./pages/Statistics";
import Files from "./pages/Files";

function App(): ReactElement {
	return (
		<div className="page">
			<BrowserRouter>
				<Navigation />
				<div className="content">
					<Switch>
						{/* Auth */}
						<Route exact path="/login" component={Login} />
						<Route exact path="/logout" component={Logout} />
						{/* Pages */}
						<Route exact path="/" component={Home} />
						<Route exact path="/events" component={Events} />
						<Route exact path="/event/:id" component={EventView} />
						<Route exact path="/staff" component={Staff} />
						<Route exact path="/roster" component={Roster} />
						<Route exact path="/statistics/:monthParam/:yearParam" component={Statistics} />
						<Route exact path="/files" component={Files} />
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
