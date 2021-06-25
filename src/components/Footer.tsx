import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import flyHigh from "../theme/img/flyhigh.png";
import vatstar from "../theme/img/vatstar.png";
import { isAuthenticated } from "../helpers/auth";

export default function Footer(): ReactElement {
	const [render, setRender] = useState(false);
	const location = useLocation();
    
	useEffect(() => setRender(!render), [location]);

	const date = new Date().getFullYear();
	return (
		<footer id="footer" className="container-fluid bg-gray-800 text-white"
			style={{ paddingTop: "1%", paddingBottom: "1%" }}>
			<Row>
				<Col sm>
					<a href="https://vatstar.com/" target="_blank" rel="noreferrer">
						<img className="img-fluid float-sm-end" src={vatstar} alt="VATSTAR"
							style={{ width: "300px", height: "auto", marginTop: "35px" }} />
					</a>
				</Col>
				<Col sm>
					<a href="https://www.flyhighva.org/" target="_blank" rel="noreferrer">
						<img className="img-fluid" src={flyHigh} alt="Fly High Virtual"
							style={{ width: "300px", height: "auto" }} />
					</a>
				</Col>
			</Row>
			<Row>
				<Col sm={5}></Col>
				{
					isAuthenticated() ?
						<Col sm className="text-center">
							<a className="footer-link" href="/bugreport">Bug Report</a>
						</Col> :
						<></>
				}
				<Col sm className="text-center">
					<a className="footer-link" href="/privacy">Privacy Policy</a>
				</Col>
				<Col sm={5}></Col>
			</Row>
			<Row>
				<Col sm className="text-center">
                    &copy; { date } Washington Virtual ARTCC
				</Col>
			</Row>
		</footer>
	);
}