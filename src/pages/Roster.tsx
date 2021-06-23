/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Card, Container, Table, Popover, OverlayTrigger, Tab, Tabs } from "react-bootstrap";
import instance from "../helpers/axios";
import { User } from "../models/User";
import LoadingScreen from "../components/LoadingScreen";
import { Center, Local, Tracon } from "../models/Certification";
import { isStaff, isTrainingStaff } from "../helpers/auth";
import { Link } from "react-router-dom";
interface UserProps {
    user: User;
}

interface CenterProps {
	type: Center;
}

interface TraconProps {
	name: string;
	type: Tracon;
}

interface LocalProps {
	name: string;
	type: Local;
}

export default function Roster(): ReactElement {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState<User[]>([]);
	const [homeControllers, setHomeControllers] = useState<User[]>([]);
	const [visitingControllers, setVisitingControllers] = useState<User[]>([]);

	useEffect(() => {
		document.title = "Washington ARTCC - Roster";
		instance.get<User[]>("/Users")
			.then(response => {
				setUsers(response.data);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		setHomeControllers(users.filter(x => !x.visitor));
		setVisitingControllers(users.filter(x => x.visitor));
	}, [users]);

	const CenterCert: React.FC<CenterProps> =  ({ type }) => {
		switch(type) {
		case Center.Solo:
			return (
				<OverlayTrigger
					placement="top"
					overlay={
						<Popover id="my-popover" className="bg-gray-300">
							<Popover.Title as="h3" className="text-dark bg-gray-300">Solo Certification</Popover.Title>
						</Popover>
					}
				>
					<span className="badge roster-user bg-warning">Washington Center</span>
				</OverlayTrigger>
			);
		case Center.Certified:
			return (
				<OverlayTrigger
					placement="top"
					overlay={
						<Popover id="my-popover" className="bg-gray-300">
							<Popover.Title as="h3" className="text-dark bg-gray-300">Fully Certified</Popover.Title>
						</Popover>
					}
				>
					<span className="badge roster-user bg-gray-800">Washington Center</span>
				</OverlayTrigger>
			);
		}
		return <></>;
	};

	const TraconCert: React.FC<TraconProps> = ({ name, type }) => {
		switch(type) {
		case Tracon.Solo:
			return (
				<OverlayTrigger
					placement="top"
					overlay={
						<Popover id="my-popover" className="bg-gray-300">
							<Popover.Title as="h3" className="text-dark bg-gray-300">Solo Certification</Popover.Title>
						</Popover>
					}
				>
					<span className="badge roster-user bg-warning">{ name }</span>
				</OverlayTrigger>
			);
		case Tracon.Certified:
			return (
				<OverlayTrigger
					placement="top"
					overlay={
						<Popover id="my-popover" className="bg-gray-300">
							<Popover.Title as="h3" className="text-dark bg-gray-300">Fully Certified</Popover.Title>
						</Popover>
					}
				>
					<span className="badge roster-user bg-gray-800">{ name }</span>
				</OverlayTrigger>
			);
		}
		return <></>;
	};

	const LocalCert: React.FC<LocalProps> = ({ name, type }) => {
		switch(type) {
		case Local.Solo:
			return (
				<OverlayTrigger
					placement="top"
					overlay={
						<Popover id="my-popover" className="bg-gray-300">
							<Popover.Title as="h3" className="text-dark bg-gray-300">Solo Certification</Popover.Title>
						</Popover>
					}
				>
					<span className="badge roster-user bg-warning">{ name }</span>
				</OverlayTrigger>
			);
		case Local.Minor:
			return (
				<OverlayTrigger
					placement="top"
					overlay={
						<Popover id="my-popover" className="bg-gray-300">
							<Popover.Title as="h3" className="text-dark bg-gray-300">Minor Certification</Popover.Title>
						</Popover>
					}
				>
					<span className="badge roster-user bg-secondary">{ name }</span>
				</OverlayTrigger>
			);
		case Local.Certified:
			return (
				<OverlayTrigger
					placement="top"
					overlay={
						<Popover id="my-popover" className="bg-gray-300">
							<Popover.Title as="h3" className="text-dark bg-gray-300">Fully Certified</Popover.Title>
						</Popover>
					}
				>
					<span className="badge roster-user bg-gray-800">{ name }</span>
				</OverlayTrigger>
			);
		}
		return <></>;
	};

	const User: React.FC<UserProps> = ({ user }) => {
		const roles = user.roles?.sort((a, b) => a.priority > b.priority ? 1 : -1);
		return (
			<tr>
				<td>
					{
						isStaff() || isTrainingStaff() ? 
							<Link to="/home"><b>{ user.fullName } ({ user.initials })</b></Link> :
							<b>{ user.fullName } ({ user.initials })</b>
					}
					<br />
					<span className="text-gray-700">{ user.ratingLong }</span>
				</td>
				<td>
					{
						roles.length > 0 ?
							roles.map(role => (
								<OverlayTrigger
									key={role.id}
									placement="top"
									overlay={
										<Popover id="my-popover" className="bg-gray-300">
											<Popover.Title as="h3" className="text-dark bg-gray-300">{ role.nameLong }</Popover.Title>
										</Popover>
									}
								>
									<span key={role.id} className={"badge roster-user" + (role.name == "INS" || role.name == "MTR" ? " bg-info" : " bg-success")}>
										{ role.name }
									</span>
								</OverlayTrigger>
							)) :
							<></>
					}
					<CenterCert type={user.certifications.center} />
					<TraconCert name="Mount Vernon" type={user.certifications.mountVernon} />
					<TraconCert name="Shenandoah" type={user.certifications.shenandoah} />
					<TraconCert name="Chesapeake" type={user.certifications.chesapeake} />
					<TraconCert name="Minor Approach" type={user.certifications.minorApproach} />
					<LocalCert name="Tower" type={user.certifications.tower} />
					<LocalCert name="Ground" type={user.certifications.ground} />
				</td>
			</tr>
		);
	};

	if (loading) return <LoadingScreen/>;

	return (
		<Container className="page-margins">
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-users"></i> Roster
				</Card.Header>
				<Card.Body>
					<Tabs defaultActiveKey="home" id="roster-tabs">
						<Tab eventKey="home" title="Home Controllers">
							<Table responsive striped>
								<thead>
									<tr>
										<th style={{ width: "20%" }} scope="col">Info</th>
										<th style={{ width: "80%" }} scope="col">Certifications</th>
									</tr>
								</thead>
								<tbody>
									{
										homeControllers.length > 0 ?
											homeControllers?.map(user => (
												<User key={user.id} user={user} />
											)) :
											<tr>
												<td colSpan={6} className="text-center">No users found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="visiting" title="Visiting Controllers">
							<Table responsive striped>
								<thead>
									<tr>
										<th style={{ width: "20%" }} scope="col">Info</th>
										<th style={{ width: "80%" }} scope="col">Certifications</th>
									</tr>
								</thead>
								<tbody>
									{
										visitingControllers.length > 0 ?
											visitingControllers?.map(user => (
												<User key={user.id} user={user} />
											)) :
											<tr>
												<td colSpan={6} className="text-center">No users found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
					</Tabs>
				</Card.Body>
			</Card>
		</Container>
	);
}