import React, { ReactElement, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../theme/img/logo.png";
import { isAuthenticated, isMember, getFullName, isTrainingStaff, canFacilities, isFullStaff, canEvents, isSeniorStaff, canTraining } from "../helpers/auth";

export default function Navigation(): ReactElement {
	const [scroll, setScroll] = useState(true);
	const location = useLocation();
	useEffect(() => window.addEventListener("scroll", () => setScroll(window.scrollY < 50 && window.location.pathname == "/")), []);
	return (
		<Navbar id="navbar" expand="md" className={"navbar-dark fixed-top font-w500 " + (scroll && location.pathname == "/" ? "nav-transparent " : "nav")}>
			<Container fluid style={{ marginLeft: "8%", marginRight: "8%" }}>
				<Link to="/">
					<Navbar.Brand>
						<img src={logo} className="navbar-brand-img" alt="vZDC ARTCC" />
					</Navbar.Brand>
				</Link>
				<Navbar.Collapse>
					<Nav>
						<NavDropdown title="Controller Resources" id="controller-dropdown">
							<NavDropdown.Item as={Link} to="/staff">Staff</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/roster">Roster</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/statistics/" + new Date().getUTCMonth() + "/" + new Date().getUTCFullYear()}>Statistics</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/files">Files</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/events">Events</NavDropdown.Item>
							{
								isMember() ?
									<NavDropdown.Item as={Link} to="/scheduletraining">Schedule Training</NavDropdown.Item> :
									<></>
							}
						</NavDropdown>
						<NavDropdown title="Pilot Resources" id="pilot-dropdown">
							<NavDropdown.Item as={Link} to="/charts">Charts</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/requeststaffing">Request Staffing</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/Feedback">Feedback</NavDropdown.Item>
						</NavDropdown>
						{
							isMember() ?
								<NavDropdown title="Training Management" id="training-dropdown">
									{
										isTrainingStaff() ?
											<NavDropdown.Item as={Link} to="/trainingtickets/manage">Training Tickets</NavDropdown.Item> :
											<></>
									}
									{
										canTraining() ?
											<NavDropdown.Item as={Link} to="/ots/manage">OTS Center</NavDropdown.Item> :
											<></>
									}
									{
										canTraining() ?
											<NavDropdown.Item as={Link} to="/feedback/manage">Feedback</NavDropdown.Item> :
											<></>
									}
								</NavDropdown> :
								<></>
						}
						{
							isMember() ?
								<NavDropdown title="ARTCC Management" id="training-dropdown">
									{
										isFullStaff() ?
											<NavDropdown.Item as={Link} to="/announcements/manage">Announcements</NavDropdown.Item> :
											<></>
									}
									{
										canFacilities() ?
											<NavDropdown.Item as={Link} to="/airports/manage">Airports</NavDropdown.Item> :
											<></>
									}
									{
										canEvents() ?
											<NavDropdown.Item as={Link} to="/events/manage">Events</NavDropdown.Item> :
											<></>
									}
									{
										isFullStaff() ?
											<NavDropdown.Item as={Link} to="/email/manage">Emailing</NavDropdown.Item> :
											<></>
									}
									{
										isSeniorStaff() ?
											<NavDropdown.Item as={Link} to="/loas/manage">LOA Center</NavDropdown.Item> :
											<></>
									}
									{
										isSeniorStaff() ?
											<NavDropdown.Item as={Link} to="/incidentreports/manage">Incident Reports</NavDropdown.Item> :
											<></>
									}
									{
										isSeniorStaff() ?
											<NavDropdown.Item as={Link} to="/dossier/manage">Dossier Entries</NavDropdown.Item> :
											<></>
									}
									{
										isSeniorStaff() ?
											<NavDropdown.Item as={Link} to="/logs/manage">Website Logs</NavDropdown.Item> :
											<></>
									}
								</NavDropdown> :
								<></>
						}
						{
							isAuthenticated() ?
								<NavDropdown title={getFullName()} id="user-dropdown">
									{
										isMember() ? <></> :
											<NavDropdown.Item as={Link} to="/visit">Visit ZDC</NavDropdown.Item>
									}
									<NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
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