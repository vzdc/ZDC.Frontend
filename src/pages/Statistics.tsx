/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import instance from "../helpers/axios";
import BounceLoader from "../components/BounceLoader";
import LoadingScreen from "../components/LoadingScreen";
import { Link, useLocation, useParams } from "react-router-dom";
import { Stats } from "../models/Stats";

interface StatsProps {
	stats: Stats
}

interface YearType {
	yearParam: string;
}

interface MonthType {
	monthParam: string;
}

export default function Statistics(): ReactElement {
	const location = useLocation();
	const [firstLoad, setFirstLoad] = useState(true);
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState<Stats[]>([]);
	const { yearParam } = useParams<YearType>();
	const { monthParam } = useParams<MonthType>();
	const year: number = parseInt(yearParam);
	const month: number = parseInt(monthParam);
	const nextMonth: number = month + 1;
	const previousMonth: number = month - 1;
	const nextYear: number = year + 1;
	const previousYear: number = year - 1;
	const date: Date = new Date(year, month);
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	useEffect(() => {
		document.title = "Washington ARTCC - Statistics";
		setLoading(true);
		instance.get<Stats[]>(`/Users/stats?year=${year}&month=${month}`)
			.then(response => {
				setStats(response.data);
				setFirstLoad(false);
				setLoading(false);
			});
	}, [location]);

	if (firstLoad) return <LoadingScreen />;

	const Stats: React.FC<StatsProps> = ({ stats }) => {
		return (
			<tr>
				<td>{stats.fullName}</td>
				<td>{stats.ratingLong}</td>
				{
					stats.hours != null ?
						<>
							<td>{stats.hours.localHoursString}</td>
							<td>{stats.hours.traconHoursString}</td>
							<td>{stats.hours.centerHoursString}</td>
							<td>{stats.hours.totalHoursString}</td>
						</> :
						<>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</>
				}
			</tr>
		);
	};

	return (
		<Container className="page-margins">
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-satellite-dish"></i> Statistics
					<br />
					{monthNames[date.getUTCMonth() - 1] + " " + year}
					<hr />
					<Row>
						<Col sm>
							{
								month == 1 ?
									<Link to={"/statistics/" + 12 + "/" + previousYear} className="btn btn-primary">Previous</Link> :
									<Link to={"/statistics/" + previousMonth + "/" + year} className="btn btn-primary">Previous</Link>
							}
						</Col>
						<Col sm>
							{
								month == 12 ?
									<Link to={"/statistics/" + 1 + "/" + nextYear} className="btn btn-primary">Next</Link> :
									<Link to={"/statistics/" + nextMonth + "/" + year} className="btn btn-primary">Next</Link>
							}
						</Col>
					</Row>
				</Card.Header>
				<Card.Body>
					{
						loading ?
							<div className="center">
								<BounceLoader />
							</div> :
							<Table responsive striped>
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Rating</th>
										<th scope="col">Local</th>
										<th scope="col">Tracon</th>
										<th scope="col">Center</th>
										<th scope="col">Total</th>
									</tr>
								</thead>
								<tbody>
									{
										stats.length > 0 ?
											stats?.map(entry => (
												<Stats key={entry.id} stats={entry} />
											)) :
											<tr>
												<td colSpan={6} className="text-center">No users found</td>
											</tr>
									}
								</tbody>
							</Table>
					}
				</Card.Body>
			</Card>
		</Container>
	);
}