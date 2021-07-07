/* eslint-disable react/prop-types */

import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { Container, Card, Col, Row, Form, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { format } from "date-fns";
import BounceLoader from "../components/BounceLoader";
import { isMember } from "../helpers/auth";
import instance from "../helpers/axios";
import { Event } from "../models/Event";
import { EventRegistration } from "../models/EventRegistration";

interface EventParam {
	id: string | undefined;
}

interface EventProps {
	event: Event;
}

interface RegistrationProps {
	registration: EventRegistration;
}

export default function EventView(): ReactElement {
	const [event, setEvent] = useState<Event>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [registration, setRegistration] = useState<any>(null);
	const [newRegistration, setNewRegistration] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams<EventParam>();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		instance.get<Event>(`/Events/${id}`)
			.then((response) => {
				setEvent(response.data);
				setLoading(false);
			})
			.catch(error => {
				setLoading(false);
				enqueueSnackbar(error.toString(), {
					variant: "error",
					autoHideDuration: 3000,
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "right",
					}
				});
			});
		instance.get<EventRegistration>(`/Registrations/${id}/User`)
			.then(response => {
				setRegistration(response.data);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	document.title = `Washington ARTCC - ${event?.title}`;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = (e: any) => {
		e.preventDefault();
		// get our new errors
		const newErrors: number[] = [];
		if (Object.keys(newErrors).length > 0) {
			// if we got any errors set them
		} else {
			// post new registration
			console.log(e.start);
			console.log(e.end);
			// registration.start = e.start;
			// registration.start = e.end;
			enqueueSnackbar("Registration Successful", {
				variant: "success",
				autoHideDuration: 3000,
				anchorOrigin: {
					vertical: "bottom",
					horizontal: "right",
				}
			});
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDateChange = (event: any) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const newRegistration: any = {};
		newRegistration[event.target.name] = event.target.value;
		setNewRegistration(newRegistration);
	};

	const EventEntry: React.FC<EventProps> = ({ event }) => {
		return (
			<>
				<div className="text-center">
					<img className="img-fluid rounded-2" src={event?.url} />
				</div>
				<br />
				<Row>
					<Col sm>
						<div className="text-center">
							Registration
						</div>
						< hr />
						{
							new Date(event.start) > new Date() ?
								isMember() ?
									<EventRegistration registration={registration} /> :
									<></> :
								<div className="text-center">
									Cannot register for archived events
								</div>
						}
					</Col>
					<Col sm>
						<Row>
							<Col sm>
								<div className="text-center">
									Event Info
								</div>
								<hr />
								<Table responsive borderless>
									<tbody>
										<tr>
											<td>Host:</td>
											<td>{event.host}</td>
										</tr>
										<tr>
											<td>Start:</td>
											<td>{format(new Date(event.start), "MM/dd/yyyy hh:mm aaaaa'm'")}</td>
										</tr>
										<tr>
											<td>End:</td>
											<td>{format(new Date(event.end), "MM/dd/yyyy hh:mm aaaaa'm'")}</td>
										</tr>
										<tr>
											<td colSpan={2}>{event.text}</td>
										</tr>
									</tbody>
								</Table>
							</Col>
						</Row>
					</Col>
				</Row>
			</>
		);
	};

	const EventRegistration: React.FC<RegistrationProps> = ({ registration }) => {
		return (
			<>
				{
					registration != null ?
						<Row>
							<Col sm>
								{registration?.user?.ratingLong}
							</Col>
							<Col sm>
								{registration?.start?.toLocaleTimeString} - {registration?.end?.toLocaleTimeString}
							</Col>
						</Row> :
						<Form onSubmit={handleSubmit}>
							<Row className="text-center">
								<Col sm>
									<Form.Group>
										<Form.Label>Start Time</Form.Label>
										<Form.Control name="start" type="datetime-local" />
									</Form.Group>
								</Col>
								<Col sm>
									<Form.Group>
										<Form.Label>End Time</Form.Label>
										<Form.Control name="end" type="datetime-local" />
									</Form.Group>
								</Col>
							</Row>
							<br />
							<div className="text-center">
								<input className="btn bg-gray-800 text-white" type="submit" />
							</div>
						</Form>
				}
			</>
		);
	};


	return (
		<Container className="page-margins">
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-calendar-alt"></i> {event?.title}
				</Card.Header>
				<Card.Body>
					{
						loading ?
							<div className="center-home">
								<BounceLoader />
							</div> :
							event != null && event != undefined ?
								<EventEntry event={event} /> :
								<div className="text-center">
									<span className="font-xl">Event not found</span>
								</div>
					}
				</Card.Body>
			</Card>
		</Container>
	);
}
