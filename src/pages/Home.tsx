/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import instance from "../helpers/axios";
import { OnlineController } from "../models/OnlineController";
import { Event } from "../models/Event";
import { Announcement } from "../models/Announcement";
import { Airport } from "../models/Airport";
import { Overflight } from "../models/Overflight";

interface OnlineControllerProps {
    controllers: OnlineController[];
}

interface EventProps {
    events: Event[];
}

interface AnnouncementProps {
    announcements: Announcement[];
}

interface AirportProps {
    airports: Airport[];
}

interface OverflightProps {
    overflights: Overflight[];
}

export default function Home(): ReactElement {
	const [onlineControllers, setOnlineControllers] = useState<OnlineController[]>([]);
	const [events, setEvents] = useState<Event[]>([]);
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);
	const [airports, setAirports] = useState<Airport[]>([]);
	const [overflights, setOverflights] = useState<Overflight[]>([]);

	useEffect(() => {
		document.title = "Washington ARTCC - Home";
		instance.get<OnlineController[]>("/Users/Online?full=true")
			.then(response => {
				setOnlineControllers(response.data);
			});
		
		instance.get<Event[]>("/Events")
			.then(response => {
				setEvents(response.data);
			});

		instance.get<Announcement[]>("/Announcements?full=true")
			.then(response => {
				setAnnouncements(response.data);
			});
		instance.get<Airport[]>("/Airports")
			.then(response => {
				setAirports(response.data);
			});
		instance.get<Overflight[]>("/Overflights")
			.then(response => {
				setOverflights(response.data);
			});
	}, []);

	const OnlineControllers: React.FC<OnlineControllerProps> = ({ controllers }) => {
		return (
			<Table responsive borderless>
				<thead>
					<tr className="border-bottom border-dark">
						<th scope="col" className="text-center">Callsign</th>
						<th scope="col" className="text-center">Frequency</th>
						<th scope="col" className="text-center">Name</th>
						<th scope="col" className="text-center">Time Online</th>
					</tr>
				</thead>
				<tbody>
					{
						controllers.length > 0 ?
							controllers?.map(controller => (
								<tr key={controller.id}>
									<td className="text-center">{ controller.position }</td>
									<td className="text-center">{ controller.frequency }</td>
									<td className="text-center">{ controller.user.fullName }</td>
									<td className="text-center">{ controller.online }</td>
								</tr>
							)) :
							<tr>
								<td colSpan={4} className="text-center">No Controllers Online</td>
							</tr>
					}
				</tbody>
			</Table>
		);
	};

	const Events: React.FC<EventProps> = ({ events }) => {
		return (
			<Table responsive borderless>
				<tbody>
					{
						events.length > 0 ?
							events?.filter(x => x.open)?.map(event => (
								<tr key={event.id}>
									<td>
										<img className="img-fluid" src={event.banner} />
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

	const Announcements: React.FC<AnnouncementProps> = ({ announcements }) => {
		return (
			<Table responsive borderless>
				<tbody>
					{
						announcements.length > 0 ?
							announcements?.map(announcement => (
								<tr key={announcement.id}>
									<td>{announcement.title}</td>
								</tr>
							)) :
							<tr>
								<td className="text-center">No Announcements Found</td>
							</tr>
					}
				</tbody>
			</Table>
		);
	};

	const Weather: React.FC<AirportProps> = ({ airports }) => {
		return (
			<Table responsive borderless>
				<thead>
					<tr className="border-bottom border-dark">
						<th scope="col" className="text-center">ICAO</th>
						<th scope="col" className="text-center">Conditions</th>
						<th scope="col" className="text-center">Winds</th>
						<th scope="col" className="text-center">Temperature</th>
						<th scope="col" className="text-center">Altimeter</th>
					</tr>
				</thead>
				<tbody>
					{
						airports.length > 0 ?
							airports?.map(airport => (
								<tr key={airport.id}>
									<td className="text-center">{airport.icao}</td>
									<td className="text-center">{airport.conditions}</td>
									<td className="text-center">{airport.wind}</td>
									<td className="text-center">{airport.temp}</td>
									<td className="text-center">{airport.altimeter}</td>
								</tr>
							)) :
							<tr>
								<td colSpan={5} className="text-center">No Weather Found</td>
							</tr>
					}
				</tbody>
			</Table>
		);
	};

	const Overflights: React.FC<OverflightProps> = ({ overflights }) => {
		return (
			<Table responsive borderless>
				<thead>
					<tr className="border-bottom border-dark">
						<th scope="col" className="text-center">Callsign</th>
						<th scope="col" className="text-center">Departure</th>
						<th scope="col" className="text-center">Arrival</th>
						<th scope="col" className="text-center">Route</th>
					</tr>
				</thead>
				<tbody>
					{
						overflights.length > 0 ?
							overflights?.filter(x => x.arrival && x.departure && x.route)?.map(overflight => (
								<tr key={overflight.id}>
									<td className="text-center">{overflight.callsign}</td>
									<td className="text-center">{overflight.departure}</td>
									<td className="text-center">{overflight.arrival}</td>
									<td className="text-center">{overflight.route.length > 32 ? overflight.route.substring(0, 32) + "..." : overflight.route}</td>
								</tr>
								
							)) :
							<tr>
								<td colSpan={4} className="text-center">No Overflights Found</td>
							</tr>
					}
				</tbody>
			</Table>
		);
	};

	return (
		<>
			<div className="home-image"></div>
			<div className="container-zdc">
				<Row>
					<Col sm={7}>
						<Row>
							<Col>
								<Card className="shadow-lg">
									<Card.Header as="h5" className="text-center">
										<i className="fas fa-broadcast-tower"></i> Online Controllers
									</Card.Header>
									<Card.Body>
										<OnlineControllers controllers={onlineControllers} />
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col>
								<Card className="shadow-lg">
									<Card.Header as="h5" className="text-center">
										<i className="fas fa-calendar-alt"></i> Events
									</Card.Header>
									<Card.Body>
										<Events events={events} />
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>
					<Col sm={5}>
						<Row>
							<Col>
								<Card className="shadow-lg">
									<Card.Header as="h5" className="text-center">
										<i className="fas fa-list-alt"></i> Announcements
									</Card.Header>
									<Card.Body>
										<Announcements announcements={announcements} />
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col>
								<Card className="shadow-lg">
									<Card.Header as="h5" className="text-center">
										<i className="fas fa-cloud"></i> Weather
									</Card.Header>
									<Card.Body>
										<Weather airports={airports} />
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col>
								<Card className="shadow-lg">
									<Card.Header as="h5" className="text-center">
										<i className="fas fa-plane"></i> Overflights
									</Card.Header>
									<Card.Body>
										<Overflights overflights={overflights} />
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
}