import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace
	? `https://${codespace}-8000.app.github.dev`
	: 'http://localhost:8000';
const endpoint = `${baseUrl}/api/leaderboard/`;

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		console.log('Fetching leaderboard from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setLeaderboard(results);
				console.log('Fetched leaderboard:', results);
			})
			.catch(err => console.error('Error fetching leaderboard:', err));
	}, []);

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 className="mb-0">Leaderboard</h2>
				<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addLeaderboardModal">Add Entry</button>
			</div>
			<div className="card shadow-sm">
				<div className="card-body">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>Team</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((l, i) => (
								<tr key={i}>
									<td>{l.team}</td>
									<td>{l.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal for adding leaderboard entry (scaffold) */}
			<div className="modal fade" id="addLeaderboardModal" tabIndex="-1" aria-labelledby="addLeaderboardModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addLeaderboardModalLabel">Add Leaderboard Entry</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">Team</label>
									<input type="text" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Points</label>
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

export default Leaderboard;
