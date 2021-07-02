/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import instance from "../helpers/axios";
import { User } from "../models/User";

interface StaffMemberProps {
	user: User | undefined;
	position: string;
	positionShort: string;
}

interface TrainingStaffProps {
	users: User[];
	type: string;
	email: string;
}

export default function Staff(): ReactElement {

	const [users, setUsers] = useState<User[]>([]);
	const atm = users.find(x => x.roles.find(x => x.name == "ATM"));
	const datm = users.find(x => x.roles.find(x => x.name == "DATM"));
	const ta = users.find(x => x.roles.find(x => x.name == "TA"));
	const wm = users.find(x => x.roles.find(x => x.name == "WM"));
	const ec = users.find(x => x.roles.find(x => x.name == "EC"));
	const fe = users.find(x => x.roles.find(x => x.name == "FE"));
	const ata = users.find(x => x.roles.find(x => x.name == "ATA"));
	const awm = users.find(x => x.roles.find(x => x.name == "AWM"));
	const aec = users.find(x => x.roles.find(x => x.name == "AEC"));
	const afe = users.find(x => x.roles.find(x => x.name == "AFE"));
	const ins = users.filter(x => x.roles.find(x => x.name == "INS"));
	const mtr = users.filter(x => x.roles.find(x => x.name == "MTR"));

	useEffect(() => {
		document.title = "Washington ARTCC - Staff";
		instance.get<User[]>("/Users")
			.then(response => {
				setUsers(response.data);
			});
	}, []);

	const StaffMember: React.FC<StaffMemberProps> = ({ user, position, positionShort }) => {
		return (
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					{position}
					<hr />
					{user != undefined ? user.fullName : "Vacant"}
					<br />
					<a href="mailto::atm@vzdc.org" target="_blank" rel="noreferrer"><i className="fas fa-envelope"></i> {positionShort}@vzdc.org</a>
				</Card.Header>
			</Card>
		);
	};

	const TrainingStaff: React.FC<TrainingStaffProps> = ({ users, type, email }) => {
		return (
			<Card className="shadow-lg training-staff-height">
				<Card.Header as="h5" className="text-center">
					{type}
					<br />
					<a href={"mailto::" + email} target="_blank" rel="noreferrer"><i className="fas fa-envelope"></i> {email}</a>
					<hr />
				</Card.Header>
				<Card.Body>
					<ListGroup>
						{
							users == undefined || users.length > 0 ?
								users.map(user => (
									<ListGroup key={user.id}>{user.fullName}</ListGroup>
								)) :
								<ListGroup.Item>No {type} found</ListGroup.Item>
						}
					</ListGroup>
				</Card.Body>
			</Card >
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
						<Col sm={4} className="mx-auto">
							<StaffMember user={ata} position="Assistant Training Administrator" positionShort="ata" />
						</Col> :
						<></>
				}
				{
					awm != undefined ?
						<Col sm={4} className="mx-auto">
							<StaffMember user={awm} position="Assistant Webmaster" positionShort="awm" />
						</Col> :
						<></>
				}
				{
					aec != undefined ?
						<Col sm={4} className="mx-auto">
							<StaffMember user={aec} position="Assistant Events Coordinator" positionShort="aec" />
						</Col> :
						<></>
				}
				{
					afe != undefined ?
						<Col sm={4} className="mx-auto">
							<StaffMember user={afe} position="Assistant Facility Engineer" positionShort="afe" />
						</Col> :
						<></>
				}
			</Row>
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-users-cog"></i> Training Staff
				</Card.Header>
			</Card>
			<Row>
				<Col sm={4}>
					<TrainingStaff users={ins} type="Instructors" email="instructors@vzdc.org" />
				</Col>
				<Col sm={4}></Col>
				<Col sm={4}>
					<TrainingStaff users={mtr} type="Mentors" email="mentors@vzdc.org" />
				</Col>
			</Row>
		</Container>
	);
}