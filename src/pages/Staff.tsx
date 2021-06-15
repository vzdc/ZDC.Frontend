/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import instance from "../helpers/axios";
import { User, UserRole } from "../models/User";

interface StaffMemberProps {
    user: User | undefined;
	position: string;
	positionShort: string;
}

export default function Staff(): ReactElement {

	const [staff, setStaff] = useState<User[]>([]);
	const atm = staff.find(x => x.role == UserRole.ATM);
	const datm = staff.find(x => x.role == UserRole.DATM);
	const ta = staff.find(x => x.role == UserRole.TA);
	const wm = staff.find(x => x.role == UserRole.WM);
	const ec = staff.find(x => x.role == UserRole.EC);
	const fe = staff.find(x => x.role == UserRole.FE);
	const ata = staff.find(x => x.role == UserRole.ATA);
	const awm = staff.find(x => x.role == UserRole.AWM);
	const aec = staff.find(x => x.role == UserRole.AEC);
	const afe = staff.find(x => x.role == UserRole.AFE);

	useEffect(() => {
		document.title = "Washington ARTCC - Staff";
		instance.get<User[]>("/Users/Staff")
			.then(response => {
				setStaff(response.data);
			});
	}, []);

	const StaffMember: React.FC<StaffMemberProps> = ({ user, position, positionShort }) => {
		return (
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					{ position }
					<hr />
					{ user != undefined ? user.fullName : "Vacant" }
					<br />
					<a href="mailto::atm@vzdc.org" target="_blank" rel="noreferrer"><i className="fas fa-envelope"></i> { positionShort }@vzdc.org</a>
				</Card.Header>
			</Card>
		);
	};

	return (
		<Container className="page-margins">
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-users-cog"></i> Staff
				</Card.Header>
			</Card>
			<Row>
				<Col sm className="mx-auto">
					<StaffMember user={atm} position="Air Traffic Manager" positionShort="atm" />
				</Col>
				<Col sm className="mx-auto">
					<StaffMember user={datm} position="Deputy Air Traffic Manager" positionShort="datm" />
				</Col>
				<Col sm className="mx-auto">
					<StaffMember user={ta} position="Training Administrator" positionShort="ta" />
				</Col>
			</Row>
			<Row>
				<Col sm className="mx-auto">
					<StaffMember user={wm} position="Webmaster" positionShort="wm" />
				</Col>
				<Col sm className="mx-auto">
					<StaffMember user={ec} position="Events Coordinator" positionShort="ec" />
				</Col>
				<Col sm className="mx-auto">
					<StaffMember user={fe} position="Facility Engineer" positionShort="fe" />
				</Col>
			</Row>
			<Row>
				{
					ata != undefined ?
						<Col sm className="mx-auto">
							<StaffMember user={ata} position="Assistant Training Administrator" positionShort="ata" />
						</Col> :
						<></>
				}
				{
					awm != undefined ?
						<Col sm className="mx-auto">
							<StaffMember user={awm} position="Assistant Webmaster" positionShort="awm" />
						</Col> :
						<></>
				}
				{
					aec != undefined ?
						<Col sm className="mx-auto">
							<StaffMember user={aec} position="Assistant Events Coordinator" positionShort="aec" />
						</Col> :
						<></>
				}
				{
					afe != undefined ?
						<Col sm className="mx-auto">
							<StaffMember user={afe} position="Assistant Facility Engineer" positionShort="afe" />
						</Col> :
						<></>
				}
			</Row>
		</Container>
	);
}