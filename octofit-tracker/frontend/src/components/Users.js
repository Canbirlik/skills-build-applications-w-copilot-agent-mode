import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespace
	? `https://${codespace}-8000.app.github.dev`
	: 'http://localhost:8000';
const endpoint = `${baseUrl}/api/users/`;

function Users() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		console.log('Fetching users from:', endpoint);
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				const results = data.results || data;
				setUsers(results);
				console.log('Fetched users:', results);
			})
			.catch(err => console.error('Error fetching users:', err));
	}, []);

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 className="mb-0">Users</h2>
				<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
			</div>
			<div className="card shadow-sm">
				<div className="card-body">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Team</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u, i) => (
								<tr key={i}>
									<td>{u.name}</td>
									<td>{u.email}</td>
									<td>{u.team}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal for adding user (scaffold) */}
			<div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addUserModalLabel">Add User</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">Name</label>
									<input type="text" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input type="email" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Team</label>
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

export default Users;
