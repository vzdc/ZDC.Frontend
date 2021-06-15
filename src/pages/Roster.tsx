/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import instance from "../helpers/axios";
import { User } from "../models/User";

interface UserProps {
    user: User;
}

export default function Roster(): ReactElement {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		document.title = "Washington ARTCC - Roster";
		instance.get<User[]>("/Users?full=true")
			.then(response => {
				setUsers(response.data);
			});
	}, []);

	const User: React.FC<UserProps> = ({ user }) => {
		return (
			<tr>
				<td>{ user.fullName }</td>
				<td>{ user.initials }</td>
				<td>{ user.role }</td>
				<td>{ user.trainingRole }</td>
				<td>{ user.certifications.ground }</td>
			</tr>
		);
	};
	return (
		<Container className="page-margins">
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-users"></i> Roster
				</Card.Header>
				<Card.Body>
					<Table responsive borderless>
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Initials</th>
								<th scope="col">Role</th>
								<th scope="col">Training Role</th>
								<th scope="col">Ground</th>
							</tr>
						</thead>
						<tbody>
							{
								users.length > 0 ?
									users?.map(user => (
										<User key={user.id} user={user} />
									)) :
									<tr>
										<td colSpan={5} className="text-center">No users found</td>
									</tr>
							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</Container>
	);
}