import React from 'react';

const AdminDashboard = () => {
	return (
		<div class="dashboard">
    <div class="sidebar">
      <ul>
        <li>Dashboard</li>
        <li>Orders</li>
        <li>Customers</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>
    </div>
    <div class="content">
      <h1>Welcome to the Dashboard</h1>
      <p>This is the main content area of the dashboard.</p>
    </div>
  </div>
	);
};

export default AdminDashboard;