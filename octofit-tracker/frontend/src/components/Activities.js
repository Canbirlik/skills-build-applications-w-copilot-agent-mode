import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace
	? `https://${codespace}-8000.app.github.dev`
	: 'http://localhost:8000';
const endpoint = `${baseUrl}/api/activities/`;

function Activities() {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		console.log('Fetching activities from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setActivities(results);
				console.log('Fetched activities:', results);
			})
			.catch(err => console.error('Error fetching activities:', err));
	}, []);

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 className="mb-0">Activities</h2>
				<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addActivityModal">Add Activity</button>
			</div>
			<div className="card shadow-sm">
				<div className="card-body">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>User Email</th>
								<th>Type</th>
								<th>Duration (min)</th>
							</tr>
						</thead>
						<tbody>
							{activities.map((a, i) => (
								<tr key={i}>
									<td>{a.user_email}</td>
									<td>{a.type}</td>
									<td>{a.duration}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal for adding activity (scaffold) */}
			<div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">User Email</label>
									<input type="email" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Type</label>
									<input type="text" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Duration (min)</label>
									<input type="number" className="form-control" />
								</div>
								<button type="submit" className="btn btn-primary">Save</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Activities;
