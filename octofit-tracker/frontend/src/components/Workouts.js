import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace
	? `https://${codespace}-8000.app.github.dev`
	: 'http://localhost:8000';
const endpoint = `${baseUrl}/api/workouts/`;

function Workouts() {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		console.log('Fetching workouts from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setWorkouts(results);
				console.log('Fetched workouts:', results);
			})
			.catch(err => console.error('Error fetching workouts:', err));
	}, []);

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 className="mb-0">Workouts</h2>
				<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">Add Workout</button>
			</div>
			<div className="card shadow-sm">
				<div className="card-body">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>Name</th>
								<th>Difficulty</th>
							</tr>
						</thead>
						<tbody>
							{workouts.map((w, i) => (
								<tr key={i}>
									<td>{w.name}</td>
									<td>{w.difficulty}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal for adding workout (scaffold) */}
			<div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-labelledby="addWorkoutModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addWorkoutModalLabel">Add Workout</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">Name</label>
									<input type="text" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Difficulty</label>
									<input type="text" className="form-control" />
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

export default Workouts;
