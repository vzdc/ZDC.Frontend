import React, { ReactElement, useEffect, useState } from "react";
import { Button, Collapse, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import logo from "../theme/img/logo.png";

export default function Navigation(): ReactElement {
	return (
		<Navbar id="navbar" expand="xl" className="navbar-dark bg-gray-800 fixed-top font-w500">
			<div className="container">
				<Link to="/">
					<Navbar.Brand>
						<img src={logo} className="navbar-brand-img" alt="vZDC ARTCC" />
					</Navbar.Brand>
				</Link>
				<Navbar.Collapse>
					<Nav>
						<Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
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
						<Nav.Link as={Link} to="/login">Login</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
}