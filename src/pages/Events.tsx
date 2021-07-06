/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BounceLoader from "../components/BounceLoader";
import instance from "../helpers/axios";
import { Event } from "../models/Event";
interface EventProps {
	events: Event[];
}

export default function Events(): ReactElement {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const upcoming = events?.filter(x => new Date(x.start) >= new Date());
	const archived = events?.filter(x => new Date(x.start) <= new Date());

	useEffect(() => {
		document.title = "Washington ARTCC - Events";
		instance.get<Event[]>("/Events")
			.then(response => {
				setEvents(response.data);
				setLoading(false);
			});
	}, []);
	console.log(upcoming);
	console.log(archived);

	const Events: React.FC<EventProps> = ({ events }) => {
		return (
			<Table responsive striped>
				<tbody>
					{
						loading ?
							<div className="center-home">
								<BounceLoader />
							</div> :
							events.length > 0 ?
								events?.map(event => (
									<tr key={event.id}>
										<td className="text-center">
											<Link to={"/event/" + event.id}>
												<img className="img-fluid" src={event.url} />
											</Link>
										</td>
									</tr>
								)) :
								<tr>
									<td className="text-center">No Events Found</td>
								</tr>
					}
				</tbody>
			</Table>
		);
	};

	return (
		<Container className="page-margins">
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-calendar-alt"></i> Upcoming Events
				</Card.Header>
				<Card.Body>
					<Events events={upcoming} />
				</Card.Body>
			</Card>
			<br />
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-calendar-alt"></i> Archived Events
				</Card.Header>
				<Card.Body>
					<Events events={archived} />
				</Card.Body>
			</Card>
		</Container>
	);
}