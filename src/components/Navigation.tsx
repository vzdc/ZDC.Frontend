import React, { ReactElement, useEffect, useState } from "react";
import {  Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../theme/img/logo.png";
import { isAuthenticated, isMember, getFullName } from "../helpers/auth";

export default function Navigation(): ReactElement {
	const [scroll, setScroll] = useState(true);
	const location = useLocation();
	useEffect(() => window.addEventListener("scroll", () => setScroll(window.scrollY < 50 && window.location.pathname == "/")), []);
	return (
		<Navbar id="navbar" expand="md" className={"navbar-dark fixed-top font-w500 " + (scroll && location.pathname == "/" ? "nav-transparent " : "nav")}>
			<Container fluid style={{ marginLeft: "15%", marginRight: "15%" }}>
				<Link to="/">
					<Navbar.Brand>
						<img src={logo} className="navbar-brand-img" alt="vZDC ARTCC" />
					</Navbar.Brand>
				</Link>
				<Navbar.Collapse>
					<Nav>
						<Nav.Link as={Link} to="/events">Events</Nav.Link>
						<NavDropdown title="Controller Resources" id="controller-dropdown">
							<NavDropdown.Item as={Link} to="/staff">Staff</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/roster">Roster</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/statistics">Statistics</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/files">Files</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Pilot Resources" id="pilot-dropdown">
							<NavDropdown.Item as={Link} to="/charts">Charts</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/requeststaffing">Request Staffing</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/Feedback">Feedback</NavDropdown.Item>
						</NavDropdown>
						{
							isAuthenticated() ? 
								<NavDropdown title={getFullName()} id="user-dropdown">
									{
										isMember() ? <></> :
											<NavDropdown.Item as={Link} to="/visit">Visit ZDC</NavDropdown.Item>
									}
									<NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
								</NavDropdown> :
								<Nav.Link as={Link} to="/login">Login</Nav.Link>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}