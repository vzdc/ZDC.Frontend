/* eslint-disable react/prop-types */

import React, { ReactElement, useEffect, useState } from "react";
import { Card, Container, Tab, Table, Tabs } from "react-bootstrap";
import { isStaff, isTrainingStaff } from "../helpers/auth";
import instance from "../helpers/axios";
import { File, FileCategory } from "../models/File";

interface FileProps {
	file: File;
}

export default function Files(): ReactElement {
	const [files, setFiles] = useState<File[]>([]);
	const vrc = files?.filter(x => x.category == FileCategory.VRC);
	const vstars = files?.filter(x => x.category == FileCategory.vSTARS);
	const veram = files?.filter(x => x.category == FileCategory.vERAM);
	const vatis = files?.filter(x => x.category == FileCategory.vATIS);
	const sops = files?.filter(x => x.category == FileCategory.SOPs);
	const loas = files?.filter(x => x.category == FileCategory.LOAs);
	const training = files?.filter(x => x.category == FileCategory.Training);
	const staff = files?.filter(x => x.category == FileCategory.Staff);

	useEffect(() => {
		document.title = "Washington ARTCC - Files";
		instance.get<File[]>("/Files")
			.then(response => {
				setFiles(response.data);
			});
	}, []);

	const FileEntry: React.FC<FileProps> = ({ file }) => {
		return (
			<tr>
				<td>{file.title}</td>
				<td>{file.description}</td>
				<td>{new Date(file.updated).toLocaleDateString()}</td>
				<td className="text-center">
					{
						file.url != null && file.url != "" ?
							<a href={file.url} target="_blank" rel="noreferrer"><i className="fas fa-download"></i></a> :
							"No download available"
					}
				</td>
			</tr>
		);
	};


	return (
		<Container className="page-margins">
			<Card className="shadow-lg">
				<Card.Header as="h5" className="text-center">
					<i className="fas fa-file"></i> Files
				</Card.Header>
				<Card.Body>
					<Tabs defaultActiveKey="VRC" id="file-tabs">
						<Tab eventKey="VRC" title="VRC">
							<Table responsive striped>
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Last Updated</th>
										<th className="text-center" scope="col">Download</th>
									</tr>
								</thead>
								<tbody>
									{
										vrc.length > 0 ?
											vrc?.map(file => (
												<FileEntry key={file.id} file={file} />
											)) :
											<tr>
												<td colSpan={3} className="text-center">No files found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="vSTARS" title="vSTARS">
							<Table responsive striped>
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Last Updated</th>
										<th className="text-center" scope="col">Download</th>
									</tr>
								</thead>
								<tbody>
									{
										vstars.length > 0 ?
											vstars?.map(file => (
												<FileEntry key={file.id} file={file} />
											)) :
											<tr>
												<td colSpan={3} className="text-center">No files found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="vERAM" title="vERAM">
							<Table responsive striped>
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Last Updated</th>
										<th className="text-center" scope="col">Download</th>
									</tr>
								</thead>
								<tbody>
									{
										veram.length > 0 ?
											veram?.map(file => (
												<FileEntry key={file.id} file={file} />
											)) :
											<tr>
												<td colSpan={3} className="text-center">No files found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="vATIS" title="vATIS">
							<Table responsive striped>
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Last Updated</th>
										<th className="text-center" scope="col">Download</th>
									</tr>
								</thead>
								<tbody>
									{
										vatis.length > 0 ?
											vatis?.map(file => (
												<FileEntry key={file.id} file={file} />
											)) :
											<tr>
												<td colSpan={3} className="text-center">No files found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="SOP's" title="SOP's">
							<Table responsive striped>
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Last Updated</th>
										<th className="text-center" scope="col">Download</th>
									</tr>
								</thead>
								<tbody>
									{
										sops.length > 0 ?
											sops?.map(file => (
												<FileEntry key={file.id} file={file} />
											)) :
											<tr>
												<td colSpan={3} className="text-center">No files found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="LOA's" title="LOA's">
							<Table responsive striped>
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Last Updated</th>
										<th className="text-center" scope="col">Download</th>
									</tr>
								</thead>
								<tbody>
									{
										loas.length > 0 ?
											loas?.map(file => (
												<FileEntry key={file.id} file={file} />
											)) :
											<tr>
												<td colSpan={3} className="text-center">No files found</td>
											</tr>
									}
								</tbody>
							</Table>
						</Tab>
						{
							isTrainingStaff() ?
								<Tab eventKey="Training" title="Training">
									<Table responsive striped>
										<thead>
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Description</th>
												<th scope="col">Last Updated</th>
												<th className="text-center" scope="col">Download</th>
											</tr>
										</thead>
										<tbody>
											{
												training.length > 0 ?
													training?.map(file => (
														<FileEntry key={file.id} file={file} />
													)) :
													<tr>
														<td colSpan={3} className="text-center">No files found</td>
													</tr>
											}
										</tbody>
									</Table>
								</Tab> :
								<></>
						}
						{
							isStaff() ?
								<Tab eventKey="Staff" title="Staff">
									<Table responsive striped>
										<thead>
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Description</th>
												<th scope="col">Last Updated</th>
												<th className="text-center" scope="col">Download</th>
											</tr>
										</thead>
										<tbody>
											{
												staff.length > 0 ?
													staff?.map(file => (
														<FileEntry key={file.id} file={file} />
													)) :
													<tr>
														<td colSpan={3} className="text-center">No files found</td>
													</tr>
											}
										</tbody>
									</Table>
								</Tab> :
								<></>
						}
					</Tabs>
				</Card.Body>
			</Card>
		</Container>
	);
}