import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace
	? `https://${codespace}-8000.app.github.dev`
	: 'http://localhost:8000';
const endpoint = `${baseUrl}/api/teams/`;


function Teams() {
	const [teams, setTeams] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log('Fetching teams from:', endpoint);
		fetch(endpoint)
			.then(res => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then(data => {
				const results = data.results || data;
				setTeams(results);
				setError(null);
				console.log('Fetched teams:', results);
			})
			.catch(err => {
				setError(`Failed to fetch teams: ${err.message}`);
				setTeams([]);
				console.error('Error fetching teams:', err);
			});
	}, []);

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 className="mb-0">Teams</h2>
				<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTeamModal">Add Team</button>
			</div>
			{error && <div className="alert alert-danger">{error}</div>}
			<div className="card shadow-sm">
				<div className="card-body">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{teams.map((t, i) => (
								<tr key={i}>
									<td>{t.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal for adding team (scaffold) */}
			<div className="modal fade" id="addTeamModal" tabIndex="-1" aria-labelledby="addTeamModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addTeamModalLabel">Add Team</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">Name</label>
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

export default Teams;
