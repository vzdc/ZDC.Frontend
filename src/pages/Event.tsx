/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Container, Card, Col, Form, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import BounceLoader from "../components/BounceLoader";
import { getCid, isMember } from "../helpers/auth";
import instance from "../helpers/axios";
import { Event } from "../models/Event";
import { EventRegistration } from "../models/EventRegistration";

interface EventParam {
	id: string | undefined;
}

interface FormProps {
	start: string;
	end: string;
}

export default function EventView(): ReactElement {
	const [event, setEvent] = useState<Event>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [signup, setSignup] = useState<any>();
	const [loading, setLoading] = useState(true);
	const { id } = useParams<EventParam>();


	useEffect(() => {
		instance.get<Event>(`/Events/${id}`).then((response) => {
			setEvent(response.data);
			setLoading(false);
		});
		instance.get<EventRegistration>(`/Registrations/${id}/User`)
			.then(response => {
				setSignup(response.data);
				setLoading(false);
			});
	}, []);

	document.title = `Washington ARTCC - ${event?.title}`;


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
							<>
								<div className="text-center">
									<img className="img-fluid rounded-2" src={event?.url} />
								</div>
								<br />
								<Row>
									{
										isMember() ?
											<Col sm>
												<Row>
													<Col sm>
														<div className="text-center">
															Registration
														</div>
														<hr />
														{
															signup != null ?
																<Row>
																	<Col sm>
																		{signup?.user.ratingLong}
																	</Col>
																	<Col sm>
																		{signup?.start.toLocaleTimeString} - {signup?.end.toLocaleTimeString}
																	</Col>
																</Row> :
																<></>
														}
													</Col>
												</Row>
											</Col> :
											<></>
									}
									<Col sm>
										<Row>
											<Col sm>
												<div className="text-center">
													Event Info
												</div>
												<hr />
											</Col>
										</Row>
									</Col>
								</Row>
							</>
					}
				</Card.Body>
			</Card>
		</Container>
	);
}
function enqueueSnackbar(arg0: string, arg1: { variant: string; autoHideDuration: number; anchorOrigin: { vertical: string; horizontal: string; }; }) {
	throw new Error("Function not implemented.");
}

